
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

var mv=Object.defineProperty;var gv=(r,e,t)=>e in r?mv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var qe=(r,e,t)=>gv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var _v="1.3.4";function Lg(r,e,t){return Math.max(r,Math.min(e,t))}function vv(r,e,t){return(1-t)*r+t*e}function yv(r,e,t,n){return vv(r,e,1-Math.exp(-t*n))}function xv(r,e){return(r%e+e)%e}var Sv=class{constructor(){qe(this,"isRunning",!1);qe(this,"value",0);qe(this,"from",0);qe(this,"to",0);qe(this,"currentTime",0);qe(this,"lerp");qe(this,"duration");qe(this,"easing");qe(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Lg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=yv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:o,onUpdate:s}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=s}};function wv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var bv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){qe(this,"width",0);qe(this,"height",0);qe(this,"scrollHeight",0);qe(this,"scrollWidth",0);qe(this,"debouncedResize");qe(this,"wrapperResizeObserver");qe(this,"contentResizeObserver");qe(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});qe(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});qe(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=wv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Dg=class{constructor(){qe(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,o=t.length;i<o;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Vh=100/6,Tr={passive:!1},Mv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){qe(this,"touchStart",{x:0,y:0});qe(this,"lastDelta",{x:0,y:0});qe(this,"window",{width:0,height:0});qe(this,"emitter",new Dg);qe(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});qe(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});qe(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});qe(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Vh:n===2?this.window.width:1,o=n===1?Vh:n===2?this.window.height:1;e*=i,t*=o,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});qe(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Tr),this.element.addEventListener("touchstart",this.onTouchStart,Tr),this.element.addEventListener("touchmove",this.onTouchMove,Tr),this.element.addEventListener("touchend",this.onTouchEnd,Tr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Tr),this.element.removeEventListener("touchstart",this.onTouchStart,Tr),this.element.removeEventListener("touchmove",this.onTouchMove,Tr),this.element.removeEventListener("touchend",this.onTouchEnd,Tr)}},Gh=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Ev=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:s=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:S=!0,autoRaf:M=!1,anchors:v=!1,autoToggle:E=!1,allowNestedScroll:A=!1,__experimental__naiveDimensions:C=!1}={}){qe(this,"_isScrolling",!1);qe(this,"_isStopped",!1);qe(this,"_isLocked",!1);qe(this,"_preventNextNativeScrollEvent",!1);qe(this,"_resetVelocityTimeout",null);qe(this,"__rafID",null);qe(this,"isTouching");qe(this,"time",0);qe(this,"userData",{});qe(this,"lastVelocity",0);qe(this,"velocity",0);qe(this,"direction",0);qe(this,"options");qe(this,"targetScroll");qe(this,"animatedScroll");qe(this,"animate",new Sv);qe(this,"emitter",new Dg);qe(this,"dimensions");qe(this,"virtualScroll");qe(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});qe(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});qe(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});qe(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,o,s;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("/#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let o=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(o=0),this.scrollTo(o,i)}}});qe(this,"onPointerDown",r=>{r.button===1&&this.reset()});qe(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),o=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const s=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&s&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(s||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,S,M;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-touch"))||o&&((M=m.hasAttribute)==null?void 0:M.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});qe(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});qe(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=_v,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Gh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:o,touchInertiaMultiplier:s,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:S,autoRaf:M,anchors:v,autoToggle:E,allowNestedScroll:A,__experimental__naiveDimensions:C},this.dimensions=new bv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Mv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:o=this.options.easing,lerp:s=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Lg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof o!="function"?o=Gh:typeof o=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let o,s,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);i.computedStyle=E;const A=E.overflowX,C=E.overflowY;if(o=["auto","overlay","scroll"].includes(A),s=["auto","overlay","scroll"].includes(C),i.hasOverflowX=o,i.hasOverflowY=s,!o&&!s||h==="vertical"&&!s||h==="horizontal"&&!o)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,o=i.hasOverflowX,s=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!o&&!s||!a&&!l||h==="vertical"&&(!s||!l)||h==="horizontal"&&(!o||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const E=e!==0,A=t!==0;E&&o&&a&&(_="x"),A&&s&&l&&(_="y")}if(!_)return!1;let g,m,p,S,M;if(_==="x")g=r.scrollLeft,m=c-d,p=e,S=o,M=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,S=s,M=l;else return!1;return(p>0?g<m:g>0)&&S&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?xv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const Tv="modulepreload",Av=function(r){return"/150-lab/"+r},Wh={},Xh=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=s(t.map(c=>{if(c=Av(c),c in Wh)return;Wh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Tv,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return e().catch(o)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hf="177",Cv=0,qh=1,Rv=2,Ig=1,Pv=2,ur=3,br=0,qn=1,vi=2,Xr=0,qr=1,Ac=2,Yh=3,jh=4,Lv=5,wo=100,Dv=101,Iv=102,Ov=103,Nv=104,Uv=200,Fv=201,kv=202,Bv=203,dd=204,fd=205,zv=206,Hv=207,Vv=208,Gv=209,Wv=210,Xv=211,qv=212,Yv=213,jv=214,hd=0,pd=1,md=2,Os=3,gd=4,_d=5,vd=6,yd=7,Og=0,$v=1,Kv=2,Yr=0,Zv=1,Jv=2,Qv=3,ey=4,ty=5,ny=6,iy=7,$h="attached",ry="detached",Ng=300,Ns=301,Us=302,xd=303,Sd=304,Kc=306,Fs=1e3,Fr=1001,Cc=1002,Vn=1003,Ug=1004,ya=1005,li=1006,dc=1007,mr=1008,Ji=1009,Fg=1010,kg=1011,Za=1012,Vf=1013,Fo=1014,Oi=1015,ml=1016,Gf=1017,Wf=1018,Ja=1020,Bg=35902,zg=1021,Hg=1022,yi=1023,Qa=1026,el=1027,Xf=1028,qf=1029,Vg=1030,Yf=1031,jf=1033,fc=33776,hc=33777,pc=33778,mc=33779,wd=35840,bd=35841,Md=35842,Ed=35843,Td=36196,Ad=37492,Cd=37496,Rd=37808,Pd=37809,Ld=37810,Dd=37811,Id=37812,Od=37813,Nd=37814,Ud=37815,Fd=37816,kd=37817,Bd=37818,zd=37819,Hd=37820,Vd=37821,gc=36492,Gd=36494,Wd=36495,Gg=36283,Xd=36284,qd=36285,Yd=36286,tl=2300,nl=2301,lu=2302,Kh=2400,Zh=2401,Jh=2402,oy=2500,sy=0,Wg=1,jd=2,ay=3200,ly=3201,Xg=0,cy=1,Ur="",yn="srgb",Gn="srgb-linear",Rc="linear",Ot="srgb",qo=7680,Qh=519,uy=512,dy=513,fy=514,qg=515,hy=516,py=517,my=518,gy=519,$d=35044,ep="300 es",gr=2e3,Pc=2001;class Ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tp=1234567;const Da=Math.PI/180,ks=180/Math.PI;function Ni(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[r&255]+Mn[r>>8&255]+Mn[r>>16&255]+Mn[r>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function ht(r,e,t){return Math.max(e,Math.min(t,r))}function $f(r,e){return(r%e+e)%e}function _y(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function vy(r,e,t){return r!==e?(t-r)/(e-r):0}function Ia(r,e,t){return(1-t)*r+t*e}function yy(r,e,t,n){return Ia(r,e,1-Math.exp(-t*n))}function xy(r,e=1){return e-Math.abs($f(r,e*2)-e)}function Sy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function wy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function by(r,e){return r+Math.floor(Math.random()*(e-r+1))}function My(r,e){return r+Math.random()*(e-r)}function Ey(r){return r*(.5-Math.random())}function Ty(r){r!==void 0&&(tp=r);let e=tp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ay(r){return r*Da}function Cy(r){return r*ks}function Ry(r){return(r&r-1)===0&&r!==0}function Py(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ly(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Dy(r,e,t,n,i){const o=Math.cos,s=Math.sin,a=o(t/2),l=s(t/2),c=o((e+n)/2),u=s((e+n)/2),d=o((e-n)/2),f=s((e-n)/2),h=o((n-e)/2),_=s((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Li(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Pt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Iy={DEG2RAD:Da,RAD2DEG:ks,generateUUID:Ni,clamp:ht,euclideanModulo:$f,mapLinear:_y,inverseLerp:vy,lerp:Ia,damp:yy,pingpong:xy,smoothstep:Sy,smootherstep:wy,randInt:by,randFloat:My,randFloatSpread:Ey,seededRandom:Ty,degToRad:Ay,radToDeg:Cy,isPowerOfTwo:Ry,ceilPowerOfTwo:Py,floorPowerOfTwo:Ly,setQuaternionFromProperEuler:Dy,normalize:Pt,denormalize:Li};class gt{constructor(e=0,t=0){gt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class no{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,s,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=o[s+0],h=o[s+1],_=o[s+2],g=o[s+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,S=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),A=Math.atan2(E,p*S);m=Math.sin(m*A)/E,a=Math.sin(a*A)/E}const v=a*S;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=E,c*=E,u*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,o,s){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=o[s],f=o[s+1],h=o[s+2],_=o[s+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(o/2),f=l(n/2),h=l(i/2),_=l(o/2);switch(s){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],o=t[8],s=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(o-c)*h,this._z=(s-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+s)/h,this._z=(o+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(o-c)/h,this._x=(i+s)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(s-i)/h,this._x=(o+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,o=e._z,s=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+s*a+i*c-o*l,this._y=i*u+s*l+o*a-n*c,this._z=o*u+s*c+n*l-i*a,this._w=s*u-n*a-i*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,o=this._z,s=this._w;let a=s*e._w+n*e._x+i*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*s+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*o+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=s*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=o*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,n=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(np.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(np.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*i-a*n),u=2*(a*t-o*i),d=2*(o*n-s*t);return this.x=t+l*c+s*d-a*u,this.y=n+l*u+a*c-o*d,this.z=i+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,o=e.z,s=t.x,a=t.y,l=t.z;return this.x=i*l-o*a,this.y=o*s-n*l,this.z=n*a-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cu=new W,np=new no;class at{constructor(e,t,n,i,o,s,a,l,c){at.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c)}set(e,t,n,i,o,s,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=o,u[5]=l,u[6]=n,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],S=i[1],M=i[4],v=i[7],E=i[2],A=i[5],C=i[8];return o[0]=s*g+a*S+l*E,o[3]=s*m+a*M+l*A,o[6]=s*p+a*v+l*C,o[1]=c*g+u*S+d*E,o[4]=c*m+u*M+d*A,o[7]=c*p+u*v+d*C,o[2]=f*g+h*S+_*E,o[5]=f*m+h*M+_*A,o[8]=f*p+h*v+_*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*a*c-n*o*u+n*a*l+i*o*c-i*s*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,f=a*l-u*o,h=c*o-s*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*s)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*o-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(s*t-n*o)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*s+c*a)+s+e,-i*c,i*l,-i*(-c*s+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uu.makeScale(e,t)),this}rotate(e){return this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uu=new at;function Yg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function il(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Oy(){const r=il("canvas");return r.style.display="block",r}const ip={};function bs(r){r in ip||(ip[r]=!0,console.warn(r))}function Ny(r,e,t){return new Promise(function(n,i){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function Uy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Fy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const rp=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),op=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ky(){const r={enabled:!0,workingColorSpace:Gn,spaces:{},convert:function(i,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===Ot&&(i.r=xr(i.r),i.g=xr(i.g),i.b=xr(i.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[o].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ot&&(i.r=Ms(i.r),i.g=Ms(i.g),i.b=Ms(i.b))),i},workingToColorSpace:function(i,o){return this.convert(i,this.workingColorSpace,o)},colorSpaceToWorking:function(i,o){return this.convert(i,o,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ur?Rc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,o=this.workingColorSpace){return i.fromArray(this.spaces[o].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,o,s){return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,o){return bs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,o)},toWorkingColorSpace:function(i,o){return bs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Gn]:{primaries:e,whitePoint:n,transfer:Rc,toXYZ:rp,fromXYZ:op,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yn},outputColorSpaceConfig:{drawingBufferColorSpace:yn}},[yn]:{primaries:e,whitePoint:n,transfer:Ot,toXYZ:rp,fromXYZ:op,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yn}}}),r}const yt=ky();function xr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ms(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Yo;class By{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yo===void 0&&(Yo=il("canvas")),Yo.width=e.width,Yo.height=e.height;const i=Yo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Yo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=il("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=xr(o[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xr(t[n]/255)*255):t[n]=xr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zy=0;class Kf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zy++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?o.push(du(i[s].image)):o.push(du(i[s]))}else o=du(i);n.url=o}return t||(e.images[this.uuid]=n),n}}function du(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?By.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hy=0;const fu=new W;class an extends Ks{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=Fr,i=Fr,o=li,s=mr,a=yi,l=Ji,c=an.DEFAULT_ANISOTROPY,u=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=Ni(),this.name="",this.source=new Kf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fu).x}get height(){return this.source.getSize(fu).y}get depth(){return this.source.getSize(fu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fs:e.x=e.x-Math.floor(e.x);break;case Fr:e.x=e.x<0?0:1;break;case Cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fs:e.y=e.y-Math.floor(e.y);break;case Fr:e.y=e.y<0?0:1;break;case Cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Ng;an.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,n=0,i=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,v=(h+1)/2,E=(p+1)/2,A=(u+f)/4,C=(d+g)/4,D=(_+m)/4;return M>v&&M>E?M<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(M),i=A/n,o=C/n):v>E?v<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(v),n=A/i,o=D/i):E<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(E),n=C/o,i=D/o),this.set(n,i,o,t),this}let S=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(d-g)/S,this.z=(f-u)/S,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vy extends Ks{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const i={width:e,height:t,depth:n.depth},o=new an(i);this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:li,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kf(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ko extends Vy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jg extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gy extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fi{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,Ei):Ei.fromBufferAttribute(o,s),Ei.applyMatrix4(e.matrixWorld),this.expandByPoint(Ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xl.copy(n.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ei),Ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ia),Sl.subVectors(this.max,ia),jo.subVectors(e.a,ia),$o.subVectors(e.b,ia),Ko.subVectors(e.c,ia),Ar.subVectors($o,jo),Cr.subVectors(Ko,$o),so.subVectors(jo,Ko);let t=[0,-Ar.z,Ar.y,0,-Cr.z,Cr.y,0,-so.z,so.y,Ar.z,0,-Ar.x,Cr.z,0,-Cr.x,so.z,0,-so.x,-Ar.y,Ar.x,0,-Cr.y,Cr.x,0,-so.y,so.x,0];return!hu(t,jo,$o,Ko,Sl)||(t=[1,0,0,0,1,0,0,0,1],!hu(t,jo,$o,Ko,Sl))?!1:(wl.crossVectors(Ar,Cr),t=[wl.x,wl.y,wl.z],hu(t,jo,$o,Ko,Sl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const rr=[new W,new W,new W,new W,new W,new W,new W,new W],Ei=new W,xl=new Fi,jo=new W,$o=new W,Ko=new W,Ar=new W,Cr=new W,so=new W,ia=new W,Sl=new W,wl=new W,ao=new W;function hu(r,e,t,n,i){for(let o=0,s=r.length-3;o<=s;o+=3){ao.fromArray(r,o);const a=i.x*Math.abs(ao.x)+i.y*Math.abs(ao.y)+i.z*Math.abs(ao.z),l=e.dot(ao),c=t.dot(ao),u=n.dot(ao);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Wy=new Fi,ra=new W,pu=new W;class tr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Wy.setFromPoints(e).getCenter(n);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ra.subVectors(e,this.center);const t=ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ra.copy(e.center).add(pu)),this.expandByPoint(ra.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const or=new W,mu=new W,bl=new W,Rr=new W,gu=new W,Ml=new W,_u=new W;class Zc{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,or)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=or.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(or.copy(this.origin).addScaledVector(this.direction,t),or.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mu.copy(e).add(t).multiplyScalar(.5),bl.copy(t).sub(e).normalize(),Rr.copy(this.origin).sub(mu);const o=e.distanceTo(t)*.5,s=-this.direction.dot(bl),a=Rr.dot(this.direction),l=-Rr.dot(bl),c=Rr.lengthSq(),u=Math.abs(1-s*s);let d,f,h,_;if(u>0)if(d=s*l-a,f=s*a-l,_=o*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+s*f+2*a)+f*(s*d+f+2*l)+c}else f=o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f=-o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-s*o+a)),f=d>0?-o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-o,-l),o),h=f*(f+2*l)+c):(d=Math.max(0,-(s*o+a)),f=d>0?o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c);else f=s>0?-o:o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mu).addScaledVector(bl,f),h}intersectSphere(e,t){or.subVectors(e.center,this.origin);const n=or.dot(this.direction),i=or.dot(or)-n*n,o=e.radius*e.radius;if(i>o)return null;const s=Math.sqrt(o-i),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,s,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(o=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),n>s||o>i||((o>n||isNaN(n))&&(n=o),(s<i||isNaN(i))&&(i=s),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,or)!==null}intersectTriangle(e,t,n,i,o){gu.subVectors(t,e),Ml.subVectors(n,e),_u.crossVectors(gu,Ml);let s=this.direction.dot(_u),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Rr.subVectors(this.origin,e);const l=a*this.direction.dot(Ml.crossVectors(Rr,Ml));if(l<0)return null;const c=a*this.direction.dot(gu.cross(Rr));if(c<0||l+c>s)return null;const u=-a*Rr.dot(_u);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=o,p[5]=s,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Zo.setFromMatrixColumn(e,0).length(),o=1/Zo.setFromMatrixColumn(e,1).length(),s=1/Zo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){const f=s*u,h=s*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=s*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=s*c,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=s*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-s*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=s*u,t[9]=g-f*a,t[2]=-s*c,t[6]=a,t[10]=s*l}else if(e.order==="ZYX"){const f=s*u,h=s*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=s*l}else if(e.order==="YZX"){const f=s*l,h=s*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=s*l,h=s*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=s*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xy,e,qy)}lookAt(e,t,n){const i=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),Pr.crossVectors(n,ei),Pr.lengthSq()===0&&(Math.abs(n.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),Pr.crossVectors(n,ei)),Pr.normalize(),El.crossVectors(ei,Pr),i[0]=Pr.x,i[4]=El.x,i[8]=ei.x,i[1]=Pr.y,i[5]=El.y,i[9]=ei.y,i[2]=Pr.z,i[6]=El.z,i[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],S=n[3],M=n[7],v=n[11],E=n[15],A=i[0],C=i[4],D=i[8],w=i[12],x=i[1],P=i[5],b=i[9],B=i[13],X=i[2],Y=i[6],q=i[10],$=i[14],N=i[3],fe=i[7],U=i[11],ge=i[15];return o[0]=s*A+a*x+l*X+c*N,o[4]=s*C+a*P+l*Y+c*fe,o[8]=s*D+a*b+l*q+c*U,o[12]=s*w+a*B+l*$+c*ge,o[1]=u*A+d*x+f*X+h*N,o[5]=u*C+d*P+f*Y+h*fe,o[9]=u*D+d*b+f*q+h*U,o[13]=u*w+d*B+f*$+h*ge,o[2]=_*A+g*x+m*X+p*N,o[6]=_*C+g*P+m*Y+p*fe,o[10]=_*D+g*b+m*q+p*U,o[14]=_*w+g*B+m*$+p*ge,o[3]=S*A+M*x+v*X+E*N,o[7]=S*C+M*P+v*Y+E*fe,o[11]=S*D+M*b+v*q+E*U,o[15]=S*w+M*B+v*$+E*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+o*l*d-i*c*d-o*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+o*s*f-i*s*h+i*c*u-o*l*u)+m*(+t*c*d-t*a*h-o*s*d+n*s*h+o*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*s*d-n*s*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],S=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,M=_*f*c-u*m*c-_*l*h+s*m*h+u*l*p-s*f*p,v=u*g*c-_*d*c+_*a*h-s*g*h-u*a*p+s*d*p,E=_*d*l-u*g*l-_*a*f+s*g*f+u*a*m-s*d*m,A=t*S+n*M+i*v+o*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=S*C,e[1]=(g*f*o-d*m*o-g*i*h+n*m*h+d*i*p-n*f*p)*C,e[2]=(a*m*o-g*l*o+g*i*c-n*m*c-a*i*p+n*l*p)*C,e[3]=(d*l*o-a*f*o-d*i*c+n*f*c+a*i*h-n*l*h)*C,e[4]=M*C,e[5]=(u*m*o-_*f*o+_*i*h-t*m*h-u*i*p+t*f*p)*C,e[6]=(_*l*o-s*m*o-_*i*c+t*m*c+s*i*p-t*l*p)*C,e[7]=(s*f*o-u*l*o+u*i*c-t*f*c-s*i*h+t*l*h)*C,e[8]=v*C,e[9]=(_*d*o-u*g*o-_*n*h+t*g*h+u*n*p-t*d*p)*C,e[10]=(s*g*o-_*a*o+_*n*c-t*g*c-s*n*p+t*a*p)*C,e[11]=(u*a*o-s*d*o-u*n*c+t*d*c+s*n*h-t*a*h)*C,e[12]=E*C,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*C,e[14]=(_*a*i-s*g*i-_*n*l+t*g*l+s*n*m-t*a*m)*C,e[15]=(s*d*i-u*a*i+u*n*l-t*d*l-s*n*f+t*a*f)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),o=1-n,s=e.x,a=e.y,l=e.z,c=o*s,u=o*a;return this.set(c*s+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*s,0,c*l-i*a,u*l+i*s,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,s){return this.set(1,n,o,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,o=t._x,s=t._y,a=t._z,l=t._w,c=o+o,u=s+s,d=a+a,f=o*c,h=o*u,_=o*d,g=s*u,m=s*d,p=a*d,S=l*c,M=l*u,v=l*d,E=n.x,A=n.y,C=n.z;return i[0]=(1-(g+p))*E,i[1]=(h+v)*E,i[2]=(_-M)*E,i[3]=0,i[4]=(h-v)*A,i[5]=(1-(f+p))*A,i[6]=(m+S)*A,i[7]=0,i[8]=(_+M)*C,i[9]=(m-S)*C,i[10]=(1-(f+g))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let o=Zo.set(i[0],i[1],i[2]).length();const s=Zo.set(i[4],i[5],i[6]).length(),a=Zo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],Ti.copy(this);const c=1/o,u=1/s,d=1/a;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=u,Ti.elements[5]*=u,Ti.elements[6]*=u,Ti.elements[8]*=d,Ti.elements[9]*=d,Ti.elements[10]*=d,t.setFromRotationMatrix(Ti),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,i,o,s,a=gr){const l=this.elements,c=2*o/(t-e),u=2*o/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===gr)h=-(s+o)/(s-o),_=-2*s*o/(s-o);else if(a===Pc)h=-s/(s-o),_=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,o,s,a=gr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(s-o),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===gr)_=(s+o)*d,g=-2*d;else if(a===Pc)_=o*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Zo=new W,Ti=new lt,Xy=new W(0,0,0),qy=new W(1,1,1),Pr=new W,El=new W,ei=new W,sp=new lt,ap=new no;class Qi{constructor(e=0,t=0,n=0,i=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,o=i[0],s=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-ht(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ap.setFromEuler(this),this.setFromQuaternion(ap,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class $g{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yy=0;const lp=new W,Jo=new no,sr=new lt,Tl=new W,oa=new W,jy=new W,$y=new no,cp=new W(1,0,0),up=new W(0,1,0),dp=new W(0,0,1),fp={type:"added"},Ky={type:"removed"},Qo={type:"childadded",child:null},vu={type:"childremoved",child:null};class Yt extends Ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new W,t=new Qi,n=new no,i=new W(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new lt},normalMatrix:{value:new at}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $g,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jo.setFromAxisAngle(e,t),this.quaternion.multiply(Jo),this}rotateOnWorldAxis(e,t){return Jo.setFromAxisAngle(e,t),this.quaternion.premultiply(Jo),this}rotateX(e){return this.rotateOnAxis(cp,e)}rotateY(e){return this.rotateOnAxis(up,e)}rotateZ(e){return this.rotateOnAxis(dp,e)}translateOnAxis(e,t){return lp.copy(e).applyQuaternion(this.quaternion),this.position.add(lp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cp,e)}translateY(e){return this.translateOnAxis(up,e)}translateZ(e){return this.translateOnAxis(dp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tl.copy(e):Tl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sr.lookAt(oa,Tl,this.up):sr.lookAt(Tl,oa,this.up),this.quaternion.setFromRotationMatrix(sr),i&&(sr.extractRotation(i.matrixWorld),Jo.setFromRotationMatrix(sr),this.quaternion.premultiply(Jo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fp),Qo.child=e,this.dispatchEvent(Qo),Qo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ky),vu.child=e,this.dispatchEvent(vu),vu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fp),Qo.child=e,this.dispatchEvent(Qo),Qo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,jy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,$y,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(e.shapes,d)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));i.material=a}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(e.animations,l))}}if(t){const a=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),d=s(e.shapes),f=s(e.skeletons),h=s(e.animations),_=s(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function s(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Yt.DEFAULT_UP=new W(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ai=new W,ar=new W,yu=new W,lr=new W,es=new W,ts=new W,hp=new W,xu=new W,Su=new W,wu=new W,bu=new Mt,Mu=new Mt,Eu=new Mt;class Di{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ai.subVectors(e,t),i.cross(Ai);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){Ai.subVectors(i,t),ar.subVectors(n,t),yu.subVectors(e,t);const s=Ai.dot(Ai),a=Ai.dot(ar),l=Ai.dot(yu),c=ar.dot(ar),u=ar.dot(yu),d=s*c-a*a;if(d===0)return o.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(s*u-a*l)*f;return o.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(e,t,n,i,o,s,a,l){return this.getBarycoord(e,t,n,i,lr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,lr.x),l.addScaledVector(s,lr.y),l.addScaledVector(a,lr.z),l)}static getInterpolatedAttribute(e,t,n,i,o,s){return bu.setScalar(0),Mu.setScalar(0),Eu.setScalar(0),bu.fromBufferAttribute(e,t),Mu.fromBufferAttribute(e,n),Eu.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(bu,o.x),s.addScaledVector(Mu,o.y),s.addScaledVector(Eu,o.z),s}static isFrontFacing(e,t,n,i){return Ai.subVectors(n,t),ar.subVectors(e,t),Ai.cross(ar).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),Ai.cross(ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return Di.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return Di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,o=this.c;let s,a;es.subVectors(i,n),ts.subVectors(o,n),xu.subVectors(e,n);const l=es.dot(xu),c=ts.dot(xu);if(l<=0&&c<=0)return t.copy(n);Su.subVectors(e,i);const u=es.dot(Su),d=ts.dot(Su);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(n).addScaledVector(es,s);wu.subVectors(e,o);const h=es.dot(wu),_=ts.dot(wu);if(_>=0&&h<=_)return t.copy(o);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(ts,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return hp.subVectors(o,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hp,a);const p=1/(m+g+f);return s=g*p,a=f*p,t.copy(n).addScaledVector(es,s).addScaledVector(ts,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Lr={h:0,s:0,l:0},Al={h:0,s:0,l:0};function Tu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let $e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=yt.workingColorSpace){return this.r=e,this.g=t,this.b=n,yt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=yt.workingColorSpace){if(e=$f(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=Tu(s,o,e+1/3),this.g=Tu(s,o,e),this.b=Tu(s,o,e-1/3)}return yt.colorSpaceToWorking(this,i),this}setStyle(e,t=yn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yn){const n=Kg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yn){return yt.workingToColorSpace(En.copy(this),e),Math.round(ht(En.r*255,0,255))*65536+Math.round(ht(En.g*255,0,255))*256+Math.round(ht(En.b*255,0,255))}getHexString(e=yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.workingToColorSpace(En.copy(this),t);const n=En.r,i=En.g,o=En.b,s=Math.max(n,i,o),a=Math.min(n,i,o);let l,c;const u=(a+s)/2;if(a===s)l=0,c=0;else{const d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case n:l=(i-o)/d+(i<o?6:0);break;case i:l=(o-n)/d+2;break;case o:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=yt.workingColorSpace){return yt.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=yn){yt.workingToColorSpace(En.copy(this),e);const t=En.r,n=En.g,i=En.b;return e!==yn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Lr),this.setHSL(Lr.h+e,Lr.s+t,Lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Lr),e.getHSL(Al);const n=Ia(Lr.h,Al.h,t),i=Ia(Lr.s,Al.s,t),o=Ia(Lr.l,Al.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const En=new $e;$e.NAMES=Kg;let Zy=0;class $i extends Ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zy++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=qr,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dd,this.blendDst=fd,this.blendEquation=wo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qo,this.stencilZFail=qo,this.stencilZPass=qo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qr&&(n.blending=this.blending),this.side!==br&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dd&&(n.blendSrc=this.blendSrc),this.blendDst!==fd&&(n.blendDst=this.blendDst),this.blendEquation!==wo&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(t){const o=i(e.textures),s=i(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mo extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const en=new W,Cl=new gt;let Jy=0;class Lt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$d,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cl.fromBufferAttribute(this,t),Cl.applyMatrix3(e),this.setXY(t,Cl.x,Cl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),o=Pt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$d&&(e.usage=this.usage),e}}class Zg extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jg extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Sr extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Qy=0;const hi=new lt,Au=new Yt,ns=new W,ti=new Fi,sa=new Fi,hn=new W;class Mi extends Ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qy++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yg(e)?Jg:Zg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new at().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return Au.lookAt(e),Au.updateMatrix(),this.applyMatrix4(Au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,o=e.length;i<o;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Sr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const o=t[n];ti.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){const a=t[o];sa.setFromBufferAttribute(a),this.morphTargetsRelative?(hn.addVectors(ti.min,sa.min),ti.expandByPoint(hn),hn.addVectors(ti.max,sa.max),ti.expandByPoint(hn)):(ti.expandByPoint(sa.min),ti.expandByPoint(sa.max))}ti.getCenter(n);let i=0;for(let o=0,s=e.count;o<s;o++)hn.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(hn));if(t)for(let o=0,s=t.length;o<s;o++){const a=t[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)hn.fromBufferAttribute(a,c),l&&(ns.fromBufferAttribute(e,c),hn.add(ns)),i=Math.max(i,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new W,l[D]=new W;const c=new W,u=new W,d=new W,f=new gt,h=new gt,_=new gt,g=new W,m=new W;function p(D,w,x){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,x),f.fromBufferAttribute(o,D),h.fromBufferAttribute(o,w),_.fromBufferAttribute(o,x),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const P=1/(h.x*_.y-_.x*h.y);isFinite(P)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(P),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(P),a[D].add(g),a[w].add(g),a[x].add(g),l[D].add(m),l[w].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let D=0,w=S.length;D<w;++D){const x=S[D],P=x.start,b=x.count;for(let B=P,X=P+b;B<X;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const M=new W,v=new W,E=new W,A=new W;function C(D){E.fromBufferAttribute(i,D),A.copy(E);const w=a[D];M.copy(w),M.sub(E.multiplyScalar(E.dot(w))).normalize(),v.crossVectors(A,w);const P=v.dot(l[D])<0?-1:1;s.setXYZW(D,M.x,M.y,M.z,P)}for(let D=0,w=S.length;D<w;++D){const x=S[D],P=x.start,b=x.count;for(let B=P,X=P+b;B<X;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new W,o=new W,s=new W,a=new W,l=new W,c=new W,u=new W,d=new W;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Lt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const o=e.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pp=new lt,lo=new Zc,Rl=new tr,mp=new W,Pl=new W,Ll=new W,Dl=new W,Cu=new W,Il=new W,gp=new W,Ol=new W;class Hn extends Yt{constructor(e=new Mi,t=new Mo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(o&&a){Il.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(Cu.fromBufferAttribute(d,e),s?Il.addScaledVector(Cu,u):Il.addScaledVector(Cu.sub(t),u))}t.add(Il)}return t}raycast(e,t){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rl.copy(n.boundingSphere),Rl.applyMatrix4(o),lo.copy(e.ray).recast(e.near),!(Rl.containsPoint(lo.origin)===!1&&(lo.intersectSphere(Rl,mp)===null||lo.origin.distanceToSquared(mp)>(e.far-e.near)**2))&&(pp.copy(o).invert(),lo.copy(e.ray).applyMatrix4(pp),!(n.boundingBox!==null&&lo.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,lo)))}_computeIntersections(e,t,n){let i;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,h=o.drawRange;if(a!==null)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=s[m.materialIndex],S=Math.max(m.start,h.start),M=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,E=M;v<E;v+=3){const A=a.getX(v),C=a.getX(v+1),D=a.getX(v+2);i=Nl(this,p,e,n,c,u,d,A,C,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const S=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);i=Nl(this,s,e,n,c,u,d,S,M,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=s[m.materialIndex],S=Math.max(m.start,h.start),M=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,E=M;v<E;v+=3){const A=v,C=v+1,D=v+2;i=Nl(this,p,e,n,c,u,d,A,C,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const S=m,M=m+1,v=m+2;i=Nl(this,s,e,n,c,u,d,S,M,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ex(r,e,t,n,i,o,s,a){let l;if(e.side===qn?l=n.intersectTriangle(s,o,i,!0,a):l=n.intersectTriangle(i,o,s,e.side===br,a),l===null)return null;Ol.copy(a),Ol.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ol);return c<t.near||c>t.far?null:{distance:c,point:Ol.clone(),object:r}}function Nl(r,e,t,n,i,o,s,a,l,c){r.getVertexPosition(a,Pl),r.getVertexPosition(l,Ll),r.getVertexPosition(c,Dl);const u=ex(r,e,t,n,Pl,Ll,Dl,gp);if(u){const d=new W;Di.getBarycoord(gp,Pl,Ll,Dl,d),i&&(u.uv=Di.getInterpolatedAttribute(i,a,l,c,d,new gt)),o&&(u.uv1=Di.getInterpolatedAttribute(o,a,l,c,d,new gt)),s&&(u.normal=Di.getInterpolatedAttribute(s,a,l,c,d,new W),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new W,materialIndex:0};Di.getNormal(Pl,Ll,Dl,f.normal),u.face=f,u.barycoord=d}return u}class gl extends Mi{constructor(e=1,t=1,n=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:s};const a=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,s,o,0),_("z","y","x",1,-1,n,t,-e,s,o,1),_("x","z","y",1,1,e,n,t,i,s,2),_("x","z","y",1,-1,e,n,-t,i,s,3),_("x","y","z",1,-1,e,t,n,i,o,4),_("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(l),this.setAttribute("position",new Sr(c,3)),this.setAttribute("normal",new Sr(u,3)),this.setAttribute("uv",new Sr(d,2));function _(g,m,p,S,M,v,E,A,C,D,w){const x=v/C,P=E/D,b=v/2,B=E/2,X=A/2,Y=C+1,q=D+1;let $=0,N=0;const fe=new W;for(let U=0;U<q;U++){const ge=U*P-B;for(let ze=0;ze<Y;ze++){const Ze=ze*x-b;fe[g]=Ze*S,fe[m]=ge*M,fe[p]=X,c.push(fe.x,fe.y,fe.z),fe[g]=0,fe[m]=0,fe[p]=A>0?1:-1,u.push(fe.x,fe.y,fe.z),d.push(ze/C),d.push(1-U/D),$+=1}}for(let U=0;U<D;U++)for(let ge=0;ge<C;ge++){const ze=f+ge+Y*U,Ze=f+ge+Y*(U+1),J=f+(ge+1)+Y*(U+1),se=f+(ge+1)+Y*U;l.push(ze,Ze,se),l.push(Ze,J,se),N+=6}a.addGroup(h,N,w),h+=N,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nn(r){const e={};for(let t=0;t<r.length;t++){const n=Bs(r[t]);for(const i in n)e[i]=n[i]}return e}function tx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Qg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}const nx={clone:Bs,merge:Nn};var ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ix,this.fragmentShader=rx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=tx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class e_ extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=gr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dr=new W,_p=new gt,vp=new gt;class Xn extends e_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ks*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z),Dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z)}getViewSize(e,t){return this.getViewBounds(e,_p,vp),t.subVectors(vp,_p)}setViewOffset(e,t,n,i,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*i/l,t-=s.offsetY*n/c,i*=s.width/l,n*=s.height/c}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const is=-90,rs=1;class ox extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xn(is,rs,e,t);i.layers=this.layers,this.add(i);const o=new Xn(is,rs,e,t);o.layers=this.layers,this.add(o);const s=new Xn(is,rs,e,t);s.layers=this.layers,this.add(s);const a=new Xn(is,rs,e,t);a.layers=this.layers,this.add(a);const l=new Xn(is,rs,e,t);l.layers=this.layers,this.add(l);const c=new Xn(is,rs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,o,s,a,l]=t;for(const c of t)this.remove(c);if(e===gr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Pc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class t_ extends an{constructor(e=[],t=Ns,n,i,o,s,a,l,c,u){super(e,t,n,i,o,s,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sx extends ko{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new t_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gl(5,5,5),o=new xi({name:"CubemapFromEquirect",uniforms:Bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qn,blending:Xr});o.uniforms.tEquirect.value=t;const s=new Hn(i,o),a=t.minFilter;return t.minFilter===mr&&(t.minFilter=li),new ox(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(o)}}class _r extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ax={type:"move"};class Ru{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ax)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yp extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class lx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$d,this.updateRanges=[],this.version=0,this.uuid=Ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,o=this.stride;i<o;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dn=new W;class Zf{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Li(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),o=Pt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const xp=new W,Sp=new Mt,wp=new Mt,cx=new W,bp=new lt,Ul=new W,Pu=new tr,Mp=new lt,Lu=new Zc;class ux extends Hn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$h,this.bindMatrix=new lt,this.bindMatrixInverse=new lt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Fi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingBox.expandByPoint(Ul)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new tr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingSphere.expandByPoint(Ul)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pu.copy(this.boundingSphere),Pu.applyMatrix4(i),e.ray.intersectsSphere(Pu)!==!1&&(Mp.copy(i).invert(),Lu.copy(e.ray).applyMatrix4(Mp),!(this.boundingBox!==null&&Lu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===$h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ry?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Sp.fromBufferAttribute(i.attributes.skinIndex,e),wp.fromBufferAttribute(i.attributes.skinWeight,e),xp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const s=wp.getComponent(o);if(s!==0){const a=Sp.getComponent(o);bp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(cx.copy(xp).applyMatrix4(bp),s)}}return t.applyMatrix4(this.bindMatrixInverse)}}class n_ extends Yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class i_ extends an{constructor(e=null,t=1,n=1,i,o,s,a,l,c=Vn,u=Vn,d,f){super(null,s,a,l,c,u,i,o,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ep=new lt,dx=new lt;class Jf{constructor(e=[],t=[]){this.uuid=Ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new lt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new lt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let o=0,s=e.length;o<s;o++){const a=e[o]?e[o].matrixWorld:dx;Ep.multiplyMatrices(a,t[o]),Ep.toArray(n,o*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new i_(t,e,e,yi,Oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const o=e.bones[n];let s=t[o];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),s=new n_),this.bones.push(s),this.boneInverses.push(new lt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,o=t.length;i<o;i++){const s=t[i];e.bones.push(s.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Kd extends Lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const os=new lt,Tp=new lt,Fl=[],Ap=new Fi,fx=new lt,aa=new Hn,la=new tr;class hx extends Hn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,fx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Ap.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(Ap)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new tr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),la.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(la)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,s=e*o+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(aa.geometry=this.geometry,aa.material=this.material,aa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),la.copy(this.boundingSphere),la.applyMatrix4(n),e.ray.intersectsSphere(la)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,os),Tp.multiplyMatrices(n,os),aa.matrixWorld=Tp,aa.raycast(e,Fl);for(let s=0,a=Fl.length;s<a;s++){const l=Fl[s];l.instanceId=o,l.object=this,t.push(l)}Fl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new i_(new Float32Array(i*this.count),i,this.count,Xf,Oi));const o=this.morphTexture.source.data.data;let s=0;for(let c=0;c<n.length;c++)s+=n[c];const a=this.geometry.morphTargetsRelative?1:1-s,l=i*e;o[l]=a,o.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Du=new W,px=new W,mx=new at;class _o{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Du.subVectors(n,t).cross(px.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Du),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||mx.getNormalMatrix(e),i=this.coplanarPoint(Du).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const co=new tr,kl=new W;class Qf{constructor(e=new _o,t=new _o,n=new _o,i=new _o,o=new _o,s=new _o){this.planes=[e,t,n,i,o,s]}set(e,t,n,i,o,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gr){const n=this.planes,i=e.elements,o=i[0],s=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],S=i[13],M=i[14],v=i[15];if(n[0].setComponents(l-o,f-c,m-h,v-p).normalize(),n[1].setComponents(l+o,f+c,m+h,v+p).normalize(),n[2].setComponents(l+s,f+u,m+_,v+S).normalize(),n[3].setComponents(l-s,f-u,m-_,v-S).normalize(),n[4].setComponents(l-a,f-d,m-g,v-M).normalize(),t===gr)n[5].setComponents(l+a,f+d,m+g,v+M).normalize();else if(t===Pc)n[5].setComponents(a,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),co.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),co.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(co)}intersectsSprite(e){return co.center.set(0,0,0),co.radius=.7071067811865476,co.applyMatrix4(e.matrixWorld),this.intersectsSphere(co)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(kl.x=i.normal.x>0?e.max.x:e.min.x,kl.y=i.normal.y>0?e.max.y:e.min.y,kl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class r_ extends $i{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lc=new W,Dc=new W,Cp=new lt,ca=new Zc,Bl=new tr,Iu=new W,Rp=new W;class eh extends Yt{constructor(e=new Mi,t=new r_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)Lc.fromBufferAttribute(t,i-1),Dc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Lc.distanceTo(Dc);e.setAttribute("lineDistance",new Sr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bl.copy(n.boundingSphere),Bl.applyMatrix4(i),Bl.radius+=o,e.ray.intersectsSphere(Bl)===!1)return;Cp.copy(i).invert(),ca.copy(e.ray).applyMatrix4(Cp);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,s.start),_=Math.min(u.count,s.start+s.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),S=u.getX(g+1),M=zl(this,e,ca,l,p,S,g);M&&t.push(M)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=zl(this,e,ca,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,s.start),_=Math.min(f.count,s.start+s.count);for(let g=h,m=_-1;g<m;g+=c){const p=zl(this,e,ca,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=zl(this,e,ca,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function zl(r,e,t,n,i,o,s){const a=r.geometry.attributes.position;if(Lc.fromBufferAttribute(a,i),Dc.fromBufferAttribute(a,o),t.distanceSqToSegment(Lc,Dc,Iu,Rp)>n)return;Iu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Iu);if(!(c<e.near||c>e.far))return{distance:c,point:Rp.clone().applyMatrix4(r.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:r}}const Pp=new W,Lp=new W;class gx extends eh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,o=t.count;i<o;i+=2)Pp.fromBufferAttribute(t,i),Lp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Pp.distanceTo(Lp);e.setAttribute("lineDistance",new Sr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _x extends eh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class o_ extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dp=new lt,Zd=new Zc,Hl=new tr,Vl=new W;class Jd extends Yt{constructor(e=new Mi,t=new o_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(i),Hl.radius+=o,e.ray.intersectsSphere(Hl)===!1)return;Dp.copy(i).invert(),Zd.copy(e.ray).applyMatrix4(Dp);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,s.start),h=Math.min(c.count,s.start+s.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Vl.fromBufferAttribute(d,m),Ip(Vl,m,l,i,e,t,this)}}else{const f=Math.max(0,s.start),h=Math.min(d.count,s.start+s.count);for(let _=f,g=h;_<g;_++)Vl.fromBufferAttribute(d,_),Ip(Vl,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Ip(r,e,t,n,i,o,s){const a=Zd.distanceSqToPoint(r);if(a<t){const l=new W;Zd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class s_ extends an{constructor(e,t,n=Fo,i,o,s,a=Vn,l=Vn,c,u=Qa,d=1){if(u!==Qa&&u!==el)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,o,s,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ri extends Mi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const o=e/2,s=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const S=p*f-s;for(let M=0;M<c;M++){const v=M*d-o;_.push(v,-S,0),g.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const M=S+c*p,v=S+c*(p+1),E=S+1+c*(p+1),A=S+1+c*p;h.push(M,v,A),h.push(v,E,A)}this.setIndex(h),this.setAttribute("position",new Sr(_,3)),this.setAttribute("normal",new Sr(g,3)),this.setAttribute("uv",new Sr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class th extends $i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xg,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nr extends th{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class vx extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ay,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yx extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Gl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function xx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Sx(r){function e(i,o){return r[i]-r[o]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Op(r,e,t){const n=r.length,i=new r.constructor(n);for(let o=0,s=0;s!==n;++o){const a=t[o]*e;for(let l=0;l!==e;++l)i[s++]=r[a+l]}return i}function a_(r,e,t,n){let i=1,o=r[0];for(;o!==void 0&&o[n]===void 0;)o=r[i++];if(o===void 0)return;let s=o[n];if(s!==void 0)if(Array.isArray(s))do s=o[n],s!==void 0&&(e.push(o.time),t.push(...s)),o=r[i++];while(o!==void 0);else if(s.toArray!==void 0)do s=o[n],s!==void 0&&(e.push(o.time),s.toArray(t,t.length)),o=r[i++];while(o!==void 0);else do s=o[n],s!==void 0&&(e.push(o.time),t.push(s)),o=r[i++];while(o!==void 0)}class _l{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],o=t[n-1];n:{e:{let s;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(o=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=o)){const a=t[1];e<a&&(n=2,o=a);for(let l=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){const a=n+s>>>1;e<t[a]?s=a:n=a+1}if(i=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,i)}return this.interpolate_(n,o,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i;for(let s=0;s!==i;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class wx extends _l{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kh,endingEnd:Kh}}intervalChanged_(e,t,n){const i=this.parameterPositions;let o=e-2,s=e+1,a=i[o],l=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case Zh:o=e,a=2*t-n;break;case Jh:o=i.length-2,a=t+i[o]-i[o+1];break;default:o=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zh:s=e,l=2*n-t;break;case Jh:s=1,l=n+i[1]-i[0];break;default:s=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,S=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,M=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let E=0;E!==a;++E)o[E]=p*s[u+E]+S*s[c+E]+M*s[l+E]+v*s[d+E];return o}}class bx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)o[f]=s[c+f]*d+s[l+f]*u;return o}}class Mx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ki{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gl(t,this.TimeBufferType),this.values=Gl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gl(e.times,Array),values:Gl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case nl:t=this.InterpolantFactoryMethodLinear;break;case lu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return nl;case this.InterpolantFactoryMethodSmooth:return lu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let o=0,s=i-1;for(;o!==i&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==i){o>=s&&(s=Math.max(s,1),o=s-1);const a=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),e=!1;break}s=l}if(i!==void 0&&xx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===lu,o=e.length-1;let s=1;for(let a=1;a<o;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==s){e[s]=e[a];const d=a*n,f=s*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++s}}if(o>0){e[s]=e[o];for(let a=o*n,l=s*n,c=0;c!==n;++c)t[l+c]=t[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ki.prototype.ValueTypeName="";ki.prototype.TimeBufferType=Float32Array;ki.prototype.ValueBufferType=Float32Array;ki.prototype.DefaultInterpolation=nl;class Zs extends ki{constructor(e,t,n){super(e,t,n)}}Zs.prototype.ValueTypeName="bool";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=tl;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class l_ extends ki{constructor(e,t,n,i){super(e,t,n,i)}}l_.prototype.ValueTypeName="color";class zs extends ki{constructor(e,t,n,i){super(e,t,n,i)}}zs.prototype.ValueTypeName="number";class Ex extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)no.slerpFlat(o,0,s,c-a,s,c,l);return o}}class Hs extends ki{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ex(this.times,this.values,this.getValueSize(),e)}}Hs.prototype.ValueTypeName="quaternion";Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class Js extends ki{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="string";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=tl;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends ki{constructor(e,t,n,i){super(e,t,n,i)}}Vs.prototype.ValueTypeName="vector";class Tx{constructor(e="",t=-1,n=[],i=oy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ni(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(Cx(n[s]).scale(i));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,s=n.length;o!==s;++o)t.push(ki.toJSON(n[o]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const o=t.length,s=[];for(let a=0;a<o;a++){let l=[],c=[];l.push((a+o-1)%o,a,(a+1)%o),c.push(0,1,0);const u=Sx(l);l=Op(l,1,u),c=Op(c,1,u),!i&&l[0]===0&&(l.push(o),c.push(c[0])),s.push(new zs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},o=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(o);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const s=[];for(const a in i)s.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return s}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];a_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],o=e.name||"default",s=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let S=0;S!==f[_].morphTargets.length;++S){const M=f[_];m.push(M.time),p.push(M.morphTarget===g?1:0)}i.push(new zs(".morphTargetInfluence["+g+"]",m,p))}l=h.length*s}else{const h=".bones["+t[d].name+"]";n(Vs,h+".position",f,"pos",i),n(Hs,h+".quaternion",f,"rot",i),n(Vs,h+".scale",f,"scl",i)}}return i.length===0?null:new this(o,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ax(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return zs;case"vector":case"vector2":case"vector3":case"vector4":return Vs;case"color":return l_;case"quaternion":return Hs;case"bool":case"boolean":return Zs;case"string":return Js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Cx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ax(r.type);if(r.times===void 0){const t=[],n=[];a_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const kr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Rx{constructor(e,t,n){const i=this;let o=!1,s=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,o===!1&&i.onStart!==void 0&&i.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,i.onProgress!==void 0&&i.onProgress(u,s,a),s===a&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const Px=new Rx;class Qs{constructor(e){this.manager=e!==void 0?e:Px,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Qs.DEFAULT_MATERIAL_NAME="__DEFAULT";const cr={};class Lx extends Error{constructor(e,t){super(e),this.response=t}}class c_ extends Qs{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=kr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(cr[e]!==void 0){cr[e].push({onLoad:t,onProgress:n,onError:i});return}cr[e]=[],cr[e].push({onLoad:t,onProgress:n,onError:i});const s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(s).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=cr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){S();function S(){d.read().then(({done:M,value:v})=>{if(M)p.close();else{g+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let A=0,C=u.length;A<C;A++){const D=u[A];D.onProgress&&D.onProgress(E)}p.enqueue(v),S()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Lx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{kr.add(e,c);const u=cr[e];delete cr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=cr[e];if(u===void 0)throw this.manager.itemError(e),c;delete cr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Dx extends Qs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,s=kr.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;const a=il("img");function l(){u(),kr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function c(d){u(),i&&i(d),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}}class Ix extends Qs{constructor(e){super(e)}load(e,t,n,i){const o=new an,s=new Dx(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}}class Jc extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ou=new lt,Np=new W,Up=new W;class nh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=Ji,this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qf,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Np.setFromMatrixPosition(e.matrixWorld),t.position.copy(Np),Up.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Up),t.updateMatrixWorld(),Ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ox extends nh{constructor(){super(new Xn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ks*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,o=e.distance||t.far;(n!==t.fov||i!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=i,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Nx extends Jc{constructor(e,t,n=0,i=Math.PI/3,o=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.distance=n,this.angle=i,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new Ox}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fp=new lt,ua=new W,Nu=new W;class Ux extends nh{constructor(){super(new Xn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new gt(4,2),this._viewportCount=6,this._viewports=[new Mt(2,1,1,1),new Mt(0,1,1,1),new Mt(3,1,1,1),new Mt(1,1,1,1),new Mt(3,0,1,1),new Mt(1,0,1,1)],this._cubeDirections=[new W(1,0,0),new W(-1,0,0),new W(0,0,1),new W(0,0,-1),new W(0,1,0),new W(0,-1,0)],this._cubeUps=[new W(0,1,0),new W(0,1,0),new W(0,1,0),new W(0,1,0),new W(0,0,1),new W(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(ua),Nu.copy(n.position),Nu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Nu),n.updateMatrixWorld(),i.makeTranslation(-ua.x,-ua.y,-ua.z),Fp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fp)}}class Fx extends Jc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ux}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qc extends e_{constructor(e=-1,t=1,n=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-e,s=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class kx extends nh{constructor(){super(new Qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u_ extends Jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new kx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Bx extends Jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Oa{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Uu=new WeakMap;class zx extends Qs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,s=kr.get(e);if(s!==void 0){if(o.manager.itemStart(e),s.then){s.then(c=>{if(Uu.has(s)===!0)i&&i(Uu.get(s)),o.manager.itemError(e),o.manager.itemEnd(e);else return t&&t(c),o.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(c){return kr.add(e,c),t&&t(c),o.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Uu.set(l,c),kr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});kr.add(e,l),o.manager.itemStart(e)}}class Hx extends Xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ih="\\[\\]\\.:\\/",Vx=new RegExp("["+ih+"]","g"),rh="[^"+ih+"]",Gx="[^"+ih.replace("\\.","")+"]",Wx=/((?:WC+[\/:])*)/.source.replace("WC",rh),Xx=/(WCOD+)?/.source.replace("WCOD",Gx),qx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Yx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),jx=new RegExp("^"+Wx+Xx+qx+Yx+"$"),$x=["material","materials","bones","map"];class Kx{constructor(e,t,n){const i=n||Dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,o=n.length;i!==o;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Dt{constructor(e,t,n){this.path=t,this.parsedPath=n||Dt.parseTrackName(t),this.node=Dt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Dt.Composite(e,t,n):new Dt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Vx,"")}static parseTrackName(e){const t=jx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const o=n.nodeName.substring(i+1);$x.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let s=0;s<o.length;s++){const a=o[s];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let o=t.propertyIndex;if(e||(e=Dt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const s=e[i];if(s===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Dt.Composite=Kx;Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray];Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function kp(r,e,t,n){const i=Zx(n);switch(t){case zg:return r*e;case Xf:return r*e/i.components*i.byteLength;case qf:return r*e/i.components*i.byteLength;case Vg:return r*e*2/i.components*i.byteLength;case Yf:return r*e*2/i.components*i.byteLength;case Hg:return r*e*3/i.components*i.byteLength;case yi:return r*e*4/i.components*i.byteLength;case jf:return r*e*4/i.components*i.byteLength;case fc:case hc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case pc:case mc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bd:case Ed:return Math.max(r,16)*Math.max(e,8)/4;case wd:case Md:return Math.max(r,8)*Math.max(e,8)/2;case Td:case Ad:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Cd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Id:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Od:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Hd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Vd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case gc:case Gd:case Wd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gg:case Xd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case qd:case Yd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zx(r){switch(r){case Ji:case Fg:return{byteLength:1,components:1};case Za:case kg:case ml:return{byteLength:2,components:1};case Gf:case Wf:return{byteLength:2,components:4};case Fo:case Vf:case Oi:return{byteLength:4,components:1};case Bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function d_(){let r=null,e=!1,t=null,n=null;function i(o,s){t(o,s),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function Jx(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:o,update:s}}var Qx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eS=`#ifdef USE_ALPHAHASH
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
#endif`,tS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oS=`#ifdef USE_AOMAP
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
#endif`,sS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,aS=`#ifdef USE_BATCHING
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
#endif`,lS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fS=`#ifdef USE_IRIDESCENCE
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
#endif`,hS=`#ifdef USE_BUMPMAP
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
#endif`,pS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,SS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wS=`#define PI 3.141592653589793
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
} // validated`,bS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,MS=`vec3 transformedNormal = objectNormal;
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
#endif`,ES=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,TS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,AS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,RS="gl_FragColor = linearToOutputTexel( gl_FragColor );",PS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,LS=`#ifdef USE_ENVMAP
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
#endif`,DS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,IS=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,NS=`#ifdef USE_ENVMAP
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
#endif`,US=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zS=`#ifdef USE_GRADIENTMAP
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
}`,HS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,WS=`uniform bool receiveShadow;
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
#endif`,XS=`#ifdef USE_ENVMAP
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
#endif`,qS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,YS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$S=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,KS=`PhysicalMaterial material;
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
#endif`,ZS=`struct PhysicalMaterial {
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
}`,JS=`
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
#endif`,QS=`#if defined( RE_IndirectDiffuse )
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
#endif`,ew=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tw=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ow=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,aw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lw=`#if defined( USE_POINTS_UV )
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
#endif`,cw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pw=`#ifdef USE_MORPHTARGETS
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
#endif`,mw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_w=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sw=`#ifdef USE_NORMALMAP
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
#endif`,ww=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ew=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Aw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ow=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Uw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fw=`float getShadowMask() {
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
}`,kw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bw=`#ifdef USE_SKINNING
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
#endif`,zw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hw=`#ifdef USE_SKINNING
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
#endif`,Vw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ww=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qw=`#ifdef USE_TRANSMISSION
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
#endif`,Yw=`#ifdef USE_TRANSMISSION
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
#endif`,jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$w=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qw=`uniform sampler2D t2D;
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
}`,eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ib=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rb=`#include <common>
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
}`,ob=`#if DEPTH_PACKING == 3200
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
}`,sb=`#define DISTANCE
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
}`,ab=`#define DISTANCE
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
}`,lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ub=`uniform float scale;
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
}`,db=`uniform vec3 diffuse;
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
}`,fb=`#include <common>
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
}`,hb=`uniform vec3 diffuse;
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
}`,pb=`#define LAMBERT
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
}`,mb=`#define LAMBERT
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
}`,gb=`#define MATCAP
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
}`,_b=`#define MATCAP
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
}`,vb=`#define NORMAL
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
}`,yb=`#define NORMAL
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
}`,xb=`#define PHONG
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
}`,Sb=`#define PHONG
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
}`,wb=`#define STANDARD
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
}`,bb=`#define STANDARD
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
}`,Mb=`#define TOON
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
}`,Eb=`#define TOON
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
}`,Tb=`uniform float size;
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
}`,Ab=`uniform vec3 diffuse;
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
}`,Cb=`#include <common>
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
}`,Rb=`uniform vec3 color;
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
}`,Pb=`uniform float rotation;
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
}`,Lb=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:Qx,alphahash_pars_fragment:eS,alphamap_fragment:tS,alphamap_pars_fragment:nS,alphatest_fragment:iS,alphatest_pars_fragment:rS,aomap_fragment:oS,aomap_pars_fragment:sS,batching_pars_vertex:aS,batching_vertex:lS,begin_vertex:cS,beginnormal_vertex:uS,bsdfs:dS,iridescence_fragment:fS,bumpmap_pars_fragment:hS,clipping_planes_fragment:pS,clipping_planes_pars_fragment:mS,clipping_planes_pars_vertex:gS,clipping_planes_vertex:_S,color_fragment:vS,color_pars_fragment:yS,color_pars_vertex:xS,color_vertex:SS,common:wS,cube_uv_reflection_fragment:bS,defaultnormal_vertex:MS,displacementmap_pars_vertex:ES,displacementmap_vertex:TS,emissivemap_fragment:AS,emissivemap_pars_fragment:CS,colorspace_fragment:RS,colorspace_pars_fragment:PS,envmap_fragment:LS,envmap_common_pars_fragment:DS,envmap_pars_fragment:IS,envmap_pars_vertex:OS,envmap_physical_pars_fragment:XS,envmap_vertex:NS,fog_vertex:US,fog_pars_vertex:FS,fog_fragment:kS,fog_pars_fragment:BS,gradientmap_pars_fragment:zS,lightmap_pars_fragment:HS,lights_lambert_fragment:VS,lights_lambert_pars_fragment:GS,lights_pars_begin:WS,lights_toon_fragment:qS,lights_toon_pars_fragment:YS,lights_phong_fragment:jS,lights_phong_pars_fragment:$S,lights_physical_fragment:KS,lights_physical_pars_fragment:ZS,lights_fragment_begin:JS,lights_fragment_maps:QS,lights_fragment_end:ew,logdepthbuf_fragment:tw,logdepthbuf_pars_fragment:nw,logdepthbuf_pars_vertex:iw,logdepthbuf_vertex:rw,map_fragment:ow,map_pars_fragment:sw,map_particle_fragment:aw,map_particle_pars_fragment:lw,metalnessmap_fragment:cw,metalnessmap_pars_fragment:uw,morphinstance_vertex:dw,morphcolor_vertex:fw,morphnormal_vertex:hw,morphtarget_pars_vertex:pw,morphtarget_vertex:mw,normal_fragment_begin:gw,normal_fragment_maps:_w,normal_pars_fragment:vw,normal_pars_vertex:yw,normal_vertex:xw,normalmap_pars_fragment:Sw,clearcoat_normal_fragment_begin:ww,clearcoat_normal_fragment_maps:bw,clearcoat_pars_fragment:Mw,iridescence_pars_fragment:Ew,opaque_fragment:Tw,packing:Aw,premultiplied_alpha_fragment:Cw,project_vertex:Rw,dithering_fragment:Pw,dithering_pars_fragment:Lw,roughnessmap_fragment:Dw,roughnessmap_pars_fragment:Iw,shadowmap_pars_fragment:Ow,shadowmap_pars_vertex:Nw,shadowmap_vertex:Uw,shadowmask_pars_fragment:Fw,skinbase_vertex:kw,skinning_pars_vertex:Bw,skinning_vertex:zw,skinnormal_vertex:Hw,specularmap_fragment:Vw,specularmap_pars_fragment:Gw,tonemapping_fragment:Ww,tonemapping_pars_fragment:Xw,transmission_fragment:qw,transmission_pars_fragment:Yw,uv_pars_fragment:jw,uv_pars_vertex:$w,uv_vertex:Kw,worldpos_vertex:Zw,background_vert:Jw,background_frag:Qw,backgroundCube_vert:eb,backgroundCube_frag:tb,cube_vert:nb,cube_frag:ib,depth_vert:rb,depth_frag:ob,distanceRGBA_vert:sb,distanceRGBA_frag:ab,equirect_vert:lb,equirect_frag:cb,linedashed_vert:ub,linedashed_frag:db,meshbasic_vert:fb,meshbasic_frag:hb,meshlambert_vert:pb,meshlambert_frag:mb,meshmatcap_vert:gb,meshmatcap_frag:_b,meshnormal_vert:vb,meshnormal_frag:yb,meshphong_vert:xb,meshphong_frag:Sb,meshphysical_vert:wb,meshphysical_frag:bb,meshtoon_vert:Mb,meshtoon_frag:Eb,points_vert:Tb,points_frag:Ab,shadow_vert:Cb,shadow_frag:Rb,sprite_vert:Pb,sprite_frag:Lb},De={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},Wi={basic:{uniforms:Nn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Nn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new $e(0)}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Nn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Nn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Nn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new $e(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Nn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Nn([De.points,De.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Nn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Nn([De.common,De.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Nn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Nn([De.sprite,De.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distanceRGBA:{uniforms:Nn([De.common,De.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distanceRGBA_vert,fragmentShader:ct.distanceRGBA_frag},shadow:{uniforms:Nn([De.lights,De.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Wi.physical={uniforms:Nn([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const Wl={r:0,b:0,g:0},uo=new Qi,Db=new lt;function Ib(r,e,t,n,i,o,s){const a=new $e(0);let l=o===!0?0:1,c,u,d=null,f=0,h=null;function _(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function g(M){let v=!1;const E=_(M);E===null?p(a,l):E&&E.isColor&&(p(E,1),v=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(M,v){const E=_(v);E&&(E.isCubeTexture||E.mapping===Kc)?(u===void 0&&(u=new Hn(new gl(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Bs(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),uo.copy(v.backgroundRotation),uo.x*=-1,uo.y*=-1,uo.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(uo.y*=-1,uo.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Db.makeRotationFromEuler(uo)),u.material.toneMapped=yt.getTransfer(E.colorSpace)!==Ot,(d!==E||f!==E.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Hn(new Ri(2,2),new xi({name:"BackgroundMaterial",uniforms:Bs(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=yt.getTransfer(E.colorSpace)!==Ot,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,v){M.getRGB(Wl,Qg(r)),n.buffers.color.setClear(Wl.r,Wl.g,Wl.b,v,s)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:g,addToRenderList:m,dispose:S}}function Ob(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let o=i,s=!1;function a(x,P,b,B,X){let Y=!1;const q=d(B,b,P);o!==q&&(o=q,c(o.object)),Y=h(x,B,b,X),Y&&_(x,B,b,X),X!==null&&e.update(X,r.ELEMENT_ARRAY_BUFFER),(Y||s)&&(s=!1,v(x,P,b,B),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function d(x,P,b){const B=b.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let Y=X[P.id];Y===void 0&&(Y={},X[P.id]=Y);let q=Y[B];return q===void 0&&(q=f(l()),Y[B]=q),q}function f(x){const P=[],b=[],B=[];for(let X=0;X<t;X++)P[X]=0,b[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:b,attributeDivisors:B,object:x,attributes:{},index:null}}function h(x,P,b,B){const X=o.attributes,Y=P.attributes;let q=0;const $=b.getAttributes();for(const N in $)if($[N].location>=0){const U=X[N];let ge=Y[N];if(ge===void 0&&(N==="instanceMatrix"&&x.instanceMatrix&&(ge=x.instanceMatrix),N==="instanceColor"&&x.instanceColor&&(ge=x.instanceColor)),U===void 0||U.attribute!==ge||ge&&U.data!==ge.data)return!0;q++}return o.attributesNum!==q||o.index!==B}function _(x,P,b,B){const X={},Y=P.attributes;let q=0;const $=b.getAttributes();for(const N in $)if($[N].location>=0){let U=Y[N];U===void 0&&(N==="instanceMatrix"&&x.instanceMatrix&&(U=x.instanceMatrix),N==="instanceColor"&&x.instanceColor&&(U=x.instanceColor));const ge={};ge.attribute=U,U&&U.data&&(ge.data=U.data),X[N]=ge,q++}o.attributes=X,o.attributesNum=q,o.index=B}function g(){const x=o.newAttributes;for(let P=0,b=x.length;P<b;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const b=o.newAttributes,B=o.enabledAttributes,X=o.attributeDivisors;b[x]=1,B[x]===0&&(r.enableVertexAttribArray(x),B[x]=1),X[x]!==P&&(r.vertexAttribDivisor(x,P),X[x]=P)}function S(){const x=o.newAttributes,P=o.enabledAttributes;for(let b=0,B=P.length;b<B;b++)P[b]!==x[b]&&(r.disableVertexAttribArray(b),P[b]=0)}function M(x,P,b,B,X,Y,q){q===!0?r.vertexAttribIPointer(x,P,b,X,Y):r.vertexAttribPointer(x,P,b,B,X,Y)}function v(x,P,b,B){g();const X=B.attributes,Y=b.getAttributes(),q=P.defaultAttributeValues;for(const $ in Y){const N=Y[$];if(N.location>=0){let fe=X[$];if(fe===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(fe=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(fe=x.instanceColor)),fe!==void 0){const U=fe.normalized,ge=fe.itemSize,ze=e.get(fe);if(ze===void 0)continue;const Ze=ze.buffer,J=ze.type,se=ze.bytesPerElement,Re=J===r.INT||J===r.UNSIGNED_INT||fe.gpuType===Vf;if(fe.isInterleavedBufferAttribute){const ue=fe.data,Me=ue.stride,Ye=fe.offset;if(ue.isInstancedInterleavedBuffer){for(let Pe=0;Pe<N.locationSize;Pe++)p(N.location+Pe,ue.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Pe=0;Pe<N.locationSize;Pe++)m(N.location+Pe);r.bindBuffer(r.ARRAY_BUFFER,Ze);for(let Pe=0;Pe<N.locationSize;Pe++)M(N.location+Pe,ge/N.locationSize,J,U,Me*se,(Ye+ge/N.locationSize*Pe)*se,Re)}else{if(fe.isInstancedBufferAttribute){for(let ue=0;ue<N.locationSize;ue++)p(N.location+ue,fe.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ue=0;ue<N.locationSize;ue++)m(N.location+ue);r.bindBuffer(r.ARRAY_BUFFER,Ze);for(let ue=0;ue<N.locationSize;ue++)M(N.location+ue,ge/N.locationSize,J,U,ge*se,ge/N.locationSize*ue*se,Re)}}else if(q!==void 0){const U=q[$];if(U!==void 0)switch(U.length){case 2:r.vertexAttrib2fv(N.location,U);break;case 3:r.vertexAttrib3fv(N.location,U);break;case 4:r.vertexAttrib4fv(N.location,U);break;default:r.vertexAttrib1fv(N.location,U)}}}}S()}function E(){D();for(const x in n){const P=n[x];for(const b in P){const B=P[b];for(const X in B)u(B[X].object),delete B[X];delete P[b]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const b in P){const B=P[b];for(const X in B)u(B[X].object),delete B[X];delete P[b]}delete n[x.id]}function C(x){for(const P in n){const b=n[P];if(b[x.id]===void 0)continue;const B=b[x.id];for(const X in B)u(B[X].object),delete B[X];delete b[x.id]}}function D(){w(),s=!0,o!==i&&(o=i,c(o.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:m,disableUnusedAttributes:S}}function Nb(r,e,t){let n;function i(c){n=c}function o(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function s(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)s(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ub(r,e,t,n){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){return!(C!==yi&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const D=C===ml&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Ji&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Oi&&!D)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:E,maxSamples:A}}function Fb(r){const e=this;let t=null,n=0,i=!1,o=!1;const s=new _o,a=new at,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||o&&!m)o?u(null):c();else{const S=o?0:n,M=S*4;let v=p.clippingState||null;l.value=v,v=u(_,f,M,h);for(let E=0;E!==M;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=h;M!==g;++M,v+=4)s.copy(d[M]).applyMatrix4(S,a),s.normal.toArray(m,v),m[v+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function kb(r){let e=new WeakMap;function t(s,a){return a===xd?s.mapping=Ns:a===Sd&&(s.mapping=Us),s}function n(s){if(s&&s.isTexture){const a=s.mapping;if(a===xd||a===Sd)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new sx(l.height);return c.fromEquirectangularTexture(r,s),e.set(s,c),s.addEventListener("dispose",i),t(c.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const _s=4,Bp=[.125,.215,.35,.446,.526,.582],bo=20,Fu=new Qc,zp=new $e;let ku=null,Bu=0,zu=0,Hu=!1;const vo=(1+Math.sqrt(5))/2,ss=1/vo,Hp=[new W(-vo,ss,0),new W(vo,ss,0),new W(-ss,0,vo),new W(ss,0,vo),new W(0,vo,-ss),new W(0,vo,ss),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)],Bb=new W;class Vp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,o={}){const{size:s=256,position:a=Bb}=o;ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Bu,zu),this._renderer.xr.enabled=Hu,e.scissorTest=!1,Xl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:li,minFilter:li,generateMipmaps:!1,type:ml,format:yi,colorSpace:Gn,depthBuffer:!1},i=Gp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gp(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zb(o)),this._blurMaterial=Hb(o,e,t)}return i}_compileMaterial(e){const t=new Hn(this._lodPlanes[0],e);this._renderer.compile(t,Fu)}_sceneToCubeUV(e,t,n,i,o){const l=new Xn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(zp),d.toneMapping=Yr,d.autoClear=!1;const _=new Mo({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1}),g=new Hn(new gl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(zp),m=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(l.up.set(0,c[S],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+u[S],o.y,o.z)):M===1?(l.up.set(0,0,c[S]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+u[S],o.z)):(l.up.set(0,c[S],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+u[S]));const v=this._cubeSize;Xl(i,M*v,S>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ns||e.mapping===Us;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());const o=i?this._cubemapMaterial:this._equirectMaterial,s=new Hn(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const l=this._cubeSize;Xl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,Fu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Hp[(i-o-1)%Hp.length];this._blur(e,o-1,o,s,a)}t.autoClear=n}_blur(e,t,n,i,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",o),this._halfBlur(s,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Hn(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*bo-1),g=o/_,m=isFinite(o)?1+Math.floor(u*g):bo;m>bo&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bo}`);const p=[];let S=0;for(let C=0;C<bo;++C){const D=C/g,w=Math.exp(-D*D/2);p.push(w),C===0?S+=w:C<m&&(S+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=_,f.mipInt.value=M-n;const v=this._sizeLods[i],E=3*v*(i>M-_s?i-M+_s:0),A=4*(this._cubeSize-v);Xl(t,E,A,3*v,2*v),l.setRenderTarget(t),l.render(d,Fu)}}function zb(r){const e=[],t=[],n=[];let i=r;const o=r-_s+1+Bp.length;for(let s=0;s<o;s++){const a=Math.pow(2,i);t.push(a);let l=1/a;s>r-_s?l=Bp[s-r+_s-1]:s===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,S=new Float32Array(g*_*h),M=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let A=0;A<h;A++){const C=A%3*2/3-1,D=A>2?0:-1,w=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];S.set(w,g*_*A),M.set(f,m*_*A);const x=[A,A,A,A,A,A];v.set(x,p*_*A)}const E=new Mi;E.setAttribute("position",new Lt(S,g)),E.setAttribute("uv",new Lt(M,m)),E.setAttribute("faceIndex",new Lt(v,p)),e.push(E),i>_s&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gp(r,e,t){const n=new ko(r,e,t);return n.texture.mapping=Kc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Hb(r,e,t){const n=new Float32Array(bo),i=new W(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:bo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:oh(),fragmentShader:`

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
		`,blending:Xr,depthTest:!1,depthWrite:!1})}function Wp(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oh(),fragmentShader:`

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
		`,blending:Xr,depthTest:!1,depthWrite:!1})}function Xp(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xr,depthTest:!1,depthWrite:!1})}function oh(){return`

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
	`}function Vb(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===xd||l===Sd,u=l===Ns||l===Us;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Gb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&bs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Wb(r,e,t,n){const i={},o=new WeakMap;function s(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",s),delete i[f.id];const h=o.get(f);h&&(e.remove(h),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",s),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const S=h.array;g=h.version;for(let M=0,v=S.length;M<v;M+=3){const E=S[M+0],A=S[M+1],C=S[M+2];f.push(E,A,A,C,C,E)}}else if(_!==void 0){const S=_.array;g=_.version;for(let M=0,v=S.length/3-1;M<v;M+=3){const E=M+0,A=M+1,C=M+2;f.push(E,A,A,C,C,E)}}else return;const m=new(Yg(f)?Jg:Zg)(f,1);m.version=g;const p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){const f=o.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Xb(r,e,t){let n;function i(f){n=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function l(f,h){r.drawElements(n,h,o,f*s),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,o,f*s,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,o,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/s,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,o,f,0,g,0,_);let p=0;for(let S=0;S<_;S++)p+=h[S]*g[S];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function qb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=a*(o/3);break;case r.LINES:t.lines+=a*(o/2);break;case r.LINE_STRIP:t.lines+=a*(o-1);break;case r.LINE_LOOP:t.lines+=a*o;break;case r.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Yb(r,e,t){const n=new WeakMap,i=new Mt;function o(s,a,l){const c=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let x=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var h=x;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,A=1;E>e.maxTextureSize&&(A=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*A*4*d),D=new jg(C,E,A,d);D.type=Oi,D.needsUpdate=!0;const w=v*4;for(let P=0;P<d;P++){const b=p[P],B=S[P],X=M[P],Y=E*A*4*P;for(let q=0;q<b.count;q++){const $=q*w;_===!0&&(i.fromBufferAttribute(b,q),C[Y+$+0]=i.x,C[Y+$+1]=i.y,C[Y+$+2]=i.z,C[Y+$+3]=0),g===!0&&(i.fromBufferAttribute(B,q),C[Y+$+4]=i.x,C[Y+$+5]=i.y,C[Y+$+6]=i.z,C[Y+$+7]=0),m===!0&&(i.fromBufferAttribute(X,q),C[Y+$+8]=i.x,C[Y+$+9]=i.y,C[Y+$+10]=i.z,C[Y+$+11]=X.itemSize===4?i.w:1)}}f={count:d,texture:D,size:new gt(E,A)},n.set(a,f),a.addEventListener("dispose",x)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:o}}function jb(r,e,t,n){let i=new WeakMap;function o(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function s(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:s}}const f_=new an,qp=new s_(1,1),h_=new jg,p_=new Gy,m_=new t_,Yp=[],jp=[],$p=new Float32Array(16),Kp=new Float32Array(9),Zp=new Float32Array(4);function ea(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let o=Yp[i];if(o===void 0&&(o=new Float32Array(i),Yp[i]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,r[s].toArray(o,a)}return o}function ln(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function cn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eu(r,e){let t=jp[e];t===void 0&&(t=new Int32Array(e),jp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function $b(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Kb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2fv(this.addr,e),cn(t,e)}}function Zb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ln(t,e))return;r.uniform3fv(this.addr,e),cn(t,e)}}function Jb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4fv(this.addr,e),cn(t,e)}}function Qb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,n))return;Zp.set(n),r.uniformMatrix2fv(this.addr,!1,Zp),cn(t,n)}}function eM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,n))return;Kp.set(n),r.uniformMatrix3fv(this.addr,!1,Kp),cn(t,n)}}function tM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,n))return;$p.set(n),r.uniformMatrix4fv(this.addr,!1,$p),cn(t,n)}}function nM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2iv(this.addr,e),cn(t,e)}}function rM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;r.uniform3iv(this.addr,e),cn(t,e)}}function oM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4iv(this.addr,e),cn(t,e)}}function sM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function aM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2uiv(this.addr,e),cn(t,e)}}function lM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;r.uniform3uiv(this.addr,e),cn(t,e)}}function cM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4uiv(this.addr,e),cn(t,e)}}function uM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let o;this.type===r.SAMPLER_2D_SHADOW?(qp.compareFunction=qg,o=qp):o=f_,t.setTexture2D(e||o,i)}function dM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||p_,i)}function fM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||m_,i)}function hM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||h_,i)}function pM(r){switch(r){case 5126:return $b;case 35664:return Kb;case 35665:return Zb;case 35666:return Jb;case 35674:return Qb;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return rM;case 35669:case 35673:return oM;case 5125:return sM;case 36294:return aM;case 36295:return lM;case 36296:return cM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return fM;case 36289:case 36303:case 36311:case 36292:return hM}}function mM(r,e){r.uniform1fv(this.addr,e)}function gM(r,e){const t=ea(e,this.size,2);r.uniform2fv(this.addr,t)}function _M(r,e){const t=ea(e,this.size,3);r.uniform3fv(this.addr,t)}function vM(r,e){const t=ea(e,this.size,4);r.uniform4fv(this.addr,t)}function yM(r,e){const t=ea(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function xM(r,e){const t=ea(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function SM(r,e){const t=ea(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function wM(r,e){r.uniform1iv(this.addr,e)}function bM(r,e){r.uniform2iv(this.addr,e)}function MM(r,e){r.uniform3iv(this.addr,e)}function EM(r,e){r.uniform4iv(this.addr,e)}function TM(r,e){r.uniform1uiv(this.addr,e)}function AM(r,e){r.uniform2uiv(this.addr,e)}function CM(r,e){r.uniform3uiv(this.addr,e)}function RM(r,e){r.uniform4uiv(this.addr,e)}function PM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);ln(n,o)||(r.uniform1iv(this.addr,o),cn(n,o));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||f_,o[s])}function LM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);ln(n,o)||(r.uniform1iv(this.addr,o),cn(n,o));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||p_,o[s])}function DM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);ln(n,o)||(r.uniform1iv(this.addr,o),cn(n,o));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||m_,o[s])}function IM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);ln(n,o)||(r.uniform1iv(this.addr,o),cn(n,o));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||h_,o[s])}function OM(r){switch(r){case 5126:return mM;case 35664:return gM;case 35665:return _M;case 35666:return vM;case 35674:return yM;case 35675:return xM;case 35676:return SM;case 5124:case 35670:return wM;case 35667:case 35671:return bM;case 35668:case 35672:return MM;case 35669:case 35673:return EM;case 5125:return TM;case 36294:return AM;case 36295:return CM;case 36296:return RM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return LM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return IM}}class NM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=pM(t.type)}}class UM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=OM(t.type)}}class FM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let o=0,s=i.length;o!==s;++o){const a=i[o];a.setValue(e,t[a.id],n)}}}const Vu=/(\w+)(\])?(\[|\.)?/g;function Jp(r,e){r.seq.push(e),r.map[e.id]=e}function kM(r,e,t){const n=r.name,i=n.length;for(Vu.lastIndex=0;;){const o=Vu.exec(n),s=Vu.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===i){Jp(t,c===void 0?new NM(a,r,e):new UM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new FM(a),Jp(t,d)),t=d}}}class _c{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=e.getActiveUniform(t,i),s=e.getUniformLocation(t,o.name);kM(o,s,this)}}setValue(e,t,n,i){const o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,s=t.length;o!==s;++o){const a=t[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,o=e.length;i!==o;++i){const s=e[i];s.id in t&&n.push(s)}return n}}function Qp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const BM=37297;let zM=0;function HM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=i;s<o;s++){const a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}const em=new at;function VM(r){yt._getMatrix(em,yt.workingColorSpace,r);const e=`mat3( ${em.elements.map(t=>t.toFixed(4))} )`;switch(yt.getTransfer(r)){case Rc:return[e,"LinearTransferOETF"];case Ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function tm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+i+`

`+HM(r.getShaderSource(e),s)}else return i}function GM(r,e){const t=VM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function WM(r,e){let t;switch(e){case Zv:t="Linear";break;case Jv:t="Reinhard";break;case Qv:t="Cineon";break;case ey:t="ACESFilmic";break;case ny:t="AgX";break;case iy:t="Neutral";break;case ty:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ql=new W;function XM(){yt.getLuminanceCoefficients(ql);const r=ql.x.toFixed(4),e=ql.y.toFixed(4),t=ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function YM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function jM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=r.getActiveAttrib(e,i),s=o.name;let a=1;o.type===r.FLOAT_MAT2&&(a=2),o.type===r.FLOAT_MAT3&&(a=3),o.type===r.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:a}}return t}function xa(r){return r!==""}function nm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function im(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $M=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace($M,ZM)}const KM=new Map;function ZM(r,e){let t=ct[e];if(t===void 0){const n=KM.get(e);if(n!==void 0)t=ct[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qd(t)}const JM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rm(r){return r.replace(JM,QM)}function QM(r,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function om(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function eE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ig?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Pv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ur&&(e="SHADOWMAP_TYPE_VSM"),e}function tE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ns:case Us:e="ENVMAP_TYPE_CUBE";break;case Kc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Us:e="ENVMAP_MODE_REFRACTION";break}return e}function iE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Og:e="ENVMAP_BLENDING_MULTIPLY";break;case $v:e="ENVMAP_BLENDING_MIX";break;case Kv:e="ENVMAP_BLENDING_ADD";break}return e}function rE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function oE(r,e,t,n){const i=r.getContext(),o=t.defines;let s=t.vertexShader,a=t.fragmentShader;const l=eE(t),c=tE(t),u=nE(t),d=iE(t),f=rE(t),h=qM(t),_=YM(o),g=i.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yr?"#define TONE_MAPPING":"",t.toneMapping!==Yr?ct.tonemapping_pars_fragment:"",t.toneMapping!==Yr?WM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,GM("linearToOutputTexel",t.outputColorSpace),XM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),s=Qd(s),s=nm(s,t),s=im(s,t),a=Qd(a),a=nm(a,t),a=im(a,t),s=rm(s),a=rm(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ep?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ep?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=S+m+s,v=S+p+a,E=Qp(i,i.VERTEX_SHADER,M),A=Qp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,E),i.attachShader(g,A),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function C(P){if(r.debug.checkShaderErrors){const b=i.getProgramInfoLog(g).trim(),B=i.getShaderInfoLog(E).trim(),X=i.getShaderInfoLog(A).trim();let Y=!0,q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,E,A);else{const $=tm(i,E,"vertex"),N=tm(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+b+`
`+$+`
`+N)}else b!==""?console.warn("THREE.WebGLProgram: Program Info Log:",b):(B===""||X==="")&&(q=!1);q&&(P.diagnostics={runnable:Y,programLog:b,vertexShader:{log:B,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(E),i.deleteShader(A),D=new _c(i,g),w=jM(i,g)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(g,BM)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=A,this}let sE=0;class aE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new lE(e),t.set(e,n)),n}}class lE{constructor(e){this.id=sE++,this.code=e,this.usedTimes=0}}function cE(r,e,t,n,i,o,s){const a=new $g,l=new aE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,x,P,b,B){const X=b.fog,Y=B.geometry,q=w.isMeshStandardMaterial?b.environment:null,$=(w.isMeshStandardMaterial?t:e).get(w.envMap||q),N=$&&$.mapping===Kc?$.image.height:null,fe=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const U=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ge=U!==void 0?U.length:0;let ze=0;Y.morphAttributes.position!==void 0&&(ze=1),Y.morphAttributes.normal!==void 0&&(ze=2),Y.morphAttributes.color!==void 0&&(ze=3);let Ze,J,se,Re;if(fe){const Ae=Wi[fe];Ze=Ae.vertexShader,J=Ae.fragmentShader}else Ze=w.vertexShader,J=w.fragmentShader,l.update(w),se=l.getVertexShaderID(w),Re=l.getFragmentShaderID(w);const ue=r.getRenderTarget(),Me=r.state.buffers.depth.getReversed(),Ye=B.isInstancedMesh===!0,Pe=B.isBatchedMesh===!0,rt=!!w.map,je=!!w.matcap,Ue=!!$,k=!!w.aoMap,xt=!!w.lightMap,Je=!!w.bumpMap,j=!!w.normalMap,be=!!w.displacementMap,nt=!!w.emissiveMap,Fe=!!w.metalnessMap,He=!!w.roughnessMap,wt=w.anisotropy>0,I=w.clearcoat>0,T=w.dispersion>0,H=w.iridescence>0,ee=w.sheen>0,ne=w.transmission>0,te=wt&&!!w.anisotropyMap,ie=I&&!!w.clearcoatMap,me=I&&!!w.clearcoatNormalMap,Ie=I&&!!w.clearcoatRoughnessMap,he=H&&!!w.iridescenceMap,de=H&&!!w.iridescenceThicknessMap,Ee=ee&&!!w.sheenColorMap,ye=ee&&!!w.sheenRoughnessMap,We=!!w.specularMap,pe=!!w.specularColorMap,Ke=!!w.specularIntensityMap,F=ne&&!!w.transmissionMap,we=ne&&!!w.thicknessMap,ae=!!w.gradientMap,Te=!!w.alphaMap,oe=w.alphaTest>0,re=!!w.alphaHash,Oe=!!w.extensions;let Ne=Yr;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Ne=r.toneMapping);const ot={shaderID:fe,shaderType:w.type,shaderName:w.name,vertexShader:Ze,fragmentShader:J,defines:w.defines,customVertexShaderID:se,customFragmentShaderID:Re,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:Pe,batchingColor:Pe&&B._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&B.instanceColor!==null,instancingMorph:Ye&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?r.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Gn,alphaToCoverage:!!w.alphaToCoverage,map:rt,matcap:je,envMap:Ue,envMapMode:Ue&&$.mapping,envMapCubeUVHeight:N,aoMap:k,lightMap:xt,bumpMap:Je,normalMap:j,displacementMap:f&&be,emissiveMap:nt,normalMapObjectSpace:j&&w.normalMapType===cy,normalMapTangentSpace:j&&w.normalMapType===Xg,metalnessMap:Fe,roughnessMap:He,anisotropy:wt,anisotropyMap:te,clearcoat:I,clearcoatMap:ie,clearcoatNormalMap:me,clearcoatRoughnessMap:Ie,dispersion:T,iridescence:H,iridescenceMap:he,iridescenceThicknessMap:de,sheen:ee,sheenColorMap:Ee,sheenRoughnessMap:ye,specularMap:We,specularColorMap:pe,specularIntensityMap:Ke,transmission:ne,transmissionMap:F,thicknessMap:we,gradientMap:ae,opaque:w.transparent===!1&&w.blending===qr&&w.alphaToCoverage===!1,alphaMap:Te,alphaTest:oe,alphaHash:re,combine:w.combine,mapUv:rt&&g(w.map.channel),aoMapUv:k&&g(w.aoMap.channel),lightMapUv:xt&&g(w.lightMap.channel),bumpMapUv:Je&&g(w.bumpMap.channel),normalMapUv:j&&g(w.normalMap.channel),displacementMapUv:be&&g(w.displacementMap.channel),emissiveMapUv:nt&&g(w.emissiveMap.channel),metalnessMapUv:Fe&&g(w.metalnessMap.channel),roughnessMapUv:He&&g(w.roughnessMap.channel),anisotropyMapUv:te&&g(w.anisotropyMap.channel),clearcoatMapUv:ie&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(w.sheenRoughnessMap.channel),specularMapUv:We&&g(w.specularMap.channel),specularColorMapUv:pe&&g(w.specularColorMap.channel),specularIntensityMapUv:Ke&&g(w.specularIntensityMap.channel),transmissionMapUv:F&&g(w.transmissionMap.channel),thicknessMapUv:we&&g(w.thicknessMap.channel),alphaMapUv:Te&&g(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(j||wt),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(rt||Te),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Me,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:ze,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ne,decodeVideoTexture:rt&&w.map.isVideoTexture===!0&&yt.getTransfer(w.map.colorSpace)===Ot,decodeVideoTextureEmissive:nt&&w.emissiveMap.isVideoTexture===!0&&yt.getTransfer(w.emissiveMap.colorSpace)===Ot,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===vi,flipSided:w.side===qn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Oe&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&w.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function p(w){const x=[];if(w.shaderID?x.push(w.shaderID):(x.push(w.customVertexShaderID),x.push(w.customFragmentShaderID)),w.defines!==void 0)for(const P in w.defines)x.push(P),x.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(S(x,w),M(x,w),x.push(r.outputColorSpace)),x.push(w.customProgramCacheKey),x.join()}function S(w,x){w.push(x.precision),w.push(x.outputColorSpace),w.push(x.envMapMode),w.push(x.envMapCubeUVHeight),w.push(x.mapUv),w.push(x.alphaMapUv),w.push(x.lightMapUv),w.push(x.aoMapUv),w.push(x.bumpMapUv),w.push(x.normalMapUv),w.push(x.displacementMapUv),w.push(x.emissiveMapUv),w.push(x.metalnessMapUv),w.push(x.roughnessMapUv),w.push(x.anisotropyMapUv),w.push(x.clearcoatMapUv),w.push(x.clearcoatNormalMapUv),w.push(x.clearcoatRoughnessMapUv),w.push(x.iridescenceMapUv),w.push(x.iridescenceThicknessMapUv),w.push(x.sheenColorMapUv),w.push(x.sheenRoughnessMapUv),w.push(x.specularMapUv),w.push(x.specularColorMapUv),w.push(x.specularIntensityMapUv),w.push(x.transmissionMapUv),w.push(x.thicknessMapUv),w.push(x.combine),w.push(x.fogExp2),w.push(x.sizeAttenuation),w.push(x.morphTargetsCount),w.push(x.morphAttributeCount),w.push(x.numDirLights),w.push(x.numPointLights),w.push(x.numSpotLights),w.push(x.numSpotLightMaps),w.push(x.numHemiLights),w.push(x.numRectAreaLights),w.push(x.numDirLightShadows),w.push(x.numPointLightShadows),w.push(x.numSpotLightShadows),w.push(x.numSpotLightShadowsWithMaps),w.push(x.numLightProbes),w.push(x.shadowMapType),w.push(x.toneMapping),w.push(x.numClippingPlanes),w.push(x.numClipIntersection),w.push(x.depthPacking)}function M(w,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const x=_[w.type];let P;if(x){const b=Wi[x];P=nx.clone(b.uniforms)}else P=w.uniforms;return P}function E(w,x){let P;for(let b=0,B=u.length;b<B;b++){const X=u[b];if(X.cacheKey===x){P=X,++P.usedTimes;break}}return P===void 0&&(P=new oE(r,x,w,o),u.push(P)),P}function A(w){if(--w.usedTimes===0){const x=u.indexOf(w);u[x]=u[u.length-1],u.pop(),w.destroy()}}function C(w){l.remove(w)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:D}}function uE(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function n(s){r.delete(s)}function i(s,a,l){r.get(s)[a]=l}function o(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:o}}function dE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function sm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function am(){const r=[];let e=0;const t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function s(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=s(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=s(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||dE),n.length>1&&n.sort(f||sm),i.length>1&&i.sort(f||sm)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:a,unshift:l,finish:u,sort:c}}function fE(){let r=new WeakMap;function e(n,i){const o=r.get(n);let s;return o===void 0?(s=new am,r.set(n,[s])):i>=o.length?(s=new am,o.push(s)):s=o[i],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function hE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new $e};break;case"SpotLight":t={position:new W,direction:new W,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new W,halfWidth:new W,halfHeight:new W};break}return r[e.id]=t,t}}}function pE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let mE=0;function gE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function _E(r){const e=new hE,t=pE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new W);const i=new W,o=new lt,s=new lt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,S=0,M=0,v=0,E=0,A=0,C=0;c.sort(gE);for(let w=0,x=c.length;w<x;w++){const P=c[w],b=P.color,B=P.intensity,X=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=b.r*B,d+=b.g*B,f+=b.b*B;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],B);C++}else if(P.isDirectionalLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,N=t.get(P);N.shadowIntensity=$.intensity,N.shadowBias=$.bias,N.shadowNormalBias=$.normalBias,N.shadowRadius=$.radius,N.shadowMapSize=$.mapSize,n.directionalShadow[h]=N,n.directionalShadowMap[h]=Y,n.directionalShadowMatrix[h]=P.shadow.matrix,S++}n.directional[h]=q,h++}else if(P.isSpotLight){const q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(b).multiplyScalar(B),q.distance=X,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[g]=q;const $=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,$.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[g]=$.matrix,P.castShadow){const N=t.get(P);N.shadowIntensity=$.intensity,N.shadowBias=$.bias,N.shadowNormalBias=$.normalBias,N.shadowRadius=$.radius,N.shadowMapSize=$.mapSize,n.spotShadow[g]=N,n.spotShadowMap[g]=Y,v++}g++}else if(P.isRectAreaLight){const q=e.get(P);q.color.copy(b).multiplyScalar(B),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=q,m++}else if(P.isPointLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const $=P.shadow,N=t.get(P);N.shadowIntensity=$.intensity,N.shadowBias=$.bias,N.shadowNormalBias=$.normalBias,N.shadowRadius=$.radius,N.shadowMapSize=$.mapSize,N.shadowCameraNear=$.camera.near,N.shadowCameraFar=$.camera.far,n.pointShadow[_]=N,n.pointShadowMap[_]=Y,n.pointShadowMatrix[_]=P.shadow.matrix,M++}n.point[_]=q,_++}else if(P.isHemisphereLight){const q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(B),q.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=q,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==h||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==S||D.numPointShadows!==M||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==C)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,D.directionalLength=h,D.pointLength=_,D.spotLength=g,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=S,D.numPointShadows=M,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=C,n.version=mE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const M=c[p];if(M.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(M.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(M.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),s.identity(),o.copy(M.matrixWorld),o.premultiply(m),s.extractRotation(o),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),_++}else if(M.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function lm(r){const e=new _E(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function o(u){t.push(u)}function s(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function vE(r){let e=new WeakMap;function t(i,o=0){const s=e.get(i);let a;return s===void 0?(a=new lm(r),e.set(i,[a])):o>=s.length?(a=new lm(r),s.push(a)):a=s[o],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const yE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xE=`uniform sampler2D shadow_pass;
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
}`;function SE(r,e,t){let n=new Qf;const i=new gt,o=new gt,s=new Mt,a=new vx({depthPacking:ly}),l=new yx,c={},u=t.maxTextureSize,d={[br]:qn,[qn]:br,[vi]:vi},f=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:yE,fragmentShader:xE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Mi;_.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Hn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ig;let p=this.type;this.render=function(A,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const w=r.getRenderTarget(),x=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),b=r.state;b.setBlending(Xr),b.buffers.color.setClear(1,1,1,1),b.buffers.depth.setTest(!0),b.setScissorTest(!1);const B=p!==ur&&this.type===ur,X=p===ur&&this.type!==ur;for(let Y=0,q=A.length;Y<q;Y++){const $=A[Y],N=$.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);const fe=N.getFrameExtents();if(i.multiply(fe),o.copy(N.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(o.x=Math.floor(u/fe.x),i.x=o.x*fe.x,N.mapSize.x=o.x),i.y>u&&(o.y=Math.floor(u/fe.y),i.y=o.y*fe.y,N.mapSize.y=o.y)),N.map===null||B===!0||X===!0){const ge=this.type!==ur?{minFilter:Vn,magFilter:Vn}:{};N.map!==null&&N.map.dispose(),N.map=new ko(i.x,i.y,ge),N.map.texture.name=$.name+".shadowMap",N.camera.updateProjectionMatrix()}r.setRenderTarget(N.map),r.clear();const U=N.getViewportCount();for(let ge=0;ge<U;ge++){const ze=N.getViewport(ge);s.set(o.x*ze.x,o.y*ze.y,o.x*ze.z,o.y*ze.w),b.viewport(s),N.updateMatrices($,ge),n=N.getFrustum(),v(C,D,N.camera,$,this.type)}N.isPointLightShadow!==!0&&this.type===ur&&S(N,D),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,x,P)};function S(A,C){const D=e.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ko(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(C,null,D,f,g,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(C,null,D,h,g,null)}function M(A,C,D,w){let x=null;const P=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)x=P;else if(x=D.isPointLight===!0?l:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const b=x.uuid,B=C.uuid;let X=c[b];X===void 0&&(X={},c[b]=X);let Y=X[B];Y===void 0&&(Y=x.clone(),X[B]=Y,C.addEventListener("dispose",E)),x=Y}if(x.visible=C.visible,x.wireframe=C.wireframe,w===ur?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:d[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,D.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const b=r.properties.get(x);b.light=D}return x}function v(A,C,D,w,x){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===ur)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const B=e.update(A),X=A.material;if(Array.isArray(X)){const Y=B.groups;for(let q=0,$=Y.length;q<$;q++){const N=Y[q],fe=X[N.materialIndex];if(fe&&fe.visible){const U=M(A,fe,w,x);A.onBeforeShadow(r,A,C,D,B,U,N),r.renderBufferDirect(D,null,B,U,A,N),A.onAfterShadow(r,A,C,D,B,U,N)}}}else if(X.visible){const Y=M(A,X,w,x);A.onBeforeShadow(r,A,C,D,B,Y,null),r.renderBufferDirect(D,null,B,Y,A,null),A.onAfterShadow(r,A,C,D,B,Y,null)}}const b=A.children;for(let B=0,X=b.length;B<X;B++)v(b[B],C,D,w,x)}function E(A){A.target.removeEventListener("dispose",E);for(const D in c){const w=c[D],x=A.target.uuid;x in w&&(w[x].dispose(),delete w[x])}}}const wE={[hd]:pd,[md]:vd,[gd]:yd,[Os]:_d,[pd]:hd,[vd]:md,[yd]:gd,[_d]:Os};function bE(r,e){function t(){let F=!1;const we=new Mt;let ae=null;const Te=new Mt(0,0,0,0);return{setMask:function(oe){ae!==oe&&!F&&(r.colorMask(oe,oe,oe,oe),ae=oe)},setLocked:function(oe){F=oe},setClear:function(oe,re,Oe,Ne,ot){ot===!0&&(oe*=Ne,re*=Ne,Oe*=Ne),we.set(oe,re,Oe,Ne),Te.equals(we)===!1&&(r.clearColor(oe,re,Oe,Ne),Te.copy(we))},reset:function(){F=!1,ae=null,Te.set(-1,0,0,0)}}}function n(){let F=!1,we=!1,ae=null,Te=null,oe=null;return{setReversed:function(re){if(we!==re){const Oe=e.get("EXT_clip_control");re?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),we=re;const Ne=oe;oe=null,this.setClear(Ne)}},getReversed:function(){return we},setTest:function(re){re?ue(r.DEPTH_TEST):Me(r.DEPTH_TEST)},setMask:function(re){ae!==re&&!F&&(r.depthMask(re),ae=re)},setFunc:function(re){if(we&&(re=wE[re]),Te!==re){switch(re){case hd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case Os:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case yd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Te=re}},setLocked:function(re){F=re},setClear:function(re){oe!==re&&(we&&(re=1-re),r.clearDepth(re),oe=re)},reset:function(){F=!1,ae=null,Te=null,oe=null,we=!1}}}function i(){let F=!1,we=null,ae=null,Te=null,oe=null,re=null,Oe=null,Ne=null,ot=null;return{setTest:function(Ae){F||(Ae?ue(r.STENCIL_TEST):Me(r.STENCIL_TEST))},setMask:function(Ae){we!==Ae&&!F&&(r.stencilMask(Ae),we=Ae)},setFunc:function(Ae,Ve,Le){(ae!==Ae||Te!==Ve||oe!==Le)&&(r.stencilFunc(Ae,Ve,Le),ae=Ae,Te=Ve,oe=Le)},setOp:function(Ae,Ve,Le){(re!==Ae||Oe!==Ve||Ne!==Le)&&(r.stencilOp(Ae,Ve,Le),re=Ae,Oe=Ve,Ne=Le)},setLocked:function(Ae){F=Ae},setClear:function(Ae){ot!==Ae&&(r.clearStencil(Ae),ot=Ae)},reset:function(){F=!1,we=null,ae=null,Te=null,oe=null,re=null,Oe=null,Ne=null,ot=null}}}const o=new t,s=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,S=null,M=null,v=null,E=null,A=null,C=new $e(0,0,0),D=0,w=!1,x=null,P=null,b=null,B=null,X=null;const Y=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const N=r.getParameter(r.VERSION);N.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(N)[1]),q=$>=1):N.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),q=$>=2);let fe=null,U={};const ge=r.getParameter(r.SCISSOR_BOX),ze=r.getParameter(r.VIEWPORT),Ze=new Mt().fromArray(ge),J=new Mt().fromArray(ze);function se(F,we,ae,Te){const oe=new Uint8Array(4),re=r.createTexture();r.bindTexture(F,re),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Oe=0;Oe<ae;Oe++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(we,0,r.RGBA,1,1,Te,0,r.RGBA,r.UNSIGNED_BYTE,oe):r.texImage2D(we+Oe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,oe);return re}const Re={};Re[r.TEXTURE_2D]=se(r.TEXTURE_2D,r.TEXTURE_2D,1),Re[r.TEXTURE_CUBE_MAP]=se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[r.TEXTURE_2D_ARRAY]=se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Re[r.TEXTURE_3D]=se(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ue(r.DEPTH_TEST),s.setFunc(Os),Je(!1),j(qh),ue(r.CULL_FACE),k(Xr);function ue(F){u[F]!==!0&&(r.enable(F),u[F]=!0)}function Me(F){u[F]!==!1&&(r.disable(F),u[F]=!1)}function Ye(F,we){return d[F]!==we?(r.bindFramebuffer(F,we),d[F]=we,F===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=we),F===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=we),!0):!1}function Pe(F,we){let ae=h,Te=!1;if(F){ae=f.get(we),ae===void 0&&(ae=[],f.set(we,ae));const oe=F.textures;if(ae.length!==oe.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let re=0,Oe=oe.length;re<Oe;re++)ae[re]=r.COLOR_ATTACHMENT0+re;ae.length=oe.length,Te=!0}}else ae[0]!==r.BACK&&(ae[0]=r.BACK,Te=!0);Te&&r.drawBuffers(ae)}function rt(F){return _!==F?(r.useProgram(F),_=F,!0):!1}const je={[wo]:r.FUNC_ADD,[Dv]:r.FUNC_SUBTRACT,[Iv]:r.FUNC_REVERSE_SUBTRACT};je[Ov]=r.MIN,je[Nv]=r.MAX;const Ue={[Uv]:r.ZERO,[Fv]:r.ONE,[kv]:r.SRC_COLOR,[dd]:r.SRC_ALPHA,[Wv]:r.SRC_ALPHA_SATURATE,[Vv]:r.DST_COLOR,[zv]:r.DST_ALPHA,[Bv]:r.ONE_MINUS_SRC_COLOR,[fd]:r.ONE_MINUS_SRC_ALPHA,[Gv]:r.ONE_MINUS_DST_COLOR,[Hv]:r.ONE_MINUS_DST_ALPHA,[Xv]:r.CONSTANT_COLOR,[qv]:r.ONE_MINUS_CONSTANT_COLOR,[Yv]:r.CONSTANT_ALPHA,[jv]:r.ONE_MINUS_CONSTANT_ALPHA};function k(F,we,ae,Te,oe,re,Oe,Ne,ot,Ae){if(F===Xr){g===!0&&(Me(r.BLEND),g=!1);return}if(g===!1&&(ue(r.BLEND),g=!0),F!==Lv){if(F!==m||Ae!==w){if((p!==wo||v!==wo)&&(r.blendEquation(r.FUNC_ADD),p=wo,v=wo),Ae)switch(F){case qr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.ONE,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case qr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,M=null,E=null,A=null,C.set(0,0,0),D=0,m=F,w=Ae}return}oe=oe||we,re=re||ae,Oe=Oe||Te,(we!==p||oe!==v)&&(r.blendEquationSeparate(je[we],je[oe]),p=we,v=oe),(ae!==S||Te!==M||re!==E||Oe!==A)&&(r.blendFuncSeparate(Ue[ae],Ue[Te],Ue[re],Ue[Oe]),S=ae,M=Te,E=re,A=Oe),(Ne.equals(C)===!1||ot!==D)&&(r.blendColor(Ne.r,Ne.g,Ne.b,ot),C.copy(Ne),D=ot),m=F,w=!1}function xt(F,we){F.side===vi?Me(r.CULL_FACE):ue(r.CULL_FACE);let ae=F.side===qn;we&&(ae=!ae),Je(ae),F.blending===qr&&F.transparent===!1?k(Xr):k(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),s.setFunc(F.depthFunc),s.setTest(F.depthTest),s.setMask(F.depthWrite),o.setMask(F.colorWrite);const Te=F.stencilWrite;a.setTest(Te),Te&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),nt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ue(r.SAMPLE_ALPHA_TO_COVERAGE):Me(r.SAMPLE_ALPHA_TO_COVERAGE)}function Je(F){x!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),x=F)}function j(F){F!==Cv?(ue(r.CULL_FACE),F!==P&&(F===qh?r.cullFace(r.BACK):F===Rv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Me(r.CULL_FACE),P=F}function be(F){F!==b&&(q&&r.lineWidth(F),b=F)}function nt(F,we,ae){F?(ue(r.POLYGON_OFFSET_FILL),(B!==we||X!==ae)&&(r.polygonOffset(we,ae),B=we,X=ae)):Me(r.POLYGON_OFFSET_FILL)}function Fe(F){F?ue(r.SCISSOR_TEST):Me(r.SCISSOR_TEST)}function He(F){F===void 0&&(F=r.TEXTURE0+Y-1),fe!==F&&(r.activeTexture(F),fe=F)}function wt(F,we,ae){ae===void 0&&(fe===null?ae=r.TEXTURE0+Y-1:ae=fe);let Te=U[ae];Te===void 0&&(Te={type:void 0,texture:void 0},U[ae]=Te),(Te.type!==F||Te.texture!==we)&&(fe!==ae&&(r.activeTexture(ae),fe=ae),r.bindTexture(F,we||Re[F]),Te.type=F,Te.texture=we)}function I(){const F=U[fe];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function T(){try{r.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function H(){try{r.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{r.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ne(){try{r.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function te(){try{r.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{r.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{r.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ie(){try{r.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(){try{r.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{r.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ee(F){Ze.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),Ze.copy(F))}function ye(F){J.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),J.copy(F))}function We(F,we){let ae=c.get(we);ae===void 0&&(ae=new WeakMap,c.set(we,ae));let Te=ae.get(F);Te===void 0&&(Te=r.getUniformBlockIndex(we,F.name),ae.set(F,Te))}function pe(F,we){const Te=c.get(we).get(F);l.get(we)!==Te&&(r.uniformBlockBinding(we,Te,F.__bindingPointIndex),l.set(we,Te))}function Ke(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},fe=null,U={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,S=null,M=null,v=null,E=null,A=null,C=new $e(0,0,0),D=0,w=!1,x=null,P=null,b=null,B=null,X=null,Ze.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:ue,disable:Me,bindFramebuffer:Ye,drawBuffers:Pe,useProgram:rt,setBlending:k,setMaterial:xt,setFlipSided:Je,setCullFace:j,setLineWidth:be,setPolygonOffset:nt,setScissorTest:Fe,activeTexture:He,bindTexture:wt,unbindTexture:I,compressedTexImage2D:T,compressedTexImage3D:H,texImage2D:he,texImage3D:de,updateUBOMapping:We,uniformBlockBinding:pe,texStorage2D:me,texStorage3D:Ie,texSubImage2D:ee,texSubImage3D:ne,compressedTexSubImage2D:te,compressedTexSubImage3D:ie,scissor:Ee,viewport:ye,reset:Ke}}function ME(r,e,t,n,i,o,s){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,T){return h?new OffscreenCanvas(I,T):il("canvas")}function g(I,T,H){let ee=1;const ne=wt(I);if((ne.width>H||ne.height>H)&&(ee=H/Math.max(ne.width,ne.height)),ee<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const te=Math.floor(ee*ne.width),ie=Math.floor(ee*ne.height);d===void 0&&(d=_(te,ie));const me=T?_(te,ie):d;return me.width=te,me.height=ie,me.getContext("2d").drawImage(I,0,0,te,ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+te+"x"+ie+")."),me}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(I,T,H,ee,ne=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let te=T;if(T===r.RED&&(H===r.FLOAT&&(te=r.R32F),H===r.HALF_FLOAT&&(te=r.R16F),H===r.UNSIGNED_BYTE&&(te=r.R8)),T===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(te=r.R8UI),H===r.UNSIGNED_SHORT&&(te=r.R16UI),H===r.UNSIGNED_INT&&(te=r.R32UI),H===r.BYTE&&(te=r.R8I),H===r.SHORT&&(te=r.R16I),H===r.INT&&(te=r.R32I)),T===r.RG&&(H===r.FLOAT&&(te=r.RG32F),H===r.HALF_FLOAT&&(te=r.RG16F),H===r.UNSIGNED_BYTE&&(te=r.RG8)),T===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(te=r.RG8UI),H===r.UNSIGNED_SHORT&&(te=r.RG16UI),H===r.UNSIGNED_INT&&(te=r.RG32UI),H===r.BYTE&&(te=r.RG8I),H===r.SHORT&&(te=r.RG16I),H===r.INT&&(te=r.RG32I)),T===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(te=r.RGB8UI),H===r.UNSIGNED_SHORT&&(te=r.RGB16UI),H===r.UNSIGNED_INT&&(te=r.RGB32UI),H===r.BYTE&&(te=r.RGB8I),H===r.SHORT&&(te=r.RGB16I),H===r.INT&&(te=r.RGB32I)),T===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(te=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(te=r.RGBA16UI),H===r.UNSIGNED_INT&&(te=r.RGBA32UI),H===r.BYTE&&(te=r.RGBA8I),H===r.SHORT&&(te=r.RGBA16I),H===r.INT&&(te=r.RGBA32I)),T===r.RGB&&H===r.UNSIGNED_INT_5_9_9_9_REV&&(te=r.RGB9_E5),T===r.RGBA){const ie=ne?Rc:yt.getTransfer(ee);H===r.FLOAT&&(te=r.RGBA32F),H===r.HALF_FLOAT&&(te=r.RGBA16F),H===r.UNSIGNED_BYTE&&(te=ie===Ot?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(te=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(te=r.RGB5_A1)}return(te===r.R16F||te===r.R32F||te===r.RG16F||te===r.RG32F||te===r.RGBA16F||te===r.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function v(I,T){let H;return I?T===null||T===Fo||T===Ja?H=r.DEPTH24_STENCIL8:T===Oi?H=r.DEPTH32F_STENCIL8:T===Za&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Fo||T===Ja?H=r.DEPTH_COMPONENT24:T===Oi?H=r.DEPTH_COMPONENT32F:T===Za&&(H=r.DEPTH_COMPONENT16),H}function E(I,T){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vn&&I.minFilter!==li?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function A(I){const T=I.target;T.removeEventListener("dispose",A),D(T),T.isVideoTexture&&u.delete(T)}function C(I){const T=I.target;T.removeEventListener("dispose",C),x(T)}function D(I){const T=n.get(I);if(T.__webglInit===void 0)return;const H=I.source,ee=f.get(H);if(ee){const ne=ee[T.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&w(I),Object.keys(ee).length===0&&f.delete(H)}n.remove(I)}function w(I){const T=n.get(I);r.deleteTexture(T.__webglTexture);const H=I.source,ee=f.get(H);delete ee[T.__cacheKey],s.memory.textures--}function x(I){const T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(T.__webglFramebuffer[ee]))for(let ne=0;ne<T.__webglFramebuffer[ee].length;ne++)r.deleteFramebuffer(T.__webglFramebuffer[ee][ne]);else r.deleteFramebuffer(T.__webglFramebuffer[ee]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ee])}else{if(Array.isArray(T.__webglFramebuffer))for(let ee=0;ee<T.__webglFramebuffer.length;ee++)r.deleteFramebuffer(T.__webglFramebuffer[ee]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ee=0;ee<T.__webglColorRenderbuffer.length;ee++)T.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ee]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=I.textures;for(let ee=0,ne=H.length;ee<ne;ee++){const te=n.get(H[ee]);te.__webglTexture&&(r.deleteTexture(te.__webglTexture),s.memory.textures--),n.remove(H[ee])}n.remove(I)}let P=0;function b(){P=0}function B(){const I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function X(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function Y(I,T){const H=n.get(I);if(I.isVideoTexture&&Fe(I),I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){const ee=I.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(H,I,T);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+T)}function q(I,T){const H=n.get(I);if(I.version>0&&H.__version!==I.version){Re(H,I,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+T)}function $(I,T){const H=n.get(I);if(I.version>0&&H.__version!==I.version){Re(H,I,T);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+T)}function N(I,T){const H=n.get(I);if(I.version>0&&H.__version!==I.version){ue(H,I,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+T)}const fe={[Fs]:r.REPEAT,[Fr]:r.CLAMP_TO_EDGE,[Cc]:r.MIRRORED_REPEAT},U={[Vn]:r.NEAREST,[Ug]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[li]:r.LINEAR,[dc]:r.LINEAR_MIPMAP_NEAREST,[mr]:r.LINEAR_MIPMAP_LINEAR},ge={[uy]:r.NEVER,[gy]:r.ALWAYS,[dy]:r.LESS,[qg]:r.LEQUAL,[fy]:r.EQUAL,[my]:r.GEQUAL,[hy]:r.GREATER,[py]:r.NOTEQUAL};function ze(I,T){if(T.type===Oi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===li||T.magFilter===dc||T.magFilter===ya||T.magFilter===mr||T.minFilter===li||T.minFilter===dc||T.minFilter===ya||T.minFilter===mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,fe[T.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,fe[T.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,fe[T.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,U[T.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,U[T.minFilter]),T.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,ge[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Vn||T.minFilter!==ya&&T.minFilter!==mr||T.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ze(I,T){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",A));const ee=T.source;let ne=f.get(ee);ne===void 0&&(ne={},f.set(ee,ne));const te=X(T);if(te!==I.__cacheKey){ne[te]===void 0&&(ne[te]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,H=!0),ne[te].usedTimes++;const ie=ne[I.__cacheKey];ie!==void 0&&(ne[I.__cacheKey].usedTimes--,ie.usedTimes===0&&w(T)),I.__cacheKey=te,I.__webglTexture=ne[te].texture}return H}function J(I,T,H){return Math.floor(Math.floor(I/H)/T)}function se(I,T,H,ee){const te=I.updateRanges;if(te.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,H,ee,T.data);else{te.sort((de,Ee)=>de.start-Ee.start);let ie=0;for(let de=1;de<te.length;de++){const Ee=te[ie],ye=te[de],We=Ee.start+Ee.count,pe=J(ye.start,T.width,4),Ke=J(Ee.start,T.width,4);ye.start<=We+1&&pe===Ke&&J(ye.start+ye.count-1,T.width,4)===pe?Ee.count=Math.max(Ee.count,ye.start+ye.count-Ee.start):(++ie,te[ie]=ye)}te.length=ie+1;const me=r.getParameter(r.UNPACK_ROW_LENGTH),Ie=r.getParameter(r.UNPACK_SKIP_PIXELS),he=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let de=0,Ee=te.length;de<Ee;de++){const ye=te[de],We=Math.floor(ye.start/4),pe=Math.ceil(ye.count/4),Ke=We%T.width,F=Math.floor(We/T.width),we=pe,ae=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ke),r.pixelStorei(r.UNPACK_SKIP_ROWS,F),t.texSubImage2D(r.TEXTURE_2D,0,Ke,F,we,ae,H,ee,T.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,me),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ie),r.pixelStorei(r.UNPACK_SKIP_ROWS,he)}}function Re(I,T,H){let ee=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ee=r.TEXTURE_3D);const ne=Ze(I,T),te=T.source;t.bindTexture(ee,I.__webglTexture,r.TEXTURE0+H);const ie=n.get(te);if(te.version!==ie.__version||ne===!0){t.activeTexture(r.TEXTURE0+H);const me=yt.getPrimaries(yt.workingColorSpace),Ie=T.colorSpace===Ur?null:yt.getPrimaries(T.colorSpace),he=T.colorSpace===Ur||me===Ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let de=g(T.image,!1,i.maxTextureSize);de=He(T,de);const Ee=o.convert(T.format,T.colorSpace),ye=o.convert(T.type);let We=M(T.internalFormat,Ee,ye,T.colorSpace,T.isVideoTexture);ze(ee,T);let pe;const Ke=T.mipmaps,F=T.isVideoTexture!==!0,we=ie.__version===void 0||ne===!0,ae=te.dataReady,Te=E(T,de);if(T.isDepthTexture)We=v(T.format===el,T.type),we&&(F?t.texStorage2D(r.TEXTURE_2D,1,We,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,We,de.width,de.height,0,Ee,ye,null));else if(T.isDataTexture)if(Ke.length>0){F&&we&&t.texStorage2D(r.TEXTURE_2D,Te,We,Ke[0].width,Ke[0].height);for(let oe=0,re=Ke.length;oe<re;oe++)pe=Ke[oe],F?ae&&t.texSubImage2D(r.TEXTURE_2D,oe,0,0,pe.width,pe.height,Ee,ye,pe.data):t.texImage2D(r.TEXTURE_2D,oe,We,pe.width,pe.height,0,Ee,ye,pe.data);T.generateMipmaps=!1}else F?(we&&t.texStorage2D(r.TEXTURE_2D,Te,We,de.width,de.height),ae&&se(T,de,Ee,ye)):t.texImage2D(r.TEXTURE_2D,0,We,de.width,de.height,0,Ee,ye,de.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){F&&we&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,We,Ke[0].width,Ke[0].height,de.depth);for(let oe=0,re=Ke.length;oe<re;oe++)if(pe=Ke[oe],T.format!==yi)if(Ee!==null)if(F){if(ae)if(T.layerUpdates.size>0){const Oe=kp(pe.width,pe.height,T.format,T.type);for(const Ne of T.layerUpdates){const ot=pe.data.subarray(Ne*Oe/pe.data.BYTES_PER_ELEMENT,(Ne+1)*Oe/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,oe,0,0,Ne,pe.width,pe.height,1,Ee,ot)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,oe,0,0,0,pe.width,pe.height,de.depth,Ee,pe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,oe,We,pe.width,pe.height,de.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ae&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,oe,0,0,0,pe.width,pe.height,de.depth,Ee,ye,pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,oe,We,pe.width,pe.height,de.depth,0,Ee,ye,pe.data)}else{F&&we&&t.texStorage2D(r.TEXTURE_2D,Te,We,Ke[0].width,Ke[0].height);for(let oe=0,re=Ke.length;oe<re;oe++)pe=Ke[oe],T.format!==yi?Ee!==null?F?ae&&t.compressedTexSubImage2D(r.TEXTURE_2D,oe,0,0,pe.width,pe.height,Ee,pe.data):t.compressedTexImage2D(r.TEXTURE_2D,oe,We,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ae&&t.texSubImage2D(r.TEXTURE_2D,oe,0,0,pe.width,pe.height,Ee,ye,pe.data):t.texImage2D(r.TEXTURE_2D,oe,We,pe.width,pe.height,0,Ee,ye,pe.data)}else if(T.isDataArrayTexture)if(F){if(we&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,We,de.width,de.height,de.depth),ae)if(T.layerUpdates.size>0){const oe=kp(de.width,de.height,T.format,T.type);for(const re of T.layerUpdates){const Oe=de.data.subarray(re*oe/de.data.BYTES_PER_ELEMENT,(re+1)*oe/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,re,de.width,de.height,1,Ee,ye,Oe)}T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Ee,ye,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,We,de.width,de.height,de.depth,0,Ee,ye,de.data);else if(T.isData3DTexture)F?(we&&t.texStorage3D(r.TEXTURE_3D,Te,We,de.width,de.height,de.depth),ae&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Ee,ye,de.data)):t.texImage3D(r.TEXTURE_3D,0,We,de.width,de.height,de.depth,0,Ee,ye,de.data);else if(T.isFramebufferTexture){if(we)if(F)t.texStorage2D(r.TEXTURE_2D,Te,We,de.width,de.height);else{let oe=de.width,re=de.height;for(let Oe=0;Oe<Te;Oe++)t.texImage2D(r.TEXTURE_2D,Oe,We,oe,re,0,Ee,ye,null),oe>>=1,re>>=1}}else if(Ke.length>0){if(F&&we){const oe=wt(Ke[0]);t.texStorage2D(r.TEXTURE_2D,Te,We,oe.width,oe.height)}for(let oe=0,re=Ke.length;oe<re;oe++)pe=Ke[oe],F?ae&&t.texSubImage2D(r.TEXTURE_2D,oe,0,0,Ee,ye,pe):t.texImage2D(r.TEXTURE_2D,oe,We,Ee,ye,pe);T.generateMipmaps=!1}else if(F){if(we){const oe=wt(de);t.texStorage2D(r.TEXTURE_2D,Te,We,oe.width,oe.height)}ae&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,ye,de)}else t.texImage2D(r.TEXTURE_2D,0,We,Ee,ye,de);m(T)&&p(ee),ie.__version=te.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function ue(I,T,H){if(T.image.length!==6)return;const ee=Ze(I,T),ne=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+H);const te=n.get(ne);if(ne.version!==te.__version||ee===!0){t.activeTexture(r.TEXTURE0+H);const ie=yt.getPrimaries(yt.workingColorSpace),me=T.colorSpace===Ur?null:yt.getPrimaries(T.colorSpace),Ie=T.colorSpace===Ur||ie===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const he=T.isCompressedTexture||T.image[0].isCompressedTexture,de=T.image[0]&&T.image[0].isDataTexture,Ee=[];for(let re=0;re<6;re++)!he&&!de?Ee[re]=g(T.image[re],!0,i.maxCubemapSize):Ee[re]=de?T.image[re].image:T.image[re],Ee[re]=He(T,Ee[re]);const ye=Ee[0],We=o.convert(T.format,T.colorSpace),pe=o.convert(T.type),Ke=M(T.internalFormat,We,pe,T.colorSpace),F=T.isVideoTexture!==!0,we=te.__version===void 0||ee===!0,ae=ne.dataReady;let Te=E(T,ye);ze(r.TEXTURE_CUBE_MAP,T);let oe;if(he){F&&we&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Te,Ke,ye.width,ye.height);for(let re=0;re<6;re++){oe=Ee[re].mipmaps;for(let Oe=0;Oe<oe.length;Oe++){const Ne=oe[Oe];T.format!==yi?We!==null?F?ae&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,Ne.width,Ne.height,We,Ne.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,Ke,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,Ne.width,Ne.height,We,pe,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,Ke,Ne.width,Ne.height,0,We,pe,Ne.data)}}}else{if(oe=T.mipmaps,F&&we){oe.length>0&&Te++;const re=wt(Ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Te,Ke,re.width,re.height)}for(let re=0;re<6;re++)if(de){F?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ee[re].width,Ee[re].height,We,pe,Ee[re].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,Ee[re].width,Ee[re].height,0,We,pe,Ee[re].data);for(let Oe=0;Oe<oe.length;Oe++){const ot=oe[Oe].image[re].image;F?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,ot.width,ot.height,We,pe,ot.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,Ke,ot.width,ot.height,0,We,pe,ot.data)}}else{F?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,We,pe,Ee[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,We,pe,Ee[re]);for(let Oe=0;Oe<oe.length;Oe++){const Ne=oe[Oe];F?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,We,pe,Ne.image[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,Ke,We,pe,Ne.image[re])}}}m(T)&&p(r.TEXTURE_CUBE_MAP),te.__version=ne.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Me(I,T,H,ee,ne,te){const ie=o.convert(H.format,H.colorSpace),me=o.convert(H.type),Ie=M(H.internalFormat,ie,me,H.colorSpace),he=n.get(T),de=n.get(H);if(de.__renderTarget=T,!he.__hasExternalTextures){const Ee=Math.max(1,T.width>>te),ye=Math.max(1,T.height>>te);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,te,Ie,Ee,ye,T.depth,0,ie,me,null):t.texImage2D(ne,te,Ie,Ee,ye,0,ie,me,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),nt(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,ne,de.__webglTexture,0,be(T)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,ne,de.__webglTexture,te),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ye(I,T,H){if(r.bindRenderbuffer(r.RENDERBUFFER,I),T.depthBuffer){const ee=T.depthTexture,ne=ee&&ee.isDepthTexture?ee.type:null,te=v(T.stencilBuffer,ne),ie=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=be(T);nt(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,te,T.width,T.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,te,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,te,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,I)}else{const ee=T.textures;for(let ne=0;ne<ee.length;ne++){const te=ee[ne],ie=o.convert(te.format,te.colorSpace),me=o.convert(te.type),Ie=M(te.internalFormat,ie,me,te.colorSpace),he=be(T);H&&nt(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,he,Ie,T.width,T.height):nt(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,he,Ie,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ie,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(T.depthTexture);ee.__renderTarget=T,(!ee.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Y(T.depthTexture,0);const ne=ee.__webglTexture,te=be(T);if(T.depthTexture.format===Qa)nt(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(T.depthTexture.format===el)nt(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function rt(I){const T=n.get(I),H=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const ee=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ee){const ne=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ee.removeEventListener("dispose",ne)};ee.addEventListener("dispose",ne),T.__depthDisposeCallback=ne}T.__boundDepthTexture=ee}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const ee=I.texture.mipmaps;ee&&ee.length>0?Pe(T.__webglFramebuffer[0],I):Pe(T.__webglFramebuffer,I)}else if(H){T.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ee]),T.__webglDepthbuffer[ee]===void 0)T.__webglDepthbuffer[ee]=r.createRenderbuffer(),Ye(T.__webglDepthbuffer[ee],I,!1);else{const ne=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,te)}}else{const ee=I.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),Ye(T.__webglDepthbuffer,I,!1);else{const ne=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,te)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function je(I,T,H){const ee=n.get(I);T!==void 0&&Me(ee.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&rt(I)}function Ue(I){const T=I.texture,H=n.get(I),ee=n.get(T);I.addEventListener("dispose",C);const ne=I.textures,te=I.isWebGLCubeRenderTarget===!0,ie=ne.length>1;if(ie||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=T.version,s.memory.textures++),te){H.__webglFramebuffer=[];for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[me]=[];for(let Ie=0;Ie<T.mipmaps.length;Ie++)H.__webglFramebuffer[me][Ie]=r.createFramebuffer()}else H.__webglFramebuffer[me]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let me=0;me<T.mipmaps.length;me++)H.__webglFramebuffer[me]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(ie)for(let me=0,Ie=ne.length;me<Ie;me++){const he=n.get(ne[me]);he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture(),s.memory.textures++)}if(I.samples>0&&nt(I)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let me=0;me<ne.length;me++){const Ie=ne[me];H.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[me]);const he=o.convert(Ie.format,Ie.colorSpace),de=o.convert(Ie.type),Ee=M(Ie.internalFormat,he,de,Ie.colorSpace,I.isXRRenderTarget===!0),ye=be(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,Ee,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,H.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Ye(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(te){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),ze(r.TEXTURE_CUBE_MAP,T);for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ie=0;Ie<T.mipmaps.length;Ie++)Me(H.__webglFramebuffer[me][Ie],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie);else Me(H.__webglFramebuffer[me],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(T)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){for(let me=0,Ie=ne.length;me<Ie;me++){const he=ne[me],de=n.get(he);t.bindTexture(r.TEXTURE_2D,de.__webglTexture),ze(r.TEXTURE_2D,he),Me(H.__webglFramebuffer,I,he,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,0),m(he)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let me=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(me=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,ee.__webglTexture),ze(me,T),T.mipmaps&&T.mipmaps.length>0)for(let Ie=0;Ie<T.mipmaps.length;Ie++)Me(H.__webglFramebuffer[Ie],I,T,r.COLOR_ATTACHMENT0,me,Ie);else Me(H.__webglFramebuffer,I,T,r.COLOR_ATTACHMENT0,me,0);m(T)&&p(me),t.unbindTexture()}I.depthBuffer&&rt(I)}function k(I){const T=I.textures;for(let H=0,ee=T.length;H<ee;H++){const ne=T[H];if(m(ne)){const te=S(I),ie=n.get(ne).__webglTexture;t.bindTexture(te,ie),p(te),t.unbindTexture()}}}const xt=[],Je=[];function j(I){if(I.samples>0){if(nt(I)===!1){const T=I.textures,H=I.width,ee=I.height;let ne=r.COLOR_BUFFER_BIT;const te=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=n.get(I),me=T.length>1;if(me)for(let he=0;he<T.length;he++)t.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ie.__webglMultisampledFramebuffer);const Ie=I.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ie.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ie.__webglFramebuffer);for(let he=0;he<T.length;he++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ie.__webglColorRenderbuffer[he]);const de=n.get(T[he]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,de,0)}r.blitFramebuffer(0,0,H,ee,0,0,H,ee,ne,r.NEAREST),l===!0&&(xt.length=0,Je.length=0,xt.push(r.COLOR_ATTACHMENT0+he),I.depthBuffer&&I.resolveDepthBuffer===!1&&(xt.push(te),Je.push(te),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Je)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let he=0;he<T.length;he++){t.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,ie.__webglColorRenderbuffer[he]);const de=n.get(T[he]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,de,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ie.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const T=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function be(I){return Math.min(i.maxSamples,I.samples)}function nt(I){const T=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Fe(I){const T=s.render.frame;u.get(I)!==T&&(u.set(I,T),I.update())}function He(I,T){const H=I.colorSpace,ee=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==Gn&&H!==Ur&&(yt.getTransfer(H)===Ot?(ee!==yi||ne!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),T}function wt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=b,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=N,this.rebindTextures=je,this.setupRenderTarget=Ue,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=nt}function EE(r,e){function t(n,i=Ur){let o;const s=yt.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===Gf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Wf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Fg)return r.BYTE;if(n===kg)return r.SHORT;if(n===Za)return r.UNSIGNED_SHORT;if(n===Vf)return r.INT;if(n===Fo)return r.UNSIGNED_INT;if(n===Oi)return r.FLOAT;if(n===ml)return r.HALF_FLOAT;if(n===zg)return r.ALPHA;if(n===Hg)return r.RGB;if(n===yi)return r.RGBA;if(n===Qa)return r.DEPTH_COMPONENT;if(n===el)return r.DEPTH_STENCIL;if(n===Xf)return r.RED;if(n===qf)return r.RED_INTEGER;if(n===Vg)return r.RG;if(n===Yf)return r.RG_INTEGER;if(n===jf)return r.RGBA_INTEGER;if(n===fc||n===hc||n===pc||n===mc)if(s===Ot)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===fc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===fc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wd||n===bd||n===Md||n===Ed)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===wd)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bd)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Md)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ed)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Td||n===Ad||n===Cd)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Td||n===Ad)return s===Ot?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Cd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rd||n===Pd||n===Ld||n===Dd||n===Id||n===Od||n===Nd||n===Ud||n===Fd||n===kd||n===Bd||n===zd||n===Hd||n===Vd)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Rd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ld)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Id)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Od)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ud)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vd)return s===Ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gc||n===Gd||n===Wd)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===gc)return s===Ot?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gd)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wd)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gg||n===Xd||n===qd||n===Yd)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===gc)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Xd)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qd)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yd)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ja?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const TE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,AE=`
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

}`;class CE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new an,o=e.properties.get(i);o.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xi({vertexShader:TE,fragmentShader:AE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Hn(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RE extends Ks{constructor(e,t){super();const n=this;let i=null,o=1,s=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new CE,m=t.getContextAttributes();let p=null,S=null;const M=[],v=[],E=new gt;let A=null;const C=new Xn;C.viewport=new Mt;const D=new Xn;D.viewport=new Mt;const w=[C,D],x=new Hx;let P=null,b=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let se=M[J];return se===void 0&&(se=new Ru,M[J]=se),se.getTargetRaySpace()},this.getControllerGrip=function(J){let se=M[J];return se===void 0&&(se=new Ru,M[J]=se),se.getGripSpace()},this.getHand=function(J){let se=M[J];return se===void 0&&(se=new Ru,M[J]=se),se.getHandSpace()};function B(J){const se=v.indexOf(J.inputSource);if(se===-1)return;const Re=M[se];Re!==void 0&&(Re.update(J.inputSource,J.frame,c||s),Re.dispatchEvent({type:J.type,data:J.inputSource}))}function X(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Y);for(let J=0;J<M.length;J++){const se=v[J];se!==null&&(v[J]=null,M[J].disconnect(se))}P=null,b=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,S=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(E),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,ue=null,Me=null;m.depth&&(Me=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=m.stencil?el:Qa,ue=m.stencil?Ja:Fo);const Ye={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:o};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Ye),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new ko(f.textureWidth,f.textureHeight,{format:yi,type:Ji,depthTexture:new s_(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Re={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(i,t,Re),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new ko(h.framebufferWidth,h.framebufferHeight,{format:yi,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(a),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(J){for(let se=0;se<J.removed.length;se++){const Re=J.removed[se],ue=v.indexOf(Re);ue>=0&&(v[ue]=null,M[ue].disconnect(Re))}for(let se=0;se<J.added.length;se++){const Re=J.added[se];let ue=v.indexOf(Re);if(ue===-1){for(let Ye=0;Ye<M.length;Ye++)if(Ye>=v.length){v.push(Re),ue=Ye;break}else if(v[Ye]===null){v[Ye]=Re,ue=Ye;break}if(ue===-1)break}const Me=M[ue];Me&&Me.connect(Re)}}const q=new W,$=new W;function N(J,se,Re){q.setFromMatrixPosition(se.matrixWorld),$.setFromMatrixPosition(Re.matrixWorld);const ue=q.distanceTo($),Me=se.projectionMatrix.elements,Ye=Re.projectionMatrix.elements,Pe=Me[14]/(Me[10]-1),rt=Me[14]/(Me[10]+1),je=(Me[9]+1)/Me[5],Ue=(Me[9]-1)/Me[5],k=(Me[8]-1)/Me[0],xt=(Ye[8]+1)/Ye[0],Je=Pe*k,j=Pe*xt,be=ue/(-k+xt),nt=be*-k;if(se.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(nt),J.translateZ(be),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Me[10]===-1)J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Fe=Pe+be,He=rt+be,wt=Je-nt,I=j+(ue-nt),T=je*rt/He*Fe,H=Ue*rt/He*Fe;J.projectionMatrix.makePerspective(wt,I,T,H,Fe,He),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function fe(J,se){se===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(se.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let se=J.near,Re=J.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(Re=g.depthFar)),x.near=D.near=C.near=se,x.far=D.far=C.far=Re,(P!==x.near||b!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,b=x.far),C.layers.mask=J.layers.mask|2,D.layers.mask=J.layers.mask|4,x.layers.mask=C.layers.mask|D.layers.mask;const ue=J.parent,Me=x.cameras;fe(x,ue);for(let Ye=0;Ye<Me.length;Ye++)fe(Me[Ye],ue);Me.length===2?N(x,C,D):x.projectionMatrix.copy(C.projectionMatrix),U(J,x,ue)};function U(J,se,Re){Re===null?J.matrix.copy(se.matrixWorld):(J.matrix.copy(Re.matrixWorld),J.matrix.invert(),J.matrix.multiply(se.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ks*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let ge=null;function ze(J,se){if(u=se.getViewerPose(c||s),_=se,u!==null){const Re=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let ue=!1;Re.length!==x.cameras.length&&(x.cameras.length=0,ue=!0);for(let Pe=0;Pe<Re.length;Pe++){const rt=Re[Pe];let je=null;if(h!==null)je=h.getViewport(rt);else{const k=d.getViewSubImage(f,rt);je=k.viewport,Pe===0&&(e.setRenderTargetTextures(S,k.colorTexture,k.depthStencilTexture),e.setRenderTarget(S))}let Ue=w[Pe];Ue===void 0&&(Ue=new Xn,Ue.layers.enable(Pe),Ue.viewport=new Mt,w[Pe]=Ue),Ue.matrix.fromArray(rt.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(rt.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(je.x,je.y,je.width,je.height),Pe===0&&(x.matrix.copy(Ue.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ue===!0&&x.cameras.push(Ue)}const Me=i.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Pe=d.getDepthInformation(Re[0]);Pe&&Pe.isValid&&Pe.texture&&g.init(e,Pe,i.renderState)}}for(let Re=0;Re<M.length;Re++){const ue=v[Re],Me=M[Re];ue!==null&&Me!==void 0&&Me.update(ue,se,c||s)}ge&&ge(J,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),_=null}const Ze=new d_;Ze.setAnimationLoop(ze),this.setAnimationLoop=function(J){ge=J},this.dispose=function(){}}}const fo=new Qi,PE=new lt;function LE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(o(m,p),_(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),g(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),M=S.envMap,v=S.envMapRotation;M&&(m.envMap.value=M,fo.copy(v),fo.x*=-1,fo.y*=-1,fo.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(fo.y*=-1,fo.z*=-1),m.envMapRotation.value.setFromMatrix4(PE.makeRotationFromEuler(fo)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function DE(r,e,t,n){let i={},o={},s=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const v=M.program;n.uniformBlockBinding(S,v)}function c(S,M){let v=i[S.id];v===void 0&&(_(S),v=u(S),i[S.id]=v,S.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(S,E);const A=e.render.frame;o[S.id]!==A&&(f(S),o[S.id]=A)}function u(S){const M=d();S.__bindingPointIndex=M;const v=r.createBuffer(),E=S.__size,A=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,v),v}function d(){for(let S=0;S<a;S++)if(s.indexOf(S)===-1)return s.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const M=i[S.id],v=S.uniforms,E=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let A=0,C=v.length;A<C;A++){const D=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,x=D.length;w<x;w++){const P=D[w];if(h(P,A,w,E)===!0){const b=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let Y=0;Y<B.length;Y++){const q=B[Y],$=g(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,b+X,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,X),X+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,b,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(S,M,v,E){const A=S.value,C=M+"_"+v;if(E[C]===void 0)return typeof A=="number"||typeof A=="boolean"?E[C]=A:E[C]=A.clone(),!0;{const D=E[C];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return E[C]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function _(S){const M=S.uniforms;let v=0;const E=16;for(let C=0,D=M.length;C<D;C++){const w=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,P=w.length;x<P;x++){const b=w[x],B=Array.isArray(b.value)?b.value:[b.value];for(let X=0,Y=B.length;X<Y;X++){const q=B[X],$=g(q),N=v%E,fe=N%$.boundary,U=N+fe;v+=fe,U!==0&&E-U<$.storage&&(v+=E-U),b.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=v,v+=$.storage}}}const A=v%E;return A>0&&(v+=E-A),S.__size=v,S.__cache={},this}function g(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){const M=S.target;M.removeEventListener("dispose",m);const v=s.indexOf(M.__bindingPointIndex);s.splice(v,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete o[M.id]}function p(){for(const S in i)r.deleteBuffer(i[S]);s=[],i={},o={}}return{bind:l,update:c,dispose:p}}class IE{constructor(e={}){const{canvas:t=Oy(),context:n=null,depth:i=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=s;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const S=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=yn;let A=0,C=0,D=null,w=-1,x=null;const P=new Mt,b=new Mt;let B=null;const X=new $e(0);let Y=0,q=t.width,$=t.height,N=1,fe=null,U=null;const ge=new Mt(0,0,q,$),ze=new Mt(0,0,q,$);let Ze=!1;const J=new Qf;let se=!1,Re=!1;const ue=new lt,Me=new lt,Ye=new W,Pe=new Mt,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function Ue(){return D===null?N:1}let k=n;function xt(L,z){return t.getContext(L,z)}try{const L={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hf}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",re,!1),k===null){const z="webgl2";if(k=xt(z,L),k===null)throw xt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Je,j,be,nt,Fe,He,wt,I,T,H,ee,ne,te,ie,me,Ie,he,de,Ee,ye,We,pe,Ke,F;function we(){Je=new Gb(k),Je.init(),pe=new EE(k,Je),j=new Ub(k,Je,e,pe),be=new bE(k,Je),j.reverseDepthBuffer&&f&&be.buffers.depth.setReversed(!0),nt=new qb(k),Fe=new uE,He=new ME(k,Je,be,Fe,j,pe,nt),wt=new kb(v),I=new Vb(v),T=new Jx(k),Ke=new Ob(k,T),H=new Wb(k,T,nt,Ke),ee=new jb(k,H,T,nt),Ee=new Yb(k,j,He),Ie=new Fb(Fe),ne=new cE(v,wt,I,Je,j,Ke,Ie),te=new LE(v,Fe),ie=new fE,me=new vE(Je),de=new Ib(v,wt,I,be,ee,h,l),he=new SE(v,ee,j),F=new DE(k,nt,j,be),ye=new Nb(k,Je,nt),We=new Xb(k,Je,nt),nt.programs=ne.programs,v.capabilities=j,v.extensions=Je,v.properties=Fe,v.renderLists=ie,v.shadowMap=he,v.state=be,v.info=nt}we();const ae=new RE(v,k);this.xr=ae,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const L=Je.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Je.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(L){L!==void 0&&(N=L,this.setSize(q,$,!1))},this.getSize=function(L){return L.set(q,$)},this.setSize=function(L,z,K=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=L,$=z,t.width=Math.floor(L*N),t.height=Math.floor(z*N),K===!0&&(t.style.width=L+"px",t.style.height=z+"px"),this.setViewport(0,0,L,z)},this.getDrawingBufferSize=function(L){return L.set(q*N,$*N).floor()},this.setDrawingBufferSize=function(L,z,K){q=L,$=z,N=K,t.width=Math.floor(L*K),t.height=Math.floor(z*K),this.setViewport(0,0,L,z)},this.getCurrentViewport=function(L){return L.copy(P)},this.getViewport=function(L){return L.copy(ge)},this.setViewport=function(L,z,K,y){L.isVector4?ge.set(L.x,L.y,L.z,L.w):ge.set(L,z,K,y),be.viewport(P.copy(ge).multiplyScalar(N).round())},this.getScissor=function(L){return L.copy(ze)},this.setScissor=function(L,z,K,y){L.isVector4?ze.set(L.x,L.y,L.z,L.w):ze.set(L,z,K,y),be.scissor(b.copy(ze).multiplyScalar(N).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(L){be.setScissorTest(Ze=L)},this.setOpaqueSort=function(L){fe=L},this.setTransparentSort=function(L){U=L},this.getClearColor=function(L){return L.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(L=!0,z=!0,K=!0){let y=0;if(L){let R=!1;if(D!==null){const O=D.texture.format;R=O===jf||O===Yf||O===qf}if(R){const O=D.texture.type,V=O===Ji||O===Fo||O===Za||O===Ja||O===Gf||O===Wf,Q=de.getClearColor(),G=de.getClearAlpha(),le=Q.r,_e=Q.g,xe=Q.b;V?(_[0]=le,_[1]=_e,_[2]=xe,_[3]=G,k.clearBufferuiv(k.COLOR,0,_)):(g[0]=le,g[1]=_e,g[2]=xe,g[3]=G,k.clearBufferiv(k.COLOR,0,g))}else y|=k.COLOR_BUFFER_BIT}z&&(y|=k.DEPTH_BUFFER_BIT),K&&(y|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",re,!1),de.dispose(),ie.dispose(),me.dispose(),Fe.dispose(),wt.dispose(),I.dispose(),ee.dispose(),Ke.dispose(),F.dispose(),ne.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",ve),ae.removeEventListener("sessionend",et),Ge.stop()};function Te(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const L=nt.autoReset,z=he.enabled,K=he.autoUpdate,y=he.needsUpdate,R=he.type;we(),nt.autoReset=L,he.enabled=z,he.autoUpdate=K,he.needsUpdate=y,he.type=R}function re(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Oe(L){const z=L.target;z.removeEventListener("dispose",Oe),Ne(z)}function Ne(L){ot(L),Fe.remove(L)}function ot(L){const z=Fe.get(L).programs;z!==void 0&&(z.forEach(function(K){ne.releaseProgram(K)}),L.isShaderMaterial&&ne.releaseShaderCache(L))}this.renderBufferDirect=function(L,z,K,y,R,O){z===null&&(z=rt);const V=R.isMesh&&R.matrixWorld.determinant()<0,Q=un(L,z,K,y,R);be.setMaterial(y,V);let G=K.index,le=1;if(y.wireframe===!0){if(G=H.getWireframeAttribute(K),G===void 0)return;le=2}const _e=K.drawRange,xe=K.attributes.position;let Ce=_e.start*le,vt=(_e.start+_e.count)*le;O!==null&&(Ce=Math.max(Ce,O.start*le),vt=Math.min(vt,(O.start+O.count)*le)),G!==null?(Ce=Math.max(Ce,0),vt=Math.min(vt,G.count)):xe!=null&&(Ce=Math.max(Ce,0),vt=Math.min(vt,xe.count));const Rt=vt-Ce;if(Rt<0||Rt===1/0)return;Ke.setup(R,y,Q,K,G);let Vt,tt=ye;if(G!==null&&(Vt=T.get(G),tt=We,tt.setIndex(Vt)),R.isMesh)y.wireframe===!0?(be.setLineWidth(y.wireframeLinewidth*Ue()),tt.setMode(k.LINES)):tt.setMode(k.TRIANGLES);else if(R.isLine){let Se=y.linewidth;Se===void 0&&(Se=1),be.setLineWidth(Se*Ue()),R.isLineSegments?tt.setMode(k.LINES):R.isLineLoop?tt.setMode(k.LINE_LOOP):tt.setMode(k.LINE_STRIP)}else R.isPoints?tt.setMode(k.POINTS):R.isSprite&&tt.setMode(k.TRIANGLES);if(R.isBatchedMesh)if(R._multiDrawInstances!==null)bs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount,R._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))tt.renderMultiDraw(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount);else{const Se=R._multiDrawStarts,mt=R._multiDrawCounts,it=R._multiDrawCount,Nt=G?T.get(G).bytesPerElement:1,fn=Fe.get(y).currentProgram.getUniforms();for(let rn=0;rn<it;rn++)fn.setValue(k,"_gl_DrawID",rn),tt.render(Se[rn]/Nt,mt[rn])}else if(R.isInstancedMesh)tt.renderInstances(Ce,Rt,R.count);else if(K.isInstancedBufferGeometry){const Se=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,mt=Math.min(K.instanceCount,Se);tt.renderInstances(Ce,Rt,mt)}else tt.render(Ce,Rt)};function Ae(L,z,K){L.transparent===!0&&L.side===vi&&L.forceSinglePass===!1?(L.side=qn,L.needsUpdate=!0,Ct(L,z,K),L.side=br,L.needsUpdate=!0,Ct(L,z,K),L.side=vi):Ct(L,z,K)}this.compile=function(L,z,K=null){K===null&&(K=L),p=me.get(K),p.init(z),M.push(p),K.traverseVisible(function(R){R.isLight&&R.layers.test(z.layers)&&(p.pushLight(R),R.castShadow&&p.pushShadow(R))}),L!==K&&L.traverseVisible(function(R){R.isLight&&R.layers.test(z.layers)&&(p.pushLight(R),R.castShadow&&p.pushShadow(R))}),p.setupLights();const y=new Set;return L.traverse(function(R){if(!(R.isMesh||R.isPoints||R.isLine||R.isSprite))return;const O=R.material;if(O)if(Array.isArray(O))for(let V=0;V<O.length;V++){const Q=O[V];Ae(Q,K,R),y.add(Q)}else Ae(O,K,R),y.add(O)}),p=M.pop(),y},this.compileAsync=function(L,z,K=null){const y=this.compile(L,z,K);return new Promise(R=>{function O(){if(y.forEach(function(V){Fe.get(V).currentProgram.isReady()&&y.delete(V)}),y.size===0){R(L);return}setTimeout(O,10)}Je.get("KHR_parallel_shader_compile")!==null?O():setTimeout(O,10)})};let Ve=null;function Le(L){Ve&&Ve(L)}function ve(){Ge.stop()}function et(){Ge.start()}const Ge=new d_;Ge.setAnimationLoop(Le),typeof self<"u"&&Ge.setContext(self),this.setAnimationLoop=function(L){Ve=L,ae.setAnimationLoop(L),L===null?Ge.stop():Ge.start()},ae.addEventListener("sessionstart",ve),ae.addEventListener("sessionend",et),this.render=function(L,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(z),z=ae.getCamera()),L.isScene===!0&&L.onBeforeRender(v,L,z,D),p=me.get(L,M.length),p.init(z),M.push(p),Me.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),J.setFromProjectionMatrix(Me),Re=this.localClippingEnabled,se=Ie.init(this.clippingPlanes,Re),m=ie.get(L,S.length),m.init(),S.push(m),ae.enabled===!0&&ae.isPresenting===!0){const O=v.xr.getDepthSensingMesh();O!==null&&Qe(O,z,-1/0,v.sortObjects)}Qe(L,z,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(fe,U),je=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,je&&de.addToRenderList(m,L),this.info.render.frame++,se===!0&&Ie.beginShadows();const K=p.state.shadowsArray;he.render(K,L,z),se===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=m.opaque,R=m.transmissive;if(p.setupLights(),z.isArrayCamera){const O=z.cameras;if(R.length>0)for(let V=0,Q=O.length;V<Q;V++){const G=O[V];st(y,R,L,G)}je&&de.render(L);for(let V=0,Q=O.length;V<Q;V++){const G=O[V];Wt(m,L,G,G.viewport)}}else R.length>0&&st(y,R,L,z),je&&de.render(L),Wt(m,L,z);D!==null&&C===0&&(He.updateMultisampleRenderTarget(D),He.updateRenderTargetMipmap(D)),L.isScene===!0&&L.onAfterRender(v,L,z),Ke.resetDefaultState(),w=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],se===!0&&Ie.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Qe(L,z,K,y){if(L.visible===!1)return;if(L.layers.test(z.layers)){if(L.isGroup)K=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(z);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||J.intersectsSprite(L)){y&&Pe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Me);const V=ee.update(L),Q=L.material;Q.visible&&m.push(L,V,Q,K,Pe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||J.intersectsObject(L))){const V=ee.update(L),Q=L.material;if(y&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Pe.copy(L.boundingSphere.center)):(V.boundingSphere===null&&V.computeBoundingSphere(),Pe.copy(V.boundingSphere.center)),Pe.applyMatrix4(L.matrixWorld).applyMatrix4(Me)),Array.isArray(Q)){const G=V.groups;for(let le=0,_e=G.length;le<_e;le++){const xe=G[le],Ce=Q[xe.materialIndex];Ce&&Ce.visible&&m.push(L,V,Ce,K,Pe.z,xe)}}else Q.visible&&m.push(L,V,Q,K,Pe.z,null)}}const O=L.children;for(let V=0,Q=O.length;V<Q;V++)Qe(O[V],z,K,y)}function Wt(L,z,K,y){const R=L.opaque,O=L.transmissive,V=L.transparent;p.setupLightsView(K),se===!0&&Ie.setGlobalState(v.clippingPlanes,K),y&&be.viewport(P.copy(y)),R.length>0&&It(R,z,K),O.length>0&&It(O,z,K),V.length>0&&It(V,z,K),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function st(L,z,K,y){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[y.id]===void 0&&(p.state.transmissionRenderTarget[y.id]=new ko(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?ml:Ji,minFilter:mr,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:yt.workingColorSpace}));const O=p.state.transmissionRenderTarget[y.id],V=y.viewport||P;O.setSize(V.z*v.transmissionResolutionScale,V.w*v.transmissionResolutionScale);const Q=v.getRenderTarget();v.setRenderTarget(O),v.getClearColor(X),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),je&&de.render(K);const G=v.toneMapping;v.toneMapping=Yr;const le=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),p.setupLightsView(y),se===!0&&Ie.setGlobalState(v.clippingPlanes,y),It(L,K,y),He.updateMultisampleRenderTarget(O),He.updateRenderTargetMipmap(O),Je.has("WEBGL_multisampled_render_to_texture")===!1){let _e=!1;for(let xe=0,Ce=z.length;xe<Ce;xe++){const vt=z[xe],Rt=vt.object,Vt=vt.geometry,tt=vt.material,Se=vt.group;if(tt.side===vi&&Rt.layers.test(y.layers)){const mt=tt.side;tt.side=qn,tt.needsUpdate=!0,bt(Rt,K,y,Vt,tt,Se),tt.side=mt,tt.needsUpdate=!0,_e=!0}}_e===!0&&(He.updateMultisampleRenderTarget(O),He.updateRenderTargetMipmap(O))}v.setRenderTarget(Q),v.setClearColor(X,Y),le!==void 0&&(y.viewport=le),v.toneMapping=G}function It(L,z,K){const y=z.isScene===!0?z.overrideMaterial:null;for(let R=0,O=L.length;R<O;R++){const V=L[R],Q=V.object,G=V.geometry,le=V.group;let _e=V.material;_e.allowOverride===!0&&y!==null&&(_e=y),Q.layers.test(K.layers)&&bt(Q,z,K,G,_e,le)}}function bt(L,z,K,y,R,O){L.onBeforeRender(v,z,K,y,R,O),L.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),R.onBeforeRender(v,z,K,y,L,O),R.transparent===!0&&R.side===vi&&R.forceSinglePass===!1?(R.side=qn,R.needsUpdate=!0,v.renderBufferDirect(K,z,y,R,L,O),R.side=br,R.needsUpdate=!0,v.renderBufferDirect(K,z,y,R,L,O),R.side=vi):v.renderBufferDirect(K,z,y,R,L,O),L.onAfterRender(v,z,K,y,R,O)}function Ct(L,z,K){z.isScene!==!0&&(z=rt);const y=Fe.get(L),R=p.state.lights,O=p.state.shadowsArray,V=R.state.version,Q=ne.getParameters(L,R.state,O,z,K),G=ne.getProgramCacheKey(Q);let le=y.programs;y.environment=L.isMeshStandardMaterial?z.environment:null,y.fog=z.fog,y.envMap=(L.isMeshStandardMaterial?I:wt).get(L.envMap||y.environment),y.envMapRotation=y.environment!==null&&L.envMap===null?z.environmentRotation:L.envMapRotation,le===void 0&&(L.addEventListener("dispose",Oe),le=new Map,y.programs=le);let _e=le.get(G);if(_e!==void 0){if(y.currentProgram===_e&&y.lightsStateVersion===V)return St(L,Q),_e}else Q.uniforms=ne.getUniforms(L),L.onBeforeCompile(Q,v),_e=ne.acquireProgram(Q,G),le.set(G,_e),y.uniforms=Q.uniforms;const xe=y.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(xe.clippingPlanes=Ie.uniform),St(L,Q),y.needsLights=Bt(L),y.lightsStateVersion=V,y.needsLights&&(xe.ambientLightColor.value=R.state.ambient,xe.lightProbe.value=R.state.probe,xe.directionalLights.value=R.state.directional,xe.directionalLightShadows.value=R.state.directionalShadow,xe.spotLights.value=R.state.spot,xe.spotLightShadows.value=R.state.spotShadow,xe.rectAreaLights.value=R.state.rectArea,xe.ltc_1.value=R.state.rectAreaLTC1,xe.ltc_2.value=R.state.rectAreaLTC2,xe.pointLights.value=R.state.point,xe.pointLightShadows.value=R.state.pointShadow,xe.hemisphereLights.value=R.state.hemi,xe.directionalShadowMap.value=R.state.directionalShadowMap,xe.directionalShadowMatrix.value=R.state.directionalShadowMatrix,xe.spotShadowMap.value=R.state.spotShadowMap,xe.spotLightMatrix.value=R.state.spotLightMatrix,xe.spotLightMap.value=R.state.spotLightMap,xe.pointShadowMap.value=R.state.pointShadowMap,xe.pointShadowMatrix.value=R.state.pointShadowMatrix),y.currentProgram=_e,y.uniformsList=null,_e}function Et(L){if(L.uniformsList===null){const z=L.currentProgram.getUniforms();L.uniformsList=_c.seqWithValue(z.seq,L.uniforms)}return L.uniformsList}function St(L,z){const K=Fe.get(L);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function un(L,z,K,y,R){z.isScene!==!0&&(z=rt),He.resetTextureUnits();const O=z.fog,V=y.isMeshStandardMaterial?z.environment:null,Q=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Gn,G=(y.isMeshStandardMaterial?I:wt).get(y.envMap||V),le=y.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,_e=!!K.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),xe=!!K.morphAttributes.position,Ce=!!K.morphAttributes.normal,vt=!!K.morphAttributes.color;let Rt=Yr;y.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Rt=v.toneMapping);const Vt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,tt=Vt!==void 0?Vt.length:0,Se=Fe.get(y),mt=p.state.lights;if(se===!0&&(Re===!0||L!==x)){const vn=L===x&&y.id===w;Ie.setState(y,L,vn)}let it=!1;y.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==mt.state.version||Se.outputColorSpace!==Q||R.isBatchedMesh&&Se.batching===!1||!R.isBatchedMesh&&Se.batching===!0||R.isBatchedMesh&&Se.batchingColor===!0&&R.colorTexture===null||R.isBatchedMesh&&Se.batchingColor===!1&&R.colorTexture!==null||R.isInstancedMesh&&Se.instancing===!1||!R.isInstancedMesh&&Se.instancing===!0||R.isSkinnedMesh&&Se.skinning===!1||!R.isSkinnedMesh&&Se.skinning===!0||R.isInstancedMesh&&Se.instancingColor===!0&&R.instanceColor===null||R.isInstancedMesh&&Se.instancingColor===!1&&R.instanceColor!==null||R.isInstancedMesh&&Se.instancingMorph===!0&&R.morphTexture===null||R.isInstancedMesh&&Se.instancingMorph===!1&&R.morphTexture!==null||Se.envMap!==G||y.fog===!0&&Se.fog!==O||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Ie.numPlanes||Se.numIntersection!==Ie.numIntersection)||Se.vertexAlphas!==le||Se.vertexTangents!==_e||Se.morphTargets!==xe||Se.morphNormals!==Ce||Se.morphColors!==vt||Se.toneMapping!==Rt||Se.morphTargetsCount!==tt)&&(it=!0):(it=!0,Se.__version=y.version);let Nt=Se.currentProgram;it===!0&&(Nt=Ct(y,z,R));let fn=!1,rn=!1,Jn=!1;const Ut=Nt.getUniforms(),Qn=Se.uniforms;if(be.useProgram(Nt.program)&&(fn=!0,rn=!0,Jn=!0),y.id!==w&&(w=y.id,rn=!0),fn||x!==L){be.buffers.depth.getReversed()?(ue.copy(L.projectionMatrix),Uy(ue),Fy(ue),Ut.setValue(k,"projectionMatrix",ue)):Ut.setValue(k,"projectionMatrix",L.projectionMatrix),Ut.setValue(k,"viewMatrix",L.matrixWorldInverse);const bn=Ut.map.cameraPosition;bn!==void 0&&bn.setValue(k,Ye.setFromMatrixPosition(L.matrixWorld)),j.logarithmicDepthBuffer&&Ut.setValue(k,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&Ut.setValue(k,"isOrthographic",L.isOrthographicCamera===!0),x!==L&&(x=L,rn=!0,Jn=!0)}if(R.isSkinnedMesh){Ut.setOptional(k,R,"bindMatrix"),Ut.setOptional(k,R,"bindMatrixInverse");const vn=R.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),Ut.setValue(k,"boneTexture",vn.boneTexture,He))}R.isBatchedMesh&&(Ut.setOptional(k,R,"batchingTexture"),Ut.setValue(k,"batchingTexture",R._matricesTexture,He),Ut.setOptional(k,R,"batchingIdTexture"),Ut.setValue(k,"batchingIdTexture",R._indirectTexture,He),Ut.setOptional(k,R,"batchingColorTexture"),R._colorsTexture!==null&&Ut.setValue(k,"batchingColorTexture",R._colorsTexture,He));const Ln=K.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&Ee.update(R,K,Nt),(rn||Se.receiveShadow!==R.receiveShadow)&&(Se.receiveShadow=R.receiveShadow,Ut.setValue(k,"receiveShadow",R.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(Qn.envMap.value=G,Qn.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&z.environment!==null&&(Qn.envMapIntensity.value=z.environmentIntensity),rn&&(Ut.setValue(k,"toneMappingExposure",v.toneMappingExposure),Se.needsLights&&Tt(Qn,Jn),O&&y.fog===!0&&te.refreshFogUniforms(Qn,O),te.refreshMaterialUniforms(Qn,y,N,$,p.state.transmissionRenderTarget[L.id]),_c.upload(k,Et(Se),Qn,He)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(_c.upload(k,Et(Se),Qn,He),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&Ut.setValue(k,"center",R.center),Ut.setValue(k,"modelViewMatrix",R.modelViewMatrix),Ut.setValue(k,"normalMatrix",R.normalMatrix),Ut.setValue(k,"modelMatrix",R.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const vn=y.uniformsGroups;for(let bn=0,na=vn.length;bn<na;bn++){const ir=vn[bn];F.update(ir,Nt),F.bind(ir,Nt)}}return Nt}function Tt(L,z){L.ambientLightColor.needsUpdate=z,L.lightProbe.needsUpdate=z,L.directionalLights.needsUpdate=z,L.directionalLightShadows.needsUpdate=z,L.pointLights.needsUpdate=z,L.pointLightShadows.needsUpdate=z,L.spotLights.needsUpdate=z,L.spotLightShadows.needsUpdate=z,L.rectAreaLights.needsUpdate=z,L.hemisphereLights.needsUpdate=z}function Bt(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(L,z,K){const y=Fe.get(L);y.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),Fe.get(L.texture).__webglTexture=z,Fe.get(L.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:K,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,z){const K=Fe.get(L);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0};const dn=k.createFramebuffer();this.setRenderTarget=function(L,z=0,K=0){D=L,A=z,C=K;let y=!0,R=null,O=!1,V=!1;if(L){const G=Fe.get(L);if(G.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(k.FRAMEBUFFER,null),y=!1;else if(G.__webglFramebuffer===void 0)He.setupRenderTarget(L);else if(G.__hasExternalTextures)He.rebindTextures(L,Fe.get(L.texture).__webglTexture,Fe.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const xe=L.depthTexture;if(G.__boundDepthTexture!==xe){if(xe!==null&&Fe.has(xe)&&(L.width!==xe.image.width||L.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(L)}}const le=L.texture;(le.isData3DTexture||le.isDataArrayTexture||le.isCompressedArrayTexture)&&(V=!0);const _e=Fe.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(_e[z])?R=_e[z][K]:R=_e[z],O=!0):L.samples>0&&He.useMultisampledRTT(L)===!1?R=Fe.get(L).__webglMultisampledFramebuffer:Array.isArray(_e)?R=_e[K]:R=_e,P.copy(L.viewport),b.copy(L.scissor),B=L.scissorTest}else P.copy(ge).multiplyScalar(N).floor(),b.copy(ze).multiplyScalar(N).floor(),B=Ze;if(K!==0&&(R=dn),be.bindFramebuffer(k.FRAMEBUFFER,R)&&y&&be.drawBuffers(L,R),be.viewport(P),be.scissor(b),be.setScissorTest(B),O){const G=Fe.get(L.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,G.__webglTexture,K)}else if(V){const G=Fe.get(L.texture),le=z;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,G.__webglTexture,K,le)}else if(L!==null&&K!==0){const G=Fe.get(L.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,G.__webglTexture,K)}w=-1},this.readRenderTargetPixels=function(L,z,K,y,R,O,V,Q=0){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let G=Fe.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&V!==void 0&&(G=G[V]),G){be.bindFramebuffer(k.FRAMEBUFFER,G);try{const le=L.textures[Q],_e=le.format,xe=le.type;if(!j.textureFormatReadable(_e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=L.width-y&&K>=0&&K<=L.height-R&&(L.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Q),k.readPixels(z,K,y,R,pe.convert(_e),pe.convert(xe),O))}finally{const le=D!==null?Fe.get(D).__webglFramebuffer:null;be.bindFramebuffer(k.FRAMEBUFFER,le)}}},this.readRenderTargetPixelsAsync=async function(L,z,K,y,R,O,V,Q=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let G=Fe.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&V!==void 0&&(G=G[V]),G)if(z>=0&&z<=L.width-y&&K>=0&&K<=L.height-R){be.bindFramebuffer(k.FRAMEBUFFER,G);const le=L.textures[Q],_e=le.format,xe=le.type;if(!j.textureFormatReadable(_e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ce),k.bufferData(k.PIXEL_PACK_BUFFER,O.byteLength,k.STREAM_READ),L.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Q),k.readPixels(z,K,y,R,pe.convert(_e),pe.convert(xe),0);const vt=D!==null?Fe.get(D).__webglFramebuffer:null;be.bindFramebuffer(k.FRAMEBUFFER,vt);const Rt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Ny(k,Rt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ce),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,O),k.deleteBuffer(Ce),k.deleteSync(Rt),O}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,z=null,K=0){const y=Math.pow(2,-K),R=Math.floor(L.image.width*y),O=Math.floor(L.image.height*y),V=z!==null?z.x:0,Q=z!==null?z.y:0;He.setTexture2D(L,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,V,Q,R,O),be.unbindTexture()};const jt=k.createFramebuffer(),$t=k.createFramebuffer();this.copyTextureToTexture=function(L,z,K=null,y=null,R=0,O=null){O===null&&(R!==0?(bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),O=R,R=0):O=0);let V,Q,G,le,_e,xe,Ce,vt,Rt;const Vt=L.isCompressedTexture?L.mipmaps[O]:L.image;if(K!==null)V=K.max.x-K.min.x,Q=K.max.y-K.min.y,G=K.isBox3?K.max.z-K.min.z:1,le=K.min.x,_e=K.min.y,xe=K.isBox3?K.min.z:0;else{const Ln=Math.pow(2,-R);V=Math.floor(Vt.width*Ln),Q=Math.floor(Vt.height*Ln),L.isDataArrayTexture?G=Vt.depth:L.isData3DTexture?G=Math.floor(Vt.depth*Ln):G=1,le=0,_e=0,xe=0}y!==null?(Ce=y.x,vt=y.y,Rt=y.z):(Ce=0,vt=0,Rt=0);const tt=pe.convert(z.format),Se=pe.convert(z.type);let mt;z.isData3DTexture?(He.setTexture3D(z,0),mt=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(He.setTexture2DArray(z,0),mt=k.TEXTURE_2D_ARRAY):(He.setTexture2D(z,0),mt=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const it=k.getParameter(k.UNPACK_ROW_LENGTH),Nt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),fn=k.getParameter(k.UNPACK_SKIP_PIXELS),rn=k.getParameter(k.UNPACK_SKIP_ROWS),Jn=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,Vt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Vt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,le),k.pixelStorei(k.UNPACK_SKIP_ROWS,_e),k.pixelStorei(k.UNPACK_SKIP_IMAGES,xe);const Ut=L.isDataArrayTexture||L.isData3DTexture,Qn=z.isDataArrayTexture||z.isData3DTexture;if(L.isDepthTexture){const Ln=Fe.get(L),vn=Fe.get(z),bn=Fe.get(Ln.__renderTarget),na=Fe.get(vn.__renderTarget);be.bindFramebuffer(k.READ_FRAMEBUFFER,bn.__webglFramebuffer),be.bindFramebuffer(k.DRAW_FRAMEBUFFER,na.__webglFramebuffer);for(let ir=0;ir<G;ir++)Ut&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Fe.get(L).__webglTexture,R,xe+ir),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Fe.get(z).__webglTexture,O,Rt+ir)),k.blitFramebuffer(le,_e,V,Q,Ce,vt,V,Q,k.DEPTH_BUFFER_BIT,k.NEAREST);be.bindFramebuffer(k.READ_FRAMEBUFFER,null),be.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(R!==0||L.isRenderTargetTexture||Fe.has(L)){const Ln=Fe.get(L),vn=Fe.get(z);be.bindFramebuffer(k.READ_FRAMEBUFFER,jt),be.bindFramebuffer(k.DRAW_FRAMEBUFFER,$t);for(let bn=0;bn<G;bn++)Ut?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ln.__webglTexture,R,xe+bn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ln.__webglTexture,R),Qn?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,vn.__webglTexture,O,Rt+bn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,vn.__webglTexture,O),R!==0?k.blitFramebuffer(le,_e,V,Q,Ce,vt,V,Q,k.COLOR_BUFFER_BIT,k.NEAREST):Qn?k.copyTexSubImage3D(mt,O,Ce,vt,Rt+bn,le,_e,V,Q):k.copyTexSubImage2D(mt,O,Ce,vt,le,_e,V,Q);be.bindFramebuffer(k.READ_FRAMEBUFFER,null),be.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Qn?L.isDataTexture||L.isData3DTexture?k.texSubImage3D(mt,O,Ce,vt,Rt,V,Q,G,tt,Se,Vt.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(mt,O,Ce,vt,Rt,V,Q,G,tt,Vt.data):k.texSubImage3D(mt,O,Ce,vt,Rt,V,Q,G,tt,Se,Vt):L.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,O,Ce,vt,V,Q,tt,Se,Vt.data):L.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,O,Ce,vt,Vt.width,Vt.height,tt,Vt.data):k.texSubImage2D(k.TEXTURE_2D,O,Ce,vt,V,Q,tt,Se,Vt);k.pixelStorei(k.UNPACK_ROW_LENGTH,it),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Nt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fn),k.pixelStorei(k.UNPACK_SKIP_ROWS,rn),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Jn),O===0&&z.generateMipmaps&&k.generateMipmap(mt),be.unbindTexture()},this.copyTextureToTexture3D=function(L,z,K=null,y=null,R=0){return bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,z,K,y,R)},this.initRenderTarget=function(L){Fe.get(L).__webglFramebuffer===void 0&&He.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?He.setTextureCube(L,0):L.isData3DTexture?He.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?He.setTexture2DArray(L,0):He.setTexture2D(L,0),be.unbindTexture()},this.resetState=function(){A=0,C=0,D=null,be.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=yt._getDrawingBufferColorSpace(e),t.unpackColorSpace=yt._getUnpackColorSpace()}}function OE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function vs(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),o=Math.round(r.b),s=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+o+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+o+","+s+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+o+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+o+","+s+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+o+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+o+",a:"+s+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+s+"}"}return"unknown format"}var cm=Array.prototype.forEach,da=Array.prototype.slice,ce={BREAK:{},extend:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=da.call(arguments);return function(){for(var t=da.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(cm&&e.forEach&&e.forEach===cm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,o=void 0;for(i=0,o=e.length;i<o;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var s in e)if(t.call(n,e[s],s)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var o=this,s=arguments;function a(){i=null,n||e.apply(o,s)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(o,s)}},toArray:function(e){return e.toArray?e.toArray():da.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},NE=[{litmus:ce.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:vs},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:vs},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:vs},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:vs}}},{litmus:ce.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:ce.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:ce.isObject,conversions:{RGBA_OBJ:{read:function(e){return ce.isNumber(e.r)&&ce.isNumber(e.g)&&ce.isNumber(e.b)&&ce.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return ce.isNumber(e.r)&&ce.isNumber(e.g)&&ce.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return ce.isNumber(e.h)&&ce.isNumber(e.s)&&ce.isNumber(e.v)&&ce.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return ce.isNumber(e.h)&&ce.isNumber(e.s)&&ce.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],fa=void 0,Yl=void 0,ef=function(){Yl=!1;var e=arguments.length>1?ce.toArray(arguments):arguments[0];return ce.each(NE,function(t){if(t.litmus(e))return ce.each(t.conversions,function(n,i){if(fa=n.read(e),Yl===!1&&fa!==!1)return Yl=fa,fa.conversionName=i,fa.conversion=n,ce.BREAK}),ce.BREAK}),Yl},um=void 0,Ic={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,o=e/60-Math.floor(e/60),s=n*(1-t),a=n*(1-o*t),l=n*(1-(1-o)*t),c=[[n,l,s],[a,n,s],[s,n,l],[s,a,n],[l,s,n],[n,s,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),o=Math.max(e,t,n),s=o-i,a=void 0,l=void 0;if(o!==0)l=s/o;else return{h:NaN,s:0,v:0};return e===o?a=(t-n)/s:t===o?a=2+(n-e)/s:a=4+(e-t)/s,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:o/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(um=t*8)|e&~(255<<um)}},UE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Bi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},zi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Jr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:r(o,t,n)}else{if("value"in i)return i.value;var s=i.get;return s===void 0?void 0:s.call(n)}},io=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},ro=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},gn=function(){function r(){if(Bi(this,r),this.__state=ef.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return zi(r,[{key:"toString",value:function(){return vs(this)}},{key:"toHexString",value:function(){return vs(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function sh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(gn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(gn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function ah(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(gn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(gn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}gn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ic.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")ce.extend(r.__state,Ic.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};gn.recalculateHSV=function(r){var e=Ic.rgb_to_hsv(r.r,r.g,r.b);ce.extend(r.__state,{s:e.s,v:e.v}),ce.isNaN(e.h)?ce.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};gn.COMPONENTS=["r","g","b","h","s","v","hex","a"];sh(gn.prototype,"r",2);sh(gn.prototype,"g",1);sh(gn.prototype,"b",0);ah(gn.prototype,"h");ah(gn.prototype,"s");ah(gn.prototype,"v");Object.defineProperty(gn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(gn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ic.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Wo=function(){function r(e,t){Bi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return zi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),FE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},g_={};ce.each(FE,function(r,e){ce.each(r,function(t){g_[t]=e})});var kE=/(\d+(\.\d+)?)px/;function Hi(r){if(r==="0"||ce.isUndefined(r))return 0;var e=r.match(kE);return ce.isNull(e)?0:parseFloat(e[1])}var Z={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,o=t;ce.isUndefined(o)&&(o=!0),ce.isUndefined(i)&&(i=!0),e.style.position="absolute",o&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var o=n||{},s=g_[t];if(!s)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(s);switch(s){case"MouseEvents":{var l=o.x||o.clientX||0,c=o.y||o.clientY||0;a.initMouseEvent(t,o.bubbles||!1,o.cancelable||!0,window,o.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;ce.defaults(o,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,o.bubbles||!1,o.cancelable,window,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.keyCode,o.charCode);break}default:{a.initEvent(t,o.bubbles||!1,o.cancelable||!0);break}}ce.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var o=i||!1;return e.addEventListener?e.addEventListener(t,n,o):e.attachEvent&&e.attachEvent("on"+t,n),Z},unbind:function(e,t,n,i){var o=i||!1;return e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent&&e.detachEvent("on"+t,n),Z},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return Z},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return Z},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Hi(t["border-left-width"])+Hi(t["border-right-width"])+Hi(t["padding-left"])+Hi(t["padding-right"])+Hi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Hi(t["border-top-width"])+Hi(t["border-bottom-width"])+Hi(t["padding-top"])+Hi(t["padding-bottom"])+Hi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},__=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function s(){o.setValue(!o.__prev)}return Z.bind(i.__checkbox,"change",s,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return zi(e,[{key:"setValue",value:function(n){var i=Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Wo),BE=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i,a=o;if(o.__select=document.createElement("select"),ce.isArray(s)){var l={};ce.each(s,function(c){l[c]=c}),s=l}return ce.each(s,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),o.updateDisplay(),Z.bind(o.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),o.domElement.appendChild(o.__select),o}return zi(e,[{key:"setValue",value:function(n){var i=Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return Z.isActive(this.__select)?this:(this.__select.value=this.getValue(),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Wo),zE=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;function s(){o.setValue(o.__input.value)}function a(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),Z.bind(i.__input,"keyup",s),Z.bind(i.__input,"change",s),Z.bind(i.__input,"blur",a),Z.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return zi(e,[{key:"updateDisplay",value:function(){return Z.isActive(this.__input)||(this.__input.value=this.getValue()),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Wo);function dm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var v_=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i||{};return o.__min=s.min,o.__max=s.max,o.__step=s.step,ce.isUndefined(o.__step)?o.initialValue===0?o.__impliedStep=1:o.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(o.initialValue))/Math.LN10))/10:o.__impliedStep=o.__step,o.__precision=dm(o.__impliedStep),o}return zi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=dm(n),this}}]),e}(Wo);function HE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Oc=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));o.__truncationSuspended=!1;var s=o,a=void 0;function l(){var _=parseFloat(s.__input.value);ce.isNaN(_)||s.setValue(_)}function c(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}function u(){c()}function d(_){var g=a-_.clientY;s.setValue(s.getValue()+g*s.__impliedStep),a=_.clientY}function f(){Z.unbind(window,"mousemove",d),Z.unbind(window,"mouseup",f),c()}function h(_){Z.bind(window,"mousemove",d),Z.bind(window,"mouseup",f),a=_.clientY}return o.__input=document.createElement("input"),o.__input.setAttribute("type","text"),Z.bind(o.__input,"change",l),Z.bind(o.__input,"blur",u),Z.bind(o.__input,"mousedown",h),Z.bind(o.__input,"keydown",function(_){_.keyCode===13&&(s.__truncationSuspended=!0,this.blur(),s.__truncationSuspended=!1,c())}),o.updateDisplay(),o.domElement.appendChild(o.__input),o}return zi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():HE(this.getValue(),this.__precision),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_);function fm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var tf=function(r){io(e,r);function e(t,n,i,o,s){Bi(this,e);var a=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:o,step:s})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),Z.bind(a.__background,"mousedown",c),Z.bind(a.__background,"touchstart",f),Z.addClass(a.__background,"slider"),Z.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),Z.bind(window,"mousemove",u),Z.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(fm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){Z.unbind(window,"mousemove",u),Z.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(Z.bind(window,"touchmove",h),Z.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(fm(m,p.left,p.right,l.__min,l.__max))}function _(){Z.unbind(window,"touchmove",h),Z.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return zi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_),y_=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=o;return o.__button=document.createElement("div"),o.__button.innerHTML=i===void 0?"Fire":i,Z.bind(o.__button,"click",function(a){return a.preventDefault(),s.fire(),!1}),Z.addClass(o.__button,"button"),o.domElement.appendChild(o.__button),o}return zi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Wo),nf=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new gn(i.getValue()),i.__temp=new gn(0);var o=i;i.domElement=document.createElement("div"),Z.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",Z.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),Z.bind(i.__input,"blur",d),Z.bind(i.__selector,"mousedown",function(){Z.addClass(this,"drag").bind(window,"mouseup",function(){Z.removeClass(o.__selector,"drag")})}),Z.bind(i.__selector,"touchstart",function(){Z.addClass(this,"drag").bind(window,"touchend",function(){Z.removeClass(o.__selector,"drag")})});var s=document.createElement("div");ce.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),ce.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),ce.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),ce.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),ce.extend(s.style,{width:"100%",height:"100%",background:"none"}),hm(s,"top","rgba(0,0,0,0)","#000"),ce.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),GE(i.__hue_field),ce.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),Z.bind(i.__saturation_field,"mousedown",a),Z.bind(i.__saturation_field,"touchstart",a),Z.bind(i.__field_knob,"mousedown",a),Z.bind(i.__field_knob,"touchstart",a),Z.bind(i.__hue_field,"mousedown",l),Z.bind(i.__hue_field,"touchstart",l);function a(g){h(g),Z.bind(window,"mousemove",h),Z.bind(window,"touchmove",h),Z.bind(window,"mouseup",c),Z.bind(window,"touchend",c)}function l(g){_(g),Z.bind(window,"mousemove",_),Z.bind(window,"touchmove",_),Z.bind(window,"mouseup",u),Z.bind(window,"touchend",u)}function c(){Z.unbind(window,"mousemove",h),Z.unbind(window,"touchmove",h),Z.unbind(window,"mouseup",c),Z.unbind(window,"touchend",c),f()}function u(){Z.unbind(window,"mousemove",_),Z.unbind(window,"touchmove",_),Z.unbind(window,"mouseup",u),Z.unbind(window,"touchend",u),f()}function d(){var g=ef(this.value);g!==!1?(o.__color.__state=g,o.setValue(o.__color.toOriginal())):this.value=o.__color.toString()}function f(){o.__onFinishChange&&o.__onFinishChange.call(o,o.__color.toOriginal())}i.__saturation_field.appendChild(s),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=o.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,S=p.clientX,M=p.clientY,v=(S-m.left)/(m.right-m.left),E=1-(M-m.top)/(m.bottom-m.top);return E>1?E=1:E<0&&(E=0),v>1?v=1:v<0&&(v=0),o.__color.v=E,o.__color.s=v,o.setValue(o.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=o.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,S=p.clientY,M=1-(S-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),o.__color.h=M*360,o.setValue(o.__color.toOriginal()),!1}return i}return zi(e,[{key:"updateDisplay",value:function(){var n=ef(this.getValue());if(n!==!1){var i=!1;ce.each(gn.COMPONENTS,function(a){if(!ce.isUndefined(n[a])&&!ce.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&ce.extend(this.__color.__state,n)}ce.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var o=this.__color.v<.5||this.__color.s>.5?255:0,s=255-o;ce.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+o+","+o+","+o+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,hm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),ce.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+o+","+o+","+o+")",textShadow:this.__input_textShadow+"rgba("+s+","+s+","+s+",.7)"})}}]),e}(Wo),VE=["-moz-","-o-","-webkit-","-ms-",""];function hm(r,e,t,n){r.style.background="",ce.each(VE,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function GE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var WE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var o=n.getElementsByTagName("head")[0];try{o.appendChild(i)}catch{}}},XE=`<div id="dg-save" class="dg dialogue">

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

</div>`,qE=function(e,t){var n=e[t];return ce.isArray(arguments[2])||ce.isObject(arguments[2])?new BE(e,t,arguments[2]):ce.isNumber(n)?ce.isNumber(arguments[2])&&ce.isNumber(arguments[3])?ce.isNumber(arguments[4])?new tf(e,t,arguments[2],arguments[3],arguments[4]):new tf(e,t,arguments[2],arguments[3]):ce.isNumber(arguments[4])?new Oc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Oc(e,t,{min:arguments[2],max:arguments[3]}):ce.isString(n)?new zE(e,t):ce.isFunction(n)?new y_(e,t,""):ce.isBoolean(n)?new __(e,t):null};function YE(r){setTimeout(r,1e3/60)}var jE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||YE,$E=function(){function r(){Bi(this,r),this.backgroundElement=document.createElement("div"),ce.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),Z.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),ce.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;Z.bind(this.backgroundElement,"click",function(){e.hide()})}return zi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),ce.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",Z.unbind(t.domElement,"webkitTransitionEnd",i),Z.unbind(t.domElement,"transitionend",i),Z.unbind(t.domElement,"oTransitionEnd",i)};Z.bind(this.domElement,"webkitTransitionEnd",n),Z.bind(this.domElement,"transitionend",n),Z.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-Z.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-Z.getHeight(this.domElement)/2+"px"}}]),r}(),KE=OE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);WE.inject(KE);var pm="dg",mm=72,gm=20,rl="Default",Sa=function(){try{return!!window.localStorage}catch{return!1}}(),Na=void 0,_m=!0,hs=void 0,Gu=!1,x_=[],Ht=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),Z.addClass(this.domElement,pm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=ce.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=ce.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),ce.isUndefined(n.load)?n.load={preset:rl}:n.preset&&(n.load.preset=n.preset),ce.isUndefined(n.parent)&&n.hideable&&x_.push(this),n.resizable=ce.isUndefined(n.parent)&&n.resizable,n.autoPlace&&ce.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Sa&&localStorage.getItem(ps(this,"isLocal"))==="true",o=void 0,s=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,eT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,sf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,s&&(s.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?Z.addClass(t.__ul,r.CLASS_CLOSED):Z.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Sa&&(i=f,f?Z.bind(window,"unload",o):Z.unbind(window,"unload",o),localStorage.setItem(ps(t,"isLocal"),f))}}}),ce.isUndefined(n.parent)){if(this.closed=n.closed||!1,Z.addClass(this.domElement,r.CLASS_MAIN),Z.makeSelectable(this.domElement,!1),Sa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ps(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,Z.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(Z.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(Z.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),Z.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);Z.addClass(l,"controller-name"),s=lh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};Z.addClass(this.__ul,r.CLASS_CLOSED),Z.addClass(s,"title"),Z.bind(s,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(ce.isUndefined(n.parent)&&(_m&&(hs=document.createElement("div"),Z.addClass(hs,pm),Z.addClass(hs,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(hs),_m=!1),hs.appendChild(this.domElement),Z.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||sf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},Z.bind(window,"resize",this.__resizeHandler),Z.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),Z.bind(this.__ul,"transitionend",this.__resizeHandler),Z.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&QE(this),o=function(){Sa&&localStorage.getItem(ps(t,"isLocal"))==="true"&&localStorage.setItem(ps(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=o;function u(){var d=t.getRoot();d.width+=1,ce.defer(function(){d.width-=1})}n.parent||u()};Ht.toggleHide=function(){Gu=!Gu,ce.each(x_,function(r){r.domElement.style.display=Gu?"none":""})};Ht.CLASS_AUTO_PLACE="a";Ht.CLASS_AUTO_PLACE_CONTAINER="ac";Ht.CLASS_MAIN="main";Ht.CLASS_CONTROLLER_ROW="cr";Ht.CLASS_TOO_TALL="taller-than-window";Ht.CLASS_CLOSED="closed";Ht.CLASS_CLOSE_BUTTON="close-button";Ht.CLASS_CLOSE_TOP="close-top";Ht.CLASS_CLOSE_BOTTOM="close-bottom";Ht.CLASS_DRAG="drag";Ht.DEFAULT_WIDTH=245;Ht.TEXT_CLOSED="Close Controls";Ht.TEXT_OPEN="Open Controls";Ht._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===mm||r.keyCode===mm)&&Ht.toggleHide()};Z.bind(window,"keydown",Ht._keydownHandler,!1);ce.extend(Ht.prototype,{add:function(e,t){return Ua(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ua(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;ce.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&hs.removeChild(this.domElement);var e=this;ce.each(this.__folders,function(t){e.removeFolder(t)}),Z.unbind(window,"keydown",Ht._keydownHandler,!1),vm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Ht(t);this.__folders[e]=n;var i=lh(this,n.domElement);return Z.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],vm(e);var t=this;ce.each(e.__folders,function(n){e.removeFolder(n)}),ce.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=Z.getOffset(e.__ul).top,n=0;ce.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=Z.getHeight(i))}),window.innerHeight-t-gm<n?(Z.addClass(e.domElement,Ht.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-gm+"px"):(Z.removeClass(e.domElement,Ht.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&ce.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:ce.debounce(function(){this.onResize()},50),remember:function(){if(ce.isUndefined(Na)&&(Na=new $E,Na.domElement.innerHTML=XE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;ce.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&JE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&sf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=jl(this)),e.folders={},ce.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=jl(this),rf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[rl]=jl(this,!0)),this.load.remembered[e]=jl(this),this.preset=e,of(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){ce.each(this.__controllers,function(t){this.getRoot().load.remembered?S_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),ce.each(this.__folders,function(t){t.revert(t)}),e||rf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&w_(this.__listening)},updateDisplay:function(){ce.each(this.__controllers,function(e){e.updateDisplay()}),ce.each(this.__folders,function(e){e.updateDisplay()})}});function lh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function vm(r){Z.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&Z.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function rf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function ZE(r,e,t){if(t.__li=e,t.__gui=r,ce.extend(t,{options:function(s){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:a,factoryArgs:[ce.toArray(arguments)]})}if(ce.isArray(s)||ce.isObject(s)){var l=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:l,factoryArgs:[s]})}},name:function(s){return t.__li.firstElementChild.firstElementChild.innerHTML=s,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof tf){var n=new Oc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});ce.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(o){var s=t[o],a=n[o];t[o]=n[o]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),s.apply(t,l)}}),Z.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Oc){var i=function(s){if(ce.isNumber(t.__min)&&ce.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ua(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return s};t.min=ce.compose(i,t.min),t.max=ce.compose(i,t.max)}else t instanceof __?(Z.bind(e,"click",function(){Z.fakeEvent(t.__checkbox,"click")}),Z.bind(t.__checkbox,"click",function(o){o.stopPropagation()})):t instanceof y_?(Z.bind(e,"click",function(){Z.fakeEvent(t.__button,"click")}),Z.bind(e,"mouseover",function(){Z.addClass(t.__button,"hover")}),Z.bind(e,"mouseout",function(){Z.removeClass(t.__button,"hover")})):t instanceof nf&&(Z.addClass(e,"color"),t.updateDisplay=ce.compose(function(o){return e.style.borderLeftColor=t.__color.toString(),o},t.updateDisplay),t.updateDisplay());t.setValue=ce.compose(function(o){return r.getRoot().__preset_select&&t.isModified()&&rf(r.getRoot(),!0),o},t.setValue)}function S_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var o=t.load.remembered,s=void 0;if(o[r.preset])s=o[r.preset];else if(o[rl])s=o[rl];else return;if(s[n]&&s[n][e.property]!==void 0){var a=s[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ua(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new nf(e,t);else{var o=[e,t].concat(n.factoryArgs);i=qE.apply(r,o)}n.before instanceof Wo&&(n.before=n.before.__li),S_(r,i),Z.addClass(i.domElement,"c");var s=document.createElement("span");Z.addClass(s,"property-name"),s.innerHTML=i.property;var a=document.createElement("div");a.appendChild(s),a.appendChild(i.domElement);var l=lh(r,a,n.before);return Z.addClass(l,Ht.CLASS_CONTROLLER_ROW),i instanceof nf?Z.addClass(l,"color"):Z.addClass(l,UE(i.getValue())),ZE(r,l,i),r.__controllers.push(i),i}function ps(r,e){return document.location.href+"."+e}function of(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function ym(r,e){e.style.display=r.useLocalStorage?"block":"none"}function JE(r){var e=r.__save_row=document.createElement("li");Z.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),Z.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",Z.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",Z.addClass(n,"button"),Z.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",Z.addClass(i,"button"),Z.addClass(i,"save-as");var o=document.createElement("span");o.innerHTML="Revert",Z.addClass(o,"button"),Z.addClass(o,"revert");var s=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?ce.each(r.load.remembered,function(d,f){of(r,f,f===r.preset)}):of(r,rl,!1),Z.bind(s,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(s),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(o),Sa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ps(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),ym(r,a),Z.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,ym(r,a)})}var u=document.getElementById("dg-new-constructor");Z.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Na.hide()}),Z.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Na.show(),u.focus(),u.select()}),Z.bind(n,"click",function(){r.save()}),Z.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),Z.bind(o,"click",function(){r.revert()})}function QE(r){var e=void 0;r.__resize_handle=document.createElement("div"),ce.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(o){return o.preventDefault(),r.width+=e-o.clientX,r.onResize(),e=o.clientX,!1}function n(){Z.removeClass(r.__closeButton,Ht.CLASS_DRAG),Z.unbind(window,"mousemove",t),Z.unbind(window,"mouseup",n)}function i(o){return o.preventDefault(),e=o.clientX,Z.addClass(r.__closeButton,Ht.CLASS_DRAG),Z.bind(window,"mousemove",t),Z.bind(window,"mouseup",n),!1}Z.bind(r.__resize_handle,"mousedown",i),Z.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function sf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function jl(r,e){var t={};return ce.each(r.__rememberedObjects,function(n,i){var o={},s=r.__rememberedObjectIndecesToControllers[i];ce.each(s,function(a,l){o[l]=e?a.initialValue:a.getValue()}),t[i]=o}),t}function eT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function w_(r){r.length!==0&&jE.call(window,function(){w_(r)}),ce.each(r,function(e){e.updateDisplay()})}var tT=Ht;function xm(r,e){if(e===sy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===jd||e===Wg){let t=r.getIndex();if(t===null){const s=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)s.push(l);r.setIndex(s),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===jd)for(let s=1;s<=n;s++)i.push(t.getX(0)),i.push(t.getX(s)),i.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(t.getX(s)),i.push(t.getX(s+1)),i.push(t.getX(s+2))):(i.push(t.getX(s+2)),i.push(t.getX(s+1)),i.push(t.getX(s)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=r.clone();return o.setIndex(i),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class nT extends Qs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new aT(t)}),this.register(function(t){return new lT(t)}),this.register(function(t){return new _T(t)}),this.register(function(t){return new vT(t)}),this.register(function(t){return new yT(t)}),this.register(function(t){return new uT(t)}),this.register(function(t){return new dT(t)}),this.register(function(t){return new fT(t)}),this.register(function(t){return new hT(t)}),this.register(function(t){return new sT(t)}),this.register(function(t){return new pT(t)}),this.register(function(t){return new cT(t)}),this.register(function(t){return new gT(t)}),this.register(function(t){return new mT(t)}),this.register(function(t){return new rT(t)}),this.register(function(t){return new xT(t)}),this.register(function(t){return new ST(t)})}load(e,t,n,i){const o=this;let s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){const c=Oa.extractUrlBase(e);s=Oa.resolveURL(c,this.path)}else s=Oa.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),o.manager.itemError(e),o.manager.itemEnd(e)},l=new c_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{o.parse(c,s,function(u){t(u),o.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let o;const s={},a={},l=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===b_){try{s[pt.KHR_BINARY_GLTF]=new wT(e)}catch(d){i&&i(d);return}o=JSON.parse(s[pt.KHR_BINARY_GLTF].content)}else o=JSON.parse(l.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new NT(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,s[d.name]=!0}if(o.extensionsUsed)for(let u=0;u<o.extensionsUsed.length;++u){const d=o.extensionsUsed[u],f=o.extensionsRequired||[];switch(d){case pt.KHR_MATERIALS_UNLIT:s[d]=new oT;break;case pt.KHR_DRACO_MESH_COMPRESSION:s[d]=new bT(o,this.dracoLoader);break;case pt.KHR_TEXTURE_TRANSFORM:s[d]=new MT;break;case pt.KHR_MESH_QUANTIZATION:s[d]=new ET;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(s),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,o){n.parse(e,t,i,o)})}}function iT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class rT{constructor(e){this.parser=e,this.name=pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const o=t.json,l=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let c;const u=new $e(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Gn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new u_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Fx(u),c.distance=d;break;case"spot":c=new Nx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),dr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class oT{constructor(){this.name=pt.KHR_MATERIALS_UNLIT}getMaterialType(){return Mo}extendParams(e,t,n){const i=[];e.color=new $e(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const s=o.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],Gn),e.opacity=s[3]}o.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",o.baseColorTexture,yn))}return Promise.all(i)}}class sT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class aT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){const a=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new gt(a,a)}return Promise.all(o)}}class lT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name];return t.dispersion=o.dispersion!==void 0?o.dispersion:0,Promise.resolve()}}class cT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(o)}}class uT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new $e(0,0,0),t.sheenRoughness=0,t.sheen=1;const s=i.extensions[this.name];if(s.sheenColorFactor!==void 0){const a=s.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Gn)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",s.sheenColorTexture,yn)),s.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(o)}}class dT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(o)}}class fT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;const a=s.attenuationColor||[1,1,1];return t.attenuationColor=new $e().setRGB(a[0],a[1],a[2],Gn),Promise.all(o)}}class hT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class pT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",s.specularTexture));const a=s.specularColorFactor||[1,1,1];return t.specularColor=new $e().setRGB(a[0],a[1],a[2],Gn),s.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",s.specularColorTexture,yn)),Promise.all(o)}}class mT{constructor(e){this.parser=e,this.name=pt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(o)}}class gT{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(o)}}class _T{constructor(e){this.parser=e,this.name=pt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const o=i.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,s)}}class vT{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const s=o.extensions[t],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,s.source,l)}}class yT{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const s=o.extensions[t],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,s.source,l)}}class xT{constructor(e){this.name=pt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],o=this.parser.getDependency("buffer",i.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):s.ready.then(function(){const h=new ArrayBuffer(u*d);return s.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class ST{constructor(e){this.name=pt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==mi.TRIANGLES&&c.mode!==mi.TRIANGLE_STRIP&&c.mode!==mi.TRIANGLE_FAN&&c.mode!==void 0)return null;const s=n.extensions[this.name].attributes,a=[],l={};for(const c in s)a.push(this.parser.getDependency("accessor",s[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new lt,m=new W,p=new no,S=new W(1,1,1),M=new hx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&S.fromBufferAttribute(l.SCALE,v),M.setMatrixAt(v,g.compose(m,p,S));for(const v in l)if(v==="_COLOR_0"){const E=l[v];M.instanceColor=new Kd(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);Yt.prototype.copy.call(M,_),this.parser.assignFinalMaterial(M),h.push(M)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const b_="glTF",ha=12,Sm={JSON:1313821514,BIN:5130562};class wT{constructor(e){this.name=pt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==b_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ha,o=new DataView(e,ha);let s=0;for(;s<i;){const a=o.getUint32(s,!0);s+=4;const l=o.getUint32(s,!0);if(s+=4,l===Sm.JSON){const c=new Uint8Array(e,ha+s,a);this.content=n.decode(c)}else if(l===Sm.BIN){const c=ha+s;this.body=e.slice(c,c+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class bT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,o=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},l={},c={};for(const u in s){const d=af[u]||u.toLowerCase();a[d]=s[u]}for(const u in e.attributes){const d=af[u]||u.toLowerCase();if(s[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Es[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",o).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Gn,f)})})}}class MT{constructor(){this.name=pt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ET{constructor(){this.name=pt.KHR_MESH_QUANTIZATION}}class M_ extends _l{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i*3+i;for(let s=0;s!==i;s++)t[s]=n[o+s];return t}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,S=1-m,M=p-f+d;for(let v=0;v!==a;v++){const E=s[g+v+a],A=s[g+v+l]*u,C=s[_+v+a],D=s[_+v]*u;o[v]=S*E+M*A+m*C+p*D}return o}}const TT=new no;class AT extends M_{interpolate_(e,t,n,i){const o=super.interpolate_(e,t,n,i);return TT.fromArray(o).normalize().toArray(o),o}}const mi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Es={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wm={9728:Vn,9729:li,9984:Ug,9985:dc,9986:ya,9987:mr},bm={33071:Fr,33648:Cc,10497:Fs},Wu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},af={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ir={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},CT={CUBICSPLINE:void 0,LINEAR:nl,STEP:tl},Xu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function RT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new th({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:br})),r.DefaultMaterial}function ho(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function dr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function PT(r,e,t){let n=!1,i=!1,o=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(o=!0),n&&i&&o)break}if(!n&&!i&&!o)return Promise.resolve(r);const s=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;s.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(o){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),o&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function LT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function DT(r){let e;const t=r.extensions&&r.extensions[pt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qu(t.attributes):e=r.indices+":"+qu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qu(r.targets[n]);return e}function qu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function lf(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function IT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const OT=new lt;class NT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new iT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,o=!1,s=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,o=a.indexOf("Firefox")>-1,s=o?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||o&&s<98?this.textureLoader=new Ix(this.options.manager):this.textureLoader=new zx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new c_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){const a={scene:s[0][i.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:i.asset,parser:n,userData:{}};return ho(o,a,i),dr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,o=t.length;i<o;i++){const s=t[i].joints;for(let a=0,l=s.length;a<l;a++)e[s[a]].isBone=!0}for(let i=0,o=e.length;i<o;i++){const s=e[i];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),o=(s,a)=>{const l=this.associations.get(s);l!=null&&this.associations.set(a,l);for(const[c,u]of s.children.entries())o(u,a.children[c])};return o(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const o=e(t[i]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":i=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(o,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[pt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(o,s){n.load(Oa.resolveURL(t.uri,i.path),o,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const s=Wu[i.type],a=Es[i.componentType],l=i.normalized===!0,c=new a(i.count*s);return Promise.resolve(new Lt(c,s,l))}const o=[];return i.bufferView!==void 0?o.push(this.getDependency("bufferView",i.bufferView)):o.push(null),i.sparse!==void 0&&(o.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(o).then(function(s){const a=s[0],l=Wu[i.type],c=Es[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(S);M||(g=new c(a,p*h,i.count*h/u),M=new lx(g,h/u),t.cache.add(S,M)),m=new Zf(M,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Lt(g,l,_);if(i.sparse!==void 0){const p=Wu.SCALAR,S=Es[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new S(s[1],M,i.sparse.count*p),A=new c(s[2],v,i.sparse.count*l);a!==null&&(m=new Lt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,D=E.length;C<D;C++){const w=E[C];if(m.setX(w,A[C*l]),l>=2&&m.setY(w,A[C*l+1]),l>=3&&m.setZ(w,A[C*l+2]),l>=4&&m.setW(w,A[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,s=t.images[o];let a=this.textureLoader;if(s.uri){const l=n.manager.getHandler(s.uri);l!==null&&(a=l)}return this.loadTextureImage(e,o,a)}loadTextureImage(e,t,n){const i=this,o=this.json,s=o.textures[e],a=o.images[t],l=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(o.samplers||{})[s.sampler]||{};return u.magFilter=wm[f.magFilter]||li,u.minFilter=wm[f.minFilter]||mr,u.wrapS=bm[f.wrapS]||Fs,u.wrapT=bm[f.wrapT]||Fs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Vn&&u.minFilter!==li,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const s=i.images[e],a=self.URL||self.webkitURL;let l=s.uri||"",c=!1;if(s.bufferView!==void 0)l=n.getDependency("bufferView",s.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:s.mimeType});return l=a.createObjectURL(f),l});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new an(g);m.needsUpdate=!0,f(m)}),t.load(Oa.resolveURL(d,o.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),dr(d,s),d.userData.mimeType=s.mimeType||IT(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const o=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),o.extensions[pt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[pt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=o.associations.get(s);s=o.extensions[pt.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),o.associations.set(s,l)}}return i!==void 0&&(s.colorSpace=i),e[t]=s,s})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new o_,$i.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new r_,$i.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||o||s){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),o&&(l.vertexColors=!0),s&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return th}loadMaterial(e){const t=this,n=this.json,i=this.extensions,o=n.materials[e];let s;const a={},l=o.extensions||{},c=[];if(l[pt.KHR_MATERIALS_UNLIT]){const d=i[pt.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),c.push(d.extendParams(a,o,t))}else{const d=o.pbrMetallicRoughness||{};if(a.color=new $e(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Gn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,yn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}o.doubleSided===!0&&(a.side=vi);const u=o.alphaMode||Xu.OPAQUE;if(u===Xu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Xu.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&s!==Mo&&(c.push(t.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new gt(1,1),o.normalTexture.scale!==void 0)){const d=o.normalTexture.scale;a.normalScale.set(d,d)}if(o.occlusionTexture!==void 0&&s!==Mo&&(c.push(t.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&s!==Mo){const d=o.emissiveFactor;a.emissive=new $e().setRGB(d[0],d[1],d[2],Gn)}return o.emissiveTexture!==void 0&&s!==Mo&&c.push(t.assignTexture(a,"emissiveMap",o.emissiveTexture,yn)),Promise.all(c).then(function(){const d=new s(a);return o.name&&(d.name=o.name),dr(d,o),t.associations.set(d,{materials:e}),o.extensions&&ho(i,d,o),d})}createUniqueName(e){const t=Dt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function o(a){return n[pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Mm(l,a,t)})}const s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=DT(c),d=i[u];if(d)s.push(d.promise);else{let f;c.extensions&&c.extensions[pt.KHR_DRACO_MESH_COMPRESSION]?f=o(c):f=Mm(new Mi,c,t),i[u]={primitive:c,promise:f},s.push(f)}}return Promise.all(s)}loadMesh(e){const t=this,n=this.json,i=this.extensions,o=n.meshes[e],s=o.primitives,a=[];for(let l=0,c=s.length;l<c;l++){const u=s[l].material===void 0?RT(this.cache):this.getDependency("material",s[l].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=s[h];let p;const S=c[h];if(m.mode===mi.TRIANGLES||m.mode===mi.TRIANGLE_STRIP||m.mode===mi.TRIANGLE_FAN||m.mode===void 0)p=o.isSkinnedMesh===!0?new ux(g,S):new Hn(g,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mi.TRIANGLE_STRIP?p.geometry=xm(p.geometry,Wg):m.mode===mi.TRIANGLE_FAN&&(p.geometry=xm(p.geometry,jd));else if(m.mode===mi.LINES)p=new gx(g,S);else if(m.mode===mi.LINE_STRIP)p=new eh(g,S);else if(m.mode===mi.LINE_LOOP)p=new _x(g,S);else if(m.mode===mi.POINTS)p=new Jd(g,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&LT(p,o),p.name=t.createUniqueName(o.name||"mesh_"+e),dr(p,o),m.extensions&&ho(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return o.extensions&&ho(i,d[0],o),d[0];const f=new _r;o.extensions&&ho(i,f,o),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xn(Iy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),dr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,o=t.joints.length;i<o;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const o=i.pop(),s=i,a=[],l=[];for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d){a.push(d);const f=new lt;o!==null&&f.fromArray(o.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jf(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],o=i.name?i.name:"animation_"+e,s=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,S=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(_),u.push(g))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let S=0,M=f.length;S<M;S++){const v=f[S],E=h[S],A=_[S],C=g[S],D=m[S];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const w=n._createAnimationTracks(v,E,A,C,D);if(w)for(let x=0;x<w.length;x++)p.push(w[x])}return new Tx(o,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(o){const s=n._getNodeRef(n.meshCache,i.mesh,o);return i.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),s})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],o=n._loadNodeShallow(e),s=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)s.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([o,Promise.all(s),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,OT)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],s=o.name?i.createUniqueName(o.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),o.camera!==void 0&&a.push(i.getDependency("camera",o.camera).then(function(c){return i._getNodeRef(i.cameraCache,o.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(o.isBone===!0?u=new n_:c.length>1?u=new _r:c.length===1?u=c[0]:u=new Yt,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(o.name&&(u.userData.name=o.name,u.name=s),dr(u,o),o.extensions&&ho(n,u,o),o.matrix!==void 0){const d=new lt;d.fromArray(o.matrix),u.applyMatrix4(d)}else o.translation!==void 0&&u.position.fromArray(o.translation),o.rotation!==void 0&&u.quaternion.fromArray(o.rotation),o.scale!==void 0&&u.scale.fromArray(o.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(o.mesh!==void 0&&i.meshCache.refs[o.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,o=new _r;n.name&&(o.name=i.createUniqueName(n.name)),dr(o,n),n.extensions&&ho(t,o,n);const s=n.nodes||[],a=[];for(let l=0,c=s.length;l<c;l++)a.push(i.getDependency("node",s[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)o.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof $i||f instanceof an)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(o),o})}_createAnimationTracks(e,t,n,i,o){const s=[],a=e.name?e.name:e.uuid,l=[];Ir[o.path]===Ir.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Ir[o.path]){case Ir.weights:c=zs;break;case Ir.rotation:c=Hs;break;case Ir.translation:case Ir.scale:c=Vs;break;default:switch(n.itemSize){case 1:c=zs;break;case 2:case 3:default:c=Vs;break}break}const u=i.interpolation!==void 0?CT[i.interpolation]:nl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Ir[o.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),s.push(_)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=lf(t.constructor),i=new Float32Array(t.length);for(let o=0,s=t.length;o<s;o++)i[o]=t[o]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Hs?AT:M_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function UT(r,e,t){const n=e.attributes,i=new Fi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new W(l[0],l[1],l[2]),new W(c[0],c[1],c[2])),a.normalized){const u=lf(Es[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const a=new W,l=new W;for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=lf(Es[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const s=new tr;i.getCenter(s.center),s.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=s}function Mm(r,e,t){const n=e.attributes,i=[];function o(s,a){return t.getDependency("accessor",s).then(function(l){r.setAttribute(a,l)})}for(const s in n){const a=af[s]||s.toLowerCase();a in r.attributes||i.push(o(n[s],a))}if(e.indices!==void 0&&!r.index){const s=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(s)}return yt.workingColorSpace!==Gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${yt.workingColorSpace}" not supported.`),dr(r,e),UT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?PT(r,e.targets,t):r})}const FT="/150-lab/assets/models/globe-hd.glb";function kT(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;const r=document.getElementById("shaderBackground");if(!r)return;window.specialColorsActive=!1,window.colorPhase=1;let e,t;Xh(()=>Promise.resolve().then(()=>vA),void 0).then(y=>{e=y.default,Xh(()=>Promise.resolve().then(()=>FA),void 0).then(R=>{t=R.default,e.registerPlugin(t),n(e)})}).catch(y=>{console.error("Error loading GSAP:",y)});function n(y,R){let O,V,Q,G,le,_e,xe,Ce;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(b&&b.color1&&b.color2&&(O=b.color1.value.clone(),V=b.color2.value.clone(),Q=b.waveSpeed.value,G=b.waveAmplitude.value,le=b.waveFrequency.value,_e=b.ambientLight.value,xe=b.directionalLight.value,Ce=b.yOffset.value),y.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:tt=>{b&&b.colorDarkness&&(b.colorDarkness.value=tt.progress*2,b.colorDarkness.value>=1.95?window.colorPhase===1&&(b.color1&&b.color1.value.set(O),b.color2&&b.color2.value.set(V),window.specialColorsActive=!0):O&&V&&window.colorPhase===1&&(b.color1&&b.color1.value.copy(O),b.color2&&b.color2.value.copy(V),window.specialColorsActive=!1),o())}}}),setTimeout(()=>{i(y)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}y.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:tt=>{const Se=tt.progress;P&&(Se>.01&&!P.visible?(P.visible=!0,w.visible=!0,l()):Se<=.01&&P.visible&&(P.visible=!1,w.visible=!1,l()),P.visible&&(P.traverse(mt=>{mt.isMesh&&mt.material&&(mt.material.transparent=!0,mt.material.opacity=Se)}),w.opacity=Se,a())),E&&(Se>.01&&!E.visible?(E.visible=!0,A.enabled=!0,c()):Se<=.01&&E.visible&&(E.visible=!1,A.enabled=!1,c()),v&&v.uniforms&&(Se>.01&&E.visible?(v.uniforms.startOpacity.value=A.startOpacity*Se,v.uniforms.endOpacity.value=A.endOpacity*Se):(v.uniforms.startOpacity.value=0,v.uniforms.endOpacity.value=0)))}}}),y.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:tt=>{const Se=tt.progress,mt=.15;if(!window.particlesFullyHidden&&Se>=mt?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&Se<mt*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){ye&&ye.uniforms&&ye.uniforms.opacity&&(ye.uniforms.opacity.value=0,Vt());return}const Nt=1-Math.min(Se/mt,1),Jn=.5*Math.pow(Nt,3);ye&&ye.uniforms&&ye.uniforms.opacity&&(ye.uniforms.opacity.value=Jn,Vt())}}}),y.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:tt=>{const Se=tt.progress;if(M){const fn=-322+120*(1-Math.pow(1-Se,3));if(M.position.y=fn,N&&N.__folders["Globe Model Controls"]){const rn=N.__folders["Globe Model Controls"].__folders.Position;if(rn&&rn.__controllers){for(let Jn of rn.__controllers)if(Jn.property==="positionY"){Jn.updateDisplay();break}}}}}}}),y.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:tt=>{if(!b||!b.color1||!b.color2)return;const Se=tt.progress;console.log("Hero travel area scroll trigger firing, progress:",Se),console.log("uniforms object:",!!b),console.log("uniforms.waveSpeed:",!!b.waveSpeed),console.log("Current waveSpeed value before change:",b.waveSpeed?b.waveSpeed.value:"N/A");const mt=2,Nt=mt+(.2-mt)*Se;console.log("Setting waveSpeed to:",Nt),b&&b.waveSpeed?(b.waveSpeed.value=Nt,console.log("waveSpeed value after assignment:",b.waveSpeed.value)):console.error("uniforms.waveSpeed is not available!");const fn=3,Jn=fn+(1-fn)*Se;console.log("Setting waveAmplitude to:",Jn),b&&b.waveAmplitude?(b.waveAmplitude.value=Jn,console.log("waveAmplitude value after assignment:",b.waveAmplitude.value)):console.error("uniforms.waveAmplitude is not available!");const Ut=2.2,Ln=Ut+(1-Ut)*Se;if(console.log("Setting waveFrequency to:",Ln),b&&b.waveFrequency?(b.waveFrequency.value=Ln,console.log("waveFrequency value after assignment:",b.waveFrequency.value)):console.error("uniforms.waveFrequency is not available!"),po(),Se>.1){console.log("Transitioning to Phase 2 colors - hero travel area",Se);const vn=new $e("#32c2d6"),bn=new $e("#004199"),na=new $e("#ff4848"),ir=new $e("#3f00f5"),au=Math.min(1,(Se-.1)/.9),Hh=au*au*(3-2*au),hv=vn.clone().lerp(na,Hh),pv=bn.clone().lerp(ir,Hh);b.color1.value.copy(hv),b.color2.value.copy(pv),window.colorPhase=2,window.specialColorsActive=!0,s()}else console.log("Reverting to Phase 1 colors - hero travel area"),b.color1.value.set("#32c2d6"),b.color2.value.set("#004199"),window.colorPhase=1,window.specialColorsActive=!0,s()}}}),y.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:tt=>{if(!b||!b.color1||!b.color2)return;const Se=tt.progress;Se>.1?(console.log("Transitioning to Phase 3 colors - events section entering viewport"),b.color1.value.set("#dcfff6"),b.color2.value.set("#5dff9d"),b.yOffset&&(b.yOffset.value=-.05),b.ambientLight.value=.4,b.directionalLight.value=.4,console.log("PHASE 3: TEMPORARILY DISABLED waveSpeed override to test interpolation"),b.waveAmplitude.value=1.2,b.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,s(),as(),po()):Se<=.1&&window.colorPhase===3&&(console.log("Reverting to Phase 2 colors - events section exiting viewport"),b.time.value=0,console.log("Reset time to 0 for consistent phase 2 transition behavior"),b.color1.value.set("#ff4848"),b.color2.value.set("#3f00f5"),b.yOffset&&Ce!==void 0&&(b.yOffset.value=Ce),_e!==void 0&&(b.ambientLight.value=_e),xe!==void 0&&(b.directionalLight.value=xe),console.log("PHASE 3 REVERT: Setting waveSpeed back to phase 2 value (0.2), waveAmplitude to 1.0, and waveFrequency to 1.0"),b.waveSpeed.value=.2,b.waveAmplitude.value=1,b.waveFrequency.value=1,window.colorPhase=2,window.specialColorsActive=!0,s(),as(),po()),o()}}}),y.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:tt=>{const mt=1-tt.progress,it=Math.pow(mt,3);P&&(P.visible=!0,P.traverse(Nt=>{Nt.isMesh&&Nt.material&&(Array.isArray(Nt.material)?Nt.material.forEach(fn=>{fn.transparent=!0,fn.opacity=it,fn.depthWrite=it>.1,fn.blending=qr,fn.needsUpdate=!0}):(Nt.material.transparent=!0,Nt.material.opacity=it,Nt.material.depthWrite=it>.1,Nt.material.blending=qr,Nt.material.needsUpdate=!0))}),it<.01&&(P.visible=!1),w.opacity=it,w.rotationPaused=it<.01,a()),E&&v&&v.uniforms&&(E.visible=it>.01,v.uniforms.startOpacity.value=A.startOpacity*it,v.uniforms.endOpacity.value=A.endOpacity*it,A.enabled=it>.01,c())}}}),y.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:tt=>{tt.progress<=.1&&Q!==void 0&&window.colorPhase===1&&(console.log("Reverting wave parameters to original values when scrolling up past #get-involved"),console.log("GET-INVOLVED REVERT: Setting waveSpeed back to originalWaveSpeed:",Q),b.waveSpeed&&(b.waveSpeed.value=Q),b.waveAmplitude&&(b.waveAmplitude.value=G),b.waveFrequency&&(b.waveFrequency.value=le),b.ambientLight&&(b.ambientLight.value=_e),b.directionalLight&&(b.directionalLight.value=xe),b.yOffset&&(b.yOffset.value=Ce),as(),po())}}});function Vt(tt){if(typeof N<"u"&&N&&N.__folders&&N.__folders["Particle System"]){const Se=N.__folders["Particle System"];if(Se&&Se.__controllers){for(let mt of Se.__controllers)if(mt.property==="value"&&mt.object===ye.uniforms.opacity){mt.updateDisplay();break}}}}console.log("Set up ScrollTrigger animations for shader, globe, overlay, and particles")}function i(y,R,O,V){if(!document.querySelector("#events")){console.warn("Could not find #events element for shader animation"),console.log("Waiting for DOM to be ready before trying again..."),document.addEventListener("DOMContentLoaded",()=>{i(y)});return}console.log("Events section found, setting up animation"),y.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:G=>{b&&b.colorDarkness&&(b.colorDarkness.value=2-G.progress*2,window.colorPhase===3?(console.log("Maintaining Phase 3 colors in events section"),b.color1&&b.color1.value.set("#dcfff6"),b.color2&&b.color2.value.set("#5dff9d"),b.ambientLight&&(b.ambientLight.value=.4),b.directionalLight&&(b.directionalLight.value=.4),b.waveSpeed&&(b.waveSpeed.value=.9),b.waveAmplitude&&(b.waveAmplitude.value=1.2),window.specialColorsActive=!0,s(),as(),po()):window.colorPhase===2?(console.log("Maintaining Phase 2 colors - reverting from events section"),b.color1&&b.color1.value.set("#ff4848"),b.color2&&b.color2.value.set("#3f00f5"),originalAmbientLight!==void 0&&b.ambientLight&&(b.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&b.directionalLight&&(b.directionalLight.value=originalDirectionalLight),originalWaveAmplitude!==void 0&&b.waveAmplitude&&(b.waveAmplitude.value=originalWaveAmplitude),window.specialColorsActive=!0,s(),as(),po()):(console.log("Maintaining Phase 1 colors - reverting from events section"),b.color1&&b.color1.value.set("#32c2d6"),b.color2&&b.color2.value.set("#004199"),originalAmbientLight!==void 0&&b.ambientLight&&(b.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&b.directionalLight&&(b.directionalLight.value=originalDirectionalLight),originalWaveSpeed!==void 0&&b.waveSpeed&&(b.waveSpeed.value=originalWaveSpeed),originalWaveAmplitude!==void 0&&b.waveAmplitude&&(b.waveAmplitude.value=originalWaveAmplitude),originalWaveFrequency!==void 0&&b.waveFrequency&&(b.waveFrequency.value=originalWaveFrequency),window.specialColorsActive=!0,s(),as(),po()),o())}}})}function o(){const y=window.gui,R=window.uniforms;if(typeof y<"u"&&y&&y.__folders&&y.__folders["Color Controls"]){const O=y.__folders["Color Controls"];if(O&&O.__controllers){for(let V of O.__controllers)if(V.property==="value"&&V.object===R.colorDarkness){V.updateDisplay();break}}}}function s(){const y=window.gui,R=window.uniforms;if(typeof y<"u"&&y&&y.__folders&&y.__folders["Color Controls"]){const O=y.__folders["Color Controls"];O&&O.__controllers&&O.__controllers.forEach(V=>{if(V.property==="color"&&V.__color){if(V.property==="color"&&V.__li&&V.__li.querySelector(".property-name").textContent==="Color 1"){const G="#"+R.color1.value.getHexString();V.setValue(G)}else if(V.property==="color"&&V.__li&&V.__li.querySelector(".property-name").textContent==="Color 2"){const G="#"+R.color2.value.getHexString();V.setValue(G)}}})}}function a(){if(typeof N<"u"&&N&&N.__folders&&N.__folders["Globe Model Controls"]&&N.__folders["Globe Model Controls"].__folders&&N.__folders["Globe Model Controls"].__folders.Material){const y=N.__folders["Globe Model Controls"].__folders.Material;if(y&&y.__controllers)for(let R of y.__controllers)R.property==="opacity"&&R.updateDisplay()}}function l(){if(typeof N<"u"&&N&&N.__folders&&N.__folders["Globe Model Controls"]){const y=N.__folders["Globe Model Controls"];if(y&&y.__controllers){for(let R of y.__controllers)if(R.property==="visible"){R.updateDisplay();break}}}}function c(){if(typeof N<"u"&&N&&N.__folders&&N.__folders["Gradient Overlay Controls"]){const y=N.__folders["Gradient Overlay Controls"];if(y&&y.__controllers){for(let R of y.__controllers)if(R.property==="enabled"){R.updateDisplay();break}}}}function u(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const d=window.innerWidth,f=u();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const h=new IE({canvas:r,alpha:!0});h.setSize(d,f),h.setPixelRatio(window.devicePixelRatio);const _=new yp,g=new yp;let m=0;const p={zoom:2.471,zPosition:1},S=new Qc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);S.position.z=p.zPosition,S.zoom=p.zoom,S.updateProjectionMatrix();const M=new _r;M.position.y=-322,M.frustumCulled=!0,_.add(M);let v,E;const A={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function C(){v=new xi({transparent:!0,uniforms:{startOpacity:{value:A.startOpacity},endOpacity:{value:A.endOpacity},overlayColor:{value:new $e(A.color)},offsetY:{value:A.offsetY},heightMultiplier:{value:A.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:vi});const y=window.innerHeight,R=S.right-S.left,O=S.top-S.bottom,V=y*.66*(O/y),Q=new Ri(R,V);E=new Hn(Q,v),E.rotation.set(0,0,0),E.position.x=0,E.position.y=A.yOffset*O,E.position.z=-100,E.frustumCulled=!1,E.renderOrder=9999,E.visible=A.enabled,_.add(E),console.log("Created gradient overlay with fixed 66% viewport height")}function D(){if(!E)return;E.rotation.set(0,0,0),E.position.x=0;const y=S.top-S.bottom;E.position.y=A.yOffset*y,E.position.z=-100}C();const w={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},x=new nT;let P;x.load(FT,y=>{P=y.scene;let O=new Fi().setFromObject(P).getCenter(new W),V=new _r;V.add(P),P.position.set(-O.x,-O.y,-O.z),P=V,P.visible=w.visible,P.frustumCulled=!0,P.traverse(le=>{le.isMesh&&(le.frustumCulled=!0)}),M.add(P),P.position.set(w.positionX,w.positionY,w.positionZ),P.rotation.set(w.rotationX*Math.PI/180,w.rotationY*Math.PI/180,w.rotationZ*Math.PI/180),w.responsive?j():(P.scale.set(w.scale,w.scale,w.scale),Je());const Q=je.addFolder("Material");let G=0;P.traverse(le=>{if(le.isMesh&&le.material){const _e=le.material;if(G++,_e.isMeshStandardMaterial||_e.isMeshPhongMaterial){_e.metalness!==void 0&&Q.add({metalness:_e.metalness},"metalness",0,1).name(`Metalness${G>1?" "+G:""}`).onChange(Ce=>{_e.metalness=Ce}),_e.roughness!==void 0&&Q.add({roughness:_e.roughness},"roughness",0,1).name(`Roughness${G>1?" "+G:""}`).onChange(Ce=>{_e.roughness=Ce}),_e.shininess!==void 0&&Q.add({shininess:_e.shininess},"shininess",0,100).name(`Shininess${G>1?" "+G:""}`).onChange(Ce=>{_e.shininess=Ce}),Q.add({opacity:_e.opacity},"opacity",0,1).name(`Opacity${G>1?" "+G:""}`).onChange(Ce=>{_e.opacity=Ce,_e.transparent=Ce<1});const xe=_e.emissive?"#"+_e.emissive.getHexString():"#000000";Q.addColor({color:xe},"color").name(`Emissive Color${G>1?" "+G:""}`).onChange(Ce=>{_e.emissive&&_e.emissive.set(Ce)})}}}),console.log("Globe model loaded successfully")},y=>{console.log(`Globe model ${y.loaded/y.total*100}% loaded`)},y=>{console.error("Error loading globe model:",y)}),window.uniforms={time:{value:0},resolution:{value:new gt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new $e(3326678)},color2:{value:new $e(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:0},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.6},flowDirection:{value:new gt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new W(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const b=window.uniforms,B=`
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
  `,X=`
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
  `,Y=new Ri(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),q=new xi({vertexShader:B,fragmentShader:X,uniforms:b,transparent:!0,side:vi}),$=new Hn(Y,q);_.add($),window.gui=new tT({width:300,closed:!0});const N=window.gui;N.domElement.style.position="absolute",N.domElement.style.top="10px",N.domElement.style.right="10px";const fe=N.domElement.querySelector(".close-button");fe&&(fe.innerHTML="Open Controls",fe.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=N.closed?"Open Controls":"Close Controls"},50)}));const U=N.addFolder("Camera Controls");U.add(p,"zoom",.1,5).name("Zoom Level").step(.001).onChange(y=>{S.zoom=y,S.updateProjectionMatrix()}),U.close();const ge=N.addFolder("Animation Speed Controls");ge.add(b.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(y=>{b.mainSpeed.value=y}),ge.add(b.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(y=>{b.waveSpeed.value=y}),ge.add(b.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(y=>{b.noiseSpeed.value=y}),ge.add(b.colorCycleSpeed,"value",1e-4,5).name("Color Cycle Speed").step(1e-4).onChange(y=>{b.colorCycleSpeed.value=y}),ge.open();const ze=N.addFolder("Color Controls"),Ze="#"+b.color1.value.getHexString(),J="#"+b.color2.value.getHexString();ze.addColor({color:Ze},"color").name("Color 1").onChange(y=>{typeof y=="string"?b.color1.value.set(y):b.color1.value.setRGB(y.r/255,y.g/255,y.b/255)}),ze.addColor({color:J},"color").name("Color 2").onChange(y=>{typeof y=="string"?b.color2.value.set(y):b.color2.value.setRGB(y.r/255,y.g/255,y.b/255)}),ze.add(b.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(y=>{b.colorDarkness.value=y}),ze.add(b.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(y=>{b.colorWaveInfluence.value=y}),ze.add(b.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(y=>{b.colorFrequencyShift.value=y}),ze.add(b.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(y=>{b.colorAmplitudeEffect.value=y}),ze.open();const se=N.addFolder("Wave Controls");se.add(b.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(y=>{b.waveAmplitude.value=y}),se.add(b.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(y=>{b.waveFrequency.value=y}),se.add(b.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(y=>{b.waveDepth.value=y}),se.add(b.noiseScale,"value",0,5).name("Noise Scale").onChange(y=>{b.noiseScale.value=y}),se.add(b.noiseInfluence,"value",0,1).name("Noise Influence").onChange(y=>{b.noiseInfluence.value=y}),se.add(b.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(y=>{b.layerOffset.value=y});const Re=se.addFolder("Flow Direction");Re.add(b.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(y=>{b.flowDirection.value.x=y}),Re.add(b.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(y=>{b.flowDirection.value.y=y});const ue=N.addFolder("Appearance Controls"),Me=N.addFolder("Film Noise Controls");Me.add(b.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(y=>{b.filmNoiseIntensity.value=y}),Me.add(b.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(y=>{b.filmNoiseSpeed.value=y}),Me.add(b.filmGrainSize,"value",.5,50).name("Grain Size").onChange(y=>{b.filmGrainSize.value=y}),Me.add(b.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(y=>{b.filmScratchIntensity.value=y}),ue.add(b.xOffset,"value",-1,1).step(.001).name("X Position").onChange(y=>{b.xOffset.value=y}),ue.add(b.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(y=>{b.yOffset.value=y}),ue.add(b.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(y=>{b.fadeWidth.value=y}),ue.add(b.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(y=>{b.topEdgeSoftness.value=y}),ue.add(b.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(y=>{b.bottomEdgeSoftness.value=y}),ue.add(b.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(y=>{b.leftEdgeSoftness.value=y}),ue.add(b.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(y=>{b.rightEdgeSoftness.value=y}),ue.add(b.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(y=>{b.leftCornerRoundness.value=y}),ue.add(b.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(y=>{b.rightCornerRoundness.value=y}),ue.add(b.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(y=>{b.edgeDepth.value=y}),ue.add(b.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(y=>{b.edgeContrast.value=y}),ue.add(b.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(y=>{b.edgeNoiseAmount.value=y}),ue.add(b.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(y=>{b.edgeNoiseScale.value=y});const Ye=N.addFolder("Bottom Wave Edge Controls");Ye.add(b.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(y=>{b.bottomWaveEnabled.value=y,P&&w.responsive&&Je()}),Ye.add(b.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(y=>{b.bottomWaveDepth.value=y,P&&w.responsive&&Je()}),Ye.add(b.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(y=>{b.bottomWaveWidth.value=y}),Ye.add(b.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(y=>{b.bottomWaveSpeed.value=y}),Ye.add(b.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(y=>{b.bottomWaveOffset.value=y});const Pe=N.addFolder("Lighting Controls");Pe.add(b.ambientLight,"value",0,1).name("Ambient Light").onChange(y=>{b.ambientLight.value=y}),Pe.add(b.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(y=>{b.directionalLight.value=y}),Pe.add(b.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(y=>{b.specularStrength.value=y}),Pe.add(b.shininess,"value",1,128).name("Shininess").onChange(y=>{b.shininess.value=y});const rt=Pe.addFolder("Light Direction");rt.add(b.lightDirection.value,"x",-1,1).name("X").onChange(()=>{b.lightDirection.value.normalize()}),rt.add(b.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{b.lightDirection.value.normalize()}),rt.add(b.lightDirection.value,"z",0,1).name("Z").onChange(()=>{b.lightDirection.value.normalize()});const je=N.addFolder("Globe Model Controls"),Ue=new u_(16777215,10);Ue.position.set(1,1,1),_.add(Ue);const k=new Bx(16777215,.5);_.add(k);const xt=je.addFolder("Lighting");xt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(y=>{Ue.intensity=y}),Ue.intensity=3,xt.add({intensity:k.intensity},"intensity",0,5).name("Ambient Light").onChange(y=>{k.intensity=y}),je.add(w,"visible").name("Show Globe").onChange(y=>{P&&(P.visible=y)}),je.add(w,"scale",.1,50).name("Size").step(.1).onChange(y=>{P&&(w.baseScale=y,P.scale.set(y,y,y))}),je.add(w,"responsive").name("Responsive Size").onChange(y=>{!y&&P?P.scale.set(w.baseScale,w.baseScale,w.baseScale):y&&j()}),je.add({resizeGlobe:function(){P&&j()}},"resizeGlobe").name("Force Resize"),je.add({positionBehindWave:function(){P&&Je()}},"positionBehindWave").name("Position Behind Wave");function Je(){if(!P)return;const y=window.innerWidth,R=window.innerHeight;if(y<=640){P.position.y=192,P.position.z=-10;for(let G=0;G<be.__controllers.length;G++){const le=be.__controllers[G];le.property==="positionY"?le.setValue(192):le.property==="positionZ"&&le.setValue(-10)}console.log("Positioned globe for mobile viewport at Y: 192, Z: -10");return}const O=b.bottomWaveEnabled.value,V=b.bottomWaveDepth.value,Q=b.edgeDepth.value;if(O){const G=R*V*Q*.5,_e=(S.top-S.bottom)/S.zoom/R,xe=-G*_e-R*.1*_e,Ce=-10;P.position.y=xe,P.position.z=Ce;for(let vt=0;vt<be.__controllers.length;vt++){const Rt=be.__controllers[vt];Rt.property==="positionY"?Rt.setValue(xe):Rt.property==="positionZ"&&Rt.setValue(Ce)}console.log(`Positioned globe behind bottom wave at Y: ${xe.toFixed(2)}, Z: ${Ce}`)}}function j(){if(!P||!w.responsive)return;const y=window.innerWidth,R=y*.9,O={x:P.scale.x,y:P.scale.y,z:P.scale.z};try{P.scale.set(1,1,1),P.updateMatrixWorld(!0);const V=new Fi().setFromObject(P),Q=V.max.x-V.min.x;P.scale.set(O.x,O.y,O.z);const le=(S.right-S.left)/S.zoom/y,xe=R*le/Q;P.scale.set(xe,xe,xe);for(let Ce=0;Ce<je.__controllers.length;Ce++)if(je.__controllers[Ce].property==="scale"){je.__controllers[Ce].setValue(xe);break}console.log(`Updated globe size: ${R.toFixed(0)}px (90vw), Scale: ${xe.toFixed(2)}, Original width: ${Q.toFixed(2)}`),Je()}catch(V){console.error("Error updating globe size:",V),P.scale.set(O.x,O.y,O.z)}}const be=je.addFolder("Position");be.add(w,"positionX",-500,500).name("X Position").step(1).onChange(y=>{P&&(P.position.x=y)}),be.add(w,"positionY",-500,500).name("Y Position").step(1).onChange(y=>{P&&(P.position.y=y)}),be.add(w,"positionZ",-500,500).name("Z Position").step(1).onChange(y=>{P&&(P.position.z=y)});const nt=je.addFolder("Rotation");nt.add(w,"rotationX",0,360).name("X Rotation").step(1).onChange(y=>{P&&(P.rotation.x=y*Math.PI/180)}),nt.add(w,"rotationY",0,360).name("Y Rotation").step(1).onChange(y=>{P&&(P.rotation.y=y*Math.PI/180)}),nt.add(w,"rotationZ",0,360).name("Z Rotation").step(1).onChange(y=>{P&&(P.rotation.z=y*Math.PI/180)}),je.add(w,"autoRotate").name("Auto Rotate").onChange(y=>{w.autoRotate=y}),je.add(w,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(y=>{w.baseRotateSpeed=y}),je.add(w,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(y=>{w.scrollRotateSpeed=y}),je.open();const Fe=N.addFolder("Gradient Overlay Controls");Fe.add(A,"enabled").name("Show Overlay").onChange(y=>{E&&(E.visible=y)});const He=Fe.add(A,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(y=>{v&&(v.uniforms.startOpacity.value=y)});He.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const wt=Fe.add(A,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(y=>{v&&(v.uniforms.endOpacity.value=y)});wt.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",Fe.add(A,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(y=>{E&&D()}),Fe.add(A,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(y=>{v&&(v.uniforms.offsetY.value=y)}),Fe.add(A,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(y=>{v&&(v.uniforms.heightMultiplier.value=y)}),Fe.addColor(A,"color").name("Color").onChange(y=>{v&&v.uniforms.overlayColor.value.set(y)}),Fe.add({debugOverlay:function(){if(v){const y=v.uniforms.startOpacity.value,R=v.uniforms.endOpacity.value;v.uniforms.startOpacity.value=1,v.uniforms.endOpacity.value=1,v.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",E.position),console.log("Camera position:",S.position),setTimeout(()=>{v.uniforms.startOpacity.value=y,v.uniforms.endOpacity.value=R,v.uniforms.overlayColor.value.set(A.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),Fe.open();let I=276,T=new Float32Array(I*3),H=new Float32Array(I*3),ee=new Float32Array(I*3),ne=0,te=0;const ie={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let me=window.innerHeight*ie.verticalSpread;function Ie(){const y=new Float32Array(I);for(let R=0;R<I;R++){const O=R*3,V=Math.random(),Q=ie.sizeMin+V*(ie.sizeMax-ie.sizeMin);y[R]=Q/ye.uniforms.baseSize.value;const G=new $e(F.color),le=.8+V*.6;ee[O]=G.r*le,ee[O+1]=G.g*le,ee[O+2]=G.b*le}he.setAttribute("size",new Lt(y,1)),he.attributes.position.needsUpdate=!0,he.attributes.color.needsUpdate=!0,he.attributes.size.needsUpdate=!0}for(let y=0;y<I;y++){const R=y*3;T[R]=(Math.random()-.5)*window.innerWidth,T[R+1]=(Math.random()-.5)*me+ie.verticalOffset,T[R+2]=Math.random()*500-250,H[R]=(Math.random()-.5)*.5,H[R+1]=(Math.random()-.5)*.5,H[R+2]=(Math.random()-.5)*.2;const O=new $e("#25e5ff");ee[R]=O.r,ee[R+1]=O.g,ee[R+2]=O.b}const he=new Mi;he.setAttribute("position",new Lt(T,3)),he.setAttribute("color",new Lt(ee,3));const de=Ee();function Ee(){const y=document.createElement("canvas");y.width=256,y.height=256;const R=y.getContext("2d"),O=R.createRadialGradient(y.width/2,y.height/2,0,y.width/2,y.height/2,y.width/2);O.addColorStop(0,"rgba(255, 255, 255, 1.0)"),O.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),O.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),O.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),O.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),O.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),O.addColorStop(1,"rgba(255, 255, 255, 0)"),R.fillStyle=O,R.fillRect(0,0,y.width,y.height),R.beginPath(),R.moveTo(y.width/2,y.width*.3),R.lineTo(y.width/2,y.width*.7),R.moveTo(y.width*.3,y.height/2),R.lineTo(y.width*.7,y.height/2),R.moveTo(y.width*.35,y.height*.35),R.lineTo(y.width*.65,y.height*.65),R.moveTo(y.width*.65,y.height*.35),R.lineTo(y.width*.35,y.height*.65),R.strokeStyle="rgba(255, 255, 255, 1.0)",R.lineWidth=4,R.stroke();const V=R.createRadialGradient(y.width/2,y.height/2,y.width*.2,y.width/2,y.height/2,y.width*.7);V.addColorStop(0,"rgba(255, 255, 255, 0.3)"),V.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),V.addColorStop(1,"rgba(255, 255, 255, 0)"),R.globalCompositeOperation="lighter",R.fillStyle=V,R.fillRect(0,0,y.width,y.height);const Q=new an(y);return Q.needsUpdate=!0,Q}const ye=new xi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:de},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),We=new Jd(he,ye);We.frustumCulled=!0,g.add(We);const pe=N.addFolder("Particle System"),Ke={count:I};pe.add(Ke,"count",100,1e3,10).name("Particle Count").onChange(y=>{I=Math.floor(y);const R=new Float32Array(I*3),O=new Float32Array(I*3),V=new Float32Array(I*3);for(let Q=0;Q<I;Q++){const G=Q*3;if(Q<T.length/3)R[G]=T[G],R[G+1]=T[G+1],R[G+2]=T[G+2],O[G]=H[G],O[G+1]=H[G+1],O[G+2]=H[G+2],V[G]=ee[G],V[G+1]=ee[G+1],V[G+2]=ee[G+2];else{R[G]=(Math.random()-.5)*window.innerWidth,R[G+1]=(Math.random()-.5)*me+ie.verticalOffset,R[G+2]=Math.random()*500-250,O[G]=(Math.random()-.5)*.5,O[G+1]=(Math.random()-.5)*.5,O[G+2]=(Math.random()-.5)*.2;const le=new $e(F.color);V[G]=le.r,V[G+1]=le.g,V[G+2]=le.b}}T=R,H=O,ee=V,he.setAttribute("position",new Lt(T,3)),he.setAttribute("color",new Lt(ee,3)),he.attributes.position.needsUpdate=!0,he.attributes.color.needsUpdate=!0,Ie()});const F={color:"#25e5ff"};pe.addColor(F,"color").name("Particle Color").onChange(y=>{const R=new $e(y);for(let O=0;O<I;O++){const V=O*3;ee[V]=R.r,ee[V+1]=R.g,ee[V+2]=R.b}he.setAttribute("color",new Lt(ee,3)),he.attributes.color.needsUpdate=!0}),pe.add(ye.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(y=>{Ie()}),pe.add(ye.uniforms.opacity,"value",0,1,.1).name("Opacity"),pe.add(ye.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(y=>{ye.uniforms.brightness.value=y});const we={intensity:1.5};pe.add(we,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(y=>{ye.uniforms.opacity.value=y});const ae={enabled:!1},Te=pe.add(ae,"enabled").name("Size Attenuation").onChange(y=>{y?ye.vertexShader=`
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
        `:ye.vertexShader=`
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
        `,ye.needsUpdate=!0,Ie()}),oe=document.createElement("div");oe.className="gui-tooltip",oe.textContent="When enabled, particles appear smaller as they move further away",oe.style.position="absolute",oe.style.backgroundColor="rgba(0,0,0,0.8)",oe.style.color="#fff",oe.style.padding="5px",oe.style.borderRadius="3px",oe.style.fontSize="11px",oe.style.zIndex="10000",oe.style.display="none",document.body.appendChild(oe);const re=Te.domElement;re.addEventListener("mouseenter",y=>{const R=re.getBoundingClientRect();oe.style.left=R.right+"px",oe.style.top=R.top+"px",oe.style.display="block"}),re.addEventListener("mouseleave",()=>{oe.style.display="none"});let Oe=0;window.addEventListener("scroll",()=>{ne=window.scrollY});let Ne=[],ot={x:0,y:0},Ae={x:0,y:0},Ve=0;const Le={enabled:!0,spawnRate:.455,maxParticles:120,baseSize:1.8,fadeInSpeed:.75,fadeOutSpeed:1,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffset:.22,minLifetime:1.5,maxLifetime:5},ve=new Mi,et=new xi({uniforms:{baseSize:{value:Le.baseSize},map:{value:de},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),Ge=new Jd(ve,et);g.add(Ge);function Qe(y,R){const O=y/window.innerWidth*2-1,V=-(R/window.innerHeight)*2+1,Q=O*(S.right-S.left)/2/S.zoom,G=V*(S.top-S.bottom)/2/S.zoom;return{x:Q,y:G}}function Wt(y,R){return{id:Ve++,position:{x:y,y:R,z:Math.random()*100-50},targetPosition:{x:y,y:R},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Le.minLifetime+Math.random()*(Le.maxLifetime-Le.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function st(){if(Ne.length===0){ve.attributes.position&&(ve.setAttribute("position",new Lt(new Float32Array(0),3)),ve.setAttribute("color",new Lt(new Float32Array(0),3)),ve.setAttribute("size",new Lt(new Float32Array(0),1)),ve.setAttribute("opacity",new Lt(new Float32Array(0),1)));return}const y=new Float32Array(Ne.length*3),R=new Float32Array(Ne.length*3),O=new Float32Array(Ne.length),V=new Float32Array(Ne.length);for(let Q=0;Q<Ne.length;Q++){const G=Ne[Q],le=Q*3;y[le]=G.position.x,y[le+1]=G.position.y,y[le+2]=G.position.z,R[le]=G.color.r,R[le+1]=G.color.g,R[le+2]=G.color.b,O[Q]=G.size,V[Q]=G.opacity}ve.setAttribute("position",new Lt(y,3)),ve.setAttribute("color",new Lt(R,3)),ve.setAttribute("size",new Lt(O,1)),ve.setAttribute("opacity",new Lt(V,1)),ve.attributes.position.needsUpdate=!0,ve.attributes.color.needsUpdate=!0,ve.attributes.size.needsUpdate=!0,ve.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",y=>{if(!Le.enabled)return;Ae.x=ot.x,Ae.y=ot.y,ot.x=y.clientX,ot.y=y.clientY;const R=ot.x-Ae.x,O=ot.y-Ae.y;if(Math.sqrt(R*R+O*O)>1&&Ne.length<Le.maxParticles&&Math.random()<Le.spawnRate){const Q=Qe(ot.x,ot.y),G=Le.spawnOffset*50,le=Math.random()*Math.PI*2,_e=Math.cos(le)*G*Math.random(),xe=Math.sin(le)*G*Math.random(),Ce=Wt(Q.x+_e,Q.y+xe);Ne.push(Ce)}});function It(){if(Ne.length===0)return;const y=Qe(ot.x,ot.y);for(let R=Ne.length-1;R>=0;R--){const O=Ne[R];O.life+=.016,O.targetPosition.x=y.x,O.targetPosition.y=y.y;const V=O.trailSpeed*Le.trailLength;O.position.x+=(O.targetPosition.x-O.position.x)*V,O.position.y+=(O.targetPosition.y-O.position.y)*V,O.position.x+=(Math.random()-.5)*2*Le.jitterAmount,O.position.y+=(Math.random()-.5)*2*Le.jitterAmount;const Q=O.life/O.maxLife;if(Q<.15){O.fadePhase="in";const G=Q/.15,le=1-Math.pow(1-G,2);O.opacity=le*Le.fadeInSpeed}else if(Q<.65)O.fadePhase="hold",O.opacity=Le.fadeInSpeed;else{O.fadePhase="out";const G=(Q-.65)/.35,le=Math.pow(1-G,2);O.opacity=le*Le.fadeInSpeed*Le.fadeOutSpeed}(O.life>=O.maxLife||O.opacity<=0)&&Ne.splice(R,1)}st()}const bt=N.addFolder("Mouse Follow Particles");bt.add(Le,"enabled").name("Enable Mouse Particles").onChange(y=>{y||(Ne=[],st())}),bt.add(Le,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(y=>{Le.spawnRate=y}),bt.add(Le,"maxParticles",10,50,1).name("Max Particles").onChange(y=>{for(Le.maxParticles=y;Ne.length>y;)Ne.pop();st()}),bt.add(Le,"baseSize",2,10,.5).name("Particle Size").onChange(y=>{et.uniforms.baseSize.value=y}),bt.add(Le,"trailLength",.1,1,.1).name("Trail Length").onChange(y=>{Le.trailLength=y}),bt.add(Le,"speedVariation",0,1,.1).name("Speed Variation").onChange(y=>{Le.speedVariation=y}),bt.add(Le,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(y=>{Le.jitterAmount=y}),bt.add(Le,"spawnOffset",0,1,.05).name("Spawn Offset").onChange(y=>{Le.spawnOffset=y}),bt.add(Le,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(y=>{Le.fadeInSpeed=y}),bt.add(Le,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(y=>{Le.fadeOutSpeed=y}),bt.close();function Ct(){const y=he.attributes.position.array,R=ie.previousOffset||0,O=ie.verticalOffset-R;ie.previousOffset=ie.verticalOffset;for(let V=0;V<I;V++){const Q=V*3;y[Q+1]+=O;const G=y[Q+1]-ie.verticalOffset,le=me/2;G>le?y[Q+1]=-le+ie.verticalOffset:G<-le&&(y[Q+1]=le+ie.verticalOffset)}he.attributes.position.needsUpdate=!0}function Et(){const y=he.attributes.position.array,R=he.attributes.color.array,O=he.attributes.size?he.attributes.size.array:null;Oe+=.01;const V=(ne-te)*ie.scrollSpeed;if(te=ne*(1-ie.damping)+te*ie.damping,!window.particlesMovementPaused){for(let Q=0;Q<I;Q++){const G=Q*3,le=O?(O[Q]-ie.sizeMin)/(ie.sizeMax-ie.sizeMin):.5,_e=ie.floatSpeed*(.5+le*.5);y[G]+=H[G]*_e,y[G+1]+=H[G+1]*_e,y[G+2]+=H[G+2]*_e,y[G+1]+=V*(.5+le*.5),Math.abs(y[G])>window.innerWidth/2&&(H[G]*=-1);const xe=y[G+1]-ie.verticalOffset,Ce=me/2;xe>Ce?y[G+1]=-Ce+ie.verticalOffset:xe<-Ce&&(y[G+1]=Ce+ie.verticalOffset),Math.abs(y[G+2])>250&&(H[G+2]*=-1)}he.attributes.position.needsUpdate=!0}for(let Q=0;Q<I;Q++){const G=Q*3,le=O?(O[Q]-ie.sizeMin)/(ie.sizeMax-ie.sizeMin):.5,_e=new $e(F.color),xe=.2*Math.sin(Oe+Q*.1)+.9,Ce=.8+le*.6;R[G]=_e.r*xe*Ce,R[G+1]=_e.g*xe*Ce,R[G+2]=_e.b*xe*Ce}he.attributes.color.needsUpdate=!0,requestAnimationFrame(Et)}Et();function St(){if(requestAnimationFrame(St),b.time.value+=.001,It(),!window.particlesFullyHidden&&ye.uniforms.opacity.value<m&&(ye.uniforms.opacity.value+=.002,ye.uniforms.opacity.value>m&&(ye.uniforms.opacity.value=m)),window.particlesFullyHidden&&ye.uniforms.opacity.value>0&&(ye.uniforms.opacity.value=0),P&&w.autoRotate&&!w.rotationPaused){const y=z?w.scrollRotateSpeed:w.baseRotateSpeed;P.rotation.y+=y*.01}E&&(E.rotation.set(0,0,0),D()),h.autoClear=!0,h.render(_,S),(!window.particlesFullyHidden||Ne.length>0&&Le.enabled)&&(h.autoClear=!1,h.render(g,S))}St(),document.addEventListener("veryEarlyParticleFade",()=>{m=.1}),document.addEventListener("particleFadeStart",()=>{m=.3}),document.addEventListener("heroAnimationComplete",()=>{m=.5});function un(){if(E){const y=window.innerHeight,R=S.right-S.left,V=(S.top-S.bottom)/y,Q=R,G=y*.66*V;E.geometry.dispose(),E.geometry=new Ri(Q,G),E.rotation.set(0,0,0),D(),console.log("Updated overlay size to 66% viewport height")}}let Tt,Bt;function dn(){const y=window.innerWidth,R=u();if(h.setSize(y,R),S.left=-y/2,S.right=y/2,S.top=R/2,S.bottom=-R/2,S.updateProjectionMatrix(),b.resolution.value.set(y,R),$.geometry.dispose(),$.geometry=new Ri(y,R,y/10,R/10),me=R*ie.verticalSpread,typeof N<"u"&&N&&N.__folders["Particle System"]){const O=N.__folders["Particle System"];if(O&&O.__controllers){for(let V=0;V<O.__controllers.length;V++)if(O.__controllers[V].property==="verticalOffset"){O.__controllers[V].min(-R*3),O.__controllers[V].max(R*2);break}}}if(P&&w.responsive){clearTimeout(Bt),Bt=setTimeout(()=>{j()},150);for(let O=0;O<be.__controllers.length;O++){const V=be.__controllers[O];V.property==="positionX"?(V.min(-y/2),V.max(y/2)):V.property==="positionY"&&(V.min(-R/2),V.max(R/2))}}un()}window.addEventListener("resize",()=>{clearTimeout(Tt),clearTimeout(Bt),P&&w.responsive&&(Bt=setTimeout(()=>{j()},150)),Tt=setTimeout(dn,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(Tt),clearTimeout(Bt),P&&w.responsive&&(Bt=setTimeout(()=>{j()},300)),Tt=setTimeout(dn,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Bt);const y=window.innerWidth,R=u();window.lastKnownDimensions||(window.lastKnownDimensions={width:y,height:R});const O=Math.abs(y-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,V=Math.abs(R-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;O>.05||V>.05?(window.lastKnownDimensions.width=y,window.lastKnownDimensions.height=R,P&&w.responsive&&(Bt=setTimeout(()=>{j()},150)),setTimeout(dn,100),console.log(`Tab refocused with significant viewport change: Width ${O.toFixed(2)}%, Height ${V.toFixed(2)}%`)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:u()}});let jt=u();function $t(){const y=u();Math.abs(y-jt)>50&&(dn(),jt=y),requestAnimationFrame($t)}$t(),window.addEventListener("keydown",y=>{if((y.key==="+"||y.key==="=")&&(p.zoom=Math.min(p.zoom+.1,5),S.zoom=p.zoom,S.updateProjectionMatrix(),typeof N<"u"&&N&&N.__folders["Camera Controls"])){const R=N.__folders["Camera Controls"];if(R&&R.__controllers){for(let O=0;O<R.__controllers.length;O++)if(R.__controllers[O].property==="zoom"){R.__controllers[O].updateDisplay();break}}}if((y.key==="-"||y.key==="_")&&(p.zoom=Math.max(p.zoom-.1,.1),S.zoom=p.zoom,S.updateProjectionMatrix(),typeof N<"u"&&N&&N.__folders["Camera Controls"])){const R=N.__folders["Camera Controls"];if(R&&R.__controllers){for(let O=0;O<R.__controllers.length;O++)if(R.__controllers[O].property==="zoom"){R.__controllers[O].updateDisplay();break}}}}),pe.add(ie,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(y=>{ie.scrollSpeed=y}),pe.add(ie,"damping",.8,.99,.01).name("Scroll Damping").onChange(y=>{ie.damping=y}),pe.add(ie,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(y=>{const R=me;me=window.innerHeight*y;const O=me/R,V=he.attributes.position.array;for(let Q=0;Q<I;Q++){const G=Q*3,_e=(V[G+1]-ie.verticalOffset)*O;V[G+1]=_e+ie.verticalOffset,Math.abs(_e)>me/2&&(V[G+1]=(Math.random()-.5)*me+ie.verticalOffset)}he.attributes.position.needsUpdate=!0}),pe.add(ie,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(y=>{ie.previousOffset===void 0&&(ie.previousOffset=0),ie.verticalOffset=y,Ct()}),pe.add(ie,"sizeMin",1,5,.01).name("Min Particle Size").onChange(y=>{if(ie.sizeMin=y,ie.sizeMin>=ie.sizeMax&&(ie.sizeMax=ie.sizeMin+1,typeof N<"u"&&N&&N.__folders["Particle System"])){const R=N.__folders["Particle System"];if(R&&R.__controllers){for(let O=0;O<R.__controllers.length;O++)if(R.__controllers[O].property==="sizeMax"){R.__controllers[O].updateDisplay();break}}}Ie()}),pe.add(ie,"sizeMax",5,10,.01).name("Max Particle Size").onChange(y=>{if(ie.sizeMax=y,ie.sizeMax<=ie.sizeMin&&(ie.sizeMin=ie.sizeMax-1,typeof N<"u"&&N&&N.__folders["Particle System"])){const R=N.__folders["Particle System"];if(R&&R.__controllers){for(let O=0;O<R.__controllers.length;O++)if(R.__controllers[O].property==="sizeMin"){R.__controllers[O].updateDisplay();break}}}Ie()}),pe.add(ie,"floatSpeed",.1,3,.1).name("Float Speed").onChange(y=>{ie.floatSpeed=y}),Ie();const L=he.attributes.position.array;for(let y=0;y<I;y++){const R=y*3;L[R+1]=(Math.random()-.5)*me+ie.verticalOffset}he.attributes.position.needsUpdate=!0,pe.add(ye.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(y=>{ye.uniforms.haloStrength.value=y}),pe.add(ye.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(y=>{ye.uniforms.haloSize.value=y});let z=!1,K;window.addEventListener("scroll",()=>{z=!0,K&&clearTimeout(K),K=setTimeout(()=>{z=!1},150)})}function as(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function po(){const r=window.gui;if(typeof r>"u"||!r||!r.__folders){console.log("GUI not available for wave update");return}const e=window.uniforms;if(console.log("Updating wave GUI - waveSpeed:",e.waveSpeed.value,"waveAmplitude:",e.waveAmplitude.value,"waveFrequency:",e.waveFrequency.value),console.log("Available GUI folders:",Object.keys(r.__folders)),r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];console.log("Speed Controls folder has",t.__controllers.length,"controllers");let n=!1;for(let i=0;i<t.__controllers.length;i++){const o=t.__controllers[i];if(console.log("Speed controller",i,":",o.property,o.object===e.waveSpeed?"(MATCHES waveSpeed)":""),o.property==="value"&&o.object===e.waveSpeed){console.log("SUCCESS: Updating waveSpeed GUI from",o.getValue(),"to",e.waveSpeed.value),o.setValue(e.waveSpeed.value),n=!0;break}}n||console.log("WARNING: Could not find waveSpeed controller in Animation Speed Controls folder")}else console.log("WARNING: Animation Speed Controls folder not found");if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];console.log("Wave Controls folder has",t.__controllers.length,"controllers");for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];console.log("Wave controller",n,":",i.property,i.object===e.waveAmplitude?"(MATCHES waveAmplitude)":i.object===e.waveFrequency?"(MATCHES waveFrequency)":""),i.property==="value"&&i.object===e.waveAmplitude&&(console.log("SUCCESS: Updating waveAmplitude GUI from",i.getValue(),"to",e.waveAmplitude.value),i.setValue(e.waveAmplitude.value)),i.property==="value"&&i.object===e.waveFrequency&&(console.log("SUCCESS: Updating waveFrequency GUI from",i.getValue(),"to",e.waveFrequency.value),i.setValue(e.waveFrequency.value))}}else console.log("WARNING: Wave Controls folder not found")}function fr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function E_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ui={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Gs={duration:.5,overwrite:!1,delay:0},ch,wn,Gt,Si=1e8,kt=1/Si,cf=Math.PI*2,BT=cf/4,zT=0,T_=Math.sqrt,HT=Math.cos,VT=Math.sin,_n=function(e){return typeof e=="string"},Kt=function(e){return typeof e=="function"},Mr=function(e){return typeof e=="number"},uh=function(e){return typeof e>"u"},er=function(e){return typeof e=="object"},Yn=function(e){return e!==!1},dh=function(){return typeof window<"u"},$l=function(e){return Kt(e)||_n(e)},A_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Pn=Array.isArray,uf=/(?:-?\.?\d|\.)+/gi,C_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ys=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Yu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,R_=/[+-]=-?[.\d]+/,P_=/[^,'"\[\]\s]+/gi,GT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Xt,Vi,df,fh,di={},Nc={},L_,D_=function(e){return(Nc=Ws(e,di))&&Zn},hh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ol=function(e,t){return!t&&console.warn(e)},I_=function(e,t){return e&&(di[e]=t)&&Nc&&(Nc[e]=t)||di},sl=function(){return 0},WT={suppressEvents:!0,isStart:!0,kill:!1},vc={suppressEvents:!0,kill:!1},XT={suppressEvents:!0},ph={},jr=[],ff={},O_,ri={},ju={},Em=30,yc=[],mh="",gh=function(e){var t=e[0],n,i;if(er(t)||Kt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=yc.length;i--&&!yc[i].targetTest(t););n=yc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new r0(e[i],n)))||e.splice(i,1);return e},Po=function(e){return e._gsap||gh(wi(e))[0]._gsap},N_=function(e,t,n){return(n=e[t])&&Kt(n)?e[t]():uh(n)&&e.getAttribute&&e.getAttribute(t)||n},jn=function(e,t){return(e=e.split(",")).forEach(t)||e},Zt=function(e){return Math.round(e*1e5)/1e5||0},nn=function(e){return Math.round(e*1e7)/1e7||0},Ts=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},qT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Uc=function(){var e=jr.length,t=jr.slice(0),n,i;for(ff={},jr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},U_=function(e,t,n,i){jr.length&&!wn&&Uc(),e.render(t,n,wn&&t<0&&(e._initted||e._startAt)),jr.length&&!wn&&Uc()},F_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(P_).length<2?t:_n(e)?e.trim():e},k_=function(e){return e},fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},YT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Ws=function(e,t){for(var n in t)e[n]=t[n];return e},Tm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=er(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Fc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Fa=function(e){var t=e.parent||Xt,n=e.keyframes?YT(Pn(e.keyframes)):fi;if(Yn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},jT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},B_=function(e,t,n,i,o){var s=e[i],a;if(o)for(a=t[o];s&&s[o]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},tu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t._prev,s=t._next;o?o._next=s:e[n]===t&&(e[n]=s),s?s._prev=o:e[i]===t&&(e[i]=o),t._next=t._prev=t.parent=null},Qr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Lo=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},$T=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},hf=function(e,t,n,i){return e._startAt&&(wn?e._startAt.revert(vc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},KT=function r(e){return!e||e._ts&&r(e.parent)},Am=function(e){return e._repeat?Xs(e._tTime,e=e.duration()+e._rDelay)*e:0},Xs=function(e,t){var n=Math.floor(e=nn(e/t));return e&&n===e?n-1:n},kc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},nu=function(e){return e._end=nn(e._start+(e._tDur/Math.abs(e._ts||e._rts||kt)||0))},iu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=nn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),nu(e),n._dirty||Lo(n,e)),e},z_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=kc(e.rawTime(),t),(!t._dur||vl(0,t.totalDuration(),n)-t._tTime>kt)&&t.render(n,!0)),Lo(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-kt}},Xi=function(e,t,n,i){return t.parent&&Qr(t),t._start=nn((Mr(n)?n:n||e!==Xt?pi(e,n,t):e._time)+t._delay),t._end=nn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),B_(e,t,"_first","_last",e._sort?"_start":0),pf(t)||(e._recent=t),i||z_(e,t),e._ts<0&&iu(e,e._tTime),e},H_=function(e,t){return(di.ScrollTrigger||hh("scrollTrigger",t))&&di.ScrollTrigger.create(t,e)},V_=function(e,t,n,i,o){if(vh(e,t,o),!e._initted)return 1;if(!n&&e._pt&&!wn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&O_!==si.frame)return jr.push(e),e._lazy=[o,i],1},ZT=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},pf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},JT=function(e,t,n,i){var o=e.ratio,s=t<0||!t&&(!e._start&&ZT(e)&&!(!e._initted&&pf(e))||(e._ts<0||e._dp._ts<0)&&!pf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=vl(0,e._tDur,t),u=Xs(l,a),e._yoyo&&u&1&&(s=1-s),u!==Xs(e._tTime,a)&&(o=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==o||wn||i||e._zTime===kt||!t&&e._zTime){if(!e._initted&&V_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?kt:0),n||(n=t&&!d),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&hf(e,t,n,!0),e._onUpdate&&!n&&ci(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ci(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Qr(e,1),!n&&!wn&&(ci(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},QT=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},qs=function(e,t,n,i){var o=e._repeat,s=nn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=o?o<0?1e10:nn(s*(o+1)+e._rDelay*o):s,a>0&&!i&&iu(e,e._tTime=e._tDur*a),e.parent&&nu(e),n||Lo(e.parent,e),e},Cm=function(e){return e instanceof xn?Lo(e):qs(e,e._dur)},e1={_start:0,endTime:sl,totalDuration:sl},pi=function r(e,t,n){var i=e.labels,o=e._recent||e1,s=e.duration()>=Si?o.endTime(!1):e._dur,a,l,c;return _n(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?o._start:o.endTime(o._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?o:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=s),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Pn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:s+l)):t==null?s:+t},ka=function(e,t,n){var i=Mr(t[1]),o=(i?2:1)+(e<2?0:1),s=t[o],a,l;if(i&&(s.duration=t[1]),s.parent=n,e){for(a=s,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Yn(l.vars.inherit)&&l.parent;s.immediateRender=Yn(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[o-1]}return new Jt(t[0],s,t[o+1])},oo=function(e,t){return e||e===0?t(e):t},vl=function(e,t,n){return n<e?e:n>t?t:n},Cn=function(e,t){return!_n(e)||!(t=GT.exec(e))?"":t[1]},t1=function(e,t,n){return oo(n,function(i){return vl(e,t,i)})},mf=[].slice,G_=function(e,t){return e&&er(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&er(e[0]))&&!e.nodeType&&e!==Vi},n1=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var o;return _n(i)&&!t||G_(i,1)?(o=n).push.apply(o,wi(i)):n.push(i)})||n},wi=function(e,t,n){return Gt&&!t&&Gt.selector?Gt.selector(e):_n(e)&&!n&&(df||!Ys())?mf.call((t||fh).querySelectorAll(e),0):Pn(e)?n1(e,n):G_(e)?mf.call(e,0):e?[e]:[]},gf=function(e){return e=wi(e)[0]||ol("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return wi(t,n.querySelectorAll?n:n===e?ol("Invalid scope")||fh.createElement("div"):e)}},W_=function(e){return e.sort(function(){return .5-Math.random()})},X_=function(e){if(Kt(e))return e;var t=er(e)?e:{each:e},n=Do(t.ease),i=t.from||0,o=parseFloat(t.base)||0,s={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return _n(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=s[g],p,S,M,v,E,A,C,D,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,Si])[1],!w){for(C=-Si;C<(C=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=s[g]=[],p=l?Math.min(w,g)*u-.5:i%w,S=w===Si?0:l?g*d/w-.5:i/w|0,C=0,D=Si,A=0;A<g;A++)M=A%w-p,v=S-(A/w|0),m[A]=E=c?Math.abs(c==="y"?v:M):T_(M*M+v*v),E>C&&(C=E),E<D&&(D=E);i==="random"&&W_(m),m.max=C-D,m.min=D,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?o-g:o,m.u=Cn(t.amount||t.each)||0,n=n&&g<0?t0(n):n}return g=(m[f]-m.min)/m.max||0,nn(m.b+(n?n(g):g)*m.v)+m.u}},_f=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=nn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Mr(n)?0:Cn(n))}},q_=function(e,t){var n=Pn(e),i,o;return!n&&er(e)&&(i=n=e.radius||Si,e.values?(e=wi(e.values),(o=!Mr(e[0]))&&(i*=i)):e=_f(e.increment)),oo(t,n?Kt(e)?function(s){return o=e(s),Math.abs(o-s)<=i?o:s}:function(s){for(var a=parseFloat(o?s.x:s),l=parseFloat(o?s.y:0),c=Si,u=0,d=e.length,f,h;d--;)o?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:s,o||u===s||Mr(s)?u:u+Cn(s)}:_f(e))},Y_=function(e,t,n,i){return oo(Pn(e)?!t:n===!0?!!(n=0):!i,function(){return Pn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},i1=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(o,s){return s(o)},i)}},r1=function(e,t){return function(n){return e(parseFloat(n))+(t||Cn(n))}},o1=function(e,t,n){return $_(e,t,0,1,n)},j_=function(e,t,n){return oo(n,function(i){return e[~~t(i)]})},s1=function r(e,t,n){var i=t-e;return Pn(e)?j_(e,r(0,e.length),t):oo(n,function(o){return(i+(o-e)%i)%i+e})},a1=function r(e,t,n){var i=t-e,o=i*2;return Pn(e)?j_(e,r(0,e.length-1),t):oo(n,function(s){return s=(o+(s-e)%o)%o||0,e+(s>i?o-s:s)})},al=function(e){for(var t=0,n="",i,o,s,a;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),a=e.charAt(i+7)==="[",o=e.substr(i+7,s-i-7).match(a?P_:uf),n+=e.substr(t,i-t)+Y_(a?o:+o[0],a?0:+o[1],+o[2]||1e-5),t=s+1;return n+e.substr(t,e.length-t)},$_=function(e,t,n,i,o){var s=t-e,a=i-n;return oo(o,function(l){return n+((l-e)/s*a||0)})},l1=function r(e,t,n,i){var o=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!o){var s=_n(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),s)e={p:e},t={p:t};else if(Pn(e)&&!Pn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,o=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Ws(Pn(e)?[]:{},e));if(!u){for(l in t)_h.call(a,e,l,"get",t[l]);o=function(_){return Sh(_,a)||(s?e.p:e)}}}return oo(n,o)},Rm=function(e,t,n){var i=e.labels,o=Si,s,a,l;for(s in i)a=i[s]-t,a<0==!!n&&a&&o>(a=Math.abs(a))&&(l=s,o=a);return l},ci=function(e,t,n){var i=e.vars,o=i[t],s=Gt,a=e._ctx,l,c,u;if(o)return l=i[t+"Params"],c=i.callbackScope||e,n&&jr.length&&Uc(),a&&(Gt=a),u=l?o.apply(c,l):o.call(c),Gt=s,u},wa=function(e){return Qr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!wn),e.progress()<1&&ci(e,"onInterrupt"),e},xs,K_=[],Z_=function(e){if(e)if(e=!e.name&&e.default||e,dh()||e.headless){var t=e.name,n=Kt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,o={init:sl,render:Sh,add:_h,kill:M1,modifier:b1,rawVars:0},s={targetTest:0,get:0,getSetter:xh,aliases:{},register:0};if(Ys(),e!==i){if(ri[t])return;fi(i,fi(Fc(e,o),s)),Ws(i.prototype,Ws(o,Fc(e,s))),ri[i.prop=t]=i,e.targetTest&&(yc.push(i),ph[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}I_(t,i),e.register&&e.register(Zn,i,$n)}else K_.push(e)},Ft=255,ba={aqua:[0,Ft,Ft],lime:[0,Ft,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ft],navy:[0,0,128],white:[Ft,Ft,Ft],olive:[128,128,0],yellow:[Ft,Ft,0],orange:[Ft,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ft,0,0],pink:[Ft,192,203],cyan:[0,Ft,Ft],transparent:[Ft,Ft,Ft,0]},$u=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ft+.5|0},J_=function(e,t,n){var i=e?Mr(e)?[e>>16,e>>8&Ft,e&Ft]:0:ba.black,o,s,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ba[e])i=ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(o=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+o+o+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Ft,i&Ft,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Ft,e&Ft]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(uf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,s=u<=.5?u*(c+1):u+c-u*c,o=u*2-s,i.length>3&&(i[3]*=1),i[0]=$u(l+1/3,o,s),i[1]=$u(l,o,s),i[2]=$u(l-1/3,o,s);else if(~e.indexOf("="))return i=e.match(C_),n&&i.length<4&&(i[3]=1),i}else i=e.match(uf)||ba.transparent;i=i.map(Number)}return t&&!_&&(o=i[0]/Ft,s=i[1]/Ft,a=i[2]/Ft,d=Math.max(o,s,a),f=Math.min(o,s,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===o?(s-a)/h+(s<a?6:0):d===s?(a-o)/h+2:(o-s)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Q_=function(e){var t=[],n=[],i=-1;return e.split($r).forEach(function(o){var s=o.match(ys)||[];t.push.apply(t,s),n.push(i+=s.length+1)}),t.c=n,t},Pm=function(e,t,n){var i="",o=(e+i).match($r),s=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!o)return e;if(o=o.map(function(f){return(f=J_(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Q_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace($r,"1").split(ys),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?o.shift()||s+"0,0,0,0)":(u.length?u:o.length?o:n).shift());if(!c)for(c=e.split($r),d=c.length-1;a<d;a++)i+=c[a]+o[a];return i+c[d]},$r=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ba)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),c1=/hsl[a]?\(/,e0=function(e){var t=e.join(" "),n;if($r.lastIndex=0,$r.test(t))return n=c1.test(t),e[1]=Pm(e[1],n),e[0]=Pm(e[0],n,Q_(e[1])),!0},ll,si=function(){var r=Date.now,e=500,t=33,n=r(),i=n,o=1e3/240,s=o,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,S=m===!0,M,v,E,A;if((p>e||p<0)&&(n+=p-t),i+=p,E=i-n,M=E-s,(M>0||S)&&(A=++d.frame,f=E-d.time*1e3,d.time=E=E/1e3,s+=M+(M>=o?4:o-M),v=1),S||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](E,f,A,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){L_&&(!df&&dh()&&(Vi=df=window,fh=Vi.document||{},di.gsap=Zn,(Vi.gsapVersions||(Vi.gsapVersions=[])).push(Zn.version),D_(Nc||Vi.GreenSockGlobals||!Vi.gsap&&Vi||{}),K_.forEach(Z_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,s-d.time*1e3+1|0)},ll=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ll=0,c=sl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){o=1e3/(m||240),s=d.time*1e3+o},add:function(m,p,S){var M=p?function(v,E,A,C){m(v,E,A,C),d.remove(M)}:m;return d.remove(m),a[S?"unshift":"push"](M),Ys(),M},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),Ys=function(){return!ll&&si.wake()},_t={},u1=/^[\d.\-M][\d.\-,\s]/,d1=/["']/g,f1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],o=1,s=n.length,a,l,c;o<s;o++)l=n[o],a=o!==s-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(d1,"").trim():+c,i=l.substr(a+1).trim();return t},h1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},p1=function(e){var t=(e+"").split("("),n=_t[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[f1(t[1])]:h1(e).split(",").map(F_)):_t._CE&&u1.test(e)?_t._CE("",e):n},t0=function(e){return function(t){return 1-e(1-t)}},n0=function r(e,t){for(var n=e._first,i;n;)n instanceof xn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Do=function(e,t){return e&&(Kt(e)?e:_t[e]||p1(e))||t},Xo=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var o={easeIn:t,easeOut:n,easeInOut:i},s;return jn(e,function(a){_t[a]=di[a]=o,_t[s=a.toLowerCase()]=n;for(var l in o)_t[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=_t[a+"."+l]=o[l]}),o},i0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ku=function r(e,t,n){var i=t>=1?t:1,o=(n||(e?.3:.45))/(t<1?t:1),s=o/cf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*VT((u-s)*o)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:i0(a);return o=cf/o,l.config=function(c,u){return r(e,c,u)},l},Zu=function r(e,t){t===void 0&&(t=1.70158);var n=function(s){return s?--s*s*((t+1)*s+t)+1:0},i=e==="out"?n:e==="in"?function(o){return 1-n(1-o)}:i0(n);return i.config=function(o){return r(e,o)},i};jn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Xo(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});_t.Linear.easeNone=_t.none=_t.Linear.easeIn;Xo("Elastic",Ku("in"),Ku("out"),Ku());(function(r,e){var t=1/e,n=2*t,i=2.5*t,o=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Xo("Bounce",function(s){return 1-o(1-s)},o)})(7.5625,2.75);Xo("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Xo("Circ",function(r){return-(T_(1-r*r)-1)});Xo("Sine",function(r){return r===1?1:-HT(r*BT)+1});Xo("Back",Zu("in"),Zu("out"),Zu());_t.SteppedEase=_t.steps=di.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),o=t?1:0,s=1-kt;return function(a){return((i*vl(0,s,a)|0)+o)*n}}};Gs.ease=_t["quad.out"];jn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return mh+=r+","+r+"Params,"});var r0=function(e,t){this.id=zT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:N_,this.set=t?t.getSetter:xh},cl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,qs(this,+t.duration,1,1),this.data=t.data,Gt&&(this._ctx=Gt,Gt.data.push(this)),ll||si.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,qs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ys(),!arguments.length)return this._tTime;var o=this._dp;if(o&&o.smoothChildTiming&&this._ts){for(iu(this,n),!o._dp||o.parent||z_(o,this);o&&o.parent;)o.parent._time!==o._start+(o._ts>=0?o._tTime/o._ts:(o.totalDuration()-o._tTime)/-o._ts)&&o.totalTime(o._tTime,!0),o=o.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Xi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===kt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),U_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Am(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Am(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var o=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*o,i):this._repeat?Xs(this._tTime,o)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-kt?0:this._rts;if(this._rts===n)return this;var o=this.parent&&this._ts?kc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-kt?0:this._rts,this.totalTime(vl(-Math.abs(this._delay),this._tDur,o),i!==!1),nu(this),$T(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ys(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==kt&&(this._tTime-=kt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Xi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?kc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=XT);var i=wn;return wn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),wn=i,this},e.globalTime=function(n){for(var i=this,o=arguments.length?n:i.rawTime();i;)o=i._start+o/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):o},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Cm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Cm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(pi(this,n),Yn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Yn(i)),this._dur||(this._zTime=-kt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-kt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-kt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,o;return!!(!n||this._ts&&this._initted&&n.isActive()&&(o=n.rawTime(!0))>=i&&o<this.endTime(!0)-kt)},e.eventCallback=function(n,i,o){var s=this.vars;return arguments.length>1?(i?(s[n]=i,o&&(s[n+"Params"]=o),n==="onUpdate"&&(this._onUpdate=i)):delete s[n],this):s[n]},e.then=function(n){var i=this;return new Promise(function(o){var s=Kt(n)?n:k_,a=function(){var c=i.then;i.then=null,Kt(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=c),o(s),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){wa(this)},r}();fi(cl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-kt,_prom:0,_ps:!1,_rts:1});var xn=function(r){E_(e,r);function e(n,i){var o;return n===void 0&&(n={}),o=r.call(this,n)||this,o.labels={},o.smoothChildTiming=!!n.smoothChildTiming,o.autoRemoveChildren=!!n.autoRemoveChildren,o._sort=Yn(n.sortChildren),Xt&&Xi(n.parent||Xt,fr(o),i),n.reversed&&o.reverse(),n.paused&&o.paused(!0),n.scrollTrigger&&H_(fr(o),n.scrollTrigger),o}var t=e.prototype;return t.to=function(i,o,s){return ka(0,arguments,this),this},t.from=function(i,o,s){return ka(1,arguments,this),this},t.fromTo=function(i,o,s,a){return ka(2,arguments,this),this},t.set=function(i,o,s){return o.duration=0,o.parent=this,Fa(o).repeatDelay||(o.repeat=0),o.immediateRender=!!o.immediateRender,new Jt(i,o,pi(this,s),1),this},t.call=function(i,o,s){return Xi(this,Jt.delayedCall(0,i,o),s)},t.staggerTo=function(i,o,s,a,l,c,u){return s.duration=o,s.stagger=s.stagger||a,s.onComplete=c,s.onCompleteParams=u,s.parent=this,new Jt(i,s,pi(this,l)),this},t.staggerFrom=function(i,o,s,a,l,c,u){return s.runBackwards=1,Fa(s).immediateRender=Yn(s.immediateRender),this.staggerTo(i,o,s,a,l,c,u)},t.staggerFromTo=function(i,o,s,a,l,c,u,d){return a.startAt=s,Fa(a).immediateRender=Yn(a.immediateRender),this.staggerTo(i,o,a,l,c,u,d)},t.render=function(i,o,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:nn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,S,M,v,E,A,C;if(this!==Xt&&u>l&&i>=0&&(u=l),u!==this._tTime||s||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,M=this._ts,p=!M,d&&(c||(a=this._zTime),(i||!o)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,o,s);if(f=nn(u%m),u===l?(g=this._repeat,f=c):(E=nn(u/m),g=~~E,g&&g===E&&(f=c,g--),f>c&&(f=c)),E=Xs(this._tTime,m),!a&&this._tTime&&E!==g&&this._tTime-E*m-this._dur<=0&&(E=g),A&&g&1&&(f=c-f,C=1),g!==E&&!this._lock){var D=A&&E&1,w=D===(A&&g&1);if(g<E&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(C?0:nn(g*m)),o,!c)._lock=0,this._tTime=u,!o&&this.parent&&ci(this,"onRepeat"),this.vars.repeatRefresh&&!C&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!C&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;n0(this,C)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=QT(this,nn(a),nn(f)),S&&(u-=f-(f=S._start))),this._tTime=u,this._time=f,this._act=!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!o&&!g&&(ci(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,o,s),f!==this._time||!this._ts&&!p){S=0,_&&(u+=this._zTime=-kt);break}}h=_}else{h=this._last;for(var x=i<0?i:f;h;){if(_=h._prev,(h._act||x<=h._end)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(x-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(x-h._start)*h._ts,o,s||wn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){S=0,_&&(u+=this._zTime=x?-kt:kt);break}}h=_}}if(S&&!o&&(this.pause(),S.render(f>=a?0:-kt)._zTime=f>=a?1:-1,this._ts))return this._start=v,nu(this),this.render(i,o,s);this._onUpdate&&!o&&ci(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Qr(this,1),!o&&!(i<0&&!a)&&(u||a||!l)&&(ci(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,o){var s=this;if(Mr(o)||(o=pi(this,o,i)),!(i instanceof cl)){if(Pn(i))return i.forEach(function(a){return s.add(a,o)}),this;if(_n(i))return this.addLabel(i,o);if(Kt(i))i=Jt.delayedCall(0,i);else return this}return this!==i?Xi(this,i,o):this},t.getChildren=function(i,o,s,a){i===void 0&&(i=!0),o===void 0&&(o=!0),s===void 0&&(s=!0),a===void 0&&(a=-Si);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Jt?o&&l.push(c):(s&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,o,s)))),c=c._next;return l},t.getById=function(i){for(var o=this.getChildren(1,1,1),s=o.length;s--;)if(o[s].vars.id===i)return o[s]},t.remove=function(i){return _n(i)?this.removeLabel(i):Kt(i)?this.killTweensOf(i):(i.parent===this&&tu(this,i),i===this._recent&&(this._recent=this._last),Lo(this))},t.totalTime=function(i,o){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=nn(si.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,o),this._forcing=0,this):this._tTime},t.addLabel=function(i,o){return this.labels[i]=pi(this,o),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,o,s){var a=Jt.delayedCall(0,o||sl,s);return a.data="isPause",this._hasPause=1,Xi(this,a,pi(this,i))},t.removePause=function(i){var o=this._first;for(i=pi(this,i);o;)o._start===i&&o.data==="isPause"&&Qr(o),o=o._next},t.killTweensOf=function(i,o,s){for(var a=this.getTweensOf(i,s),l=a.length;l--;)Br!==a[l]&&a[l].kill(i,o);return this},t.getTweensOf=function(i,o){for(var s=[],a=wi(i),l=this._first,c=Mr(o),u;l;)l instanceof Jt?qT(l._targets,a)&&(c?(!Br||l._initted&&l._ts)&&l.globalTime(0)<=o&&l.globalTime(l.totalDuration())>o:!o||l.isActive())&&s.push(l):(u=l.getTweensOf(a,o)).length&&s.push.apply(s,u),l=l._next;return s},t.tweenTo=function(i,o){o=o||{};var s=this,a=pi(s,i),l=o,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Jt.to(s,fi({ease:o.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale())||kt,onStart:function(){if(s.pause(),!h){var m=o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale());_._dur!==m&&qs(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},o));return f?_.render(0):_},t.tweenFromTo=function(i,o,s){return this.tweenTo(o,fi({startAt:{time:pi(this,i)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Rm(this,pi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Rm(this,pi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+kt)},t.shiftChildren=function(i,o,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,c;a;)a._start>=s&&(a._start+=i,a._end+=i),a=a._next;if(o)for(c in l)l[c]>=s&&(l[c]+=i);return Lo(this)},t.invalidate=function(i){var o=this._first;for(this._lock=0;o;)o.invalidate(i),o=o._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var o=this._first,s;o;)s=o._next,this.remove(o),o=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Lo(this)},t.totalDuration=function(i){var o=0,s=this,a=s._last,l=Si,c,u,d;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(d=s.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,Xi(s,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(o-=u,(!d&&!s._dp||d&&d.smoothChildTiming)&&(s._start+=u/s._ts,s._time-=u,s._tTime-=u),s.shiftChildren(-u,!1,-1/0),l=0),a._end>o&&a._ts&&(o=a._end),a=c;qs(s,s===Xt&&s._time>o?s._time:o,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(i){if(Xt._ts&&(U_(Xt,kc(i,Xt)),O_=si.frame),si.frame>=Em){Em+=ui.autoSleep||120;var o=Xt._first;if((!o||!o._ts)&&ui.autoSleep&&si._listeners.length<2){for(;o&&!o._ts;)o=o._next;o||si.sleep()}}},e}(cl);fi(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var m1=function(e,t,n,i,o,s,a){var l=new $n(this._pt,e,t,0,1,u0,null,o),c=0,u=0,d,f,h,_,g,m,p,S;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=al(i)),s&&(S=[n,i],s(S,e,t),n=S[0],i=S[1]),f=n.match(Yu)||[];d=Yu.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Ts(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Yu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(R_.test(i)||p)&&(l.e=0),this._pt=l,l},_h=function(e,t,n,i,o,s,a,l,c,u){Kt(i)&&(i=i(o||0,e,s));var d=e[t],f=n!=="get"?n:Kt(d)?c?e[t.indexOf("set")||!Kt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=Kt(d)?c?x1:l0:yh,_;if(_n(i)&&(~i.indexOf("random(")&&(i=al(i)),i.charAt(1)==="="&&(_=Ts(f,i)+(Cn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||vf)return!isNaN(f*i)&&i!==""?(_=new $n(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?w1:c0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&hh(t,i),m1.call(this,e,t,f,i,h,l||ui.stringFilter,c))},g1=function(e,t,n,i,o){if(Kt(e)&&(e=Ba(e,o,t,n,i)),!er(e)||e.style&&e.nodeType||Pn(e)||A_(e))return _n(e)?Ba(e,o,t,n,i):e;var s={},a;for(a in e)s[a]=Ba(e[a],o,t,n,i);return s},o0=function(e,t,n,i,o,s){var a,l,c,u;if(ri[e]&&(a=new ri[e]).init(o,a.rawVars?t[e]:g1(t[e],i,o,s,n),n,i,s)!==!1&&(n._pt=l=new $n(n._pt,o,e,0,1,a.render,a,0,a.priority),n!==xs))for(c=n._ptLookup[n._targets.indexOf(o)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Br,vf,vh=function r(e,t,n){var i=e.vars,o=i.ease,s=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,S=p&&p.data==="nested"?p.vars.targets:m,M=e._overwrite==="auto"&&!ch,v=e.timeline,E,A,C,D,w,x,P,b,B,X,Y,q,$;if(v&&(!f||!o)&&(o="none"),e._ease=Do(o,Gs.ease),e._yEase=d?t0(Do(d===!0?o:d,Gs.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(b=m[0]?Po(m[0]).harness:0,q=b&&i[b.prop],E=Fc(i,ph),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?vc:WT),g._lazy=0),s){if(Qr(e._startAt=Jt.set(m,fi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Yn(l),startAt:null,delay:0,onUpdate:c&&function(){return ci(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(wn||!a&&!h)&&e._startAt.revert(vc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),C=fi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Yn(l),immediateRender:a,stagger:0,parent:p},E),q&&(C[b.prop]=q),Qr(e._startAt=Jt.set(m,C)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(wn?e._startAt.revert(vc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,kt,kt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Yn(l)||l&&!_,A=0;A<m.length;A++){if(w=m[A],P=w._gsap||gh(m)[A]._gsap,e._ptLookup[A]=X={},ff[P.id]&&jr.length&&Uc(),Y=S===m?A:S.indexOf(w),b&&(B=new b).init(w,q||E,e,Y,S)!==!1&&(e._pt=D=new $n(e._pt,w,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(N){X[N]=D}),B.priority&&(x=1)),!b||q)for(C in E)ri[C]&&(B=o0(C,E,e,Y,w,S))?B.priority&&(x=1):X[C]=D=_h.call(e,w,C,"get",E[C],Y,S,0,i.stringFilter);e._op&&e._op[A]&&e.kill(w,e._op[A]),M&&e._pt&&(Br=e,Xt.killTweensOf(w,X,e.globalTime(t)),$=!e.parent,Br=0),e._pt&&l&&(ff[P.id]=1)}x&&d0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!$,f&&t<=0&&v.render(Si,!0,!0)},_1=function(e,t,n,i,o,s,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return vf=1,e.vars[t]="+=0",vh(e,a),vf=0,l?ol(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!o?i:u.s+(i||0)+s*u.c,u.c=n-u.s,d.e&&(d.e=Zt(n)+Cn(d.e)),d.b&&(d.b=u.s+Cn(d.b))},v1=function(e,t){var n=e[0]?Po(e[0]).harness:0,i=n&&n.aliases,o,s,a,l;if(!i)return t;o=Ws({},t);for(s in i)if(s in o)for(l=i[s].split(","),a=l.length;a--;)o[l[a]]=o[s];return o},y1=function(e,t,n,i){var o=t.ease||i||"power1.inOut",s,a;if(Pn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:o})});else for(s in t)a=n[s]||(n[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:o})},Ba=function(e,t,n,i,o){return Kt(e)?e.call(t,n,i,o):_n(e)&&~e.indexOf("random(")?al(e):e},s0=mh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",a0={};jn(s0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return a0[r]=1});var Jt=function(r){E_(e,r);function e(n,i,o,s){var a;typeof i=="number"&&(o.duration=i,i=o,o=null),a=r.call(this,s?i:Fa(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,S=i.parent||Xt,M=(Pn(n)||A_(n)?Mr(n[0]):"length"in i)?[n]:wi(n),v,E,A,C,D,w,x,P;if(a._targets=M.length?gh(M):ol("GSAP target "+n+" not found. https://gsap.com",!ui.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||$l(c)||$l(u)){if(i=a.vars,v=a.timeline=new xn({data:"nested",defaults:g||{},targets:S&&S.data==="nested"?S.vars.targets:M}),v.kill(),v.parent=v._dp=fr(a),v._start=0,f||$l(c)||$l(u)){if(C=M.length,x=f&&X_(f),er(f))for(D in f)~s0.indexOf(D)&&(P||(P={}),P[D]=f[D]);for(E=0;E<C;E++)A=Fc(i,a0),A.stagger=0,p&&(A.yoyoEase=p),P&&Ws(A,P),w=M[E],A.duration=+Ba(c,fr(a),E,w,M),A.delay=(+Ba(u,fr(a),E,w,M)||0)-a._delay,!f&&C===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),v.to(w,A,x?x(E,w,M):0),v._ease=_t.none;v.duration()?c=u=0:a.timeline=0}else if(_){Fa(fi(v.vars.defaults,{ease:"none"})),v._ease=Do(_.ease||i.ease||"none");var b=0,B,X,Y;if(Pn(_))_.forEach(function(q){return v.to(M,q,">")}),v.duration();else{A={};for(D in _)D==="ease"||D==="easeEach"||y1(D,_[D],A,_.easeEach);for(D in A)for(B=A[D].sort(function(q,$){return q.t-$.t}),b=0,E=0;E<B.length;E++)X=B[E],Y={ease:X.e,duration:(X.t-(E?B[E-1].t:0))/100*c},Y[D]=X.v,v.to(M,Y,b),b+=Y.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!ch&&(Br=fr(a),Xt.killTweensOf(M),Br=0),Xi(S,fr(a),o),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===nn(S._time)&&Yn(d)&&KT(fr(a))&&S.data!=="nested")&&(a._tTime=-kt,a.render(Math.max(0,-u)||0)),m&&H_(fr(a),m),a}var t=e.prototype;return t.render=function(i,o,s){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-kt&&!u?l:i<kt?0:i,f,h,_,g,m,p,S,M,v;if(!c)JT(this,i,o,s);else if(d!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,M=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,o,s);if(f=nn(d%g),d===l?(_=this._repeat,f=c):(m=nn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=Xs(this._tTime,g),f===a&&!s&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(M&&this._yEase&&n0(M,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=s=1,this.render(nn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(V_(this,u?i:f,s,o,d))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,o,s)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=S=(v||this._ease)(f/c),this._from&&(this.ratio=S=1-S),f&&!a&&!o&&!_&&(ci(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(S,h.d),h=h._next;M&&M.render(i<0?i:M._dur*M._ease(f/this._dur),o,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!o&&(u&&hf(this,i,o,s),ci(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!o&&this.parent&&ci(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&hf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Qr(this,1),!o&&!(u&&!a)&&(d||a||p)&&(ci(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,o,s,a,l){ll||si.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||vh(this,c),u=this._ease(c/this._dur),_1(this,i,o,s,a,u,c,l)?this.resetTo(i,o,s,a,1):(iu(this,0),this.parent||B_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,o){if(o===void 0&&(o="all"),!i&&(!o||o==="all"))return this._lazy=this._pt=0,this.parent?wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!wn),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,o,Br&&Br.vars.overwrite!==!0)._first||wa(this),this.parent&&s!==this.timeline.totalDuration()&&qs(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=i?wi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!o||o==="all")&&jT(a,l))return o==="all"&&(this._pt=0),wa(this);for(d=this._op=this._op||[],o!=="all"&&(_n(o)&&(g={},jn(o,function(S){return g[S]=1}),o=g),o=v1(a,o)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],o==="all"?(d[p]=o,_=f,h={}):(h=d[p]=d[p]||{},_=o);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&tu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&wa(this),this},e.to=function(i,o){return new e(i,o,arguments[2])},e.from=function(i,o){return ka(1,arguments)},e.delayedCall=function(i,o,s,a){return new e(o,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:o,onReverseComplete:o,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(i,o,s){return ka(2,arguments)},e.set=function(i,o){return o.duration=0,o.repeatDelay||(o.repeat=0),new e(i,o)},e.killTweensOf=function(i,o,s){return Xt.killTweensOf(i,o,s)},e}(cl);fi(Jt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});jn("staggerTo,staggerFrom,staggerFromTo",function(r){Jt[r]=function(){var e=new xn,t=mf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var yh=function(e,t,n){return e[t]=n},l0=function(e,t,n){return e[t](n)},x1=function(e,t,n,i){return e[t](i.fp,n)},S1=function(e,t,n){return e.setAttribute(t,n)},xh=function(e,t){return Kt(e[t])?l0:uh(e[t])&&e.setAttribute?S1:yh},c0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},w1=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},u0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Sh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},b1=function(e,t,n,i){for(var o=this._pt,s;o;)s=o._next,o.p===i&&o.modifier(e,t,n),o=s},M1=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?tu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},E1=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},d0=function(e){for(var t=e._pt,n,i,o,s;t;){for(n=t._next,i=o;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:o=t,(t._next=i)?i._prev=t:s=t,t=n}e._pt=o},$n=function(){function r(t,n,i,o,s,a,l,c,u){this.t=n,this.s=o,this.c=s,this.p=i,this.r=a||c0,this.d=l||this,this.set=c||yh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,o){this.mSet=this.mSet||this.set,this.set=E1,this.m=n,this.mt=o,this.tween=i},r}();jn(mh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ph[r]=1});di.TweenMax=di.TweenLite=Jt;di.TimelineLite=di.TimelineMax=xn;Xt=new xn({sortChildren:!1,defaults:Gs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ui.stringFilter=e0;var Io=[],xc={},T1=[],Lm=0,A1=0,Ju=function(e){return(xc[e]||T1).map(function(t){return t()})},yf=function(){var e=Date.now(),t=[];e-Lm>2&&(Ju("matchMediaInit"),Io.forEach(function(n){var i=n.queries,o=n.conditions,s,a,l,c;for(a in i)s=Vi.matchMedia(i[a]).matches,s&&(l=1),s!==o[a]&&(o[a]=s,c=1);c&&(n.revert(),l&&t.push(n))}),Ju("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Lm=e,Ju("matchMedia"))},f0=function(){function r(t,n){this.selector=n&&gf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=A1++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,o){Kt(n)&&(o=i,i=n,n=Kt);var s=this,a=function(){var c=Gt,u=s.selector,d;return c&&c!==s&&c.data.push(s),o&&(s.selector=gf(o)),Gt=s,d=i.apply(s,arguments),Kt(d)&&s._r.push(d),Gt=c,s.selector=u,s.isReverted=!1,d};return s.last=a,n===Kt?a(s,function(l){return s.add(null,l)}):n?s[n]=a:a},e.ignore=function(n){var i=Gt;Gt=null,n(this),Gt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Jt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var o=this;if(n?function(){for(var a=o.getTweens(),l=o.data.length,c;l--;)c=o.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=o.data.length;l--;)c=o.data[l],c instanceof xn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Jt)&&c.revert&&c.revert(n);o._r.forEach(function(u){return u(n,o)}),o.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var s=Io.length;s--;)Io[s].id===this.id&&Io.splice(s,1)},e.revert=function(n){this.kill(n||{})},r}(),C1=function(){function r(t){this.contexts=[],this.scope=t,Gt&&Gt.data.push(this)}var e=r.prototype;return e.add=function(n,i,o){er(n)||(n={matches:n});var s=new f0(0,o||this.scope),a=s.conditions={},l,c,u;Gt&&!s.selector&&(s.selector=Gt.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=n;for(c in n)c==="all"?u=1:(l=Vi.matchMedia(n[c]),l&&(Io.indexOf(s)<0&&Io.push(s),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yf):l.addEventListener("change",yf)));return u&&i(s,function(d){return s.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Bc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Z_(i)})},timeline:function(e){return new xn(e)},getTweensOf:function(e,t){return Xt.getTweensOf(e,t)},getProperty:function(e,t,n,i){_n(e)&&(e=wi(e)[0]);var o=Po(e||{}).get,s=n?k_:F_;return n==="native"&&(n=""),e&&(t?s((ri[t]&&ri[t].get||o)(e,t,n,i)):function(a,l,c){return s((ri[a]&&ri[a].get||o)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=wi(e),e.length>1){var i=e.map(function(u){return Zn.quickSetter(u,t,n)}),o=i.length;return function(u){for(var d=o;d--;)i[d](u)}}e=e[0]||{};var s=ri[t],a=Po(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=s?function(u){var d=new s;xs._pt=0,d.init(e,n?u+n:u,xs,0,[e]),d.render(1,d),xs._pt&&Sh(1,xs)}:a.set(e,l);return s?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,o=Zn.to(e,fi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),s=function(l,c,u){return o.resetTo(t,l,c,u)};return s.tween=o,s},isTweening:function(e){return Xt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Do(e.ease,Gs.ease)),Tm(Gs,e||{})},config:function(e){return Tm(ui,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,o=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!ri[a]&&!di[a]&&ol(t+" effect requires "+a+" plugin.")}),ju[t]=function(a,l,c){return n(wi(a),fi(l||{},o),c)},s&&(xn.prototype[t]=function(a,l,c){return this.add(ju[t](a,er(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){_t[e]=Do(t)},parseEase:function(e,t){return arguments.length?Do(e,t):_t},getById:function(e){return Xt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new xn(e),i,o;for(n.smoothChildTiming=Yn(e.smoothChildTiming),Xt.remove(n),n._dp=0,n._time=n._tTime=Xt._time,i=Xt._first;i;)o=i._next,(t||!(!i._dur&&i instanceof Jt&&i.vars.onComplete===i._targets[0]))&&Xi(n,i,i._start-i._delay),i=o;return Xi(Xt,n,0),n},context:function(e,t){return e?new f0(e,t):Gt},matchMedia:function(e){return new C1(e)},matchMediaRefresh:function(){return Io.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yf()},addEventListener:function(e,t){var n=xc[e]||(xc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=xc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:s1,wrapYoyo:a1,distribute:X_,random:Y_,snap:q_,normalize:o1,getUnit:Cn,clamp:t1,splitColor:J_,toArray:wi,selector:gf,mapRange:$_,pipe:i1,unitize:r1,interpolate:l1,shuffle:W_},install:D_,effects:ju,ticker:si,updateRoot:xn.updateRoot,plugins:ri,globalTimeline:Xt,core:{PropTween:$n,globals:I_,Tween:Jt,Timeline:xn,Animation:cl,getCache:Po,_removeLinkedListItem:tu,reverting:function(){return wn},context:function(e){return e&&Gt&&(Gt.data.push(e),e._ctx=Gt),Gt},suppressOverwrites:function(e){return ch=e}}};jn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Bc[r]=Jt[r]});si.add(xn.updateRoot);xs=Bc.to({},{duration:0});var R1=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},P1=function(e,t){var n=e._targets,i,o,s;for(i in t)for(o=n.length;o--;)s=e._ptLookup[o][i],s&&(s=s.d)&&(s._pt&&(s=R1(s,i)),s&&s.modifier&&s.modifier(t[i],e,n[o],i))},Qu=function(e,t){return{name:e,rawVars:1,init:function(i,o,s){s._onInit=function(a){var l,c;if(_n(o)&&(l={},jn(o,function(u){return l[u]=1}),o=l),t){l={};for(c in o)l[c]=t(o[c]);o=l}P1(a,o)}}}},Zn=Bc.registerPlugin({name:"attr",init:function(e,t,n,i,o){var s,a,l;this.tween=n;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],i,o,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var n=t._pt;n;)wn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Qu("roundProps",_f),Qu("modifiers"),Qu("snap",q_))||Bc;Jt.version=xn.version=Zn.version="3.12.7";L_=1;dh()&&Ys();var L1=_t.Power0,D1=_t.Power1,I1=_t.Power2,O1=_t.Power3,N1=_t.Power4,U1=_t.Linear,F1=_t.Quad,k1=_t.Cubic,B1=_t.Quart,z1=_t.Quint,H1=_t.Strong,V1=_t.Elastic,G1=_t.Back,W1=_t.SteppedEase,X1=_t.Bounce,q1=_t.Sine,Y1=_t.Expo,j1=_t.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dm,zr,As,wh,Eo,Im,bh,$1=function(){return typeof window<"u"},Er={},yo=180/Math.PI,Cs=Math.PI/180,ls=Math.atan2,Om=1e8,Mh=/([A-Z])/g,K1=/(left|right|width|margin|padding|x)/i,Z1=/[\s,\(]\S/,qi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},xf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},J1=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Q1=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},eA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},h0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},p0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},tA=function(e,t,n){return e.style[t]=n},nA=function(e,t,n){return e.style.setProperty(t,n)},iA=function(e,t,n){return e._gsap[t]=n},rA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},oA=function(e,t,n,i,o){var s=e._gsap;s.scaleX=s.scaleY=n,s.renderTransform(o,s)},sA=function(e,t,n,i,o){var s=e._gsap;s[t]=n,s.renderTransform(o,s)},qt="transform",Kn=qt+"Origin",aA=function r(e,t){var n=this,i=this.target,o=i.style,s=i._gsap;if(e in Er&&o){if(this.tfm=this.tfm||{},e!=="transform")e=qi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=hr(i,a)}):this.tfm[e]=s.x?s[e]:hr(i,e),e===Kn&&(this.tfm.zOrigin=s.zOrigin);else return qi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(qt)>=0)return;s.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Kn,t,"")),e=qt}(o||t)&&this.props.push(e,t,o[e])},m0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},lA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,o,s;for(o=0;o<e.length;o+=3)e[o+1]?e[o+1]===2?t[e[o]](e[o+2]):t[e[o]]=e[o+2]:e[o+2]?n[e[o]]=e[o+2]:n.removeProperty(e[o].substr(0,2)==="--"?e[o]:e[o].replace(Mh,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),o=bh(),(!o||!o.isStart)&&!n[qt]&&(m0(n),i.zOrigin&&n[Kn]&&(n[Kn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},g0=function(e,t){var n={target:e,props:[],revert:lA,save:aA};return e._gsap||Zn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},_0,Sf=function(e,t){var n=zr.createElementNS?zr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):zr.createElement(e);return n&&n.style?n:zr.createElement(e)},Ki=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Mh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,js(t)||t,1)||""},Nm="O,Moz,ms,Ms,Webkit".split(","),js=function(e,t,n){var i=t||Eo,o=i.style,s=5;if(e in o&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Nm[s]+e in o););return s<0?null:(s===3?"ms":s>=0?Nm[s]:"")+e},wf=function(){$1()&&window.document&&(Dm=window,zr=Dm.document,As=zr.documentElement,Eo=Sf("div")||{style:{}},Sf("div"),qt=js(qt),Kn=qt+"Origin",Eo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_0=!!js("perspective"),bh=Zn.core.reverting,wh=1)},Um=function(e){var t=e.ownerSVGElement,n=Sf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),o;i.style.display="block",n.appendChild(i),As.appendChild(n);try{o=i.getBBox()}catch{}return n.removeChild(i),As.removeChild(n),o},Fm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},v0=function(e){var t,n;try{t=e.getBBox()}catch{t=Um(e),n=1}return t&&(t.width||t.height)||n||(t=Um(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fm(e,["x","cx","x1"])||0,y:+Fm(e,["y","cy","y1"])||0,width:0,height:0}:t},y0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&v0(e))},Bo=function(e,t){if(t){var n=e.style,i;t in Er&&t!==Kn&&(t=qt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Mh,"-$1").toLowerCase())):n.removeAttribute(t)}},Hr=function(e,t,n,i,o,s){var a=new $n(e._pt,t,n,0,1,s?p0:h0);return e._pt=a,a.b=i,a.e=o,e._props.push(n),a},km={deg:1,rad:1,turn:1},cA={grid:1,flex:1},eo=function r(e,t,n,i){var o=parseFloat(n)||0,s=(n+"").trim().substr((o+"").length)||"px",a=Eo.style,l=K1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===s||!o||km[i]||km[s])return o;if(s!=="px"&&!f&&(o=r(e,t,n,"px")),p=e.getCTM&&y0(e),(h||s==="%")&&(Er[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],Zt(h?o/_*d:o/100*_);if(a[l?"width":"height"]=d+(f?s:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===zr||!g.appendChild)&&(g=zr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===si.time&&!m.uncache)return Zt(o/m.width*d);if(h&&(t==="height"||t==="width")){var S=e.style[t];e.style[t]=d+i,_=e[u],S?e.style[t]=S:Bo(e,t)}else(h||s==="%")&&!cA[Ki(g,"display")]&&(a.position=Ki(e,"position")),g===e&&(a.position="static"),g.appendChild(Eo),_=Eo[u],g.removeChild(Eo),a.position="absolute";return l&&h&&(m=Po(g),m.time=si.time,m.width=g[u]),Zt(f?_*o/d:_&&o?d/_*o:0)},hr=function(e,t,n,i){var o;return wh||wf(),t in qi&&t!=="transform"&&(t=qi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Er[t]&&t!=="transform"?(o=dl(e,i),o=t!=="transformOrigin"?o[t]:o.svg?o.origin:Hc(Ki(e,Kn))+" "+o.zOrigin+"px"):(o=e.style[t],(!o||o==="auto"||i||~(o+"").indexOf("calc("))&&(o=zc[t]&&zc[t](e,t,n)||Ki(e,t)||N_(e,t)||(t==="opacity"?1:0))),n&&!~(o+"").trim().indexOf(" ")?eo(e,t,o,n)+n:o},uA=function(e,t,n,i){if(!n||n==="none"){var o=js(t,e,1),s=o&&Ki(e,o,1);s&&s!==n?(t=o,n=s):t==="borderColor"&&(n=Ki(e,"borderTopColor"))}var a=new $n(this._pt,e.style,t,0,1,u0),l=0,c=0,u,d,f,h,_,g,m,p,S,M,v,E;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Ki(e,t)||i,g?e.style[t]=g:Bo(e,t)),u=[n,i],e0(u),n=u[0],i=u[1],f=n.match(ys)||[],E=i.match(ys)||[],E.length){for(;d=ys.exec(i);)m=d[0],S=i.substring(l,d.index),_?_=(_+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=Ts(h,m)+v),p=parseFloat(m),M=m.substr((p+"").length),l=ys.lastIndex-M.length,M||(M=M||ui.units[t]||v,l===i.length&&(i+=M,a.e+=M)),v!==M&&(h=eo(e,t,g,M)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?p0:h0;return R_.test(i)&&(a.e=0),this._pt=a,a},Bm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},dA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Bm[n]||n,t[1]=Bm[i]||i,t.join(" ")},fA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,o=t.u,s=n._gsap,a,l,c;if(o==="all"||o===!0)i.cssText="",l=1;else for(o=o.split(","),c=o.length;--c>-1;)a=o[c],Er[a]&&(l=1,a=a==="transformOrigin"?Kn:qt),Bo(n,a);l&&(Bo(n,qt),s&&(s.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",dl(n,1),s.uncache=1,m0(i)))}},zc={clearProps:function(e,t,n,i,o){if(o.data!=="isFromStart"){var s=e._pt=new $n(e._pt,t,n,0,0,fA);return s.u=i,s.pr=-10,s.tween=o,e._props.push(n),1}}},ul=[1,0,0,1,0,0],x0={},S0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},zm=function(e){var t=Ki(e,qt);return S0(t)?ul:t.substr(7).match(C_).map(Zt)},Eh=function(e,t){var n=e._gsap||Po(e),i=e.style,o=zm(e),s,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,o=[l.a,l.b,l.c,l.d,l.e,l.f],o.join(",")==="1,0,0,1,0,0"?ul:o):(o===ul&&!e.offsetParent&&e!==As&&!n.svg&&(l=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,As.appendChild(e)),o=zm(e),l?i.display=l:Bo(e,"display"),c&&(a?s.insertBefore(e,a):s?s.appendChild(e):As.removeChild(e))),t&&o.length>6?[o[0],o[1],o[4],o[5],o[12],o[13]]:o)},bf=function(e,t,n,i,o,s){var a=e._gsap,l=o||Eh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],S=l[5],M=t.split(" "),v=parseFloat(M[0])||0,E=parseFloat(M[1])||0,A,C,D,w;n?l!==ul&&(C=h*m-_*g)&&(D=v*(m/C)+E*(-g/C)+(g*S-m*p)/C,w=v*(-_/C)+E*(h/C)-(h*S-_*p)/C,v=D,E=w):(A=v0(e),v=A.x+(~M[0].indexOf("%")?v/100*A.width:v),E=A.y+(~(M[1]||M[0]).indexOf("%")?E/100*A.height:E)),i||i!==!1&&a.smooth?(p=v-c,S=E-u,a.xOffset=d+(p*h+S*g)-p,a.yOffset=f+(p*_+S*m)-S):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Kn]="0px 0px",s&&(Hr(s,a,"xOrigin",c,v),Hr(s,a,"yOrigin",u,E),Hr(s,a,"xOffset",d,a.xOffset),Hr(s,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},dl=function(e,t){var n=e._gsap||new r0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,o=n.scaleX<0,s="px",a="deg",l=getComputedStyle(e),c=Ki(e,Kn)||"0",u,d,f,h,_,g,m,p,S,M,v,E,A,C,D,w,x,P,b,B,X,Y,q,$,N,fe,U,ge,ze,Ze,J,se;return u=d=f=g=m=p=S=M=v=0,h=_=1,n.svg=!!(e.getCTM&&y0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[qt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[qt]!=="none"?l[qt]:"")),i.scale=i.rotate=i.translate="none"),C=Eh(e,n.svg),n.svg&&(n.uncache?(N=e.getBBox(),c=n.xOrigin-N.x+"px "+(n.yOrigin-N.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),bf(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,C)),E=n.xOrigin||0,A=n.yOrigin||0,C!==ul&&(P=C[0],b=C[1],B=C[2],X=C[3],u=Y=C[4],d=q=C[5],C.length===6?(h=Math.sqrt(P*P+b*b),_=Math.sqrt(X*X+B*B),g=P||b?ls(b,P)*yo:0,S=B||X?ls(B,X)*yo+g:0,S&&(_*=Math.abs(Math.cos(S*Cs))),n.svg&&(u-=E-(E*P+A*B),d-=A-(E*b+A*X))):(se=C[6],Ze=C[7],U=C[8],ge=C[9],ze=C[10],J=C[11],u=C[12],d=C[13],f=C[14],D=ls(se,ze),m=D*yo,D&&(w=Math.cos(-D),x=Math.sin(-D),$=Y*w+U*x,N=q*w+ge*x,fe=se*w+ze*x,U=Y*-x+U*w,ge=q*-x+ge*w,ze=se*-x+ze*w,J=Ze*-x+J*w,Y=$,q=N,se=fe),D=ls(-B,ze),p=D*yo,D&&(w=Math.cos(-D),x=Math.sin(-D),$=P*w-U*x,N=b*w-ge*x,fe=B*w-ze*x,J=X*x+J*w,P=$,b=N,B=fe),D=ls(b,P),g=D*yo,D&&(w=Math.cos(D),x=Math.sin(D),$=P*w+b*x,N=Y*w+q*x,b=b*w-P*x,q=q*w-Y*x,P=$,Y=N),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=Zt(Math.sqrt(P*P+b*b+B*B)),_=Zt(Math.sqrt(q*q+se*se)),D=ls(Y,q),S=Math.abs(D)>2e-4?D*yo:0,v=J?1/(J<0?-J:J):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!S0(Ki(e,qt)),$&&e.setAttribute("transform",$))),Math.abs(S)>90&&Math.abs(S)<270&&(o?(h*=-1,S+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,S+=S<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+s,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+s,n.z=f+s,n.scaleX=Zt(h),n.scaleY=Zt(_),n.rotation=Zt(g)+a,n.rotationX=Zt(m)+a,n.rotationY=Zt(p)+a,n.skewX=S+a,n.skewY=M+a,n.transformPerspective=v+s,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Kn]=Hc(c)),n.xOffset=n.yOffset=0,n.force3D=ui.force3D,n.renderTransform=n.svg?pA:_0?w0:hA,n.uncache=0,n},Hc=function(e){return(e=e.split(" "))[0]+" "+e[1]},ed=function(e,t,n){var i=Cn(t);return Zt(parseFloat(t)+parseFloat(eo(e,"x",n+"px",i)))+i},hA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,w0(e,t)},mo="0deg",pa="0px",go=") ",w0=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,S=n.target,M=n.zOrigin,v="",E=p==="auto"&&e&&e!==1||p===!0;if(M&&(d!==mo||u!==mo)){var A=parseFloat(u)*Cs,C=Math.sin(A),D=Math.cos(A),w;A=parseFloat(d)*Cs,w=Math.cos(A),s=ed(S,s,C*w*-M),a=ed(S,a,-Math.sin(A)*-M),l=ed(S,l,D*w*-M+M)}m!==pa&&(v+="perspective("+m+go),(i||o)&&(v+="translate("+i+"%, "+o+"%) "),(E||s!==pa||a!==pa||l!==pa)&&(v+=l!==pa||E?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+go),c!==mo&&(v+="rotate("+c+go),u!==mo&&(v+="rotateY("+u+go),d!==mo&&(v+="rotateX("+d+go),(f!==mo||h!==mo)&&(v+="skew("+f+", "+h+go),(_!==1||g!==1)&&(v+="scale("+_+", "+g+go),S.style[qt]=v||"translate(0, 0)"},pA=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,S=n.forceCSS,M=parseFloat(s),v=parseFloat(a),E,A,C,D,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Cs,c*=Cs,E=Math.cos(l)*d,A=Math.sin(l)*d,C=Math.sin(l-c)*-f,D=Math.cos(l-c)*f,c&&(u*=Cs,w=Math.tan(c-u),w=Math.sqrt(1+w*w),C*=w,D*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),E*=w,A*=w)),E=Zt(E),A=Zt(A),C=Zt(C),D=Zt(D)):(E=d,D=f,A=C=0),(M&&!~(s+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(M=eo(h,"x",s,"px"),v=eo(h,"y",a,"px")),(_||g||m||p)&&(M=Zt(M+_-(_*E+g*C)+m),v=Zt(v+g-(_*A+g*D)+p)),(i||o)&&(w=h.getBBox(),M=Zt(M+i/100*w.width),v=Zt(v+o/100*w.height)),w="matrix("+E+","+A+","+C+","+D+","+M+","+v+")",h.setAttribute("transform",w),S&&(h.style[qt]=w)},mA=function(e,t,n,i,o){var s=360,a=_n(o),l=parseFloat(o)*(a&&~o.indexOf("rad")?yo:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=o.split("_")[1],d==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-s)),d==="cw"&&c<0?c=(c+s*Om)%s-~~(c/s)*s:d==="ccw"&&c>0&&(c=(c-s*Om)%s-~~(c/s)*s)),e._pt=f=new $n(e._pt,t,n,i,c,J1),f.e=u,f.u="deg",e._props.push(n),f},Hm=function(e,t){for(var n in t)e[n]=t[n];return e},gA=function(e,t,n){var i=Hm({},n._gsap),o="perspective,force3D,transformOrigin,svgOrigin",s=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),s[qt]=t,a=dl(n,1),Bo(n,qt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[qt],s[qt]=t,a=dl(n,1),s[qt]=c);for(l in Er)c=i[l],u=a[l],c!==u&&o.indexOf(l)<0&&(h=Cn(c),_=Cn(u),d=h!==_?eo(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new $n(e._pt,a,l,d,f-d,xf),e._pt.u=_||0,e._props.push(l));Hm(a,i)};jn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",o="Left",s=(e<3?[t,n,i,o]:[t+o,t+n,i+n,i+o]).map(function(a){return e<2?r+a:"border"+a+r});zc[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=s.map(function(_){return hr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},s.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Th={name:"css",register:wf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,o){var s=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,S,M,v,E,A,C,D;wh||wf(),this.styles=this.styles||g0(e),D=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(ri[g]&&o0(g,t,n,i,e,o)))){if(h=typeof u,_=zc[g],h==="function"&&(u=u.call(n,i,e,o),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=al(u)),_)_(this,e,g,u,n)&&(C=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",$r.lastIndex=0,$r.test(c)||(m=Cn(c),p=Cn(u)),p?m!==p&&(c=eo(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,o,0,0,g),s.push(g),D.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,o):l[g],_n(c)&&~c.indexOf("random(")&&(c=al(c)),Cn(c+"")||c==="auto"||(c+=ui.units[g]||Cn(hr(e,g))||""),(c+"").charAt(1)==="="&&(c=hr(e,g))):c=hr(e,g),f=parseFloat(c),S=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),d=parseFloat(u),g in qi&&(g==="autoAlpha"&&(f===1&&hr(e,"visibility")==="hidden"&&d&&(f=0),D.push("visibility",0,a.visibility),Hr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=qi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),M=g in Er,M){if(this.styles.save(g),v||(E=e._gsap,E.renderTransform&&!t.parseTransform||dl(e,t.parseTransform),A=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new $n(this._pt,a,qt,0,1,E.renderTransform,E,0,-1),v.dep=1),g==="scale")this._pt=new $n(this._pt,E,"scaleY",E.scaleY,(S?Ts(E.scaleY,S+d):d)-E.scaleY||0,xf),this._pt.u=0,s.push("scaleY",g),g+="X";else if(g==="transformOrigin"){D.push(Kn,0,a[Kn]),u=dA(u),E.svg?bf(e,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&Hr(this,E,"zOrigin",E.zOrigin,p),Hr(this,a,g,Hc(c),Hc(u)));continue}else if(g==="svgOrigin"){bf(e,u,1,A,0,this);continue}else if(g in x0){mA(this,E,g,f,S?Ts(f,S+u):u);continue}else if(g==="smoothOrigin"){Hr(this,E,"smooth",E.smooth,u);continue}else if(g==="force3D"){E[g]=u;continue}else if(g==="transform"){gA(this,u,e);continue}}else g in a||(g=js(g)||g);if(M||(d||d===0)&&(f||f===0)&&!Z1.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Cn(u)||(g in ui.units?ui.units[g]:m),m!==p&&(f=eo(e,g,c,p)),this._pt=new $n(this._pt,M?E:a,g,f,(S?Ts(f,S+d):d)-f,!M&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?eA:xf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=Q1);else if(g in a)uA.call(this,e,g,c,S?S+u:u);else if(g in e)this.add(e,g,c||e[g],S?S+u:u,i,o);else if(g!=="parseTransform"){hh(g,u);continue}M||(g in a?D.push(g,0,a[g]):typeof e[g]=="function"?D.push(g,2,e[g]()):D.push(g,1,c||e[g])),s.push(g)}}C&&d0(this)},render:function(e,t){if(t.tween._time||!bh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:hr,aliases:qi,getSetter:function(e,t,n){var i=qi[t];return i&&i.indexOf(",")<0&&(t=i),t in Er&&t!==Kn&&(e._gsap.x||hr(e,"x"))?n&&Im===n?t==="scale"?rA:iA:(Im=n||{})&&(t==="scale"?oA:sA):e.style&&!uh(e.style[t])?tA:~t.indexOf("-")?nA:xh(e,t)},core:{_removeProperty:Bo,_getMatrix:Eh}};Zn.utils.checkPrefix=js;Zn.core.getStyleSaver=g0;(function(r,e,t,n){var i=jn(r+","+e+","+t,function(o){Er[o]=1});jn(e,function(o){ui.units[o]="deg",x0[o]=1}),qi[i[13]]=r+","+e,jn(n,function(o){var s=o.split(":");qi[s[1]]=i[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");jn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){ui.units[r]="px"});Zn.registerPlugin(Th);var ke=Zn.registerPlugin(Th)||Zn,_A=ke.core.Tween;const vA=Object.freeze(Object.defineProperty({__proto__:null,Back:G1,Bounce:X1,CSSPlugin:Th,Circ:j1,Cubic:k1,Elastic:V1,Expo:Y1,Linear:U1,Power0:L1,Power1:D1,Power2:I1,Power3:O1,Power4:N1,Quad:F1,Quart:B1,Quint:z1,Sine:q1,SteppedEase:W1,Strong:H1,TimelineLite:xn,TimelineMax:xn,TweenLite:Jt,TweenMax:_A,default:ke,gsap:ke},Symbol.toStringTag,{value:"Module"}));function yA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function xA(r,e,t){return e&&yA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Sn,Sc,ai,Vr,Gr,Rs,b0,xo,za,M0,vr,Ci,E0,T0=function(){return Sn||typeof window<"u"&&(Sn=window.gsap)&&Sn.registerPlugin&&Sn},A0=1,Ss=[],ft=[],Zi=[],Ha=Date.now,Mf=function(e,t){return t},SA=function(){var e=za.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,ft),i.push.apply(i,Zi),ft=n,Zi=i,Mf=function(s,a){return t[s](a)}},Kr=function(e,t){return~Zi.indexOf(e)&&Zi[Zi.indexOf(e)+1][t]},Va=function(e){return!!~M0.indexOf(e)},On=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:i!==!1,capture:!!o})},In=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Kl="scrollLeft",Zl="scrollTop",Ef=function(){return vr&&vr.isPressed||ft.cache++},Vc=function(e,t){var n=function i(o){if(o||o===0){A0&&(ai.history.scrollRestoration="manual");var s=vr&&vr.isPressed;o=i.v=Math.round(o)||(vr&&vr.iOS?1:0),e(o),i.cacheID=ft.cache,s&&Mf("ss",o)}else(t||ft.cache!==i.cacheID||Mf("ref"))&&(i.cacheID=ft.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},zn={s:Kl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Vc(function(r){return arguments.length?ai.scrollTo(r,sn.sc()):ai.pageXOffset||Vr[Kl]||Gr[Kl]||Rs[Kl]||0})},sn={s:Zl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:zn,sc:Vc(function(r){return arguments.length?ai.scrollTo(zn.sc(),r):ai.pageYOffset||Vr[Zl]||Gr[Zl]||Rs[Zl]||0})},Wn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Sn.utils.toArray)(e)[0]||(typeof e=="string"&&Sn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},to=function(e,t){var n=t.s,i=t.sc;Va(e)&&(e=Vr.scrollingElement||Gr);var o=ft.indexOf(e),s=i===sn.sc?1:2;!~o&&(o=ft.push(e)-1),ft[o+s]||On(e,"scroll",Ef);var a=ft[o+s],l=a||(ft[o+s]=Vc(Kr(e,n),!0)||(Va(e)?i:Vc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Sn.getProperty(e,"scrollBehavior")==="smooth"),l},Tf=function(e,t,n){var i=e,o=e,s=Ha(),a=s,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Ha();g||m-s>l?(o=i,i=_,a=s,s=m):n?i+=_:i=o+(_-o)/(m-a)*(s-a)},d=function(){o=i=n?0:i,a=s=0},f=function(_){var g=a,m=o,p=Ha();return(_||_===0)&&_!==i&&u(_),s===a||p-a>c?0:(i+(n?m:-m))/((n?p:s)-g)*1e3};return{update:u,reset:d,getVelocity:f}},ma=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Vm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},C0=function(){za=Sn.core.globals().ScrollTrigger,za&&za.core&&SA()},R0=function(e){return Sn=e||T0(),!Sc&&Sn&&typeof document<"u"&&document.body&&(ai=window,Vr=document,Gr=Vr.documentElement,Rs=Vr.body,M0=[ai,Vr,Gr,Rs],Sn.utils.clamp,E0=Sn.core.context||function(){},xo="onpointerenter"in Rs?"pointer":"mouse",b0=Qt.isTouch=ai.matchMedia&&ai.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ai||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ci=Qt.eventTypes=("ontouchstart"in Gr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Gr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return A0=0},500),C0(),Sc=1),Sc};zn.op=sn;ft.cache=0;var Qt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Sc||R0(Sn)||console.warn("Please gsap.registerPlugin(Observer)"),za||C0();var i=n.tolerance,o=n.dragMinimum,s=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,S=n.onDrag,M=n.onPress,v=n.onRelease,E=n.onRight,A=n.onLeft,C=n.onUp,D=n.onDown,w=n.onChangeX,x=n.onChangeY,P=n.onChange,b=n.onToggleX,B=n.onToggleY,X=n.onHover,Y=n.onHoverEnd,q=n.onMove,$=n.ignoreCheck,N=n.isNormalizer,fe=n.onGestureStart,U=n.onGestureEnd,ge=n.onWheel,ze=n.onEnable,Ze=n.onDisable,J=n.onClick,se=n.scrollSpeed,Re=n.capture,ue=n.allowClicks,Me=n.lockAxis,Ye=n.onLockAxis;this.target=a=Wn(a)||Gr,this.vars=n,h&&(h=Sn.utils.toArray(h)),i=i||1e-9,o=o||0,_=_||1,se=se||1,s=s||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ai.getComputedStyle(Rs).lineHeight)||22);var Pe,rt,je,Ue,k,xt,Je,j=this,be=0,nt=0,Fe=n.passive||!u&&n.passive!==!1,He=to(a,zn),wt=to(a,sn),I=He(),T=wt(),H=~s.indexOf("touch")&&!~s.indexOf("pointer")&&Ci[0]==="pointerdown",ee=Va(a),ne=a.ownerDocument||Vr,te=[0,0,0],ie=[0,0,0],me=0,Ie=function(){return me=Ha()},he=function(Ve,Le){return(j.event=Ve)&&h&&~h.indexOf(Ve.target)||Le&&H&&Ve.pointerType!=="touch"||$&&$(Ve,Le)},de=function(){j._vx.reset(),j._vy.reset(),rt.pause(),d&&d(j)},Ee=function(){var Ve=j.deltaX=Vm(te),Le=j.deltaY=Vm(ie),ve=Math.abs(Ve)>=i,et=Math.abs(Le)>=i;P&&(ve||et)&&P(j,Ve,Le,te,ie),ve&&(E&&j.deltaX>0&&E(j),A&&j.deltaX<0&&A(j),w&&w(j),b&&j.deltaX<0!=be<0&&b(j),be=j.deltaX,te[0]=te[1]=te[2]=0),et&&(D&&j.deltaY>0&&D(j),C&&j.deltaY<0&&C(j),x&&x(j),B&&j.deltaY<0!=nt<0&&B(j),nt=j.deltaY,ie[0]=ie[1]=ie[2]=0),(Ue||je)&&(q&&q(j),je&&(m&&je===1&&m(j),S&&S(j),je=0),Ue=!1),xt&&!(xt=!1)&&Ye&&Ye(j),k&&(ge(j),k=!1),Pe=0},ye=function(Ve,Le,ve){te[ve]+=Ve,ie[ve]+=Le,j._vx.update(Ve),j._vy.update(Le),c?Pe||(Pe=requestAnimationFrame(Ee)):Ee()},We=function(Ve,Le){Me&&!Je&&(j.axis=Je=Math.abs(Ve)>Math.abs(Le)?"x":"y",xt=!0),Je!=="y"&&(te[2]+=Ve,j._vx.update(Ve,!0)),Je!=="x"&&(ie[2]+=Le,j._vy.update(Le,!0)),c?Pe||(Pe=requestAnimationFrame(Ee)):Ee()},pe=function(Ve){if(!he(Ve,1)){Ve=ma(Ve,u);var Le=Ve.clientX,ve=Ve.clientY,et=Le-j.x,Ge=ve-j.y,Qe=j.isDragging;j.x=Le,j.y=ve,(Qe||(et||Ge)&&(Math.abs(j.startX-Le)>=o||Math.abs(j.startY-ve)>=o))&&(je=Qe?2:1,Qe||(j.isDragging=!0),We(et,Ge))}},Ke=j.onPress=function(Ae){he(Ae,1)||Ae&&Ae.button||(j.axis=Je=null,rt.pause(),j.isPressed=!0,Ae=ma(Ae),be=nt=0,j.startX=j.x=Ae.clientX,j.startY=j.y=Ae.clientY,j._vx.reset(),j._vy.reset(),On(N?a:ne,Ci[1],pe,Fe,!0),j.deltaX=j.deltaY=0,M&&M(j))},F=j.onRelease=function(Ae){if(!he(Ae,1)){In(N?a:ne,Ci[1],pe,!0);var Ve=!isNaN(j.y-j.startY),Le=j.isDragging,ve=Le&&(Math.abs(j.x-j.startX)>3||Math.abs(j.y-j.startY)>3),et=ma(Ae);!ve&&Ve&&(j._vx.reset(),j._vy.reset(),u&&ue&&Sn.delayedCall(.08,function(){if(Ha()-me>300&&!Ae.defaultPrevented){if(Ae.target.click)Ae.target.click();else if(ne.createEvent){var Ge=ne.createEvent("MouseEvents");Ge.initMouseEvent("click",!0,!0,ai,1,et.screenX,et.screenY,et.clientX,et.clientY,!1,!1,!1,!1,0,null),Ae.target.dispatchEvent(Ge)}}})),j.isDragging=j.isGesturing=j.isPressed=!1,d&&Le&&!N&&rt.restart(!0),je&&Ee(),p&&Le&&p(j),v&&v(j,ve)}},we=function(Ve){return Ve.touches&&Ve.touches.length>1&&(j.isGesturing=!0)&&fe(Ve,j.isDragging)},ae=function(){return(j.isGesturing=!1)||U(j)},Te=function(Ve){if(!he(Ve)){var Le=He(),ve=wt();ye((Le-I)*se,(ve-T)*se,1),I=Le,T=ve,d&&rt.restart(!0)}},oe=function(Ve){if(!he(Ve)){Ve=ma(Ve,u),ge&&(k=!0);var Le=(Ve.deltaMode===1?l:Ve.deltaMode===2?ai.innerHeight:1)*_;ye(Ve.deltaX*Le,Ve.deltaY*Le,0),d&&!N&&rt.restart(!0)}},re=function(Ve){if(!he(Ve)){var Le=Ve.clientX,ve=Ve.clientY,et=Le-j.x,Ge=ve-j.y;j.x=Le,j.y=ve,Ue=!0,d&&rt.restart(!0),(et||Ge)&&We(et,Ge)}},Oe=function(Ve){j.event=Ve,X(j)},Ne=function(Ve){j.event=Ve,Y(j)},ot=function(Ve){return he(Ve)||ma(Ve,u)&&J(j)};rt=j._dc=Sn.delayedCall(f||.25,de).pause(),j.deltaX=j.deltaY=0,j._vx=Tf(0,50,!0),j._vy=Tf(0,50,!0),j.scrollX=He,j.scrollY=wt,j.isDragging=j.isGesturing=j.isPressed=!1,E0(this),j.enable=function(Ae){return j.isEnabled||(On(ee?ne:a,"scroll",Ef),s.indexOf("scroll")>=0&&On(ee?ne:a,"scroll",Te,Fe,Re),s.indexOf("wheel")>=0&&On(a,"wheel",oe,Fe,Re),(s.indexOf("touch")>=0&&b0||s.indexOf("pointer")>=0)&&(On(a,Ci[0],Ke,Fe,Re),On(ne,Ci[2],F),On(ne,Ci[3],F),ue&&On(a,"click",Ie,!0,!0),J&&On(a,"click",ot),fe&&On(ne,"gesturestart",we),U&&On(ne,"gestureend",ae),X&&On(a,xo+"enter",Oe),Y&&On(a,xo+"leave",Ne),q&&On(a,xo+"move",re)),j.isEnabled=!0,j.isDragging=j.isGesturing=j.isPressed=Ue=je=!1,j._vx.reset(),j._vy.reset(),I=He(),T=wt(),Ae&&Ae.type&&Ke(Ae),ze&&ze(j)),j},j.disable=function(){j.isEnabled&&(Ss.filter(function(Ae){return Ae!==j&&Va(Ae.target)}).length||In(ee?ne:a,"scroll",Ef),j.isPressed&&(j._vx.reset(),j._vy.reset(),In(N?a:ne,Ci[1],pe,!0)),In(ee?ne:a,"scroll",Te,Re),In(a,"wheel",oe,Re),In(a,Ci[0],Ke,Re),In(ne,Ci[2],F),In(ne,Ci[3],F),In(a,"click",Ie,!0),In(a,"click",ot),In(ne,"gesturestart",we),In(ne,"gestureend",ae),In(a,xo+"enter",Oe),In(a,xo+"leave",Ne),In(a,xo+"move",re),j.isEnabled=j.isPressed=j.isDragging=!1,Ze&&Ze(j))},j.kill=j.revert=function(){j.disable();var Ae=Ss.indexOf(j);Ae>=0&&Ss.splice(Ae,1),vr===j&&(vr=0)},Ss.push(j),N&&Va(a)&&(vr=j),j.enable(g)},xA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Qt.version="3.12.7";Qt.create=function(r){return new Qt(r)};Qt.register=R0;Qt.getAll=function(){return Ss.slice()};Qt.getById=function(r){return Ss.filter(function(e){return e.vars.id===r})[0]};T0()&&Sn.registerPlugin(Qt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Be,ms,dt,zt,oi,At,Ah,Gc,fl,Ga,Ma,Jl,Tn,ru,Af,Fn,Gm,Wm,gs,P0,td,L0,Un,Cf,D0,I0,Nr,Rf,Ch,Ps,Rh,Wc,Pf,nd,Ql=1,An=Date.now,id=An(),bi=0,Ea=0,Xm=function(e,t,n){var i=ii(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},qm=function(e,t){return t&&(!ii(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},wA=function r(){return Ea&&requestAnimationFrame(r)},Ym=function(){return ru=1},jm=function(){return ru=0},Gi=function(e){return e},Ta=function(e){return Math.round(e*1e5)/1e5||0},O0=function(){return typeof window<"u"},N0=function(){return Be||O0()&&(Be=window.gsap)&&Be.registerPlugin&&Be},zo=function(e){return!!~Ah.indexOf(e)},U0=function(e){return(e==="Height"?Rh:dt["inner"+e])||oi["client"+e]||At["client"+e]},F0=function(e){return Kr(e,"getBoundingClientRect")||(zo(e)?function(){return Tc.width=dt.innerWidth,Tc.height=Rh,Tc}:function(){return pr(e)})},bA=function(e,t,n){var i=n.d,o=n.d2,s=n.a;return(s=Kr(e,"getBoundingClientRect"))?function(){return s()[i]}:function(){return(t?U0(o):e["client"+o])||0}},MA=function(e,t){return!t||~Zi.indexOf(e)?F0(e):function(){return Tc}},Yi=function(e,t){var n=t.s,i=t.d2,o=t.d,s=t.a;return Math.max(0,(n="scroll"+i)&&(s=Kr(e,n))?s()-F0(e)()[o]:zo(e)?(oi[n]||At[n])-U0(i):e[n]-e["offset"+i])},ec=function(e,t){for(var n=0;n<gs.length;n+=3)(!t||~t.indexOf(gs[n+1]))&&e(gs[n],gs[n+1],gs[n+2])},ii=function(e){return typeof e=="string"},Rn=function(e){return typeof e=="function"},Aa=function(e){return typeof e=="number"},So=function(e){return typeof e=="object"},ga=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},rd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},cs=Math.abs,k0="left",B0="top",Ph="right",Lh="bottom",Oo="width",No="height",Wa="Right",Xa="Left",qa="Top",Ya="Bottom",tn="padding",gi="margin",$s="Width",Dh="Height",on="px",_i=function(e){return dt.getComputedStyle(e)},EA=function(e){var t=_i(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},$m=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},pr=function(e,t){var n=t&&_i(e)[Af]!=="matrix(1, 0, 0, 1, 0, 0)"&&Be.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Xc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},z0=function(e){var t=[],n=e.labels,i=e.duration(),o;for(o in n)t.push(n[o]/i);return t},TA=function(e){return function(t){return Be.utils.snap(z0(e),t)}},Ih=function(e){var t=Be.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,o){return i-o});return n?function(i,o,s){s===void 0&&(s=.001);var a;if(!o)return t(i);if(o>0){for(i-=s,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=s;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,o,s){s===void 0&&(s=.001);var a=t(i);return!o||Math.abs(a-i)<s||a-i<0==o<0?a:t(o<0?i-e:i+e)}},AA=function(e){return function(t,n){return Ih(z0(e))(t,n.direction)}},tc=function(e,t,n,i){return n.split(",").forEach(function(o){return e(t,o,i)})},mn=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:!i,capture:!!o})},pn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},nc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Km={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ic={toggleActions:"play",anticipatePin:0},qc={top:0,left:0,center:.5,bottom:1,right:1},wc=function(e,t){if(ii(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in qc?qc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},rc=function(e,t,n,i,o,s,a,l){var c=o.startColor,u=o.endColor,d=o.fontSize,f=o.indent,h=o.fontWeight,_=zt.createElement("div"),g=zo(n)||Kr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?At:n,S=e.indexOf("start")!==-1,M=S?c:u,v="border-color:"+M+";font-size:"+d+";color:"+M+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===sn?Ph:Lh)+":"+(s+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=S,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],bc(_,0,i,S),_},bc=function(e,t,n,i){var o={display:"block"},s=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,o[n.a+"Percent"]=i?-100:0,o[n.a]=i?"1px":0,o["border"+s+$s]=1,o["border"+a+$s]=0,o[n.p]=t+"px",Be.set(e,o)},ut=[],Lf={},hl,Zm=function(){return An()-bi>34&&(hl||(hl=requestAnimationFrame(wr)))},us=function(){(!Un||!Un.isPressed||Un.startX>At.clientWidth)&&(ft.cache++,Un?hl||(hl=requestAnimationFrame(wr)):wr(),bi||Vo("scrollStart"),bi=An())},od=function(){I0=dt.innerWidth,D0=dt.innerHeight},Ca=function(e){ft.cache++,(e===!0||!Tn&&!L0&&!zt.fullscreenElement&&!zt.webkitFullscreenElement&&(!Cf||I0!==dt.innerWidth||Math.abs(dt.innerHeight-D0)>dt.innerHeight*.25))&&Gc.restart(!0)},Ho={},CA=[],H0=function r(){return pn(Xe,"scrollEnd",r)||To(!0)},Vo=function(e){return Ho[e]&&Ho[e].map(function(t){return t()})||CA},ni=[],V0=function(e){for(var t=0;t<ni.length;t+=5)(!e||ni[t+4]&&ni[t+4].query===e)&&(ni[t].style.cssText=ni[t+1],ni[t].getBBox&&ni[t].setAttribute("transform",ni[t+2]||""),ni[t+3].uncache=1)},Oh=function(e,t){var n;for(Fn=0;Fn<ut.length;Fn++)n=ut[Fn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Wc=!0,t&&V0(t),t||Vo("revert")},G0=function(e,t){ft.cache++,(t||!kn)&&ft.forEach(function(n){return Rn(n)&&n.cacheID++&&(n.rec=0)}),ii(e)&&(dt.history.scrollRestoration=Ch=e)},kn,Uo=0,Jm,RA=function(){if(Jm!==Uo){var e=Jm=Uo;requestAnimationFrame(function(){return e===Uo&&To(!0)})}},W0=function(){At.appendChild(Ps),Rh=!Un&&Ps.offsetHeight||dt.innerHeight,At.removeChild(Ps)},Qm=function(e){return fl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},To=function(e,t){if(oi=zt.documentElement,At=zt.body,Ah=[dt,zt,oi,At],bi&&!e&&!Wc){mn(Xe,"scrollEnd",H0);return}W0(),kn=Xe.isRefreshing=!0,ft.forEach(function(i){return Rn(i)&&++i.cacheID&&(i.rec=i())});var n=Vo("refreshInit");P0&&Xe.sort(),t||Oh(),ft.forEach(function(i){Rn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ut.slice(0).forEach(function(i){return i.refresh()}),Wc=!1,ut.forEach(function(i){if(i._subPinOffset&&i.pin){var o=i.vars.horizontal?"offsetWidth":"offsetHeight",s=i.pin[o];i.revert(!0,1),i.adjustPinSpacing(i.pin[o]-s),i.refresh()}}),Pf=1,Qm(!0),ut.forEach(function(i){var o=Yi(i.scroller,i._dir),s=i.vars.end==="max"||i._endClamp&&i.end>o,a=i._startClamp&&i.start>=o;(s||a)&&i.setPositions(a?o-1:i.start,s?Math.max(a?o:i.start+1,o):i.end,!0)}),Qm(!1),Pf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ft.forEach(function(i){Rn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),G0(Ch,1),Gc.pause(),Uo++,kn=2,wr(2),ut.forEach(function(i){return Rn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),kn=Xe.isRefreshing=!1,Vo("refresh")},Df=0,Mc=1,ja,wr=function(e){if(e===2||!kn&&!Wc){Xe.isUpdating=!0,ja&&ja.update(0);var t=ut.length,n=An(),i=n-id>=50,o=t&&ut[0].scroll();if(Mc=Df>o?-1:1,kn||(Df=o),i&&(bi&&!ru&&n-bi>200&&(bi=0,Vo("scrollEnd")),Ma=id,id=n),Mc<0){for(Fn=t;Fn-- >0;)ut[Fn]&&ut[Fn].update(0,i);Mc=1}else for(Fn=0;Fn<t;Fn++)ut[Fn]&&ut[Fn].update(0,i);Xe.isUpdating=!1}hl=0},If=[k0,B0,Lh,Ph,gi+Ya,gi+Wa,gi+qa,gi+Xa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ec=If.concat([Oo,No,"boxSizing","max"+$s,"max"+Dh,"position",gi,tn,tn+qa,tn+Wa,tn+Ya,tn+Xa]),PA=function(e,t,n){Ls(n);var i=e._gsap;if(i.spacerIsNative)Ls(i.spacerState);else if(e._gsap.swappedIn){var o=t.parentNode;o&&(o.insertBefore(e,t),o.removeChild(t))}e._gsap.swappedIn=!1},sd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var o=If.length,s=t.style,a=e.style,l;o--;)l=If[o],s[l]=n[l];s.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(s.display="inline-block"),a[Lh]=a[Ph]="auto",s.flexBasis=n.flexBasis||"auto",s.overflow="visible",s.boxSizing="border-box",s[Oo]=Xc(e,zn)+on,s[No]=Xc(e,sn)+on,s[tn]=a[gi]=a[B0]=a[k0]="0",Ls(i),a[Oo]=a["max"+$s]=n[Oo],a[No]=a["max"+Dh]=n[No],a[tn]=n[tn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},LA=/([A-Z])/g,Ls=function(e){if(e){var t=e.t.style,n=e.length,i=0,o,s;for((e.t._gsap||Be.core.getCache(e.t)).uncache=1;i<n;i+=2)s=e[i+1],o=e[i],s?t[o]=s:t[o]&&t.removeProperty(o.replace(LA,"-$1").toLowerCase())}},oc=function(e){for(var t=Ec.length,n=e.style,i=[],o=0;o<t;o++)i.push(Ec[o],n[Ec[o]]);return i.t=e,i},DA=function(e,t,n){for(var i=[],o=e.length,s=n?8:0,a;s<o;s+=2)a=e[s],i.push(a,a in t?t[a]:e[s+1]);return i.t=e.t,i},Tc={left:0,top:0},eg=function(e,t,n,i,o,s,a,l,c,u,d,f,h,_){Rn(e)&&(e=e(l)),ii(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?wc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,S;if(h&&h.seek(0),isNaN(e)||(e=+e),Aa(e))h&&(e=Be.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&bc(a,n,i,!0);else{Rn(t)&&(t=t(l));var M=(e||"0").split(" "),v,E,A,C;S=Wn(t,l)||At,v=pr(S)||{},(!v||!v.left&&!v.top)&&_i(S).display==="none"&&(C=S.style.display,S.style.display="block",v=pr(S),C?S.style.display=C:S.style.removeProperty("display")),E=wc(M[0],v[i.d]),A=wc(M[1]||"0",n),e=v[i.p]-c[i.p]-u+E+o-A,a&&bc(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(_&&(l[_]=e||-.001,e<0&&(e=0)),s){var D=e+n,w=s._isStart;m="scroll"+i.d2,bc(s,D,i,w&&D>20||!w&&(d?Math.max(At[m],oi[m]):s.parentNode[m])<=D+1),d&&(c=pr(a),d&&(s.style[i.op.p]=c[i.op.p]-i.op.m-s._offset+on))}return h&&S&&(m=pr(S),h.seek(f),p=pr(S),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},IA=/(webkit|moz|length|cssText|inset)/i,tg=function(e,t,n,i){if(e.parentNode!==t){var o=e.style,s,a;if(t===At){e._stOrig=o.cssText,a=_i(e);for(s in a)!+s&&!IA.test(s)&&a[s]&&typeof o[s]=="string"&&s!=="0"&&(o[s]=a[s]);o.top=n,o.left=i}else o.cssText=e._stOrig;Be.core.getCache(e).uncache=1,t.appendChild(e)}},X0=function(e,t,n){var i=t,o=i;return function(s){var a=Math.round(e());return a!==i&&a!==o&&Math.abs(a-i)>3&&Math.abs(a-o)>3&&(s=a,n&&n()),o=i,i=Math.round(s),i}},sc=function(e,t,n){var i={};i[t.p]="+="+n,Be.set(e,i)},ng=function(e,t){var n=to(e,t),i="_scroll"+t.p2,o=function s(a,l,c,u,d){var f=s.tween,h=l.onComplete,_={};c=c||n();var g=X0(n,c,function(){f.kill(),s.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){ft.cache++,s.tween&&wr()},l.onComplete=function(){s.tween=0,h&&h.call(f)},f=s.tween=Be.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return o.tween&&o.tween.kill()&&(o.tween=0)},mn(e,"wheel",n.wheelHandler),Xe.isTouch&&mn(e,"touchmove",n.wheelHandler),o},Xe=function(){function r(t,n){ms||r.register(Be)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Rf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ea){this.update=this.refresh=this.kill=Gi;return}n=$m(ii(n)||Aa(n)||n.nodeType?{trigger:n}:n,ic);var o=n,s=o.onUpdate,a=o.toggleClass,l=o.id,c=o.onToggle,u=o.onRefresh,d=o.scrub,f=o.trigger,h=o.pin,_=o.pinSpacing,g=o.invalidateOnRefresh,m=o.anticipatePin,p=o.onScrubComplete,S=o.onSnapComplete,M=o.once,v=o.snap,E=o.pinReparent,A=o.pinSpacer,C=o.containerAnimation,D=o.fastScrollEnd,w=o.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?zn:sn,P=!d&&d!==0,b=Wn(n.scroller||dt),B=Be.core.getCache(b),X=zo(b),Y=("pinType"in n?n.pinType:Kr(b,"pinType")||X&&"fixed")==="fixed",q=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],$=P&&n.toggleActions.split(" "),N="markers"in n?n.markers:ic.markers,fe=X?0:parseFloat(_i(b)["border"+x.p2+$s])||0,U=this,ge=n.onRefreshInit&&function(){return n.onRefreshInit(U)},ze=bA(b,X,x),Ze=MA(b,X),J=0,se=0,Re=0,ue=to(b,x),Me,Ye,Pe,rt,je,Ue,k,xt,Je,j,be,nt,Fe,He,wt,I,T,H,ee,ne,te,ie,me,Ie,he,de,Ee,ye,We,pe,Ke,F,we,ae,Te,oe,re,Oe,Ne;if(U._startClamp=U._endClamp=!1,U._dir=x,m*=45,U.scroller=b,U.scroll=C?C.time.bind(C):ue,rt=ue(),U.vars=n,i=i||n.animation,"refreshPriority"in n&&(P0=1,n.refreshPriority===-9999&&(ja=U)),B.tweenScroll=B.tweenScroll||{top:ng(b,sn),left:ng(b,zn)},U.tweenTo=Me=B.tweenScroll[x.p],U.scrubDuration=function(ve){we=Aa(ve)&&ve,we?F?F.duration(ve):F=Be.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:we,paused:!0,onComplete:function(){return p&&p(U)}}):(F&&F.progress(1).kill(),F=0)},i&&(i.vars.lazy=!1,i._initted&&!U.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),U.animation=i.pause(),i.scrollTrigger=U,U.scrubDuration(d),pe=0,l||(l=i.vars.id)),v&&((!So(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in At.style&&Be.set(X?[At,oi]:b,{scrollBehavior:"auto"}),ft.forEach(function(ve){return Rn(ve)&&ve.target===(X?zt.scrollingElement||oi:b)&&(ve.smooth=!1)}),Pe=Rn(v.snapTo)?v.snapTo:v.snapTo==="labels"?TA(i):v.snapTo==="labelsDirectional"?AA(i):v.directional!==!1?function(ve,et){return Ih(v.snapTo)(ve,An()-se<500?0:et.direction)}:Be.utils.snap(v.snapTo),ae=v.duration||{min:.1,max:2},ae=So(ae)?Ga(ae.min,ae.max):Ga(ae,ae),Te=Be.delayedCall(v.delay||we/2||.1,function(){var ve=ue(),et=An()-se<500,Ge=Me.tween;if((et||Math.abs(U.getVelocity())<10)&&!Ge&&!ru&&J!==ve){var Qe=(ve-Ue)/He,Wt=i&&!P?i.totalProgress():Qe,st=et?0:(Wt-Ke)/(An()-Ma)*1e3||0,It=Be.utils.clamp(-Qe,1-Qe,cs(st/2)*st/.185),bt=Qe+(v.inertia===!1?0:It),Ct,Et,St=v,un=St.onStart,Tt=St.onInterrupt,Bt=St.onComplete;if(Ct=Pe(bt,U),Aa(Ct)||(Ct=bt),Et=Math.max(0,Math.round(Ue+Ct*He)),ve<=k&&ve>=Ue&&Et!==ve){if(Ge&&!Ge._initted&&Ge.data<=cs(Et-ve))return;v.inertia===!1&&(It=Ct-Qe),Me(Et,{duration:ae(cs(Math.max(cs(bt-Wt),cs(Ct-Wt))*.185/st/.05||0)),ease:v.ease||"power3",data:cs(Et-ve),onInterrupt:function(){return Te.restart(!0)&&Tt&&Tt(U)},onComplete:function(){U.update(),J=ue(),i&&!P&&(F?F.resetTo("totalProgress",Ct,i._tTime/i._tDur):i.progress(Ct)),pe=Ke=i&&!P?i.totalProgress():U.progress,S&&S(U),Bt&&Bt(U)}},ve,It*He,Et-ve-It*He),un&&un(U,Me.tween)}}else U.isActive&&J!==ve&&Te.restart(!0)}).pause()),l&&(Lf[l]=U),f=U.trigger=Wn(f||h!==!0&&h),Ne=f&&f._gsap&&f._gsap.stRevert,Ne&&(Ne=Ne(U)),h=h===!0?f:Wn(h),ii(a)&&(a={targets:f,className:a}),h&&(_===!1||_===gi||(_=!_&&h.parentNode&&h.parentNode.style&&_i(h.parentNode).display==="flex"?!1:tn),U.pin=h,Ye=Be.core.getCache(h),Ye.spacer?wt=Ye.pinState:(A&&(A=Wn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),Ye.spacerIsNative=!!A,A&&(Ye.spacerState=oc(A))),Ye.spacer=H=A||zt.createElement("div"),H.classList.add("pin-spacer"),l&&H.classList.add("pin-spacer-"+l),Ye.pinState=wt=oc(h)),n.force3D!==!1&&Be.set(h,{force3D:!0}),U.spacer=H=Ye.spacer,We=_i(h),Ie=We[_+x.os2],ne=Be.getProperty(h),te=Be.quickSetter(h,x.a,on),sd(h,H,We),T=oc(h)),N){nt=So(N)?$m(N,Km):Km,j=rc("scroller-start",l,b,x,nt,0),be=rc("scroller-end",l,b,x,nt,0,j),ee=j["offset"+x.op.d2];var ot=Wn(Kr(b,"content")||b);xt=this.markerStart=rc("start",l,ot,x,nt,ee,0,C),Je=this.markerEnd=rc("end",l,ot,x,nt,ee,0,C),C&&(Oe=Be.quickSetter([xt,Je],x.a,on)),!Y&&!(Zi.length&&Kr(b,"fixedMarkers")===!0)&&(EA(X?At:b),Be.set([j,be],{force3D:!0}),de=Be.quickSetter(j,x.a,on),ye=Be.quickSetter(be,x.a,on))}if(C){var Ae=C.vars.onUpdate,Ve=C.vars.onUpdateParams;C.eventCallback("onUpdate",function(){U.update(0,0,1),Ae&&Ae.apply(C,Ve||[])})}if(U.previous=function(){return ut[ut.indexOf(U)-1]},U.next=function(){return ut[ut.indexOf(U)+1]},U.revert=function(ve,et){if(!et)return U.kill(!0);var Ge=ve!==!1||!U.enabled,Qe=Tn;Ge!==U.isReverted&&(Ge&&(oe=Math.max(ue(),U.scroll.rec||0),Re=U.progress,re=i&&i.progress()),xt&&[xt,Je,j,be].forEach(function(Wt){return Wt.style.display=Ge?"none":"block"}),Ge&&(Tn=U,U.update(Ge)),h&&(!E||!U.isActive)&&(Ge?PA(h,H,wt):sd(h,H,_i(h),he)),Ge||U.update(Ge),Tn=Qe,U.isReverted=Ge)},U.refresh=function(ve,et,Ge,Qe){if(!((Tn||!U.enabled)&&!et)){if(h&&ve&&bi){mn(r,"scrollEnd",H0);return}!kn&&ge&&ge(U),Tn=U,Me.tween&&!Ge&&(Me.tween.kill(),Me.tween=0),F&&F.pause(),g&&i&&i.revert({kill:!1}).invalidate(),U.isReverted||U.revert(!0,!0),U._subPinOffset=!1;var Wt=ze(),st=Ze(),It=C?C.duration():Yi(b,x),bt=He<=.01,Ct=0,Et=Qe||0,St=So(Ge)?Ge.end:n.end,un=n.endTrigger||f,Tt=So(Ge)?Ge.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Bt=U.pinnedContainer=n.pinnedContainer&&Wn(n.pinnedContainer,U),dn=f&&Math.max(0,ut.indexOf(U))||0,jt=dn,$t,L,z,K,y,R,O,V,Q,G,le,_e,xe;for(N&&So(Ge)&&(_e=Be.getProperty(j,x.p),xe=Be.getProperty(be,x.p));jt-- >0;)R=ut[jt],R.end||R.refresh(0,1)||(Tn=U),O=R.pin,O&&(O===f||O===h||O===Bt)&&!R.isReverted&&(G||(G=[]),G.unshift(R),R.revert(!0,!0)),R!==ut[jt]&&(dn--,jt--);for(Rn(Tt)&&(Tt=Tt(U)),Tt=Xm(Tt,"start",U),Ue=eg(Tt,f,Wt,x,ue(),xt,j,U,st,fe,Y,It,C,U._startClamp&&"_startClamp")||(h?-.001:0),Rn(St)&&(St=St(U)),ii(St)&&!St.indexOf("+=")&&(~St.indexOf(" ")?St=(ii(Tt)?Tt.split(" ")[0]:"")+St:(Ct=wc(St.substr(2),Wt),St=ii(Tt)?Tt:(C?Be.utils.mapRange(0,C.duration(),C.scrollTrigger.start,C.scrollTrigger.end,Ue):Ue)+Ct,un=f)),St=Xm(St,"end",U),k=Math.max(Ue,eg(St||(un?"100% 0":It),un,Wt,x,ue()+Ct,Je,be,U,st,fe,Y,It,C,U._endClamp&&"_endClamp"))||-.001,Ct=0,jt=dn;jt--;)R=ut[jt],O=R.pin,O&&R.start-R._pinPush<=Ue&&!C&&R.end>0&&($t=R.end-(U._startClamp?Math.max(0,R.start):R.start),(O===f&&R.start-R._pinPush<Ue||O===Bt)&&isNaN(Tt)&&(Ct+=$t*(1-R.progress)),O===h&&(Et+=$t));if(Ue+=Ct,k+=Ct,U._startClamp&&(U._startClamp+=Ct),U._endClamp&&!kn&&(U._endClamp=k||-.001,k=Math.min(k,Yi(b,x))),He=k-Ue||(Ue-=.01)&&.001,bt&&(Re=Be.utils.clamp(0,1,Be.utils.normalize(Ue,k,oe))),U._pinPush=Et,xt&&Ct&&($t={},$t[x.a]="+="+Ct,Bt&&($t[x.p]="-="+ue()),Be.set([xt,Je],$t)),h&&!(Pf&&U.end>=Yi(b,x)))$t=_i(h),K=x===sn,z=ue(),ie=parseFloat(ne(x.a))+Et,!It&&k>1&&(le=(X?zt.scrollingElement||oi:b).style,le={style:le,value:le["overflow"+x.a.toUpperCase()]},X&&_i(At)["overflow"+x.a.toUpperCase()]!=="scroll"&&(le.style["overflow"+x.a.toUpperCase()]="scroll")),sd(h,H,$t),T=oc(h),L=pr(h,!0),V=Y&&to(b,K?zn:sn)(),_?(he=[_+x.os2,He+Et+on],he.t=H,jt=_===tn?Xc(h,x)+He+Et:0,jt&&(he.push(x.d,jt+on),H.style.flexBasis!=="auto"&&(H.style.flexBasis=jt+on)),Ls(he),Bt&&ut.forEach(function(Ce){Ce.pin===Bt&&Ce.vars.pinSpacing!==!1&&(Ce._subPinOffset=!0)}),Y&&ue(oe)):(jt=Xc(h,x),jt&&H.style.flexBasis!=="auto"&&(H.style.flexBasis=jt+on)),Y&&(y={top:L.top+(K?z-Ue:V)+on,left:L.left+(K?V:z-Ue)+on,boxSizing:"border-box",position:"fixed"},y[Oo]=y["max"+$s]=Math.ceil(L.width)+on,y[No]=y["max"+Dh]=Math.ceil(L.height)+on,y[gi]=y[gi+qa]=y[gi+Wa]=y[gi+Ya]=y[gi+Xa]="0",y[tn]=$t[tn],y[tn+qa]=$t[tn+qa],y[tn+Wa]=$t[tn+Wa],y[tn+Ya]=$t[tn+Ya],y[tn+Xa]=$t[tn+Xa],I=DA(wt,y,E),kn&&ue(0)),i?(Q=i._initted,td(1),i.render(i.duration(),!0,!0),me=ne(x.a)-ie+He+Et,Ee=Math.abs(He-me)>1,Y&&Ee&&I.splice(I.length-2,2),i.render(0,!0,!0),Q||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),td(0)):me=He,le&&(le.value?le.style["overflow"+x.a.toUpperCase()]=le.value:le.style.removeProperty("overflow-"+x.a));else if(f&&ue()&&!C)for(L=f.parentNode;L&&L!==At;)L._pinOffset&&(Ue-=L._pinOffset,k-=L._pinOffset),L=L.parentNode;G&&G.forEach(function(Ce){return Ce.revert(!1,!0)}),U.start=Ue,U.end=k,rt=je=kn?oe:ue(),!C&&!kn&&(rt<oe&&ue(oe),U.scroll.rec=0),U.revert(!1,!0),se=An(),Te&&(J=-1,Te.restart(!0)),Tn=0,i&&P&&(i._initted||re)&&i.progress()!==re&&i.progress(re||0,!0).render(i.time(),!0,!0),(bt||Re!==U.progress||C||g||i&&!i._initted)&&(i&&!P&&i.totalProgress(C&&Ue<-.001&&!Re?Be.utils.normalize(Ue,k,0):Re,!0),U.progress=bt||(rt-Ue)/He===Re?0:Re),h&&_&&(H._pinOffset=Math.round(U.progress*me)),F&&F.invalidate(),isNaN(_e)||(_e-=Be.getProperty(j,x.p),xe-=Be.getProperty(be,x.p),sc(j,x,_e),sc(xt,x,_e-(Qe||0)),sc(be,x,xe),sc(Je,x,xe-(Qe||0))),bt&&!kn&&U.update(),u&&!kn&&!Fe&&(Fe=!0,u(U),Fe=!1)}},U.getVelocity=function(){return(ue()-je)/(An()-Ma)*1e3||0},U.endAnimation=function(){ga(U.callbackAnimation),i&&(F?F.progress(1):i.paused()?P||ga(i,U.direction<0,1):ga(i,i.reversed()))},U.labelToScroll=function(ve){return i&&i.labels&&(Ue||U.refresh()||Ue)+i.labels[ve]/i.duration()*He||0},U.getTrailing=function(ve){var et=ut.indexOf(U),Ge=U.direction>0?ut.slice(0,et).reverse():ut.slice(et+1);return(ii(ve)?Ge.filter(function(Qe){return Qe.vars.preventOverlaps===ve}):Ge).filter(function(Qe){return U.direction>0?Qe.end<=Ue:Qe.start>=k})},U.update=function(ve,et,Ge){if(!(C&&!Ge&&!ve)){var Qe=kn===!0?oe:U.scroll(),Wt=ve?0:(Qe-Ue)/He,st=Wt<0?0:Wt>1?1:Wt||0,It=U.progress,bt,Ct,Et,St,un,Tt,Bt,dn;if(et&&(je=rt,rt=C?ue():Qe,v&&(Ke=pe,pe=i&&!P?i.totalProgress():st)),m&&h&&!Tn&&!Ql&&bi&&(!st&&Ue<Qe+(Qe-je)/(An()-Ma)*m?st=1e-4:st===1&&k>Qe+(Qe-je)/(An()-Ma)*m&&(st=.9999)),st!==It&&U.enabled){if(bt=U.isActive=!!st&&st<1,Ct=!!It&&It<1,Tt=bt!==Ct,un=Tt||!!st!=!!It,U.direction=st>It?1:-1,U.progress=st,un&&!Tn&&(Et=st&&!It?0:st===1?1:It===1?2:3,P&&(St=!Tt&&$[Et+1]!=="none"&&$[Et+1]||$[Et],dn=i&&(St==="complete"||St==="reset"||St in i))),w&&(Tt||dn)&&(dn||d||!i)&&(Rn(w)?w(U):U.getTrailing(w).forEach(function(z){return z.endAnimation()})),P||(F&&!Tn&&!Ql?(F._dp._time-F._start!==F._time&&F.render(F._dp._time-F._start),F.resetTo?F.resetTo("totalProgress",st,i._tTime/i._tDur):(F.vars.totalProgress=st,F.invalidate().restart())):i&&i.totalProgress(st,!!(Tn&&(se||ve)))),h){if(ve&&_&&(H.style[_+x.os2]=Ie),!Y)te(Ta(ie+me*st));else if(un){if(Bt=!ve&&st>It&&k+1>Qe&&Qe+1>=Yi(b,x),E)if(!ve&&(bt||Bt)){var jt=pr(h,!0),$t=Qe-Ue;tg(h,At,jt.top+(x===sn?$t:0)+on,jt.left+(x===sn?0:$t)+on)}else tg(h,H);Ls(bt||Bt?I:T),Ee&&st<1&&bt||te(ie+(st===1&&!Bt?me:0))}}v&&!Me.tween&&!Tn&&!Ql&&Te.restart(!0),a&&(Tt||M&&st&&(st<1||!nd))&&fl(a.targets).forEach(function(z){return z.classList[bt||M?"add":"remove"](a.className)}),s&&!P&&!ve&&s(U),un&&!Tn?(P&&(dn&&(St==="complete"?i.pause().totalProgress(1):St==="reset"?i.restart(!0).pause():St==="restart"?i.restart(!0):i[St]()),s&&s(U)),(Tt||!nd)&&(c&&Tt&&rd(U,c),q[Et]&&rd(U,q[Et]),M&&(st===1?U.kill(!1,1):q[Et]=0),Tt||(Et=st===1?1:3,q[Et]&&rd(U,q[Et]))),D&&!bt&&Math.abs(U.getVelocity())>(Aa(D)?D:2500)&&(ga(U.callbackAnimation),F?F.progress(1):ga(i,St==="reverse"?1:!st,1))):P&&s&&!Tn&&s(U)}if(ye){var L=C?Qe/C.duration()*(C._caScrollDist||0):Qe;de(L+(j._isFlipped?1:0)),ye(L)}Oe&&Oe(-Qe/C.duration()*(C._caScrollDist||0))}},U.enable=function(ve,et){U.enabled||(U.enabled=!0,mn(b,"resize",Ca),X||mn(b,"scroll",us),ge&&mn(r,"refreshInit",ge),ve!==!1&&(U.progress=Re=0,rt=je=J=ue()),et!==!1&&U.refresh())},U.getTween=function(ve){return ve&&Me?Me.tween:F},U.setPositions=function(ve,et,Ge,Qe){if(C){var Wt=C.scrollTrigger,st=C.duration(),It=Wt.end-Wt.start;ve=Wt.start+It*ve/st,et=Wt.start+It*et/st}U.refresh(!1,!1,{start:qm(ve,Ge&&!!U._startClamp),end:qm(et,Ge&&!!U._endClamp)},Qe),U.update()},U.adjustPinSpacing=function(ve){if(he&&ve){var et=he.indexOf(x.d)+1;he[et]=parseFloat(he[et])+ve+on,he[1]=parseFloat(he[1])+ve+on,Ls(he)}},U.disable=function(ve,et){if(U.enabled&&(ve!==!1&&U.revert(!0,!0),U.enabled=U.isActive=!1,et||F&&F.pause(),oe=0,Ye&&(Ye.uncache=1),ge&&pn(r,"refreshInit",ge),Te&&(Te.pause(),Me.tween&&Me.tween.kill()&&(Me.tween=0)),!X)){for(var Ge=ut.length;Ge--;)if(ut[Ge].scroller===b&&ut[Ge]!==U)return;pn(b,"resize",Ca),X||pn(b,"scroll",us)}},U.kill=function(ve,et){U.disable(ve,et),F&&!et&&F.kill(),l&&delete Lf[l];var Ge=ut.indexOf(U);Ge>=0&&ut.splice(Ge,1),Ge===Fn&&Mc>0&&Fn--,Ge=0,ut.forEach(function(Qe){return Qe.scroller===U.scroller&&(Ge=1)}),Ge||kn||(U.scroll.rec=0),i&&(i.scrollTrigger=null,ve&&i.revert({kill:!1}),et||i.kill()),xt&&[xt,Je,j,be].forEach(function(Qe){return Qe.parentNode&&Qe.parentNode.removeChild(Qe)}),ja===U&&(ja=0),h&&(Ye&&(Ye.uncache=1),Ge=0,ut.forEach(function(Qe){return Qe.pin===h&&Ge++}),Ge||(Ye.spacer=0)),n.onKill&&n.onKill(U)},ut.push(U),U.enable(!1,!1),Ne&&Ne(U),i&&i.add&&!He){var Le=U.update;U.update=function(){U.update=Le,ft.cache++,Ue||k||U.refresh()},Be.delayedCall(.01,U.update),He=.01,Ue=k=0}else U.refresh();h&&RA()},r.register=function(n){return ms||(Be=n||N0(),O0()&&window.document&&r.enable(),ms=Ea),ms},r.defaults=function(n){if(n)for(var i in n)ic[i]=n[i];return ic},r.disable=function(n,i){Ea=0,ut.forEach(function(s){return s[i?"kill":"disable"](n)}),pn(dt,"wheel",us),pn(zt,"scroll",us),clearInterval(Jl),pn(zt,"touchcancel",Gi),pn(At,"touchstart",Gi),tc(pn,zt,"pointerdown,touchstart,mousedown",Ym),tc(pn,zt,"pointerup,touchend,mouseup",jm),Gc.kill(),ec(pn);for(var o=0;o<ft.length;o+=3)nc(pn,ft[o],ft[o+1]),nc(pn,ft[o],ft[o+2])},r.enable=function(){if(dt=window,zt=document,oi=zt.documentElement,At=zt.body,Be&&(fl=Be.utils.toArray,Ga=Be.utils.clamp,Rf=Be.core.context||Gi,td=Be.core.suppressOverwrites||Gi,Ch=dt.history.scrollRestoration||"auto",Df=dt.pageYOffset||0,Be.core.globals("ScrollTrigger",r),At)){Ea=1,Ps=document.createElement("div"),Ps.style.height="100vh",Ps.style.position="absolute",W0(),wA(),Qt.register(Be),r.isTouch=Qt.isTouch,Nr=Qt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Cf=Qt.isTouch===1,mn(dt,"wheel",us),Ah=[dt,zt,oi,At],Be.matchMedia?(r.matchMedia=function(c){var u=Be.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Be.addEventListener("matchMediaInit",function(){return Oh()}),Be.addEventListener("matchMediaRevert",function(){return V0()}),Be.addEventListener("matchMedia",function(){To(0,1),Vo("matchMedia")}),Be.matchMedia().add("(orientation: portrait)",function(){return od(),od})):console.warn("Requires GSAP 3.11.0 or later"),od(),mn(zt,"scroll",us);var n=At.hasAttribute("style"),i=At.style,o=i.borderTopStyle,s=Be.core.Animation.prototype,a,l;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=pr(At),sn.m=Math.round(a.top+sn.sc())||0,zn.m=Math.round(a.left+zn.sc())||0,o?i.borderTopStyle=o:i.removeProperty("border-top-style"),n||(At.setAttribute("style",""),At.removeAttribute("style")),Jl=setInterval(Zm,250),Be.delayedCall(.5,function(){return Ql=0}),mn(zt,"touchcancel",Gi),mn(At,"touchstart",Gi),tc(mn,zt,"pointerdown,touchstart,mousedown",Ym),tc(mn,zt,"pointerup,touchend,mouseup",jm),Af=Be.utils.checkPrefix("transform"),Ec.push(Af),ms=An(),Gc=Be.delayedCall(.2,To).pause(),gs=[zt,"visibilitychange",function(){var c=dt.innerWidth,u=dt.innerHeight;zt.hidden?(Gm=c,Wm=u):(Gm!==c||Wm!==u)&&Ca()},zt,"DOMContentLoaded",To,dt,"load",To,dt,"resize",Ca],ec(mn),ut.forEach(function(c){return c.enable(0,1)}),l=0;l<ft.length;l+=3)nc(pn,ft[l],ft[l+1]),nc(pn,ft[l],ft[l+2])}},r.config=function(n){"limitCallbacks"in n&&(nd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Jl)||(Jl=i)&&setInterval(Zm,i),"ignoreMobileResize"in n&&(Cf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ec(pn)||ec(mn,n.autoRefreshEvents||"none"),L0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var o=Wn(n),s=ft.indexOf(o),a=zo(o);~s&&ft.splice(s,a?6:2),i&&(a?Zi.unshift(dt,i,At,i,oi,i):Zi.unshift(o,i))},r.clearMatchMedia=function(n){ut.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,o){var s=(ii(n)?Wn(n):n).getBoundingClientRect(),a=s[o?Oo:No]*i||0;return o?s.right-a>0&&s.left+a<dt.innerWidth:s.bottom-a>0&&s.top+a<dt.innerHeight},r.positionInViewport=function(n,i,o){ii(n)&&(n=Wn(n));var s=n.getBoundingClientRect(),a=s[o?Oo:No],l=i==null?a/2:i in qc?qc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return o?(s.left+l)/dt.innerWidth:(s.top+l)/dt.innerHeight},r.killAll=function(n){if(ut.slice(0).forEach(function(o){return o.vars.id!=="ScrollSmoother"&&o.kill()}),n!==!0){var i=Ho.killAll||[];Ho={},i.forEach(function(o){return o()})}},r}();Xe.version="3.12.7";Xe.saveStyles=function(r){return r?fl(r).forEach(function(e){if(e&&e.style){var t=ni.indexOf(e);t>=0&&ni.splice(t,5),ni.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Be.core.getCache(e),Rf())}}):ni};Xe.revert=function(r,e){return Oh(!r,e)};Xe.create=function(r,e){return new Xe(r,e)};Xe.refresh=function(r){return r?Ca(!0):(ms||Xe.register())&&To(!0)};Xe.update=function(r){return++ft.cache&&wr(r===!0?2:0)};Xe.clearScrollMemory=G0;Xe.maxScroll=function(r,e){return Yi(r,e?zn:sn)};Xe.getScrollFunc=function(r,e){return to(Wn(r),e?zn:sn)};Xe.getById=function(r){return Lf[r]};Xe.getAll=function(){return ut.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Xe.isScrolling=function(){return!!bi};Xe.snapDirectional=Ih;Xe.addEventListener=function(r,e){var t=Ho[r]||(Ho[r]=[]);~t.indexOf(e)||t.push(e)};Xe.removeEventListener=function(r,e){var t=Ho[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Xe.batch=function(r,e){var t=[],n={},i=e.interval||.016,o=e.batchMax||1e9,s=function(c,u){var d=[],f=[],h=Be.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),o<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Rn(e[a])&&a!=="onRefreshInit"?s(a,e[a]):e[a];return Rn(o)&&(o=o(),mn(Xe,"refresh",function(){return o=e.batchMax()})),fl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Xe.create(c))}),t};var ig=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},ad=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Qt.isTouch?" pinch-zoom":""):"none",e===oi&&r(At,t)},ac={auto:1,scroll:1},OA=function(e){var t=e.event,n=e.target,i=e.axis,o=(t.changedTouches?t.changedTouches[0]:t).target,s=o._gsap||Be.core.getCache(o),a=An(),l;if(!s._isScrollT||a-s._isScrollT>2e3){for(;o&&o!==At&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!(ac[(l=_i(o)).overflowY]||ac[l.overflowX]));)o=o.parentNode;s._isScroll=o&&o!==n&&!zo(o)&&(ac[(l=_i(o)).overflowY]||ac[l.overflowX]),s._isScrollT=a}(s._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},q0=function(e,t,n,i){return Qt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&OA,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&mn(zt,Qt.eventTypes[0],og,!1,!0)},onDisable:function(){return pn(zt,Qt.eventTypes[0],og,!0)}})},NA=/(input|label|select|textarea)/i,rg,og=function(e){var t=NA.test(e.target.tagName);(t||rg)&&(e._gsapAllow=!0,rg=t)},UA=function(e){So(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,o=t.allowNestedScroll,s=t.onRelease,a,l,c=Wn(e.target)||oi,u=Be.core.globals().ScrollSmoother,d=u&&u.get(),f=Nr&&(e.content&&Wn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=to(c,sn),_=to(c,zn),g=1,m=(Qt.isTouch&&dt.visualViewport?dt.visualViewport.scale*dt.visualViewport.width:dt.outerWidth)/dt.innerWidth,p=0,S=Rn(i)?function(){return i(a)}:function(){return i||2.8},M,v,E=q0(c,e.type,!0,o),A=function(){return v=!1},C=Gi,D=Gi,w=function(){l=Yi(c,sn),D=Ga(Nr?1:0,l),n&&(C=Ga(0,Yi(c,zn))),M=Uo},x=function(){f._gsap.y=Ta(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},P=function(){if(v){requestAnimationFrame(A);var N=Ta(a.deltaY/2),fe=D(h.v-N);if(f&&fe!==h.v+h.offset){h.offset=fe-h.v;var U=Ta((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+U+", 0, 1)",f._gsap.y=U+"px",h.cacheID=ft.cache,wr()}return!0}h.offset&&x(),v=!0},b,B,X,Y,q=function(){w(),b.isActive()&&b.vars.scrollY>l&&(h()>l?b.progress(1)&&h(l):b.resetTo("scrollY",l))};return f&&Be.set(f,{y:"+=0"}),e.ignoreCheck=function($){return Nr&&$.type==="touchmove"&&P()||g>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},e.onPress=function(){v=!1;var $=g;g=Ta((dt.visualViewport&&dt.visualViewport.scale||1)/m),b.pause(),$!==g&&ad(c,g>1.01?!0:n?!1:"x"),B=_(),X=h(),w(),M=Uo},e.onRelease=e.onGestureStart=function($,N){if(h.offset&&x(),!N)Y.restart(!0);else{ft.cache++;var fe=S(),U,ge;n&&(U=_(),ge=U+fe*.05*-$.velocityX/.227,fe*=ig(_,U,ge,Yi(c,zn)),b.vars.scrollX=C(ge)),U=h(),ge=U+fe*.05*-$.velocityY/.227,fe*=ig(h,U,ge,Yi(c,sn)),b.vars.scrollY=D(ge),b.invalidate().duration(fe).play(.01),(Nr&&b.vars.scrollY>=l||U>=l-1)&&Be.to({},{onUpdate:q,duration:fe})}s&&s($)},e.onWheel=function(){b._ts&&b.pause(),An()-p>1e3&&(M=0,p=An())},e.onChange=function($,N,fe,U,ge){if(Uo!==M&&w(),N&&n&&_(C(U[2]===N?B+($.startX-$.x):_()+N-U[1])),fe){h.offset&&x();var ze=ge[2]===fe,Ze=ze?X+$.startY-$.y:h()+fe-ge[1],J=D(Ze);ze&&Ze!==J&&(X+=J-Ze),h(J)}(fe||N)&&wr()},e.onEnable=function(){ad(c,n?!1:"x"),Xe.addEventListener("refresh",q),mn(dt,"resize",q),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),E.enable()},e.onDisable=function(){ad(c,!0),pn(dt,"resize",q),Xe.removeEventListener("refresh",q),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new Qt(e),a.iOS=Nr,Nr&&!h()&&h(1),Nr&&Be.ticker.add(Gi),Y=a._dc,b=Be.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:X0(h,h(),function(){return b.pause()})},onUpdate:wr,onComplete:Y.vars.onComplete}),a};Xe.sort=function(r){if(Rn(r))return ut.sort(r);var e=dt.pageYOffset||0;return Xe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+dt.innerHeight}),ut.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Xe.observe=function(r){return new Qt(r)};Xe.normalizeScroll=function(r){if(typeof r>"u")return Un;if(r===!0&&Un)return Un.enable();if(r===!1){Un&&Un.kill(),Un=r;return}var e=r instanceof Qt?r:UA(r);return Un&&Un.target===e.target&&Un.kill(),zo(e.target)&&(Un=e),e};Xe.core={_getVelocityProp:Tf,_inputObserver:q0,_scrollers:ft,_proxies:Zi,bridge:{ss:function(){bi||Vo("scrollStart"),bi=An()},ref:function(){return Tn}}};N0()&&Be.registerPlugin(Xe);const FA=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Xe,default:Xe},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var kA=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,BA=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,zA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,HA=/(^[#\.][a-z]|[a-y][a-z])/i,VA=Math.PI/180,lc=Math.sin,cc=Math.cos,$a=Math.abs,_a=Math.sqrt,sg=function(e){return typeof e=="string"},Y0=function(e){return typeof e=="number"},ag=1e5,Or=function(e){return Math.round(e*ag)/ag||0};function GA(r){r=sg(r)&&HA.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Zr(r)):r?sg(r)?Zr(r):Y0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ra(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var WA=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),o=i.length,s;for(t=","+t+",";--o>-1;)s=i[o].nodeName.toLowerCase(),t.indexOf(","+s+",")<0&&n.setAttributeNS(null,s,i[o].nodeValue);return n},XA={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},qA=function(e,t){for(var n=t?t.split(","):[],i={},o=n.length;--o>-1;)i[n[o]]=+e.getAttribute(n[o])||0;return i};function j0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,o,s,a,l,c,u,d,f,h,_,g,m,p,S,M,v,E,A,C,D,w;return t==="path"||!r.getBBox?r:(c=WA(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=qA(r,XA[t]),t==="rect"?(a=w.rx,l=w.ry||a,o=w.x,s=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=o+a*(1-n),m=o+a,p=m+h,S=p+a*n,M=p+a,v=s+l*(1-n),E=s+l,A=E+_,C=A+l*n,D=A+l,i="M"+M+","+E+" V"+A+" C"+[M,C,S,D,p,D,p-(p-m)/3,D,m+(p-m)/3,D,m,D,g,D,o,C,o,A,o,A-(A-E)/3,o,E+(A-E)/3,o,E,o,v,g,s,m,s,m+(p-m)/3,s,p-(p-m)/3,s,p,s,S,s,M,v,M,E].join(",")+"z"):i="M"+(o+h)+","+s+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),o=w.cx,s=w.cy,u=a*n,i="M"+(o+a)+","+s+" C"+[o+a,s+d,o+u,s+l,o,s+l,o-u,s+l,o-a,s+d,o-a,s,o-a,s-d,o-u,s-l,o,s-l,o+u,s-l,o+a,s-d,o+a,s].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(BA)||[],o=f.shift(),s=f.shift(),i="M"+o+","+s+" L"+f.join(","),t==="polygon"&&(i+=","+o+","+s+"z")),c.setAttribute("d",Ds(c._gsRawPath=Zr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function YA(r,e,t,n,i,o,s,a,l){if(!(r===a&&e===l)){t=$a(t),n=$a(n);var c=i%360*VA,u=cc(c),d=lc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,S=m*m,M=p*p,v=S/(t*t)+M/(n*n);v>1&&(t=_a(v)*t,n=_a(v)*n);var E=t*t,A=n*n,C=(E*A-E*M-A*S)/(E*M+A*S);C<0&&(C=0);var D=(o===s?-1:1)*_a(C),w=D*(t*p/n),x=D*-(n*m/t),P=(r+a)/2,b=(e+l)/2,B=P+(u*w-d*x),X=b+(d*w+u*x),Y=(m-w)/t,q=(p-x)/n,$=(-m-w)/t,N=(-p-x)/n,fe=Y*Y+q*q,U=(q<0?-1:1)*Math.acos(Y/_a(fe)),ge=(Y*N-q*$<0?-1:1)*Math.acos((Y*$+q*N)/_a(fe*($*$+N*N)));isNaN(ge)&&(ge=f),!s&&ge>0?ge-=h:s&&ge<0&&(ge+=h),U%=h,ge%=h;var ze=Math.ceil($a(ge)/(h/4)),Ze=[],J=ge/ze,se=4/3*lc(J/2)/(1+cc(J/2)),Re=u*t,ue=d*t,Me=d*-n,Ye=u*n,Pe;for(Pe=0;Pe<ze;Pe++)i=U+Pe*J,m=cc(i),p=lc(i),Y=cc(i+=J),q=lc(i),Ze.push(m-se*p,p+se*m,Y+se*q,q-se*Y,Y,q);for(Pe=0;Pe<Ze.length;Pe+=2)m=Ze[Pe],p=Ze[Pe+1],Ze[Pe]=m*Re+p*Me+B,Ze[Pe+1]=m*ue+p*Ye+X;return Ze[Pe-2]=a,Ze[Pe-1]=l,Ze}}function Zr(r){var e=(r+"").replace(zA,function(w){var x=+w;return x<1e-4&&x>-1e-4?0:x}).match(kA)||[],t=[],n=0,i=0,o=2/3,s=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,S,M,v,E,A,C,D=function(x,P,b,B){S=(b-x)/3,M=(B-P)/3,g.push(x+S,P+M,b-S,B-M,b,B)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<s;c++)if(E=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")S=n,M=i,(E==="C"||E==="S")&&(S+=n-g[g.length-4],M+=i-g[g.length-3]),_||(n=i=0),g.push(S,M,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")S=n+(d-n)*o,M=i+(f-i)*o,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(S,M,n+(d-n)*o,i+(f-i)*o,n,i),c+=4;else if(h==="T")S=n-g[g.length-4],M=i-g[g.length-3],g.push(n+S,i+M,d+(n+S*1.5-d)*o,f+(i+M*1.5-f)*o,n=d,i=f),c+=2;else if(h==="H")D(n,i,n=d,i),c+=1;else if(h==="V")D(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||$a(n-d)>.5||$a(i-f)>.5)&&(D(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(A=e[c+4],C=e[c+5],S=e[c+6],M=e[c+7],u=7,A.length>1&&(A.length<3?(M=S,S=C,u--):(M=C,S=A.substr(2),u-=2),C=A.charAt(1),A=A.charAt(0)),v=YA(n,i,+e[c+1],+e[c+2],+e[c+3],+A,+C,(_?n:0)+S*1,(_?i:0)+M*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Ds(r){Y0(r[0])&&(r=[r]);var e="",t=r.length,n,i,o,s;for(i=0;i<t;i++){for(s=r[i],e+="M"+Or(s[0])+","+Or(s[1])+" C",n=s.length,o=2;o<n;o++)e+=Or(s[o++])+","+Or(s[o++])+" "+Or(s[o++])+","+Or(s[o++])+" "+Or(s[o++])+","+Or(s[o])+" ";s.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ii,Nh,Pa,$0,La,K0=function(){return Ii||typeof window<"u"&&(Ii=window.gsap)&&Ii.registerPlugin&&Ii},ld=function(e){return typeof e=="function"},Ao=Math.atan2,lg=Math.cos,cg=Math.sin,yr=Math.sqrt,ou=Math.PI,ug=ou*2,jA=ou*.3,$A=ou*.7,Z0=1e20,pl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,KA=/(^[#\.][a-z]|[a-y][a-z])/i,ZA=/[achlmqstvz]/i,Wr=function(e){return console&&console.warn(e)},JA=1,dg=function(e){var t=e.length,n=0,i=0,o;for(o=0;o<t;o++)n+=e[o++],i+=e[o];return[n/(t/2),i/(t/2)]},Is=function(e){var t=e.length,n=e[0],i=n,o=e[1],s=o,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>o?o=l:l<s&&(s=l);return e.centerX=(n+i)/2,e.centerY=(o+s)/2,e.size=(n-i)*(o-s)},Ka=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],o=i,s=e[0][1],a=s,l=1/t,c,u,d,f,h,_,g,m,p,S,M,v,E,A,C,D;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],S=h[f+1],M=h[f+2]-p,A=h[f+3]-S,v=h[f+4]-p,C=h[f+5]-S,E=h[f+6]-p,D=h[f+7]-S,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*E+3*m*(g*v+m*M))*g+p,d=(g*g*D+3*m*(g*C+m*A))*g+S,u>i?i=u:u<o&&(o=u),d>s?s=d:d<a&&(a=d);return e.centerX=(i+o)/2,e.centerY=(s+a)/2,e.left=o,e.width=i-o,e.top=a,e.height=s-a,e.size=(i-o)*(s-a)},QA=function(e,t){return t.length-e.length},fg=function(e,t){var n=e.size||Is(e),i=t.size||Is(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},hg=function(e,t){var n=e.slice(0),i=e.length,o=i-2,s,a;for(t=t|0,s=0;s<i;s++)a=(s+t)%o,e[s++]=n[a],e[s]=n[a+1]},cd=function(e,t,n,i,o){var s=e.length,a=0,l=s-2,c,u,d,f;for(n*=6,u=0;u<s;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-o),a+=yr(d*d+f*f);return a},eC=function(e,t,n){var i=e.length,o=dg(e),s=dg(t),a=s[0]-o[0],l=s[1]-o[1],c=cd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=cd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Ra(d),h=6;h<i;h+=6)f=cd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},tC=function(e,t,n){for(var i=e.length,o=Z0,s=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=yr(c*c+u*u),d<o&&(o=d,s=l[f],a=l[f+1]);return[s,a]},nC=function(e,t,n,i,o,s){var a=t.length,l=0,c=Math.min(e.size||Is(e),t[n].size||Is(t[n]))*i,u=Z0,d=e.centerX+o,f=e.centerY+s,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||Is(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=yr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},ud=function(e,t){var n=0,i=.999999,o=e.length,s=t/((o-2)/6),a,l,c,u,d,f,h,_,g,m,p,S,M,v;for(M=2;M<o;M+=6)for(n+=s;n>i;)a=e[M-2],l=e[M-1],c=e[M],u=e[M+1],d=e[M+2],f=e[M+3],h=e[M+4],_=e[M+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,S=u+(f-u)*v,m+=(S-m)*v,S+=(f+(_-f)*v-S)*v,e.splice(M,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(S-m)*v,p,S,d+(h-d)*v,f+(_-f)*v),M+=6,o+=6,n--;return e},Of=function(e,t,n,i,o){var s=t.length-e.length,a=s>0?t:e,l=s>0?e:t,c=0,u=i==="complexity"?QA:fg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,S,M,v,E,A;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),E=a.size||Ka(a),E=l.size||Ka(l),E=a.centerX-l.centerX,A=a.centerY-l.centerY,u===fg))for(f=0;f<l.length;f++)a.splice(f,0,nC(l[f],a,f,d,E,A));if(s)for(s<0&&(s=-s),a[0].length>l[0].length&&ud(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<s;)M=a[f].size||Is(a[f]),S=tC(l,a[f].centerX,a[f].centerY),M=S[0],v=S[1],l[f++]=[M,v,M,v,M,v,M,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],s=m.length-p.length,s<0?ud(m,-s/6|0):s>0&&ud(p,s/6|0),_&&o!==!1&&!p.reversed&&Ra(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=eC(p,m,!f||o===!1),n<0&&(_=!0,Ra(p),n=-n),hg(p,n*6)):n!=="reverse"&&(f&&n<0&&Ra(p),hg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ra(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Wr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},pg=function(e,t,n,i,o){var s=Zr(e[0]),a=Zr(e[1]);Of(s,a,t||t===0?t:"auto",n,o)&&(e[0]=Ds(s),e[1]=Ds(a),(i==="log"||i===!0)&&Wr('precompile:["'+e[0]+'","'+e[1]+'"]'))},iC=function(e,t){if(!t)return e;var n=e.match(pl)||[],i=n.length,o="",s,a,l;for(t==="reverse"?(a=i-1,s=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,s=2),l=0;l<i;l+=2)o+=n[a-1]+","+n[a]+" ",a=(a+s)%i;return o},mg=function(e,t){var n=0,i=parseFloat(e[0]),o=parseFloat(e[1]),s=i+","+o+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)s+=(i+(h-i)*f*d).toFixed(2)+","+(o+(_-o)*f*d).toFixed(2)+" ",n--,d++;s+=h+","+_+" ",i=h,o=_}return s},Nf=function(e){var t=e[0].match(pl)||[],n=e[1].match(pl)||[],i=n.length-t.length;i>0?e[0]=mg(t,i):e[1]=mg(n,-i)},rC=function(e){return isNaN(e)?Nf:function(t){Nf(t),t[1]=iC(t[1],parseInt(e,10))}},oC=function(e,t,n){var i=typeof e=="string",o,s;return(!i||KA.test(e)||(e.match(pl)||[]).length<3)&&(o=Nh(e)[0],o?(s=(o.nodeName+"").toUpperCase(),t&&s!=="PATH"&&(o=j0(o,!1),s="PATH"),e=o.getAttribute(s==="PATH"?"d":"points")||"",o===n&&(e=o.getAttributeNS(null,"data-original")||e)):(Wr("WARNING: invalid morph to: "+e),e=!1)),e},gg=function(e,t){for(var n=e.length,i=.2*(t||1),o,s,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(s=e[n],g=s.isSmooth=s.isSmooth||[0,0,0,0],m=s.smoothData=s.smoothData||[0,0,0,0],g.length=4,f=s.length-2,d=6;d<f;d+=6)a=s[d]-s[d-2],l=s[d+1]-s[d-1],c=s[d+2]-s[d],u=s[d+3]-s[d+1],h=Ao(l,a),_=Ao(u,c),o=Math.abs(h-_)<i,o&&(m[d-2]=h,m[d+2]=_,m[d-1]=yr(a*a+l*l),m[d+3]=yr(c*c+u*u)),g.push(o,o,0,0,o,o);s[f]===s[0]&&s[f+1]===s[1]&&(a=s[0]-s[f-2],l=s[1]-s[f-1],c=s[2]-s[0],u=s[3]-s[1],h=Ao(l,a),_=Ao(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=yr(a*a+l*l),m[3]=yr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},_g=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},sC=function(e){return e!==e%ou?e+(e<0?ug:-ug):e},vg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",aC=function(e,t,n,i){var o=this._origin,s=this._eOrigin,a=e[n]-o.x,l=e[n+1]-o.y,c=yr(a*a+l*l),u=Ao(l,a),d,f;return a=t[n]-s.x,l=t[n+1]-s.y,d=Ao(l,a)-u,f=sC(d),!i&&Pa&&Math.abs(f+Pa.ca)<jA&&(i=Pa),this._anchorPT=Pa={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>$A?d:f,sl:c,cl:yr(a*a+l*l)-c,i:n}},yg=function(e){Ii=K0(),La=La||Ii&&Ii.plugins.morphSVG,Ii&&La?(Nh=Ii.utils.toArray,La.prototype._tweenRotation=aC,$0=1):e&&Wr("Please gsap.registerPlugin(MorphSVGPlugin)")},ws={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ii=e,La=t,yg()},init:function(e,t,n,i,o){if($0||yg(1),!t)return Wr("invalid shape"),!1;ld(t)&&(t=t.call(n,i,e,o));var s,a,l,c,u,d,f,h,_,g,m,p,S,M,v,E,A,C,D,w,x,P;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){s={};for(a in t)s[a]=ld(t[a])&&a!=="render"?t[a].call(n,i,e,o):t[a];t=s}var b=e.nodeType?window.getComputedStyle(e):{},B=b.fill+"",X=!(B==="none"||(B.match(pl)||[])[3]==="0"||b.fillRule==="evenodd"),Y=(t.origin||"50 50").split(",");if(s=(e.nodeName+"").toUpperCase(),u=s==="POLYLINE"||s==="POLYGON",s!=="PATH"&&!u&&!t.prop)return Wr("Cannot morph a <"+s+"> element. "+vg),!1;if(a=s==="PATH"?"d":"points",!t.prop&&!ld(e.setAttribute))return!1;if(c=oC(t.shape||t.d||t.points||"",a==="d",e),u&&ZA.test(c))return Wr("A <"+s+"> cannot accept path data. "+vg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||ws.defaultMap,this._prop=t.prop,this._render=t.render||ws.defaultRender,this._apply="updateTarget"in t?t.updateTarget:ws.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,A=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Zr(A?t.precompile[0]:g),m=Zr(A?t.precompile[1]:c),!A&&!Of(g,m,d,f,X))return!1;for((t.precompile==="log"||t.precompile===!0)&&Wr('precompile:["'+Ds(g)+'","'+Ds(m)+'"]'),x=(t.type||ws.defaultType)!=="linear",x&&(g=gg(g,t.smoothTolerance),m=gg(m,t.smoothTolerance),g.size||Ka(g),m.size||Ka(m),w=_g(Y[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},Y[1]&&(w=_g(Y[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,S=g.length;--S>-1;)for(v=g[S],E=m[S],h=v.isSmooth||[],_=E.isSmooth||[],M=v.length,Pa=0,p=0;p<M;p+=2)(E[p]!==v[p]||E[p+1]!==v[p+1])&&(x?h[p]&&_[p]?(C=v.smoothData,D=E.smoothData,P=p+(p===M-4?7-M:5),this._controlPT={_next:this._controlPT,i:p,j:S,l1s:C[p+1],l1c:D[p+1]-C[p+1],l2s:C[P],l2c:D[P]-C[P]},l=this._tweenRotation(v,E,p+2),this._tweenRotation(v,E,p,l),this._tweenRotation(v,E,P-1,l),p+=4):this._tweenRotation(v,E,p):(l=this.add(v,p,v[p],E[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],E[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,o,0,rC(d),a);x&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return JA},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,o=t._anchorPT,s=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,S,M,v,E;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;o;)_=o.sa+e*o.ca,h=o.sl+e*o.cl,o.t[o.i]=t._origin.x+lg(_)*h,o.t[o.i+1]=t._origin.y+cg(_)*h,o=o._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],E=g+(g===f.length-4?7-f.length:5),_=Ao(f[E]-f[g+1],f[E-1]-f[g]),M=cg(_),v=lg(_),p=f[g+2],S=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=S-M*h,h=i.l2s+d*i.l2c,f[E-1]=p+v*h,f[E]=S+M*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*s|0)/s+u+(f[1]*s|0)/s+" C",g=2;g<h;g++)c+=(f[g]*s|0)/s+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:GA,stringToRawPath:Zr,rawPathToString:Ds,normalizeStrings:function(e,t,n){var i=n.shapeIndex,o=n.map,s=[e,t];return pg(s,i,o),s},pathFilter:pg,pointsFilter:Nf,getTotalSize:Ka,equalizeSegmentQuantity:Of,convertToPath:function(e,t){return Nh(e).map(function(n){return j0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};K0()&&Ii.registerPlugin(ws);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var o=i<0||arguments.length<=i?void 0:arguments[i];o.nodeType===1||o.nodeType===11?this.appendChild(o):this.appendChild(document.createTextNode(String(o)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];var a=o.length;if(n)for(a||n.removeChild(this);a--;){var l=o[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function lC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function xg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Sg(r,e,t){return e&&xg(r.prototype,e),t&&xg(r,t),r}function cC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function wg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function bg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?wg(Object(t),!0).forEach(function(n){cC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):wg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function J0(r,e){return dC(r)||hC(r,e)||Q0(r,e)||mC()}function Bn(r){return uC(r)||fC(r)||Q0(r)||pC()}function uC(r){if(Array.isArray(r))return Uf(r)}function dC(r){if(Array.isArray(r))return r}function fC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function hC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,o=void 0;try{for(var s=r[Symbol.iterator](),a;!(n=(a=s.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,o=l}finally{try{!n&&s.return!=null&&s.return()}finally{if(i)throw o}}return t}}function Q0(r,e){if(r){if(typeof r=="string")return Uf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Uf(r,e)}}function Uf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function pC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function mC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Co(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),o=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,o||i)},{})}function yl(r){return typeof r=="string"}function Uh(r){return Array.isArray(r)}function uc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Co(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(yl(t)||Uh(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Fh(r){var e=yl(r)||Uh(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function su(r){return r!==null&&typeof r=="object"}function gC(r){return su(r)&&/^(1|3|11)$/.test(r.nodeType)}function _C(r){return typeof r=="number"&&r>-1&&r%1===0}function vC(r){return su(r)&&_C(r.length)}function Go(r){return Uh(r)?r:r==null?[]:vC(r)?Array.prototype.slice.call(r):[r]}function Mg(r){var e=r;return yl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Go(e).reduce(function(t,n){return[].concat(Bn(t),Bn(Go(n).filter(gC)))},[])}var yC=Object.entries,Yc="_splittype",Ui={},xC=0;function ji(r,e,t){if(!su(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Yc]||(r[Yc]=++xC),i=Ui[n]||(Ui[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Ui[n]=bg(bg({},i),e)):e!==void 0&&(i[e]=t),t}function Ro(r,e){var t=su(r)?r[Yc]:null,n=t&&Ui[t]||{};return n}function ev(r){var e=r&&r[Yc];e&&(delete r[e],delete Ui[e])}function SC(){Object.keys(Ui).forEach(function(r){delete Ui[r]})}function wC(){yC(Ui).forEach(function(r){var e=J0(r,2),t=e[0],n=e[1],i=n.isRoot,o=n.isSplit;(!i||!o)&&(Ui[t]=null,delete Ui[t])})}function bC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var kh="\\ud800-\\udfff",tv="\\u0300-\\u036f\\ufe20-\\ufe23",nv="\\u20d0-\\u20f0",iv="\\ufe0e\\ufe0f",MC="[".concat(kh,"]"),Ff="[".concat(tv).concat(nv,"]"),kf="\\ud83c[\\udffb-\\udfff]",EC="(?:".concat(Ff,"|").concat(kf,")"),rv="[^".concat(kh,"]"),ov="(?:\\ud83c[\\udde6-\\uddff]){2}",sv="[\\ud800-\\udbff][\\udc00-\\udfff]",av="\\u200d",lv="".concat(EC,"?"),cv="[".concat(iv,"]?"),TC="(?:"+av+"(?:"+[rv,ov,sv].join("|")+")"+cv+lv+")*",AC=cv+lv+TC,CC="(?:".concat(["".concat(rv).concat(Ff,"?"),Ff,ov,sv,MC].join("|"),`
)`),RC=RegExp("".concat(kf,"(?=").concat(kf,")|").concat(CC).concat(AC),"g"),PC=[av,kh,tv,nv,iv],LC=RegExp("[".concat(PC.join(""),"]"));function DC(r){return r.split("")}function uv(r){return LC.test(r)}function IC(r){return r.match(RC)||[]}function OC(r){return uv(r)?IC(r):DC(r)}function NC(r){return r==null?"":String(r)}function UC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=NC(r),r&&yl(r)&&!e&&uv(r)?OC(r):r.split(e)}function Bf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],o=yl(i)?i.trim():i;o===null||o===""||(n==="children"?t.append.apply(t,Bn(Go(o))):t.setAttribute(n,o))}),t}var Bh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function FC(r,e){e=Co(Bh,e);var t=Fh(e.types),n=e.tagName,i=r.nodeValue,o=document.createDocumentFragment(),s=[],a=[];return/^\s/.test(i)&&o.append(" "),s=bC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=UC(c).map(function(_){var g=Bf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return ji(g,"isChar",!0),a=[].concat(Bn(a),[g]),g})),t.words||t.lines?(f=Bf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),ji(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),o.appendChild(f)):h.forEach(function(_){o.appendChild(_)}),u<d.length-1&&o.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&o.append(" "),r.replaceWith(o),{words:s,chars:a}}function dv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return FC(r,e);var i=Go(r.childNodes);if(i.length&&(ji(r,"isSplit",!0),!Ro(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var o=r.nextSibling,s=r.previousSibling,a=r.textContent||"",l=o?o.textContent:" ",c=s?s.textContent:" ";ji(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=dv(d,e),h=f.words,_=f.chars;return{words:[].concat(Bn(u.words),Bn(h)),chars:[].concat(Bn(u.chars),Bn(_))}},n)}function kC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,o=J0(n,2),s=o[0],a=o[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+s,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+s-l;return{width:f,height:h,top:m,left:p}}function fv(r){Ro(r).isWord?(ev(r),r.replaceWith.apply(r,Bn(r.childNodes))):Go(r.children).forEach(function(e){return fv(e)})}var BC=function(){return document.createDocumentFragment()};function zC(r,e,t){var n=Fh(e.types),i=e.tagName,o=r.getElementsByTagName("*"),s=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=BC(),m=window.getComputedStyle(r),p=m.textAlign,S=parseFloat(m.fontSize),M=S*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,ji(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Go(o).forEach(function(v){var E=v.parentElement===r,A=kC(v,E,e,t),C=A.width,D=A.height,w=A.top,x=A.left;/^br$/i.test(v.nodeName)||(n.lines&&E&&((l===null||w-l>=M)&&(l=w,s.push(a=[])),a.push(v)),e.absolute&&ji(v,{top:w,left:x,width:C,height:D}))}),h&&h.removeChild(r),n.lines&&(f=s.map(function(v){var E=Bf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});ji(E,"isLine",!0);var A={height:0,top:1e4};return g.appendChild(E),v.forEach(function(C,D,w){var x=Ro(C),P=x.isWordEnd,b=x.top,B=x.height,X=w[D+1];A.height=Math.max(A.height,B),A.top=Math.min(A.top,b),E.appendChild(C),P&&Ro(X).isWordStart&&E.append(" ")}),e.absolute&&ji(E,{height:A.height,top:A.top}),E}),n.words||fv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Go(o).forEach(function(v){var E=Ro(v),A=E.isLine,C=E.top,D=E.left,w=E.width,x=E.height,P=Ro(v.parentElement),b=!A&&P.isLine;v.style.top="".concat(b?C-P.top:C,"px"),v.style.left=A?"".concat(d.left,"px"):"".concat(D-(b?d.left:0),"px"),v.style.height="".concat(x,"px"),v.style.width=A?"".concat(d.width,"px"):"".concat(w,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var ds=Co(Bh,{}),ta=function(){Sg(r,null,[{key:"clearData",value:function(){SC()}},{key:"setDefaults",value:function(t){return ds=Co(ds,uc(t)),Bh}},{key:"revert",value:function(t){Mg(t).forEach(function(n){var i=Ro(n),o=i.isSplit,s=i.html,a=i.cssWidth,l=i.cssHeight;o&&(n.innerHTML=s,n.style.width=a||"",n.style.height=l||"",ev(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Ui}},{key:"defaults",get:function(){return ds},set:function(t){ds=Co(ds,uc(t))}}]);function r(e,t){lC(this,r),this.isSplit=!1,this.settings=Co(ds,uc(t)),this.elements=Mg(e),this.split()}return Sg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(s){ji(s,"html",s.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Co(this.settings,uc(t)));var o=Fh(this.settings.types);o.none||(this.elements.forEach(function(s){ji(s,"isRoot",!0);var a=dv(s,n.settings),l=a.words,c=a.chars;n.words=[].concat(Bn(n.words),Bn(l)),n.chars=[].concat(Bn(n.chars),Bn(c))}),this.elements.forEach(function(s){if(o.lines||n.settings.absolute){var a=zC(s,n.settings,i);n.lines=[].concat(Bn(n.lines),Bn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),wC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const HC="/150-lab/assets/audio/ui-click.mp3",VC="/150-lab/assets/audio/chemistry2.mp3",GC="/150-lab/assets/images/pacifichem-event1.jpg",WC="/150-lab/assets/images/green-chemistry-event2.jpg",XC="/150-lab/assets/images/acs-spring-meeting-event3.jpg";ke.registerPlugin(Xe);ke.registerPlugin(ws);let va={year:2026},fs=null,Pi=null;function zf(){Pi&&(Pi.kill(),Pi=null,console.log("Killed previous hero heading fade ScrollTrigger."));const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){console.log("Hero heading characters not found, attempting re-split...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new ta(r,{types:"words,chars",absolute:!1}).chars,ke.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"}),console.log("Hero heading re-split successfully.")}catch(o){console.error("Error re-splitting hero heading:",o);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const o=Math.floor(Math.random()*(i+1));[t[i],t[o]]=[t[o],t[i]]}const n=ke.timeline({paused:!0});n.to(t,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),Pi=Xe.create({animation:n,trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.direction===-1&&i.progress<.1&&ke.set(e,{opacity:1,z:0})},onRefresh:i=>{const o=i.progress;n.progress(o),console.log(`Hero fade ScrollTrigger refreshed. Progress set to: ${o.toFixed(2)}`)}}),console.log("Hero heading fade animation set up.")}else console.warn("#hero-area h1 not found for fade animation setup.")}function qC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),o=document.querySelector("button.enter-experience");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),t&&ke.set(t,{opacity:0,autoAlpha:0}),i&&ke.set(i,{opacity:0,autoAlpha:0}),o&&ke.set(o,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Xe.getAll().forEach(f=>{(f.vars.trigger==="#hero-area"||f.vars.trigger==="#hero-travel-area")&&f.kill()});const s=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",s),e.innerHTML="",s.split("").forEach(f=>{const h=document.createElement("span");h.className="digit",h.textContent=f,h.setAttribute("data-digit",f),e.appendChild(h)}),ke.set(e,{opacity:0,autoAlpha:0}),ke.set(r,{opacity:0,autoAlpha:0});const a=new ta(r,{types:"words,chars",absolute:!1});ke.set(a.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const l=ke.timeline({delay:.5});l.to(r,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"});const c=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(c)},840);const u=[...a.chars];for(let f=u.length-1;f>0;f--){const h=Math.floor(Math.random()*(f+1));[u[f],u[h]]=[u[h],u[f]]}l.to(u,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const f=new CustomEvent("particleFadeStart");document.dispatchEvent(f)}}),l.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"}),ke.set(n,{opacity:1,autoAlpha:1});const d=e.querySelectorAll(".digit");l.fromTo(d,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{window.heroAnimationComplete=!0;const f=new CustomEvent("heroAnimationComplete");document.dispatchEvent(f)}},"-=0.6"),o&&ke.to(o,{opacity:1,autoAlpha:1,duration:.8,delay:3.8,ease:"power2.out"}),o&&o.addEventListener("click",()=>{t&&ke.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),i&&ke.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.enterButtonClicked=!0,window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),ke.to(o,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(ke.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0}}),Xe.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=.44+f.progress*.56;e.querySelectorAll(".digit").forEach(m=>{m.style.opacity=_})}}),Xe.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=1-f.progress;e.style.opacity=_}}))}function YC(){console.log("Initializing animations"),jC(),Xe.refresh(),Xe.clearMatchMedia(),console.log("Killing all existing ScrollTriggers..."),Xe.getAll().forEach(x=>x.kill()),fs=null,Pi=null,va.year=2026,ke.registerPlugin(Xe),ke.registerPlugin(ta),qC(),KC(),Eg(),ZC(),Tg(),$C(),jc(null),$c(null),Ag(),JC(),QC(),tR();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const x=document.querySelector("nav"),P=document.querySelector("header");x&&x.classList.toggle("active"),P&&P.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const x=window.scrollY,P=document.querySelector("header.anniversary");P&&(x>e?P.classList.remove("active"):P.classList.add("active")),e=x});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const x=document.querySelector("nav"),P=document.querySelector("header");x&&x.classList.remove("active"),P&&P.classList.remove("nav-active")}),zf();const n=document.querySelector("#hero-number");n?(console.log("Setting up hero number countdown animation."),console.log(`Initial heroYearObj.year: ${va.year}`),fs?(console.log("Hero number tween already exists, ensuring it is active."),fs.scrollTrigger&&fs.scrollTrigger.enable(),fs.resume()):(console.log("Creating hero number tween..."),fs=ke.to(va,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(x){const P=Math.round(va.year).toString(),b=n.querySelectorAll(".digit"),B=P.split("");b.length!==B.length?(n.innerHTML="",B.forEach(X=>{const Y=document.createElement("span");Y.className="digit",Y.textContent=X,Y.setAttribute("data-digit",X),n.appendChild(Y)})):b.forEach((X,Y)=>{X.textContent!==B[Y]&&(X.textContent=B[Y],X.setAttribute("data-digit",B[Y]))})},onRefresh:x=>{console.log(`Hero Number ST Refreshed -> Progress: ${x.progress.toFixed(3)}, Year: ${va.year.toFixed(0)}`)}}}))):console.warn("#hero-number element not found for countdown animation."),document.querySelectorAll(".pin-top-top").forEach(function(x){let P=x.parentElement;x.id==="hero-area"?Xe.create({trigger:P,start:"top top",end:"bottom bottom",pin:x,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:b=>{b.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Xe.create({trigger:P,start:"top top",end:"bottom bottom",pin:x,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(x){ke.set(x,{opacity:0}),ke.to(x,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:x,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(x){ke.set(x,{opacity:0}),ke.to(x,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:x,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(x){let P=x.parentElement;Xe.create({trigger:P,start:"top center",end:"bottom bottom",pin:x,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(x){let P=x.parentElement;Xe.create({trigger:P,start:"center center",end:"bottom bottom",pin:x,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(x){let P=x.parentElement;Xe.create({trigger:P,start:"bottom bottom",end:"",pin:x,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const o=ke.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),s=new Audio(HC);s.volume=.38;const a=()=>{if(!window.audioMuted)try{const x=s.cloneNode();x.volume=.38,x.play().catch(P=>{console.warn("UI click sound play was prevented:",P)})}catch(x){console.error("Error playing UI click sound:",x)}},l=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(b=>{b.addEventListener("click",B=>{if(b.classList.contains("enter-experience")){b.dataset.clickSoundPlayed||(window.audioMuted||a(),b.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}),new MutationObserver(b=>{b.forEach(B=>{B.type==="childList"&&B.addedNodes.forEach(X=>{X.nodeType===1&&(X.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&X.addEventListener("click",q=>{if(X.classList.contains("enter-experience")){X.dataset.clickSoundPlayed||(window.audioMuted||a(),X.dataset.clickSoundPlayed="true");return}window.audioMuted||a()}),X.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(q=>{q.addEventListener("click",$=>{if(q.classList.contains("enter-experience")){q.dataset.clickSoundPlayed||(window.audioMuted||a(),q.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},c=x=>{window.userInteracted=!0,window.enterButtonClicked&&!window.audioInitialized&&window.heroAnimationComplete&&!window.audioMuted&&window.playBackgroundAudio(!0)};document.addEventListener("click",c),document.addEventListener("touchstart",c),document.addEventListener("keydown",c);const u=document.querySelector(".sound-toggle");u&&u.addEventListener("click",()=>{a(),u.classList.toggle("muted"),window.audioMuted=u.classList.contains("muted"),window.audioMuted?(o.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0,window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))):(o.resume(),!window.audioInitialized&&window.enterButtonClicked&&window.backgroundAudio?(window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):!window.audioMuted&&window.enterButtonClicked&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt from toggle..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500))):window.audioInitialized&&window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(x=>{console.warn("Audio play was prevented:",x),window.audioInitialized=!1,window.enterButtonClicked&&window.playBackgroundAudio(!0)})))});const d=document.querySelector(".section-timeline .page-nav");if(!d){console.warn("Page navigation element (.section-timeline .n) not found - skipping navigation setup");return}const f=d.querySelectorAll("a"),h=document.querySelector(".section-timeline .indicator .active-title"),_=document.querySelector(".section-timeline .indicator-wrapper"),g=document.querySelector(".timeline-nav-wrapper");h||console.warn("Active title element (.section-timeline .indicator .active-title) not found"),!_&&!g&&console.warn("Neither indicator wrapper nor timeline nav wrapper found - navigation may not work properly");let m=!1,p=!1,S,M=!1;ke.set(f,{opacity:0,x:-20}),ke.set(h,{opacity:1});const v=()=>{S&&(clearTimeout(S),S=null),ke.killTweensOf(h),ke.killTweensOf(f)},E=()=>{v(),M||!p?(m=!1,ke.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{!m&&(!p||M)&&ke.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})):p&&!M&&(m=!0,ke.set(h,{opacity:0}),ke.to(f,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"}))},A=x=>{const P=g||_,b=g?null:d;if(!P)return!1;const B=P.getBoundingClientRect();let X=null;b&&(X=b.getBoundingClientRect());const Y=x.clientX,q=x.clientY,$=Y>=B.left&&Y<=B.right&&q>=B.top&&q<=B.bottom;let N=!1;return X&&(N=Y>=X.left&&Y<=X.right&&q>=X.top&&q<=X.bottom),$||N},C=x=>{const P=p;p=A(x),!p&&M&&(M=!1),P!==p&&!M&&(clearTimeout(S),S=setTimeout(()=>{E()},16))};document.removeEventListener("mousemove",C),document.addEventListener("mousemove",C);const D=[g,_,d].filter(Boolean);D.forEach(x=>{x&&(x.addEventListener("mouseenter",()=>{M||(p=!0,E())}),x.addEventListener("mouseleave",P=>{const b=P.clientX||0,B=P.clientY||0;setTimeout(()=>{x.getBoundingClientRect();let X=!1;D.forEach(Y=>{if(Y){const q=Y.getBoundingClientRect();b>=q.left&&b<=q.right&&B>=q.top&&B<=q.bottom&&(X=!0)}}),X||(p=!1,M&&(M=!1),E())},50)}))}),f.forEach(x=>{const P=x.onclick;P&&x.removeEventListener("click",P),x.addEventListener("click",b=>{b.preventDefault(),v(),f.forEach(B=>B.classList.remove("active")),x.classList.add("active"),h.textContent=x.textContent,M=!0,p=!1,m=!1,ke.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{ke.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=x=>{window.audioMuted&&(x.volume=0,x.muted=!0),x.addEventListener("play",()=>{const P=document.querySelector(".sound-toggle");P&&P.classList.contains("muted")&&(x.volume=0,x.muted=!0)})},new MutationObserver(x=>{x.forEach(P=>{P.type==="childList"&&P.addedNodes.forEach(b=>{b.nodeName==="AUDIO"||b.nodeName==="VIDEO"?window.handleNewAudioElement(b):b.querySelectorAll&&b.querySelectorAll("audio, video").forEach(X=>{window.handleNewAudioElement(X)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l(),Eg(),Tg(),jc(null),$c(null),Ag(),eR()}function jC(){const r=new Audio;r.addEventListener("canplaythrough",()=>{console.log("Background audio loaded and can play through without buffering"),window.backgroundAudioLoaded=!0,window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioInitialized&&!window.audioMuted&&e(!0)}),r.addEventListener("error",i=>{console.error("Audio loading error:",i),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=VC;try{r.load()}catch(i){console.error("Error loading background audio:",i)}window.backgroundAudio=r,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.backgroundAudioLoaded=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=10,window.playBackgroundAudio=(i=!1)=>{if(!window.audioMuted&&(i&&(window.enterButtonClicked=!0),!(!window.enterButtonClicked||!window.heroAnimationComplete)&&!window.audioInitialized)){if(window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null);return}if(window.backgroundAudioLoaded||r.readyState>=3)e(i);else if(console.log("Background audio not yet ready to play, will play when loaded"),i)try{r.load()}catch(o){console.warn("Error reloading background audio:",o)}}};function e(i=!1){if(!(window.audioInitialized||window.audioMuted)){if(window.audioRetryCount++,window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);return}try{if(r.volume=.08,i)try{const o=new(window.AudioContext||window.webkitAudioContext),s=o.createBufferSource();s.connect(o.destination),s.start(0)}catch(o){console.warn("Could not create audio context:",o)}r.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const o=document.querySelector(".sound-toggle");o&&o.classList.add("active"),window.audioRetryCount=0}).catch(o=>{console.error("Audio play was prevented:",o),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)})}catch(o){console.error("Error playing audio:",o),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)}}}let t=!1;const n=()=>{document.hidden?window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Tab hidden - pausing background audio"),t=!0,window.backgroundAudio.pause()):window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Tab visible - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))};document.addEventListener("visibilitychange",n),window.addEventListener("blur",()=>{window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Window blur - pausing background audio"),t=!0,window.backgroundAudio.pause())}),window.addEventListener("focus",()=>{window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Window focus - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio on focus:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))}),console.log("Background audio visibility change listeners initialized")}function $C(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let o=!1;i.addEventListener("mouseenter",()=>{o=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{o=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{o&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function KC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(ke.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),ke.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Xe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Eg(){const r=document.querySelector("#get-involved-text p");r&&(ke.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new ta(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),ke.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),ke.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function Tg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),o=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!i||!o)return;const s=i.querySelector(".anniversary"),a=i.querySelector(".get-involved"),l=i.querySelector(".events"),c=_=>{if(o.textContent===_)return;const g=ke.timeline();g.to(o,{opacity:0,duration:.18,onComplete:()=>{o.textContent=_}}),g.to(o,{opacity:1,duration:.24})};s.addEventListener("click",_=>{_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),s.classList.add("active"),c("150 Years of ACS"),window.scrollTo({top:0,behavior:"smooth"})}),a.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),a.classList.add("active"),c("Get Involved"),n){const g=n.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}else{const g=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}}),l.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),l.classList.add("active"),c("Events"),t){const g=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}});const u=[{id:"hero",element:r,title:"150 Years of ACS",link:s,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:a,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:a,top:0,bottom:0},{id:"events",element:t,title:"Events",link:l,top:0,bottom:0}];function d(){if(u.forEach(_=>{if(_.element){const g=_.element.getBoundingClientRect();_.top=g.top+window.pageYOffset,_.bottom=g.bottom+window.pageYOffset}}),u[0].element&&n){const _=n.getBoundingClientRect();u[0].bottom=_.top+window.pageYOffset}if(n&&t){const _=u.find(p=>p.id==="getinvolved-video"),g=u.find(p=>p.id==="getinvolved"),m=t.getBoundingClientRect();_&&g&&(g.top=_.top,g.bottom=m.top+window.pageYOffset)}}d();let f=null;function h(){requestAnimationFrame(()=>{const _=window.pageYOffset+window.innerHeight/2;let g=u[0];for(let m=u.length-1;m>=0;m--){const p=u[m];if(p.element&&_>=p.top&&_<p.bottom){g=p;break}}g.id==="getinvolved-video"&&(g=u.find(m=>m.id==="getinvolved")||g),f!==g.id&&(f=g.id,i.querySelectorAll("a").forEach(m=>m.classList.remove("active")),g.link&&g.link.classList.add("active"),c(g.title))})}window.removeEventListener("scroll",h),window.addEventListener("scroll",h),window.addEventListener("resize",zh(()=>{d(),h()},100)),h()}function ZC(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const o=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,ke.set(r,{x:0}),console.log("Sliding cards animation disabled for small viewport")),l&&!n&&(n=ke.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger,console.log("Sliding cards animation initialized for large viewport"))},s=()=>{i&&(i.kill(),i=null),t&&(i=Xe.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;ke.set(t,{opacity:c})},onLeaveBack:()=>{ke.set(t,{opacity:1})}}),console.log("Hero travel area fade animation initialized"))};o(),s();const a=zh(()=>{o(),s()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function jc(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}const t=[],n=()=>new Promise(s=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{s()}):setTimeout(s,100)}),i=s=>new Promise(a=>{const l=s.closest("section")||s.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),o=(s,a)=>{const l=s.innerHTML;s.setAttribute("data-original-content",l),Promise.all([n(),i(s)]).then(()=>{s.offsetHeight;const c=(u=0)=>{const d=new ta(s,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});d.lines&&d.lines.length>0&&d.lines.length>1?(t.push({element:s,splitText:d,originalContent:l}),ke.set(d.lines,{opacity:0,y:50}),Xe.create({trigger:s,start:"top 85%",once:!1,markers:!1,id:`split-lines-${a}`,onEnter:()=>{ke.to(d.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{ke.to(d.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",s),s.innerHTML=l)};c()})};e.forEach((s,a)=>{o(s,a)}),window.cleanupSplitLines=()=>{t.forEach(s=>{s.element&&s.originalContent&&(s.element.innerHTML=s.originalContent);const a=t.indexOf(s);a>-1&&t.splice(a,1)}),console.log("Split lines cleanup completed")},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((a,l)=>{o(a,l)}),console.log("Split lines refreshed")},100)},console.log(`Initialized split lines animations for ${e.length} elements`)}function $c(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}const t=[],n=()=>new Promise(s=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{s()}):setTimeout(s,100)}),i=s=>new Promise(a=>{const l=s.closest("section")||s.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),o=(s,a)=>{const l=s.innerHTML;s.setAttribute("data-original-content",l),Promise.all([n(),i(s)]).then(()=>{s.offsetHeight;const c=(u=0)=>{const d=new ta(s,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});d.chars&&d.chars.length>0?(t.push({element:s,splitText:d,originalContent:l}),ke.set(d.chars,{opacity:0,y:50,display:"inline-block"}),Xe.create({trigger:s,start:"top 85%",once:!1,markers:!1,id:`split-chars-${a}`,onEnter:()=>{ke.to(d.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{ke.to(d.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create chars after multiple attempts:",s),s.innerHTML=l)};c()})};e.forEach((s,a)=>{o(s,a)}),window.cleanupSplitChars=()=>{t.forEach(s=>{s.element&&s.originalContent&&(s.element.innerHTML=s.originalContent);const a=t.indexOf(s);a>-1&&t.splice(a,1)}),console.log("Split chars cleanup completed")},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((a,l)=>{o(a,l)}),console.log("Split chars refreshed")},100)},console.log(`Initialized split chars animations for ${e.length} elements`)}function Ag(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(ke.set(e,{y:50,filter:"opacity(0)"}),Xe.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{ke.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{ke.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(ke.set(e,{opacity:0,y:50}),Xe.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{ke.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{ke.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))}),console.log(`Initialized scroll reveal animations for ${r.length} elements`)}function JC(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}ke.set(r,{opacity:0,y:50}),Xe.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{ke.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{ke.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}),console.log("Initialized get involved logo fade animation")}function QC(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}const t=document.createElement("div");t.className="marquee-container";const n=e.cloneNode(!0);e.remove(),t.appendChild(e),t.appendChild(n),r.appendChild(t);const i=()=>{setTimeout(()=>{const o=e.getBoundingClientRect(),s=o.height;console.log("Image dimensions:",{natural:{width:e.naturalWidth,height:e.naturalHeight},rendered:{width:o.width,height:s}}),ke.set(e,{top:0,left:0}),ke.set(n,{top:s+"px",left:0});const a=ke.timeline({repeat:-1,ease:"none"}),l=s/30;a.to([e,n],{y:-s,duration:l,ease:"none"}),a.set([e,n],{y:0}),console.log("Initialized infinite marquee animation with height:",s)},100)};e.complete&&e.naturalHeight!==0?i():(e.addEventListener("load",i),setTimeout(i,1e3))}function eR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[GC,WC,XC],t="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,n=document.createElement("img");n.className="mouse-following-image",n.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 291px;
    object-fit: cover;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease;
    mix-blend-mode: plus-lighter;
    filter: opacity(0.4) brightness(0.9) contrast(1.2);
    ${t?"display: none;":""}
  `,document.body.appendChild(n);let i=0,o=0;const s=a=>{i=a.clientX,o=a.clientY,n.style.left=i+"px",n.style.top=o+"px"};document.addEventListener("mousemove",s),r.forEach((a,l)=>{const c=e[l];if(!c){console.warn(`No image mapped for event item ${l}`);return}a.addEventListener("mouseenter",()=>{n.src=c,n.style.opacity="1",a.classList.add("active"),n.style.left=i+"px",n.style.top=o+"px"}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",a.classList.remove("active")})}),console.log(`Initialized hover interactions for ${r.length} event list items`)}function zh(r,e){let t;return function(...i){const o=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(o,e)}}function Cg(){console.log("Reinitializing all split-type elements..."),typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Pi&&Pi.animation){n=Pi.progress,console.log(`Capturing hero fade progress before kill: ${n.toFixed(3)}`);const i=r.querySelectorAll(".char");if(i.length>0){const o=ke.timeline({paused:!0});o.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),o.progress(n)}}if(Pi&&(console.log("Killing existing hero heading fade ScrollTrigger during reinit..."),Pi.kill(),Pi=null),r.querySelector(".char"))console.log("Hero heading already split, preserving characters to prevent flash.");else{console.log("Hero heading not split, resetting content...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{console.log("Reinitializing animations after cleanup..."),e.length&&typeof jc=="function"&&jc(e),t.length&&typeof $c=="function"&&$c(t),typeof zf=="function"&&zf(),Xe.refresh(),console.log("ScrollTrigger.refresh() called after reinitializations."),console.log("All split-type elements and hero animation reinitialized.")},50)}function tR(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=zh(()=>{console.log("Window resized, reinitializing animations..."),Cg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{console.log("Orientation changed, reinitializing animations..."),Cg()}),console.log("Global resize handler initialized.")}const Rg="/150-lab/assets/video/acs-150-compressed.mp4",Pg="/150-lab/assets/images/anniversary-video-poster.jpg";function nR(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;console.log("Setting video source:",Rg),r.src=Rg,console.log("Setting poster path:",Pg),r.poster=Pg,r.addEventListener("error",d=>{var f,h;console.error("Video loading error:",d),console.error("Video src:",r.src),console.error("Video error code:",(f=r.error)==null?void 0:f.code),console.error("Video error message:",(h=r.error)==null?void 0:h.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=(d,f,h=1e3)=>{if(!d)return;const _=d.volume,g=performance.now(),m=p=>{const S=p-g,M=Math.min(S/h,1),v=M*M;d.volume=_+(f-_)*v,M<1&&requestAnimationFrame(m)};requestAnimationFrame(m)},o=()=>{r.paused||(r.pause(),t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08))},s=()=>{r.paused?(r.play(),t.classList.add("hidden"),window.backgroundAudio&&i(window.backgroundAudio,0),r.volume=window.audioMuted?0:.5):o()};t.addEventListener("click",s),r.addEventListener("click",s),r.addEventListener("ended",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),new IntersectionObserver(d=>{d.forEach(f=>{f.isIntersecting||o()})},{threshold:.5}).observe(e);const l=()=>{r.paused||(r.volume=window.audioMuted?0:.5)},c=document.querySelector(".sound-toggle");c&&c.addEventListener("click",l);let u=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return u},set:function(d){u=d,l()}})}new Date("2026-04-06T00:00:00").getTime();function iR(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();if(r.includes("/editor.html/")||r.includes("globe.html"))return console.log("Not on main page - editor or globe page detected"),!1;const t=r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html");return console.log("URL check:",r),console.log("Pathname:",e),console.log("Is main page:",t),t}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Ev({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),kT(),iR()?(console.log("Initializing main page experience"),YC(),nR()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
