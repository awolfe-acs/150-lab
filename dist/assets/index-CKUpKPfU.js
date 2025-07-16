
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

var Wv=Object.defineProperty;var Xv=(r,e,t)=>e in r?Wv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var tt=(r,e,t)=>Xv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var qv="1.3.4";function n_(r,e,t){return Math.max(r,Math.min(e,t))}function Yv(r,e,t){return(1-t)*r+t*e}function jv(r,e,t,n){return Yv(r,e,1-Math.exp(-t*n))}function $v(r,e){return(r%e+e)%e}var Kv=class{constructor(){tt(this,"isRunning",!1);tt(this,"value",0);tt(this,"from",0);tt(this,"to",0);tt(this,"currentTime",0);tt(this,"lerp");tt(this,"duration");tt(this,"easing");tt(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=n_(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=jv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Zv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Jv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){tt(this,"width",0);tt(this,"height",0);tt(this,"scrollHeight",0);tt(this,"scrollWidth",0);tt(this,"debouncedResize");tt(this,"wrapperResizeObserver");tt(this,"contentResizeObserver");tt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});tt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});tt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Zv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},i_=class{constructor(){tt(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},mp=100/6,Xr={passive:!1},Qv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){tt(this,"touchStart",{x:0,y:0});tt(this,"lastDelta",{x:0,y:0});tt(this,"window",{width:0,height:0});tt(this,"emitter",new i_);tt(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});tt(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});tt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});tt(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?mp:n===2?this.window.width:1,s=n===1?mp:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});tt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Xr),this.element.addEventListener("touchstart",this.onTouchStart,Xr),this.element.addEventListener("touchmove",this.onTouchMove,Xr),this.element.addEventListener("touchend",this.onTouchEnd,Xr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Xr),this.element.removeEventListener("touchstart",this.onTouchStart,Xr),this.element.removeEventListener("touchmove",this.onTouchMove,Xr),this.element.removeEventListener("touchend",this.onTouchEnd,Xr)}},gp=r=>Math.min(1,1.001-Math.pow(2,-10*r)),ey=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:w=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:y=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:E=!1}={}){tt(this,"_isScrolling",!1);tt(this,"_isStopped",!1);tt(this,"_isLocked",!1);tt(this,"_preventNextNativeScrollEvent",!1);tt(this,"_resetVelocityTimeout",null);tt(this,"__rafID",null);tt(this,"isTouching");tt(this,"time",0);tt(this,"userData",{});tt(this,"lastVelocity",0);tt(this,"velocity",0);tt(this,"direction",0);tt(this,"options");tt(this,"targetScroll");tt(this,"animatedScroll");tt(this,"animate",new Kv);tt(this,"emitter",new i_);tt(this,"dimensions");tt(this,"virtualScroll");tt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});tt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});tt(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});tt(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});tt(this,"onPointerDown",r=>{r.button===1&&this.reset()});tt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,w,x;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((w=m.hasAttribute)==null?void 0:w.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});tt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});tt(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=qv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=gp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:w,autoRaf:x,anchors:v,autoToggle:y,allowNestedScroll:T,__experimental__naiveDimensions:E},this.dimensions=new Jv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Qv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=n_(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=gp:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const y=window.getComputedStyle(r);i.computedStyle=y;const T=y.overflowX,E=y.overflowY;if(s=["auto","overlay","scroll"].includes(T),o=["auto","overlay","scroll"].includes(E),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const y=e!==0,T=t!==0;y&&s&&a&&(_="x"),T&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,w,x;if(_==="x")g=r.scrollLeft,m=c-d,p=e,w=s,x=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,w=o,x=l;else return!1;return(p>0?g<m:g>0)&&w&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?$v(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const ty="modulepreload",ny=function(r){return"/150-lab/"+r},_p={},vp=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=ny(c),c in _p)return;_p[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":ty,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ph="178",iy=0,yp=1,ry=2,r_=1,sy=2,Mr=3,Br=0,si=1,Di=2,us=0,ds=1,eu=2,xp=3,bp=4,oy=5,Vs=100,ay=101,ly=102,cy=103,uy=104,dy=200,fy=201,hy=202,py=203,Ud=204,Fd=205,my=206,gy=207,_y=208,vy=209,yy=210,xy=211,by=212,Sy=213,wy=214,kd=0,Bd=1,zd=2,ra=3,Hd=4,Vd=5,Gd=6,Wd=7,s_=0,My=1,Ey=2,fs=0,Ty=1,Ay=2,Cy=3,Ry=4,Py=5,Ly=6,Dy=7,Sp="attached",Iy="detached",o_=300,sa=301,oa=302,Xd=303,qd=304,bu=306,aa=1e3,ns=1001,tu=1002,Qn=1003,a_=1004,Ha=1005,xi=1006,Uc=1007,Pr=1008,fr=1009,l_=1010,c_=1011,xl=1012,mh=1013,ro=1014,Yi=1015,Bl=1016,gh=1017,_h=1018,bl=1020,u_=35902,d_=1021,f_=1022,Ii=1023,Sl=1026,wl=1027,vh=1028,yh=1029,h_=1030,xh=1031,bh=1033,Fc=33776,kc=33777,Bc=33778,zc=33779,Yd=35840,jd=35841,$d=35842,Kd=35843,Zd=36196,Jd=37492,Qd=37496,ef=37808,tf=37809,nf=37810,rf=37811,sf=37812,of=37813,af=37814,lf=37815,cf=37816,uf=37817,df=37818,ff=37819,hf=37820,pf=37821,Hc=36492,mf=36494,gf=36495,p_=36283,_f=36284,vf=36285,yf=36286,Ml=2300,El=2301,Iu=2302,wp=2400,Mp=2401,Ep=2402,Oy=2500,Ny=0,m_=1,xf=2,Uy=3200,Fy=3201,g_=0,ky=1,ts="",Dn="srgb",ei="srgb-linear",nu="linear",Yt="srgb",go=7680,Tp=519,By=512,zy=513,Hy=514,__=515,Vy=516,Gy=517,Wy=518,Xy=519,bf=35044,Ap="300 es",Lr=2e3,iu=2001;class xa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cp=1234567;const el=Math.PI/180,la=180/Math.PI;function ji(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Un[r&255]+Un[r>>8&255]+Un[r>>16&255]+Un[r>>24&255]+"-"+Un[e&255]+Un[e>>8&255]+"-"+Un[e>>16&15|64]+Un[e>>24&255]+"-"+Un[t&63|128]+Un[t>>8&255]+"-"+Un[t>>16&255]+Un[t>>24&255]+Un[n&255]+Un[n>>8&255]+Un[n>>16&255]+Un[n>>24&255]).toLowerCase()}function Ct(r,e,t){return Math.max(e,Math.min(t,r))}function Sh(r,e){return(r%e+e)%e}function qy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Yy(r,e,t){return r!==e?(t-r)/(e-r):0}function tl(r,e,t){return(1-t)*r+t*e}function jy(r,e,t,n){return tl(r,e,1-Math.exp(-t*n))}function $y(r,e=1){return e-Math.abs(Sh(r,e*2)-e)}function Ky(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Zy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Jy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Qy(r,e){return r+Math.random()*(e-r)}function ex(r){return r*(.5-Math.random())}function tx(r){r!==void 0&&(Cp=r);let e=Cp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nx(r){return r*el}function ix(r){return r*la}function rx(r){return(r&r-1)===0&&r!==0}function sx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ox(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function ax(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Vt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const lx={DEG2RAD:el,RAD2DEG:la,generateUUID:ji,clamp:Ct,euclideanModulo:Sh,mapLinear:qy,inverseLerp:Yy,lerp:tl,damp:jy,pingpong:$y,smoothstep:Ky,smootherstep:Zy,randInt:Jy,randFloat:Qy,randFloatSpread:ex,seededRandom:tx,degToRad:nx,radToDeg:ix,isPowerOfTwo:rx,ceilPowerOfTwo:sx,floorPowerOfTwo:ox,setQuaternionFromProperEuler:ax,normalize:Vt,denormalize:Wi};class Pt{constructor(e=0,t=0){Pt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class bs{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,w=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const y=Math.sqrt(x),T=Math.atan2(y,p*w);m=Math.sin(m*T)/y,a=Math.sin(a*T)/y}const v=a*w;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const y=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=y,c*=y,u*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ou.copy(this).projectOnVector(e),this.sub(Ou)}reflect(e){return this.sub(Ou.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ou=new G,Rp=new bs;class _t{constructor(e,t,n,i,s,o,a,l,c){_t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],w=i[1],x=i[4],v=i[7],y=i[2],T=i[5],E=i[8];return s[0]=o*g+a*w+l*y,s[3]=o*m+a*x+l*T,s[6]=o*p+a*v+l*E,s[1]=c*g+u*w+d*y,s[4]=c*m+u*x+d*T,s[7]=c*p+u*v+d*E,s[2]=f*g+h*w+_*y,s[5]=f*m+h*x+_*T,s[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Nu.makeScale(e,t)),this}rotate(e){return this.premultiply(Nu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Nu=new _t;function v_(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Tl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function cx(){const r=Tl("canvas");return r.style.display="block",r}const Pp={};function qo(r){r in Pp||(Pp[r]=!0,console.warn(r))}function ux(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function dx(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function fx(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Lp=new _t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dp=new _t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hx(){const r={enabled:!0,workingColorSpace:ei,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Yt&&(i.r=Ur(i.r),i.g=Ur(i.g),i.b=Ur(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Yt&&(i.r=Yo(i.r),i.g=Yo(i.g),i.b=Yo(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ts?nu:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return qo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return qo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ei]:{primaries:e,whitePoint:n,transfer:nu,toXYZ:Lp,fromXYZ:Dp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dn},outputColorSpaceConfig:{drawingBufferColorSpace:Dn}},[Dn]:{primaries:e,whitePoint:n,transfer:Yt,toXYZ:Lp,fromXYZ:Dp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dn}}}),r}const Ot=hx();function Ur(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Yo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let _o;class px{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_o===void 0&&(_o=Tl("canvas")),_o.width=e.width,_o.height=e.height;const i=_o.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=_o}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Tl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ur(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ur(t[n]/255)*255):t[n]=Ur(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mx=0;class wh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Uu(i[o].image)):s.push(Uu(i[o]))}else s=Uu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Uu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?px.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gx=0;const Fu=new G;class xn extends xa{constructor(e=xn.DEFAULT_IMAGE,t=xn.DEFAULT_MAPPING,n=ns,i=ns,s=xi,o=Pr,a=Ii,l=fr,c=xn.DEFAULT_ANISOTROPY,u=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gx++}),this.uuid=ji(),this.name="",this.source=new wh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fu).x}get height(){return this.source.getSize(Fu).y}get depth(){return this.source.getSize(Fu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==o_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case aa:e.x=e.x-Math.floor(e.x);break;case ns:e.x=e.x<0?0:1;break;case tu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case aa:e.y=e.y-Math.floor(e.y);break;case ns:e.y=e.y<0?0:1;break;case tu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=o_;xn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,y=(p+1)/2,T=(u+f)/4,E=(d+g)/4,P=(_+m)/4;return x>v&&x>y?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=E/n):v>y?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=T/i,s=P/i):y<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(y),n=E/s,i=P/s),this.set(n,i,s,t),this}let w=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(d-g)/w,this.z=(f-u)/w,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this.w=Ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this.w=Ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _x extends xa{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new xn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new wh(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class so extends _x{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class y_ extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vx extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ki{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xl.copy(n.boundingBox)),Xl.applyMatrix4(e.matrixWorld),this.union(Xl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ta),ql.subVectors(this.max,Ta),vo.subVectors(e.a,Ta),yo.subVectors(e.b,Ta),xo.subVectors(e.c,Ta),qr.subVectors(yo,vo),Yr.subVectors(xo,yo),Ts.subVectors(vo,xo);let t=[0,-qr.z,qr.y,0,-Yr.z,Yr.y,0,-Ts.z,Ts.y,qr.z,0,-qr.x,Yr.z,0,-Yr.x,Ts.z,0,-Ts.x,-qr.y,qr.x,0,-Yr.y,Yr.x,0,-Ts.y,Ts.x,0];return!ku(t,vo,yo,xo,ql)||(t=[1,0,0,0,1,0,0,0,1],!ku(t,vo,yo,xo,ql))?!1:(Yl.crossVectors(qr,Yr),t=[Yl.x,Yl.y,Yl.z],ku(t,vo,yo,xo,ql))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_r[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_r[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_r[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_r[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_r[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_r[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_r[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_r[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_r),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _r=[new G,new G,new G,new G,new G,new G,new G,new G],Bi=new G,Xl=new Ki,vo=new G,yo=new G,xo=new G,qr=new G,Yr=new G,Ts=new G,Ta=new G,ql=new G,Yl=new G,As=new G;function ku(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){As.fromArray(r,s);const a=i.x*Math.abs(As.x)+i.y*Math.abs(As.y)+i.z*Math.abs(As.z),l=e.dot(As),c=t.dot(As),u=n.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const yx=new Ki,Aa=new G,Bu=new G;class mr{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):yx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Aa.subVectors(e,this.center);const t=Aa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Aa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Aa.copy(e.center).add(Bu)),this.expandByPoint(Aa.copy(e.center).sub(Bu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const vr=new G,zu=new G,jl=new G,jr=new G,Hu=new G,$l=new G,Vu=new G;class Su{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vr.copy(this.origin).addScaledVector(this.direction,t),vr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){zu.copy(e).add(t).multiplyScalar(.5),jl.copy(t).sub(e).normalize(),jr.copy(this.origin).sub(zu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(jl),a=jr.dot(this.direction),l=-jr.dot(jl),c=jr.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(zu).addScaledVector(jl,f),h}intersectSphere(e,t){vr.subVectors(e.center,this.origin);const n=vr.dot(this.direction),i=vr.dot(vr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,vr)!==null}intersectTriangle(e,t,n,i,s){Hu.subVectors(t,e),$l.subVectors(n,e),Vu.crossVectors(Hu,$l);let o=this.direction.dot(Vu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jr.subVectors(this.origin,e);const l=a*this.direction.dot($l.crossVectors(jr,$l));if(l<0)return null;const c=a*this.direction.dot(Hu.cross(jr));if(c<0||l+c>o)return null;const u=-a*jr.dot(Vu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/bo.setFromMatrixColumn(e,0).length(),s=1/bo.setFromMatrixColumn(e,1).length(),o=1/bo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xx,e,bx)}lookAt(e,t,n){const i=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),$r.crossVectors(n,fi),$r.lengthSq()===0&&(Math.abs(n.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),$r.crossVectors(n,fi)),$r.normalize(),Kl.crossVectors(fi,$r),i[0]=$r.x,i[4]=Kl.x,i[8]=fi.x,i[1]=$r.y,i[5]=Kl.y,i[9]=fi.y,i[2]=$r.z,i[6]=Kl.z,i[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],w=n[3],x=n[7],v=n[11],y=n[15],T=i[0],E=i[4],P=i[8],S=i[12],M=i[1],D=i[5],I=i[9],V=i[13],F=i[2],A=i[6],K=i[10],J=i[14],q=i[3],fe=i[7],O=i[11],Y=i[15];return s[0]=o*T+a*M+l*F+c*q,s[4]=o*E+a*D+l*A+c*fe,s[8]=o*P+a*I+l*K+c*O,s[12]=o*S+a*V+l*J+c*Y,s[1]=u*T+d*M+f*F+h*q,s[5]=u*E+d*D+f*A+h*fe,s[9]=u*P+d*I+f*K+h*O,s[13]=u*S+d*V+f*J+h*Y,s[2]=_*T+g*M+m*F+p*q,s[6]=_*E+g*D+m*A+p*fe,s[10]=_*P+g*I+m*K+p*O,s[14]=_*S+g*V+m*J+p*Y,s[3]=w*T+x*M+v*F+y*q,s[7]=w*E+x*D+v*A+y*fe,s[11]=w*P+x*I+v*K+y*O,s[15]=w*S+x*V+v*J+y*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],w=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,x=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,y=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,T=t*w+n*x+i*v+s*y;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=w*E,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=x*E,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*E,e[12]=y*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*E,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,w=l*c,x=l*u,v=l*d,y=n.x,T=n.y,E=n.z;return i[0]=(1-(g+p))*y,i[1]=(h+v)*y,i[2]=(_-x)*y,i[3]=0,i[4]=(h-v)*T,i[5]=(1-(f+p))*T,i[6]=(m+w)*T,i[7]=0,i[8]=(_+x)*E,i[9]=(m-w)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=bo.set(i[0],i[1],i[2]).length();const o=bo.set(i[4],i[5],i[6]).length(),a=bo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],zi.copy(this);const c=1/s,u=1/o,d=1/a;return zi.elements[0]*=c,zi.elements[1]*=c,zi.elements[2]*=c,zi.elements[4]*=u,zi.elements[5]*=u,zi.elements[6]*=u,zi.elements[8]*=d,zi.elements[9]*=d,zi.elements[10]*=d,t.setFromRotationMatrix(zi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Lr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===Lr)h=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===iu)h=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Lr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===Lr)_=(o+s)*d,g=-2*d;else if(a===iu)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const bo=new G,zi=new vt,xx=new G(0,0,0),bx=new G(1,1,1),$r=new G,Kl=new G,fi=new G,Ip=new vt,Op=new bs;class hr{constructor(e=0,t=0,n=0,i=hr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ip,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Op.setFromEuler(this),this.setFromQuaternion(Op,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hr.DEFAULT_ORDER="XYZ";class x_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sx=0;const Np=new G,So=new bs,yr=new vt,Zl=new G,Ca=new G,wx=new G,Mx=new bs,Up=new G(1,0,0),Fp=new G(0,1,0),kp=new G(0,0,1),Bp={type:"added"},Ex={type:"removed"},wo={type:"childadded",child:null},Gu={type:"childremoved",child:null};class on extends xa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=on.DEFAULT_UP.clone();const e=new G,t=new hr,n=new bs,i=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new _t}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=on.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new x_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.multiply(So),this}rotateOnWorldAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.premultiply(So),this}rotateX(e){return this.rotateOnAxis(Up,e)}rotateY(e){return this.rotateOnAxis(Fp,e)}rotateZ(e){return this.rotateOnAxis(kp,e)}translateOnAxis(e,t){return Np.copy(e).applyQuaternion(this.quaternion),this.position.add(Np.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Up,e)}translateY(e){return this.translateOnAxis(Fp,e)}translateZ(e){return this.translateOnAxis(kp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Zl.copy(e):Zl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yr.lookAt(Ca,Zl,this.up):yr.lookAt(Zl,Ca,this.up),this.quaternion.setFromRotationMatrix(yr),i&&(yr.extractRotation(i.matrixWorld),So.setFromRotationMatrix(yr),this.quaternion.premultiply(So.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bp),wo.child=e,this.dispatchEvent(wo),wo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ex),Gu.child=e,this.dispatchEvent(Gu),Gu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yr.multiply(e.parent.matrixWorld)),e.applyMatrix4(yr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bp),wo.child=e,this.dispatchEvent(wo),wo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,e,wx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,Mx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}on.DEFAULT_UP=new G(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hi=new G,xr=new G,Wu=new G,br=new G,Mo=new G,Eo=new G,zp=new G,Xu=new G,qu=new G,Yu=new G,ju=new Ft,$u=new Ft,Ku=new Ft;class Xi{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Hi.subVectors(e,t),i.cross(Hi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Hi.subVectors(i,t),xr.subVectors(n,t),Wu.subVectors(e,t);const o=Hi.dot(Hi),a=Hi.dot(xr),l=Hi.dot(Wu),c=xr.dot(xr),u=xr.dot(Wu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,br)===null?!1:br.x>=0&&br.y>=0&&br.x+br.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,br)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,br.x),l.addScaledVector(o,br.y),l.addScaledVector(a,br.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return ju.setScalar(0),$u.setScalar(0),Ku.setScalar(0),ju.fromBufferAttribute(e,t),$u.fromBufferAttribute(e,n),Ku.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(ju,s.x),o.addScaledVector($u,s.y),o.addScaledVector(Ku,s.z),o}static isFrontFacing(e,t,n,i){return Hi.subVectors(n,t),xr.subVectors(e,t),Hi.cross(xr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hi.subVectors(this.c,this.b),xr.subVectors(this.a,this.b),Hi.cross(xr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Xi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Mo.subVectors(i,n),Eo.subVectors(s,n),Xu.subVectors(e,n);const l=Mo.dot(Xu),c=Eo.dot(Xu);if(l<=0&&c<=0)return t.copy(n);qu.subVectors(e,i);const u=Mo.dot(qu),d=Eo.dot(qu);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Mo,o);Yu.subVectors(e,s);const h=Mo.dot(Yu),_=Eo.dot(Yu);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Eo,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return zp.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(zp,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Mo,o).addScaledVector(Eo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const b_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kr={h:0,s:0,l:0},Jl={h:0,s:0,l:0};function Zu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ot.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ot.workingColorSpace){if(e=Sh(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Zu(o,s,e+1/3),this.g=Zu(o,s,e),this.b=Zu(o,s,e-1/3)}return Ot.colorSpaceToWorking(this,i),this}setStyle(e,t=Dn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dn){const n=b_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}copyLinearToSRGB(e){return this.r=Yo(e.r),this.g=Yo(e.g),this.b=Yo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dn){return Ot.workingToColorSpace(Fn.copy(this),e),Math.round(Ct(Fn.r*255,0,255))*65536+Math.round(Ct(Fn.g*255,0,255))*256+Math.round(Ct(Fn.b*255,0,255))}getHexString(e=Dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ot.workingColorSpace){Ot.workingToColorSpace(Fn.copy(this),t);const n=Fn.r,i=Fn.g,s=Fn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ot.workingColorSpace){return Ot.workingToColorSpace(Fn.copy(this),t),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=Dn){Ot.workingToColorSpace(Fn.copy(this),e);const t=Fn.r,n=Fn.g,i=Fn.b;return e!==Dn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Kr),this.setHSL(Kr.h+e,Kr.s+t,Kr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kr),e.getHSL(Jl);const n=tl(Kr.h,Jl.h,t),i=tl(Kr.s,Jl.s,t),s=tl(Kr.l,Jl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Fn=new Ze;Ze.NAMES=b_;let Tx=0;class cr extends xa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tx++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=ds,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ud,this.blendDst=Fd,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=ra,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=go,this.stencilZFail=go,this.stencilZPass=go,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(n.blending=this.blending),this.side!==Br&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ud&&(n.blendSrc=this.blendSrc),this.blendDst!==Fd&&(n.blendDst=this.blendDst),this.blendEquation!==Vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ra&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==go&&(n.stencilFail=this.stencilFail),this.stencilZFail!==go&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==go&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ws extends cr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.combine=s_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hn=new G,Ql=new Pt;let Ax=0;class Gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ax++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bf,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ql.fromBufferAttribute(this,t),Ql.applyMatrix3(e),this.setXY(t,Ql.x,Ql.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix3(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bf&&(e.usage=this.usage),e}}class S_ extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class w_ extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Fr extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Cx=0;const Ti=new vt,Ju=new on,To=new G,hi=new Ki,Ra=new Ki,An=new G;class ki extends xa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(v_(e)?w_:S_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new _t().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,t,n){return Ti.makeTranslation(e,t,n),this.applyMatrix4(Ti),this}scale(e,t,n){return Ti.makeScale(e,t,n),this.applyMatrix4(Ti),this}lookAt(e){return Ju.lookAt(e),Ju.updateMatrix(),this.applyMatrix4(Ju.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(To).negate(),this.translate(To.x,To.y,To.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Fr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];hi.setFromBufferAttribute(s),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ra.setFromBufferAttribute(a),this.morphTargetsRelative?(An.addVectors(hi.min,Ra.min),hi.expandByPoint(An),An.addVectors(hi.max,Ra.max),hi.expandByPoint(An)):(hi.expandByPoint(Ra.min),hi.expandByPoint(Ra.max))}hi.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)An.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(An));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)An.fromBufferAttribute(a,c),l&&(To.fromBufferAttribute(e,c),An.add(To)),i=Math.max(i,n.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new G,l[P]=new G;const c=new G,u=new G,d=new G,f=new Pt,h=new Pt,_=new Pt,g=new G,m=new G;function p(P,S,M){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,S),_.fromBufferAttribute(s,M),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const D=1/(h.x*_.y-_.x*h.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(D),a[P].add(g),a[S].add(g),a[M].add(g),l[P].add(m),l[S].add(m),l[M].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let P=0,S=w.length;P<S;++P){const M=w[P],D=M.start,I=M.count;for(let V=D,F=D+I;V<F;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const x=new G,v=new G,y=new G,T=new G;function E(P){y.fromBufferAttribute(i,P),T.copy(y);const S=a[P];x.copy(S),x.sub(y.multiplyScalar(y.dot(S))).normalize(),v.crossVectors(T,S);const D=v.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,D)}for(let P=0,S=w.length;P<S;++P){const M=w[P],D=M.start,I=M.count;for(let V=D,F=D+I;V<F;V+=3)E(e.getX(V+0)),E(e.getX(V+1)),E(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)An.fromBufferAttribute(e,t),An.normalize(),e.setXYZ(t,An.x,An.y,An.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Gt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ki,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hp=new vt,Cs=new Su,ec=new mr,Vp=new G,tc=new G,nc=new G,ic=new G,Qu=new G,rc=new G,Gp=new G,sc=new G;class Jn extends on{constructor(e=new ki,t=new Ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){rc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Qu.fromBufferAttribute(d,e),o?rc.addScaledVector(Qu,u):rc.addScaledVector(Qu.sub(t),u))}t.add(rc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ec.copy(n.boundingSphere),ec.applyMatrix4(s),Cs.copy(e.ray).recast(e.near),!(ec.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(ec,Vp)===null||Cs.origin.distanceToSquared(Vp)>(e.far-e.near)**2))&&(Hp.copy(s).invert(),Cs.copy(e.ray).applyMatrix4(Hp),!(n.boundingBox!==null&&Cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Cs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],w=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=w,y=x;v<y;v+=3){const T=a.getX(v),E=a.getX(v+1),P=a.getX(v+2);i=oc(this,p,e,n,c,u,d,T,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const w=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);i=oc(this,o,e,n,c,u,d,w,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],w=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=w,y=x;v<y;v+=3){const T=v,E=v+1,P=v+2;i=oc(this,p,e,n,c,u,d,T,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const w=m,x=m+1,v=m+2;i=oc(this,o,e,n,c,u,d,w,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Rx(r,e,t,n,i,s,o,a){let l;if(e.side===si?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Br,a),l===null)return null;sc.copy(a),sc.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(sc);return c<t.near||c>t.far?null:{distance:c,point:sc.clone(),object:r}}function oc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,tc),r.getVertexPosition(l,nc),r.getVertexPosition(c,ic);const u=Rx(r,e,t,n,tc,nc,ic,Gp);if(u){const d=new G;Xi.getBarycoord(Gp,tc,nc,ic,d),i&&(u.uv=Xi.getInterpolatedAttribute(i,a,l,c,d,new Pt)),s&&(u.uv1=Xi.getInterpolatedAttribute(s,a,l,c,d,new Pt)),o&&(u.normal=Xi.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};Xi.getNormal(tc,nc,ic,f.normal),u.face=f,u.barycoord=d}return u}class zl extends ki{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Fr(c,3)),this.setAttribute("normal",new Fr(u,3)),this.setAttribute("uv",new Fr(d,2));function _(g,m,p,w,x,v,y,T,E,P,S){const M=v/E,D=y/P,I=v/2,V=y/2,F=T/2,A=E+1,K=P+1;let J=0,q=0;const fe=new G;for(let O=0;O<K;O++){const Y=O*D-V;for(let $e=0;$e<A;$e++){const Se=$e*M-I;fe[g]=Se*w,fe[m]=Y*x,fe[p]=F,c.push(fe.x,fe.y,fe.z),fe[g]=0,fe[m]=0,fe[p]=T>0?1:-1,u.push(fe.x,fe.y,fe.z),d.push($e/E),d.push(1-O/P),J+=1}}for(let O=0;O<P;O++)for(let Y=0;Y<E;Y++){const $e=f+Y+A*O,Se=f+Y+A*(O+1),j=f+(Y+1)+A*(O+1),ae=f+(Y+1)+A*O;l.push($e,Se,ae),l.push(Se,j,ae),q+=6}a.addGroup(h,q,S),h+=q,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ca(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function qn(r){const e={};for(let t=0;t<r.length;t++){const n=ca(r[t]);for(const i in n)e[i]=n[i]}return e}function Px(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function M_(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ot.workingColorSpace}const Lx={clone:ca,merge:qn};var Dx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends cr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dx,this.fragmentShader=Ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ca(e.uniforms),this.uniformsGroups=Px(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class E_ extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Lr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zr=new G,Wp=new Pt,Xp=new Pt;class ri extends E_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(el*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(el*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Zr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zr.x,Zr.y).multiplyScalar(-e/Zr.z),Zr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zr.x,Zr.y).multiplyScalar(-e/Zr.z)}getViewSize(e,t){return this.getViewBounds(e,Wp,Xp),t.subVectors(Xp,Wp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(el*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ao=-90,Co=1;class Ox extends on{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ri(Ao,Co,e,t);i.layers=this.layers,this.add(i);const s=new ri(Ao,Co,e,t);s.layers=this.layers,this.add(s);const o=new ri(Ao,Co,e,t);o.layers=this.layers,this.add(o);const a=new ri(Ao,Co,e,t);a.layers=this.layers,this.add(a);const l=new ri(Ao,Co,e,t);l.layers=this.layers,this.add(l);const c=new ri(Ao,Co,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Lr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===iu)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class T_ extends xn{constructor(e=[],t=sa,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nx extends so{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new T_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new zl(5,5,5),s=new Oi({name:"CubemapFromEquirect",uniforms:ca(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:si,blending:us});s.uniforms.tEquirect.value=t;const o=new Jn(i,s),a=t.minFilter;return t.minFilter===Pr&&(t.minFilter=xi),new Ox(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Dr extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ux={type:"move"};class ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ux)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Dr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class qp extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hr,this.environmentIntensity=1,this.environmentRotation=new hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Fx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bf,this.updateRanges=[],this.version=0,this.uuid=ji()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gn=new G;class Mh{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix4(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyNormalMatrix(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.transformDirection(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array),s=Vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Yp=new G,jp=new Ft,$p=new Ft,kx=new G,Kp=new vt,ac=new G,td=new mr,Zp=new vt,nd=new Su;class Bx extends Jn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sp,this.bindMatrix=new vt,this.bindMatrixInverse=new vt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ki),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ac),this.boundingBox.expandByPoint(ac)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ac),this.boundingSphere.expandByPoint(ac)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),td.copy(this.boundingSphere),td.applyMatrix4(i),e.ray.intersectsSphere(td)!==!1&&(Zp.copy(i).invert(),nd.copy(e.ray).applyMatrix4(Zp),!(this.boundingBox!==null&&nd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,nd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ft,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Iy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;jp.fromBufferAttribute(i.attributes.skinIndex,e),$p.fromBufferAttribute(i.attributes.skinWeight,e),Yp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=$p.getComponent(s);if(o!==0){const a=jp.getComponent(s);Kp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(kx.copy(Yp).applyMatrix4(Kp),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class A_ extends on{constructor(){super(),this.isBone=!0,this.type="Bone"}}class C_ extends xn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Qn,u=Qn,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jp=new vt,zx=new vt;class Eh{constructor(e=[],t=[]){this.uuid=ji(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new vt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new vt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:zx;Jp.multiplyMatrices(a,t[s]),Jp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Eh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new C_(t,e,e,Ii,Yi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new A_),this.bones.push(o),this.boneInverses.push(new vt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Sf extends Gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ro=new vt,Qp=new vt,lc=[],em=new Ki,Hx=new vt,Pa=new Jn,La=new mr;class Vx extends Jn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Sf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Hx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ki),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ro),em.copy(e.boundingBox).applyMatrix4(Ro),this.boundingBox.union(em)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ro),La.copy(e.boundingSphere).applyMatrix4(Ro),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Pa.geometry=this.geometry,Pa.material=this.material,Pa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ro),Qp.multiplyMatrices(n,Ro),Pa.matrixWorld=Qp,Pa.raycast(e,lc);for(let o=0,a=lc.length;o<a;o++){const l=lc[o];l.instanceId=s,l.object=this,t.push(l)}lc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Sf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new C_(new Float32Array(i*this.count),i,this.count,vh,Yi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const id=new G,Gx=new G,Wx=new _t;class Us{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=id.subVectors(n,t).cross(Gx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(id),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Wx.getNormalMatrix(e),i=this.coplanarPoint(id).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new mr,Xx=new Pt(.5,.5),cc=new G;class Th{constructor(e=new Us,t=new Us,n=new Us,i=new Us,s=new Us,o=new Us){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Lr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],w=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+w).normalize(),n[3].setComponents(l-o,f-u,m-_,v-w).normalize(),n[4].setComponents(l-a,f-d,m-g,v-x).normalize(),t===Lr)n[5].setComponents(l+a,f+d,m+g,v+x).normalize();else if(t===iu)n[5].setComponents(a,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){Rs.center.set(0,0,0);const t=Xx.distanceTo(e.center);return Rs.radius=.7071067811865476+t,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(cc.x=i.normal.x>0?e.max.x:e.min.x,cc.y=i.normal.y>0?e.max.y:e.min.y,cc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(cc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class R_ extends cr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ru=new G,su=new G,tm=new vt,Da=new Su,uc=new mr,rd=new G,nm=new G;class Ah extends on{constructor(e=new ki,t=new R_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ru.fromBufferAttribute(t,i-1),su.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ru.distanceTo(su);e.setAttribute("lineDistance",new Fr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uc.copy(n.boundingSphere),uc.applyMatrix4(i),uc.radius+=s,e.ray.intersectsSphere(uc)===!1)return;tm.copy(i).invert(),Da.copy(e.ray).applyMatrix4(tm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),w=u.getX(g+1),x=dc(this,e,Da,l,p,w,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=dc(this,e,Da,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=dc(this,e,Da,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=dc(this,e,Da,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function dc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(ru.fromBufferAttribute(a,i),su.fromBufferAttribute(a,s),t.distanceSqToSegment(ru,su,rd,nm)>n)return;rd.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(rd);if(!(c<e.near||c>e.far))return{distance:c,point:nm.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const im=new G,rm=new G;class qx extends Ah{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)im.fromBufferAttribute(t,i),rm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+im.distanceTo(rm);e.setAttribute("lineDistance",new Fr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Yx extends Ah{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class P_ extends cr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sm=new vt,wf=new Su,fc=new mr,hc=new G;class Mf extends on{constructor(e=new ki,t=new P_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(i),fc.radius+=s,e.ray.intersectsSphere(fc)===!1)return;sm.copy(i).invert(),wf.copy(e.ray).applyMatrix4(sm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);hc.fromBufferAttribute(d,m),om(hc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)hc.fromBufferAttribute(d,_),om(hc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function om(r,e,t,n,i,s,o){const a=wf.distanceSqToPoint(r);if(a<t){const l=new G;wf.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class L_ extends xn{constructor(e,t,n=ro,i,s,o,a=Qn,l=Qn,c,u=Sl,d=1){if(u!==Sl&&u!==wl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gi extends ki{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const w=p*f-o;for(let x=0;x<c;x++){const v=x*d-s;_.push(v,-w,0),g.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){const x=w+c*p,v=w+c*(p+1),y=w+1+c*(p+1),T=w+1+c*p;h.push(x,v,T),h.push(v,y,T)}this.setIndex(h),this.setAttribute("position",new Fr(_,3)),this.setAttribute("normal",new Fr(g,3)),this.setAttribute("uv",new Fr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ch extends cr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=g_,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gr extends Ch{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class jx extends cr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $x extends cr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function pc(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Kx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Zx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function am(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function D_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Hl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Jx extends Hl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wp,endingEnd:wp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Mp:s=e,a=2*t-n;break;case Ep:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Mp:o=e,l=2*n-t;break;case Ep:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,w=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,x=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let y=0;y!==a;++y)s[y]=p*o[u+y]+w*o[c+y]+x*o[l+y]+v*o[d+y];return s}}class Qx extends Hl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class eb extends Hl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=pc(t,this.TimeBufferType),this.values=pc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:pc(e.times,Array),values:pc(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ml:t=this.InterpolantFactoryMethodDiscrete;break;case El:t=this.InterpolantFactoryMethodLinear;break;case Iu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ml;case this.InterpolantFactoryMethodLinear:return El;case this.InterpolantFactoryMethodSmooth:return Iu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Kx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Iu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zi.prototype.ValueTypeName="";Zi.prototype.TimeBufferType=Float32Array;Zi.prototype.ValueBufferType=Float32Array;Zi.prototype.DefaultInterpolation=El;class ba extends Zi{constructor(e,t,n){super(e,t,n)}}ba.prototype.ValueTypeName="bool";ba.prototype.ValueBufferType=Array;ba.prototype.DefaultInterpolation=Ml;ba.prototype.InterpolantFactoryMethodLinear=void 0;ba.prototype.InterpolantFactoryMethodSmooth=void 0;class I_ extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}I_.prototype.ValueTypeName="color";class ua extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}ua.prototype.ValueTypeName="number";class tb extends Hl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)bs.slerpFlat(s,0,o,c-a,o,c,l);return s}}class da extends Zi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new tb(this.times,this.values,this.getValueSize(),e)}}da.prototype.ValueTypeName="quaternion";da.prototype.InterpolantFactoryMethodSmooth=void 0;class Sa extends Zi{constructor(e,t,n){super(e,t,n)}}Sa.prototype.ValueTypeName="string";Sa.prototype.ValueBufferType=Array;Sa.prototype.DefaultInterpolation=Ml;Sa.prototype.InterpolantFactoryMethodLinear=void 0;Sa.prototype.InterpolantFactoryMethodSmooth=void 0;class fa extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}fa.prototype.ValueTypeName="vector";class nb{constructor(e="",t=-1,n=[],i=Oy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ji(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(rb(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Zi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Zx(l);l=am(l,1,u),c=am(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ua(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];D_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let w=0;w!==f[_].morphTargets.length;++w){const x=f[_];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new ua(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(fa,h+".position",f,"pos",i),n(da,h+".quaternion",f,"rot",i),n(fa,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ib(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ua;case"vector":case"vector2":case"vector3":case"vector4":return fa;case"color":return I_;case"quaternion":return da;case"bool":case"boolean":return ba;case"string":return Sa}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function rb(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ib(r.type);if(r.times===void 0){const t=[],n=[];D_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Ir={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class sb{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const ob=new sb;class wa{constructor(e){this.manager=e!==void 0?e:ob,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}wa.DEFAULT_MATERIAL_NAME="__DEFAULT";const Sr={};class ab extends Error{constructor(e,t){super(e),this.response=t}}class O_ extends wa{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ir.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Sr[e]!==void 0){Sr[e].push({onLoad:t,onProgress:n,onError:i});return}Sr[e]=[],Sr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Sr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){w();function w(){d.read().then(({done:x,value:v})=>{if(x)p.close();else{g+=v.byteLength;const y=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let T=0,E=u.length;T<E;T++){const P=u[T];P.onProgress&&P.onProgress(y)}p.enqueue(v),w()}},x=>{p.error(x)})}}});return new Response(m)}else throw new ab(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Ir.add(`file:${e}`,c);const u=Sr[e];delete Sr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=Sr[e];if(u===void 0)throw this.manager.itemError(e),c;delete Sr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}const Po=new WeakMap;class lb extends wa{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ir.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=Po.get(o);d===void 0&&(d=[],Po.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Tl("img");function l(){u(),t&&t(this);const d=Po.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}Po.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),Ir.remove(`image:${e}`);const f=Po.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}Po.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ir.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class cb extends wa{constructor(e){super(e)}load(e,t,n,i){const s=new xn,o=new lb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class wu extends on{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const sd=new vt,lm=new G,cm=new G;class Rh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=fr,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Th,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;lm.setFromMatrixPosition(e.matrixWorld),t.position.copy(lm),cm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cm),t.updateMatrixWorld(),sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sd),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ub extends Rh{constructor(){super(new ri(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=la*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class db extends wu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new ub}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const um=new vt,Ia=new G,od=new G;class fb extends Rh{constructor(){super(new ri(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pt(4,2),this._viewportCount=6,this._viewports=[new Ft(2,1,1,1),new Ft(0,1,1,1),new Ft(3,1,1,1),new Ft(1,1,1,1),new Ft(3,0,1,1),new Ft(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ia.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ia),od.copy(n.position),od.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(od),n.updateMatrixWorld(),i.makeTranslation(-Ia.x,-Ia.y,-Ia.z),um.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(um)}}class hb extends wu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new fb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Mu extends E_{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pb extends Rh{constructor(){super(new Mu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class N_ extends wu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.shadow=new pb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mb extends wu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class nl{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ad=new WeakMap;class gb extends wa{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ir.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(ad.has(o)===!0)i&&i(ad.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ir.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ad.set(l,c),Ir.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Ir.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}}class _b extends ri{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ph="\\[\\]\\.:\\/",vb=new RegExp("["+Ph+"]","g"),Lh="[^"+Ph+"]",yb="[^"+Ph.replace("\\.","")+"]",xb=/((?:WC+[\/:])*)/.source.replace("WC",Lh),bb=/(WCOD+)?/.source.replace("WCOD",yb),Sb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lh),wb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lh),Mb=new RegExp("^"+xb+bb+Sb+wb+"$"),Eb=["material","materials","bones","map"];class Tb{constructor(e,t,n){const i=n||Wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Wt{constructor(e,t,n){this.path=t,this.parsedPath=n||Wt.parseTrackName(t),this.node=Wt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Wt.Composite(e,t,n):new Wt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vb,"")}static parseTrackName(e){const t=Mb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Eb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Wt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Wt.Composite=Tb;Wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Wt.prototype.GetterByBindingType=[Wt.prototype._getValue_direct,Wt.prototype._getValue_array,Wt.prototype._getValue_arrayElement,Wt.prototype._getValue_toArray];Wt.prototype.SetterByBindingTypeAndVersioning=[[Wt.prototype._setValue_direct,Wt.prototype._setValue_direct_setNeedsUpdate,Wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_array,Wt.prototype._setValue_array_setNeedsUpdate,Wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_arrayElement,Wt.prototype._setValue_arrayElement_setNeedsUpdate,Wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_fromArray,Wt.prototype._setValue_fromArray_setNeedsUpdate,Wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function dm(r,e,t,n){const i=Ab(n);switch(t){case d_:return r*e;case vh:return r*e/i.components*i.byteLength;case yh:return r*e/i.components*i.byteLength;case h_:return r*e*2/i.components*i.byteLength;case xh:return r*e*2/i.components*i.byteLength;case f_:return r*e*3/i.components*i.byteLength;case Ii:return r*e*4/i.components*i.byteLength;case bh:return r*e*4/i.components*i.byteLength;case Fc:case kc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Bc:case zc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case jd:case Kd:return Math.max(r,16)*Math.max(e,8)/4;case Yd:case $d:return Math.max(r,8)*Math.max(e,8)/2;case Zd:case Jd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Qd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ef:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case tf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case nf:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case rf:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case sf:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case of:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case af:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case lf:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case cf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case uf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case df:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ff:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case hf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case pf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Hc:case mf:case gf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case p_:case _f:return Math.ceil(r/4)*Math.ceil(e/4)*8;case vf:case yf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ab(r){switch(r){case fr:case l_:return{byteLength:1,components:1};case xl:case c_:case Bl:return{byteLength:2,components:1};case gh:case _h:return{byteLength:2,components:4};case ro:case mh:case Yi:return{byteLength:4,components:1};case u_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ph}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ph);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function U_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Cb(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Rb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pb=`#ifdef USE_ALPHAHASH
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
#endif`,Lb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Db=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ib=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ob=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nb=`#ifdef USE_AOMAP
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
#endif`,Ub=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fb=`#ifdef USE_BATCHING
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
#endif`,kb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vb=`#ifdef USE_IRIDESCENCE
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
#endif`,Gb=`#ifdef USE_BUMPMAP
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
#endif`,Wb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$b=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zb=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Jb=`#define PI 3.141592653589793
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
} // validated`,Qb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,eS=`vec3 transformedNormal = objectNormal;
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
#endif`,tS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sS="gl_FragColor = linearToOutputTexel( gl_FragColor );",oS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,aS=`#ifdef USE_ENVMAP
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
#endif`,lS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cS=`#ifdef USE_ENVMAP
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
#endif`,uS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dS=`#ifdef USE_ENVMAP
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
#endif`,fS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gS=`#ifdef USE_GRADIENTMAP
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
}`,_S=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xS=`uniform bool receiveShadow;
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
#endif`,bS=`#ifdef USE_ENVMAP
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
#endif`,SS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,MS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ES=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TS=`PhysicalMaterial material;
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
#endif`,AS=`struct PhysicalMaterial {
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
}`,CS=`
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
#endif`,RS=`#if defined( RE_IndirectDiffuse )
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
#endif`,PS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,LS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,DS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,NS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,US=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,FS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kS=`#if defined( USE_POINTS_UV )
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
#endif`,BS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,HS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,VS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,GS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WS=`#ifdef USE_MORPHTARGETS
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
#endif`,XS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,YS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$S=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ZS=`#ifdef USE_NORMALMAP
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
#endif`,JS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,QS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ew=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ow=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,aw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hw=`float getShadowMask() {
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
}`,pw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mw=`#ifdef USE_SKINNING
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
#endif`,gw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_w=`#ifdef USE_SKINNING
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
#endif`,vw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sw=`#ifdef USE_TRANSMISSION
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
#endif`,ww=`#ifdef USE_TRANSMISSION
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
#endif`,Mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Aw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rw=`uniform sampler2D t2D;
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
}`,Pw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ow=`#include <common>
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
}`,Nw=`#if DEPTH_PACKING == 3200
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
}`,Uw=`#define DISTANCE
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
}`,Fw=`#define DISTANCE
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
}`,kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zw=`uniform float scale;
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
}`,Hw=`uniform vec3 diffuse;
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
}`,Vw=`#include <common>
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
}`,Gw=`uniform vec3 diffuse;
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
}`,Ww=`#define LAMBERT
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
}`,Xw=`#define LAMBERT
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
}`,qw=`#define MATCAP
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
}`,Yw=`#define MATCAP
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
}`,jw=`#define NORMAL
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
}`,$w=`#define NORMAL
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
}`,Kw=`#define PHONG
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
}`,Zw=`#define PHONG
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
}`,Jw=`#define STANDARD
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
}`,Qw=`#define STANDARD
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
}`,eM=`#define TOON
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
}`,tM=`#define TOON
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
}`,nM=`uniform float size;
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
}`,iM=`uniform vec3 diffuse;
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
}`,rM=`#include <common>
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
}`,sM=`uniform vec3 color;
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
}`,oM=`uniform float rotation;
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
}`,aM=`uniform vec3 diffuse;
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
}`,xt={alphahash_fragment:Rb,alphahash_pars_fragment:Pb,alphamap_fragment:Lb,alphamap_pars_fragment:Db,alphatest_fragment:Ib,alphatest_pars_fragment:Ob,aomap_fragment:Nb,aomap_pars_fragment:Ub,batching_pars_vertex:Fb,batching_vertex:kb,begin_vertex:Bb,beginnormal_vertex:zb,bsdfs:Hb,iridescence_fragment:Vb,bumpmap_pars_fragment:Gb,clipping_planes_fragment:Wb,clipping_planes_pars_fragment:Xb,clipping_planes_pars_vertex:qb,clipping_planes_vertex:Yb,color_fragment:jb,color_pars_fragment:$b,color_pars_vertex:Kb,color_vertex:Zb,common:Jb,cube_uv_reflection_fragment:Qb,defaultnormal_vertex:eS,displacementmap_pars_vertex:tS,displacementmap_vertex:nS,emissivemap_fragment:iS,emissivemap_pars_fragment:rS,colorspace_fragment:sS,colorspace_pars_fragment:oS,envmap_fragment:aS,envmap_common_pars_fragment:lS,envmap_pars_fragment:cS,envmap_pars_vertex:uS,envmap_physical_pars_fragment:bS,envmap_vertex:dS,fog_vertex:fS,fog_pars_vertex:hS,fog_fragment:pS,fog_pars_fragment:mS,gradientmap_pars_fragment:gS,lightmap_pars_fragment:_S,lights_lambert_fragment:vS,lights_lambert_pars_fragment:yS,lights_pars_begin:xS,lights_toon_fragment:SS,lights_toon_pars_fragment:wS,lights_phong_fragment:MS,lights_phong_pars_fragment:ES,lights_physical_fragment:TS,lights_physical_pars_fragment:AS,lights_fragment_begin:CS,lights_fragment_maps:RS,lights_fragment_end:PS,logdepthbuf_fragment:LS,logdepthbuf_pars_fragment:DS,logdepthbuf_pars_vertex:IS,logdepthbuf_vertex:OS,map_fragment:NS,map_pars_fragment:US,map_particle_fragment:FS,map_particle_pars_fragment:kS,metalnessmap_fragment:BS,metalnessmap_pars_fragment:zS,morphinstance_vertex:HS,morphcolor_vertex:VS,morphnormal_vertex:GS,morphtarget_pars_vertex:WS,morphtarget_vertex:XS,normal_fragment_begin:qS,normal_fragment_maps:YS,normal_pars_fragment:jS,normal_pars_vertex:$S,normal_vertex:KS,normalmap_pars_fragment:ZS,clearcoat_normal_fragment_begin:JS,clearcoat_normal_fragment_maps:QS,clearcoat_pars_fragment:ew,iridescence_pars_fragment:tw,opaque_fragment:nw,packing:iw,premultiplied_alpha_fragment:rw,project_vertex:sw,dithering_fragment:ow,dithering_pars_fragment:aw,roughnessmap_fragment:lw,roughnessmap_pars_fragment:cw,shadowmap_pars_fragment:uw,shadowmap_pars_vertex:dw,shadowmap_vertex:fw,shadowmask_pars_fragment:hw,skinbase_vertex:pw,skinning_pars_vertex:mw,skinning_vertex:gw,skinnormal_vertex:_w,specularmap_fragment:vw,specularmap_pars_fragment:yw,tonemapping_fragment:xw,tonemapping_pars_fragment:bw,transmission_fragment:Sw,transmission_pars_fragment:ww,uv_pars_fragment:Mw,uv_pars_vertex:Ew,uv_vertex:Tw,worldpos_vertex:Aw,background_vert:Cw,background_frag:Rw,backgroundCube_vert:Pw,backgroundCube_frag:Lw,cube_vert:Dw,cube_frag:Iw,depth_vert:Ow,depth_frag:Nw,distanceRGBA_vert:Uw,distanceRGBA_frag:Fw,equirect_vert:kw,equirect_frag:Bw,linedashed_vert:zw,linedashed_frag:Hw,meshbasic_vert:Vw,meshbasic_frag:Gw,meshlambert_vert:Ww,meshlambert_frag:Xw,meshmatcap_vert:qw,meshmatcap_frag:Yw,meshnormal_vert:jw,meshnormal_frag:$w,meshphong_vert:Kw,meshphong_frag:Zw,meshphysical_vert:Jw,meshphysical_frag:Qw,meshtoon_vert:eM,meshtoon_frag:tM,points_vert:nM,points_frag:iM,shadow_vert:rM,shadow_frag:sM,sprite_vert:oM,sprite_frag:aM},Ue={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _t}},envmap:{envMap:{value:null},envMapRotation:{value:new _t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _t},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0},uvTransform:{value:new _t}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}}},ir={basic:{uniforms:qn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:qn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ze(0)}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:qn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:qn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:qn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Ze(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:qn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:qn([Ue.points,Ue.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:qn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:qn([Ue.common,Ue.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:qn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:qn([Ue.sprite,Ue.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new _t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _t}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distanceRGBA:{uniforms:qn([Ue.common,Ue.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distanceRGBA_vert,fragmentShader:xt.distanceRGBA_frag},shadow:{uniforms:qn([Ue.lights,Ue.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};ir.physical={uniforms:qn([ir.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _t},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _t},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _t},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _t},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _t},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _t}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};const mc={r:0,b:0,g:0},Ps=new hr,lM=new vt;function cM(r,e,t,n,i,s,o){const a=new Ze(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function g(x){let v=!1;const y=_(x);y===null?p(a,l):y&&y.isColor&&(p(y,1),v=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===bu)?(u===void 0&&(u=new Jn(new zl(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:ca(ir.backgroundCube.uniforms),vertexShader:ir.backgroundCube.vertexShader,fragmentShader:ir.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ps.copy(v.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(lM.makeRotationFromEuler(Ps)),u.material.toneMapped=Ot.getTransfer(y.colorSpace)!==Yt,(d!==y||f!==y.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=y,f=y.version,h=r.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Jn(new Gi(2,2),new Oi({name:"BackgroundMaterial",uniforms:ca(ir.background.uniforms),vertexShader:ir.background.vertexShader,fragmentShader:ir.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ot.getTransfer(y.colorSpace)!==Yt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(mc,M_(r)),n.buffers.color.setClear(mc.r,mc.g,mc.b,v,o)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:g,addToRenderList:m,dispose:w}}function uM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,D,I,V,F){let A=!1;const K=d(V,I,D);s!==K&&(s=K,c(s.object)),A=h(M,V,I,F),A&&_(M,V,I,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(A||o)&&(o=!1,v(M,D,I,V),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function u(M){return r.deleteVertexArray(M)}function d(M,D,I){const V=I.wireframe===!0;let F=n[M.id];F===void 0&&(F={},n[M.id]=F);let A=F[D.id];A===void 0&&(A={},F[D.id]=A);let K=A[V];return K===void 0&&(K=f(l()),A[V]=K),K}function f(M){const D=[],I=[],V=[];for(let F=0;F<t;F++)D[F]=0,I[F]=0,V[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:I,attributeDivisors:V,object:M,attributes:{},index:null}}function h(M,D,I,V){const F=s.attributes,A=D.attributes;let K=0;const J=I.getAttributes();for(const q in J)if(J[q].location>=0){const O=F[q];let Y=A[q];if(Y===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),O===void 0||O.attribute!==Y||Y&&O.data!==Y.data)return!0;K++}return s.attributesNum!==K||s.index!==V}function _(M,D,I,V){const F={},A=D.attributes;let K=0;const J=I.getAttributes();for(const q in J)if(J[q].location>=0){let O=A[q];O===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(O=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(O=M.instanceColor));const Y={};Y.attribute=O,O&&O.data&&(Y.data=O.data),F[q]=Y,K++}s.attributes=F,s.attributesNum=K,s.index=V}function g(){const M=s.newAttributes;for(let D=0,I=M.length;D<I;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){const I=s.newAttributes,V=s.enabledAttributes,F=s.attributeDivisors;I[M]=1,V[M]===0&&(r.enableVertexAttribArray(M),V[M]=1),F[M]!==D&&(r.vertexAttribDivisor(M,D),F[M]=D)}function w(){const M=s.newAttributes,D=s.enabledAttributes;for(let I=0,V=D.length;I<V;I++)D[I]!==M[I]&&(r.disableVertexAttribArray(I),D[I]=0)}function x(M,D,I,V,F,A,K){K===!0?r.vertexAttribIPointer(M,D,I,F,A):r.vertexAttribPointer(M,D,I,V,F,A)}function v(M,D,I,V){g();const F=V.attributes,A=I.getAttributes(),K=D.defaultAttributeValues;for(const J in A){const q=A[J];if(q.location>=0){let fe=F[J];if(fe===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor)),fe!==void 0){const O=fe.normalized,Y=fe.itemSize,$e=e.get(fe);if($e===void 0)continue;const Se=$e.buffer,j=$e.type,ae=$e.bytesPerElement,Me=j===r.INT||j===r.UNSIGNED_INT||fe.gpuType===mh;if(fe.isInterleavedBufferAttribute){const me=fe.data,we=me.stride,rt=fe.offset;if(me.isInstancedInterleavedBuffer){for(let ye=0;ye<q.locationSize;ye++)p(q.location+ye,me.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ye=0;ye<q.locationSize;ye++)m(q.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let ye=0;ye<q.locationSize;ye++)x(q.location+ye,Y/q.locationSize,j,O,we*ae,(rt+Y/q.locationSize*ye)*ae,Me)}else{if(fe.isInstancedBufferAttribute){for(let me=0;me<q.locationSize;me++)p(q.location+me,fe.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let me=0;me<q.locationSize;me++)m(q.location+me);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let me=0;me<q.locationSize;me++)x(q.location+me,Y/q.locationSize,j,O,Y*ae,Y/q.locationSize*me*ae,Me)}}else if(K!==void 0){const O=K[J];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(q.location,O);break;case 3:r.vertexAttrib3fv(q.location,O);break;case 4:r.vertexAttrib4fv(q.location,O);break;default:r.vertexAttrib1fv(q.location,O)}}}}w()}function y(){P();for(const M in n){const D=n[M];for(const I in D){const V=D[I];for(const F in V)u(V[F].object),delete V[F];delete D[I]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const I in D){const V=D[I];for(const F in V)u(V[F].object),delete V[F];delete D[I]}delete n[M.id]}function E(M){for(const D in n){const I=n[D];if(I[M.id]===void 0)continue;const V=I[M.id];for(const F in V)u(V[F].object),delete V[F];delete I[M.id]}}function P(){S(),o=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:S,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:w}}function dM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function fM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Ii&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===Bl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==fr&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Yi&&!P)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),w=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),y=_>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:y,maxSamples:T}}function hM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Us,a=new _t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const w=s?0:n,x=w*4;let v=p.clippingState||null;l.value=v,v=u(_,f,x,h);for(let y=0;y!==x;++y)v[y]=t[y];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=h;x!==g;++x,v+=4)o.copy(d[x]).applyMatrix4(w,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function pM(r){let e=new WeakMap;function t(o,a){return a===Xd?o.mapping=sa:a===qd&&(o.mapping=oa),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xd||a===qd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Nx(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const zo=4,fm=[.125,.215,.35,.446,.526,.582],Gs=20,ld=new Mu,hm=new Ze;let cd=null,ud=0,dd=0,fd=!1;const Fs=(1+Math.sqrt(5))/2,Lo=1/Fs,pm=[new G(-Fs,Lo,0),new G(Fs,Lo,0),new G(-Lo,0,Fs),new G(Lo,0,Fs),new G(0,Fs,-Lo),new G(0,Fs,Lo),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],mM=new G;class mm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=mM}=s;cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),dd=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_m(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(cd,ud,dd),this._renderer.xr.enabled=fd,e.scissorTest=!1,gc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sa||e.mapping===oa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),dd=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Bl,format:Ii,colorSpace:ei,depthBuffer:!1},i=gm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gm(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gM(s)),this._blurMaterial=_M(s,e,t)}return i}_compileMaterial(e){const t=new Jn(this._lodPlanes[0],e);this._renderer.compile(t,ld)}_sceneToCubeUV(e,t,n,i,s){const l=new ri(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(hm),d.toneMapping=fs,d.autoClear=!1;const _=new Ws({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1}),g=new Jn(new zl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(hm),m=!0);for(let w=0;w<6;w++){const x=w%3;x===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):x===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));const v=this._cubeSize;gc(i,x*v,w>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===sa||e.mapping===oa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=vm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_m());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Jn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;gc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ld)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=pm[(i-s-1)%pm.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Jn(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Gs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Gs;m>Gs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gs}`);const p=[];let w=0;for(let E=0;E<Gs;++E){const P=E/g,S=Math.exp(-P*P/2);p.push(S),E===0?w+=S:E<m&&(w+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const v=this._sizeLods[i],y=3*v*(i>x-zo?i-x+zo:0),T=4*(this._cubeSize-v);gc(t,y,T,3*v,2*v),l.setRenderTarget(t),l.render(d,ld)}}function gM(r){const e=[],t=[],n=[];let i=r;const s=r-zo+1+fm.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-zo?l=fm[o-r+zo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,w=new Float32Array(g*_*h),x=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let T=0;T<h;T++){const E=T%3*2/3-1,P=T>2?0:-1,S=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];w.set(S,g*_*T),x.set(f,m*_*T);const M=[T,T,T,T,T,T];v.set(M,p*_*T)}const y=new ki;y.setAttribute("position",new Gt(w,g)),y.setAttribute("uv",new Gt(x,m)),y.setAttribute("faceIndex",new Gt(v,p)),e.push(y),i>zo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function gm(r,e,t){const n=new so(r,e,t);return n.texture.mapping=bu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gc(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function _M(r,e,t){const n=new Float32Array(Gs),i=new G(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:us,depthTest:!1,depthWrite:!1})}function _m(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:us,depthTest:!1,depthWrite:!1})}function vm(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:us,depthTest:!1,depthWrite:!1})}function Dh(){return`

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
	`}function vM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Xd||l===qd,u=l===sa||l===oa;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new mm(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new mm(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function yM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&qo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function xM(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const w=h.array;g=h.version;for(let x=0,v=w.length;x<v;x+=3){const y=w[x+0],T=w[x+1],E=w[x+2];f.push(y,T,T,E,E,y)}}else if(_!==void 0){const w=_.array;g=_.version;for(let x=0,v=w.length/3-1;x<v;x+=3){const y=x+0,T=x+1,E=x+2;f.push(y,T,T,E,E,y)}}else return;const m=new(v_(f)?w_:S_)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function bM(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let w=0;w<_;w++)p+=h[w]*g[w];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function SM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function wM(r,e,t){const n=new WeakMap,i=new Ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var h=M;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let y=a.attributes.position.count*v,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*T*4*d),P=new y_(E,y,T,d);P.type=Yi,P.needsUpdate=!0;const S=v*4;for(let D=0;D<d;D++){const I=p[D],V=w[D],F=x[D],A=y*T*4*D;for(let K=0;K<I.count;K++){const J=K*S;_===!0&&(i.fromBufferAttribute(I,K),E[A+J+0]=i.x,E[A+J+1]=i.y,E[A+J+2]=i.z,E[A+J+3]=0),g===!0&&(i.fromBufferAttribute(V,K),E[A+J+4]=i.x,E[A+J+5]=i.y,E[A+J+6]=i.z,E[A+J+7]=0),m===!0&&(i.fromBufferAttribute(F,K),E[A+J+8]=i.x,E[A+J+9]=i.y,E[A+J+10]=i.z,E[A+J+11]=F.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new Pt(y,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function MM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const F_=new xn,ym=new L_(1,1),k_=new y_,B_=new vx,z_=new T_,xm=[],bm=[],Sm=new Float32Array(16),wm=new Float32Array(9),Mm=new Float32Array(4);function Ma(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=xm[i];if(s===void 0&&(s=new Float32Array(i),xm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function bn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Sn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Eu(r,e){let t=bm[e];t===void 0&&(t=new Int32Array(e),bm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function EM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function TM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;r.uniform2fv(this.addr,e),Sn(t,e)}}function AM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bn(t,e))return;r.uniform3fv(this.addr,e),Sn(t,e)}}function CM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;r.uniform4fv(this.addr,e),Sn(t,e)}}function RM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Sn(t,e)}else{if(bn(t,n))return;Mm.set(n),r.uniformMatrix2fv(this.addr,!1,Mm),Sn(t,n)}}function PM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Sn(t,e)}else{if(bn(t,n))return;wm.set(n),r.uniformMatrix3fv(this.addr,!1,wm),Sn(t,n)}}function LM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Sn(t,e)}else{if(bn(t,n))return;Sm.set(n),r.uniformMatrix4fv(this.addr,!1,Sm),Sn(t,n)}}function DM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;r.uniform2iv(this.addr,e),Sn(t,e)}}function OM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;r.uniform3iv(this.addr,e),Sn(t,e)}}function NM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;r.uniform4iv(this.addr,e),Sn(t,e)}}function UM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function FM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;r.uniform2uiv(this.addr,e),Sn(t,e)}}function kM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;r.uniform3uiv(this.addr,e),Sn(t,e)}}function BM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;r.uniform4uiv(this.addr,e),Sn(t,e)}}function zM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(ym.compareFunction=__,s=ym):s=F_,t.setTexture2D(e||s,i)}function HM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||B_,i)}function VM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||z_,i)}function GM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||k_,i)}function WM(r){switch(r){case 5126:return EM;case 35664:return TM;case 35665:return AM;case 35666:return CM;case 35674:return RM;case 35675:return PM;case 35676:return LM;case 5124:case 35670:return DM;case 35667:case 35671:return IM;case 35668:case 35672:return OM;case 35669:case 35673:return NM;case 5125:return UM;case 36294:return FM;case 36295:return kM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return zM;case 35679:case 36299:case 36307:return HM;case 35680:case 36300:case 36308:case 36293:return VM;case 36289:case 36303:case 36311:case 36292:return GM}}function XM(r,e){r.uniform1fv(this.addr,e)}function qM(r,e){const t=Ma(e,this.size,2);r.uniform2fv(this.addr,t)}function YM(r,e){const t=Ma(e,this.size,3);r.uniform3fv(this.addr,t)}function jM(r,e){const t=Ma(e,this.size,4);r.uniform4fv(this.addr,t)}function $M(r,e){const t=Ma(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function KM(r,e){const t=Ma(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ZM(r,e){const t=Ma(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function JM(r,e){r.uniform1iv(this.addr,e)}function QM(r,e){r.uniform2iv(this.addr,e)}function eE(r,e){r.uniform3iv(this.addr,e)}function tE(r,e){r.uniform4iv(this.addr,e)}function nE(r,e){r.uniform1uiv(this.addr,e)}function iE(r,e){r.uniform2uiv(this.addr,e)}function rE(r,e){r.uniform3uiv(this.addr,e)}function sE(r,e){r.uniform4uiv(this.addr,e)}function oE(r,e,t){const n=this.cache,i=e.length,s=Eu(t,i);bn(n,s)||(r.uniform1iv(this.addr,s),Sn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||F_,s[o])}function aE(r,e,t){const n=this.cache,i=e.length,s=Eu(t,i);bn(n,s)||(r.uniform1iv(this.addr,s),Sn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||B_,s[o])}function lE(r,e,t){const n=this.cache,i=e.length,s=Eu(t,i);bn(n,s)||(r.uniform1iv(this.addr,s),Sn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||z_,s[o])}function cE(r,e,t){const n=this.cache,i=e.length,s=Eu(t,i);bn(n,s)||(r.uniform1iv(this.addr,s),Sn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||k_,s[o])}function uE(r){switch(r){case 5126:return XM;case 35664:return qM;case 35665:return YM;case 35666:return jM;case 35674:return $M;case 35675:return KM;case 35676:return ZM;case 5124:case 35670:return JM;case 35667:case 35671:return QM;case 35668:case 35672:return eE;case 35669:case 35673:return tE;case 5125:return nE;case 36294:return iE;case 36295:return rE;case 36296:return sE;case 35678:case 36198:case 36298:case 36306:case 35682:return oE;case 35679:case 36299:case 36307:return aE;case 35680:case 36300:case 36308:case 36293:return lE;case 36289:case 36303:case 36311:case 36292:return cE}}class dE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=WM(t.type)}}class fE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uE(t.type)}}class hE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const hd=/(\w+)(\])?(\[|\.)?/g;function Em(r,e){r.seq.push(e),r.map[e.id]=e}function pE(r,e,t){const n=r.name,i=n.length;for(hd.lastIndex=0;;){const s=hd.exec(n),o=hd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Em(t,c===void 0?new dE(a,r,e):new fE(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new hE(a),Em(t,d)),t=d}}}class Vc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);pE(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Tm(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const mE=37297;let gE=0;function _E(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Am=new _t;function vE(r){Ot._getMatrix(Am,Ot.workingColorSpace,r);const e=`mat3( ${Am.elements.map(t=>t.toFixed(4))} )`;switch(Ot.getTransfer(r)){case nu:return[e,"LinearTransferOETF"];case Yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Cm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+_E(r.getShaderSource(e),o)}else return i}function yE(r,e){const t=vE(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xE(r,e){let t;switch(e){case Ty:t="Linear";break;case Ay:t="Reinhard";break;case Cy:t="Cineon";break;case Ry:t="ACESFilmic";break;case Ly:t="AgX";break;case Dy:t="Neutral";break;case Py:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _c=new G;function bE(){Ot.getLuminanceCoefficients(_c);const r=_c.x.toFixed(4),e=_c.y.toFixed(4),t=_c.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Va).join(`
`)}function wE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ME(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Va(r){return r!==""}function Rm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const EE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ef(r){return r.replace(EE,AE)}const TE=new Map;function AE(r,e){let t=xt[e];if(t===void 0){const n=TE.get(e);if(n!==void 0)t=xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ef(t)}const CE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lm(r){return r.replace(CE,RE)}function RE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Dm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function PE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===r_?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===sy?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Mr&&(e="SHADOWMAP_TYPE_VSM"),e}function LE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case sa:case oa:e="ENVMAP_TYPE_CUBE";break;case bu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function DE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case oa:e="ENVMAP_MODE_REFRACTION";break}return e}function IE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case s_:e="ENVMAP_BLENDING_MULTIPLY";break;case My:e="ENVMAP_BLENDING_MIX";break;case Ey:e="ENVMAP_BLENDING_ADD";break}return e}function OE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function NE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=PE(t),c=LE(t),u=DE(t),d=IE(t),f=OE(t),h=SE(t),_=wE(s),g=i.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Va).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Va).join(`
`),p.length>0&&(p+=`
`)):(m=[Dm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Va).join(`
`),p=[Dm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fs?"#define TONE_MAPPING":"",t.toneMapping!==fs?xt.tonemapping_pars_fragment:"",t.toneMapping!==fs?xE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,yE("linearToOutputTexel",t.outputColorSpace),bE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Va).join(`
`)),o=Ef(o),o=Rm(o,t),o=Pm(o,t),a=Ef(a),a=Rm(a,t),a=Pm(a,t),o=Lm(o),a=Lm(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ap?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ap?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=w+m+o,v=w+p+a,y=Tm(i,i.VERTEX_SHADER,x),T=Tm(i,i.FRAGMENT_SHADER,v);i.attachShader(g,y),i.attachShader(g,T),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(D){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(g).trim(),V=i.getShaderInfoLog(y).trim(),F=i.getShaderInfoLog(T).trim();let A=!0,K=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(A=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,y,T);else{const J=Cm(i,y,"vertex"),q=Cm(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+I+`
`+J+`
`+q)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(V===""||F==="")&&(K=!1);K&&(D.diagnostics={runnable:A,programLog:I,vertexShader:{log:V,prefix:m},fragmentShader:{log:F,prefix:p}})}i.deleteShader(y),i.deleteShader(T),P=new Vc(i,g),S=ME(i,g)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,mE)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=T,this}let UE=0;class FE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new kE(e),t.set(e,n)),n}}class kE{constructor(e){this.id=UE++,this.code=e,this.usedTimes=0}}function BE(r,e,t,n,i,s,o){const a=new x_,l=new FE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,D,I,V){const F=I.fog,A=V.geometry,K=S.isMeshStandardMaterial?I.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||K),q=J&&J.mapping===bu?J.image.height:null,fe=_[S.type];S.precision!==null&&(h=i.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const O=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,Y=O!==void 0?O.length:0;let $e=0;A.morphAttributes.position!==void 0&&($e=1),A.morphAttributes.normal!==void 0&&($e=2),A.morphAttributes.color!==void 0&&($e=3);let Se,j,ae,Me;if(fe){const Ne=ir[fe];Se=Ne.vertexShader,j=Ne.fragmentShader}else Se=S.vertexShader,j=S.fragmentShader,l.update(S),ae=l.getVertexShaderID(S),Me=l.getFragmentShaderID(S);const me=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),rt=V.isInstancedMesh===!0,ye=V.isBatchedMesh===!0,dt=!!S.map,mt=!!S.matcap,ze=!!J,U=!!S.aoMap,ht=!!S.lightMap,ct=!!S.bumpMap,$=!!S.normalMap,Fe=!!S.displacementMap,ft=!!S.emissiveMap,Ve=!!S.metalnessMap,ke=!!S.roughnessMap,Nt=S.anisotropy>0,L=S.clearcoat>0,C=S.dispersion>0,X=S.iridescence>0,ne=S.sheen>0,ie=S.transmission>0,Q=Nt&&!!S.anisotropyMap,xe=L&&!!S.clearcoatMap,ve=L&&!!S.clearcoatNormalMap,Ge=L&&!!S.clearcoatRoughnessMap,re=X&&!!S.iridescenceMap,le=X&&!!S.iridescenceThicknessMap,Ee=ne&&!!S.sheenColorMap,Ae=ne&&!!S.sheenRoughnessMap,Je=!!S.specularMap,be=!!S.specularColorMap,Te=!!S.specularIntensityMap,N=ie&&!!S.transmissionMap,pe=ie&&!!S.thicknessMap,ce=!!S.gradientMap,Re=!!S.alphaMap,de=S.alphaTest>0,oe=!!S.alphaHash,He=!!S.extensions;let We=fs;S.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(We=r.toneMapping);const Lt={shaderID:fe,shaderType:S.type,shaderName:S.name,vertexShader:Se,fragmentShader:j,defines:S.defines,customVertexShaderID:ae,customFragmentShaderID:Me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:ye,batchingColor:ye&&V._colorsTexture!==null,instancing:rt,instancingColor:rt&&V.instanceColor!==null,instancingMorph:rt&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ei,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:mt,envMap:ze,envMapMode:ze&&J.mapping,envMapCubeUVHeight:q,aoMap:U,lightMap:ht,bumpMap:ct,normalMap:$,displacementMap:f&&Fe,emissiveMap:ft,normalMapObjectSpace:$&&S.normalMapType===ky,normalMapTangentSpace:$&&S.normalMapType===g_,metalnessMap:Ve,roughnessMap:ke,anisotropy:Nt,anisotropyMap:Q,clearcoat:L,clearcoatMap:xe,clearcoatNormalMap:ve,clearcoatRoughnessMap:Ge,dispersion:C,iridescence:X,iridescenceMap:re,iridescenceThicknessMap:le,sheen:ne,sheenColorMap:Ee,sheenRoughnessMap:Ae,specularMap:Je,specularColorMap:be,specularIntensityMap:Te,transmission:ie,transmissionMap:N,thicknessMap:pe,gradientMap:ce,opaque:S.transparent===!1&&S.blending===ds&&S.alphaToCoverage===!1,alphaMap:Re,alphaTest:de,alphaHash:oe,combine:S.combine,mapUv:dt&&g(S.map.channel),aoMapUv:U&&g(S.aoMap.channel),lightMapUv:ht&&g(S.lightMap.channel),bumpMapUv:ct&&g(S.bumpMap.channel),normalMapUv:$&&g(S.normalMap.channel),displacementMapUv:Fe&&g(S.displacementMap.channel),emissiveMapUv:ft&&g(S.emissiveMap.channel),metalnessMapUv:Ve&&g(S.metalnessMap.channel),roughnessMapUv:ke&&g(S.roughnessMap.channel),anisotropyMapUv:Q&&g(S.anisotropyMap.channel),clearcoatMapUv:xe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&g(S.sheenRoughnessMap.channel),specularMapUv:Je&&g(S.specularMap.channel),specularColorMapUv:be&&g(S.specularColorMap.channel),specularIntensityMapUv:Te&&g(S.specularIntensityMap.channel),transmissionMapUv:N&&g(S.transmissionMap.channel),thicknessMapUv:pe&&g(S.thicknessMap.channel),alphaMapUv:Re&&g(S.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&($||Nt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!A.attributes.uv&&(dt||Re),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:we,skinning:V.isSkinnedMesh===!0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:$e,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:We,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&Ot.getTransfer(S.map.colorSpace)===Yt,decodeVideoTextureEmissive:ft&&S.emissiveMap.isVideoTexture===!0&&Ot.getTransfer(S.emissiveMap.colorSpace)===Yt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Di,flipSided:S.side===si,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:He&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&S.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const D in S.defines)M.push(D),M.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(w(M,S),x(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function w(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const M=_[S.type];let D;if(M){const I=ir[M];D=Lx.clone(I.uniforms)}else D=S.uniforms;return D}function y(S,M){let D;for(let I=0,V=u.length;I<V;I++){const F=u[I];if(F.cacheKey===M){D=F,++D.usedTimes;break}}return D===void 0&&(D=new NE(r,M,S,s),u.push(D)),D}function T(S){if(--S.usedTimes===0){const M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function E(S){l.remove(S)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:y,releaseProgram:T,releaseShaderCache:E,programs:u,dispose:P}}function zE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function HE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Im(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Om(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||HE),n.length>1&&n.sort(f||Im),i.length>1&&i.sort(f||Im)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function VE(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Om,r.set(n,[o])):i>=s.length?(o=new Om,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function GE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Ze};break;case"SpotLight":t={position:new G,direction:new G,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function WE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let XE=0;function qE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function YE(r){const e=new GE,t=WE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const i=new G,s=new vt,o=new vt;function a(c){let u=0,d=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,w=0,x=0,v=0,y=0,T=0,E=0;c.sort(qE);for(let S=0,M=c.length;S<M;S++){const D=c[S],I=D.color,V=D.intensity,F=D.distance,A=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=I.r*V,d+=I.g*V,f+=I.b*V;else if(D.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(D.sh.coefficients[K],V);E++}else if(D.isDirectionalLight){const K=e.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,q=t.get(D);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.directionalShadow[h]=q,n.directionalShadowMap[h]=A,n.directionalShadowMatrix[h]=D.shadow.matrix,w++}n.directional[h]=K,h++}else if(D.isSpotLight){const K=e.get(D);K.position.setFromMatrixPosition(D.matrixWorld),K.color.copy(I).multiplyScalar(V),K.distance=F,K.coneCos=Math.cos(D.angle),K.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),K.decay=D.decay,n.spot[g]=K;const J=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,J.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[g]=J.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.spotShadow[g]=q,n.spotShadowMap[g]=A,v++}g++}else if(D.isRectAreaLight){const K=e.get(D);K.color.copy(I).multiplyScalar(V),K.halfWidth.set(D.width*.5,0,0),K.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=K,m++}else if(D.isPointLight){const K=e.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity),K.distance=D.distance,K.decay=D.decay,D.castShadow){const J=D.shadow,q=t.get(D);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,q.shadowCameraNear=J.camera.near,q.shadowCameraFar=J.camera.far,n.pointShadow[_]=q,n.pointShadowMap[_]=A,n.pointShadowMatrix[_]=D.shadow.matrix,x++}n.point[_]=K,_++}else if(D.isHemisphereLight){const K=e.get(D);K.skyColor.copy(D.color).multiplyScalar(V),K.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[p]=K,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==w||P.numPointShadows!==x||P.numSpotShadows!==v||P.numSpotMaps!==y||P.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=w,P.numPointShadows=x,P.numSpotShadows=v,P.numSpotMaps=y,P.numLightProbes=E,n.version=XE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Nm(r){const e=new YE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function jE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Nm(r),e.set(i,[a])):s>=o.length?(a=new Nm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const $E=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KE=`uniform sampler2D shadow_pass;
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
}`;function ZE(r,e,t){let n=new Th;const i=new Pt,s=new Pt,o=new Ft,a=new jx({depthPacking:Fy}),l=new $x,c={},u=t.maxTextureSize,d={[Br]:si,[si]:Br,[Di]:Di},f=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:$E,fragmentShader:KE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new ki;_.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Jn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=r_;let p=this.type;this.render=function(T,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),I=r.state;I.setBlending(us),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const V=p!==Mr&&this.type===Mr,F=p===Mr&&this.type!==Mr;for(let A=0,K=T.length;A<K;A++){const J=T[A],q=J.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const fe=q.getFrameExtents();if(i.multiply(fe),s.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/fe.x),i.x=s.x*fe.x,q.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/fe.y),i.y=s.y*fe.y,q.mapSize.y=s.y)),q.map===null||V===!0||F===!0){const Y=this.type!==Mr?{minFilter:Qn,magFilter:Qn}:{};q.map!==null&&q.map.dispose(),q.map=new so(i.x,i.y,Y),q.map.texture.name=J.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const O=q.getViewportCount();for(let Y=0;Y<O;Y++){const $e=q.getViewport(Y);o.set(s.x*$e.x,s.y*$e.y,s.x*$e.z,s.y*$e.w),I.viewport(o),q.updateMatrices(J,Y),n=q.getFrustum(),v(E,P,q.camera,J,this.type)}q.isPointLightShadow!==!0&&this.type===Mr&&w(q,P),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(S,M,D)};function w(T,E){const P=e.update(g);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new so(i.x,i.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(E,null,P,f,g,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(E,null,P,h,g,null)}function x(T,E,P,S){let M=null;const D=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)M=D;else if(M=P.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const I=M.uuid,V=E.uuid;let F=c[I];F===void 0&&(F={},c[I]=F);let A=F[V];A===void 0&&(A=M.clone(),F[V]=A,E.addEventListener("dispose",y)),M=A}if(M.visible=E.visible,M.wireframe=E.wireframe,S===Mr?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:d[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=r.properties.get(M);I.light=P}return M}function v(T,E,P,S,M){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Mr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const V=e.update(T),F=T.material;if(Array.isArray(F)){const A=V.groups;for(let K=0,J=A.length;K<J;K++){const q=A[K],fe=F[q.materialIndex];if(fe&&fe.visible){const O=x(T,fe,S,M);T.onBeforeShadow(r,T,E,P,V,O,q),r.renderBufferDirect(P,null,V,O,T,q),T.onAfterShadow(r,T,E,P,V,O,q)}}}else if(F.visible){const A=x(T,F,S,M);T.onBeforeShadow(r,T,E,P,V,A,null),r.renderBufferDirect(P,null,V,A,T,null),T.onAfterShadow(r,T,E,P,V,A,null)}}const I=T.children;for(let V=0,F=I.length;V<F;V++)v(I[V],E,P,S,M)}function y(T){T.target.removeEventListener("dispose",y);for(const P in c){const S=c[P],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const JE={[kd]:Bd,[zd]:Gd,[Hd]:Wd,[ra]:Vd,[Bd]:kd,[Gd]:zd,[Wd]:Hd,[Vd]:ra};function QE(r,e){function t(){let N=!1;const pe=new Ft;let ce=null;const Re=new Ft(0,0,0,0);return{setMask:function(de){ce!==de&&!N&&(r.colorMask(de,de,de,de),ce=de)},setLocked:function(de){N=de},setClear:function(de,oe,He,We,Lt){Lt===!0&&(de*=We,oe*=We,He*=We),pe.set(de,oe,He,We),Re.equals(pe)===!1&&(r.clearColor(de,oe,He,We),Re.copy(pe))},reset:function(){N=!1,ce=null,Re.set(-1,0,0,0)}}}function n(){let N=!1,pe=!1,ce=null,Re=null,de=null;return{setReversed:function(oe){if(pe!==oe){const He=e.get("EXT_clip_control");oe?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const We=de;de=null,this.setClear(We)}},getReversed:function(){return pe},setTest:function(oe){oe?me(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(oe){ce!==oe&&!N&&(r.depthMask(oe),ce=oe)},setFunc:function(oe){if(pe&&(oe=JE[oe]),Re!==oe){switch(oe){case kd:r.depthFunc(r.NEVER);break;case Bd:r.depthFunc(r.ALWAYS);break;case zd:r.depthFunc(r.LESS);break;case ra:r.depthFunc(r.LEQUAL);break;case Hd:r.depthFunc(r.EQUAL);break;case Vd:r.depthFunc(r.GEQUAL);break;case Gd:r.depthFunc(r.GREATER);break;case Wd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Re=oe}},setLocked:function(oe){N=oe},setClear:function(oe){de!==oe&&(pe&&(oe=1-oe),r.clearDepth(oe),de=oe)},reset:function(){N=!1,ce=null,Re=null,de=null,pe=!1}}}function i(){let N=!1,pe=null,ce=null,Re=null,de=null,oe=null,He=null,We=null,Lt=null;return{setTest:function(Ne){N||(Ne?me(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(Ne){pe!==Ne&&!N&&(r.stencilMask(Ne),pe=Ne)},setFunc:function(Ne,De,nt){(ce!==Ne||Re!==De||de!==nt)&&(r.stencilFunc(Ne,De,nt),ce=Ne,Re=De,de=nt)},setOp:function(Ne,De,nt){(oe!==Ne||He!==De||We!==nt)&&(r.stencilOp(Ne,De,nt),oe=Ne,He=De,We=nt)},setLocked:function(Ne){N=Ne},setClear:function(Ne){Lt!==Ne&&(r.clearStencil(Ne),Lt=Ne)},reset:function(){N=!1,pe=null,ce=null,Re=null,de=null,oe=null,He=null,We=null,Lt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,w=null,x=null,v=null,y=null,T=null,E=new Ze(0,0,0),P=0,S=!1,M=null,D=null,I=null,V=null,F=null;const A=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,J=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=J>=1):q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=J>=2);let fe=null,O={};const Y=r.getParameter(r.SCISSOR_BOX),$e=r.getParameter(r.VIEWPORT),Se=new Ft().fromArray(Y),j=new Ft().fromArray($e);function ae(N,pe,ce,Re){const de=new Uint8Array(4),oe=r.createTexture();r.bindTexture(N,oe),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let He=0;He<ce;He++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(pe,0,r.RGBA,1,1,Re,0,r.RGBA,r.UNSIGNED_BYTE,de):r.texImage2D(pe+He,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,de);return oe}const Me={};Me[r.TEXTURE_2D]=ae(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=ae(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=ae(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=ae(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),me(r.DEPTH_TEST),o.setFunc(ra),ct(!1),$(yp),me(r.CULL_FACE),U(us);function me(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function we(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function rt(N,pe){return d[N]!==pe?(r.bindFramebuffer(N,pe),d[N]=pe,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=pe),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=pe),!0):!1}function ye(N,pe){let ce=h,Re=!1;if(N){ce=f.get(pe),ce===void 0&&(ce=[],f.set(pe,ce));const de=N.textures;if(ce.length!==de.length||ce[0]!==r.COLOR_ATTACHMENT0){for(let oe=0,He=de.length;oe<He;oe++)ce[oe]=r.COLOR_ATTACHMENT0+oe;ce.length=de.length,Re=!0}}else ce[0]!==r.BACK&&(ce[0]=r.BACK,Re=!0);Re&&r.drawBuffers(ce)}function dt(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const mt={[Vs]:r.FUNC_ADD,[ay]:r.FUNC_SUBTRACT,[ly]:r.FUNC_REVERSE_SUBTRACT};mt[cy]=r.MIN,mt[uy]=r.MAX;const ze={[dy]:r.ZERO,[fy]:r.ONE,[hy]:r.SRC_COLOR,[Ud]:r.SRC_ALPHA,[yy]:r.SRC_ALPHA_SATURATE,[_y]:r.DST_COLOR,[my]:r.DST_ALPHA,[py]:r.ONE_MINUS_SRC_COLOR,[Fd]:r.ONE_MINUS_SRC_ALPHA,[vy]:r.ONE_MINUS_DST_COLOR,[gy]:r.ONE_MINUS_DST_ALPHA,[xy]:r.CONSTANT_COLOR,[by]:r.ONE_MINUS_CONSTANT_COLOR,[Sy]:r.CONSTANT_ALPHA,[wy]:r.ONE_MINUS_CONSTANT_ALPHA};function U(N,pe,ce,Re,de,oe,He,We,Lt,Ne){if(N===us){g===!0&&(we(r.BLEND),g=!1);return}if(g===!1&&(me(r.BLEND),g=!0),N!==oy){if(N!==m||Ne!==S){if((p!==Vs||v!==Vs)&&(r.blendEquation(r.FUNC_ADD),p=Vs,v=Vs),Ne)switch(N){case ds:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case eu:r.blendFunc(r.ONE,r.ONE);break;case xp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case bp:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ds:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case eu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case xp:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bp:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}w=null,x=null,y=null,T=null,E.set(0,0,0),P=0,m=N,S=Ne}return}de=de||pe,oe=oe||ce,He=He||Re,(pe!==p||de!==v)&&(r.blendEquationSeparate(mt[pe],mt[de]),p=pe,v=de),(ce!==w||Re!==x||oe!==y||He!==T)&&(r.blendFuncSeparate(ze[ce],ze[Re],ze[oe],ze[He]),w=ce,x=Re,y=oe,T=He),(We.equals(E)===!1||Lt!==P)&&(r.blendColor(We.r,We.g,We.b,Lt),E.copy(We),P=Lt),m=N,S=!1}function ht(N,pe){N.side===Di?we(r.CULL_FACE):me(r.CULL_FACE);let ce=N.side===si;pe&&(ce=!ce),ct(ce),N.blending===ds&&N.transparent===!1?U(us):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Re=N.stencilWrite;a.setTest(Re),Re&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ft(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?me(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function ct(N){M!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),M=N)}function $(N){N!==iy?(me(r.CULL_FACE),N!==D&&(N===yp?r.cullFace(r.BACK):N===ry?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),D=N}function Fe(N){N!==I&&(K&&r.lineWidth(N),I=N)}function ft(N,pe,ce){N?(me(r.POLYGON_OFFSET_FILL),(V!==pe||F!==ce)&&(r.polygonOffset(pe,ce),V=pe,F=ce)):we(r.POLYGON_OFFSET_FILL)}function Ve(N){N?me(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function ke(N){N===void 0&&(N=r.TEXTURE0+A-1),fe!==N&&(r.activeTexture(N),fe=N)}function Nt(N,pe,ce){ce===void 0&&(fe===null?ce=r.TEXTURE0+A-1:ce=fe);let Re=O[ce];Re===void 0&&(Re={type:void 0,texture:void 0},O[ce]=Re),(Re.type!==N||Re.texture!==pe)&&(fe!==ce&&(r.activeTexture(ce),fe=ce),r.bindTexture(N,pe||Me[N]),Re.type=N,Re.texture=pe)}function L(){const N=O[fe];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function C(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(N){Se.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Se.copy(N))}function Ae(N){j.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),j.copy(N))}function Je(N,pe){let ce=c.get(pe);ce===void 0&&(ce=new WeakMap,c.set(pe,ce));let Re=ce.get(N);Re===void 0&&(Re=r.getUniformBlockIndex(pe,N.name),ce.set(N,Re))}function be(N,pe){const Re=c.get(pe).get(N);l.get(pe)!==Re&&(r.uniformBlockBinding(pe,Re,N.__bindingPointIndex),l.set(pe,Re))}function Te(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},fe=null,O={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,w=null,x=null,v=null,y=null,T=null,E=new Ze(0,0,0),P=0,S=!1,M=null,D=null,I=null,V=null,F=null,Se.set(0,0,r.canvas.width,r.canvas.height),j.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:me,disable:we,bindFramebuffer:rt,drawBuffers:ye,useProgram:dt,setBlending:U,setMaterial:ht,setFlipSided:ct,setCullFace:$,setLineWidth:Fe,setPolygonOffset:ft,setScissorTest:Ve,activeTexture:ke,bindTexture:Nt,unbindTexture:L,compressedTexImage2D:C,compressedTexImage3D:X,texImage2D:re,texImage3D:le,updateUBOMapping:Je,uniformBlockBinding:be,texStorage2D:ve,texStorage3D:Ge,texSubImage2D:ne,texSubImage3D:ie,compressedTexSubImage2D:Q,compressedTexSubImage3D:xe,scissor:Ee,viewport:Ae,reset:Te}}function eT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,C){return h?new OffscreenCanvas(L,C):Tl("canvas")}function g(L,C,X){let ne=1;const ie=Nt(L);if((ie.width>X||ie.height>X)&&(ne=X/Math.max(ie.width,ie.height)),ne<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor(ne*ie.width),xe=Math.floor(ne*ie.height);d===void 0&&(d=_(Q,xe));const ve=C?_(Q,xe):d;return ve.width=Q,ve.height=xe,ve.getContext("2d").drawImage(L,0,0,Q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Q+"x"+xe+")."),ve}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){r.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(L,C,X,ne,ie=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=C;if(C===r.RED&&(X===r.FLOAT&&(Q=r.R32F),X===r.HALF_FLOAT&&(Q=r.R16F),X===r.UNSIGNED_BYTE&&(Q=r.R8)),C===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.R8UI),X===r.UNSIGNED_SHORT&&(Q=r.R16UI),X===r.UNSIGNED_INT&&(Q=r.R32UI),X===r.BYTE&&(Q=r.R8I),X===r.SHORT&&(Q=r.R16I),X===r.INT&&(Q=r.R32I)),C===r.RG&&(X===r.FLOAT&&(Q=r.RG32F),X===r.HALF_FLOAT&&(Q=r.RG16F),X===r.UNSIGNED_BYTE&&(Q=r.RG8)),C===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RG8UI),X===r.UNSIGNED_SHORT&&(Q=r.RG16UI),X===r.UNSIGNED_INT&&(Q=r.RG32UI),X===r.BYTE&&(Q=r.RG8I),X===r.SHORT&&(Q=r.RG16I),X===r.INT&&(Q=r.RG32I)),C===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),X===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),X===r.UNSIGNED_INT&&(Q=r.RGB32UI),X===r.BYTE&&(Q=r.RGB8I),X===r.SHORT&&(Q=r.RGB16I),X===r.INT&&(Q=r.RGB32I)),C===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),X===r.UNSIGNED_INT&&(Q=r.RGBA32UI),X===r.BYTE&&(Q=r.RGBA8I),X===r.SHORT&&(Q=r.RGBA16I),X===r.INT&&(Q=r.RGBA32I)),C===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),C===r.RGBA){const xe=ie?nu:Ot.getTransfer(ne);X===r.FLOAT&&(Q=r.RGBA32F),X===r.HALF_FLOAT&&(Q=r.RGBA16F),X===r.UNSIGNED_BYTE&&(Q=xe===Yt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(L,C){let X;return L?C===null||C===ro||C===bl?X=r.DEPTH24_STENCIL8:C===Yi?X=r.DEPTH32F_STENCIL8:C===xl&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===ro||C===bl?X=r.DEPTH_COMPONENT24:C===Yi?X=r.DEPTH_COMPONENT32F:C===xl&&(X=r.DEPTH_COMPONENT16),X}function y(L,C){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Qn&&L.minFilter!==xi?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function T(L){const C=L.target;C.removeEventListener("dispose",T),P(C),C.isVideoTexture&&u.delete(C)}function E(L){const C=L.target;C.removeEventListener("dispose",E),M(C)}function P(L){const C=n.get(L);if(C.__webglInit===void 0)return;const X=L.source,ne=f.get(X);if(ne){const ie=ne[C.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&S(L),Object.keys(ne).length===0&&f.delete(X)}n.remove(L)}function S(L){const C=n.get(L);r.deleteTexture(C.__webglTexture);const X=L.source,ne=f.get(X);delete ne[C.__cacheKey],o.memory.textures--}function M(L){const C=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(C.__webglFramebuffer[ne]))for(let ie=0;ie<C.__webglFramebuffer[ne].length;ie++)r.deleteFramebuffer(C.__webglFramebuffer[ne][ie]);else r.deleteFramebuffer(C.__webglFramebuffer[ne]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[ne])}else{if(Array.isArray(C.__webglFramebuffer))for(let ne=0;ne<C.__webglFramebuffer.length;ne++)r.deleteFramebuffer(C.__webglFramebuffer[ne]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ne=0;ne<C.__webglColorRenderbuffer.length;ne++)C.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[ne]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const X=L.textures;for(let ne=0,ie=X.length;ne<ie;ne++){const Q=n.get(X[ne]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(X[ne])}n.remove(L)}let D=0;function I(){D=0}function V(){const L=D;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),D+=1,L}function F(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function A(L,C){const X=n.get(L);if(L.isVideoTexture&&Ve(L),L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){const ne=L.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Me(X,L,C);return}}t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+C)}function K(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){Me(X,L,C);return}t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+C)}function J(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){Me(X,L,C);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+C)}function q(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){me(X,L,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+C)}const fe={[aa]:r.REPEAT,[ns]:r.CLAMP_TO_EDGE,[tu]:r.MIRRORED_REPEAT},O={[Qn]:r.NEAREST,[a_]:r.NEAREST_MIPMAP_NEAREST,[Ha]:r.NEAREST_MIPMAP_LINEAR,[xi]:r.LINEAR,[Uc]:r.LINEAR_MIPMAP_NEAREST,[Pr]:r.LINEAR_MIPMAP_LINEAR},Y={[By]:r.NEVER,[Xy]:r.ALWAYS,[zy]:r.LESS,[__]:r.LEQUAL,[Hy]:r.EQUAL,[Wy]:r.GEQUAL,[Vy]:r.GREATER,[Gy]:r.NOTEQUAL};function $e(L,C){if(C.type===Yi&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===xi||C.magFilter===Uc||C.magFilter===Ha||C.magFilter===Pr||C.minFilter===xi||C.minFilter===Uc||C.minFilter===Ha||C.minFilter===Pr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,fe[C.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,fe[C.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,fe[C.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,O[C.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,O[C.minFilter]),C.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,Y[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Qn||C.minFilter!==Ha&&C.minFilter!==Pr||C.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Se(L,C){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",T));const ne=C.source;let ie=f.get(ne);ie===void 0&&(ie={},f.set(ne,ie));const Q=F(C);if(Q!==L.__cacheKey){ie[Q]===void 0&&(ie[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ie[Q].usedTimes++;const xe=ie[L.__cacheKey];xe!==void 0&&(ie[L.__cacheKey].usedTimes--,xe.usedTimes===0&&S(C)),L.__cacheKey=Q,L.__webglTexture=ie[Q].texture}return X}function j(L,C,X){return Math.floor(Math.floor(L/X)/C)}function ae(L,C,X,ne){const Q=L.updateRanges;if(Q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,C.width,C.height,X,ne,C.data);else{Q.sort((le,Ee)=>le.start-Ee.start);let xe=0;for(let le=1;le<Q.length;le++){const Ee=Q[xe],Ae=Q[le],Je=Ee.start+Ee.count,be=j(Ae.start,C.width,4),Te=j(Ee.start,C.width,4);Ae.start<=Je+1&&be===Te&&j(Ae.start+Ae.count-1,C.width,4)===be?Ee.count=Math.max(Ee.count,Ae.start+Ae.count-Ee.start):(++xe,Q[xe]=Ae)}Q.length=xe+1;const ve=r.getParameter(r.UNPACK_ROW_LENGTH),Ge=r.getParameter(r.UNPACK_SKIP_PIXELS),re=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,C.width);for(let le=0,Ee=Q.length;le<Ee;le++){const Ae=Q[le],Je=Math.floor(Ae.start/4),be=Math.ceil(Ae.count/4),Te=Je%C.width,N=Math.floor(Je/C.width),pe=be,ce=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Te),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Te,N,pe,ce,X,ne,C.data)}L.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ve),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,re)}}function Me(L,C,X){let ne=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ne=r.TEXTURE_3D);const ie=Se(L,C),Q=C.source;t.bindTexture(ne,L.__webglTexture,r.TEXTURE0+X);const xe=n.get(Q);if(Q.version!==xe.__version||ie===!0){t.activeTexture(r.TEXTURE0+X);const ve=Ot.getPrimaries(Ot.workingColorSpace),Ge=C.colorSpace===ts?null:Ot.getPrimaries(C.colorSpace),re=C.colorSpace===ts||ve===Ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let le=g(C.image,!1,i.maxTextureSize);le=ke(C,le);const Ee=s.convert(C.format,C.colorSpace),Ae=s.convert(C.type);let Je=x(C.internalFormat,Ee,Ae,C.colorSpace,C.isVideoTexture);$e(ne,C);let be;const Te=C.mipmaps,N=C.isVideoTexture!==!0,pe=xe.__version===void 0||ie===!0,ce=Q.dataReady,Re=y(C,le);if(C.isDepthTexture)Je=v(C.format===wl,C.type),pe&&(N?t.texStorage2D(r.TEXTURE_2D,1,Je,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Je,le.width,le.height,0,Ee,Ae,null));else if(C.isDataTexture)if(Te.length>0){N&&pe&&t.texStorage2D(r.TEXTURE_2D,Re,Je,Te[0].width,Te[0].height);for(let de=0,oe=Te.length;de<oe;de++)be=Te[de],N?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,be.width,be.height,Ee,Ae,be.data):t.texImage2D(r.TEXTURE_2D,de,Je,be.width,be.height,0,Ee,Ae,be.data);C.generateMipmaps=!1}else N?(pe&&t.texStorage2D(r.TEXTURE_2D,Re,Je,le.width,le.height),ce&&ae(C,le,Ee,Ae)):t.texImage2D(r.TEXTURE_2D,0,Je,le.width,le.height,0,Ee,Ae,le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){N&&pe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Je,Te[0].width,Te[0].height,le.depth);for(let de=0,oe=Te.length;de<oe;de++)if(be=Te[de],C.format!==Ii)if(Ee!==null)if(N){if(ce)if(C.layerUpdates.size>0){const He=dm(be.width,be.height,C.format,C.type);for(const We of C.layerUpdates){const Lt=be.data.subarray(We*He/be.data.BYTES_PER_ELEMENT,(We+1)*He/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,We,be.width,be.height,1,Ee,Lt)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,0,be.width,be.height,le.depth,Ee,be.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,de,Je,be.width,be.height,le.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ce&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,0,be.width,be.height,le.depth,Ee,Ae,be.data):t.texImage3D(r.TEXTURE_2D_ARRAY,de,Je,be.width,be.height,le.depth,0,Ee,Ae,be.data)}else{N&&pe&&t.texStorage2D(r.TEXTURE_2D,Re,Je,Te[0].width,Te[0].height);for(let de=0,oe=Te.length;de<oe;de++)be=Te[de],C.format!==Ii?Ee!==null?N?ce&&t.compressedTexSubImage2D(r.TEXTURE_2D,de,0,0,be.width,be.height,Ee,be.data):t.compressedTexImage2D(r.TEXTURE_2D,de,Je,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,be.width,be.height,Ee,Ae,be.data):t.texImage2D(r.TEXTURE_2D,de,Je,be.width,be.height,0,Ee,Ae,be.data)}else if(C.isDataArrayTexture)if(N){if(pe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Je,le.width,le.height,le.depth),ce)if(C.layerUpdates.size>0){const de=dm(le.width,le.height,C.format,C.type);for(const oe of C.layerUpdates){const He=le.data.subarray(oe*de/le.data.BYTES_PER_ELEMENT,(oe+1)*de/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,oe,le.width,le.height,1,Ee,Ae,He)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ee,Ae,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Je,le.width,le.height,le.depth,0,Ee,Ae,le.data);else if(C.isData3DTexture)N?(pe&&t.texStorage3D(r.TEXTURE_3D,Re,Je,le.width,le.height,le.depth),ce&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ee,Ae,le.data)):t.texImage3D(r.TEXTURE_3D,0,Je,le.width,le.height,le.depth,0,Ee,Ae,le.data);else if(C.isFramebufferTexture){if(pe)if(N)t.texStorage2D(r.TEXTURE_2D,Re,Je,le.width,le.height);else{let de=le.width,oe=le.height;for(let He=0;He<Re;He++)t.texImage2D(r.TEXTURE_2D,He,Je,de,oe,0,Ee,Ae,null),de>>=1,oe>>=1}}else if(Te.length>0){if(N&&pe){const de=Nt(Te[0]);t.texStorage2D(r.TEXTURE_2D,Re,Je,de.width,de.height)}for(let de=0,oe=Te.length;de<oe;de++)be=Te[de],N?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,Ee,Ae,be):t.texImage2D(r.TEXTURE_2D,de,Je,Ee,Ae,be);C.generateMipmaps=!1}else if(N){if(pe){const de=Nt(le);t.texStorage2D(r.TEXTURE_2D,Re,Je,de.width,de.height)}ce&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,Ae,le)}else t.texImage2D(r.TEXTURE_2D,0,Je,Ee,Ae,le);m(C)&&p(ne),xe.__version=Q.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function me(L,C,X){if(C.image.length!==6)return;const ne=Se(L,C),ie=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+X);const Q=n.get(ie);if(ie.version!==Q.__version||ne===!0){t.activeTexture(r.TEXTURE0+X);const xe=Ot.getPrimaries(Ot.workingColorSpace),ve=C.colorSpace===ts?null:Ot.getPrimaries(C.colorSpace),Ge=C.colorSpace===ts||xe===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);const re=C.isCompressedTexture||C.image[0].isCompressedTexture,le=C.image[0]&&C.image[0].isDataTexture,Ee=[];for(let oe=0;oe<6;oe++)!re&&!le?Ee[oe]=g(C.image[oe],!0,i.maxCubemapSize):Ee[oe]=le?C.image[oe].image:C.image[oe],Ee[oe]=ke(C,Ee[oe]);const Ae=Ee[0],Je=s.convert(C.format,C.colorSpace),be=s.convert(C.type),Te=x(C.internalFormat,Je,be,C.colorSpace),N=C.isVideoTexture!==!0,pe=Q.__version===void 0||ne===!0,ce=ie.dataReady;let Re=y(C,Ae);$e(r.TEXTURE_CUBE_MAP,C);let de;if(re){N&&pe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,Te,Ae.width,Ae.height);for(let oe=0;oe<6;oe++){de=Ee[oe].mipmaps;for(let He=0;He<de.length;He++){const We=de[He];C.format!==Ii?Je!==null?N?ce&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He,0,0,We.width,We.height,Je,We.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He,Te,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He,0,0,We.width,We.height,Je,be,We.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He,Te,We.width,We.height,0,Je,be,We.data)}}}else{if(de=C.mipmaps,N&&pe){de.length>0&&Re++;const oe=Nt(Ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,Te,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(le){N?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ee[oe].width,Ee[oe].height,Je,be,Ee[oe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Te,Ee[oe].width,Ee[oe].height,0,Je,be,Ee[oe].data);for(let He=0;He<de.length;He++){const Lt=de[He].image[oe].image;N?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He+1,0,0,Lt.width,Lt.height,Je,be,Lt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He+1,Te,Lt.width,Lt.height,0,Je,be,Lt.data)}}else{N?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Je,be,Ee[oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Te,Je,be,Ee[oe]);for(let He=0;He<de.length;He++){const We=de[He];N?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He+1,0,0,Je,be,We.image[oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,He+1,Te,Je,be,We.image[oe])}}}m(C)&&p(r.TEXTURE_CUBE_MAP),Q.__version=ie.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function we(L,C,X,ne,ie,Q){const xe=s.convert(X.format,X.colorSpace),ve=s.convert(X.type),Ge=x(X.internalFormat,xe,ve,X.colorSpace),re=n.get(C),le=n.get(X);if(le.__renderTarget=C,!re.__hasExternalTextures){const Ee=Math.max(1,C.width>>Q),Ae=Math.max(1,C.height>>Q);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,Q,Ge,Ee,Ae,C.depth,0,xe,ve,null):t.texImage2D(ie,Q,Ge,Ee,Ae,0,xe,ve,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),ft(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ie,le.__webglTexture,0,Fe(C)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ie,le.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(L,C,X){if(r.bindRenderbuffer(r.RENDERBUFFER,L),C.depthBuffer){const ne=C.depthTexture,ie=ne&&ne.isDepthTexture?ne.type:null,Q=v(C.stencilBuffer,ie),xe=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=Fe(C);ft(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,Q,C.width,C.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,Q,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Q,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,L)}else{const ne=C.textures;for(let ie=0;ie<ne.length;ie++){const Q=ne[ie],xe=s.convert(Q.format,Q.colorSpace),ve=s.convert(Q.type),Ge=x(Q.internalFormat,xe,ve,Q.colorSpace),re=Fe(C);X&&ft(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,re,Ge,C.width,C.height):ft(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,Ge,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Ge,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ye(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(C.depthTexture);ne.__renderTarget=C,(!ne.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),A(C.depthTexture,0);const ie=ne.__webglTexture,Q=Fe(C);if(C.depthTexture.format===Sl)ft(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(C.depthTexture.format===wl)ft(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function dt(L){const C=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==L.depthTexture){const ne=L.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ne){const ie=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ne.removeEventListener("dispose",ie)};ne.addEventListener("dispose",ie),C.__depthDisposeCallback=ie}C.__boundDepthTexture=ne}if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const ne=L.texture.mipmaps;ne&&ne.length>0?ye(C.__webglFramebuffer[0],L):ye(C.__webglFramebuffer,L)}else if(X){C.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[ne]),C.__webglDepthbuffer[ne]===void 0)C.__webglDepthbuffer[ne]=r.createRenderbuffer(),rt(C.__webglDepthbuffer[ne],L,!1);else{const ie=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=C.__webglDepthbuffer[ne];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}else{const ne=L.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),rt(C.__webglDepthbuffer,L,!1);else{const ie=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function mt(L,C,X){const ne=n.get(L);C!==void 0&&we(ne.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&dt(L)}function ze(L){const C=L.texture,X=n.get(L),ne=n.get(C);L.addEventListener("dispose",E);const ie=L.textures,Q=L.isWebGLCubeRenderTarget===!0,xe=ie.length>1;if(xe||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=C.version,o.memory.textures++),Q){X.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[ve]=[];for(let Ge=0;Ge<C.mipmaps.length;Ge++)X.__webglFramebuffer[ve][Ge]=r.createFramebuffer()}else X.__webglFramebuffer[ve]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let ve=0;ve<C.mipmaps.length;ve++)X.__webglFramebuffer[ve]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ve=0,Ge=ie.length;ve<Ge;ve++){const re=n.get(ie[ve]);re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture(),o.memory.textures++)}if(L.samples>0&&ft(L)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ve=0;ve<ie.length;ve++){const Ge=ie[ve];X.__webglColorRenderbuffer[ve]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[ve]);const re=s.convert(Ge.format,Ge.colorSpace),le=s.convert(Ge.type),Ee=x(Ge.internalFormat,re,le,Ge.colorSpace,L.isXRRenderTarget===!0),Ae=Fe(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ae,Ee,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,X.__webglColorRenderbuffer[ve])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),rt(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),$e(r.TEXTURE_CUBE_MAP,C);for(let ve=0;ve<6;ve++)if(C.mipmaps&&C.mipmaps.length>0)for(let Ge=0;Ge<C.mipmaps.length;Ge++)we(X.__webglFramebuffer[ve][Ge],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ge);else we(X.__webglFramebuffer[ve],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(C)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ve=0,Ge=ie.length;ve<Ge;ve++){const re=ie[ve],le=n.get(re);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),$e(r.TEXTURE_2D,re),we(X.__webglFramebuffer,L,re,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,0),m(re)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ve=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ve=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ve,ne.__webglTexture),$e(ve,C),C.mipmaps&&C.mipmaps.length>0)for(let Ge=0;Ge<C.mipmaps.length;Ge++)we(X.__webglFramebuffer[Ge],L,C,r.COLOR_ATTACHMENT0,ve,Ge);else we(X.__webglFramebuffer,L,C,r.COLOR_ATTACHMENT0,ve,0);m(C)&&p(ve),t.unbindTexture()}L.depthBuffer&&dt(L)}function U(L){const C=L.textures;for(let X=0,ne=C.length;X<ne;X++){const ie=C[X];if(m(ie)){const Q=w(L),xe=n.get(ie).__webglTexture;t.bindTexture(Q,xe),p(Q),t.unbindTexture()}}}const ht=[],ct=[];function $(L){if(L.samples>0){if(ft(L)===!1){const C=L.textures,X=L.width,ne=L.height;let ie=r.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(L),ve=C.length>1;if(ve)for(let re=0;re<C.length;re++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const Ge=L.texture.mipmaps;Ge&&Ge.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let re=0;re<C.length;re++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),ve){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[re]);const le=n.get(C[re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,X,ne,0,0,X,ne,ie,r.NEAREST),l===!0&&(ht.length=0,ct.length=0,ht.push(r.COLOR_ATTACHMENT0+re),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ht.push(Q),ct.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ct)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ve)for(let re=0;re<C.length;re++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,xe.__webglColorRenderbuffer[re]);const le=n.get(C[re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const C=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function Fe(L){return Math.min(i.maxSamples,L.samples)}function ft(L){const C=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Ve(L){const C=o.render.frame;u.get(L)!==C&&(u.set(L,C),L.update())}function ke(L,C){const X=L.colorSpace,ne=L.format,ie=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==ei&&X!==ts&&(Ot.getTransfer(X)===Yt?(ne!==Ii||ie!==fr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),C}function Nt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=I,this.setTexture2D=A,this.setTexture2DArray=K,this.setTexture3D=J,this.setTextureCube=q,this.rebindTextures=mt,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=ft}function tT(r,e){function t(n,i=ts){let s;const o=Ot.getTransfer(i);if(n===fr)return r.UNSIGNED_BYTE;if(n===gh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===_h)return r.UNSIGNED_SHORT_5_5_5_1;if(n===u_)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===l_)return r.BYTE;if(n===c_)return r.SHORT;if(n===xl)return r.UNSIGNED_SHORT;if(n===mh)return r.INT;if(n===ro)return r.UNSIGNED_INT;if(n===Yi)return r.FLOAT;if(n===Bl)return r.HALF_FLOAT;if(n===d_)return r.ALPHA;if(n===f_)return r.RGB;if(n===Ii)return r.RGBA;if(n===Sl)return r.DEPTH_COMPONENT;if(n===wl)return r.DEPTH_STENCIL;if(n===vh)return r.RED;if(n===yh)return r.RED_INTEGER;if(n===h_)return r.RG;if(n===xh)return r.RG_INTEGER;if(n===bh)return r.RGBA_INTEGER;if(n===Fc||n===kc||n===Bc||n===zc)if(o===Yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Fc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Fc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yd||n===jd||n===$d||n===Kd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Yd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$d)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Kd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zd||n===Jd||n===Qd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Zd||n===Jd)return o===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Qd)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ef||n===tf||n===nf||n===rf||n===sf||n===of||n===af||n===lf||n===cf||n===uf||n===df||n===ff||n===hf||n===pf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ef)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===of)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===af)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===lf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===cf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===df)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ff)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hc||n===mf||n===gf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Hc)return o===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===mf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===p_||n===_f||n===vf||n===yf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Hc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===_f)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===vf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bl?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const nT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iT=`
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

}`;class rT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new xn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Oi({vertexShader:nT,fragmentShader:iT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jn(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sT extends xa{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new rT,m=t.getContextAttributes();let p=null,w=null;const x=[],v=[],y=new Pt;let T=null;const E=new ri;E.viewport=new Ft;const P=new ri;P.viewport=new Ft;const S=[E,P],M=new _b;let D=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ae=x[j];return ae===void 0&&(ae=new ed,x[j]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(j){let ae=x[j];return ae===void 0&&(ae=new ed,x[j]=ae),ae.getGripSpace()},this.getHand=function(j){let ae=x[j];return ae===void 0&&(ae=new ed,x[j]=ae),ae.getHandSpace()};function V(j){const ae=v.indexOf(j.inputSource);if(ae===-1)return;const Me=x[ae];Me!==void 0&&(Me.update(j.inputSource,j.frame,c||o),Me.dispatchEvent({type:j.type,data:j.inputSource}))}function F(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",A);for(let j=0;j<x.length;j++){const ae=v[j];ae!==null&&(v[j]=null,x[j].disconnect(ae))}D=null,I=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,w=null,Se.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",F),i.addEventListener("inputsourceschange",A),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(y),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,me=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=m.stencil?wl:Sl,me=m.stencil?bl:ro);const rt={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(rt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),w=new so(f.textureWidth,f.textureHeight,{format:Ii,type:fr,depthTexture:new L_(f.textureWidth,f.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),w=new so(h.framebufferWidth,h.framebufferHeight,{format:Ii,type:fr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Se.setContext(i),Se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function A(j){for(let ae=0;ae<j.removed.length;ae++){const Me=j.removed[ae],me=v.indexOf(Me);me>=0&&(v[me]=null,x[me].disconnect(Me))}for(let ae=0;ae<j.added.length;ae++){const Me=j.added[ae];let me=v.indexOf(Me);if(me===-1){for(let rt=0;rt<x.length;rt++)if(rt>=v.length){v.push(Me),me=rt;break}else if(v[rt]===null){v[rt]=Me,me=rt;break}if(me===-1)break}const we=x[me];we&&we.connect(Me)}}const K=new G,J=new G;function q(j,ae,Me){K.setFromMatrixPosition(ae.matrixWorld),J.setFromMatrixPosition(Me.matrixWorld);const me=K.distanceTo(J),we=ae.projectionMatrix.elements,rt=Me.projectionMatrix.elements,ye=we[14]/(we[10]-1),dt=we[14]/(we[10]+1),mt=(we[9]+1)/we[5],ze=(we[9]-1)/we[5],U=(we[8]-1)/we[0],ht=(rt[8]+1)/rt[0],ct=ye*U,$=ye*ht,Fe=me/(-U+ht),ft=Fe*-U;if(ae.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ft),j.translateZ(Fe),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ae.projectionMatrix),j.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Ve=ye+Fe,ke=dt+Fe,Nt=ct-ft,L=$+(me-ft),C=mt*dt/ke*Ve,X=ze*dt/ke*Ve;j.projectionMatrix.makePerspective(Nt,L,C,X,Ve,ke),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function fe(j,ae){ae===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ae.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ae=j.near,Me=j.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),M.near=P.near=E.near=ae,M.far=P.far=E.far=Me,(D!==M.near||I!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,I=M.far),E.layers.mask=j.layers.mask|2,P.layers.mask=j.layers.mask|4,M.layers.mask=E.layers.mask|P.layers.mask;const me=j.parent,we=M.cameras;fe(M,me);for(let rt=0;rt<we.length;rt++)fe(we[rt],me);we.length===2?q(M,E,P):M.projectionMatrix.copy(E.projectionMatrix),O(j,M,me)};function O(j,ae,Me){Me===null?j.matrix.copy(ae.matrixWorld):(j.matrix.copy(Me.matrixWorld),j.matrix.invert(),j.matrix.multiply(ae.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ae.projectionMatrix),j.projectionMatrixInverse.copy(ae.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=la*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let Y=null;function $e(j,ae){if(u=ae.getViewerPose(c||o),_=ae,u!==null){const Me=u.views;h!==null&&(e.setRenderTargetFramebuffer(w,h.framebuffer),e.setRenderTarget(w));let me=!1;Me.length!==M.cameras.length&&(M.cameras.length=0,me=!0);for(let ye=0;ye<Me.length;ye++){const dt=Me[ye];let mt=null;if(h!==null)mt=h.getViewport(dt);else{const U=d.getViewSubImage(f,dt);mt=U.viewport,ye===0&&(e.setRenderTargetTextures(w,U.colorTexture,U.depthStencilTexture),e.setRenderTarget(w))}let ze=S[ye];ze===void 0&&(ze=new ri,ze.layers.enable(ye),ze.viewport=new Ft,S[ye]=ze),ze.matrix.fromArray(dt.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(dt.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(mt.x,mt.y,mt.width,mt.height),ye===0&&(M.matrix.copy(ze.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),me===!0&&M.cameras.push(ze)}const we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const ye=d.getDepthInformation(Me[0]);ye&&ye.isValid&&ye.texture&&g.init(e,ye,i.renderState)}}for(let Me=0;Me<x.length;Me++){const me=v[Me],we=x[Me];me!==null&&we!==void 0&&we.update(me,ae,c||o)}Y&&Y(j,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),_=null}const Se=new U_;Se.setAnimationLoop($e),this.setAnimationLoop=function(j){Y=j},this.dispose=function(){}}}const Ls=new hr,oT=new vt;function aT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,M_(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,w,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,w,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===si&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===si&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),x=w.envMap,v=w.envMapRotation;x&&(m.envMap.value=x,Ls.copy(v),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),m.envMapRotation.value.setFromMatrix4(oT.makeRotationFromEuler(Ls)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===si&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function lT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const v=x.program;n.uniformBlockBinding(w,v)}function c(w,x){let v=i[w.id];v===void 0&&(_(w),v=u(w),i[w.id]=v,w.addEventListener("dispose",m));const y=x.program;n.updateUBOMapping(w,y);const T=e.render.frame;s[w.id]!==T&&(f(w),s[w.id]=T)}function u(w){const x=d();w.__bindingPointIndex=x;const v=r.createBuffer(),y=w.__size,T=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,y,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const x=i[w.id],v=w.uniforms,y=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,E=v.length;T<E;T++){const P=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,M=P.length;S<M;S++){const D=P[S];if(h(D,T,S,y)===!0){const I=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let F=0;for(let A=0;A<V.length;A++){const K=V[A],J=g(K);typeof K=="number"||typeof K=="boolean"?(D.__data[0]=K,r.bufferSubData(r.UNIFORM_BUFFER,I+F,D.__data)):K.isMatrix3?(D.__data[0]=K.elements[0],D.__data[1]=K.elements[1],D.__data[2]=K.elements[2],D.__data[3]=0,D.__data[4]=K.elements[3],D.__data[5]=K.elements[4],D.__data[6]=K.elements[5],D.__data[7]=0,D.__data[8]=K.elements[6],D.__data[9]=K.elements[7],D.__data[10]=K.elements[8],D.__data[11]=0):(K.toArray(D.__data,F),F+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(w,x,v,y){const T=w.value,E=x+"_"+v;if(y[E]===void 0)return typeof T=="number"||typeof T=="boolean"?y[E]=T:y[E]=T.clone(),!0;{const P=y[E];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return y[E]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function _(w){const x=w.uniforms;let v=0;const y=16;for(let E=0,P=x.length;E<P;E++){const S=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,D=S.length;M<D;M++){const I=S[M],V=Array.isArray(I.value)?I.value:[I.value];for(let F=0,A=V.length;F<A;F++){const K=V[F],J=g(K),q=v%y,fe=q%J.boundary,O=q+fe;v+=fe,O!==0&&y-O<J.storage&&(v+=y-O),I.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=J.storage}}}const T=v%y;return T>0&&(v+=y-T),w.__size=v,w.__cache={},this}function g(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function m(w){const x=w.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class cT{constructor(e={}){const{canvas:t=cx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const w=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let y=!1;this._outputColorSpace=Dn;let T=0,E=0,P=null,S=-1,M=null;const D=new Ft,I=new Ft;let V=null;const F=new Ze(0);let A=0,K=t.width,J=t.height,q=1,fe=null,O=null;const Y=new Ft(0,0,K,J),$e=new Ft(0,0,K,J);let Se=!1;const j=new Th;let ae=!1,Me=!1;const me=new vt,we=new vt,rt=new G,ye=new Ft,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function ze(){return P===null?q:1}let U=n;function ht(R,H){return t.getContext(R,H)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ph}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",oe,!1),U===null){const H="webgl2";if(U=ht(H,R),U===null)throw ht(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ct,$,Fe,ft,Ve,ke,Nt,L,C,X,ne,ie,Q,xe,ve,Ge,re,le,Ee,Ae,Je,be,Te,N;function pe(){ct=new yM(U),ct.init(),be=new tT(U,ct),$=new fM(U,ct,e,be),Fe=new QE(U,ct),$.reverseDepthBuffer&&f&&Fe.buffers.depth.setReversed(!0),ft=new SM(U),Ve=new zE,ke=new eT(U,ct,Fe,Ve,$,be,ft),Nt=new pM(v),L=new vM(v),C=new Cb(U),Te=new uM(U,C),X=new xM(U,C,ft,Te),ne=new MM(U,X,C,ft),Ee=new wM(U,$,ke),Ge=new hM(Ve),ie=new BE(v,Nt,L,ct,$,Te,Ge),Q=new aT(v,Ve),xe=new VE,ve=new jE(ct),le=new cM(v,Nt,L,Fe,ne,h,l),re=new ZE(v,ne,$),N=new lT(U,ft,$,Fe),Ae=new dM(U,ct,ft),Je=new bM(U,ct,ft),ft.programs=ie.programs,v.capabilities=$,v.extensions=ct,v.properties=Ve,v.renderLists=xe,v.shadowMap=re,v.state=Fe,v.info=ft}pe();const ce=new sT(v,U);this.xr=ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=ct.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ct.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(K,J,!1))},this.getSize=function(R){return R.set(K,J)},this.setSize=function(R,H,Z=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=R,J=H,t.width=Math.floor(R*q),t.height=Math.floor(H*q),Z===!0&&(t.style.width=R+"px",t.style.height=H+"px"),this.setViewport(0,0,R,H)},this.getDrawingBufferSize=function(R){return R.set(K*q,J*q).floor()},this.setDrawingBufferSize=function(R,H,Z){K=R,J=H,q=Z,t.width=Math.floor(R*Z),t.height=Math.floor(H*Z),this.setViewport(0,0,R,H)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(Y)},this.setViewport=function(R,H,Z,W){R.isVector4?Y.set(R.x,R.y,R.z,R.w):Y.set(R,H,Z,W),Fe.viewport(D.copy(Y).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy($e)},this.setScissor=function(R,H,Z,W){R.isVector4?$e.set(R.x,R.y,R.z,R.w):$e.set(R,H,Z,W),Fe.scissor(I.copy($e).multiplyScalar(q).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(R){Fe.setScissorTest(Se=R)},this.setOpaqueSort=function(R){fe=R},this.setTransparentSort=function(R){O=R},this.getClearColor=function(R){return R.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(R=!0,H=!0,Z=!0){let W=0;if(R){let B=!1;if(P!==null){const he=P.texture.format;B=he===bh||he===xh||he===yh}if(B){const he=P.texture.type,ge=he===fr||he===ro||he===xl||he===bl||he===gh||he===_h,qe=le.getClearColor(),Be=le.getClearAlpha(),Qe=qe.r,st=qe.g,Ke=qe.b;ge?(_[0]=Qe,_[1]=st,_[2]=Ke,_[3]=Be,U.clearBufferuiv(U.COLOR,0,_)):(g[0]=Qe,g[1]=st,g[2]=Ke,g[3]=Be,U.clearBufferiv(U.COLOR,0,g))}else W|=U.COLOR_BUFFER_BIT}H&&(W|=U.DEPTH_BUFFER_BIT),Z&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),le.dispose(),xe.dispose(),ve.dispose(),Ve.dispose(),Nt.dispose(),L.dispose(),ne.dispose(),Te.dispose(),N.dispose(),ie.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",Ce),ce.removeEventListener("sessionend",ut),Xe.stop()};function Re(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const R=ft.autoReset,H=re.enabled,Z=re.autoUpdate,W=re.needsUpdate,B=re.type;pe(),ft.autoReset=R,re.enabled=H,re.autoUpdate=Z,re.needsUpdate=W,re.type=B}function oe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function He(R){const H=R.target;H.removeEventListener("dispose",He),We(H)}function We(R){Lt(R),Ve.remove(R)}function Lt(R){const H=Ve.get(R).programs;H!==void 0&&(H.forEach(function(Z){ie.releaseProgram(Z)}),R.isShaderMaterial&&ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,H,Z,W,B,he){H===null&&(H=dt);const ge=B.isMesh&&B.matrixWorld.determinant()<0,qe=Pe(R,H,Z,W,B);Fe.setMaterial(W,ge);let Be=Z.index,Qe=1;if(W.wireframe===!0){if(Be=X.getWireframeAttribute(Z),Be===void 0)return;Qe=2}const st=Z.drawRange,Ke=Z.attributes.position;let pt=st.start*Qe,bt=(st.start+st.count)*Qe;he!==null&&(pt=Math.max(pt,he.start*Qe),bt=Math.min(bt,(he.start+he.count)*Qe)),Be!==null?(pt=Math.max(pt,0),bt=Math.min(bt,Be.count)):Ke!=null&&(pt=Math.max(pt,0),bt=Math.min(bt,Ke.count));const Xt=bt-pt;if(Xt<0||Xt===1/0)return;Te.setup(B,W,qe,Z,Be);let qt,kt=Ae;if(Be!==null&&(qt=C.get(Be),kt=Je,kt.setIndex(qt)),B.isMesh)W.wireframe===!0?(Fe.setLineWidth(W.wireframeLinewidth*ze()),kt.setMode(U.LINES)):kt.setMode(U.TRIANGLES);else if(B.isLine){let at=W.linewidth;at===void 0&&(at=1),Fe.setLineWidth(at*ze()),B.isLineSegments?kt.setMode(U.LINES):B.isLineLoop?kt.setMode(U.LINE_LOOP):kt.setMode(U.LINE_STRIP)}else B.isPoints?kt.setMode(U.POINTS):B.isSprite&&kt.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)qo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),kt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ct.get("WEBGL_multi_draw"))kt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const at=B._multiDrawStarts,jt=B._multiDrawCounts,b=B._multiDrawCount,k=Be?C.get(Be).bytesPerElement:1,z=Ve.get(W).currentProgram.getUniforms();for(let se=0;se<b;se++)z.setValue(U,"_gl_DrawID",se),kt.render(at[se]/k,jt[se])}else if(B.isInstancedMesh)kt.renderInstances(pt,Xt,B.count);else if(Z.isInstancedBufferGeometry){const at=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,jt=Math.min(Z.instanceCount,at);kt.renderInstances(pt,Xt,jt)}else kt.render(pt,Xt)};function Ne(R,H,Z){R.transparent===!0&&R.side===Di&&R.forceSinglePass===!1?(R.side=si,R.needsUpdate=!0,Tt(R,H,Z),R.side=Br,R.needsUpdate=!0,Tt(R,H,Z),R.side=Di):Tt(R,H,Z)}this.compile=function(R,H,Z=null){Z===null&&(Z=R),p=ve.get(Z),p.init(H),x.push(p),Z.traverseVisible(function(B){B.isLight&&B.layers.test(H.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),R!==Z&&R.traverseVisible(function(B){B.isLight&&B.layers.test(H.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const W=new Set;return R.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let ge=0;ge<he.length;ge++){const qe=he[ge];Ne(qe,Z,B),W.add(qe)}else Ne(he,Z,B),W.add(he)}),p=x.pop(),W},this.compileAsync=function(R,H,Z=null){const W=this.compile(R,H,Z);return new Promise(B=>{function he(){if(W.forEach(function(ge){Ve.get(ge).currentProgram.isReady()&&W.delete(ge)}),W.size===0){B(R);return}setTimeout(he,10)}ct.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let De=null;function nt(R){De&&De(R)}function Ce(){Xe.stop()}function ut(){Xe.start()}const Xe=new U_;Xe.setAnimationLoop(nt),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(R){De=R,ce.setAnimationLoop(R),R===null?Xe.stop():Xe.start()},ce.addEventListener("sessionstart",Ce),ce.addEventListener("sessionend",ut),this.render=function(R,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(H),H=ce.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,H,P),p=ve.get(R,x.length),p.init(H),x.push(p),we.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),j.setFromProjectionMatrix(we),Me=this.localClippingEnabled,ae=Ge.init(this.clippingPlanes,Me),m=xe.get(R,w.length),m.init(),w.push(m),ce.enabled===!0&&ce.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&it(he,H,-1/0,v.sortObjects)}it(R,H,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(fe,O),mt=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,mt&&le.addToRenderList(m,R),this.info.render.frame++,ae===!0&&Ge.beginShadows();const Z=p.state.shadowsArray;re.render(Z,R,H),ae===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,B=m.transmissive;if(p.setupLights(),H.isArrayCamera){const he=H.cameras;if(B.length>0)for(let ge=0,qe=he.length;ge<qe;ge++){const Be=he[ge];ot(W,B,R,Be)}mt&&le.render(R);for(let ge=0,qe=he.length;ge<qe;ge++){const Be=he[ge];Zt(m,R,Be,Be.viewport)}}else B.length>0&&ot(W,B,R,H),mt&&le.render(R),Zt(m,R,H);P!==null&&E===0&&(ke.updateMultisampleRenderTarget(P),ke.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,H),Te.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],ae===!0&&Ge.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function it(R,H,Z,W){if(R.visible===!1)return;if(R.layers.test(H.layers)){if(R.isGroup)Z=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(H);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||j.intersectsSprite(R)){W&&ye.setFromMatrixPosition(R.matrixWorld).applyMatrix4(we);const ge=ne.update(R),qe=R.material;qe.visible&&m.push(R,ge,qe,Z,ye.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||j.intersectsObject(R))){const ge=ne.update(R),qe=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ye.copy(R.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ye.copy(ge.boundingSphere.center)),ye.applyMatrix4(R.matrixWorld).applyMatrix4(we)),Array.isArray(qe)){const Be=ge.groups;for(let Qe=0,st=Be.length;Qe<st;Qe++){const Ke=Be[Qe],pt=qe[Ke.materialIndex];pt&&pt.visible&&m.push(R,ge,pt,Z,ye.z,Ke)}}else qe.visible&&m.push(R,ge,qe,Z,ye.z,null)}}const he=R.children;for(let ge=0,qe=he.length;ge<qe;ge++)it(he[ge],H,Z,W)}function Zt(R,H,Z,W){const B=R.opaque,he=R.transmissive,ge=R.transparent;p.setupLightsView(Z),ae===!0&&Ge.setGlobalState(v.clippingPlanes,Z),W&&Fe.viewport(D.copy(W)),B.length>0&&zt(B,H,Z),he.length>0&&zt(he,H,Z),ge.length>0&&zt(ge,H,Z),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function ot(R,H,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new so(1,1,{generateMipmaps:!0,type:ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float")?Bl:fr,minFilter:Pr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ot.workingColorSpace}));const he=p.state.transmissionRenderTarget[W.id],ge=W.viewport||D;he.setSize(ge.z*v.transmissionResolutionScale,ge.w*v.transmissionResolutionScale);const qe=v.getRenderTarget(),Be=v.getActiveCubeFace(),Qe=v.getActiveMipmapLevel();v.setRenderTarget(he),v.getClearColor(F),A=v.getClearAlpha(),A<1&&v.setClearColor(16777215,.5),v.clear(),mt&&le.render(Z);const st=v.toneMapping;v.toneMapping=fs;const Ke=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),ae===!0&&Ge.setGlobalState(v.clippingPlanes,W),zt(R,Z,W),ke.updateMultisampleRenderTarget(he),ke.updateRenderTargetMipmap(he),ct.has("WEBGL_multisampled_render_to_texture")===!1){let pt=!1;for(let bt=0,Xt=H.length;bt<Xt;bt++){const qt=H[bt],kt=qt.object,at=qt.geometry,jt=qt.material,b=qt.group;if(jt.side===Di&&kt.layers.test(W.layers)){const k=jt.side;jt.side=si,jt.needsUpdate=!0,Ht(kt,Z,W,at,jt,b),jt.side=k,jt.needsUpdate=!0,pt=!0}}pt===!0&&(ke.updateMultisampleRenderTarget(he),ke.updateRenderTargetMipmap(he))}v.setRenderTarget(qe,Be,Qe),v.setClearColor(F,A),Ke!==void 0&&(W.viewport=Ke),v.toneMapping=st}function zt(R,H,Z){const W=H.isScene===!0?H.overrideMaterial:null;for(let B=0,he=R.length;B<he;B++){const ge=R[B],qe=ge.object,Be=ge.geometry,Qe=ge.group;let st=ge.material;st.allowOverride===!0&&W!==null&&(st=W),qe.layers.test(Z.layers)&&Ht(qe,H,Z,Be,st,Qe)}}function Ht(R,H,Z,W,B,he){R.onBeforeRender(v,H,Z,W,B,he),R.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),B.onBeforeRender(v,H,Z,W,R,he),B.transparent===!0&&B.side===Di&&B.forceSinglePass===!1?(B.side=si,B.needsUpdate=!0,v.renderBufferDirect(Z,H,W,B,R,he),B.side=Br,B.needsUpdate=!0,v.renderBufferDirect(Z,H,W,B,R,he),B.side=Di):v.renderBufferDirect(Z,H,W,B,R,he),R.onAfterRender(v,H,Z,W,B,he)}function Tt(R,H,Z){H.isScene!==!0&&(H=dt);const W=Ve.get(R),B=p.state.lights,he=p.state.shadowsArray,ge=B.state.version,qe=ie.getParameters(R,B.state,he,H,Z),Be=ie.getProgramCacheKey(qe);let Qe=W.programs;W.environment=R.isMeshStandardMaterial?H.environment:null,W.fog=H.fog,W.envMap=(R.isMeshStandardMaterial?L:Nt).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?H.environmentRotation:R.envMapRotation,Qe===void 0&&(R.addEventListener("dispose",He),Qe=new Map,W.programs=Qe);let st=Qe.get(Be);if(st!==void 0){if(W.currentProgram===st&&W.lightsStateVersion===ge)return Ut(R,qe),st}else qe.uniforms=ie.getUniforms(R),R.onBeforeCompile(qe,v),st=ie.acquireProgram(qe,Be),Qe.set(Be,st),W.uniforms=qe.uniforms;const Ke=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ke.clippingPlanes=Ge.uniform),Ut(R,qe),W.needsLights=wn(R),W.lightsStateVersion=ge,W.needsLights&&(Ke.ambientLightColor.value=B.state.ambient,Ke.lightProbe.value=B.state.probe,Ke.directionalLights.value=B.state.directional,Ke.directionalLightShadows.value=B.state.directionalShadow,Ke.spotLights.value=B.state.spot,Ke.spotLightShadows.value=B.state.spotShadow,Ke.rectAreaLights.value=B.state.rectArea,Ke.ltc_1.value=B.state.rectAreaLTC1,Ke.ltc_2.value=B.state.rectAreaLTC2,Ke.pointLights.value=B.state.point,Ke.pointLightShadows.value=B.state.pointShadow,Ke.hemisphereLights.value=B.state.hemi,Ke.directionalShadowMap.value=B.state.directionalShadowMap,Ke.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ke.spotShadowMap.value=B.state.spotShadowMap,Ke.spotLightMatrix.value=B.state.spotLightMatrix,Ke.spotLightMap.value=B.state.spotLightMap,Ke.pointShadowMap.value=B.state.pointShadowMap,Ke.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=st,W.uniformsList=null,st}function At(R){if(R.uniformsList===null){const H=R.currentProgram.getUniforms();R.uniformsList=Vc.seqWithValue(H.seq,R.uniforms)}return R.uniformsList}function Ut(R,H){const Z=Ve.get(R);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function Pe(R,H,Z,W,B){H.isScene!==!0&&(H=dt),ke.resetTextureUnits();const he=H.fog,ge=W.isMeshStandardMaterial?H.environment:null,qe=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ei,Be=(W.isMeshStandardMaterial?L:Nt).get(W.envMap||ge),Qe=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,st=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ke=!!Z.morphAttributes.position,pt=!!Z.morphAttributes.normal,bt=!!Z.morphAttributes.color;let Xt=fs;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Xt=v.toneMapping);const qt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,kt=qt!==void 0?qt.length:0,at=Ve.get(W),jt=p.state.lights;if(ae===!0&&(Me===!0||R!==M)){const lt=R===M&&W.id===S;Ge.setState(W,R,lt)}let b=!1;W.version===at.__version?(at.needsLights&&at.lightsStateVersion!==jt.state.version||at.outputColorSpace!==qe||B.isBatchedMesh&&at.batching===!1||!B.isBatchedMesh&&at.batching===!0||B.isBatchedMesh&&at.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&at.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&at.instancing===!1||!B.isInstancedMesh&&at.instancing===!0||B.isSkinnedMesh&&at.skinning===!1||!B.isSkinnedMesh&&at.skinning===!0||B.isInstancedMesh&&at.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&at.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&at.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&at.instancingMorph===!1&&B.morphTexture!==null||at.envMap!==Be||W.fog===!0&&at.fog!==he||at.numClippingPlanes!==void 0&&(at.numClippingPlanes!==Ge.numPlanes||at.numIntersection!==Ge.numIntersection)||at.vertexAlphas!==Qe||at.vertexTangents!==st||at.morphTargets!==Ke||at.morphNormals!==pt||at.morphColors!==bt||at.toneMapping!==Xt||at.morphTargetsCount!==kt)&&(b=!0):(b=!0,at.__version=W.version);let k=at.currentProgram;b===!0&&(k=Tt(W,H,B));let z=!1,se=!1,_e=!1;const te=k.getUniforms(),Ie=at.uniforms;if(Fe.useProgram(k.program)&&(z=!0,se=!0,_e=!0),W.id!==S&&(S=W.id,se=!0),z||M!==R){Fe.buffers.depth.getReversed()?(me.copy(R.projectionMatrix),dx(me),fx(me),te.setValue(U,"projectionMatrix",me)):te.setValue(U,"projectionMatrix",R.projectionMatrix),te.setValue(U,"viewMatrix",R.matrixWorldInverse);const et=te.map.cameraPosition;et!==void 0&&et.setValue(U,rt.setFromMatrixPosition(R.matrixWorld)),$.logarithmicDepthBuffer&&te.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&te.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,se=!0,_e=!0)}if(B.isSkinnedMesh){te.setOptional(U,B,"bindMatrix"),te.setOptional(U,B,"bindMatrixInverse");const lt=B.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),te.setValue(U,"boneTexture",lt.boneTexture,ke))}B.isBatchedMesh&&(te.setOptional(U,B,"batchingTexture"),te.setValue(U,"batchingTexture",B._matricesTexture,ke),te.setOptional(U,B,"batchingIdTexture"),te.setValue(U,"batchingIdTexture",B._indirectTexture,ke),te.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&te.setValue(U,"batchingColorTexture",B._colorsTexture,ke));const Le=Z.morphAttributes;if((Le.position!==void 0||Le.normal!==void 0||Le.color!==void 0)&&Ee.update(B,Z,k),(se||at.receiveShadow!==B.receiveShadow)&&(at.receiveShadow=B.receiveShadow,te.setValue(U,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ie.envMap.value=Be,Ie.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&H.environment!==null&&(Ie.envMapIntensity.value=H.environmentIntensity),se&&(te.setValue(U,"toneMappingExposure",v.toneMappingExposure),at.needsLights&&yt(Ie,_e),he&&W.fog===!0&&Q.refreshFogUniforms(Ie,he),Q.refreshMaterialUniforms(Ie,W,q,J,p.state.transmissionRenderTarget[R.id]),Vc.upload(U,At(at),Ie,ke)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Vc.upload(U,At(at),Ie,ke),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&te.setValue(U,"center",B.center),te.setValue(U,"modelViewMatrix",B.modelViewMatrix),te.setValue(U,"normalMatrix",B.normalMatrix),te.setValue(U,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const lt=W.uniformsGroups;for(let et=0,ni=lt.length;et<ni;et++){const _n=lt[et];N.update(_n,k),N.bind(_n,k)}}return k}function yt(R,H){R.ambientLightColor.needsUpdate=H,R.lightProbe.needsUpdate=H,R.directionalLights.needsUpdate=H,R.directionalLightShadows.needsUpdate=H,R.pointLights.needsUpdate=H,R.pointLightShadows.needsUpdate=H,R.spotLights.needsUpdate=H,R.spotLightShadows.needsUpdate=H,R.rectAreaLights.needsUpdate=H,R.hemisphereLights.needsUpdate=H}function wn(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,H,Z){const W=Ve.get(R);W.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ve.get(R.texture).__webglTexture=H,Ve.get(R.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,H){const Z=Ve.get(R);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0};const ti=U.createFramebuffer();this.setRenderTarget=function(R,H=0,Z=0){P=R,T=H,E=Z;let W=!0,B=null,he=!1,ge=!1;if(R){const Be=Ve.get(R);if(Be.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(Be.__webglFramebuffer===void 0)ke.setupRenderTarget(R);else if(Be.__hasExternalTextures)ke.rebindTextures(R,Ve.get(R.texture).__webglTexture,Ve.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ke=R.depthTexture;if(Be.__boundDepthTexture!==Ke){if(Ke!==null&&Ve.has(Ke)&&(R.width!==Ke.image.width||R.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(R)}}const Qe=R.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(ge=!0);const st=Ve.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(st[H])?B=st[H][Z]:B=st[H],he=!0):R.samples>0&&ke.useMultisampledRTT(R)===!1?B=Ve.get(R).__webglMultisampledFramebuffer:Array.isArray(st)?B=st[Z]:B=st,D.copy(R.viewport),I.copy(R.scissor),V=R.scissorTest}else D.copy(Y).multiplyScalar(q).floor(),I.copy($e).multiplyScalar(q).floor(),V=Se;if(Z!==0&&(B=ti),Fe.bindFramebuffer(U.FRAMEBUFFER,B)&&W&&Fe.drawBuffers(R,B),Fe.viewport(D),Fe.scissor(I),Fe.setScissorTest(V),he){const Be=Ve.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+H,Be.__webglTexture,Z)}else if(ge){const Be=Ve.get(R.texture),Qe=H;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.__webglTexture,Z,Qe)}else if(R!==null&&Z!==0){const Be=Ve.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Be.__webglTexture,Z)}S=-1},this.readRenderTargetPixels=function(R,H,Z,W,B,he,ge,qe=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Ve.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(Be=Be[ge]),Be){Fe.bindFramebuffer(U.FRAMEBUFFER,Be);try{const Qe=R.textures[qe],st=Qe.format,Ke=Qe.type;if(!$.textureFormatReadable(st)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=R.width-W&&Z>=0&&Z<=R.height-B&&(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+qe),U.readPixels(H,Z,W,B,be.convert(st),be.convert(Ke),he))}finally{const Qe=P!==null?Ve.get(P).__webglFramebuffer:null;Fe.bindFramebuffer(U.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(R,H,Z,W,B,he,ge,qe=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Ve.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(Be=Be[ge]),Be)if(H>=0&&H<=R.width-W&&Z>=0&&Z<=R.height-B){Fe.bindFramebuffer(U.FRAMEBUFFER,Be);const Qe=R.textures[qe],st=Qe.format,Ke=Qe.type;if(!$.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,pt),U.bufferData(U.PIXEL_PACK_BUFFER,he.byteLength,U.STREAM_READ),R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+qe),U.readPixels(H,Z,W,B,be.convert(st),be.convert(Ke),0);const bt=P!==null?Ve.get(P).__webglFramebuffer:null;Fe.bindFramebuffer(U.FRAMEBUFFER,bt);const Xt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ux(U,Xt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,pt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,he),U.deleteBuffer(pt),U.deleteSync(Xt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,H=null,Z=0){const W=Math.pow(2,-Z),B=Math.floor(R.image.width*W),he=Math.floor(R.image.height*W),ge=H!==null?H.x:0,qe=H!==null?H.y:0;ke.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,ge,qe,B,he),Fe.unbindTexture()};const en=U.createFramebuffer(),an=U.createFramebuffer();this.copyTextureToTexture=function(R,H,Z=null,W=null,B=0,he=null){he===null&&(B!==0?(qo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=B,B=0):he=0);let ge,qe,Be,Qe,st,Ke,pt,bt,Xt;const qt=R.isCompressedTexture?R.mipmaps[he]:R.image;if(Z!==null)ge=Z.max.x-Z.min.x,qe=Z.max.y-Z.min.y,Be=Z.isBox3?Z.max.z-Z.min.z:1,Qe=Z.min.x,st=Z.min.y,Ke=Z.isBox3?Z.min.z:0;else{const Le=Math.pow(2,-B);ge=Math.floor(qt.width*Le),qe=Math.floor(qt.height*Le),R.isDataArrayTexture?Be=qt.depth:R.isData3DTexture?Be=Math.floor(qt.depth*Le):Be=1,Qe=0,st=0,Ke=0}W!==null?(pt=W.x,bt=W.y,Xt=W.z):(pt=0,bt=0,Xt=0);const kt=be.convert(H.format),at=be.convert(H.type);let jt;H.isData3DTexture?(ke.setTexture3D(H,0),jt=U.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ke.setTexture2DArray(H,0),jt=U.TEXTURE_2D_ARRAY):(ke.setTexture2D(H,0),jt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,H.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,H.unpackAlignment);const b=U.getParameter(U.UNPACK_ROW_LENGTH),k=U.getParameter(U.UNPACK_IMAGE_HEIGHT),z=U.getParameter(U.UNPACK_SKIP_PIXELS),se=U.getParameter(U.UNPACK_SKIP_ROWS),_e=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,qt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,qt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Qe),U.pixelStorei(U.UNPACK_SKIP_ROWS,st),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke);const te=R.isDataArrayTexture||R.isData3DTexture,Ie=H.isDataArrayTexture||H.isData3DTexture;if(R.isDepthTexture){const Le=Ve.get(R),lt=Ve.get(H),et=Ve.get(Le.__renderTarget),ni=Ve.get(lt.__renderTarget);Fe.bindFramebuffer(U.READ_FRAMEBUFFER,et.__webglFramebuffer),Fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let _n=0;_n<Be;_n++)te&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ve.get(R).__webglTexture,B,Ke+_n),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ve.get(H).__webglTexture,he,Xt+_n)),U.blitFramebuffer(Qe,st,ge,qe,pt,bt,ge,qe,U.DEPTH_BUFFER_BIT,U.NEAREST);Fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||R.isRenderTargetTexture||Ve.has(R)){const Le=Ve.get(R),lt=Ve.get(H);Fe.bindFramebuffer(U.READ_FRAMEBUFFER,en),Fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,an);for(let et=0;et<Be;et++)te?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Le.__webglTexture,B,Ke+et):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Le.__webglTexture,B),Ie?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,lt.__webglTexture,he,Xt+et):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,lt.__webglTexture,he),B!==0?U.blitFramebuffer(Qe,st,ge,qe,pt,bt,ge,qe,U.COLOR_BUFFER_BIT,U.NEAREST):Ie?U.copyTexSubImage3D(jt,he,pt,bt,Xt+et,Qe,st,ge,qe):U.copyTexSubImage2D(jt,he,pt,bt,Qe,st,ge,qe);Fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Ie?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(jt,he,pt,bt,Xt,ge,qe,Be,kt,at,qt.data):H.isCompressedArrayTexture?U.compressedTexSubImage3D(jt,he,pt,bt,Xt,ge,qe,Be,kt,qt.data):U.texSubImage3D(jt,he,pt,bt,Xt,ge,qe,Be,kt,at,qt):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,he,pt,bt,ge,qe,kt,at,qt.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,he,pt,bt,qt.width,qt.height,kt,qt.data):U.texSubImage2D(U.TEXTURE_2D,he,pt,bt,ge,qe,kt,at,qt);U.pixelStorei(U.UNPACK_ROW_LENGTH,b),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,k),U.pixelStorei(U.UNPACK_SKIP_PIXELS,z),U.pixelStorei(U.UNPACK_SKIP_ROWS,se),U.pixelStorei(U.UNPACK_SKIP_IMAGES,_e),he===0&&H.generateMipmaps&&U.generateMipmap(jt),Fe.unbindTexture()},this.copyTextureToTexture3D=function(R,H,Z=null,W=null,B=0){return qo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,H,Z,W,B)},this.initRenderTarget=function(R){Ve.get(R).__webglFramebuffer===void 0&&ke.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ke.setTextureCube(R,0):R.isData3DTexture?ke.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ke.setTexture2DArray(R,0):ke.setTexture2D(R,0),Fe.unbindTexture()},this.resetState=function(){T=0,E=0,P=null,Fe.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Lr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ot._getUnpackColorSpace()}}function uT(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Ho(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Um=Array.prototype.forEach,Oa=Array.prototype.slice,ue={BREAK:{},extend:function(e){return this.each(Oa.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Oa.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Oa.call(arguments);return function(){for(var t=Oa.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Um&&e.forEach&&e.forEach===Um)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Oa.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},dT=[{litmus:ue.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Ho},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Ho},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Ho},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Ho}}},{litmus:ue.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:ue.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:ue.isObject,conversions:{RGBA_OBJ:{read:function(e){return ue.isNumber(e.r)&&ue.isNumber(e.g)&&ue.isNumber(e.b)&&ue.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return ue.isNumber(e.r)&&ue.isNumber(e.g)&&ue.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return ue.isNumber(e.h)&&ue.isNumber(e.s)&&ue.isNumber(e.v)&&ue.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return ue.isNumber(e.h)&&ue.isNumber(e.s)&&ue.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Na=void 0,vc=void 0,Tf=function(){vc=!1;var e=arguments.length>1?ue.toArray(arguments):arguments[0];return ue.each(dT,function(t){if(t.litmus(e))return ue.each(t.conversions,function(n,i){if(Na=n.read(e),vc===!1&&Na!==!1)return vc=Na,Na.conversionName=i,Na.conversion=n,ue.BREAK}),ue.BREAK}),vc},Fm=void 0,ou={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Fm=t*8)|e&~(255<<Fm)}},fT=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ji=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Qi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),_s=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Ss=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},ws=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},Pn=function(){function r(){if(Ji(this,r),this.__state=Tf.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Qi(r,[{key:"toString",value:function(){return Ho(this)}},{key:"toHexString",value:function(){return Ho(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Ih(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(Pn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(Pn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Oh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(Pn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(Pn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}Pn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=ou.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")ue.extend(r.__state,ou.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};Pn.recalculateHSV=function(r){var e=ou.rgb_to_hsv(r.r,r.g,r.b);ue.extend(r.__state,{s:e.s,v:e.v}),ue.isNaN(e.h)?ue.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};Pn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Ih(Pn.prototype,"r",2);Ih(Pn.prototype,"g",1);Ih(Pn.prototype,"b",0);Oh(Pn.prototype,"h");Oh(Pn.prototype,"s");Oh(Pn.prototype,"v");Object.defineProperty(Pn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(Pn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=ou.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var fo=function(){function r(e,t){Ji(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Qi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),hT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},H_={};ue.each(hT,function(r,e){ue.each(r,function(t){H_[t]=e})});var pT=/(\d+(\.\d+)?)px/;function er(r){if(r==="0"||ue.isUndefined(r))return 0;var e=r.match(pT);return ue.isNull(e)?0:parseFloat(e[1])}var ee={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;ue.isUndefined(s)&&(s=!0),ue.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=H_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;ue.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}ue.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),ee},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),ee},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return ee},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return ee},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return er(t["border-left-width"])+er(t["border-right-width"])+er(t["padding-left"])+er(t["padding-right"])+er(t.width)},getHeight:function(e){var t=getComputedStyle(e);return er(t["border-top-width"])+er(t["border-bottom-width"])+er(t["padding-top"])+er(t["padding-bottom"])+er(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},V_=function(r){Ss(e,r);function e(t,n){Ji(this,e);var i=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return ee.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Qi(e,[{key:"setValue",value:function(n){var i=_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fo),mT=function(r){Ss(e,r);function e(t,n,i){Ji(this,e);var s=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),ue.isArray(o)){var l={};ue.each(o,function(c){l[c]=c}),o=l}return ue.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),ee.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Qi(e,[{key:"setValue",value:function(n){var i=_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return ee.isActive(this.__select)?this:(this.__select.value=this.getValue(),_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(fo),gT=function(r){Ss(e,r);function e(t,n){Ji(this,e);var i=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),ee.bind(i.__input,"keyup",o),ee.bind(i.__input,"change",o),ee.bind(i.__input,"blur",a),ee.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Qi(e,[{key:"updateDisplay",value:function(){return ee.isActive(this.__input)||(this.__input.value=this.getValue()),_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fo);function km(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var G_=function(r){Ss(e,r);function e(t,n,i){Ji(this,e);var s=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,ue.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=km(s.__impliedStep),s}return Qi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=km(n),this}}]),e}(fo);function _T(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var au=function(r){Ss(e,r);function e(t,n,i){Ji(this,e);var s=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);ue.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){ee.unbind(window,"mousemove",d),ee.unbind(window,"mouseup",f),c()}function h(_){ee.bind(window,"mousemove",d),ee.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),ee.bind(s.__input,"change",l),ee.bind(s.__input,"blur",u),ee.bind(s.__input,"mousedown",h),ee.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Qi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():_T(this.getValue(),this.__precision),_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(G_);function Bm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Af=function(r){Ss(e,r);function e(t,n,i,s,o){Ji(this,e);var a=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),ee.bind(a.__background,"mousedown",c),ee.bind(a.__background,"touchstart",f),ee.addClass(a.__background,"slider"),ee.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),ee.bind(window,"mousemove",u),ee.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Bm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){ee.unbind(window,"mousemove",u),ee.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(ee.bind(window,"touchmove",h),ee.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Bm(m,p.left,p.right,l.__min,l.__max))}function _(){ee.unbind(window,"touchmove",h),ee.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Qi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",_s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(G_),W_=function(r){Ss(e,r);function e(t,n,i){Ji(this,e);var s=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,ee.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),ee.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Qi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(fo),Cf=function(r){Ss(e,r);function e(t,n){Ji(this,e);var i=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new Pn(i.getValue()),i.__temp=new Pn(0);var s=i;i.domElement=document.createElement("div"),ee.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",ee.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),ee.bind(i.__input,"blur",d),ee.bind(i.__selector,"mousedown",function(){ee.addClass(this,"drag").bind(window,"mouseup",function(){ee.removeClass(s.__selector,"drag")})}),ee.bind(i.__selector,"touchstart",function(){ee.addClass(this,"drag").bind(window,"touchend",function(){ee.removeClass(s.__selector,"drag")})});var o=document.createElement("div");ue.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),ue.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),ue.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),ue.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),ue.extend(o.style,{width:"100%",height:"100%",background:"none"}),zm(o,"top","rgba(0,0,0,0)","#000"),ue.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),yT(i.__hue_field),ue.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),ee.bind(i.__saturation_field,"mousedown",a),ee.bind(i.__saturation_field,"touchstart",a),ee.bind(i.__field_knob,"mousedown",a),ee.bind(i.__field_knob,"touchstart",a),ee.bind(i.__hue_field,"mousedown",l),ee.bind(i.__hue_field,"touchstart",l);function a(g){h(g),ee.bind(window,"mousemove",h),ee.bind(window,"touchmove",h),ee.bind(window,"mouseup",c),ee.bind(window,"touchend",c)}function l(g){_(g),ee.bind(window,"mousemove",_),ee.bind(window,"touchmove",_),ee.bind(window,"mouseup",u),ee.bind(window,"touchend",u)}function c(){ee.unbind(window,"mousemove",h),ee.unbind(window,"touchmove",h),ee.unbind(window,"mouseup",c),ee.unbind(window,"touchend",c),f()}function u(){ee.unbind(window,"mousemove",_),ee.unbind(window,"touchmove",_),ee.unbind(window,"mouseup",u),ee.unbind(window,"touchend",u),f()}function d(){var g=Tf(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,w=p.clientX,x=p.clientY,v=(w-m.left)/(m.right-m.left),y=1-(x-m.top)/(m.bottom-m.top);return y>1?y=1:y<0&&(y=0),v>1?v=1:v<0&&(v=0),s.__color.v=y,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,w=p.clientY,x=1-(w-m.top)/(m.bottom-m.top);return x>1?x=1:x<0&&(x=0),s.__color.h=x*360,s.setValue(s.__color.toOriginal()),!1}return i}return Qi(e,[{key:"updateDisplay",value:function(){var n=Tf(this.getValue());if(n!==!1){var i=!1;ue.each(Pn.COMPONENTS,function(a){if(!ue.isUndefined(n[a])&&!ue.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&ue.extend(this.__color.__state,n)}ue.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;ue.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,zm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),ue.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(fo),vT=["-moz-","-o-","-webkit-","-ms-",""];function zm(r,e,t,n){r.style.background="",ue.each(vT,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function yT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var xT={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},bT=`<div id="dg-save" class="dg dialogue">

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

</div>`,ST=function(e,t){var n=e[t];return ue.isArray(arguments[2])||ue.isObject(arguments[2])?new mT(e,t,arguments[2]):ue.isNumber(n)?ue.isNumber(arguments[2])&&ue.isNumber(arguments[3])?ue.isNumber(arguments[4])?new Af(e,t,arguments[2],arguments[3],arguments[4]):new Af(e,t,arguments[2],arguments[3]):ue.isNumber(arguments[4])?new au(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new au(e,t,{min:arguments[2],max:arguments[3]}):ue.isString(n)?new gT(e,t):ue.isFunction(n)?new W_(e,t,""):ue.isBoolean(n)?new V_(e,t):null};function wT(r){setTimeout(r,1e3/60)}var MT=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||wT,ET=function(){function r(){Ji(this,r),this.backgroundElement=document.createElement("div"),ue.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),ee.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),ue.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;ee.bind(this.backgroundElement,"click",function(){e.hide()})}return Qi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),ue.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",ee.unbind(t.domElement,"webkitTransitionEnd",i),ee.unbind(t.domElement,"transitionend",i),ee.unbind(t.domElement,"oTransitionEnd",i)};ee.bind(this.domElement,"webkitTransitionEnd",n),ee.bind(this.domElement,"transitionend",n),ee.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-ee.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-ee.getHeight(this.domElement)/2+"px"}}]),r}(),TT=uT(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);xT.inject(TT);var Hm="dg",Vm=72,Gm=20,Al="Default",Ga=function(){try{return!!window.localStorage}catch{return!1}}(),il=void 0,Wm=!0,Uo=void 0,pd=!1,X_=[],Qt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),ee.addClass(this.domElement,Hm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=ue.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=ue.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),ue.isUndefined(n.load)?n.load={preset:Al}:n.preset&&(n.load.preset=n.preset),ue.isUndefined(n.parent)&&n.hideable&&X_.push(this),n.resizable=ue.isUndefined(n.parent)&&n.resizable,n.autoPlace&&ue.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Ga&&localStorage.getItem(Fo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,PT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Lf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?ee.addClass(t.__ul,r.CLASS_CLOSED):ee.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Ga&&(i=f,f?ee.bind(window,"unload",s):ee.unbind(window,"unload",s),localStorage.setItem(Fo(t,"isLocal"),f))}}}),ue.isUndefined(n.parent)){if(this.closed=n.closed||!1,ee.addClass(this.domElement,r.CLASS_MAIN),ee.makeSelectable(this.domElement,!1),Ga&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Fo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,ee.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(ee.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(ee.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),ee.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);ee.addClass(l,"controller-name"),o=Nh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};ee.addClass(this.__ul,r.CLASS_CLOSED),ee.addClass(o,"title"),ee.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(ue.isUndefined(n.parent)&&(Wm&&(Uo=document.createElement("div"),ee.addClass(Uo,Hm),ee.addClass(Uo,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(Uo),Wm=!1),Uo.appendChild(this.domElement),ee.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Lf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},ee.bind(window,"resize",this.__resizeHandler),ee.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),ee.bind(this.__ul,"transitionend",this.__resizeHandler),ee.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&RT(this),s=function(){Ga&&localStorage.getItem(Fo(t,"isLocal"))==="true"&&localStorage.setItem(Fo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,ue.defer(function(){d.width-=1})}n.parent||u()};Qt.toggleHide=function(){pd=!pd,ue.each(X_,function(r){r.domElement.style.display=pd?"none":""})};Qt.CLASS_AUTO_PLACE="a";Qt.CLASS_AUTO_PLACE_CONTAINER="ac";Qt.CLASS_MAIN="main";Qt.CLASS_CONTROLLER_ROW="cr";Qt.CLASS_TOO_TALL="taller-than-window";Qt.CLASS_CLOSED="closed";Qt.CLASS_CLOSE_BUTTON="close-button";Qt.CLASS_CLOSE_TOP="close-top";Qt.CLASS_CLOSE_BOTTOM="close-bottom";Qt.CLASS_DRAG="drag";Qt.DEFAULT_WIDTH=245;Qt.TEXT_CLOSED="Close Controls";Qt.TEXT_OPEN="Open Controls";Qt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Vm||r.keyCode===Vm)&&Qt.toggleHide()};ee.bind(window,"keydown",Qt._keydownHandler,!1);ue.extend(Qt.prototype,{add:function(e,t){return rl(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return rl(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;ue.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&Uo.removeChild(this.domElement);var e=this;ue.each(this.__folders,function(t){e.removeFolder(t)}),ee.unbind(window,"keydown",Qt._keydownHandler,!1),Xm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Qt(t);this.__folders[e]=n;var i=Nh(this,n.domElement);return ee.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],Xm(e);var t=this;ue.each(e.__folders,function(n){e.removeFolder(n)}),ue.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=ee.getOffset(e.__ul).top,n=0;ue.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=ee.getHeight(i))}),window.innerHeight-t-Gm<n?(ee.addClass(e.domElement,Qt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-Gm+"px"):(ee.removeClass(e.domElement,Qt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&ue.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:ue.debounce(function(){this.onResize()},50),remember:function(){if(ue.isUndefined(il)&&(il=new ET,il.domElement.innerHTML=bT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;ue.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&CT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Lf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=yc(this)),e.folders={},ue.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=yc(this),Rf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Al]=yc(this,!0)),this.load.remembered[e]=yc(this),this.preset=e,Pf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){ue.each(this.__controllers,function(t){this.getRoot().load.remembered?q_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),ue.each(this.__folders,function(t){t.revert(t)}),e||Rf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&Y_(this.__listening)},updateDisplay:function(){ue.each(this.__controllers,function(e){e.updateDisplay()}),ue.each(this.__folders,function(e){e.updateDisplay()})}});function Nh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function Xm(r){ee.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&ee.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Rf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function AT(r,e,t){if(t.__li=e,t.__gui=r,ue.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),rl(r,t.object,t.property,{before:a,factoryArgs:[ue.toArray(arguments)]})}if(ue.isArray(o)||ue.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),rl(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Af){var n=new au(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});ue.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),ee.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof au){var i=function(o){if(ue.isNumber(t.__min)&&ue.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=rl(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=ue.compose(i,t.min),t.max=ue.compose(i,t.max)}else t instanceof V_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__checkbox,"click")}),ee.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof W_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__button,"click")}),ee.bind(e,"mouseover",function(){ee.addClass(t.__button,"hover")}),ee.bind(e,"mouseout",function(){ee.removeClass(t.__button,"hover")})):t instanceof Cf&&(ee.addClass(e,"color"),t.updateDisplay=ue.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=ue.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Rf(r.getRoot(),!0),s},t.setValue)}function q_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Al])o=s[Al];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function rl(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Cf(e,t);else{var s=[e,t].concat(n.factoryArgs);i=ST.apply(r,s)}n.before instanceof fo&&(n.before=n.before.__li),q_(r,i),ee.addClass(i.domElement,"c");var o=document.createElement("span");ee.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=Nh(r,a,n.before);return ee.addClass(l,Qt.CLASS_CONTROLLER_ROW),i instanceof Cf?ee.addClass(l,"color"):ee.addClass(l,fT(i.getValue())),AT(r,l,i),r.__controllers.push(i),i}function Fo(r,e){return document.location.href+"."+e}function Pf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function qm(r,e){e.style.display=r.useLocalStorage?"block":"none"}function CT(r){var e=r.__save_row=document.createElement("li");ee.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),ee.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",ee.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",ee.addClass(n,"button"),ee.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",ee.addClass(i,"button"),ee.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",ee.addClass(s,"button"),ee.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?ue.each(r.load.remembered,function(d,f){Pf(r,f,f===r.preset)}):Pf(r,Al,!1),ee.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Ga){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Fo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),qm(r,a),ee.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,qm(r,a)})}var u=document.getElementById("dg-new-constructor");ee.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&il.hide()}),ee.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),il.show(),u.focus(),u.select()}),ee.bind(n,"click",function(){r.save()}),ee.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),ee.bind(s,"click",function(){r.revert()})}function RT(r){var e=void 0;r.__resize_handle=document.createElement("div"),ue.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){ee.removeClass(r.__closeButton,Qt.CLASS_DRAG),ee.unbind(window,"mousemove",t),ee.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,ee.addClass(r.__closeButton,Qt.CLASS_DRAG),ee.bind(window,"mousemove",t),ee.bind(window,"mouseup",n),!1}ee.bind(r.__resize_handle,"mousedown",i),ee.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Lf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function yc(r,e){var t={};return ue.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];ue.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function PT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function Y_(r){r.length!==0&&MT.call(window,function(){Y_(r)}),ue.each(r,function(e){e.updateDisplay()})}var LT=Qt;function Ym(r,e){if(e===Ny)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===xf||e===m_){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===xf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class DT extends wa{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new FT(t)}),this.register(function(t){return new kT(t)}),this.register(function(t){return new YT(t)}),this.register(function(t){return new jT(t)}),this.register(function(t){return new $T(t)}),this.register(function(t){return new zT(t)}),this.register(function(t){return new HT(t)}),this.register(function(t){return new VT(t)}),this.register(function(t){return new GT(t)}),this.register(function(t){return new UT(t)}),this.register(function(t){return new WT(t)}),this.register(function(t){return new BT(t)}),this.register(function(t){return new qT(t)}),this.register(function(t){return new XT(t)}),this.register(function(t){return new OT(t)}),this.register(function(t){return new KT(t)}),this.register(function(t){return new ZT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=nl.extractUrlBase(e);o=nl.resolveURL(c,this.path)}else o=nl.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new O_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===j_){try{o[Rt.KHR_BINARY_GLTF]=new JT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[Rt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new d1(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case Rt.KHR_MATERIALS_UNLIT:o[d]=new NT;break;case Rt.KHR_DRACO_MESH_COMPRESSION:o[d]=new QT(s,this.dracoLoader);break;case Rt.KHR_TEXTURE_TRANSFORM:o[d]=new e1;break;case Rt.KHR_MESH_QUANTIZATION:o[d]=new t1;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function IT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class OT{constructor(e){this.parser=e,this.name=Rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ze(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],ei);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new N_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new hb(u),c.distance=d;break;case"spot":c=new db(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Er(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class NT{constructor(){this.name=Rt.KHR_MATERIALS_UNLIT}getMaterialType(){return Ws}extendParams(e,t,n){const i=[];e.color=new Ze(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],ei),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Dn))}return Promise.all(i)}}class UT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class FT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pt(a,a)}return Promise.all(s)}}class kT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class BT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class zT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],ei)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Dn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class HT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class VT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ze().setRGB(a[0],a[1],a[2],ei),Promise.all(s)}}class GT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class WT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ze().setRGB(a[0],a[1],a[2],ei),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Dn)),Promise.all(s)}}class XT{constructor(e){this.parser=e,this.name=Rt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class qT{constructor(e){this.parser=e,this.name=Rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class YT{constructor(e){this.parser=e,this.name=Rt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class jT{constructor(e){this.parser=e,this.name=Rt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class $T{constructor(e){this.parser=e,this.name=Rt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class KT{constructor(e){this.name=Rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class ZT{constructor(e){this.name=Rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Ci.TRIANGLES&&c.mode!==Ci.TRIANGLE_STRIP&&c.mode!==Ci.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new vt,m=new G,p=new bs,w=new G(1,1,1),x=new Vx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&w.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,g.compose(m,p,w));for(const v in l)if(v==="_COLOR_0"){const y=l[v];x.instanceColor=new Sf(y.array,y.itemSize,y.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);on.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),h.push(x)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const j_="glTF",Ua=12,jm={JSON:1313821514,BIN:5130562};class JT{constructor(e){this.name=Rt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==j_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ua,s=new DataView(e,Ua);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===jm.JSON){const c=new Uint8Array(e,Ua+o,a);this.content=n.decode(c)}else if(l===jm.BIN){const c=Ua+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class QT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Df[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Df[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=jo[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,ei,f)})})}}class e1{constructor(){this.name=Rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class t1{constructor(){this.name=Rt.KHR_MESH_QUANTIZATION}}class $_ extends Hl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,w=1-m,x=p-f+d;for(let v=0;v!==a;v++){const y=o[g+v+a],T=o[g+v+l]*u,E=o[_+v+a],P=o[_+v]*u;s[v]=w*y+x*T+m*E+p*P}return s}}const n1=new bs;class i1 extends $_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return n1.fromArray(s).normalize().toArray(s),s}}const Ci={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},jo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},$m={9728:Qn,9729:xi,9984:a_,9985:Uc,9986:Ha,9987:Pr},Km={33071:ns,33648:tu,10497:aa},md={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Df={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Jr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},r1={CUBICSPLINE:void 0,LINEAR:El,STEP:Ml},gd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function s1(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Ch({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Br})),r.DefaultMaterial}function Ds(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Er(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function o1(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function a1(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function l1(r){let e;const t=r.extensions&&r.extensions[Rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_d(t.attributes):e=r.indices+":"+_d(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+_d(r.targets[n]);return e}function _d(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function If(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function c1(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const u1=new vt;class d1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new IT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new cb(this.options.manager):this.textureLoader=new gb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new O_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ds(s,a,i),Er(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Rt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(nl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=md[i.type],a=jo[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Gt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=md[i.type],c=jo[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(w);x||(g=new c(a,p*h,i.count*h/u),x=new Fx(g,h/u),t.cache.add(w,x)),m=new Mh(x,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Gt(g,l,_);if(i.sparse!==void 0){const p=md.SCALAR,w=jo[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,y=new w(o[1],x,i.sparse.count*p),T=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Gt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=y.length;E<P;E++){const S=y[E];if(m.setX(S,T[E*l]),l>=2&&m.setY(S,T[E*l+1]),l>=3&&m.setZ(S,T[E*l+2]),l>=4&&m.setW(S,T[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=$m[f.magFilter]||xi,u.minFilter=$m[f.minFilter]||Pr,u.wrapS=Km[f.wrapS]||aa,u.wrapT=Km[f.wrapT]||aa,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Qn&&u.minFilter!==xi,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new xn(g);m.needsUpdate=!0,f(m)}),t.load(nl.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),Er(d,o),d.userData.mimeType=o.mimeType||c1(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Rt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Rt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Rt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new P_,cr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new R_,cr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ch}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Rt.KHR_MATERIALS_UNLIT]){const d=i[Rt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Ze(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],ei),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Dn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Di);const u=s.alphaMode||gd.OPAQUE;if(u===gd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===gd.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ws&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Pt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Ws&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ws){const d=s.emissiveFactor;a.emissive=new Ze().setRGB(d[0],d[1],d[2],ei)}return s.emissiveTexture!==void 0&&o!==Ws&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Dn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),Er(d,s),t.associations.set(d,{materials:e}),s.extensions&&Ds(i,d,s),d})}createUniqueName(e){const t=Wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Zm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=l1(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[Rt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=Zm(new ki,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?s1(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const w=c[h];if(m.mode===Ci.TRIANGLES||m.mode===Ci.TRIANGLE_STRIP||m.mode===Ci.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Bx(g,w):new Jn(g,w),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Ci.TRIANGLE_STRIP?p.geometry=Ym(p.geometry,m_):m.mode===Ci.TRIANGLE_FAN&&(p.geometry=Ym(p.geometry,xf));else if(m.mode===Ci.LINES)p=new qx(g,w);else if(m.mode===Ci.LINE_STRIP)p=new Ah(g,w);else if(m.mode===Ci.LINE_LOOP)p=new Yx(g,w);else if(m.mode===Ci.POINTS)p=new Mf(g,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&a1(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Er(p,s),m.extensions&&Ds(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&Ds(i,d[0],s),d[0];const f=new Dr;s.extensions&&Ds(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ri(lx.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Mu(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Er(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new vt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Eh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,w=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",w)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let w=0,x=f.length;w<x;w++){const v=f[w],y=h[w],T=_[w],E=g[w],P=m[w];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const S=n._createAnimationTracks(v,y,T,E,P);if(S)for(let M=0;M<S.length;M++)p.push(S[M])}return new nb(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,u1)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new A_:c.length>1?u=new Dr:c.length===1?u=c[0]:u=new on,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),Er(u,s),s.extensions&&Ds(n,u,s),s.matrix!==void 0){const d=new vt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Dr;n.name&&(s.name=i.createUniqueName(n.name)),Er(s,n),n.extensions&&Ds(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof cr||f instanceof xn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Jr[s.path]===Jr.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Jr[s.path]){case Jr.weights:c=ua;break;case Jr.rotation:c=da;break;case Jr.translation:case Jr.scale:c=fa;break;default:switch(n.itemSize){case 1:c=ua;break;case 2:case 3:default:c=fa;break}break}const u=i.interpolation!==void 0?r1[i.interpolation]:El,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Jr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=If(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof da?i1:$_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function f1(r,e,t){const n=e.attributes,i=new Ki;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new G(l[0],l[1],l[2]),new G(c[0],c[1],c[2])),a.normalized){const u=If(jo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new G,l=new G;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=If(jo[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new mr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Zm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Df[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ot.workingColorSpace!==ei&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ot.workingColorSpace}" not supported.`),Er(r,e),f1(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?o1(r,e.targets,t):r})}const h1="/150-lab/assets/models/globe-hd.glb";function p1(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=1e22;function t(){const b=document.querySelector("#events");if(!b)return!0;const k=b.getBoundingClientRect(),se=window.innerHeight*1.2;return k.top>se}const n=document.getElementById("shaderBackground");if(!n)return;window.specialColorsActive=!1,window.colorPhase=0;let i,s;vp(()=>Promise.resolve().then(()=>gC),void 0).then(b=>{i=b.default,vp(()=>Promise.resolve().then(()=>U1),void 0).then(k=>{s=k.default,i.registerPlugin(s),o(i)})}).catch(b=>{console.error("Error loading GSAP:",b)});function o(b,k){let z,se,_e,te,Ie,Le,lt,et;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(A&&A.color1&&A.color2&&(z=A.color1.value.clone(),se=A.color2.value.clone(),_e=A.waveSpeed.value,te=A.waveAmplitude.value,Ie=A.waveFrequency.value,Le=A.ambientLight.value,lt=A.directionalLight.value,et=A.yOffset.value),b.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:Mn=>{A&&A.colorDarkness&&(A.colorDarkness.value=Mn.progress*2,A.colorDarkness.value>=1.95?window.colorPhase===1?(A.color1&&A.color1.value.set(z),A.color2&&A.color2.value.set(se),window.specialColorsActive=!0):window.colorPhase===0&&(A.color1&&A.color1.value.set("#e2e2e2"),A.color2&&A.color2.value.set("#515151"),window.specialColorsActive=!0):z&&se&&(window.colorPhase===1?(A.color1&&A.color1.value.copy(z),A.color2&&A.color2.value.copy(se),window.specialColorsActive=!1):window.colorPhase===0&&(A.color1&&A.color1.value.set("#e2e2e2"),A.color2&&A.color2.value.set("#515151"),window.specialColorsActive=!1)),l())}}}),setTimeout(()=>{a(b)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}b.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:Mn=>{const gt=Mn.progress;F&&(gt>.01&&!F.visible?(F.visible=!0,I.visible=!0,d()):gt<=.01&&F.visible&&(F.visible=!1,I.visible=!1,d()),F.visible&&(F.traverse(cn=>{cn.isMesh&&cn.material&&(cn.material.transparent=!0,cn.material.opacity=gt)}),I.opacity=gt,u())),P&&(gt>.01&&!P.visible?(P.visible=!0,S.enabled=!0,f()):gt<=.01&&P.visible&&(P.visible=!1,S.enabled=!1,f()),E&&E.uniforms&&(gt>.01&&P.visible?(E.uniforms.startOpacity.value=S.startOpacity*gt,E.uniforms.endOpacity.value=S.endOpacity*gt):(E.uniforms.startOpacity.value=0,E.uniforms.endOpacity.value=0)))}}}),b.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:Mn=>{const gt=Mn.progress,cn=.15;if(!window.particlesFullyHidden&&gt>=cn?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&gt<cn*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){Te&&Te.uniforms&&Te.uniforms.opacity&&(Te.uniforms.opacity.value=0,po());return}const Tn=1-Math.min(gt/cn,1),Gr=.5*Math.pow(Tn,3);Te&&Te.uniforms&&Te.uniforms.opacity&&(Te.uniforms.opacity.value=Gr,po())}}}),b.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:Mn=>{const gt=Mn.progress;if(T){const di=-322+120*(1-Math.pow(1-gt,3));if(T.position.y=di,Y&&Y.__folders["Globe Model Controls"]){const Vr=Y.__folders["Globe Model Controls"].__folders.Position;if(Vr&&Vr.__controllers){for(let Gr of Vr.__controllers)if(Gr.property==="positionY"){Gr.updateDisplay();break}}}}}}}),b.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:Mn=>{if(!A||!A.color1||!A.color2)return;const gt=Mn.progress,cn=new Ze("#e2e2e2"),En=new Ze("#515151"),Tn=new Ze("#32c2d6"),di=new Ze("#004199"),Vr=cn.clone().lerp(Tn,gt),Gr=En.clone().lerp(di,gt);A.color1.value.copy(Vr),A.color2.value.copy(Gr),gt>.9?window.colorPhase=1:gt<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,c(),wr();const Wr=document.querySelector("#cover-area-overlay");if(Wr){const mo=1-gt,Wl=1+gt*1.2;Wr.style.opacity=mo,Wr.style.filter=`saturate(${Wl})`}}}}),b.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:Mn=>{if(!A||!A.color1||!A.color2)return;const gt=Mn.progress,cn=new Ze("#32c2d6"),En=new Ze("#004199"),Tn=new Ze("#B225B1"),di=new Ze("#FCC72D"),Vr=new Ze("#DA281C"),Gr=new Ze("#FCC72D");let Wr,mo;if(gt<=.28){const Es=gt/.28;Wr=cn.clone().lerp(Tn,Es)}else if(gt<=.75)Wr=Tn.clone();else{const Es=(gt-.75)/.25;Wr=Tn.clone().lerp(Vr,Es)}if(gt<=.48)mo=En.clone();else if(gt<=.75){const Es=(gt-.48)/.27;mo=En.clone().lerp(di,Es)}else{const Es=(gt-.75)/.25;mo=di.clone().lerp(Gr,Es)}A.color1.value.copy(Wr),A.color2.value.copy(mo);const Wl=document.getElementById("shaderBackground");Wl&&(Wl.style.filter="hue-rotate(0deg)"),gt>.9?window.colorPhase=2:gt<.1?window.colorPhase=1:window.colorPhase=1.5,r=Date.now(),window.specialColorsActive=!0,c(),wr()}}}),b.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{console.log("Video travel area: Maintaining phase 2 colors"),A&&A.color1&&A.color2&&(A.color1.value.set("#DA281C"),A.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,c())},onLeaveBack:()=>{console.log("Video travel area: Returning to phase 1->2 transition")}}}),b.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:Mn=>{if(!A||!A.color1||!A.color2)return;const gt=Mn.progress;if(gt>.1)A.color1.value.set("#dcfff6"),A.color2.value.set("#5dff9d"),A.yOffset&&(A.yOffset.value=-.05),A.ambientLight.value=.4,A.directionalLight.value=.4,A.waveAmplitude.value=1.2,A.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,c(),Is(),wr();else if(gt<=.1&&window.colorPhase===3){const cn=A.time.value+A.colorCycleOffset.value;A.colorCycleOffset.value=cn,A.time.value=0,A.color1.value.set("#DA281C"),A.color2.value.set("#FCC72D"),A.yOffset&&et!==void 0&&(A.yOffset.value=et),Le!==void 0&&(A.ambientLight.value=Le),lt!==void 0&&(A.directionalLight.value=lt),A.waveSpeed.value=1,te!==void 0&&(A.waveAmplitude.value=te),Ie!==void 0&&(A.waveFrequency.value=Ie),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c(),Is(),wr()}l()}}}),b.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:Mn=>{const cn=1-Mn.progress,En=Math.pow(cn,3);F&&(F.visible=!0,F.traverse(Tn=>{Tn.isMesh&&Tn.material&&(Array.isArray(Tn.material)?Tn.material.forEach(di=>{di.transparent=!0,di.opacity=En,di.depthWrite=En>.1,di.blending=ds,di.needsUpdate=!0}):(Tn.material.transparent=!0,Tn.material.opacity=En,Tn.material.depthWrite=En>.1,Tn.material.blending=ds,Tn.material.needsUpdate=!0))}),En<.01&&(F.visible=!1),I.opacity=En,I.rotationPaused=En<.01,u()),P&&E&&E.uniforms&&(P.visible=En>.01,E.uniforms.startOpacity.value=S.startOpacity*En,E.uniforms.endOpacity.value=S.endOpacity*En,S.enabled=En>.01,f())}}}),b.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:Mn=>{Mn.progress<=.1&&_e!==void 0&&window.colorPhase===1&&(A.waveSpeed&&(A.waveSpeed.value=_e),A.waveAmplitude&&(A.waveAmplitude.value=te),A.waveFrequency&&(A.waveFrequency.value=Ie),A.yOffset&&(A.yOffset.value=et),Is(),wr())}}});function po(Mn){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Particle System"]){const gt=Y.__folders["Particle System"];if(gt&&gt.__controllers){for(let cn of gt.__controllers)if(cn.property==="value"&&cn.object===Te.uniforms.opacity){cn.updateDisplay();break}}}}}function a(b,k,z,se){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{a(b)});return}b.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:te=>{A&&A.colorDarkness&&(A.colorDarkness.value=2-te.progress*2,window.colorPhase===3?(A.color1&&A.color1.value.set("#dcfff6"),A.color2&&A.color2.value.set("#5dff9d"),A.ambientLight&&(A.ambientLight.value=.4),A.directionalLight&&(A.directionalLight.value=.4),A.waveSpeed&&(A.waveSpeed.value=.9),A.waveAmplitude&&(A.waveAmplitude.value=1.2),window.specialColorsActive=!0,c(),Is(),wr()):window.colorPhase===2?(A.color1&&A.color1.value.set("#da281c"),A.color2&&A.color2.value.set("#FCC72D"),window.specialColorsActive=!0,c(),Is(),wr()):window.colorPhase===1?(A.color1&&A.color1.value.set("#32c2d6"),A.color2&&A.color2.value.set("#004199"),window.specialColorsActive=!0,c(),Is(),wr()):(A.color1&&A.color1.value.set("#e2e2e2"),A.color2&&A.color2.value.set("#515151"),window.specialColorsActive=!0,c(),Is(),wr()),l())}}})}function l(){const b=window.gui,k=window.uniforms;if(typeof b<"u"&&b&&b.__folders&&b.__folders["Color Controls"]){const z=b.__folders["Color Controls"];if(z&&z.__controllers){for(let se of z.__controllers)if(se.property==="value"&&se.object===k.colorDarkness){se.updateDisplay();break}}}}function c(){const b=window.gui,k=window.uniforms;if(typeof b<"u"&&b&&b.__folders&&b.__folders["Color Controls"]){const z=b.__folders["Color Controls"];z&&z.__controllers&&z.__controllers.forEach(se=>{if(se.property==="color"&&se.__color){if(se.property==="color"&&se.__li&&se.__li.querySelector(".property-name").textContent==="Color 1"){const te="#"+k.color1.value.getHexString();se.setValue(te)}else if(se.property==="color"&&se.__li&&se.__li.querySelector(".property-name").textContent==="Color 2"){const te="#"+k.color2.value.getHexString();se.setValue(te)}}})}}function u(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]&&Y.__folders["Globe Model Controls"].__folders&&Y.__folders["Globe Model Controls"].__folders.Material){const b=Y.__folders["Globe Model Controls"].__folders.Material;if(b&&b.__controllers)for(let k of b.__controllers)k.property==="opacity"&&k.updateDisplay()}}function d(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]){const b=Y.__folders["Globe Model Controls"];if(b&&b.__controllers){for(let k of b.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function f(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Gradient Overlay Controls"]){const b=Y.__folders["Gradient Overlay Controls"];if(b&&b.__controllers){for(let k of b.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function h(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const _=window.innerWidth,g=h();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100svh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";const m=new cT({canvas:n,alpha:!0});m.setSize(_,g),m.setPixelRatio(window.devicePixelRatio);const p=new qp,w=new qp;let x=0;const v={zoom:2.471,zPosition:1},y=new Mu(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);y.position.z=v.zPosition,y.zoom=v.zoom,y.updateProjectionMatrix();const T=new Dr;T.position.y=-322,T.frustumCulled=!0,p.add(T);let E,P;const S={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function M(){E=new Oi({transparent:!0,uniforms:{startOpacity:{value:S.startOpacity},endOpacity:{value:S.endOpacity},overlayColor:{value:new Ze(S.color)},offsetY:{value:S.offsetY},heightMultiplier:{value:S.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Di});const b=window.innerHeight,k=y.right-y.left,z=y.top-y.bottom,se=b*.66*(z/b),_e=new Gi(k,se);P=new Jn(_e,E),P.rotation.set(0,0,0),P.position.x=0,P.position.y=S.yOffset*z,P.position.z=-100,P.frustumCulled=!1,P.renderOrder=9999,P.visible=S.enabled,p.add(P)}function D(){if(!P)return;P.rotation.set(0,0,0),P.position.x=0;const b=y.top-y.bottom;P.position.y=S.yOffset*b,P.position.z=-100}M();const I={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},V=new DT;let F;V.load(h1,b=>{F=b.scene;let z=new Ki().setFromObject(F).getCenter(new G),se=new Dr;se.add(F),F.position.set(-z.x,-z.y,-z.z),F=se,F.visible=I.visible,F.frustumCulled=!0,F.traverse(Ie=>{Ie.isMesh&&(Ie.frustumCulled=!0)}),T.add(F),F.position.set(I.positionX,I.positionY,I.positionZ),F.rotation.set(I.rotationX*Math.PI/180,I.rotationY*Math.PI/180,I.rotationZ*Math.PI/180),I.responsive?Ve():(F.scale.set(I.scale,I.scale,I.scale),ft());const _e=ht.addFolder("Material");let te=0;F.traverse(Ie=>{if(Ie.isMesh&&Ie.material){const Le=Ie.material;if(te++,Le.isMeshStandardMaterial||Le.isMeshPhongMaterial){Le.metalness!==void 0&&_e.add({metalness:Le.metalness},"metalness",0,1).name(`Metalness${te>1?" "+te:""}`).onChange(et=>{Le.metalness=et}),Le.roughness!==void 0&&_e.add({roughness:Le.roughness},"roughness",0,1).name(`Roughness${te>1?" "+te:""}`).onChange(et=>{Le.roughness=et}),Le.shininess!==void 0&&_e.add({shininess:Le.shininess},"shininess",0,100).name(`Shininess${te>1?" "+te:""}`).onChange(et=>{Le.shininess=et}),_e.add({opacity:Le.opacity},"opacity",0,1).name(`Opacity${te>1?" "+te:""}`).onChange(et=>{Le.opacity=et,Le.transparent=et<1});const lt=Le.emissive?"#"+Le.emissive.getHexString():"#000000";_e.addColor({color:lt},"color").name(`Emissive Color${te>1?" "+te:""}`).onChange(et=>{Le.emissive&&Le.emissive.set(et)})}}})},b=>{},b=>{}),window.uniforms={time:{value:0},resolution:{value:new Pt(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new Ze("#e2e2e2")},color2:{value:new Ze("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Pt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new G(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const A=window.uniforms,K=`
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
  `,J=`
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
  `,q=new Gi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),fe=new Oi({vertexShader:K,fragmentShader:J,uniforms:A,transparent:!0,side:Di}),O=new Jn(q,fe);p.add(O),window.gui=new LT({width:300,closed:!0});const Y=window.gui;Y.domElement.style.position="absolute",Y.domElement.style.top="10px",Y.domElement.style.right="10px";const $e=Y.domElement.querySelector(".close-button");$e&&($e.innerHTML="Open Controls",$e.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=Y.closed?"Open Controls":"Close Controls"},50)}));const Se=Y.addFolder("Camera Controls");Se.add(v,"zoom",.1,5).name("Zoom Level").step(.001).onChange(b=>{y.zoom=b,y.updateProjectionMatrix()}),Se.close();const j=Y.addFolder("Animation Speed Controls");j.add(A.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(b=>{A.mainSpeed.value=b}),j.add(A.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(b=>{A.waveSpeed.value=b}),j.add(A.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(b=>{A.noiseSpeed.value=b}),j.add(A.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(b=>{A.colorCycleSpeed.value=b}),j.add(A.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(b=>{A.colorCycleOffset.value=b}),j.open();const ae=Y.addFolder("Color Controls"),Me="#"+A.color1.value.getHexString(),me="#"+A.color2.value.getHexString();ae.addColor({color:Me},"color").name("Color 1").onChange(b=>{typeof b=="string"?A.color1.value.set(b):A.color1.value.setRGB(b.r/255,b.g/255,b.b/255)}),ae.addColor({color:me},"color").name("Color 2").onChange(b=>{typeof b=="string"?A.color2.value.set(b):A.color2.value.setRGB(b.r/255,b.g/255,b.b/255)}),ae.add(A.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(b=>{A.colorDarkness.value=b}),ae.add(A.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(b=>{A.colorWaveInfluence.value=b}),ae.add(A.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(b=>{A.colorFrequencyShift.value=b}),ae.add(A.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(b=>{A.colorAmplitudeEffect.value=b}),ae.open();const we=Y.addFolder("Wave Controls");we.add(A.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(b=>{A.waveAmplitude.value=b}),we.add(A.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(b=>{A.waveFrequency.value=b}),we.add(A.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(b=>{A.waveDepth.value=b}),we.add(A.noiseScale,"value",0,5).name("Noise Scale").onChange(b=>{A.noiseScale.value=b}),we.add(A.noiseInfluence,"value",0,1).name("Noise Influence").onChange(b=>{A.noiseInfluence.value=b}),we.add(A.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(b=>{A.layerOffset.value=b});const rt=we.addFolder("Flow Direction");rt.add(A.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(b=>{A.flowDirection.value.x=b}),rt.add(A.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(b=>{A.flowDirection.value.y=b});const ye=Y.addFolder("Appearance Controls"),dt=Y.addFolder("Film Noise Controls");dt.add(A.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(b=>{A.filmNoiseIntensity.value=b}),dt.add(A.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(b=>{A.filmNoiseSpeed.value=b}),dt.add(A.filmGrainSize,"value",.5,50).name("Grain Size").onChange(b=>{A.filmGrainSize.value=b}),dt.add(A.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(b=>{A.filmScratchIntensity.value=b}),ye.add(A.xOffset,"value",-1,1).step(.001).name("X Position").onChange(b=>{A.xOffset.value=b}),ye.add(A.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(b=>{A.yOffset.value=b}),ye.add(A.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(b=>{A.fadeWidth.value=b}),ye.add(A.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(b=>{A.topEdgeSoftness.value=b}),ye.add(A.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(b=>{A.bottomEdgeSoftness.value=b}),ye.add(A.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(b=>{A.leftEdgeSoftness.value=b}),ye.add(A.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(b=>{A.rightEdgeSoftness.value=b}),ye.add(A.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(b=>{A.leftCornerRoundness.value=b}),ye.add(A.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(b=>{A.rightCornerRoundness.value=b}),ye.add(A.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(b=>{A.edgeDepth.value=b}),ye.add(A.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(b=>{A.edgeContrast.value=b}),ye.add(A.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(b=>{A.edgeNoiseAmount.value=b}),ye.add(A.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(b=>{A.edgeNoiseScale.value=b});const mt=Y.addFolder("Bottom Wave Edge Controls");mt.add(A.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(b=>{A.bottomWaveEnabled.value=b,F&&I.responsive&&ft()}),mt.add(A.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(b=>{A.bottomWaveDepth.value=b,F&&I.responsive&&ft()}),mt.add(A.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(b=>{A.bottomWaveWidth.value=b}),mt.add(A.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(b=>{A.bottomWaveSpeed.value=b}),mt.add(A.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(b=>{A.bottomWaveOffset.value=b});const ze=Y.addFolder("Lighting Controls");ze.add(A.ambientLight,"value",0,1).name("Ambient Light").onChange(b=>{A.ambientLight.value=b}),ze.add(A.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(b=>{A.directionalLight.value=b}),ze.add(A.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(b=>{A.specularStrength.value=b}),ze.add(A.shininess,"value",1,128).name("Shininess").onChange(b=>{A.shininess.value=b});const U=ze.addFolder("Light Direction");U.add(A.lightDirection.value,"x",-1,1).name("X").onChange(()=>{A.lightDirection.value.normalize()}),U.add(A.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{A.lightDirection.value.normalize()}),U.add(A.lightDirection.value,"z",0,1).name("Z").onChange(()=>{A.lightDirection.value.normalize()});const ht=Y.addFolder("Globe Model Controls"),ct=new N_(16777215,10);ct.position.set(1,1,1),p.add(ct);const $=new mb(16777215,.5);p.add($);const Fe=ht.addFolder("Lighting");Fe.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(b=>{ct.intensity=b}),ct.intensity=3,Fe.add({intensity:$.intensity},"intensity",0,5).name("Ambient Light").onChange(b=>{$.intensity=b}),ht.add(I,"visible").name("Show Globe").onChange(b=>{F&&(F.visible=b)}),ht.add(I,"scale",.1,50).name("Size").step(.1).onChange(b=>{F&&(I.baseScale=b,F.scale.set(b,b,b))}),ht.add(I,"responsive").name("Responsive Size").onChange(b=>{!b&&F?F.scale.set(I.baseScale,I.baseScale,I.baseScale):b&&Ve()}),ht.add({resizeGlobe:function(){F&&Ve()}},"resizeGlobe").name("Force Resize"),ht.add({positionBehindWave:function(){F&&ft()}},"positionBehindWave").name("Position Behind Wave");function ft(){if(!F)return;const b=window.innerWidth,k=window.innerHeight;if(b<=640){F.position.y=192,F.position.z=-10;for(let te=0;te<ke.__controllers.length;te++){const Ie=ke.__controllers[te];Ie.property==="positionY"?Ie.setValue(192):Ie.property==="positionZ"&&Ie.setValue(-10)}return}if(b>640&&b<=1024){F.position.y=192,F.position.z=-10;for(let Ie=0;Ie<ke.__controllers.length;Ie++){const Le=ke.__controllers[Ie];Le.property==="positionY"?Le.setValue(192):Le.property==="positionZ"&&Le.setValue(-10)}return}const z=A.bottomWaveEnabled.value,se=A.bottomWaveDepth.value,_e=A.edgeDepth.value;if(z){const te=k*se*_e*.5,Le=(y.top-y.bottom)/y.zoom/k,lt=-te*Le-k*.1*Le,et=-10;F.position.y=lt,F.position.z=et;for(let ni=0;ni<ke.__controllers.length;ni++){const _n=ke.__controllers[ni];_n.property==="positionY"?_n.setValue(lt):_n.property==="positionZ"&&_n.setValue(et)}}}function Ve(){if(!F||!I.responsive)return;const b=window.innerWidth,k=b*.9,z={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const se=new Ki().setFromObject(F),_e=se.max.x-se.min.x;F.scale.set(z.x,z.y,z.z);const Ie=(y.right-y.left)/y.zoom/b,lt=k*Ie/_e;F.scale.set(lt,lt,lt);for(let et=0;et<ht.__controllers.length;et++)if(ht.__controllers[et].property==="scale"){ht.__controllers[et].setValue(lt);break}ft()}catch(se){console.error("Error updating globe size:",se),F.scale.set(z.x,z.y,z.z)}}const ke=ht.addFolder("Position");ke.add(I,"positionX",-500,500).name("X Position").step(1).onChange(b=>{F&&(F.position.x=b)}),ke.add(I,"positionY",-500,500).name("Y Position").step(1).onChange(b=>{F&&(F.position.y=b)}),ke.add(I,"positionZ",-500,500).name("Z Position").step(1).onChange(b=>{F&&(F.position.z=b)});const Nt=ht.addFolder("Rotation");Nt.add(I,"rotationX",0,360).name("X Rotation").step(1).onChange(b=>{F&&(F.rotation.x=b*Math.PI/180)}),Nt.add(I,"rotationY",0,360).name("Y Rotation").step(1).onChange(b=>{F&&(F.rotation.y=b*Math.PI/180)}),Nt.add(I,"rotationZ",0,360).name("Z Rotation").step(1).onChange(b=>{F&&(F.rotation.z=b*Math.PI/180)}),ht.add(I,"autoRotate").name("Auto Rotate").onChange(b=>{I.autoRotate=b}),ht.add(I,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(b=>{I.baseRotateSpeed=b}),ht.add(I,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(b=>{I.scrollRotateSpeed=b}),ht.open();const L=Y.addFolder("Gradient Overlay Controls");L.add(S,"enabled").name("Show Overlay").onChange(b=>{P&&(P.visible=b)});const C=L.add(S,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(b=>{E&&(E.uniforms.startOpacity.value=b)});C.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const X=L.add(S,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(b=>{E&&(E.uniforms.endOpacity.value=b)});X.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",L.add(S,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(b=>{P&&D()}),L.add(S,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(b=>{E&&(E.uniforms.offsetY.value=b)}),L.add(S,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(b=>{E&&(E.uniforms.heightMultiplier.value=b)}),L.addColor(S,"color").name("Color").onChange(b=>{E&&E.uniforms.overlayColor.value.set(b)}),L.add({debugOverlay:function(){if(E){const b=E.uniforms.startOpacity.value,k=E.uniforms.endOpacity.value;E.uniforms.startOpacity.value=1,E.uniforms.endOpacity.value=1,E.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{E.uniforms.startOpacity.value=b,E.uniforms.endOpacity.value=k,E.uniforms.overlayColor.value.set(S.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),L.open();let ne=276,ie=new Float32Array(ne*3),Q=new Float32Array(ne*3),xe=new Float32Array(ne*3),ve=0,Ge=0;const re={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let le=window.innerHeight*re.verticalSpread;function Ee(){const b=new Float32Array(ne);for(let k=0;k<ne;k++){const z=k*3,se=Math.random(),_e=re.sizeMin+se*(re.sizeMax-re.sizeMin);b[k]=_e/Te.uniforms.baseSize.value;const te=new Ze(Re.color),Ie=.8+se*.6;xe[z]=te.r*Ie,xe[z+1]=te.g*Ie,xe[z+2]=te.b*Ie}Ae.setAttribute("size",new Gt(b,1)),Ae.attributes.position.needsUpdate=!0,Ae.attributes.color.needsUpdate=!0,Ae.attributes.size.needsUpdate=!0}for(let b=0;b<ne;b++){const k=b*3;ie[k]=(Math.random()-.5)*window.innerWidth,ie[k+1]=(Math.random()-.5)*le+re.verticalOffset,ie[k+2]=Math.random()*500-250,Q[k]=(Math.random()-.5)*.5,Q[k+1]=(Math.random()-.5)*.5,Q[k+2]=(Math.random()-.5)*.2;const z=new Ze("#25e5ff");xe[k]=z.r,xe[k+1]=z.g,xe[k+2]=z.b}const Ae=new ki;Ae.setAttribute("position",new Gt(ie,3)),Ae.setAttribute("color",new Gt(xe,3));const Je=be();function be(){const b=document.createElement("canvas");b.width=256,b.height=256;const k=b.getContext("2d"),z=k.createRadialGradient(b.width/2,b.height/2,0,b.width/2,b.height/2,b.width/2);z.addColorStop(0,"rgba(255, 255, 255, 1.0)"),z.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),z.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),z.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),z.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),z.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),z.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=z,k.fillRect(0,0,b.width,b.height),k.beginPath(),k.moveTo(b.width/2,b.width*.3),k.lineTo(b.width/2,b.width*.7),k.moveTo(b.width*.3,b.height/2),k.lineTo(b.width*.7,b.height/2),k.moveTo(b.width*.35,b.height*.35),k.lineTo(b.width*.65,b.height*.65),k.moveTo(b.width*.65,b.height*.35),k.lineTo(b.width*.35,b.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const se=k.createRadialGradient(b.width/2,b.height/2,b.width*.2,b.width/2,b.height/2,b.width*.7);se.addColorStop(0,"rgba(255, 255, 255, 0.3)"),se.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),se.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=se,k.fillRect(0,0,b.width,b.height);const _e=new xn(b);return _e.needsUpdate=!0,_e}const Te=new Oi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:Je},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:eu,depthWrite:!1,depthTest:!1}),N=new Mf(Ae,Te);N.frustumCulled=!0,w.add(N);const pe=Y.addFolder("Particle System"),ce={count:ne};pe.add(ce,"count",100,1e3,10).name("Particle Count").onChange(b=>{ne=Math.floor(b);const k=new Float32Array(ne*3),z=new Float32Array(ne*3),se=new Float32Array(ne*3);for(let _e=0;_e<ne;_e++){const te=_e*3;if(_e<ie.length/3)k[te]=ie[te],k[te+1]=ie[te+1],k[te+2]=ie[te+2],z[te]=Q[te],z[te+1]=Q[te+1],z[te+2]=Q[te+2],se[te]=xe[te],se[te+1]=xe[te+1],se[te+2]=xe[te+2];else{k[te]=(Math.random()-.5)*window.innerWidth,k[te+1]=(Math.random()-.5)*le+re.verticalOffset,k[te+2]=Math.random()*500-250,z[te]=(Math.random()-.5)*.5,z[te+1]=(Math.random()-.5)*.5,z[te+2]=(Math.random()-.5)*.2;const Ie=new Ze(Re.color);se[te]=Ie.r,se[te+1]=Ie.g,se[te+2]=Ie.b}}ie=k,Q=z,xe=se,Ae.setAttribute("position",new Gt(ie,3)),Ae.setAttribute("color",new Gt(xe,3)),Ae.attributes.position.needsUpdate=!0,Ae.attributes.color.needsUpdate=!0,Ee()});const Re={color:"#25e5ff"};pe.addColor(Re,"color").name("Particle Color").onChange(b=>{const k=new Ze(b);for(let z=0;z<ne;z++){const se=z*3;xe[se]=k.r,xe[se+1]=k.g,xe[se+2]=k.b}Ae.setAttribute("color",new Gt(xe,3)),Ae.attributes.color.needsUpdate=!0}),pe.add(Te.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(b=>{Ee()}),pe.add(Te.uniforms.opacity,"value",0,1,.1).name("Opacity"),pe.add(Te.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(b=>{Te.uniforms.brightness.value=b});const de={intensity:1.5};pe.add(de,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(b=>{Te.uniforms.opacity.value=b});const oe={enabled:!1},He=pe.add(oe,"enabled").name("Size Attenuation").onChange(b=>{b?Te.vertexShader=`
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
        `:Te.vertexShader=`
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
        `,Te.needsUpdate=!0,Ee()}),We=document.createElement("div");We.className="gui-tooltip",We.textContent="When enabled, particles appear smaller as they move further away",We.style.position="absolute",We.style.backgroundColor="rgba(0,0,0,0.8)",We.style.color="#fff",We.style.padding="5px",We.style.borderRadius="3px",We.style.fontSize="11px",We.style.zIndex="10000",We.style.display="none",document.body.appendChild(We);const Lt=He.domElement;Lt.addEventListener("mouseenter",b=>{const k=Lt.getBoundingClientRect();We.style.left=k.right+"px",We.style.top=k.top+"px",We.style.display="block"}),Lt.addEventListener("mouseleave",()=>{We.style.display="none"});let Ne=0;window.addEventListener("scroll",()=>{ve=window.scrollY});let De=[],nt={x:0,y:0},Ce={x:0,y:0},ut=0,Xe=0,it=!1,Zt=250,ot=[],zt=10,Ht,Tt=!1,At=[];const Pe={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window,spawnRate:.52,maxParticles:150,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};Ht=Pe.spawnOffsetMin,window.enableMouseParticles=function(){Pe.mobileDisabled||(Pe.enabled=!0)};const yt=new ki,wn=new Oi({uniforms:{baseSize:{value:Pe.baseSize},map:{value:Je},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:eu,depthWrite:!1,depthTest:!1}),ti=new Mf(yt,wn);w.add(ti);function en(b,k){const z=b/window.innerWidth*2-1,se=-(k/window.innerHeight)*2+1,_e=z*(y.right-y.left)/2/y.zoom,te=se*(y.top-y.bottom)/2/y.zoom;return{x:_e,y:te}}function an(b,k){return{id:ut++,position:{x:b,y:k,z:Math.random()*100-50},targetPosition:{x:b,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Pe.minLifetime+Math.random()*(Pe.maxLifetime-Pe.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function R(b,k){return{id:ut++,position:{x:b,y:k,z:Math.random()*100-50},originalPosition:{x:b,y:k},targetPosition:{x:b,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:Pe.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}function H(){const b=[...De,...At];if(b.length===0){yt.attributes.position&&(yt.setAttribute("position",new Gt(new Float32Array(0),3)),yt.setAttribute("color",new Gt(new Float32Array(0),3)),yt.setAttribute("size",new Gt(new Float32Array(0),1)),yt.setAttribute("opacity",new Gt(new Float32Array(0),1)));return}const k=new Float32Array(b.length*3),z=new Float32Array(b.length*3),se=new Float32Array(b.length),_e=new Float32Array(b.length);for(let te=0;te<b.length;te++){const Ie=b[te],Le=te*3;k[Le]=Ie.position.x,k[Le+1]=Ie.position.y,k[Le+2]=Ie.position.z,z[Le]=Ie.color.r,z[Le+1]=Ie.color.g,z[Le+2]=Ie.color.b,se[te]=Ie.size,_e[te]=Ie.opacity}yt.setAttribute("position",new Gt(k,3)),yt.setAttribute("color",new Gt(z,3)),yt.setAttribute("size",new Gt(se,1)),yt.setAttribute("opacity",new Gt(_e,1)),yt.attributes.position.needsUpdate=!0,yt.attributes.color.needsUpdate=!0,yt.attributes.size.needsUpdate=!0,yt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",b=>{if(!Pe.enabled||Pe.mobileDisabled)return;Ce.x=nt.x,Ce.y=nt.y,nt.x=b.clientX,nt.y=b.clientY;const k=nt.x-Ce.x,z=nt.y-Ce.y,se=Math.sqrt(k*k+z*z);if(it||(Xe+=se,Xe>=Zt&&(it=!0)),ot.push(se),ot.length>zt&&ot.shift(),ot.length>0){const _e=ot.reduce((Le,lt)=>Le+lt,0)/ot.length,Ie=Math.min(_e/20,1);Ht=Pe.spawnOffsetMin+(Pe.spawnOffsetMax-Pe.spawnOffsetMin)*Ie}if(it&&se>1&&De.length<Pe.maxParticles&&Math.random()<Pe.spawnRate){const _e=en(nt.x,nt.y),te=Ht*50,Ie=Math.random()*Math.PI*2,Le=Math.cos(Ie)*te*Math.random(),lt=Math.sin(Ie)*te*Math.random(),et=an(_e.x+Le,_e.y+lt);De.push(et)}if(Tt&&De.length<Pe.maxParticles&&Math.random()<.8){const _e=en(nt.x,nt.y),te=10,Ie=Math.random()*Math.PI*2,Le=Math.cos(Ie)*te*Math.random(),lt=Math.sin(Ie)*te*Math.random(),et=R(_e.x+Le,_e.y+lt);At.push(et)}}),window.addEventListener("mousedown",b=>{!Pe.enabled||Pe.mobileDisabled||b.button===0&&(Tt=!0)}),window.addEventListener("mouseup",b=>{b.button===0&&(Tt=!1)});let Z={x:0,y:0},W={x:0,y:0},B=!1;window.addEventListener("touchstart",b=>{if(!Pe.enabled||Pe.mobileDisabled)return;const k=b.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||b.preventDefault();const se=b.touches[0];W.x=se.clientX,W.y=se.clientY,Z.x=W.x,Z.y=W.y,B=!0,Tt=!0},{passive:!1}),window.addEventListener("touchmove",b=>{if(!Pe.enabled||Pe.mobileDisabled||!B)return;const k=b.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||b.preventDefault();const se=b.touches[0];Z.x=W.x,Z.y=W.y,W.x=se.clientX,W.y=se.clientY,nt.x=W.x,nt.y=W.y;const _e=W.x-Z.x,te=W.y-Z.y,Ie=Math.sqrt(_e*_e+te*te);if(it||(Xe+=Ie,Xe>=Zt&&(it=!0)),ot.push(Ie),ot.length>zt&&ot.shift(),ot.length>0){const Le=ot.reduce((ni,_n)=>ni+_n,0)/ot.length,et=Math.min(Le/20,1);Ht=Pe.spawnOffsetMin+(Pe.spawnOffsetMax-Pe.spawnOffsetMin)*et}if(it&&Ie>1&&De.length<Pe.maxParticles&&Math.random()<Pe.spawnRate){const Le=en(W.x,W.y),lt=Ht*50,et=Math.random()*Math.PI*2,ni=Math.cos(et)*lt*Math.random(),_n=Math.sin(et)*lt*Math.random(),po=an(Le.x+ni,Le.y+_n);De.push(po)}if(Tt&&De.length<Pe.maxParticles&&Math.random()<.8){const Le=en(W.x,W.y),lt=10,et=Math.random()*Math.PI*2,ni=Math.cos(et)*lt*Math.random(),_n=Math.sin(et)*lt*Math.random(),po=R(Le.x+ni,Le.y+_n);At.push(po)}},{passive:!1}),window.addEventListener("touchend",b=>{B=!1,Tt=!1}),window.addEventListener("touchcancel",b=>{B=!1,Tt=!1});function he(){if(De.length===0&&At.length===0||Pe.mobileDisabled)return;const b=en(nt.x,nt.y);for(let k=De.length-1;k>=0;k--){const z=De[k];if(z.life+=.016,!z.isDrawn){z.targetPosition.x=b.x,z.targetPosition.y=b.y;const _e=z.trailSpeed*Pe.trailLength;z.position.x+=(z.targetPosition.x-z.position.x)*_e,z.position.y+=(z.targetPosition.y-z.position.y)*_e,z.position.x+=(Math.random()-.5)*2*Pe.jitterAmount,z.position.y+=(Math.random()-.5)*2*Pe.jitterAmount}const se=z.life/z.maxLife;if(se<.15){z.fadePhase="in";const _e=se/.15,te=1-Math.pow(1-_e,2);z.opacity=te*Pe.fadeInSpeed}else if(se<.65)z.fadePhase="hold",z.opacity=Pe.fadeInSpeed;else{z.fadePhase="out";const _e=(se-.65)/.35,te=Math.pow(1-_e,2);z.opacity=te*Pe.fadeInSpeed*Pe.fadeOutSpeed}(z.life>=z.maxLife||z.opacity<=0)&&De.splice(k,1)}for(let k=At.length-1;k>=0;k--){const z=At[k];z.life+=.016,z.twinklePhase+=.016*z.twinkleSpeed;const se=Math.sin(z.twinklePhase)*z.twinkleRadius*.4,_e=Math.cos(z.twinklePhase*1.05)*z.twinkleRadius*.4;z.position.x=z.originalPosition.x+se,z.position.y=z.originalPosition.y+_e;const te=z.life/z.maxLife;if(te<.15){z.fadePhase="in";const Le=te/.15,lt=1-Math.pow(1-Le,2);z.baseOpacity=lt*Pe.fadeInSpeed}else if(te<.85)z.fadePhase="hold",z.baseOpacity=Pe.fadeInSpeed;else{z.fadePhase="out";const Le=(te-.85)/.15,lt=Math.pow(1-Le,2);z.baseOpacity=lt*Pe.fadeInSpeed*Pe.fadeOutSpeed}const Ie=.7+.3*Math.sin(z.twinklePhase*2);z.opacity=z.baseOpacity*Ie,(z.life>=z.maxLife||z.opacity<=0)&&At.splice(k,1)}H(),qe.currentOffset=Ht}const ge=Y.addFolder("Mouse Follow Particles");ge.add({mobileDetected:Pe.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),ge.add(Pe,"enabled").name("Enable Mouse Particles").onChange(b=>{b||(De=[],At=[],H(),it=!1,Xe=0,ot=[],Ht=Pe.spawnOffsetMin,Tt=!1)}),ge.add(Pe,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(b=>{Pe.spawnRate=b}),ge.add(Pe,"maxParticles",10,50,1).name("Max Particles").onChange(b=>{for(Pe.maxParticles=b;De.length>b;)De.pop();H()}),ge.add(Pe,"baseSize",2,10,.5).name("Particle Size").onChange(b=>{wn.uniforms.baseSize.value=b}),ge.add(Pe,"trailLength",.1,1,.1).name("Trail Length").onChange(b=>{Pe.trailLength=b}),ge.add(Pe,"speedVariation",0,1,.1).name("Speed Variation").onChange(b=>{Pe.speedVariation=b}),ge.add(Pe,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(b=>{Pe.jitterAmount=b}),ge.add(Pe,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(b=>{Pe.spawnOffsetMin=b}),ge.add(Pe,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(b=>{Pe.spawnOffsetMax=b});const qe={currentOffset:Ht};ge.add(qe,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),ge.add(Pe,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(b=>{Pe.fadeInSpeed=b}),ge.add(Pe,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(b=>{Pe.fadeOutSpeed=b}),ge.add(Pe,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(b=>{Pe.drawnLife=b}),ge.add({movementThreshold:Zt},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(b=>{Zt=b}),ge.add({resetActivation:function(){it=!1,Xe=0,ot=[],Ht=Pe.spawnOffsetMin,De=[],At=[],Tt=!1,H()}},"resetActivation").name("Reset Activation"),ge.close();function Be(){const b=Ae.attributes.position.array,k=re.previousOffset||0,z=re.verticalOffset-k;re.previousOffset=re.verticalOffset;for(let se=0;se<ne;se++){const _e=se*3;b[_e+1]+=z;const te=b[_e+1]-re.verticalOffset,Ie=le/2;te>Ie?b[_e+1]=-Ie+re.verticalOffset:te<-Ie&&(b[_e+1]=Ie+re.verticalOffset)}Ae.attributes.position.needsUpdate=!0}function Qe(){const b=Ae.attributes.position.array,k=Ae.attributes.color.array,z=Ae.attributes.size?Ae.attributes.size.array:null;Ne+=.01;const se=(ve-Ge)*re.scrollSpeed;if(Ge=ve*(1-re.damping)+Ge*re.damping,!window.particlesMovementPaused){for(let _e=0;_e<ne;_e++){const te=_e*3,Ie=z?(z[_e]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Le=re.floatSpeed*(.5+Ie*.5);b[te]+=Q[te]*Le,b[te+1]+=Q[te+1]*Le,b[te+2]+=Q[te+2]*Le,b[te+1]+=se*(.5+Ie*.5),Math.abs(b[te])>window.innerWidth/2&&(Q[te]*=-1);const lt=b[te+1]-re.verticalOffset,et=le/2;lt>et?b[te+1]=-et+re.verticalOffset:lt<-et&&(b[te+1]=et+re.verticalOffset),Math.abs(b[te+2])>250&&(Q[te+2]*=-1)}Ae.attributes.position.needsUpdate=!0}for(let _e=0;_e<ne;_e++){const te=_e*3,Ie=z?(z[_e]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Le=new Ze(Re.color),lt=.2*Math.sin(Ne+_e*.1)+.9,et=.8+Ie*.6;k[te]=Le.r*lt*et,k[te+1]=Le.g*lt*et,k[te+2]=Le.b*lt*et}Ae.attributes.color.needsUpdate=!0,requestAnimationFrame(Qe)}Qe();function st(){if(requestAnimationFrame(st),A.time.value+=.001,t()&&Date.now()-r>e){console.log("Timeout reached while above Phase 3 trigger (25s), stabilizing background effects");const k=A.time.value+A.colorCycleOffset.value;A.colorCycleOffset.value=k,A.time.value=0,r=Date.now()}if(he(),!window.particlesFullyHidden&&Te.uniforms.opacity.value<x&&(Te.uniforms.opacity.value+=.002,Te.uniforms.opacity.value>x&&(Te.uniforms.opacity.value=x)),window.particlesFullyHidden&&Te.uniforms.opacity.value>0&&(Te.uniforms.opacity.value=0),F&&I.autoRotate&&!I.rotationPaused){const b=I.baseRotateSpeed;F.rotation.y+=b*.01}P&&(P.rotation.set(0,0,0),D()),m.autoClear=!0,m.render(p,y),(!window.particlesFullyHidden||De.length>0&&Pe.enabled)&&(m.autoClear=!1,m.render(w,y))}st(),document.addEventListener("veryEarlyParticleFade",()=>{x=.1}),document.addEventListener("particleFadeStart",()=>{x=.3}),document.addEventListener("heroAnimationComplete",()=>{x=.5});function Ke(){if(P){const b=window.innerHeight,k=y.right-y.left,se=(y.top-y.bottom)/b,_e=k,te=b*.66*se;P.geometry.dispose(),P.geometry=new Gi(_e,te),P.rotation.set(0,0,0),D()}}let pt,bt;function Xt(){const b=window.innerWidth,k=h();if(m.setSize(b,k),y.left=-b/2,y.right=b/2,y.top=k/2,y.bottom=-k/2,y.updateProjectionMatrix(),A.resolution.value.set(b,k),O.geometry.dispose(),O.geometry=new Gi(b,k,b/10,k/10),le=k*re.verticalSpread,typeof Y<"u"&&Y&&Y.__folders["Particle System"]){const z=Y.__folders["Particle System"];if(z&&z.__controllers){for(let se=0;se<z.__controllers.length;se++)if(z.__controllers[se].property==="verticalOffset"){z.__controllers[se].min(-k*3),z.__controllers[se].max(k*2);break}}}if(F&&I.responsive){clearTimeout(bt),bt=setTimeout(()=>{Ve()},150);for(let z=0;z<ke.__controllers.length;z++){const se=ke.__controllers[z];se.property==="positionX"?(se.min(-b/2),se.max(b/2)):se.property==="positionY"&&(se.min(-k/2),se.max(k/2))}}Ke()}window.addEventListener("resize",()=>{clearTimeout(pt),clearTimeout(bt),F&&I.responsive&&(bt=setTimeout(()=>{Ve()},150)),pt=setTimeout(Xt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(pt),clearTimeout(bt),F&&I.responsive&&(bt=setTimeout(()=>{Ve()},300)),pt=setTimeout(Xt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(bt);const b=window.innerWidth,k=h();window.lastKnownDimensions||(window.lastKnownDimensions={width:b,height:k});const z=Math.abs(b-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,se=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;z>.05||se>.05?(window.lastKnownDimensions.width=b,window.lastKnownDimensions.height=k,F&&I.responsive&&(bt=setTimeout(()=>{Ve()},150)),setTimeout(Xt,100)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:h()}});let qt=h();function kt(){const b=h();Math.abs(b-qt)>50&&(Xt(),qt=b),requestAnimationFrame(kt)}kt(),window.addEventListener("keydown",b=>{if((b.key==="+"||b.key==="=")&&(v.zoom=Math.min(v.zoom+.1,5),y.zoom=v.zoom,y.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="zoom"){k.__controllers[z].updateDisplay();break}}}if((b.key==="-"||b.key==="_")&&(v.zoom=Math.max(v.zoom-.1,.1),y.zoom=v.zoom,y.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="zoom"){k.__controllers[z].updateDisplay();break}}}}),pe.add(re,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(b=>{re.scrollSpeed=b}),pe.add(re,"damping",.8,.99,.01).name("Scroll Damping").onChange(b=>{re.damping=b}),pe.add(re,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(b=>{const k=le;le=window.innerHeight*b;const z=le/k,se=Ae.attributes.position.array;for(let _e=0;_e<ne;_e++){const te=_e*3,Le=(se[te+1]-re.verticalOffset)*z;se[te+1]=Le+re.verticalOffset,Math.abs(Le)>le/2&&(se[te+1]=(Math.random()-.5)*le+re.verticalOffset)}Ae.attributes.position.needsUpdate=!0}),pe.add(re,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(b=>{re.previousOffset===void 0&&(re.previousOffset=0),re.verticalOffset=b,Be()}),pe.add(re,"sizeMin",1,5,.01).name("Min Particle Size").onChange(b=>{if(re.sizeMin=b,re.sizeMin>=re.sizeMax&&(re.sizeMax=re.sizeMin+1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="sizeMax"){k.__controllers[z].updateDisplay();break}}}Ee()}),pe.add(re,"sizeMax",5,10,.01).name("Max Particle Size").onChange(b=>{if(re.sizeMax=b,re.sizeMax<=re.sizeMin&&(re.sizeMin=re.sizeMax-1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let z=0;z<k.__controllers.length;z++)if(k.__controllers[z].property==="sizeMin"){k.__controllers[z].updateDisplay();break}}}Ee()}),pe.add(re,"floatSpeed",.1,3,.1).name("Float Speed").onChange(b=>{re.floatSpeed=b}),Ee();const at=Ae.attributes.position.array;for(let b=0;b<ne;b++){const k=b*3;at[k+1]=(Math.random()-.5)*le+re.verticalOffset}Ae.attributes.position.needsUpdate=!0,pe.add(Te.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(b=>{Te.uniforms.haloStrength.value=b}),pe.add(Te.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(b=>{Te.uniforms.haloSize.value=b});let jt;window.addEventListener("scroll",()=>{jt&&clearTimeout(jt),jt=setTimeout(()=>{},150)})}function Is(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function wr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}else console.log("WARNING: Wave Controls folder not found")}const m1="/150-lab/assets/video/acs-150-compressed.mp4",g1="/150-lab/assets/images/anniversary-video-poster.jpg";function _1(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=m1,r.poster=g1,r.addEventListener("error",Se=>{var j,ae;console.error("Video loading error:",Se),console.error("Video src:",r.src),console.error("Video error code:",(j=r.error)==null?void 0:j.code),console.error("Video error message:",(ae=r.error)==null?void 0:ae.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
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
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const j=r.volume/_*100;o.style.width=j+"%",a.style.left=j+"%"},p=Se=>{const j=s.getBoundingClientRect(),Me=Math.max(0,Math.min(100,(Se-j.left)/j.width*100))/100*_;r.volume=Me,m()};s.addEventListener("mousedown",Se=>{h=!0,p(Se.clientX),Se.preventDefault()}),document.addEventListener("mousemove",Se=>{h&&p(Se.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const w=r.parentNode;w.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),w.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,m();let x=!1;const v=()=>{if(r.duration&&!x){const Se=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=Se+"%",f.style.left=Se+"%"}},y=Se=>{const j=u.getBoundingClientRect(),Me=Math.max(0,Math.min(100,(Se-j.left)/j.width*100))/100*r.duration;r.currentTime=Me,v(),r.paused||D()},T=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},E=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",Se=>{x=!0,T(),y(Se.clientX),Se.preventDefault()}),u.addEventListener("click",Se=>{x||(T(),y(Se.clientX),setTimeout(()=>{E()},50))}),document.addEventListener("mousemove",Se=>{x&&y(Se.clientX)}),document.addEventListener("mouseup",()=>{x=!1,E()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{x||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let P=null,S=0;const M=()=>{if(r.duration&&!x&&!r.paused){const Se=performance.now();if(Se-S>=16.67){const j=r.currentTime/r.duration*100;d.style.width=j+"%",f.style.left=j+"%",S=Se}P=requestAnimationFrame(M)}},D=()=>{P&&cancelAnimationFrame(P),S=performance.now(),P=requestAnimationFrame(M)},I=()=>{P&&(cancelAnimationFrame(P),P=null)};r.addEventListener("play",D),r.addEventListener("pause",I),r.addEventListener("timeupdate",v),v();const V=(Se,j,ae=1e3)=>{if(!Se)return;const Me=Se.volume,me=performance.now(),we=rt=>{const ye=rt-me,dt=Math.min(ye/ae,1),mt=dt*dt;Se.volume=Me+(j-Me)*mt,dt<1&&requestAnimationFrame(we)};requestAnimationFrame(we)};let F=g,A=null;const K=()=>{r.paused||(F=r.volume,V(r,0,600),A=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&V(window.backgroundAudio,.25),A=null},600))},J=()=>{r.paused||(A&&(clearTimeout(A),A=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&V(window.backgroundAudio,.25))},q=()=>{r.paused?(A&&(clearTimeout(A),A=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&V(window.backgroundAudio,0),window.audioMuted?r.volume=0:r.volume=F,m(),D()):J()};t.addEventListener("click",q),r.addEventListener("click",q),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&V(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&V(window.backgroundAudio,.25)}),new IntersectionObserver(Se=>{Se.forEach(j=>{j.isIntersecting||K()})},{threshold:.5}).observe(e);const O=()=>{r.paused||(window.audioMuted?r.volume=0:r.volume=F,m())},Y=document.querySelector(".sound-toggle");Y&&Y.addEventListener("click",O);let $e=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return $e},set:function(Se){$e=Se,O()}})}function v1(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function y1(r,e,t){return e&&v1(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var On,Gc,vi,is,rs,$o,K_,ks,sl,Z_,Or,Vi,J_,Q_=function(){return On||typeof window<"u"&&(On=window.gsap)&&On.registerPlugin&&On},e0=1,Vo=[],Mt=[],ur=[],ol=Date.now,Of=function(e,t){return t},x1=function(){var e=sl.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Mt),i.push.apply(i,ur),Mt=n,ur=i,Of=function(o,a){return t[o](a)}},hs=function(e,t){return~ur.indexOf(e)&&ur[ur.indexOf(e)+1][t]},al=function(e){return!!~Z_.indexOf(e)},Xn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Wn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},xc="scrollLeft",bc="scrollTop",Nf=function(){return Or&&Or.isPressed||Mt.cache++},lu=function(e,t){var n=function i(s){if(s||s===0){e0&&(vi.history.scrollRestoration="manual");var o=Or&&Or.isPressed;s=i.v=Math.round(s)||(Or&&Or.iOS?1:0),e(s),i.cacheID=Mt.cache,o&&Of("ss",s)}else(t||Mt.cache!==i.cacheID||Of("ref"))&&(i.cacheID=Mt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Zn={s:xc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:lu(function(r){return arguments.length?vi.scrollTo(r,yn.sc()):vi.pageXOffset||is[xc]||rs[xc]||$o[xc]||0})},yn={s:bc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Zn,sc:lu(function(r){return arguments.length?vi.scrollTo(Zn.sc(),r):vi.pageYOffset||is[bc]||rs[bc]||$o[bc]||0})},ii=function(e,t){return(t&&t._ctx&&t._ctx.selector||On.utils.toArray)(e)[0]||(typeof e=="string"&&On.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},vs=function(e,t){var n=t.s,i=t.sc;al(e)&&(e=is.scrollingElement||rs);var s=Mt.indexOf(e),o=i===yn.sc?1:2;!~s&&(s=Mt.push(e)-1),Mt[s+o]||Xn(e,"scroll",Nf);var a=Mt[s+o],l=a||(Mt[s+o]=lu(hs(e,n),!0)||(al(e)?i:lu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=On.getProperty(e,"scrollBehavior")==="smooth"),l},Uf=function(e,t,n){var i=e,s=e,o=ol(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=ol();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=ol();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},Fa=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Jm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},t0=function(){sl=On.core.globals().ScrollTrigger,sl&&sl.core&&x1()},n0=function(e){return On=e||Q_(),!Gc&&On&&typeof document<"u"&&document.body&&(vi=window,is=document,rs=is.documentElement,$o=is.body,Z_=[vi,is,rs,$o],On.utils.clamp,J_=On.core.context||function(){},ks="onpointerenter"in $o?"pointer":"mouse",K_=fn.isTouch=vi.matchMedia&&vi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in vi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Vi=fn.eventTypes=("ontouchstart"in rs?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in rs?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return e0=0},500),t0(),Gc=1),Gc};Zn.op=yn;Mt.cache=0;var fn=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Gc||n0(On)||console.warn("Please gsap.registerPlugin(Observer)"),sl||t0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,w=n.onDrag,x=n.onPress,v=n.onRelease,y=n.onRight,T=n.onLeft,E=n.onUp,P=n.onDown,S=n.onChangeX,M=n.onChangeY,D=n.onChange,I=n.onToggleX,V=n.onToggleY,F=n.onHover,A=n.onHoverEnd,K=n.onMove,J=n.ignoreCheck,q=n.isNormalizer,fe=n.onGestureStart,O=n.onGestureEnd,Y=n.onWheel,$e=n.onEnable,Se=n.onDisable,j=n.onClick,ae=n.scrollSpeed,Me=n.capture,me=n.allowClicks,we=n.lockAxis,rt=n.onLockAxis;this.target=a=ii(a)||rs,this.vars=n,h&&(h=On.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,ae=ae||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(vi.getComputedStyle($o).lineHeight)||22);var ye,dt,mt,ze,U,ht,ct,$=this,Fe=0,ft=0,Ve=n.passive||!u&&n.passive!==!1,ke=vs(a,Zn),Nt=vs(a,yn),L=ke(),C=Nt(),X=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Vi[0]==="pointerdown",ne=al(a),ie=a.ownerDocument||is,Q=[0,0,0],xe=[0,0,0],ve=0,Ge=function(){return ve=ol()},re=function(De,nt){return($.event=De)&&h&&~h.indexOf(De.target)||nt&&X&&De.pointerType!=="touch"||J&&J(De,nt)},le=function(){$._vx.reset(),$._vy.reset(),dt.pause(),d&&d($)},Ee=function(){var De=$.deltaX=Jm(Q),nt=$.deltaY=Jm(xe),Ce=Math.abs(De)>=i,ut=Math.abs(nt)>=i;D&&(Ce||ut)&&D($,De,nt,Q,xe),Ce&&(y&&$.deltaX>0&&y($),T&&$.deltaX<0&&T($),S&&S($),I&&$.deltaX<0!=Fe<0&&I($),Fe=$.deltaX,Q[0]=Q[1]=Q[2]=0),ut&&(P&&$.deltaY>0&&P($),E&&$.deltaY<0&&E($),M&&M($),V&&$.deltaY<0!=ft<0&&V($),ft=$.deltaY,xe[0]=xe[1]=xe[2]=0),(ze||mt)&&(K&&K($),mt&&(m&&mt===1&&m($),w&&w($),mt=0),ze=!1),ht&&!(ht=!1)&&rt&&rt($),U&&(Y($),U=!1),ye=0},Ae=function(De,nt,Ce){Q[Ce]+=De,xe[Ce]+=nt,$._vx.update(De),$._vy.update(nt),c?ye||(ye=requestAnimationFrame(Ee)):Ee()},Je=function(De,nt){we&&!ct&&($.axis=ct=Math.abs(De)>Math.abs(nt)?"x":"y",ht=!0),ct!=="y"&&(Q[2]+=De,$._vx.update(De,!0)),ct!=="x"&&(xe[2]+=nt,$._vy.update(nt,!0)),c?ye||(ye=requestAnimationFrame(Ee)):Ee()},be=function(De){if(!re(De,1)){De=Fa(De,u);var nt=De.clientX,Ce=De.clientY,ut=nt-$.x,Xe=Ce-$.y,it=$.isDragging;$.x=nt,$.y=Ce,(it||(ut||Xe)&&(Math.abs($.startX-nt)>=s||Math.abs($.startY-Ce)>=s))&&(mt=it?2:1,it||($.isDragging=!0),Je(ut,Xe))}},Te=$.onPress=function(Ne){re(Ne,1)||Ne&&Ne.button||($.axis=ct=null,dt.pause(),$.isPressed=!0,Ne=Fa(Ne),Fe=ft=0,$.startX=$.x=Ne.clientX,$.startY=$.y=Ne.clientY,$._vx.reset(),$._vy.reset(),Xn(q?a:ie,Vi[1],be,Ve,!0),$.deltaX=$.deltaY=0,x&&x($))},N=$.onRelease=function(Ne){if(!re(Ne,1)){Wn(q?a:ie,Vi[1],be,!0);var De=!isNaN($.y-$.startY),nt=$.isDragging,Ce=nt&&(Math.abs($.x-$.startX)>3||Math.abs($.y-$.startY)>3),ut=Fa(Ne);!Ce&&De&&($._vx.reset(),$._vy.reset(),u&&me&&On.delayedCall(.08,function(){if(ol()-ve>300&&!Ne.defaultPrevented){if(Ne.target.click)Ne.target.click();else if(ie.createEvent){var Xe=ie.createEvent("MouseEvents");Xe.initMouseEvent("click",!0,!0,vi,1,ut.screenX,ut.screenY,ut.clientX,ut.clientY,!1,!1,!1,!1,0,null),Ne.target.dispatchEvent(Xe)}}})),$.isDragging=$.isGesturing=$.isPressed=!1,d&&nt&&!q&&dt.restart(!0),mt&&Ee(),p&&nt&&p($),v&&v($,Ce)}},pe=function(De){return De.touches&&De.touches.length>1&&($.isGesturing=!0)&&fe(De,$.isDragging)},ce=function(){return($.isGesturing=!1)||O($)},Re=function(De){if(!re(De)){var nt=ke(),Ce=Nt();Ae((nt-L)*ae,(Ce-C)*ae,1),L=nt,C=Ce,d&&dt.restart(!0)}},de=function(De){if(!re(De)){De=Fa(De,u),Y&&(U=!0);var nt=(De.deltaMode===1?l:De.deltaMode===2?vi.innerHeight:1)*_;Ae(De.deltaX*nt,De.deltaY*nt,0),d&&!q&&dt.restart(!0)}},oe=function(De){if(!re(De)){var nt=De.clientX,Ce=De.clientY,ut=nt-$.x,Xe=Ce-$.y;$.x=nt,$.y=Ce,ze=!0,d&&dt.restart(!0),(ut||Xe)&&Je(ut,Xe)}},He=function(De){$.event=De,F($)},We=function(De){$.event=De,A($)},Lt=function(De){return re(De)||Fa(De,u)&&j($)};dt=$._dc=On.delayedCall(f||.25,le).pause(),$.deltaX=$.deltaY=0,$._vx=Uf(0,50,!0),$._vy=Uf(0,50,!0),$.scrollX=ke,$.scrollY=Nt,$.isDragging=$.isGesturing=$.isPressed=!1,J_(this),$.enable=function(Ne){return $.isEnabled||(Xn(ne?ie:a,"scroll",Nf),o.indexOf("scroll")>=0&&Xn(ne?ie:a,"scroll",Re,Ve,Me),o.indexOf("wheel")>=0&&Xn(a,"wheel",de,Ve,Me),(o.indexOf("touch")>=0&&K_||o.indexOf("pointer")>=0)&&(Xn(a,Vi[0],Te,Ve,Me),Xn(ie,Vi[2],N),Xn(ie,Vi[3],N),me&&Xn(a,"click",Ge,!0,!0),j&&Xn(a,"click",Lt),fe&&Xn(ie,"gesturestart",pe),O&&Xn(ie,"gestureend",ce),F&&Xn(a,ks+"enter",He),A&&Xn(a,ks+"leave",We),K&&Xn(a,ks+"move",oe)),$.isEnabled=!0,$.isDragging=$.isGesturing=$.isPressed=ze=mt=!1,$._vx.reset(),$._vy.reset(),L=ke(),C=Nt(),Ne&&Ne.type&&Te(Ne),$e&&$e($)),$},$.disable=function(){$.isEnabled&&(Vo.filter(function(Ne){return Ne!==$&&al(Ne.target)}).length||Wn(ne?ie:a,"scroll",Nf),$.isPressed&&($._vx.reset(),$._vy.reset(),Wn(q?a:ie,Vi[1],be,!0)),Wn(ne?ie:a,"scroll",Re,Me),Wn(a,"wheel",de,Me),Wn(a,Vi[0],Te,Me),Wn(ie,Vi[2],N),Wn(ie,Vi[3],N),Wn(a,"click",Ge,!0),Wn(a,"click",Lt),Wn(ie,"gesturestart",pe),Wn(ie,"gestureend",ce),Wn(a,ks+"enter",He),Wn(a,ks+"leave",We),Wn(a,ks+"move",oe),$.isEnabled=$.isPressed=$.isDragging=!1,Se&&Se($))},$.kill=$.revert=function(){$.disable();var Ne=Vo.indexOf($);Ne>=0&&Vo.splice(Ne,1),Or===$&&(Or=0)},Vo.push($),q&&al(a)&&(Or=$),$.enable(g)},y1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();fn.version="3.12.7";fn.create=function(r){return new fn(r)};fn.register=n0;fn.getAll=function(){return Vo.slice()};fn.getById=function(r){return Vo.filter(function(e){return e.vars.id===r})[0]};Q_()&&On.registerPlugin(fn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,ko,wt,Jt,_i,Bt,Uh,cu,Cl,ll,Wa,Sc,kn,Tu,Ff,jn,Qm,eg,Bo,i0,vd,r0,Yn,kf,s0,o0,es,Bf,Fh,Ko,kh,uu,zf,yd,wc=1,Bn=Date.now,xd=Bn(),Fi=0,Xa=0,tg=function(e,t,n){var i=mi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},ng=function(e,t){return t&&(!mi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},b1=function r(){return Xa&&requestAnimationFrame(r)},ig=function(){return Tu=1},rg=function(){return Tu=0},tr=function(e){return e},qa=function(e){return Math.round(e*1e5)/1e5||0},a0=function(){return typeof window<"u"},l0=function(){return je||a0()&&(je=window.gsap)&&je.registerPlugin&&je},oo=function(e){return!!~Uh.indexOf(e)},c0=function(e){return(e==="Height"?kh:wt["inner"+e])||_i["client"+e]||Bt["client"+e]},u0=function(e){return hs(e,"getBoundingClientRect")||(oo(e)?function(){return jc.width=wt.innerWidth,jc.height=kh,jc}:function(){return Rr(e)})},S1=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=hs(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?c0(s):e["client"+s])||0}},w1=function(e,t){return!t||~ur.indexOf(e)?u0(e):function(){return jc}},or=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=hs(e,n))?o()-u0(e)()[s]:oo(e)?(_i[n]||Bt[n])-c0(i):e[n]-e["offset"+i])},Mc=function(e,t){for(var n=0;n<Bo.length;n+=3)(!t||~t.indexOf(Bo[n+1]))&&e(Bo[n],Bo[n+1],Bo[n+2])},mi=function(e){return typeof e=="string"},zn=function(e){return typeof e=="function"},Ya=function(e){return typeof e=="number"},Bs=function(e){return typeof e=="object"},ka=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},bd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Do=Math.abs,d0="left",f0="top",Bh="right",zh="bottom",Ks="width",Zs="height",cl="Right",ul="Left",dl="Top",fl="Bottom",pn="padding",Pi="margin",ha="Width",Hh="Height",vn="px",Li=function(e){return wt.getComputedStyle(e)},M1=function(e){var t=Li(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},sg=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Rr=function(e,t){var n=t&&Li(e)[Ff]!=="matrix(1, 0, 0, 1, 0, 0)"&&je.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},du=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},h0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},E1=function(e){return function(t){return je.utils.snap(h0(e),t)}},Vh=function(e){var t=je.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},T1=function(e){return function(t,n){return Vh(h0(e))(t,n.direction)}},Ec=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Tc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},og={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ac={toggleActions:"play",anticipatePin:0},fu={top:0,left:0,center:.5,bottom:1,right:1},Wc=function(e,t){if(mi(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in fu?fu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Cc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=Jt.createElement("div"),g=oo(n)||hs(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Bt:n,w=e.indexOf("start")!==-1,x=w?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===yn?Bh:zh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=w,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Xc(_,0,i,w),_},Xc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+ha]=1,s["border"+a+ha]=0,s[n.p]=t+"px",je.set(e,s)},St=[],Hf={},Rl,ag=function(){return Bn()-Fi>34&&(Rl||(Rl=requestAnimationFrame(kr)))},Io=function(){(!Yn||!Yn.isPressed||Yn.startX>Bt.clientWidth)&&(Mt.cache++,Yn?Rl||(Rl=requestAnimationFrame(kr)):kr(),Fi||lo("scrollStart"),Fi=Bn())},Sd=function(){o0=wt.innerWidth,s0=wt.innerHeight},ja=function(e){Mt.cache++,(e===!0||!kn&&!r0&&!Jt.fullscreenElement&&!Jt.webkitFullscreenElement&&(!kf||o0!==wt.innerWidth||Math.abs(wt.innerHeight-s0)>wt.innerHeight*.25))&&cu.restart(!0)},ao={},A1=[],p0=function r(){return Cn(Ye,"scrollEnd",r)||Xs(!0)},lo=function(e){return ao[e]&&ao[e].map(function(t){return t()})||A1},pi=[],m0=function(e){for(var t=0;t<pi.length;t+=5)(!e||pi[t+4]&&pi[t+4].query===e)&&(pi[t].style.cssText=pi[t+1],pi[t].getBBox&&pi[t].setAttribute("transform",pi[t+2]||""),pi[t+3].uncache=1)},Gh=function(e,t){var n;for(jn=0;jn<St.length;jn++)n=St[jn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));uu=!0,t&&m0(t),t||lo("revert")},g0=function(e,t){Mt.cache++,(t||!$n)&&Mt.forEach(function(n){return zn(n)&&n.cacheID++&&(n.rec=0)}),mi(e)&&(wt.history.scrollRestoration=Fh=e)},$n,Js=0,lg,C1=function(){if(lg!==Js){var e=lg=Js;requestAnimationFrame(function(){return e===Js&&Xs(!0)})}},_0=function(){Bt.appendChild(Ko),kh=!Yn&&Ko.offsetHeight||wt.innerHeight,Bt.removeChild(Ko)},cg=function(e){return Cl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Xs=function(e,t){if(_i=Jt.documentElement,Bt=Jt.body,Uh=[wt,Jt,_i,Bt],Fi&&!e&&!uu){Rn(Ye,"scrollEnd",p0);return}_0(),$n=Ye.isRefreshing=!0,Mt.forEach(function(i){return zn(i)&&++i.cacheID&&(i.rec=i())});var n=lo("refreshInit");i0&&Ye.sort(),t||Gh(),Mt.forEach(function(i){zn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),St.slice(0).forEach(function(i){return i.refresh()}),uu=!1,St.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),zf=1,cg(!0),St.forEach(function(i){var s=or(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),cg(!1),zf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Mt.forEach(function(i){zn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),g0(Fh,1),cu.pause(),Js++,$n=2,kr(2),St.forEach(function(i){return zn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),$n=Ye.isRefreshing=!1,lo("refresh")},Vf=0,qc=1,hl,kr=function(e){if(e===2||!$n&&!uu){Ye.isUpdating=!0,hl&&hl.update(0);var t=St.length,n=Bn(),i=n-xd>=50,s=t&&St[0].scroll();if(qc=Vf>s?-1:1,$n||(Vf=s),i&&(Fi&&!Tu&&n-Fi>200&&(Fi=0,lo("scrollEnd")),Wa=xd,xd=n),qc<0){for(jn=t;jn-- >0;)St[jn]&&St[jn].update(0,i);qc=1}else for(jn=0;jn<t;jn++)St[jn]&&St[jn].update(0,i);Ye.isUpdating=!1}Rl=0},Gf=[d0,f0,zh,Bh,Pi+fl,Pi+cl,Pi+dl,Pi+ul,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Yc=Gf.concat([Ks,Zs,"boxSizing","max"+ha,"max"+Hh,"position",Pi,pn,pn+dl,pn+cl,pn+fl,pn+ul]),R1=function(e,t,n){Zo(n);var i=e._gsap;if(i.spacerIsNative)Zo(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},wd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Gf.length,o=t.style,a=e.style,l;s--;)l=Gf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[zh]=a[Bh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ks]=du(e,Zn)+vn,o[Zs]=du(e,yn)+vn,o[pn]=a[Pi]=a[f0]=a[d0]="0",Zo(i),a[Ks]=a["max"+ha]=n[Ks],a[Zs]=a["max"+Hh]=n[Zs],a[pn]=n[pn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},P1=/([A-Z])/g,Zo=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||je.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(P1,"-$1").toLowerCase())}},Rc=function(e){for(var t=Yc.length,n=e.style,i=[],s=0;s<t;s++)i.push(Yc[s],n[Yc[s]]);return i.t=e,i},L1=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},jc={left:0,top:0},ug=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){zn(e)&&(e=e(l)),mi(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Wc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,w;if(h&&h.seek(0),isNaN(e)||(e=+e),Ya(e))h&&(e=je.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Xc(a,n,i,!0);else{zn(t)&&(t=t(l));var x=(e||"0").split(" "),v,y,T,E;w=ii(t,l)||Bt,v=Rr(w)||{},(!v||!v.left&&!v.top)&&Li(w).display==="none"&&(E=w.style.display,w.style.display="block",v=Rr(w),E?w.style.display=E:w.style.removeProperty("display")),y=Wc(x[0],v[i.d]),T=Wc(x[1]||"0",n),e=v[i.p]-c[i.p]-u+y+s-T,a&&Xc(a,T,i,n-T<20||a._isStart&&T>20),n-=n-T}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,S=o._isStart;m="scroll"+i.d2,Xc(o,P,i,S&&P>20||!S&&(d?Math.max(Bt[m],_i[m]):o.parentNode[m])<=P+1),d&&(c=Rr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+vn))}return h&&w&&(m=Rr(w),h.seek(f),p=Rr(w),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},D1=/(webkit|moz|length|cssText|inset)/i,dg=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Bt){e._stOrig=s.cssText,a=Li(e);for(o in a)!+o&&!D1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;je.core.getCache(e).uncache=1,t.appendChild(e)}},v0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Pc=function(e,t,n){var i={};i[t.p]="+="+n,je.set(e,i)},fg=function(e,t){var n=vs(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=v0(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Mt.cache++,o.tween&&kr()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=je.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Rn(e,"wheel",n.wheelHandler),Ye.isTouch&&Rn(e,"touchmove",n.wheelHandler),s},Ye=function(){function r(t,n){ko||r.register(je)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Bf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Xa){this.update=this.refresh=this.kill=tr;return}n=sg(mi(n)||Ya(n)||n.nodeType?{trigger:n}:n,Ac);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,w=s.onSnapComplete,x=s.once,v=s.snap,y=s.pinReparent,T=s.pinSpacer,E=s.containerAnimation,P=s.fastScrollEnd,S=s.preventOverlaps,M=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Zn:yn,D=!d&&d!==0,I=ii(n.scroller||wt),V=je.core.getCache(I),F=oo(I),A=("pinType"in n?n.pinType:hs(I,"pinType")||F&&"fixed")==="fixed",K=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],J=D&&n.toggleActions.split(" "),q="markers"in n?n.markers:Ac.markers,fe=F?0:parseFloat(Li(I)["border"+M.p2+ha])||0,O=this,Y=n.onRefreshInit&&function(){return n.onRefreshInit(O)},$e=S1(I,F,M),Se=w1(I,F),j=0,ae=0,Me=0,me=vs(I,M),we,rt,ye,dt,mt,ze,U,ht,ct,$,Fe,ft,Ve,ke,Nt,L,C,X,ne,ie,Q,xe,ve,Ge,re,le,Ee,Ae,Je,be,Te,N,pe,ce,Re,de,oe,He,We;if(O._startClamp=O._endClamp=!1,O._dir=M,m*=45,O.scroller=I,O.scroll=E?E.time.bind(E):me,dt=me(),O.vars=n,i=i||n.animation,"refreshPriority"in n&&(i0=1,n.refreshPriority===-9999&&(hl=O)),V.tweenScroll=V.tweenScroll||{top:fg(I,yn),left:fg(I,Zn)},O.tweenTo=we=V.tweenScroll[M.p],O.scrubDuration=function(Ce){pe=Ya(Ce)&&Ce,pe?N?N.duration(Ce):N=je.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:pe,paused:!0,onComplete:function(){return p&&p(O)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!O.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),O.animation=i.pause(),i.scrollTrigger=O,O.scrubDuration(d),be=0,l||(l=i.vars.id)),v&&((!Bs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Bt.style&&je.set(F?[Bt,_i]:I,{scrollBehavior:"auto"}),Mt.forEach(function(Ce){return zn(Ce)&&Ce.target===(F?Jt.scrollingElement||_i:I)&&(Ce.smooth=!1)}),ye=zn(v.snapTo)?v.snapTo:v.snapTo==="labels"?E1(i):v.snapTo==="labelsDirectional"?T1(i):v.directional!==!1?function(Ce,ut){return Vh(v.snapTo)(Ce,Bn()-ae<500?0:ut.direction)}:je.utils.snap(v.snapTo),ce=v.duration||{min:.1,max:2},ce=Bs(ce)?ll(ce.min,ce.max):ll(ce,ce),Re=je.delayedCall(v.delay||pe/2||.1,function(){var Ce=me(),ut=Bn()-ae<500,Xe=we.tween;if((ut||Math.abs(O.getVelocity())<10)&&!Xe&&!Tu&&j!==Ce){var it=(Ce-ze)/ke,Zt=i&&!D?i.totalProgress():it,ot=ut?0:(Zt-Te)/(Bn()-Wa)*1e3||0,zt=je.utils.clamp(-it,1-it,Do(ot/2)*ot/.185),Ht=it+(v.inertia===!1?0:zt),Tt,At,Ut=v,Pe=Ut.onStart,yt=Ut.onInterrupt,wn=Ut.onComplete;if(Tt=ye(Ht,O),Ya(Tt)||(Tt=Ht),At=Math.max(0,Math.round(ze+Tt*ke)),Ce<=U&&Ce>=ze&&At!==Ce){if(Xe&&!Xe._initted&&Xe.data<=Do(At-Ce))return;v.inertia===!1&&(zt=Tt-it),we(At,{duration:ce(Do(Math.max(Do(Ht-Zt),Do(Tt-Zt))*.185/ot/.05||0)),ease:v.ease||"power3",data:Do(At-Ce),onInterrupt:function(){return Re.restart(!0)&&yt&&yt(O)},onComplete:function(){O.update(),j=me(),i&&!D&&(N?N.resetTo("totalProgress",Tt,i._tTime/i._tDur):i.progress(Tt)),be=Te=i&&!D?i.totalProgress():O.progress,w&&w(O),wn&&wn(O)}},Ce,zt*ke,At-Ce-zt*ke),Pe&&Pe(O,we.tween)}}else O.isActive&&j!==Ce&&Re.restart(!0)}).pause()),l&&(Hf[l]=O),f=O.trigger=ii(f||h!==!0&&h),We=f&&f._gsap&&f._gsap.stRevert,We&&(We=We(O)),h=h===!0?f:ii(h),mi(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Pi||(_=!_&&h.parentNode&&h.parentNode.style&&Li(h.parentNode).display==="flex"?!1:pn),O.pin=h,rt=je.core.getCache(h),rt.spacer?Nt=rt.pinState:(T&&(T=ii(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),rt.spacerIsNative=!!T,T&&(rt.spacerState=Rc(T))),rt.spacer=X=T||Jt.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),rt.pinState=Nt=Rc(h)),n.force3D!==!1&&je.set(h,{force3D:!0}),O.spacer=X=rt.spacer,Je=Li(h),Ge=Je[_+M.os2],ie=je.getProperty(h),Q=je.quickSetter(h,M.a,vn),wd(h,X,Je),C=Rc(h)),q){ft=Bs(q)?sg(q,og):og,$=Cc("scroller-start",l,I,M,ft,0),Fe=Cc("scroller-end",l,I,M,ft,0,$),ne=$["offset"+M.op.d2];var Lt=ii(hs(I,"content")||I);ht=this.markerStart=Cc("start",l,Lt,M,ft,ne,0,E),ct=this.markerEnd=Cc("end",l,Lt,M,ft,ne,0,E),E&&(He=je.quickSetter([ht,ct],M.a,vn)),!A&&!(ur.length&&hs(I,"fixedMarkers")===!0)&&(M1(F?Bt:I),je.set([$,Fe],{force3D:!0}),le=je.quickSetter($,M.a,vn),Ae=je.quickSetter(Fe,M.a,vn))}if(E){var Ne=E.vars.onUpdate,De=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){O.update(0,0,1),Ne&&Ne.apply(E,De||[])})}if(O.previous=function(){return St[St.indexOf(O)-1]},O.next=function(){return St[St.indexOf(O)+1]},O.revert=function(Ce,ut){if(!ut)return O.kill(!0);var Xe=Ce!==!1||!O.enabled,it=kn;Xe!==O.isReverted&&(Xe&&(de=Math.max(me(),O.scroll.rec||0),Me=O.progress,oe=i&&i.progress()),ht&&[ht,ct,$,Fe].forEach(function(Zt){return Zt.style.display=Xe?"none":"block"}),Xe&&(kn=O,O.update(Xe)),h&&(!y||!O.isActive)&&(Xe?R1(h,X,Nt):wd(h,X,Li(h),re)),Xe||O.update(Xe),kn=it,O.isReverted=Xe)},O.refresh=function(Ce,ut,Xe,it){if(!((kn||!O.enabled)&&!ut)){if(h&&Ce&&Fi){Rn(r,"scrollEnd",p0);return}!$n&&Y&&Y(O),kn=O,we.tween&&!Xe&&(we.tween.kill(),we.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),O.isReverted||O.revert(!0,!0),O._subPinOffset=!1;var Zt=$e(),ot=Se(),zt=E?E.duration():or(I,M),Ht=ke<=.01,Tt=0,At=it||0,Ut=Bs(Xe)?Xe.end:n.end,Pe=n.endTrigger||f,yt=Bs(Xe)?Xe.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),wn=O.pinnedContainer=n.pinnedContainer&&ii(n.pinnedContainer,O),ti=f&&Math.max(0,St.indexOf(O))||0,en=ti,an,R,H,Z,W,B,he,ge,qe,Be,Qe,st,Ke;for(q&&Bs(Xe)&&(st=je.getProperty($,M.p),Ke=je.getProperty(Fe,M.p));en-- >0;)B=St[en],B.end||B.refresh(0,1)||(kn=O),he=B.pin,he&&(he===f||he===h||he===wn)&&!B.isReverted&&(Be||(Be=[]),Be.unshift(B),B.revert(!0,!0)),B!==St[en]&&(ti--,en--);for(zn(yt)&&(yt=yt(O)),yt=tg(yt,"start",O),ze=ug(yt,f,Zt,M,me(),ht,$,O,ot,fe,A,zt,E,O._startClamp&&"_startClamp")||(h?-.001:0),zn(Ut)&&(Ut=Ut(O)),mi(Ut)&&!Ut.indexOf("+=")&&(~Ut.indexOf(" ")?Ut=(mi(yt)?yt.split(" ")[0]:"")+Ut:(Tt=Wc(Ut.substr(2),Zt),Ut=mi(yt)?yt:(E?je.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,ze):ze)+Tt,Pe=f)),Ut=tg(Ut,"end",O),U=Math.max(ze,ug(Ut||(Pe?"100% 0":zt),Pe,Zt,M,me()+Tt,ct,Fe,O,ot,fe,A,zt,E,O._endClamp&&"_endClamp"))||-.001,Tt=0,en=ti;en--;)B=St[en],he=B.pin,he&&B.start-B._pinPush<=ze&&!E&&B.end>0&&(an=B.end-(O._startClamp?Math.max(0,B.start):B.start),(he===f&&B.start-B._pinPush<ze||he===wn)&&isNaN(yt)&&(Tt+=an*(1-B.progress)),he===h&&(At+=an));if(ze+=Tt,U+=Tt,O._startClamp&&(O._startClamp+=Tt),O._endClamp&&!$n&&(O._endClamp=U||-.001,U=Math.min(U,or(I,M))),ke=U-ze||(ze-=.01)&&.001,Ht&&(Me=je.utils.clamp(0,1,je.utils.normalize(ze,U,de))),O._pinPush=At,ht&&Tt&&(an={},an[M.a]="+="+Tt,wn&&(an[M.p]="-="+me()),je.set([ht,ct],an)),h&&!(zf&&O.end>=or(I,M)))an=Li(h),Z=M===yn,H=me(),xe=parseFloat(ie(M.a))+At,!zt&&U>1&&(Qe=(F?Jt.scrollingElement||_i:I).style,Qe={style:Qe,value:Qe["overflow"+M.a.toUpperCase()]},F&&Li(Bt)["overflow"+M.a.toUpperCase()]!=="scroll"&&(Qe.style["overflow"+M.a.toUpperCase()]="scroll")),wd(h,X,an),C=Rc(h),R=Rr(h,!0),ge=A&&vs(I,Z?Zn:yn)(),_?(re=[_+M.os2,ke+At+vn],re.t=X,en=_===pn?du(h,M)+ke+At:0,en&&(re.push(M.d,en+vn),X.style.flexBasis!=="auto"&&(X.style.flexBasis=en+vn)),Zo(re),wn&&St.forEach(function(pt){pt.pin===wn&&pt.vars.pinSpacing!==!1&&(pt._subPinOffset=!0)}),A&&me(de)):(en=du(h,M),en&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=en+vn)),A&&(W={top:R.top+(Z?H-ze:ge)+vn,left:R.left+(Z?ge:H-ze)+vn,boxSizing:"border-box",position:"fixed"},W[Ks]=W["max"+ha]=Math.ceil(R.width)+vn,W[Zs]=W["max"+Hh]=Math.ceil(R.height)+vn,W[Pi]=W[Pi+dl]=W[Pi+cl]=W[Pi+fl]=W[Pi+ul]="0",W[pn]=an[pn],W[pn+dl]=an[pn+dl],W[pn+cl]=an[pn+cl],W[pn+fl]=an[pn+fl],W[pn+ul]=an[pn+ul],L=L1(Nt,W,y),$n&&me(0)),i?(qe=i._initted,vd(1),i.render(i.duration(),!0,!0),ve=ie(M.a)-xe+ke+At,Ee=Math.abs(ke-ve)>1,A&&Ee&&L.splice(L.length-2,2),i.render(0,!0,!0),qe||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),vd(0)):ve=ke,Qe&&(Qe.value?Qe.style["overflow"+M.a.toUpperCase()]=Qe.value:Qe.style.removeProperty("overflow-"+M.a));else if(f&&me()&&!E)for(R=f.parentNode;R&&R!==Bt;)R._pinOffset&&(ze-=R._pinOffset,U-=R._pinOffset),R=R.parentNode;Be&&Be.forEach(function(pt){return pt.revert(!1,!0)}),O.start=ze,O.end=U,dt=mt=$n?de:me(),!E&&!$n&&(dt<de&&me(de),O.scroll.rec=0),O.revert(!1,!0),ae=Bn(),Re&&(j=-1,Re.restart(!0)),kn=0,i&&D&&(i._initted||oe)&&i.progress()!==oe&&i.progress(oe||0,!0).render(i.time(),!0,!0),(Ht||Me!==O.progress||E||g||i&&!i._initted)&&(i&&!D&&i.totalProgress(E&&ze<-.001&&!Me?je.utils.normalize(ze,U,0):Me,!0),O.progress=Ht||(dt-ze)/ke===Me?0:Me),h&&_&&(X._pinOffset=Math.round(O.progress*ve)),N&&N.invalidate(),isNaN(st)||(st-=je.getProperty($,M.p),Ke-=je.getProperty(Fe,M.p),Pc($,M,st),Pc(ht,M,st-(it||0)),Pc(Fe,M,Ke),Pc(ct,M,Ke-(it||0))),Ht&&!$n&&O.update(),u&&!$n&&!Ve&&(Ve=!0,u(O),Ve=!1)}},O.getVelocity=function(){return(me()-mt)/(Bn()-Wa)*1e3||0},O.endAnimation=function(){ka(O.callbackAnimation),i&&(N?N.progress(1):i.paused()?D||ka(i,O.direction<0,1):ka(i,i.reversed()))},O.labelToScroll=function(Ce){return i&&i.labels&&(ze||O.refresh()||ze)+i.labels[Ce]/i.duration()*ke||0},O.getTrailing=function(Ce){var ut=St.indexOf(O),Xe=O.direction>0?St.slice(0,ut).reverse():St.slice(ut+1);return(mi(Ce)?Xe.filter(function(it){return it.vars.preventOverlaps===Ce}):Xe).filter(function(it){return O.direction>0?it.end<=ze:it.start>=U})},O.update=function(Ce,ut,Xe){if(!(E&&!Xe&&!Ce)){var it=$n===!0?de:O.scroll(),Zt=Ce?0:(it-ze)/ke,ot=Zt<0?0:Zt>1?1:Zt||0,zt=O.progress,Ht,Tt,At,Ut,Pe,yt,wn,ti;if(ut&&(mt=dt,dt=E?me():it,v&&(Te=be,be=i&&!D?i.totalProgress():ot)),m&&h&&!kn&&!wc&&Fi&&(!ot&&ze<it+(it-mt)/(Bn()-Wa)*m?ot=1e-4:ot===1&&U>it+(it-mt)/(Bn()-Wa)*m&&(ot=.9999)),ot!==zt&&O.enabled){if(Ht=O.isActive=!!ot&&ot<1,Tt=!!zt&&zt<1,yt=Ht!==Tt,Pe=yt||!!ot!=!!zt,O.direction=ot>zt?1:-1,O.progress=ot,Pe&&!kn&&(At=ot&&!zt?0:ot===1?1:zt===1?2:3,D&&(Ut=!yt&&J[At+1]!=="none"&&J[At+1]||J[At],ti=i&&(Ut==="complete"||Ut==="reset"||Ut in i))),S&&(yt||ti)&&(ti||d||!i)&&(zn(S)?S(O):O.getTrailing(S).forEach(function(H){return H.endAnimation()})),D||(N&&!kn&&!wc?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",ot,i._tTime/i._tDur):(N.vars.totalProgress=ot,N.invalidate().restart())):i&&i.totalProgress(ot,!!(kn&&(ae||Ce)))),h){if(Ce&&_&&(X.style[_+M.os2]=Ge),!A)Q(qa(xe+ve*ot));else if(Pe){if(wn=!Ce&&ot>zt&&U+1>it&&it+1>=or(I,M),y)if(!Ce&&(Ht||wn)){var en=Rr(h,!0),an=it-ze;dg(h,Bt,en.top+(M===yn?an:0)+vn,en.left+(M===yn?0:an)+vn)}else dg(h,X);Zo(Ht||wn?L:C),Ee&&ot<1&&Ht||Q(xe+(ot===1&&!wn?ve:0))}}v&&!we.tween&&!kn&&!wc&&Re.restart(!0),a&&(yt||x&&ot&&(ot<1||!yd))&&Cl(a.targets).forEach(function(H){return H.classList[Ht||x?"add":"remove"](a.className)}),o&&!D&&!Ce&&o(O),Pe&&!kn?(D&&(ti&&(Ut==="complete"?i.pause().totalProgress(1):Ut==="reset"?i.restart(!0).pause():Ut==="restart"?i.restart(!0):i[Ut]()),o&&o(O)),(yt||!yd)&&(c&&yt&&bd(O,c),K[At]&&bd(O,K[At]),x&&(ot===1?O.kill(!1,1):K[At]=0),yt||(At=ot===1?1:3,K[At]&&bd(O,K[At]))),P&&!Ht&&Math.abs(O.getVelocity())>(Ya(P)?P:2500)&&(ka(O.callbackAnimation),N?N.progress(1):ka(i,Ut==="reverse"?1:!ot,1))):D&&o&&!kn&&o(O)}if(Ae){var R=E?it/E.duration()*(E._caScrollDist||0):it;le(R+($._isFlipped?1:0)),Ae(R)}He&&He(-it/E.duration()*(E._caScrollDist||0))}},O.enable=function(Ce,ut){O.enabled||(O.enabled=!0,Rn(I,"resize",ja),F||Rn(I,"scroll",Io),Y&&Rn(r,"refreshInit",Y),Ce!==!1&&(O.progress=Me=0,dt=mt=j=me()),ut!==!1&&O.refresh())},O.getTween=function(Ce){return Ce&&we?we.tween:N},O.setPositions=function(Ce,ut,Xe,it){if(E){var Zt=E.scrollTrigger,ot=E.duration(),zt=Zt.end-Zt.start;Ce=Zt.start+zt*Ce/ot,ut=Zt.start+zt*ut/ot}O.refresh(!1,!1,{start:ng(Ce,Xe&&!!O._startClamp),end:ng(ut,Xe&&!!O._endClamp)},it),O.update()},O.adjustPinSpacing=function(Ce){if(re&&Ce){var ut=re.indexOf(M.d)+1;re[ut]=parseFloat(re[ut])+Ce+vn,re[1]=parseFloat(re[1])+Ce+vn,Zo(re)}},O.disable=function(Ce,ut){if(O.enabled&&(Ce!==!1&&O.revert(!0,!0),O.enabled=O.isActive=!1,ut||N&&N.pause(),de=0,rt&&(rt.uncache=1),Y&&Cn(r,"refreshInit",Y),Re&&(Re.pause(),we.tween&&we.tween.kill()&&(we.tween=0)),!F)){for(var Xe=St.length;Xe--;)if(St[Xe].scroller===I&&St[Xe]!==O)return;Cn(I,"resize",ja),F||Cn(I,"scroll",Io)}},O.kill=function(Ce,ut){O.disable(Ce,ut),N&&!ut&&N.kill(),l&&delete Hf[l];var Xe=St.indexOf(O);Xe>=0&&St.splice(Xe,1),Xe===jn&&qc>0&&jn--,Xe=0,St.forEach(function(it){return it.scroller===O.scroller&&(Xe=1)}),Xe||$n||(O.scroll.rec=0),i&&(i.scrollTrigger=null,Ce&&i.revert({kill:!1}),ut||i.kill()),ht&&[ht,ct,$,Fe].forEach(function(it){return it.parentNode&&it.parentNode.removeChild(it)}),hl===O&&(hl=0),h&&(rt&&(rt.uncache=1),Xe=0,St.forEach(function(it){return it.pin===h&&Xe++}),Xe||(rt.spacer=0)),n.onKill&&n.onKill(O)},St.push(O),O.enable(!1,!1),We&&We(O),i&&i.add&&!ke){var nt=O.update;O.update=function(){O.update=nt,Mt.cache++,ze||U||O.refresh()},je.delayedCall(.01,O.update),ke=.01,ze=U=0}else O.refresh();h&&C1()},r.register=function(n){return ko||(je=n||l0(),a0()&&window.document&&r.enable(),ko=Xa),ko},r.defaults=function(n){if(n)for(var i in n)Ac[i]=n[i];return Ac},r.disable=function(n,i){Xa=0,St.forEach(function(o){return o[i?"kill":"disable"](n)}),Cn(wt,"wheel",Io),Cn(Jt,"scroll",Io),clearInterval(Sc),Cn(Jt,"touchcancel",tr),Cn(Bt,"touchstart",tr),Ec(Cn,Jt,"pointerdown,touchstart,mousedown",ig),Ec(Cn,Jt,"pointerup,touchend,mouseup",rg),cu.kill(),Mc(Cn);for(var s=0;s<Mt.length;s+=3)Tc(Cn,Mt[s],Mt[s+1]),Tc(Cn,Mt[s],Mt[s+2])},r.enable=function(){if(wt=window,Jt=document,_i=Jt.documentElement,Bt=Jt.body,je&&(Cl=je.utils.toArray,ll=je.utils.clamp,Bf=je.core.context||tr,vd=je.core.suppressOverwrites||tr,Fh=wt.history.scrollRestoration||"auto",Vf=wt.pageYOffset||0,je.core.globals("ScrollTrigger",r),Bt)){Xa=1,Ko=document.createElement("div"),Ko.style.height="100vh",Ko.style.position="absolute",_0(),b1(),fn.register(je),r.isTouch=fn.isTouch,es=fn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),kf=fn.isTouch===1,Rn(wt,"wheel",Io),Uh=[wt,Jt,_i,Bt],je.matchMedia?(r.matchMedia=function(c){var u=je.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},je.addEventListener("matchMediaInit",function(){return Gh()}),je.addEventListener("matchMediaRevert",function(){return m0()}),je.addEventListener("matchMedia",function(){Xs(0,1),lo("matchMedia")}),je.matchMedia().add("(orientation: portrait)",function(){return Sd(),Sd})):console.warn("Requires GSAP 3.11.0 or later"),Sd(),Rn(Jt,"scroll",Io);var n=Bt.hasAttribute("style"),i=Bt.style,s=i.borderTopStyle,o=je.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Rr(Bt),yn.m=Math.round(a.top+yn.sc())||0,Zn.m=Math.round(a.left+Zn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Bt.setAttribute("style",""),Bt.removeAttribute("style")),Sc=setInterval(ag,250),je.delayedCall(.5,function(){return wc=0}),Rn(Jt,"touchcancel",tr),Rn(Bt,"touchstart",tr),Ec(Rn,Jt,"pointerdown,touchstart,mousedown",ig),Ec(Rn,Jt,"pointerup,touchend,mouseup",rg),Ff=je.utils.checkPrefix("transform"),Yc.push(Ff),ko=Bn(),cu=je.delayedCall(.2,Xs).pause(),Bo=[Jt,"visibilitychange",function(){var c=wt.innerWidth,u=wt.innerHeight;Jt.hidden?(Qm=c,eg=u):(Qm!==c||eg!==u)&&ja()},Jt,"DOMContentLoaded",Xs,wt,"load",Xs,wt,"resize",ja],Mc(Rn),St.forEach(function(c){return c.enable(0,1)}),l=0;l<Mt.length;l+=3)Tc(Cn,Mt[l],Mt[l+1]),Tc(Cn,Mt[l],Mt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(yd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Sc)||(Sc=i)&&setInterval(ag,i),"ignoreMobileResize"in n&&(kf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Mc(Cn)||Mc(Rn,n.autoRefreshEvents||"none"),r0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=ii(n),o=Mt.indexOf(s),a=oo(s);~o&&Mt.splice(o,a?6:2),i&&(a?ur.unshift(wt,i,Bt,i,_i,i):ur.unshift(s,i))},r.clearMatchMedia=function(n){St.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(mi(n)?ii(n):n).getBoundingClientRect(),a=o[s?Ks:Zs]*i||0;return s?o.right-a>0&&o.left+a<wt.innerWidth:o.bottom-a>0&&o.top+a<wt.innerHeight},r.positionInViewport=function(n,i,s){mi(n)&&(n=ii(n));var o=n.getBoundingClientRect(),a=o[s?Ks:Zs],l=i==null?a/2:i in fu?fu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/wt.innerWidth:(o.top+l)/wt.innerHeight},r.killAll=function(n){if(St.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ao.killAll||[];ao={},i.forEach(function(s){return s()})}},r}();Ye.version="3.12.7";Ye.saveStyles=function(r){return r?Cl(r).forEach(function(e){if(e&&e.style){var t=pi.indexOf(e);t>=0&&pi.splice(t,5),pi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),je.core.getCache(e),Bf())}}):pi};Ye.revert=function(r,e){return Gh(!r,e)};Ye.create=function(r,e){return new Ye(r,e)};Ye.refresh=function(r){return r?ja(!0):(ko||Ye.register())&&Xs(!0)};Ye.update=function(r){return++Mt.cache&&kr(r===!0?2:0)};Ye.clearScrollMemory=g0;Ye.maxScroll=function(r,e){return or(r,e?Zn:yn)};Ye.getScrollFunc=function(r,e){return vs(ii(r),e?Zn:yn)};Ye.getById=function(r){return Hf[r]};Ye.getAll=function(){return St.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ye.isScrolling=function(){return!!Fi};Ye.snapDirectional=Vh;Ye.addEventListener=function(r,e){var t=ao[r]||(ao[r]=[]);~t.indexOf(e)||t.push(e)};Ye.removeEventListener=function(r,e){var t=ao[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ye.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=je.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&zn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return zn(s)&&(s=s(),Rn(Ye,"refresh",function(){return s=e.batchMax()})),Cl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ye.create(c))}),t};var hg=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Md=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(fn.isTouch?" pinch-zoom":""):"none",e===_i&&r(Bt,t)},Lc={auto:1,scroll:1},I1=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||je.core.getCache(s),a=Bn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Bt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Lc[(l=Li(s)).overflowY]||Lc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!oo(s)&&(Lc[(l=Li(s)).overflowY]||Lc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},y0=function(e,t,n,i){return fn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&I1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Rn(Jt,fn.eventTypes[0],mg,!1,!0)},onDisable:function(){return Cn(Jt,fn.eventTypes[0],mg,!0)}})},O1=/(input|label|select|textarea)/i,pg,mg=function(e){var t=O1.test(e.target.tagName);(t||pg)&&(e._gsapAllow=!0,pg=t)},N1=function(e){Bs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=ii(e.target)||_i,u=je.core.globals().ScrollSmoother,d=u&&u.get(),f=es&&(e.content&&ii(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=vs(c,yn),_=vs(c,Zn),g=1,m=(fn.isTouch&&wt.visualViewport?wt.visualViewport.scale*wt.visualViewport.width:wt.outerWidth)/wt.innerWidth,p=0,w=zn(i)?function(){return i(a)}:function(){return i||2.8},x,v,y=y0(c,e.type,!0,s),T=function(){return v=!1},E=tr,P=tr,S=function(){l=or(c,yn),P=ll(es?1:0,l),n&&(E=ll(0,or(c,Zn))),x=Js},M=function(){f._gsap.y=qa(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},D=function(){if(v){requestAnimationFrame(T);var q=qa(a.deltaY/2),fe=P(h.v-q);if(f&&fe!==h.v+h.offset){h.offset=fe-h.v;var O=qa((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+O+", 0, 1)",f._gsap.y=O+"px",h.cacheID=Mt.cache,kr()}return!0}h.offset&&M(),v=!0},I,V,F,A,K=function(){S(),I.isActive()&&I.vars.scrollY>l&&(h()>l?I.progress(1)&&h(l):I.resetTo("scrollY",l))};return f&&je.set(f,{y:"+=0"}),e.ignoreCheck=function(J){return es&&J.type==="touchmove"&&D()||g>1.05&&J.type!=="touchstart"||a.isGesturing||J.touches&&J.touches.length>1},e.onPress=function(){v=!1;var J=g;g=qa((wt.visualViewport&&wt.visualViewport.scale||1)/m),I.pause(),J!==g&&Md(c,g>1.01?!0:n?!1:"x"),V=_(),F=h(),S(),x=Js},e.onRelease=e.onGestureStart=function(J,q){if(h.offset&&M(),!q)A.restart(!0);else{Mt.cache++;var fe=w(),O,Y;n&&(O=_(),Y=O+fe*.05*-J.velocityX/.227,fe*=hg(_,O,Y,or(c,Zn)),I.vars.scrollX=E(Y)),O=h(),Y=O+fe*.05*-J.velocityY/.227,fe*=hg(h,O,Y,or(c,yn)),I.vars.scrollY=P(Y),I.invalidate().duration(fe).play(.01),(es&&I.vars.scrollY>=l||O>=l-1)&&je.to({},{onUpdate:K,duration:fe})}o&&o(J)},e.onWheel=function(){I._ts&&I.pause(),Bn()-p>1e3&&(x=0,p=Bn())},e.onChange=function(J,q,fe,O,Y){if(Js!==x&&S(),q&&n&&_(E(O[2]===q?V+(J.startX-J.x):_()+q-O[1])),fe){h.offset&&M();var $e=Y[2]===fe,Se=$e?F+J.startY-J.y:h()+fe-Y[1],j=P(Se);$e&&Se!==j&&(F+=j-Se),h(j)}(fe||q)&&kr()},e.onEnable=function(){Md(c,n?!1:"x"),Ye.addEventListener("refresh",K),Rn(wt,"resize",K),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),y.enable()},e.onDisable=function(){Md(c,!0),Cn(wt,"resize",K),Ye.removeEventListener("refresh",K),y.kill()},e.lockAxis=e.lockAxis!==!1,a=new fn(e),a.iOS=es,es&&!h()&&h(1),es&&je.ticker.add(tr),A=a._dc,I=je.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:v0(h,h(),function(){return I.pause()})},onUpdate:kr,onComplete:A.vars.onComplete}),a};Ye.sort=function(r){if(zn(r))return St.sort(r);var e=wt.pageYOffset||0;return Ye.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+wt.innerHeight}),St.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ye.observe=function(r){return new fn(r)};Ye.normalizeScroll=function(r){if(typeof r>"u")return Yn;if(r===!0&&Yn)return Yn.enable();if(r===!1){Yn&&Yn.kill(),Yn=r;return}var e=r instanceof fn?r:N1(r);return Yn&&Yn.target===e.target&&Yn.kill(),oo(e.target)&&(Yn=e),e};Ye.core={_getVelocityProp:Uf,_inputObserver:y0,_scrollers:Mt,_proxies:ur,bridge:{ss:function(){Fi||lo("scrollStart"),Fi=Bn()},ref:function(){return kn}}};l0()&&je.registerPlugin(Ye);const U1=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ye,default:Ye},Symbol.toStringTag,{value:"Module"}));function Tr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function x0(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},pa={duration:.5,overwrite:!1,delay:0},Wh,Nn,tn,Ni=1e8,Kt=1/Ni,Wf=Math.PI*2,F1=Wf/4,k1=0,b0=Math.sqrt,B1=Math.cos,z1=Math.sin,Ln=function(e){return typeof e=="string"},ln=function(e){return typeof e=="function"},zr=function(e){return typeof e=="number"},Xh=function(e){return typeof e>"u"},pr=function(e){return typeof e=="object"},oi=function(e){return e!==!1},qh=function(){return typeof window<"u"},Dc=function(e){return ln(e)||Ln(e)},S0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Vn=Array.isArray,Xf=/(?:-?\.?\d|\.)+/gi,w0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Go=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ed=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,M0=/[+-]=-?[.\d]+/,E0=/[^,'"\[\]\s]+/gi,H1=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,nn,nr,qf,Yh,Mi={},hu={},T0,A0=function(e){return(hu=ma(e,Mi))&&ui},jh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Pl=function(e,t){return!t&&console.warn(e)},C0=function(e,t){return e&&(Mi[e]=t)&&hu&&(hu[e]=t)||Mi},Ll=function(){return 0},V1={suppressEvents:!0,isStart:!0,kill:!1},$c={suppressEvents:!0,kill:!1},G1={suppressEvents:!0},$h={},ps=[],Yf={},R0,gi={},Td={},gg=30,Kc=[],Kh="",Zh=function(e){var t=e[0],n,i;if(pr(t)||ln(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Kc.length;i--&&!Kc[i].targetTest(t););n=Kc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Q0(e[i],n)))||e.splice(i,1);return e},Qs=function(e){return e._gsap||Zh(Ui(e))[0]._gsap},P0=function(e,t,n){return(n=e[t])&&ln(n)?e[t]():Xh(n)&&e.getAttribute&&e.getAttribute(t)||n},ai=function(e,t){return(e=e.split(",")).forEach(t)||e},un=function(e){return Math.round(e*1e5)/1e5||0},mn=function(e){return Math.round(e*1e7)/1e7||0},Jo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},W1=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},pu=function(){var e=ps.length,t=ps.slice(0),n,i;for(Yf={},ps.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},L0=function(e,t,n,i){ps.length&&!Nn&&pu(),e.render(t,n,Nn&&t<0&&(e._initted||e._startAt)),ps.length&&!Nn&&pu()},D0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(E0).length<2?t:Ln(e)?e.trim():e},I0=function(e){return e},Ei=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},X1=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ma=function(e,t){for(var n in t)e[n]=t[n];return e},_g=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=pr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},mu=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},pl=function(e){var t=e.parent||nn,n=e.keyframes?X1(Vn(e.keyframes)):Ei;if(oi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},q1=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},O0=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Au=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},ys=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},eo=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Y1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},jf=function(e,t,n,i){return e._startAt&&(Nn?e._startAt.revert($c):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},j1=function r(e){return!e||e._ts&&r(e.parent)},vg=function(e){return e._repeat?ga(e._tTime,e=e.duration()+e._rDelay)*e:0},ga=function(e,t){var n=Math.floor(e=mn(e/t));return e&&n===e?n-1:n},gu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Cu=function(e){return e._end=mn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Kt)||0))},Ru=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=mn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Cu(e),n._dirty||eo(n,e)),e},N0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=gu(e.rawTime(),t),(!t._dur||Vl(0,t.totalDuration(),n)-t._tTime>Kt)&&t.render(n,!0)),eo(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Kt}},rr=function(e,t,n,i){return t.parent&&ys(t),t._start=mn((zr(n)?n:n||e!==nn?Ai(e,n,t):e._time)+t._delay),t._end=mn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),O0(e,t,"_first","_last",e._sort?"_start":0),$f(t)||(e._recent=t),i||N0(e,t),e._ts<0&&Ru(e,e._tTime),e},U0=function(e,t){return(Mi.ScrollTrigger||jh("scrollTrigger",t))&&Mi.ScrollTrigger.create(t,e)},F0=function(e,t,n,i,s){if(Qh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Nn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&R0!==yi.frame)return ps.push(e),e._lazy=[s,i],1},$1=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},$f=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},K1=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&$1(e)&&!(!e._initted&&$f(e))||(e._ts<0||e._dp._ts<0)&&!$f(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Vl(0,e._tDur,t),u=ga(l,a),e._yoyo&&u&1&&(o=1-o),u!==ga(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Nn||i||e._zTime===Kt||!t&&e._zTime){if(!e._initted&&F0(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Kt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&jf(e,t,n,!0),e._onUpdate&&!n&&bi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&bi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&ys(e,1),!n&&!Nn&&(bi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Z1=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},_a=function(e,t,n,i){var s=e._repeat,o=mn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:mn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Ru(e,e._tTime=e._tDur*a),e.parent&&Cu(e),n||eo(e.parent,e),e},yg=function(e){return e instanceof In?eo(e):_a(e,e._dur)},J1={_start:0,endTime:Ll,totalDuration:Ll},Ai=function r(e,t,n){var i=e.labels,s=e._recent||J1,o=e.duration()>=Ni?s.endTime(!1):e._dur,a,l,c;return Ln(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Vn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},ml=function(e,t,n){var i=zr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=oi(l.vars.inherit)&&l.parent;o.immediateRender=oi(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new dn(t[0],o,t[s+1])},Ms=function(e,t){return e||e===0?t(e):t},Vl=function(e,t,n){return n<e?e:n>t?t:n},Hn=function(e,t){return!Ln(e)||!(t=H1.exec(e))?"":t[1]},Q1=function(e,t,n){return Ms(n,function(i){return Vl(e,t,i)})},Kf=[].slice,k0=function(e,t){return e&&pr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&pr(e[0]))&&!e.nodeType&&e!==nr},eA=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Ln(i)&&!t||k0(i,1)?(s=n).push.apply(s,Ui(i)):n.push(i)})||n},Ui=function(e,t,n){return tn&&!t&&tn.selector?tn.selector(e):Ln(e)&&!n&&(qf||!va())?Kf.call((t||Yh).querySelectorAll(e),0):Vn(e)?eA(e,n):k0(e)?Kf.call(e,0):e?[e]:[]},Zf=function(e){return e=Ui(e)[0]||Pl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ui(t,n.querySelectorAll?n:n===e?Pl("Invalid scope")||Yh.createElement("div"):e)}},B0=function(e){return e.sort(function(){return .5-Math.random()})},z0=function(e){if(ln(e))return e;var t=pr(e)?e:{each:e},n=to(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return Ln(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,w,x,v,y,T,E,P,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,Ni])[1],!S){for(E=-Ni;E<(E=_[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(m=o[g]=[],p=l?Math.min(S,g)*u-.5:i%S,w=S===Ni?0:l?g*d/S-.5:i/S|0,E=0,P=Ni,T=0;T<g;T++)x=T%S-p,v=w-(T/S|0),m[T]=y=c?Math.abs(c==="y"?v:x):b0(x*x+v*v),y>E&&(E=y),y<P&&(P=y);i==="random"&&B0(m),m.max=E-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:c?c==="y"?g/S:S:Math.max(S,g/S))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Hn(t.amount||t.each)||0,n=n&&g<0?K0(n):n}return g=(m[f]-m.min)/m.max||0,mn(m.b+(n?n(g):g)*m.v)+m.u}},Jf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=mn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(zr(n)?0:Hn(n))}},H0=function(e,t){var n=Vn(e),i,s;return!n&&pr(e)&&(i=n=e.radius||Ni,e.values?(e=Ui(e.values),(s=!zr(e[0]))&&(i*=i)):e=Jf(e.increment)),Ms(t,n?ln(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ni,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||zr(o)?u:u+Hn(o)}:Jf(e))},V0=function(e,t,n,i){return Ms(Vn(e)?!t:n===!0?!!(n=0):!i,function(){return Vn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},tA=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},nA=function(e,t){return function(n){return e(parseFloat(n))+(t||Hn(n))}},iA=function(e,t,n){return W0(e,t,0,1,n)},G0=function(e,t,n){return Ms(n,function(i){return e[~~t(i)]})},rA=function r(e,t,n){var i=t-e;return Vn(e)?G0(e,r(0,e.length),t):Ms(n,function(s){return(i+(s-e)%i)%i+e})},sA=function r(e,t,n){var i=t-e,s=i*2;return Vn(e)?G0(e,r(0,e.length-1),t):Ms(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Dl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?E0:Xf),n+=e.substr(t,i-t)+V0(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},W0=function(e,t,n,i,s){var o=t-e,a=i-n;return Ms(s,function(l){return n+((l-e)/o*a||0)})},oA=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=Ln(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Vn(e)&&!Vn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=ma(Vn(e)?[]:{},e));if(!u){for(l in t)Jh.call(a,e,l,"get",t[l]);s=function(_){return np(_,a)||(o?e.p:e)}}}return Ms(n,s)},xg=function(e,t,n){var i=e.labels,s=Ni,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},bi=function(e,t,n){var i=e.vars,s=i[t],o=tn,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ps.length&&pu(),a&&(tn=a),u=l?s.apply(c,l):s.call(c),tn=o,u},$a=function(e){return ys(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Nn),e.progress()<1&&bi(e,"onInterrupt"),e},Wo,X0=[],q0=function(e){if(e)if(e=!e.name&&e.default||e,qh()||e.headless){var t=e.name,n=ln(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ll,render:np,add:Jh,kill:SA,modifier:bA,rawVars:0},o={targetTest:0,get:0,getSetter:tp,aliases:{},register:0};if(va(),e!==i){if(gi[t])return;Ei(i,Ei(mu(e,s),o)),ma(i.prototype,ma(s,mu(e,o))),gi[i.prop=t]=i,e.targetTest&&(Kc.push(i),$h[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}C0(t,i),e.register&&e.register(ui,i,li)}else X0.push(e)},$t=255,Ka={aqua:[0,$t,$t],lime:[0,$t,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,$t],navy:[0,0,128],white:[$t,$t,$t],olive:[128,128,0],yellow:[$t,$t,0],orange:[$t,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[$t,0,0],pink:[$t,192,203],cyan:[0,$t,$t],transparent:[$t,$t,$t,0]},Ad=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*$t+.5|0},Y0=function(e,t,n){var i=e?zr(e)?[e>>16,e>>8&$t,e&$t]:0:Ka.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ka[e])i=Ka[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&$t,i&$t,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&$t,e&$t]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Xf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ad(l+1/3,s,o),i[1]=Ad(l,s,o),i[2]=Ad(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(w0),n&&i.length<4&&(i[3]=1),i}else i=e.match(Xf)||Ka.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/$t,o=i[1]/$t,a=i[2]/$t,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},j0=function(e){var t=[],n=[],i=-1;return e.split(ms).forEach(function(s){var o=s.match(Go)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},bg=function(e,t,n){var i="",s=(e+i).match(ms),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=Y0(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=j0(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(ms,"1").split(Go),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(ms),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},ms=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ka)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),aA=/hsl[a]?\(/,$0=function(e){var t=e.join(" "),n;if(ms.lastIndex=0,ms.test(t))return n=aA.test(t),e[1]=bg(e[1],n),e[0]=bg(e[0],n,j0(e[1])),!0},Il,yi=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,w=m===!0,x,v,y,T;if((p>e||p<0)&&(n+=p-t),i+=p,y=i-n,x=y-o,(x>0||w)&&(T=++d.frame,f=y-d.time*1e3,d.time=y=y/1e3,o+=x+(x>=s?4:s-x),v=1),w||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](y,f,T,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){T0&&(!qf&&qh()&&(nr=qf=window,Yh=nr.document||{},Mi.gsap=ui,(nr.gsapVersions||(nr.gsapVersions=[])).push(ui.version),A0(hu||nr.GreenSockGlobals||!nr.gsap&&nr||{}),X0.forEach(q0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Il=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Il=0,c=Ll},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,w){var x=p?function(v,y,T,E){m(v,y,T,E),d.remove(x)}:m;return d.remove(m),a[w?"unshift":"push"](x),va(),x},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),va=function(){return!Il&&yi.wake()},It={},lA=/^[\d.\-M][\d.\-,\s]/,cA=/["']/g,uA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(cA,"").trim():+c,i=l.substr(a+1).trim();return t},dA=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},fA=function(e){var t=(e+"").split("("),n=It[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[uA(t[1])]:dA(e).split(",").map(D0)):It._CE&&lA.test(e)?It._CE("",e):n},K0=function(e){return function(t){return 1-e(1-t)}},Z0=function r(e,t){for(var n=e._first,i;n;)n instanceof In?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},to=function(e,t){return e&&(ln(e)?e:It[e]||fA(e))||t},ho=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return ai(e,function(a){It[a]=Mi[a]=s,It[o=a.toLowerCase()]=n;for(var l in s)It[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=It[a+"."+l]=s[l]}),s},J0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Cd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Wf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*z1((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:J0(a);return s=Wf/s,l.config=function(c,u){return r(e,c,u)},l},Rd=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:J0(n);return i.config=function(s){return r(e,s)},i};ai("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;ho(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});It.Linear.easeNone=It.none=It.Linear.easeIn;ho("Elastic",Cd("in"),Cd("out"),Cd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};ho("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ho("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ho("Circ",function(r){return-(b0(1-r*r)-1)});ho("Sine",function(r){return r===1?1:-B1(r*F1)+1});ho("Back",Rd("in"),Rd("out"),Rd());It.SteppedEase=It.steps=Mi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Kt;return function(a){return((i*Vl(0,o,a)|0)+s)*n}}};pa.ease=It["quad.out"];ai("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Kh+=r+","+r+"Params,"});var Q0=function(e,t){this.id=k1++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:P0,this.set=t?t.getSetter:tp},Ol=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,_a(this,+t.duration,1,1),this.data=t.data,tn&&(this._ctx=tn,tn.data.push(this)),Il||yi.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,_a(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(va(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Ru(this,n),!s._dp||s.parent||N0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&rr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Kt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),L0(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+vg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+vg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?ga(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Kt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?gu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Kt?0:this._rts,this.totalTime(Vl(-Math.abs(this._delay),this._tDur,s),i!==!1),Cu(this),Y1(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(va(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Kt&&(this._tTime-=Kt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&rr(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(oi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?gu(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=G1);var i=Nn;return Nn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Nn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,yg(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,yg(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Ai(this,n),oi(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,oi(i)),this._dur||(this._zTime=-Kt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Kt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Kt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Kt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=ln(n)?n:I0,a=function(){var c=i.then;i.then=null,ln(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){$a(this)},r}();Ei(Ol.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Kt,_prom:0,_ps:!1,_rts:1});var In=function(r){x0(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=oi(n.sortChildren),nn&&rr(n.parent||nn,Tr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&U0(Tr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return ml(0,arguments,this),this},t.from=function(i,s,o){return ml(1,arguments,this),this},t.fromTo=function(i,s,o,a){return ml(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,pl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new dn(i,s,Ai(this,o),1),this},t.call=function(i,s,o){return rr(this,dn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new dn(i,o,Ai(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,pl(o).immediateRender=oi(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,pl(a).immediateRender=oi(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:mn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,w,x,v,y,T,E;if(this!==nn&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,x=this._ts,p=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=mn(u%m),u===l?(g=this._repeat,f=c):(y=mn(u/m),g=~~y,g&&g===y&&(f=c,g--),f>c&&(f=c)),y=ga(this._tTime,m),!a&&this._tTime&&y!==g&&this._tTime-y*m-this._dur<=0&&(y=g),T&&g&1&&(f=c-f,E=1),g!==y&&!this._lock){var P=T&&y&1,S=P===(T&&g&1);if(g<y&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:mn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&bi(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Z0(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(w=Z1(this,mn(a),mn(f)),w&&(u-=f-(f=w._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(bi(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&w!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){w=0,_&&(u+=this._zTime=-Kt);break}}h=_}else{h=this._last;for(var M=i<0?i:f;h;){if(_=h._prev,(h._act||M<=h._end)&&h._ts&&w!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(M-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(M-h._start)*h._ts,s,o||Nn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){w=0,_&&(u+=this._zTime=M?-Kt:Kt);break}}h=_}}if(w&&!s&&(this.pause(),w.render(f>=a?0:-Kt)._zTime=f>=a?1:-1,this._ts))return this._start=v,Cu(this),this.render(i,s,o);this._onUpdate&&!s&&bi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ys(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(bi(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(zr(s)||(s=Ai(this,s,i)),!(i instanceof Ol)){if(Vn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ln(i))return this.addLabel(i,s);if(ln(i))i=dn.delayedCall(0,i);else return this}return this!==i?rr(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ni);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof dn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Ln(i)?this.removeLabel(i):ln(i)?this.killTweensOf(i):(i.parent===this&&Au(this,i),i===this._recent&&(this._recent=this._last),eo(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=mn(yi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Ai(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=dn.delayedCall(0,s||Ll,o);return a.data="isPause",this._hasPause=1,rr(this,a,Ai(this,i))},t.removePause=function(i){var s=this._first;for(i=Ai(this,i);s;)s._start===i&&s.data==="isPause"&&ys(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ss!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Ui(i),l=this._first,c=zr(s),u;l;)l instanceof dn?W1(l._targets,a)&&(c?(!ss||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Ai(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=dn.to(o,Ei({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Kt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&_a(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Ei({startAt:{time:Ai(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),xg(this,Ai(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),xg(this,Ai(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Kt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return eo(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),eo(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Ni,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,rr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;_a(o,o===nn&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(nn._ts&&(L0(nn,gu(i,nn)),R0=yi.frame),yi.frame>=gg){gg+=Si.autoSleep||120;var s=nn._first;if((!s||!s._ts)&&Si.autoSleep&&yi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||yi.sleep()}}},e}(Ol);Ei(In.prototype,{_lock:0,_hasPause:0,_forcing:0});var hA=function(e,t,n,i,s,o,a){var l=new li(this._pt,e,t,0,1,sv,null,s),c=0,u=0,d,f,h,_,g,m,p,w;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Dl(i)),o&&(w=[n,i],o(w,e,t),n=w[0],i=w[1]),f=n.match(Ed)||[];d=Ed.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Jo(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Ed.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(M0.test(i)||p)&&(l.e=0),this._pt=l,l},Jh=function(e,t,n,i,s,o,a,l,c,u){ln(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:ln(d)?c?e[t.indexOf("set")||!ln(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=ln(d)?c?vA:iv:ep,_;if(Ln(i)&&(~i.indexOf("random(")&&(i=Dl(i)),i.charAt(1)==="="&&(_=Jo(f,i)+(Hn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Qf)return!isNaN(f*i)&&i!==""?(_=new li(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?xA:rv,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&jh(t,i),hA.call(this,e,t,f,i,h,l||Si.stringFilter,c))},pA=function(e,t,n,i,s){if(ln(e)&&(e=gl(e,s,t,n,i)),!pr(e)||e.style&&e.nodeType||Vn(e)||S0(e))return Ln(e)?gl(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=gl(e[a],s,t,n,i);return o},ev=function(e,t,n,i,s,o){var a,l,c,u;if(gi[e]&&(a=new gi[e]).init(s,a.rawVars?t[e]:pA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new li(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Wo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ss,Qf,Qh=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,w=p&&p.data==="nested"?p.vars.targets:m,x=e._overwrite==="auto"&&!Wh,v=e.timeline,y,T,E,P,S,M,D,I,V,F,A,K,J;if(v&&(!f||!s)&&(s="none"),e._ease=to(s,pa.ease),e._yEase=d?K0(to(d===!0?s:d,pa.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(I=m[0]?Qs(m[0]).harness:0,K=I&&i[I.prop],y=mu(i,$h),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?$c:V1),g._lazy=0),o){if(ys(e._startAt=dn.set(m,Ei({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&oi(l),startAt:null,delay:0,onUpdate:c&&function(){return bi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Nn||!a&&!h)&&e._startAt.revert($c),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=Ei({overwrite:!1,data:"isFromStart",lazy:a&&!g&&oi(l),immediateRender:a,stagger:0,parent:p},y),K&&(E[I.prop]=K),ys(e._startAt=dn.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Nn?e._startAt.revert($c):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Kt,Kt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&oi(l)||l&&!_,T=0;T<m.length;T++){if(S=m[T],D=S._gsap||Zh(m)[T]._gsap,e._ptLookup[T]=F={},Yf[D.id]&&ps.length&&pu(),A=w===m?T:w.indexOf(S),I&&(V=new I).init(S,K||y,e,A,w)!==!1&&(e._pt=P=new li(e._pt,S,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(q){F[q]=P}),V.priority&&(M=1)),!I||K)for(E in y)gi[E]&&(V=ev(E,y,e,A,S,w))?V.priority&&(M=1):F[E]=P=Jh.call(e,S,E,"get",y[E],A,w,0,i.stringFilter);e._op&&e._op[T]&&e.kill(S,e._op[T]),x&&e._pt&&(ss=e,nn.killTweensOf(S,F,e.globalTime(t)),J=!e.parent,ss=0),e._pt&&l&&(Yf[D.id]=1)}M&&ov(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!J,f&&t<=0&&v.render(Ni,!0,!0)},mA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Qf=1,e.vars[t]="+=0",Qh(e,a),Qf=0,l?Pl(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=un(n)+Hn(d.e)),d.b&&(d.b=u.s+Hn(d.b))},gA=function(e,t){var n=e[0]?Qs(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=ma({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},_A=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Vn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},gl=function(e,t,n,i,s){return ln(e)?e.call(t,n,i,s):Ln(e)&&~e.indexOf("random(")?Dl(e):e},tv=Kh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",nv={};ai(tv+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return nv[r]=1});var dn=function(r){x0(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:pl(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,w=i.parent||nn,x=(Vn(n)||S0(n)?zr(n[0]):"length"in i)?[n]:Ui(n),v,y,T,E,P,S,M,D;if(a._targets=x.length?Zh(x):Pl("GSAP target "+n+" not found. https://gsap.com",!Si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||Dc(c)||Dc(u)){if(i=a.vars,v=a.timeline=new In({data:"nested",defaults:g||{},targets:w&&w.data==="nested"?w.vars.targets:x}),v.kill(),v.parent=v._dp=Tr(a),v._start=0,f||Dc(c)||Dc(u)){if(E=x.length,M=f&&z0(f),pr(f))for(P in f)~tv.indexOf(P)&&(D||(D={}),D[P]=f[P]);for(y=0;y<E;y++)T=mu(i,nv),T.stagger=0,p&&(T.yoyoEase=p),D&&ma(T,D),S=x[y],T.duration=+gl(c,Tr(a),y,S,x),T.delay=(+gl(u,Tr(a),y,S,x)||0)-a._delay,!f&&E===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(S,T,M?M(y,S,x):0),v._ease=It.none;v.duration()?c=u=0:a.timeline=0}else if(_){pl(Ei(v.vars.defaults,{ease:"none"})),v._ease=to(_.ease||i.ease||"none");var I=0,V,F,A;if(Vn(_))_.forEach(function(K){return v.to(x,K,">")}),v.duration();else{T={};for(P in _)P==="ease"||P==="easeEach"||_A(P,_[P],T,_.easeEach);for(P in T)for(V=T[P].sort(function(K,J){return K.t-J.t}),I=0,y=0;y<V.length;y++)F=V[y],A={ease:F.e,duration:(F.t-(y?V[y-1].t:0))/100*c},A[P]=F.v,v.to(x,A,I),I+=A.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!Wh&&(ss=Tr(a),nn.killTweensOf(x),ss=0),rr(w,Tr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===mn(w._time)&&oi(d)&&j1(Tr(a))&&w.data!=="nested")&&(a._tTime=-Kt,a.render(Math.max(0,-u)||0)),m&&U0(Tr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Kt&&!u?l:i<Kt?0:i,f,h,_,g,m,p,w,x,v;if(!c)K1(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=mn(d%g),d===l?(_=this._repeat,f=c):(m=mn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=ga(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(x&&this._yEase&&Z0(x,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(mn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(F0(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=w=(v||this._ease)(f/c),this._from&&(this.ratio=w=1-w),f&&!a&&!s&&!_&&(bi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(w,h.d),h=h._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&jf(this,i,s,o),bi(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&bi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&jf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&ys(this,1),!s&&!(u&&!a)&&(d||a||p)&&(bi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Il||yi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Qh(this,c),u=this._ease(c/this._dur),mA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Ru(this,0),this.parent||O0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?$a(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Nn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ss&&ss.vars.overwrite!==!0)._first||$a(this),this.parent&&o!==this.timeline.totalDuration()&&_a(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Ui(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&q1(a,l))return s==="all"&&(this._pt=0),$a(this);for(d=this._op=this._op||[],s!=="all"&&(Ln(s)&&(g={},ai(s,function(w){return g[w]=1}),s=g),s=gA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Au(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&$a(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ml(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return ml(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return nn.killTweensOf(i,s,o)},e}(Ol);Ei(dn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ai("staggerTo,staggerFrom,staggerFromTo",function(r){dn[r]=function(){var e=new In,t=Kf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var ep=function(e,t,n){return e[t]=n},iv=function(e,t,n){return e[t](n)},vA=function(e,t,n,i){return e[t](i.fp,n)},yA=function(e,t,n){return e.setAttribute(t,n)},tp=function(e,t){return ln(e[t])?iv:Xh(e[t])&&e.setAttribute?yA:ep},rv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},xA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},sv=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},np=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},bA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},SA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Au(this,t,"_pt"):t.dep||(n=1),t=i;return!n},wA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},ov=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},li=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||rv,this.d=l||this,this.set=c||ep,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=wA,this.m=n,this.mt=s,this.tween=i},r}();ai(Kh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return $h[r]=1});Mi.TweenMax=Mi.TweenLite=dn;Mi.TimelineLite=Mi.TimelineMax=In;nn=new In({sortChildren:!1,defaults:pa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Si.stringFilter=$0;var no=[],Zc={},MA=[],Sg=0,EA=0,Pd=function(e){return(Zc[e]||MA).map(function(t){return t()})},eh=function(){var e=Date.now(),t=[];e-Sg>2&&(Pd("matchMediaInit"),no.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=nr.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Pd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Sg=e,Pd("matchMedia"))},av=function(){function r(t,n){this.selector=n&&Zf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=EA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){ln(n)&&(s=i,i=n,n=ln);var o=this,a=function(){var c=tn,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=Zf(s)),tn=o,d=i.apply(o,arguments),ln(d)&&o._r.push(d),tn=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===ln?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=tn;tn=null,n(this),tn=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof dn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof In?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof dn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=no.length;o--;)no[o].id===this.id&&no.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),TA=function(){function r(t){this.contexts=[],this.scope=t,tn&&tn.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){pr(n)||(n={matches:n});var o=new av(0,s||this.scope),a=o.conditions={},l,c,u;tn&&!o.selector&&(o.selector=tn.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=nr.matchMedia(n[c]),l&&(no.indexOf(o)<0&&no.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(eh):l.addEventListener("change",eh)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),_u={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return q0(i)})},timeline:function(e){return new In(e)},getTweensOf:function(e,t){return nn.getTweensOf(e,t)},getProperty:function(e,t,n,i){Ln(e)&&(e=Ui(e)[0]);var s=Qs(e||{}).get,o=n?I0:D0;return n==="native"&&(n=""),e&&(t?o((gi[t]&&gi[t].get||s)(e,t,n,i)):function(a,l,c){return o((gi[a]&&gi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Ui(e),e.length>1){var i=e.map(function(u){return ui.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=gi[t],a=Qs(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;Wo._pt=0,d.init(e,n?u+n:u,Wo,0,[e]),d.render(1,d),Wo._pt&&np(1,Wo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=ui.to(e,Ei((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return nn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=to(e.ease,pa.ease)),_g(pa,e||{})},config:function(e){return _g(Si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!gi[a]&&!Mi[a]&&Pl(t+" effect requires "+a+" plugin.")}),Td[t]=function(a,l,c){return n(Ui(a),Ei(l||{},s),c)},o&&(In.prototype[t]=function(a,l,c){return this.add(Td[t](a,pr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){It[e]=to(t)},parseEase:function(e,t){return arguments.length?to(e,t):It},getById:function(e){return nn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new In(e),i,s;for(n.smoothChildTiming=oi(e.smoothChildTiming),nn.remove(n),n._dp=0,n._time=n._tTime=nn._time,i=nn._first;i;)s=i._next,(t||!(!i._dur&&i instanceof dn&&i.vars.onComplete===i._targets[0]))&&rr(n,i,i._start-i._delay),i=s;return rr(nn,n,0),n},context:function(e,t){return e?new av(e,t):tn},matchMedia:function(e){return new TA(e)},matchMediaRefresh:function(){return no.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||eh()},addEventListener:function(e,t){var n=Zc[e]||(Zc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Zc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:rA,wrapYoyo:sA,distribute:z0,random:V0,snap:H0,normalize:iA,getUnit:Hn,clamp:Q1,splitColor:Y0,toArray:Ui,selector:Zf,mapRange:W0,pipe:tA,unitize:nA,interpolate:oA,shuffle:B0},install:A0,effects:Td,ticker:yi,updateRoot:In.updateRoot,plugins:gi,globalTimeline:nn,core:{PropTween:li,globals:C0,Tween:dn,Timeline:In,Animation:Ol,getCache:Qs,_removeLinkedListItem:Au,reverting:function(){return Nn},context:function(e){return e&&tn&&(tn.data.push(e),e._ctx=tn),tn},suppressOverwrites:function(e){return Wh=e}}};ai("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return _u[r]=dn[r]});yi.add(In.updateRoot);Wo=_u.to({},{duration:0});var AA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},CA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=AA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Ld=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Ln(s)&&(l={},ai(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}CA(a,s)}}}},ui=_u.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Nn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ld("roundProps",Jf),Ld("modifiers"),Ld("snap",H0))||_u;dn.version=In.version=ui.version="3.12.7";T0=1;qh()&&va();var RA=It.Power0,PA=It.Power1,LA=It.Power2,DA=It.Power3,IA=It.Power4,OA=It.Linear,NA=It.Quad,UA=It.Cubic,FA=It.Quart,kA=It.Quint,BA=It.Strong,zA=It.Elastic,HA=It.Back,VA=It.SteppedEase,GA=It.Bounce,WA=It.Sine,XA=It.Expo,qA=It.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var wg,os,Qo,ip,qs,Mg,rp,YA=function(){return typeof window<"u"},Hr={},zs=180/Math.PI,ea=Math.PI/180,Oo=Math.atan2,Eg=1e8,sp=/([A-Z])/g,jA=/(left|right|width|margin|padding|x)/i,$A=/[\s,\(]\S/,ar={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},th=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},KA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ZA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},JA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},lv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},cv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},QA=function(e,t,n){return e.style[t]=n},eC=function(e,t,n){return e.style.setProperty(t,n)},tC=function(e,t,n){return e._gsap[t]=n},nC=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},iC=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},rC=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},sn="transform",ci=sn+"Origin",sC=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Hr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=ar[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Ar(i,a)}):this.tfm[e]=o.x?o[e]:Ar(i,e),e===ci&&(this.tfm.zOrigin=o.zOrigin);else return ar.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(sn)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(ci,t,"")),e=sn}(s||t)&&this.props.push(e,t,s[e])},uv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},oC=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(sp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=rp(),(!s||!s.isStart)&&!n[sn]&&(uv(n),i.zOrigin&&n[ci]&&(n[ci]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},dv=function(e,t){var n={target:e,props:[],revert:oC,save:sC};return e._gsap||ui.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},fv,nh=function(e,t){var n=os.createElementNS?os.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):os.createElement(e);return n&&n.style?n:os.createElement(e)},dr=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(sp,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ya(t)||t,1)||""},Tg="O,Moz,ms,Ms,Webkit".split(","),ya=function(e,t,n){var i=t||qs,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Tg[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Tg[o]:"")+e},ih=function(){YA()&&window.document&&(wg=window,os=wg.document,Qo=os.documentElement,qs=nh("div")||{style:{}},nh("div"),sn=ya(sn),ci=sn+"Origin",qs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fv=!!ya("perspective"),rp=ui.core.reverting,ip=1)},Ag=function(e){var t=e.ownerSVGElement,n=nh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Qo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Qo.removeChild(n),s},Cg=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},hv=function(e){var t,n;try{t=e.getBBox()}catch{t=Ag(e),n=1}return t&&(t.width||t.height)||n||(t=Ag(e)),t&&!t.width&&!t.x&&!t.y?{x:+Cg(e,["x","cx","x1"])||0,y:+Cg(e,["y","cy","y1"])||0,width:0,height:0}:t},pv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&hv(e))},co=function(e,t){if(t){var n=e.style,i;t in Hr&&t!==ci&&(t=sn),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(sp,"-$1").toLowerCase())):n.removeAttribute(t)}},as=function(e,t,n,i,s,o){var a=new li(e._pt,t,n,0,1,o?cv:lv);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Rg={deg:1,rad:1,turn:1},aC={grid:1,flex:1},xs=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=qs.style,l=jA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||Rg[i]||Rg[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&pv(e),(h||o==="%")&&(Hr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],un(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===os||!g.appendChild)&&(g=os.body),m=g._gsap,m&&h&&m.width&&l&&m.time===yi.time&&!m.uncache)return un(s/m.width*d);if(h&&(t==="height"||t==="width")){var w=e.style[t];e.style[t]=d+i,_=e[u],w?e.style[t]=w:co(e,t)}else(h||o==="%")&&!aC[dr(g,"display")]&&(a.position=dr(e,"position")),g===e&&(a.position="static"),g.appendChild(qs),_=qs[u],g.removeChild(qs),a.position="absolute";return l&&h&&(m=Qs(g),m.time=yi.time,m.width=g[u]),un(f?_*s/d:_&&s?d/_*s:0)},Ar=function(e,t,n,i){var s;return ip||ih(),t in ar&&t!=="transform"&&(t=ar[t],~t.indexOf(",")&&(t=t.split(",")[0])),Hr[t]&&t!=="transform"?(s=Ul(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:yu(dr(e,ci))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=vu[t]&&vu[t](e,t,n)||dr(e,t)||P0(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?xs(e,t,s,n)+n:s},lC=function(e,t,n,i){if(!n||n==="none"){var s=ya(t,e,1),o=s&&dr(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=dr(e,"borderTopColor"))}var a=new li(this._pt,e.style,t,0,1,sv),l=0,c=0,u,d,f,h,_,g,m,p,w,x,v,y;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=dr(e,t)||i,g?e.style[t]=g:co(e,t)),u=[n,i],$0(u),n=u[0],i=u[1],f=n.match(Go)||[],y=i.match(Go)||[],y.length){for(;d=Go.exec(i);)m=d[0],w=i.substring(l,d.index),_?_=(_+1)%5:(w.substr(-5)==="rgba("||w.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=Jo(h,m)+v),p=parseFloat(m),x=m.substr((p+"").length),l=Go.lastIndex-x.length,x||(x=x||Si.units[t]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(h=xs(e,t,g,x)||0),a._pt={_next:a._pt,p:w||c===1?w:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?cv:lv;return M0.test(i)&&(a.e=0),this._pt=a,a},Pg={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},cC=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Pg[n]||n,t[1]=Pg[i]||i,t.join(" ")},uC=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Hr[a]&&(l=1,a=a==="transformOrigin"?ci:sn),co(n,a);l&&(co(n,sn),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ul(n,1),o.uncache=1,uv(i)))}},vu={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new li(e._pt,t,n,0,0,uC);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Nl=[1,0,0,1,0,0],mv={},gv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Lg=function(e){var t=dr(e,sn);return gv(t)?Nl:t.substr(7).match(w0).map(un)},op=function(e,t){var n=e._gsap||Qs(e),i=e.style,s=Lg(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Nl:s):(s===Nl&&!e.offsetParent&&e!==Qo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Qo.appendChild(e)),s=Lg(e),l?i.display=l:co(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Qo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},rh=function(e,t,n,i,s,o){var a=e._gsap,l=s||op(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],w=l[5],x=t.split(" "),v=parseFloat(x[0])||0,y=parseFloat(x[1])||0,T,E,P,S;n?l!==Nl&&(E=h*m-_*g)&&(P=v*(m/E)+y*(-g/E)+(g*w-m*p)/E,S=v*(-_/E)+y*(h/E)-(h*w-_*p)/E,v=P,y=S):(T=hv(e),v=T.x+(~x[0].indexOf("%")?v/100*T.width:v),y=T.y+(~(x[1]||x[0]).indexOf("%")?y/100*T.height:y)),i||i!==!1&&a.smooth?(p=v-c,w=y-u,a.xOffset=d+(p*h+w*g)-p,a.yOffset=f+(p*_+w*m)-w):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=y,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[ci]="0px 0px",o&&(as(o,a,"xOrigin",c,v),as(o,a,"yOrigin",u,y),as(o,a,"xOffset",d,a.xOffset),as(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+y)},Ul=function(e,t){var n=e._gsap||new Q0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=dr(e,ci)||"0",u,d,f,h,_,g,m,p,w,x,v,y,T,E,P,S,M,D,I,V,F,A,K,J,q,fe,O,Y,$e,Se,j,ae;return u=d=f=g=m=p=w=x=v=0,h=_=1,n.svg=!!(e.getCTM&&pv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[sn]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[sn]!=="none"?l[sn]:"")),i.scale=i.rotate=i.translate="none"),E=op(e,n.svg),n.svg&&(n.uncache?(q=e.getBBox(),c=n.xOrigin-q.x+"px "+(n.yOrigin-q.y)+"px",J=""):J=!t&&e.getAttribute("data-svg-origin"),rh(e,J||c,!!J||n.originIsAbsolute,n.smooth!==!1,E)),y=n.xOrigin||0,T=n.yOrigin||0,E!==Nl&&(D=E[0],I=E[1],V=E[2],F=E[3],u=A=E[4],d=K=E[5],E.length===6?(h=Math.sqrt(D*D+I*I),_=Math.sqrt(F*F+V*V),g=D||I?Oo(I,D)*zs:0,w=V||F?Oo(V,F)*zs+g:0,w&&(_*=Math.abs(Math.cos(w*ea))),n.svg&&(u-=y-(y*D+T*V),d-=T-(y*I+T*F))):(ae=E[6],Se=E[7],O=E[8],Y=E[9],$e=E[10],j=E[11],u=E[12],d=E[13],f=E[14],P=Oo(ae,$e),m=P*zs,P&&(S=Math.cos(-P),M=Math.sin(-P),J=A*S+O*M,q=K*S+Y*M,fe=ae*S+$e*M,O=A*-M+O*S,Y=K*-M+Y*S,$e=ae*-M+$e*S,j=Se*-M+j*S,A=J,K=q,ae=fe),P=Oo(-V,$e),p=P*zs,P&&(S=Math.cos(-P),M=Math.sin(-P),J=D*S-O*M,q=I*S-Y*M,fe=V*S-$e*M,j=F*M+j*S,D=J,I=q,V=fe),P=Oo(I,D),g=P*zs,P&&(S=Math.cos(P),M=Math.sin(P),J=D*S+I*M,q=A*S+K*M,I=I*S-D*M,K=K*S-A*M,D=J,A=q),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=un(Math.sqrt(D*D+I*I+V*V)),_=un(Math.sqrt(K*K+ae*ae)),P=Oo(A,K),w=Math.abs(P)>2e-4?P*zs:0,v=j?1/(j<0?-j:j):0),n.svg&&(J=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!gv(dr(e,sn)),J&&e.setAttribute("transform",J))),Math.abs(w)>90&&Math.abs(w)<270&&(s?(h*=-1,w+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,w+=w<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=un(h),n.scaleY=un(_),n.rotation=un(g)+a,n.rotationX=un(m)+a,n.rotationY=un(p)+a,n.skewX=w+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[ci]=yu(c)),n.xOffset=n.yOffset=0,n.force3D=Si.force3D,n.renderTransform=n.svg?fC:fv?_v:dC,n.uncache=0,n},yu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Dd=function(e,t,n){var i=Hn(t);return un(parseFloat(t)+parseFloat(xs(e,"x",n+"px",i)))+i},dC=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,_v(e,t)},Os="0deg",Ba="0px",Ns=") ",_v=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,w=n.target,x=n.zOrigin,v="",y=p==="auto"&&e&&e!==1||p===!0;if(x&&(d!==Os||u!==Os)){var T=parseFloat(u)*ea,E=Math.sin(T),P=Math.cos(T),S;T=parseFloat(d)*ea,S=Math.cos(T),o=Dd(w,o,E*S*-x),a=Dd(w,a,-Math.sin(T)*-x),l=Dd(w,l,P*S*-x+x)}m!==Ba&&(v+="perspective("+m+Ns),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(y||o!==Ba||a!==Ba||l!==Ba)&&(v+=l!==Ba||y?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ns),c!==Os&&(v+="rotate("+c+Ns),u!==Os&&(v+="rotateY("+u+Ns),d!==Os&&(v+="rotateX("+d+Ns),(f!==Os||h!==Os)&&(v+="skew("+f+", "+h+Ns),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Ns),w.style[sn]=v||"translate(0, 0)"},fC=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,w=n.forceCSS,x=parseFloat(o),v=parseFloat(a),y,T,E,P,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ea,c*=ea,y=Math.cos(l)*d,T=Math.sin(l)*d,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=ea,S=Math.tan(c-u),S=Math.sqrt(1+S*S),E*=S,P*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),y*=S,T*=S)),y=un(y),T=un(T),E=un(E),P=un(P)):(y=d,P=f,T=E=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=xs(h,"x",o,"px"),v=xs(h,"y",a,"px")),(_||g||m||p)&&(x=un(x+_-(_*y+g*E)+m),v=un(v+g-(_*T+g*P)+p)),(i||s)&&(S=h.getBBox(),x=un(x+i/100*S.width),v=un(v+s/100*S.height)),S="matrix("+y+","+T+","+E+","+P+","+x+","+v+")",h.setAttribute("transform",S),w&&(h.style[sn]=S)},hC=function(e,t,n,i,s){var o=360,a=Ln(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?zs:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Eg)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Eg)%o-~~(c/o)*o)),e._pt=f=new li(e._pt,t,n,i,c,KA),f.e=u,f.u="deg",e._props.push(n),f},Dg=function(e,t){for(var n in t)e[n]=t[n];return e},pC=function(e,t,n){var i=Dg({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[sn]=t,a=Ul(n,1),co(n,sn),n.setAttribute("transform",c)):(c=getComputedStyle(n)[sn],o[sn]=t,a=Ul(n,1),o[sn]=c);for(l in Hr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Hn(c),_=Hn(u),d=h!==_?xs(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new li(e._pt,a,l,d,f-d,th),e._pt.u=_||0,e._props.push(l));Dg(a,i)};ai("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});vu[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Ar(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var ap={name:"css",register:ih,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,w,x,v,y,T,E,P;ip||ih(),this.styles=this.styles||dv(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(gi[g]&&ev(g,t,n,i,e,s)))){if(h=typeof u,_=vu[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Dl(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",ms.lastIndex=0,ms.test(c)||(m=Hn(c),p=Hn(u)),p?m!==p&&(c=xs(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Ln(c)&&~c.indexOf("random(")&&(c=Dl(c)),Hn(c+"")||c==="auto"||(c+=Si.units[g]||Hn(Ar(e,g))||""),(c+"").charAt(1)==="="&&(c=Ar(e,g))):c=Ar(e,g),f=parseFloat(c),w=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),w&&(u=u.substr(2)),d=parseFloat(u),g in ar&&(g==="autoAlpha"&&(f===1&&Ar(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),as(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=ar[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in Hr,x){if(this.styles.save(g),v||(y=e._gsap,y.renderTransform&&!t.parseTransform||Ul(e,t.parseTransform),T=t.smoothOrigin!==!1&&y.smooth,v=this._pt=new li(this._pt,a,sn,0,1,y.renderTransform,y,0,-1),v.dep=1),g==="scale")this._pt=new li(this._pt,y,"scaleY",y.scaleY,(w?Jo(y.scaleY,w+d):d)-y.scaleY||0,th),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(ci,0,a[ci]),u=cC(u),y.svg?rh(e,u,0,T,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==y.zOrigin&&as(this,y,"zOrigin",y.zOrigin,p),as(this,a,g,yu(c),yu(u)));continue}else if(g==="svgOrigin"){rh(e,u,1,T,0,this);continue}else if(g in mv){hC(this,y,g,f,w?Jo(f,w+u):u);continue}else if(g==="smoothOrigin"){as(this,y,"smooth",y.smooth,u);continue}else if(g==="force3D"){y[g]=u;continue}else if(g==="transform"){pC(this,u,e);continue}}else g in a||(g=ya(g)||g);if(x||(d||d===0)&&(f||f===0)&&!$A.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Hn(u)||(g in Si.units?Si.units[g]:m),m!==p&&(f=xs(e,g,c,p)),this._pt=new li(this._pt,x?y:a,g,f,(w?Jo(f,w+d):d)-f,!x&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?JA:th),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=ZA);else if(g in a)lC.call(this,e,g,c,w?w+u:u);else if(g in e)this.add(e,g,c||e[g],w?w+u:u,i,s);else if(g!=="parseTransform"){jh(g,u);continue}x||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}E&&ov(this)},render:function(e,t){if(t.tween._time||!rp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ar,aliases:ar,getSetter:function(e,t,n){var i=ar[t];return i&&i.indexOf(",")<0&&(t=i),t in Hr&&t!==ci&&(e._gsap.x||Ar(e,"x"))?n&&Mg===n?t==="scale"?nC:tC:(Mg=n||{})&&(t==="scale"?iC:rC):e.style&&!Xh(e.style[t])?QA:~t.indexOf("-")?eC:tp(e,t)},core:{_removeProperty:co,_getMatrix:op}};ui.utils.checkPrefix=ya;ui.core.getStyleSaver=dv;(function(r,e,t,n){var i=ai(r+","+e+","+t,function(s){Hr[s]=1});ai(e,function(s){Si.units[s]="deg",mv[s]=1}),ar[i[13]]=r+","+e,ai(n,function(s){var o=s.split(":");ar[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ai("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Si.units[r]="px"});ui.registerPlugin(ap);var Oe=ui.registerPlugin(ap)||ui,mC=Oe.core.Tween;const gC=Object.freeze(Object.defineProperty({__proto__:null,Back:HA,Bounce:GA,CSSPlugin:ap,Circ:qA,Cubic:UA,Elastic:zA,Expo:XA,Linear:OA,Power0:RA,Power1:PA,Power2:LA,Power3:DA,Power4:IA,Quad:NA,Quart:FA,Quint:kA,Sine:WA,SteppedEase:VA,Strong:BA,TimelineLite:In,TimelineMax:In,TweenLite:dn,TweenMax:mC,default:Oe,gsap:Oe},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var _C=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,vC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,yC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,xC=/(^[#\.][a-z]|[a-y][a-z])/i,bC=Math.PI/180,Ic=Math.sin,Oc=Math.cos,_l=Math.abs,za=Math.sqrt,Ig=function(e){return typeof e=="string"},vv=function(e){return typeof e=="number"},Og=1e5,Qr=function(e){return Math.round(e*Og)/Og||0};function SC(r){r=Ig(r)&&xC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=gs(r)):r?Ig(r)?gs(r):vv(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Za(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var wC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},MC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},EC=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function yv(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,w,x,v,y,T,E,P,S;return t==="path"||!r.getBBox?r:(c=wC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),S=EC(r,MC[t]),t==="rect"?(a=S.rx,l=S.ry||a,s=S.x,o=S.y,h=S.width-a*2,_=S.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,w=p+a*n,x=p+a,v=o+l*(1-n),y=o+l,T=y+_,E=T+l*n,P=T+l,i="M"+x+","+y+" V"+T+" C"+[x,E,w,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,E,s,T,s,T-(T-y)/3,s,y+(T-y)/3,s,y,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,w,o,x,v,x,y].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=S.r,d=a*n):(a=S.rx,l=S.ry,d=l*n),s=S.cx,o=S.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+S.x1+","+S.y1+" L"+S.x2+","+S.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(vC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",ta(c._gsRawPath=gs(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function TC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=_l(t),n=_l(n);var c=i%360*bC,u=Oc(c),d=Ic(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,w=m*m,x=p*p,v=w/(t*t)+x/(n*n);v>1&&(t=za(v)*t,n=za(v)*n);var y=t*t,T=n*n,E=(y*T-y*x-T*w)/(y*x+T*w);E<0&&(E=0);var P=(s===o?-1:1)*za(E),S=P*(t*p/n),M=P*-(n*m/t),D=(r+a)/2,I=(e+l)/2,V=D+(u*S-d*M),F=I+(d*S+u*M),A=(m-S)/t,K=(p-M)/n,J=(-m-S)/t,q=(-p-M)/n,fe=A*A+K*K,O=(K<0?-1:1)*Math.acos(A/za(fe)),Y=(A*q-K*J<0?-1:1)*Math.acos((A*J+K*q)/za(fe*(J*J+q*q)));isNaN(Y)&&(Y=f),!o&&Y>0?Y-=h:o&&Y<0&&(Y+=h),O%=h,Y%=h;var $e=Math.ceil(_l(Y)/(h/4)),Se=[],j=Y/$e,ae=4/3*Ic(j/2)/(1+Oc(j/2)),Me=u*t,me=d*t,we=d*-n,rt=u*n,ye;for(ye=0;ye<$e;ye++)i=O+ye*j,m=Oc(i),p=Ic(i),A=Oc(i+=j),K=Ic(i),Se.push(m-ae*p,p+ae*m,A+ae*K,K-ae*A,A,K);for(ye=0;ye<Se.length;ye+=2)m=Se[ye],p=Se[ye+1],Se[ye]=m*Me+p*we+V,Se[ye+1]=m*me+p*rt+F;return Se[ye-2]=a,Se[ye-1]=l,Se}}function gs(r){var e=(r+"").replace(yC,function(S){var M=+S;return M<1e-4&&M>-1e-4?0:M}).match(_C)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,w,x,v,y,T,E,P=function(M,D,I,V){w=(I-M)/3,x=(V-D)/3,g.push(M+w,D+x,I-w,V-x,I,V)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(y=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")w=n,x=i,(y==="C"||y==="S")&&(w+=n-g[g.length-4],x+=i-g[g.length-3]),_||(n=i=0),g.push(w,x,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")w=n+(d-n)*s,x=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(w,x,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")w=n-g[g.length-4],x=i-g[g.length-3],g.push(n+w,i+x,d+(n+w*1.5-d)*s,f+(i+x*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||_l(n-d)>.5||_l(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(T=e[c+4],E=e[c+5],w=e[c+6],x=e[c+7],u=7,T.length>1&&(T.length<3?(x=w,w=E,u--):(x=E,w=T.substr(2),u-=2),E=T.charAt(1),T=T.charAt(0)),v=TC(n,i,+e[c+1],+e[c+2],+e[c+3],+T,+E,(_?n:0)+w*1,(_?i:0)+x*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function ta(r){vv(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Qr(o[0])+","+Qr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Qr(o[s++])+","+Qr(o[s++])+" "+Qr(o[s++])+","+Qr(o[s++])+" "+Qr(o[s++])+","+Qr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var qi,lp,Ja,xv,Qa,bv=function(){return qi||typeof window<"u"&&(qi=window.gsap)&&qi.registerPlugin&&qi},Id=function(e){return typeof e=="function"},Ys=Math.atan2,Ng=Math.cos,Ug=Math.sin,Nr=Math.sqrt,Pu=Math.PI,Fg=Pu*2,AC=Pu*.3,CC=Pu*.7,Sv=1e20,Fl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,RC=/(^[#\.][a-z]|[a-y][a-z])/i,PC=/[achlmqstvz]/i,ls=function(e){return console&&console.warn(e)},LC=1,kg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},na=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},vl=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,w,x,v,y,T,E,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],w=h[f+1],x=h[f+2]-p,T=h[f+3]-w,v=h[f+4]-p,E=h[f+5]-w,y=h[f+6]-p,P=h[f+7]-w,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*y+3*m*(g*v+m*x))*g+p,d=(g*g*P+3*m*(g*E+m*T))*g+w,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},DC=function(e,t){return t.length-e.length},Bg=function(e,t){var n=e.size||na(e),i=t.size||na(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},zg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Od=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Nr(d*d+f*f);return a},IC=function(e,t,n){var i=e.length,s=kg(e),o=kg(t),a=o[0]-s[0],l=o[1]-s[1],c=Od(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=Od(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Za(d),h=6;h<i;h+=6)f=Od(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},OC=function(e,t,n){for(var i=e.length,s=Sv,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Nr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},NC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||na(e),t[n].size||na(t[n]))*i,u=Sv,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||na(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Nr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},Nd=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,w,x,v;for(x=2;x<s;x+=6)for(n+=o;n>i;)a=e[x-2],l=e[x-1],c=e[x],u=e[x+1],d=e[x+2],f=e[x+3],h=e[x+4],_=e[x+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,w=u+(f-u)*v,m+=(w-m)*v,w+=(f+(_-f)*v-w)*v,e.splice(x,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(w-m)*v,p,w,d+(h-d)*v,f+(_-f)*v),x+=6,s+=6,n--;return e},sh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?DC:Bg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,w,x,v,y,T;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),y=a.size||vl(a),y=l.size||vl(l),y=a.centerX-l.centerX,T=a.centerY-l.centerY,u===Bg))for(f=0;f<l.length;f++)a.splice(f,0,NC(l[f],a,f,d,y,T));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Nd(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)x=a[f].size||na(a[f]),w=OC(l,a[f].centerX,a[f].centerY),x=w[0],v=w[1],l[f++]=[x,v,x,v,x,v,x,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?Nd(m,-o/6|0):o>0&&Nd(p,o/6|0),_&&s!==!1&&!p.reversed&&Za(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=IC(p,m,!f||s===!1),n<0&&(_=!0,Za(p),n=-n),zg(p,n*6)):n!=="reverse"&&(f&&n<0&&Za(p),zg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Za(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&ls("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},Hg=function(e,t,n,i,s){var o=gs(e[0]),a=gs(e[1]);sh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=ta(o),e[1]=ta(a),(i==="log"||i===!0)&&ls('precompile:["'+e[0]+'","'+e[1]+'"]'))},UC=function(e,t){if(!t)return e;var n=e.match(Fl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},Vg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},oh=function(e){var t=e[0].match(Fl)||[],n=e[1].match(Fl)||[],i=n.length-t.length;i>0?e[0]=Vg(t,i):e[1]=Vg(n,-i)},FC=function(e){return isNaN(e)?oh:function(t){oh(t),t[1]=UC(t[1],parseInt(e,10))}},kC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||RC.test(e)||(e.match(Fl)||[]).length<3)&&(s=lp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=yv(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(ls("WARNING: invalid morph to: "+e),e=!1)),e},Gg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=Ys(l,a),_=Ys(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Nr(a*a+l*l),m[d+3]=Nr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=Ys(l,a),_=Ys(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Nr(a*a+l*l),m[3]=Nr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},Wg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},BC=function(e){return e!==e%Pu?e+(e<0?Fg:-Fg):e},Xg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",zC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Nr(a*a+l*l),u=Ys(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=Ys(l,a)-u,f=BC(d),!i&&Ja&&Math.abs(f+Ja.ca)<AC&&(i=Ja),this._anchorPT=Ja={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>CC?d:f,sl:c,cl:Nr(a*a+l*l)-c,i:n}},qg=function(e){qi=bv(),Qa=Qa||qi&&qi.plugins.morphSVG,qi&&Qa?(lp=qi.utils.toArray,Qa.prototype._tweenRotation=zC,xv=1):e&&ls("Please gsap.registerPlugin(MorphSVGPlugin)")},Xo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){qi=e,Qa=t,qg()},init:function(e,t,n,i,s){if(xv||qg(1),!t)return ls("invalid shape"),!1;Id(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,w,x,v,y,T,E,P,S,M,D;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Id(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var I=e.nodeType?window.getComputedStyle(e):{},V=I.fill+"",F=!(V==="none"||(V.match(Fl)||[])[3]==="0"||I.fillRule==="evenodd"),A=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return ls("Cannot morph a <"+o+"> element. "+Xg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Id(e.setAttribute))return!1;if(c=kC(t.shape||t.d||t.points||"",a==="d",e),u&&PC.test(c))return ls("A <"+o+"> cannot accept path data. "+Xg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||Xo.defaultMap,this._prop=t.prop,this._render=t.render||Xo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:Xo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,T=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=gs(T?t.precompile[0]:g),m=gs(T?t.precompile[1]:c),!T&&!sh(g,m,d,f,F))return!1;for((t.precompile==="log"||t.precompile===!0)&&ls('precompile:["'+ta(g)+'","'+ta(m)+'"]'),M=(t.type||Xo.defaultType)!=="linear",M&&(g=Gg(g,t.smoothTolerance),m=Gg(m,t.smoothTolerance),g.size||vl(g),m.size||vl(m),S=Wg(A[0]),this._origin=g.origin={x:g.left+S.x*g.width,y:g.top+S.y*g.height},A[1]&&(S=Wg(A[1])),this._eOrigin={x:m.left+S.x*m.width,y:m.top+S.y*m.height}),this._rawPath=e._gsRawPath=g,w=g.length;--w>-1;)for(v=g[w],y=m[w],h=v.isSmooth||[],_=y.isSmooth||[],x=v.length,Ja=0,p=0;p<x;p+=2)(y[p]!==v[p]||y[p+1]!==v[p+1])&&(M?h[p]&&_[p]?(E=v.smoothData,P=y.smoothData,D=p+(p===x-4?7-x:5),this._controlPT={_next:this._controlPT,i:p,j:w,l1s:E[p+1],l1c:P[p+1]-E[p+1],l2s:E[D],l2c:P[D]-E[D]},l=this._tweenRotation(v,y,p+2),this._tweenRotation(v,y,p,l),this._tweenRotation(v,y,D-1,l),p+=4):this._tweenRotation(v,y,p):(l=this.add(v,p,v[p],y[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],y[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,FC(d),a);M&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return LC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,w,x,v,y;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+Ng(_)*h,s.t[s.i+1]=t._origin.y+Ug(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],y=g+(g===f.length-4?7-f.length:5),_=Ys(f[y]-f[g+1],f[y-1]-f[g]),x=Ug(_),v=Ng(_),p=f[g+2],w=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=w-x*h,h=i.l2s+d*i.l2c,f[y-1]=p+v*h,f[y]=w+x*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:SC,stringToRawPath:gs,rawPathToString:ta,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Hg(o,i,s),o},pathFilter:Hg,pointsFilter:oh,getTotalSize:vl,equalizeSegmentQuantity:sh,convertToPath:function(e,t){return lp(e).map(function(n){return yv(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};bv()&&qi.registerPlugin(Xo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function HC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Yg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function jg(r,e,t){return e&&Yg(r.prototype,e),t&&Yg(r,t),r}function VC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function $g(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function Kg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?$g(Object(t),!0).forEach(function(n){VC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):$g(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function wv(r,e){return WC(r)||qC(r,e)||Mv(r,e)||jC()}function Kn(r){return GC(r)||XC(r)||Mv(r)||YC()}function GC(r){if(Array.isArray(r))return ah(r)}function WC(r){if(Array.isArray(r))return r}function XC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function qC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function Mv(r,e){if(r){if(typeof r=="string")return ah(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ah(r,e)}}function ah(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function YC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function jC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function js(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Gl(r){return typeof r=="string"}function cp(r){return Array.isArray(r)}function Nc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=js(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Gl(t)||cp(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function up(r){var e=Gl(r)||cp(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Lu(r){return r!==null&&typeof r=="object"}function $C(r){return Lu(r)&&/^(1|3|11)$/.test(r.nodeType)}function KC(r){return typeof r=="number"&&r>-1&&r%1===0}function ZC(r){return Lu(r)&&KC(r.length)}function uo(r){return cp(r)?r:r==null?[]:ZC(r)?Array.prototype.slice.call(r):[r]}function Zg(r){var e=r;return Gl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),uo(e).reduce(function(t,n){return[].concat(Kn(t),Kn(uo(n).filter($C)))},[])}var JC=Object.entries,xu="_splittype",$i={},QC=0;function lr(r,e,t){if(!Lu(r))return console.warn("[data.set] owner is not an object"),null;var n=r[xu]||(r[xu]=++QC),i=$i[n]||($i[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&($i[n]=Kg(Kg({},i),e)):e!==void 0&&(i[e]=t),t}function $s(r,e){var t=Lu(r)?r[xu]:null,n=t&&$i[t]||{};return n}function Ev(r){var e=r&&r[xu];e&&(delete r[e],delete $i[e])}function eR(){Object.keys($i).forEach(function(r){delete $i[r]})}function tR(){JC($i).forEach(function(r){var e=wv(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&($i[t]=null,delete $i[t])})}function nR(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var dp="\\ud800-\\udfff",Tv="\\u0300-\\u036f\\ufe20-\\ufe23",Av="\\u20d0-\\u20f0",Cv="\\ufe0e\\ufe0f",iR="[".concat(dp,"]"),lh="[".concat(Tv).concat(Av,"]"),ch="\\ud83c[\\udffb-\\udfff]",rR="(?:".concat(lh,"|").concat(ch,")"),Rv="[^".concat(dp,"]"),Pv="(?:\\ud83c[\\udde6-\\uddff]){2}",Lv="[\\ud800-\\udbff][\\udc00-\\udfff]",Dv="\\u200d",Iv="".concat(rR,"?"),Ov="[".concat(Cv,"]?"),sR="(?:"+Dv+"(?:"+[Rv,Pv,Lv].join("|")+")"+Ov+Iv+")*",oR=Ov+Iv+sR,aR="(?:".concat(["".concat(Rv).concat(lh,"?"),lh,Pv,Lv,iR].join("|"),`
)`),lR=RegExp("".concat(ch,"(?=").concat(ch,")|").concat(aR).concat(oR),"g"),cR=[Dv,dp,Tv,Av,Cv],uR=RegExp("[".concat(cR.join(""),"]"));function dR(r){return r.split("")}function Nv(r){return uR.test(r)}function fR(r){return r.match(lR)||[]}function hR(r){return Nv(r)?fR(r):dR(r)}function pR(r){return r==null?"":String(r)}function mR(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=pR(r),r&&Gl(r)&&!e&&Nv(r)?hR(r):r.split(e)}function uh(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Gl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Kn(uo(s))):t.setAttribute(n,s))}),t}var fp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function gR(r,e){e=js(fp,e);var t=up(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=nR(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=mR(c).map(function(_){var g=uh(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return lr(g,"isChar",!0),a=[].concat(Kn(a),[g]),g})),t.words||t.lines?(f=uh(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),lr(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function Uv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return gR(r,e);var i=uo(r.childNodes);if(i.length&&(lr(r,"isSplit",!0),!$s(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";lr(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=Uv(d,e),h=f.words,_=f.chars;return{words:[].concat(Kn(u.words),Kn(h)),chars:[].concat(Kn(u.chars),Kn(_))}},n)}function _R(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=wv(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function Fv(r){$s(r).isWord?(Ev(r),r.replaceWith.apply(r,Kn(r.childNodes))):uo(r.children).forEach(function(e){return Fv(e)})}var vR=function(){return document.createDocumentFragment()};function yR(r,e,t){var n=up(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=vR(),m=window.getComputedStyle(r),p=m.textAlign,w=parseFloat(m.fontSize),x=w*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,lr(r,{cssWidth:r.style.width,cssHeight:r.style.height})),uo(s).forEach(function(v){var y=v.parentElement===r,T=_R(v,y,e,t),E=T.width,P=T.height,S=T.top,M=T.left;/^br$/i.test(v.nodeName)||(n.lines&&y&&((l===null||S-l>=x)&&(l=S,o.push(a=[])),a.push(v)),e.absolute&&lr(v,{top:S,left:M,width:E,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var y=uh(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});lr(y,"isLine",!0);var T={height:0,top:1e4};return g.appendChild(y),v.forEach(function(E,P,S){var M=$s(E),D=M.isWordEnd,I=M.top,V=M.height,F=S[P+1];T.height=Math.max(T.height,V),T.top=Math.min(T.top,I),y.appendChild(E),D&&$s(F).isWordStart&&y.append(" ")}),e.absolute&&lr(y,{height:T.height,top:T.top}),y}),n.words||Fv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),uo(s).forEach(function(v){var y=$s(v),T=y.isLine,E=y.top,P=y.left,S=y.width,M=y.height,D=$s(v.parentElement),I=!T&&D.isLine;v.style.top="".concat(I?E-D.top:E,"px"),v.style.left=T?"".concat(d.left,"px"):"".concat(P-(I?d.left:0),"px"),v.style.height="".concat(M,"px"),v.style.width=T?"".concat(d.width,"px"):"".concat(S,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var No=js(fp,{}),Ea=function(){jg(r,null,[{key:"clearData",value:function(){eR()}},{key:"setDefaults",value:function(t){return No=js(No,Nc(t)),fp}},{key:"revert",value:function(t){Zg(t).forEach(function(n){var i=$s(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",Ev(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return $i}},{key:"defaults",get:function(){return No},set:function(t){No=js(No,Nc(t))}}]);function r(e,t){HC(this,r),this.isSplit=!1,this.settings=js(No,Nc(t)),this.elements=Zg(e),this.split()}return jg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){lr(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=js(this.settings,Nc(t)));var s=up(this.settings.types);s.none||(this.elements.forEach(function(o){lr(o,"isRoot",!0);var a=Uv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Kn(n.words),Kn(l)),n.chars=[].concat(Kn(n.chars),Kn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=yR(o,n.settings,i);n.lines=[].concat(Kn(n.lines),Kn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),tR())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const Et={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function xR(){Et.heroYearObj.year=2026,Et.heroNumberTween&&(Et.heroNumberTween.kill(),Et.heroNumberTween=null),Et.heroHeadingFadeScrollTrigger&&(Et.heroHeadingFadeScrollTrigger.kill(),Et.heroHeadingFadeScrollTrigger=null)}function bR(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
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
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),Oe.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");Oe.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");Oe.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),Ye.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;Oe.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{Oe.set(e,{opacity:0})},onEnterBack:()=>{Oe.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{Ye.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const SR="/150-lab/assets/audio/ui-click.mp3",wR="/150-lab/assets/audio/chemistry-3-final.mp3";let Dt=null,gn=!1,rn=!1,hp=!1,yl=!1,wi=!1,Cr=0;const sr=18;let Ri=null,ia=!1,cs=null;function pp(){cs||(cs=new Audio(SR),cs.volume=.32,cs.preload="auto")}const Hs=()=>{if(!rn)try{cs||pp();const r=cs.cloneNode();r.volume=.32,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function Jg(r){rn&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function MR(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?Jg(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{Jg(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function kl(r=!1){if(!(gn||rn)){if(Cr++,window.audioRetryCount=Cr,window.maxAudioRetries=sr,Cr>=sr){console.warn(`Exceeded maximum audio retry attempts (${sr}). Stopping retries.`);return}try{if(Dt.volume=.25,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}Dt.play().then(()=>{gn=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Cr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),gn=!1,(r||wi)&&Cr<sr&&setTimeout(()=>{!gn&&!rn&&kl(!0)},500)})}catch(e){console.error("Error playing audio:",e),gn=!1,(r||wi)&&Cr<sr&&setTimeout(()=>{!gn&&!rn&&kl(!0)},500)}}}const ER=()=>{document.hidden?Dt&&!Dt.paused&&gn&&(ia=!0,Dt.pause()):Dt&&ia&&gn&&!rn&&(ia=!1,Dt.play().catch(r=>{console.warn("Could not resume background audio:",r),gn=!1,wi&&setTimeout(()=>{io(!0)},100)}))};function TR(){document.addEventListener("visibilitychange",ER),window.addEventListener("blur",()=>{Dt&&!Dt.paused&&gn&&(ia=!0,Dt.pause())}),window.addEventListener("focus",()=>{Dt&&ia&&gn&&!rn&&(ia=!1,Dt.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),gn=!1,wi&&setTimeout(()=>{io(!0)},100)}))})}const io=(r=!1)=>{if(!rn){if(r&&(wi=!0,window.enterButtonClicked=!0),!wi){console.log("Audio play blocked: Enter button not clicked yet");return}if(console.log("Audio play attempt:",{enterButtonClicked:wi,heroAnimationComplete:hp,audioInitialized:gn,audioMuted:rn,backgroundAudioLoaded:yl,readyState:Dt==null?void 0:Dt.readyState}),!gn){if(Cr>=sr){console.warn(`Exceeded maximum audio retry attempts (${sr}). Stopping retries.`),Ri&&(clearInterval(Ri),Ri=null);return}if(r){console.log("Adding 2-second delay before starting background audio"),setTimeout(()=>{if(!rn)if(yl||Dt&&Dt.readyState>=3)kl(!0);else{console.log("Audio not ready yet after delay, readyState:",Dt==null?void 0:Dt.readyState);try{Dt.load()}catch(e){console.warn("Error reloading background audio:",e)}}},2e3);return}if(yl||Dt&&Dt.readyState>=3)kl(r);else if(console.log("Audio not ready yet, readyState:",Dt==null?void 0:Dt.readyState),r)try{Dt.load()}catch(e){console.warn("Error reloading background audio:",e)}}}};function AR(){const r=new Audio;r.addEventListener("canplaythrough",()=>{yl=!0,console.log("Background audio loaded and ready to play"),wi&&!gn&&!rn&&(console.log("Enter button was clicked, attempting to play audio now"),kl(!0))}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=wR;try{r.load()}catch(e){console.error("Error loading background audio:",e)}Dt=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,gn=!1,rn=!1,hp=!1,yl=!1,wi=!1,Cr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=sr,window.audioRetryTimer=null,TR()}const CR=()=>{pp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(rn||Hs(),t.dataset.clickSoundPlayed="true");return}rn||Hs()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(rn||Hs(),i.dataset.clickSoundPlayed="true");return}rn||Hs()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(rn||Hs(),o.dataset.clickSoundPlayed="true");return}rn||Hs()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),MR()};function RR(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=Oe.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=rn;if(r.classList.toggle("muted"),rn=r.classList.contains("muted"),window.audioMuted=rn,t)try{cs||pp();const i=cs.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else Hs();const n=window.waveAnimation;rn?(n&&n.pause(),Dt&&(Dt.volume=0,Ri&&(clearInterval(Ri),Ri=null))):(n&&n.resume(),!gn&&wi&&Dt?(io(!0),Ri||(Ri=setInterval(()=>{gn?(clearInterval(Ri),Ri=null):!rn&&wi&&(Cr<sr?io(!0):(console.warn(`Exceeded maximum audio retry attempts (${sr}). Stopping retries.`),clearInterval(Ri),Ri=null))},500))):gn&&Dt&&(Dt.volume=.25,Dt.paused&&Dt.play().catch(i=>{console.warn("Audio play was prevented:",i),gn=!1,wi&&io(!0)})))})}}function PR(r){hp=r,window.heroAnimationComplete=r}function LR(r){wi=r,window.enterButtonClicked=r}function dh(){Et.heroHeadingFadeScrollTrigger&&(Et.heroHeadingFadeScrollTrigger.kill(),Et.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new Ea(r,{types:"words,chars",absolute:!1}).chars,Oe.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Oe.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),Et.heroHeadingFadeScrollTrigger=Ye.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?Oe.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&Oe.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{Oe.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=Et.heroHeadingFadeScrollTrigger?Et.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{Oe.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function DR(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#cover-area button.enter-experience"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline");if(!r||!e)return;t&&Oe.set(t,{opacity:0}),i&&Oe.set(i,{opacity:0});const s=document.querySelector(".share-button-pinned");s&&Oe.set(s,{opacity:0}),window.lenis&&window.lenis.stop(),Oe.set(n,{opacity:1}),Oe.set(r,{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3});const o=Oe.timeline({delay:.6});o.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),o.to(e,{opacity:1,duration:.6,ease:"power2.out"},"-=0.3"),e&&e.addEventListener("click",()=>{e.style.pointerEvents="none",t&&Oe.to(t,{opacity:1,duration:.8,ease:"power2.inOut"}),i&&Oe.to(i,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,LR(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),io(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retrying audio playback..."),io(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Oe.to(e,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{bR(e)}}),s&&Oe.to(s,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const a=document.querySelector(".sound-toggle");a&&a.classList.add("active"),IR(r)})}function IR(r){let e=null,t=-1;function n(){return e&&e.kill(),e=Ye.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:i=>{const s=1-i.progress;Math.abs(s-t)>.01&&(t=s,r.style.opacity=s)},onLeave:()=>{r.style.opacity="0",t=0},onEnterBack:()=>{const s=1-e.progress;r.style.opacity=s,t=s},onLeaveBack:()=>{r.style.opacity="1",t=1}}),e}return n()}function OR(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),Ye.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),Oe.set(e,{opacity:0}),Oe.set(r,{opacity:0});const n=new Ea(r,{types:"words,chars",absolute:!1});Oe.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=Oe.timeline({paused:!0,onComplete:()=>{PR(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");Oe.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),Ye.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&(Ye.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-(Ye.getById("hero-scale")?Ye.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),Ye.create({trigger:"#video-travel-area",start:"top 110%",end:"top 100%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=.44;if(Et.heroNumberTween&&Et.heroNumberTween.scrollTrigger){const f=Et.heroNumberTween.scrollTrigger.progress;if(c=.44+f*.56,f<.8)return}const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=Ye.getById("hero-fade-out");if(a){const l=a.progress;let c=1;Et.heroNumberTween&&Et.heroNumberTween.scrollTrigger&&(c=.44+Et.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}))}function NR(){const r=document.querySelector("#hero-number");r?Et.heroNumberTween?(Et.heroNumberTween.scrollTrigger&&(Et.heroNumberTween.scrollTrigger.enable(),console.log("Hero countdown: Re-enabled existing ScrollTrigger")),Et.heroNumberTween.resume(),console.log("Hero countdown: Resumed existing tween")):(Et.heroNumberTween=Oe.to(Et.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);Et.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){Et.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),console.log("Hero countdown: Complete at 1876, opacity 1.0"),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){Et.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),console.log("Hero countdown: Reset to 2026, opacity 0.44"),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),Et.heroNumberTween.scrollTrigger?(console.log("Hero countdown: ScrollTrigger created successfully",{start:Et.heroNumberTween.scrollTrigger.start,end:Et.heroNumberTween.scrollTrigger.end,trigger:Et.heroNumberTween.scrollTrigger.trigger}),Ye.refresh()):console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function UR(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?Ye.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?Ye.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ye.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function FR(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Oe.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Oe.set(e,{pointerEvents:"none"}),Oe.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ye.create({trigger:"#video-travel-area",start:"top 67%",end:"bottom top",markers:!1,onEnter:()=>{Oe.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{Oe.set(e,{pointerEvents:"none"})}}),Ye.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Du(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function kR(){const r=document.querySelector("#get-involved-text p");r&&(Oe.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Ea(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(Oe.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Oe.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function BR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Oe.set(r,{opacity:0,y:50}),Ye.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Oe.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Oe.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function zR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Oe.set(r,{x:0})),l&&!n&&(n=Oe.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger)},o=()=>{i&&(i.kill(),i=null),t&&(i=Ye.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Oe.set(t,{opacity:c})},onLeaveBack:()=>{Oe.set(t,{opacity:1})}}))};s(),o();const a=Du(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function HR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580){console.log("Viewport width < 580px, skipping marquee setup (element is hidden)");return}console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}Oe.set(n,{y:0,top:"auto",opacity:1}),Oe.set(e,{position:"absolute",top:0,left:0}),Oe.set(n[1],{position:"absolute",top:d+"px",left:0});const f=Oe.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=Du(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function VR(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(Oe.set(e,{y:50,filter:"opacity(0)"}),Ye.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Oe.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Oe.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Oe.set(e,{opacity:0,y:50}),Ye.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Oe.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Oe.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))})}let Qg=!1;function e_(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function GR(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(e_(t),t.dataset.fancyInitialized="true")})};Qg||(document.addEventListener("heroAnimationComplete",e),Qg=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(e_(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function WR(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),s=document.querySelector(".section-timeline .indicator .active-title"),o=document.querySelector(".section-timeline");if(!r||!e||!i||!s||!o)return;Oe.set(i,{opacity:0});let a=!1;o.addEventListener("mouseenter",()=>{a||Oe.to(i,{opacity:1,duration:.3,ease:"power2.out"})}),o.addEventListener("mouseleave",()=>{Oe.to(i,{opacity:0,duration:.3,ease:"power2.out"}),a=!1}),i.addEventListener("mouseenter",()=>{Oe.to(s,{opacity:0,duration:.2,ease:"power2.out"})}),i.addEventListener("mouseleave",()=>{Oe.to(s,{opacity:1,duration:.2,ease:"power2.out"})});const l=i.querySelector(".anniversary"),c=i.querySelector(".get-involved"),u=i.querySelector(".events"),d=y=>{if(s.textContent===y)return;const T=Oe.timeline();T.to(s,{opacity:0,duration:.18,onComplete:()=>{s.textContent=y}}),T.to(s,{opacity:1,duration:.24})},f=y=>{if(!y)return 0;y.offsetHeight;let T=0,E=y;for(;E;)T+=E.offsetTop,E=E.offsetParent;return T};l.addEventListener("click",y=>{y.preventDefault(),i.querySelectorAll("a").forEach(T=>T.classList.remove("active")),l.classList.add("active"),d("150 Years of ACS"),Oe.to(i,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,window.scrollTo({top:0,behavior:"smooth"})}),c.addEventListener("click",y=>{y.preventDefault(),i.querySelectorAll("a").forEach(T=>T.classList.remove("active")),c.classList.add("active"),d("Get Involved"),Oe.to(i,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,n?setTimeout(()=>{const T=f(n);window.scrollTo({top:T,behavior:"smooth"})},50):e&&setTimeout(()=>{const T=f(e);window.scrollTo({top:T,behavior:"smooth"})},50)}),u.addEventListener("click",y=>{y.preventDefault(),i.querySelectorAll("a").forEach(T=>T.classList.remove("active")),u.classList.add("active"),d("Events"),Oe.to(i,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,t&&setTimeout(()=>{const T=f(t);window.scrollTo({top:T,behavior:"smooth"})},50)});const h=[{id:"hero",element:r,title:"150 Years of ACS",link:l,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:c,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:c,top:0,bottom:0},{id:"events",element:t,title:"Events",link:u,top:0,bottom:0}];function _(){if(h.forEach(y=>{y.element&&(y.top=f(y.element),y.bottom=y.top+y.element.offsetHeight)}),h[0].element&&n&&(h[0].bottom=f(n)),n&&t){const y=h.find(E=>E.id==="getinvolved-video"),T=h.find(E=>E.id==="getinvolved");y&&T&&(T.top=y.top,T.bottom=f(t))}}_();let g=null;function m(){requestAnimationFrame(()=>{const y=window.pageYOffset+window.innerHeight/2;let T=h[0];for(let E=h.length-1;E>=0;E--){const P=h[E];if(P.element&&y>=P.top&&y<P.bottom){T=P;break}}T.id==="getinvolved-video"&&(T=h.find(E=>E.id==="getinvolved")||T),g!==T.id&&(g=T.id,i.querySelectorAll("a").forEach(E=>E.classList.remove("active")),T.link&&T.link.classList.add("active"),d(T.title))})}window.removeEventListener("scroll",m),window.addEventListener("scroll",m);const p=Du(()=>{document.body.offsetHeight,_(),requestAnimationFrame(()=>{_(),m()})},150);window.addEventListener("resize",p),window.addEventListener("orientationchange",()=>{setTimeout(()=>{p()},300)});const w=()=>{_(),m()};w(),setTimeout(w,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(w);let x=!1;const v=()=>{x||(x=!0,_(),window.removeEventListener("scroll",v))};window.addEventListener("scroll",v)}function XR(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="#14b500":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function qR(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
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
  `,document.body.appendChild(e),YR(r,e)}function YR(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
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
    `,document.head.appendChild(c)}}const jR="/150-lab/assets/images/pacifichem-event1.jpg",$R="/150-lab/assets/images/green-chemistry-event2.jpg",KR="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function ZR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[jR,$R,KR];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
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
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const Jc=[],Qc=[],kv=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),Bv=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),zv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([kv(),Bv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Ea(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(Jc.push({element:r,splitText:s,originalContent:t}),Oe.set(s.lines,{opacity:0,y:50}),Ye.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;Oe.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{Oe.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},Hv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([kv(),Bv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Ea(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(Qc.push({element:r,splitText:s,originalContent:t}),Oe.set(s.chars,{opacity:0,y:50,display:"inline-block"}),Ye.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{Oe.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Oe.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function fh(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{zv(t,n)})}function hh(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{Hv(t,n)})}function Vv(){Jc.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=Jc.indexOf(r);e>-1&&Jc.splice(e,1)})}function JR(){Vv(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{zv(e,t)})},100)}function Gv(){Qc.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=Qc.indexOf(r);e>-1&&Qc.splice(e,1)})}function QR(){Gv(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{Hv(e,t)})},100)}window.cleanupSplitLines=Vv;window.refreshSplitLines=JR;window.cleanupSplitChars=Gv;window.refreshSplitChars=QR;function t_(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Et.heroHeadingFadeScrollTrigger&&Et.heroHeadingFadeScrollTrigger.animation){n=Et.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=Oe.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Et.heroHeadingFadeScrollTrigger&&(Et.heroHeadingFadeScrollTrigger.kill(),Et.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof fh=="function"&&fh(e),t.length&&typeof hh=="function"&&hh(t),typeof dh=="function"&&dh(),Ye.refresh()},50)}function e2(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=Du(()=>{t_()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{t_()})}Oe.registerPlugin(Ye);Oe.registerPlugin(Xo);Oe.registerPlugin(Ea);new Date("2026-04-06T00:00:00").getTime();function t2(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function n2(){AR(),Ye.refresh(),Ye.clearMatchMedia(),Ye.getAll().forEach(n=>n.kill()),xR(),OR(),NR(),UR(),dh(),FR(),kR(),zR(),BR(),HR(),VR(),WR(),GR(),CR(),RR(),XR(),qR(),ZR(),fh(null),hh(null),e2();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new ey({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),p1(),t2()?(DR(),n2(),_1()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
