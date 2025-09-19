
// Remove dat.GUI in production
(function() {
  const removeGui = () => {
    // Target multiple possible dat.GUI selectors
    const selectors = ['.dg.ac', '.dg', '[class*="dg"]'];
    let removed = false;
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
          removed = true;
        }
      });
    });
    
    if (removed) {
      console.log('dat.GUI removed in production build');
    }
  };
  
  // Try to remove immediately
  removeGui();
  
  // Also try after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeGui);
  } else {
    // DOM is already loaded, try again
    removeGui();
  }
  
  // Try after short delays to catch any delayed GUI creation
  setTimeout(removeGui, 100);
  setTimeout(removeGui, 500);
  setTimeout(removeGui, 1000);
  
  // Also observe for any new GUI elements being added
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      removeGui();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Stop observing after 5 seconds to avoid performance issues
    setTimeout(() => observer.disconnect(), 5000);
  }
})();

var Qv=Object.defineProperty;var ey=(r,e,t)=>e in r?Qv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var nt=(r,e,t)=>ey(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var ty="1.3.11";function a_(r,e,t){return Math.max(r,Math.min(e,t))}function ny(r,e,t){return(1-t)*r+t*e}function iy(r,e,t,n){return ny(r,e,1-Math.exp(-t*n))}function ry(r,e){return(r%e+e)%e}var sy=class{constructor(){nt(this,"isRunning",!1);nt(this,"value",0);nt(this,"from",0);nt(this,"to",0);nt(this,"currentTime",0);nt(this,"lerp");nt(this,"duration");nt(this,"easing");nt(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=a_(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=iy(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function oy(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var ay=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){nt(this,"width",0);nt(this,"height",0);nt(this,"scrollHeight",0);nt(this,"scrollWidth",0);nt(this,"debouncedResize");nt(this,"wrapperResizeObserver");nt(this,"contentResizeObserver");nt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});nt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});nt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=oy(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},l_=class{constructor(){nt(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Sp=100/6,Yr={passive:!1},ly=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){nt(this,"touchStart",{x:0,y:0});nt(this,"lastDelta",{x:0,y:0});nt(this,"window",{width:0,height:0});nt(this,"emitter",new l_);nt(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});nt(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});nt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});nt(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Sp:n===2?this.window.width:1,s=n===1?Sp:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});nt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Yr),this.element.addEventListener("touchstart",this.onTouchStart,Yr),this.element.addEventListener("touchmove",this.onTouchMove,Yr),this.element.addEventListener("touchend",this.onTouchEnd,Yr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Yr),this.element.removeEventListener("touchstart",this.onTouchStart,Yr),this.element.removeEventListener("touchmove",this.onTouchMove,Yr),this.element.removeEventListener("touchend",this.onTouchEnd,Yr)}},wp=r=>Math.min(1,1.001-Math.pow(2,-10*r)),cy=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:x=!0,autoRaf:y=!1,anchors:v=!1,autoToggle:E=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:S=!1}={}){nt(this,"_isScrolling",!1);nt(this,"_isStopped",!1);nt(this,"_isLocked",!1);nt(this,"_preventNextNativeScrollEvent",!1);nt(this,"_resetVelocityTimeout",null);nt(this,"__rafID",null);nt(this,"isTouching");nt(this,"time",0);nt(this,"userData",{});nt(this,"lastVelocity",0);nt(this,"velocity",0);nt(this,"direction",0);nt(this,"options");nt(this,"targetScroll");nt(this,"animatedScroll");nt(this,"animate",new sy);nt(this,"emitter",new l_);nt(this,"dimensions");nt(this,"virtualScroll");nt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});nt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});nt(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.internalStop():this.internalStart()}});nt(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});nt(this,"onPointerDown",r=>{r.button===1&&this.reset()});nt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,x,y;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-touch"))||s&&((y=m.hasAttribute)==null?void 0:y.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend";g&&(f=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});nt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});nt(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=ty,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=wp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:x,autoRaf:y,anchors:v,autoToggle:E,allowNestedScroll:T,__experimental__naiveDimensions:S},this.dimensions=new ay(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new ly(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=a_(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=wp:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);i.computedStyle=E;const T=E.overflowX,S=E.overflowY;if(s=["auto","overlay","scroll"].includes(T),o=["auto","overlay","scroll"].includes(S),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const E=e!==0,T=t!==0;E&&s&&a&&(_="x"),T&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,x,y;if(_==="x")g=r.scrollLeft,m=c-d,p=e,x=s,y=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,x=o,y=l;else return!1;return(p>0?g<m:g>0)&&x&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ry(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="180",uy=0,Mp=1,dy=2,c_=1,fy=2,Ar=3,zr=0,si=1,Di=2,fs=0,hs=1,nu=2,Ep=3,Tp=4,hy=5,Gs=100,py=101,my=102,gy=103,_y=104,vy=200,yy=201,xy=202,by=203,Gd=204,Wd=205,Sy=206,wy=207,My=208,Ey=209,Ty=210,Ay=211,Cy=212,Ry=213,Py=214,Xd=0,qd=1,Yd=2,aa=3,jd=4,$d=5,Kd=6,Zd=7,u_=0,Ly=1,Dy=2,ps=0,Iy=1,Oy=2,Ny=3,Uy=4,Fy=5,ky=6,By=7,Ap="attached",zy="detached",d_=300,la=301,ca=302,Jd=303,Qd=304,Eu=306,ua=1e3,rs=1001,iu=1002,ni=1003,f_=1004,Ga=1005,xi=1006,Bc=1007,Dr=1008,mr=1009,h_=1010,p_=1011,bl=1012,Mh=1013,so=1014,Yi=1015,Hl=1016,Eh=1017,Th=1018,Sl=1020,m_=35902,g_=35899,__=1021,v_=1022,Ii=1023,wl=1026,Ml=1027,Ah=1028,Ch=1029,y_=1030,Rh=1031,Ph=1033,zc=33776,Hc=33777,Vc=33778,Gc=33779,ef=35840,tf=35841,nf=35842,rf=35843,sf=36196,of=37492,af=37496,lf=37808,cf=37809,uf=37810,df=37811,ff=37812,hf=37813,pf=37814,mf=37815,gf=37816,_f=37817,vf=37818,yf=37819,xf=37820,bf=37821,Sf=36492,wf=36494,Mf=36495,Ef=36283,Tf=36284,Af=36285,Cf=36286,El=2300,Tl=2301,ku=2302,Cp=2400,Rp=2401,Pp=2402,Hy=2500,Vy=0,x_=1,Rf=2,Gy=3200,Wy=3201,b_=0,Xy=1,is="",vn="srgb",Wn="srgb-linear",ru="linear",Yt="srgb",xo=7680,Lp=519,qy=512,Yy=513,jy=514,S_=515,$y=516,Ky=517,Zy=518,Jy=519,Pf=35044,Dp="300 es",lr=2e3,su=2001;class wa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ip=1234567;const nl=Math.PI/180,da=180/Math.PI;function ji(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fn[r&255]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]+"-"+Fn[e&255]+Fn[e>>8&255]+"-"+Fn[e>>16&15|64]+Fn[e>>24&255]+"-"+Fn[t&63|128]+Fn[t>>8&255]+"-"+Fn[t>>16&255]+Fn[t>>24&255]+Fn[n&255]+Fn[n>>8&255]+Fn[n>>16&255]+Fn[n>>24&255]).toLowerCase()}function Tt(r,e,t){return Math.max(e,Math.min(t,r))}function Lh(r,e){return(r%e+e)%e}function Qy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ex(r,e,t){return r!==e?(t-r)/(e-r):0}function il(r,e,t){return(1-t)*r+t*e}function tx(r,e,t,n){return il(r,e,1-Math.exp(-t*n))}function nx(r,e=1){return e-Math.abs(Lh(r,e*2)-e)}function ix(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function rx(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function sx(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ox(r,e){return r+Math.random()*(e-r)}function ax(r){return r*(.5-Math.random())}function lx(r){r!==void 0&&(Ip=r);let e=Ip+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cx(r){return r*nl}function ux(r){return r*da}function dx(r){return(r&r-1)===0&&r!==0}function fx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function hx(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function px(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const mx={DEG2RAD:nl,RAD2DEG:da,generateUUID:ji,clamp:Tt,euclideanModulo:Lh,mapLinear:Qy,inverseLerp:ex,lerp:il,damp:tx,pingpong:nx,smoothstep:ix,smootherstep:rx,randInt:sx,randFloat:ox,randFloatSpread:ax,seededRandom:lx,degToRad:cx,radToDeg:ux,isPowerOfTwo:dx,ceilPowerOfTwo:fx,floorPowerOfTwo:hx,setQuaternionFromProperEuler:px,normalize:Xt,denormalize:Wi};class Ct{constructor(e=0,t=0){Ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ws{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const E=Math.sqrt(y),T=Math.atan2(E,p*x);m=Math.sin(m*T)/E,a=Math.sin(a*T)/E}const v=a*x;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=E,c*=E,u*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,n=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Op.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Op.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Bu.copy(this).projectOnVector(e),this.sub(Bu)}reflect(e){return this.sub(Bu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bu=new X,Op=new ws;class gt{constructor(e,t,n,i,s,o,a,l,c){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],x=i[1],y=i[4],v=i[7],E=i[2],T=i[5],S=i[8];return s[0]=o*g+a*x+l*E,s[3]=o*m+a*y+l*T,s[6]=o*p+a*v+l*S,s[1]=c*g+u*x+d*E,s[4]=c*m+u*y+d*T,s[7]=c*p+u*v+d*S,s[2]=f*g+h*x+_*E,s[5]=f*m+h*y+_*T,s[8]=f*p+h*v+_*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(zu.makeScale(e,t)),this}rotate(e){return this.premultiply(zu.makeRotation(-e)),this}translate(e,t){return this.premultiply(zu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zu=new gt;function w_(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Al(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gx(){const r=Al("canvas");return r.style.display="block",r}const Np={};function Cl(r){r in Np||(Np[r]=!0,console.warn(r))}function _x(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Up=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fp=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vx(){const r={enabled:!0,workingColorSpace:Wn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Yt&&(i.r=Fr(i.r),i.g=Fr(i.g),i.b=Fr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Yt&&(i.r=Ko(i.r),i.g=Ko(i.g),i.b=Ko(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===is?ru:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Cl("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Cl("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Wn]:{primaries:e,whitePoint:n,transfer:ru,toXYZ:Up,fromXYZ:Fp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:e,whitePoint:n,transfer:Yt,toXYZ:Up,fromXYZ:Fp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}}),r}const Lt=vx();function Fr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ko(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let bo;class yx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bo===void 0&&(bo=Al("canvas")),bo.width=e.width,bo.height=e.height;const i=bo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=bo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Al("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Fr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fr(t[n]/255)*255):t[n]=Fr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xx=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xx++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Hu(i[o].image)):s.push(Hu(i[o]))}else s=Hu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Hu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?yx.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bx=0;const Vu=new X;class wn extends wa{constructor(e=wn.DEFAULT_IMAGE,t=wn.DEFAULT_MAPPING,n=rs,i=rs,s=xi,o=Dr,a=Ii,l=mr,c=wn.DEFAULT_ANISOTROPY,u=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=ji(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Vu).x}get height(){return this.source.getSize(Vu).y}get depth(){return this.source.getSize(Vu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==d_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case rs:e.x=e.x<0?0:1;break;case iu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case rs:e.y=e.y<0?0:1;break;case iu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=d_;wn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,n=0,i=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(h+1)/2,E=(p+1)/2,T=(u+f)/4,S=(d+g)/4,P=(_+m)/4;return y>v&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=T/n,s=S/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=T/i,s=P/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=S/s,i=P/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(d-g)/x,this.z=(f-u)/x,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this.w=Tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this.w=Tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sx extends wa{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new wn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Dh(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oo extends Sx{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class M_ extends wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class wx extends wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ki{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yl.copy(n.boundingBox)),Yl.applyMatrix4(e.matrixWorld),this.union(Yl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ca),jl.subVectors(this.max,Ca),So.subVectors(e.a,Ca),wo.subVectors(e.b,Ca),Mo.subVectors(e.c,Ca),jr.subVectors(wo,So),$r.subVectors(Mo,wo),As.subVectors(So,Mo);let t=[0,-jr.z,jr.y,0,-$r.z,$r.y,0,-As.z,As.y,jr.z,0,-jr.x,$r.z,0,-$r.x,As.z,0,-As.x,-jr.y,jr.x,0,-$r.y,$r.x,0,-As.y,As.x,0];return!Gu(t,So,wo,Mo,jl)||(t=[1,0,0,0,1,0,0,0,1],!Gu(t,So,wo,Mo,jl))?!1:($l.crossVectors(jr,$r),t=[$l.x,$l.y,$l.z],Gu(t,So,wo,Mo,jl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xr=[new X,new X,new X,new X,new X,new X,new X,new X],Bi=new X,Yl=new Ki,So=new X,wo=new X,Mo=new X,jr=new X,$r=new X,As=new X,Ca=new X,jl=new X,$l=new X,Cs=new X;function Gu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Cs.fromArray(r,s);const a=i.x*Math.abs(Cs.x)+i.y*Math.abs(Cs.y)+i.z*Math.abs(Cs.z),l=e.dot(Cs),c=t.dot(Cs),u=n.dot(Cs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Mx=new Ki,Ra=new X,Wu=new X;class vr{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);const t=Ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add(Wu)),this.expandByPoint(Ra.copy(e.center).sub(Wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const br=new X,Xu=new X,Kl=new X,Kr=new X,qu=new X,Zl=new X,Yu=new X;class Tu{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(br.copy(this.origin).addScaledVector(this.direction,t),br.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xu.copy(e).add(t).multiplyScalar(.5),Kl.copy(t).sub(e).normalize(),Kr.copy(this.origin).sub(Xu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Kl),a=Kr.dot(this.direction),l=-Kr.dot(Kl),c=Kr.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Xu).addScaledVector(Kl,f),h}intersectSphere(e,t){br.subVectors(e.center,this.origin);const n=br.dot(this.direction),i=br.dot(br)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,br)!==null}intersectTriangle(e,t,n,i,s){qu.subVectors(t,e),Zl.subVectors(n,e),Yu.crossVectors(qu,Zl);let o=this.direction.dot(Yu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kr.subVectors(this.origin,e);const l=a*this.direction.dot(Zl.crossVectors(Kr,Zl));if(l<0)return null;const c=a*this.direction.dot(qu.cross(Kr));if(c<0||l+c>o)return null;const u=-a*Kr.dot(Yu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Eo.setFromMatrixColumn(e,0).length(),s=1/Eo.setFromMatrixColumn(e,1).length(),o=1/Eo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ex,e,Tx)}lookAt(e,t,n){const i=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Zr.crossVectors(n,fi),Zr.lengthSq()===0&&(Math.abs(n.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Zr.crossVectors(n,fi)),Zr.normalize(),Jl.crossVectors(fi,Zr),i[0]=Zr.x,i[4]=Jl.x,i[8]=fi.x,i[1]=Zr.y,i[5]=Jl.y,i[9]=fi.y,i[2]=Zr.z,i[6]=Jl.z,i[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],x=n[3],y=n[7],v=n[11],E=n[15],T=i[0],S=i[4],P=i[8],b=i[12],M=i[1],L=i[5],U=i[9],W=i[13],F=i[2],q=i[6],j=i[10],C=i[14],Y=i[3],he=i[7],O=i[11],_e=i[15];return s[0]=o*T+a*M+l*F+c*Y,s[4]=o*S+a*L+l*q+c*he,s[8]=o*P+a*U+l*j+c*O,s[12]=o*b+a*W+l*C+c*_e,s[1]=u*T+d*M+f*F+h*Y,s[5]=u*S+d*L+f*q+h*he,s[9]=u*P+d*U+f*j+h*O,s[13]=u*b+d*W+f*C+h*_e,s[2]=_*T+g*M+m*F+p*Y,s[6]=_*S+g*L+m*q+p*he,s[10]=_*P+g*U+m*j+p*O,s[14]=_*b+g*W+m*C+p*_e,s[3]=x*T+y*M+v*F+E*Y,s[7]=x*S+y*L+v*q+E*he,s[11]=x*P+y*U+v*j+E*O,s[15]=x*b+y*W+v*C+E*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],x=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,y=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,E=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,T=t*x+n*y+i*v+s*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return e[0]=x*S,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*S,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*S,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*S,e[4]=y*S,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*S,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*S,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*S,e[8]=v*S,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*S,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*S,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*S,e[12]=E*S,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*S,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*S,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*S,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,x=l*c,y=l*u,v=l*d,E=n.x,T=n.y,S=n.z;return i[0]=(1-(g+p))*E,i[1]=(h+v)*E,i[2]=(_-y)*E,i[3]=0,i[4]=(h-v)*T,i[5]=(1-(f+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(_+y)*S,i[9]=(m-x)*S,i[10]=(1-(f+g))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Eo.set(i[0],i[1],i[2]).length();const o=Eo.set(i[4],i[5],i[6]).length(),a=Eo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],zi.copy(this);const c=1/s,u=1/o,d=1/a;return zi.elements[0]*=c,zi.elements[1]*=c,zi.elements[2]*=c,zi.elements[4]*=u,zi.elements[5]*=u,zi.elements[6]*=u,zi.elements[8]*=d,zi.elements[9]*=d,zi.elements[10]*=d,t.setFromRotationMatrix(zi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=lr,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let _,g;if(l)_=s/(o-s),g=o*s/(o-s);else if(a===lr)_=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===su)_=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=lr,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i);let _,g;if(l)_=1/(o-s),g=o/(o-s);else if(a===lr)_=-2/(o-s),g=-(o+s)/(o-s);else if(a===su)_=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Eo=new X,zi=new xt,Ex=new X(0,0,0),Tx=new X(1,1,1),Zr=new X,Jl=new X,fi=new X,kp=new xt,Bp=new ws;class gr{constructor(e=0,t=0,n=0,i=gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bp.setFromEuler(this),this.setFromQuaternion(Bp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gr.DEFAULT_ORDER="XYZ";class E_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ax=0;const zp=new X,To=new ws,Sr=new xt,Ql=new X,Pa=new X,Cx=new X,Rx=new ws,Hp=new X(1,0,0),Vp=new X(0,1,0),Gp=new X(0,0,1),Wp={type:"added"},Px={type:"removed"},Ao={type:"childadded",child:null},ju={type:"childremoved",child:null};class ln extends wa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ax++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ln.DEFAULT_UP.clone();const e=new X,t=new gr,n=new ws,i=new X(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new xt},normalMatrix:{value:new gt}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new E_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return To.setFromAxisAngle(e,t),this.quaternion.multiply(To),this}rotateOnWorldAxis(e,t){return To.setFromAxisAngle(e,t),this.quaternion.premultiply(To),this}rotateX(e){return this.rotateOnAxis(Hp,e)}rotateY(e){return this.rotateOnAxis(Vp,e)}rotateZ(e){return this.rotateOnAxis(Gp,e)}translateOnAxis(e,t){return zp.copy(e).applyQuaternion(this.quaternion),this.position.add(zp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hp,e)}translateY(e){return this.translateOnAxis(Vp,e)}translateZ(e){return this.translateOnAxis(Gp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ql.copy(e):Ql.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Pa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sr.lookAt(Pa,Ql,this.up):Sr.lookAt(Ql,Pa,this.up),this.quaternion.setFromRotationMatrix(Sr),i&&(Sr.extractRotation(i.matrixWorld),To.setFromRotationMatrix(Sr),this.quaternion.premultiply(To.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wp),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Px),ju.child=e,this.dispatchEvent(ju),ju.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wp),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,e,Cx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,Rx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ln.DEFAULT_UP=new X(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hi=new X,wr=new X,$u=new X,Mr=new X,Co=new X,Ro=new X,Xp=new X,Ku=new X,Zu=new X,Ju=new X,Qu=new zt,ed=new zt,td=new zt;class Xi{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Hi.subVectors(e,t),i.cross(Hi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Hi.subVectors(i,t),wr.subVectors(n,t),$u.subVectors(e,t);const o=Hi.dot(Hi),a=Hi.dot(wr),l=Hi.dot($u),c=wr.dot(wr),u=wr.dot($u),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Mr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mr.x),l.addScaledVector(o,Mr.y),l.addScaledVector(a,Mr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Qu.setScalar(0),ed.setScalar(0),td.setScalar(0),Qu.fromBufferAttribute(e,t),ed.fromBufferAttribute(e,n),td.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Qu,s.x),o.addScaledVector(ed,s.y),o.addScaledVector(td,s.z),o}static isFrontFacing(e,t,n,i){return Hi.subVectors(n,t),wr.subVectors(e,t),Hi.cross(wr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hi.subVectors(this.c,this.b),wr.subVectors(this.a,this.b),Hi.cross(wr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Xi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Co.subVectors(i,n),Ro.subVectors(s,n),Ku.subVectors(e,n);const l=Co.dot(Ku),c=Ro.dot(Ku);if(l<=0&&c<=0)return t.copy(n);Zu.subVectors(e,i);const u=Co.dot(Zu),d=Ro.dot(Zu);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Co,o);Ju.subVectors(e,s);const h=Co.dot(Ju),_=Ro.dot(Ju);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Ro,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return Xp.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(Xp,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Co,o).addScaledVector(Ro,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const T_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jr={h:0,s:0,l:0},ec={h:0,s:0,l:0};function nd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Lt.workingColorSpace){if(e=Lh(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=nd(o,s,e+1/3),this.g=nd(o,s,e),this.b=nd(o,s,e-1/3)}return Lt.colorSpaceToWorking(this,i),this}setStyle(e,t=vn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vn){const n=T_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}copyLinearToSRGB(e){return this.r=Ko(e.r),this.g=Ko(e.g),this.b=Ko(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vn){return Lt.workingToColorSpace(kn.copy(this),e),Math.round(Tt(kn.r*255,0,255))*65536+Math.round(Tt(kn.g*255,0,255))*256+Math.round(Tt(kn.b*255,0,255))}getHexString(e=vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.workingToColorSpace(kn.copy(this),t);const n=kn.r,i=kn.g,s=kn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Lt.workingColorSpace){return Lt.workingToColorSpace(kn.copy(this),t),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=vn){Lt.workingToColorSpace(kn.copy(this),e);const t=kn.r,n=kn.g,i=kn.b;return e!==vn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Jr),this.setHSL(Jr.h+e,Jr.s+t,Jr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Jr),e.getHSL(ec);const n=il(Jr.h,ec.h,t),i=il(Jr.s,ec.s,t),s=il(Jr.l,ec.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const kn=new Qe;Qe.NAMES=T_;let Lx=0;class fr extends wa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=hs,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gd,this.blendDst=Wd,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=aa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xo,this.stencilZFail=xo,this.stencilZPass=xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==zr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gd&&(n.blendSrc=this.blendSrc),this.blendDst!==Wd&&(n.blendDst=this.blendDst),this.blendEquation!==Gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==aa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xs extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gr,this.combine=u_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mn=new X,tc=new Ct;let Dx=0;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pf,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tc.fromBufferAttribute(this,t),tc.applyMatrix3(e),this.setXY(t,tc.x,tc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix3(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pf&&(e.usage=this.usage),e}}class A_ extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class C_ extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kr extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ix=0;const Ti=new xt,id=new ln,Po=new X,hi=new Ki,La=new Ki,Tn=new X;class wi extends wa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(w_(e)?C_:A_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new gt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,t,n){return Ti.makeTranslation(e,t,n),this.applyMatrix4(Ti),this}scale(e,t,n){return Ti.makeScale(e,t,n),this.applyMatrix4(Ti),this}lookAt(e){return id.lookAt(e),id.updateMatrix(),this.applyMatrix4(id.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Po).negate(),this.translate(Po.x,Po.y,Po.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];hi.setFromBufferAttribute(s),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];La.setFromBufferAttribute(a),this.morphTargetsRelative?(Tn.addVectors(hi.min,La.min),hi.expandByPoint(Tn),Tn.addVectors(hi.max,La.max),hi.expandByPoint(Tn)):(hi.expandByPoint(La.min),hi.expandByPoint(La.max))}hi.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Tn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Tn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Tn.fromBufferAttribute(a,c),l&&(Po.fromBufferAttribute(e,c),Tn.add(Po)),i=Math.max(i,n.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new X,l[P]=new X;const c=new X,u=new X,d=new X,f=new Ct,h=new Ct,_=new Ct,g=new X,m=new X;function p(P,b,M){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,b),_.fromBufferAttribute(s,M),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),a[P].add(g),a[b].add(g),a[M].add(g),l[P].add(m),l[b].add(m),l[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,b=x.length;P<b;++P){const M=x[P],L=M.start,U=M.count;for(let W=L,F=L+U;W<F;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const y=new X,v=new X,E=new X,T=new X;function S(P){E.fromBufferAttribute(i,P),T.copy(E);const b=a[P];y.copy(b),y.sub(E.multiplyScalar(E.dot(b))).normalize(),v.crossVectors(T,b);const L=v.dot(l[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,L)}for(let P=0,b=x.length;P<b;++P){const M=x[P],L=M.start,U=M.count;for(let W=L,F=L+U;W<F;W+=3)S(e.getX(W+0)),S(e.getX(W+1)),S(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new X,s=new X,o=new X,a=new X,l=new X,c=new X,u=new X,d=new X;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tn.fromBufferAttribute(e,t),Tn.normalize(),e.setXYZ(t,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Bt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qp=new xt,Rs=new Tu,nc=new vr,Yp=new X,ic=new X,rc=new X,sc=new X,rd=new X,oc=new X,jp=new X,ac=new X;class ti extends ln{constructor(e=new wi,t=new Xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){oc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(rd.fromBufferAttribute(d,e),o?oc.addScaledVector(rd,u):oc.addScaledVector(rd.sub(t),u))}t.add(oc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nc.copy(n.boundingSphere),nc.applyMatrix4(s),Rs.copy(e.ray).recast(e.near),!(nc.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(nc,Yp)===null||Rs.origin.distanceToSquared(Yp)>(e.far-e.near)**2))&&(qp.copy(s).invert(),Rs.copy(e.ray).applyMatrix4(qp),!(n.boundingBox!==null&&Rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Rs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,h.start),y=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=x,E=y;v<E;v+=3){const T=a.getX(v),S=a.getX(v+1),P=a.getX(v+2);i=lc(this,p,e,n,c,u,d,T,S,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const x=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);i=lc(this,o,e,n,c,u,d,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,h.start),y=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=x,E=y;v<E;v+=3){const T=v,S=v+1,P=v+2;i=lc(this,p,e,n,c,u,d,T,S,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const x=m,y=m+1,v=m+2;i=lc(this,o,e,n,c,u,d,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ox(r,e,t,n,i,s,o,a){let l;if(e.side===si?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===zr,a),l===null)return null;ac.copy(a),ac.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(ac);return c<t.near||c>t.far?null:{distance:c,point:ac.clone(),object:r}}function lc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,ic),r.getVertexPosition(l,rc),r.getVertexPosition(c,sc);const u=Ox(r,e,t,n,ic,rc,sc,jp);if(u){const d=new X;Xi.getBarycoord(jp,ic,rc,sc,d),i&&(u.uv=Xi.getInterpolatedAttribute(i,a,l,c,d,new Ct)),s&&(u.uv1=Xi.getInterpolatedAttribute(s,a,l,c,d,new Ct)),o&&(u.normal=Xi.getInterpolatedAttribute(o,a,l,c,d,new X),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new X,materialIndex:0};Xi.getNormal(ic,rc,sc,f.normal),u.face=f,u.barycoord=d}return u}class Vl extends wi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new kr(c,3)),this.setAttribute("normal",new kr(u,3)),this.setAttribute("uv",new kr(d,2));function _(g,m,p,x,y,v,E,T,S,P,b){const M=v/S,L=E/P,U=v/2,W=E/2,F=T/2,q=S+1,j=P+1;let C=0,Y=0;const he=new X;for(let O=0;O<j;O++){const _e=O*L-W;for(let ve=0;ve<q;ve++){const Q=ve*M-U;he[g]=Q*x,he[m]=_e*y,he[p]=F,c.push(he.x,he.y,he.z),he[g]=0,he[m]=0,he[p]=T>0?1:-1,u.push(he.x,he.y,he.z),d.push(ve/S),d.push(1-O/P),C+=1}}for(let O=0;O<P;O++)for(let _e=0;_e<S;_e++){const ve=f+_e+q*O,Q=f+_e+q*(O+1),qe=f+(_e+1)+q*(O+1),He=f+(_e+1)+q*O;l.push(ve,Q,He),l.push(Q,qe,He),Y+=6}a.addGroup(h,Y,b),h+=Y,f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fa(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function jn(r){const e={};for(let t=0;t<r.length;t++){const n=fa(r[t]);for(const i in n)e[i]=n[i]}return e}function Nx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function R_(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Lt.workingColorSpace}const Ux={clone:fa,merge:jn};var Fx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fx,this.fragmentShader=kx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fa(e.uniforms),this.uniformsGroups=Nx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class P_ extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=lr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qr=new X,$p=new Ct,Kp=new Ct;class ri extends P_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(nl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return da*2*Math.atan(Math.tan(nl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qr.x,Qr.y).multiplyScalar(-e/Qr.z),Qr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qr.x,Qr.y).multiplyScalar(-e/Qr.z)}getViewSize(e,t){return this.getViewBounds(e,$p,Kp),t.subVectors(Kp,$p)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(nl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Lo=-90,Do=1;class Bx extends ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ri(Lo,Do,e,t);i.layers=this.layers,this.add(i);const s=new ri(Lo,Do,e,t);s.layers=this.layers,this.add(s);const o=new ri(Lo,Do,e,t);o.layers=this.layers,this.add(o);const a=new ri(Lo,Do,e,t);a.layers=this.layers,this.add(a);const l=new ri(Lo,Do,e,t);l.layers=this.layers,this.add(l);const c=new ri(Lo,Do,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===lr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===su)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class L_ extends wn{constructor(e=[],t=la,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zx extends oo{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new L_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Vl(5,5,5),s=new Oi({name:"CubemapFromEquirect",uniforms:fa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:si,blending:fs});s.uniforms.tEquirect.value=t;const o=new ti(i,s),a=t.minFilter;return t.minFilter===Dr&&(t.minFilter=xi),new Bx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Ir extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hx={type:"move"};class sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ir;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Zp extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gr,this.environmentIntensity=1,this.environmentRotation=new gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Vx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pf,this.updateRanges=[],this.version=0,this.uuid=ji()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xn=new X;class Ih{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix4(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyNormalMatrix(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.transformDirection(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ih(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Jp=new X,Qp=new zt,em=new zt,Gx=new X,tm=new xt,cc=new X,od=new vr,nm=new xt,ad=new Tu;class Wx extends ti{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ap,this.bindMatrix=new xt,this.bindMatrixInverse=new xt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ki),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cc),this.boundingBox.expandByPoint(cc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cc),this.boundingSphere.expandByPoint(cc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),od.copy(this.boundingSphere),od.applyMatrix4(i),e.ray.intersectsSphere(od)!==!1&&(nm.copy(i).invert(),ad.copy(e.ray).applyMatrix4(nm),!(this.boundingBox!==null&&ad.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ad)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new zt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ap?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Qp.fromBufferAttribute(i.attributes.skinIndex,e),em.fromBufferAttribute(i.attributes.skinWeight,e),Jp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=em.getComponent(s);if(o!==0){const a=Qp.getComponent(s);tm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Gx.copy(Jp).applyMatrix4(tm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class D_ extends ln{constructor(){super(),this.isBone=!0,this.type="Bone"}}class I_ extends wn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=ni,u=ni,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const im=new xt,Xx=new xt;class Oh{constructor(e=[],t=[]){this.uuid=ji(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new xt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new xt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Xx;im.multiplyMatrices(a,t[s]),im.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new I_(t,e,e,Ii,Yi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new D_),this.bones.push(o),this.boneInverses.push(new xt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Lf extends Bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Io=new xt,rm=new xt,uc=[],sm=new Ki,qx=new xt,Da=new ti,Ia=new vr;class Yx extends ti{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,qx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ki),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Io),sm.copy(e.boundingBox).applyMatrix4(Io),this.boundingBox.union(sm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Io),Ia.copy(e.boundingSphere).applyMatrix4(Io),this.boundingSphere.union(Ia)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Da.geometry=this.geometry,Da.material=this.material,Da.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ia.copy(this.boundingSphere),Ia.applyMatrix4(n),e.ray.intersectsSphere(Ia)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Io),rm.multiplyMatrices(n,Io),Da.matrixWorld=rm,Da.raycast(e,uc);for(let o=0,a=uc.length;o<a;o++){const l=uc[o];l.instanceId=s,l.object=this,t.push(l)}uc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Lf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new I_(new Float32Array(i*this.count),i,this.count,Ah,Yi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ld=new X,jx=new X,$x=new gt;class Fs{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ld.subVectors(n,t).cross(jx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ld),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$x.getNormalMatrix(e),i=this.coplanarPoint(ld).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ps=new vr,Kx=new Ct(.5,.5),dc=new X;class Nh{constructor(e=new Fs,t=new Fs,n=new Fs,i=new Fs,s=new Fs,o=new Fs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=lr,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],x=s[12],y=s[13],v=s[14],E=s[15];if(i[0].setComponents(c-o,h-u,p-_,E-x).normalize(),i[1].setComponents(c+o,h+u,p+_,E+x).normalize(),i[2].setComponents(c+a,h+d,p+g,E+y).normalize(),i[3].setComponents(c-a,h-d,p-g,E-y).normalize(),n)i[4].setComponents(l,f,m,v).normalize(),i[5].setComponents(c-l,h-f,p-m,E-v).normalize();else if(i[4].setComponents(c-l,h-f,p-m,E-v).normalize(),t===lr)i[5].setComponents(c+l,h+f,p+m,E+v).normalize();else if(t===su)i[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(e){Ps.center.set(0,0,0);const t=Kx.distanceTo(e.center);return Ps.radius=.7071067811865476+t,Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(dc.x=i.normal.x>0?e.max.x:e.min.x,dc.y=i.normal.y>0?e.max.y:e.min.y,dc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(dc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class O_ extends fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ou=new X,au=new X,om=new xt,Oa=new Tu,fc=new vr,cd=new X,am=new X;class Uh extends ln{constructor(e=new wi,t=new O_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ou.fromBufferAttribute(t,i-1),au.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ou.distanceTo(au);e.setAttribute("lineDistance",new kr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(i),fc.radius+=s,e.ray.intersectsSphere(fc)===!1)return;om.copy(i).invert(),Oa.copy(e.ray).applyMatrix4(om);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),x=u.getX(g+1),y=hc(this,e,Oa,l,p,x,g);y&&t.push(y)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=hc(this,e,Oa,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=hc(this,e,Oa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=hc(this,e,Oa,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(ou.fromBufferAttribute(a,i),au.fromBufferAttribute(a,s),t.distanceSqToSegment(ou,au,cd,am)>n)return;cd.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(cd);if(!(c<e.near||c>e.far))return{distance:c,point:am.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const lm=new X,cm=new X;class Zx extends Uh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)lm.fromBufferAttribute(t,i),cm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+lm.distanceTo(cm);e.setAttribute("lineDistance",new kr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jx extends Uh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class N_ extends fr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const um=new xt,Df=new Tu,pc=new vr,mc=new X;class If extends ln{constructor(e=new wi,t=new N_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pc.copy(n.boundingSphere),pc.applyMatrix4(i),pc.radius+=s,e.ray.intersectsSphere(pc)===!1)return;um.copy(i).invert(),Df.copy(e.ray).applyMatrix4(um);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);mc.fromBufferAttribute(d,m),dm(mc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)mc.fromBufferAttribute(d,_),dm(mc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function dm(r,e,t,n,i,s,o){const a=Df.distanceSqToPoint(r);if(a<t){const l=new X;Df.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class U_ extends wn{constructor(e,t,n=so,i,s,o,a=ni,l=ni,c,u=wl,d=1){if(u!==wl&&u!==Ml)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class F_ extends wn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Gi extends wi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let y=0;y<c;y++){const v=y*d-s;_.push(v,-x,0),g.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const y=x+c*p,v=x+c*(p+1),E=x+1+c*(p+1),T=x+1+c*p;h.push(y,v,T),h.push(v,E,T)}this.setIndex(h),this.setAttribute("position",new kr(_,3)),this.setAttribute("normal",new kr(g,3)),this.setAttribute("uv",new kr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Fh extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=b_,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yr extends Fh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Qx extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eb extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function gc(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function tb(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function nb(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function fm(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function k_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Gl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ib extends Gl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cp,endingEnd:Cp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Rp:s=e,a=2*t-n;break;case Pp:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Rp:o=e,l=2*n-t;break;case Pp:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,x=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,y=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+x*o[c+E]+y*o[l+E]+v*o[d+E];return s}}class rb extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class sb extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gc(t,this.TimeBufferType),this.values=gc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gc(e.times,Array),values:gc(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ib(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case El:t=this.InterpolantFactoryMethodDiscrete;break;case Tl:t=this.InterpolantFactoryMethodLinear;break;case ku:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return El;case this.InterpolantFactoryMethodLinear:return Tl;case this.InterpolantFactoryMethodSmooth:return ku}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&tb(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ku,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zi.prototype.ValueTypeName="";Zi.prototype.TimeBufferType=Float32Array;Zi.prototype.ValueBufferType=Float32Array;Zi.prototype.DefaultInterpolation=Tl;class Ma extends Zi{constructor(e,t,n){super(e,t,n)}}Ma.prototype.ValueTypeName="bool";Ma.prototype.ValueBufferType=Array;Ma.prototype.DefaultInterpolation=El;Ma.prototype.InterpolantFactoryMethodLinear=void 0;Ma.prototype.InterpolantFactoryMethodSmooth=void 0;class B_ extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}B_.prototype.ValueTypeName="color";class ha extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}ha.prototype.ValueTypeName="number";class ob extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)ws.slerpFlat(s,0,o,c-a,o,c,l);return s}}class pa extends Zi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ob(this.times,this.values,this.getValueSize(),e)}}pa.prototype.ValueTypeName="quaternion";pa.prototype.InterpolantFactoryMethodSmooth=void 0;class Ea extends Zi{constructor(e,t,n){super(e,t,n)}}Ea.prototype.ValueTypeName="string";Ea.prototype.ValueBufferType=Array;Ea.prototype.DefaultInterpolation=El;Ea.prototype.InterpolantFactoryMethodLinear=void 0;Ea.prototype.InterpolantFactoryMethodSmooth=void 0;class ma extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}ma.prototype.ValueTypeName="vector";class ab{constructor(e="",t=-1,n=[],i=Hy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ji(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(cb(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Zi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=nb(l);l=fm(l,1,u),c=fm(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ha(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];k_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let x=0;x!==f[_].morphTargets.length;++x){const y=f[_];m.push(y.time),p.push(y.morphTarget===g?1:0)}i.push(new ha(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(ma,h+".position",f,"pos",i),n(pa,h+".quaternion",f,"rot",i),n(ma,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function lb(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ha;case"vector":case"vector2":case"vector3":case"vector4":return ma;case"color":return B_;case"quaternion":return pa;case"bool":case"boolean":return Ma;case"string":return Ea}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function cb(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=lb(r.type);if(r.times===void 0){const t=[],n=[];k_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Or={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class ub{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const db=new ub;class ho{constructor(e){this.manager=e!==void 0?e:db,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ho.DEFAULT_MATERIAL_NAME="__DEFAULT";const Er={};class fb extends Error{constructor(e,t){super(e),this.response=t}}class lu extends ho{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Or.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Er[e]!==void 0){Er[e].push({onLoad:t,onProgress:n,onError:i});return}Er[e]=[],Er[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Er[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){x();function x(){d.read().then(({done:y,value:v})=>{if(y)p.close();else{g+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let T=0,S=u.length;T<S;T++){const P=u[T];P.onProgress&&P.onProgress(E)}p.enqueue(v),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new fb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Or.add(`file:${e}`,c);const u=Er[e];delete Er[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=Er[e];if(u===void 0)throw this.manager.itemError(e),c;delete Er[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Oo=new WeakMap;class hb extends ho{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=Oo.get(o);d===void 0&&(d=[],Oo.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Al("img");function l(){u(),t&&t(this);const d=Oo.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}Oo.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),Or.remove(`image:${e}`);const f=Oo.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}Oo.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Or.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class pb extends ho{constructor(e){super(e)}load(e,t,n,i){const s=new wn,o=new hb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Au extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ud=new xt,hm=new X,pm=new X;class kh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=mr,this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nh,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;hm.setFromMatrixPosition(e.matrixWorld),t.position.copy(hm),pm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pm),t.updateMatrixWorld(),ud.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ud,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ud)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class mb extends kh{constructor(){super(new ri(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=da*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class gb extends Au{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new mb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const mm=new xt,Na=new X,dd=new X;class _b extends kh{constructor(){super(new ri(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new zt(2,1,1,1),new zt(0,1,1,1),new zt(3,1,1,1),new zt(1,1,1,1),new zt(3,0,1,1),new zt(1,0,1,1)],this._cubeDirections=[new X(1,0,0),new X(-1,0,0),new X(0,0,1),new X(0,0,-1),new X(0,1,0),new X(0,-1,0)],this._cubeUps=[new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,0,1),new X(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Na.setFromMatrixPosition(e.matrixWorld),n.position.copy(Na),dd.copy(n.position),dd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(dd),n.updateMatrixWorld(),i.makeTranslation(-Na.x,-Na.y,-Na.z),mm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mm,n.coordinateSystem,n.reversedDepth)}}class vb extends Au{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _b}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Cu extends P_{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yb extends kh{constructor(){super(new Cu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class z_ extends Au{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new yb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xb extends Au{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rl{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const fd=new WeakMap;class bb extends ho{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(fd.has(o)===!0)i&&i(fd.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Or.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),fd.set(l,c),Or.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Or.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Sb extends ri{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bh="\\[\\]\\.:\\/",wb=new RegExp("["+Bh+"]","g"),zh="[^"+Bh+"]",Mb="[^"+Bh.replace("\\.","")+"]",Eb=/((?:WC+[\/:])*)/.source.replace("WC",zh),Tb=/(WCOD+)?/.source.replace("WCOD",Mb),Ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zh),Cb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zh),Rb=new RegExp("^"+Eb+Tb+Ab+Cb+"$"),Pb=["material","materials","bones","map"];class Lb{constructor(e,t,n){const i=n||qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class qt{constructor(e,t,n){this.path=t,this.parsedPath=n||qt.parseTrackName(t),this.node=qt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new qt.Composite(e,t,n):new qt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wb,"")}static parseTrackName(e){const t=Rb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Pb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=qt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}qt.Composite=Lb;qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qt.prototype.GetterByBindingType=[qt.prototype._getValue_direct,qt.prototype._getValue_array,qt.prototype._getValue_arrayElement,qt.prototype._getValue_toArray];qt.prototype.SetterByBindingTypeAndVersioning=[[qt.prototype._setValue_direct,qt.prototype._setValue_direct_setNeedsUpdate,qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_array,qt.prototype._setValue_array_setNeedsUpdate,qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_arrayElement,qt.prototype._setValue_arrayElement_setNeedsUpdate,qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_fromArray,qt.prototype._setValue_fromArray_setNeedsUpdate,qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function gm(r,e,t,n){const i=Db(n);switch(t){case __:return r*e;case Ah:return r*e/i.components*i.byteLength;case Ch:return r*e/i.components*i.byteLength;case y_:return r*e*2/i.components*i.byteLength;case Rh:return r*e*2/i.components*i.byteLength;case v_:return r*e*3/i.components*i.byteLength;case Ii:return r*e*4/i.components*i.byteLength;case Ph:return r*e*4/i.components*i.byteLength;case zc:case Hc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Vc:case Gc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case tf:case rf:return Math.max(r,16)*Math.max(e,8)/4;case ef:case nf:return Math.max(r,8)*Math.max(e,8)/2;case sf:case of:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case af:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case lf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case cf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case uf:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case df:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case ff:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case hf:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case pf:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case mf:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case gf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case _f:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case vf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case yf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case xf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case bf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Sf:case wf:case Mf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Ef:case Tf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Af:case Cf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Db(r){switch(r){case mr:case h_:return{byteLength:1,components:1};case bl:case p_:case Hl:return{byteLength:2,components:1};case Eh:case Th:return{byteLength:2,components:4};case so:case Mh:case Yi:return{byteLength:4,components:1};case m_:case g_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function H_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ib(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Ob=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nb=`#ifdef USE_ALPHAHASH
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
#endif`,Ub=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zb=`#ifdef USE_AOMAP
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
#endif`,Hb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vb=`#ifdef USE_BATCHING
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
#endif`,Gb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yb=`#ifdef USE_IRIDESCENCE
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
#endif`,jb=`#ifdef USE_BUMPMAP
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
#endif`,$b=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,iS=`#define PI 3.141592653589793
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
} // validated`,rS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sS=`vec3 transformedNormal = objectNormal;
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
#endif`,oS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uS="gl_FragColor = linearToOutputTexel( gl_FragColor );",dS=`vec4 LinearTransferOETF( in vec4 value ) {
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
#endif`,hS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pS=`#ifdef USE_ENVMAP
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
#endif`,mS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gS=`#ifdef USE_ENVMAP
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
#endif`,_S=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xS=`#ifdef USE_FOG
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
}`,SS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wS=`LambertMaterial material;
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
#endif`,TS=`#ifdef USE_ENVMAP
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
#endif`,AS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,CS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,RS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PS=`varying vec3 vViewPosition;
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
#endif`,DS=`struct PhysicalMaterial {
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
}`,IS=`
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
#endif`,NS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,US=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,GS=`#if defined( USE_POINTS_UV )
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
#endif`,WS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$S=`#ifdef USE_MORPHTARGETS
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
#endif`,KS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,JS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,QS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nw=`#ifdef USE_NORMALMAP
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
#endif`,iw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ow=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
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
#endif`,gw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_w=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vw=`float getShadowMask() {
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
}`,yw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xw=`#ifdef USE_SKINNING
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
#endif`,bw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sw=`#ifdef USE_SKINNING
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
#endif`,ww=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ew=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Aw=`#ifdef USE_TRANSMISSION
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
#endif`,Cw=`#ifdef USE_TRANSMISSION
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
#endif`,Rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Iw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ow=`uniform sampler2D t2D;
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
}`,Nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bw=`#include <common>
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
}`,zw=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hw=`#define DISTANCE
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
}`,Vw=`#define DISTANCE
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
}`,Gw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ww=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xw=`uniform float scale;
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
}`,qw=`uniform vec3 diffuse;
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
}`,Yw=`#include <common>
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
}`,jw=`uniform vec3 diffuse;
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
}`,$w=`#define LAMBERT
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
}`,Kw=`#define LAMBERT
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
}`,Zw=`#define MATCAP
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
}`,Jw=`#define MATCAP
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
}`,Qw=`#define NORMAL
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
}`,eM=`#define NORMAL
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
}`,tM=`#define PHONG
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
}`,nM=`#define PHONG
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
}`,iM=`#define STANDARD
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
}`,rM=`#define STANDARD
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
}`,sM=`#define TOON
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
}`,oM=`#define TOON
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
}`,aM=`uniform float size;
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
}`,lM=`uniform vec3 diffuse;
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
}`,cM=`#include <common>
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
}`,uM=`uniform vec3 color;
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
}`,dM=`uniform float rotation;
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
}`,yt={alphahash_fragment:Ob,alphahash_pars_fragment:Nb,alphamap_fragment:Ub,alphamap_pars_fragment:Fb,alphatest_fragment:kb,alphatest_pars_fragment:Bb,aomap_fragment:zb,aomap_pars_fragment:Hb,batching_pars_vertex:Vb,batching_vertex:Gb,begin_vertex:Wb,beginnormal_vertex:Xb,bsdfs:qb,iridescence_fragment:Yb,bumpmap_pars_fragment:jb,clipping_planes_fragment:$b,clipping_planes_pars_fragment:Kb,clipping_planes_pars_vertex:Zb,clipping_planes_vertex:Jb,color_fragment:Qb,color_pars_fragment:eS,color_pars_vertex:tS,color_vertex:nS,common:iS,cube_uv_reflection_fragment:rS,defaultnormal_vertex:sS,displacementmap_pars_vertex:oS,displacementmap_vertex:aS,emissivemap_fragment:lS,emissivemap_pars_fragment:cS,colorspace_fragment:uS,colorspace_pars_fragment:dS,envmap_fragment:fS,envmap_common_pars_fragment:hS,envmap_pars_fragment:pS,envmap_pars_vertex:mS,envmap_physical_pars_fragment:TS,envmap_vertex:gS,fog_vertex:_S,fog_pars_vertex:vS,fog_fragment:yS,fog_pars_fragment:xS,gradientmap_pars_fragment:bS,lightmap_pars_fragment:SS,lights_lambert_fragment:wS,lights_lambert_pars_fragment:MS,lights_pars_begin:ES,lights_toon_fragment:AS,lights_toon_pars_fragment:CS,lights_phong_fragment:RS,lights_phong_pars_fragment:PS,lights_physical_fragment:LS,lights_physical_pars_fragment:DS,lights_fragment_begin:IS,lights_fragment_maps:OS,lights_fragment_end:NS,logdepthbuf_fragment:US,logdepthbuf_pars_fragment:FS,logdepthbuf_pars_vertex:kS,logdepthbuf_vertex:BS,map_fragment:zS,map_pars_fragment:HS,map_particle_fragment:VS,map_particle_pars_fragment:GS,metalnessmap_fragment:WS,metalnessmap_pars_fragment:XS,morphinstance_vertex:qS,morphcolor_vertex:YS,morphnormal_vertex:jS,morphtarget_pars_vertex:$S,morphtarget_vertex:KS,normal_fragment_begin:ZS,normal_fragment_maps:JS,normal_pars_fragment:QS,normal_pars_vertex:ew,normal_vertex:tw,normalmap_pars_fragment:nw,clearcoat_normal_fragment_begin:iw,clearcoat_normal_fragment_maps:rw,clearcoat_pars_fragment:sw,iridescence_pars_fragment:ow,opaque_fragment:aw,packing:lw,premultiplied_alpha_fragment:cw,project_vertex:uw,dithering_fragment:dw,dithering_pars_fragment:fw,roughnessmap_fragment:hw,roughnessmap_pars_fragment:pw,shadowmap_pars_fragment:mw,shadowmap_pars_vertex:gw,shadowmap_vertex:_w,shadowmask_pars_fragment:vw,skinbase_vertex:yw,skinning_pars_vertex:xw,skinning_vertex:bw,skinnormal_vertex:Sw,specularmap_fragment:ww,specularmap_pars_fragment:Mw,tonemapping_fragment:Ew,tonemapping_pars_fragment:Tw,transmission_fragment:Aw,transmission_pars_fragment:Cw,uv_pars_fragment:Rw,uv_pars_vertex:Pw,uv_vertex:Lw,worldpos_vertex:Dw,background_vert:Iw,background_frag:Ow,backgroundCube_vert:Nw,backgroundCube_frag:Uw,cube_vert:Fw,cube_frag:kw,depth_vert:Bw,depth_frag:zw,distanceRGBA_vert:Hw,distanceRGBA_frag:Vw,equirect_vert:Gw,equirect_frag:Ww,linedashed_vert:Xw,linedashed_frag:qw,meshbasic_vert:Yw,meshbasic_frag:jw,meshlambert_vert:$w,meshlambert_frag:Kw,meshmatcap_vert:Zw,meshmatcap_frag:Jw,meshnormal_vert:Qw,meshnormal_frag:eM,meshphong_vert:tM,meshphong_frag:nM,meshphysical_vert:iM,meshphysical_frag:rM,meshtoon_vert:sM,meshtoon_frag:oM,points_vert:aM,points_frag:lM,shadow_vert:cM,shadow_frag:uM,sprite_vert:dM,sprite_frag:fM},Ue={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},sr={basic:{uniforms:jn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:jn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Qe(0)}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:jn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:jn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:jn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Qe(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:jn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:jn([Ue.points,Ue.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:jn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:jn([Ue.common,Ue.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:jn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:jn([Ue.sprite,Ue.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distanceRGBA:{uniforms:jn([Ue.common,Ue.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distanceRGBA_vert,fragmentShader:yt.distanceRGBA_frag},shadow:{uniforms:jn([Ue.lights,Ue.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};sr.physical={uniforms:jn([sr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const _c={r:0,b:0,g:0},Ls=new gr,hM=new xt;function pM(r,e,t,n,i,s,o){const a=new Qe(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function g(y){let v=!1;const E=_(y);E===null?p(a,l):E&&E.isColor&&(p(E,1),v=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,v){const E=_(v);E&&(E.isCubeTexture||E.mapping===Eu)?(u===void 0&&(u=new ti(new Vl(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:fa(sr.backgroundCube.uniforms),vertexShader:sr.backgroundCube.vertexShader,fragmentShader:sr.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,S,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ls.copy(v.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(hM.makeRotationFromEuler(Ls)),u.material.toneMapped=Lt.getTransfer(E.colorSpace)!==Yt,(d!==E||f!==E.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new ti(new Gi(2,2),new Oi({name:"BackgroundMaterial",uniforms:fa(sr.background.uniforms),vertexShader:sr.background.vertexShader,fragmentShader:sr.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Lt.getTransfer(E.colorSpace)!==Yt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(_c,R_(r)),n.buffers.color.setClear(_c.r,_c.g,_c.b,v,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:m,dispose:x}}function mM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,L,U,W,F){let q=!1;const j=d(W,U,L);s!==j&&(s=j,c(s.object)),q=h(M,W,U,F),q&&_(M,W,U,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(M,L,U,W),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function u(M){return r.deleteVertexArray(M)}function d(M,L,U){const W=U.wireframe===!0;let F=n[M.id];F===void 0&&(F={},n[M.id]=F);let q=F[L.id];q===void 0&&(q={},F[L.id]=q);let j=q[W];return j===void 0&&(j=f(l()),q[W]=j),j}function f(M){const L=[],U=[],W=[];for(let F=0;F<t;F++)L[F]=0,U[F]=0,W[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:W,object:M,attributes:{},index:null}}function h(M,L,U,W){const F=s.attributes,q=L.attributes;let j=0;const C=U.getAttributes();for(const Y in C)if(C[Y].location>=0){const O=F[Y];let _e=q[Y];if(_e===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(_e=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(_e=M.instanceColor)),O===void 0||O.attribute!==_e||_e&&O.data!==_e.data)return!0;j++}return s.attributesNum!==j||s.index!==W}function _(M,L,U,W){const F={},q=L.attributes;let j=0;const C=U.getAttributes();for(const Y in C)if(C[Y].location>=0){let O=q[Y];O===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(O=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(O=M.instanceColor));const _e={};_e.attribute=O,O&&O.data&&(_e.data=O.data),F[Y]=_e,j++}s.attributes=F,s.attributesNum=j,s.index=W}function g(){const M=s.newAttributes;for(let L=0,U=M.length;L<U;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const U=s.newAttributes,W=s.enabledAttributes,F=s.attributeDivisors;U[M]=1,W[M]===0&&(r.enableVertexAttribArray(M),W[M]=1),F[M]!==L&&(r.vertexAttribDivisor(M,L),F[M]=L)}function x(){const M=s.newAttributes,L=s.enabledAttributes;for(let U=0,W=L.length;U<W;U++)L[U]!==M[U]&&(r.disableVertexAttribArray(U),L[U]=0)}function y(M,L,U,W,F,q,j){j===!0?r.vertexAttribIPointer(M,L,U,F,q):r.vertexAttribPointer(M,L,U,W,F,q)}function v(M,L,U,W){g();const F=W.attributes,q=U.getAttributes(),j=L.defaultAttributeValues;for(const C in q){const Y=q[C];if(Y.location>=0){let he=F[C];if(he===void 0&&(C==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),C==="instanceColor"&&M.instanceColor&&(he=M.instanceColor)),he!==void 0){const O=he.normalized,_e=he.itemSize,ve=e.get(he);if(ve===void 0)continue;const Q=ve.buffer,qe=ve.type,He=ve.bytesPerElement,ee=qe===r.INT||qe===r.UNSIGNED_INT||he.gpuType===Mh;if(he.isInterleavedBufferAttribute){const re=he.data,Se=re.stride,Ge=he.offset;if(re.isInstancedInterleavedBuffer){for(let ye=0;ye<Y.locationSize;ye++)p(Y.location+ye,re.meshPerAttribute);M.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ye=0;ye<Y.locationSize;ye++)m(Y.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let ye=0;ye<Y.locationSize;ye++)y(Y.location+ye,_e/Y.locationSize,qe,O,Se*He,(Ge+_e/Y.locationSize*ye)*He,ee)}else{if(he.isInstancedBufferAttribute){for(let re=0;re<Y.locationSize;re++)p(Y.location+re,he.meshPerAttribute);M.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let re=0;re<Y.locationSize;re++)m(Y.location+re);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let re=0;re<Y.locationSize;re++)y(Y.location+re,_e/Y.locationSize,qe,O,_e*He,_e/Y.locationSize*re*He,ee)}}else if(j!==void 0){const O=j[C];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(Y.location,O);break;case 3:r.vertexAttrib3fv(Y.location,O);break;case 4:r.vertexAttrib4fv(Y.location,O);break;default:r.vertexAttrib1fv(Y.location,O)}}}}x()}function E(){P();for(const M in n){const L=n[M];for(const U in L){const W=L[U];for(const F in W)u(W[F].object),delete W[F];delete L[U]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const U in L){const W=L[U];for(const F in W)u(W[F].object),delete W[F];delete L[U]}delete n[M.id]}function S(M){for(const L in n){const U=n[L];if(U[M.id]===void 0)continue;const W=U[M.id];for(const F in W)u(W[F].object),delete W[F];delete U[M.id]}}function P(){b(),o=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:S,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function gM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _M(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(S){return!(S!==Ii&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const P=S===Hl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==mr&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Yi&&!P)}function l(S){if(S==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:T}}function vM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Fs,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const x=s?0:n,y=x*4;let v=p.clippingState||null;l.value=v,v=u(_,f,y,h);for(let E=0;E!==y;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=h;y!==g;++y,v+=4)o.copy(d[y]).applyMatrix4(x,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function yM(r){let e=new WeakMap;function t(o,a){return a===Jd?o.mapping=la:a===Qd&&(o.mapping=ca),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Jd||a===Qd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zx(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Wo=4,_m=[.125,.215,.35,.446,.526,.582],Ws=20,hd=new Cu,vm=new Qe;let pd=null,md=0,gd=0,_d=!1;const ks=(1+Math.sqrt(5))/2,No=1/ks,ym=[new X(-ks,No,0),new X(ks,No,0),new X(-No,0,ks),new X(No,0,ks),new X(0,ks,-No),new X(0,ks,No),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)],xM=new X;class xm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=xM}=s;pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel(),_d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pd,md,gd),this._renderer.xr.enabled=_d,e.scissorTest=!1,vc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===la||e.mapping===ca?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel(),_d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Hl,format:Ii,colorSpace:Wn,depthBuffer:!1},i=bm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bm(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bM(s)),this._blurMaterial=SM(s,e,t)}return i}_compileMaterial(e){const t=new ti(this._lodPlanes[0],e);this._renderer.compile(t,hd)}_sceneToCubeUV(e,t,n,i,s){const l=new ri(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(vm),d.toneMapping=ps,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));const g=new Xs({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1}),m=new ti(new Vl,g);let p=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,p=!0):(g.color.copy(vm),p=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[y],s.y,s.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[y]));const E=this._cubeSize;vc(i,v*E,y>2?E:0,E,E),d.setRenderTarget(i),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===la||e.mapping===ca;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sm());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ti(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;vc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,hd)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ym[(i-s-1)%ym.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ti(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ws-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Ws;m>Ws&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ws}`);const p=[];let x=0;for(let S=0;S<Ws;++S){const P=S/g,b=Math.exp(-P*P/2);p.push(b),S===0?x+=b:S<m&&(x+=2*b)}for(let S=0;S<p.length;S++)p[S]=p[S]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=_,f.mipInt.value=y-n;const v=this._sizeLods[i],E=3*v*(i>y-Wo?i-y+Wo:0),T=4*(this._cubeSize-v);vc(t,E,T,3*v,2*v),l.setRenderTarget(t),l.render(d,hd)}}function bM(r){const e=[],t=[],n=[];let i=r;const s=r-Wo+1+_m.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Wo?l=_m[o-r+Wo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*h),y=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let T=0;T<h;T++){const S=T%3*2/3-1,P=T>2?0:-1,b=[S,P,0,S+2/3,P,0,S+2/3,P+1,0,S,P,0,S+2/3,P+1,0,S,P+1,0];x.set(b,g*_*T),y.set(f,m*_*T);const M=[T,T,T,T,T,T];v.set(M,p*_*T)}const E=new wi;E.setAttribute("position",new Bt(x,g)),E.setAttribute("uv",new Bt(y,m)),E.setAttribute("faceIndex",new Bt(v,p)),e.push(E),i>Wo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function bm(r,e,t){const n=new oo(r,e,t);return n.texture.mapping=Eu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vc(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function SM(r,e,t){const n=new Float32Array(Ws),i=new X(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Sm(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function wm(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Hh(){return`

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
	`}function wM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Jd||l===Qd,u=l===la||l===ca;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new xm(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new xm(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function MM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Cl("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function EM(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const x=h.array;g=h.version;for(let y=0,v=x.length;y<v;y+=3){const E=x[y+0],T=x[y+1],S=x[y+2];f.push(E,T,T,S,S,E)}}else if(_!==void 0){const x=_.array;g=_.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const E=y+0,T=y+1,S=y+2;f.push(E,T,T,S,S,E)}}else return;const m=new(w_(f)?C_:A_)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function TM(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let x=0;x<_;x++)p+=h[x]*g[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function AM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function CM(r,e,t){const n=new WeakMap,i=new zt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var h=M;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const S=new Float32Array(E*T*4*d),P=new M_(S,E,T,d);P.type=Yi,P.needsUpdate=!0;const b=v*4;for(let L=0;L<d;L++){const U=p[L],W=x[L],F=y[L],q=E*T*4*L;for(let j=0;j<U.count;j++){const C=j*b;_===!0&&(i.fromBufferAttribute(U,j),S[q+C+0]=i.x,S[q+C+1]=i.y,S[q+C+2]=i.z,S[q+C+3]=0),g===!0&&(i.fromBufferAttribute(W,j),S[q+C+4]=i.x,S[q+C+5]=i.y,S[q+C+6]=i.z,S[q+C+7]=0),m===!0&&(i.fromBufferAttribute(F,j),S[q+C+8]=i.x,S[q+C+9]=i.y,S[q+C+10]=i.z,S[q+C+11]=F.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new Ct(E,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function RM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const V_=new wn,Mm=new U_(1,1),G_=new M_,W_=new wx,X_=new L_,Em=[],Tm=[],Am=new Float32Array(16),Cm=new Float32Array(9),Rm=new Float32Array(4);function Ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Em[i];if(s===void 0&&(s=new Float32Array(i),Em[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Mn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function En(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ru(r,e){let t=Tm[e];t===void 0&&(t=new Int32Array(e),Tm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function PM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function LM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2fv(this.addr,e),En(t,e)}}function DM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mn(t,e))return;r.uniform3fv(this.addr,e),En(t,e)}}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4fv(this.addr,e),En(t,e)}}function OM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),En(t,e)}else{if(Mn(t,n))return;Rm.set(n),r.uniformMatrix2fv(this.addr,!1,Rm),En(t,n)}}function NM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),En(t,e)}else{if(Mn(t,n))return;Cm.set(n),r.uniformMatrix3fv(this.addr,!1,Cm),En(t,n)}}function UM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),En(t,e)}else{if(Mn(t,n))return;Am.set(n),r.uniformMatrix4fv(this.addr,!1,Am),En(t,n)}}function FM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function kM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2iv(this.addr,e),En(t,e)}}function BM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mn(t,e))return;r.uniform3iv(this.addr,e),En(t,e)}}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4iv(this.addr,e),En(t,e)}}function HM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2uiv(this.addr,e),En(t,e)}}function GM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mn(t,e))return;r.uniform3uiv(this.addr,e),En(t,e)}}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4uiv(this.addr,e),En(t,e)}}function XM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Mm.compareFunction=S_,s=Mm):s=V_,t.setTexture2D(e||s,i)}function qM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||W_,i)}function YM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||X_,i)}function jM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||G_,i)}function $M(r){switch(r){case 5126:return PM;case 35664:return LM;case 35665:return DM;case 35666:return IM;case 35674:return OM;case 35675:return NM;case 35676:return UM;case 5124:case 35670:return FM;case 35667:case 35671:return kM;case 35668:case 35672:return BM;case 35669:case 35673:return zM;case 5125:return HM;case 36294:return VM;case 36295:return GM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return XM;case 35679:case 36299:case 36307:return qM;case 35680:case 36300:case 36308:case 36293:return YM;case 36289:case 36303:case 36311:case 36292:return jM}}function KM(r,e){r.uniform1fv(this.addr,e)}function ZM(r,e){const t=Ta(e,this.size,2);r.uniform2fv(this.addr,t)}function JM(r,e){const t=Ta(e,this.size,3);r.uniform3fv(this.addr,t)}function QM(r,e){const t=Ta(e,this.size,4);r.uniform4fv(this.addr,t)}function eE(r,e){const t=Ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tE(r,e){const t=Ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nE(r,e){const t=Ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function iE(r,e){r.uniform1iv(this.addr,e)}function rE(r,e){r.uniform2iv(this.addr,e)}function sE(r,e){r.uniform3iv(this.addr,e)}function oE(r,e){r.uniform4iv(this.addr,e)}function aE(r,e){r.uniform1uiv(this.addr,e)}function lE(r,e){r.uniform2uiv(this.addr,e)}function cE(r,e){r.uniform3uiv(this.addr,e)}function uE(r,e){r.uniform4uiv(this.addr,e)}function dE(r,e,t){const n=this.cache,i=e.length,s=Ru(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||V_,s[o])}function fE(r,e,t){const n=this.cache,i=e.length,s=Ru(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||W_,s[o])}function hE(r,e,t){const n=this.cache,i=e.length,s=Ru(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||X_,s[o])}function pE(r,e,t){const n=this.cache,i=e.length,s=Ru(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||G_,s[o])}function mE(r){switch(r){case 5126:return KM;case 35664:return ZM;case 35665:return JM;case 35666:return QM;case 35674:return eE;case 35675:return tE;case 35676:return nE;case 5124:case 35670:return iE;case 35667:case 35671:return rE;case 35668:case 35672:return sE;case 35669:case 35673:return oE;case 5125:return aE;case 36294:return lE;case 36295:return cE;case 36296:return uE;case 35678:case 36198:case 36298:case 36306:case 35682:return dE;case 35679:case 36299:case 36307:return fE;case 35680:case 36300:case 36308:case 36293:return hE;case 36289:case 36303:case 36311:case 36292:return pE}}class gE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$M(t.type)}}class _E{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mE(t.type)}}class vE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const vd=/(\w+)(\])?(\[|\.)?/g;function Pm(r,e){r.seq.push(e),r.map[e.id]=e}function yE(r,e,t){const n=r.name,i=n.length;for(vd.lastIndex=0;;){const s=vd.exec(n),o=vd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Pm(t,c===void 0?new gE(a,r,e):new _E(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new vE(a),Pm(t,d)),t=d}}}class Wc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);yE(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Lm(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const xE=37297;let bE=0;function SE(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Dm=new gt;function wE(r){Lt._getMatrix(Dm,Lt.workingColorSpace,r);const e=`mat3( ${Dm.elements.map(t=>t.toFixed(4))} )`;switch(Lt.getTransfer(r)){case ru:return[e,"LinearTransferOETF"];case Yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Im(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+SE(r.getShaderSource(e),a)}else return s}function ME(r,e){const t=wE(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function EE(r,e){let t;switch(e){case Iy:t="Linear";break;case Oy:t="Reinhard";break;case Ny:t="Cineon";break;case Uy:t="ACESFilmic";break;case ky:t="AgX";break;case By:t="Neutral";break;case Fy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const yc=new X;function TE(){Lt.getLuminanceCoefficients(yc);const r=yc.x.toFixed(4),e=yc.y.toFixed(4),t=yc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wa).join(`
`)}function CE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function RE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Wa(r){return r!==""}function Om(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Of(r){return r.replace(PE,DE)}const LE=new Map;function DE(r,e){let t=yt[e];if(t===void 0){const n=LE.get(e);if(n!==void 0)t=yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Of(t)}const IE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Um(r){return r.replace(IE,OE)}function OE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Fm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function NE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===c_?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===fy?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ar&&(e="SHADOWMAP_TYPE_VSM"),e}function UE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case la:case ca:e="ENVMAP_TYPE_CUBE";break;case Eu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ca:e="ENVMAP_MODE_REFRACTION";break}return e}function kE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case u_:e="ENVMAP_BLENDING_MULTIPLY";break;case Ly:e="ENVMAP_BLENDING_MIX";break;case Dy:e="ENVMAP_BLENDING_ADD";break}return e}function BE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=NE(t),c=UE(t),u=FE(t),d=kE(t),f=BE(t),h=AE(t),_=CE(s),g=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Wa).join(`
`),p.length>0&&(p+=`
`)):(m=[Fm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wa).join(`
`),p=[Fm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ps?"#define TONE_MAPPING":"",t.toneMapping!==ps?yt.tonemapping_pars_fragment:"",t.toneMapping!==ps?EE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,ME("linearToOutputTexel",t.outputColorSpace),TE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wa).join(`
`)),o=Of(o),o=Om(o,t),o=Nm(o,t),a=Of(a),a=Om(a,t),a=Nm(a,t),o=Um(o),a=Um(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Dp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+o,v=x+p+a,E=Lm(i,i.VERTEX_SHADER,y),T=Lm(i,i.FRAGMENT_SHADER,v);i.attachShader(g,E),i.attachShader(g,T),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function S(L){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(g)||"",W=i.getShaderInfoLog(E)||"",F=i.getShaderInfoLog(T)||"",q=U.trim(),j=W.trim(),C=F.trim();let Y=!0,he=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,E,T);else{const O=Im(i,E,"vertex"),_e=Im(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+q+`
`+O+`
`+_e)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(j===""||C==="")&&(he=!1);he&&(L.diagnostics={runnable:Y,programLog:q,vertexShader:{log:j,prefix:m},fragmentShader:{log:C,prefix:p}})}i.deleteShader(E),i.deleteShader(T),P=new Wc(i,g),b=RE(i,g)}let P;this.getUniforms=function(){return P===void 0&&S(this),P};let b;this.getAttributes=function(){return b===void 0&&S(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,xE)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=T,this}let HE=0;class VE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new GE(e),t.set(e,n)),n}}class GE{constructor(e){this.id=HE++,this.code=e,this.usedTimes=0}}function WE(r,e,t,n,i,s,o){const a=new E_,l=new VE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,U,W){const F=U.fog,q=W.geometry,j=b.isMeshStandardMaterial?U.environment:null,C=(b.isMeshStandardMaterial?t:e).get(b.envMap||j),Y=C&&C.mapping===Eu?C.image.height:null,he=_[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const O=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,_e=O!==void 0?O.length:0;let ve=0;q.morphAttributes.position!==void 0&&(ve=1),q.morphAttributes.normal!==void 0&&(ve=2),q.morphAttributes.color!==void 0&&(ve=3);let Q,qe,He,ee;if(he){const Oe=sr[he];Q=Oe.vertexShader,qe=Oe.fragmentShader}else Q=b.vertexShader,qe=b.fragmentShader,l.update(b),He=l.getVertexShaderID(b),ee=l.getFragmentShaderID(b);const re=r.getRenderTarget(),Se=r.state.buffers.depth.getReversed(),Ge=W.isInstancedMesh===!0,ye=W.isBatchedMesh===!0,it=!!b.map,ft=!!b.matcap,I=!!C,st=!!b.aoMap,Ke=!!b.lightMap,Ye=!!b.bumpMap,B=!!b.normalMap,ht=!!b.displacementMap,Fe=!!b.emissiveMap,ot=!!b.metalnessMap,lt=!!b.roughnessMap,_t=b.anisotropy>0,D=b.clearcoat>0,A=b.dispersion>0,G=b.iridescence>0,se=b.sheen>0,ae=b.transmission>0,$=_t&&!!b.anisotropyMap,Te=D&&!!b.clearcoatMap,pe=D&&!!b.clearcoatNormalMap,Ee=D&&!!b.clearcoatRoughnessMap,we=G&&!!b.iridescenceMap,ge=G&&!!b.iridescenceThicknessMap,ne=se&&!!b.sheenColorMap,We=se&&!!b.sheenRoughnessMap,Ie=!!b.specularMap,be=!!b.specularColorMap,Le=!!b.specularIntensityMap,N=ae&&!!b.transmissionMap,me=ae&&!!b.thicknessMap,oe=!!b.gradientMap,Pe=!!b.alphaMap,le=b.alphaTest>0,ue=!!b.alphaHash,Be=!!b.extensions;let rt=ps;b.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(rt=r.toneMapping);const Ot={shaderID:he,shaderType:b.type,shaderName:b.name,vertexShader:Q,fragmentShader:qe,defines:b.defines,customVertexShaderID:He,customFragmentShaderID:ee,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:ye,batchingColor:ye&&W._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&W.instanceColor!==null,instancingMorph:Ge&&W.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Wn,alphaToCoverage:!!b.alphaToCoverage,map:it,matcap:ft,envMap:I,envMapMode:I&&C.mapping,envMapCubeUVHeight:Y,aoMap:st,lightMap:Ke,bumpMap:Ye,normalMap:B,displacementMap:f&&ht,emissiveMap:Fe,normalMapObjectSpace:B&&b.normalMapType===Xy,normalMapTangentSpace:B&&b.normalMapType===b_,metalnessMap:ot,roughnessMap:lt,anisotropy:_t,anisotropyMap:$,clearcoat:D,clearcoatMap:Te,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ee,dispersion:A,iridescence:G,iridescenceMap:we,iridescenceThicknessMap:ge,sheen:se,sheenColorMap:ne,sheenRoughnessMap:We,specularMap:Ie,specularColorMap:be,specularIntensityMap:Le,transmission:ae,transmissionMap:N,thicknessMap:me,gradientMap:oe,opaque:b.transparent===!1&&b.blending===hs&&b.alphaToCoverage===!1,alphaMap:Pe,alphaTest:le,alphaHash:ue,combine:b.combine,mapUv:it&&g(b.map.channel),aoMapUv:st&&g(b.aoMap.channel),lightMapUv:Ke&&g(b.lightMap.channel),bumpMapUv:Ye&&g(b.bumpMap.channel),normalMapUv:B&&g(b.normalMap.channel),displacementMapUv:ht&&g(b.displacementMap.channel),emissiveMapUv:Fe&&g(b.emissiveMap.channel),metalnessMapUv:ot&&g(b.metalnessMap.channel),roughnessMapUv:lt&&g(b.roughnessMap.channel),anisotropyMapUv:$&&g(b.anisotropyMap.channel),clearcoatMapUv:Te&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:pe&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:We&&g(b.sheenRoughnessMap.channel),specularMapUv:Ie&&g(b.specularMap.channel),specularColorMapUv:be&&g(b.specularColorMap.channel),specularIntensityMapUv:Le&&g(b.specularIntensityMap.channel),transmissionMapUv:N&&g(b.transmissionMap.channel),thicknessMapUv:me&&g(b.thicknessMap.channel),alphaMapUv:Pe&&g(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(B||_t),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!q.attributes.uv&&(it||Pe),fog:!!F,useFog:b.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Se,skinning:W.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:rt,decodeVideoTexture:it&&b.map.isVideoTexture===!0&&Lt.getTransfer(b.map.colorSpace)===Yt,decodeVideoTextureEmissive:Fe&&b.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(b.emissiveMap.colorSpace)===Yt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Di,flipSided:b.side===si,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Be&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&b.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ot.vertexUv1s=c.has(1),Ot.vertexUv2s=c.has(2),Ot.vertexUv3s=c.has(3),c.clear(),Ot}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(x(M,b),y(M,b),M.push(r.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function x(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const M=_[b.type];let L;if(M){const U=sr[M];L=Ux.clone(U.uniforms)}else L=b.uniforms;return L}function E(b,M){let L;for(let U=0,W=u.length;U<W;U++){const F=u[U];if(F.cacheKey===M){L=F,++L.usedTimes;break}}return L===void 0&&(L=new zE(r,M,b,s),u.push(L)),L}function T(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function S(b){l.remove(b)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:T,releaseShaderCache:S,programs:u,dispose:P}}function XE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function qE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function km(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Bm(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||qE),n.length>1&&n.sort(f||km),i.length>1&&i.sort(f||km)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function YE(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Bm,r.set(n,[o])):i>=s.length?(o=new Bm,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function jE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new Qe};break;case"SpotLight":t={position:new X,direction:new X,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new X,halfWidth:new X,halfHeight:new X};break}return r[e.id]=t,t}}}function $E(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let KE=0;function ZE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function JE(r){const e=new jE,t=$E(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new X);const i=new X,s=new xt,o=new xt;function a(c){let u=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,x=0,y=0,v=0,E=0,T=0,S=0;c.sort(ZE);for(let b=0,M=c.length;b<M;b++){const L=c[b],U=L.color,W=L.intensity,F=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*W,d+=U.g*W,f+=U.b*W;else if(L.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(L.sh.coefficients[j],W);S++}else if(L.isDirectionalLight){const j=e.get(L);if(j.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const C=L.shadow,Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,n.directionalShadow[h]=Y,n.directionalShadowMap[h]=q,n.directionalShadowMatrix[h]=L.shadow.matrix,x++}n.directional[h]=j,h++}else if(L.isSpotLight){const j=e.get(L);j.position.setFromMatrixPosition(L.matrixWorld),j.color.copy(U).multiplyScalar(W),j.distance=F,j.coneCos=Math.cos(L.angle),j.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),j.decay=L.decay,n.spot[g]=j;const C=L.shadow;if(L.map&&(n.spotLightMap[E]=L.map,E++,C.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[g]=C.matrix,L.castShadow){const Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,n.spotShadow[g]=Y,n.spotShadowMap[g]=q,v++}g++}else if(L.isRectAreaLight){const j=e.get(L);j.color.copy(U).multiplyScalar(W),j.halfWidth.set(L.width*.5,0,0),j.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=j,m++}else if(L.isPointLight){const j=e.get(L);if(j.color.copy(L.color).multiplyScalar(L.intensity),j.distance=L.distance,j.decay=L.decay,L.castShadow){const C=L.shadow,Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,Y.shadowCameraNear=C.camera.near,Y.shadowCameraFar=C.camera.far,n.pointShadow[_]=Y,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=L.shadow.matrix,y++}n.point[_]=j,_++}else if(L.isHemisphereLight){const j=e.get(L);j.skyColor.copy(L.color).multiplyScalar(W),j.groundColor.copy(L.groundColor).multiplyScalar(W),n.hemi[p]=j,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==x||P.numPointShadows!==y||P.numSpotShadows!==v||P.numSpotMaps!==E||P.numLightProbes!==S)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=S,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=x,P.numPointShadows=y,P.numSpotShadows=v,P.numSpotMaps=E,P.numLightProbes=S,n.version=KE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const y=c[p];if(y.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(y.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function zm(r){const e=new JE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function QE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new zm(r),e.set(i,[a])):s>=o.length?(a=new zm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const eT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tT=`uniform sampler2D shadow_pass;
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
}`;function nT(r,e,t){let n=new Nh;const i=new Ct,s=new Ct,o=new zt,a=new Qx({depthPacking:Wy}),l=new eb,c={},u=t.maxTextureSize,d={[zr]:si,[si]:zr,[Di]:Di},f=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:eT,fragmentShader:tT}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new wi;_.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ti(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=c_;let p=this.type;this.render=function(T,S,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const b=r.getRenderTarget(),M=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),U=r.state;U.setBlending(fs),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const W=p!==Ar&&this.type===Ar,F=p===Ar&&this.type!==Ar;for(let q=0,j=T.length;q<j;q++){const C=T[q],Y=C.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",C,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const he=Y.getFrameExtents();if(i.multiply(he),s.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/he.x),i.x=s.x*he.x,Y.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/he.y),i.y=s.y*he.y,Y.mapSize.y=s.y)),Y.map===null||W===!0||F===!0){const _e=this.type!==Ar?{minFilter:ni,magFilter:ni}:{};Y.map!==null&&Y.map.dispose(),Y.map=new oo(i.x,i.y,_e),Y.map.texture.name=C.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const O=Y.getViewportCount();for(let _e=0;_e<O;_e++){const ve=Y.getViewport(_e);o.set(s.x*ve.x,s.y*ve.y,s.x*ve.z,s.y*ve.w),U.viewport(o),Y.updateMatrices(C,_e),n=Y.getFrustum(),v(S,P,Y.camera,C,this.type)}Y.isPointLightShadow!==!0&&this.type===Ar&&x(Y,P),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(b,M,L)};function x(T,S){const P=e.update(g);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new oo(i.x,i.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(S,null,P,f,g,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(S,null,P,h,g,null)}function y(T,S,P,b){let M=null;const L=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)M=L;else if(M=P.isPointLight===!0?l:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){const U=M.uuid,W=S.uuid;let F=c[U];F===void 0&&(F={},c[U]=F);let q=F[W];q===void 0&&(q=M.clone(),F[W]=q,S.addEventListener("dispose",E)),M=q}if(M.visible=S.visible,M.wireframe=S.wireframe,b===Ar?M.side=S.shadowSide!==null?S.shadowSide:S.side:M.side=S.shadowSide!==null?S.shadowSide:d[S.side],M.alphaMap=S.alphaMap,M.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,M.map=S.map,M.clipShadows=S.clipShadows,M.clippingPlanes=S.clippingPlanes,M.clipIntersection=S.clipIntersection,M.displacementMap=S.displacementMap,M.displacementScale=S.displacementScale,M.displacementBias=S.displacementBias,M.wireframeLinewidth=S.wireframeLinewidth,M.linewidth=S.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const U=r.properties.get(M);U.light=P}return M}function v(T,S,P,b,M){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Ar)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const W=e.update(T),F=T.material;if(Array.isArray(F)){const q=W.groups;for(let j=0,C=q.length;j<C;j++){const Y=q[j],he=F[Y.materialIndex];if(he&&he.visible){const O=y(T,he,b,M);T.onBeforeShadow(r,T,S,P,W,O,Y),r.renderBufferDirect(P,null,W,O,T,Y),T.onAfterShadow(r,T,S,P,W,O,Y)}}}else if(F.visible){const q=y(T,F,b,M);T.onBeforeShadow(r,T,S,P,W,q,null),r.renderBufferDirect(P,null,W,q,T,null),T.onAfterShadow(r,T,S,P,W,q,null)}}const U=T.children;for(let W=0,F=U.length;W<F;W++)v(U[W],S,P,b,M)}function E(T){T.target.removeEventListener("dispose",E);for(const P in c){const b=c[P],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const iT={[Xd]:qd,[Yd]:Kd,[jd]:Zd,[aa]:$d,[qd]:Xd,[Kd]:Yd,[Zd]:jd,[$d]:aa};function rT(r,e){function t(){let N=!1;const me=new zt;let oe=null;const Pe=new zt(0,0,0,0);return{setMask:function(le){oe!==le&&!N&&(r.colorMask(le,le,le,le),oe=le)},setLocked:function(le){N=le},setClear:function(le,ue,Be,rt,Ot){Ot===!0&&(le*=rt,ue*=rt,Be*=rt),me.set(le,ue,Be,rt),Pe.equals(me)===!1&&(r.clearColor(le,ue,Be,rt),Pe.copy(me))},reset:function(){N=!1,oe=null,Pe.set(-1,0,0,0)}}}function n(){let N=!1,me=!1,oe=null,Pe=null,le=null;return{setReversed:function(ue){if(me!==ue){const Be=e.get("EXT_clip_control");ue?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),me=ue;const rt=le;le=null,this.setClear(rt)}},getReversed:function(){return me},setTest:function(ue){ue?re(r.DEPTH_TEST):Se(r.DEPTH_TEST)},setMask:function(ue){oe!==ue&&!N&&(r.depthMask(ue),oe=ue)},setFunc:function(ue){if(me&&(ue=iT[ue]),Pe!==ue){switch(ue){case Xd:r.depthFunc(r.NEVER);break;case qd:r.depthFunc(r.ALWAYS);break;case Yd:r.depthFunc(r.LESS);break;case aa:r.depthFunc(r.LEQUAL);break;case jd:r.depthFunc(r.EQUAL);break;case $d:r.depthFunc(r.GEQUAL);break;case Kd:r.depthFunc(r.GREATER);break;case Zd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Pe=ue}},setLocked:function(ue){N=ue},setClear:function(ue){le!==ue&&(me&&(ue=1-ue),r.clearDepth(ue),le=ue)},reset:function(){N=!1,oe=null,Pe=null,le=null,me=!1}}}function i(){let N=!1,me=null,oe=null,Pe=null,le=null,ue=null,Be=null,rt=null,Ot=null;return{setTest:function(Oe){N||(Oe?re(r.STENCIL_TEST):Se(r.STENCIL_TEST))},setMask:function(Oe){me!==Oe&&!N&&(r.stencilMask(Oe),me=Oe)},setFunc:function(Oe,Ne,dt){(oe!==Oe||Pe!==Ne||le!==dt)&&(r.stencilFunc(Oe,Ne,dt),oe=Oe,Pe=Ne,le=dt)},setOp:function(Oe,Ne,dt){(ue!==Oe||Be!==Ne||rt!==dt)&&(r.stencilOp(Oe,Ne,dt),ue=Oe,Be=Ne,rt=dt)},setLocked:function(Oe){N=Oe},setClear:function(Oe){Ot!==Oe&&(r.clearStencil(Oe),Ot=Oe)},reset:function(){N=!1,me=null,oe=null,Pe=null,le=null,ue=null,Be=null,rt=null,Ot=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,x=null,y=null,v=null,E=null,T=null,S=new Qe(0,0,0),P=0,b=!1,M=null,L=null,U=null,W=null,F=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,C=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(C=parseFloat(/^WebGL (\d)/.exec(Y)[1]),j=C>=1):Y.indexOf("OpenGL ES")!==-1&&(C=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),j=C>=2);let he=null,O={};const _e=r.getParameter(r.SCISSOR_BOX),ve=r.getParameter(r.VIEWPORT),Q=new zt().fromArray(_e),qe=new zt().fromArray(ve);function He(N,me,oe,Pe){const le=new Uint8Array(4),ue=r.createTexture();r.bindTexture(N,ue),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Be=0;Be<oe;Be++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Pe,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(me+Be,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ue}const ee={};ee[r.TEXTURE_2D]=He(r.TEXTURE_2D,r.TEXTURE_2D,1),ee[r.TEXTURE_CUBE_MAP]=He(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[r.TEXTURE_2D_ARRAY]=He(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ee[r.TEXTURE_3D]=He(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(r.DEPTH_TEST),o.setFunc(aa),Ye(!1),B(Mp),re(r.CULL_FACE),st(fs);function re(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Se(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Ge(N,me){return d[N]!==me?(r.bindFramebuffer(N,me),d[N]=me,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=me),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=me),!0):!1}function ye(N,me){let oe=h,Pe=!1;if(N){oe=f.get(me),oe===void 0&&(oe=[],f.set(me,oe));const le=N.textures;if(oe.length!==le.length||oe[0]!==r.COLOR_ATTACHMENT0){for(let ue=0,Be=le.length;ue<Be;ue++)oe[ue]=r.COLOR_ATTACHMENT0+ue;oe.length=le.length,Pe=!0}}else oe[0]!==r.BACK&&(oe[0]=r.BACK,Pe=!0);Pe&&r.drawBuffers(oe)}function it(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const ft={[Gs]:r.FUNC_ADD,[py]:r.FUNC_SUBTRACT,[my]:r.FUNC_REVERSE_SUBTRACT};ft[gy]=r.MIN,ft[_y]=r.MAX;const I={[vy]:r.ZERO,[yy]:r.ONE,[xy]:r.SRC_COLOR,[Gd]:r.SRC_ALPHA,[Ty]:r.SRC_ALPHA_SATURATE,[My]:r.DST_COLOR,[Sy]:r.DST_ALPHA,[by]:r.ONE_MINUS_SRC_COLOR,[Wd]:r.ONE_MINUS_SRC_ALPHA,[Ey]:r.ONE_MINUS_DST_COLOR,[wy]:r.ONE_MINUS_DST_ALPHA,[Ay]:r.CONSTANT_COLOR,[Cy]:r.ONE_MINUS_CONSTANT_COLOR,[Ry]:r.CONSTANT_ALPHA,[Py]:r.ONE_MINUS_CONSTANT_ALPHA};function st(N,me,oe,Pe,le,ue,Be,rt,Ot,Oe){if(N===fs){g===!0&&(Se(r.BLEND),g=!1);return}if(g===!1&&(re(r.BLEND),g=!0),N!==hy){if(N!==m||Oe!==b){if((p!==Gs||v!==Gs)&&(r.blendEquation(r.FUNC_ADD),p=Gs,v=Gs),Oe)switch(N){case hs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFunc(r.ONE,r.ONE);break;case Ep:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Tp:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case hs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Ep:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tp:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}x=null,y=null,E=null,T=null,S.set(0,0,0),P=0,m=N,b=Oe}return}le=le||me,ue=ue||oe,Be=Be||Pe,(me!==p||le!==v)&&(r.blendEquationSeparate(ft[me],ft[le]),p=me,v=le),(oe!==x||Pe!==y||ue!==E||Be!==T)&&(r.blendFuncSeparate(I[oe],I[Pe],I[ue],I[Be]),x=oe,y=Pe,E=ue,T=Be),(rt.equals(S)===!1||Ot!==P)&&(r.blendColor(rt.r,rt.g,rt.b,Ot),S.copy(rt),P=Ot),m=N,b=!1}function Ke(N,me){N.side===Di?Se(r.CULL_FACE):re(r.CULL_FACE);let oe=N.side===si;me&&(oe=!oe),Ye(oe),N.blending===hs&&N.transparent===!1?st(fs):st(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Pe=N.stencilWrite;a.setTest(Pe),Pe&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Fe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):Se(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(N){M!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),M=N)}function B(N){N!==uy?(re(r.CULL_FACE),N!==L&&(N===Mp?r.cullFace(r.BACK):N===dy?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Se(r.CULL_FACE),L=N}function ht(N){N!==U&&(j&&r.lineWidth(N),U=N)}function Fe(N,me,oe){N?(re(r.POLYGON_OFFSET_FILL),(W!==me||F!==oe)&&(r.polygonOffset(me,oe),W=me,F=oe)):Se(r.POLYGON_OFFSET_FILL)}function ot(N){N?re(r.SCISSOR_TEST):Se(r.SCISSOR_TEST)}function lt(N){N===void 0&&(N=r.TEXTURE0+q-1),he!==N&&(r.activeTexture(N),he=N)}function _t(N,me,oe){oe===void 0&&(he===null?oe=r.TEXTURE0+q-1:oe=he);let Pe=O[oe];Pe===void 0&&(Pe={type:void 0,texture:void 0},O[oe]=Pe),(Pe.type!==N||Pe.texture!==me)&&(he!==oe&&(r.activeTexture(oe),he=oe),r.bindTexture(N,me||ee[N]),Pe.type=N,Pe.texture=me)}function D(){const N=O[he];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(N){Q.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Q.copy(N))}function We(N){qe.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),qe.copy(N))}function Ie(N,me){let oe=c.get(me);oe===void 0&&(oe=new WeakMap,c.set(me,oe));let Pe=oe.get(N);Pe===void 0&&(Pe=r.getUniformBlockIndex(me,N.name),oe.set(N,Pe))}function be(N,me){const Pe=c.get(me).get(N);l.get(me)!==Pe&&(r.uniformBlockBinding(me,Pe,N.__bindingPointIndex),l.set(me,Pe))}function Le(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},he=null,O={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,x=null,y=null,v=null,E=null,T=null,S=new Qe(0,0,0),P=0,b=!1,M=null,L=null,U=null,W=null,F=null,Q.set(0,0,r.canvas.width,r.canvas.height),qe.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Se,bindFramebuffer:Ge,drawBuffers:ye,useProgram:it,setBlending:st,setMaterial:Ke,setFlipSided:Ye,setCullFace:B,setLineWidth:ht,setPolygonOffset:Fe,setScissorTest:ot,activeTexture:lt,bindTexture:_t,unbindTexture:D,compressedTexImage2D:A,compressedTexImage3D:G,texImage2D:we,texImage3D:ge,updateUBOMapping:Ie,uniformBlockBinding:be,texStorage2D:pe,texStorage3D:Ee,texSubImage2D:se,texSubImage3D:ae,compressedTexSubImage2D:$,compressedTexSubImage3D:Te,scissor:ne,viewport:We,reset:Le}}function sT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,A){return h?new OffscreenCanvas(D,A):Al("canvas")}function g(D,A,G){let se=1;const ae=_t(D);if((ae.width>G||ae.height>G)&&(se=G/Math.max(ae.width,ae.height)),se<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const $=Math.floor(se*ae.width),Te=Math.floor(se*ae.height);d===void 0&&(d=_($,Te));const pe=A?_($,Te):d;return pe.width=$,pe.height=Te,pe.getContext("2d").drawImage(D,0,0,$,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+$+"x"+Te+")."),pe}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){r.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(D,A,G,se,ae=!1){if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let $=A;if(A===r.RED&&(G===r.FLOAT&&($=r.R32F),G===r.HALF_FLOAT&&($=r.R16F),G===r.UNSIGNED_BYTE&&($=r.R8)),A===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.R8UI),G===r.UNSIGNED_SHORT&&($=r.R16UI),G===r.UNSIGNED_INT&&($=r.R32UI),G===r.BYTE&&($=r.R8I),G===r.SHORT&&($=r.R16I),G===r.INT&&($=r.R32I)),A===r.RG&&(G===r.FLOAT&&($=r.RG32F),G===r.HALF_FLOAT&&($=r.RG16F),G===r.UNSIGNED_BYTE&&($=r.RG8)),A===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RG8UI),G===r.UNSIGNED_SHORT&&($=r.RG16UI),G===r.UNSIGNED_INT&&($=r.RG32UI),G===r.BYTE&&($=r.RG8I),G===r.SHORT&&($=r.RG16I),G===r.INT&&($=r.RG32I)),A===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGB8UI),G===r.UNSIGNED_SHORT&&($=r.RGB16UI),G===r.UNSIGNED_INT&&($=r.RGB32UI),G===r.BYTE&&($=r.RGB8I),G===r.SHORT&&($=r.RGB16I),G===r.INT&&($=r.RGB32I)),A===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGBA8UI),G===r.UNSIGNED_SHORT&&($=r.RGBA16UI),G===r.UNSIGNED_INT&&($=r.RGBA32UI),G===r.BYTE&&($=r.RGBA8I),G===r.SHORT&&($=r.RGBA16I),G===r.INT&&($=r.RGBA32I)),A===r.RGB&&(G===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),G===r.UNSIGNED_INT_10F_11F_11F_REV&&($=r.R11F_G11F_B10F)),A===r.RGBA){const Te=ae?ru:Lt.getTransfer(se);G===r.FLOAT&&($=r.RGBA32F),G===r.HALF_FLOAT&&($=r.RGBA16F),G===r.UNSIGNED_BYTE&&($=Te===Yt?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(D,A){let G;return D?A===null||A===so||A===Sl?G=r.DEPTH24_STENCIL8:A===Yi?G=r.DEPTH32F_STENCIL8:A===bl&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===so||A===Sl?G=r.DEPTH_COMPONENT24:A===Yi?G=r.DEPTH_COMPONENT32F:A===bl&&(G=r.DEPTH_COMPONENT16),G}function E(D,A){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==ni&&D.minFilter!==xi?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function T(D){const A=D.target;A.removeEventListener("dispose",T),P(A),A.isVideoTexture&&u.delete(A)}function S(D){const A=D.target;A.removeEventListener("dispose",S),M(A)}function P(D){const A=n.get(D);if(A.__webglInit===void 0)return;const G=D.source,se=f.get(G);if(se){const ae=se[A.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(D),Object.keys(se).length===0&&f.delete(G)}n.remove(D)}function b(D){const A=n.get(D);r.deleteTexture(A.__webglTexture);const G=D.source,se=f.get(G);delete se[A.__cacheKey],o.memory.textures--}function M(D){const A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(A.__webglFramebuffer[se]))for(let ae=0;ae<A.__webglFramebuffer[se].length;ae++)r.deleteFramebuffer(A.__webglFramebuffer[se][ae]);else r.deleteFramebuffer(A.__webglFramebuffer[se]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[se])}else{if(Array.isArray(A.__webglFramebuffer))for(let se=0;se<A.__webglFramebuffer.length;se++)r.deleteFramebuffer(A.__webglFramebuffer[se]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let se=0;se<A.__webglColorRenderbuffer.length;se++)A.__webglColorRenderbuffer[se]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[se]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const G=D.textures;for(let se=0,ae=G.length;se<ae;se++){const $=n.get(G[se]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(G[se])}n.remove(D)}let L=0;function U(){L=0}function W(){const D=L;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),L+=1,D}function F(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function q(D,A){const G=n.get(D);if(D.isVideoTexture&&ot(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&G.__version!==D.version){const se=D.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(G,D,A);return}}else D.isExternalTexture&&(G.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+A)}function j(D,A){const G=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){ee(G,D,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+A)}function C(D,A){const G=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){ee(G,D,A);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+A)}function Y(D,A){const G=n.get(D);if(D.version>0&&G.__version!==D.version){re(G,D,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+A)}const he={[ua]:r.REPEAT,[rs]:r.CLAMP_TO_EDGE,[iu]:r.MIRRORED_REPEAT},O={[ni]:r.NEAREST,[f_]:r.NEAREST_MIPMAP_NEAREST,[Ga]:r.NEAREST_MIPMAP_LINEAR,[xi]:r.LINEAR,[Bc]:r.LINEAR_MIPMAP_NEAREST,[Dr]:r.LINEAR_MIPMAP_LINEAR},_e={[qy]:r.NEVER,[Jy]:r.ALWAYS,[Yy]:r.LESS,[S_]:r.LEQUAL,[jy]:r.EQUAL,[Zy]:r.GEQUAL,[$y]:r.GREATER,[Ky]:r.NOTEQUAL};function ve(D,A){if(A.type===Yi&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===xi||A.magFilter===Bc||A.magFilter===Ga||A.magFilter===Dr||A.minFilter===xi||A.minFilter===Bc||A.minFilter===Ga||A.minFilter===Dr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,he[A.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,he[A.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,he[A.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,O[A.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,O[A.minFilter]),A.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,_e[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===ni||A.minFilter!==Ga&&A.minFilter!==Dr||A.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Q(D,A){let G=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",T));const se=A.source;let ae=f.get(se);ae===void 0&&(ae={},f.set(se,ae));const $=F(A);if($!==D.__cacheKey){ae[$]===void 0&&(ae[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ae[$].usedTimes++;const Te=ae[D.__cacheKey];Te!==void 0&&(ae[D.__cacheKey].usedTimes--,Te.usedTimes===0&&b(A)),D.__cacheKey=$,D.__webglTexture=ae[$].texture}return G}function qe(D,A,G){return Math.floor(Math.floor(D/G)/A)}function He(D,A,G,se){const $=D.updateRanges;if($.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,G,se,A.data);else{$.sort((ge,ne)=>ge.start-ne.start);let Te=0;for(let ge=1;ge<$.length;ge++){const ne=$[Te],We=$[ge],Ie=ne.start+ne.count,be=qe(We.start,A.width,4),Le=qe(ne.start,A.width,4);We.start<=Ie+1&&be===Le&&qe(We.start+We.count-1,A.width,4)===be?ne.count=Math.max(ne.count,We.start+We.count-ne.start):(++Te,$[Te]=We)}$.length=Te+1;const pe=r.getParameter(r.UNPACK_ROW_LENGTH),Ee=r.getParameter(r.UNPACK_SKIP_PIXELS),we=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let ge=0,ne=$.length;ge<ne;ge++){const We=$[ge],Ie=Math.floor(We.start/4),be=Math.ceil(We.count/4),Le=Ie%A.width,N=Math.floor(Ie/A.width),me=be,oe=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Le),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Le,N,me,oe,G,se,A.data)}D.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,pe),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ee),r.pixelStorei(r.UNPACK_SKIP_ROWS,we)}}function ee(D,A,G){let se=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(se=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(se=r.TEXTURE_3D);const ae=Q(D,A),$=A.source;t.bindTexture(se,D.__webglTexture,r.TEXTURE0+G);const Te=n.get($);if($.version!==Te.__version||ae===!0){t.activeTexture(r.TEXTURE0+G);const pe=Lt.getPrimaries(Lt.workingColorSpace),Ee=A.colorSpace===is?null:Lt.getPrimaries(A.colorSpace),we=A.colorSpace===is||pe===Ee?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let ge=g(A.image,!1,i.maxTextureSize);ge=lt(A,ge);const ne=s.convert(A.format,A.colorSpace),We=s.convert(A.type);let Ie=y(A.internalFormat,ne,We,A.colorSpace,A.isVideoTexture);ve(se,A);let be;const Le=A.mipmaps,N=A.isVideoTexture!==!0,me=Te.__version===void 0||ae===!0,oe=$.dataReady,Pe=E(A,ge);if(A.isDepthTexture)Ie=v(A.format===Ml,A.type),me&&(N?t.texStorage2D(r.TEXTURE_2D,1,Ie,ge.width,ge.height):t.texImage2D(r.TEXTURE_2D,0,Ie,ge.width,ge.height,0,ne,We,null));else if(A.isDataTexture)if(Le.length>0){N&&me&&t.texStorage2D(r.TEXTURE_2D,Pe,Ie,Le[0].width,Le[0].height);for(let le=0,ue=Le.length;le<ue;le++)be=Le[le],N?oe&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,be.width,be.height,ne,We,be.data):t.texImage2D(r.TEXTURE_2D,le,Ie,be.width,be.height,0,ne,We,be.data);A.generateMipmaps=!1}else N?(me&&t.texStorage2D(r.TEXTURE_2D,Pe,Ie,ge.width,ge.height),oe&&He(A,ge,ne,We)):t.texImage2D(r.TEXTURE_2D,0,Ie,ge.width,ge.height,0,ne,We,ge.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){N&&me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Pe,Ie,Le[0].width,Le[0].height,ge.depth);for(let le=0,ue=Le.length;le<ue;le++)if(be=Le[le],A.format!==Ii)if(ne!==null)if(N){if(oe)if(A.layerUpdates.size>0){const Be=gm(be.width,be.height,A.format,A.type);for(const rt of A.layerUpdates){const Ot=be.data.subarray(rt*Be/be.data.BYTES_PER_ELEMENT,(rt+1)*Be/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,rt,be.width,be.height,1,ne,Ot)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,be.width,be.height,ge.depth,ne,be.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,le,Ie,be.width,be.height,ge.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?oe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,be.width,be.height,ge.depth,ne,We,be.data):t.texImage3D(r.TEXTURE_2D_ARRAY,le,Ie,be.width,be.height,ge.depth,0,ne,We,be.data)}else{N&&me&&t.texStorage2D(r.TEXTURE_2D,Pe,Ie,Le[0].width,Le[0].height);for(let le=0,ue=Le.length;le<ue;le++)be=Le[le],A.format!==Ii?ne!==null?N?oe&&t.compressedTexSubImage2D(r.TEXTURE_2D,le,0,0,be.width,be.height,ne,be.data):t.compressedTexImage2D(r.TEXTURE_2D,le,Ie,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?oe&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,be.width,be.height,ne,We,be.data):t.texImage2D(r.TEXTURE_2D,le,Ie,be.width,be.height,0,ne,We,be.data)}else if(A.isDataArrayTexture)if(N){if(me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Pe,Ie,ge.width,ge.height,ge.depth),oe)if(A.layerUpdates.size>0){const le=gm(ge.width,ge.height,A.format,A.type);for(const ue of A.layerUpdates){const Be=ge.data.subarray(ue*le/ge.data.BYTES_PER_ELEMENT,(ue+1)*le/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ue,ge.width,ge.height,1,ne,We,Be)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,ne,We,ge.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,ge.width,ge.height,ge.depth,0,ne,We,ge.data);else if(A.isData3DTexture)N?(me&&t.texStorage3D(r.TEXTURE_3D,Pe,Ie,ge.width,ge.height,ge.depth),oe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,ne,We,ge.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,ge.width,ge.height,ge.depth,0,ne,We,ge.data);else if(A.isFramebufferTexture){if(me)if(N)t.texStorage2D(r.TEXTURE_2D,Pe,Ie,ge.width,ge.height);else{let le=ge.width,ue=ge.height;for(let Be=0;Be<Pe;Be++)t.texImage2D(r.TEXTURE_2D,Be,Ie,le,ue,0,ne,We,null),le>>=1,ue>>=1}}else if(Le.length>0){if(N&&me){const le=_t(Le[0]);t.texStorage2D(r.TEXTURE_2D,Pe,Ie,le.width,le.height)}for(let le=0,ue=Le.length;le<ue;le++)be=Le[le],N?oe&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,ne,We,be):t.texImage2D(r.TEXTURE_2D,le,Ie,ne,We,be);A.generateMipmaps=!1}else if(N){if(me){const le=_t(ge);t.texStorage2D(r.TEXTURE_2D,Pe,Ie,le.width,le.height)}oe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne,We,ge)}else t.texImage2D(r.TEXTURE_2D,0,Ie,ne,We,ge);m(A)&&p(se),Te.__version=$.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function re(D,A,G){if(A.image.length!==6)return;const se=Q(D,A),ae=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+G);const $=n.get(ae);if(ae.version!==$.__version||se===!0){t.activeTexture(r.TEXTURE0+G);const Te=Lt.getPrimaries(Lt.workingColorSpace),pe=A.colorSpace===is?null:Lt.getPrimaries(A.colorSpace),Ee=A.colorSpace===is||Te===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const we=A.isCompressedTexture||A.image[0].isCompressedTexture,ge=A.image[0]&&A.image[0].isDataTexture,ne=[];for(let ue=0;ue<6;ue++)!we&&!ge?ne[ue]=g(A.image[ue],!0,i.maxCubemapSize):ne[ue]=ge?A.image[ue].image:A.image[ue],ne[ue]=lt(A,ne[ue]);const We=ne[0],Ie=s.convert(A.format,A.colorSpace),be=s.convert(A.type),Le=y(A.internalFormat,Ie,be,A.colorSpace),N=A.isVideoTexture!==!0,me=$.__version===void 0||se===!0,oe=ae.dataReady;let Pe=E(A,We);ve(r.TEXTURE_CUBE_MAP,A);let le;if(we){N&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Pe,Le,We.width,We.height);for(let ue=0;ue<6;ue++){le=ne[ue].mipmaps;for(let Be=0;Be<le.length;Be++){const rt=le[Be];A.format!==Ii?Ie!==null?N?oe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be,0,0,rt.width,rt.height,Ie,rt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be,Le,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be,0,0,rt.width,rt.height,Ie,be,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be,Le,rt.width,rt.height,0,Ie,be,rt.data)}}}else{if(le=A.mipmaps,N&&me){le.length>0&&Pe++;const ue=_t(ne[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Pe,Le,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(ge){N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,ne[ue].width,ne[ue].height,Ie,be,ne[ue].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Le,ne[ue].width,ne[ue].height,0,Ie,be,ne[ue].data);for(let Be=0;Be<le.length;Be++){const Ot=le[Be].image[ue].image;N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be+1,0,0,Ot.width,Ot.height,Ie,be,Ot.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be+1,Le,Ot.width,Ot.height,0,Ie,be,Ot.data)}}else{N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ie,be,ne[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Le,Ie,be,ne[ue]);for(let Be=0;Be<le.length;Be++){const rt=le[Be];N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be+1,0,0,Ie,be,rt.image[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Be+1,Le,Ie,be,rt.image[ue])}}}m(A)&&p(r.TEXTURE_CUBE_MAP),$.__version=ae.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Se(D,A,G,se,ae,$){const Te=s.convert(G.format,G.colorSpace),pe=s.convert(G.type),Ee=y(G.internalFormat,Te,pe,G.colorSpace),we=n.get(A),ge=n.get(G);if(ge.__renderTarget=A,!we.__hasExternalTextures){const ne=Math.max(1,A.width>>$),We=Math.max(1,A.height>>$);ae===r.TEXTURE_3D||ae===r.TEXTURE_2D_ARRAY?t.texImage3D(ae,$,Ee,ne,We,A.depth,0,Te,pe,null):t.texImage2D(ae,$,Ee,ne,We,0,Te,pe,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,se,ae,ge.__webglTexture,0,ht(A)):(ae===r.TEXTURE_2D||ae>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,se,ae,ge.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(D,A,G){if(r.bindRenderbuffer(r.RENDERBUFFER,D),A.depthBuffer){const se=A.depthTexture,ae=se&&se.isDepthTexture?se.type:null,$=v(A.stencilBuffer,ae),Te=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,pe=ht(A);Fe(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,pe,$,A.width,A.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,pe,$,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,$,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,D)}else{const se=A.textures;for(let ae=0;ae<se.length;ae++){const $=se[ae],Te=s.convert($.format,$.colorSpace),pe=s.convert($.type),Ee=y($.internalFormat,Te,pe,$.colorSpace),we=ht(A);G&&Fe(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,we,Ee,A.width,A.height):Fe(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,we,Ee,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Ee,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ye(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=n.get(A.depthTexture);se.__renderTarget=A,(!se.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),q(A.depthTexture,0);const ae=se.__webglTexture,$=ht(A);if(A.depthTexture.format===wl)Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ae,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ae,0);else if(A.depthTexture.format===Ml)Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ae,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function it(D){const A=n.get(D),G=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const se=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),se){const ae=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,se.removeEventListener("dispose",ae)};se.addEventListener("dispose",ae),A.__depthDisposeCallback=ae}A.__boundDepthTexture=se}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const se=D.texture.mipmaps;se&&se.length>0?ye(A.__webglFramebuffer[0],D):ye(A.__webglFramebuffer,D)}else if(G){A.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[se]),A.__webglDepthbuffer[se]===void 0)A.__webglDepthbuffer[se]=r.createRenderbuffer(),Ge(A.__webglDepthbuffer[se],D,!1);else{const ae=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer[se];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,ae,r.RENDERBUFFER,$)}}else{const se=D.texture.mipmaps;if(se&&se.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Ge(A.__webglDepthbuffer,D,!1);else{const ae=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,ae,r.RENDERBUFFER,$)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ft(D,A,G){const se=n.get(D);A!==void 0&&Se(se.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&it(D)}function I(D){const A=D.texture,G=n.get(D),se=n.get(A);D.addEventListener("dispose",S);const ae=D.textures,$=D.isWebGLCubeRenderTarget===!0,Te=ae.length>1;if(Te||(se.__webglTexture===void 0&&(se.__webglTexture=r.createTexture()),se.__version=A.version,o.memory.textures++),$){G.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer[pe]=[];for(let Ee=0;Ee<A.mipmaps.length;Ee++)G.__webglFramebuffer[pe][Ee]=r.createFramebuffer()}else G.__webglFramebuffer[pe]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer=[];for(let pe=0;pe<A.mipmaps.length;pe++)G.__webglFramebuffer[pe]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(Te)for(let pe=0,Ee=ae.length;pe<Ee;pe++){const we=n.get(ae[pe]);we.__webglTexture===void 0&&(we.__webglTexture=r.createTexture(),o.memory.textures++)}if(D.samples>0&&Fe(D)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let pe=0;pe<ae.length;pe++){const Ee=ae[pe];G.__webglColorRenderbuffer[pe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[pe]);const we=s.convert(Ee.format,Ee.colorSpace),ge=s.convert(Ee.type),ne=y(Ee.internalFormat,we,ge,Ee.colorSpace,D.isXRRenderTarget===!0),We=ht(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,We,ne,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,G.__webglColorRenderbuffer[pe])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),Ge(G.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,se.__webglTexture),ve(r.TEXTURE_CUBE_MAP,A);for(let pe=0;pe<6;pe++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ee=0;Ee<A.mipmaps.length;Ee++)Se(G.__webglFramebuffer[pe][Ee],D,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ee);else Se(G.__webglFramebuffer[pe],D,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(A)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let pe=0,Ee=ae.length;pe<Ee;pe++){const we=ae[pe],ge=n.get(we);let ne=r.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ne=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ne,ge.__webglTexture),ve(ne,we),Se(G.__webglFramebuffer,D,we,r.COLOR_ATTACHMENT0+pe,ne,0),m(we)&&p(ne)}t.unbindTexture()}else{let pe=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(pe=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(pe,se.__webglTexture),ve(pe,A),A.mipmaps&&A.mipmaps.length>0)for(let Ee=0;Ee<A.mipmaps.length;Ee++)Se(G.__webglFramebuffer[Ee],D,A,r.COLOR_ATTACHMENT0,pe,Ee);else Se(G.__webglFramebuffer,D,A,r.COLOR_ATTACHMENT0,pe,0);m(A)&&p(pe),t.unbindTexture()}D.depthBuffer&&it(D)}function st(D){const A=D.textures;for(let G=0,se=A.length;G<se;G++){const ae=A[G];if(m(ae)){const $=x(D),Te=n.get(ae).__webglTexture;t.bindTexture($,Te),p($),t.unbindTexture()}}}const Ke=[],Ye=[];function B(D){if(D.samples>0){if(Fe(D)===!1){const A=D.textures,G=D.width,se=D.height;let ae=r.COLOR_BUFFER_BIT;const $=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Te=n.get(D),pe=A.length>1;if(pe)for(let we=0;we<A.length;we++)t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Ee=D.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let we=0;we<A.length;we++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ae|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ae|=r.STENCIL_BUFFER_BIT)),pe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Te.__webglColorRenderbuffer[we]);const ge=n.get(A[we]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ge,0)}r.blitFramebuffer(0,0,G,se,0,0,G,se,ae,r.NEAREST),l===!0&&(Ke.length=0,Ye.length=0,Ke.push(r.COLOR_ATTACHMENT0+we),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ke.push($),Ye.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ye)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ke))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pe)for(let we=0;we<A.length;we++){t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.RENDERBUFFER,Te.__webglColorRenderbuffer[we]);const ge=n.get(A[we]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.TEXTURE_2D,ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const A=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function ht(D){return Math.min(i.maxSamples,D.samples)}function Fe(D){const A=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ot(D){const A=o.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function lt(D,A){const G=D.colorSpace,se=D.format,ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||G!==Wn&&G!==is&&(Lt.getTransfer(G)===Yt?(se!==Ii||ae!==mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),A}function _t(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=C,this.setTextureCube=Y,this.rebindTextures=ft,this.setupRenderTarget=I,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=B,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Fe}function oT(r,e){function t(n,i=is){let s;const o=Lt.getTransfer(i);if(n===mr)return r.UNSIGNED_BYTE;if(n===Eh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Th)return r.UNSIGNED_SHORT_5_5_5_1;if(n===m_)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===g_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===h_)return r.BYTE;if(n===p_)return r.SHORT;if(n===bl)return r.UNSIGNED_SHORT;if(n===Mh)return r.INT;if(n===so)return r.UNSIGNED_INT;if(n===Yi)return r.FLOAT;if(n===Hl)return r.HALF_FLOAT;if(n===__)return r.ALPHA;if(n===v_)return r.RGB;if(n===Ii)return r.RGBA;if(n===wl)return r.DEPTH_COMPONENT;if(n===Ml)return r.DEPTH_STENCIL;if(n===Ah)return r.RED;if(n===Ch)return r.RED_INTEGER;if(n===y_)return r.RG;if(n===Rh)return r.RG_INTEGER;if(n===Ph)return r.RGBA_INTEGER;if(n===zc||n===Hc||n===Vc||n===Gc)if(o===Yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===zc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===zc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ef||n===tf||n===nf||n===rf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ef)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===tf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sf||n===of||n===af)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===sf||n===of)return o===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===af)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lf||n===cf||n===uf||n===df||n===ff||n===hf||n===pf||n===mf||n===gf||n===_f||n===vf||n===yf||n===xf||n===bf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===lf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===df)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ff)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_f)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sf||n===wf||n===Mf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Sf)return o===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ef||n===Tf||n===Af||n===Cf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ef)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Tf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Af)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sl?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const aT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lT=`
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

}`;class cT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new F_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Oi({vertexShader:aT,fragmentShader:lT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ti(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uT extends wa{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new cT,p={},x=t.getContextAttributes();let y=null,v=null;const E=[],T=[],S=new Ct;let P=null;const b=new ri;b.viewport=new zt;const M=new ri;M.viewport=new zt;const L=[b,M],U=new Sb;let W=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let re=E[ee];return re===void 0&&(re=new sd,E[ee]=re),re.getTargetRaySpace()},this.getControllerGrip=function(ee){let re=E[ee];return re===void 0&&(re=new sd,E[ee]=re),re.getGripSpace()},this.getHand=function(ee){let re=E[ee];return re===void 0&&(re=new sd,E[ee]=re),re.getHandSpace()};function q(ee){const re=T.indexOf(ee.inputSource);if(re===-1)return;const Se=E[re];Se!==void 0&&(Se.update(ee.inputSource,ee.frame,c||o),Se.dispatchEvent({type:ee.type,data:ee.inputSource}))}function j(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",C);for(let ee=0;ee<E.length;ee++){const re=T[ee];re!==null&&(T[ee]=null,E[ee].disconnect(re))}W=null,F=null,m.reset();for(const ee in p)delete p[ee];e.setRenderTarget(y),h=null,f=null,d=null,i=null,v=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",j),i.addEventListener("inputsourceschange",C),x.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(S),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ge=null,ye=null;x.depth&&(ye=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=x.stencil?Ml:wl,Ge=x.stencil?Sl:so);const it={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(it),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new oo(f.textureWidth,f.textureHeight,{format:Ii,type:mr,depthTexture:new U_(f.textureWidth,f.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Se={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Se),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new oo(h.framebufferWidth,h.framebufferHeight,{format:Ii,type:mr,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),He.setContext(i),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function C(ee){for(let re=0;re<ee.removed.length;re++){const Se=ee.removed[re],Ge=T.indexOf(Se);Ge>=0&&(T[Ge]=null,E[Ge].disconnect(Se))}for(let re=0;re<ee.added.length;re++){const Se=ee.added[re];let Ge=T.indexOf(Se);if(Ge===-1){for(let it=0;it<E.length;it++)if(it>=T.length){T.push(Se),Ge=it;break}else if(T[it]===null){T[it]=Se,Ge=it;break}if(Ge===-1)break}const ye=E[Ge];ye&&ye.connect(Se)}}const Y=new X,he=new X;function O(ee,re,Se){Y.setFromMatrixPosition(re.matrixWorld),he.setFromMatrixPosition(Se.matrixWorld);const Ge=Y.distanceTo(he),ye=re.projectionMatrix.elements,it=Se.projectionMatrix.elements,ft=ye[14]/(ye[10]-1),I=ye[14]/(ye[10]+1),st=(ye[9]+1)/ye[5],Ke=(ye[9]-1)/ye[5],Ye=(ye[8]-1)/ye[0],B=(it[8]+1)/it[0],ht=ft*Ye,Fe=ft*B,ot=Ge/(-Ye+B),lt=ot*-Ye;if(re.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(lt),ee.translateZ(ot),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ye[10]===-1)ee.projectionMatrix.copy(re.projectionMatrix),ee.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const _t=ft+ot,D=I+ot,A=ht-lt,G=Fe+(Ge-lt),se=st*I/D*_t,ae=Ke*I/D*_t;ee.projectionMatrix.makePerspective(A,G,se,ae,_t,D),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function _e(ee,re){re===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(re.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let re=ee.near,Se=ee.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(Se=m.depthFar)),U.near=M.near=b.near=re,U.far=M.far=b.far=Se,(W!==U.near||F!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),W=U.near,F=U.far),U.layers.mask=ee.layers.mask|6,b.layers.mask=U.layers.mask&3,M.layers.mask=U.layers.mask&5;const Ge=ee.parent,ye=U.cameras;_e(U,Ge);for(let it=0;it<ye.length;it++)_e(ye[it],Ge);ye.length===2?O(U,b,M):U.projectionMatrix.copy(b.projectionMatrix),ve(ee,U,Ge)};function ve(ee,re,Se){Se===null?ee.matrix.copy(re.matrixWorld):(ee.matrix.copy(Se.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(re.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(re.projectionMatrix),ee.projectionMatrixInverse.copy(re.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=da*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(ee){l=ee,f!==null&&(f.fixedFoveation=ee),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ee)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(ee){return p[ee]};let Q=null;function qe(ee,re){if(u=re.getViewerPose(c||o),_=re,u!==null){const Se=u.views;h!==null&&(e.setRenderTargetFramebuffer(v,h.framebuffer),e.setRenderTarget(v));let Ge=!1;Se.length!==U.cameras.length&&(U.cameras.length=0,Ge=!0);for(let I=0;I<Se.length;I++){const st=Se[I];let Ke=null;if(h!==null)Ke=h.getViewport(st);else{const B=d.getViewSubImage(f,st);Ke=B.viewport,I===0&&(e.setRenderTargetTextures(v,B.colorTexture,B.depthStencilTexture),e.setRenderTarget(v))}let Ye=L[I];Ye===void 0&&(Ye=new ri,Ye.layers.enable(I),Ye.viewport=new zt,L[I]=Ye),Ye.matrix.fromArray(st.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(st.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),I===0&&(U.matrix.copy(Ye.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ge===!0&&U.cameras.push(Ye)}const ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const I=d.getDepthInformation(Se[0]);I&&I.isValid&&I.texture&&m.init(I,i.renderState)}if(ye&&ye.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let I=0;I<Se.length;I++){const st=Se[I].camera;if(st){let Ke=p[st];Ke||(Ke=new F_,p[st]=Ke);const Ye=d.getCameraImage(st);Ke.sourceTexture=Ye}}}}for(let Se=0;Se<E.length;Se++){const Ge=T[Se],ye=E[Se];Ge!==null&&ye!==void 0&&ye.update(Ge,re,c||o)}Q&&Q(ee,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),_=null}const He=new H_;He.setAnimationLoop(qe),this.setAnimationLoop=function(ee){Q=ee},this.dispose=function(){}}}const Ds=new gr,dT=new xt;function fT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,R_(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===si&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===si&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,v=x.envMapRotation;y&&(m.envMap.value=y,Ds.copy(v),Ds.x*=-1,Ds.y*=-1,Ds.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ds.y*=-1,Ds.z*=-1),m.envMapRotation.value.setFromMatrix4(dT.makeRotationFromEuler(Ds)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===si&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const v=y.program;n.uniformBlockBinding(x,v)}function c(x,y){let v=i[x.id];v===void 0&&(_(x),v=u(x),i[x.id]=v,x.addEventListener("dispose",m));const E=y.program;n.updateUBOMapping(x,E);const T=e.render.frame;s[x.id]!==T&&(f(x),s[x.id]=T)}function u(x){const y=d();x.__bindingPointIndex=y;const v=r.createBuffer(),E=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const y=i[x.id],v=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let T=0,S=v.length;T<S;T++){const P=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,M=P.length;b<M;b++){const L=P[b];if(h(L,T,b,E)===!0){const U=L.__offset,W=Array.isArray(L.value)?L.value:[L.value];let F=0;for(let q=0;q<W.length;q++){const j=W[q],C=g(j);typeof j=="number"||typeof j=="boolean"?(L.__data[0]=j,r.bufferSubData(r.UNIFORM_BUFFER,U+F,L.__data)):j.isMatrix3?(L.__data[0]=j.elements[0],L.__data[1]=j.elements[1],L.__data[2]=j.elements[2],L.__data[3]=0,L.__data[4]=j.elements[3],L.__data[5]=j.elements[4],L.__data[6]=j.elements[5],L.__data[7]=0,L.__data[8]=j.elements[6],L.__data[9]=j.elements[7],L.__data[10]=j.elements[8],L.__data[11]=0):(j.toArray(L.__data,F),F+=C.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(x,y,v,E){const T=x.value,S=y+"_"+v;if(E[S]===void 0)return typeof T=="number"||typeof T=="boolean"?E[S]=T:E[S]=T.clone(),!0;{const P=E[S];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return E[S]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function _(x){const y=x.uniforms;let v=0;const E=16;for(let S=0,P=y.length;S<P;S++){const b=Array.isArray(y[S])?y[S]:[y[S]];for(let M=0,L=b.length;M<L;M++){const U=b[M],W=Array.isArray(U.value)?U.value:[U.value];for(let F=0,q=W.length;F<q;F++){const j=W[F],C=g(j),Y=v%E,he=Y%C.boundary,O=Y+he;v+=he,O!==0&&E-O<C.storage&&(v+=E-O),U.__data=new Float32Array(C.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=C.storage}}}const T=v%E;return T>0&&(v+=E-T),x.__size=v,x.__cache={},this}function g(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class pT{constructor(e={}){const{canvas:t=gx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ps,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=vn;let T=0,S=0,P=null,b=-1,M=null;const L=new zt,U=new zt;let W=null;const F=new Qe(0);let q=0,j=t.width,C=t.height,Y=1,he=null,O=null;const _e=new zt(0,0,j,C),ve=new zt(0,0,j,C);let Q=!1;const qe=new Nh;let He=!1,ee=!1;const re=new xt,Se=new X,Ge=new zt,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function ft(){return P===null?Y:1}let I=n;function st(R,H){return t.getContext(R,H)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",le,!1),I===null){const H="webgl2";if(I=st(H,R),I===null)throw st(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ke,Ye,B,ht,Fe,ot,lt,_t,D,A,G,se,ae,$,Te,pe,Ee,we,ge,ne,We,Ie,be,Le;function N(){Ke=new MM(I),Ke.init(),Ie=new oT(I,Ke),Ye=new _M(I,Ke,e,Ie),B=new rT(I,Ke),Ye.reversedDepthBuffer&&f&&B.buffers.depth.setReversed(!0),ht=new AM(I),Fe=new XE,ot=new sT(I,Ke,B,Fe,Ye,Ie,ht),lt=new yM(v),_t=new wM(v),D=new Ib(I),be=new mM(I,D),A=new EM(I,D,ht,be),G=new RM(I,A,D,ht),ge=new CM(I,Ye,ot),pe=new vM(Fe),se=new WE(v,lt,_t,Ke,Ye,be,pe),ae=new fT(v,Fe),$=new YE,Te=new QE(Ke),we=new pM(v,lt,_t,B,G,h,l),Ee=new nT(v,G,Ye),Le=new hT(I,ht,Ye,B),ne=new gM(I,Ke,ht),We=new TM(I,Ke,ht),ht.programs=se.programs,v.capabilities=Ye,v.extensions=Ke,v.properties=Fe,v.renderLists=$,v.shadowMap=Ee,v.state=B,v.info=ht}N();const me=new uT(v,I);this.xr=me,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Ke.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ke.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(j,C,!1))},this.getSize=function(R){return R.set(j,C)},this.setSize=function(R,H,K=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=R,C=H,t.width=Math.floor(R*Y),t.height=Math.floor(H*Y),K===!0&&(t.style.width=R+"px",t.style.height=H+"px"),this.setViewport(0,0,R,H)},this.getDrawingBufferSize=function(R){return R.set(j*Y,C*Y).floor()},this.setDrawingBufferSize=function(R,H,K){j=R,C=H,Y=K,t.width=Math.floor(R*K),t.height=Math.floor(H*K),this.setViewport(0,0,R,H)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(_e)},this.setViewport=function(R,H,K,Z){R.isVector4?_e.set(R.x,R.y,R.z,R.w):_e.set(R,H,K,Z),B.viewport(L.copy(_e).multiplyScalar(Y).round())},this.getScissor=function(R){return R.copy(ve)},this.setScissor=function(R,H,K,Z){R.isVector4?ve.set(R.x,R.y,R.z,R.w):ve.set(R,H,K,Z),B.scissor(U.copy(ve).multiplyScalar(Y).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(R){B.setScissorTest(Q=R)},this.setOpaqueSort=function(R){he=R},this.setTransparentSort=function(R){O=R},this.getClearColor=function(R){return R.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(R=!0,H=!0,K=!0){let Z=0;if(R){let V=!1;if(P!==null){const de=P.texture.format;V=de===Ph||de===Rh||de===Ch}if(V){const de=P.texture.type,xe=de===mr||de===so||de===bl||de===Sl||de===Eh||de===Th,Me=we.getClearColor(),ke=we.getClearAlpha(),tt=Me.r,De=Me.g,Ze=Me.b;xe?(_[0]=tt,_[1]=De,_[2]=Ze,_[3]=ke,I.clearBufferuiv(I.COLOR,0,_)):(g[0]=tt,g[1]=De,g[2]=Ze,g[3]=ke,I.clearBufferiv(I.COLOR,0,g))}else Z|=I.COLOR_BUFFER_BIT}H&&(Z|=I.DEPTH_BUFFER_BIT),K&&(Z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",le,!1),we.dispose(),$.dispose(),Te.dispose(),Fe.dispose(),lt.dispose(),_t.dispose(),G.dispose(),be.dispose(),Le.dispose(),se.dispose(),me.dispose(),me.removeEventListener("sessionstart",dt),me.removeEventListener("sessionend",Ae),Xe.stop()};function oe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const R=ht.autoReset,H=Ee.enabled,K=Ee.autoUpdate,Z=Ee.needsUpdate,V=Ee.type;N(),ht.autoReset=R,Ee.enabled=H,Ee.autoUpdate=K,Ee.needsUpdate=Z,Ee.type=V}function le(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){const H=R.target;H.removeEventListener("dispose",ue),Be(H)}function Be(R){rt(R),Fe.remove(R)}function rt(R){const H=Fe.get(R).programs;H!==void 0&&(H.forEach(function(K){se.releaseProgram(K)}),R.isShaderMaterial&&se.releaseShaderCache(R))}this.renderBufferDirect=function(R,H,K,Z,V,de){H===null&&(H=ye);const xe=V.isMesh&&V.matrixWorld.determinant()<0,Me=bt(R,H,K,Z,V);B.setMaterial(Z,xe);let ke=K.index,tt=1;if(Z.wireframe===!0){if(ke=A.getWireframeAttribute(K),ke===void 0)return;tt=2}const De=K.drawRange,Ze=K.attributes.position;let pt=De.start*tt,Et=(De.start+De.count)*tt;de!==null&&(pt=Math.max(pt,de.start*tt),Et=Math.min(Et,(de.start+de.count)*tt)),ke!==null?(pt=Math.max(pt,0),Et=Math.min(Et,ke.count)):Ze!=null&&(pt=Math.max(pt,0),Et=Math.min(Et,Ze.count));const tn=Et-pt;if(tn<0||tn===1/0)return;be.setup(V,Z,Me,K,ke);let Vt,kt=ne;if(ke!==null&&(Vt=D.get(ke),kt=We,kt.setIndex(Vt)),V.isMesh)Z.wireframe===!0?(B.setLineWidth(Z.wireframeLinewidth*ft()),kt.setMode(I.LINES)):kt.setMode(I.TRIANGLES);else if(V.isLine){let Je=Z.linewidth;Je===void 0&&(Je=1),B.setLineWidth(Je*ft()),V.isLineSegments?kt.setMode(I.LINES):V.isLineLoop?kt.setMode(I.LINE_LOOP):kt.setMode(I.LINE_STRIP)}else V.isPoints?kt.setMode(I.POINTS):V.isSprite&&kt.setMode(I.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Cl("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),kt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))kt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Je=V._multiDrawStarts,Wt=V._multiDrawCounts,Pt=V._multiDrawCount,Un=ke?D.get(ke).bytesPerElement:1,Gr=Fe.get(Z).currentProgram.getUniforms();for(let Ln=0;Ln<Pt;Ln++)Gr.setValue(I,"_gl_DrawID",Ln),kt.render(Je[Ln]/Un,Wt[Ln])}else if(V.isInstancedMesh)kt.renderInstances(pt,tn,V.count);else if(K.isInstancedBufferGeometry){const Je=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Wt=Math.min(K.instanceCount,Je);kt.renderInstances(pt,tn,Wt)}else kt.render(pt,tn)};function Ot(R,H,K){R.transparent===!0&&R.side===Di&&R.forceSinglePass===!1?(R.side=si,R.needsUpdate=!0,Kt(R,H,K),R.side=zr,R.needsUpdate=!0,Kt(R,H,K),R.side=Di):Kt(R,H,K)}this.compile=function(R,H,K=null){K===null&&(K=R),p=Te.get(K),p.init(H),y.push(p),K.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),R!==K&&R.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const Z=new Set;return R.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const de=V.material;if(de)if(Array.isArray(de))for(let xe=0;xe<de.length;xe++){const Me=de[xe];Ot(Me,K,V),Z.add(Me)}else Ot(de,K,V),Z.add(de)}),p=y.pop(),Z},this.compileAsync=function(R,H,K=null){const Z=this.compile(R,H,K);return new Promise(V=>{function de(){if(Z.forEach(function(xe){Fe.get(xe).currentProgram.isReady()&&Z.delete(xe)}),Z.size===0){V(R);return}setTimeout(de,10)}Ke.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Oe=null;function Ne(R){Oe&&Oe(R)}function dt(){Xe.stop()}function Ae(){Xe.start()}const Xe=new H_;Xe.setAnimationLoop(Ne),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(R){Oe=R,me.setAnimationLoop(R),R===null?Xe.stop():Xe.start()},me.addEventListener("sessionstart",dt),me.addEventListener("sessionend",Ae),this.render=function(R,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(H),H=me.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,H,P),p=Te.get(R,y.length),p.init(H),y.push(p),re.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),qe.setFromProjectionMatrix(re,lr,H.reversedDepth),ee=this.localClippingEnabled,He=pe.init(this.clippingPlanes,ee),m=$.get(R,x.length),m.init(),x.push(m),me.enabled===!0&&me.isPresenting===!0){const de=v.xr.getDepthSensingMesh();de!==null&&ze(de,H,-1/0,v.sortObjects)}ze(R,H,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(he,O),it=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,it&&we.addToRenderList(m,R),this.info.render.frame++,He===!0&&pe.beginShadows();const K=p.state.shadowsArray;Ee.render(K,R,H),He===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const de=H.cameras;if(V.length>0)for(let xe=0,Me=de.length;xe<Me;xe++){const ke=de[xe];nn(Z,V,R,ke)}it&&we.render(R);for(let xe=0,Me=de.length;xe<Me;xe++){const ke=de[xe];at(m,R,ke,ke.viewport)}}else V.length>0&&nn(Z,V,R,H),it&&we.render(R),at(m,R,H);P!==null&&S===0&&(ot.updateMultisampleRenderTarget(P),ot.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,H),be.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],He===!0&&pe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function ze(R,H,K,Z){if(R.visible===!1)return;if(R.layers.test(H.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(H);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||qe.intersectsSprite(R)){Z&&Ge.setFromMatrixPosition(R.matrixWorld).applyMatrix4(re);const xe=G.update(R),Me=R.material;Me.visible&&m.push(R,xe,Me,K,Ge.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||qe.intersectsObject(R))){const xe=G.update(R),Me=R.material;if(Z&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ge.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ge.copy(xe.boundingSphere.center)),Ge.applyMatrix4(R.matrixWorld).applyMatrix4(re)),Array.isArray(Me)){const ke=xe.groups;for(let tt=0,De=ke.length;tt<De;tt++){const Ze=ke[tt],pt=Me[Ze.materialIndex];pt&&pt.visible&&m.push(R,xe,pt,K,Ge.z,Ze)}}else Me.visible&&m.push(R,xe,Me,K,Ge.z,null)}}const de=R.children;for(let xe=0,Me=de.length;xe<Me;xe++)ze(de[xe],H,K,Z)}function at(R,H,K,Z){const V=R.opaque,de=R.transmissive,xe=R.transparent;p.setupLightsView(K),He===!0&&pe.setGlobalState(v.clippingPlanes,K),Z&&B.viewport(L.copy(Z)),V.length>0&&ct(V,H,K),de.length>0&&ct(de,H,K),xe.length>0&&ct(xe,H,K),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function nn(R,H,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new oo(1,1,{generateMipmaps:!0,type:Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float")?Hl:mr,minFilter:Dr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Lt.workingColorSpace}));const de=p.state.transmissionRenderTarget[Z.id],xe=Z.viewport||L;de.setSize(xe.z*v.transmissionResolutionScale,xe.w*v.transmissionResolutionScale);const Me=v.getRenderTarget(),ke=v.getActiveCubeFace(),tt=v.getActiveMipmapLevel();v.setRenderTarget(de),v.getClearColor(F),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),it&&we.render(K);const De=v.toneMapping;v.toneMapping=ps;const Ze=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),He===!0&&pe.setGlobalState(v.clippingPlanes,Z),ct(R,K,Z),ot.updateMultisampleRenderTarget(de),ot.updateRenderTargetMipmap(de),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let pt=!1;for(let Et=0,tn=H.length;Et<tn;Et++){const Vt=H[Et],kt=Vt.object,Je=Vt.geometry,Wt=Vt.material,Pt=Vt.group;if(Wt.side===Di&&kt.layers.test(Z.layers)){const Un=Wt.side;Wt.side=si,Wt.needsUpdate=!0,Ft(kt,K,Z,Je,Wt,Pt),Wt.side=Un,Wt.needsUpdate=!0,pt=!0}}pt===!0&&(ot.updateMultisampleRenderTarget(de),ot.updateRenderTargetMipmap(de))}v.setRenderTarget(Me,ke,tt),v.setClearColor(F,q),Ze!==void 0&&(Z.viewport=Ze),v.toneMapping=De}function ct(R,H,K){const Z=H.isScene===!0?H.overrideMaterial:null;for(let V=0,de=R.length;V<de;V++){const xe=R[V],Me=xe.object,ke=xe.geometry,tt=xe.group;let De=xe.material;De.allowOverride===!0&&Z!==null&&(De=Z),Me.layers.test(K.layers)&&Ft(Me,H,K,ke,De,tt)}}function Ft(R,H,K,Z,V,de){R.onBeforeRender(v,H,K,Z,V,de),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),V.onBeforeRender(v,H,K,Z,R,de),V.transparent===!0&&V.side===Di&&V.forceSinglePass===!1?(V.side=si,V.needsUpdate=!0,v.renderBufferDirect(K,H,Z,V,R,de),V.side=zr,V.needsUpdate=!0,v.renderBufferDirect(K,H,Z,V,R,de),V.side=Di):v.renderBufferDirect(K,H,Z,V,R,de),R.onAfterRender(v,H,K,Z,V,de)}function Kt(R,H,K){H.isScene!==!0&&(H=ye);const Z=Fe.get(R),V=p.state.lights,de=p.state.shadowsArray,xe=V.state.version,Me=se.getParameters(R,V.state,de,H,K),ke=se.getProgramCacheKey(Me);let tt=Z.programs;Z.environment=R.isMeshStandardMaterial?H.environment:null,Z.fog=H.fog,Z.envMap=(R.isMeshStandardMaterial?_t:lt).get(R.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&R.envMap===null?H.environmentRotation:R.envMapRotation,tt===void 0&&(R.addEventListener("dispose",ue),tt=new Map,Z.programs=tt);let De=tt.get(ke);if(De!==void 0){if(Z.currentProgram===De&&Z.lightsStateVersion===xe)return Ht(R,Me),De}else Me.uniforms=se.getUniforms(R),R.onBeforeCompile(Me,v),De=se.acquireProgram(Me,ke),tt.set(ke,De),Z.uniforms=Me.uniforms;const Ze=Z.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=pe.uniform),Ht(R,Me),Z.needsLights=Rt(R),Z.lightsStateVersion=xe,Z.needsLights&&(Ze.ambientLightColor.value=V.state.ambient,Ze.lightProbe.value=V.state.probe,Ze.directionalLights.value=V.state.directional,Ze.directionalLightShadows.value=V.state.directionalShadow,Ze.spotLights.value=V.state.spot,Ze.spotLightShadows.value=V.state.spotShadow,Ze.rectAreaLights.value=V.state.rectArea,Ze.ltc_1.value=V.state.rectAreaLTC1,Ze.ltc_2.value=V.state.rectAreaLTC2,Ze.pointLights.value=V.state.point,Ze.pointLightShadows.value=V.state.pointShadow,Ze.hemisphereLights.value=V.state.hemi,Ze.directionalShadowMap.value=V.state.directionalShadowMap,Ze.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ze.spotShadowMap.value=V.state.spotShadowMap,Ze.spotLightMatrix.value=V.state.spotLightMatrix,Ze.spotLightMap.value=V.state.spotLightMap,Ze.pointShadowMap.value=V.state.pointShadowMap,Ze.pointShadowMatrix.value=V.state.pointShadowMatrix),Z.currentProgram=De,Z.uniformsList=null,De}function vt(R){if(R.uniformsList===null){const H=R.currentProgram.getUniforms();R.uniformsList=Wc.seqWithValue(H.seq,R.uniforms)}return R.uniformsList}function Ht(R,H){const K=Fe.get(R);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function bt(R,H,K,Z,V){H.isScene!==!0&&(H=ye),ot.resetTextureUnits();const de=H.fog,xe=Z.isMeshStandardMaterial?H.environment:null,Me=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Wn,ke=(Z.isMeshStandardMaterial?_t:lt).get(Z.envMap||xe),tt=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,De=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ze=!!K.morphAttributes.position,pt=!!K.morphAttributes.normal,Et=!!K.morphAttributes.color;let tn=ps;Z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(tn=v.toneMapping);const Vt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,kt=Vt!==void 0?Vt.length:0,Je=Fe.get(Z),Wt=p.state.lights;if(He===!0&&(ee===!0||R!==M)){const ce=R===M&&Z.id===b;pe.setState(Z,R,ce)}let Pt=!1;Z.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Wt.state.version||Je.outputColorSpace!==Me||V.isBatchedMesh&&Je.batching===!1||!V.isBatchedMesh&&Je.batching===!0||V.isBatchedMesh&&Je.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Je.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Je.instancing===!1||!V.isInstancedMesh&&Je.instancing===!0||V.isSkinnedMesh&&Je.skinning===!1||!V.isSkinnedMesh&&Je.skinning===!0||V.isInstancedMesh&&Je.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Je.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Je.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Je.instancingMorph===!1&&V.morphTexture!==null||Je.envMap!==ke||Z.fog===!0&&Je.fog!==de||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==pe.numPlanes||Je.numIntersection!==pe.numIntersection)||Je.vertexAlphas!==tt||Je.vertexTangents!==De||Je.morphTargets!==Ze||Je.morphNormals!==pt||Je.morphColors!==Et||Je.toneMapping!==tn||Je.morphTargetsCount!==kt)&&(Pt=!0):(Pt=!0,Je.__version=Z.version);let Un=Je.currentProgram;Pt===!0&&(Un=Kt(Z,H,V));let Gr=!1,Ln=!1,w=!1;const k=Un.getUniforms(),z=Je.uniforms;if(B.useProgram(Un.program)&&(Gr=!0,Ln=!0,w=!0),Z.id!==b&&(b=Z.id,Ln=!0),Gr||M!==R){B.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),k.setValue(I,"projectionMatrix",R.projectionMatrix),k.setValue(I,"viewMatrix",R.matrixWorldInverse);const ie=k.map.cameraPosition;ie!==void 0&&ie.setValue(I,Se.setFromMatrixPosition(R.matrixWorld)),Ye.logarithmicDepthBuffer&&k.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&k.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,Ln=!0,w=!0)}if(V.isSkinnedMesh){k.setOptional(I,V,"bindMatrix"),k.setOptional(I,V,"bindMatrixInverse");const ce=V.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),k.setValue(I,"boneTexture",ce.boneTexture,ot))}V.isBatchedMesh&&(k.setOptional(I,V,"batchingTexture"),k.setValue(I,"batchingTexture",V._matricesTexture,ot),k.setOptional(I,V,"batchingIdTexture"),k.setValue(I,"batchingIdTexture",V._indirectTexture,ot),k.setOptional(I,V,"batchingColorTexture"),V._colorsTexture!==null&&k.setValue(I,"batchingColorTexture",V._colorsTexture,ot));const te=K.morphAttributes;if((te.position!==void 0||te.normal!==void 0||te.color!==void 0)&&ge.update(V,K,Un),(Ln||Je.receiveShadow!==V.receiveShadow)&&(Je.receiveShadow=V.receiveShadow,k.setValue(I,"receiveShadow",V.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(z.envMap.value=ke,z.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&H.environment!==null&&(z.envMapIntensity.value=H.environmentIntensity),Ln&&(k.setValue(I,"toneMappingExposure",v.toneMappingExposure),Je.needsLights&&sn(z,w),de&&Z.fog===!0&&ae.refreshFogUniforms(z,de),ae.refreshMaterialUniforms(z,Z,Y,C,p.state.transmissionRenderTarget[R.id]),Wc.upload(I,vt(Je),z,ot)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Wc.upload(I,vt(Je),z,ot),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&k.setValue(I,"center",V.center),k.setValue(I,"modelViewMatrix",V.modelViewMatrix),k.setValue(I,"normalMatrix",V.normalMatrix),k.setValue(I,"modelMatrix",V.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const ce=Z.uniformsGroups;for(let ie=0,et=ce.length;ie<et;ie++){const Ve=ce[ie];Le.update(Ve,Un),Le.bind(Ve,Un)}}return Un}function sn(R,H){R.ambientLightColor.needsUpdate=H,R.lightProbe.needsUpdate=H,R.directionalLights.needsUpdate=H,R.directionalLightShadows.needsUpdate=H,R.pointLights.needsUpdate=H,R.pointLightShadows.needsUpdate=H,R.spotLights.needsUpdate=H,R.spotLightShadows.needsUpdate=H,R.rectAreaLights.needsUpdate=H,R.hemisphereLights.needsUpdate=H}function Rt(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,H,K){const Z=Fe.get(R);Z.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Fe.get(R.texture).__webglTexture=H,Fe.get(R.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:K,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,H){const K=Fe.get(R);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0};const Nn=I.createFramebuffer();this.setRenderTarget=function(R,H=0,K=0){P=R,T=H,S=K;let Z=!0,V=null,de=!1,xe=!1;if(R){const ke=Fe.get(R);if(ke.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(I.FRAMEBUFFER,null),Z=!1;else if(ke.__webglFramebuffer===void 0)ot.setupRenderTarget(R);else if(ke.__hasExternalTextures)ot.rebindTextures(R,Fe.get(R.texture).__webglTexture,Fe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ze=R.depthTexture;if(ke.__boundDepthTexture!==Ze){if(Ze!==null&&Fe.has(Ze)&&(R.width!==Ze.image.width||R.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(R)}}const tt=R.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(xe=!0);const De=Fe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(De[H])?V=De[H][K]:V=De[H],de=!0):R.samples>0&&ot.useMultisampledRTT(R)===!1?V=Fe.get(R).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[K]:V=De,L.copy(R.viewport),U.copy(R.scissor),W=R.scissorTest}else L.copy(_e).multiplyScalar(Y).floor(),U.copy(ve).multiplyScalar(Y).floor(),W=Q;if(K!==0&&(V=Nn),B.bindFramebuffer(I.FRAMEBUFFER,V)&&Z&&B.drawBuffers(R,V),B.viewport(L),B.scissor(U),B.setScissorTest(W),de){const ke=Fe.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+H,ke.__webglTexture,K)}else if(xe){const ke=H;for(let tt=0;tt<R.textures.length;tt++){const De=Fe.get(R.textures[tt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+tt,De.__webglTexture,K,ke)}}else if(R!==null&&K!==0){const ke=Fe.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ke.__webglTexture,K)}b=-1},this.readRenderTargetPixels=function(R,H,K,Z,V,de,xe,Me=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xe!==void 0&&(ke=ke[xe]),ke){B.bindFramebuffer(I.FRAMEBUFFER,ke);try{const tt=R.textures[Me],De=tt.format,Ze=tt.type;if(!Ye.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=R.width-Z&&K>=0&&K<=R.height-V&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),I.readPixels(H,K,Z,V,Ie.convert(De),Ie.convert(Ze),de))}finally{const tt=P!==null?Fe.get(P).__webglFramebuffer:null;B.bindFramebuffer(I.FRAMEBUFFER,tt)}}},this.readRenderTargetPixelsAsync=async function(R,H,K,Z,V,de,xe,Me=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xe!==void 0&&(ke=ke[xe]),ke)if(H>=0&&H<=R.width-Z&&K>=0&&K<=R.height-V){B.bindFramebuffer(I.FRAMEBUFFER,ke);const tt=R.textures[Me],De=tt.format,Ze=tt.type;if(!Ye.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,pt),I.bufferData(I.PIXEL_PACK_BUFFER,de.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),I.readPixels(H,K,Z,V,Ie.convert(De),Ie.convert(Ze),0);const Et=P!==null?Fe.get(P).__webglFramebuffer:null;B.bindFramebuffer(I.FRAMEBUFFER,Et);const tn=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await _x(I,tn,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,pt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,de),I.deleteBuffer(pt),I.deleteSync(tn),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,H=null,K=0){const Z=Math.pow(2,-K),V=Math.floor(R.image.width*Z),de=Math.floor(R.image.height*Z),xe=H!==null?H.x:0,Me=H!==null?H.y:0;ot.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,xe,Me,V,de),B.unbindTexture()};const Ce=I.createFramebuffer(),Nt=I.createFramebuffer();this.copyTextureToTexture=function(R,H,K=null,Z=null,V=0,de=null){de===null&&(V!==0?(Cl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=V,V=0):de=0);let xe,Me,ke,tt,De,Ze,pt,Et,tn;const Vt=R.isCompressedTexture?R.mipmaps[de]:R.image;if(K!==null)xe=K.max.x-K.min.x,Me=K.max.y-K.min.y,ke=K.isBox3?K.max.z-K.min.z:1,tt=K.min.x,De=K.min.y,Ze=K.isBox3?K.min.z:0;else{const te=Math.pow(2,-V);xe=Math.floor(Vt.width*te),Me=Math.floor(Vt.height*te),R.isDataArrayTexture?ke=Vt.depth:R.isData3DTexture?ke=Math.floor(Vt.depth*te):ke=1,tt=0,De=0,Ze=0}Z!==null?(pt=Z.x,Et=Z.y,tn=Z.z):(pt=0,Et=0,tn=0);const kt=Ie.convert(H.format),Je=Ie.convert(H.type);let Wt;H.isData3DTexture?(ot.setTexture3D(H,0),Wt=I.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ot.setTexture2DArray(H,0),Wt=I.TEXTURE_2D_ARRAY):(ot.setTexture2D(H,0),Wt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,H.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,H.unpackAlignment);const Pt=I.getParameter(I.UNPACK_ROW_LENGTH),Un=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Gr=I.getParameter(I.UNPACK_SKIP_PIXELS),Ln=I.getParameter(I.UNPACK_SKIP_ROWS),w=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,tt),I.pixelStorei(I.UNPACK_SKIP_ROWS,De),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const k=R.isDataArrayTexture||R.isData3DTexture,z=H.isDataArrayTexture||H.isData3DTexture;if(R.isDepthTexture){const te=Fe.get(R),ce=Fe.get(H),ie=Fe.get(te.__renderTarget),et=Fe.get(ce.__renderTarget);B.bindFramebuffer(I.READ_FRAMEBUFFER,ie.__webglFramebuffer),B.bindFramebuffer(I.DRAW_FRAMEBUFFER,et.__webglFramebuffer);for(let Ve=0;Ve<ke;Ve++)k&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Fe.get(R).__webglTexture,V,Ze+Ve),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Fe.get(H).__webglTexture,de,tn+Ve)),I.blitFramebuffer(tt,De,xe,Me,pt,Et,xe,Me,I.DEPTH_BUFFER_BIT,I.NEAREST);B.bindFramebuffer(I.READ_FRAMEBUFFER,null),B.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(V!==0||R.isRenderTargetTexture||Fe.has(R)){const te=Fe.get(R),ce=Fe.get(H);B.bindFramebuffer(I.READ_FRAMEBUFFER,Ce),B.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nt);for(let ie=0;ie<ke;ie++)k?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,te.__webglTexture,V,Ze+ie):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,te.__webglTexture,V),z?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ce.__webglTexture,de,tn+ie):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ce.__webglTexture,de),V!==0?I.blitFramebuffer(tt,De,xe,Me,pt,Et,xe,Me,I.COLOR_BUFFER_BIT,I.NEAREST):z?I.copyTexSubImage3D(Wt,de,pt,Et,tn+ie,tt,De,xe,Me):I.copyTexSubImage2D(Wt,de,pt,Et,tt,De,xe,Me);B.bindFramebuffer(I.READ_FRAMEBUFFER,null),B.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else z?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Wt,de,pt,Et,tn,xe,Me,ke,kt,Je,Vt.data):H.isCompressedArrayTexture?I.compressedTexSubImage3D(Wt,de,pt,Et,tn,xe,Me,ke,kt,Vt.data):I.texSubImage3D(Wt,de,pt,Et,tn,xe,Me,ke,kt,Je,Vt):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,de,pt,Et,xe,Me,kt,Je,Vt.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,de,pt,Et,Vt.width,Vt.height,kt,Vt.data):I.texSubImage2D(I.TEXTURE_2D,de,pt,Et,xe,Me,kt,Je,Vt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Pt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Un),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Gr),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ln),I.pixelStorei(I.UNPACK_SKIP_IMAGES,w),de===0&&H.generateMipmaps&&I.generateMipmap(Wt),B.unbindTexture()},this.initRenderTarget=function(R){Fe.get(R).__webglFramebuffer===void 0&&ot.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ot.setTextureCube(R,0):R.isData3DTexture?ot.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ot.setTexture2DArray(R,0):ot.setTexture2D(R,0),B.unbindTexture()},this.resetState=function(){T=0,S=0,P=null,B.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return lr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lt._getUnpackColorSpace()}}function mT(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Xo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Hm=Array.prototype.forEach,Ua=Array.prototype.slice,fe={BREAK:{},extend:function(e){return this.each(Ua.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Ua.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Ua.call(arguments);return function(){for(var t=Ua.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Hm&&e.forEach&&e.forEach===Hm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Ua.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:(function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e})(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},gT=[{litmus:fe.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Xo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Xo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Xo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Xo}}},{litmus:fe.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:fe.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:fe.isObject,conversions:{RGBA_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)&&fe.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)&&fe.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Fa=void 0,xc=void 0,Nf=function(){xc=!1;var e=arguments.length>1?fe.toArray(arguments):arguments[0];return fe.each(gT,function(t){if(t.litmus(e))return fe.each(t.conversions,function(n,i){if(Fa=n.read(e),xc===!1&&Fa!==!1)return xc=Fa,Fa.conversionName=i,Fa.conversion=n,fe.BREAK}),fe.BREAK}),xc},Vm=void 0,cu={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Vm=t*8)|e&~(255<<Vm)}},_T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ji=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Qi=(function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}})(),ys=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Ms=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Es=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},Rn=(function(){function r(){if(Ji(this,r),this.__state=Nf.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Qi(r,[{key:"toString",value:function(){return Xo(this)}},{key:"toHexString",value:function(){return Xo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r})();function Vh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(Rn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(Rn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Gh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(Rn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(Rn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}Rn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=cu.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")fe.extend(r.__state,cu.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};Rn.recalculateHSV=function(r){var e=cu.rgb_to_hsv(r.r,r.g,r.b);fe.extend(r.__state,{s:e.s,v:e.v}),fe.isNaN(e.h)?fe.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};Rn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Vh(Rn.prototype,"r",2);Vh(Rn.prototype,"g",1);Vh(Rn.prototype,"b",0);Gh(Rn.prototype,"h");Gh(Rn.prototype,"s");Gh(Rn.prototype,"v");Object.defineProperty(Rn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(Rn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=cu.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var po=(function(){function r(e,t){Ji(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Qi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r})(),vT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},q_={};fe.each(vT,function(r,e){fe.each(r,function(t){q_[t]=e})});var yT=/(\d+(\.\d+)?)px/;function tr(r){if(r==="0"||fe.isUndefined(r))return 0;var e=r.match(yT);return fe.isNull(e)?0:parseFloat(e[1])}var J={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;fe.isUndefined(s)&&(s=!0),fe.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=q_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;fe.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}fe.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),J},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),J},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return J},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return J},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return tr(t["border-left-width"])+tr(t["border-right-width"])+tr(t["padding-left"])+tr(t["padding-right"])+tr(t.width)},getHeight:function(e){var t=getComputedStyle(e);return tr(t["border-top-width"])+tr(t["border-bottom-width"])+tr(t["padding-top"])+tr(t["padding-bottom"])+tr(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},Y_=(function(r){Ms(e,r);function e(t,n){Ji(this,e);var i=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return J.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Qi(e,[{key:"setValue",value:function(n){var i=ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(po),xT=(function(r){Ms(e,r);function e(t,n,i){Ji(this,e);var s=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),fe.isArray(o)){var l={};fe.each(o,function(c){l[c]=c}),o=l}return fe.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),J.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Qi(e,[{key:"setValue",value:function(n){var i=ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return J.isActive(this.__select)?this:(this.__select.value=this.getValue(),ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e})(po),bT=(function(r){Ms(e,r);function e(t,n){Ji(this,e);var i=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),J.bind(i.__input,"keyup",o),J.bind(i.__input,"change",o),J.bind(i.__input,"blur",a),J.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Qi(e,[{key:"updateDisplay",value:function(){return J.isActive(this.__input)||(this.__input.value=this.getValue()),ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(po);function Gm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var j_=(function(r){Ms(e,r);function e(t,n,i){Ji(this,e);var s=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,fe.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=Gm(s.__impliedStep),s}return Qi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=Gm(n),this}}]),e})(po);function ST(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var uu=(function(r){Ms(e,r);function e(t,n,i){Ji(this,e);var s=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);fe.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){J.unbind(window,"mousemove",d),J.unbind(window,"mouseup",f),c()}function h(_){J.bind(window,"mousemove",d),J.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),J.bind(s.__input,"change",l),J.bind(s.__input,"blur",u),J.bind(s.__input,"mousedown",h),J.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Qi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():ST(this.getValue(),this.__precision),ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(j_);function Wm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Uf=(function(r){Ms(e,r);function e(t,n,i,s,o){Ji(this,e);var a=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),J.bind(a.__background,"mousedown",c),J.bind(a.__background,"touchstart",f),J.addClass(a.__background,"slider"),J.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),J.bind(window,"mousemove",u),J.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Wm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){J.unbind(window,"mousemove",u),J.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(J.bind(window,"touchmove",h),J.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Wm(m,p.left,p.right,l.__min,l.__max))}function _(){J.unbind(window,"touchmove",h),J.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Qi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",ys(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(j_),$_=(function(r){Ms(e,r);function e(t,n,i){Ji(this,e);var s=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,J.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),J.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Qi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e})(po),Ff=(function(r){Ms(e,r);function e(t,n){Ji(this,e);var i=Es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new Rn(i.getValue()),i.__temp=new Rn(0);var s=i;i.domElement=document.createElement("div"),J.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",J.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),J.bind(i.__input,"blur",d),J.bind(i.__selector,"mousedown",function(){J.addClass(this,"drag").bind(window,"mouseup",function(){J.removeClass(s.__selector,"drag")})}),J.bind(i.__selector,"touchstart",function(){J.addClass(this,"drag").bind(window,"touchend",function(){J.removeClass(s.__selector,"drag")})});var o=document.createElement("div");fe.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),fe.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),fe.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),fe.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),fe.extend(o.style,{width:"100%",height:"100%",background:"none"}),Xm(o,"top","rgba(0,0,0,0)","#000"),fe.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),MT(i.__hue_field),fe.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),J.bind(i.__saturation_field,"mousedown",a),J.bind(i.__saturation_field,"touchstart",a),J.bind(i.__field_knob,"mousedown",a),J.bind(i.__field_knob,"touchstart",a),J.bind(i.__hue_field,"mousedown",l),J.bind(i.__hue_field,"touchstart",l);function a(g){h(g),J.bind(window,"mousemove",h),J.bind(window,"touchmove",h),J.bind(window,"mouseup",c),J.bind(window,"touchend",c)}function l(g){_(g),J.bind(window,"mousemove",_),J.bind(window,"touchmove",_),J.bind(window,"mouseup",u),J.bind(window,"touchend",u)}function c(){J.unbind(window,"mousemove",h),J.unbind(window,"touchmove",h),J.unbind(window,"mouseup",c),J.unbind(window,"touchend",c),f()}function u(){J.unbind(window,"mousemove",_),J.unbind(window,"touchmove",_),J.unbind(window,"mouseup",u),J.unbind(window,"touchend",u),f()}function d(){var g=Nf(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientX,y=p.clientY,v=(x-m.left)/(m.right-m.left),E=1-(y-m.top)/(m.bottom-m.top);return E>1?E=1:E<0&&(E=0),v>1?v=1:v<0&&(v=0),s.__color.v=E,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientY,y=1-(x-m.top)/(m.bottom-m.top);return y>1?y=1:y<0&&(y=0),s.__color.h=y*360,s.setValue(s.__color.toOriginal()),!1}return i}return Qi(e,[{key:"updateDisplay",value:function(){var n=Nf(this.getValue());if(n!==!1){var i=!1;fe.each(Rn.COMPONENTS,function(a){if(!fe.isUndefined(n[a])&&!fe.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&fe.extend(this.__color.__state,n)}fe.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;fe.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,Xm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),fe.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e})(po),wT=["-moz-","-o-","-webkit-","-ms-",""];function Xm(r,e,t,n){r.style.background="",fe.each(wT,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function MT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var ET={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},TT=`<div id="dg-save" class="dg dialogue">

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

</div>`,AT=function(e,t){var n=e[t];return fe.isArray(arguments[2])||fe.isObject(arguments[2])?new xT(e,t,arguments[2]):fe.isNumber(n)?fe.isNumber(arguments[2])&&fe.isNumber(arguments[3])?fe.isNumber(arguments[4])?new Uf(e,t,arguments[2],arguments[3],arguments[4]):new Uf(e,t,arguments[2],arguments[3]):fe.isNumber(arguments[4])?new uu(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new uu(e,t,{min:arguments[2],max:arguments[3]}):fe.isString(n)?new bT(e,t):fe.isFunction(n)?new $_(e,t,""):fe.isBoolean(n)?new Y_(e,t):null};function CT(r){setTimeout(r,1e3/60)}var RT=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||CT,PT=(function(){function r(){Ji(this,r),this.backgroundElement=document.createElement("div"),fe.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),J.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),fe.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;J.bind(this.backgroundElement,"click",function(){e.hide()})}return Qi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),fe.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",J.unbind(t.domElement,"webkitTransitionEnd",i),J.unbind(t.domElement,"transitionend",i),J.unbind(t.domElement,"oTransitionEnd",i)};J.bind(this.domElement,"webkitTransitionEnd",n),J.bind(this.domElement,"transitionend",n),J.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-J.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-J.getHeight(this.domElement)/2+"px"}}]),r})(),LT=mT(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);ET.inject(LT);var qm="dg",Ym=72,jm=20,Rl="Default",Xa=(function(){try{return!!window.localStorage}catch{return!1}})(),sl=void 0,$m=!0,zo=void 0,yd=!1,K_=[],en=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),J.addClass(this.domElement,qm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=fe.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=fe.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),fe.isUndefined(n.load)?n.load={preset:Rl}:n.preset&&(n.load.preset=n.preset),fe.isUndefined(n.parent)&&n.hideable&&K_.push(this),n.resizable=fe.isUndefined(n.parent)&&n.resizable,n.autoPlace&&fe.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Xa&&localStorage.getItem(Ho(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,NT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,zf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?J.addClass(t.__ul,r.CLASS_CLOSED):J.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Xa&&(i=f,f?J.bind(window,"unload",s):J.unbind(window,"unload",s),localStorage.setItem(Ho(t,"isLocal"),f))}}}),fe.isUndefined(n.parent)){if(this.closed=n.closed||!1,J.addClass(this.domElement,r.CLASS_MAIN),J.makeSelectable(this.domElement,!1),Xa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Ho(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,J.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(J.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(J.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),J.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);J.addClass(l,"controller-name"),o=Wh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};J.addClass(this.__ul,r.CLASS_CLOSED),J.addClass(o,"title"),J.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(fe.isUndefined(n.parent)&&($m&&(zo=document.createElement("div"),J.addClass(zo,qm),J.addClass(zo,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(zo),$m=!1),zo.appendChild(this.domElement),J.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||zf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},J.bind(window,"resize",this.__resizeHandler),J.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),J.bind(this.__ul,"transitionend",this.__resizeHandler),J.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&OT(this),s=function(){Xa&&localStorage.getItem(Ho(t,"isLocal"))==="true"&&localStorage.setItem(Ho(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,fe.defer(function(){d.width-=1})}n.parent||u()};en.toggleHide=function(){yd=!yd,fe.each(K_,function(r){r.domElement.style.display=yd?"none":""})};en.CLASS_AUTO_PLACE="a";en.CLASS_AUTO_PLACE_CONTAINER="ac";en.CLASS_MAIN="main";en.CLASS_CONTROLLER_ROW="cr";en.CLASS_TOO_TALL="taller-than-window";en.CLASS_CLOSED="closed";en.CLASS_CLOSE_BUTTON="close-button";en.CLASS_CLOSE_TOP="close-top";en.CLASS_CLOSE_BOTTOM="close-bottom";en.CLASS_DRAG="drag";en.DEFAULT_WIDTH=245;en.TEXT_CLOSED="Close Controls";en.TEXT_OPEN="Open Controls";en._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Ym||r.keyCode===Ym)&&en.toggleHide()};J.bind(window,"keydown",en._keydownHandler,!1);fe.extend(en.prototype,{add:function(e,t){return ol(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return ol(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;fe.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&zo.removeChild(this.domElement);var e=this;fe.each(this.__folders,function(t){e.removeFolder(t)}),J.unbind(window,"keydown",en._keydownHandler,!1),Km(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new en(t);this.__folders[e]=n;var i=Wh(this,n.domElement);return J.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],Km(e);var t=this;fe.each(e.__folders,function(n){e.removeFolder(n)}),fe.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=J.getOffset(e.__ul).top,n=0;fe.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=J.getHeight(i))}),window.innerHeight-t-jm<n?(J.addClass(e.domElement,en.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-jm+"px"):(J.removeClass(e.domElement,en.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&fe.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:fe.debounce(function(){this.onResize()},50),remember:function(){if(fe.isUndefined(sl)&&(sl=new PT,sl.domElement.innerHTML=TT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;fe.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&IT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&zf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=bc(this)),e.folders={},fe.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=bc(this),kf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Rl]=bc(this,!0)),this.load.remembered[e]=bc(this),this.preset=e,Bf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){fe.each(this.__controllers,function(t){this.getRoot().load.remembered?Z_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),fe.each(this.__folders,function(t){t.revert(t)}),e||kf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&J_(this.__listening)},updateDisplay:function(){fe.each(this.__controllers,function(e){e.updateDisplay()}),fe.each(this.__folders,function(e){e.updateDisplay()})}});function Wh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function Km(r){J.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&J.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function kf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function DT(r,e,t){if(t.__li=e,t.__gui=r,fe.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),ol(r,t.object,t.property,{before:a,factoryArgs:[fe.toArray(arguments)]})}if(fe.isArray(o)||fe.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),ol(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Uf){var n=new uu(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});fe.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),J.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof uu){var i=function(o){if(fe.isNumber(t.__min)&&fe.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=ol(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=fe.compose(i,t.min),t.max=fe.compose(i,t.max)}else t instanceof Y_?(J.bind(e,"click",function(){J.fakeEvent(t.__checkbox,"click")}),J.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof $_?(J.bind(e,"click",function(){J.fakeEvent(t.__button,"click")}),J.bind(e,"mouseover",function(){J.addClass(t.__button,"hover")}),J.bind(e,"mouseout",function(){J.removeClass(t.__button,"hover")})):t instanceof Ff&&(J.addClass(e,"color"),t.updateDisplay=fe.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=fe.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&kf(r.getRoot(),!0),s},t.setValue)}function Z_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Rl])o=s[Rl];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function ol(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Ff(e,t);else{var s=[e,t].concat(n.factoryArgs);i=AT.apply(r,s)}n.before instanceof po&&(n.before=n.before.__li),Z_(r,i),J.addClass(i.domElement,"c");var o=document.createElement("span");J.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=Wh(r,a,n.before);return J.addClass(l,en.CLASS_CONTROLLER_ROW),i instanceof Ff?J.addClass(l,"color"):J.addClass(l,_T(i.getValue())),DT(r,l,i),r.__controllers.push(i),i}function Ho(r,e){return document.location.href+"."+e}function Bf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function Zm(r,e){e.style.display=r.useLocalStorage?"block":"none"}function IT(r){var e=r.__save_row=document.createElement("li");J.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),J.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",J.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",J.addClass(n,"button"),J.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",J.addClass(i,"button"),J.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",J.addClass(s,"button"),J.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?fe.each(r.load.remembered,function(d,f){Bf(r,f,f===r.preset)}):Bf(r,Rl,!1),J.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Xa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Ho(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),Zm(r,a),J.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,Zm(r,a)})}var u=document.getElementById("dg-new-constructor");J.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&sl.hide()}),J.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),sl.show(),u.focus(),u.select()}),J.bind(n,"click",function(){r.save()}),J.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),J.bind(s,"click",function(){r.revert()})}function OT(r){var e=void 0;r.__resize_handle=document.createElement("div"),fe.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){J.removeClass(r.__closeButton,en.CLASS_DRAG),J.unbind(window,"mousemove",t),J.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,J.addClass(r.__closeButton,en.CLASS_DRAG),J.bind(window,"mousemove",t),J.bind(window,"mouseup",n),!1}J.bind(r.__resize_handle,"mousedown",i),J.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function zf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function bc(r,e){var t={};return fe.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];fe.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function NT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function J_(r){r.length!==0&&RT.call(window,function(){J_(r)}),fe.each(r,function(e){e.updateDisplay()})}var UT=en;function Jm(r,e){if(e===Vy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Rf||e===x_){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Rf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class FT extends ho{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new VT(t)}),this.register(function(t){return new GT(t)}),this.register(function(t){return new JT(t)}),this.register(function(t){return new QT(t)}),this.register(function(t){return new e1(t)}),this.register(function(t){return new XT(t)}),this.register(function(t){return new qT(t)}),this.register(function(t){return new YT(t)}),this.register(function(t){return new jT(t)}),this.register(function(t){return new HT(t)}),this.register(function(t){return new $T(t)}),this.register(function(t){return new WT(t)}),this.register(function(t){return new ZT(t)}),this.register(function(t){return new KT(t)}),this.register(function(t){return new BT(t)}),this.register(function(t){return new t1(t)}),this.register(function(t){return new n1(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=rl.extractUrlBase(e);o=rl.resolveURL(c,this.path)}else o=rl.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new lu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Q_){try{o[At.KHR_BINARY_GLTF]=new i1(e)}catch(d){i&&i(d);return}s=JSON.parse(o[At.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new g1(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case At.KHR_MATERIALS_UNLIT:o[d]=new zT;break;case At.KHR_DRACO_MESH_COMPRESSION:o[d]=new r1(s,this.dracoLoader);break;case At.KHR_TEXTURE_TRANSFORM:o[d]=new s1;break;case At.KHR_MESH_QUANTIZATION:o[d]=new o1;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function kT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const At={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class BT{constructor(e){this.parser=e,this.name=At.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Qe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new z_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vb(u),c.distance=d;break;case"spot":c=new gb(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),nr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class zT{constructor(){this.name=At.KHR_MATERIALS_UNLIT}getMaterialType(){return Xs}extendParams(e,t,n){const i=[];e.color=new Qe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Wn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,vn))}return Promise.all(i)}}class HT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class VT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ct(a,a)}return Promise.all(s)}}class GT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class WT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class XT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Wn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,vn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class qT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class YT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(a[0],a[1],a[2],Wn),Promise.all(s)}}class jT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class $T{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(a[0],a[1],a[2],Wn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,vn)),Promise.all(s)}}class KT{constructor(e){this.parser=e,this.name=At.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class ZT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class JT{constructor(e){this.parser=e,this.name=At.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class QT{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class e1{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class t1{constructor(e){this.name=At.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class n1{constructor(e){this.name=At.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Ci.TRIANGLES&&c.mode!==Ci.TRIANGLE_STRIP&&c.mode!==Ci.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new xt,m=new X,p=new ws,x=new X(1,1,1),y=new Yx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&x.fromBufferAttribute(l.SCALE,v),y.setMatrixAt(v,g.compose(m,p,x));for(const v in l)if(v==="_COLOR_0"){const E=l[v];y.instanceColor=new Lf(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);ln.prototype.copy.call(y,_),this.parser.assignFinalMaterial(y),h.push(y)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const Q_="glTF",ka=12,Qm={JSON:1313821514,BIN:5130562};class i1{constructor(e){this.name=At.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ka),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Q_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ka,s=new DataView(e,ka);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Qm.JSON){const c=new Uint8Array(e,ka+o,a);this.content=n.decode(c)}else if(l===Qm.BIN){const c=ka+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class r1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=At.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Hf[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Hf[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Zo[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Wn,f)})})}}class s1{constructor(){this.name=At.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class o1{constructor(){this.name=At.KHR_MESH_QUANTIZATION}}class e0 extends Gl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,x=1-m,y=p-f+d;for(let v=0;v!==a;v++){const E=o[g+v+a],T=o[g+v+l]*u,S=o[_+v+a],P=o[_+v]*u;s[v]=x*E+y*T+m*S+p*P}return s}}const a1=new ws;class l1 extends e0{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return a1.fromArray(s).normalize().toArray(s),s}}const Ci={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Zo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},eg={9728:ni,9729:xi,9984:f_,9985:Bc,9986:Ga,9987:Dr},tg={33071:rs,33648:iu,10497:ua},xd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Hf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},es={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},c1={CUBICSPLINE:void 0,LINEAR:Tl,STEP:El},bd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function u1(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Fh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zr})),r.DefaultMaterial}function Is(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function nr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function d1(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function f1(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function h1(r){let e;const t=r.extensions&&r.extensions[At.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Sd(t.attributes):e=r.indices+":"+Sd(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Sd(r.targets[n]);return e}function Sd(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Vf(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function p1(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const m1=new xt;class g1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new kT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new pb(this.options.manager):this.textureLoader=new bb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new lu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Is(s,a,i),nr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[At.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(rl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=xd[i.type],a=Zo[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Bt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=xd[i.type],c=Zo[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(g=new c(a,p*h,i.count*h/u),y=new Vx(g,h/u),t.cache.add(x,y)),m=new Ih(y,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Bt(g,l,_);if(i.sparse!==void 0){const p=xd.SCALAR,x=Zo[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new x(o[1],y,i.sparse.count*p),T=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Bt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let S=0,P=E.length;S<P;S++){const b=E[S];if(m.setX(b,T[S*l]),l>=2&&m.setY(b,T[S*l+1]),l>=3&&m.setZ(b,T[S*l+2]),l>=4&&m.setW(b,T[S*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=eg[f.magFilter]||xi,u.minFilter=eg[f.minFilter]||Dr,u.wrapS=tg[f.wrapS]||ua,u.wrapT=tg[f.wrapT]||ua,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==ni&&u.minFilter!==xi,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new wn(g);m.needsUpdate=!0,f(m)}),t.load(rl.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),nr(d,o),d.userData.mimeType=o.mimeType||p1(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[At.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[At.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[At.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new N_,fr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new O_,fr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Fh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[At.KHR_MATERIALS_UNLIT]){const d=i[At.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Qe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Wn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,vn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Di);const u=s.alphaMode||bd.OPAQUE;if(u===bd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===bd.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Xs&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ct(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Xs&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Xs){const d=s.emissiveFactor;a.emissive=new Qe().setRGB(d[0],d[1],d[2],Wn)}return s.emissiveTexture!==void 0&&o!==Xs&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,vn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),nr(d,s),t.associations.set(d,{materials:e}),s.extensions&&Is(i,d,s),d})}createUniqueName(e){const t=qt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[At.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return ng(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=h1(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[At.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=ng(new wi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?u1(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const x=c[h];if(m.mode===Ci.TRIANGLES||m.mode===Ci.TRIANGLE_STRIP||m.mode===Ci.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Wx(g,x):new ti(g,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Ci.TRIANGLE_STRIP?p.geometry=Jm(p.geometry,x_):m.mode===Ci.TRIANGLE_FAN&&(p.geometry=Jm(p.geometry,Rf));else if(m.mode===Ci.LINES)p=new Zx(g,x);else if(m.mode===Ci.LINE_STRIP)p=new Uh(g,x);else if(m.mode===Ci.LINE_LOOP)p=new Jx(g,x);else if(m.mode===Ci.POINTS)p=new If(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&f1(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),nr(p,s),m.extensions&&Is(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&Is(i,d[0],s),d[0];const f=new Ir;s.extensions&&Is(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ri(mx.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Cu(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),nr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new xt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Oh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,x=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let y=0,v=f.length;y<v;y++){const E=f[y],T=h[y],S=_[y],P=g[y],b=m[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const M=n._createAnimationTracks(E,T,S,P,b);if(M)for(let L=0;L<M.length;L++)p.push(M[L])}const x=new ab(s,void 0,p);return nr(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,m1)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new D_:c.length>1?u=new Ir:c.length===1?u=c[0]:u=new ln,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),nr(u,s),s.extensions&&Is(n,u,s),s.matrix!==void 0){const d=new xt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Ir;n.name&&(s.name=i.createUniqueName(n.name)),nr(s,n),n.extensions&&Is(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof fr||f instanceof wn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];es[s.path]===es.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(es[s.path]){case es.weights:c=ha;break;case es.rotation:c=pa;break;case es.translation:case es.scale:c=ma;break;default:switch(n.itemSize){case 1:c=ha;break;case 2:case 3:default:c=ma;break}break}const u=i.interpolation!==void 0?c1[i.interpolation]:Tl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+es[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Vf(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof pa?l1:e0;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function _1(r,e,t){const n=e.attributes,i=new Ki;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new X(l[0],l[1],l[2]),new X(c[0],c[1],c[2])),a.normalized){const u=Vf(Zo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new X,l=new X;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=Vf(Zo[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new vr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function ng(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Hf[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Lt.workingColorSpace!==Wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Lt.workingColorSpace}" not supported.`),nr(r,e),_1(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?d1(r,e.targets,t):r})}const wd=new WeakMap;class v1 extends ho{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new lu(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,vn,n).catch(n)}decodeDracoFile(e,t,n,i,s=Wn,o=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){const n=JSON.stringify(t);if(wd.has(e)){const l=wd.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,u)=>{i._callbacks[s]={resolve:c,reject:u},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),wd.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new wi;e.index&&t.setIndex(new Bt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,o=i.array,a=i.itemSize,l=new Bt(o,a);s==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(o instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==vn)return;const n=new Qe;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),Lt.colorSpaceToWorking(n,vn),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new lu(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=y1.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function y1(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(u){r.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(u=>{const d=u.draco,f=new d.Decoder;try{const h=t(d,f,new Int8Array(l),c),_=h.attributes.map(g=>g.array.buffer);h.index&&_.push(h.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:h},_)}catch(h){console.error(h),self.postMessage({type:"error",id:a.id,error:h.message})}finally{d.destroy(f)}});break}};function t(o,a,l,c){const u=c.attributeIDs,d=c.attributeTypes;let f,h;const _=a.GetEncodedGeometryType(l);if(_===o.TRIANGULAR_MESH)f=new o.Mesh,h=a.DecodeArrayToMesh(l,l.byteLength,f);else if(_===o.POINT_CLOUD)f=new o.PointCloud,h=a.DecodeArrayToPointCloud(l,l.byteLength,f);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!h.ok()||f.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+h.error_msg());const g={index:null,attributes:[]};for(const m in u){const p=self[d[m]];let x,y;if(c.useUniqueIDs)y=u[m],x=a.GetAttributeByUniqueId(f,y);else{if(y=a.GetAttributeId(f,o[u[m]]),y===-1)continue;x=a.GetAttribute(f,y)}const v=i(o,a,f,m,p,x);m==="color"&&(v.vertexColorSpace=c.vertexColorSpace),g.attributes.push(v)}return _===o.TRIANGULAR_MESH&&(g.index=n(o,a,f)),o.destroy(f),g}function n(o,a,l){const u=l.num_faces()*3,d=u*4,f=o._malloc(d);a.GetTrianglesUInt32Array(l,d,f);const h=new Uint32Array(o.HEAPF32.buffer,f,u).slice();return o._free(f),{array:h,itemSize:1}}function i(o,a,l,c,u,d){const f=d.num_components(),_=l.num_points()*f,g=_*u.BYTES_PER_ELEMENT,m=s(o,u),p=o._malloc(g);a.GetAttributeDataArrayForAllPoints(l,d,m,g,p);const x=new u(o.HEAPF32.buffer,p,_).slice();return o._free(p),{name:c,array:x,itemSize:f}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const x1="/150-lab/assets/models/globe-hd.glb";function b1(r,e){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[r]){const t=window.PRELOADED_ASSETS[r];if(t instanceof ArrayBuffer){const n=new Blob([t]);return URL.createObjectURL(n)}}return e}function t0(){if(window.shaderBackgroundInitialized){console.warn("Shader background already initialized. Skipping...");return}window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=6e9;function t(){const w=document.querySelector("#events");if(!w)return!0;const k=w.getBoundingClientRect(),te=window.innerHeight*1.2;return k.top>te}const n=document.getElementById("shaderBackground");if(!n)return;function i(){try{const w=document.createElement("canvas");return!!(w.getContext("webgl")||w.getContext("experimental-webgl"))}catch{return!1}}if(!i()){console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0,setTimeout(()=>{typeof window.gsap<"u"?s(window.gsap,window.gsap.ScrollTrigger):console.warn("GSAP not found on window object - ScrollTrigger animations may not work")},200);function s(w,k){let z,te,ce,ie,et,Ve,Ut,mt;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(C&&C.color1&&C.color2&&(z=C.color1.value.clone(),te=C.color2.value.clone(),ce=C.waveSpeed.value,ie=C.waveAmplitude.value,et=C.waveFrequency.value,Ve=C.ambientLight.value,Ut=C.directionalLight.value,mt=C.yOffset.value),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:hn=>{C&&C.colorDarkness&&(C.colorDarkness.value=hn.progress*2,C.colorDarkness.value>=1.95?window.colorPhase===1?(C.color1&&C.color1.value.set(z),C.color2&&C.color2.value.set(te),window.specialColorsActive=!0):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0):z&&te&&(window.colorPhase===1?(C.color1&&C.color1.value.copy(z),C.color2&&C.color2.value.copy(te),window.specialColorsActive=!1):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!1)),a())}}}),setTimeout(()=>{o(w)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}w.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:hn=>{const ut=hn.progress;F&&(ut>.01&&!F.visible?(F.visible=!0,L.visible=!0,u()):ut<=.01&&F.visible&&(F.visible=!1,L.visible=!1,u()),F.visible&&(F.traverse(Zt=>{Zt.isMesh&&Zt.material&&(Zt.material.transparent=!0,Zt.material.opacity=ut)}),L.opacity=ut,c())),S&&(ut>.01&&!S.visible?(S.visible=!0,P.enabled=!0,d()):ut<=.01&&S.visible&&(S.visible=!1,P.enabled=!1,d()),T&&T.uniforms&&(ut>.01&&S.visible?(T.uniforms.startOpacity.value=P.startOpacity*ut,T.uniforms.endOpacity.value=P.endOpacity*ut):(T.uniforms.startOpacity.value=0,T.uniforms.endOpacity.value=0)))}}}),w.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:hn=>{const ut=hn.progress,Zt=.15;if(!window.particlesFullyHidden&&ut>=Zt?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&ut<Zt*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){oe&&oe.uniforms&&oe.uniforms.opacity&&(oe.uniforms.opacity.value=0,vo());return}const Dn=1-Math.min(ut/Zt,1),Xr=.5*Math.pow(Dn,3);oe&&oe.uniforms&&oe.uniforms.opacity&&(oe.uniforms.opacity.value=Xr,vo())}}}),w.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:hn=>{const ut=hn.progress;if(E){const di=-322+120*(1-Math.pow(1-ut,3));if(E.position.y=di,Q&&Q.__folders["Globe Model Controls"]){const Wr=Q.__folders["Globe Model Controls"].__folders.Position;if(Wr&&Wr.__controllers){for(let Xr of Wr.__controllers)if(Xr.property==="positionY"){Xr.updateDisplay();break}}}}}}}),w.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:hn=>{if(!C||!C.color1||!C.color2)return;const ut=hn.progress,Zt=new Qe("#e2e2e2"),pn=new Qe("#515151"),Dn=new Qe("#32c2d6"),di=new Qe("#004199"),Wr=Zt.clone().lerp(Dn,ut),Xr=pn.clone().lerp(di,ut);C.color1.value.copy(Wr),C.color2.value.copy(Xr),ut>.9?window.colorPhase=1:ut<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,l(),Tr();const qr=document.querySelector("#cover-area-overlay");if(qr){const yo=1-ut,ql=1+ut*1.2;qr.style.opacity=yo,qr.style.filter=`saturate(${ql})`}}}}),w.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:hn=>{if(!C||!C.color1||!C.color2)return;const ut=hn.progress,Zt=new Qe("#32c2d6"),pn=new Qe("#004199"),Dn=new Qe("#B225B1"),di=new Qe("#FCC72D"),Wr=new Qe("#DA281C"),Xr=new Qe("#FCC72D");let qr,yo;if(ut<=.4)qr=Zt.clone();else if(ut<=.8){const er=(ut-.4)/.4;qr=Zt.clone().lerp(Dn,er)}else{const er=(ut-.8)/.2;qr=Dn.clone().lerp(Wr,er)}if(ut<=.6)yo=pn.clone();else if(ut<=.8){const er=(ut-.6)/.20000000000000007;yo=pn.clone().lerp(di,er)}else{const er=(ut-.8)/.2;yo=di.clone().lerp(Xr,er)}C.color1.value.copy(qr),C.color2.value.copy(yo);const ql=document.getElementById("shaderBackground");ql&&(ql.style.filter="hue-rotate(0deg)"),ut>.9?window.colorPhase=2:ut<.1?window.colorPhase=1:window.colorPhase=1.5,r=Date.now(),window.specialColorsActive=!0;const Fu=document.querySelector("#cover-area-overlay");if(Fu){let er=0;if(ut>=.3){const Jv=(ut-.3)/.7;er=Math.min(.5,Jv*.5)}const Zv=1+ut*1.2;Fu.style.opacity=er,Fu.style.filter=`saturate(${Zv})`}l(),Tr()}}}),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{C&&C.color1&&C.color2&&(C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,l())},onLeaveBack:()=>{}}}),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:hn=>{const ut=hn.progress,Zt=document.querySelector("#cover-area-overlay");if(Zt){const pn=.5-ut*.5;Zt.style.opacity=pn,Zt.style.filter="saturate(2.2)"}}}}),w.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:hn=>{if(!C||!C.color1||!C.color2)return;const ut=hn.progress;if(ut>.1)C.color1.value.set("#dcfff6"),C.color2.value.set("#5dff9d"),C.yOffset&&(C.yOffset.value=-.05),C.ambientLight.value=.4,C.directionalLight.value=.4,C.waveAmplitude.value=1.2,C.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,l(),Os(),Tr();else if(ut<=.1&&window.colorPhase===3){const Zt=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=Zt,C.time.value=0,C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),C.yOffset&&mt!==void 0&&(C.yOffset.value=mt),Ve!==void 0&&(C.ambientLight.value=Ve),Ut!==void 0&&(C.directionalLight.value=Ut),C.waveSpeed.value=1,ie!==void 0&&(C.waveAmplitude.value=ie),et!==void 0&&(C.waveFrequency.value=et),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,l(),Os(),Tr()}a()}}}),w.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:hn=>{const Zt=1-hn.progress,pn=Math.pow(Zt,3);F&&(F.visible=!0,F.traverse(Dn=>{Dn.isMesh&&Dn.material&&(Array.isArray(Dn.material)?Dn.material.forEach(di=>{di.transparent=!0,di.opacity=pn,di.depthWrite=pn>.1,di.blending=hs,di.needsUpdate=!0}):(Dn.material.transparent=!0,Dn.material.opacity=pn,Dn.material.depthWrite=pn>.1,Dn.material.blending=hs,Dn.material.needsUpdate=!0))}),pn<.01&&(F.visible=!1),L.opacity=pn,L.rotationPaused=pn<.01,c()),S&&T&&T.uniforms&&(S.visible=pn>.01,T.uniforms.startOpacity.value=P.startOpacity*pn,T.uniforms.endOpacity.value=P.endOpacity*pn,P.enabled=pn>.01,d())}}}),w.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:hn=>{hn.progress<=.1&&ce!==void 0&&window.colorPhase===1&&(C.waveSpeed&&(C.waveSpeed.value=ce),C.waveAmplitude&&(C.waveAmplitude.value=ie),C.waveFrequency&&(C.waveFrequency.value=et),C.yOffset&&(C.yOffset.value=mt),Os(),Tr())}}});function vo(hn){if(typeof Q<"u"&&Q&&Q.__folders&&Q.__folders["Particle System"]){const ut=Q.__folders["Particle System"];if(ut&&ut.__controllers){for(let Zt of ut.__controllers)if(Zt.property==="value"&&Zt.object===oe.uniforms.opacity){Zt.updateDisplay();break}}}}}function o(w,k,z,te){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{o(w)});return}w.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top top",end:"bottom 33%",scrub:!0,markers:!1,onUpdate:ie=>{C&&C.colorDarkness&&(C.colorDarkness.value=2-ie.progress*2,window.colorPhase===3?(C.color1&&C.color1.value.set("#dcfff6"),C.color2&&C.color2.value.set("#5dff9d"),C.ambientLight&&(C.ambientLight.value=.4),C.directionalLight&&(C.directionalLight.value=.4),C.waveSpeed&&(C.waveSpeed.value=.9),C.waveAmplitude&&(C.waveAmplitude.value=1.2),window.specialColorsActive=!0,l(),Os(),Tr()):window.colorPhase===2?(C.color1&&C.color1.value.set("#da281c"),C.color2&&C.color2.value.set("#FCC72D"),window.specialColorsActive=!0,l(),Os(),Tr()):window.colorPhase===1?(C.color1&&C.color1.value.set("#32c2d6"),C.color2&&C.color2.value.set("#004199"),window.specialColorsActive=!0,l(),Os(),Tr()):(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0,l(),Os(),Tr()),a())}}})}function a(){const w=window.gui,k=window.uniforms;if(typeof w<"u"&&w&&w.__folders&&w.__folders["Color Controls"]){const z=w.__folders["Color Controls"];if(z&&z.__controllers){for(let te of z.__controllers)if(te.property==="value"&&te.object===k.colorDarkness){te.updateDisplay();break}}}}function l(){const w=window.gui,k=window.uniforms;if(typeof w<"u"&&w&&w.__folders&&w.__folders["Color Controls"]){const z=w.__folders["Color Controls"];z&&z.__controllers&&z.__controllers.forEach(te=>{if(te.property==="color"&&te.__color){if(te.property==="color"&&te.__li&&te.__li.querySelector(".property-name").textContent==="Color 1"){const ie="#"+k.color1.value.getHexString();te.setValue(ie)}else if(te.property==="color"&&te.__li&&te.__li.querySelector(".property-name").textContent==="Color 2"){const ie="#"+k.color2.value.getHexString();te.setValue(ie)}}})}}function c(){if(typeof Q<"u"&&Q&&Q.__folders&&Q.__folders["Globe Model Controls"]&&Q.__folders["Globe Model Controls"].__folders&&Q.__folders["Globe Model Controls"].__folders.Material){const w=Q.__folders["Globe Model Controls"].__folders.Material;if(w&&w.__controllers)for(let k of w.__controllers)k.property==="opacity"&&k.updateDisplay()}}function u(){if(typeof Q<"u"&&Q&&Q.__folders&&Q.__folders["Globe Model Controls"]){const w=Q.__folders["Globe Model Controls"];if(w&&w.__controllers){for(let k of w.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function d(){if(typeof Q<"u"&&Q&&Q.__folders&&Q.__folders["Gradient Overlay Controls"]){const w=Q.__folders["Gradient Overlay Controls"];if(w&&w.__controllers){for(let k of w.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function f(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const h=window.innerWidth,_=f();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100svh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";let g;try{g=new pT({canvas:n,alpha:!0,antialias:!1,powerPreference:"default",failIfMajorPerformanceCaveat:!1}),g.setSize(h,_),g.setPixelRatio(Math.min(window.devicePixelRatio,2))}catch(w){console.error("Failed to create WebGL renderer:",w),console.warn("Falling back to fallback background. WebGL initialization failed."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,n.addEventListener("webglcontextlost",function(w){console.warn("WebGL context lost. Attempting to restore..."),w.preventDefault(),window.shaderBackgroundInitialized=!1}),n.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{t0()}catch(w){console.error("Failed to reinitialize shader background after context restore:",w)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const m=new Zp,p=new Zp;let x=0;const y={zoom:2.471,zPosition:1},v=new Cu(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);v.position.z=y.zPosition,v.zoom=y.zoom,v.updateProjectionMatrix();const E=new Ir;E.position.y=-322,E.frustumCulled=!0,m.add(E);let T,S;const P={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function b(){T=new Oi({transparent:!0,uniforms:{startOpacity:{value:P.startOpacity},endOpacity:{value:P.endOpacity},overlayColor:{value:new Qe(P.color)},offsetY:{value:P.offsetY},heightMultiplier:{value:P.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Di});const w=window.innerHeight,k=v.right-v.left,z=v.top-v.bottom,te=w*.66*(z/w),ce=new Gi(k,te);S=new ti(ce,T),S.rotation.set(0,0,0),S.position.x=0,S.position.y=P.yOffset*z,S.position.z=-100,S.frustumCulled=!1,S.renderOrder=9999,S.visible=P.enabled,m.add(S)}function M(){if(!S)return;S.rotation.set(0,0,0),S.position.x=0;const w=v.top-v.bottom;S.position.y=P.yOffset*w,S.position.z=-100}b();const L={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},U=new FT,W=new v1;W.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),W.setDecoderConfig({type:"js"}),U.setDRACOLoader(W);let F;const q=w=>{F=w.scene;let z=new Ki().setFromObject(F).getCenter(new X),te=new Ir;te.add(F),F.position.set(-z.x,-z.y,-z.z),F=te,F.visible=L.visible,F.frustumCulled=!0,F.traverse(et=>{et.isMesh&&(et.frustumCulled=!0)}),E.add(F),F.position.set(L.positionX,L.positionY,L.positionZ),F.rotation.set(L.rotationX*Math.PI/180,L.rotationY*Math.PI/180,L.rotationZ*Math.PI/180),L.responsive?_t():(F.scale.set(L.scale,L.scale,L.scale),lt());const ce=B.addFolder("Material");let ie=0;F.traverse(et=>{if(et.isMesh&&et.material){const Ve=et.material;if(ie++,Ve.isMeshStandardMaterial||Ve.isMeshPhongMaterial){Ve.metalness!==void 0&&ce.add({metalness:Ve.metalness},"metalness",0,1).name(`Metalness${ie>1?" "+ie:""}`).onChange(mt=>{Ve.metalness=mt}),Ve.roughness!==void 0&&ce.add({roughness:Ve.roughness},"roughness",0,1).name(`Roughness${ie>1?" "+ie:""}`).onChange(mt=>{Ve.roughness=mt}),Ve.shininess!==void 0&&ce.add({shininess:Ve.shininess},"shininess",0,100).name(`Shininess${ie>1?" "+ie:""}`).onChange(mt=>{Ve.shininess=mt}),ce.add({opacity:Ve.opacity},"opacity",0,1).name(`Opacity${ie>1?" "+ie:""}`).onChange(mt=>{Ve.opacity=mt,Ve.transparent=mt<1});const Ut=Ve.emissive?"#"+Ve.emissive.getHexString():"#000000";ce.addColor({color:Ut},"color").name(`Emissive Color${ie>1?" "+ie:""}`).onChange(mt=>{Ve.emissive&&Ve.emissive.set(mt)})}}})},j=b1("globe-hd.glb",x1);U.load(j,q,w=>{},w=>{console.error("Error loading globe model:",w)}),window.uniforms={time:{value:0},resolution:{value:new Ct(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new Qe("#e2e2e2")},color2:{value:new Qe("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Ct(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new X(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const C=window.uniforms,Y=`
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
  `,he=`
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
    uniform float colorCycleOffset;
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
      // Use continuous time for perfectly smooth wave motion
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
      
      // Color cycling is now handled separately in the main function
      // Wave patterns use only regular time to prevent speed accumulation
      
      // Create pulsing amplitude effect over time for more organic movement
      // Make the pulse effect respond to depth for better synergy
      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;
      
      // Generate waves with more organic variation
      // Make the waves directly respond to the depth parameter for better depth-color synergy
      float depthFactor = 1.0 - depth * 0.5; // Higher value for foreground
      
      // Use depth to influence wave frequency and phase for better synergy
      // Create wave patterns that are independent of color cycling to prevent speed accumulation
      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + depthTimeComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + depthTimeComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + depthTimeComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
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
      // Use separate time for color cycling to prevent wave intensity accumulation
      float colorCycleTime = time + colorCycleOffset;
      float colorCyclePhase = colorCycleTime * colorCycleSpeed;
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
      // Reduce the influence of colorCyclePhase to minimize optical motion during scrubbing
      float reducedCycleInfluence = waveDepthFactor * 0.2; // Reduced from 0.5 to 0.2
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, reducedCycleInfluence);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, reducedCycleInfluence);
      
      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      
      // Add subtle color variations that are synchronized with the wave patterns
      // Reduce the intensity of color variations to minimize optical motion during scrubbing
      // Use colorCycleTime for color variations to maintain continuity
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015, sin(colorCycleTime * 0.7) * 0.015) * foregroundWave;
      backgroundColor += vec3(cos(colorCycleTime * 0.4) * 0.015, sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015) * backgroundWave;
      
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
      // Synchronize the darkness variation with the wave pattern, reduced intensity for less optical motion
      // Keep using time for wave-related breathing effect
      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.025 + middleWave * 0.05);
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
      // Synchronize light movement with wave patterns for better synergy, reduced intensity
      // Make the light direction respond directly to the wave pattern (keep using time for wave-related motion)
      lightDir.x += sin(time * 0.2) * 0.025 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.025 * middleWave;
      // Add a subtle rotation to the light direction based on the wave pattern
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      vec3 rotatedLightDir = vec3(
          lightDir.x * cos(lightRotation) - lightDir.y * sin(lightRotation),
          lightDir.x * sin(lightRotation) + lightDir.y * cos(lightRotation),
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);
      
      // Ambient lighting with subtle color variation
      // Make the ambient color variation respond to the wave pattern, reduced intensity
      // Create a more dynamic ambient color that's influenced by the wave pattern (keep using time for wave-related motion)
      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.015, cos(time * 0.4) * 0.015, sin(time * 0.5) * 0.015) * middleWave;
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
      // Synchronize specular highlights with wave patterns, reduced intensity (keep using time for wave-related motion)
      float specularVariation = 1.0 + sin(time * 0.5) * 0.1 * foregroundWave;
      // Add color to the specular highlights based on the wave pattern
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth with more variation
      // Make highlights directly respond to the wave pattern for better synergy, reduced intensity (keep using time for wave-related motion)
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.1);
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
      
      // Add subtle noise to alpha for a more organic edge (keep using time for wave-related motion)
      float edgeNoise = fbm(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoise * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `,O=new Gi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),_e=new Oi({vertexShader:Y,fragmentShader:he,uniforms:C,transparent:!0,side:Di}),ve=new ti(O,_e);m.add(ve),window.gui=new UT({width:300,closed:!0});const Q=window.gui;Q.domElement.style.position="absolute",Q.domElement.style.top="10px",Q.domElement.style.right="10px";const qe=Q.domElement.querySelector(".close-button");qe&&(qe.innerHTML="Open Controls",qe.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=Q.closed?"Open Controls":"Close Controls"},50)}));const He=Q.addFolder("Camera Controls");He.add(y,"zoom",.1,5).name("Zoom Level").step(.001).onChange(w=>{v.zoom=w,v.updateProjectionMatrix()}),He.close();const ee=Q.addFolder("Animation Speed Controls");ee.add(C.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(w=>{C.mainSpeed.value=w}),ee.add(C.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(w=>{C.waveSpeed.value=w}),ee.add(C.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(w=>{C.noiseSpeed.value=w}),ee.add(C.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(w=>{C.colorCycleSpeed.value=w}),ee.add(C.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(w=>{C.colorCycleOffset.value=w}),ee.open();const re=Q.addFolder("Color Controls"),Se="#"+C.color1.value.getHexString(),Ge="#"+C.color2.value.getHexString();re.addColor({color:Se},"color").name("Color 1").onChange(w=>{typeof w=="string"?C.color1.value.set(w):C.color1.value.setRGB(w.r/255,w.g/255,w.b/255)}),re.addColor({color:Ge},"color").name("Color 2").onChange(w=>{typeof w=="string"?C.color2.value.set(w):C.color2.value.setRGB(w.r/255,w.g/255,w.b/255)}),re.add(C.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(w=>{C.colorDarkness.value=w}),re.add(C.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(w=>{C.colorWaveInfluence.value=w}),re.add(C.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(w=>{C.colorFrequencyShift.value=w}),re.add(C.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(w=>{C.colorAmplitudeEffect.value=w}),re.open();const ye=Q.addFolder("Wave Controls");ye.add(C.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(w=>{C.waveAmplitude.value=w}),ye.add(C.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(w=>{C.waveFrequency.value=w}),ye.add(C.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(w=>{C.waveDepth.value=w}),ye.add(C.noiseScale,"value",0,5).name("Noise Scale").onChange(w=>{C.noiseScale.value=w}),ye.add(C.noiseInfluence,"value",0,1).name("Noise Influence").onChange(w=>{C.noiseInfluence.value=w}),ye.add(C.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(w=>{C.layerOffset.value=w});const it=ye.addFolder("Flow Direction");it.add(C.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(w=>{C.flowDirection.value.x=w}),it.add(C.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(w=>{C.flowDirection.value.y=w});const ft=Q.addFolder("Appearance Controls"),I=Q.addFolder("Film Noise Controls");I.add(C.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(w=>{C.filmNoiseIntensity.value=w}),I.add(C.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(w=>{C.filmNoiseSpeed.value=w}),I.add(C.filmGrainSize,"value",.5,50).name("Grain Size").onChange(w=>{C.filmGrainSize.value=w}),I.add(C.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(w=>{C.filmScratchIntensity.value=w}),ft.add(C.xOffset,"value",-1,1).step(.001).name("X Position").onChange(w=>{C.xOffset.value=w}),ft.add(C.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(w=>{C.yOffset.value=w}),ft.add(C.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(w=>{C.fadeWidth.value=w}),ft.add(C.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(w=>{C.topEdgeSoftness.value=w}),ft.add(C.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(w=>{C.bottomEdgeSoftness.value=w}),ft.add(C.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(w=>{C.leftEdgeSoftness.value=w}),ft.add(C.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(w=>{C.rightEdgeSoftness.value=w}),ft.add(C.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(w=>{C.leftCornerRoundness.value=w}),ft.add(C.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(w=>{C.rightCornerRoundness.value=w}),ft.add(C.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(w=>{C.edgeDepth.value=w}),ft.add(C.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(w=>{C.edgeContrast.value=w}),ft.add(C.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(w=>{C.edgeNoiseAmount.value=w}),ft.add(C.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(w=>{C.edgeNoiseScale.value=w});const st=Q.addFolder("Bottom Wave Edge Controls");st.add(C.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(w=>{C.bottomWaveEnabled.value=w,F&&L.responsive&&lt()}),st.add(C.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(w=>{C.bottomWaveDepth.value=w,F&&L.responsive&&lt()}),st.add(C.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(w=>{C.bottomWaveWidth.value=w}),st.add(C.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(w=>{C.bottomWaveSpeed.value=w}),st.add(C.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(w=>{C.bottomWaveOffset.value=w});const Ke=Q.addFolder("Lighting Controls");Ke.add(C.ambientLight,"value",0,1).name("Ambient Light").onChange(w=>{C.ambientLight.value=w}),Ke.add(C.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(w=>{C.directionalLight.value=w}),Ke.add(C.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(w=>{C.specularStrength.value=w}),Ke.add(C.shininess,"value",1,128).name("Shininess").onChange(w=>{C.shininess.value=w});const Ye=Ke.addFolder("Light Direction");Ye.add(C.lightDirection.value,"x",-1,1).name("X").onChange(()=>{C.lightDirection.value.normalize()}),Ye.add(C.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{C.lightDirection.value.normalize()}),Ye.add(C.lightDirection.value,"z",0,1).name("Z").onChange(()=>{C.lightDirection.value.normalize()});const B=Q.addFolder("Globe Model Controls"),ht=new z_(16777215,10);ht.position.set(1,1,1),m.add(ht);const Fe=new xb(16777215,.5);m.add(Fe);const ot=B.addFolder("Lighting");ot.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(w=>{ht.intensity=w}),ht.intensity=3,ot.add({intensity:Fe.intensity},"intensity",0,5).name("Ambient Light").onChange(w=>{Fe.intensity=w}),B.add(L,"visible").name("Show Globe").onChange(w=>{F&&(F.visible=w)}),B.add(L,"scale",.1,50).name("Size").step(.1).onChange(w=>{F&&(L.baseScale=w,F.scale.set(w,w,w))}),B.add(L,"responsive").name("Responsive Size").onChange(w=>{!w&&F?F.scale.set(L.baseScale,L.baseScale,L.baseScale):w&&_t()}),B.add({resizeGlobe:function(){F&&_t()}},"resizeGlobe").name("Force Resize"),B.add({positionBehindWave:function(){F&&lt()}},"positionBehindWave").name("Position Behind Wave");function lt(){if(!F)return;const w=window.innerWidth;if(w<=640){F.position.y=192,F.position.z=-10;for(let te=0;te<D.__controllers.length;te++){const ce=D.__controllers[te];ce.property==="positionY"?ce.setValue(192):ce.property==="positionZ"&&ce.setValue(-10)}return}if(w>640&&w<=1024){F.position.y=192,F.position.z=-10;for(let ce=0;ce<D.__controllers.length;ce++){const ie=D.__controllers[ce];ie.property==="positionY"?ie.setValue(192):ie.property==="positionZ"&&ie.setValue(-10)}return}const k=-40,z=-10;F.position.y=k,F.position.z=z;for(let te=0;te<D.__controllers.length;te++){const ce=D.__controllers[te];ce.property==="positionY"?ce.setValue(k):ce.property==="positionZ"&&ce.setValue(z)}}function _t(){if(!F||!L.responsive)return;const w=window.innerWidth;if(w>1024){F.scale.set(40,40,40);for(let ce=0;ce<B.__controllers.length;ce++)if(B.__controllers[ce].property==="scale"){B.__controllers[ce].setValue(40);break}lt();return}let k;w<=640?k=w*1.2:k=w*.9;const z={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const te=new Ki().setFromObject(F),ce=te.max.x-te.min.x;F.scale.set(z.x,z.y,z.z);const et=(v.right-v.left)/v.zoom/w,Ut=k*et/ce;F.scale.set(Ut,Ut,Ut);for(let mt=0;mt<B.__controllers.length;mt++)if(B.__controllers[mt].property==="scale"){B.__controllers[mt].setValue(Ut);break}lt()}catch(te){console.error("Error updating globe size:",te),F.scale.set(z.x,z.y,z.z)}}const D=B.addFolder("Position");D.add(L,"positionX",-500,500).name("X Position").step(1).onChange(w=>{F&&(F.position.x=w)}),D.add(L,"positionY",-500,500).name("Y Position").step(1).onChange(w=>{F&&(F.position.y=w)}),D.add(L,"positionZ",-500,500).name("Z Position").step(1).onChange(w=>{F&&(F.position.z=w)});const A=B.addFolder("Rotation");A.add(L,"rotationX",0,360).name("X Rotation").step(1).onChange(w=>{F&&(F.rotation.x=w*Math.PI/180)}),A.add(L,"rotationY",0,360).name("Y Rotation").step(1).onChange(w=>{F&&(F.rotation.y=w*Math.PI/180)}),A.add(L,"rotationZ",0,360).name("Z Rotation").step(1).onChange(w=>{F&&(F.rotation.z=w*Math.PI/180)}),B.add(L,"autoRotate").name("Auto Rotate").onChange(w=>{L.autoRotate=w}),B.add(L,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(w=>{L.baseRotateSpeed=w}),B.add(L,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(w=>{L.scrollRotateSpeed=w}),B.open();const G=Q.addFolder("Gradient Overlay Controls");G.add(P,"enabled").name("Show Overlay").onChange(w=>{S&&(S.visible=w)});const se=G.add(P,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(w=>{T&&(T.uniforms.startOpacity.value=w)});se.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const ae=G.add(P,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(w=>{T&&(T.uniforms.endOpacity.value=w)});ae.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",G.add(P,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(w=>{S&&M()}),G.add(P,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(w=>{T&&(T.uniforms.offsetY.value=w)}),G.add(P,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(w=>{T&&(T.uniforms.heightMultiplier.value=w)}),G.addColor(P,"color").name("Color").onChange(w=>{T&&T.uniforms.overlayColor.value.set(w)}),G.add({debugOverlay:function(){if(T){const w=T.uniforms.startOpacity.value,k=T.uniforms.endOpacity.value;T.uniforms.startOpacity.value=1,T.uniforms.endOpacity.value=1,T.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{T.uniforms.startOpacity.value=w,T.uniforms.endOpacity.value=k,T.uniforms.overlayColor.value.set(P.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),G.open();let $=150,Te=new Float32Array($*3),pe=new Float32Array($*3),Ee=new Float32Array($*3),we=0,ge=0;const ne={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let We=window.innerHeight*ne.verticalSpread,Ie=window.innerWidth*ne.horizontalSpread;function be(){const w=new Float32Array($);for(let k=0;k<$;k++){const z=k*3,te=Math.random(),ce=ne.sizeMin+te*(ne.sizeMax-ne.sizeMin);w[k]=ce/oe.uniforms.baseSize.value;const ie=new Qe(Be.color),et=.8+te*.6;Ee[z]=ie.r*et,Ee[z+1]=ie.g*et,Ee[z+2]=ie.b*et}Le.setAttribute("size",new Bt(w,1)),Le.attributes.position.needsUpdate=!0,Le.attributes.color.needsUpdate=!0,Le.attributes.size.needsUpdate=!0}for(let w=0;w<$;w++){const k=w*3;Te[k]=(Math.random()-.5)*Ie,Te[k+1]=(Math.random()-.5)*We+ne.verticalOffset,Te[k+2]=Math.random()*500-250,pe[k]=(Math.random()-.5)*.5,pe[k+1]=(Math.random()-.5)*.5,pe[k+2]=(Math.random()-.5)*.2;const z=new Qe("#25e5ff");Ee[k]=z.r,Ee[k+1]=z.g,Ee[k+2]=z.b}const Le=new wi;Le.setAttribute("position",new Bt(Te,3)),Le.setAttribute("color",new Bt(Ee,3));const N=me();function me(){const w=document.createElement("canvas");w.width=256,w.height=256;const k=w.getContext("2d"),z=k.createRadialGradient(w.width/2,w.height/2,0,w.width/2,w.height/2,w.width/2);z.addColorStop(0,"rgba(255, 255, 255, 1.0)"),z.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),z.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),z.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),z.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),z.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),z.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=z,k.fillRect(0,0,w.width,w.height),k.beginPath(),k.moveTo(w.width/2,w.width*.3),k.lineTo(w.width/2,w.width*.7),k.moveTo(w.width*.3,w.height/2),k.lineTo(w.width*.7,w.height/2),k.moveTo(w.width*.35,w.height*.35),k.lineTo(w.width*.65,w.height*.65),k.moveTo(w.width*.65,w.height*.35),k.lineTo(w.width*.35,w.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const te=k.createRadialGradient(w.width/2,w.height/2,w.width*.2,w.width/2,w.height/2,w.width*.7);te.addColorStop(0,"rgba(255, 255, 255, 0.3)"),te.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),te.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=te,k.fillRect(0,0,w.width,w.height);const ce=new wn(w);return ce.needsUpdate=!0,ce}const oe=new Oi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:N},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:nu,depthWrite:!1,depthTest:!1}),Pe=new If(Le,oe);Pe.frustumCulled=!0,p.add(Pe);const le=Q.addFolder("Particle System"),ue={count:$};le.add(ue,"count",100,1e3,10).name("Particle Count").onChange(w=>{$=Math.floor(w);const k=new Float32Array($*3),z=new Float32Array($*3),te=new Float32Array($*3);for(let ce=0;ce<$;ce++){const ie=ce*3;if(ce<Te.length/3)k[ie]=Te[ie],k[ie+1]=Te[ie+1],k[ie+2]=Te[ie+2],z[ie]=pe[ie],z[ie+1]=pe[ie+1],z[ie+2]=pe[ie+2],te[ie]=Ee[ie],te[ie+1]=Ee[ie+1],te[ie+2]=Ee[ie+2];else{k[ie]=(Math.random()-.5)*Ie,k[ie+1]=(Math.random()-.5)*We+ne.verticalOffset,k[ie+2]=Math.random()*500-250,z[ie]=(Math.random()-.5)*.5,z[ie+1]=(Math.random()-.5)*.5,z[ie+2]=(Math.random()-.5)*.2;const et=new Qe(Be.color);te[ie]=et.r,te[ie+1]=et.g,te[ie+2]=et.b}}Te=k,pe=z,Ee=te,Le.setAttribute("position",new Bt(Te,3)),Le.setAttribute("color",new Bt(Ee,3)),Le.attributes.position.needsUpdate=!0,Le.attributes.color.needsUpdate=!0,be()});const Be={color:"#25e5ff"};le.addColor(Be,"color").name("Particle Color").onChange(w=>{const k=new Qe(w);for(let z=0;z<$;z++){const te=z*3;Ee[te]=k.r,Ee[te+1]=k.g,Ee[te+2]=k.b}Le.setAttribute("color",new Bt(Ee,3)),Le.attributes.color.needsUpdate=!0}),le.add(oe.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(w=>{be()}),le.add(oe.uniforms.opacity,"value",0,1,.1).name("Opacity"),le.add(oe.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(w=>{oe.uniforms.brightness.value=w});const rt={intensity:1.5};le.add(rt,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(w=>{oe.uniforms.opacity.value=w});const Ot={enabled:!1},Oe=le.add(Ot,"enabled").name("Size Attenuation").onChange(w=>{w?oe.vertexShader=`
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
        `:oe.vertexShader=`
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
        `,oe.needsUpdate=!0,be()}),Ne=document.createElement("div");Ne.className="gui-tooltip",Ne.textContent="When enabled, particles appear smaller as they move further away",Ne.style.position="absolute",Ne.style.backgroundColor="rgba(0,0,0,0.8)",Ne.style.color="#fff",Ne.style.padding="5px",Ne.style.borderRadius="3px",Ne.style.fontSize="11px",Ne.style.zIndex="10000",Ne.style.display="none",document.body.appendChild(Ne);const dt=Oe.domElement;dt.addEventListener("mouseenter",w=>{const k=dt.getBoundingClientRect();Ne.style.left=k.right+"px",Ne.style.top=k.top+"px",Ne.style.display="block"}),dt.addEventListener("mouseleave",()=>{Ne.style.display="none"});let Ae=0;window.addEventListener("scroll",()=>{we=window.scrollY});let Xe=[],ze={x:0,y:0},at={x:0,y:0},nn=0,ct=0,Ft=!1,Kt=250,vt=[],Ht=10,bt,sn=!1,Rt=[];const Ce={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window,spawnRate:.52,maxParticles:150,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};bt=Ce.spawnOffsetMin,window.enableMouseParticles=function(){Ce.mobileDisabled||(Ce.enabled=!0)};const Nt=new wi,R=new Oi({uniforms:{baseSize:{value:Ce.baseSize},map:{value:N},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
      attribute vec3 color;
      attribute float size;
      attribute float opacity;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vOpacity;
      varying float vSize;
      
      void main() {
        vColor = color;
        vOpacity = opacity;
        vSize = size;
        
        // Convert mouse coordinates to world coordinates
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply size with opacity influence for fading effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float brightness;
      uniform float haloStrength;
      
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        // Calculate distance from center of point (in 0-1 range)
        vec2 centeredUV = gl_PointCoord - 0.5;
        float dist = length(centeredUV) * 2.0;
        
        // Sample the texture
        vec4 texColor = texture2D(map, gl_PointCoord);
        
        // Apply color and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create halo effect
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5);
        
        // Boost core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for halo
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply opacity and texture alpha
        float finalOpacity = texColor.a * vOpacity;
        gl_FragColor = vec4(finalColor, finalOpacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.01) discard;
      }
    `,transparent:!0,blending:nu,depthWrite:!1,depthTest:!1}),H=new If(Nt,R);p.add(H);function K(w,k){const z=w/window.innerWidth*2-1,te=-(k/window.innerHeight)*2+1,ce=z*(v.right-v.left)/2/v.zoom,ie=te*(v.top-v.bottom)/2/v.zoom;return{x:ce,y:ie}}function Z(w,k){return{id:nn++,position:{x:w,y:k,z:Math.random()*100-50},targetPosition:{x:w,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Ce.minLifetime+Math.random()*(Ce.maxLifetime-Ce.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function V(w,k){return{id:nn++,position:{x:w,y:k,z:Math.random()*100-50},originalPosition:{x:w,y:k},targetPosition:{x:w,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:Ce.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}function de(){const w=[...Xe,...Rt];if(w.length===0){Nt.attributes.position&&(Nt.setAttribute("position",new Bt(new Float32Array(0),3)),Nt.setAttribute("color",new Bt(new Float32Array(0),3)),Nt.setAttribute("size",new Bt(new Float32Array(0),1)),Nt.setAttribute("opacity",new Bt(new Float32Array(0),1)));return}const k=new Float32Array(w.length*3),z=new Float32Array(w.length*3),te=new Float32Array(w.length),ce=new Float32Array(w.length);for(let ie=0;ie<w.length;ie++){const et=w[ie],Ve=ie*3;k[Ve]=et.position.x,k[Ve+1]=et.position.y,k[Ve+2]=et.position.z,z[Ve]=et.color.r,z[Ve+1]=et.color.g,z[Ve+2]=et.color.b,te[ie]=et.size,ce[ie]=et.opacity}Nt.setAttribute("position",new Bt(k,3)),Nt.setAttribute("color",new Bt(z,3)),Nt.setAttribute("size",new Bt(te,1)),Nt.setAttribute("opacity",new Bt(ce,1)),Nt.attributes.position.needsUpdate=!0,Nt.attributes.color.needsUpdate=!0,Nt.attributes.size.needsUpdate=!0,Nt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",w=>{if(!Ce.enabled||Ce.mobileDisabled)return;at.x=ze.x,at.y=ze.y,ze.x=w.clientX,ze.y=w.clientY;const k=ze.x-at.x,z=ze.y-at.y,te=Math.sqrt(k*k+z*z);if(Ft||(ct+=te,ct>=Kt&&(Ft=!0)),vt.push(te),vt.length>Ht&&vt.shift(),vt.length>0){const ce=vt.reduce((Ve,Ut)=>Ve+Ut,0)/vt.length,et=Math.min(ce/20,1);bt=Ce.spawnOffsetMin+(Ce.spawnOffsetMax-Ce.spawnOffsetMin)*et}if(Ft&&te>1&&Xe.length<Ce.maxParticles&&Math.random()<Ce.spawnRate){const ce=K(ze.x,ze.y),ie=bt*50,et=Math.random()*Math.PI*2,Ve=Math.cos(et)*ie*Math.random(),Ut=Math.sin(et)*ie*Math.random(),mt=Z(ce.x+Ve,ce.y+Ut);Xe.push(mt)}if(sn&&Xe.length<Ce.maxParticles&&Math.random()<.8){const ce=K(ze.x,ze.y),ie=10,et=Math.random()*Math.PI*2,Ve=Math.cos(et)*ie*Math.random(),Ut=Math.sin(et)*ie*Math.random(),mt=V(ce.x+Ve,ce.y+Ut);Rt.push(mt)}}),window.addEventListener("mousedown",w=>{!Ce.enabled||Ce.mobileDisabled||w.button===0&&(sn=!0)}),window.addEventListener("mouseup",w=>{w.button===0&&(sn=!1)});let xe={x:0,y:0},Me={x:0,y:0},ke=!1;window.addEventListener("touchstart",w=>{if(!Ce.enabled||Ce.mobileDisabled)return;const k=w.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||w.preventDefault();const te=w.touches[0];Me.x=te.clientX,Me.y=te.clientY,xe.x=Me.x,xe.y=Me.y,ke=!0,sn=!0},{passive:!1}),window.addEventListener("touchmove",w=>{if(!Ce.enabled||Ce.mobileDisabled||!ke)return;const k=w.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||w.preventDefault();const te=w.touches[0];xe.x=Me.x,xe.y=Me.y,Me.x=te.clientX,Me.y=te.clientY,ze.x=Me.x,ze.y=Me.y;const ce=Me.x-xe.x,ie=Me.y-xe.y,et=Math.sqrt(ce*ce+ie*ie);if(Ft||(ct+=et,ct>=Kt&&(Ft=!0)),vt.push(et),vt.length>Ht&&vt.shift(),vt.length>0){const Ve=vt.reduce((go,_o)=>go+_o,0)/vt.length,mt=Math.min(Ve/20,1);bt=Ce.spawnOffsetMin+(Ce.spawnOffsetMax-Ce.spawnOffsetMin)*mt}if(Ft&&et>1&&Xe.length<Ce.maxParticles&&Math.random()<Ce.spawnRate){const Ve=K(Me.x,Me.y),Ut=bt*50,mt=Math.random()*Math.PI*2,go=Math.cos(mt)*Ut*Math.random(),_o=Math.sin(mt)*Ut*Math.random(),vo=Z(Ve.x+go,Ve.y+_o);Xe.push(vo)}if(sn&&Xe.length<Ce.maxParticles&&Math.random()<.8){const Ve=K(Me.x,Me.y),Ut=10,mt=Math.random()*Math.PI*2,go=Math.cos(mt)*Ut*Math.random(),_o=Math.sin(mt)*Ut*Math.random(),vo=V(Ve.x+go,Ve.y+_o);Rt.push(vo)}},{passive:!1}),window.addEventListener("touchend",w=>{ke=!1,sn=!1}),window.addEventListener("touchcancel",w=>{ke=!1,sn=!1});function tt(){if(Xe.length===0&&Rt.length===0||Ce.mobileDisabled)return;const w=K(ze.x,ze.y);for(let k=Xe.length-1;k>=0;k--){const z=Xe[k];if(z.life+=.016,!z.isDrawn){z.targetPosition.x=w.x,z.targetPosition.y=w.y;const ce=z.trailSpeed*Ce.trailLength;z.position.x+=(z.targetPosition.x-z.position.x)*ce,z.position.y+=(z.targetPosition.y-z.position.y)*ce,z.position.x+=(Math.random()-.5)*2*Ce.jitterAmount,z.position.y+=(Math.random()-.5)*2*Ce.jitterAmount}const te=z.life/z.maxLife;if(te<.15){z.fadePhase="in";const ce=te/.15,ie=1-Math.pow(1-ce,2);z.opacity=ie*Ce.fadeInSpeed}else if(te<.65)z.fadePhase="hold",z.opacity=Ce.fadeInSpeed;else{z.fadePhase="out";const ce=(te-.65)/.35,ie=Math.pow(1-ce,2);z.opacity=ie*Ce.fadeInSpeed*Ce.fadeOutSpeed}(z.life>=z.maxLife||z.opacity<=0)&&Xe.splice(k,1)}for(let k=Rt.length-1;k>=0;k--){const z=Rt[k];z.life+=.016,z.twinklePhase+=.016*z.twinkleSpeed;const te=Math.sin(z.twinklePhase)*z.twinkleRadius*.4,ce=Math.cos(z.twinklePhase*1.05)*z.twinkleRadius*.4;z.position.x=z.originalPosition.x+te,z.position.y=z.originalPosition.y+ce;const ie=z.life/z.maxLife;if(ie<.15){z.fadePhase="in";const Ve=ie/.15,Ut=1-Math.pow(1-Ve,2);z.baseOpacity=Ut*Ce.fadeInSpeed}else if(ie<.85)z.fadePhase="hold",z.baseOpacity=Ce.fadeInSpeed;else{z.fadePhase="out";const Ve=(ie-.85)/.15,Ut=Math.pow(1-Ve,2);z.baseOpacity=Ut*Ce.fadeInSpeed*Ce.fadeOutSpeed}const et=.7+.3*Math.sin(z.twinklePhase*2);z.opacity=z.baseOpacity*et,(z.life>=z.maxLife||z.opacity<=0)&&Rt.splice(k,1)}de(),Ze.currentOffset=bt}const De=Q.addFolder("Mouse Follow Particles");De.add({mobileDetected:Ce.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),De.add(Ce,"enabled").name("Enable Mouse Particles").onChange(w=>{w||(Xe=[],Rt=[],de(),Ft=!1,ct=0,vt=[],bt=Ce.spawnOffsetMin,sn=!1)}),De.add(Ce,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(w=>{Ce.spawnRate=w}),De.add(Ce,"maxParticles",10,50,1).name("Max Particles").onChange(w=>{for(Ce.maxParticles=w;Xe.length>w;)Xe.pop();de()}),De.add(Ce,"baseSize",2,10,.5).name("Particle Size").onChange(w=>{R.uniforms.baseSize.value=w}),De.add(Ce,"trailLength",.1,1,.1).name("Trail Length").onChange(w=>{Ce.trailLength=w}),De.add(Ce,"speedVariation",0,1,.1).name("Speed Variation").onChange(w=>{Ce.speedVariation=w}),De.add(Ce,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(w=>{Ce.jitterAmount=w}),De.add(Ce,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(w=>{Ce.spawnOffsetMin=w}),De.add(Ce,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(w=>{Ce.spawnOffsetMax=w});const Ze={currentOffset:bt};De.add(Ze,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),De.add(Ce,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(w=>{Ce.fadeInSpeed=w}),De.add(Ce,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(w=>{Ce.fadeOutSpeed=w}),De.add(Ce,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(w=>{Ce.drawnLife=w}),De.add({movementThreshold:Kt},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(w=>{Kt=w}),De.add({resetActivation:function(){Ft=!1,ct=0,vt=[],bt=Ce.spawnOffsetMin,Xe=[],Rt=[],sn=!1,de()}},"resetActivation").name("Reset Activation"),De.close();function pt(){const w=Le.attributes.position.array,k=ne.previousOffset||0,z=ne.verticalOffset-k;ne.previousOffset=ne.verticalOffset;for(let te=0;te<$;te++){const ce=te*3;w[ce+1]+=z;const ie=w[ce+1]-ne.verticalOffset,et=We/2;ie>et?w[ce+1]=-et+ne.verticalOffset:ie<-et&&(w[ce+1]=et+ne.verticalOffset)}Le.attributes.position.needsUpdate=!0}function Et(){const w=Le.attributes.position.array,k=Le.attributes.color.array,z=Le.attributes.size?Le.attributes.size.array:null;Ae+=.01;const te=(we-ge)*ne.scrollSpeed;if(ge=we*(1-ne.damping)+ge*ne.damping,!window.particlesMovementPaused){for(let ce=0;ce<$;ce++){const ie=ce*3,et=z?(z[ce]-ne.sizeMin)/(ne.sizeMax-ne.sizeMin):.5,Ve=ne.floatSpeed*(.5+et*.5);w[ie]+=pe[ie]*Ve,w[ie+1]+=pe[ie+1]*Ve,w[ie+2]+=pe[ie+2]*Ve,w[ie+1]+=te*(.5+et*.5),Math.abs(w[ie])>Ie/2&&(pe[ie]*=-1);const Ut=w[ie+1]-ne.verticalOffset,mt=We/2;Ut>mt?w[ie+1]=-mt+ne.verticalOffset:Ut<-mt&&(w[ie+1]=mt+ne.verticalOffset),Math.abs(w[ie+2])>250&&(pe[ie+2]*=-1)}Le.attributes.position.needsUpdate=!0}for(let ce=0;ce<$;ce++){const ie=ce*3,et=z?(z[ce]-ne.sizeMin)/(ne.sizeMax-ne.sizeMin):.5,Ve=new Qe(Be.color),Ut=.2*Math.sin(Ae+ce*.1)+.9,mt=.8+et*.6;k[ie]=Ve.r*Ut*mt,k[ie+1]=Ve.g*Ut*mt,k[ie+2]=Ve.b*Ut*mt}Le.attributes.color.needsUpdate=!0,requestAnimationFrame(Et)}Et();function tn(){if(requestAnimationFrame(tn),C.time.value+=.001,t()&&Date.now()-r>e){const k=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=k,C.time.value=0,r=Date.now()}if(tt(),!window.particlesFullyHidden&&oe.uniforms.opacity.value<x&&(oe.uniforms.opacity.value+=.001,oe.uniforms.opacity.value>x&&(oe.uniforms.opacity.value=x)),window.particlesFullyHidden&&oe.uniforms.opacity.value>0&&(oe.uniforms.opacity.value=0),F&&L.autoRotate&&!L.rotationPaused){const w=L.baseRotateSpeed;F.rotation.y+=w*.01}S&&(S.rotation.set(0,0,0),M()),g.autoClear=!0,g.render(m,v),(!window.particlesFullyHidden||Xe.length>0&&Ce.enabled)&&(g.autoClear=!1,g.render(p,v))}tn(),document.addEventListener("veryEarlyParticleFade",()=>{x=.3,oe&&oe.uniforms&&oe.uniforms.opacity&&oe.uniforms.opacity.value<.1&&(oe.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{x=.3}),document.addEventListener("heroAnimationComplete",()=>{x=.5});function Vt(){if(S){const w=window.innerHeight,k=v.right-v.left,te=(v.top-v.bottom)/w,ce=k,ie=w*.66*te;S.geometry.dispose(),S.geometry=new Gi(ce,ie),S.rotation.set(0,0,0),M()}}let kt,Je;function Wt(){const w=window.innerWidth,k=f();if(g.setSize(w,k),v.left=-w/2,v.right=w/2,v.top=k/2,v.bottom=-k/2,v.updateProjectionMatrix(),C.resolution.value.set(w,k),ve.geometry.dispose(),ve.geometry=new Gi(w,k,w/10,k/10),We=k*ne.verticalSpread,Ie=w*ne.horizontalSpread,typeof Q<"u"&&Q&&Q.__folders["Particle System"]){const z=Q.__folders["Particle System"];if(z&&z.__controllers){for(let te=0;te<z.__controllers.length;te++)if(z.__controllers[te].property==="verticalOffset"){z.__controllers[te].min(-k*3),z.__controllers[te].max(k*2);break}}}if(F&&L.responsive){clearTimeout(Je),Je=setTimeout(()=>{_t()},150);for(let z=0;z<D.__controllers.length;z++){const te=D.__controllers[z];te.property==="positionX"?(te.min(-w/2),te.max(w/2)):te.property==="positionY"&&(te.min(-k/2),te.max(k/2))}}Vt()}window.addEventListener("resize",()=>{clearTimeout(kt),clearTimeout(Je),F&&L.responsive&&(Je=setTimeout(()=>{_t()},150)),kt=setTimeout(Wt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(kt),clearTimeout(Je),F&&L.responsive&&(Je=setTimeout(()=>{_t()},300)),kt=setTimeout(Wt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Je);const w=window.innerWidth,k=f();window.lastKnownDimensions||(window.lastKnownDimensions={width:w,height:k});const z=Math.abs(w-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,te=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(z>.05||te>.05)&&(window.lastKnownDimensions.width=w,window.lastKnownDimensions.height=k,F&&L.responsive&&(Je=setTimeout(()=>{_t()},150)),setTimeout(Wt,100))}else window.lastKnownDimensions={width:window.innerWidth,height:f()}});let Pt=f();function Un(){const w=f();Math.abs(w-Pt)>50&&(Wt(),Pt=w),requestAnimationFrame(Un)}Un(),window.addEventListener("keydown",w=>{if((w.key==="+"||w.key==="=")&&(y.zoom=Math.min(y.zoom+.1,5),v.zoom=y.zoom,v.updateProjectionMatrix(),typeof Q<"u"&&Q&&Q.__folders["Camera Controls"])){const k=Q.__folders["Camera Controls"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="zoom"){k.__controllers[z].updateDisplay();break}}}if((w.key==="-"||w.key==="_")&&(y.zoom=Math.max(y.zoom-.1,.1),v.zoom=y.zoom,v.updateProjectionMatrix(),typeof Q<"u"&&Q&&Q.__folders["Camera Controls"])){const k=Q.__folders["Camera Controls"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="zoom"){k.__controllers[z].updateDisplay();break}}}}),le.add(ne,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(w=>{ne.scrollSpeed=w}),le.add(ne,"damping",.8,.99,.01).name("Scroll Damping").onChange(w=>{ne.damping=w}),le.add(ne,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(w=>{const k=We;We=window.innerHeight*w;const z=We/k,te=Le.attributes.position.array;for(let ce=0;ce<$;ce++){const ie=ce*3,Ve=(te[ie+1]-ne.verticalOffset)*z;te[ie+1]=Ve+ne.verticalOffset,Math.abs(Ve)>We/2&&(te[ie+1]=(Math.random()-.5)*We+ne.verticalOffset)}Le.attributes.position.needsUpdate=!0}),le.add(ne,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(w=>{const k=Ie;Ie=window.innerWidth*w;const z=Ie/k,te=Le.attributes.position.array;for(let ce=0;ce<$;ce++){const ie=ce*3,Ve=te[ie]*z;te[ie]=Ve,Math.abs(Ve)>Ie/2&&(te[ie]=(Math.random()-.5)*Ie)}Le.attributes.position.needsUpdate=!0}),le.add(ne,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(w=>{ne.previousOffset===void 0&&(ne.previousOffset=0),ne.verticalOffset=w,pt()}),le.add(ne,"sizeMin",1,5,.01).name("Min Particle Size").onChange(w=>{if(ne.sizeMin=w,ne.sizeMin>=ne.sizeMax&&(ne.sizeMax=ne.sizeMin+1,typeof Q<"u"&&Q&&Q.__folders["Particle System"])){const k=Q.__folders["Particle System"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="sizeMax"){k.__controllers[z].updateDisplay();break}}}be()}),le.add(ne,"sizeMax",5,10,.01).name("Max Particle Size").onChange(w=>{if(ne.sizeMax=w,ne.sizeMax<=ne.sizeMin&&(ne.sizeMin=ne.sizeMax-1,typeof Q<"u"&&Q&&Q.__folders["Particle System"])){const k=Q.__folders["Particle System"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="sizeMin"){k.__controllers[z].updateDisplay();break}}}be()}),le.add(ne,"floatSpeed",.1,3,.1).name("Float Speed").onChange(w=>{ne.floatSpeed=w}),be();const Gr=Le.attributes.position.array;for(let w=0;w<$;w++){const k=w*3;Gr[k+1]=(Math.random()-.5)*We+ne.verticalOffset}Le.attributes.position.needsUpdate=!0,le.add(oe.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(w=>{oe.uniforms.haloStrength.value=w}),le.add(oe.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(w=>{oe.uniforms.haloSize.value=w});let Ln;window.addEventListener("scroll",()=>{Ln&&clearTimeout(Ln),Ln=setTimeout(()=>{},150)})}function Os(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function Tr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}}const S1="/150-lab/assets/video/acs-150-compressed.mp4",w1="/150-lab/assets/images/anniversary-video-poster.jpg";let Md=!1;function M1(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=S1,r.poster=w1,r.addEventListener("error",ve=>{var Q,qe;console.error("Video loading error:",ve),console.error("Video src:",r.src),console.error("Video error code:",(Q=r.error)==null?void 0:Q.code),console.error("Video error message:",(qe=r.error)==null?void 0:qe.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
    <div class="audio-slider-track">
      <div class="audio-slider-fill"></div>
      <div class="audio-slider-thumb"></div>
    </div>
    <div class="audio-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
      </svg>
    </div>
  `,i.style.cssText=`
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 8px 12px;
    border-radius: 20px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 10;
    color: white;
    font-size: 14px;
  `;const s=i.querySelector(".audio-slider-track");s.style.cssText=`
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;const o=i.querySelector(".audio-slider-fill");o.style.cssText=`
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;const a=i.querySelector(".audio-slider-thumb");a.style.cssText=`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: left 0.1s ease;
  `;const l=i.querySelector(".audio-icon");l.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  `,r.parentNode.appendChild(i);const c=document.createElement("div");c.className="video-progress-bar",c.innerHTML=`
    <div class="progress-bar-track">
      <div class="progress-bar-fill"></div>
      <div class="progress-bar-thumb"></div>
    </div>
  `,c.style.cssText=`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0);
    cursor: pointer;
    z-index: 10;
    transition: height 0.2s ease, background 0.2s ease;
  `;const u=c.querySelector(".progress-bar-track");u.style.cssText=`
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  `;const d=c.querySelector(".progress-bar-fill");d.style.cssText=`
    height: 100%;
    background: rgba(251, 225, 57, 0.9);
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;const f=c.querySelector(".progress-bar-thumb");f.style.cssText=`
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: rgba(251, 225, 57, 1);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const Q=r.volume/_*100;o.style.width=Q+"%",a.style.left=Q+"%"},p=ve=>{const Q=s.getBoundingClientRect(),He=Math.max(0,Math.min(100,(ve-Q.left)/Q.width*100))/100*_;if(window.audioMuted&&He>0){const ee=document.querySelector(".sound-toggle");ee&&ee.classList.contains("muted")&&(Md=!0,ee.click(),setTimeout(()=>{Md=!1},100))}He>0?r.muted=!1:r.muted=!0,r.volume=He,He>0&&(F=He),m()};s.addEventListener("mousedown",ve=>{h=!0,p(ve.clientX),ve.preventDefault()}),document.addEventListener("mousemove",ve=>{h&&p(ve.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const x=r.parentNode;x.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),x.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,window.audioMuted?(r.muted=!0,r.volume=0):r.muted=!1,m();let y=!1;const v=()=>{if(r.duration&&!y){const ve=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=ve+"%",f.style.left=ve+"%"}},E=ve=>{const Q=u.getBoundingClientRect(),He=Math.max(0,Math.min(100,(ve-Q.left)/Q.width*100))/100*r.duration;r.currentTime=He,v(),r.paused||L()},T=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},S=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",ve=>{y=!0,T(),E(ve.clientX),ve.preventDefault()}),u.addEventListener("click",ve=>{y||(T(),E(ve.clientX),setTimeout(()=>{S()},50))}),document.addEventListener("mousemove",ve=>{y&&E(ve.clientX)}),document.addEventListener("mouseup",()=>{y=!1,S()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{y||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let P=null,b=0;const M=()=>{if(r.duration&&!y&&!r.paused){const ve=performance.now();if(ve-b>=16.67){const Q=r.currentTime/r.duration*100;d.style.width=Q+"%",f.style.left=Q+"%",b=ve}P=requestAnimationFrame(M)}},L=()=>{P&&cancelAnimationFrame(P),b=performance.now(),P=requestAnimationFrame(M)},U=()=>{P&&(cancelAnimationFrame(P),P=null)};r.addEventListener("play",L),r.addEventListener("pause",U),r.addEventListener("timeupdate",v),v();const W=(ve,Q,qe=1e3)=>{if(!ve)return;const He=ve.volume,ee=performance.now(),re=Se=>{const Ge=Se-ee,ye=Math.min(Ge/qe,1),it=ye*ye;ve.volume=He+(Q-He)*it,ye<1&&requestAnimationFrame(re)};requestAnimationFrame(re)};let F=g,q=null;const j=()=>{r.paused||(F=r.volume,W(r,0,600),q=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25),q=null},600))},C=()=>{r.paused||(q&&(clearTimeout(q),q=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25))},Y=()=>{r.paused?(q&&(clearTimeout(q),q=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&W(window.backgroundAudio,0),window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,r.volume=F),m(),L()):C()};t.addEventListener("click",Y),r.addEventListener("click",Y),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25)}),new IntersectionObserver(ve=>{ve.forEach(Q=>{Q.isIntersecting||j()})},{threshold:.5}).observe(e);const O=()=>{!r.paused&&!r.ended&&(window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,Md||(r.volume=F),window.backgroundAudio&&!window.backgroundAudio.paused&&W(window.backgroundAudio,0)),m())},_e=document.querySelector(".sound-toggle");if(_e){_e.addEventListener("click",()=>{setTimeout(()=>{O()},50)}),new MutationObserver(qe=>{qe.forEach(He=>{He.type==="attributes"&&He.attributeName==="class"&&setTimeout(()=>{O()},50)})}).observe(_e,{attributes:!0,attributeFilter:["class"]});let Q=window.audioMuted;setInterval(()=>{window.audioMuted!==Q&&(Q=window.audioMuted,O())},500),setTimeout(()=>{O()},1e3)}}function Cr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function n0(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ga={duration:.5,overwrite:!1,delay:0},Xh,On,rn,Ni=1e8,$t=1/Ni,Gf=Math.PI*2,E1=Gf/4,T1=0,i0=Math.sqrt,A1=Math.cos,C1=Math.sin,Pn=function(e){return typeof e=="string"},un=function(e){return typeof e=="function"},Hr=function(e){return typeof e=="number"},qh=function(e){return typeof e>"u"},_r=function(e){return typeof e=="object"},oi=function(e){return e!==!1},Yh=function(){return typeof window<"u"},Sc=function(e){return un(e)||Pn(e)},r0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Gn=Array.isArray,Wf=/(?:-?\.?\d|\.)+/gi,s0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ed=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,o0=/[+-]=-?[.\d]+/,a0=/[^,'"\[\]\s]+/gi,R1=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,on,ir,Xf,jh,Mi={},du={},l0,c0=function(e){return(du=_a(e,Mi))&&ui},$h=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Pl=function(e,t){return!t&&console.warn(e)},u0=function(e,t){return e&&(Mi[e]=t)&&du&&(du[e]=t)||Mi},Ll=function(){return 0},P1={suppressEvents:!0,isStart:!0,kill:!1},Xc={suppressEvents:!0,kill:!1},L1={suppressEvents:!0},Kh={},ms=[],qf={},d0,gi={},Td={},ig=30,qc=[],Zh="",Jh=function(e){var t=e[0],n,i;if(_r(t)||un(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=qc.length;i--&&!qc[i].targetTest(t););n=qc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new N0(e[i],n)))||e.splice(i,1);return e},Zs=function(e){return e._gsap||Jh(Ui(e))[0]._gsap},f0=function(e,t,n){return(n=e[t])&&un(n)?e[t]():qh(n)&&e.getAttribute&&e.getAttribute(t)||n},ai=function(e,t){return(e=e.split(",")).forEach(t)||e},dn=function(e){return Math.round(e*1e5)/1e5||0},yn=function(e){return Math.round(e*1e7)/1e7||0},Jo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},D1=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},fu=function(){var e=ms.length,t=ms.slice(0),n,i;for(qf={},ms.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},h0=function(e,t,n,i){ms.length&&!On&&fu(),e.render(t,n,On&&t<0&&(e._initted||e._startAt)),ms.length&&!On&&fu()},p0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(a0).length<2?t:Pn(e)?e.trim():e},m0=function(e){return e},Ei=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},I1=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},_a=function(e,t){for(var n in t)e[n]=t[n];return e},rg=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=_r(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},hu=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},al=function(e){var t=e.parent||on,n=e.keyframes?I1(Gn(e.keyframes)):Ei;if(oi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},O1=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},g0=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Pu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},xs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Js=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},N1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Yf=function(e,t,n,i){return e._startAt&&(On?e._startAt.revert(Xc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},U1=function r(e){return!e||e._ts&&r(e.parent)},sg=function(e){return e._repeat?va(e._tTime,e=e.duration()+e._rDelay)*e:0},va=function(e,t){var n=Math.floor(e=yn(e/t));return e&&n===e?n-1:n},pu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Lu=function(e){return e._end=yn(e._start+(e._tDur/Math.abs(e._ts||e._rts||$t)||0))},Du=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=yn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Lu(e),n._dirty||Js(n,e)),e},_0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=pu(e.rawTime(),t),(!t._dur||Wl(0,t.totalDuration(),n)-t._tTime>$t)&&t.render(n,!0)),Js(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-$t}},or=function(e,t,n,i){return t.parent&&xs(t),t._start=yn((Hr(n)?n:n||e!==on?Ai(e,n,t):e._time)+t._delay),t._end=yn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),g0(e,t,"_first","_last",e._sort?"_start":0),jf(t)||(e._recent=t),i||_0(e,t),e._ts<0&&Du(e,e._tTime),e},v0=function(e,t){return(Mi.ScrollTrigger||$h("scrollTrigger",t))&&Mi.ScrollTrigger.create(t,e)},y0=function(e,t,n,i,s){if(ep(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!On&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&d0!==vi.frame)return ms.push(e),e._lazy=[s,i],1},F1=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},jf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},k1=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&F1(e)&&!(!e._initted&&jf(e))||(e._ts<0||e._dp._ts<0)&&!jf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Wl(0,e._tDur,t),u=va(l,a),e._yoyo&&u&1&&(o=1-o),u!==va(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||On||i||e._zTime===$t||!t&&e._zTime){if(!e._initted&&y0(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?$t:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Yf(e,t,n,!0),e._onUpdate&&!n&&bi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&bi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&xs(e,1),!n&&!On&&(bi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},B1=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},ya=function(e,t,n,i){var s=e._repeat,o=yn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:yn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Du(e,e._tTime=e._tDur*a),e.parent&&Lu(e),n||Js(e.parent,e),e},og=function(e){return e instanceof Qn?Js(e):ya(e,e._dur)},z1={_start:0,endTime:Ll,totalDuration:Ll},Ai=function r(e,t,n){var i=e.labels,s=e._recent||z1,o=e.duration()>=Ni?s.endTime(!1):e._dur,a,l,c;return Pn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Gn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},ll=function(e,t,n){var i=Hr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=oi(l.vars.inherit)&&l.parent;o.immediateRender=oi(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new _n(t[0],o,t[s+1])},Ts=function(e,t){return e||e===0?t(e):t},Wl=function(e,t,n){return n<e?e:n>t?t:n},Hn=function(e,t){return!Pn(e)||!(t=R1.exec(e))?"":t[1]},H1=function(e,t,n){return Ts(n,function(i){return Wl(e,t,i)})},$f=[].slice,x0=function(e,t){return e&&_r(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&_r(e[0]))&&!e.nodeType&&e!==ir},V1=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Pn(i)&&!t||x0(i,1)?(s=n).push.apply(s,Ui(i)):n.push(i)})||n},Ui=function(e,t,n){return rn&&!t&&rn.selector?rn.selector(e):Pn(e)&&!n&&(Xf||!xa())?$f.call((t||jh).querySelectorAll(e),0):Gn(e)?V1(e,n):x0(e)?$f.call(e,0):e?[e]:[]},Kf=function(e){return e=Ui(e)[0]||Pl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ui(t,n.querySelectorAll?n:n===e?Pl("Invalid scope")||jh.createElement("div"):e)}},b0=function(e){return e.sort(function(){return .5-Math.random()})},S0=function(e){if(un(e))return e;var t=_r(e)?e:{each:e},n=Qs(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return Pn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,x,y,v,E,T,S,P,b;if(!m){if(b=t.grid==="auto"?0:(t.grid||[1,Ni])[1],!b){for(S=-Ni;S<(S=_[b++].getBoundingClientRect().left)&&b<g;);b<g&&b--}for(m=o[g]=[],p=l?Math.min(b,g)*u-.5:i%b,x=b===Ni?0:l?g*d/b-.5:i/b|0,S=0,P=Ni,T=0;T<g;T++)y=T%b-p,v=x-(T/b|0),m[T]=E=c?Math.abs(c==="y"?v:y):i0(y*y+v*v),E>S&&(S=E),E<P&&(P=E);i==="random"&&b0(m),m.max=S-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(b>g?g-1:c?c==="y"?g/b:b:Math.max(b,g/b))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Hn(t.amount||t.each)||0,n=n&&g<0?D0(n):n}return g=(m[f]-m.min)/m.max||0,yn(m.b+(n?n(g):g)*m.v)+m.u}},Zf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=yn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Hr(n)?0:Hn(n))}},w0=function(e,t){var n=Gn(e),i,s;return!n&&_r(e)&&(i=n=e.radius||Ni,e.values?(e=Ui(e.values),(s=!Hr(e[0]))&&(i*=i)):e=Zf(e.increment)),Ts(t,n?un(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ni,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Hr(o)?u:u+Hn(o)}:Zf(e))},M0=function(e,t,n,i){return Ts(Gn(e)?!t:n===!0?!!(n=0):!i,function(){return Gn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},G1=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},W1=function(e,t){return function(n){return e(parseFloat(n))+(t||Hn(n))}},X1=function(e,t,n){return T0(e,t,0,1,n)},E0=function(e,t,n){return Ts(n,function(i){return e[~~t(i)]})},q1=function r(e,t,n){var i=t-e;return Gn(e)?E0(e,r(0,e.length),t):Ts(n,function(s){return(i+(s-e)%i)%i+e})},Y1=function r(e,t,n){var i=t-e,s=i*2;return Gn(e)?E0(e,r(0,e.length-1),t):Ts(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Dl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?a0:Wf),n+=e.substr(t,i-t)+M0(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},T0=function(e,t,n,i,s){var o=t-e,a=i-n;return Ts(s,function(l){return n+((l-e)/o*a||0)})},j1=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=Pn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Gn(e)&&!Gn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=_a(Gn(e)?[]:{},e));if(!u){for(l in t)Qh.call(a,e,l,"get",t[l]);s=function(_){return ip(_,a)||(o?e.p:e)}}}return Ts(n,s)},ag=function(e,t,n){var i=e.labels,s=Ni,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},bi=function(e,t,n){var i=e.vars,s=i[t],o=rn,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ms.length&&fu(),a&&(rn=a),u=l?s.apply(c,l):s.call(c),rn=o,u},qa=function(e){return xs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!On),e.progress()<1&&bi(e,"onInterrupt"),e},Yo,A0=[],C0=function(e){if(e)if(e=!e.name&&e.default||e,Yh()||e.headless){var t=e.name,n=un(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ll,render:ip,add:Qh,kill:uA,modifier:cA,rawVars:0},o={targetTest:0,get:0,getSetter:np,aliases:{},register:0};if(xa(),e!==i){if(gi[t])return;Ei(i,Ei(hu(e,s),o)),_a(i.prototype,_a(s,hu(e,o))),gi[i.prop=t]=i,e.targetTest&&(qc.push(i),Kh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}u0(t,i),e.register&&e.register(ui,i,li)}else A0.push(e)},jt=255,Ya={aqua:[0,jt,jt],lime:[0,jt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,jt],navy:[0,0,128],white:[jt,jt,jt],olive:[128,128,0],yellow:[jt,jt,0],orange:[jt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[jt,0,0],pink:[jt,192,203],cyan:[0,jt,jt],transparent:[jt,jt,jt,0]},Ad=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*jt+.5|0},R0=function(e,t,n){var i=e?Hr(e)?[e>>16,e>>8&jt,e&jt]:0:Ya.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ya[e])i=Ya[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&jt,i&jt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&jt,e&jt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Wf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ad(l+1/3,s,o),i[1]=Ad(l,s,o),i[2]=Ad(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(s0),n&&i.length<4&&(i[3]=1),i}else i=e.match(Wf)||Ya.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/jt,o=i[1]/jt,a=i[2]/jt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},P0=function(e){var t=[],n=[],i=-1;return e.split(gs).forEach(function(s){var o=s.match(qo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},lg=function(e,t,n){var i="",s=(e+i).match(gs),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=R0(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=P0(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(gs,"1").split(qo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(gs),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},gs=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ya)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),$1=/hsl[a]?\(/,L0=function(e){var t=e.join(" "),n;if(gs.lastIndex=0,gs.test(t))return n=$1.test(t),e[1]=lg(e[1],n),e[0]=lg(e[0],n,P0(e[1])),!0},Il,vi=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,x=m===!0,y,v,E,T;if((p>e||p<0)&&(n+=p-t),i+=p,E=i-n,y=E-o,(y>0||x)&&(T=++d.frame,f=E-d.time*1e3,d.time=E=E/1e3,o+=y+(y>=s?4:s-y),v=1),x||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](E,f,T,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){l0&&(!Xf&&Yh()&&(ir=Xf=window,jh=ir.document||{},Mi.gsap=ui,(ir.gsapVersions||(ir.gsapVersions=[])).push(ui.version),c0(du||ir.GreenSockGlobals||!ir.gsap&&ir||{}),A0.forEach(C0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Il=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Il=0,c=Ll},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,x){var y=p?function(v,E,T,S){m(v,E,T,S),d.remove(y)}:m;return d.remove(m),a[x?"unshift":"push"](y),xa(),y},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d})(),xa=function(){return!Il&&vi.wake()},It={},K1=/^[\d.\-M][\d.\-,\s]/,Z1=/["']/g,J1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(Z1,"").trim():+c,i=l.substr(a+1).trim();return t},Q1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},eA=function(e){var t=(e+"").split("("),n=It[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[J1(t[1])]:Q1(e).split(",").map(p0)):It._CE&&K1.test(e)?It._CE("",e):n},D0=function(e){return function(t){return 1-e(1-t)}},I0=function r(e,t){for(var n=e._first,i;n;)n instanceof Qn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Qs=function(e,t){return e&&(un(e)?e:It[e]||eA(e))||t},mo=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return ai(e,function(a){It[a]=Mi[a]=s,It[o=a.toLowerCase()]=n;for(var l in s)It[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=It[a+"."+l]=s[l]}),s},O0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Cd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Gf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*C1((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:O0(a);return s=Gf/s,l.config=function(c,u){return r(e,c,u)},l},Rd=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:O0(n);return i.config=function(s){return r(e,s)},i};ai("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;mo(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});It.Linear.easeNone=It.none=It.Linear.easeIn;mo("Elastic",Cd("in"),Cd("out"),Cd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};mo("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);mo("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});mo("Circ",function(r){return-(i0(1-r*r)-1)});mo("Sine",function(r){return r===1?1:-A1(r*E1)+1});mo("Back",Rd("in"),Rd("out"),Rd());It.SteppedEase=It.steps=Mi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-$t;return function(a){return((i*Wl(0,o,a)|0)+s)*n}}};ga.ease=It["quad.out"];ai("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Zh+=r+","+r+"Params,"});var N0=function(e,t){this.id=T1++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:f0,this.set=t?t.getSetter:np},Ol=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ya(this,+t.duration,1,1),this.data=t.data,rn&&(this._ctx=rn,rn.data.push(this)),Il||vi.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ya(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(xa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Du(this,n),!s._dp||s.parent||_0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&or(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===$t||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),h0(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+sg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+sg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?va(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-$t?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?pu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-$t?0:this._rts,this.totalTime(Wl(-Math.abs(this._delay),this._tDur,s),i!==!1),Lu(this),N1(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==$t&&(this._tTime-=$t)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&or(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(oi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?pu(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=L1);var i=On;return On=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),On=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,og(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,og(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Ai(this,n),oi(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,oi(i)),this._dur||(this._zTime=-$t),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-$t:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-$t,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-$t)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=un(n)?n:m0,a=function(){var c=i.then;i.then=null,un(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){qa(this)},r})();Ei(Ol.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-$t,_prom:0,_ps:!1,_rts:1});var Qn=(function(r){n0(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=oi(n.sortChildren),on&&or(n.parent||on,Cr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&v0(Cr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return ll(0,arguments,this),this},t.from=function(i,s,o){return ll(1,arguments,this),this},t.fromTo=function(i,s,o,a){return ll(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,al(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new _n(i,s,Ai(this,o),1),this},t.call=function(i,s,o){return or(this,_n.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new _n(i,o,Ai(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,al(o).immediateRender=oi(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,al(a).immediateRender=oi(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:yn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,x,y,v,E,T,S;if(this!==on&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,y=this._ts,p=!y,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=yn(u%m),u===l?(g=this._repeat,f=c):(E=yn(u/m),g=~~E,g&&g===E&&(f=c,g--),f>c&&(f=c)),E=va(this._tTime,m),!a&&this._tTime&&E!==g&&this._tTime-E*m-this._dur<=0&&(E=g),T&&g&1&&(f=c-f,S=1),g!==E&&!this._lock){var P=T&&E&1,b=P===(T&&g&1);if(g<E&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(S?0:yn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&bi(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,b&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;I0(this,S)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=B1(this,yn(a),yn(f)),x&&(u-=f-(f=x._start))),this._tTime=u,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(bi(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&x!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=-$t);break}}h=_}else{h=this._last;for(var M=i<0?i:f;h;){if(_=h._prev,(h._act||M<=h._end)&&h._ts&&x!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(M-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(M-h._start)*h._ts,s,o||On&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=M?-$t:$t);break}}h=_}}if(x&&!s&&(this.pause(),x.render(f>=a?0:-$t)._zTime=f>=a?1:-1,this._ts))return this._start=v,Lu(this),this.render(i,s,o);this._onUpdate&&!s&&bi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&xs(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(bi(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Hr(s)||(s=Ai(this,s,i)),!(i instanceof Ol)){if(Gn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Pn(i))return this.addLabel(i,s);if(un(i))i=_n.delayedCall(0,i);else return this}return this!==i?or(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ni);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof _n?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Pn(i)?this.removeLabel(i):un(i)?this.killTweensOf(i):(i.parent===this&&Pu(this,i),i===this._recent&&(this._recent=this._last),Js(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=yn(vi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Ai(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=_n.delayedCall(0,s||Ll,o);return a.data="isPause",this._hasPause=1,or(this,a,Ai(this,i))},t.removePause=function(i){var s=this._first;for(i=Ai(this,i);s;)s._start===i&&s.data==="isPause"&&xs(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ss!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Ui(i),l=this._first,c=Hr(s),u;l;)l instanceof _n?D1(l._targets,a)&&(c?(!ss||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Ai(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=_n.to(o,Ei({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||$t,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&ya(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Ei({startAt:{time:Ai(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),ag(this,Ai(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),ag(this,Ai(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+$t)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Js(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Js(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Ni,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,or(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ya(o,o===on&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(on._ts&&(h0(on,pu(i,on)),d0=vi.frame),vi.frame>=ig){ig+=Si.autoSleep||120;var s=on._first;if((!s||!s._ts)&&Si.autoSleep&&vi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||vi.sleep()}}},e})(Ol);Ei(Qn.prototype,{_lock:0,_hasPause:0,_forcing:0});var tA=function(e,t,n,i,s,o,a){var l=new li(this._pt,e,t,0,1,H0,null,s),c=0,u=0,d,f,h,_,g,m,p,x;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Dl(i)),o&&(x=[n,i],o(x,e,t),n=x[0],i=x[1]),f=n.match(Ed)||[];d=Ed.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Jo(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Ed.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(o0.test(i)||p)&&(l.e=0),this._pt=l,l},Qh=function(e,t,n,i,s,o,a,l,c,u){un(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:un(d)?c?e[t.indexOf("set")||!un(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=un(d)?c?oA:B0:tp,_;if(Pn(i)&&(~i.indexOf("random(")&&(i=Dl(i)),i.charAt(1)==="="&&(_=Jo(f,i)+(Hn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Jf)return!isNaN(f*i)&&i!==""?(_=new li(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?lA:z0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&$h(t,i),tA.call(this,e,t,f,i,h,l||Si.stringFilter,c))},nA=function(e,t,n,i,s){if(un(e)&&(e=cl(e,s,t,n,i)),!_r(e)||e.style&&e.nodeType||Gn(e)||r0(e))return Pn(e)?cl(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=cl(e[a],s,t,n,i);return o},U0=function(e,t,n,i,s,o){var a,l,c,u;if(gi[e]&&(a=new gi[e]).init(s,a.rawVars?t[e]:nA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new li(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Yo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ss,Jf,ep=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,y=e._overwrite==="auto"&&!Xh,v=e.timeline,E,T,S,P,b,M,L,U,W,F,q,j,C;if(v&&(!f||!s)&&(s="none"),e._ease=Qs(s,ga.ease),e._yEase=d?D0(Qs(d===!0?s:d,ga.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(U=m[0]?Zs(m[0]).harness:0,j=U&&i[U.prop],E=hu(i,Kh),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?Xc:P1),g._lazy=0),o){if(xs(e._startAt=_n.set(m,Ei({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&oi(l),startAt:null,delay:0,onUpdate:c&&function(){return bi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(On||!a&&!h)&&e._startAt.revert(Xc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),S=Ei({overwrite:!1,data:"isFromStart",lazy:a&&!g&&oi(l),immediateRender:a,stagger:0,parent:p},E),j&&(S[U.prop]=j),xs(e._startAt=_n.set(m,S)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(On?e._startAt.revert(Xc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,$t,$t);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&oi(l)||l&&!_,T=0;T<m.length;T++){if(b=m[T],L=b._gsap||Jh(m)[T]._gsap,e._ptLookup[T]=F={},qf[L.id]&&ms.length&&fu(),q=x===m?T:x.indexOf(b),U&&(W=new U).init(b,j||E,e,q,x)!==!1&&(e._pt=P=new li(e._pt,b,W.name,0,1,W.render,W,0,W.priority),W._props.forEach(function(Y){F[Y]=P}),W.priority&&(M=1)),!U||j)for(S in E)gi[S]&&(W=U0(S,E,e,q,b,x))?W.priority&&(M=1):F[S]=P=Qh.call(e,b,S,"get",E[S],q,x,0,i.stringFilter);e._op&&e._op[T]&&e.kill(b,e._op[T]),y&&e._pt&&(ss=e,on.killTweensOf(b,F,e.globalTime(t)),C=!e.parent,ss=0),e._pt&&l&&(qf[L.id]=1)}M&&V0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!C,f&&t<=0&&v.render(Ni,!0,!0)},iA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Jf=1,e.vars[t]="+=0",ep(e,a),Jf=0,l?Pl(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=dn(n)+Hn(d.e)),d.b&&(d.b=u.s+Hn(d.b))},rA=function(e,t){var n=e[0]?Zs(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=_a({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},sA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Gn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},cl=function(e,t,n,i,s){return un(e)?e.call(t,n,i,s):Pn(e)&&~e.indexOf("random(")?Dl(e):e},F0=Zh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",k0={};ai(F0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return k0[r]=1});var _n=(function(r){n0(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:al(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=i.parent||on,y=(Gn(n)||r0(n)?Hr(n[0]):"length"in i)?[n]:Ui(n),v,E,T,S,P,b,M,L;if(a._targets=y.length?Jh(y):Pl("GSAP target "+n+" not found. https://gsap.com",!Si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||Sc(c)||Sc(u)){if(i=a.vars,v=a.timeline=new Qn({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:y}),v.kill(),v.parent=v._dp=Cr(a),v._start=0,f||Sc(c)||Sc(u)){if(S=y.length,M=f&&S0(f),_r(f))for(P in f)~F0.indexOf(P)&&(L||(L={}),L[P]=f[P]);for(E=0;E<S;E++)T=hu(i,k0),T.stagger=0,p&&(T.yoyoEase=p),L&&_a(T,L),b=y[E],T.duration=+cl(c,Cr(a),E,b,y),T.delay=(+cl(u,Cr(a),E,b,y)||0)-a._delay,!f&&S===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(b,T,M?M(E,b,y):0),v._ease=It.none;v.duration()?c=u=0:a.timeline=0}else if(_){al(Ei(v.vars.defaults,{ease:"none"})),v._ease=Qs(_.ease||i.ease||"none");var U=0,W,F,q;if(Gn(_))_.forEach(function(j){return v.to(y,j,">")}),v.duration();else{T={};for(P in _)P==="ease"||P==="easeEach"||sA(P,_[P],T,_.easeEach);for(P in T)for(W=T[P].sort(function(j,C){return j.t-C.t}),U=0,E=0;E<W.length;E++)F=W[E],q={ease:F.e,duration:(F.t-(E?W[E-1].t:0))/100*c},q[P]=F.v,v.to(y,q,U),U+=q.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!Xh&&(ss=Cr(a),on.killTweensOf(y),ss=0),or(x,Cr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===yn(x._time)&&oi(d)&&U1(Cr(a))&&x.data!=="nested")&&(a._tTime=-$t,a.render(Math.max(0,-u)||0)),m&&v0(Cr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-$t&&!u?l:i<$t?0:i,f,h,_,g,m,p,x,y,v;if(!c)k1(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,y=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=yn(d%g),d===l?(_=this._repeat,f=c):(m=yn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=va(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(y&&this._yEase&&I0(y,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(yn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(y0(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(f/c),this._from&&(this.ratio=x=1-x),f&&!a&&!s&&!_&&(bi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(x,h.d),h=h._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Yf(this,i,s,o),bi(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&bi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Yf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&xs(this,1),!s&&!(u&&!a)&&(d||a||p)&&(bi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Il||vi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ep(this,c),u=this._ease(c/this._dur),iA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Du(this,0),this.parent||g0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?qa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!On),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ss&&ss.vars.overwrite!==!0)._first||qa(this),this.parent&&o!==this.timeline.totalDuration()&&ya(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Ui(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&O1(a,l))return s==="all"&&(this._pt=0),qa(this);for(d=this._op=this._op||[],s!=="all"&&(Pn(s)&&(g={},ai(s,function(x){return g[x]=1}),s=g),s=rA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Pu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&qa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ll(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return ll(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return on.killTweensOf(i,s,o)},e})(Ol);Ei(_n.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ai("staggerTo,staggerFrom,staggerFromTo",function(r){_n[r]=function(){var e=new Qn,t=$f.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var tp=function(e,t,n){return e[t]=n},B0=function(e,t,n){return e[t](n)},oA=function(e,t,n,i){return e[t](i.fp,n)},aA=function(e,t,n){return e.setAttribute(t,n)},np=function(e,t){return un(e[t])?B0:qh(e[t])&&e.setAttribute?aA:tp},z0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},lA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},H0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},ip=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},cA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},uA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Pu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},dA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},V0=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},li=(function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||z0,this.d=l||this,this.set=c||tp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=dA,this.m=n,this.mt=s,this.tween=i},r})();ai(Zh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Kh[r]=1});Mi.TweenMax=Mi.TweenLite=_n;Mi.TimelineLite=Mi.TimelineMax=Qn;on=new Qn({sortChildren:!1,defaults:ga,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Si.stringFilter=L0;var eo=[],Yc={},fA=[],cg=0,hA=0,Pd=function(e){return(Yc[e]||fA).map(function(t){return t()})},Qf=function(){var e=Date.now(),t=[];e-cg>2&&(Pd("matchMediaInit"),eo.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=ir.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Pd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),cg=e,Pd("matchMedia"))},G0=(function(){function r(t,n){this.selector=n&&Kf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=hA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){un(n)&&(s=i,i=n,n=un);var o=this,a=function(){var c=rn,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=Kf(s)),rn=o,d=i.apply(o,arguments),un(d)&&o._r.push(d),rn=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===un?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=rn;rn=null,n(this),rn=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof _n&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Qn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof _n)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=eo.length;o--;)eo[o].id===this.id&&eo.splice(o,1)},e.revert=function(n){this.kill(n||{})},r})(),pA=(function(){function r(t){this.contexts=[],this.scope=t,rn&&rn.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){_r(n)||(n={matches:n});var o=new G0(0,s||this.scope),a=o.conditions={},l,c,u;rn&&!o.selector&&(o.selector=rn.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=ir.matchMedia(n[c]),l&&(eo.indexOf(o)<0&&eo.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Qf):l.addEventListener("change",Qf)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),mu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return C0(i)})},timeline:function(e){return new Qn(e)},getTweensOf:function(e,t){return on.getTweensOf(e,t)},getProperty:function(e,t,n,i){Pn(e)&&(e=Ui(e)[0]);var s=Zs(e||{}).get,o=n?m0:p0;return n==="native"&&(n=""),e&&(t?o((gi[t]&&gi[t].get||s)(e,t,n,i)):function(a,l,c){return o((gi[a]&&gi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Ui(e),e.length>1){var i=e.map(function(u){return ui.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=gi[t],a=Zs(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;Yo._pt=0,d.init(e,n?u+n:u,Yo,0,[e]),d.render(1,d),Yo._pt&&ip(1,Yo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=ui.to(e,Ei((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return on.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Qs(e.ease,ga.ease)),rg(ga,e||{})},config:function(e){return rg(Si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!gi[a]&&!Mi[a]&&Pl(t+" effect requires "+a+" plugin.")}),Td[t]=function(a,l,c){return n(Ui(a),Ei(l||{},s),c)},o&&(Qn.prototype[t]=function(a,l,c){return this.add(Td[t](a,_r(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){It[e]=Qs(t)},parseEase:function(e,t){return arguments.length?Qs(e,t):It},getById:function(e){return on.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Qn(e),i,s;for(n.smoothChildTiming=oi(e.smoothChildTiming),on.remove(n),n._dp=0,n._time=n._tTime=on._time,i=on._first;i;)s=i._next,(t||!(!i._dur&&i instanceof _n&&i.vars.onComplete===i._targets[0]))&&or(n,i,i._start-i._delay),i=s;return or(on,n,0),n},context:function(e,t){return e?new G0(e,t):rn},matchMedia:function(e){return new pA(e)},matchMediaRefresh:function(){return eo.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Qf()},addEventListener:function(e,t){var n=Yc[e]||(Yc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Yc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:q1,wrapYoyo:Y1,distribute:S0,random:M0,snap:w0,normalize:X1,getUnit:Hn,clamp:H1,splitColor:R0,toArray:Ui,selector:Kf,mapRange:T0,pipe:G1,unitize:W1,interpolate:j1,shuffle:b0},install:c0,effects:Td,ticker:vi,updateRoot:Qn.updateRoot,plugins:gi,globalTimeline:on,core:{PropTween:li,globals:u0,Tween:_n,Timeline:Qn,Animation:Ol,getCache:Zs,_removeLinkedListItem:Pu,reverting:function(){return On},context:function(e){return e&&rn&&(rn.data.push(e),e._ctx=rn),rn},suppressOverwrites:function(e){return Xh=e}}};ai("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return mu[r]=_n[r]});vi.add(Qn.updateRoot);Yo=mu.to({},{duration:0});var mA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},gA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=mA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Ld=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Pn(s)&&(l={},ai(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}gA(a,s)}}}},ui=mu.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)On?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ld("roundProps",Zf),Ld("modifiers"),Ld("snap",w0))||mu;_n.version=Qn.version=ui.version="3.12.7";l0=1;Yh()&&xa();It.Power0;It.Power1;It.Power2;It.Power3;It.Power4;It.Linear;It.Quad;It.Cubic;It.Quart;It.Quint;It.Strong;It.Elastic;It.Back;It.SteppedEase;It.Bounce;It.Sine;It.Expo;It.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ug,os,Qo,rp,qs,dg,sp,_A=function(){return typeof window<"u"},Vr={},Bs=180/Math.PI,ea=Math.PI/180,Uo=Math.atan2,fg=1e8,op=/([A-Z])/g,vA=/(left|right|width|margin|padding|x)/i,yA=/[\s,\(]\S/,cr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},eh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},xA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},bA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},SA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},W0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},X0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},wA=function(e,t,n){return e.style[t]=n},MA=function(e,t,n){return e.style.setProperty(t,n)},EA=function(e,t,n){return e._gsap[t]=n},TA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},AA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},CA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},an="transform",ci=an+"Origin",RA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Vr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=cr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Rr(i,a)}):this.tfm[e]=o.x?o[e]:Rr(i,e),e===ci&&(this.tfm.zOrigin=o.zOrigin);else return cr.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(an)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(ci,t,"")),e=an}(s||t)&&this.props.push(e,t,s[e])},q0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},PA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(op,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=sp(),(!s||!s.isStart)&&!n[an]&&(q0(n),i.zOrigin&&n[ci]&&(n[ci]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Y0=function(e,t){var n={target:e,props:[],revert:PA,save:RA};return e._gsap||ui.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},j0,th=function(e,t){var n=os.createElementNS?os.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):os.createElement(e);return n&&n.style?n:os.createElement(e)},hr=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(op,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ba(t)||t,1)||""},hg="O,Moz,ms,Ms,Webkit".split(","),ba=function(e,t,n){var i=t||qs,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(hg[o]+e in s););return o<0?null:(o===3?"ms":o>=0?hg[o]:"")+e},nh=function(){_A()&&window.document&&(ug=window,os=ug.document,Qo=os.documentElement,qs=th("div")||{style:{}},th("div"),an=ba(an),ci=an+"Origin",qs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",j0=!!ba("perspective"),sp=ui.core.reverting,rp=1)},pg=function(e){var t=e.ownerSVGElement,n=th("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Qo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Qo.removeChild(n),s},mg=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},$0=function(e){var t,n;try{t=e.getBBox()}catch{t=pg(e),n=1}return t&&(t.width||t.height)||n||(t=pg(e)),t&&!t.width&&!t.x&&!t.y?{x:+mg(e,["x","cx","x1"])||0,y:+mg(e,["y","cy","y1"])||0,width:0,height:0}:t},K0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&$0(e))},ao=function(e,t){if(t){var n=e.style,i;t in Vr&&t!==ci&&(t=an),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(op,"-$1").toLowerCase())):n.removeAttribute(t)}},as=function(e,t,n,i,s,o){var a=new li(e._pt,t,n,0,1,o?X0:W0);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},gg={deg:1,rad:1,turn:1},LA={grid:1,flex:1},bs=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=qs.style,l=vA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||gg[i]||gg[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&K0(e),(h||o==="%")&&(Vr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],dn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===os||!g.appendChild)&&(g=os.body),m=g._gsap,m&&h&&m.width&&l&&m.time===vi.time&&!m.uncache)return dn(s/m.width*d);if(h&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+i,_=e[u],x?e.style[t]=x:ao(e,t)}else(h||o==="%")&&!LA[hr(g,"display")]&&(a.position=hr(e,"position")),g===e&&(a.position="static"),g.appendChild(qs),_=qs[u],g.removeChild(qs),a.position="absolute";return l&&h&&(m=Zs(g),m.time=vi.time,m.width=g[u]),dn(f?_*s/d:_&&s?d/_*s:0)},Rr=function(e,t,n,i){var s;return rp||nh(),t in cr&&t!=="transform"&&(t=cr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Vr[t]&&t!=="transform"?(s=Ul(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:_u(hr(e,ci))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=gu[t]&&gu[t](e,t,n)||hr(e,t)||f0(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?bs(e,t,s,n)+n:s},DA=function(e,t,n,i){if(!n||n==="none"){var s=ba(t,e,1),o=s&&hr(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=hr(e,"borderTopColor"))}var a=new li(this._pt,e.style,t,0,1,H0),l=0,c=0,u,d,f,h,_,g,m,p,x,y,v,E;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=hr(e,t)||i,g?e.style[t]=g:ao(e,t)),u=[n,i],L0(u),n=u[0],i=u[1],f=n.match(qo)||[],E=i.match(qo)||[],E.length){for(;d=qo.exec(i);)m=d[0],x=i.substring(l,d.index),_?_=(_+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=Jo(h,m)+v),p=parseFloat(m),y=m.substr((p+"").length),l=qo.lastIndex-y.length,y||(y=y||Si.units[t]||v,l===i.length&&(i+=y,a.e+=y)),v!==y&&(h=bs(e,t,g,y)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?X0:W0;return o0.test(i)&&(a.e=0),this._pt=a,a},_g={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},IA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=_g[n]||n,t[1]=_g[i]||i,t.join(" ")},OA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Vr[a]&&(l=1,a=a==="transformOrigin"?ci:an),ao(n,a);l&&(ao(n,an),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ul(n,1),o.uncache=1,q0(i)))}},gu={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new li(e._pt,t,n,0,0,OA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Nl=[1,0,0,1,0,0],Z0={},J0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},vg=function(e){var t=hr(e,an);return J0(t)?Nl:t.substr(7).match(s0).map(dn)},ap=function(e,t){var n=e._gsap||Zs(e),i=e.style,s=vg(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Nl:s):(s===Nl&&!e.offsetParent&&e!==Qo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Qo.appendChild(e)),s=vg(e),l?i.display=l:ao(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Qo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ih=function(e,t,n,i,s,o){var a=e._gsap,l=s||ap(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],x=l[5],y=t.split(" "),v=parseFloat(y[0])||0,E=parseFloat(y[1])||0,T,S,P,b;n?l!==Nl&&(S=h*m-_*g)&&(P=v*(m/S)+E*(-g/S)+(g*x-m*p)/S,b=v*(-_/S)+E*(h/S)-(h*x-_*p)/S,v=P,E=b):(T=$0(e),v=T.x+(~y[0].indexOf("%")?v/100*T.width:v),E=T.y+(~(y[1]||y[0]).indexOf("%")?E/100*T.height:E)),i||i!==!1&&a.smooth?(p=v-c,x=E-u,a.xOffset=d+(p*h+x*g)-p,a.yOffset=f+(p*_+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[ci]="0px 0px",o&&(as(o,a,"xOrigin",c,v),as(o,a,"yOrigin",u,E),as(o,a,"xOffset",d,a.xOffset),as(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},Ul=function(e,t){var n=e._gsap||new N0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=hr(e,ci)||"0",u,d,f,h,_,g,m,p,x,y,v,E,T,S,P,b,M,L,U,W,F,q,j,C,Y,he,O,_e,ve,Q,qe,He;return u=d=f=g=m=p=x=y=v=0,h=_=1,n.svg=!!(e.getCTM&&K0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[an]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[an]!=="none"?l[an]:"")),i.scale=i.rotate=i.translate="none"),S=ap(e,n.svg),n.svg&&(n.uncache?(Y=e.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",C=""):C=!t&&e.getAttribute("data-svg-origin"),ih(e,C||c,!!C||n.originIsAbsolute,n.smooth!==!1,S)),E=n.xOrigin||0,T=n.yOrigin||0,S!==Nl&&(L=S[0],U=S[1],W=S[2],F=S[3],u=q=S[4],d=j=S[5],S.length===6?(h=Math.sqrt(L*L+U*U),_=Math.sqrt(F*F+W*W),g=L||U?Uo(U,L)*Bs:0,x=W||F?Uo(W,F)*Bs+g:0,x&&(_*=Math.abs(Math.cos(x*ea))),n.svg&&(u-=E-(E*L+T*W),d-=T-(E*U+T*F))):(He=S[6],Q=S[7],O=S[8],_e=S[9],ve=S[10],qe=S[11],u=S[12],d=S[13],f=S[14],P=Uo(He,ve),m=P*Bs,P&&(b=Math.cos(-P),M=Math.sin(-P),C=q*b+O*M,Y=j*b+_e*M,he=He*b+ve*M,O=q*-M+O*b,_e=j*-M+_e*b,ve=He*-M+ve*b,qe=Q*-M+qe*b,q=C,j=Y,He=he),P=Uo(-W,ve),p=P*Bs,P&&(b=Math.cos(-P),M=Math.sin(-P),C=L*b-O*M,Y=U*b-_e*M,he=W*b-ve*M,qe=F*M+qe*b,L=C,U=Y,W=he),P=Uo(U,L),g=P*Bs,P&&(b=Math.cos(P),M=Math.sin(P),C=L*b+U*M,Y=q*b+j*M,U=U*b-L*M,j=j*b-q*M,L=C,q=Y),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=dn(Math.sqrt(L*L+U*U+W*W)),_=dn(Math.sqrt(j*j+He*He)),P=Uo(q,j),x=Math.abs(P)>2e-4?P*Bs:0,v=qe?1/(qe<0?-qe:qe):0),n.svg&&(C=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!J0(hr(e,an)),C&&e.setAttribute("transform",C))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(h*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=dn(h),n.scaleY=dn(_),n.rotation=dn(g)+a,n.rotationX=dn(m)+a,n.rotationY=dn(p)+a,n.skewX=x+a,n.skewY=y+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[ci]=_u(c)),n.xOffset=n.yOffset=0,n.force3D=Si.force3D,n.renderTransform=n.svg?UA:j0?Q0:NA,n.uncache=0,n},_u=function(e){return(e=e.split(" "))[0]+" "+e[1]},Dd=function(e,t,n){var i=Hn(t);return dn(parseFloat(t)+parseFloat(bs(e,"x",n+"px",i)))+i},NA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Q0(e,t)},Ns="0deg",Ba="0px",Us=") ",Q0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,x=n.target,y=n.zOrigin,v="",E=p==="auto"&&e&&e!==1||p===!0;if(y&&(d!==Ns||u!==Ns)){var T=parseFloat(u)*ea,S=Math.sin(T),P=Math.cos(T),b;T=parseFloat(d)*ea,b=Math.cos(T),o=Dd(x,o,S*b*-y),a=Dd(x,a,-Math.sin(T)*-y),l=Dd(x,l,P*b*-y+y)}m!==Ba&&(v+="perspective("+m+Us),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(E||o!==Ba||a!==Ba||l!==Ba)&&(v+=l!==Ba||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Us),c!==Ns&&(v+="rotate("+c+Us),u!==Ns&&(v+="rotateY("+u+Us),d!==Ns&&(v+="rotateX("+d+Us),(f!==Ns||h!==Ns)&&(v+="skew("+f+", "+h+Us),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Us),x.style[an]=v||"translate(0, 0)"},UA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,x=n.forceCSS,y=parseFloat(o),v=parseFloat(a),E,T,S,P,b;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ea,c*=ea,E=Math.cos(l)*d,T=Math.sin(l)*d,S=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=ea,b=Math.tan(c-u),b=Math.sqrt(1+b*b),S*=b,P*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),E*=b,T*=b)),E=dn(E),T=dn(T),S=dn(S),P=dn(P)):(E=d,P=f,T=S=0),(y&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(y=bs(h,"x",o,"px"),v=bs(h,"y",a,"px")),(_||g||m||p)&&(y=dn(y+_-(_*E+g*S)+m),v=dn(v+g-(_*T+g*P)+p)),(i||s)&&(b=h.getBBox(),y=dn(y+i/100*b.width),v=dn(v+s/100*b.height)),b="matrix("+E+","+T+","+S+","+P+","+y+","+v+")",h.setAttribute("transform",b),x&&(h.style[an]=b)},FA=function(e,t,n,i,s){var o=360,a=Pn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Bs:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*fg)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*fg)%o-~~(c/o)*o)),e._pt=f=new li(e._pt,t,n,i,c,xA),f.e=u,f.u="deg",e._props.push(n),f},yg=function(e,t){for(var n in t)e[n]=t[n];return e},kA=function(e,t,n){var i=yg({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[an]=t,a=Ul(n,1),ao(n,an),n.setAttribute("transform",c)):(c=getComputedStyle(n)[an],o[an]=t,a=Ul(n,1),o[an]=c);for(l in Vr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Hn(c),_=Hn(u),d=h!==_?bs(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new li(e._pt,a,l,d,f-d,eh),e._pt.u=_||0,e._props.push(l));yg(a,i)};ai("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});gu[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Rr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var ev={name:"css",register:nh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,x,y,v,E,T,S,P;rp||nh(),this.styles=this.styles||Y0(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(gi[g]&&U0(g,t,n,i,e,s)))){if(h=typeof u,_=gu[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Dl(u)),_)_(this,e,g,u,n)&&(S=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",gs.lastIndex=0,gs.test(c)||(m=Hn(c),p=Hn(u)),p?m!==p&&(c=bs(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Pn(c)&&~c.indexOf("random(")&&(c=Dl(c)),Hn(c+"")||c==="auto"||(c+=Si.units[g]||Hn(Rr(e,g))||""),(c+"").charAt(1)==="="&&(c=Rr(e,g))):c=Rr(e,g),f=parseFloat(c),x=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),g in cr&&(g==="autoAlpha"&&(f===1&&Rr(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),as(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=cr[g],~g.indexOf(",")&&(g=g.split(",")[0]))),y=g in Vr,y){if(this.styles.save(g),v||(E=e._gsap,E.renderTransform&&!t.parseTransform||Ul(e,t.parseTransform),T=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new li(this._pt,a,an,0,1,E.renderTransform,E,0,-1),v.dep=1),g==="scale")this._pt=new li(this._pt,E,"scaleY",E.scaleY,(x?Jo(E.scaleY,x+d):d)-E.scaleY||0,eh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(ci,0,a[ci]),u=IA(u),E.svg?ih(e,u,0,T,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&as(this,E,"zOrigin",E.zOrigin,p),as(this,a,g,_u(c),_u(u)));continue}else if(g==="svgOrigin"){ih(e,u,1,T,0,this);continue}else if(g in Z0){FA(this,E,g,f,x?Jo(f,x+u):u);continue}else if(g==="smoothOrigin"){as(this,E,"smooth",E.smooth,u);continue}else if(g==="force3D"){E[g]=u;continue}else if(g==="transform"){kA(this,u,e);continue}}else g in a||(g=ba(g)||g);if(y||(d||d===0)&&(f||f===0)&&!yA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Hn(u)||(g in Si.units?Si.units[g]:m),m!==p&&(f=bs(e,g,c,p)),this._pt=new li(this._pt,y?E:a,g,f,(x?Jo(f,x+d):d)-f,!y&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?SA:eh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=bA);else if(g in a)DA.call(this,e,g,c,x?x+u:u);else if(g in e)this.add(e,g,c||e[g],x?x+u:u,i,s);else if(g!=="parseTransform"){$h(g,u);continue}y||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}S&&V0(this)},render:function(e,t){if(t.tween._time||!sp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Rr,aliases:cr,getSetter:function(e,t,n){var i=cr[t];return i&&i.indexOf(",")<0&&(t=i),t in Vr&&t!==ci&&(e._gsap.x||Rr(e,"x"))?n&&dg===n?t==="scale"?TA:EA:(dg=n||{})&&(t==="scale"?AA:CA):e.style&&!qh(e.style[t])?wA:~t.indexOf("-")?MA:np(e,t)},core:{_removeProperty:ao,_getMatrix:ap}};ui.utils.checkPrefix=ba;ui.core.getStyleSaver=Y0;(function(r,e,t,n){var i=ai(r+","+e+","+t,function(s){Vr[s]=1});ai(e,function(s){Si.units[s]="deg",Z0[s]=1}),cr[i[13]]=r+","+e,ai(n,function(s){var o=s.split(":");cr[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ai("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Si.units[r]="px"});ui.registerPlugin(ev);var Re=ui.registerPlugin(ev)||ui;Re.core.Tween;function wc(r,e){const t=document.querySelector(`#${r} .number`);if(!t)return;let n;r==="days"&&e>=100?n=String(e):n=("0"+e).slice(-2),t.textContent!==n?Re.to(t,{duration:.2,opacity:0,y:-10,ease:"power2.in",onComplete:()=>{t.textContent=n,Re.fromTo(t,{opacity:0,y:10},{duration:.3,opacity:1,y:0,ease:"power2.out"})}}):t.textContent=n}function BA(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),wc("days",i),wc("hours",s),wc("minutes",o),wc("seconds",a)}e(),setInterval(e,1e3)}function zA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function HA(r,e,t){return e&&zA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var In,jc,yi,ls,cs,ta,tv,zs,ul,nv,Nr,Vi,iv,rv=function(){return In||typeof window<"u"&&(In=window.gsap)&&In.registerPlugin&&In},sv=1,jo=[],Mt=[],pr=[],dl=Date.now,rh=function(e,t){return t},VA=function(){var e=ul.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Mt),i.push.apply(i,pr),Mt=n,pr=i,rh=function(o,a){return t[o](a)}},_s=function(e,t){return~pr.indexOf(e)&&pr[pr.indexOf(e)+1][t]},fl=function(e){return!!~nv.indexOf(e)},Yn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},qn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Mc="scrollLeft",Ec="scrollTop",sh=function(){return Nr&&Nr.isPressed||Mt.cache++},vu=function(e,t){var n=function i(s){if(s||s===0){sv&&(yi.history.scrollRestoration="manual");var o=Nr&&Nr.isPressed;s=i.v=Math.round(s)||(Nr&&Nr.iOS?1:0),e(s),i.cacheID=Mt.cache,o&&rh("ss",s)}else(t||Mt.cache!==i.cacheID||rh("ref"))&&(i.cacheID=Mt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},ei={s:Mc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:vu(function(r){return arguments.length?yi.scrollTo(r,bn.sc()):yi.pageXOffset||ls[Mc]||cs[Mc]||ta[Mc]||0})},bn={s:Ec,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:ei,sc:vu(function(r){return arguments.length?yi.scrollTo(ei.sc(),r):yi.pageYOffset||ls[Ec]||cs[Ec]||ta[Ec]||0})},ii=function(e,t){return(t&&t._ctx&&t._ctx.selector||In.utils.toArray)(e)[0]||(typeof e=="string"&&In.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Ss=function(e,t){var n=t.s,i=t.sc;fl(e)&&(e=ls.scrollingElement||cs);var s=Mt.indexOf(e),o=i===bn.sc?1:2;!~s&&(s=Mt.push(e)-1),Mt[s+o]||Yn(e,"scroll",sh);var a=Mt[s+o],l=a||(Mt[s+o]=vu(_s(e,n),!0)||(fl(e)?i:vu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=In.getProperty(e,"scrollBehavior")==="smooth"),l},oh=function(e,t,n){var i=e,s=e,o=dl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=dl();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=dl();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},za=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},xg=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},ov=function(){ul=In.core.globals().ScrollTrigger,ul&&ul.core&&VA()},av=function(e){return In=e||rv(),!jc&&In&&typeof document<"u"&&document.body&&(yi=window,ls=document,cs=ls.documentElement,ta=ls.body,nv=[yi,ls,cs,ta],In.utils.clamp,iv=In.core.context||function(){},zs="onpointerenter"in ta?"pointer":"mouse",tv=fn.isTouch=yi.matchMedia&&yi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in yi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Vi=fn.eventTypes=("ontouchstart"in cs?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in cs?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return sv=0},500),ov(),jc=1),jc};ei.op=bn;Mt.cache=0;var fn=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){jc||av(In)||console.warn("Please gsap.registerPlugin(Observer)"),ul||ov();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,x=n.onDrag,y=n.onPress,v=n.onRelease,E=n.onRight,T=n.onLeft,S=n.onUp,P=n.onDown,b=n.onChangeX,M=n.onChangeY,L=n.onChange,U=n.onToggleX,W=n.onToggleY,F=n.onHover,q=n.onHoverEnd,j=n.onMove,C=n.ignoreCheck,Y=n.isNormalizer,he=n.onGestureStart,O=n.onGestureEnd,_e=n.onWheel,ve=n.onEnable,Q=n.onDisable,qe=n.onClick,He=n.scrollSpeed,ee=n.capture,re=n.allowClicks,Se=n.lockAxis,Ge=n.onLockAxis;this.target=a=ii(a)||cs,this.vars=n,h&&(h=In.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,He=He||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(yi.getComputedStyle(ta).lineHeight)||22);var ye,it,ft,I,st,Ke,Ye,B=this,ht=0,Fe=0,ot=n.passive||!u&&n.passive!==!1,lt=Ss(a,ei),_t=Ss(a,bn),D=lt(),A=_t(),G=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Vi[0]==="pointerdown",se=fl(a),ae=a.ownerDocument||ls,$=[0,0,0],Te=[0,0,0],pe=0,Ee=function(){return pe=dl()},we=function(Ne,dt){return(B.event=Ne)&&h&&~h.indexOf(Ne.target)||dt&&G&&Ne.pointerType!=="touch"||C&&C(Ne,dt)},ge=function(){B._vx.reset(),B._vy.reset(),it.pause(),d&&d(B)},ne=function(){var Ne=B.deltaX=xg($),dt=B.deltaY=xg(Te),Ae=Math.abs(Ne)>=i,Xe=Math.abs(dt)>=i;L&&(Ae||Xe)&&L(B,Ne,dt,$,Te),Ae&&(E&&B.deltaX>0&&E(B),T&&B.deltaX<0&&T(B),b&&b(B),U&&B.deltaX<0!=ht<0&&U(B),ht=B.deltaX,$[0]=$[1]=$[2]=0),Xe&&(P&&B.deltaY>0&&P(B),S&&B.deltaY<0&&S(B),M&&M(B),W&&B.deltaY<0!=Fe<0&&W(B),Fe=B.deltaY,Te[0]=Te[1]=Te[2]=0),(I||ft)&&(j&&j(B),ft&&(m&&ft===1&&m(B),x&&x(B),ft=0),I=!1),Ke&&!(Ke=!1)&&Ge&&Ge(B),st&&(_e(B),st=!1),ye=0},We=function(Ne,dt,Ae){$[Ae]+=Ne,Te[Ae]+=dt,B._vx.update(Ne),B._vy.update(dt),c?ye||(ye=requestAnimationFrame(ne)):ne()},Ie=function(Ne,dt){Se&&!Ye&&(B.axis=Ye=Math.abs(Ne)>Math.abs(dt)?"x":"y",Ke=!0),Ye!=="y"&&($[2]+=Ne,B._vx.update(Ne,!0)),Ye!=="x"&&(Te[2]+=dt,B._vy.update(dt,!0)),c?ye||(ye=requestAnimationFrame(ne)):ne()},be=function(Ne){if(!we(Ne,1)){Ne=za(Ne,u);var dt=Ne.clientX,Ae=Ne.clientY,Xe=dt-B.x,ze=Ae-B.y,at=B.isDragging;B.x=dt,B.y=Ae,(at||(Xe||ze)&&(Math.abs(B.startX-dt)>=s||Math.abs(B.startY-Ae)>=s))&&(ft=at?2:1,at||(B.isDragging=!0),Ie(Xe,ze))}},Le=B.onPress=function(Oe){we(Oe,1)||Oe&&Oe.button||(B.axis=Ye=null,it.pause(),B.isPressed=!0,Oe=za(Oe),ht=Fe=0,B.startX=B.x=Oe.clientX,B.startY=B.y=Oe.clientY,B._vx.reset(),B._vy.reset(),Yn(Y?a:ae,Vi[1],be,ot,!0),B.deltaX=B.deltaY=0,y&&y(B))},N=B.onRelease=function(Oe){if(!we(Oe,1)){qn(Y?a:ae,Vi[1],be,!0);var Ne=!isNaN(B.y-B.startY),dt=B.isDragging,Ae=dt&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),Xe=za(Oe);!Ae&&Ne&&(B._vx.reset(),B._vy.reset(),u&&re&&In.delayedCall(.08,function(){if(dl()-pe>300&&!Oe.defaultPrevented){if(Oe.target.click)Oe.target.click();else if(ae.createEvent){var ze=ae.createEvent("MouseEvents");ze.initMouseEvent("click",!0,!0,yi,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),Oe.target.dispatchEvent(ze)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,d&&dt&&!Y&&it.restart(!0),ft&&ne(),p&&dt&&p(B),v&&v(B,Ae)}},me=function(Ne){return Ne.touches&&Ne.touches.length>1&&(B.isGesturing=!0)&&he(Ne,B.isDragging)},oe=function(){return(B.isGesturing=!1)||O(B)},Pe=function(Ne){if(!we(Ne)){var dt=lt(),Ae=_t();We((dt-D)*He,(Ae-A)*He,1),D=dt,A=Ae,d&&it.restart(!0)}},le=function(Ne){if(!we(Ne)){Ne=za(Ne,u),_e&&(st=!0);var dt=(Ne.deltaMode===1?l:Ne.deltaMode===2?yi.innerHeight:1)*_;We(Ne.deltaX*dt,Ne.deltaY*dt,0),d&&!Y&&it.restart(!0)}},ue=function(Ne){if(!we(Ne)){var dt=Ne.clientX,Ae=Ne.clientY,Xe=dt-B.x,ze=Ae-B.y;B.x=dt,B.y=Ae,I=!0,d&&it.restart(!0),(Xe||ze)&&Ie(Xe,ze)}},Be=function(Ne){B.event=Ne,F(B)},rt=function(Ne){B.event=Ne,q(B)},Ot=function(Ne){return we(Ne)||za(Ne,u)&&qe(B)};it=B._dc=In.delayedCall(f||.25,ge).pause(),B.deltaX=B.deltaY=0,B._vx=oh(0,50,!0),B._vy=oh(0,50,!0),B.scrollX=lt,B.scrollY=_t,B.isDragging=B.isGesturing=B.isPressed=!1,iv(this),B.enable=function(Oe){return B.isEnabled||(Yn(se?ae:a,"scroll",sh),o.indexOf("scroll")>=0&&Yn(se?ae:a,"scroll",Pe,ot,ee),o.indexOf("wheel")>=0&&Yn(a,"wheel",le,ot,ee),(o.indexOf("touch")>=0&&tv||o.indexOf("pointer")>=0)&&(Yn(a,Vi[0],Le,ot,ee),Yn(ae,Vi[2],N),Yn(ae,Vi[3],N),re&&Yn(a,"click",Ee,!0,!0),qe&&Yn(a,"click",Ot),he&&Yn(ae,"gesturestart",me),O&&Yn(ae,"gestureend",oe),F&&Yn(a,zs+"enter",Be),q&&Yn(a,zs+"leave",rt),j&&Yn(a,zs+"move",ue)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=I=ft=!1,B._vx.reset(),B._vy.reset(),D=lt(),A=_t(),Oe&&Oe.type&&Le(Oe),ve&&ve(B)),B},B.disable=function(){B.isEnabled&&(jo.filter(function(Oe){return Oe!==B&&fl(Oe.target)}).length||qn(se?ae:a,"scroll",sh),B.isPressed&&(B._vx.reset(),B._vy.reset(),qn(Y?a:ae,Vi[1],be,!0)),qn(se?ae:a,"scroll",Pe,ee),qn(a,"wheel",le,ee),qn(a,Vi[0],Le,ee),qn(ae,Vi[2],N),qn(ae,Vi[3],N),qn(a,"click",Ee,!0),qn(a,"click",Ot),qn(ae,"gesturestart",me),qn(ae,"gestureend",oe),qn(a,zs+"enter",Be),qn(a,zs+"leave",rt),qn(a,zs+"move",ue),B.isEnabled=B.isPressed=B.isDragging=!1,Q&&Q(B))},B.kill=B.revert=function(){B.disable();var Oe=jo.indexOf(B);Oe>=0&&jo.splice(Oe,1),Nr===B&&(Nr=0)},jo.push(B),Y&&fl(a)&&(Nr=B),B.enable(g)},HA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();fn.version="3.12.7";fn.create=function(r){return new fn(r)};fn.register=av;fn.getAll=function(){return jo.slice()};fn.getById=function(r){return jo.filter(function(e){return e.vars.id===r})[0]};rv()&&In.registerPlugin(fn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,Vo,wt,Jt,_i,Gt,lp,yu,Fl,hl,ja,Tc,Bn,Iu,ah,Kn,bg,Sg,Go,lv,Id,cv,$n,lh,uv,dv,ns,ch,cp,na,up,xu,uh,Od,Ac=1,zn=Date.now,Nd=zn(),Fi=0,$a=0,wg=function(e,t,n){var i=mi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Mg=function(e,t){return t&&(!mi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},GA=function r(){return $a&&requestAnimationFrame(r)},Eg=function(){return Iu=1},Tg=function(){return Iu=0},rr=function(e){return e},Ka=function(e){return Math.round(e*1e5)/1e5||0},fv=function(){return typeof window<"u"},hv=function(){return je||fv()&&(je=window.gsap)&&je.registerPlugin&&je},lo=function(e){return!!~lp.indexOf(e)},pv=function(e){return(e==="Height"?up:wt["inner"+e])||_i["client"+e]||Gt["client"+e]},mv=function(e){return _s(e,"getBoundingClientRect")||(lo(e)?function(){return Qc.width=wt.innerWidth,Qc.height=up,Qc}:function(){return Lr(e)})},WA=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=_s(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?pv(s):e["client"+s])||0}},XA=function(e,t){return!t||~pr.indexOf(e)?mv(e):function(){return Qc}},ur=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=_s(e,n))?o()-mv(e)()[s]:lo(e)?(_i[n]||Gt[n])-pv(i):e[n]-e["offset"+i])},Cc=function(e,t){for(var n=0;n<Go.length;n+=3)(!t||~t.indexOf(Go[n+1]))&&e(Go[n],Go[n+1],Go[n+2])},mi=function(e){return typeof e=="string"},Vn=function(e){return typeof e=="function"},Za=function(e){return typeof e=="number"},Hs=function(e){return typeof e=="object"},Ha=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Ud=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Fo=Math.abs,gv="left",_v="top",dp="right",fp="bottom",to="width",no="height",pl="Right",ml="Left",gl="Top",_l="Bottom",gn="padding",Pi="margin",Sa="Width",hp="Height",xn="px",Li=function(e){return wt.getComputedStyle(e)},qA=function(e){var t=Li(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Ag=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Lr=function(e,t){var n=t&&Li(e)[ah]!=="matrix(1, 0, 0, 1, 0, 0)"&&je.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},bu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},vv=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},YA=function(e){return function(t){return je.utils.snap(vv(e),t)}},pp=function(e){var t=je.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},jA=function(e){return function(t,n){return pp(vv(e))(t,n.direction)}},Rc=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Cn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},An=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Pc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Cg={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Lc={toggleActions:"play",anticipatePin:0},Su={top:0,left:0,center:.5,bottom:1,right:1},$c=function(e,t){if(mi(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Su?Su[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Dc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=Jt.createElement("div"),g=lo(n)||_s(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Gt:n,x=e.indexOf("start")!==-1,y=x?c:u,v="border-color:"+y+";font-size:"+d+";color:"+y+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===bn?dp:fp)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=x,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Kc(_,0,i,x),_},Kc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Sa]=1,s["border"+a+Sa]=0,s[n.p]=t+"px",je.set(e,s)},St=[],dh={},kl,Rg=function(){return zn()-Fi>34&&(kl||(kl=requestAnimationFrame(Br)))},ko=function(){(!$n||!$n.isPressed||$n.startX>Gt.clientWidth)&&(Mt.cache++,$n?kl||(kl=requestAnimationFrame(Br)):Br(),Fi||uo("scrollStart"),Fi=zn())},Fd=function(){dv=wt.innerWidth,uv=wt.innerHeight},Ja=function(e){Mt.cache++,(e===!0||!Bn&&!cv&&!Jt.fullscreenElement&&!Jt.webkitFullscreenElement&&(!lh||dv!==wt.innerWidth||Math.abs(wt.innerHeight-uv)>wt.innerHeight*.25))&&yu.restart(!0)},co={},$A=[],yv=function r(){return An($e,"scrollEnd",r)||Ys(!0)},uo=function(e){return co[e]&&co[e].map(function(t){return t()})||$A},pi=[],xv=function(e){for(var t=0;t<pi.length;t+=5)(!e||pi[t+4]&&pi[t+4].query===e)&&(pi[t].style.cssText=pi[t+1],pi[t].getBBox&&pi[t].setAttribute("transform",pi[t+2]||""),pi[t+3].uncache=1)},mp=function(e,t){var n;for(Kn=0;Kn<St.length;Kn++)n=St[Kn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));xu=!0,t&&xv(t),t||uo("revert")},bv=function(e,t){Mt.cache++,(t||!Zn)&&Mt.forEach(function(n){return Vn(n)&&n.cacheID++&&(n.rec=0)}),mi(e)&&(wt.history.scrollRestoration=cp=e)},Zn,io=0,Pg,KA=function(){if(Pg!==io){var e=Pg=io;requestAnimationFrame(function(){return e===io&&Ys(!0)})}},Sv=function(){Gt.appendChild(na),up=!$n&&na.offsetHeight||wt.innerHeight,Gt.removeChild(na)},Lg=function(e){return Fl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ys=function(e,t){if(_i=Jt.documentElement,Gt=Jt.body,lp=[wt,Jt,_i,Gt],Fi&&!e&&!xu){Cn($e,"scrollEnd",yv);return}Sv(),Zn=$e.isRefreshing=!0,Mt.forEach(function(i){return Vn(i)&&++i.cacheID&&(i.rec=i())});var n=uo("refreshInit");lv&&$e.sort(),t||mp(),Mt.forEach(function(i){Vn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),St.slice(0).forEach(function(i){return i.refresh()}),xu=!1,St.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),uh=1,Lg(!0),St.forEach(function(i){var s=ur(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Lg(!1),uh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Mt.forEach(function(i){Vn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),bv(cp,1),yu.pause(),io++,Zn=2,Br(2),St.forEach(function(i){return Vn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Zn=$e.isRefreshing=!1,uo("refresh")},fh=0,Zc=1,vl,Br=function(e){if(e===2||!Zn&&!xu){$e.isUpdating=!0,vl&&vl.update(0);var t=St.length,n=zn(),i=n-Nd>=50,s=t&&St[0].scroll();if(Zc=fh>s?-1:1,Zn||(fh=s),i&&(Fi&&!Iu&&n-Fi>200&&(Fi=0,uo("scrollEnd")),ja=Nd,Nd=n),Zc<0){for(Kn=t;Kn-- >0;)St[Kn]&&St[Kn].update(0,i);Zc=1}else for(Kn=0;Kn<t;Kn++)St[Kn]&&St[Kn].update(0,i);$e.isUpdating=!1}kl=0},hh=[gv,_v,fp,dp,Pi+_l,Pi+pl,Pi+gl,Pi+ml,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Jc=hh.concat([to,no,"boxSizing","max"+Sa,"max"+hp,"position",Pi,gn,gn+gl,gn+pl,gn+_l,gn+ml]),ZA=function(e,t,n){ia(n);var i=e._gsap;if(i.spacerIsNative)ia(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},kd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=hh.length,o=t.style,a=e.style,l;s--;)l=hh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[fp]=a[dp]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[to]=bu(e,ei)+xn,o[no]=bu(e,bn)+xn,o[gn]=a[Pi]=a[_v]=a[gv]="0",ia(i),a[to]=a["max"+Sa]=n[to],a[no]=a["max"+hp]=n[no],a[gn]=n[gn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},JA=/([A-Z])/g,ia=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||je.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(JA,"-$1").toLowerCase())}},Ic=function(e){for(var t=Jc.length,n=e.style,i=[],s=0;s<t;s++)i.push(Jc[s],n[Jc[s]]);return i.t=e,i},QA=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Qc={left:0,top:0},Dg=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Vn(e)&&(e=e(l)),mi(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?$c("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,x;if(h&&h.seek(0),isNaN(e)||(e=+e),Za(e))h&&(e=je.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Kc(a,n,i,!0);else{Vn(t)&&(t=t(l));var y=(e||"0").split(" "),v,E,T,S;x=ii(t,l)||Gt,v=Lr(x)||{},(!v||!v.left&&!v.top)&&Li(x).display==="none"&&(S=x.style.display,x.style.display="block",v=Lr(x),S?x.style.display=S:x.style.removeProperty("display")),E=$c(y[0],v[i.d]),T=$c(y[1]||"0",n),e=v[i.p]-c[i.p]-u+E+s-T,a&&Kc(a,T,i,n-T<20||a._isStart&&T>20),n-=n-T}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,b=o._isStart;m="scroll"+i.d2,Kc(o,P,i,b&&P>20||!b&&(d?Math.max(Gt[m],_i[m]):o.parentNode[m])<=P+1),d&&(c=Lr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+xn))}return h&&x&&(m=Lr(x),h.seek(f),p=Lr(x),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},eC=/(webkit|moz|length|cssText|inset)/i,Ig=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Gt){e._stOrig=s.cssText,a=Li(e);for(o in a)!+o&&!eC.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;je.core.getCache(e).uncache=1,t.appendChild(e)}},wv=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Oc=function(e,t,n){var i={};i[t.p]="+="+n,je.set(e,i)},Og=function(e,t){var n=Ss(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=wv(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Mt.cache++,o.tween&&Br()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=je.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Cn(e,"wheel",n.wheelHandler),$e.isTouch&&Cn(e,"touchmove",n.wheelHandler),s},$e=(function(){function r(t,n){Vo||r.register(je)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),ch(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!$a){this.update=this.refresh=this.kill=rr;return}n=Ag(mi(n)||Za(n)||n.nodeType?{trigger:n}:n,Lc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,x=s.onSnapComplete,y=s.once,v=s.snap,E=s.pinReparent,T=s.pinSpacer,S=s.containerAnimation,P=s.fastScrollEnd,b=s.preventOverlaps,M=n.horizontal||n.containerAnimation&&n.horizontal!==!1?ei:bn,L=!d&&d!==0,U=ii(n.scroller||wt),W=je.core.getCache(U),F=lo(U),q=("pinType"in n?n.pinType:_s(U,"pinType")||F&&"fixed")==="fixed",j=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],C=L&&n.toggleActions.split(" "),Y="markers"in n?n.markers:Lc.markers,he=F?0:parseFloat(Li(U)["border"+M.p2+Sa])||0,O=this,_e=n.onRefreshInit&&function(){return n.onRefreshInit(O)},ve=WA(U,F,M),Q=XA(U,F),qe=0,He=0,ee=0,re=Ss(U,M),Se,Ge,ye,it,ft,I,st,Ke,Ye,B,ht,Fe,ot,lt,_t,D,A,G,se,ae,$,Te,pe,Ee,we,ge,ne,We,Ie,be,Le,N,me,oe,Pe,le,ue,Be,rt;if(O._startClamp=O._endClamp=!1,O._dir=M,m*=45,O.scroller=U,O.scroll=S?S.time.bind(S):re,it=re(),O.vars=n,i=i||n.animation,"refreshPriority"in n&&(lv=1,n.refreshPriority===-9999&&(vl=O)),W.tweenScroll=W.tweenScroll||{top:Og(U,bn),left:Og(U,ei)},O.tweenTo=Se=W.tweenScroll[M.p],O.scrubDuration=function(Ae){me=Za(Ae)&&Ae,me?N?N.duration(Ae):N=je.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:me,paused:!0,onComplete:function(){return p&&p(O)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!O.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),O.animation=i.pause(),i.scrollTrigger=O,O.scrubDuration(d),be=0,l||(l=i.vars.id)),v&&((!Hs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Gt.style&&je.set(F?[Gt,_i]:U,{scrollBehavior:"auto"}),Mt.forEach(function(Ae){return Vn(Ae)&&Ae.target===(F?Jt.scrollingElement||_i:U)&&(Ae.smooth=!1)}),ye=Vn(v.snapTo)?v.snapTo:v.snapTo==="labels"?YA(i):v.snapTo==="labelsDirectional"?jA(i):v.directional!==!1?function(Ae,Xe){return pp(v.snapTo)(Ae,zn()-He<500?0:Xe.direction)}:je.utils.snap(v.snapTo),oe=v.duration||{min:.1,max:2},oe=Hs(oe)?hl(oe.min,oe.max):hl(oe,oe),Pe=je.delayedCall(v.delay||me/2||.1,function(){var Ae=re(),Xe=zn()-He<500,ze=Se.tween;if((Xe||Math.abs(O.getVelocity())<10)&&!ze&&!Iu&&qe!==Ae){var at=(Ae-I)/lt,nn=i&&!L?i.totalProgress():at,ct=Xe?0:(nn-Le)/(zn()-ja)*1e3||0,Ft=je.utils.clamp(-at,1-at,Fo(ct/2)*ct/.185),Kt=at+(v.inertia===!1?0:Ft),vt,Ht,bt=v,sn=bt.onStart,Rt=bt.onInterrupt,Nn=bt.onComplete;if(vt=ye(Kt,O),Za(vt)||(vt=Kt),Ht=Math.max(0,Math.round(I+vt*lt)),Ae<=st&&Ae>=I&&Ht!==Ae){if(ze&&!ze._initted&&ze.data<=Fo(Ht-Ae))return;v.inertia===!1&&(Ft=vt-at),Se(Ht,{duration:oe(Fo(Math.max(Fo(Kt-nn),Fo(vt-nn))*.185/ct/.05||0)),ease:v.ease||"power3",data:Fo(Ht-Ae),onInterrupt:function(){return Pe.restart(!0)&&Rt&&Rt(O)},onComplete:function(){O.update(),qe=re(),i&&!L&&(N?N.resetTo("totalProgress",vt,i._tTime/i._tDur):i.progress(vt)),be=Le=i&&!L?i.totalProgress():O.progress,x&&x(O),Nn&&Nn(O)}},Ae,Ft*lt,Ht-Ae-Ft*lt),sn&&sn(O,Se.tween)}}else O.isActive&&qe!==Ae&&Pe.restart(!0)}).pause()),l&&(dh[l]=O),f=O.trigger=ii(f||h!==!0&&h),rt=f&&f._gsap&&f._gsap.stRevert,rt&&(rt=rt(O)),h=h===!0?f:ii(h),mi(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Pi||(_=!_&&h.parentNode&&h.parentNode.style&&Li(h.parentNode).display==="flex"?!1:gn),O.pin=h,Ge=je.core.getCache(h),Ge.spacer?_t=Ge.pinState:(T&&(T=ii(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),Ge.spacerIsNative=!!T,T&&(Ge.spacerState=Ic(T))),Ge.spacer=G=T||Jt.createElement("div"),G.classList.add("pin-spacer"),l&&G.classList.add("pin-spacer-"+l),Ge.pinState=_t=Ic(h)),n.force3D!==!1&&je.set(h,{force3D:!0}),O.spacer=G=Ge.spacer,Ie=Li(h),Ee=Ie[_+M.os2],ae=je.getProperty(h),$=je.quickSetter(h,M.a,xn),kd(h,G,Ie),A=Ic(h)),Y){Fe=Hs(Y)?Ag(Y,Cg):Cg,B=Dc("scroller-start",l,U,M,Fe,0),ht=Dc("scroller-end",l,U,M,Fe,0,B),se=B["offset"+M.op.d2];var Ot=ii(_s(U,"content")||U);Ke=this.markerStart=Dc("start",l,Ot,M,Fe,se,0,S),Ye=this.markerEnd=Dc("end",l,Ot,M,Fe,se,0,S),S&&(Be=je.quickSetter([Ke,Ye],M.a,xn)),!q&&!(pr.length&&_s(U,"fixedMarkers")===!0)&&(qA(F?Gt:U),je.set([B,ht],{force3D:!0}),ge=je.quickSetter(B,M.a,xn),We=je.quickSetter(ht,M.a,xn))}if(S){var Oe=S.vars.onUpdate,Ne=S.vars.onUpdateParams;S.eventCallback("onUpdate",function(){O.update(0,0,1),Oe&&Oe.apply(S,Ne||[])})}if(O.previous=function(){return St[St.indexOf(O)-1]},O.next=function(){return St[St.indexOf(O)+1]},O.revert=function(Ae,Xe){if(!Xe)return O.kill(!0);var ze=Ae!==!1||!O.enabled,at=Bn;ze!==O.isReverted&&(ze&&(le=Math.max(re(),O.scroll.rec||0),ee=O.progress,ue=i&&i.progress()),Ke&&[Ke,Ye,B,ht].forEach(function(nn){return nn.style.display=ze?"none":"block"}),ze&&(Bn=O,O.update(ze)),h&&(!E||!O.isActive)&&(ze?ZA(h,G,_t):kd(h,G,Li(h),we)),ze||O.update(ze),Bn=at,O.isReverted=ze)},O.refresh=function(Ae,Xe,ze,at){if(!((Bn||!O.enabled)&&!Xe)){if(h&&Ae&&Fi){Cn(r,"scrollEnd",yv);return}!Zn&&_e&&_e(O),Bn=O,Se.tween&&!ze&&(Se.tween.kill(),Se.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),O.isReverted||O.revert(!0,!0),O._subPinOffset=!1;var nn=ve(),ct=Q(),Ft=S?S.duration():ur(U,M),Kt=lt<=.01,vt=0,Ht=at||0,bt=Hs(ze)?ze.end:n.end,sn=n.endTrigger||f,Rt=Hs(ze)?ze.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Nn=O.pinnedContainer=n.pinnedContainer&&ii(n.pinnedContainer,O),Ce=f&&Math.max(0,St.indexOf(O))||0,Nt=Ce,R,H,K,Z,V,de,xe,Me,ke,tt,De,Ze,pt;for(Y&&Hs(ze)&&(Ze=je.getProperty(B,M.p),pt=je.getProperty(ht,M.p));Nt-- >0;)de=St[Nt],de.end||de.refresh(0,1)||(Bn=O),xe=de.pin,xe&&(xe===f||xe===h||xe===Nn)&&!de.isReverted&&(tt||(tt=[]),tt.unshift(de),de.revert(!0,!0)),de!==St[Nt]&&(Ce--,Nt--);for(Vn(Rt)&&(Rt=Rt(O)),Rt=wg(Rt,"start",O),I=Dg(Rt,f,nn,M,re(),Ke,B,O,ct,he,q,Ft,S,O._startClamp&&"_startClamp")||(h?-.001:0),Vn(bt)&&(bt=bt(O)),mi(bt)&&!bt.indexOf("+=")&&(~bt.indexOf(" ")?bt=(mi(Rt)?Rt.split(" ")[0]:"")+bt:(vt=$c(bt.substr(2),nn),bt=mi(Rt)?Rt:(S?je.utils.mapRange(0,S.duration(),S.scrollTrigger.start,S.scrollTrigger.end,I):I)+vt,sn=f)),bt=wg(bt,"end",O),st=Math.max(I,Dg(bt||(sn?"100% 0":Ft),sn,nn,M,re()+vt,Ye,ht,O,ct,he,q,Ft,S,O._endClamp&&"_endClamp"))||-.001,vt=0,Nt=Ce;Nt--;)de=St[Nt],xe=de.pin,xe&&de.start-de._pinPush<=I&&!S&&de.end>0&&(R=de.end-(O._startClamp?Math.max(0,de.start):de.start),(xe===f&&de.start-de._pinPush<I||xe===Nn)&&isNaN(Rt)&&(vt+=R*(1-de.progress)),xe===h&&(Ht+=R));if(I+=vt,st+=vt,O._startClamp&&(O._startClamp+=vt),O._endClamp&&!Zn&&(O._endClamp=st||-.001,st=Math.min(st,ur(U,M))),lt=st-I||(I-=.01)&&.001,Kt&&(ee=je.utils.clamp(0,1,je.utils.normalize(I,st,le))),O._pinPush=Ht,Ke&&vt&&(R={},R[M.a]="+="+vt,Nn&&(R[M.p]="-="+re()),je.set([Ke,Ye],R)),h&&!(uh&&O.end>=ur(U,M)))R=Li(h),Z=M===bn,K=re(),Te=parseFloat(ae(M.a))+Ht,!Ft&&st>1&&(De=(F?Jt.scrollingElement||_i:U).style,De={style:De,value:De["overflow"+M.a.toUpperCase()]},F&&Li(Gt)["overflow"+M.a.toUpperCase()]!=="scroll"&&(De.style["overflow"+M.a.toUpperCase()]="scroll")),kd(h,G,R),A=Ic(h),H=Lr(h,!0),Me=q&&Ss(U,Z?ei:bn)(),_?(we=[_+M.os2,lt+Ht+xn],we.t=G,Nt=_===gn?bu(h,M)+lt+Ht:0,Nt&&(we.push(M.d,Nt+xn),G.style.flexBasis!=="auto"&&(G.style.flexBasis=Nt+xn)),ia(we),Nn&&St.forEach(function(Et){Et.pin===Nn&&Et.vars.pinSpacing!==!1&&(Et._subPinOffset=!0)}),q&&re(le)):(Nt=bu(h,M),Nt&&G.style.flexBasis!=="auto"&&(G.style.flexBasis=Nt+xn)),q&&(V={top:H.top+(Z?K-I:Me)+xn,left:H.left+(Z?Me:K-I)+xn,boxSizing:"border-box",position:"fixed"},V[to]=V["max"+Sa]=Math.ceil(H.width)+xn,V[no]=V["max"+hp]=Math.ceil(H.height)+xn,V[Pi]=V[Pi+gl]=V[Pi+pl]=V[Pi+_l]=V[Pi+ml]="0",V[gn]=R[gn],V[gn+gl]=R[gn+gl],V[gn+pl]=R[gn+pl],V[gn+_l]=R[gn+_l],V[gn+ml]=R[gn+ml],D=QA(_t,V,E),Zn&&re(0)),i?(ke=i._initted,Id(1),i.render(i.duration(),!0,!0),pe=ae(M.a)-Te+lt+Ht,ne=Math.abs(lt-pe)>1,q&&ne&&D.splice(D.length-2,2),i.render(0,!0,!0),ke||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Id(0)):pe=lt,De&&(De.value?De.style["overflow"+M.a.toUpperCase()]=De.value:De.style.removeProperty("overflow-"+M.a));else if(f&&re()&&!S)for(H=f.parentNode;H&&H!==Gt;)H._pinOffset&&(I-=H._pinOffset,st-=H._pinOffset),H=H.parentNode;tt&&tt.forEach(function(Et){return Et.revert(!1,!0)}),O.start=I,O.end=st,it=ft=Zn?le:re(),!S&&!Zn&&(it<le&&re(le),O.scroll.rec=0),O.revert(!1,!0),He=zn(),Pe&&(qe=-1,Pe.restart(!0)),Bn=0,i&&L&&(i._initted||ue)&&i.progress()!==ue&&i.progress(ue||0,!0).render(i.time(),!0,!0),(Kt||ee!==O.progress||S||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(S&&I<-.001&&!ee?je.utils.normalize(I,st,0):ee,!0),O.progress=Kt||(it-I)/lt===ee?0:ee),h&&_&&(G._pinOffset=Math.round(O.progress*pe)),N&&N.invalidate(),isNaN(Ze)||(Ze-=je.getProperty(B,M.p),pt-=je.getProperty(ht,M.p),Oc(B,M,Ze),Oc(Ke,M,Ze-(at||0)),Oc(ht,M,pt),Oc(Ye,M,pt-(at||0))),Kt&&!Zn&&O.update(),u&&!Zn&&!ot&&(ot=!0,u(O),ot=!1)}},O.getVelocity=function(){return(re()-ft)/(zn()-ja)*1e3||0},O.endAnimation=function(){Ha(O.callbackAnimation),i&&(N?N.progress(1):i.paused()?L||Ha(i,O.direction<0,1):Ha(i,i.reversed()))},O.labelToScroll=function(Ae){return i&&i.labels&&(I||O.refresh()||I)+i.labels[Ae]/i.duration()*lt||0},O.getTrailing=function(Ae){var Xe=St.indexOf(O),ze=O.direction>0?St.slice(0,Xe).reverse():St.slice(Xe+1);return(mi(Ae)?ze.filter(function(at){return at.vars.preventOverlaps===Ae}):ze).filter(function(at){return O.direction>0?at.end<=I:at.start>=st})},O.update=function(Ae,Xe,ze){if(!(S&&!ze&&!Ae)){var at=Zn===!0?le:O.scroll(),nn=Ae?0:(at-I)/lt,ct=nn<0?0:nn>1?1:nn||0,Ft=O.progress,Kt,vt,Ht,bt,sn,Rt,Nn,Ce;if(Xe&&(ft=it,it=S?re():at,v&&(Le=be,be=i&&!L?i.totalProgress():ct)),m&&h&&!Bn&&!Ac&&Fi&&(!ct&&I<at+(at-ft)/(zn()-ja)*m?ct=1e-4:ct===1&&st>at+(at-ft)/(zn()-ja)*m&&(ct=.9999)),ct!==Ft&&O.enabled){if(Kt=O.isActive=!!ct&&ct<1,vt=!!Ft&&Ft<1,Rt=Kt!==vt,sn=Rt||!!ct!=!!Ft,O.direction=ct>Ft?1:-1,O.progress=ct,sn&&!Bn&&(Ht=ct&&!Ft?0:ct===1?1:Ft===1?2:3,L&&(bt=!Rt&&C[Ht+1]!=="none"&&C[Ht+1]||C[Ht],Ce=i&&(bt==="complete"||bt==="reset"||bt in i))),b&&(Rt||Ce)&&(Ce||d||!i)&&(Vn(b)?b(O):O.getTrailing(b).forEach(function(K){return K.endAnimation()})),L||(N&&!Bn&&!Ac?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",ct,i._tTime/i._tDur):(N.vars.totalProgress=ct,N.invalidate().restart())):i&&i.totalProgress(ct,!!(Bn&&(He||Ae)))),h){if(Ae&&_&&(G.style[_+M.os2]=Ee),!q)$(Ka(Te+pe*ct));else if(sn){if(Nn=!Ae&&ct>Ft&&st+1>at&&at+1>=ur(U,M),E)if(!Ae&&(Kt||Nn)){var Nt=Lr(h,!0),R=at-I;Ig(h,Gt,Nt.top+(M===bn?R:0)+xn,Nt.left+(M===bn?0:R)+xn)}else Ig(h,G);ia(Kt||Nn?D:A),ne&&ct<1&&Kt||$(Te+(ct===1&&!Nn?pe:0))}}v&&!Se.tween&&!Bn&&!Ac&&Pe.restart(!0),a&&(Rt||y&&ct&&(ct<1||!Od))&&Fl(a.targets).forEach(function(K){return K.classList[Kt||y?"add":"remove"](a.className)}),o&&!L&&!Ae&&o(O),sn&&!Bn?(L&&(Ce&&(bt==="complete"?i.pause().totalProgress(1):bt==="reset"?i.restart(!0).pause():bt==="restart"?i.restart(!0):i[bt]()),o&&o(O)),(Rt||!Od)&&(c&&Rt&&Ud(O,c),j[Ht]&&Ud(O,j[Ht]),y&&(ct===1?O.kill(!1,1):j[Ht]=0),Rt||(Ht=ct===1?1:3,j[Ht]&&Ud(O,j[Ht]))),P&&!Kt&&Math.abs(O.getVelocity())>(Za(P)?P:2500)&&(Ha(O.callbackAnimation),N?N.progress(1):Ha(i,bt==="reverse"?1:!ct,1))):L&&o&&!Bn&&o(O)}if(We){var H=S?at/S.duration()*(S._caScrollDist||0):at;ge(H+(B._isFlipped?1:0)),We(H)}Be&&Be(-at/S.duration()*(S._caScrollDist||0))}},O.enable=function(Ae,Xe){O.enabled||(O.enabled=!0,Cn(U,"resize",Ja),F||Cn(U,"scroll",ko),_e&&Cn(r,"refreshInit",_e),Ae!==!1&&(O.progress=ee=0,it=ft=qe=re()),Xe!==!1&&O.refresh())},O.getTween=function(Ae){return Ae&&Se?Se.tween:N},O.setPositions=function(Ae,Xe,ze,at){if(S){var nn=S.scrollTrigger,ct=S.duration(),Ft=nn.end-nn.start;Ae=nn.start+Ft*Ae/ct,Xe=nn.start+Ft*Xe/ct}O.refresh(!1,!1,{start:Mg(Ae,ze&&!!O._startClamp),end:Mg(Xe,ze&&!!O._endClamp)},at),O.update()},O.adjustPinSpacing=function(Ae){if(we&&Ae){var Xe=we.indexOf(M.d)+1;we[Xe]=parseFloat(we[Xe])+Ae+xn,we[1]=parseFloat(we[1])+Ae+xn,ia(we)}},O.disable=function(Ae,Xe){if(O.enabled&&(Ae!==!1&&O.revert(!0,!0),O.enabled=O.isActive=!1,Xe||N&&N.pause(),le=0,Ge&&(Ge.uncache=1),_e&&An(r,"refreshInit",_e),Pe&&(Pe.pause(),Se.tween&&Se.tween.kill()&&(Se.tween=0)),!F)){for(var ze=St.length;ze--;)if(St[ze].scroller===U&&St[ze]!==O)return;An(U,"resize",Ja),F||An(U,"scroll",ko)}},O.kill=function(Ae,Xe){O.disable(Ae,Xe),N&&!Xe&&N.kill(),l&&delete dh[l];var ze=St.indexOf(O);ze>=0&&St.splice(ze,1),ze===Kn&&Zc>0&&Kn--,ze=0,St.forEach(function(at){return at.scroller===O.scroller&&(ze=1)}),ze||Zn||(O.scroll.rec=0),i&&(i.scrollTrigger=null,Ae&&i.revert({kill:!1}),Xe||i.kill()),Ke&&[Ke,Ye,B,ht].forEach(function(at){return at.parentNode&&at.parentNode.removeChild(at)}),vl===O&&(vl=0),h&&(Ge&&(Ge.uncache=1),ze=0,St.forEach(function(at){return at.pin===h&&ze++}),ze||(Ge.spacer=0)),n.onKill&&n.onKill(O)},St.push(O),O.enable(!1,!1),rt&&rt(O),i&&i.add&&!lt){var dt=O.update;O.update=function(){O.update=dt,Mt.cache++,I||st||O.refresh()},je.delayedCall(.01,O.update),lt=.01,I=st=0}else O.refresh();h&&KA()},r.register=function(n){return Vo||(je=n||hv(),fv()&&window.document&&r.enable(),Vo=$a),Vo},r.defaults=function(n){if(n)for(var i in n)Lc[i]=n[i];return Lc},r.disable=function(n,i){$a=0,St.forEach(function(o){return o[i?"kill":"disable"](n)}),An(wt,"wheel",ko),An(Jt,"scroll",ko),clearInterval(Tc),An(Jt,"touchcancel",rr),An(Gt,"touchstart",rr),Rc(An,Jt,"pointerdown,touchstart,mousedown",Eg),Rc(An,Jt,"pointerup,touchend,mouseup",Tg),yu.kill(),Cc(An);for(var s=0;s<Mt.length;s+=3)Pc(An,Mt[s],Mt[s+1]),Pc(An,Mt[s],Mt[s+2])},r.enable=function(){if(wt=window,Jt=document,_i=Jt.documentElement,Gt=Jt.body,je&&(Fl=je.utils.toArray,hl=je.utils.clamp,ch=je.core.context||rr,Id=je.core.suppressOverwrites||rr,cp=wt.history.scrollRestoration||"auto",fh=wt.pageYOffset||0,je.core.globals("ScrollTrigger",r),Gt)){$a=1,na=document.createElement("div"),na.style.height="100vh",na.style.position="absolute",Sv(),GA(),fn.register(je),r.isTouch=fn.isTouch,ns=fn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),lh=fn.isTouch===1,Cn(wt,"wheel",ko),lp=[wt,Jt,_i,Gt],je.matchMedia?(r.matchMedia=function(c){var u=je.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},je.addEventListener("matchMediaInit",function(){return mp()}),je.addEventListener("matchMediaRevert",function(){return xv()}),je.addEventListener("matchMedia",function(){Ys(0,1),uo("matchMedia")}),je.matchMedia().add("(orientation: portrait)",function(){return Fd(),Fd})):console.warn("Requires GSAP 3.11.0 or later"),Fd(),Cn(Jt,"scroll",ko);var n=Gt.hasAttribute("style"),i=Gt.style,s=i.borderTopStyle,o=je.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Lr(Gt),bn.m=Math.round(a.top+bn.sc())||0,ei.m=Math.round(a.left+ei.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Gt.setAttribute("style",""),Gt.removeAttribute("style")),Tc=setInterval(Rg,250),je.delayedCall(.5,function(){return Ac=0}),Cn(Jt,"touchcancel",rr),Cn(Gt,"touchstart",rr),Rc(Cn,Jt,"pointerdown,touchstart,mousedown",Eg),Rc(Cn,Jt,"pointerup,touchend,mouseup",Tg),ah=je.utils.checkPrefix("transform"),Jc.push(ah),Vo=zn(),yu=je.delayedCall(.2,Ys).pause(),Go=[Jt,"visibilitychange",function(){var c=wt.innerWidth,u=wt.innerHeight;Jt.hidden?(bg=c,Sg=u):(bg!==c||Sg!==u)&&Ja()},Jt,"DOMContentLoaded",Ys,wt,"load",Ys,wt,"resize",Ja],Cc(Cn),St.forEach(function(c){return c.enable(0,1)}),l=0;l<Mt.length;l+=3)Pc(An,Mt[l],Mt[l+1]),Pc(An,Mt[l],Mt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Od=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Tc)||(Tc=i)&&setInterval(Rg,i),"ignoreMobileResize"in n&&(lh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Cc(An)||Cc(Cn,n.autoRefreshEvents||"none"),cv=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=ii(n),o=Mt.indexOf(s),a=lo(s);~o&&Mt.splice(o,a?6:2),i&&(a?pr.unshift(wt,i,Gt,i,_i,i):pr.unshift(s,i))},r.clearMatchMedia=function(n){St.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(mi(n)?ii(n):n).getBoundingClientRect(),a=o[s?to:no]*i||0;return s?o.right-a>0&&o.left+a<wt.innerWidth:o.bottom-a>0&&o.top+a<wt.innerHeight},r.positionInViewport=function(n,i,s){mi(n)&&(n=ii(n));var o=n.getBoundingClientRect(),a=o[s?to:no],l=i==null?a/2:i in Su?Su[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/wt.innerWidth:(o.top+l)/wt.innerHeight},r.killAll=function(n){if(St.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=co.killAll||[];co={},i.forEach(function(s){return s()})}},r})();$e.version="3.12.7";$e.saveStyles=function(r){return r?Fl(r).forEach(function(e){if(e&&e.style){var t=pi.indexOf(e);t>=0&&pi.splice(t,5),pi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),je.core.getCache(e),ch())}}):pi};$e.revert=function(r,e){return mp(!r,e)};$e.create=function(r,e){return new $e(r,e)};$e.refresh=function(r){return r?Ja(!0):(Vo||$e.register())&&Ys(!0)};$e.update=function(r){return++Mt.cache&&Br(r===!0?2:0)};$e.clearScrollMemory=bv;$e.maxScroll=function(r,e){return ur(r,e?ei:bn)};$e.getScrollFunc=function(r,e){return Ss(ii(r),e?ei:bn)};$e.getById=function(r){return dh[r]};$e.getAll=function(){return St.filter(function(r){return r.vars.id!=="ScrollSmoother"})};$e.isScrolling=function(){return!!Fi};$e.snapDirectional=pp;$e.addEventListener=function(r,e){var t=co[r]||(co[r]=[]);~t.indexOf(e)||t.push(e)};$e.removeEventListener=function(r,e){var t=co[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};$e.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=je.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Vn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Vn(s)&&(s=s(),Cn($e,"refresh",function(){return s=e.batchMax()})),Fl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push($e.create(c))}),t};var Ng=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Bd=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(fn.isTouch?" pinch-zoom":""):"none",e===_i&&r(Gt,t)},Nc={auto:1,scroll:1},tC=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||je.core.getCache(s),a=zn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Gt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Nc[(l=Li(s)).overflowY]||Nc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!lo(s)&&(Nc[(l=Li(s)).overflowY]||Nc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Mv=function(e,t,n,i){return fn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&tC,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Cn(Jt,fn.eventTypes[0],Fg,!1,!0)},onDisable:function(){return An(Jt,fn.eventTypes[0],Fg,!0)}})},nC=/(input|label|select|textarea)/i,Ug,Fg=function(e){var t=nC.test(e.target.tagName);(t||Ug)&&(e._gsapAllow=!0,Ug=t)},iC=function(e){Hs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=ii(e.target)||_i,u=je.core.globals().ScrollSmoother,d=u&&u.get(),f=ns&&(e.content&&ii(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Ss(c,bn),_=Ss(c,ei),g=1,m=(fn.isTouch&&wt.visualViewport?wt.visualViewport.scale*wt.visualViewport.width:wt.outerWidth)/wt.innerWidth,p=0,x=Vn(i)?function(){return i(a)}:function(){return i||2.8},y,v,E=Mv(c,e.type,!0,s),T=function(){return v=!1},S=rr,P=rr,b=function(){l=ur(c,bn),P=hl(ns?1:0,l),n&&(S=hl(0,ur(c,ei))),y=io},M=function(){f._gsap.y=Ka(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(v){requestAnimationFrame(T);var Y=Ka(a.deltaY/2),he=P(h.v-Y);if(f&&he!==h.v+h.offset){h.offset=he-h.v;var O=Ka((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+O+", 0, 1)",f._gsap.y=O+"px",h.cacheID=Mt.cache,Br()}return!0}h.offset&&M(),v=!0},U,W,F,q,j=function(){b(),U.isActive()&&U.vars.scrollY>l&&(h()>l?U.progress(1)&&h(l):U.resetTo("scrollY",l))};return f&&je.set(f,{y:"+=0"}),e.ignoreCheck=function(C){return ns&&C.type==="touchmove"&&L()||g>1.05&&C.type!=="touchstart"||a.isGesturing||C.touches&&C.touches.length>1},e.onPress=function(){v=!1;var C=g;g=Ka((wt.visualViewport&&wt.visualViewport.scale||1)/m),U.pause(),C!==g&&Bd(c,g>1.01?!0:n?!1:"x"),W=_(),F=h(),b(),y=io},e.onRelease=e.onGestureStart=function(C,Y){if(h.offset&&M(),!Y)q.restart(!0);else{Mt.cache++;var he=x(),O,_e;n&&(O=_(),_e=O+he*.05*-C.velocityX/.227,he*=Ng(_,O,_e,ur(c,ei)),U.vars.scrollX=S(_e)),O=h(),_e=O+he*.05*-C.velocityY/.227,he*=Ng(h,O,_e,ur(c,bn)),U.vars.scrollY=P(_e),U.invalidate().duration(he).play(.01),(ns&&U.vars.scrollY>=l||O>=l-1)&&je.to({},{onUpdate:j,duration:he})}o&&o(C)},e.onWheel=function(){U._ts&&U.pause(),zn()-p>1e3&&(y=0,p=zn())},e.onChange=function(C,Y,he,O,_e){if(io!==y&&b(),Y&&n&&_(S(O[2]===Y?W+(C.startX-C.x):_()+Y-O[1])),he){h.offset&&M();var ve=_e[2]===he,Q=ve?F+C.startY-C.y:h()+he-_e[1],qe=P(Q);ve&&Q!==qe&&(F+=qe-Q),h(qe)}(he||Y)&&Br()},e.onEnable=function(){Bd(c,n?!1:"x"),$e.addEventListener("refresh",j),Cn(wt,"resize",j),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),E.enable()},e.onDisable=function(){Bd(c,!0),An(wt,"resize",j),$e.removeEventListener("refresh",j),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new fn(e),a.iOS=ns,ns&&!h()&&h(1),ns&&je.ticker.add(rr),q=a._dc,U=je.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:wv(h,h(),function(){return U.pause()})},onUpdate:Br,onComplete:q.vars.onComplete}),a};$e.sort=function(r){if(Vn(r))return St.sort(r);var e=wt.pageYOffset||0;return $e.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+wt.innerHeight}),St.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};$e.observe=function(r){return new fn(r)};$e.normalizeScroll=function(r){if(typeof r>"u")return $n;if(r===!0&&$n)return $n.enable();if(r===!1){$n&&$n.kill(),$n=r;return}var e=r instanceof fn?r:iC(r);return $n&&$n.target===e.target&&$n.kill(),lo(e.target)&&($n=e),e};$e.core={_getVelocityProp:oh,_inputObserver:Mv,_scrollers:Mt,_proxies:pr,bridge:{ss:function(){Fi||uo("scrollStart"),Fi=zn()},ref:function(){return Bn}}};hv()&&je.registerPlugin($e);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rC=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,sC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,oC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,aC=/(^[#\.][a-z]|[a-y][a-z])/i,lC=Math.PI/180,Uc=Math.sin,Fc=Math.cos,yl=Math.abs,Va=Math.sqrt,kg=function(e){return typeof e=="string"},Ev=function(e){return typeof e=="number"},Bg=1e5,ts=function(e){return Math.round(e*Bg)/Bg||0};function cC(r){r=kg(r)&&aC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=vs(r)):r?kg(r)?vs(r):Ev(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Qa(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var uC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},dC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},fC=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function Tv(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,x,y,v,E,T,S,P,b;return t==="path"||!r.getBBox?r:(c=uC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),b=fC(r,dC[t]),t==="rect"?(a=b.rx,l=b.ry||a,s=b.x,o=b.y,h=b.width-a*2,_=b.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,x=p+a*n,y=p+a,v=o+l*(1-n),E=o+l,T=E+_,S=T+l*n,P=T+l,i="M"+y+","+E+" V"+T+" C"+[y,S,x,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,S,s,T,s,T-(T-E)/3,s,E+(T-E)/3,s,E,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,x,o,y,v,y,E].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=b.r,d=a*n):(a=b.rx,l=b.ry,d=l*n),s=b.cx,o=b.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+b.x1+","+b.y1+" L"+b.x2+","+b.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(sC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",ra(c._gsRawPath=vs(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function hC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=yl(t),n=yl(n);var c=i%360*lC,u=Fc(c),d=Uc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,x=m*m,y=p*p,v=x/(t*t)+y/(n*n);v>1&&(t=Va(v)*t,n=Va(v)*n);var E=t*t,T=n*n,S=(E*T-E*y-T*x)/(E*y+T*x);S<0&&(S=0);var P=(s===o?-1:1)*Va(S),b=P*(t*p/n),M=P*-(n*m/t),L=(r+a)/2,U=(e+l)/2,W=L+(u*b-d*M),F=U+(d*b+u*M),q=(m-b)/t,j=(p-M)/n,C=(-m-b)/t,Y=(-p-M)/n,he=q*q+j*j,O=(j<0?-1:1)*Math.acos(q/Va(he)),_e=(q*Y-j*C<0?-1:1)*Math.acos((q*C+j*Y)/Va(he*(C*C+Y*Y)));isNaN(_e)&&(_e=f),!o&&_e>0?_e-=h:o&&_e<0&&(_e+=h),O%=h,_e%=h;var ve=Math.ceil(yl(_e)/(h/4)),Q=[],qe=_e/ve,He=4/3*Uc(qe/2)/(1+Fc(qe/2)),ee=u*t,re=d*t,Se=d*-n,Ge=u*n,ye;for(ye=0;ye<ve;ye++)i=O+ye*qe,m=Fc(i),p=Uc(i),q=Fc(i+=qe),j=Uc(i),Q.push(m-He*p,p+He*m,q+He*j,j-He*q,q,j);for(ye=0;ye<Q.length;ye+=2)m=Q[ye],p=Q[ye+1],Q[ye]=m*ee+p*Se+W,Q[ye+1]=m*re+p*Ge+F;return Q[ye-2]=a,Q[ye-1]=l,Q}}function vs(r){var e=(r+"").replace(oC,function(b){var M=+b;return M<1e-4&&M>-1e-4?0:M}).match(rC)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,x,y,v,E,T,S,P=function(M,L,U,W){x=(U-M)/3,y=(W-L)/3,g.push(M+x,L+y,U-x,W-y,U,W)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(E=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")x=n,y=i,(E==="C"||E==="S")&&(x+=n-g[g.length-4],y+=i-g[g.length-3]),_||(n=i=0),g.push(x,y,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")x=n+(d-n)*s,y=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(x,y,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")x=n-g[g.length-4],y=i-g[g.length-3],g.push(n+x,i+y,d+(n+x*1.5-d)*s,f+(i+y*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||yl(n-d)>.5||yl(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(T=e[c+4],S=e[c+5],x=e[c+6],y=e[c+7],u=7,T.length>1&&(T.length<3?(y=x,x=S,u--):(y=S,x=T.substr(2),u-=2),S=T.charAt(1),T=T.charAt(0)),v=hC(n,i,+e[c+1],+e[c+2],+e[c+3],+T,+S,(_?n:0)+x*1,(_?i:0)+y*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function ra(r){Ev(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+ts(o[0])+","+ts(o[1])+" C",n=o.length,s=2;s<n;s++)e+=ts(o[s++])+","+ts(o[s++])+" "+ts(o[s++])+","+ts(o[s++])+" "+ts(o[s++])+","+ts(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var qi,gp,el,Av,tl,Cv=function(){return qi||typeof window<"u"&&(qi=window.gsap)&&qi.registerPlugin&&qi},zd=function(e){return typeof e=="function"},js=Math.atan2,zg=Math.cos,Hg=Math.sin,Ur=Math.sqrt,Ou=Math.PI,Vg=Ou*2,pC=Ou*.3,mC=Ou*.7,Rv=1e20,Bl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,gC=/(^[#\.][a-z]|[a-y][a-z])/i,_C=/[achlmqstvz]/i,us=function(e){return console&&console.warn(e)},vC=1,Gg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},sa=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},xl=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,x,y,v,E,T,S,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],x=h[f+1],y=h[f+2]-p,T=h[f+3]-x,v=h[f+4]-p,S=h[f+5]-x,E=h[f+6]-p,P=h[f+7]-x,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*E+3*m*(g*v+m*y))*g+p,d=(g*g*P+3*m*(g*S+m*T))*g+x,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},yC=function(e,t){return t.length-e.length},Wg=function(e,t){var n=e.size||sa(e),i=t.size||sa(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Xg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Hd=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Ur(d*d+f*f);return a},xC=function(e,t,n){var i=e.length,s=Gg(e),o=Gg(t),a=o[0]-s[0],l=o[1]-s[1],c=Hd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=Hd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Qa(d),h=6;h<i;h+=6)f=Hd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},bC=function(e,t,n){for(var i=e.length,s=Rv,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Ur(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},SC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||sa(e),t[n].size||sa(t[n]))*i,u=Rv,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||sa(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Ur(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},Vd=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,x,y,v;for(y=2;y<s;y+=6)for(n+=o;n>i;)a=e[y-2],l=e[y-1],c=e[y],u=e[y+1],d=e[y+2],f=e[y+3],h=e[y+4],_=e[y+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,x=u+(f-u)*v,m+=(x-m)*v,x+=(f+(_-f)*v-x)*v,e.splice(y,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(x-m)*v,p,x,d+(h-d)*v,f+(_-f)*v),y+=6,s+=6,n--;return e},ph=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?yC:Wg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,x,y,v,E,T;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),E=a.size||xl(a),E=l.size||xl(l),E=a.centerX-l.centerX,T=a.centerY-l.centerY,u===Wg))for(f=0;f<l.length;f++)a.splice(f,0,SC(l[f],a,f,d,E,T));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Vd(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)y=a[f].size||sa(a[f]),x=bC(l,a[f].centerX,a[f].centerY),y=x[0],v=x[1],l[f++]=[y,v,y,v,y,v,y,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?Vd(m,-o/6|0):o>0&&Vd(p,o/6|0),_&&s!==!1&&!p.reversed&&Qa(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=xC(p,m,!f||s===!1),n<0&&(_=!0,Qa(p),n=-n),Xg(p,n*6)):n!=="reverse"&&(f&&n<0&&Qa(p),Xg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Qa(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&us("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},qg=function(e,t,n,i,s){var o=vs(e[0]),a=vs(e[1]);ph(o,a,t||t===0?t:"auto",n,s)&&(e[0]=ra(o),e[1]=ra(a),(i==="log"||i===!0)&&us('precompile:["'+e[0]+'","'+e[1]+'"]'))},wC=function(e,t){if(!t)return e;var n=e.match(Bl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},Yg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},mh=function(e){var t=e[0].match(Bl)||[],n=e[1].match(Bl)||[],i=n.length-t.length;i>0?e[0]=Yg(t,i):e[1]=Yg(n,-i)},MC=function(e){return isNaN(e)?mh:function(t){mh(t),t[1]=wC(t[1],parseInt(e,10))}},EC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||gC.test(e)||(e.match(Bl)||[]).length<3)&&(s=gp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=Tv(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(us("WARNING: invalid morph to: "+e),e=!1)),e},jg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=js(l,a),_=js(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Ur(a*a+l*l),m[d+3]=Ur(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=js(l,a),_=js(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Ur(a*a+l*l),m[3]=Ur(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},$g=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},TC=function(e){return e!==e%Ou?e+(e<0?Vg:-Vg):e},Kg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",AC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Ur(a*a+l*l),u=js(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=js(l,a)-u,f=TC(d),!i&&el&&Math.abs(f+el.ca)<pC&&(i=el),this._anchorPT=el={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>mC?d:f,sl:c,cl:Ur(a*a+l*l)-c,i:n}},Zg=function(e){qi=Cv(),tl=tl||qi&&qi.plugins.morphSVG,qi&&tl?(gp=qi.utils.toArray,tl.prototype._tweenRotation=AC,Av=1):e&&us("Please gsap.registerPlugin(MorphSVGPlugin)")},$o={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){qi=e,tl=t,Zg()},init:function(e,t,n,i,s){if(Av||Zg(1),!t)return us("invalid shape"),!1;zd(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,x,y,v,E,T,S,P,b,M,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=zd(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var U=e.nodeType?window.getComputedStyle(e):{},W=U.fill+"",F=!(W==="none"||(W.match(Bl)||[])[3]==="0"||U.fillRule==="evenodd"),q=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return us("Cannot morph a <"+o+"> element. "+Kg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!zd(e.setAttribute))return!1;if(c=EC(t.shape||t.d||t.points||"",a==="d",e),u&&_C.test(c))return us("A <"+o+"> cannot accept path data. "+Kg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||$o.defaultMap,this._prop=t.prop,this._render=t.render||$o.defaultRender,this._apply="updateTarget"in t?t.updateTarget:$o.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,T=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=vs(T?t.precompile[0]:g),m=vs(T?t.precompile[1]:c),!T&&!ph(g,m,d,f,F))return!1;for((t.precompile==="log"||t.precompile===!0)&&us('precompile:["'+ra(g)+'","'+ra(m)+'"]'),M=(t.type||$o.defaultType)!=="linear",M&&(g=jg(g,t.smoothTolerance),m=jg(m,t.smoothTolerance),g.size||xl(g),m.size||xl(m),b=$g(q[0]),this._origin=g.origin={x:g.left+b.x*g.width,y:g.top+b.y*g.height},q[1]&&(b=$g(q[1])),this._eOrigin={x:m.left+b.x*m.width,y:m.top+b.y*m.height}),this._rawPath=e._gsRawPath=g,x=g.length;--x>-1;)for(v=g[x],E=m[x],h=v.isSmooth||[],_=E.isSmooth||[],y=v.length,el=0,p=0;p<y;p+=2)(E[p]!==v[p]||E[p+1]!==v[p+1])&&(M?h[p]&&_[p]?(S=v.smoothData,P=E.smoothData,L=p+(p===y-4?7-y:5),this._controlPT={_next:this._controlPT,i:p,j:x,l1s:S[p+1],l1c:P[p+1]-S[p+1],l2s:S[L],l2c:P[L]-S[L]},l=this._tweenRotation(v,E,p+2),this._tweenRotation(v,E,p,l),this._tweenRotation(v,E,L-1,l),p+=4):this._tweenRotation(v,E,p):(l=this.add(v,p,v[p],E[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],E[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,MC(d),a);M&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return vC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,x,y,v,E;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+zg(_)*h,s.t[s.i+1]=t._origin.y+Hg(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],E=g+(g===f.length-4?7-f.length:5),_=js(f[E]-f[g+1],f[E-1]-f[g]),y=Hg(_),v=zg(_),p=f[g+2],x=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=x-y*h,h=i.l2s+d*i.l2c,f[E-1]=p+v*h,f[E]=x+y*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:cC,stringToRawPath:vs,rawPathToString:ra,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return qg(o,i,s),o},pathFilter:qg,pointsFilter:mh,getTotalSize:xl,equalizeSegmentQuantity:ph,convertToPath:function(e,t){return gp(e).map(function(n){return Tv(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};Cv()&&qi.registerPlugin($o);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function CC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Jg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Qg(r,e,t){return e&&Jg(r.prototype,e),t&&Jg(r,t),r}function RC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function e_(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function t_(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?e_(Object(t),!0).forEach(function(n){RC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):e_(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Pv(r,e){return LC(r)||IC(r,e)||Lv(r,e)||NC()}function Jn(r){return PC(r)||DC(r)||Lv(r)||OC()}function PC(r){if(Array.isArray(r))return gh(r)}function LC(r){if(Array.isArray(r))return r}function DC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function IC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function Lv(r,e){if(r){if(typeof r=="string")return gh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return gh(r,e)}}function gh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function OC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function NC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $s(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Xl(r){return typeof r=="string"}function _p(r){return Array.isArray(r)}function kc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=$s(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Xl(t)||_p(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function vp(r){var e=Xl(r)||_p(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Nu(r){return r!==null&&typeof r=="object"}function UC(r){return Nu(r)&&/^(1|3|11)$/.test(r.nodeType)}function FC(r){return typeof r=="number"&&r>-1&&r%1===0}function kC(r){return Nu(r)&&FC(r.length)}function fo(r){return _p(r)?r:r==null?[]:kC(r)?Array.prototype.slice.call(r):[r]}function n_(r){var e=r;return Xl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),fo(e).reduce(function(t,n){return[].concat(Jn(t),Jn(fo(n).filter(UC)))},[])}var BC=Object.entries,wu="_splittype",$i={},zC=0;function dr(r,e,t){if(!Nu(r))return console.warn("[data.set] owner is not an object"),null;var n=r[wu]||(r[wu]=++zC),i=$i[n]||($i[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&($i[n]=t_(t_({},i),e)):e!==void 0&&(i[e]=t),t}function Ks(r,e){var t=Nu(r)?r[wu]:null,n=t&&$i[t]||{};return n}function Dv(r){var e=r&&r[wu];e&&(delete r[e],delete $i[e])}function HC(){Object.keys($i).forEach(function(r){delete $i[r]})}function VC(){BC($i).forEach(function(r){var e=Pv(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&($i[t]=null,delete $i[t])})}function GC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var yp="\\ud800-\\udfff",Iv="\\u0300-\\u036f\\ufe20-\\ufe23",Ov="\\u20d0-\\u20f0",Nv="\\ufe0e\\ufe0f",WC="[".concat(yp,"]"),_h="[".concat(Iv).concat(Ov,"]"),vh="\\ud83c[\\udffb-\\udfff]",XC="(?:".concat(_h,"|").concat(vh,")"),Uv="[^".concat(yp,"]"),Fv="(?:\\ud83c[\\udde6-\\uddff]){2}",kv="[\\ud800-\\udbff][\\udc00-\\udfff]",Bv="\\u200d",zv="".concat(XC,"?"),Hv="[".concat(Nv,"]?"),qC="(?:"+Bv+"(?:"+[Uv,Fv,kv].join("|")+")"+Hv+zv+")*",YC=Hv+zv+qC,jC="(?:".concat(["".concat(Uv).concat(_h,"?"),_h,Fv,kv,WC].join("|"),`
)`),$C=RegExp("".concat(vh,"(?=").concat(vh,")|").concat(jC).concat(YC),"g"),KC=[Bv,yp,Iv,Ov,Nv],ZC=RegExp("[".concat(KC.join(""),"]"));function JC(r){return r.split("")}function Vv(r){return ZC.test(r)}function QC(r){return r.match($C)||[]}function eR(r){return Vv(r)?QC(r):JC(r)}function tR(r){return r==null?"":String(r)}function nR(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=tR(r),r&&Xl(r)&&!e&&Vv(r)?eR(r):r.split(e)}function yh(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Xl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Jn(fo(s))):t.setAttribute(n,s))}),t}var xp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function iR(r,e){e=$s(xp,e);var t=vp(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=GC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=nR(c).map(function(_){var g=yh(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return dr(g,"isChar",!0),a=[].concat(Jn(a),[g]),g})),t.words||t.lines?(f=yh(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),dr(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function Gv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return iR(r,e);var i=fo(r.childNodes);if(i.length&&(dr(r,"isSplit",!0),!Ks(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";dr(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=Gv(d,e),h=f.words,_=f.chars;return{words:[].concat(Jn(u.words),Jn(h)),chars:[].concat(Jn(u.chars),Jn(_))}},n)}function rR(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=Pv(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function Wv(r){Ks(r).isWord?(Dv(r),r.replaceWith.apply(r,Jn(r.childNodes))):fo(r.children).forEach(function(e){return Wv(e)})}var sR=function(){return document.createDocumentFragment()};function oR(r,e,t){var n=vp(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=sR(),m=window.getComputedStyle(r),p=m.textAlign,x=parseFloat(m.fontSize),y=x*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,dr(r,{cssWidth:r.style.width,cssHeight:r.style.height})),fo(s).forEach(function(v){var E=v.parentElement===r,T=rR(v,E,e,t),S=T.width,P=T.height,b=T.top,M=T.left;/^br$/i.test(v.nodeName)||(n.lines&&E&&((l===null||b-l>=y)&&(l=b,o.push(a=[])),a.push(v)),e.absolute&&dr(v,{top:b,left:M,width:S,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var E=yh(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});dr(E,"isLine",!0);var T={height:0,top:1e4};return g.appendChild(E),v.forEach(function(S,P,b){var M=Ks(S),L=M.isWordEnd,U=M.top,W=M.height,F=b[P+1];T.height=Math.max(T.height,W),T.top=Math.min(T.top,U),E.appendChild(S),L&&Ks(F).isWordStart&&E.append(" ")}),e.absolute&&dr(E,{height:T.height,top:T.top}),E}),n.words||Wv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),fo(s).forEach(function(v){var E=Ks(v),T=E.isLine,S=E.top,P=E.left,b=E.width,M=E.height,L=Ks(v.parentElement),U=!T&&L.isLine;v.style.top="".concat(U?S-L.top:S,"px"),v.style.left=T?"".concat(d.left,"px"):"".concat(P-(U?d.left:0),"px"),v.style.height="".concat(M,"px"),v.style.width=T?"".concat(d.width,"px"):"".concat(b,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var Bo=$s(xp,{}),Aa=(function(){Qg(r,null,[{key:"clearData",value:function(){HC()}},{key:"setDefaults",value:function(t){return Bo=$s(Bo,kc(t)),xp}},{key:"revert",value:function(t){n_(t).forEach(function(n){var i=Ks(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",Dv(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return $i}},{key:"defaults",get:function(){return Bo},set:function(t){Bo=$s(Bo,kc(t))}}]);function r(e,t){CC(this,r),this.isSplit=!1,this.settings=$s(Bo,kc(t)),this.elements=n_(e),this.split()}return Qg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){dr(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=$s(this.settings,kc(t)));var s=vp(this.settings.types);s.none||(this.elements.forEach(function(o){dr(o,"isRoot",!0);var a=Gv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Jn(n.words),Jn(l)),n.chars=[].concat(Jn(n.chars),Jn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=oR(o,n.settings,i);n.lines=[].concat(Jn(n.lines),Jn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),VC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r})();const Dt={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function aR(){Dt.heroYearObj.year=2026,Dt.heroNumberTween&&(Dt.heroNumberTween.kill(),Dt.heroNumberTween=null),Dt.heroHeadingFadeScrollTrigger&&(Dt.heroHeadingFadeScrollTrigger.kill(),Dt.heroHeadingFadeScrollTrigger=null)}function lR(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
    <div class="scroll-text">SCROLL</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <title>mouse-scroll-down</title>
      <g fill="#F7F7F7">
        <g fill="none">
          <path d="M0 0h24v24h-24v-24Z"></path>
          <path class="mouse-body" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 17v0c-2.946 0-5.357-2.411-5.357-5.357v-4.286c-8.88178e-16-2.946 2.411-5.357 5.357-5.357v0c2.946 0 5.357 2.411 5.357 5.357v4.286c3.55271e-15 2.946-2.411 5.357-5.357 5.357Z"></path>
          <path class="scroll-arrow" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20L12 22 15 20"></path>
          <path class="scroll-indicator" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.286v2.143"></path>
        </g>
      </g>
    </svg>
  `,e.style.cssText=`
    position: fixed;
    bottom: calc(12vh - 16px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    opacity: 0;
    width: 64px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
  `;const t=e.querySelector(".scroll-text");t&&(t.style.cssText=`
      color: #F7F7F7;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 2px;
      text-align: center;
      line-height: 1;
      margin: 0;
      padding: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),Re.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");Re.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");Re.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),$e.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;Re.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{Re.set(e,{opacity:0})},onEnterBack:()=>{Re.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{$e.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const cR="/150-lab/assets/audio/ui-click.mp3",uR="/150-lab/assets/audio/chemistry-3-final.mp3";let Qt=null,Sn=!1,cn=!1,Mu=!1,ki=!1,Pr=0;const ar=25;let Ri=null,oa=!1,ds=null;function bp(){ds||(ds=new Audio(cR),ds.volume=.35,ds.preload="auto")}const Vs=()=>{if(!cn)try{ds||bp();const r=ds.cloneNode();r.volume=.35,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function i_(r){cn&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function dR(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?i_(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{i_(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function zl(r=!1){if(!(Sn||cn)){if(Pr++,window.audioRetryCount=Pr,window.maxAudioRetries=ar,Pr>=ar){console.warn(`Exceeded maximum audio retry attempts (${ar}). Stopping retries.`);return}try{if(Qt.volume=.22,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}Qt.play().then(()=>{Sn=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Pr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),Sn=!1,(r||ki)&&Pr<ar&&setTimeout(()=>{!Sn&&!cn&&zl(!0)},500)})}catch(e){console.error("Error playing audio:",e),Sn=!1,(r||ki)&&Pr<ar&&setTimeout(()=>{!Sn&&!cn&&zl(!0)},500)}}}const fR=()=>{document.hidden?Qt&&!Qt.paused&&Sn&&(oa=!0,Qt.pause()):Qt&&oa&&Sn&&!cn&&(oa=!1,Qt.play().catch(r=>{console.warn("Could not resume background audio:",r),Sn=!1,ki&&setTimeout(()=>{ro(!0)},100)}))};function hR(){document.addEventListener("visibilitychange",fR),window.addEventListener("blur",()=>{Qt&&!Qt.paused&&Sn&&(oa=!0,Qt.pause())}),window.addEventListener("focus",()=>{Qt&&oa&&Sn&&!cn&&(oa=!1,Qt.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),Sn=!1,ki&&setTimeout(()=>{ro(!0)},100)}))})}const ro=(r=!1)=>{if(!cn&&(r&&(ki=!0,window.enterButtonClicked=!0),!!ki&&!Sn)){if(Pr>=ar){console.warn(`Exceeded maximum audio retry attempts (${ar}). Stopping retries.`),Ri&&(clearInterval(Ri),Ri=null);return}if(r){setTimeout(()=>{if(!cn)if(Mu||Qt&&Qt.readyState>=3)zl(!0);else try{Qt.load()}catch(e){console.warn("Error reloading background audio:",e)}},2e3);return}if(Mu||Qt&&Qt.readyState>=3)zl(r);else if(r)try{Qt.load()}catch(e){console.warn("Error reloading background audio:",e)}}};function pR(){const r=new Audio;r.addEventListener("canplaythrough",()=>{Mu=!0,ki&&!Sn&&!cn&&zl(!0)}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=uR;try{r.load()}catch(e){console.error("Error loading background audio:",e)}Qt=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,Sn=!1,cn=!1,Mu=!1,ki=!1,Pr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=ar,window.audioRetryTimer=null,hR()}const mR=()=>{bp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(cn||Vs(),t.dataset.clickSoundPlayed="true");return}cn||Vs()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(cn||Vs(),i.dataset.clickSoundPlayed="true");return}cn||Vs()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(cn||Vs(),o.dataset.clickSoundPlayed="true");return}cn||Vs()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),dR()};function gR(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=Re.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=cn;if(r.classList.toggle("muted"),cn=r.classList.contains("muted"),window.audioMuted=cn,t)try{ds||bp();const i=ds.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else Vs();const n=window.waveAnimation;if(cn)n&&n.pause(),Qt&&(Qt.volume=0,Ri&&(clearInterval(Ri),Ri=null));else{n&&n.resume();const i=document.getElementById("anniversary-video");i&&!i.paused&&!i.ended||(!Sn&&ki&&Qt?(ro(!0),Ri||(Ri=setInterval(()=>{Sn?(clearInterval(Ri),Ri=null):!cn&&ki&&(Pr<ar?ro(!0):(console.warn(`Exceeded maximum audio retry attempts (${ar}). Stopping retries.`),clearInterval(Ri),Ri=null))},500))):Sn&&Qt&&(Qt.volume=.22,Qt.paused&&Qt.play().catch(o=>{console.warn("Audio play was prevented:",o),Sn=!1,ki&&ro(!0)})))}})}}function _R(r){window.heroAnimationComplete=r}function vR(r){ki=r,window.enterButtonClicked=r}function xh(){Dt.heroHeadingFadeScrollTrigger&&(Dt.heroHeadingFadeScrollTrigger.kill(),Dt.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new Aa(r,{types:"words,chars",absolute:!1}).chars,Re.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Re.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),Dt.heroHeadingFadeScrollTrigger=$e.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?Re.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&Re.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{Re.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=Dt.heroHeadingFadeScrollTrigger?Dt.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{Re.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function yR(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#cover-area button.enter-experience"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),s=document.querySelector("#app");if(!r||!e)return;t&&Re.set(t,{opacity:0}),i&&Re.set(i,{opacity:0});const o=document.querySelector(".share-button-pinned");o&&Re.set(o,{opacity:0}),window.lenis&&window.lenis.stop(),Re.set(n,{opacity:1}),Re.set(r,{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3});const a=Re.timeline({delay:.6});s&&a.fromTo(s,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"}),a.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),a.to(e,{opacity:1,duration:.6,ease:"power2.out",onComplete:()=>{e.style.pointerEvents="auto"}},"-=0.3"),e&&e.addEventListener("click",()=>{e.style.pointerEvents="none",t&&Re.to(t,{opacity:1,duration:.8,ease:"power2.inOut"}),i&&Re.to(i,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,vR(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),document.dispatchEvent(new CustomEvent("veryEarlyParticleFade")),ro(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?ro(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Re.to(e,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{lR(e),e.style.pointerEvents="none"}}),o&&Re.to(o,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const l=document.querySelector(".sound-toggle");l&&l.classList.add("active"),xR(r)})}function xR(r){let e=null,t=-1;function n(){return e&&e.kill(),e=$e.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:i=>{const s=1-i.progress;Math.abs(s-t)>.01&&(t=s,r.style.opacity=s)},onLeave:()=>{r.style.opacity="0",t=0},onEnterBack:()=>{const s=1-e.progress;r.style.opacity=s,t=s},onLeaveBack:()=>{r.style.opacity="1",t=1}}),e}return n()}function bR(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),$e.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),Re.set(e,{opacity:0}),Re.set(r,{opacity:0});const n=new Aa(r,{types:"words,chars",absolute:!1});Re.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=Re.timeline({paused:!0,onComplete:()=>{_R(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");Re.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),$e.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&($e.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-($e.getById("hero-scale")?$e.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),$e.create({trigger:"#hero-travel-area",start:"bottom 90%",end:"bottom 80%",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=1;Dt.heroNumberTween&&Dt.heroNumberTween.scrollTrigger&&(c=.44+Dt.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=$e.getById("hero-fade-out");if(a){const l=a.progress;let c=1;Dt.heroNumberTween&&Dt.heroNumberTween.scrollTrigger&&(c=.44+Dt.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}),$e.create({trigger:"#hero-travel-area",start:"bottom 80%",end:"bottom 60%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onEnterBack:()=>{},onLeaveBack:()=>{e.style.opacity="1"},id:"hero-backup-fade-out"}))}function SR(){const r=document.querySelector("#hero-number");r?Dt.heroNumberTween?(Dt.heroNumberTween.scrollTrigger&&Dt.heroNumberTween.scrollTrigger.enable(),Dt.heroNumberTween.resume()):(Dt.heroNumberTween=Re.to(Dt.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);Dt.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){Dt.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){Dt.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),Dt.heroNumberTween.scrollTrigger?$e.refresh():console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function wR(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?$e.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?$e.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):$e.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function MR(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Re.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Re.set(e,{pointerEvents:"none"}),Re.timeline({scrollTrigger:{trigger:"#countdown-area",start:"bottom 50%",end:"bottom 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),$e.create({trigger:"#countdown-area",start:"bottom 30%",end:"bottom top",markers:!1,onEnter:()=>{Re.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{Re.set(e,{pointerEvents:"none"})}}),$e.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Uu(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function ER(){const r=document.querySelector("#get-involved-text p");r&&(Re.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Aa(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(Re.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Re.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function TR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Re.set(r,{opacity:0,y:50}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Re.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Re.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function AR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Re.set(r,{x:0})),l&&!n&&(n=Re.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger)},o=()=>{i&&(i.kill(),i=null),t&&(i=$e.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Re.set(t,{opacity:c})},onLeaveBack:()=>{Re.set(t,{opacity:1})}}))};s(),o();const a=Uu(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function CR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580)return;console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}Re.set(n,{y:0,top:"auto",opacity:1}),Re.set(e,{position:"absolute",top:0,left:0}),Re.set(n[1],{position:"absolute",top:d+"px",left:0});const f=Re.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=Uu(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function RR(){const r=document.querySelectorAll(".scroll-reveal, .reveal-top-center, .reveal-center-center");if(!r.length){console.warn("No reveal elements found");return}r.forEach((e,t)=>{const n=e.classList.contains("fancy-btn");let i=50,s="top 85%";e.classList.contains("reveal-top-center")?(i=-50,s="top 50%"):e.classList.contains("reveal-center-center")&&(i=0,s="center 50%"),n?(Re.set(e,{y:i,filter:"opacity(0)"}),$e.create({trigger:e,start:s,once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Re.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Re.to(e,{y:i,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Re.set(e,{opacity:0,y:i}),$e.create({trigger:e,start:s,once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Re.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Re.to(e,{opacity:0,y:i,duration:.8,ease:"power2.in",overwrite:!0})}}))})}let r_=!1;function s_(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function PR(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(s_(t),t.dataset.fancyInitialized="true")})};r_||(document.addEventListener("heroAnimationComplete",e),r_=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(s_(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function LR(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events");document.querySelector("#video-travel-area");const n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title"),s=document.querySelector(".section-timeline"),o=document.querySelector(".form-panel"),a=document.querySelector(".timeline-nav-wrapper");if(!r||!e||!n||!i||!s)return;Re.set(n,{opacity:0,pointerEvents:"none"});let l=!1;const c=S=>{if(!o)return!1;const P=o.getBoundingClientRect(),b=S.clientX,M=S.clientY;return b>=P.left&&b<=P.right&&M>=P.top&&M<=P.bottom};s.addEventListener("mouseenter",S=>{!l&&!c(S)&&Re.to(n,{opacity:1,pointerEvents:"auto",duration:.3,ease:"power2.out"})}),s.addEventListener("mouseleave",()=>{Re.to(n,{opacity:0,pointerEvents:"none",duration:.3,ease:"power2.out"}),l=!1}),n.addEventListener("mouseenter",S=>{c(S)||Re.to(i,{opacity:0,duration:.2,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{Re.to(i,{opacity:1,duration:.2,ease:"power2.out"})}),o&&a&&(o.addEventListener("mouseenter",()=>{Re.set(a,{pointerEvents:"none"})}),o.addEventListener("mouseleave",()=>{Re.set(a,{pointerEvents:"auto"})}));const u=n.querySelector(".anniversary"),d=n.querySelector(".get-involved"),f=n.querySelector(".events"),h=S=>{if(i.textContent===S)return;const P=Re.timeline();P.to(i,{opacity:0,duration:.18,onComplete:()=>{i.textContent=S}}),P.to(i,{opacity:1,duration:.24})},_=S=>{if(!S)return 0;S.offsetHeight;let P=0,b=S;for(;b;)P+=b.offsetTop,b=b.offsetParent;return P};u.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),u.classList.add("active"),h("150 Years of ACS"),Re.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,window.scrollTo({top:0,behavior:"smooth"})}),d.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),d.classList.add("active"),h("Get Involved"),Re.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,e&&setTimeout(()=>{const P=_(e);window.scrollTo({top:P,behavior:"smooth"})},50)}),f.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),f.classList.add("active"),h("Events"),Re.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,t&&setTimeout(()=>{const P=_(t);window.scrollTo({top:P,behavior:"smooth"})},50)});const g=[{id:"hero",element:r,title:"150 Years of ACS",link:u,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:d,top:0,bottom:0},{id:"events",element:t,title:"Events",link:f,top:0,bottom:0}];function m(){if(g.forEach(S=>{S.element&&(S.top=_(S.element),S.bottom=S.top+S.element.offsetHeight)}),g[0].element&&e&&(g[0].bottom=_(e)),e&&t){const S=g.find(P=>P.id==="getinvolved");S&&(S.top=_(e),S.bottom=_(t))}}m();let p=null;function x(){requestAnimationFrame(()=>{const S=window.pageYOffset+window.innerHeight/2;let P=g[0];for(let b=g.length-1;b>=0;b--){const M=g[b];if(M.element&&S>=M.top&&S<M.bottom){P=M;break}}p!==P.id&&(p=P.id,n.querySelectorAll("a").forEach(b=>b.classList.remove("active")),P.link&&P.link.classList.add("active"),h(P.title))})}window.removeEventListener("scroll",x),window.addEventListener("scroll",x);const y=Uu(()=>{document.body.offsetHeight,m(),requestAnimationFrame(()=>{m(),x()})},150);window.addEventListener("resize",y),window.addEventListener("orientationchange",()=>{setTimeout(()=>{y()},300)});const v=()=>{m(),x()};v(),setTimeout(v,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(v);let E=!1;const T=()=>{E||(E=!0,m(),window.removeEventListener("scroll",T))};window.addEventListener("scroll",T)}function DR(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="#14b500":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function IR(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
    <div class="share-panel-content">
      <div class="share-panel-title">#ACS150</div>
      <button class="share-option facebook" data-platform="facebook">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
        </svg>
        <span>Facebook</span>
      </button>
      <button class="share-option linkedin" data-platform="linkedin">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
        </svg>
        <span>LinkedIn</span>
      </button>
      <button class="share-option instagram" data-platform="instagram">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
        </svg>
        <span>Instagram</span>
      </button>
      <button class="share-option copy" data-platform="copy">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="white"/>
        </svg>
        <span>Copy Link</span>
      </button>
    </div>
  `,document.body.appendChild(e),OR(r,e)}function OR(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 100000;
      font-size: 14px;
      pointer-events: none;
    `,document.body.appendChild(u),setTimeout(()=>{u.remove()},2e3)},a=()=>{t=!t,e.classList.toggle("active",t),r.classList.toggle("active",t)},l=()=>{t&&(t=!1,e.classList.remove("active"),r.classList.remove("active"))};if(r.addEventListener("click",c=>{c.stopPropagation(),a()}),e.addEventListener("click",c=>{const u=c.target.closest(".share-option");if(!u)return;const d=u.dataset.platform,f=n();d==="copy"?s(f.url).then(h=>{o(h?"Link copied to clipboard!":"Failed to copy link")}):i(d,f),l()}),document.addEventListener("click",c=>{!e.contains(c.target)&&!r.contains(c.target)&&l()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&l()}),!document.querySelector("#share-panel-styles")){const c=document.createElement("style");c.id="share-panel-styles",c.textContent=`
      .share-panel {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 99998;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: none;
      }

      .share-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .share-panel-content {
        background: rgba(0, 0, 0, 0.36);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
      }

      .share-panel-title {
        text-align: center;
        color: white;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 8px;
        letter-spacing: 3px;
        font-style: italic;
      }

      .share-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: white;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
      }

      .share-option:last-child {
        margin-bottom: 0;
      }

      .share-option:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(-2px);
      }

      .share-option svg {
        flex-shrink: 0;
      }
    `,document.head.appendChild(c)}}const NR="/150-lab/assets/images/pacifichem-event1.jpg",UR="/150-lab/assets/images/green-chemistry-event2.jpg",FR="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function kR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[NR,UR,FR];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
      position: fixed;
      width: 200px;
      height: 145px;
      object-fit: cover;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      border-radius: 8px;
      transform: translateY(-50%) scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s ease;
      filter: opacity(0.9);
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const eu=[],tu=[],Xv=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),qv=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),Yv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Xv(),qv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Aa(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(eu.push({element:r,splitText:s,originalContent:t}),Re.set(s.lines,{opacity:0,y:50}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;Re.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{Re.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},jv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Xv(),qv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Aa(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(tu.push({element:r,splitText:s,originalContent:t}),Re.set(s.chars,{opacity:0,y:50,display:"inline-block"}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{Re.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Re.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function bh(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{Yv(t,n)})}function Sh(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{jv(t,n)})}function $v(){eu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=eu.indexOf(r);e>-1&&eu.splice(e,1)})}function BR(){$v(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{Yv(e,t)})},100)}function Kv(){tu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=tu.indexOf(r);e>-1&&tu.splice(e,1)})}function zR(){Kv(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{jv(e,t)})},100)}window.cleanupSplitLines=$v;window.refreshSplitLines=BR;window.cleanupSplitChars=Kv;window.refreshSplitChars=zR;function o_(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Dt.heroHeadingFadeScrollTrigger&&Dt.heroHeadingFadeScrollTrigger.animation){n=Dt.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=Re.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Dt.heroHeadingFadeScrollTrigger&&(Dt.heroHeadingFadeScrollTrigger.kill(),Dt.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof bh=="function"&&bh(e),t.length&&typeof Sh=="function"&&Sh(t),typeof xh=="function"&&xh(),$e.refresh()},50)}function HR(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=Uu(()=>{o_()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{o_()})}Re.registerPlugin($e);Re.registerPlugin($o);Re.registerPlugin(Aa);window.gsap=Re;const VR=new Date("2026-04-06T00:00:00").getTime();function GR(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function WR(){pR(),$e.refresh(),$e.clearMatchMedia(),aR(),bR(),SR(),wR(),xh(),MR(),ER(),AR(),TR(),CR(),RR(),LR(),PR(),mR(),gR(),DR(),IR(),kR(),bh(null),Sh(null),HR();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new cy({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),BA(VR),setTimeout(()=>{try{t0()}catch(t){console.error("Failed to initialize shader background:",t),console.warn("Continuing without shader background...")}},100),GR()?(yR(),WR(),M1()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
