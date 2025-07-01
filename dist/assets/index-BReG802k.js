
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

var vv=Object.defineProperty;var yv=(r,e,t)=>e in r?vv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var $e=(r,e,t)=>yv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var xv="1.3.4";function Lg(r,e,t){return Math.max(r,Math.min(e,t))}function Sv(r,e,t){return(1-t)*r+t*e}function wv(r,e,t,n){return Sv(r,e,1-Math.exp(-t*n))}function bv(r,e){return(r%e+e)%e}var Mv=class{constructor(){$e(this,"isRunning",!1);$e(this,"value",0);$e(this,"from",0);$e(this,"to",0);$e(this,"currentTime",0);$e(this,"lerp");$e(this,"duration");$e(this,"easing");$e(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Lg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=wv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:o,onUpdate:s}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=s}};function Ev(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Tv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){$e(this,"width",0);$e(this,"height",0);$e(this,"scrollHeight",0);$e(this,"scrollWidth",0);$e(this,"debouncedResize");$e(this,"wrapperResizeObserver");$e(this,"contentResizeObserver");$e(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});$e(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});$e(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Ev(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Dg=class{constructor(){$e(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,o=t.length;i<o;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Vh=100/6,Tr={passive:!1},Av=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){$e(this,"touchStart",{x:0,y:0});$e(this,"lastDelta",{x:0,y:0});$e(this,"window",{width:0,height:0});$e(this,"emitter",new Dg);$e(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});$e(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});$e(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});$e(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Vh:n===2?this.window.width:1,o=n===1?Vh:n===2?this.window.height:1;e*=i,t*=o,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});$e(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Tr),this.element.addEventListener("touchstart",this.onTouchStart,Tr),this.element.addEventListener("touchmove",this.onTouchMove,Tr),this.element.addEventListener("touchend",this.onTouchEnd,Tr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Tr),this.element.removeEventListener("touchstart",this.onTouchStart,Tr),this.element.removeEventListener("touchmove",this.onTouchMove,Tr),this.element.removeEventListener("touchend",this.onTouchEnd,Tr)}},Gh=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Cv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:s=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:S=!1,anchors:v=!1,autoToggle:M=!1,allowNestedScroll:C=!1,__experimental__naiveDimensions:E=!1}={}){$e(this,"_isScrolling",!1);$e(this,"_isStopped",!1);$e(this,"_isLocked",!1);$e(this,"_preventNextNativeScrollEvent",!1);$e(this,"_resetVelocityTimeout",null);$e(this,"__rafID",null);$e(this,"isTouching");$e(this,"time",0);$e(this,"userData",{});$e(this,"lastVelocity",0);$e(this,"velocity",0);$e(this,"direction",0);$e(this,"options");$e(this,"targetScroll");$e(this,"animatedScroll");$e(this,"animate",new Mv);$e(this,"emitter",new Dg);$e(this,"dimensions");$e(this,"virtualScroll");$e(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});$e(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});$e(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});$e(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,o,s;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("/#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let o=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(o=0),this.scrollTo(o,i)}}});$e(this,"onPointerDown",r=>{r.button===1&&this.reset()});$e(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),o=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const s=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&s&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(s||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,S;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||o&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});$e(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});$e(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=xv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Gh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:o,touchInertiaMultiplier:s,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:b,autoRaf:S,anchors:v,autoToggle:M,allowNestedScroll:C,__experimental__naiveDimensions:E},this.dimensions=new Tv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Av(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:o=this.options.easing,lerp:s=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Lg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof o!="function"?o=Gh:typeof o=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let o,s,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const M=window.getComputedStyle(r);i.computedStyle=M;const C=M.overflowX,E=M.overflowY;if(o=["auto","overlay","scroll"].includes(C),s=["auto","overlay","scroll"].includes(E),i.hasOverflowX=o,i.hasOverflowY=s,!o&&!s||h==="vertical"&&!s||h==="horizontal"&&!o)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,o=i.hasOverflowX,s=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!o&&!s||!a&&!l||h==="vertical"&&(!s||!l)||h==="horizontal"&&(!o||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const M=e!==0,C=t!==0;M&&o&&a&&(_="x"),C&&s&&l&&(_="y")}if(!_)return!1;let g,m,p,b,S;if(_==="x")g=r.scrollLeft,m=c-d,p=e,b=o,S=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,b=s,S=l;else return!1;return(p>0?g<m:g>0)&&b&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?bv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const Rv="modulepreload",Pv=function(r){return"/150-lab/"+r},Wh={},Xh=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=s(t.map(c=>{if(c=Pv(c),c in Wh)return;Wh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Rv,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return e().catch(o)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hf="177",Lv=0,qh=1,Dv=2,Ig=1,Iv=2,ur=3,br=0,jn=1,vi=2,Xr=0,qr=1,Ac=2,Yh=3,jh=4,Ov=5,wo=100,Nv=101,Uv=102,Fv=103,kv=104,Bv=200,zv=201,Hv=202,Vv=203,dd=204,fd=205,Gv=206,Wv=207,Xv=208,qv=209,Yv=210,jv=211,$v=212,Kv=213,Zv=214,hd=0,pd=1,md=2,Ns=3,gd=4,_d=5,vd=6,yd=7,Og=0,Jv=1,Qv=2,Yr=0,ey=1,ty=2,ny=3,iy=4,ry=5,oy=6,sy=7,$h="attached",ay="detached",Ng=300,Us=301,Fs=302,xd=303,Sd=304,Kc=306,ks=1e3,Fr=1001,Cc=1002,Wn=1003,Ug=1004,ya=1005,li=1006,dc=1007,mr=1008,Ji=1009,Fg=1010,kg=1011,Za=1012,Vf=1013,Fo=1014,Oi=1015,ml=1016,Gf=1017,Wf=1018,Ja=1020,Bg=35902,zg=1021,Hg=1022,yi=1023,Qa=1026,el=1027,Xf=1028,qf=1029,Vg=1030,Yf=1031,jf=1033,fc=33776,hc=33777,pc=33778,mc=33779,wd=35840,bd=35841,Md=35842,Ed=35843,Td=36196,Ad=37492,Cd=37496,Rd=37808,Pd=37809,Ld=37810,Dd=37811,Id=37812,Od=37813,Nd=37814,Ud=37815,Fd=37816,kd=37817,Bd=37818,zd=37819,Hd=37820,Vd=37821,gc=36492,Gd=36494,Wd=36495,Gg=36283,Xd=36284,qd=36285,Yd=36286,tl=2300,nl=2301,lu=2302,Kh=2400,Zh=2401,Jh=2402,ly=2500,cy=0,Wg=1,jd=2,uy=3200,dy=3201,Xg=0,fy=1,Ur="",Sn="srgb",Xn="srgb-linear",Rc="linear",Ft="srgb",Yo=7680,Qh=519,hy=512,py=513,my=514,qg=515,gy=516,_y=517,vy=518,yy=519,$d=35044,ep="300 es",gr=2e3,Pc=2001;class Zs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}}const En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tp=1234567;const Da=Math.PI/180,Bs=180/Math.PI;function Ni(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(En[r&255]+En[r>>8&255]+En[r>>16&255]+En[r>>24&255]+"-"+En[e&255]+En[e>>8&255]+"-"+En[e>>16&15|64]+En[e>>24&255]+"-"+En[t&63|128]+En[t>>8&255]+"-"+En[t>>16&255]+En[t>>24&255]+En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]).toLowerCase()}function vt(r,e,t){return Math.max(e,Math.min(t,r))}function $f(r,e){return(r%e+e)%e}function xy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Sy(r,e,t){return r!==e?(t-r)/(e-r):0}function Ia(r,e,t){return(1-t)*r+t*e}function wy(r,e,t,n){return Ia(r,e,1-Math.exp(-t*n))}function by(r,e=1){return e-Math.abs($f(r,e*2)-e)}function My(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Ey(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ty(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ay(r,e){return r+Math.random()*(e-r)}function Cy(r){return r*(.5-Math.random())}function Ry(r){r!==void 0&&(tp=r);let e=tp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Py(r){return r*Da}function Ly(r){return r*Bs}function Dy(r){return(r&r-1)===0&&r!==0}function Iy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Oy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ny(r,e,t,n,i){const o=Math.cos,s=Math.sin,a=o(t/2),l=s(t/2),c=o((e+n)/2),u=s((e+n)/2),d=o((e-n)/2),f=s((e-n)/2),h=o((n-e)/2),_=s((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Li(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Dt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Uy={DEG2RAD:Da,RAD2DEG:Bs,generateUUID:Ni,clamp:vt,euclideanModulo:$f,mapLinear:xy,inverseLerp:Sy,lerp:Ia,damp:wy,pingpong:by,smoothstep:My,smootherstep:Ey,randInt:Ty,randFloat:Ay,randFloatSpread:Cy,seededRandom:Ry,degToRad:Py,radToDeg:Ly,isPowerOfTwo:Dy,ceilPowerOfTwo:Iy,floorPowerOfTwo:Oy,setQuaternionFromProperEuler:Ny,normalize:Dt,denormalize:Li};class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class no{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,s,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=o[s+0],h=o[s+1],_=o[s+2],g=o[s+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const M=Math.sqrt(S),C=Math.atan2(M,p*b);m=Math.sin(m*C)/M,a=Math.sin(a*C)/M}const v=a*b;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,o,s){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=o[s],f=o[s+1],h=o[s+2],_=o[s+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(o/2),f=l(n/2),h=l(i/2),_=l(o/2);switch(s){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],o=t[8],s=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(o-c)*h,this._z=(s-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+s)/h,this._z=(o+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(o-c)/h,this._x=(i+s)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(s-i)/h,this._x=(o+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,o=e._z,s=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+s*a+i*c-o*l,this._y=i*u+s*l+o*a-n*c,this._z=o*u+s*c+n*l-i*a,this._w=s*u-n*a-i*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,o=this._z,s=this._w;let a=s*e._w+n*e._x+i*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*s+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*o+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=s*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=o*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(np.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(np.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*i-a*n),u=2*(a*t-o*i),d=2*(o*n-s*t);return this.x=t+l*c+s*d-a*u,this.y=n+l*u+a*c-o*d,this.z=i+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,o=e.z,s=t.x,a=t.y,l=t.z;return this.x=i*l-o*a,this.y=o*s-n*l,this.z=n*a-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cu=new G,np=new no;class ut{constructor(e,t,n,i,o,s,a,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c)}set(e,t,n,i,o,s,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=o,u[5]=l,u[6]=n,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],b=i[1],S=i[4],v=i[7],M=i[2],C=i[5],E=i[8];return o[0]=s*g+a*b+l*M,o[3]=s*m+a*S+l*C,o[6]=s*p+a*v+l*E,o[1]=c*g+u*b+d*M,o[4]=c*m+u*S+d*C,o[7]=c*p+u*v+d*E,o[2]=f*g+h*b+_*M,o[5]=f*m+h*S+_*C,o[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*a*c-n*o*u+n*a*l+i*o*c-i*s*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,f=a*l-u*o,h=c*o-s*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*s)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*o-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(s*t-n*o)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*s+c*a)+s+e,-i*c,i*l,-i*(-c*s+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uu.makeScale(e,t)),this}rotate(e){return this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uu=new ut;function Yg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function il(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Fy(){const r=il("canvas");return r.style.display="block",r}const ip={};function Ms(r){r in ip||(ip[r]=!0,console.warn(r))}function ky(r,e,t){return new Promise(function(n,i){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function By(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const rp=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),op=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hy(){const r={enabled:!0,workingColorSpace:Xn,spaces:{},convert:function(i,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===Ft&&(i.r=xr(i.r),i.g=xr(i.g),i.b=xr(i.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[o].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ft&&(i.r=Es(i.r),i.g=Es(i.g),i.b=Es(i.b))),i},workingToColorSpace:function(i,o){return this.convert(i,this.workingColorSpace,o)},colorSpaceToWorking:function(i,o){return this.convert(i,o,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ur?Rc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,o=this.workingColorSpace){return i.fromArray(this.spaces[o].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,o,s){return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,o){return Ms("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,o)},toWorkingColorSpace:function(i,o){return Ms("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Xn]:{primaries:e,whitePoint:n,transfer:Rc,toXYZ:rp,fromXYZ:op,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:n,transfer:Ft,toXYZ:rp,fromXYZ:op,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),r}const Mt=Hy();function xr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Es(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let jo;class Vy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jo===void 0&&(jo=il("canvas")),jo.width=e.width,jo.height=e.height;const i=jo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=jo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=il("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=xr(o[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xr(t[n]/255)*255):t[n]=xr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gy=0;class Kf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gy++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?o.push(du(i[s].image)):o.push(du(i[s]))}else o=du(i);n.url=o}return t||(e.images[this.uuid]=n),n}}function du(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Vy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wy=0;const fu=new G;class cn extends Zs{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,n=Fr,i=Fr,o=li,s=mr,a=yi,l=Ji,c=cn.DEFAULT_ANISOTROPY,u=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=Ni(),this.name="",this.source=new Kf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fu).x}get height(){return this.source.getSize(fu).y}get depth(){return this.source.getSize(fu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case Fr:e.x=e.x<0?0:1;break;case Cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case Fr:e.y=e.y<0?0:1;break;case Cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Ng;cn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,t=0,n=0,i=1){At.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(h+1)/2,M=(p+1)/2,C=(u+f)/4,E=(d+g)/4,P=(_+m)/4;return S>v&&S>M?S<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(S),i=C/n,o=E/n):v>M?v<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(v),n=C/i,o=P/i):M<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(M),n=E/o,i=P/o),this.set(n,i,o,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this.w=vt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this.w=vt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xy extends Zs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);const i={width:e,height:t,depth:n.depth},o=new cn(i);this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:li,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kf(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ko extends Xy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jg extends cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qy extends cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,Ei):Ei.fromBufferAttribute(o,s),Ei.applyMatrix4(e.matrixWorld),this.expandByPoint(Ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xl.copy(n.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ei),Ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ia),Sl.subVectors(this.max,ia),$o.subVectors(e.a,ia),Ko.subVectors(e.b,ia),Zo.subVectors(e.c,ia),Ar.subVectors(Ko,$o),Cr.subVectors(Zo,Ko),so.subVectors($o,Zo);let t=[0,-Ar.z,Ar.y,0,-Cr.z,Cr.y,0,-so.z,so.y,Ar.z,0,-Ar.x,Cr.z,0,-Cr.x,so.z,0,-so.x,-Ar.y,Ar.x,0,-Cr.y,Cr.x,0,-so.y,so.x,0];return!hu(t,$o,Ko,Zo,Sl)||(t=[1,0,0,0,1,0,0,0,1],!hu(t,$o,Ko,Zo,Sl))?!1:(wl.crossVectors(Ar,Cr),t=[wl.x,wl.y,wl.z],hu(t,$o,Ko,Zo,Sl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const rr=[new G,new G,new G,new G,new G,new G,new G,new G],Ei=new G,xl=new Fi,$o=new G,Ko=new G,Zo=new G,Ar=new G,Cr=new G,so=new G,ia=new G,Sl=new G,wl=new G,ao=new G;function hu(r,e,t,n,i){for(let o=0,s=r.length-3;o<=s;o+=3){ao.fromArray(r,o);const a=i.x*Math.abs(ao.x)+i.y*Math.abs(ao.y)+i.z*Math.abs(ao.z),l=e.dot(ao),c=t.dot(ao),u=n.dot(ao);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Yy=new Fi,ra=new G,pu=new G;class tr{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Yy.setFromPoints(e).getCenter(n);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ra.subVectors(e,this.center);const t=ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ra.copy(e.center).add(pu)),this.expandByPoint(ra.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const or=new G,mu=new G,bl=new G,Rr=new G,gu=new G,Ml=new G,_u=new G;class Zc{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,or)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=or.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(or.copy(this.origin).addScaledVector(this.direction,t),or.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mu.copy(e).add(t).multiplyScalar(.5),bl.copy(t).sub(e).normalize(),Rr.copy(this.origin).sub(mu);const o=e.distanceTo(t)*.5,s=-this.direction.dot(bl),a=Rr.dot(this.direction),l=-Rr.dot(bl),c=Rr.lengthSq(),u=Math.abs(1-s*s);let d,f,h,_;if(u>0)if(d=s*l-a,f=s*a-l,_=o*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+s*f+2*a)+f*(s*d+f+2*l)+c}else f=o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f=-o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-s*o+a)),f=d>0?-o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-o,-l),o),h=f*(f+2*l)+c):(d=Math.max(0,-(s*o+a)),f=d>0?o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c);else f=s>0?-o:o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mu).addScaledVector(bl,f),h}intersectSphere(e,t){or.subVectors(e.center,this.origin);const n=or.dot(this.direction),i=or.dot(or)-n*n,o=e.radius*e.radius;if(i>o)return null;const s=Math.sqrt(o-i),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,s,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(o=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),n>s||o>i||((o>n||isNaN(n))&&(n=o),(s<i||isNaN(i))&&(i=s),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,or)!==null}intersectTriangle(e,t,n,i,o){gu.subVectors(t,e),Ml.subVectors(n,e),_u.crossVectors(gu,Ml);let s=this.direction.dot(_u),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Rr.subVectors(this.origin,e);const l=a*this.direction.dot(Ml.crossVectors(Rr,Ml));if(l<0)return null;const c=a*this.direction.dot(gu.cross(Rr));if(c<0||l+c>s)return null;const u=-a*Rr.dot(_u);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,o,s,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=o,p[5]=s,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Jo.setFromMatrixColumn(e,0).length(),o=1/Jo.setFromMatrixColumn(e,1).length(),s=1/Jo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){const f=s*u,h=s*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=s*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=s*c,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=s*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-s*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=s*u,t[9]=g-f*a,t[2]=-s*c,t[6]=a,t[10]=s*l}else if(e.order==="ZYX"){const f=s*u,h=s*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=s*l}else if(e.order==="YZX"){const f=s*l,h=s*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=s*l,h=s*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=s*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jy,e,$y)}lookAt(e,t,n){const i=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),Pr.crossVectors(n,ei),Pr.lengthSq()===0&&(Math.abs(n.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),Pr.crossVectors(n,ei)),Pr.normalize(),El.crossVectors(ei,Pr),i[0]=Pr.x,i[4]=El.x,i[8]=ei.x,i[1]=Pr.y,i[5]=El.y,i[9]=ei.y,i[2]=Pr.z,i[6]=El.z,i[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],M=n[15],C=i[0],E=i[4],P=i[8],w=i[12],y=i[1],L=i[5],D=i[9],z=i[13],O=i[2],T=i[6],W=i[10],J=i[14],q=i[3],pe=i[7],N=i[11],j=i[15];return o[0]=s*C+a*y+l*O+c*q,o[4]=s*E+a*L+l*T+c*pe,o[8]=s*P+a*D+l*W+c*N,o[12]=s*w+a*z+l*J+c*j,o[1]=u*C+d*y+f*O+h*q,o[5]=u*E+d*L+f*T+h*pe,o[9]=u*P+d*D+f*W+h*N,o[13]=u*w+d*z+f*J+h*j,o[2]=_*C+g*y+m*O+p*q,o[6]=_*E+g*L+m*T+p*pe,o[10]=_*P+g*D+m*W+p*N,o[14]=_*w+g*z+m*J+p*j,o[3]=b*C+S*y+v*O+M*q,o[7]=b*E+S*L+v*T+M*pe,o[11]=b*P+S*D+v*W+M*N,o[15]=b*w+S*z+v*J+M*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+o*l*d-i*c*d-o*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+o*s*f-i*s*h+i*c*u-o*l*u)+m*(+t*c*d-t*a*h-o*s*d+n*s*h+o*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*s*d-n*s*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,S=_*f*c-u*m*c-_*l*h+s*m*h+u*l*p-s*f*p,v=u*g*c-_*d*c+_*a*h-s*g*h-u*a*p+s*d*p,M=_*d*l-u*g*l-_*a*f+s*g*f+u*a*m-s*d*m,C=t*b+n*S+i*v+o*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/C;return e[0]=b*E,e[1]=(g*f*o-d*m*o-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*o-g*l*o+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*o-a*f*o-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=S*E,e[5]=(u*m*o-_*f*o+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*o-s*m*o-_*i*c+t*m*c+s*i*p-t*l*p)*E,e[7]=(s*f*o-u*l*o+u*i*c-t*f*c-s*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*o-u*g*o-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(s*g*o-_*a*o+_*n*c-t*g*c-s*n*p+t*a*p)*E,e[11]=(u*a*o-s*d*o-u*n*c+t*d*c+s*n*h-t*a*h)*E,e[12]=M*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-s*g*i-_*n*l+t*g*l+s*n*m-t*a*m)*E,e[15]=(s*d*i-u*a*i+u*n*l-t*d*l-s*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),o=1-n,s=e.x,a=e.y,l=e.z,c=o*s,u=o*a;return this.set(c*s+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*s,0,c*l-i*a,u*l+i*s,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,s){return this.set(1,n,o,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,o=t._x,s=t._y,a=t._z,l=t._w,c=o+o,u=s+s,d=a+a,f=o*c,h=o*u,_=o*d,g=s*u,m=s*d,p=a*d,b=l*c,S=l*u,v=l*d,M=n.x,C=n.y,E=n.z;return i[0]=(1-(g+p))*M,i[1]=(h+v)*M,i[2]=(_-S)*M,i[3]=0,i[4]=(h-v)*C,i[5]=(1-(f+p))*C,i[6]=(m+b)*C,i[7]=0,i[8]=(_+S)*E,i[9]=(m-b)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let o=Jo.set(i[0],i[1],i[2]).length();const s=Jo.set(i[4],i[5],i[6]).length(),a=Jo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],Ti.copy(this);const c=1/o,u=1/s,d=1/a;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=u,Ti.elements[5]*=u,Ti.elements[6]*=u,Ti.elements[8]*=d,Ti.elements[9]*=d,Ti.elements[10]*=d,t.setFromRotationMatrix(Ti),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,i,o,s,a=gr){const l=this.elements,c=2*o/(t-e),u=2*o/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===gr)h=-(s+o)/(s-o),_=-2*s*o/(s-o);else if(a===Pc)h=-s/(s-o),_=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,o,s,a=gr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(s-o),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===gr)_=(s+o)*d,g=-2*d;else if(a===Pc)_=o*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Jo=new G,Ti=new dt,jy=new G(0,0,0),$y=new G(1,1,1),Pr=new G,El=new G,ei=new G,sp=new dt,ap=new no;class Qi{constructor(e=0,t=0,n=0,i=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,o=i[0],s=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-vt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ap.setFromEuler(this),this.setFromQuaternion(ap,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class $g{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ky=0;const lp=new G,Qo=new no,sr=new dt,Tl=new G,oa=new G,Zy=new G,Jy=new no,cp=new G(1,0,0),up=new G(0,1,0),dp=new G(0,0,1),fp={type:"added"},Qy={type:"removed"},es={type:"childadded",child:null},vu={type:"childremoved",child:null};class jt extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ky++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new G,t=new Qi,n=new no,i=new G(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dt},normalMatrix:{value:new ut}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $g,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qo.setFromAxisAngle(e,t),this.quaternion.multiply(Qo),this}rotateOnWorldAxis(e,t){return Qo.setFromAxisAngle(e,t),this.quaternion.premultiply(Qo),this}rotateX(e){return this.rotateOnAxis(cp,e)}rotateY(e){return this.rotateOnAxis(up,e)}rotateZ(e){return this.rotateOnAxis(dp,e)}translateOnAxis(e,t){return lp.copy(e).applyQuaternion(this.quaternion),this.position.add(lp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cp,e)}translateY(e){return this.translateOnAxis(up,e)}translateZ(e){return this.translateOnAxis(dp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tl.copy(e):Tl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sr.lookAt(oa,Tl,this.up):sr.lookAt(Tl,oa,this.up),this.quaternion.setFromRotationMatrix(sr),i&&(sr.extractRotation(i.matrixWorld),Qo.setFromRotationMatrix(sr),this.quaternion.premultiply(Qo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fp),es.child=e,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qy),vu.child=e,this.dispatchEvent(vu),vu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fp),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,Zy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,Jy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(e.shapes,d)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));i.material=a}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(e.animations,l))}}if(t){const a=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),d=s(e.shapes),f=s(e.skeletons),h=s(e.animations),_=s(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function s(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}jt.DEFAULT_UP=new G(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ai=new G,ar=new G,yu=new G,lr=new G,ts=new G,ns=new G,hp=new G,xu=new G,Su=new G,wu=new G,bu=new At,Mu=new At,Eu=new At;class Di{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ai.subVectors(e,t),i.cross(Ai);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){Ai.subVectors(i,t),ar.subVectors(n,t),yu.subVectors(e,t);const s=Ai.dot(Ai),a=Ai.dot(ar),l=Ai.dot(yu),c=ar.dot(ar),u=ar.dot(yu),d=s*c-a*a;if(d===0)return o.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(s*u-a*l)*f;return o.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(e,t,n,i,o,s,a,l){return this.getBarycoord(e,t,n,i,lr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,lr.x),l.addScaledVector(s,lr.y),l.addScaledVector(a,lr.z),l)}static getInterpolatedAttribute(e,t,n,i,o,s){return bu.setScalar(0),Mu.setScalar(0),Eu.setScalar(0),bu.fromBufferAttribute(e,t),Mu.fromBufferAttribute(e,n),Eu.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(bu,o.x),s.addScaledVector(Mu,o.y),s.addScaledVector(Eu,o.z),s}static isFrontFacing(e,t,n,i){return Ai.subVectors(n,t),ar.subVectors(e,t),Ai.cross(ar).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),Ai.cross(ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return Di.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return Di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,o=this.c;let s,a;ts.subVectors(i,n),ns.subVectors(o,n),xu.subVectors(e,n);const l=ts.dot(xu),c=ns.dot(xu);if(l<=0&&c<=0)return t.copy(n);Su.subVectors(e,i);const u=ts.dot(Su),d=ns.dot(Su);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(n).addScaledVector(ts,s);wu.subVectors(e,o);const h=ts.dot(wu),_=ns.dot(wu);if(_>=0&&h<=_)return t.copy(o);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(ns,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return hp.subVectors(o,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hp,a);const p=1/(m+g+f);return s=g*p,a=f*p,t.copy(n).addScaledVector(ts,s).addScaledVector(ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Lr={h:0,s:0,l:0},Al={h:0,s:0,l:0};function Tu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=$f(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=Tu(s,o,e+1/3),this.g=Tu(s,o,e),this.b=Tu(s,o,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=Sn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const n=Kg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return Mt.workingToColorSpace(Tn.copy(this),e),Math.round(vt(Tn.r*255,0,255))*65536+Math.round(vt(Tn.g*255,0,255))*256+Math.round(vt(Tn.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(Tn.copy(this),t);const n=Tn.r,i=Tn.g,o=Tn.b,s=Math.max(n,i,o),a=Math.min(n,i,o);let l,c;const u=(a+s)/2;if(a===s)l=0,c=0;else{const d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case n:l=(i-o)/d+(i<o?6:0);break;case i:l=(o-n)/d+2;break;case o:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=Sn){Mt.workingToColorSpace(Tn.copy(this),e);const t=Tn.r,n=Tn.g,i=Tn.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Lr),this.setHSL(Lr.h+e,Lr.s+t,Lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Lr),e.getHSL(Al);const n=Ia(Lr.h,Al.h,t),i=Ia(Lr.s,Al.s,t),o=Ia(Lr.l,Al.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Tn=new Ke;Ke.NAMES=Kg;let ex=0;class $i extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=qr,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dd,this.blendDst=fd,this.blendEquation=wo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yo,this.stencilZFail=Yo,this.stencilZPass=Yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qr&&(n.blending=this.blending),this.side!==br&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dd&&(n.blendSrc=this.blendSrc),this.blendDst!==fd&&(n.blendDst=this.blendDst),this.blendEquation!==wo&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(t){const o=i(e.textures),s=i(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mo extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rn=new G,Cl=new St;let tx=0;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$d,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cl.fromBufferAttribute(this,t),Cl.applyMatrix3(e),this.setXY(t,Cl.x,Cl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array),o=Dt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$d&&(e.usage=this.usage),e}}class Zg extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jg extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Sr extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let nx=0;const hi=new dt,Au=new jt,is=new G,ti=new Fi,sa=new Fi,mn=new G;class Mi extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yg(e)?Jg:Zg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ut().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return Au.lookAt(e),Au.updateMatrix(),this.applyMatrix4(Au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,o=e.length;i<o;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Sr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const o=t[n];ti.setFromBufferAttribute(o),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){const a=t[o];sa.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(ti.min,sa.min),ti.expandByPoint(mn),mn.addVectors(ti.max,sa.max),ti.expandByPoint(mn)):(ti.expandByPoint(sa.min),ti.expandByPoint(sa.max))}ti.getCenter(n);let i=0;for(let o=0,s=e.count;o<s;o++)mn.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(mn));if(t)for(let o=0,s=t.length;o<s;o++){const a=t[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)mn.fromBufferAttribute(a,c),l&&(is.fromBufferAttribute(e,c),mn.add(is)),i=Math.max(i,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new G,l[P]=new G;const c=new G,u=new G,d=new G,f=new St,h=new St,_=new St,g=new G,m=new G;function p(P,w,y){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),f.fromBufferAttribute(o,P),h.fromBufferAttribute(o,w),_.fromBufferAttribute(o,y),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),a[P].add(g),a[w].add(g),a[y].add(g),l[P].add(m),l[w].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let P=0,w=b.length;P<w;++P){const y=b[P],L=y.start,D=y.count;for(let z=L,O=L+D;z<O;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new G,v=new G,M=new G,C=new G;function E(P){M.fromBufferAttribute(i,P),C.copy(M);const w=a[P];S.copy(w),S.sub(M.multiplyScalar(M.dot(w))).normalize(),v.crossVectors(C,w);const L=v.dot(l[P])<0?-1:1;s.setXYZW(P,S.x,S.y,S.z,L)}for(let P=0,w=b.length;P<w;++P){const y=b[P],L=y.start,D=y.count;for(let z=L,O=L+D;z<O;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new G,o=new G,s=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new It(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const o=e.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pp=new dt,lo=new Zc,Rl=new tr,mp=new G,Pl=new G,Ll=new G,Dl=new G,Cu=new G,Il=new G,gp=new G,Ol=new G;class Gn extends jt{constructor(e=new Mi,t=new Mo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(o&&a){Il.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(Cu.fromBufferAttribute(d,e),s?Il.addScaledVector(Cu,u):Il.addScaledVector(Cu.sub(t),u))}t.add(Il)}return t}raycast(e,t){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rl.copy(n.boundingSphere),Rl.applyMatrix4(o),lo.copy(e.ray).recast(e.near),!(Rl.containsPoint(lo.origin)===!1&&(lo.intersectSphere(Rl,mp)===null||lo.origin.distanceToSquared(mp)>(e.far-e.near)**2))&&(pp.copy(o).invert(),lo.copy(e.ray).applyMatrix4(pp),!(n.boundingBox!==null&&lo.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,lo)))}_computeIntersections(e,t,n){let i;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,h=o.drawRange;if(a!==null)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=s[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,M=S;v<M;v+=3){const C=a.getX(v),E=a.getX(v+1),P=a.getX(v+2);i=Nl(this,p,e,n,c,u,d,C,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=Nl(this,s,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=s[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,M=S;v<M;v+=3){const C=v,E=v+1,P=v+2;i=Nl(this,p,e,n,c,u,d,C,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=m,S=m+1,v=m+2;i=Nl(this,s,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ix(r,e,t,n,i,o,s,a){let l;if(e.side===jn?l=n.intersectTriangle(s,o,i,!0,a):l=n.intersectTriangle(i,o,s,e.side===br,a),l===null)return null;Ol.copy(a),Ol.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ol);return c<t.near||c>t.far?null:{distance:c,point:Ol.clone(),object:r}}function Nl(r,e,t,n,i,o,s,a,l,c){r.getVertexPosition(a,Pl),r.getVertexPosition(l,Ll),r.getVertexPosition(c,Dl);const u=ix(r,e,t,n,Pl,Ll,Dl,gp);if(u){const d=new G;Di.getBarycoord(gp,Pl,Ll,Dl,d),i&&(u.uv=Di.getInterpolatedAttribute(i,a,l,c,d,new St)),o&&(u.uv1=Di.getInterpolatedAttribute(o,a,l,c,d,new St)),s&&(u.normal=Di.getInterpolatedAttribute(s,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};Di.getNormal(Pl,Ll,Dl,f.normal),u.face=f,u.barycoord=d}return u}class gl extends Mi{constructor(e=1,t=1,n=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:s};const a=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,s,o,0),_("z","y","x",1,-1,n,t,-e,s,o,1),_("x","z","y",1,1,e,n,t,i,s,2),_("x","z","y",1,-1,e,n,-t,i,s,3),_("x","y","z",1,-1,e,t,n,i,o,4),_("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(l),this.setAttribute("position",new Sr(c,3)),this.setAttribute("normal",new Sr(u,3)),this.setAttribute("uv",new Sr(d,2));function _(g,m,p,b,S,v,M,C,E,P,w){const y=v/E,L=M/P,D=v/2,z=M/2,O=C/2,T=E+1,W=P+1;let J=0,q=0;const pe=new G;for(let N=0;N<W;N++){const j=N*L-z;for(let We=0;We<T;We++){const Je=We*y-D;pe[g]=Je*b,pe[m]=j*S,pe[p]=O,c.push(pe.x,pe.y,pe.z),pe[g]=0,pe[m]=0,pe[p]=C>0?1:-1,u.push(pe.x,pe.y,pe.z),d.push(We/E),d.push(1-N/P),J+=1}}for(let N=0;N<P;N++)for(let j=0;j<E;j++){const We=f+j+T*N,Je=f+j+T*(N+1),ne=f+(j+1)+T*(N+1),ce=f+(j+1)+T*N;l.push(We,Je,ce),l.push(Je,ne,ce),q+=6}a.addGroup(h,q,w),h+=q,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Fn(r){const e={};for(let t=0;t<r.length;t++){const n=zs(r[t]);for(const i in n)e[i]=n[i]}return e}function rx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Qg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}const ox={clone:zs,merge:Fn};var sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ax=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sx,this.fragmentShader=ax,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=rx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class e_ extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=gr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dr=new G,_p=new St,vp=new St;class Yn extends e_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z),Dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z)}getViewSize(e,t){return this.getViewBounds(e,_p,vp),t.subVectors(vp,_p)}setViewOffset(e,t,n,i,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*i/l,t-=s.offsetY*n/c,i*=s.width/l,n*=s.height/c}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const rs=-90,os=1;class lx extends jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Yn(rs,os,e,t);i.layers=this.layers,this.add(i);const o=new Yn(rs,os,e,t);o.layers=this.layers,this.add(o);const s=new Yn(rs,os,e,t);s.layers=this.layers,this.add(s);const a=new Yn(rs,os,e,t);a.layers=this.layers,this.add(a);const l=new Yn(rs,os,e,t);l.layers=this.layers,this.add(l);const c=new Yn(rs,os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,o,s,a,l]=t;for(const c of t)this.remove(c);if(e===gr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Pc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class t_ extends cn{constructor(e=[],t=Us,n,i,o,s,a,l,c,u){super(e,t,n,i,o,s,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cx extends ko{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new t_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gl(5,5,5),o=new xi({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jn,blending:Xr});o.uniforms.tEquirect.value=t;const s=new Gn(i,o),a=t.minFilter;return t.minFilter===mr&&(t.minFilter=li),new lx(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(o)}}class _r extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ux={type:"move"};class Ru{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ux)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yp extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class dx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$d,this.updateRanges=[],this.version=0,this.uuid=Ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,o=this.stride;i<o;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const On=new G;class Zf{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)On.fromBufferAttribute(this,t),On.applyMatrix4(e),this.setXYZ(t,On.x,On.y,On.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)On.fromBufferAttribute(this,t),On.applyNormalMatrix(e),this.setXYZ(t,On.x,On.y,On.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)On.fromBufferAttribute(this,t),On.transformDirection(e),this.setXYZ(t,On.x,On.y,On.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Li(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array),o=Dt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const xp=new G,Sp=new At,wp=new At,fx=new G,bp=new dt,Ul=new G,Pu=new tr,Mp=new dt,Lu=new Zc;class hx extends Gn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$h,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Fi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingBox.expandByPoint(Ul)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new tr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingSphere.expandByPoint(Ul)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pu.copy(this.boundingSphere),Pu.applyMatrix4(i),e.ray.intersectsSphere(Pu)!==!1&&(Mp.copy(i).invert(),Lu.copy(e.ray).applyMatrix4(Mp),!(this.boundingBox!==null&&Lu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new At,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===$h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ay?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Sp.fromBufferAttribute(i.attributes.skinIndex,e),wp.fromBufferAttribute(i.attributes.skinWeight,e),xp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const s=wp.getComponent(o);if(s!==0){const a=Sp.getComponent(o);bp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(fx.copy(xp).applyMatrix4(bp),s)}}return t.applyMatrix4(this.bindMatrixInverse)}}class n_ extends jt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class i_ extends cn{constructor(e=null,t=1,n=1,i,o,s,a,l,c=Wn,u=Wn,d,f){super(null,s,a,l,c,u,i,o,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ep=new dt,px=new dt;class Jf{constructor(e=[],t=[]){this.uuid=Ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new dt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let o=0,s=e.length;o<s;o++){const a=e[o]?e[o].matrixWorld:px;Ep.multiplyMatrices(a,t[o]),Ep.toArray(n,o*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new i_(t,e,e,yi,Oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const o=e.bones[n];let s=t[o];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),s=new n_),this.bones.push(s),this.boneInverses.push(new dt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,o=t.length;i<o;i++){const s=t[i];e.bones.push(s.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Kd extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ss=new dt,Tp=new dt,Fl=[],Ap=new Fi,mx=new dt,aa=new Gn,la=new tr;class gx extends Gn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,mx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),Ap.copy(e.boundingBox).applyMatrix4(ss),this.boundingBox.union(Ap)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new tr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),la.copy(e.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(la)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,s=e*o+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(aa.geometry=this.geometry,aa.material=this.material,aa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),la.copy(this.boundingSphere),la.applyMatrix4(n),e.ray.intersectsSphere(la)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,ss),Tp.multiplyMatrices(n,ss),aa.matrixWorld=Tp,aa.raycast(e,Fl);for(let s=0,a=Fl.length;s<a;s++){const l=Fl[s];l.instanceId=o,l.object=this,t.push(l)}Fl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new i_(new Float32Array(i*this.count),i,this.count,Xf,Oi));const o=this.morphTexture.source.data.data;let s=0;for(let c=0;c<n.length;c++)s+=n[c];const a=this.geometry.morphTargetsRelative?1:1-s,l=i*e;o[l]=a,o.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Du=new G,_x=new G,vx=new ut;class _o{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Du.subVectors(n,t).cross(_x.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Du),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vx.getNormalMatrix(e),i=this.coplanarPoint(Du).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const co=new tr,kl=new G;class Qf{constructor(e=new _o,t=new _o,n=new _o,i=new _o,o=new _o,s=new _o){this.planes=[e,t,n,i,o,s]}set(e,t,n,i,o,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gr){const n=this.planes,i=e.elements,o=i[0],s=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],b=i[13],S=i[14],v=i[15];if(n[0].setComponents(l-o,f-c,m-h,v-p).normalize(),n[1].setComponents(l+o,f+c,m+h,v+p).normalize(),n[2].setComponents(l+s,f+u,m+_,v+b).normalize(),n[3].setComponents(l-s,f-u,m-_,v-b).normalize(),n[4].setComponents(l-a,f-d,m-g,v-S).normalize(),t===gr)n[5].setComponents(l+a,f+d,m+g,v+S).normalize();else if(t===Pc)n[5].setComponents(a,d,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),co.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),co.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(co)}intersectsSprite(e){return co.center.set(0,0,0),co.radius=.7071067811865476,co.applyMatrix4(e.matrixWorld),this.intersectsSphere(co)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(kl.x=i.normal.x>0?e.max.x:e.min.x,kl.y=i.normal.y>0?e.max.y:e.min.y,kl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class r_ extends $i{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lc=new G,Dc=new G,Cp=new dt,ca=new Zc,Bl=new tr,Iu=new G,Rp=new G;class eh extends jt{constructor(e=new Mi,t=new r_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)Lc.fromBufferAttribute(t,i-1),Dc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Lc.distanceTo(Dc);e.setAttribute("lineDistance",new Sr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bl.copy(n.boundingSphere),Bl.applyMatrix4(i),Bl.radius+=o,e.ray.intersectsSphere(Bl)===!1)return;Cp.copy(i).invert(),ca.copy(e.ray).applyMatrix4(Cp);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,s.start),_=Math.min(u.count,s.start+s.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),b=u.getX(g+1),S=zl(this,e,ca,l,p,b,g);S&&t.push(S)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=zl(this,e,ca,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,s.start),_=Math.min(f.count,s.start+s.count);for(let g=h,m=_-1;g<m;g+=c){const p=zl(this,e,ca,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=zl(this,e,ca,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function zl(r,e,t,n,i,o,s){const a=r.geometry.attributes.position;if(Lc.fromBufferAttribute(a,i),Dc.fromBufferAttribute(a,o),t.distanceSqToSegment(Lc,Dc,Iu,Rp)>n)return;Iu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Iu);if(!(c<e.near||c>e.far))return{distance:c,point:Rp.clone().applyMatrix4(r.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:r}}const Pp=new G,Lp=new G;class yx extends eh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,o=t.count;i<o;i+=2)Pp.fromBufferAttribute(t,i),Lp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Pp.distanceTo(Lp);e.setAttribute("lineDistance",new Sr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xx extends eh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class o_ extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dp=new dt,Zd=new Zc,Hl=new tr,Vl=new G;class Jd extends jt{constructor(e=new Mi,t=new o_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(i),Hl.radius+=o,e.ray.intersectsSphere(Hl)===!1)return;Dp.copy(i).invert(),Zd.copy(e.ray).applyMatrix4(Dp);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,s.start),h=Math.min(c.count,s.start+s.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Vl.fromBufferAttribute(d,m),Ip(Vl,m,l,i,e,t,this)}}else{const f=Math.max(0,s.start),h=Math.min(d.count,s.start+s.count);for(let _=f,g=h;_<g;_++)Vl.fromBufferAttribute(d,_),Ip(Vl,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Ip(r,e,t,n,i,o,s){const a=Zd.distanceSqToPoint(r);if(a<t){const l=new G;Zd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class s_ extends cn{constructor(e,t,n=Fo,i,o,s,a=Wn,l=Wn,c,u=Qa,d=1){if(u!==Qa&&u!==el)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,o,s,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ri extends Mi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const o=e/2,s=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const b=p*f-s;for(let S=0;S<c;S++){const v=S*d-o;_.push(v,-b,0),g.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const S=b+c*p,v=b+c*(p+1),M=b+1+c*(p+1),C=b+1+c*p;h.push(S,v,C),h.push(v,M,C)}this.setIndex(h),this.setAttribute("position",new Sr(_,3)),this.setAttribute("normal",new Sr(g,3)),this.setAttribute("uv",new Sr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class th extends $i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xg,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nr extends th{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new St(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Sx extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wx extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Gl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function bx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Mx(r){function e(i,o){return r[i]-r[o]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Op(r,e,t){const n=r.length,i=new r.constructor(n);for(let o=0,s=0;s!==n;++o){const a=t[o]*e;for(let l=0;l!==e;++l)i[s++]=r[a+l]}return i}function a_(r,e,t,n){let i=1,o=r[0];for(;o!==void 0&&o[n]===void 0;)o=r[i++];if(o===void 0)return;let s=o[n];if(s!==void 0)if(Array.isArray(s))do s=o[n],s!==void 0&&(e.push(o.time),t.push(...s)),o=r[i++];while(o!==void 0);else if(s.toArray!==void 0)do s=o[n],s!==void 0&&(e.push(o.time),s.toArray(t,t.length)),o=r[i++];while(o!==void 0);else do s=o[n],s!==void 0&&(e.push(o.time),t.push(s)),o=r[i++];while(o!==void 0)}class _l{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],o=t[n-1];n:{e:{let s;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(o=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=o)){const a=t[1];e<a&&(n=2,o=a);for(let l=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){const a=n+s>>>1;e<t[a]?s=a:n=a+1}if(i=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,i)}return this.interpolate_(n,o,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i;for(let s=0;s!==i;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ex extends _l{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kh,endingEnd:Kh}}intervalChanged_(e,t,n){const i=this.parameterPositions;let o=e-2,s=e+1,a=i[o],l=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case Zh:o=e,a=2*t-n;break;case Jh:o=i.length-2,a=t+i[o]-i[o+1];break;default:o=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zh:s=e,l=2*n-t;break;case Jh:s=1,l=n+i[1]-i[0];break;default:s=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,b=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,S=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let M=0;M!==a;++M)o[M]=p*s[u+M]+b*s[c+M]+S*s[l+M]+v*s[d+M];return o}}class Tx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)o[f]=s[c+f]*d+s[l+f]*u;return o}}class Ax extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ki{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gl(t,this.TimeBufferType),this.values=Gl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gl(e.times,Array),values:Gl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ax(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ex(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case nl:t=this.InterpolantFactoryMethodLinear;break;case lu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return nl;case this.InterpolantFactoryMethodSmooth:return lu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let o=0,s=i-1;for(;o!==i&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==i){o>=s&&(s=Math.max(s,1),o=s-1);const a=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),e=!1;break}s=l}if(i!==void 0&&bx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===lu,o=e.length-1;let s=1;for(let a=1;a<o;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==s){e[s]=e[a];const d=a*n,f=s*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++s}}if(o>0){e[s]=e[o];for(let a=o*n,l=s*n,c=0;c!==n;++c)t[l+c]=t[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ki.prototype.ValueTypeName="";ki.prototype.TimeBufferType=Float32Array;ki.prototype.ValueBufferType=Float32Array;ki.prototype.DefaultInterpolation=nl;class Js extends ki{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="bool";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=tl;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class l_ extends ki{constructor(e,t,n,i){super(e,t,n,i)}}l_.prototype.ValueTypeName="color";class Hs extends ki{constructor(e,t,n,i){super(e,t,n,i)}}Hs.prototype.ValueTypeName="number";class Cx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)no.slerpFlat(o,0,s,c-a,s,c,l);return o}}class Vs extends ki{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Cx(this.times,this.values,this.getValueSize(),e)}}Vs.prototype.ValueTypeName="quaternion";Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class Qs extends ki{constructor(e,t,n){super(e,t,n)}}Qs.prototype.ValueTypeName="string";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=tl;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends ki{constructor(e,t,n,i){super(e,t,n,i)}}Gs.prototype.ValueTypeName="vector";class Rx{constructor(e="",t=-1,n=[],i=ly){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ni(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(Lx(n[s]).scale(i));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,s=n.length;o!==s;++o)t.push(ki.toJSON(n[o]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const o=t.length,s=[];for(let a=0;a<o;a++){let l=[],c=[];l.push((a+o-1)%o,a,(a+1)%o),c.push(0,1,0);const u=Mx(l);l=Op(l,1,u),c=Op(c,1,u),!i&&l[0]===0&&(l.push(o),c.push(c[0])),s.push(new Hs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},o=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(o);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const s=[];for(const a in i)s.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return s}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];a_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],o=e.name||"default",s=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let b=0;b!==f[_].morphTargets.length;++b){const S=f[_];m.push(S.time),p.push(S.morphTarget===g?1:0)}i.push(new Hs(".morphTargetInfluence["+g+"]",m,p))}l=h.length*s}else{const h=".bones["+t[d].name+"]";n(Gs,h+".position",f,"pos",i),n(Vs,h+".quaternion",f,"rot",i),n(Gs,h+".scale",f,"scl",i)}}return i.length===0?null:new this(o,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Px(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hs;case"vector":case"vector2":case"vector3":case"vector4":return Gs;case"color":return l_;case"quaternion":return Vs;case"bool":case"boolean":return Js;case"string":return Qs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Lx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Px(r.type);if(r.times===void 0){const t=[],n=[];a_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const kr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Dx{constructor(e,t,n){const i=this;let o=!1,s=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,o===!1&&i.onStart!==void 0&&i.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,i.onProgress!==void 0&&i.onProgress(u,s,a),s===a&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const Ix=new Dx;class ea{constructor(e){this.manager=e!==void 0?e:Ix,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ea.DEFAULT_MATERIAL_NAME="__DEFAULT";const cr={};class Ox extends Error{constructor(e,t){super(e),this.response=t}}class c_ extends ea{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=kr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(cr[e]!==void 0){cr[e].push({onLoad:t,onProgress:n,onError:i});return}cr[e]=[],cr[e].push({onLoad:t,onProgress:n,onError:i});const s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(s).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=cr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){b();function b(){d.read().then(({done:S,value:v})=>{if(S)p.close();else{g+=v.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let C=0,E=u.length;C<E;C++){const P=u[C];P.onProgress&&P.onProgress(M)}p.enqueue(v),b()}},S=>{p.error(S)})}}});return new Response(m)}else throw new Ox(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{kr.add(e,c);const u=cr[e];delete cr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=cr[e];if(u===void 0)throw this.manager.itemError(e),c;delete cr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Nx extends ea{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,s=kr.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;const a=il("img");function l(){u(),kr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function c(d){u(),i&&i(d),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}}class Ux extends ea{constructor(e){super(e)}load(e,t,n,i){const o=new cn,s=new Nx(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}}class Jc extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ou=new dt,Np=new G,Up=new G;class nh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.mapType=Ji,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qf,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Np.setFromMatrixPosition(e.matrixWorld),t.position.copy(Np),Up.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Up),t.updateMatrixWorld(),Ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Fx extends nh{constructor(){super(new Yn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Bs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,o=e.distance||t.far;(n!==t.fov||i!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=i,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class kx extends Jc{constructor(e,t,n=0,i=Math.PI/3,o=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.distance=n,this.angle=i,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new Fx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fp=new dt,ua=new G,Nu=new G;class Bx extends nh{constructor(){super(new Yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new St(4,2),this._viewportCount=6,this._viewports=[new At(2,1,1,1),new At(0,1,1,1),new At(3,1,1,1),new At(1,1,1,1),new At(3,0,1,1),new At(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(ua),Nu.copy(n.position),Nu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Nu),n.updateMatrixWorld(),i.makeTranslation(-ua.x,-ua.y,-ua.z),Fp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fp)}}class zx extends Jc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Bx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qc extends e_{constructor(e=-1,t=1,n=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-e,s=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Hx extends nh{constructor(){super(new Qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u_ extends Jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new Hx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vx extends Jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Oa{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Uu=new WeakMap;class Gx extends ea{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,s=kr.get(e);if(s!==void 0){if(o.manager.itemStart(e),s.then){s.then(c=>{if(Uu.has(s)===!0)i&&i(Uu.get(s)),o.manager.itemError(e),o.manager.itemEnd(e);else return t&&t(c),o.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(c){return kr.add(e,c),t&&t(c),o.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Uu.set(l,c),kr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});kr.add(e,l),o.manager.itemStart(e)}}class Wx extends Yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ih="\\[\\]\\.:\\/",Xx=new RegExp("["+ih+"]","g"),rh="[^"+ih+"]",qx="[^"+ih.replace("\\.","")+"]",Yx=/((?:WC+[\/:])*)/.source.replace("WC",rh),jx=/(WCOD+)?/.source.replace("WCOD",qx),$x=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Kx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Zx=new RegExp("^"+Yx+jx+$x+Kx+"$"),Jx=["material","materials","bones","map"];class Qx{constructor(e,t,n){const i=n||Ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,o=n.length;i!==o;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ot{constructor(e,t,n){this.path=t,this.parsedPath=n||Ot.parseTrackName(t),this.node=Ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ot.Composite(e,t,n):new Ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Xx,"")}static parseTrackName(e){const t=Zx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const o=n.nodeName.substring(i+1);Jx.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let s=0;s<o.length;s++){const a=o[s];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let o=t.propertyIndex;if(e||(e=Ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const s=e[i];if(s===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ot.Composite=Qx;Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray];Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function kp(r,e,t,n){const i=eS(n);switch(t){case zg:return r*e;case Xf:return r*e/i.components*i.byteLength;case qf:return r*e/i.components*i.byteLength;case Vg:return r*e*2/i.components*i.byteLength;case Yf:return r*e*2/i.components*i.byteLength;case Hg:return r*e*3/i.components*i.byteLength;case yi:return r*e*4/i.components*i.byteLength;case jf:return r*e*4/i.components*i.byteLength;case fc:case hc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case pc:case mc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bd:case Ed:return Math.max(r,16)*Math.max(e,8)/4;case wd:case Md:return Math.max(r,8)*Math.max(e,8)/2;case Td:case Ad:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Cd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Id:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Od:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Hd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Vd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case gc:case Gd:case Wd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gg:case Xd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case qd:case Yd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eS(r){switch(r){case Ji:case Fg:return{byteLength:1,components:1};case Za:case kg:case ml:return{byteLength:2,components:1};case Gf:case Wf:return{byteLength:2,components:4};case Fo:case Vf:case Oi:return{byteLength:4,components:1};case Bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function d_(){let r=null,e=!1,t=null,n=null;function i(o,s){t(o,s),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function tS(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:o,update:s}}var nS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iS=`#ifdef USE_ALPHAHASH
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
#endif`,rS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lS=`#ifdef USE_AOMAP
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
#endif`,cS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uS=`#ifdef USE_BATCHING
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
#endif`,dS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mS=`#ifdef USE_IRIDESCENCE
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
#endif`,gS=`#ifdef USE_BUMPMAP
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
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,SS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ES=`#define PI 3.141592653589793
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
} // validated`,TS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,AS=`vec3 transformedNormal = objectNormal;
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
#endif`,CS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DS="gl_FragColor = linearToOutputTexel( gl_FragColor );",IS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,OS=`#ifdef USE_ENVMAP
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
#endif`,NS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,US=`#ifdef USE_ENVMAP
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
#endif`,FS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kS=`#ifdef USE_ENVMAP
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
#endif`,BS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GS=`#ifdef USE_GRADIENTMAP
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
}`,WS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YS=`uniform bool receiveShadow;
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
#endif`,jS=`#ifdef USE_ENVMAP
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
#endif`,$S=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ZS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,JS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,QS=`PhysicalMaterial material;
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
#endif`,ew=`struct PhysicalMaterial {
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
}`,tw=`
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
#endif`,nw=`#if defined( RE_IndirectDiffuse )
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
#endif`,iw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rw=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ow=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dw=`#if defined( USE_POINTS_UV )
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
#endif`,fw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_w=`#ifdef USE_MORPHTARGETS
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
#endif`,vw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ww=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mw=`#ifdef USE_NORMALMAP
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
#endif`,Ew=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Aw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Iw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ow=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zw=`float getShadowMask() {
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
}`,Hw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vw=`#ifdef USE_SKINNING
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
#endif`,Gw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ww=`#ifdef USE_SKINNING
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
#endif`,Xw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$w=`#ifdef USE_TRANSMISSION
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
#endif`,Kw=`#ifdef USE_TRANSMISSION
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
#endif`,Zw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nb=`uniform sampler2D t2D;
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
}`,ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ob=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ab=`#include <common>
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
}`,lb=`#if DEPTH_PACKING == 3200
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
}`,cb=`#define DISTANCE
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
}`,ub=`#define DISTANCE
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
}`,db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hb=`uniform float scale;
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
}`,pb=`uniform vec3 diffuse;
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
}`,mb=`#include <common>
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
}`,gb=`uniform vec3 diffuse;
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
}`,_b=`#define LAMBERT
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
}`,vb=`#define LAMBERT
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
}`,yb=`#define MATCAP
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
}`,xb=`#define MATCAP
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
}`,Sb=`#define NORMAL
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
}`,wb=`#define NORMAL
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
}`,bb=`#define PHONG
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
}`,Mb=`#define PHONG
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
}`,Eb=`#define STANDARD
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
}`,Tb=`#define STANDARD
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
}`,Ab=`#define TOON
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
}`,Cb=`#define TOON
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
}`,Rb=`uniform float size;
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
}`,Pb=`uniform vec3 diffuse;
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
}`,Lb=`#include <common>
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
}`,Db=`uniform vec3 color;
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
}`,Ib=`uniform float rotation;
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
}`,Ob=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:nS,alphahash_pars_fragment:iS,alphamap_fragment:rS,alphamap_pars_fragment:oS,alphatest_fragment:sS,alphatest_pars_fragment:aS,aomap_fragment:lS,aomap_pars_fragment:cS,batching_pars_vertex:uS,batching_vertex:dS,begin_vertex:fS,beginnormal_vertex:hS,bsdfs:pS,iridescence_fragment:mS,bumpmap_pars_fragment:gS,clipping_planes_fragment:_S,clipping_planes_pars_fragment:vS,clipping_planes_pars_vertex:yS,clipping_planes_vertex:xS,color_fragment:SS,color_pars_fragment:wS,color_pars_vertex:bS,color_vertex:MS,common:ES,cube_uv_reflection_fragment:TS,defaultnormal_vertex:AS,displacementmap_pars_vertex:CS,displacementmap_vertex:RS,emissivemap_fragment:PS,emissivemap_pars_fragment:LS,colorspace_fragment:DS,colorspace_pars_fragment:IS,envmap_fragment:OS,envmap_common_pars_fragment:NS,envmap_pars_fragment:US,envmap_pars_vertex:FS,envmap_physical_pars_fragment:jS,envmap_vertex:kS,fog_vertex:BS,fog_pars_vertex:zS,fog_fragment:HS,fog_pars_fragment:VS,gradientmap_pars_fragment:GS,lightmap_pars_fragment:WS,lights_lambert_fragment:XS,lights_lambert_pars_fragment:qS,lights_pars_begin:YS,lights_toon_fragment:$S,lights_toon_pars_fragment:KS,lights_phong_fragment:ZS,lights_phong_pars_fragment:JS,lights_physical_fragment:QS,lights_physical_pars_fragment:ew,lights_fragment_begin:tw,lights_fragment_maps:nw,lights_fragment_end:iw,logdepthbuf_fragment:rw,logdepthbuf_pars_fragment:ow,logdepthbuf_pars_vertex:sw,logdepthbuf_vertex:aw,map_fragment:lw,map_pars_fragment:cw,map_particle_fragment:uw,map_particle_pars_fragment:dw,metalnessmap_fragment:fw,metalnessmap_pars_fragment:hw,morphinstance_vertex:pw,morphcolor_vertex:mw,morphnormal_vertex:gw,morphtarget_pars_vertex:_w,morphtarget_vertex:vw,normal_fragment_begin:yw,normal_fragment_maps:xw,normal_pars_fragment:Sw,normal_pars_vertex:ww,normal_vertex:bw,normalmap_pars_fragment:Mw,clearcoat_normal_fragment_begin:Ew,clearcoat_normal_fragment_maps:Tw,clearcoat_pars_fragment:Aw,iridescence_pars_fragment:Cw,opaque_fragment:Rw,packing:Pw,premultiplied_alpha_fragment:Lw,project_vertex:Dw,dithering_fragment:Iw,dithering_pars_fragment:Ow,roughnessmap_fragment:Nw,roughnessmap_pars_fragment:Uw,shadowmap_pars_fragment:Fw,shadowmap_pars_vertex:kw,shadowmap_vertex:Bw,shadowmask_pars_fragment:zw,skinbase_vertex:Hw,skinning_pars_vertex:Vw,skinning_vertex:Gw,skinnormal_vertex:Ww,specularmap_fragment:Xw,specularmap_pars_fragment:qw,tonemapping_fragment:Yw,tonemapping_pars_fragment:jw,transmission_fragment:$w,transmission_pars_fragment:Kw,uv_pars_fragment:Zw,uv_pars_vertex:Jw,uv_vertex:Qw,worldpos_vertex:eb,background_vert:tb,background_frag:nb,backgroundCube_vert:ib,backgroundCube_frag:rb,cube_vert:ob,cube_frag:sb,depth_vert:ab,depth_frag:lb,distanceRGBA_vert:cb,distanceRGBA_frag:ub,equirect_vert:db,equirect_frag:fb,linedashed_vert:hb,linedashed_frag:pb,meshbasic_vert:mb,meshbasic_frag:gb,meshlambert_vert:_b,meshlambert_frag:vb,meshmatcap_vert:yb,meshmatcap_frag:xb,meshnormal_vert:Sb,meshnormal_frag:wb,meshphong_vert:bb,meshphong_frag:Mb,meshphysical_vert:Eb,meshphysical_frag:Tb,meshtoon_vert:Ab,meshtoon_frag:Cb,points_vert:Rb,points_frag:Pb,shadow_vert:Lb,shadow_frag:Db,sprite_vert:Ib,sprite_frag:Ob},De={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Wi={basic:{uniforms:Fn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Fn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ke(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Fn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Fn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Fn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Ke(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Fn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Fn([De.points,De.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Fn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Fn([De.common,De.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Fn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Fn([De.sprite,De.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Fn([De.common,De.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Fn([De.lights,De.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Wi.physical={uniforms:Fn([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Wl={r:0,b:0,g:0},uo=new Qi,Nb=new dt;function Ub(r,e,t,n,i,o,s){const a=new Ke(0);let l=o===!0?0:1,c,u,d=null,f=0,h=null;function _(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function g(S){let v=!1;const M=_(S);M===null?p(a,l):M&&M.isColor&&(p(M,1),v=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,v){const M=_(v);M&&(M.isCubeTexture||M.mapping===Kc)?(u===void 0&&(u=new Gn(new gl(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:zs(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),uo.copy(v.backgroundRotation),uo.x*=-1,uo.y*=-1,uo.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(uo.y*=-1,uo.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Nb.makeRotationFromEuler(uo)),u.material.toneMapped=Mt.getTransfer(M.colorSpace)!==Ft,(d!==M||f!==M.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Gn(new Ri(2,2),new xi({name:"BackgroundMaterial",uniforms:zs(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(M.colorSpace)!==Ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,v){S.getRGB(Wl,Qg(r)),n.buffers.color.setClear(Wl.r,Wl.g,Wl.b,v,s)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:g,addToRenderList:m,dispose:b}}function Fb(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let o=i,s=!1;function a(y,L,D,z,O){let T=!1;const W=d(z,D,L);o!==W&&(o=W,c(o.object)),T=h(y,z,D,O),T&&_(y,z,D,O),O!==null&&e.update(O,r.ELEMENT_ARRAY_BUFFER),(T||s)&&(s=!1,v(y,L,D,z),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,L,D){const z=D.wireframe===!0;let O=n[y.id];O===void 0&&(O={},n[y.id]=O);let T=O[L.id];T===void 0&&(T={},O[L.id]=T);let W=T[z];return W===void 0&&(W=f(l()),T[z]=W),W}function f(y){const L=[],D=[],z=[];for(let O=0;O<t;O++)L[O]=0,D[O]=0,z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:z,object:y,attributes:{},index:null}}function h(y,L,D,z){const O=o.attributes,T=L.attributes;let W=0;const J=D.getAttributes();for(const q in J)if(J[q].location>=0){const N=O[q];let j=T[q];if(j===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(j=y.instanceColor)),N===void 0||N.attribute!==j||j&&N.data!==j.data)return!0;W++}return o.attributesNum!==W||o.index!==z}function _(y,L,D,z){const O={},T=L.attributes;let W=0;const J=D.getAttributes();for(const q in J)if(J[q].location>=0){let N=T[q];N===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(N=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(N=y.instanceColor));const j={};j.attribute=N,N&&N.data&&(j.data=N.data),O[q]=j,W++}o.attributes=O,o.attributesNum=W,o.index=z}function g(){const y=o.newAttributes;for(let L=0,D=y.length;L<D;L++)y[L]=0}function m(y){p(y,0)}function p(y,L){const D=o.newAttributes,z=o.enabledAttributes,O=o.attributeDivisors;D[y]=1,z[y]===0&&(r.enableVertexAttribArray(y),z[y]=1),O[y]!==L&&(r.vertexAttribDivisor(y,L),O[y]=L)}function b(){const y=o.newAttributes,L=o.enabledAttributes;for(let D=0,z=L.length;D<z;D++)L[D]!==y[D]&&(r.disableVertexAttribArray(D),L[D]=0)}function S(y,L,D,z,O,T,W){W===!0?r.vertexAttribIPointer(y,L,D,O,T):r.vertexAttribPointer(y,L,D,z,O,T)}function v(y,L,D,z){g();const O=z.attributes,T=D.getAttributes(),W=L.defaultAttributeValues;for(const J in T){const q=T[J];if(q.location>=0){let pe=O[J];if(pe===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),pe!==void 0){const N=pe.normalized,j=pe.itemSize,We=e.get(pe);if(We===void 0)continue;const Je=We.buffer,ne=We.type,ce=We.bytesPerElement,Pe=ne===r.INT||ne===r.UNSIGNED_INT||pe.gpuType===Vf;if(pe.isInterleavedBufferAttribute){const _e=pe.data,Ae=_e.stride,Ze=pe.offset;if(_e.isInstancedInterleavedBuffer){for(let we=0;we<q.locationSize;we++)p(q.location+we,_e.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let we=0;we<q.locationSize;we++)m(q.location+we);r.bindBuffer(r.ARRAY_BUFFER,Je);for(let we=0;we<q.locationSize;we++)S(q.location+we,j/q.locationSize,ne,N,Ae*ce,(Ze+j/q.locationSize*we)*ce,Pe)}else{if(pe.isInstancedBufferAttribute){for(let _e=0;_e<q.locationSize;_e++)p(q.location+_e,pe.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let _e=0;_e<q.locationSize;_e++)m(q.location+_e);r.bindBuffer(r.ARRAY_BUFFER,Je);for(let _e=0;_e<q.locationSize;_e++)S(q.location+_e,j/q.locationSize,ne,N,j*ce,j/q.locationSize*_e*ce,Pe)}}else if(W!==void 0){const N=W[J];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(q.location,N);break;case 3:r.vertexAttrib3fv(q.location,N);break;case 4:r.vertexAttrib4fv(q.location,N);break;default:r.vertexAttrib1fv(q.location,N)}}}}b()}function M(){P();for(const y in n){const L=n[y];for(const D in L){const z=L[D];for(const O in z)u(z[O].object),delete z[O];delete L[D]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const D in L){const z=L[D];for(const O in z)u(z[O].object),delete z[O];delete L[D]}delete n[y.id]}function E(y){for(const L in n){const D=n[L];if(D[y.id]===void 0)continue;const z=D[y.id];for(const O in z)u(z[O].object),delete z[O];delete D[y.id]}}function P(){w(),s=!0,o!==i&&(o=i,c(o.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function kb(r,e,t){let n;function i(c){n=c}function o(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function s(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)s(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Bb(r,e,t,n){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(E){return!(E!==yi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===ml&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Ji&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Oi&&!P)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:M,maxSamples:C}}function zb(r){const e=this;let t=null,n=0,i=!1,o=!1;const s=new _o,a=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||o&&!m)o?u(null):c();else{const b=o?0:n,S=b*4;let v=p.clippingState||null;l.value=v,v=u(_,f,S,h);for(let M=0;M!==S;++M)v[M]=t[M];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=h;S!==g;++S,v+=4)s.copy(d[S]).applyMatrix4(b,a),s.normal.toArray(m,v),m[v+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Hb(r){let e=new WeakMap;function t(s,a){return a===xd?s.mapping=Us:a===Sd&&(s.mapping=Fs),s}function n(s){if(s&&s.isTexture){const a=s.mapping;if(a===xd||a===Sd)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new cx(l.height);return c.fromEquirectangularTexture(r,s),e.set(s,c),s.addEventListener("dispose",i),t(c.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const vs=4,Bp=[.125,.215,.35,.446,.526,.582],bo=20,Fu=new Qc,zp=new Ke;let ku=null,Bu=0,zu=0,Hu=!1;const vo=(1+Math.sqrt(5))/2,as=1/vo,Hp=[new G(-vo,as,0),new G(vo,as,0),new G(-as,0,vo),new G(as,0,vo),new G(0,vo,-as),new G(0,vo,as),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],Vb=new G;class Vp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,o={}){const{size:s=256,position:a=Vb}=o;ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Bu,zu),this._renderer.xr.enabled=Hu,e.scissorTest=!1,Xl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Us||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:li,minFilter:li,generateMipmaps:!1,type:ml,format:yi,colorSpace:Xn,depthBuffer:!1},i=Gp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gp(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gb(o)),this._blurMaterial=Wb(o,e,t)}return i}_compileMaterial(e){const t=new Gn(this._lodPlanes[0],e);this._renderer.compile(t,Fu)}_sceneToCubeUV(e,t,n,i,o){const l=new Yn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(zp),d.toneMapping=Yr,d.autoClear=!1;const _=new Mo({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1}),g=new Gn(new gl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(zp),m=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(l.up.set(0,c[b],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+u[b],o.y,o.z)):S===1?(l.up.set(0,0,c[b]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+u[b],o.z)):(l.up.set(0,c[b],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+u[b]));const v=this._cubeSize;Xl(i,S*v,b>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Us||e.mapping===Fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());const o=i?this._cubemapMaterial:this._equirectMaterial,s=new Gn(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const l=this._cubeSize;Xl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,Fu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Hp[(i-o-1)%Hp.length];this._blur(e,o-1,o,s,a)}t.autoClear=n}_blur(e,t,n,i,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",o),this._halfBlur(s,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Gn(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*bo-1),g=o/_,m=isFinite(o)?1+Math.floor(u*g):bo;m>bo&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bo}`);const p=[];let b=0;for(let E=0;E<bo;++E){const P=E/g,w=Math.exp(-P*P/2);p.push(w),E===0?b+=w:E<m&&(b+=2*w)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-n;const v=this._sizeLods[i],M=3*v*(i>S-vs?i-S+vs:0),C=4*(this._cubeSize-v);Xl(t,M,C,3*v,2*v),l.setRenderTarget(t),l.render(d,Fu)}}function Gb(r){const e=[],t=[],n=[];let i=r;const o=r-vs+1+Bp.length;for(let s=0;s<o;s++){const a=Math.pow(2,i);t.push(a);let l=1/a;s>r-vs?l=Bp[s-r+vs-1]:s===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*h),S=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let C=0;C<h;C++){const E=C%3*2/3-1,P=C>2?0:-1,w=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];b.set(w,g*_*C),S.set(f,m*_*C);const y=[C,C,C,C,C,C];v.set(y,p*_*C)}const M=new Mi;M.setAttribute("position",new It(b,g)),M.setAttribute("uv",new It(S,m)),M.setAttribute("faceIndex",new It(v,p)),e.push(M),i>vs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gp(r,e,t){const n=new ko(r,e,t);return n.texture.mapping=Kc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Wb(r,e,t){const n=new Float32Array(bo),i=new G(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:bo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:oh(),fragmentShader:`

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
	`}function Xb(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===xd||l===Sd,u=l===Us||l===Fs;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function qb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ms("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Yb(r,e,t,n){const i={},o=new WeakMap;function s(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",s),delete i[f.id];const h=o.get(f);h&&(e.remove(h),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",s),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const b=h.array;g=h.version;for(let S=0,v=b.length;S<v;S+=3){const M=b[S+0],C=b[S+1],E=b[S+2];f.push(M,C,C,E,E,M)}}else if(_!==void 0){const b=_.array;g=_.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const M=S+0,C=S+1,E=S+2;f.push(M,C,C,E,E,M)}}else return;const m=new(Yg(f)?Jg:Zg)(f,1);m.version=g;const p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){const f=o.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function jb(r,e,t){let n;function i(f){n=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function l(f,h){r.drawElements(n,h,o,f*s),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,o,f*s,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,o,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/s,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,o,f,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*g[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function $b(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=a*(o/3);break;case r.LINES:t.lines+=a*(o/2);break;case r.LINE_STRIP:t.lines+=a*(o-1);break;case r.LINE_LOOP:t.lines+=a*o;break;case r.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Kb(r,e,t){const n=new WeakMap,i=new At;function o(s,a,l){const c=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let M=a.attributes.position.count*v,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const E=new Float32Array(M*C*4*d),P=new jg(E,M,C,d);P.type=Oi,P.needsUpdate=!0;const w=v*4;for(let L=0;L<d;L++){const D=p[L],z=b[L],O=S[L],T=M*C*4*L;for(let W=0;W<D.count;W++){const J=W*w;_===!0&&(i.fromBufferAttribute(D,W),E[T+J+0]=i.x,E[T+J+1]=i.y,E[T+J+2]=i.z,E[T+J+3]=0),g===!0&&(i.fromBufferAttribute(z,W),E[T+J+4]=i.x,E[T+J+5]=i.y,E[T+J+6]=i.z,E[T+J+7]=0),m===!0&&(i.fromBufferAttribute(O,W),E[T+J+8]=i.x,E[T+J+9]=i.y,E[T+J+10]=i.z,E[T+J+11]=O.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new St(M,C)},n.set(a,f),a.addEventListener("dispose",y)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:o}}function Zb(r,e,t,n){let i=new WeakMap;function o(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function s(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:s}}const f_=new cn,qp=new s_(1,1),h_=new jg,p_=new qy,m_=new t_,Yp=[],jp=[],$p=new Float32Array(16),Kp=new Float32Array(9),Zp=new Float32Array(4);function ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let o=Yp[i];if(o===void 0&&(o=new Float32Array(i),Yp[i]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,r[s].toArray(o,a)}return o}function un(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function dn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eu(r,e){let t=jp[e];t===void 0&&(t=new Int32Array(e),jp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Jb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Qb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;r.uniform2fv(this.addr,e),dn(t,e)}}function eM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(un(t,e))return;r.uniform3fv(this.addr,e),dn(t,e)}}function tM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;r.uniform4fv(this.addr,e),dn(t,e)}}function nM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(un(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),dn(t,e)}else{if(un(t,n))return;Zp.set(n),r.uniformMatrix2fv(this.addr,!1,Zp),dn(t,n)}}function iM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(un(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),dn(t,e)}else{if(un(t,n))return;Kp.set(n),r.uniformMatrix3fv(this.addr,!1,Kp),dn(t,n)}}function rM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(un(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),dn(t,e)}else{if(un(t,n))return;$p.set(n),r.uniformMatrix4fv(this.addr,!1,$p),dn(t,n)}}function oM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function sM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;r.uniform2iv(this.addr,e),dn(t,e)}}function aM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;r.uniform3iv(this.addr,e),dn(t,e)}}function lM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;r.uniform4iv(this.addr,e),dn(t,e)}}function cM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function uM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;r.uniform2uiv(this.addr,e),dn(t,e)}}function dM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;r.uniform3uiv(this.addr,e),dn(t,e)}}function fM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;r.uniform4uiv(this.addr,e),dn(t,e)}}function hM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let o;this.type===r.SAMPLER_2D_SHADOW?(qp.compareFunction=qg,o=qp):o=f_,t.setTexture2D(e||o,i)}function pM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||p_,i)}function mM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||m_,i)}function gM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||h_,i)}function _M(r){switch(r){case 5126:return Jb;case 35664:return Qb;case 35665:return eM;case 35666:return tM;case 35674:return nM;case 35675:return iM;case 35676:return rM;case 5124:case 35670:return oM;case 35667:case 35671:return sM;case 35668:case 35672:return aM;case 35669:case 35673:return lM;case 5125:return cM;case 36294:return uM;case 36295:return dM;case 36296:return fM;case 35678:case 36198:case 36298:case 36306:case 35682:return hM;case 35679:case 36299:case 36307:return pM;case 35680:case 36300:case 36308:case 36293:return mM;case 36289:case 36303:case 36311:case 36292:return gM}}function vM(r,e){r.uniform1fv(this.addr,e)}function yM(r,e){const t=ta(e,this.size,2);r.uniform2fv(this.addr,t)}function xM(r,e){const t=ta(e,this.size,3);r.uniform3fv(this.addr,t)}function SM(r,e){const t=ta(e,this.size,4);r.uniform4fv(this.addr,t)}function wM(r,e){const t=ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function bM(r,e){const t=ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function MM(r,e){const t=ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function EM(r,e){r.uniform1iv(this.addr,e)}function TM(r,e){r.uniform2iv(this.addr,e)}function AM(r,e){r.uniform3iv(this.addr,e)}function CM(r,e){r.uniform4iv(this.addr,e)}function RM(r,e){r.uniform1uiv(this.addr,e)}function PM(r,e){r.uniform2uiv(this.addr,e)}function LM(r,e){r.uniform3uiv(this.addr,e)}function DM(r,e){r.uniform4uiv(this.addr,e)}function IM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);un(n,o)||(r.uniform1iv(this.addr,o),dn(n,o));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||f_,o[s])}function OM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);un(n,o)||(r.uniform1iv(this.addr,o),dn(n,o));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||p_,o[s])}function NM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);un(n,o)||(r.uniform1iv(this.addr,o),dn(n,o));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||m_,o[s])}function UM(r,e,t){const n=this.cache,i=e.length,o=eu(t,i);un(n,o)||(r.uniform1iv(this.addr,o),dn(n,o));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||h_,o[s])}function FM(r){switch(r){case 5126:return vM;case 35664:return yM;case 35665:return xM;case 35666:return SM;case 35674:return wM;case 35675:return bM;case 35676:return MM;case 5124:case 35670:return EM;case 35667:case 35671:return TM;case 35668:case 35672:return AM;case 35669:case 35673:return CM;case 5125:return RM;case 36294:return PM;case 36295:return LM;case 36296:return DM;case 35678:case 36198:case 36298:case 36306:case 35682:return IM;case 35679:case 36299:case 36307:return OM;case 35680:case 36300:case 36308:case 36293:return NM;case 36289:case 36303:case 36311:case 36292:return UM}}class kM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_M(t.type)}}class BM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=FM(t.type)}}class zM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let o=0,s=i.length;o!==s;++o){const a=i[o];a.setValue(e,t[a.id],n)}}}const Vu=/(\w+)(\])?(\[|\.)?/g;function Jp(r,e){r.seq.push(e),r.map[e.id]=e}function HM(r,e,t){const n=r.name,i=n.length;for(Vu.lastIndex=0;;){const o=Vu.exec(n),s=Vu.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===i){Jp(t,c===void 0?new kM(a,r,e):new BM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new zM(a),Jp(t,d)),t=d}}}class _c{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=e.getActiveUniform(t,i),s=e.getUniformLocation(t,o.name);HM(o,s,this)}}setValue(e,t,n,i){const o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,s=t.length;o!==s;++o){const a=t[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,o=e.length;i!==o;++i){const s=e[i];s.id in t&&n.push(s)}return n}}function Qp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const VM=37297;let GM=0;function WM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=i;s<o;s++){const a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}const em=new ut;function XM(r){Mt._getMatrix(em,Mt.workingColorSpace,r);const e=`mat3( ${em.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(r)){case Rc:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function tm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+i+`

`+WM(r.getShaderSource(e),s)}else return i}function qM(r,e){const t=XM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function YM(r,e){let t;switch(e){case ey:t="Linear";break;case ty:t="Reinhard";break;case ny:t="Cineon";break;case iy:t="ACESFilmic";break;case oy:t="AgX";break;case sy:t="Neutral";break;case ry:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ql=new G;function jM(){Mt.getLuminanceCoefficients(ql);const r=ql.x.toFixed(4),e=ql.y.toFixed(4),t=ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $M(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function KM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ZM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=r.getActiveAttrib(e,i),s=o.name;let a=1;o.type===r.FLOAT_MAT2&&(a=2),o.type===r.FLOAT_MAT3&&(a=3),o.type===r.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:a}}return t}function xa(r){return r!==""}function nm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function im(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const JM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace(JM,eE)}const QM=new Map;function eE(r,e){let t=ht[e];if(t===void 0){const n=QM.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qd(t)}const tE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rm(r){return r.replace(tE,nE)}function nE(r,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function om(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function iE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ig?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Iv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ur&&(e="SHADOWMAP_TYPE_VSM"),e}function rE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Us:case Fs:e="ENVMAP_TYPE_CUBE";break;case Kc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function oE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function sE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Og:e="ENVMAP_BLENDING_MULTIPLY";break;case Jv:e="ENVMAP_BLENDING_MIX";break;case Qv:e="ENVMAP_BLENDING_ADD";break}return e}function aE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function lE(r,e,t,n){const i=r.getContext(),o=t.defines;let s=t.vertexShader,a=t.fragmentShader;const l=iE(t),c=rE(t),u=oE(t),d=sE(t),f=aE(t),h=$M(t),_=KM(o),g=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yr?"#define TONE_MAPPING":"",t.toneMapping!==Yr?ht.tonemapping_pars_fragment:"",t.toneMapping!==Yr?YM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,qM("linearToOutputTexel",t.outputColorSpace),jM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),s=Qd(s),s=nm(s,t),s=im(s,t),a=Qd(a),a=nm(a,t),a=im(a,t),s=rm(s),a=rm(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ep?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ep?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+s,v=b+p+a,M=Qp(i,i.VERTEX_SHADER,S),C=Qp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,M),i.attachShader(g,C),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(L){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(g).trim(),z=i.getShaderInfoLog(M).trim(),O=i.getShaderInfoLog(C).trim();let T=!0,W=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(T=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,M,C);else{const J=tm(i,M,"vertex"),q=tm(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+J+`
`+q)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(z===""||O==="")&&(W=!1);W&&(L.diagnostics={runnable:T,programLog:D,vertexShader:{log:z,prefix:m},fragmentShader:{log:O,prefix:p}})}i.deleteShader(M),i.deleteShader(C),P=new _c(i,g),w=ZM(i,g)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(g,VM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=GM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=C,this}let cE=0;class uE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new dE(e),t.set(e,n)),n}}class dE{constructor(e){this.id=cE++,this.code=e,this.usedTimes=0}}function fE(r,e,t,n,i,o,s){const a=new $g,l=new uE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,L,D,z){const O=D.fog,T=z.geometry,W=w.isMeshStandardMaterial?D.environment:null,J=(w.isMeshStandardMaterial?t:e).get(w.envMap||W),q=J&&J.mapping===Kc?J.image.height:null,pe=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const N=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,j=N!==void 0?N.length:0;let We=0;T.morphAttributes.position!==void 0&&(We=1),T.morphAttributes.normal!==void 0&&(We=2),T.morphAttributes.color!==void 0&&(We=3);let Je,ne,ce,Pe;if(pe){const Le=Wi[pe];Je=Le.vertexShader,ne=Le.fragmentShader}else Je=w.vertexShader,ne=w.fragmentShader,l.update(w),ce=l.getVertexShaderID(w),Pe=l.getFragmentShaderID(w);const _e=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),Ze=z.isInstancedMesh===!0,we=z.isBatchedMesh===!0,st=!!w.map,at=!!w.matcap,Ne=!!J,F=!!w.aoMap,rt=!!w.lightMap,et=!!w.bumpMap,K=!!w.normalMap,Ie=!!w.displacementMap,nt=!!w.emissiveMap,ke=!!w.metalnessMap,Oe=!!w.roughnessMap,Et=w.anisotropy>0,I=w.clearcoat>0,A=w.dispersion>0,X=w.iridescence>0,ie=w.sheen>0,re=w.transmission>0,ee=Et&&!!w.anisotropyMap,xe=I&&!!w.clearcoatMap,ye=I&&!!w.clearcoatNormalMap,Be=I&&!!w.clearcoatRoughnessMap,oe=X&&!!w.iridescenceMap,le=X&&!!w.iridescenceThicknessMap,be=ie&&!!w.sheenColorMap,Ee=ie&&!!w.sheenRoughnessMap,Xe=!!w.specularMap,Se=!!w.specularColorMap,Me=!!w.specularIntensityMap,U=re&&!!w.transmissionMap,me=re&&!!w.thicknessMap,ue=!!w.gradientMap,Ce=!!w.alphaMap,fe=w.alphaTest>0,ae=!!w.alphaHash,Ue=!!w.extensions;let ze=Yr;w.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(ze=r.toneMapping);const wt={shaderID:pe,shaderType:w.type,shaderName:w.name,vertexShader:Je,fragmentShader:ne,defines:w.defines,customVertexShaderID:ce,customFragmentShaderID:Pe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:we,batchingColor:we&&z._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&z.instanceColor!==null,instancingMorph:Ze&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:_e===null?r.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Xn,alphaToCoverage:!!w.alphaToCoverage,map:st,matcap:at,envMap:Ne,envMapMode:Ne&&J.mapping,envMapCubeUVHeight:q,aoMap:F,lightMap:rt,bumpMap:et,normalMap:K,displacementMap:f&&Ie,emissiveMap:nt,normalMapObjectSpace:K&&w.normalMapType===fy,normalMapTangentSpace:K&&w.normalMapType===Xg,metalnessMap:ke,roughnessMap:Oe,anisotropy:Et,anisotropyMap:ee,clearcoat:I,clearcoatMap:xe,clearcoatNormalMap:ye,clearcoatRoughnessMap:Be,dispersion:A,iridescence:X,iridescenceMap:oe,iridescenceThicknessMap:le,sheen:ie,sheenColorMap:be,sheenRoughnessMap:Ee,specularMap:Xe,specularColorMap:Se,specularIntensityMap:Me,transmission:re,transmissionMap:U,thicknessMap:me,gradientMap:ue,opaque:w.transparent===!1&&w.blending===qr&&w.alphaToCoverage===!1,alphaMap:Ce,alphaTest:fe,alphaHash:ae,combine:w.combine,mapUv:st&&g(w.map.channel),aoMapUv:F&&g(w.aoMap.channel),lightMapUv:rt&&g(w.lightMap.channel),bumpMapUv:et&&g(w.bumpMap.channel),normalMapUv:K&&g(w.normalMap.channel),displacementMapUv:Ie&&g(w.displacementMap.channel),emissiveMapUv:nt&&g(w.emissiveMap.channel),metalnessMapUv:ke&&g(w.metalnessMap.channel),roughnessMapUv:Oe&&g(w.roughnessMap.channel),anisotropyMapUv:ee&&g(w.anisotropyMap.channel),clearcoatMapUv:xe&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:ye&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(w.sheenRoughnessMap.channel),specularMapUv:Xe&&g(w.specularMap.channel),specularColorMapUv:Se&&g(w.specularColorMap.channel),specularIntensityMapUv:Me&&g(w.specularIntensityMap.channel),transmissionMapUv:U&&g(w.transmissionMap.channel),thicknessMapUv:me&&g(w.thicknessMap.channel),alphaMapUv:Ce&&g(w.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(K||Et),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!T.attributes.uv&&(st||Ce),fog:!!O,useFog:w.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ae,skinning:z.isSkinnedMesh===!0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:We,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:ze,decodeVideoTexture:st&&w.map.isVideoTexture===!0&&Mt.getTransfer(w.map.colorSpace)===Ft,decodeVideoTextureEmissive:nt&&w.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(w.emissiveMap.colorSpace)===Ft,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===vi,flipSided:w.side===jn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ue&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&w.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)y.push(L),y.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(b(y,w),S(y,w),y.push(r.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function S(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=_[w.type];let L;if(y){const D=Wi[y];L=ox.clone(D.uniforms)}else L=w.uniforms;return L}function M(w,y){let L;for(let D=0,z=u.length;D<z;D++){const O=u[D];if(O.cacheKey===y){L=O,++L.usedTimes;break}}return L===void 0&&(L=new lE(r,y,w,o),u.push(L)),L}function C(w){if(--w.usedTimes===0){const y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function E(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:M,releaseProgram:C,releaseShaderCache:E,programs:u,dispose:P}}function hE(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function n(s){r.delete(s)}function i(s,a,l){r.get(s)[a]=l}function o(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:o}}function pE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function sm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function am(){const r=[];let e=0;const t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function s(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=s(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=s(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||pE),n.length>1&&n.sort(f||sm),i.length>1&&i.sort(f||sm)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:a,unshift:l,finish:u,sort:c}}function mE(){let r=new WeakMap;function e(n,i){const o=r.get(n);let s;return o===void 0?(s=new am,r.set(n,[s])):i>=o.length?(s=new am,o.push(s)):s=o[i],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function gE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Ke};break;case"SpotLight":t={position:new G,direction:new G,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function _E(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let vE=0;function yE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function xE(r){const e=new gE,t=_E(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const i=new G,o=new dt,s=new dt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,b=0,S=0,v=0,M=0,C=0,E=0;c.sort(yE);for(let w=0,y=c.length;w<y;w++){const L=c[w],D=L.color,z=L.intensity,O=L.distance,T=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=D.r*z,d+=D.g*z,f+=D.b*z;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],z);E++}else if(L.isDirectionalLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const J=L.shadow,q=t.get(L);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.directionalShadow[h]=q,n.directionalShadowMap[h]=T,n.directionalShadowMatrix[h]=L.shadow.matrix,b++}n.directional[h]=W,h++}else if(L.isSpotLight){const W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(D).multiplyScalar(z),W.distance=O,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[g]=W;const J=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,J.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[g]=J.matrix,L.castShadow){const q=t.get(L);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.spotShadow[g]=q,n.spotShadowMap[g]=T,v++}g++}else if(L.isRectAreaLight){const W=e.get(L);W.color.copy(D).multiplyScalar(z),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=W,m++}else if(L.isPointLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const J=L.shadow,q=t.get(L);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,q.shadowCameraNear=J.camera.near,q.shadowCameraFar=J.camera.far,n.pointShadow[_]=q,n.pointShadowMap[_]=T,n.pointShadowMatrix[_]=L.shadow.matrix,S++}n.point[_]=W,_++}else if(L.isHemisphereLight){const W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(z),W.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==v||P.numSpotMaps!==M||P.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=v,P.numSpotMaps=M,P.numLightProbes=E,n.version=vE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(S.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),s.identity(),o.copy(S.matrixWorld),o.premultiply(m),s.extractRotation(o),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),_++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function lm(r){const e=new xE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function o(u){t.push(u)}function s(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function SE(r){let e=new WeakMap;function t(i,o=0){const s=e.get(i);let a;return s===void 0?(a=new lm(r),e.set(i,[a])):o>=s.length?(a=new lm(r),s.push(a)):a=s[o],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const wE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bE=`uniform sampler2D shadow_pass;
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
}`;function ME(r,e,t){let n=new Qf;const i=new St,o=new St,s=new At,a=new Sx({depthPacking:dy}),l=new wx,c={},u=t.maxTextureSize,d={[br]:jn,[jn]:br,[vi]:vi},f=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:wE,fragmentShader:bE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Mi;_.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Gn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ig;let p=this.type;this.render=function(C,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const w=r.getRenderTarget(),y=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),D=r.state;D.setBlending(Xr),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const z=p!==ur&&this.type===ur,O=p===ur&&this.type!==ur;for(let T=0,W=C.length;T<W;T++){const J=C[T],q=J.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const pe=q.getFrameExtents();if(i.multiply(pe),o.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(o.x=Math.floor(u/pe.x),i.x=o.x*pe.x,q.mapSize.x=o.x),i.y>u&&(o.y=Math.floor(u/pe.y),i.y=o.y*pe.y,q.mapSize.y=o.y)),q.map===null||z===!0||O===!0){const j=this.type!==ur?{minFilter:Wn,magFilter:Wn}:{};q.map!==null&&q.map.dispose(),q.map=new ko(i.x,i.y,j),q.map.texture.name=J.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const N=q.getViewportCount();for(let j=0;j<N;j++){const We=q.getViewport(j);s.set(o.x*We.x,o.y*We.y,o.x*We.z,o.y*We.w),D.viewport(s),q.updateMatrices(J,j),n=q.getFrustum(),v(E,P,q.camera,J,this.type)}q.isPointLightShadow!==!0&&this.type===ur&&b(q,P),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,y,L)};function b(C,E){const P=e.update(g);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ko(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(E,null,P,f,g,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(E,null,P,h,g,null)}function S(C,E,P,w){let y=null;const L=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)y=L;else if(y=P.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const D=y.uuid,z=E.uuid;let O=c[D];O===void 0&&(O={},c[D]=O);let T=O[z];T===void 0&&(T=y.clone(),O[z]=T,E.addEventListener("dispose",M)),y=T}if(y.visible=E.visible,y.wireframe=E.wireframe,w===ur?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=r.properties.get(y);D.light=P}return y}function v(C,E,P,w,y){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===ur)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const z=e.update(C),O=C.material;if(Array.isArray(O)){const T=z.groups;for(let W=0,J=T.length;W<J;W++){const q=T[W],pe=O[q.materialIndex];if(pe&&pe.visible){const N=S(C,pe,w,y);C.onBeforeShadow(r,C,E,P,z,N,q),r.renderBufferDirect(P,null,z,N,C,q),C.onAfterShadow(r,C,E,P,z,N,q)}}}else if(O.visible){const T=S(C,O,w,y);C.onBeforeShadow(r,C,E,P,z,T,null),r.renderBufferDirect(P,null,z,T,C,null),C.onAfterShadow(r,C,E,P,z,T,null)}}const D=C.children;for(let z=0,O=D.length;z<O;z++)v(D[z],E,P,w,y)}function M(C){C.target.removeEventListener("dispose",M);for(const P in c){const w=c[P],y=C.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const EE={[hd]:pd,[md]:vd,[gd]:yd,[Ns]:_d,[pd]:hd,[vd]:md,[yd]:gd,[_d]:Ns};function TE(r,e){function t(){let U=!1;const me=new At;let ue=null;const Ce=new At(0,0,0,0);return{setMask:function(fe){ue!==fe&&!U&&(r.colorMask(fe,fe,fe,fe),ue=fe)},setLocked:function(fe){U=fe},setClear:function(fe,ae,Ue,ze,wt){wt===!0&&(fe*=ze,ae*=ze,Ue*=ze),me.set(fe,ae,Ue,ze),Ce.equals(me)===!1&&(r.clearColor(fe,ae,Ue,ze),Ce.copy(me))},reset:function(){U=!1,ue=null,Ce.set(-1,0,0,0)}}}function n(){let U=!1,me=!1,ue=null,Ce=null,fe=null;return{setReversed:function(ae){if(me!==ae){const Ue=e.get("EXT_clip_control");ae?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),me=ae;const ze=fe;fe=null,this.setClear(ze)}},getReversed:function(){return me},setTest:function(ae){ae?_e(r.DEPTH_TEST):Ae(r.DEPTH_TEST)},setMask:function(ae){ue!==ae&&!U&&(r.depthMask(ae),ue=ae)},setFunc:function(ae){if(me&&(ae=EE[ae]),Ce!==ae){switch(ae){case hd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case Ns:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case yd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ce=ae}},setLocked:function(ae){U=ae},setClear:function(ae){fe!==ae&&(me&&(ae=1-ae),r.clearDepth(ae),fe=ae)},reset:function(){U=!1,ue=null,Ce=null,fe=null,me=!1}}}function i(){let U=!1,me=null,ue=null,Ce=null,fe=null,ae=null,Ue=null,ze=null,wt=null;return{setTest:function(Le){U||(Le?_e(r.STENCIL_TEST):Ae(r.STENCIL_TEST))},setMask:function(Le){me!==Le&&!U&&(r.stencilMask(Le),me=Le)},setFunc:function(Le,Re,Qe){(ue!==Le||Ce!==Re||fe!==Qe)&&(r.stencilFunc(Le,Re,Qe),ue=Le,Ce=Re,fe=Qe)},setOp:function(Le,Re,Qe){(ae!==Le||Ue!==Re||ze!==Qe)&&(r.stencilOp(Le,Re,Qe),ae=Le,Ue=Re,ze=Qe)},setLocked:function(Le){U=Le},setClear:function(Le){wt!==Le&&(r.clearStencil(Le),wt=Le)},reset:function(){U=!1,me=null,ue=null,Ce=null,fe=null,ae=null,Ue=null,ze=null,wt=null}}}const o=new t,s=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,S=null,v=null,M=null,C=null,E=new Ke(0,0,0),P=0,w=!1,y=null,L=null,D=null,z=null,O=null;const T=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,J=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=J>=1):q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=J>=2);let pe=null,N={};const j=r.getParameter(r.SCISSOR_BOX),We=r.getParameter(r.VIEWPORT),Je=new At().fromArray(j),ne=new At().fromArray(We);function ce(U,me,ue,Ce){const fe=new Uint8Array(4),ae=r.createTexture();r.bindTexture(U,ae),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ue=0;Ue<ue;Ue++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Ce,0,r.RGBA,r.UNSIGNED_BYTE,fe):r.texImage2D(me+Ue,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,fe);return ae}const Pe={};Pe[r.TEXTURE_2D]=ce(r.TEXTURE_2D,r.TEXTURE_2D,1),Pe[r.TEXTURE_CUBE_MAP]=ce(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pe[r.TEXTURE_2D_ARRAY]=ce(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Pe[r.TEXTURE_3D]=ce(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),_e(r.DEPTH_TEST),s.setFunc(Ns),et(!1),K(qh),_e(r.CULL_FACE),F(Xr);function _e(U){u[U]!==!0&&(r.enable(U),u[U]=!0)}function Ae(U){u[U]!==!1&&(r.disable(U),u[U]=!1)}function Ze(U,me){return d[U]!==me?(r.bindFramebuffer(U,me),d[U]=me,U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=me),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=me),!0):!1}function we(U,me){let ue=h,Ce=!1;if(U){ue=f.get(me),ue===void 0&&(ue=[],f.set(me,ue));const fe=U.textures;if(ue.length!==fe.length||ue[0]!==r.COLOR_ATTACHMENT0){for(let ae=0,Ue=fe.length;ae<Ue;ae++)ue[ae]=r.COLOR_ATTACHMENT0+ae;ue.length=fe.length,Ce=!0}}else ue[0]!==r.BACK&&(ue[0]=r.BACK,Ce=!0);Ce&&r.drawBuffers(ue)}function st(U){return _!==U?(r.useProgram(U),_=U,!0):!1}const at={[wo]:r.FUNC_ADD,[Nv]:r.FUNC_SUBTRACT,[Uv]:r.FUNC_REVERSE_SUBTRACT};at[Fv]=r.MIN,at[kv]=r.MAX;const Ne={[Bv]:r.ZERO,[zv]:r.ONE,[Hv]:r.SRC_COLOR,[dd]:r.SRC_ALPHA,[Yv]:r.SRC_ALPHA_SATURATE,[Xv]:r.DST_COLOR,[Gv]:r.DST_ALPHA,[Vv]:r.ONE_MINUS_SRC_COLOR,[fd]:r.ONE_MINUS_SRC_ALPHA,[qv]:r.ONE_MINUS_DST_COLOR,[Wv]:r.ONE_MINUS_DST_ALPHA,[jv]:r.CONSTANT_COLOR,[$v]:r.ONE_MINUS_CONSTANT_COLOR,[Kv]:r.CONSTANT_ALPHA,[Zv]:r.ONE_MINUS_CONSTANT_ALPHA};function F(U,me,ue,Ce,fe,ae,Ue,ze,wt,Le){if(U===Xr){g===!0&&(Ae(r.BLEND),g=!1);return}if(g===!1&&(_e(r.BLEND),g=!0),U!==Ov){if(U!==m||Le!==w){if((p!==wo||v!==wo)&&(r.blendEquation(r.FUNC_ADD),p=wo,v=wo),Le)switch(U){case qr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.ONE,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case qr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,S=null,M=null,C=null,E.set(0,0,0),P=0,m=U,w=Le}return}fe=fe||me,ae=ae||ue,Ue=Ue||Ce,(me!==p||fe!==v)&&(r.blendEquationSeparate(at[me],at[fe]),p=me,v=fe),(ue!==b||Ce!==S||ae!==M||Ue!==C)&&(r.blendFuncSeparate(Ne[ue],Ne[Ce],Ne[ae],Ne[Ue]),b=ue,S=Ce,M=ae,C=Ue),(ze.equals(E)===!1||wt!==P)&&(r.blendColor(ze.r,ze.g,ze.b,wt),E.copy(ze),P=wt),m=U,w=!1}function rt(U,me){U.side===vi?Ae(r.CULL_FACE):_e(r.CULL_FACE);let ue=U.side===jn;me&&(ue=!ue),et(ue),U.blending===qr&&U.transparent===!1?F(Xr):F(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),o.setMask(U.colorWrite);const Ce=U.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),nt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?_e(r.SAMPLE_ALPHA_TO_COVERAGE):Ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(U){y!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),y=U)}function K(U){U!==Lv?(_e(r.CULL_FACE),U!==L&&(U===qh?r.cullFace(r.BACK):U===Dv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ae(r.CULL_FACE),L=U}function Ie(U){U!==D&&(W&&r.lineWidth(U),D=U)}function nt(U,me,ue){U?(_e(r.POLYGON_OFFSET_FILL),(z!==me||O!==ue)&&(r.polygonOffset(me,ue),z=me,O=ue)):Ae(r.POLYGON_OFFSET_FILL)}function ke(U){U?_e(r.SCISSOR_TEST):Ae(r.SCISSOR_TEST)}function Oe(U){U===void 0&&(U=r.TEXTURE0+T-1),pe!==U&&(r.activeTexture(U),pe=U)}function Et(U,me,ue){ue===void 0&&(pe===null?ue=r.TEXTURE0+T-1:ue=pe);let Ce=N[ue];Ce===void 0&&(Ce={type:void 0,texture:void 0},N[ue]=Ce),(Ce.type!==U||Ce.texture!==me)&&(pe!==ue&&(r.activeTexture(ue),pe=ue),r.bindTexture(U,me||Pe[U]),Ce.type=U,Ce.texture=me)}function I(){const U=N[pe];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{r.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{r.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{r.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{r.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{r.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{r.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Be(){try{r.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{r.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(U){Je.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Je.copy(U))}function Ee(U){ne.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),ne.copy(U))}function Xe(U,me){let ue=c.get(me);ue===void 0&&(ue=new WeakMap,c.set(me,ue));let Ce=ue.get(U);Ce===void 0&&(Ce=r.getUniformBlockIndex(me,U.name),ue.set(U,Ce))}function Se(U,me){const Ce=c.get(me).get(U);l.get(me)!==Ce&&(r.uniformBlockBinding(me,Ce,U.__bindingPointIndex),l.set(me,Ce))}function Me(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},pe=null,N={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,S=null,v=null,M=null,C=null,E=new Ke(0,0,0),P=0,w=!1,y=null,L=null,D=null,z=null,O=null,Je.set(0,0,r.canvas.width,r.canvas.height),ne.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:_e,disable:Ae,bindFramebuffer:Ze,drawBuffers:we,useProgram:st,setBlending:F,setMaterial:rt,setFlipSided:et,setCullFace:K,setLineWidth:Ie,setPolygonOffset:nt,setScissorTest:ke,activeTexture:Oe,bindTexture:Et,unbindTexture:I,compressedTexImage2D:A,compressedTexImage3D:X,texImage2D:oe,texImage3D:le,updateUBOMapping:Xe,uniformBlockBinding:Se,texStorage2D:ye,texStorage3D:Be,texSubImage2D:ie,texSubImage3D:re,compressedTexSubImage2D:ee,compressedTexSubImage3D:xe,scissor:be,viewport:Ee,reset:Me}}function AE(r,e,t,n,i,o,s){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,A){return h?new OffscreenCanvas(I,A):il("canvas")}function g(I,A,X){let ie=1;const re=Et(I);if((re.width>X||re.height>X)&&(ie=X/Math.max(re.width,re.height)),ie<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ee=Math.floor(ie*re.width),xe=Math.floor(ie*re.height);d===void 0&&(d=_(ee,xe));const ye=A?_(ee,xe):d;return ye.width=ee,ye.height=xe,ye.getContext("2d").drawImage(I,0,0,ee,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+xe+")."),ye}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(I,A,X,ie,re=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ee=A;if(A===r.RED&&(X===r.FLOAT&&(ee=r.R32F),X===r.HALF_FLOAT&&(ee=r.R16F),X===r.UNSIGNED_BYTE&&(ee=r.R8)),A===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(ee=r.R8UI),X===r.UNSIGNED_SHORT&&(ee=r.R16UI),X===r.UNSIGNED_INT&&(ee=r.R32UI),X===r.BYTE&&(ee=r.R8I),X===r.SHORT&&(ee=r.R16I),X===r.INT&&(ee=r.R32I)),A===r.RG&&(X===r.FLOAT&&(ee=r.RG32F),X===r.HALF_FLOAT&&(ee=r.RG16F),X===r.UNSIGNED_BYTE&&(ee=r.RG8)),A===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(ee=r.RG8UI),X===r.UNSIGNED_SHORT&&(ee=r.RG16UI),X===r.UNSIGNED_INT&&(ee=r.RG32UI),X===r.BYTE&&(ee=r.RG8I),X===r.SHORT&&(ee=r.RG16I),X===r.INT&&(ee=r.RG32I)),A===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(ee=r.RGB8UI),X===r.UNSIGNED_SHORT&&(ee=r.RGB16UI),X===r.UNSIGNED_INT&&(ee=r.RGB32UI),X===r.BYTE&&(ee=r.RGB8I),X===r.SHORT&&(ee=r.RGB16I),X===r.INT&&(ee=r.RGB32I)),A===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(ee=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(ee=r.RGBA16UI),X===r.UNSIGNED_INT&&(ee=r.RGBA32UI),X===r.BYTE&&(ee=r.RGBA8I),X===r.SHORT&&(ee=r.RGBA16I),X===r.INT&&(ee=r.RGBA32I)),A===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(ee=r.RGB9_E5),A===r.RGBA){const xe=re?Rc:Mt.getTransfer(ie);X===r.FLOAT&&(ee=r.RGBA32F),X===r.HALF_FLOAT&&(ee=r.RGBA16F),X===r.UNSIGNED_BYTE&&(ee=xe===Ft?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(ee=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(ee=r.RGB5_A1)}return(ee===r.R16F||ee===r.R32F||ee===r.RG16F||ee===r.RG32F||ee===r.RGBA16F||ee===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(I,A){let X;return I?A===null||A===Fo||A===Ja?X=r.DEPTH24_STENCIL8:A===Oi?X=r.DEPTH32F_STENCIL8:A===Za&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Fo||A===Ja?X=r.DEPTH_COMPONENT24:A===Oi?X=r.DEPTH_COMPONENT32F:A===Za&&(X=r.DEPTH_COMPONENT16),X}function M(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Wn&&I.minFilter!==li?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function C(I){const A=I.target;A.removeEventListener("dispose",C),P(A),A.isVideoTexture&&u.delete(A)}function E(I){const A=I.target;A.removeEventListener("dispose",E),y(A)}function P(I){const A=n.get(I);if(A.__webglInit===void 0)return;const X=I.source,ie=f.get(X);if(ie){const re=ie[A.__cacheKey];re.usedTimes--,re.usedTimes===0&&w(I),Object.keys(ie).length===0&&f.delete(X)}n.remove(I)}function w(I){const A=n.get(I);r.deleteTexture(A.__webglTexture);const X=I.source,ie=f.get(X);delete ie[A.__cacheKey],s.memory.textures--}function y(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(A.__webglFramebuffer[ie]))for(let re=0;re<A.__webglFramebuffer[ie].length;re++)r.deleteFramebuffer(A.__webglFramebuffer[ie][re]);else r.deleteFramebuffer(A.__webglFramebuffer[ie]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[ie])}else{if(Array.isArray(A.__webglFramebuffer))for(let ie=0;ie<A.__webglFramebuffer.length;ie++)r.deleteFramebuffer(A.__webglFramebuffer[ie]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ie=0;ie<A.__webglColorRenderbuffer.length;ie++)A.__webglColorRenderbuffer[ie]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[ie]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const X=I.textures;for(let ie=0,re=X.length;ie<re;ie++){const ee=n.get(X[ie]);ee.__webglTexture&&(r.deleteTexture(ee.__webglTexture),s.memory.textures--),n.remove(X[ie])}n.remove(I)}let L=0;function D(){L=0}function z(){const I=L;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),L+=1,I}function O(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function T(I,A){const X=n.get(I);if(I.isVideoTexture&&ke(I),I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){const ie=I.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(X,I,A);return}}t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+A)}function W(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){Pe(X,I,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+A)}function J(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){Pe(X,I,A);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+A)}function q(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){_e(X,I,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+A)}const pe={[ks]:r.REPEAT,[Fr]:r.CLAMP_TO_EDGE,[Cc]:r.MIRRORED_REPEAT},N={[Wn]:r.NEAREST,[Ug]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[li]:r.LINEAR,[dc]:r.LINEAR_MIPMAP_NEAREST,[mr]:r.LINEAR_MIPMAP_LINEAR},j={[hy]:r.NEVER,[yy]:r.ALWAYS,[py]:r.LESS,[qg]:r.LEQUAL,[my]:r.EQUAL,[vy]:r.GEQUAL,[gy]:r.GREATER,[_y]:r.NOTEQUAL};function We(I,A){if(A.type===Oi&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===li||A.magFilter===dc||A.magFilter===ya||A.magFilter===mr||A.minFilter===li||A.minFilter===dc||A.minFilter===ya||A.minFilter===mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,pe[A.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,pe[A.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,pe[A.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,N[A.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,N[A.minFilter]),A.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,j[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Wn||A.minFilter!==ya&&A.minFilter!==mr||A.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Je(I,A){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",C));const ie=A.source;let re=f.get(ie);re===void 0&&(re={},f.set(ie,re));const ee=O(A);if(ee!==I.__cacheKey){re[ee]===void 0&&(re[ee]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,X=!0),re[ee].usedTimes++;const xe=re[I.__cacheKey];xe!==void 0&&(re[I.__cacheKey].usedTimes--,xe.usedTimes===0&&w(A)),I.__cacheKey=ee,I.__webglTexture=re[ee].texture}return X}function ne(I,A,X){return Math.floor(Math.floor(I/X)/A)}function ce(I,A,X,ie){const ee=I.updateRanges;if(ee.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,X,ie,A.data);else{ee.sort((le,be)=>le.start-be.start);let xe=0;for(let le=1;le<ee.length;le++){const be=ee[xe],Ee=ee[le],Xe=be.start+be.count,Se=ne(Ee.start,A.width,4),Me=ne(be.start,A.width,4);Ee.start<=Xe+1&&Se===Me&&ne(Ee.start+Ee.count-1,A.width,4)===Se?be.count=Math.max(be.count,Ee.start+Ee.count-be.start):(++xe,ee[xe]=Ee)}ee.length=xe+1;const ye=r.getParameter(r.UNPACK_ROW_LENGTH),Be=r.getParameter(r.UNPACK_SKIP_PIXELS),oe=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let le=0,be=ee.length;le<be;le++){const Ee=ee[le],Xe=Math.floor(Ee.start/4),Se=Math.ceil(Ee.count/4),Me=Xe%A.width,U=Math.floor(Xe/A.width),me=Se,ue=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Me),r.pixelStorei(r.UNPACK_SKIP_ROWS,U),t.texSubImage2D(r.TEXTURE_2D,0,Me,U,me,ue,X,ie,A.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ye),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Be),r.pixelStorei(r.UNPACK_SKIP_ROWS,oe)}}function Pe(I,A,X){let ie=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ie=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ie=r.TEXTURE_3D);const re=Je(I,A),ee=A.source;t.bindTexture(ie,I.__webglTexture,r.TEXTURE0+X);const xe=n.get(ee);if(ee.version!==xe.__version||re===!0){t.activeTexture(r.TEXTURE0+X);const ye=Mt.getPrimaries(Mt.workingColorSpace),Be=A.colorSpace===Ur?null:Mt.getPrimaries(A.colorSpace),oe=A.colorSpace===Ur||ye===Be?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let le=g(A.image,!1,i.maxTextureSize);le=Oe(A,le);const be=o.convert(A.format,A.colorSpace),Ee=o.convert(A.type);let Xe=S(A.internalFormat,be,Ee,A.colorSpace,A.isVideoTexture);We(ie,A);let Se;const Me=A.mipmaps,U=A.isVideoTexture!==!0,me=xe.__version===void 0||re===!0,ue=ee.dataReady,Ce=M(A,le);if(A.isDepthTexture)Xe=v(A.format===el,A.type),me&&(U?t.texStorage2D(r.TEXTURE_2D,1,Xe,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Xe,le.width,le.height,0,be,Ee,null));else if(A.isDataTexture)if(Me.length>0){U&&me&&t.texStorage2D(r.TEXTURE_2D,Ce,Xe,Me[0].width,Me[0].height);for(let fe=0,ae=Me.length;fe<ae;fe++)Se=Me[fe],U?ue&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,Se.width,Se.height,be,Ee,Se.data):t.texImage2D(r.TEXTURE_2D,fe,Xe,Se.width,Se.height,0,be,Ee,Se.data);A.generateMipmaps=!1}else U?(me&&t.texStorage2D(r.TEXTURE_2D,Ce,Xe,le.width,le.height),ue&&ce(A,le,be,Ee)):t.texImage2D(r.TEXTURE_2D,0,Xe,le.width,le.height,0,be,Ee,le.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){U&&me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Xe,Me[0].width,Me[0].height,le.depth);for(let fe=0,ae=Me.length;fe<ae;fe++)if(Se=Me[fe],A.format!==yi)if(be!==null)if(U){if(ue)if(A.layerUpdates.size>0){const Ue=kp(Se.width,Se.height,A.format,A.type);for(const ze of A.layerUpdates){const wt=Se.data.subarray(ze*Ue/Se.data.BYTES_PER_ELEMENT,(ze+1)*Ue/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,ze,Se.width,Se.height,1,be,wt)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Se.width,Se.height,le.depth,be,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,Xe,Se.width,Se.height,le.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ue&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Se.width,Se.height,le.depth,be,Ee,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,fe,Xe,Se.width,Se.height,le.depth,0,be,Ee,Se.data)}else{U&&me&&t.texStorage2D(r.TEXTURE_2D,Ce,Xe,Me[0].width,Me[0].height);for(let fe=0,ae=Me.length;fe<ae;fe++)Se=Me[fe],A.format!==yi?be!==null?U?ue&&t.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,Se.width,Se.height,be,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,fe,Xe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ue&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,Se.width,Se.height,be,Ee,Se.data):t.texImage2D(r.TEXTURE_2D,fe,Xe,Se.width,Se.height,0,be,Ee,Se.data)}else if(A.isDataArrayTexture)if(U){if(me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Xe,le.width,le.height,le.depth),ue)if(A.layerUpdates.size>0){const fe=kp(le.width,le.height,A.format,A.type);for(const ae of A.layerUpdates){const Ue=le.data.subarray(ae*fe/le.data.BYTES_PER_ELEMENT,(ae+1)*fe/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ae,le.width,le.height,1,be,Ee,Ue)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,Ee,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Xe,le.width,le.height,le.depth,0,be,Ee,le.data);else if(A.isData3DTexture)U?(me&&t.texStorage3D(r.TEXTURE_3D,Ce,Xe,le.width,le.height,le.depth),ue&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,Ee,le.data)):t.texImage3D(r.TEXTURE_3D,0,Xe,le.width,le.height,le.depth,0,be,Ee,le.data);else if(A.isFramebufferTexture){if(me)if(U)t.texStorage2D(r.TEXTURE_2D,Ce,Xe,le.width,le.height);else{let fe=le.width,ae=le.height;for(let Ue=0;Ue<Ce;Ue++)t.texImage2D(r.TEXTURE_2D,Ue,Xe,fe,ae,0,be,Ee,null),fe>>=1,ae>>=1}}else if(Me.length>0){if(U&&me){const fe=Et(Me[0]);t.texStorage2D(r.TEXTURE_2D,Ce,Xe,fe.width,fe.height)}for(let fe=0,ae=Me.length;fe<ae;fe++)Se=Me[fe],U?ue&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,be,Ee,Se):t.texImage2D(r.TEXTURE_2D,fe,Xe,be,Ee,Se);A.generateMipmaps=!1}else if(U){if(me){const fe=Et(le);t.texStorage2D(r.TEXTURE_2D,Ce,Xe,fe.width,fe.height)}ue&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,be,Ee,le)}else t.texImage2D(r.TEXTURE_2D,0,Xe,be,Ee,le);m(A)&&p(ie),xe.__version=ee.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function _e(I,A,X){if(A.image.length!==6)return;const ie=Je(I,A),re=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+X);const ee=n.get(re);if(re.version!==ee.__version||ie===!0){t.activeTexture(r.TEXTURE0+X);const xe=Mt.getPrimaries(Mt.workingColorSpace),ye=A.colorSpace===Ur?null:Mt.getPrimaries(A.colorSpace),Be=A.colorSpace===Ur||xe===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const oe=A.isCompressedTexture||A.image[0].isCompressedTexture,le=A.image[0]&&A.image[0].isDataTexture,be=[];for(let ae=0;ae<6;ae++)!oe&&!le?be[ae]=g(A.image[ae],!0,i.maxCubemapSize):be[ae]=le?A.image[ae].image:A.image[ae],be[ae]=Oe(A,be[ae]);const Ee=be[0],Xe=o.convert(A.format,A.colorSpace),Se=o.convert(A.type),Me=S(A.internalFormat,Xe,Se,A.colorSpace),U=A.isVideoTexture!==!0,me=ee.__version===void 0||ie===!0,ue=re.dataReady;let Ce=M(A,Ee);We(r.TEXTURE_CUBE_MAP,A);let fe;if(oe){U&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ce,Me,Ee.width,Ee.height);for(let ae=0;ae<6;ae++){fe=be[ae].mipmaps;for(let Ue=0;Ue<fe.length;Ue++){const ze=fe[Ue];A.format!==yi?Xe!==null?U?ue&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,0,0,ze.width,ze.height,Xe,ze.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,Me,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,0,0,ze.width,ze.height,Xe,Se,ze.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,Me,ze.width,ze.height,0,Xe,Se,ze.data)}}}else{if(fe=A.mipmaps,U&&me){fe.length>0&&Ce++;const ae=Et(be[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ce,Me,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(le){U?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,be[ae].width,be[ae].height,Xe,Se,be[ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,be[ae].width,be[ae].height,0,Xe,Se,be[ae].data);for(let Ue=0;Ue<fe.length;Ue++){const wt=fe[Ue].image[ae].image;U?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,0,0,wt.width,wt.height,Xe,Se,wt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,Me,wt.width,wt.height,0,Xe,Se,wt.data)}}else{U?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Xe,Se,be[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,Xe,Se,be[ae]);for(let Ue=0;Ue<fe.length;Ue++){const ze=fe[Ue];U?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,0,0,Xe,Se,ze.image[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,Me,Xe,Se,ze.image[ae])}}}m(A)&&p(r.TEXTURE_CUBE_MAP),ee.__version=re.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function Ae(I,A,X,ie,re,ee){const xe=o.convert(X.format,X.colorSpace),ye=o.convert(X.type),Be=S(X.internalFormat,xe,ye,X.colorSpace),oe=n.get(A),le=n.get(X);if(le.__renderTarget=A,!oe.__hasExternalTextures){const be=Math.max(1,A.width>>ee),Ee=Math.max(1,A.height>>ee);re===r.TEXTURE_3D||re===r.TEXTURE_2D_ARRAY?t.texImage3D(re,ee,Be,be,Ee,A.depth,0,xe,ye,null):t.texImage2D(re,ee,Be,be,Ee,0,xe,ye,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),nt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ie,re,le.__webglTexture,0,Ie(A)):(re===r.TEXTURE_2D||re>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ie,re,le.__webglTexture,ee),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ze(I,A,X){if(r.bindRenderbuffer(r.RENDERBUFFER,I),A.depthBuffer){const ie=A.depthTexture,re=ie&&ie.isDepthTexture?ie.type:null,ee=v(A.stencilBuffer,re),xe=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=Ie(A);nt(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,ee,A.width,A.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,ee,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,I)}else{const ie=A.textures;for(let re=0;re<ie.length;re++){const ee=ie[re],xe=o.convert(ee.format,ee.colorSpace),ye=o.convert(ee.type),Be=S(ee.internalFormat,xe,ye,ee.colorSpace),oe=Ie(A);X&&nt(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,Be,A.width,A.height):nt(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe,Be,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Be,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ie=n.get(A.depthTexture);ie.__renderTarget=A,(!ie.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),T(A.depthTexture,0);const re=ie.__webglTexture,ee=Ie(A);if(A.depthTexture.format===Qa)nt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0);else if(A.depthTexture.format===el)nt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function st(I){const A=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const ie=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ie){const re=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ie.removeEventListener("dispose",re)};ie.addEventListener("dispose",re),A.__depthDisposeCallback=re}A.__boundDepthTexture=ie}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const ie=I.texture.mipmaps;ie&&ie.length>0?we(A.__webglFramebuffer[0],I):we(A.__webglFramebuffer,I)}else if(X){A.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[ie]),A.__webglDepthbuffer[ie]===void 0)A.__webglDepthbuffer[ie]=r.createRenderbuffer(),Ze(A.__webglDepthbuffer[ie],I,!1);else{const re=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer[ie];r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,re,r.RENDERBUFFER,ee)}}else{const ie=I.texture.mipmaps;if(ie&&ie.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Ze(A.__webglDepthbuffer,I,!1);else{const re=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,re,r.RENDERBUFFER,ee)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function at(I,A,X){const ie=n.get(I);A!==void 0&&Ae(ie.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&st(I)}function Ne(I){const A=I.texture,X=n.get(I),ie=n.get(A);I.addEventListener("dispose",E);const re=I.textures,ee=I.isWebGLCubeRenderTarget===!0,xe=re.length>1;if(xe||(ie.__webglTexture===void 0&&(ie.__webglTexture=r.createTexture()),ie.__version=A.version,s.memory.textures++),ee){X.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer[ye]=[];for(let Be=0;Be<A.mipmaps.length;Be++)X.__webglFramebuffer[ye][Be]=r.createFramebuffer()}else X.__webglFramebuffer[ye]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer=[];for(let ye=0;ye<A.mipmaps.length;ye++)X.__webglFramebuffer[ye]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ye=0,Be=re.length;ye<Be;ye++){const oe=n.get(re[ye]);oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture(),s.memory.textures++)}if(I.samples>0&&nt(I)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ye=0;ye<re.length;ye++){const Be=re[ye];X.__webglColorRenderbuffer[ye]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[ye]);const oe=o.convert(Be.format,Be.colorSpace),le=o.convert(Be.type),be=S(Be.internalFormat,oe,le,Be.colorSpace,I.isXRRenderTarget===!0),Ee=Ie(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,be,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,X.__webglColorRenderbuffer[ye])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Ze(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,ie.__webglTexture),We(r.TEXTURE_CUBE_MAP,A);for(let ye=0;ye<6;ye++)if(A.mipmaps&&A.mipmaps.length>0)for(let Be=0;Be<A.mipmaps.length;Be++)Ae(X.__webglFramebuffer[ye][Be],I,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Be);else Ae(X.__webglFramebuffer[ye],I,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);m(A)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ye=0,Be=re.length;ye<Be;ye++){const oe=re[ye],le=n.get(oe);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),We(r.TEXTURE_2D,oe),Ae(X.__webglFramebuffer,I,oe,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,0),m(oe)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ye=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ye=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ye,ie.__webglTexture),We(ye,A),A.mipmaps&&A.mipmaps.length>0)for(let Be=0;Be<A.mipmaps.length;Be++)Ae(X.__webglFramebuffer[Be],I,A,r.COLOR_ATTACHMENT0,ye,Be);else Ae(X.__webglFramebuffer,I,A,r.COLOR_ATTACHMENT0,ye,0);m(A)&&p(ye),t.unbindTexture()}I.depthBuffer&&st(I)}function F(I){const A=I.textures;for(let X=0,ie=A.length;X<ie;X++){const re=A[X];if(m(re)){const ee=b(I),xe=n.get(re).__webglTexture;t.bindTexture(ee,xe),p(ee),t.unbindTexture()}}}const rt=[],et=[];function K(I){if(I.samples>0){if(nt(I)===!1){const A=I.textures,X=I.width,ie=I.height;let re=r.COLOR_BUFFER_BIT;const ee=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(I),ye=A.length>1;if(ye)for(let oe=0;oe<A.length;oe++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const Be=I.texture.mipmaps;Be&&Be.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let oe=0;oe<A.length;oe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(re|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(re|=r.STENCIL_BUFFER_BIT)),ye){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[oe]);const le=n.get(A[oe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,X,ie,0,0,X,ie,re,r.NEAREST),l===!0&&(rt.length=0,et.length=0,rt.push(r.COLOR_ATTACHMENT0+oe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(rt.push(ee),et.push(ee),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,et)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ye)for(let oe=0;oe<A.length;oe++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,xe.__webglColorRenderbuffer[oe]);const le=n.get(A[oe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function Ie(I){return Math.min(i.maxSamples,I.samples)}function nt(I){const A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ke(I){const A=s.render.frame;u.get(I)!==A&&(u.set(I,A),I.update())}function Oe(I,A){const X=I.colorSpace,ie=I.format,re=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==Xn&&X!==Ur&&(Mt.getTransfer(X)===Ft?(ie!==yi||re!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),A}function Et(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=D,this.setTexture2D=T,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=q,this.rebindTextures=at,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=nt}function CE(r,e){function t(n,i=Ur){let o;const s=Mt.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===Gf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Wf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Fg)return r.BYTE;if(n===kg)return r.SHORT;if(n===Za)return r.UNSIGNED_SHORT;if(n===Vf)return r.INT;if(n===Fo)return r.UNSIGNED_INT;if(n===Oi)return r.FLOAT;if(n===ml)return r.HALF_FLOAT;if(n===zg)return r.ALPHA;if(n===Hg)return r.RGB;if(n===yi)return r.RGBA;if(n===Qa)return r.DEPTH_COMPONENT;if(n===el)return r.DEPTH_STENCIL;if(n===Xf)return r.RED;if(n===qf)return r.RED_INTEGER;if(n===Vg)return r.RG;if(n===Yf)return r.RG_INTEGER;if(n===jf)return r.RGBA_INTEGER;if(n===fc||n===hc||n===pc||n===mc)if(s===Ft)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===fc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===fc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wd||n===bd||n===Md||n===Ed)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===wd)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bd)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Md)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ed)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Td||n===Ad||n===Cd)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Td||n===Ad)return s===Ft?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Cd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rd||n===Pd||n===Ld||n===Dd||n===Id||n===Od||n===Nd||n===Ud||n===Fd||n===kd||n===Bd||n===zd||n===Hd||n===Vd)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Rd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ld)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Id)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Od)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ud)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vd)return s===Ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gc||n===Gd||n===Wd)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===gc)return s===Ft?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gd)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wd)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gg||n===Xd||n===qd||n===Yd)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===gc)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Xd)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qd)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yd)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ja?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const RE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PE=`
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

}`;class LE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new cn,o=e.properties.get(i);o.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xi({vertexShader:RE,fragmentShader:PE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gn(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class DE extends Zs{constructor(e,t){super();const n=this;let i=null,o=1,s=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new LE,m=t.getContextAttributes();let p=null,b=null;const S=[],v=[],M=new St;let C=null;const E=new Yn;E.viewport=new At;const P=new Yn;P.viewport=new At;const w=[E,P],y=new Wx;let L=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ce=S[ne];return ce===void 0&&(ce=new Ru,S[ne]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(ne){let ce=S[ne];return ce===void 0&&(ce=new Ru,S[ne]=ce),ce.getGripSpace()},this.getHand=function(ne){let ce=S[ne];return ce===void 0&&(ce=new Ru,S[ne]=ce),ce.getHandSpace()};function z(ne){const ce=v.indexOf(ne.inputSource);if(ce===-1)return;const Pe=S[ce];Pe!==void 0&&(Pe.update(ne.inputSource,ne.frame,c||s),Pe.dispatchEvent({type:ne.type,data:ne.inputSource}))}function O(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",T);for(let ne=0;ne<S.length;ne++){const ce=v[ne];ce!==null&&(v[ne]=null,S[ne].disconnect(ce))}L=null,D=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,b=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){o=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",O),i.addEventListener("inputsourceschange",T),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,_e=null,Ae=null;m.depth&&(Ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=m.stencil?el:Qa,_e=m.stencil?Ja:Fo);const Ze={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:o};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Ze),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new ko(f.textureWidth,f.textureHeight,{format:yi,type:Ji,depthTexture:new s_(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(i,t,Pe),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new ko(h.framebufferWidth,h.framebufferHeight,{format:yi,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(a),Je.setContext(i),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function T(ne){for(let ce=0;ce<ne.removed.length;ce++){const Pe=ne.removed[ce],_e=v.indexOf(Pe);_e>=0&&(v[_e]=null,S[_e].disconnect(Pe))}for(let ce=0;ce<ne.added.length;ce++){const Pe=ne.added[ce];let _e=v.indexOf(Pe);if(_e===-1){for(let Ze=0;Ze<S.length;Ze++)if(Ze>=v.length){v.push(Pe),_e=Ze;break}else if(v[Ze]===null){v[Ze]=Pe,_e=Ze;break}if(_e===-1)break}const Ae=S[_e];Ae&&Ae.connect(Pe)}}const W=new G,J=new G;function q(ne,ce,Pe){W.setFromMatrixPosition(ce.matrixWorld),J.setFromMatrixPosition(Pe.matrixWorld);const _e=W.distanceTo(J),Ae=ce.projectionMatrix.elements,Ze=Pe.projectionMatrix.elements,we=Ae[14]/(Ae[10]-1),st=Ae[14]/(Ae[10]+1),at=(Ae[9]+1)/Ae[5],Ne=(Ae[9]-1)/Ae[5],F=(Ae[8]-1)/Ae[0],rt=(Ze[8]+1)/Ze[0],et=we*F,K=we*rt,Ie=_e/(-F+rt),nt=Ie*-F;if(ce.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(nt),ne.translateZ(Ie),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ae[10]===-1)ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const ke=we+Ie,Oe=st+Ie,Et=et-nt,I=K+(_e-nt),A=at*st/Oe*ke,X=Ne*st/Oe*ke;ne.projectionMatrix.makePerspective(Et,I,A,X,ke,Oe),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function pe(ne,ce){ce===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ce.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;let ce=ne.near,Pe=ne.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(Pe=g.depthFar)),y.near=P.near=E.near=ce,y.far=P.far=E.far=Pe,(L!==y.near||D!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,D=y.far),E.layers.mask=ne.layers.mask|2,P.layers.mask=ne.layers.mask|4,y.layers.mask=E.layers.mask|P.layers.mask;const _e=ne.parent,Ae=y.cameras;pe(y,_e);for(let Ze=0;Ze<Ae.length;Ze++)pe(Ae[Ze],_e);Ae.length===2?q(y,E,P):y.projectionMatrix.copy(E.projectionMatrix),N(ne,y,_e)};function N(ne,ce,Pe){Pe===null?ne.matrix.copy(ce.matrixWorld):(ne.matrix.copy(Pe.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ce.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Bs*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(ne){l=ne,f!==null&&(f.fixedFoveation=ne),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ne)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let j=null;function We(ne,ce){if(u=ce.getViewerPose(c||s),_=ce,u!==null){const Pe=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let _e=!1;Pe.length!==y.cameras.length&&(y.cameras.length=0,_e=!0);for(let we=0;we<Pe.length;we++){const st=Pe[we];let at=null;if(h!==null)at=h.getViewport(st);else{const F=d.getViewSubImage(f,st);at=F.viewport,we===0&&(e.setRenderTargetTextures(b,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(b))}let Ne=w[we];Ne===void 0&&(Ne=new Yn,Ne.layers.enable(we),Ne.viewport=new At,w[we]=Ne),Ne.matrix.fromArray(st.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(st.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(at.x,at.y,at.width,at.height),we===0&&(y.matrix.copy(Ne.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),_e===!0&&y.cameras.push(Ne)}const Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const we=d.getDepthInformation(Pe[0]);we&&we.isValid&&we.texture&&g.init(e,we,i.renderState)}}for(let Pe=0;Pe<S.length;Pe++){const _e=v[Pe],Ae=S[Pe];_e!==null&&Ae!==void 0&&Ae.update(_e,ce,c||s)}j&&j(ne,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const Je=new d_;Je.setAnimationLoop(We),this.setAnimationLoop=function(ne){j=ne},this.dispose=function(){}}}const fo=new Qi,IE=new dt;function OE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(o(m,p),_(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),g(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,fo.copy(v),fo.x*=-1,fo.y*=-1,fo.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(fo.y*=-1,fo.z*=-1),m.envMapRotation.value.setFromMatrix4(IE.makeRotationFromEuler(fo)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function NE(r,e,t,n){let i={},o={},s=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=i[b.id];v===void 0&&(_(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const M=S.program;n.updateUBOMapping(b,M);const C=e.render.frame;o[b.id]!==C&&(f(b),o[b.id]=C)}function u(b){const S=d();b.__bindingPointIndex=S;const v=r.createBuffer(),M=b.__size,C=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,M,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function d(){for(let b=0;b<a;b++)if(s.indexOf(b)===-1)return s.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=i[b.id],v=b.uniforms,M=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let C=0,E=v.length;C<E;C++){const P=Array.isArray(v[C])?v[C]:[v[C]];for(let w=0,y=P.length;w<y;w++){const L=P[w];if(h(L,C,w,M)===!0){const D=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let O=0;for(let T=0;T<z.length;T++){const W=z[T],J=g(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,D+O,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,O),O+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,S,v,M){const C=b.value,E=S+"_"+v;if(M[E]===void 0)return typeof C=="number"||typeof C=="boolean"?M[E]=C:M[E]=C.clone(),!0;{const P=M[E];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return M[E]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function _(b){const S=b.uniforms;let v=0;const M=16;for(let E=0,P=S.length;E<P;E++){const w=Array.isArray(S[E])?S[E]:[S[E]];for(let y=0,L=w.length;y<L;y++){const D=w[y],z=Array.isArray(D.value)?D.value:[D.value];for(let O=0,T=z.length;O<T;O++){const W=z[O],J=g(W),q=v%M,pe=q%J.boundary,N=q+pe;v+=pe,N!==0&&M-N<J.storage&&(v+=M-N),D.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=J.storage}}}const C=v%M;return C>0&&(v+=M-C),b.__size=v,b.__cache={},this}function g(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=s.indexOf(S.__bindingPointIndex);s.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete o[S.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);s=[],i={},o={}}return{bind:l,update:c,dispose:p}}class UE{constructor(e={}){const{canvas:t=Fy(),context:n=null,depth:i=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=s;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let M=!1;this._outputColorSpace=Sn;let C=0,E=0,P=null,w=-1,y=null;const L=new At,D=new At;let z=null;const O=new Ke(0);let T=0,W=t.width,J=t.height,q=1,pe=null,N=null;const j=new At(0,0,W,J),We=new At(0,0,W,J);let Je=!1;const ne=new Qf;let ce=!1,Pe=!1;const _e=new dt,Ae=new dt,Ze=new G,we=new At,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function Ne(){return P===null?q:1}let F=n;function rt(R,V){return t.getContext(R,V)}try{const R={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hf}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ae,!1),F===null){const V="webgl2";if(F=rt(V,R),F===null)throw rt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let et,K,Ie,nt,ke,Oe,Et,I,A,X,ie,re,ee,xe,ye,Be,oe,le,be,Ee,Xe,Se,Me,U;function me(){et=new qb(F),et.init(),Se=new CE(F,et),K=new Bb(F,et,e,Se),Ie=new TE(F,et),K.reverseDepthBuffer&&f&&Ie.buffers.depth.setReversed(!0),nt=new $b(F),ke=new hE,Oe=new AE(F,et,Ie,ke,K,Se,nt),Et=new Hb(v),I=new Xb(v),A=new tS(F),Me=new Fb(F,A),X=new Yb(F,A,nt,Me),ie=new Zb(F,X,A,nt),be=new Kb(F,K,Oe),Be=new zb(ke),re=new fE(v,Et,I,et,K,Me,Be),ee=new OE(v,ke),xe=new mE,ye=new SE(et),le=new Ub(v,Et,I,Ie,ie,h,l),oe=new ME(v,ie,K),U=new NE(F,nt,K,Ie),Ee=new kb(F,et,nt),Xe=new jb(F,et,nt),nt.programs=re.programs,v.capabilities=K,v.extensions=et,v.properties=ke,v.renderLists=xe,v.shadowMap=oe,v.state=Ie,v.info=nt}me();const ue=new DE(v,F);this.xr=ue,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=et.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=et.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(W,J,!1))},this.getSize=function(R){return R.set(W,J)},this.setSize=function(R,V,Q=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=R,J=V,t.width=Math.floor(R*q),t.height=Math.floor(V*q),Q===!0&&(t.style.width=R+"px",t.style.height=V+"px"),this.setViewport(0,0,R,V)},this.getDrawingBufferSize=function(R){return R.set(W*q,J*q).floor()},this.setDrawingBufferSize=function(R,V,Q){W=R,J=V,q=Q,t.width=Math.floor(R*Q),t.height=Math.floor(V*Q),this.setViewport(0,0,R,V)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(j)},this.setViewport=function(R,V,Q,Z){R.isVector4?j.set(R.x,R.y,R.z,R.w):j.set(R,V,Q,Z),Ie.viewport(L.copy(j).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy(We)},this.setScissor=function(R,V,Q,Z){R.isVector4?We.set(R.x,R.y,R.z,R.w):We.set(R,V,Q,Z),Ie.scissor(D.copy(We).multiplyScalar(q).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(R){Ie.setScissorTest(Je=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){N=R},this.getClearColor=function(R){return R.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(R=!0,V=!0,Q=!0){let Z=0;if(R){let H=!1;if(P!==null){const he=P.texture.format;H=he===jf||he===Yf||he===qf}if(H){const he=P.texture.type,x=he===Ji||he===Fo||he===Za||he===Ja||he===Gf||he===Wf,k=le.getClearColor(),B=le.getClearAlpha(),$=k.r,se=k.g,Y=k.b;x?(_[0]=$,_[1]=se,_[2]=Y,_[3]=B,F.clearBufferuiv(F.COLOR,0,_)):(g[0]=$,g[1]=se,g[2]=Y,g[3]=B,F.clearBufferiv(F.COLOR,0,g))}else Z|=F.COLOR_BUFFER_BIT}V&&(Z|=F.DEPTH_BUFFER_BIT),Q&&(Z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),le.dispose(),xe.dispose(),ye.dispose(),ke.dispose(),Et.dispose(),I.dispose(),ie.dispose(),Me.dispose(),U.dispose(),re.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Te),ue.removeEventListener("sessionend",it),ge.stop()};function Ce(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=nt.autoReset,V=oe.enabled,Q=oe.autoUpdate,Z=oe.needsUpdate,H=oe.type;me(),nt.autoReset=R,oe.enabled=V,oe.autoUpdate=Q,oe.needsUpdate=Z,oe.type=H}function ae(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ue(R){const V=R.target;V.removeEventListener("dispose",Ue),ze(V)}function ze(R){wt(R),ke.remove(R)}function wt(R){const V=ke.get(R).programs;V!==void 0&&(V.forEach(function(Q){re.releaseProgram(Q)}),R.isShaderMaterial&&re.releaseShaderCache(R))}this.renderBufferDirect=function(R,V,Q,Z,H,he){V===null&&(V=st);const x=H.isMesh&&H.matrixWorld.determinant()<0,k=Dn(R,V,Q,Z,H);Ie.setMaterial(Z,x);let B=Q.index,$=1;if(Z.wireframe===!0){if(B=X.getWireframeAttribute(Q),B===void 0)return;$=2}const se=Q.drawRange,Y=Q.attributes.position;let ve=se.start*$,Fe=(se.start+se.count)*$;he!==null&&(ve=Math.max(ve,he.start*$),Fe=Math.min(Fe,(he.start+he.count)*$)),B!==null?(ve=Math.max(ve,0),Fe=Math.min(Fe,B.count)):Y!=null&&(ve=Math.max(ve,0),Fe=Math.min(Fe,Y.count));const tt=Fe-ve;if(tt<0||tt===1/0)return;Me.setup(H,Z,k,Q,B);let Ye,_t=Ee;if(B!==null&&(Ye=A.get(B),_t=Xe,_t.setIndex(Ye)),H.isMesh)Z.wireframe===!0?(Ie.setLineWidth(Z.wireframeLinewidth*Ne()),_t.setMode(F.LINES)):_t.setMode(F.TRIANGLES);else if(H.isLine){let je=Z.linewidth;je===void 0&&(je=1),Ie.setLineWidth(je*Ne()),H.isLineSegments?_t.setMode(F.LINES):H.isLineLoop?_t.setMode(F.LINE_LOOP):_t.setMode(F.LINE_STRIP)}else H.isPoints?_t.setMode(F.POINTS):H.isSprite&&_t.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Ms("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))_t.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const je=H._multiDrawStarts,tn=H._multiDrawCounts,ot=H._multiDrawCount,lt=B?A.get(B).bytesPerElement:1,Vt=ke.get(Z).currentProgram.getUniforms();for(let Ut=0;Ut<ot;Ut++)Vt.setValue(F,"_gl_DrawID",Ut),_t.render(je[Ut]/lt,tn[Ut])}else if(H.isInstancedMesh)_t.renderInstances(ve,tt,H.count);else if(Q.isInstancedBufferGeometry){const je=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,tn=Math.min(Q.instanceCount,je);_t.renderInstances(ve,tt,tn)}else _t.render(ve,tt)};function Le(R,V,Q){R.transparent===!0&&R.side===vi&&R.forceSinglePass===!1?(R.side=jn,R.needsUpdate=!0,Tt(R,V,Q),R.side=br,R.needsUpdate=!0,Tt(R,V,Q),R.side=vi):Tt(R,V,Q)}this.compile=function(R,V,Q=null){Q===null&&(Q=R),p=ye.get(Q),p.init(V),S.push(p),Q.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),R!==Q&&R.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Z=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const he=H.material;if(he)if(Array.isArray(he))for(let x=0;x<he.length;x++){const k=he[x];Le(k,Q,H),Z.add(k)}else Le(he,Q,H),Z.add(he)}),p=S.pop(),Z},this.compileAsync=function(R,V,Q=null){const Z=this.compile(R,V,Q);return new Promise(H=>{function he(){if(Z.forEach(function(x){ke.get(x).currentProgram.isReady()&&Z.delete(x)}),Z.size===0){H(R);return}setTimeout(he,10)}et.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Re=null;function Qe(R){Re&&Re(R)}function Te(){ge.stop()}function it(){ge.start()}const ge=new d_;ge.setAnimationLoop(Qe),typeof self<"u"&&ge.setContext(self),this.setAnimationLoop=function(R){Re=R,ue.setAnimationLoop(R),R===null?ge.stop():ge.start()},ue.addEventListener("sessionstart",Te),ue.addEventListener("sessionend",it),this.render=function(R,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(V),V=ue.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,V,P),p=ye.get(R,S.length),p.init(V),S.push(p),Ae.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ne.setFromProjectionMatrix(Ae),Pe=this.localClippingEnabled,ce=Be.init(this.clippingPlanes,Pe),m=xe.get(R,b.length),m.init(),b.push(m),ue.enabled===!0&&ue.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&Ge(he,V,-1/0,v.sortObjects)}Ge(R,V,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(pe,N),at=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,at&&le.addToRenderList(m,R),this.info.render.frame++,ce===!0&&Be.beginShadows();const Q=p.state.shadowsArray;oe.render(Q,R,V),ce===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,H=m.transmissive;if(p.setupLights(),V.isArrayCamera){const he=V.cameras;if(H.length>0)for(let x=0,k=he.length;x<k;x++){const B=he[x];ft(Z,H,R,B)}at&&le.render(R);for(let x=0,k=he.length;x<k;x++){const B=he[x];Gt(m,R,B,B.viewport)}}else H.length>0&&ft(Z,H,R,V),at&&le.render(R),Gt(m,R,V);P!==null&&E===0&&(Oe.updateMultisampleRenderTarget(P),Oe.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,V),Me.resetDefaultState(),w=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],ce===!0&&Be.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ge(R,V,Q,Z){if(R.visible===!1)return;if(R.layers.test(V.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(V);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ne.intersectsSprite(R)){Z&&we.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ae);const x=ie.update(R),k=R.material;k.visible&&m.push(R,x,k,Q,we.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ne.intersectsObject(R))){const x=ie.update(R),k=R.material;if(Z&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),we.copy(R.boundingSphere.center)):(x.boundingSphere===null&&x.computeBoundingSphere(),we.copy(x.boundingSphere.center)),we.applyMatrix4(R.matrixWorld).applyMatrix4(Ae)),Array.isArray(k)){const B=x.groups;for(let $=0,se=B.length;$<se;$++){const Y=B[$],ve=k[Y.materialIndex];ve&&ve.visible&&m.push(R,x,ve,Q,we.z,Y)}}else k.visible&&m.push(R,x,k,Q,we.z,null)}}const he=R.children;for(let x=0,k=he.length;x<k;x++)Ge(he[x],V,Q,Z)}function Gt(R,V,Q,Z){const H=R.opaque,he=R.transmissive,x=R.transparent;p.setupLightsView(Q),ce===!0&&Be.setGlobalState(v.clippingPlanes,Q),Z&&Ie.viewport(L.copy(Z)),H.length>0&&Pt(H,V,Q),he.length>0&&Pt(he,V,Q),x.length>0&&Pt(x,V,Q),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function ft(R,V,Q,Z){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new ko(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?ml:Ji,minFilter:mr,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));const he=p.state.transmissionRenderTarget[Z.id],x=Z.viewport||L;he.setSize(x.z*v.transmissionResolutionScale,x.w*v.transmissionResolutionScale);const k=v.getRenderTarget();v.setRenderTarget(he),v.getClearColor(O),T=v.getClearAlpha(),T<1&&v.setClearColor(16777215,.5),v.clear(),at&&le.render(Q);const B=v.toneMapping;v.toneMapping=Yr;const $=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),ce===!0&&Be.setGlobalState(v.clippingPlanes,Z),Pt(R,Q,Z),Oe.updateMultisampleRenderTarget(he),Oe.updateRenderTargetMipmap(he),et.has("WEBGL_multisampled_render_to_texture")===!1){let se=!1;for(let Y=0,ve=V.length;Y<ve;Y++){const Fe=V[Y],tt=Fe.object,Ye=Fe.geometry,_t=Fe.material,je=Fe.group;if(_t.side===vi&&tt.layers.test(Z.layers)){const tn=_t.side;_t.side=jn,_t.needsUpdate=!0,Kt(tt,Q,Z,Ye,_t,je),_t.side=tn,_t.needsUpdate=!0,se=!0}}se===!0&&(Oe.updateMultisampleRenderTarget(he),Oe.updateRenderTargetMipmap(he))}v.setRenderTarget(k),v.setClearColor(O,T),$!==void 0&&(Z.viewport=$),v.toneMapping=B}function Pt(R,V,Q){const Z=V.isScene===!0?V.overrideMaterial:null;for(let H=0,he=R.length;H<he;H++){const x=R[H],k=x.object,B=x.geometry,$=x.group;let se=x.material;se.allowOverride===!0&&Z!==null&&(se=Z),k.layers.test(Q.layers)&&Kt(k,V,Q,B,se,$)}}function Kt(R,V,Q,Z,H,he){R.onBeforeRender(v,V,Q,Z,H,he),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(v,V,Q,Z,R,he),H.transparent===!0&&H.side===vi&&H.forceSinglePass===!1?(H.side=jn,H.needsUpdate=!0,v.renderBufferDirect(Q,V,Z,H,R,he),H.side=br,H.needsUpdate=!0,v.renderBufferDirect(Q,V,Z,H,R,he),H.side=vi):v.renderBufferDirect(Q,V,Z,H,R,he),R.onAfterRender(v,V,Q,Z,H,he)}function Tt(R,V,Q){V.isScene!==!0&&(V=st);const Z=ke.get(R),H=p.state.lights,he=p.state.shadowsArray,x=H.state.version,k=re.getParameters(R,H.state,he,V,Q),B=re.getProgramCacheKey(k);let $=Z.programs;Z.environment=R.isMeshStandardMaterial?V.environment:null,Z.fog=V.fog,Z.envMap=(R.isMeshStandardMaterial?I:Et).get(R.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&R.envMap===null?V.environmentRotation:R.envMapRotation,$===void 0&&(R.addEventListener("dispose",Ue),$=new Map,Z.programs=$);let se=$.get(B);if(se!==void 0){if(Z.currentProgram===se&&Z.lightsStateVersion===x)return ct(R,k),se}else k.uniforms=re.getUniforms(R),R.onBeforeCompile(k,v),se=re.acquireProgram(k,B),$.set(B,se),Z.uniforms=k.uniforms;const Y=Z.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Y.clippingPlanes=Be.uniform),ct(R,k),Z.needsLights=fn(R),Z.lightsStateVersion=x,Z.needsLights&&(Y.ambientLightColor.value=H.state.ambient,Y.lightProbe.value=H.state.probe,Y.directionalLights.value=H.state.directional,Y.directionalLightShadows.value=H.state.directionalShadow,Y.spotLights.value=H.state.spot,Y.spotLightShadows.value=H.state.spotShadow,Y.rectAreaLights.value=H.state.rectArea,Y.ltc_1.value=H.state.rectAreaLTC1,Y.ltc_2.value=H.state.rectAreaLTC2,Y.pointLights.value=H.state.point,Y.pointLightShadows.value=H.state.pointShadow,Y.hemisphereLights.value=H.state.hemi,Y.directionalShadowMap.value=H.state.directionalShadowMap,Y.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Y.spotShadowMap.value=H.state.spotShadowMap,Y.spotLightMatrix.value=H.state.spotLightMatrix,Y.spotLightMap.value=H.state.spotLightMap,Y.pointShadowMap.value=H.state.pointShadowMap,Y.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=se,Z.uniformsList=null,se}function Lt(R){if(R.uniformsList===null){const V=R.currentProgram.getUniforms();R.uniformsList=_c.seqWithValue(V.seq,R.uniforms)}return R.uniformsList}function ct(R,V){const Q=ke.get(R);Q.outputColorSpace=V.outputColorSpace,Q.batching=V.batching,Q.batchingColor=V.batchingColor,Q.instancing=V.instancing,Q.instancingColor=V.instancingColor,Q.instancingMorph=V.instancingMorph,Q.skinning=V.skinning,Q.morphTargets=V.morphTargets,Q.morphNormals=V.morphNormals,Q.morphColors=V.morphColors,Q.morphTargetsCount=V.morphTargetsCount,Q.numClippingPlanes=V.numClippingPlanes,Q.numIntersection=V.numClipIntersection,Q.vertexAlphas=V.vertexAlphas,Q.vertexTangents=V.vertexTangents,Q.toneMapping=V.toneMapping}function Dn(R,V,Q,Z,H){V.isScene!==!0&&(V=st),Oe.resetTextureUnits();const he=V.fog,x=Z.isMeshStandardMaterial?V.environment:null,k=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Xn,B=(Z.isMeshStandardMaterial?I:Et).get(Z.envMap||x),$=Z.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,se=!!Q.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Y=!!Q.morphAttributes.position,ve=!!Q.morphAttributes.normal,Fe=!!Q.morphAttributes.color;let tt=Yr;Z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(tt=v.toneMapping);const Ye=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,_t=Ye!==void 0?Ye.length:0,je=ke.get(Z),tn=p.state.lights;if(ce===!0&&(Pe===!0||R!==y)){const pn=R===y&&Z.id===w;Be.setState(Z,R,pn)}let ot=!1;Z.version===je.__version?(je.needsLights&&je.lightsStateVersion!==tn.state.version||je.outputColorSpace!==k||H.isBatchedMesh&&je.batching===!1||!H.isBatchedMesh&&je.batching===!0||H.isBatchedMesh&&je.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&je.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&je.instancing===!1||!H.isInstancedMesh&&je.instancing===!0||H.isSkinnedMesh&&je.skinning===!1||!H.isSkinnedMesh&&je.skinning===!0||H.isInstancedMesh&&je.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&je.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&je.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&je.instancingMorph===!1&&H.morphTexture!==null||je.envMap!==B||Z.fog===!0&&je.fog!==he||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==Be.numPlanes||je.numIntersection!==Be.numIntersection)||je.vertexAlphas!==$||je.vertexTangents!==se||je.morphTargets!==Y||je.morphNormals!==ve||je.morphColors!==Fe||je.toneMapping!==tt||je.morphTargetsCount!==_t)&&(ot=!0):(ot=!0,je.__version=Z.version);let lt=je.currentProgram;ot===!0&&(lt=Tt(Z,V,H));let Vt=!1,Ut=!1,Zt=!1;const xt=lt.getUniforms(),hn=je.uniforms;if(Ie.useProgram(lt.program)&&(Vt=!0,Ut=!0,Zt=!0),Z.id!==w&&(w=Z.id,Ut=!0),Vt||y!==R){Ie.buffers.depth.getReversed()?(_e.copy(R.projectionMatrix),By(_e),zy(_e),xt.setValue(F,"projectionMatrix",_e)):xt.setValue(F,"projectionMatrix",R.projectionMatrix),xt.setValue(F,"viewMatrix",R.matrixWorldInverse);const In=xt.map.cameraPosition;In!==void 0&&In.setValue(F,Ze.setFromMatrixPosition(R.matrixWorld)),K.logarithmicDepthBuffer&&xt.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&xt.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,Ut=!0,Zt=!0)}if(H.isSkinnedMesh){xt.setOptional(F,H,"bindMatrix"),xt.setOptional(F,H,"bindMatrixInverse");const pn=H.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),xt.setValue(F,"boneTexture",pn.boneTexture,Oe))}H.isBatchedMesh&&(xt.setOptional(F,H,"batchingTexture"),xt.setValue(F,"batchingTexture",H._matricesTexture,Oe),xt.setOptional(F,H,"batchingIdTexture"),xt.setValue(F,"batchingIdTexture",H._indirectTexture,Oe),xt.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&xt.setValue(F,"batchingColorTexture",H._colorsTexture,Oe));const nn=Q.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&be.update(H,Q,lt),(Ut||je.receiveShadow!==H.receiveShadow)&&(je.receiveShadow=H.receiveShadow,xt.setValue(F,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(hn.envMap.value=B,hn.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&V.environment!==null&&(hn.envMapIntensity.value=V.environmentIntensity),Ut&&(xt.setValue(F,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Nt(hn,Zt),he&&Z.fog===!0&&ee.refreshFogUniforms(hn,he),ee.refreshMaterialUniforms(hn,Z,q,J,p.state.transmissionRenderTarget[R.id]),_c.upload(F,Lt(je),hn,Oe)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(_c.upload(F,Lt(je),hn,Oe),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&xt.setValue(F,"center",H.center),xt.setValue(F,"modelViewMatrix",H.modelViewMatrix),xt.setValue(F,"normalMatrix",H.normalMatrix),xt.setValue(F,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const pn=Z.uniformsGroups;for(let In=0,qo=pn.length;In<qo;In++){const ir=pn[In];U.update(ir,lt),U.bind(ir,lt)}}return lt}function Nt(R,V){R.ambientLightColor.needsUpdate=V,R.lightProbe.needsUpdate=V,R.directionalLights.needsUpdate=V,R.directionalLightShadows.needsUpdate=V,R.pointLights.needsUpdate=V,R.pointLightShadows.needsUpdate=V,R.spotLights.needsUpdate=V,R.spotLightShadows.needsUpdate=V,R.rectAreaLights.needsUpdate=V,R.hemisphereLights.needsUpdate=V}function fn(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,V,Q){const Z=ke.get(R);Z.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),ke.get(R.texture).__webglTexture=V,ke.get(R.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Q,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,V){const Q=ke.get(R);Q.__webglFramebuffer=V,Q.__useDefaultFramebuffer=V===void 0};const xn=F.createFramebuffer();this.setRenderTarget=function(R,V=0,Q=0){P=R,C=V,E=Q;let Z=!0,H=null,he=!1,x=!1;if(R){const B=ke.get(R);if(B.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(F.FRAMEBUFFER,null),Z=!1;else if(B.__webglFramebuffer===void 0)Oe.setupRenderTarget(R);else if(B.__hasExternalTextures)Oe.rebindTextures(R,ke.get(R.texture).__webglTexture,ke.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Y=R.depthTexture;if(B.__boundDepthTexture!==Y){if(Y!==null&&ke.has(Y)&&(R.width!==Y.image.width||R.height!==Y.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(R)}}const $=R.texture;($.isData3DTexture||$.isDataArrayTexture||$.isCompressedArrayTexture)&&(x=!0);const se=ke.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(se[V])?H=se[V][Q]:H=se[V],he=!0):R.samples>0&&Oe.useMultisampledRTT(R)===!1?H=ke.get(R).__webglMultisampledFramebuffer:Array.isArray(se)?H=se[Q]:H=se,L.copy(R.viewport),D.copy(R.scissor),z=R.scissorTest}else L.copy(j).multiplyScalar(q).floor(),D.copy(We).multiplyScalar(q).floor(),z=Je;if(Q!==0&&(H=xn),Ie.bindFramebuffer(F.FRAMEBUFFER,H)&&Z&&Ie.drawBuffers(R,H),Ie.viewport(L),Ie.scissor(D),Ie.setScissorTest(z),he){const B=ke.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+V,B.__webglTexture,Q)}else if(x){const B=ke.get(R.texture),$=V;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,B.__webglTexture,Q,$)}else if(R!==null&&Q!==0){const B=ke.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,B.__webglTexture,Q)}w=-1},this.readRenderTargetPixels=function(R,V,Q,Z,H,he,x,k=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let B=ke.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&x!==void 0&&(B=B[x]),B){Ie.bindFramebuffer(F.FRAMEBUFFER,B);try{const $=R.textures[k],se=$.format,Y=$.type;if(!K.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Y)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=R.width-Z&&Q>=0&&Q<=R.height-H&&(R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+k),F.readPixels(V,Q,Z,H,Se.convert(se),Se.convert(Y),he))}finally{const $=P!==null?ke.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(F.FRAMEBUFFER,$)}}},this.readRenderTargetPixelsAsync=async function(R,V,Q,Z,H,he,x,k=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let B=ke.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&x!==void 0&&(B=B[x]),B)if(V>=0&&V<=R.width-Z&&Q>=0&&Q<=R.height-H){Ie.bindFramebuffer(F.FRAMEBUFFER,B);const $=R.textures[k],se=$.format,Y=$.type;if(!K.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Y))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ve=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ve),F.bufferData(F.PIXEL_PACK_BUFFER,he.byteLength,F.STREAM_READ),R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+k),F.readPixels(V,Q,Z,H,Se.convert(se),Se.convert(Y),0);const Fe=P!==null?ke.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(F.FRAMEBUFFER,Fe);const tt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ky(F,tt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ve),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,he),F.deleteBuffer(ve),F.deleteSync(tt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,V=null,Q=0){const Z=Math.pow(2,-Q),H=Math.floor(R.image.width*Z),he=Math.floor(R.image.height*Z),x=V!==null?V.x:0,k=V!==null?V.y:0;Oe.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,x,k,H,he),Ie.unbindTexture()};const Wt=F.createFramebuffer(),Ct=F.createFramebuffer();this.copyTextureToTexture=function(R,V,Q=null,Z=null,H=0,he=null){he===null&&(H!==0?(Ms("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=H,H=0):he=0);let x,k,B,$,se,Y,ve,Fe,tt;const Ye=R.isCompressedTexture?R.mipmaps[he]:R.image;if(Q!==null)x=Q.max.x-Q.min.x,k=Q.max.y-Q.min.y,B=Q.isBox3?Q.max.z-Q.min.z:1,$=Q.min.x,se=Q.min.y,Y=Q.isBox3?Q.min.z:0;else{const nn=Math.pow(2,-H);x=Math.floor(Ye.width*nn),k=Math.floor(Ye.height*nn),R.isDataArrayTexture?B=Ye.depth:R.isData3DTexture?B=Math.floor(Ye.depth*nn):B=1,$=0,se=0,Y=0}Z!==null?(ve=Z.x,Fe=Z.y,tt=Z.z):(ve=0,Fe=0,tt=0);const _t=Se.convert(V.format),je=Se.convert(V.type);let tn;V.isData3DTexture?(Oe.setTexture3D(V,0),tn=F.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Oe.setTexture2DArray(V,0),tn=F.TEXTURE_2D_ARRAY):(Oe.setTexture2D(V,0),tn=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,V.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,V.unpackAlignment);const ot=F.getParameter(F.UNPACK_ROW_LENGTH),lt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Vt=F.getParameter(F.UNPACK_SKIP_PIXELS),Ut=F.getParameter(F.UNPACK_SKIP_ROWS),Zt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ye.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ye.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,$),F.pixelStorei(F.UNPACK_SKIP_ROWS,se),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Y);const xt=R.isDataArrayTexture||R.isData3DTexture,hn=V.isDataArrayTexture||V.isData3DTexture;if(R.isDepthTexture){const nn=ke.get(R),pn=ke.get(V),In=ke.get(nn.__renderTarget),qo=ke.get(pn.__renderTarget);Ie.bindFramebuffer(F.READ_FRAMEBUFFER,In.__webglFramebuffer),Ie.bindFramebuffer(F.DRAW_FRAMEBUFFER,qo.__webglFramebuffer);for(let ir=0;ir<B;ir++)xt&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.get(R).__webglTexture,H,Y+ir),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.get(V).__webglTexture,he,tt+ir)),F.blitFramebuffer($,se,x,k,ve,Fe,x,k,F.DEPTH_BUFFER_BIT,F.NEAREST);Ie.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||R.isRenderTargetTexture||ke.has(R)){const nn=ke.get(R),pn=ke.get(V);Ie.bindFramebuffer(F.READ_FRAMEBUFFER,Wt),Ie.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ct);for(let In=0;In<B;In++)xt?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,nn.__webglTexture,H,Y+In):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,nn.__webglTexture,H),hn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,pn.__webglTexture,he,tt+In):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pn.__webglTexture,he),H!==0?F.blitFramebuffer($,se,x,k,ve,Fe,x,k,F.COLOR_BUFFER_BIT,F.NEAREST):hn?F.copyTexSubImage3D(tn,he,ve,Fe,tt+In,$,se,x,k):F.copyTexSubImage2D(tn,he,ve,Fe,$,se,x,k);Ie.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else hn?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(tn,he,ve,Fe,tt,x,k,B,_t,je,Ye.data):V.isCompressedArrayTexture?F.compressedTexSubImage3D(tn,he,ve,Fe,tt,x,k,B,_t,Ye.data):F.texSubImage3D(tn,he,ve,Fe,tt,x,k,B,_t,je,Ye):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,he,ve,Fe,x,k,_t,je,Ye.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,he,ve,Fe,Ye.width,Ye.height,_t,Ye.data):F.texSubImage2D(F.TEXTURE_2D,he,ve,Fe,x,k,_t,je,Ye);F.pixelStorei(F.UNPACK_ROW_LENGTH,ot),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,lt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Vt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ut),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Zt),he===0&&V.generateMipmaps&&F.generateMipmap(tn),Ie.unbindTexture()},this.copyTextureToTexture3D=function(R,V,Q=null,Z=null,H=0){return Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,V,Q,Z,H)},this.initRenderTarget=function(R){ke.get(R).__webglFramebuffer===void 0&&Oe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Oe.setTextureCube(R,0):R.isData3DTexture?Oe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Oe.setTexture2DArray(R,0):Oe.setTexture2D(R,0),Ie.unbindTexture()},this.resetState=function(){C=0,E=0,P=null,Ie.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}}function FE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function ys(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),o=Math.round(r.b),s=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+o+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+o+","+s+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+o+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+o+","+s+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+o+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+o+",a:"+s+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+s+"}"}return"unknown format"}var cm=Array.prototype.forEach,da=Array.prototype.slice,de={BREAK:{},extend:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=da.call(arguments);return function(){for(var t=da.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(cm&&e.forEach&&e.forEach===cm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,o=void 0;for(i=0,o=e.length;i<o;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var s in e)if(t.call(n,e[s],s)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var o=this,s=arguments;function a(){i=null,n||e.apply(o,s)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(o,s)}},toArray:function(e){return e.toArray?e.toArray():da.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},kE=[{litmus:de.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:ys},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:ys},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:ys},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:ys}}},{litmus:de.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:de.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:de.isObject,conversions:{RGBA_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)&&de.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)&&de.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],fa=void 0,Yl=void 0,ef=function(){Yl=!1;var e=arguments.length>1?de.toArray(arguments):arguments[0];return de.each(kE,function(t){if(t.litmus(e))return de.each(t.conversions,function(n,i){if(fa=n.read(e),Yl===!1&&fa!==!1)return Yl=fa,fa.conversionName=i,fa.conversion=n,de.BREAK}),de.BREAK}),Yl},um=void 0,Ic={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,o=e/60-Math.floor(e/60),s=n*(1-t),a=n*(1-o*t),l=n*(1-(1-o)*t),c=[[n,l,s],[a,n,s],[s,n,l],[s,a,n],[l,s,n],[n,s,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),o=Math.max(e,t,n),s=o-i,a=void 0,l=void 0;if(o!==0)l=s/o;else return{h:NaN,s:0,v:0};return e===o?a=(t-n)/s:t===o?a=2+(n-e)/s:a=4+(e-t)/s,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:o/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(um=t*8)|e&~(255<<um)}},BE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Bi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},zi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Jr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:r(o,t,n)}else{if("value"in i)return i.value;var s=i.get;return s===void 0?void 0:s.call(n)}},io=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},ro=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},vn=function(){function r(){if(Bi(this,r),this.__state=ef.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return zi(r,[{key:"toString",value:function(){return ys(this)}},{key:"toHexString",value:function(){return ys(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function sh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(vn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(vn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function ah(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(vn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(vn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}vn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ic.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")de.extend(r.__state,Ic.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};vn.recalculateHSV=function(r){var e=Ic.rgb_to_hsv(r.r,r.g,r.b);de.extend(r.__state,{s:e.s,v:e.v}),de.isNaN(e.h)?de.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};vn.COMPONENTS=["r","g","b","h","s","v","hex","a"];sh(vn.prototype,"r",2);sh(vn.prototype,"g",1);sh(vn.prototype,"b",0);ah(vn.prototype,"h");ah(vn.prototype,"s");ah(vn.prototype,"v");Object.defineProperty(vn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(vn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ic.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Wo=function(){function r(e,t){Bi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return zi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),zE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},g_={};de.each(zE,function(r,e){de.each(r,function(t){g_[t]=e})});var HE=/(\d+(\.\d+)?)px/;function Hi(r){if(r==="0"||de.isUndefined(r))return 0;var e=r.match(HE);return de.isNull(e)?0:parseFloat(e[1])}var te={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,o=t;de.isUndefined(o)&&(o=!0),de.isUndefined(i)&&(i=!0),e.style.position="absolute",o&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var o=n||{},s=g_[t];if(!s)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(s);switch(s){case"MouseEvents":{var l=o.x||o.clientX||0,c=o.y||o.clientY||0;a.initMouseEvent(t,o.bubbles||!1,o.cancelable||!0,window,o.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;de.defaults(o,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,o.bubbles||!1,o.cancelable,window,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.keyCode,o.charCode);break}default:{a.initEvent(t,o.bubbles||!1,o.cancelable||!0);break}}de.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var o=i||!1;return e.addEventListener?e.addEventListener(t,n,o):e.attachEvent&&e.attachEvent("on"+t,n),te},unbind:function(e,t,n,i){var o=i||!1;return e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent&&e.detachEvent("on"+t,n),te},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return te},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return te},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Hi(t["border-left-width"])+Hi(t["border-right-width"])+Hi(t["padding-left"])+Hi(t["padding-right"])+Hi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Hi(t["border-top-width"])+Hi(t["border-bottom-width"])+Hi(t["padding-top"])+Hi(t["padding-bottom"])+Hi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},__=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function s(){o.setValue(!o.__prev)}return te.bind(i.__checkbox,"change",s,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return zi(e,[{key:"setValue",value:function(n){var i=Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Wo),VE=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i,a=o;if(o.__select=document.createElement("select"),de.isArray(s)){var l={};de.each(s,function(c){l[c]=c}),s=l}return de.each(s,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),o.updateDisplay(),te.bind(o.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),o.domElement.appendChild(o.__select),o}return zi(e,[{key:"setValue",value:function(n){var i=Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return te.isActive(this.__select)?this:(this.__select.value=this.getValue(),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Wo),GE=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;function s(){o.setValue(o.__input.value)}function a(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),te.bind(i.__input,"keyup",s),te.bind(i.__input,"change",s),te.bind(i.__input,"blur",a),te.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return zi(e,[{key:"updateDisplay",value:function(){return te.isActive(this.__input)||(this.__input.value=this.getValue()),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Wo);function dm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var v_=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i||{};return o.__min=s.min,o.__max=s.max,o.__step=s.step,de.isUndefined(o.__step)?o.initialValue===0?o.__impliedStep=1:o.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(o.initialValue))/Math.LN10))/10:o.__impliedStep=o.__step,o.__precision=dm(o.__impliedStep),o}return zi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=dm(n),this}}]),e}(Wo);function WE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Oc=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));o.__truncationSuspended=!1;var s=o,a=void 0;function l(){var _=parseFloat(s.__input.value);de.isNaN(_)||s.setValue(_)}function c(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}function u(){c()}function d(_){var g=a-_.clientY;s.setValue(s.getValue()+g*s.__impliedStep),a=_.clientY}function f(){te.unbind(window,"mousemove",d),te.unbind(window,"mouseup",f),c()}function h(_){te.bind(window,"mousemove",d),te.bind(window,"mouseup",f),a=_.clientY}return o.__input=document.createElement("input"),o.__input.setAttribute("type","text"),te.bind(o.__input,"change",l),te.bind(o.__input,"blur",u),te.bind(o.__input,"mousedown",h),te.bind(o.__input,"keydown",function(_){_.keyCode===13&&(s.__truncationSuspended=!0,this.blur(),s.__truncationSuspended=!1,c())}),o.updateDisplay(),o.domElement.appendChild(o.__input),o}return zi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():WE(this.getValue(),this.__precision),Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_);function fm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var tf=function(r){io(e,r);function e(t,n,i,o,s){Bi(this,e);var a=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:o,step:s})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),te.bind(a.__background,"mousedown",c),te.bind(a.__background,"touchstart",f),te.addClass(a.__background,"slider"),te.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),te.bind(window,"mousemove",u),te.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(fm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){te.unbind(window,"mousemove",u),te.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(te.bind(window,"touchmove",h),te.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(fm(m,p.left,p.right,l.__min,l.__max))}function _(){te.unbind(window,"touchmove",h),te.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return zi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_),y_=function(r){io(e,r);function e(t,n,i){Bi(this,e);var o=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=o;return o.__button=document.createElement("div"),o.__button.innerHTML=i===void 0?"Fire":i,te.bind(o.__button,"click",function(a){return a.preventDefault(),s.fire(),!1}),te.addClass(o.__button,"button"),o.domElement.appendChild(o.__button),o}return zi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Wo),nf=function(r){io(e,r);function e(t,n){Bi(this,e);var i=ro(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new vn(i.getValue()),i.__temp=new vn(0);var o=i;i.domElement=document.createElement("div"),te.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",te.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),te.bind(i.__input,"blur",d),te.bind(i.__selector,"mousedown",function(){te.addClass(this,"drag").bind(window,"mouseup",function(){te.removeClass(o.__selector,"drag")})}),te.bind(i.__selector,"touchstart",function(){te.addClass(this,"drag").bind(window,"touchend",function(){te.removeClass(o.__selector,"drag")})});var s=document.createElement("div");de.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),de.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),de.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),de.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),de.extend(s.style,{width:"100%",height:"100%",background:"none"}),hm(s,"top","rgba(0,0,0,0)","#000"),de.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),qE(i.__hue_field),de.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),te.bind(i.__saturation_field,"mousedown",a),te.bind(i.__saturation_field,"touchstart",a),te.bind(i.__field_knob,"mousedown",a),te.bind(i.__field_knob,"touchstart",a),te.bind(i.__hue_field,"mousedown",l),te.bind(i.__hue_field,"touchstart",l);function a(g){h(g),te.bind(window,"mousemove",h),te.bind(window,"touchmove",h),te.bind(window,"mouseup",c),te.bind(window,"touchend",c)}function l(g){_(g),te.bind(window,"mousemove",_),te.bind(window,"touchmove",_),te.bind(window,"mouseup",u),te.bind(window,"touchend",u)}function c(){te.unbind(window,"mousemove",h),te.unbind(window,"touchmove",h),te.unbind(window,"mouseup",c),te.unbind(window,"touchend",c),f()}function u(){te.unbind(window,"mousemove",_),te.unbind(window,"touchmove",_),te.unbind(window,"mouseup",u),te.unbind(window,"touchend",u),f()}function d(){var g=ef(this.value);g!==!1?(o.__color.__state=g,o.setValue(o.__color.toOriginal())):this.value=o.__color.toString()}function f(){o.__onFinishChange&&o.__onFinishChange.call(o,o.__color.toOriginal())}i.__saturation_field.appendChild(s),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=o.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientX,S=p.clientY,v=(b-m.left)/(m.right-m.left),M=1-(S-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),v>1?v=1:v<0&&(v=0),o.__color.v=M,o.__color.s=v,o.setValue(o.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=o.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientY,S=1-(b-m.top)/(m.bottom-m.top);return S>1?S=1:S<0&&(S=0),o.__color.h=S*360,o.setValue(o.__color.toOriginal()),!1}return i}return zi(e,[{key:"updateDisplay",value:function(){var n=ef(this.getValue());if(n!==!1){var i=!1;de.each(vn.COMPONENTS,function(a){if(!de.isUndefined(n[a])&&!de.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&de.extend(this.__color.__state,n)}de.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var o=this.__color.v<.5||this.__color.s>.5?255:0,s=255-o;de.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+o+","+o+","+o+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,hm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),de.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+o+","+o+","+o+")",textShadow:this.__input_textShadow+"rgba("+s+","+s+","+s+",.7)"})}}]),e}(Wo),XE=["-moz-","-o-","-webkit-","-ms-",""];function hm(r,e,t,n){r.style.background="",de.each(XE,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function qE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var YE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var o=n.getElementsByTagName("head")[0];try{o.appendChild(i)}catch{}}},jE=`<div id="dg-save" class="dg dialogue">

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

</div>`,$E=function(e,t){var n=e[t];return de.isArray(arguments[2])||de.isObject(arguments[2])?new VE(e,t,arguments[2]):de.isNumber(n)?de.isNumber(arguments[2])&&de.isNumber(arguments[3])?de.isNumber(arguments[4])?new tf(e,t,arguments[2],arguments[3],arguments[4]):new tf(e,t,arguments[2],arguments[3]):de.isNumber(arguments[4])?new Oc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Oc(e,t,{min:arguments[2],max:arguments[3]}):de.isString(n)?new GE(e,t):de.isFunction(n)?new y_(e,t,""):de.isBoolean(n)?new __(e,t):null};function KE(r){setTimeout(r,1e3/60)}var ZE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||KE,JE=function(){function r(){Bi(this,r),this.backgroundElement=document.createElement("div"),de.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),te.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),de.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;te.bind(this.backgroundElement,"click",function(){e.hide()})}return zi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),de.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",te.unbind(t.domElement,"webkitTransitionEnd",i),te.unbind(t.domElement,"transitionend",i),te.unbind(t.domElement,"oTransitionEnd",i)};te.bind(this.domElement,"webkitTransitionEnd",n),te.bind(this.domElement,"transitionend",n),te.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-te.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-te.getHeight(this.domElement)/2+"px"}}]),r}(),QE=FE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);YE.inject(QE);var pm="dg",mm=72,gm=20,rl="Default",Sa=function(){try{return!!window.localStorage}catch{return!1}}(),Na=void 0,_m=!0,ps=void 0,Gu=!1,x_=[],Ht=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),te.addClass(this.domElement,pm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=de.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=de.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),de.isUndefined(n.load)?n.load={preset:rl}:n.preset&&(n.load.preset=n.preset),de.isUndefined(n.parent)&&n.hideable&&x_.push(this),n.resizable=de.isUndefined(n.parent)&&n.resizable,n.autoPlace&&de.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Sa&&localStorage.getItem(ms(this,"isLocal"))==="true",o=void 0,s=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,iT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,sf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,s&&(s.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?te.addClass(t.__ul,r.CLASS_CLOSED):te.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Sa&&(i=f,f?te.bind(window,"unload",o):te.unbind(window,"unload",o),localStorage.setItem(ms(t,"isLocal"),f))}}}),de.isUndefined(n.parent)){if(this.closed=n.closed||!1,te.addClass(this.domElement,r.CLASS_MAIN),te.makeSelectable(this.domElement,!1),Sa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ms(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,te.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(te.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(te.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),te.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);te.addClass(l,"controller-name"),s=lh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};te.addClass(this.__ul,r.CLASS_CLOSED),te.addClass(s,"title"),te.bind(s,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(de.isUndefined(n.parent)&&(_m&&(ps=document.createElement("div"),te.addClass(ps,pm),te.addClass(ps,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ps),_m=!1),ps.appendChild(this.domElement),te.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||sf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},te.bind(window,"resize",this.__resizeHandler),te.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),te.bind(this.__ul,"transitionend",this.__resizeHandler),te.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&nT(this),o=function(){Sa&&localStorage.getItem(ms(t,"isLocal"))==="true"&&localStorage.setItem(ms(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=o;function u(){var d=t.getRoot();d.width+=1,de.defer(function(){d.width-=1})}n.parent||u()};Ht.toggleHide=function(){Gu=!Gu,de.each(x_,function(r){r.domElement.style.display=Gu?"none":""})};Ht.CLASS_AUTO_PLACE="a";Ht.CLASS_AUTO_PLACE_CONTAINER="ac";Ht.CLASS_MAIN="main";Ht.CLASS_CONTROLLER_ROW="cr";Ht.CLASS_TOO_TALL="taller-than-window";Ht.CLASS_CLOSED="closed";Ht.CLASS_CLOSE_BUTTON="close-button";Ht.CLASS_CLOSE_TOP="close-top";Ht.CLASS_CLOSE_BOTTOM="close-bottom";Ht.CLASS_DRAG="drag";Ht.DEFAULT_WIDTH=245;Ht.TEXT_CLOSED="Close Controls";Ht.TEXT_OPEN="Open Controls";Ht._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===mm||r.keyCode===mm)&&Ht.toggleHide()};te.bind(window,"keydown",Ht._keydownHandler,!1);de.extend(Ht.prototype,{add:function(e,t){return Ua(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ua(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;de.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ps.removeChild(this.domElement);var e=this;de.each(this.__folders,function(t){e.removeFolder(t)}),te.unbind(window,"keydown",Ht._keydownHandler,!1),vm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Ht(t);this.__folders[e]=n;var i=lh(this,n.domElement);return te.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],vm(e);var t=this;de.each(e.__folders,function(n){e.removeFolder(n)}),de.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=te.getOffset(e.__ul).top,n=0;de.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=te.getHeight(i))}),window.innerHeight-t-gm<n?(te.addClass(e.domElement,Ht.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-gm+"px"):(te.removeClass(e.domElement,Ht.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&de.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:de.debounce(function(){this.onResize()},50),remember:function(){if(de.isUndefined(Na)&&(Na=new JE,Na.domElement.innerHTML=jE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;de.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&tT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&sf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=jl(this)),e.folders={},de.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=jl(this),rf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[rl]=jl(this,!0)),this.load.remembered[e]=jl(this),this.preset=e,of(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){de.each(this.__controllers,function(t){this.getRoot().load.remembered?S_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),de.each(this.__folders,function(t){t.revert(t)}),e||rf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&w_(this.__listening)},updateDisplay:function(){de.each(this.__controllers,function(e){e.updateDisplay()}),de.each(this.__folders,function(e){e.updateDisplay()})}});function lh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function vm(r){te.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&te.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function rf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function eT(r,e,t){if(t.__li=e,t.__gui=r,de.extend(t,{options:function(s){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:a,factoryArgs:[de.toArray(arguments)]})}if(de.isArray(s)||de.isObject(s)){var l=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:l,factoryArgs:[s]})}},name:function(s){return t.__li.firstElementChild.firstElementChild.innerHTML=s,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof tf){var n=new Oc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});de.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(o){var s=t[o],a=n[o];t[o]=n[o]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),s.apply(t,l)}}),te.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Oc){var i=function(s){if(de.isNumber(t.__min)&&de.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ua(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return s};t.min=de.compose(i,t.min),t.max=de.compose(i,t.max)}else t instanceof __?(te.bind(e,"click",function(){te.fakeEvent(t.__checkbox,"click")}),te.bind(t.__checkbox,"click",function(o){o.stopPropagation()})):t instanceof y_?(te.bind(e,"click",function(){te.fakeEvent(t.__button,"click")}),te.bind(e,"mouseover",function(){te.addClass(t.__button,"hover")}),te.bind(e,"mouseout",function(){te.removeClass(t.__button,"hover")})):t instanceof nf&&(te.addClass(e,"color"),t.updateDisplay=de.compose(function(o){return e.style.borderLeftColor=t.__color.toString(),o},t.updateDisplay),t.updateDisplay());t.setValue=de.compose(function(o){return r.getRoot().__preset_select&&t.isModified()&&rf(r.getRoot(),!0),o},t.setValue)}function S_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var o=t.load.remembered,s=void 0;if(o[r.preset])s=o[r.preset];else if(o[rl])s=o[rl];else return;if(s[n]&&s[n][e.property]!==void 0){var a=s[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ua(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new nf(e,t);else{var o=[e,t].concat(n.factoryArgs);i=$E.apply(r,o)}n.before instanceof Wo&&(n.before=n.before.__li),S_(r,i),te.addClass(i.domElement,"c");var s=document.createElement("span");te.addClass(s,"property-name"),s.innerHTML=i.property;var a=document.createElement("div");a.appendChild(s),a.appendChild(i.domElement);var l=lh(r,a,n.before);return te.addClass(l,Ht.CLASS_CONTROLLER_ROW),i instanceof nf?te.addClass(l,"color"):te.addClass(l,BE(i.getValue())),eT(r,l,i),r.__controllers.push(i),i}function ms(r,e){return document.location.href+"."+e}function of(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function ym(r,e){e.style.display=r.useLocalStorage?"block":"none"}function tT(r){var e=r.__save_row=document.createElement("li");te.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),te.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",te.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",te.addClass(n,"button"),te.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",te.addClass(i,"button"),te.addClass(i,"save-as");var o=document.createElement("span");o.innerHTML="Revert",te.addClass(o,"button"),te.addClass(o,"revert");var s=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?de.each(r.load.remembered,function(d,f){of(r,f,f===r.preset)}):of(r,rl,!1),te.bind(s,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(s),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(o),Sa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ms(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),ym(r,a),te.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,ym(r,a)})}var u=document.getElementById("dg-new-constructor");te.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Na.hide()}),te.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Na.show(),u.focus(),u.select()}),te.bind(n,"click",function(){r.save()}),te.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),te.bind(o,"click",function(){r.revert()})}function nT(r){var e=void 0;r.__resize_handle=document.createElement("div"),de.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(o){return o.preventDefault(),r.width+=e-o.clientX,r.onResize(),e=o.clientX,!1}function n(){te.removeClass(r.__closeButton,Ht.CLASS_DRAG),te.unbind(window,"mousemove",t),te.unbind(window,"mouseup",n)}function i(o){return o.preventDefault(),e=o.clientX,te.addClass(r.__closeButton,Ht.CLASS_DRAG),te.bind(window,"mousemove",t),te.bind(window,"mouseup",n),!1}te.bind(r.__resize_handle,"mousedown",i),te.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function sf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function jl(r,e){var t={};return de.each(r.__rememberedObjects,function(n,i){var o={},s=r.__rememberedObjectIndecesToControllers[i];de.each(s,function(a,l){o[l]=e?a.initialValue:a.getValue()}),t[i]=o}),t}function iT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function w_(r){r.length!==0&&ZE.call(window,function(){w_(r)}),de.each(r,function(e){e.updateDisplay()})}var rT=Ht;function xm(r,e){if(e===cy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===jd||e===Wg){let t=r.getIndex();if(t===null){const s=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)s.push(l);r.setIndex(s),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===jd)for(let s=1;s<=n;s++)i.push(t.getX(0)),i.push(t.getX(s)),i.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(t.getX(s)),i.push(t.getX(s+1)),i.push(t.getX(s+2))):(i.push(t.getX(s+2)),i.push(t.getX(s+1)),i.push(t.getX(s)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=r.clone();return o.setIndex(i),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class oT extends ea{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new uT(t)}),this.register(function(t){return new dT(t)}),this.register(function(t){return new xT(t)}),this.register(function(t){return new ST(t)}),this.register(function(t){return new wT(t)}),this.register(function(t){return new hT(t)}),this.register(function(t){return new pT(t)}),this.register(function(t){return new mT(t)}),this.register(function(t){return new gT(t)}),this.register(function(t){return new cT(t)}),this.register(function(t){return new _T(t)}),this.register(function(t){return new fT(t)}),this.register(function(t){return new yT(t)}),this.register(function(t){return new vT(t)}),this.register(function(t){return new aT(t)}),this.register(function(t){return new bT(t)}),this.register(function(t){return new MT(t)})}load(e,t,n,i){const o=this;let s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){const c=Oa.extractUrlBase(e);s=Oa.resolveURL(c,this.path)}else s=Oa.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),o.manager.itemError(e),o.manager.itemEnd(e)},l=new c_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{o.parse(c,s,function(u){t(u),o.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let o;const s={},a={},l=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===b_){try{s[yt.KHR_BINARY_GLTF]=new ET(e)}catch(d){i&&i(d);return}o=JSON.parse(s[yt.KHR_BINARY_GLTF].content)}else o=JSON.parse(l.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new kT(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,s[d.name]=!0}if(o.extensionsUsed)for(let u=0;u<o.extensionsUsed.length;++u){const d=o.extensionsUsed[u],f=o.extensionsRequired||[];switch(d){case yt.KHR_MATERIALS_UNLIT:s[d]=new lT;break;case yt.KHR_DRACO_MESH_COMPRESSION:s[d]=new TT(o,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:s[d]=new AT;break;case yt.KHR_MESH_QUANTIZATION:s[d]=new CT;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(s),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,o){n.parse(e,t,i,o)})}}function sT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class aT{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const o=t.json,l=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ke(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Xn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new u_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new zx(u),c.distance=d;break;case"spot":c=new kx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),dr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class lT{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return Mo}extendParams(e,t,n){const i=[];e.color=new Ke(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const s=o.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],Xn),e.opacity=s[3]}o.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",o.baseColorTexture,Sn))}return Promise.all(i)}}class cT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class uT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){const a=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new St(a,a)}return Promise.all(o)}}class dT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name];return t.dispersion=o.dispersion!==void 0?o.dispersion:0,Promise.resolve()}}class fT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(o)}}class hT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new Ke(0,0,0),t.sheenRoughness=0,t.sheen=1;const s=i.extensions[this.name];if(s.sheenColorFactor!==void 0){const a=s.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Xn)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",s.sheenColorTexture,Sn)),s.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(o)}}class pT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(o)}}class mT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;const a=s.attenuationColor||[1,1,1];return t.attenuationColor=new Ke().setRGB(a[0],a[1],a[2],Xn),Promise.all(o)}}class gT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class _T{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",s.specularTexture));const a=s.specularColorFactor||[1,1,1];return t.specularColor=new Ke().setRGB(a[0],a[1],a[2],Xn),s.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",s.specularColorTexture,Sn)),Promise.all(o)}}class vT{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(o)}}class yT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],s=i.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(o)}}class xT{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const o=i.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,s)}}class ST{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const s=o.extensions[t],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,s.source,l)}}class wT{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const s=o.extensions[t],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,s.source,l)}}class bT{constructor(e){this.name=yt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],o=this.parser.getDependency("buffer",i.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):s.ready.then(function(){const h=new ArrayBuffer(u*d);return s.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class MT{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==mi.TRIANGLES&&c.mode!==mi.TRIANGLE_STRIP&&c.mode!==mi.TRIANGLE_FAN&&c.mode!==void 0)return null;const s=n.extensions[this.name].attributes,a=[],l={};for(const c in s)a.push(this.parser.getDependency("accessor",s[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new dt,m=new G,p=new no,b=new G(1,1,1),S=new gx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),S.setMatrixAt(v,g.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const M=l[v];S.instanceColor=new Kd(M.array,M.itemSize,M.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);jt.prototype.copy.call(S,_),this.parser.assignFinalMaterial(S),h.push(S)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const b_="glTF",ha=12,Sm={JSON:1313821514,BIN:5130562};class ET{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==b_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ha,o=new DataView(e,ha);let s=0;for(;s<i;){const a=o.getUint32(s,!0);s+=4;const l=o.getUint32(s,!0);if(s+=4,l===Sm.JSON){const c=new Uint8Array(e,ha+s,a);this.content=n.decode(c)}else if(l===Sm.BIN){const c=ha+s;this.body=e.slice(c,c+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class TT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,o=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},l={},c={};for(const u in s){const d=af[u]||u.toLowerCase();a[d]=s[u]}for(const u in e.attributes){const d=af[u]||u.toLowerCase();if(s[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Ts[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",o).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Xn,f)})})}}class AT{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class CT{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}}class M_ extends _l{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i*3+i;for(let s=0;s!==i;s++)t[s]=n[o+s];return t}interpolate_(e,t,n,i){const o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,b=1-m,S=p-f+d;for(let v=0;v!==a;v++){const M=s[g+v+a],C=s[g+v+l]*u,E=s[_+v+a],P=s[_+v]*u;o[v]=b*M+S*C+m*E+p*P}return o}}const RT=new no;class PT extends M_{interpolate_(e,t,n,i){const o=super.interpolate_(e,t,n,i);return RT.fromArray(o).normalize().toArray(o),o}}const mi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wm={9728:Wn,9729:li,9984:Ug,9985:dc,9986:ya,9987:mr},bm={33071:Fr,33648:Cc,10497:ks},Wu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},af={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ir={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},LT={CUBICSPLINE:void 0,LINEAR:nl,STEP:tl},Xu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function DT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new th({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:br})),r.DefaultMaterial}function ho(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function dr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function IT(r,e,t){let n=!1,i=!1,o=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(o=!0),n&&i&&o)break}if(!n&&!i&&!o)return Promise.resolve(r);const s=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;s.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(o){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),o&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function OT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function NT(r){let e;const t=r.extensions&&r.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qu(t.attributes):e=r.indices+":"+qu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qu(r.targets[n]);return e}function qu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function lf(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function UT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const FT=new dt;class kT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new sT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,o=!1,s=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,o=a.indexOf("Firefox")>-1,s=o?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||o&&s<98?this.textureLoader=new Ux(this.options.manager):this.textureLoader=new Gx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new c_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){const a={scene:s[0][i.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:i.asset,parser:n,userData:{}};return ho(o,a,i),dr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,o=t.length;i<o;i++){const s=t[i].joints;for(let a=0,l=s.length;a<l;a++)e[s[a]].isBone=!0}for(let i=0,o=e.length;i<o;i++){const s=e[i];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),o=(s,a)=>{const l=this.associations.get(s);l!=null&&this.associations.set(a,l);for(const[c,u]of s.children.entries())o(u,a.children[c])};return o(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const o=e(t[i]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":i=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(o,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(o,s){n.load(Oa.resolveURL(t.uri,i.path),o,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const s=Wu[i.type],a=Ts[i.componentType],l=i.normalized===!0,c=new a(i.count*s);return Promise.resolve(new It(c,s,l))}const o=[];return i.bufferView!==void 0?o.push(this.getDependency("bufferView",i.bufferView)):o.push(null),i.sparse!==void 0&&(o.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(o).then(function(s){const a=s[0],l=Wu[i.type],c=Ts[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let S=t.cache.get(b);S||(g=new c(a,p*h,i.count*h/u),S=new dx(g,h/u),t.cache.add(b,S)),m=new Zf(S,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new It(g,l,_);if(i.sparse!==void 0){const p=Wu.SCALAR,b=Ts[i.sparse.indices.componentType],S=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,M=new b(s[1],S,i.sparse.count*p),C=new c(s[2],v,i.sparse.count*l);a!==null&&(m=new It(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=M.length;E<P;E++){const w=M[E];if(m.setX(w,C[E*l]),l>=2&&m.setY(w,C[E*l+1]),l>=3&&m.setZ(w,C[E*l+2]),l>=4&&m.setW(w,C[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,s=t.images[o];let a=this.textureLoader;if(s.uri){const l=n.manager.getHandler(s.uri);l!==null&&(a=l)}return this.loadTextureImage(e,o,a)}loadTextureImage(e,t,n){const i=this,o=this.json,s=o.textures[e],a=o.images[t],l=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(o.samplers||{})[s.sampler]||{};return u.magFilter=wm[f.magFilter]||li,u.minFilter=wm[f.minFilter]||mr,u.wrapS=bm[f.wrapS]||ks,u.wrapT=bm[f.wrapT]||ks,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Wn&&u.minFilter!==li,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const s=i.images[e],a=self.URL||self.webkitURL;let l=s.uri||"",c=!1;if(s.bufferView!==void 0)l=n.getDependency("bufferView",s.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:s.mimeType});return l=a.createObjectURL(f),l});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new cn(g);m.needsUpdate=!0,f(m)}),t.load(Oa.resolveURL(d,o.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),dr(d,s),d.userData.mimeType=s.mimeType||UT(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const o=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),o.extensions[yt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=o.associations.get(s);s=o.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),o.associations.set(s,l)}}return i!==void 0&&(s.colorSpace=i),e[t]=s,s})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new o_,$i.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new r_,$i.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||o||s){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),o&&(l.vertexColors=!0),s&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return th}loadMaterial(e){const t=this,n=this.json,i=this.extensions,o=n.materials[e];let s;const a={},l=o.extensions||{},c=[];if(l[yt.KHR_MATERIALS_UNLIT]){const d=i[yt.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),c.push(d.extendParams(a,o,t))}else{const d=o.pbrMetallicRoughness||{};if(a.color=new Ke(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Xn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Sn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}o.doubleSided===!0&&(a.side=vi);const u=o.alphaMode||Xu.OPAQUE;if(u===Xu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Xu.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&s!==Mo&&(c.push(t.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new St(1,1),o.normalTexture.scale!==void 0)){const d=o.normalTexture.scale;a.normalScale.set(d,d)}if(o.occlusionTexture!==void 0&&s!==Mo&&(c.push(t.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&s!==Mo){const d=o.emissiveFactor;a.emissive=new Ke().setRGB(d[0],d[1],d[2],Xn)}return o.emissiveTexture!==void 0&&s!==Mo&&c.push(t.assignTexture(a,"emissiveMap",o.emissiveTexture,Sn)),Promise.all(c).then(function(){const d=new s(a);return o.name&&(d.name=o.name),dr(d,o),t.associations.set(d,{materials:e}),o.extensions&&ho(i,d,o),d})}createUniqueName(e){const t=Ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function o(a){return n[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Mm(l,a,t)})}const s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=NT(c),d=i[u];if(d)s.push(d.promise);else{let f;c.extensions&&c.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?f=o(c):f=Mm(new Mi,c,t),i[u]={primitive:c,promise:f},s.push(f)}}return Promise.all(s)}loadMesh(e){const t=this,n=this.json,i=this.extensions,o=n.meshes[e],s=o.primitives,a=[];for(let l=0,c=s.length;l<c;l++){const u=s[l].material===void 0?DT(this.cache):this.getDependency("material",s[l].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=s[h];let p;const b=c[h];if(m.mode===mi.TRIANGLES||m.mode===mi.TRIANGLE_STRIP||m.mode===mi.TRIANGLE_FAN||m.mode===void 0)p=o.isSkinnedMesh===!0?new hx(g,b):new Gn(g,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mi.TRIANGLE_STRIP?p.geometry=xm(p.geometry,Wg):m.mode===mi.TRIANGLE_FAN&&(p.geometry=xm(p.geometry,jd));else if(m.mode===mi.LINES)p=new yx(g,b);else if(m.mode===mi.LINE_STRIP)p=new eh(g,b);else if(m.mode===mi.LINE_LOOP)p=new xx(g,b);else if(m.mode===mi.POINTS)p=new Jd(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&OT(p,o),p.name=t.createUniqueName(o.name||"mesh_"+e),dr(p,o),m.extensions&&ho(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return o.extensions&&ho(i,d[0],o),d[0];const f=new _r;o.extensions&&ho(i,f,o),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Yn(Uy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),dr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,o=t.joints.length;i<o;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const o=i.pop(),s=i,a=[],l=[];for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d){a.push(d);const f=new dt;o!==null&&f.fromArray(o.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jf(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],o=i.name?i.name:"animation_"+e,s=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(_),u.push(g))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let b=0,S=f.length;b<S;b++){const v=f[b],M=h[b],C=_[b],E=g[b],P=m[b];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const w=n._createAnimationTracks(v,M,C,E,P);if(w)for(let y=0;y<w.length;y++)p.push(w[y])}return new Rx(o,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(o){const s=n._getNodeRef(n.meshCache,i.mesh,o);return i.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),s})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],o=n._loadNodeShallow(e),s=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)s.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([o,Promise.all(s),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,FT)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],s=o.name?i.createUniqueName(o.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),o.camera!==void 0&&a.push(i.getDependency("camera",o.camera).then(function(c){return i._getNodeRef(i.cameraCache,o.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(o.isBone===!0?u=new n_:c.length>1?u=new _r:c.length===1?u=c[0]:u=new jt,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(o.name&&(u.userData.name=o.name,u.name=s),dr(u,o),o.extensions&&ho(n,u,o),o.matrix!==void 0){const d=new dt;d.fromArray(o.matrix),u.applyMatrix4(d)}else o.translation!==void 0&&u.position.fromArray(o.translation),o.rotation!==void 0&&u.quaternion.fromArray(o.rotation),o.scale!==void 0&&u.scale.fromArray(o.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(o.mesh!==void 0&&i.meshCache.refs[o.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,o=new _r;n.name&&(o.name=i.createUniqueName(n.name)),dr(o,n),n.extensions&&ho(t,o,n);const s=n.nodes||[],a=[];for(let l=0,c=s.length;l<c;l++)a.push(i.getDependency("node",s[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)o.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof $i||f instanceof cn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(o),o})}_createAnimationTracks(e,t,n,i,o){const s=[],a=e.name?e.name:e.uuid,l=[];Ir[o.path]===Ir.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Ir[o.path]){case Ir.weights:c=Hs;break;case Ir.rotation:c=Vs;break;case Ir.translation:case Ir.scale:c=Gs;break;default:switch(n.itemSize){case 1:c=Hs;break;case 2:case 3:default:c=Gs;break}break}const u=i.interpolation!==void 0?LT[i.interpolation]:nl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Ir[o.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),s.push(_)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=lf(t.constructor),i=new Float32Array(t.length);for(let o=0,s=t.length;o<s;o++)i[o]=t[o]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Vs?PT:M_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function BT(r,e,t){const n=e.attributes,i=new Fi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new G(l[0],l[1],l[2]),new G(c[0],c[1],c[2])),a.normalized){const u=lf(Ts[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const a=new G,l=new G;for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=lf(Ts[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const s=new tr;i.getCenter(s.center),s.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=s}function Mm(r,e,t){const n=e.attributes,i=[];function o(s,a){return t.getDependency("accessor",s).then(function(l){r.setAttribute(a,l)})}for(const s in n){const a=af[s]||s.toLowerCase();a in r.attributes||i.push(o(n[s],a))}if(e.indices!==void 0&&!r.index){const s=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(s)}return Mt.workingColorSpace!==Xn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Mt.workingColorSpace}" not supported.`),dr(r,e),BT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?IT(r,e.targets,t):r})}const zT="/150-lab/assets/models/globe-hd.glb";function HT(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=12e3;function t(){const x=document.querySelector("#events");if(!x)return!0;const k=x.getBoundingClientRect(),$=window.innerHeight*1.2;return k.top>$}const n=document.getElementById("shaderBackground");if(!n)return;window.specialColorsActive=!1,window.colorPhase=1;let i,o;Xh(()=>Promise.resolve().then(()=>SA),void 0).then(x=>{i=x.default,Xh(()=>Promise.resolve().then(()=>zA),void 0).then(k=>{o=k.default,i.registerPlugin(o),s(i)})}).catch(x=>{console.error("Error loading GSAP:",x)});function s(x,k){let B,$,se,Y,ve,Fe,tt,Ye;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(T&&T.color1&&T.color2&&(B=T.color1.value.clone(),$=T.color2.value.clone(),se=T.waveSpeed.value,Y=T.waveAmplitude.value,ve=T.waveFrequency.value,Fe=T.ambientLight.value,tt=T.directionalLight.value,Ye=T.yOffset.value),x.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:ot=>{T&&T.colorDarkness&&(T.colorDarkness.value=ot.progress*2,T.colorDarkness.value>=1.95?window.colorPhase===1&&(T.color1&&T.color1.value.set(B),T.color2&&T.color2.value.set($),window.specialColorsActive=!0):B&&$&&window.colorPhase===1&&(T.color1&&T.color1.value.copy(B),T.color2&&T.color2.value.copy($),window.specialColorsActive=!1),l())}}}),setTimeout(()=>{a(x)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}x.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:ot=>{const lt=ot.progress;O&&(lt>.01&&!O.visible?(O.visible=!0,D.visible=!0,d()):lt<=.01&&O.visible&&(O.visible=!1,D.visible=!1,d()),O.visible&&(O.traverse(Vt=>{Vt.isMesh&&Vt.material&&(Vt.material.transparent=!0,Vt.material.opacity=lt)}),D.opacity=lt,u())),P&&(lt>.01&&!P.visible?(P.visible=!0,w.enabled=!0,f()):lt<=.01&&P.visible&&(P.visible=!1,w.enabled=!1,f()),E&&E.uniforms&&(lt>.01&&P.visible?(E.uniforms.startOpacity.value=w.startOpacity*lt,E.uniforms.endOpacity.value=w.endOpacity*lt):(E.uniforms.startOpacity.value=0,E.uniforms.endOpacity.value=0)))}}}),x.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:ot=>{const lt=ot.progress,Vt=.15;if(!window.particlesFullyHidden&&lt>=Vt?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&lt<Vt*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){Me&&Me.uniforms&&Me.uniforms.opacity&&(Me.uniforms.opacity.value=0,tn());return}const Zt=1-Math.min(lt/Vt,1),nn=.5*Math.pow(Zt,3);Me&&Me.uniforms&&Me.uniforms.opacity&&(Me.uniforms.opacity.value=nn,tn())}}}),x.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:ot=>{const lt=ot.progress;if(C){const xt=-322+120*(1-Math.pow(1-lt,3));if(C.position.y=xt,j&&j.__folders["Globe Model Controls"]){const hn=j.__folders["Globe Model Controls"].__folders.Position;if(hn&&hn.__controllers){for(let nn of hn.__controllers)if(nn.property==="positionY"){nn.updateDisplay();break}}}}}}}),x.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:ot=>{if(!T||!T.color1||!T.color2)return;const lt=ot.progress;console.log("Hero travel area scroll trigger firing, progress:",lt),console.log("uniforms object:",!!T),console.log("uniforms.waveSpeed:",!!T.waveSpeed),console.log("Current waveSpeed value before change:",T.waveSpeed?T.waveSpeed.value:"N/A");const Vt=2,Zt=Vt+(.2-Vt)*lt;console.log("Setting waveSpeed to:",Zt),T&&T.waveSpeed?(T.waveSpeed.value=Zt,console.log("waveSpeed value after assignment:",T.waveSpeed.value)):console.error("uniforms.waveSpeed is not available!");const xt=3,nn=xt+(1-xt)*lt;console.log("Setting waveAmplitude to:",nn),T&&T.waveAmplitude?(T.waveAmplitude.value=nn,console.log("waveAmplitude value after assignment:",T.waveAmplitude.value)):console.error("uniforms.waveAmplitude is not available!");const pn=2.2,qo=pn+(1-pn)*lt;if(console.log("Setting waveFrequency to:",qo),T&&T.waveFrequency?(T.waveFrequency.value=qo,console.log("waveFrequency value after assignment:",T.waveFrequency.value)):console.error("uniforms.waveFrequency is not available!"),po(),lt>.1){console.log("Transitioning to Phase 2 colors - hero travel area",lt);const ir=new Ke("#32c2d6"),hv=new Ke("#004199"),pv=new Ke("#ff4848"),mv=new Ke("#3f00f5"),au=Math.min(1,(lt-.1)/.9),Hh=au*au*(3-2*au),gv=ir.clone().lerp(pv,Hh),_v=hv.clone().lerp(mv,Hh);T.color1.value.copy(gv),T.color2.value.copy(_v),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c()}else console.log("Reverting to Phase 1 colors - hero travel area"),T.color1.value.set("#32c2d6"),T.color2.value.set("#004199"),window.colorPhase=1,r=Date.now(),window.specialColorsActive=!0,c()}}}),x.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:ot=>{if(!T||!T.color1||!T.color2)return;const lt=ot.progress;lt>.1?(console.log("Transitioning to Phase 3 colors - events section entering viewport"),T.color1.value.set("#dcfff6"),T.color2.value.set("#5dff9d"),T.yOffset&&(T.yOffset.value=-.05),T.ambientLight.value=.4,T.directionalLight.value=.4,console.log("PHASE 3: TEMPORARILY DISABLED waveSpeed override to test interpolation"),T.waveAmplitude.value=1.2,T.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,c(),ls(),po()):lt<=.1&&window.colorPhase===3&&(console.log("Reverting to Phase 2 colors - events section exiting viewport"),T.time.value=0,console.log("Reset time to 0 for consistent phase 2 transition behavior"),T.color1.value.set("#ff4848"),T.color2.value.set("#3f00f5"),T.yOffset&&Ye!==void 0&&(T.yOffset.value=Ye),Fe!==void 0&&(T.ambientLight.value=Fe),tt!==void 0&&(T.directionalLight.value=tt),console.log("PHASE 3 REVERT: Setting waveSpeed back to phase 2 value (0.2), waveAmplitude to 1.0, and waveFrequency to 1.0"),T.waveSpeed.value=.2,T.waveAmplitude.value=1,T.waveFrequency.value=1,window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c(),ls(),po()),l()}}}),x.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:ot=>{const Vt=1-ot.progress,Ut=Math.pow(Vt,3);O&&(O.visible=!0,O.traverse(Zt=>{Zt.isMesh&&Zt.material&&(Array.isArray(Zt.material)?Zt.material.forEach(xt=>{xt.transparent=!0,xt.opacity=Ut,xt.depthWrite=Ut>.1,xt.blending=qr,xt.needsUpdate=!0}):(Zt.material.transparent=!0,Zt.material.opacity=Ut,Zt.material.depthWrite=Ut>.1,Zt.material.blending=qr,Zt.material.needsUpdate=!0))}),Ut<.01&&(O.visible=!1),D.opacity=Ut,D.rotationPaused=Ut<.01,u()),P&&E&&E.uniforms&&(P.visible=Ut>.01,E.uniforms.startOpacity.value=w.startOpacity*Ut,E.uniforms.endOpacity.value=w.endOpacity*Ut,w.enabled=Ut>.01,f())}}}),x.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:ot=>{ot.progress<=.1&&se!==void 0&&window.colorPhase===1&&(console.log("Reverting wave parameters to original values when scrolling up past #get-involved"),console.log("GET-INVOLVED REVERT: Setting waveSpeed back to originalWaveSpeed:",se),T.waveSpeed&&(T.waveSpeed.value=se),T.waveAmplitude&&(T.waveAmplitude.value=Y),T.waveFrequency&&(T.waveFrequency.value=ve),T.ambientLight&&(T.ambientLight.value=Fe),T.directionalLight&&(T.directionalLight.value=tt),T.yOffset&&(T.yOffset.value=Ye),ls(),po())}}});function tn(ot){if(typeof j<"u"&&j&&j.__folders&&j.__folders["Particle System"]){const lt=j.__folders["Particle System"];if(lt&&lt.__controllers){for(let Vt of lt.__controllers)if(Vt.property==="value"&&Vt.object===Me.uniforms.opacity){Vt.updateDisplay();break}}}}console.log("Set up ScrollTrigger animations for shader, globe, overlay, and particles")}function a(x,k,B,$){if(!document.querySelector("#events")){console.warn("Could not find #events element for shader animation"),console.log("Waiting for DOM to be ready before trying again..."),document.addEventListener("DOMContentLoaded",()=>{a(x)});return}console.log("Events section found, setting up animation"),x.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:Y=>{T&&T.colorDarkness&&(T.colorDarkness.value=2-Y.progress*2,window.colorPhase===3?(console.log("Maintaining Phase 3 colors in events section"),T.color1&&T.color1.value.set("#dcfff6"),T.color2&&T.color2.value.set("#5dff9d"),T.ambientLight&&(T.ambientLight.value=.4),T.directionalLight&&(T.directionalLight.value=.4),T.waveSpeed&&(T.waveSpeed.value=.9),T.waveAmplitude&&(T.waveAmplitude.value=1.2),window.specialColorsActive=!0,c(),ls(),po()):window.colorPhase===2?(console.log("Maintaining Phase 2 colors - reverting from events section"),T.color1&&T.color1.value.set("#ff4848"),T.color2&&T.color2.value.set("#3f00f5"),originalAmbientLight!==void 0&&T.ambientLight&&(T.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&T.directionalLight&&(T.directionalLight.value=originalDirectionalLight),originalWaveAmplitude!==void 0&&T.waveAmplitude&&(T.waveAmplitude.value=originalWaveAmplitude),window.specialColorsActive=!0,c(),ls(),po()):(console.log("Maintaining Phase 1 colors - reverting from events section"),T.color1&&T.color1.value.set("#32c2d6"),T.color2&&T.color2.value.set("#004199"),originalAmbientLight!==void 0&&T.ambientLight&&(T.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&T.directionalLight&&(T.directionalLight.value=originalDirectionalLight),originalWaveSpeed!==void 0&&T.waveSpeed&&(T.waveSpeed.value=originalWaveSpeed),originalWaveAmplitude!==void 0&&T.waveAmplitude&&(T.waveAmplitude.value=originalWaveAmplitude),originalWaveFrequency!==void 0&&T.waveFrequency&&(T.waveFrequency.value=originalWaveFrequency),window.specialColorsActive=!0,c(),ls(),po()),l())}}})}function l(){const x=window.gui,k=window.uniforms;if(typeof x<"u"&&x&&x.__folders&&x.__folders["Color Controls"]){const B=x.__folders["Color Controls"];if(B&&B.__controllers){for(let $ of B.__controllers)if($.property==="value"&&$.object===k.colorDarkness){$.updateDisplay();break}}}}function c(){const x=window.gui,k=window.uniforms;if(typeof x<"u"&&x&&x.__folders&&x.__folders["Color Controls"]){const B=x.__folders["Color Controls"];B&&B.__controllers&&B.__controllers.forEach($=>{if($.property==="color"&&$.__color){if($.property==="color"&&$.__li&&$.__li.querySelector(".property-name").textContent==="Color 1"){const Y="#"+k.color1.value.getHexString();$.setValue(Y)}else if($.property==="color"&&$.__li&&$.__li.querySelector(".property-name").textContent==="Color 2"){const Y="#"+k.color2.value.getHexString();$.setValue(Y)}}})}}function u(){if(typeof j<"u"&&j&&j.__folders&&j.__folders["Globe Model Controls"]&&j.__folders["Globe Model Controls"].__folders&&j.__folders["Globe Model Controls"].__folders.Material){const x=j.__folders["Globe Model Controls"].__folders.Material;if(x&&x.__controllers)for(let k of x.__controllers)k.property==="opacity"&&k.updateDisplay()}}function d(){if(typeof j<"u"&&j&&j.__folders&&j.__folders["Globe Model Controls"]){const x=j.__folders["Globe Model Controls"];if(x&&x.__controllers){for(let k of x.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function f(){if(typeof j<"u"&&j&&j.__folders&&j.__folders["Gradient Overlay Controls"]){const x=j.__folders["Gradient Overlay Controls"];if(x&&x.__controllers){for(let k of x.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function h(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const _=window.innerWidth,g=h();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100vh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";const m=new UE({canvas:n,alpha:!0});m.setSize(_,g),m.setPixelRatio(window.devicePixelRatio);const p=new yp,b=new yp;let S=0;const v={zoom:2.471,zPosition:1},M=new Qc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);M.position.z=v.zPosition,M.zoom=v.zoom,M.updateProjectionMatrix();const C=new _r;C.position.y=-322,C.frustumCulled=!0,p.add(C);let E,P;const w={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function y(){E=new xi({transparent:!0,uniforms:{startOpacity:{value:w.startOpacity},endOpacity:{value:w.endOpacity},overlayColor:{value:new Ke(w.color)},offsetY:{value:w.offsetY},heightMultiplier:{value:w.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:vi});const x=window.innerHeight,k=M.right-M.left,B=M.top-M.bottom,$=x*.66*(B/x),se=new Ri(k,$);P=new Gn(se,E),P.rotation.set(0,0,0),P.position.x=0,P.position.y=w.yOffset*B,P.position.z=-100,P.frustumCulled=!1,P.renderOrder=9999,P.visible=w.enabled,p.add(P),console.log("Created gradient overlay with fixed 66% viewport height")}function L(){if(!P)return;P.rotation.set(0,0,0),P.position.x=0;const x=M.top-M.bottom;P.position.y=w.yOffset*x,P.position.z=-100}y();const D={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},z=new oT;let O;z.load(zT,x=>{O=x.scene;let B=new Fi().setFromObject(O).getCenter(new G),$=new _r;$.add(O),O.position.set(-B.x,-B.y,-B.z),O=$,O.visible=D.visible,O.frustumCulled=!0,O.traverse(ve=>{ve.isMesh&&(ve.frustumCulled=!0)}),C.add(O),O.position.set(D.positionX,D.positionY,D.positionZ),O.rotation.set(D.rotationX*Math.PI/180,D.rotationY*Math.PI/180,D.rotationZ*Math.PI/180),D.responsive?ke():(O.scale.set(D.scale,D.scale,D.scale),nt());const se=rt.addFolder("Material");let Y=0;O.traverse(ve=>{if(ve.isMesh&&ve.material){const Fe=ve.material;if(Y++,Fe.isMeshStandardMaterial||Fe.isMeshPhongMaterial){Fe.metalness!==void 0&&se.add({metalness:Fe.metalness},"metalness",0,1).name(`Metalness${Y>1?" "+Y:""}`).onChange(Ye=>{Fe.metalness=Ye}),Fe.roughness!==void 0&&se.add({roughness:Fe.roughness},"roughness",0,1).name(`Roughness${Y>1?" "+Y:""}`).onChange(Ye=>{Fe.roughness=Ye}),Fe.shininess!==void 0&&se.add({shininess:Fe.shininess},"shininess",0,100).name(`Shininess${Y>1?" "+Y:""}`).onChange(Ye=>{Fe.shininess=Ye}),se.add({opacity:Fe.opacity},"opacity",0,1).name(`Opacity${Y>1?" "+Y:""}`).onChange(Ye=>{Fe.opacity=Ye,Fe.transparent=Ye<1});const tt=Fe.emissive?"#"+Fe.emissive.getHexString():"#000000";se.addColor({color:tt},"color").name(`Emissive Color${Y>1?" "+Y:""}`).onChange(Ye=>{Fe.emissive&&Fe.emissive.set(Ye)})}}}),console.log("Globe model loaded successfully")},x=>{console.log(`Globe model ${x.loaded/x.total*100}% loaded`)},x=>{console.error("Error loading globe model:",x)}),window.uniforms={time:{value:0},resolution:{value:new St(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new Ke(3326678)},color2:{value:new Ke(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:0},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.6},flowDirection:{value:new St(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new G(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const T=window.uniforms,W=`
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
  `,q=new Ri(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),pe=new xi({vertexShader:W,fragmentShader:J,uniforms:T,transparent:!0,side:vi}),N=new Gn(q,pe);p.add(N),window.gui=new rT({width:300,closed:!0});const j=window.gui;j.domElement.style.position="absolute",j.domElement.style.top="10px",j.domElement.style.right="10px";const We=j.domElement.querySelector(".close-button");We&&(We.innerHTML="Open Controls",We.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=j.closed?"Open Controls":"Close Controls"},50)}));const Je=j.addFolder("Camera Controls");Je.add(v,"zoom",.1,5).name("Zoom Level").step(.001).onChange(x=>{M.zoom=x,M.updateProjectionMatrix()}),Je.close();const ne=j.addFolder("Animation Speed Controls");ne.add(T.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(x=>{T.mainSpeed.value=x}),ne.add(T.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(x=>{T.waveSpeed.value=x}),ne.add(T.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(x=>{T.noiseSpeed.value=x}),ne.add(T.colorCycleSpeed,"value",1e-4,5).name("Color Cycle Speed").step(1e-4).onChange(x=>{T.colorCycleSpeed.value=x}),ne.open();const ce=j.addFolder("Color Controls"),Pe="#"+T.color1.value.getHexString(),_e="#"+T.color2.value.getHexString();ce.addColor({color:Pe},"color").name("Color 1").onChange(x=>{typeof x=="string"?T.color1.value.set(x):T.color1.value.setRGB(x.r/255,x.g/255,x.b/255)}),ce.addColor({color:_e},"color").name("Color 2").onChange(x=>{typeof x=="string"?T.color2.value.set(x):T.color2.value.setRGB(x.r/255,x.g/255,x.b/255)}),ce.add(T.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(x=>{T.colorDarkness.value=x}),ce.add(T.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(x=>{T.colorWaveInfluence.value=x}),ce.add(T.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(x=>{T.colorFrequencyShift.value=x}),ce.add(T.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(x=>{T.colorAmplitudeEffect.value=x}),ce.open();const Ae=j.addFolder("Wave Controls");Ae.add(T.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(x=>{T.waveAmplitude.value=x}),Ae.add(T.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(x=>{T.waveFrequency.value=x}),Ae.add(T.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(x=>{T.waveDepth.value=x}),Ae.add(T.noiseScale,"value",0,5).name("Noise Scale").onChange(x=>{T.noiseScale.value=x}),Ae.add(T.noiseInfluence,"value",0,1).name("Noise Influence").onChange(x=>{T.noiseInfluence.value=x}),Ae.add(T.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(x=>{T.layerOffset.value=x});const Ze=Ae.addFolder("Flow Direction");Ze.add(T.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(x=>{T.flowDirection.value.x=x}),Ze.add(T.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(x=>{T.flowDirection.value.y=x});const we=j.addFolder("Appearance Controls"),st=j.addFolder("Film Noise Controls");st.add(T.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(x=>{T.filmNoiseIntensity.value=x}),st.add(T.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(x=>{T.filmNoiseSpeed.value=x}),st.add(T.filmGrainSize,"value",.5,50).name("Grain Size").onChange(x=>{T.filmGrainSize.value=x}),st.add(T.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(x=>{T.filmScratchIntensity.value=x}),we.add(T.xOffset,"value",-1,1).step(.001).name("X Position").onChange(x=>{T.xOffset.value=x}),we.add(T.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(x=>{T.yOffset.value=x}),we.add(T.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(x=>{T.fadeWidth.value=x}),we.add(T.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(x=>{T.topEdgeSoftness.value=x}),we.add(T.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(x=>{T.bottomEdgeSoftness.value=x}),we.add(T.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(x=>{T.leftEdgeSoftness.value=x}),we.add(T.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(x=>{T.rightEdgeSoftness.value=x}),we.add(T.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(x=>{T.leftCornerRoundness.value=x}),we.add(T.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(x=>{T.rightCornerRoundness.value=x}),we.add(T.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(x=>{T.edgeDepth.value=x}),we.add(T.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(x=>{T.edgeContrast.value=x}),we.add(T.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(x=>{T.edgeNoiseAmount.value=x}),we.add(T.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(x=>{T.edgeNoiseScale.value=x});const at=j.addFolder("Bottom Wave Edge Controls");at.add(T.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(x=>{T.bottomWaveEnabled.value=x,O&&D.responsive&&nt()}),at.add(T.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(x=>{T.bottomWaveDepth.value=x,O&&D.responsive&&nt()}),at.add(T.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(x=>{T.bottomWaveWidth.value=x}),at.add(T.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(x=>{T.bottomWaveSpeed.value=x}),at.add(T.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(x=>{T.bottomWaveOffset.value=x});const Ne=j.addFolder("Lighting Controls");Ne.add(T.ambientLight,"value",0,1).name("Ambient Light").onChange(x=>{T.ambientLight.value=x}),Ne.add(T.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(x=>{T.directionalLight.value=x}),Ne.add(T.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(x=>{T.specularStrength.value=x}),Ne.add(T.shininess,"value",1,128).name("Shininess").onChange(x=>{T.shininess.value=x});const F=Ne.addFolder("Light Direction");F.add(T.lightDirection.value,"x",-1,1).name("X").onChange(()=>{T.lightDirection.value.normalize()}),F.add(T.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{T.lightDirection.value.normalize()}),F.add(T.lightDirection.value,"z",0,1).name("Z").onChange(()=>{T.lightDirection.value.normalize()});const rt=j.addFolder("Globe Model Controls"),et=new u_(16777215,10);et.position.set(1,1,1),p.add(et);const K=new Vx(16777215,.5);p.add(K);const Ie=rt.addFolder("Lighting");Ie.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(x=>{et.intensity=x}),et.intensity=3,Ie.add({intensity:K.intensity},"intensity",0,5).name("Ambient Light").onChange(x=>{K.intensity=x}),rt.add(D,"visible").name("Show Globe").onChange(x=>{O&&(O.visible=x)}),rt.add(D,"scale",.1,50).name("Size").step(.1).onChange(x=>{O&&(D.baseScale=x,O.scale.set(x,x,x))}),rt.add(D,"responsive").name("Responsive Size").onChange(x=>{!x&&O?O.scale.set(D.baseScale,D.baseScale,D.baseScale):x&&ke()}),rt.add({resizeGlobe:function(){O&&ke()}},"resizeGlobe").name("Force Resize"),rt.add({positionBehindWave:function(){O&&nt()}},"positionBehindWave").name("Position Behind Wave");function nt(){if(!O)return;const x=window.innerWidth,k=window.innerHeight;if(x<=640){O.position.y=192,O.position.z=-10;for(let Y=0;Y<Oe.__controllers.length;Y++){const ve=Oe.__controllers[Y];ve.property==="positionY"?ve.setValue(192):ve.property==="positionZ"&&ve.setValue(-10)}console.log("Positioned globe for mobile viewport at Y: 192, Z: -10");return}const B=T.bottomWaveEnabled.value,$=T.bottomWaveDepth.value,se=T.edgeDepth.value;if(B){const Y=k*$*se*.5,Fe=(M.top-M.bottom)/M.zoom/k,tt=-Y*Fe-k*.1*Fe,Ye=-10;O.position.y=tt,O.position.z=Ye;for(let _t=0;_t<Oe.__controllers.length;_t++){const je=Oe.__controllers[_t];je.property==="positionY"?je.setValue(tt):je.property==="positionZ"&&je.setValue(Ye)}console.log(`Positioned globe behind bottom wave at Y: ${tt.toFixed(2)}, Z: ${Ye}`)}}function ke(){if(!O||!D.responsive)return;const x=window.innerWidth,k=x*.9,B={x:O.scale.x,y:O.scale.y,z:O.scale.z};try{O.scale.set(1,1,1),O.updateMatrixWorld(!0);const $=new Fi().setFromObject(O),se=$.max.x-$.min.x;O.scale.set(B.x,B.y,B.z);const ve=(M.right-M.left)/M.zoom/x,tt=k*ve/se;O.scale.set(tt,tt,tt);for(let Ye=0;Ye<rt.__controllers.length;Ye++)if(rt.__controllers[Ye].property==="scale"){rt.__controllers[Ye].setValue(tt);break}console.log(`Updated globe size: ${k.toFixed(0)}px (90vw), Scale: ${tt.toFixed(2)}, Original width: ${se.toFixed(2)}`),nt()}catch($){console.error("Error updating globe size:",$),O.scale.set(B.x,B.y,B.z)}}const Oe=rt.addFolder("Position");Oe.add(D,"positionX",-500,500).name("X Position").step(1).onChange(x=>{O&&(O.position.x=x)}),Oe.add(D,"positionY",-500,500).name("Y Position").step(1).onChange(x=>{O&&(O.position.y=x)}),Oe.add(D,"positionZ",-500,500).name("Z Position").step(1).onChange(x=>{O&&(O.position.z=x)});const Et=rt.addFolder("Rotation");Et.add(D,"rotationX",0,360).name("X Rotation").step(1).onChange(x=>{O&&(O.rotation.x=x*Math.PI/180)}),Et.add(D,"rotationY",0,360).name("Y Rotation").step(1).onChange(x=>{O&&(O.rotation.y=x*Math.PI/180)}),Et.add(D,"rotationZ",0,360).name("Z Rotation").step(1).onChange(x=>{O&&(O.rotation.z=x*Math.PI/180)}),rt.add(D,"autoRotate").name("Auto Rotate").onChange(x=>{D.autoRotate=x}),rt.add(D,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(x=>{D.baseRotateSpeed=x}),rt.add(D,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(x=>{D.scrollRotateSpeed=x}),rt.open();const I=j.addFolder("Gradient Overlay Controls");I.add(w,"enabled").name("Show Overlay").onChange(x=>{P&&(P.visible=x)});const A=I.add(w,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(x=>{E&&(E.uniforms.startOpacity.value=x)});A.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const X=I.add(w,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(x=>{E&&(E.uniforms.endOpacity.value=x)});X.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",I.add(w,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(x=>{P&&L()}),I.add(w,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(x=>{E&&(E.uniforms.offsetY.value=x)}),I.add(w,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(x=>{E&&(E.uniforms.heightMultiplier.value=x)}),I.addColor(w,"color").name("Color").onChange(x=>{E&&E.uniforms.overlayColor.value.set(x)}),I.add({debugOverlay:function(){if(E){const x=E.uniforms.startOpacity.value,k=E.uniforms.endOpacity.value;E.uniforms.startOpacity.value=1,E.uniforms.endOpacity.value=1,E.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",P.position),console.log("Camera position:",M.position),setTimeout(()=>{E.uniforms.startOpacity.value=x,E.uniforms.endOpacity.value=k,E.uniforms.overlayColor.value.set(w.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),I.open();let ie=276,re=new Float32Array(ie*3),ee=new Float32Array(ie*3),xe=new Float32Array(ie*3),ye=0,Be=0;const oe={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let le=window.innerHeight*oe.verticalSpread;function be(){const x=new Float32Array(ie);for(let k=0;k<ie;k++){const B=k*3,$=Math.random(),se=oe.sizeMin+$*(oe.sizeMax-oe.sizeMin);x[k]=se/Me.uniforms.baseSize.value;const Y=new Ke(Ce.color),ve=.8+$*.6;xe[B]=Y.r*ve,xe[B+1]=Y.g*ve,xe[B+2]=Y.b*ve}Ee.setAttribute("size",new It(x,1)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,Ee.attributes.size.needsUpdate=!0}for(let x=0;x<ie;x++){const k=x*3;re[k]=(Math.random()-.5)*window.innerWidth,re[k+1]=(Math.random()-.5)*le+oe.verticalOffset,re[k+2]=Math.random()*500-250,ee[k]=(Math.random()-.5)*.5,ee[k+1]=(Math.random()-.5)*.5,ee[k+2]=(Math.random()-.5)*.2;const B=new Ke("#25e5ff");xe[k]=B.r,xe[k+1]=B.g,xe[k+2]=B.b}const Ee=new Mi;Ee.setAttribute("position",new It(re,3)),Ee.setAttribute("color",new It(xe,3));const Xe=Se();function Se(){const x=document.createElement("canvas");x.width=256,x.height=256;const k=x.getContext("2d"),B=k.createRadialGradient(x.width/2,x.height/2,0,x.width/2,x.height/2,x.width/2);B.addColorStop(0,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),B.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),B.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),B.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),B.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=B,k.fillRect(0,0,x.width,x.height),k.beginPath(),k.moveTo(x.width/2,x.width*.3),k.lineTo(x.width/2,x.width*.7),k.moveTo(x.width*.3,x.height/2),k.lineTo(x.width*.7,x.height/2),k.moveTo(x.width*.35,x.height*.35),k.lineTo(x.width*.65,x.height*.65),k.moveTo(x.width*.65,x.height*.35),k.lineTo(x.width*.35,x.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const $=k.createRadialGradient(x.width/2,x.height/2,x.width*.2,x.width/2,x.height/2,x.width*.7);$.addColorStop(0,"rgba(255, 255, 255, 0.3)"),$.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),$.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=$,k.fillRect(0,0,x.width,x.height);const se=new cn(x);return se.needsUpdate=!0,se}const Me=new xi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:Xe},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),U=new Jd(Ee,Me);U.frustumCulled=!0,b.add(U);const me=j.addFolder("Particle System"),ue={count:ie};me.add(ue,"count",100,1e3,10).name("Particle Count").onChange(x=>{ie=Math.floor(x);const k=new Float32Array(ie*3),B=new Float32Array(ie*3),$=new Float32Array(ie*3);for(let se=0;se<ie;se++){const Y=se*3;if(se<re.length/3)k[Y]=re[Y],k[Y+1]=re[Y+1],k[Y+2]=re[Y+2],B[Y]=ee[Y],B[Y+1]=ee[Y+1],B[Y+2]=ee[Y+2],$[Y]=xe[Y],$[Y+1]=xe[Y+1],$[Y+2]=xe[Y+2];else{k[Y]=(Math.random()-.5)*window.innerWidth,k[Y+1]=(Math.random()-.5)*le+oe.verticalOffset,k[Y+2]=Math.random()*500-250,B[Y]=(Math.random()-.5)*.5,B[Y+1]=(Math.random()-.5)*.5,B[Y+2]=(Math.random()-.5)*.2;const ve=new Ke(Ce.color);$[Y]=ve.r,$[Y+1]=ve.g,$[Y+2]=ve.b}}re=k,ee=B,xe=$,Ee.setAttribute("position",new It(re,3)),Ee.setAttribute("color",new It(xe,3)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,be()});const Ce={color:"#25e5ff"};me.addColor(Ce,"color").name("Particle Color").onChange(x=>{const k=new Ke(x);for(let B=0;B<ie;B++){const $=B*3;xe[$]=k.r,xe[$+1]=k.g,xe[$+2]=k.b}Ee.setAttribute("color",new It(xe,3)),Ee.attributes.color.needsUpdate=!0}),me.add(Me.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(x=>{be()}),me.add(Me.uniforms.opacity,"value",0,1,.1).name("Opacity"),me.add(Me.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(x=>{Me.uniforms.brightness.value=x});const fe={intensity:1.5};me.add(fe,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(x=>{Me.uniforms.opacity.value=x});const ae={enabled:!1},Ue=me.add(ae,"enabled").name("Size Attenuation").onChange(x=>{x?Me.vertexShader=`
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
        `:Me.vertexShader=`
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
        `,Me.needsUpdate=!0,be()}),ze=document.createElement("div");ze.className="gui-tooltip",ze.textContent="When enabled, particles appear smaller as they move further away",ze.style.position="absolute",ze.style.backgroundColor="rgba(0,0,0,0.8)",ze.style.color="#fff",ze.style.padding="5px",ze.style.borderRadius="3px",ze.style.fontSize="11px",ze.style.zIndex="10000",ze.style.display="none",document.body.appendChild(ze);const wt=Ue.domElement;wt.addEventListener("mouseenter",x=>{const k=wt.getBoundingClientRect();ze.style.left=k.right+"px",ze.style.top=k.top+"px",ze.style.display="block"}),wt.addEventListener("mouseleave",()=>{ze.style.display="none"});let Le=0;window.addEventListener("scroll",()=>{ye=window.scrollY});let Re=[],Qe={x:0,y:0},Te={x:0,y:0},it=0;const ge={enabled:!0,spawnRate:.455,maxParticles:120,baseSize:1.8,fadeInSpeed:.75,fadeOutSpeed:1,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffset:.22,minLifetime:1.5,maxLifetime:5},Ge=new Mi,Gt=new xi({uniforms:{baseSize:{value:ge.baseSize},map:{value:Xe},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),ft=new Jd(Ge,Gt);b.add(ft);function Pt(x,k){const B=x/window.innerWidth*2-1,$=-(k/window.innerHeight)*2+1,se=B*(M.right-M.left)/2/M.zoom,Y=$*(M.top-M.bottom)/2/M.zoom;return{x:se,y:Y}}function Kt(x,k){return{id:it++,position:{x,y:k,z:Math.random()*100-50},targetPosition:{x,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:ge.minLifetime+Math.random()*(ge.maxLifetime-ge.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function Tt(){if(Re.length===0){Ge.attributes.position&&(Ge.setAttribute("position",new It(new Float32Array(0),3)),Ge.setAttribute("color",new It(new Float32Array(0),3)),Ge.setAttribute("size",new It(new Float32Array(0),1)),Ge.setAttribute("opacity",new It(new Float32Array(0),1)));return}const x=new Float32Array(Re.length*3),k=new Float32Array(Re.length*3),B=new Float32Array(Re.length),$=new Float32Array(Re.length);for(let se=0;se<Re.length;se++){const Y=Re[se],ve=se*3;x[ve]=Y.position.x,x[ve+1]=Y.position.y,x[ve+2]=Y.position.z,k[ve]=Y.color.r,k[ve+1]=Y.color.g,k[ve+2]=Y.color.b,B[se]=Y.size,$[se]=Y.opacity}Ge.setAttribute("position",new It(x,3)),Ge.setAttribute("color",new It(k,3)),Ge.setAttribute("size",new It(B,1)),Ge.setAttribute("opacity",new It($,1)),Ge.attributes.position.needsUpdate=!0,Ge.attributes.color.needsUpdate=!0,Ge.attributes.size.needsUpdate=!0,Ge.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",x=>{if(!ge.enabled)return;Te.x=Qe.x,Te.y=Qe.y,Qe.x=x.clientX,Qe.y=x.clientY;const k=Qe.x-Te.x,B=Qe.y-Te.y;if(Math.sqrt(k*k+B*B)>1&&Re.length<ge.maxParticles&&Math.random()<ge.spawnRate){const se=Pt(Qe.x,Qe.y),Y=ge.spawnOffset*50,ve=Math.random()*Math.PI*2,Fe=Math.cos(ve)*Y*Math.random(),tt=Math.sin(ve)*Y*Math.random(),Ye=Kt(se.x+Fe,se.y+tt);Re.push(Ye)}});function Lt(){if(Re.length===0)return;const x=Pt(Qe.x,Qe.y);for(let k=Re.length-1;k>=0;k--){const B=Re[k];B.life+=.016,B.targetPosition.x=x.x,B.targetPosition.y=x.y;const $=B.trailSpeed*ge.trailLength;B.position.x+=(B.targetPosition.x-B.position.x)*$,B.position.y+=(B.targetPosition.y-B.position.y)*$,B.position.x+=(Math.random()-.5)*2*ge.jitterAmount,B.position.y+=(Math.random()-.5)*2*ge.jitterAmount;const se=B.life/B.maxLife;if(se<.15){B.fadePhase="in";const Y=se/.15,ve=1-Math.pow(1-Y,2);B.opacity=ve*ge.fadeInSpeed}else if(se<.65)B.fadePhase="hold",B.opacity=ge.fadeInSpeed;else{B.fadePhase="out";const Y=(se-.65)/.35,ve=Math.pow(1-Y,2);B.opacity=ve*ge.fadeInSpeed*ge.fadeOutSpeed}(B.life>=B.maxLife||B.opacity<=0)&&Re.splice(k,1)}Tt()}const ct=j.addFolder("Mouse Follow Particles");ct.add(ge,"enabled").name("Enable Mouse Particles").onChange(x=>{x||(Re=[],Tt())}),ct.add(ge,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(x=>{ge.spawnRate=x}),ct.add(ge,"maxParticles",10,50,1).name("Max Particles").onChange(x=>{for(ge.maxParticles=x;Re.length>x;)Re.pop();Tt()}),ct.add(ge,"baseSize",2,10,.5).name("Particle Size").onChange(x=>{Gt.uniforms.baseSize.value=x}),ct.add(ge,"trailLength",.1,1,.1).name("Trail Length").onChange(x=>{ge.trailLength=x}),ct.add(ge,"speedVariation",0,1,.1).name("Speed Variation").onChange(x=>{ge.speedVariation=x}),ct.add(ge,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(x=>{ge.jitterAmount=x}),ct.add(ge,"spawnOffset",0,1,.05).name("Spawn Offset").onChange(x=>{ge.spawnOffset=x}),ct.add(ge,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(x=>{ge.fadeInSpeed=x}),ct.add(ge,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(x=>{ge.fadeOutSpeed=x}),ct.close();function Dn(){const x=Ee.attributes.position.array,k=oe.previousOffset||0,B=oe.verticalOffset-k;oe.previousOffset=oe.verticalOffset;for(let $=0;$<ie;$++){const se=$*3;x[se+1]+=B;const Y=x[se+1]-oe.verticalOffset,ve=le/2;Y>ve?x[se+1]=-ve+oe.verticalOffset:Y<-ve&&(x[se+1]=ve+oe.verticalOffset)}Ee.attributes.position.needsUpdate=!0}function Nt(){const x=Ee.attributes.position.array,k=Ee.attributes.color.array,B=Ee.attributes.size?Ee.attributes.size.array:null;Le+=.01;const $=(ye-Be)*oe.scrollSpeed;if(Be=ye*(1-oe.damping)+Be*oe.damping,!window.particlesMovementPaused){for(let se=0;se<ie;se++){const Y=se*3,ve=B?(B[se]-oe.sizeMin)/(oe.sizeMax-oe.sizeMin):.5,Fe=oe.floatSpeed*(.5+ve*.5);x[Y]+=ee[Y]*Fe,x[Y+1]+=ee[Y+1]*Fe,x[Y+2]+=ee[Y+2]*Fe,x[Y+1]+=$*(.5+ve*.5),Math.abs(x[Y])>window.innerWidth/2&&(ee[Y]*=-1);const tt=x[Y+1]-oe.verticalOffset,Ye=le/2;tt>Ye?x[Y+1]=-Ye+oe.verticalOffset:tt<-Ye&&(x[Y+1]=Ye+oe.verticalOffset),Math.abs(x[Y+2])>250&&(ee[Y+2]*=-1)}Ee.attributes.position.needsUpdate=!0}for(let se=0;se<ie;se++){const Y=se*3,ve=B?(B[se]-oe.sizeMin)/(oe.sizeMax-oe.sizeMin):.5,Fe=new Ke(Ce.color),tt=.2*Math.sin(Le+se*.1)+.9,Ye=.8+ve*.6;k[Y]=Fe.r*tt*Ye,k[Y+1]=Fe.g*tt*Ye,k[Y+2]=Fe.b*tt*Ye}Ee.attributes.color.needsUpdate=!0,requestAnimationFrame(Nt)}Nt();function fn(){if(requestAnimationFrame(fn),T.time.value+=.001,t()&&Date.now()-r>e&&(console.log("Timeout reached while above Phase 3 trigger (12s), resetting time uniform to prevent background weirdness"),T.time.value=0,r=Date.now()),Lt(),!window.particlesFullyHidden&&Me.uniforms.opacity.value<S&&(Me.uniforms.opacity.value+=.002,Me.uniforms.opacity.value>S&&(Me.uniforms.opacity.value=S)),window.particlesFullyHidden&&Me.uniforms.opacity.value>0&&(Me.uniforms.opacity.value=0),O&&D.autoRotate&&!D.rotationPaused){const x=H?D.scrollRotateSpeed:D.baseRotateSpeed;O.rotation.y+=x*.01}P&&(P.rotation.set(0,0,0),L()),m.autoClear=!0,m.render(p,M),(!window.particlesFullyHidden||Re.length>0&&ge.enabled)&&(m.autoClear=!1,m.render(b,M))}fn(),document.addEventListener("veryEarlyParticleFade",()=>{S=.1}),document.addEventListener("particleFadeStart",()=>{S=.3}),document.addEventListener("heroAnimationComplete",()=>{S=.5});function xn(){if(P){const x=window.innerHeight,k=M.right-M.left,$=(M.top-M.bottom)/x,se=k,Y=x*.66*$;P.geometry.dispose(),P.geometry=new Ri(se,Y),P.rotation.set(0,0,0),L(),console.log("Updated overlay size to 66% viewport height")}}let Wt,Ct;function R(){const x=window.innerWidth,k=h();if(m.setSize(x,k),M.left=-x/2,M.right=x/2,M.top=k/2,M.bottom=-k/2,M.updateProjectionMatrix(),T.resolution.value.set(x,k),N.geometry.dispose(),N.geometry=new Ri(x,k,x/10,k/10),le=k*oe.verticalSpread,typeof j<"u"&&j&&j.__folders["Particle System"]){const B=j.__folders["Particle System"];if(B&&B.__controllers){for(let $=0;$<B.__controllers.length;$++)if(B.__controllers[$].property==="verticalOffset"){B.__controllers[$].min(-k*3),B.__controllers[$].max(k*2);break}}}if(O&&D.responsive){clearTimeout(Ct),Ct=setTimeout(()=>{ke()},150);for(let B=0;B<Oe.__controllers.length;B++){const $=Oe.__controllers[B];$.property==="positionX"?($.min(-x/2),$.max(x/2)):$.property==="positionY"&&($.min(-k/2),$.max(k/2))}}xn()}window.addEventListener("resize",()=>{clearTimeout(Wt),clearTimeout(Ct),O&&D.responsive&&(Ct=setTimeout(()=>{ke()},150)),Wt=setTimeout(R,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(Wt),clearTimeout(Ct),O&&D.responsive&&(Ct=setTimeout(()=>{ke()},300)),Wt=setTimeout(R,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Ct);const x=window.innerWidth,k=h();window.lastKnownDimensions||(window.lastKnownDimensions={width:x,height:k});const B=Math.abs(x-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,$=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;B>.05||$>.05?(window.lastKnownDimensions.width=x,window.lastKnownDimensions.height=k,O&&D.responsive&&(Ct=setTimeout(()=>{ke()},150)),setTimeout(R,100),console.log(`Tab refocused with significant viewport change: Width ${B.toFixed(2)}%, Height ${$.toFixed(2)}%`)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:h()}});let V=h();function Q(){const x=h();Math.abs(x-V)>50&&(R(),V=x),requestAnimationFrame(Q)}Q(),window.addEventListener("keydown",x=>{if((x.key==="+"||x.key==="=")&&(v.zoom=Math.min(v.zoom+.1,5),M.zoom=v.zoom,M.updateProjectionMatrix(),typeof j<"u"&&j&&j.__folders["Camera Controls"])){const k=j.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}if((x.key==="-"||x.key==="_")&&(v.zoom=Math.max(v.zoom-.1,.1),M.zoom=v.zoom,M.updateProjectionMatrix(),typeof j<"u"&&j&&j.__folders["Camera Controls"])){const k=j.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}}),me.add(oe,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(x=>{oe.scrollSpeed=x}),me.add(oe,"damping",.8,.99,.01).name("Scroll Damping").onChange(x=>{oe.damping=x}),me.add(oe,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(x=>{const k=le;le=window.innerHeight*x;const B=le/k,$=Ee.attributes.position.array;for(let se=0;se<ie;se++){const Y=se*3,Fe=($[Y+1]-oe.verticalOffset)*B;$[Y+1]=Fe+oe.verticalOffset,Math.abs(Fe)>le/2&&($[Y+1]=(Math.random()-.5)*le+oe.verticalOffset)}Ee.attributes.position.needsUpdate=!0}),me.add(oe,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(x=>{oe.previousOffset===void 0&&(oe.previousOffset=0),oe.verticalOffset=x,Dn()}),me.add(oe,"sizeMin",1,5,.01).name("Min Particle Size").onChange(x=>{if(oe.sizeMin=x,oe.sizeMin>=oe.sizeMax&&(oe.sizeMax=oe.sizeMin+1,typeof j<"u"&&j&&j.__folders["Particle System"])){const k=j.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMax"){k.__controllers[B].updateDisplay();break}}}be()}),me.add(oe,"sizeMax",5,10,.01).name("Max Particle Size").onChange(x=>{if(oe.sizeMax=x,oe.sizeMax<=oe.sizeMin&&(oe.sizeMin=oe.sizeMax-1,typeof j<"u"&&j&&j.__folders["Particle System"])){const k=j.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMin"){k.__controllers[B].updateDisplay();break}}}be()}),me.add(oe,"floatSpeed",.1,3,.1).name("Float Speed").onChange(x=>{oe.floatSpeed=x}),be();const Z=Ee.attributes.position.array;for(let x=0;x<ie;x++){const k=x*3;Z[k+1]=(Math.random()-.5)*le+oe.verticalOffset}Ee.attributes.position.needsUpdate=!0,me.add(Me.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(x=>{Me.uniforms.haloStrength.value=x}),me.add(Me.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(x=>{Me.uniforms.haloSize.value=x});let H=!1,he;window.addEventListener("scroll",()=>{H=!0,he&&clearTimeout(he),he=setTimeout(()=>{H=!1},150)})}function ls(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function po(){const r=window.gui;if(typeof r>"u"||!r||!r.__folders){console.log("GUI not available for wave update");return}const e=window.uniforms;if(console.log("Updating wave GUI - waveSpeed:",e.waveSpeed.value,"waveAmplitude:",e.waveAmplitude.value,"waveFrequency:",e.waveFrequency.value),console.log("Available GUI folders:",Object.keys(r.__folders)),r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];console.log("Speed Controls folder has",t.__controllers.length,"controllers");let n=!1;for(let i=0;i<t.__controllers.length;i++){const o=t.__controllers[i];if(console.log("Speed controller",i,":",o.property,o.object===e.waveSpeed?"(MATCHES waveSpeed)":""),o.property==="value"&&o.object===e.waveSpeed){console.log("SUCCESS: Updating waveSpeed GUI from",o.getValue(),"to",e.waveSpeed.value),o.setValue(e.waveSpeed.value),n=!0;break}}n||console.log("WARNING: Could not find waveSpeed controller in Animation Speed Controls folder")}else console.log("WARNING: Animation Speed Controls folder not found");if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];console.log("Wave Controls folder has",t.__controllers.length,"controllers");for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];console.log("Wave controller",n,":",i.property,i.object===e.waveAmplitude?"(MATCHES waveAmplitude)":i.object===e.waveFrequency?"(MATCHES waveFrequency)":""),i.property==="value"&&i.object===e.waveAmplitude&&(console.log("SUCCESS: Updating waveAmplitude GUI from",i.getValue(),"to",e.waveAmplitude.value),i.setValue(e.waveAmplitude.value)),i.property==="value"&&i.object===e.waveFrequency&&(console.log("SUCCESS: Updating waveFrequency GUI from",i.getValue(),"to",e.waveFrequency.value),i.setValue(e.waveFrequency.value))}}else console.log("WARNING: Wave Controls folder not found")}function fr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function E_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ui={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ws={duration:.5,overwrite:!1,delay:0},ch,Mn,Xt,Si=1e8,Bt=1/Si,cf=Math.PI*2,VT=cf/4,GT=0,T_=Math.sqrt,WT=Math.cos,XT=Math.sin,yn=function(e){return typeof e=="string"},$t=function(e){return typeof e=="function"},Mr=function(e){return typeof e=="number"},uh=function(e){return typeof e>"u"},er=function(e){return typeof e=="object"},$n=function(e){return e!==!1},dh=function(){return typeof window<"u"},$l=function(e){return $t(e)||yn(e)},A_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ln=Array.isArray,uf=/(?:-?\.?\d|\.)+/gi,C_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Yu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,R_=/[+-]=-?[.\d]+/,P_=/[^,'"\[\]\s]+/gi,qT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,qt,Vi,df,fh,di={},Nc={},L_,D_=function(e){return(Nc=Xs(e,di))&&Qn},hh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ol=function(e,t){return!t&&console.warn(e)},I_=function(e,t){return e&&(di[e]=t)&&Nc&&(Nc[e]=t)||di},sl=function(){return 0},YT={suppressEvents:!0,isStart:!0,kill:!1},vc={suppressEvents:!0,kill:!1},jT={suppressEvents:!0},ph={},jr=[],ff={},O_,ri={},ju={},Em=30,yc=[],mh="",gh=function(e){var t=e[0],n,i;if(er(t)||$t(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=yc.length;i--&&!yc[i].targetTest(t););n=yc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new r0(e[i],n)))||e.splice(i,1);return e},Po=function(e){return e._gsap||gh(wi(e))[0]._gsap},N_=function(e,t,n){return(n=e[t])&&$t(n)?e[t]():uh(n)&&e.getAttribute&&e.getAttribute(t)||n},Kn=function(e,t){return(e=e.split(",")).forEach(t)||e},Jt=function(e){return Math.round(e*1e5)/1e5||0},sn=function(e){return Math.round(e*1e7)/1e7||0},As=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},$T=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Uc=function(){var e=jr.length,t=jr.slice(0),n,i;for(ff={},jr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},U_=function(e,t,n,i){jr.length&&!Mn&&Uc(),e.render(t,n,Mn&&t<0&&(e._initted||e._startAt)),jr.length&&!Mn&&Uc()},F_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(P_).length<2?t:yn(e)?e.trim():e},k_=function(e){return e},fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},KT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Xs=function(e,t){for(var n in t)e[n]=t[n];return e},Tm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=er(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Fc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Fa=function(e){var t=e.parent||qt,n=e.keyframes?KT(Ln(e.keyframes)):fi;if($n(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ZT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},B_=function(e,t,n,i,o){var s=e[i],a;if(o)for(a=t[o];s&&s[o]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},tu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t._prev,s=t._next;o?o._next=s:e[n]===t&&(e[n]=s),s?s._prev=o:e[i]===t&&(e[i]=o),t._next=t._prev=t.parent=null},Qr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Lo=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},JT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},hf=function(e,t,n,i){return e._startAt&&(Mn?e._startAt.revert(vc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},QT=function r(e){return!e||e._ts&&r(e.parent)},Am=function(e){return e._repeat?qs(e._tTime,e=e.duration()+e._rDelay)*e:0},qs=function(e,t){var n=Math.floor(e=sn(e/t));return e&&n===e?n-1:n},kc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},nu=function(e){return e._end=sn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Bt)||0))},iu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=sn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),nu(e),n._dirty||Lo(n,e)),e},z_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=kc(e.rawTime(),t),(!t._dur||vl(0,t.totalDuration(),n)-t._tTime>Bt)&&t.render(n,!0)),Lo(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Bt}},Xi=function(e,t,n,i){return t.parent&&Qr(t),t._start=sn((Mr(n)?n:n||e!==qt?pi(e,n,t):e._time)+t._delay),t._end=sn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),B_(e,t,"_first","_last",e._sort?"_start":0),pf(t)||(e._recent=t),i||z_(e,t),e._ts<0&&iu(e,e._tTime),e},H_=function(e,t){return(di.ScrollTrigger||hh("scrollTrigger",t))&&di.ScrollTrigger.create(t,e)},V_=function(e,t,n,i,o){if(vh(e,t,o),!e._initted)return 1;if(!n&&e._pt&&!Mn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&O_!==si.frame)return jr.push(e),e._lazy=[o,i],1},e1=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},pf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},t1=function(e,t,n,i){var o=e.ratio,s=t<0||!t&&(!e._start&&e1(e)&&!(!e._initted&&pf(e))||(e._ts<0||e._dp._ts<0)&&!pf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=vl(0,e._tDur,t),u=qs(l,a),e._yoyo&&u&1&&(s=1-s),u!==qs(e._tTime,a)&&(o=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==o||Mn||i||e._zTime===Bt||!t&&e._zTime){if(!e._initted&&V_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Bt:0),n||(n=t&&!d),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&hf(e,t,n,!0),e._onUpdate&&!n&&ci(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ci(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Qr(e,1),!n&&!Mn&&(ci(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},n1=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ys=function(e,t,n,i){var o=e._repeat,s=sn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=o?o<0?1e10:sn(s*(o+1)+e._rDelay*o):s,a>0&&!i&&iu(e,e._tTime=e._tDur*a),e.parent&&nu(e),n||Lo(e.parent,e),e},Cm=function(e){return e instanceof wn?Lo(e):Ys(e,e._dur)},i1={_start:0,endTime:sl,totalDuration:sl},pi=function r(e,t,n){var i=e.labels,o=e._recent||i1,s=e.duration()>=Si?o.endTime(!1):e._dur,a,l,c;return yn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?o._start:o.endTime(o._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?o:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=s),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Ln(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:s+l)):t==null?s:+t},ka=function(e,t,n){var i=Mr(t[1]),o=(i?2:1)+(e<2?0:1),s=t[o],a,l;if(i&&(s.duration=t[1]),s.parent=n,e){for(a=s,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;s.immediateRender=$n(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[o-1]}return new Qt(t[0],s,t[o+1])},oo=function(e,t){return e||e===0?t(e):t},vl=function(e,t,n){return n<e?e:n>t?t:n},Rn=function(e,t){return!yn(e)||!(t=qT.exec(e))?"":t[1]},r1=function(e,t,n){return oo(n,function(i){return vl(e,t,i)})},mf=[].slice,G_=function(e,t){return e&&er(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&er(e[0]))&&!e.nodeType&&e!==Vi},o1=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var o;return yn(i)&&!t||G_(i,1)?(o=n).push.apply(o,wi(i)):n.push(i)})||n},wi=function(e,t,n){return Xt&&!t&&Xt.selector?Xt.selector(e):yn(e)&&!n&&(df||!js())?mf.call((t||fh).querySelectorAll(e),0):Ln(e)?o1(e,n):G_(e)?mf.call(e,0):e?[e]:[]},gf=function(e){return e=wi(e)[0]||ol("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return wi(t,n.querySelectorAll?n:n===e?ol("Invalid scope")||fh.createElement("div"):e)}},W_=function(e){return e.sort(function(){return .5-Math.random()})},X_=function(e){if($t(e))return e;var t=er(e)?e:{each:e},n=Do(t.ease),i=t.from||0,o=parseFloat(t.base)||0,s={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return yn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=s[g],p,b,S,v,M,C,E,P,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,Si])[1],!w){for(E=-Si;E<(E=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=s[g]=[],p=l?Math.min(w,g)*u-.5:i%w,b=w===Si?0:l?g*d/w-.5:i/w|0,E=0,P=Si,C=0;C<g;C++)S=C%w-p,v=b-(C/w|0),m[C]=M=c?Math.abs(c==="y"?v:S):T_(S*S+v*v),M>E&&(E=M),M<P&&(P=M);i==="random"&&W_(m),m.max=E-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?o-g:o,m.u=Rn(t.amount||t.each)||0,n=n&&g<0?t0(n):n}return g=(m[f]-m.min)/m.max||0,sn(m.b+(n?n(g):g)*m.v)+m.u}},_f=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=sn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Mr(n)?0:Rn(n))}},q_=function(e,t){var n=Ln(e),i,o;return!n&&er(e)&&(i=n=e.radius||Si,e.values?(e=wi(e.values),(o=!Mr(e[0]))&&(i*=i)):e=_f(e.increment)),oo(t,n?$t(e)?function(s){return o=e(s),Math.abs(o-s)<=i?o:s}:function(s){for(var a=parseFloat(o?s.x:s),l=parseFloat(o?s.y:0),c=Si,u=0,d=e.length,f,h;d--;)o?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:s,o||u===s||Mr(s)?u:u+Rn(s)}:_f(e))},Y_=function(e,t,n,i){return oo(Ln(e)?!t:n===!0?!!(n=0):!i,function(){return Ln(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},s1=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(o,s){return s(o)},i)}},a1=function(e,t){return function(n){return e(parseFloat(n))+(t||Rn(n))}},l1=function(e,t,n){return $_(e,t,0,1,n)},j_=function(e,t,n){return oo(n,function(i){return e[~~t(i)]})},c1=function r(e,t,n){var i=t-e;return Ln(e)?j_(e,r(0,e.length),t):oo(n,function(o){return(i+(o-e)%i)%i+e})},u1=function r(e,t,n){var i=t-e,o=i*2;return Ln(e)?j_(e,r(0,e.length-1),t):oo(n,function(s){return s=(o+(s-e)%o)%o||0,e+(s>i?o-s:s)})},al=function(e){for(var t=0,n="",i,o,s,a;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),a=e.charAt(i+7)==="[",o=e.substr(i+7,s-i-7).match(a?P_:uf),n+=e.substr(t,i-t)+Y_(a?o:+o[0],a?0:+o[1],+o[2]||1e-5),t=s+1;return n+e.substr(t,e.length-t)},$_=function(e,t,n,i,o){var s=t-e,a=i-n;return oo(o,function(l){return n+((l-e)/s*a||0)})},d1=function r(e,t,n,i){var o=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!o){var s=yn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),s)e={p:e},t={p:t};else if(Ln(e)&&!Ln(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,o=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Xs(Ln(e)?[]:{},e));if(!u){for(l in t)_h.call(a,e,l,"get",t[l]);o=function(_){return Sh(_,a)||(s?e.p:e)}}}return oo(n,o)},Rm=function(e,t,n){var i=e.labels,o=Si,s,a,l;for(s in i)a=i[s]-t,a<0==!!n&&a&&o>(a=Math.abs(a))&&(l=s,o=a);return l},ci=function(e,t,n){var i=e.vars,o=i[t],s=Xt,a=e._ctx,l,c,u;if(o)return l=i[t+"Params"],c=i.callbackScope||e,n&&jr.length&&Uc(),a&&(Xt=a),u=l?o.apply(c,l):o.call(c),Xt=s,u},wa=function(e){return Qr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Mn),e.progress()<1&&ci(e,"onInterrupt"),e},Ss,K_=[],Z_=function(e){if(e)if(e=!e.name&&e.default||e,dh()||e.headless){var t=e.name,n=$t(e),i=t&&!n&&e.init?function(){this._props=[]}:e,o={init:sl,render:Sh,add:_h,kill:A1,modifier:T1,rawVars:0},s={targetTest:0,get:0,getSetter:xh,aliases:{},register:0};if(js(),e!==i){if(ri[t])return;fi(i,fi(Fc(e,o),s)),Xs(i.prototype,Xs(o,Fc(e,s))),ri[i.prop=t]=i,e.targetTest&&(yc.push(i),ph[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}I_(t,i),e.register&&e.register(Qn,i,Zn)}else K_.push(e)},kt=255,ba={aqua:[0,kt,kt],lime:[0,kt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,kt],navy:[0,0,128],white:[kt,kt,kt],olive:[128,128,0],yellow:[kt,kt,0],orange:[kt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[kt,0,0],pink:[kt,192,203],cyan:[0,kt,kt],transparent:[kt,kt,kt,0]},$u=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*kt+.5|0},J_=function(e,t,n){var i=e?Mr(e)?[e>>16,e>>8&kt,e&kt]:0:ba.black,o,s,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ba[e])i=ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(o=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+o+o+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&kt,i&kt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&kt,e&kt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(uf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,s=u<=.5?u*(c+1):u+c-u*c,o=u*2-s,i.length>3&&(i[3]*=1),i[0]=$u(l+1/3,o,s),i[1]=$u(l,o,s),i[2]=$u(l-1/3,o,s);else if(~e.indexOf("="))return i=e.match(C_),n&&i.length<4&&(i[3]=1),i}else i=e.match(uf)||ba.transparent;i=i.map(Number)}return t&&!_&&(o=i[0]/kt,s=i[1]/kt,a=i[2]/kt,d=Math.max(o,s,a),f=Math.min(o,s,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===o?(s-a)/h+(s<a?6:0):d===s?(a-o)/h+2:(o-s)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Q_=function(e){var t=[],n=[],i=-1;return e.split($r).forEach(function(o){var s=o.match(xs)||[];t.push.apply(t,s),n.push(i+=s.length+1)}),t.c=n,t},Pm=function(e,t,n){var i="",o=(e+i).match($r),s=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!o)return e;if(o=o.map(function(f){return(f=J_(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Q_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace($r,"1").split(xs),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?o.shift()||s+"0,0,0,0)":(u.length?u:o.length?o:n).shift());if(!c)for(c=e.split($r),d=c.length-1;a<d;a++)i+=c[a]+o[a];return i+c[d]},$r=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ba)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),f1=/hsl[a]?\(/,e0=function(e){var t=e.join(" "),n;if($r.lastIndex=0,$r.test(t))return n=f1.test(t),e[1]=Pm(e[1],n),e[0]=Pm(e[0],n,Q_(e[1])),!0},ll,si=function(){var r=Date.now,e=500,t=33,n=r(),i=n,o=1e3/240,s=o,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,b=m===!0,S,v,M,C;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,S=M-s,(S>0||b)&&(C=++d.frame,f=M-d.time*1e3,d.time=M=M/1e3,s+=S+(S>=o?4:o-S),v=1),b||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](M,f,C,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){L_&&(!df&&dh()&&(Vi=df=window,fh=Vi.document||{},di.gsap=Qn,(Vi.gsapVersions||(Vi.gsapVersions=[])).push(Qn.version),D_(Nc||Vi.GreenSockGlobals||!Vi.gsap&&Vi||{}),K_.forEach(Z_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,s-d.time*1e3+1|0)},ll=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ll=0,c=sl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){o=1e3/(m||240),s=d.time*1e3+o},add:function(m,p,b){var S=p?function(v,M,C,E){m(v,M,C,E),d.remove(S)}:m;return d.remove(m),a[b?"unshift":"push"](S),js(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),js=function(){return!ll&&si.wake()},bt={},h1=/^[\d.\-M][\d.\-,\s]/,p1=/["']/g,m1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],o=1,s=n.length,a,l,c;o<s;o++)l=n[o],a=o!==s-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(p1,"").trim():+c,i=l.substr(a+1).trim();return t},g1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},_1=function(e){var t=(e+"").split("("),n=bt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[m1(t[1])]:g1(e).split(",").map(F_)):bt._CE&&h1.test(e)?bt._CE("",e):n},t0=function(e){return function(t){return 1-e(1-t)}},n0=function r(e,t){for(var n=e._first,i;n;)n instanceof wn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Do=function(e,t){return e&&($t(e)?e:bt[e]||_1(e))||t},Xo=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var o={easeIn:t,easeOut:n,easeInOut:i},s;return Kn(e,function(a){bt[a]=di[a]=o,bt[s=a.toLowerCase()]=n;for(var l in o)bt[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=bt[a+"."+l]=o[l]}),o},i0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ku=function r(e,t,n){var i=t>=1?t:1,o=(n||(e?.3:.45))/(t<1?t:1),s=o/cf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*XT((u-s)*o)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:i0(a);return o=cf/o,l.config=function(c,u){return r(e,c,u)},l},Zu=function r(e,t){t===void 0&&(t=1.70158);var n=function(s){return s?--s*s*((t+1)*s+t)+1:0},i=e==="out"?n:e==="in"?function(o){return 1-n(1-o)}:i0(n);return i.config=function(o){return r(e,o)},i};Kn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Xo(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});bt.Linear.easeNone=bt.none=bt.Linear.easeIn;Xo("Elastic",Ku("in"),Ku("out"),Ku());(function(r,e){var t=1/e,n=2*t,i=2.5*t,o=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Xo("Bounce",function(s){return 1-o(1-s)},o)})(7.5625,2.75);Xo("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Xo("Circ",function(r){return-(T_(1-r*r)-1)});Xo("Sine",function(r){return r===1?1:-WT(r*VT)+1});Xo("Back",Zu("in"),Zu("out"),Zu());bt.SteppedEase=bt.steps=di.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),o=t?1:0,s=1-Bt;return function(a){return((i*vl(0,s,a)|0)+o)*n}}};Ws.ease=bt["quad.out"];Kn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return mh+=r+","+r+"Params,"});var r0=function(e,t){this.id=GT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:N_,this.set=t?t.getSetter:xh},cl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ys(this,+t.duration,1,1),this.data=t.data,Xt&&(this._ctx=Xt,Xt.data.push(this)),ll||si.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ys(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(js(),!arguments.length)return this._tTime;var o=this._dp;if(o&&o.smoothChildTiming&&this._ts){for(iu(this,n),!o._dp||o.parent||z_(o,this);o&&o.parent;)o.parent._time!==o._start+(o._ts>=0?o._tTime/o._ts:(o.totalDuration()-o._tTime)/-o._ts)&&o.totalTime(o._tTime,!0),o=o.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Xi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Bt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),U_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Am(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Am(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var o=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*o,i):this._repeat?qs(this._tTime,o)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Bt?0:this._rts;if(this._rts===n)return this;var o=this.parent&&this._ts?kc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Bt?0:this._rts,this.totalTime(vl(-Math.abs(this._delay),this._tDur,o),i!==!1),nu(this),JT(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(js(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Bt&&(this._tTime-=Bt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Xi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?kc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=jT);var i=Mn;return Mn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Mn=i,this},e.globalTime=function(n){for(var i=this,o=arguments.length?n:i.rawTime();i;)o=i._start+o/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):o},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Cm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Cm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(pi(this,n),$n(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,$n(i)),this._dur||(this._zTime=-Bt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Bt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Bt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,o;return!!(!n||this._ts&&this._initted&&n.isActive()&&(o=n.rawTime(!0))>=i&&o<this.endTime(!0)-Bt)},e.eventCallback=function(n,i,o){var s=this.vars;return arguments.length>1?(i?(s[n]=i,o&&(s[n+"Params"]=o),n==="onUpdate"&&(this._onUpdate=i)):delete s[n],this):s[n]},e.then=function(n){var i=this;return new Promise(function(o){var s=$t(n)?n:k_,a=function(){var c=i.then;i.then=null,$t(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=c),o(s),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){wa(this)},r}();fi(cl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Bt,_prom:0,_ps:!1,_rts:1});var wn=function(r){E_(e,r);function e(n,i){var o;return n===void 0&&(n={}),o=r.call(this,n)||this,o.labels={},o.smoothChildTiming=!!n.smoothChildTiming,o.autoRemoveChildren=!!n.autoRemoveChildren,o._sort=$n(n.sortChildren),qt&&Xi(n.parent||qt,fr(o),i),n.reversed&&o.reverse(),n.paused&&o.paused(!0),n.scrollTrigger&&H_(fr(o),n.scrollTrigger),o}var t=e.prototype;return t.to=function(i,o,s){return ka(0,arguments,this),this},t.from=function(i,o,s){return ka(1,arguments,this),this},t.fromTo=function(i,o,s,a){return ka(2,arguments,this),this},t.set=function(i,o,s){return o.duration=0,o.parent=this,Fa(o).repeatDelay||(o.repeat=0),o.immediateRender=!!o.immediateRender,new Qt(i,o,pi(this,s),1),this},t.call=function(i,o,s){return Xi(this,Qt.delayedCall(0,i,o),s)},t.staggerTo=function(i,o,s,a,l,c,u){return s.duration=o,s.stagger=s.stagger||a,s.onComplete=c,s.onCompleteParams=u,s.parent=this,new Qt(i,s,pi(this,l)),this},t.staggerFrom=function(i,o,s,a,l,c,u){return s.runBackwards=1,Fa(s).immediateRender=$n(s.immediateRender),this.staggerTo(i,o,s,a,l,c,u)},t.staggerFromTo=function(i,o,s,a,l,c,u,d){return a.startAt=s,Fa(a).immediateRender=$n(a.immediateRender),this.staggerTo(i,o,a,l,c,u,d)},t.render=function(i,o,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:sn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,b,S,v,M,C,E;if(this!==qt&&u>l&&i>=0&&(u=l),u!==this._tTime||s||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,S=this._ts,p=!S,d&&(c||(a=this._zTime),(i||!o)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,o,s);if(f=sn(u%m),u===l?(g=this._repeat,f=c):(M=sn(u/m),g=~~M,g&&g===M&&(f=c,g--),f>c&&(f=c)),M=qs(this._tTime,m),!a&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),C&&g&1&&(f=c-f,E=1),g!==M&&!this._lock){var P=C&&M&1,w=P===(C&&g&1);if(g<M&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:sn(g*m)),o,!c)._lock=0,this._tTime=u,!o&&this.parent&&ci(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;n0(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=n1(this,sn(a),sn(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!o&&!g&&(ci(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,o,s),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=-Bt);break}}h=_}else{h=this._last;for(var y=i<0?i:f;h;){if(_=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,o,s||Mn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=y?-Bt:Bt);break}}h=_}}if(b&&!o&&(this.pause(),b.render(f>=a?0:-Bt)._zTime=f>=a?1:-1,this._ts))return this._start=v,nu(this),this.render(i,o,s);this._onUpdate&&!o&&ci(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Qr(this,1),!o&&!(i<0&&!a)&&(u||a||!l)&&(ci(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,o){var s=this;if(Mr(o)||(o=pi(this,o,i)),!(i instanceof cl)){if(Ln(i))return i.forEach(function(a){return s.add(a,o)}),this;if(yn(i))return this.addLabel(i,o);if($t(i))i=Qt.delayedCall(0,i);else return this}return this!==i?Xi(this,i,o):this},t.getChildren=function(i,o,s,a){i===void 0&&(i=!0),o===void 0&&(o=!0),s===void 0&&(s=!0),a===void 0&&(a=-Si);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Qt?o&&l.push(c):(s&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,o,s)))),c=c._next;return l},t.getById=function(i){for(var o=this.getChildren(1,1,1),s=o.length;s--;)if(o[s].vars.id===i)return o[s]},t.remove=function(i){return yn(i)?this.removeLabel(i):$t(i)?this.killTweensOf(i):(i.parent===this&&tu(this,i),i===this._recent&&(this._recent=this._last),Lo(this))},t.totalTime=function(i,o){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=sn(si.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,o),this._forcing=0,this):this._tTime},t.addLabel=function(i,o){return this.labels[i]=pi(this,o),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,o,s){var a=Qt.delayedCall(0,o||sl,s);return a.data="isPause",this._hasPause=1,Xi(this,a,pi(this,i))},t.removePause=function(i){var o=this._first;for(i=pi(this,i);o;)o._start===i&&o.data==="isPause"&&Qr(o),o=o._next},t.killTweensOf=function(i,o,s){for(var a=this.getTweensOf(i,s),l=a.length;l--;)Br!==a[l]&&a[l].kill(i,o);return this},t.getTweensOf=function(i,o){for(var s=[],a=wi(i),l=this._first,c=Mr(o),u;l;)l instanceof Qt?$T(l._targets,a)&&(c?(!Br||l._initted&&l._ts)&&l.globalTime(0)<=o&&l.globalTime(l.totalDuration())>o:!o||l.isActive())&&s.push(l):(u=l.getTweensOf(a,o)).length&&s.push.apply(s,u),l=l._next;return s},t.tweenTo=function(i,o){o=o||{};var s=this,a=pi(s,i),l=o,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Qt.to(s,fi({ease:o.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale())||Bt,onStart:function(){if(s.pause(),!h){var m=o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale());_._dur!==m&&Ys(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},o));return f?_.render(0):_},t.tweenFromTo=function(i,o,s){return this.tweenTo(o,fi({startAt:{time:pi(this,i)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Rm(this,pi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Rm(this,pi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Bt)},t.shiftChildren=function(i,o,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,c;a;)a._start>=s&&(a._start+=i,a._end+=i),a=a._next;if(o)for(c in l)l[c]>=s&&(l[c]+=i);return Lo(this)},t.invalidate=function(i){var o=this._first;for(this._lock=0;o;)o.invalidate(i),o=o._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var o=this._first,s;o;)s=o._next,this.remove(o),o=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Lo(this)},t.totalDuration=function(i){var o=0,s=this,a=s._last,l=Si,c,u,d;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(d=s.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,Xi(s,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(o-=u,(!d&&!s._dp||d&&d.smoothChildTiming)&&(s._start+=u/s._ts,s._time-=u,s._tTime-=u),s.shiftChildren(-u,!1,-1/0),l=0),a._end>o&&a._ts&&(o=a._end),a=c;Ys(s,s===qt&&s._time>o?s._time:o,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(i){if(qt._ts&&(U_(qt,kc(i,qt)),O_=si.frame),si.frame>=Em){Em+=ui.autoSleep||120;var o=qt._first;if((!o||!o._ts)&&ui.autoSleep&&si._listeners.length<2){for(;o&&!o._ts;)o=o._next;o||si.sleep()}}},e}(cl);fi(wn.prototype,{_lock:0,_hasPause:0,_forcing:0});var v1=function(e,t,n,i,o,s,a){var l=new Zn(this._pt,e,t,0,1,u0,null,o),c=0,u=0,d,f,h,_,g,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=al(i)),s&&(b=[n,i],s(b,e,t),n=b[0],i=b[1]),f=n.match(Yu)||[];d=Yu.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?As(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Yu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(R_.test(i)||p)&&(l.e=0),this._pt=l,l},_h=function(e,t,n,i,o,s,a,l,c,u){$t(i)&&(i=i(o||0,e,s));var d=e[t],f=n!=="get"?n:$t(d)?c?e[t.indexOf("set")||!$t(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=$t(d)?c?b1:l0:yh,_;if(yn(i)&&(~i.indexOf("random(")&&(i=al(i)),i.charAt(1)==="="&&(_=As(f,i)+(Rn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||vf)return!isNaN(f*i)&&i!==""?(_=new Zn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?E1:c0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&hh(t,i),v1.call(this,e,t,f,i,h,l||ui.stringFilter,c))},y1=function(e,t,n,i,o){if($t(e)&&(e=Ba(e,o,t,n,i)),!er(e)||e.style&&e.nodeType||Ln(e)||A_(e))return yn(e)?Ba(e,o,t,n,i):e;var s={},a;for(a in e)s[a]=Ba(e[a],o,t,n,i);return s},o0=function(e,t,n,i,o,s){var a,l,c,u;if(ri[e]&&(a=new ri[e]).init(o,a.rawVars?t[e]:y1(t[e],i,o,s,n),n,i,s)!==!1&&(n._pt=l=new Zn(n._pt,o,e,0,1,a.render,a,0,a.priority),n!==Ss))for(c=n._ptLookup[n._targets.indexOf(o)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Br,vf,vh=function r(e,t,n){var i=e.vars,o=i.ease,s=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,S=e._overwrite==="auto"&&!ch,v=e.timeline,M,C,E,P,w,y,L,D,z,O,T,W,J;if(v&&(!f||!o)&&(o="none"),e._ease=Do(o,Ws.ease),e._yEase=d?t0(Do(d===!0?o:d,Ws.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(D=m[0]?Po(m[0]).harness:0,W=D&&i[D.prop],M=Fc(i,ph),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?vc:YT),g._lazy=0),s){if(Qr(e._startAt=Qt.set(m,fi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return ci(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Mn||!a&&!h)&&e._startAt.revert(vc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=fi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&$n(l),immediateRender:a,stagger:0,parent:p},M),W&&(E[D.prop]=W),Qr(e._startAt=Qt.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Mn?e._startAt.revert(vc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Bt,Bt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&$n(l)||l&&!_,C=0;C<m.length;C++){if(w=m[C],L=w._gsap||gh(m)[C]._gsap,e._ptLookup[C]=O={},ff[L.id]&&jr.length&&Uc(),T=b===m?C:b.indexOf(w),D&&(z=new D).init(w,W||M,e,T,b)!==!1&&(e._pt=P=new Zn(e._pt,w,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(q){O[q]=P}),z.priority&&(y=1)),!D||W)for(E in M)ri[E]&&(z=o0(E,M,e,T,w,b))?z.priority&&(y=1):O[E]=P=_h.call(e,w,E,"get",M[E],T,b,0,i.stringFilter);e._op&&e._op[C]&&e.kill(w,e._op[C]),S&&e._pt&&(Br=e,qt.killTweensOf(w,O,e.globalTime(t)),J=!e.parent,Br=0),e._pt&&l&&(ff[L.id]=1)}y&&d0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!J,f&&t<=0&&v.render(Si,!0,!0)},x1=function(e,t,n,i,o,s,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return vf=1,e.vars[t]="+=0",vh(e,a),vf=0,l?ol(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!o?i:u.s+(i||0)+s*u.c,u.c=n-u.s,d.e&&(d.e=Jt(n)+Rn(d.e)),d.b&&(d.b=u.s+Rn(d.b))},S1=function(e,t){var n=e[0]?Po(e[0]).harness:0,i=n&&n.aliases,o,s,a,l;if(!i)return t;o=Xs({},t);for(s in i)if(s in o)for(l=i[s].split(","),a=l.length;a--;)o[l[a]]=o[s];return o},w1=function(e,t,n,i){var o=t.ease||i||"power1.inOut",s,a;if(Ln(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:o})});else for(s in t)a=n[s]||(n[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:o})},Ba=function(e,t,n,i,o){return $t(e)?e.call(t,n,i,o):yn(e)&&~e.indexOf("random(")?al(e):e},s0=mh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",a0={};Kn(s0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return a0[r]=1});var Qt=function(r){E_(e,r);function e(n,i,o,s){var a;typeof i=="number"&&(o.duration=i,i=o,o=null),a=r.call(this,s?i:Fa(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||qt,S=(Ln(n)||A_(n)?Mr(n[0]):"length"in i)?[n]:wi(n),v,M,C,E,P,w,y,L;if(a._targets=S.length?gh(S):ol("GSAP target "+n+" not found. https://gsap.com",!ui.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||$l(c)||$l(u)){if(i=a.vars,v=a.timeline=new wn({data:"nested",defaults:g||{},targets:b&&b.data==="nested"?b.vars.targets:S}),v.kill(),v.parent=v._dp=fr(a),v._start=0,f||$l(c)||$l(u)){if(E=S.length,y=f&&X_(f),er(f))for(P in f)~s0.indexOf(P)&&(L||(L={}),L[P]=f[P]);for(M=0;M<E;M++)C=Fc(i,a0),C.stagger=0,p&&(C.yoyoEase=p),L&&Xs(C,L),w=S[M],C.duration=+Ba(c,fr(a),M,w,S),C.delay=(+Ba(u,fr(a),M,w,S)||0)-a._delay,!f&&E===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(w,C,y?y(M,w,S):0),v._ease=bt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Fa(fi(v.vars.defaults,{ease:"none"})),v._ease=Do(_.ease||i.ease||"none");var D=0,z,O,T;if(Ln(_))_.forEach(function(W){return v.to(S,W,">")}),v.duration();else{C={};for(P in _)P==="ease"||P==="easeEach"||w1(P,_[P],C,_.easeEach);for(P in C)for(z=C[P].sort(function(W,J){return W.t-J.t}),D=0,M=0;M<z.length;M++)O=z[M],T={ease:O.e,duration:(O.t-(M?z[M-1].t:0))/100*c},T[P]=O.v,v.to(S,T,D),D+=T.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!ch&&(Br=fr(a),qt.killTweensOf(S),Br=0),Xi(b,fr(a),o),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===sn(b._time)&&$n(d)&&QT(fr(a))&&b.data!=="nested")&&(a._tTime=-Bt,a.render(Math.max(0,-u)||0)),m&&H_(fr(a),m),a}var t=e.prototype;return t.render=function(i,o,s){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Bt&&!u?l:i<Bt?0:i,f,h,_,g,m,p,b,S,v;if(!c)t1(this,i,o,s);else if(d!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,S=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,o,s);if(f=sn(d%g),d===l?(_=this._repeat,f=c):(m=sn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=qs(this._tTime,g),f===a&&!s&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(S&&this._yEase&&n0(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=s=1,this.render(sn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(V_(this,u?i:f,s,o,d))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,o,s)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!o&&!_&&(ci(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),o,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!o&&(u&&hf(this,i,o,s),ci(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!o&&this.parent&&ci(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&hf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Qr(this,1),!o&&!(u&&!a)&&(d||a||p)&&(ci(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,o,s,a,l){ll||si.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||vh(this,c),u=this._ease(c/this._dur),x1(this,i,o,s,a,u,c,l)?this.resetTo(i,o,s,a,1):(iu(this,0),this.parent||B_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,o){if(o===void 0&&(o="all"),!i&&(!o||o==="all"))return this._lazy=this._pt=0,this.parent?wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Mn),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,o,Br&&Br.vars.overwrite!==!0)._first||wa(this),this.parent&&s!==this.timeline.totalDuration()&&Ys(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=i?wi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!o||o==="all")&&ZT(a,l))return o==="all"&&(this._pt=0),wa(this);for(d=this._op=this._op||[],o!=="all"&&(yn(o)&&(g={},Kn(o,function(b){return g[b]=1}),o=g),o=S1(a,o)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],o==="all"?(d[p]=o,_=f,h={}):(h=d[p]=d[p]||{},_=o);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&tu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&wa(this),this},e.to=function(i,o){return new e(i,o,arguments[2])},e.from=function(i,o){return ka(1,arguments)},e.delayedCall=function(i,o,s,a){return new e(o,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:o,onReverseComplete:o,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(i,o,s){return ka(2,arguments)},e.set=function(i,o){return o.duration=0,o.repeatDelay||(o.repeat=0),new e(i,o)},e.killTweensOf=function(i,o,s){return qt.killTweensOf(i,o,s)},e}(cl);fi(Qt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Kn("staggerTo,staggerFrom,staggerFromTo",function(r){Qt[r]=function(){var e=new wn,t=mf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var yh=function(e,t,n){return e[t]=n},l0=function(e,t,n){return e[t](n)},b1=function(e,t,n,i){return e[t](i.fp,n)},M1=function(e,t,n){return e.setAttribute(t,n)},xh=function(e,t){return $t(e[t])?l0:uh(e[t])&&e.setAttribute?M1:yh},c0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},E1=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},u0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Sh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},T1=function(e,t,n,i){for(var o=this._pt,s;o;)s=o._next,o.p===i&&o.modifier(e,t,n),o=s},A1=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?tu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},C1=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},d0=function(e){for(var t=e._pt,n,i,o,s;t;){for(n=t._next,i=o;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:o=t,(t._next=i)?i._prev=t:s=t,t=n}e._pt=o},Zn=function(){function r(t,n,i,o,s,a,l,c,u){this.t=n,this.s=o,this.c=s,this.p=i,this.r=a||c0,this.d=l||this,this.set=c||yh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,o){this.mSet=this.mSet||this.set,this.set=C1,this.m=n,this.mt=o,this.tween=i},r}();Kn(mh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ph[r]=1});di.TweenMax=di.TweenLite=Qt;di.TimelineLite=di.TimelineMax=wn;qt=new wn({sortChildren:!1,defaults:Ws,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ui.stringFilter=e0;var Io=[],xc={},R1=[],Lm=0,P1=0,Ju=function(e){return(xc[e]||R1).map(function(t){return t()})},yf=function(){var e=Date.now(),t=[];e-Lm>2&&(Ju("matchMediaInit"),Io.forEach(function(n){var i=n.queries,o=n.conditions,s,a,l,c;for(a in i)s=Vi.matchMedia(i[a]).matches,s&&(l=1),s!==o[a]&&(o[a]=s,c=1);c&&(n.revert(),l&&t.push(n))}),Ju("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Lm=e,Ju("matchMedia"))},f0=function(){function r(t,n){this.selector=n&&gf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=P1++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,o){$t(n)&&(o=i,i=n,n=$t);var s=this,a=function(){var c=Xt,u=s.selector,d;return c&&c!==s&&c.data.push(s),o&&(s.selector=gf(o)),Xt=s,d=i.apply(s,arguments),$t(d)&&s._r.push(d),Xt=c,s.selector=u,s.isReverted=!1,d};return s.last=a,n===$t?a(s,function(l){return s.add(null,l)}):n?s[n]=a:a},e.ignore=function(n){var i=Xt;Xt=null,n(this),Xt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Qt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var o=this;if(n?function(){for(var a=o.getTweens(),l=o.data.length,c;l--;)c=o.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=o.data.length;l--;)c=o.data[l],c instanceof wn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Qt)&&c.revert&&c.revert(n);o._r.forEach(function(u){return u(n,o)}),o.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var s=Io.length;s--;)Io[s].id===this.id&&Io.splice(s,1)},e.revert=function(n){this.kill(n||{})},r}(),L1=function(){function r(t){this.contexts=[],this.scope=t,Xt&&Xt.data.push(this)}var e=r.prototype;return e.add=function(n,i,o){er(n)||(n={matches:n});var s=new f0(0,o||this.scope),a=s.conditions={},l,c,u;Xt&&!s.selector&&(s.selector=Xt.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=n;for(c in n)c==="all"?u=1:(l=Vi.matchMedia(n[c]),l&&(Io.indexOf(s)<0&&Io.push(s),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yf):l.addEventListener("change",yf)));return u&&i(s,function(d){return s.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Bc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Z_(i)})},timeline:function(e){return new wn(e)},getTweensOf:function(e,t){return qt.getTweensOf(e,t)},getProperty:function(e,t,n,i){yn(e)&&(e=wi(e)[0]);var o=Po(e||{}).get,s=n?k_:F_;return n==="native"&&(n=""),e&&(t?s((ri[t]&&ri[t].get||o)(e,t,n,i)):function(a,l,c){return s((ri[a]&&ri[a].get||o)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=wi(e),e.length>1){var i=e.map(function(u){return Qn.quickSetter(u,t,n)}),o=i.length;return function(u){for(var d=o;d--;)i[d](u)}}e=e[0]||{};var s=ri[t],a=Po(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=s?function(u){var d=new s;Ss._pt=0,d.init(e,n?u+n:u,Ss,0,[e]),d.render(1,d),Ss._pt&&Sh(1,Ss)}:a.set(e,l);return s?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,o=Qn.to(e,fi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),s=function(l,c,u){return o.resetTo(t,l,c,u)};return s.tween=o,s},isTweening:function(e){return qt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Do(e.ease,Ws.ease)),Tm(Ws,e||{})},config:function(e){return Tm(ui,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,o=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!ri[a]&&!di[a]&&ol(t+" effect requires "+a+" plugin.")}),ju[t]=function(a,l,c){return n(wi(a),fi(l||{},o),c)},s&&(wn.prototype[t]=function(a,l,c){return this.add(ju[t](a,er(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){bt[e]=Do(t)},parseEase:function(e,t){return arguments.length?Do(e,t):bt},getById:function(e){return qt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new wn(e),i,o;for(n.smoothChildTiming=$n(e.smoothChildTiming),qt.remove(n),n._dp=0,n._time=n._tTime=qt._time,i=qt._first;i;)o=i._next,(t||!(!i._dur&&i instanceof Qt&&i.vars.onComplete===i._targets[0]))&&Xi(n,i,i._start-i._delay),i=o;return Xi(qt,n,0),n},context:function(e,t){return e?new f0(e,t):Xt},matchMedia:function(e){return new L1(e)},matchMediaRefresh:function(){return Io.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yf()},addEventListener:function(e,t){var n=xc[e]||(xc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=xc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:c1,wrapYoyo:u1,distribute:X_,random:Y_,snap:q_,normalize:l1,getUnit:Rn,clamp:r1,splitColor:J_,toArray:wi,selector:gf,mapRange:$_,pipe:s1,unitize:a1,interpolate:d1,shuffle:W_},install:D_,effects:ju,ticker:si,updateRoot:wn.updateRoot,plugins:ri,globalTimeline:qt,core:{PropTween:Zn,globals:I_,Tween:Qt,Timeline:wn,Animation:cl,getCache:Po,_removeLinkedListItem:tu,reverting:function(){return Mn},context:function(e){return e&&Xt&&(Xt.data.push(e),e._ctx=Xt),Xt},suppressOverwrites:function(e){return ch=e}}};Kn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Bc[r]=Qt[r]});si.add(wn.updateRoot);Ss=Bc.to({},{duration:0});var D1=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},I1=function(e,t){var n=e._targets,i,o,s;for(i in t)for(o=n.length;o--;)s=e._ptLookup[o][i],s&&(s=s.d)&&(s._pt&&(s=D1(s,i)),s&&s.modifier&&s.modifier(t[i],e,n[o],i))},Qu=function(e,t){return{name:e,rawVars:1,init:function(i,o,s){s._onInit=function(a){var l,c;if(yn(o)&&(l={},Kn(o,function(u){return l[u]=1}),o=l),t){l={};for(c in o)l[c]=t(o[c]);o=l}I1(a,o)}}}},Qn=Bc.registerPlugin({name:"attr",init:function(e,t,n,i,o){var s,a,l;this.tween=n;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],i,o,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var n=t._pt;n;)Mn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Qu("roundProps",_f),Qu("modifiers"),Qu("snap",q_))||Bc;Qt.version=wn.version=Qn.version="3.12.7";L_=1;dh()&&js();var O1=bt.Power0,N1=bt.Power1,U1=bt.Power2,F1=bt.Power3,k1=bt.Power4,B1=bt.Linear,z1=bt.Quad,H1=bt.Cubic,V1=bt.Quart,G1=bt.Quint,W1=bt.Strong,X1=bt.Elastic,q1=bt.Back,Y1=bt.SteppedEase,j1=bt.Bounce,$1=bt.Sine,K1=bt.Expo,Z1=bt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dm,zr,Cs,wh,Eo,Im,bh,J1=function(){return typeof window<"u"},Er={},yo=180/Math.PI,Rs=Math.PI/180,cs=Math.atan2,Om=1e8,Mh=/([A-Z])/g,Q1=/(left|right|width|margin|padding|x)/i,eA=/[\s,\(]\S/,qi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},xf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},tA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},nA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},iA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},h0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},p0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},rA=function(e,t,n){return e.style[t]=n},oA=function(e,t,n){return e.style.setProperty(t,n)},sA=function(e,t,n){return e._gsap[t]=n},aA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},lA=function(e,t,n,i,o){var s=e._gsap;s.scaleX=s.scaleY=n,s.renderTransform(o,s)},cA=function(e,t,n,i,o){var s=e._gsap;s[t]=n,s.renderTransform(o,s)},Yt="transform",Jn=Yt+"Origin",uA=function r(e,t){var n=this,i=this.target,o=i.style,s=i._gsap;if(e in Er&&o){if(this.tfm=this.tfm||{},e!=="transform")e=qi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=hr(i,a)}):this.tfm[e]=s.x?s[e]:hr(i,e),e===Jn&&(this.tfm.zOrigin=s.zOrigin);else return qi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Yt)>=0)return;s.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Jn,t,"")),e=Yt}(o||t)&&this.props.push(e,t,o[e])},m0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},dA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,o,s;for(o=0;o<e.length;o+=3)e[o+1]?e[o+1]===2?t[e[o]](e[o+2]):t[e[o]]=e[o+2]:e[o+2]?n[e[o]]=e[o+2]:n.removeProperty(e[o].substr(0,2)==="--"?e[o]:e[o].replace(Mh,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),o=bh(),(!o||!o.isStart)&&!n[Yt]&&(m0(n),i.zOrigin&&n[Jn]&&(n[Jn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},g0=function(e,t){var n={target:e,props:[],revert:dA,save:uA};return e._gsap||Qn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},_0,Sf=function(e,t){var n=zr.createElementNS?zr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):zr.createElement(e);return n&&n.style?n:zr.createElement(e)},Ki=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Mh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,$s(t)||t,1)||""},Nm="O,Moz,ms,Ms,Webkit".split(","),$s=function(e,t,n){var i=t||Eo,o=i.style,s=5;if(e in o&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Nm[s]+e in o););return s<0?null:(s===3?"ms":s>=0?Nm[s]:"")+e},wf=function(){J1()&&window.document&&(Dm=window,zr=Dm.document,Cs=zr.documentElement,Eo=Sf("div")||{style:{}},Sf("div"),Yt=$s(Yt),Jn=Yt+"Origin",Eo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_0=!!$s("perspective"),bh=Qn.core.reverting,wh=1)},Um=function(e){var t=e.ownerSVGElement,n=Sf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),o;i.style.display="block",n.appendChild(i),Cs.appendChild(n);try{o=i.getBBox()}catch{}return n.removeChild(i),Cs.removeChild(n),o},Fm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},v0=function(e){var t,n;try{t=e.getBBox()}catch{t=Um(e),n=1}return t&&(t.width||t.height)||n||(t=Um(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fm(e,["x","cx","x1"])||0,y:+Fm(e,["y","cy","y1"])||0,width:0,height:0}:t},y0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&v0(e))},Bo=function(e,t){if(t){var n=e.style,i;t in Er&&t!==Jn&&(t=Yt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Mh,"-$1").toLowerCase())):n.removeAttribute(t)}},Hr=function(e,t,n,i,o,s){var a=new Zn(e._pt,t,n,0,1,s?p0:h0);return e._pt=a,a.b=i,a.e=o,e._props.push(n),a},km={deg:1,rad:1,turn:1},fA={grid:1,flex:1},eo=function r(e,t,n,i){var o=parseFloat(n)||0,s=(n+"").trim().substr((o+"").length)||"px",a=Eo.style,l=Q1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===s||!o||km[i]||km[s])return o;if(s!=="px"&&!f&&(o=r(e,t,n,"px")),p=e.getCTM&&y0(e),(h||s==="%")&&(Er[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],Jt(h?o/_*d:o/100*_);if(a[l?"width":"height"]=d+(f?s:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===zr||!g.appendChild)&&(g=zr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===si.time&&!m.uncache)return Jt(o/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,_=e[u],b?e.style[t]=b:Bo(e,t)}else(h||s==="%")&&!fA[Ki(g,"display")]&&(a.position=Ki(e,"position")),g===e&&(a.position="static"),g.appendChild(Eo),_=Eo[u],g.removeChild(Eo),a.position="absolute";return l&&h&&(m=Po(g),m.time=si.time,m.width=g[u]),Jt(f?_*o/d:_&&o?d/_*o:0)},hr=function(e,t,n,i){var o;return wh||wf(),t in qi&&t!=="transform"&&(t=qi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Er[t]&&t!=="transform"?(o=dl(e,i),o=t!=="transformOrigin"?o[t]:o.svg?o.origin:Hc(Ki(e,Jn))+" "+o.zOrigin+"px"):(o=e.style[t],(!o||o==="auto"||i||~(o+"").indexOf("calc("))&&(o=zc[t]&&zc[t](e,t,n)||Ki(e,t)||N_(e,t)||(t==="opacity"?1:0))),n&&!~(o+"").trim().indexOf(" ")?eo(e,t,o,n)+n:o},hA=function(e,t,n,i){if(!n||n==="none"){var o=$s(t,e,1),s=o&&Ki(e,o,1);s&&s!==n?(t=o,n=s):t==="borderColor"&&(n=Ki(e,"borderTopColor"))}var a=new Zn(this._pt,e.style,t,0,1,u0),l=0,c=0,u,d,f,h,_,g,m,p,b,S,v,M;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Ki(e,t)||i,g?e.style[t]=g:Bo(e,t)),u=[n,i],e0(u),n=u[0],i=u[1],f=n.match(xs)||[],M=i.match(xs)||[],M.length){for(;d=xs.exec(i);)m=d[0],b=i.substring(l,d.index),_?_=(_+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=As(h,m)+v),p=parseFloat(m),S=m.substr((p+"").length),l=xs.lastIndex-S.length,S||(S=S||ui.units[t]||v,l===i.length&&(i+=S,a.e+=S)),v!==S&&(h=eo(e,t,g,S)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?p0:h0;return R_.test(i)&&(a.e=0),this._pt=a,a},Bm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},pA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Bm[n]||n,t[1]=Bm[i]||i,t.join(" ")},mA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,o=t.u,s=n._gsap,a,l,c;if(o==="all"||o===!0)i.cssText="",l=1;else for(o=o.split(","),c=o.length;--c>-1;)a=o[c],Er[a]&&(l=1,a=a==="transformOrigin"?Jn:Yt),Bo(n,a);l&&(Bo(n,Yt),s&&(s.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",dl(n,1),s.uncache=1,m0(i)))}},zc={clearProps:function(e,t,n,i,o){if(o.data!=="isFromStart"){var s=e._pt=new Zn(e._pt,t,n,0,0,mA);return s.u=i,s.pr=-10,s.tween=o,e._props.push(n),1}}},ul=[1,0,0,1,0,0],x0={},S0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},zm=function(e){var t=Ki(e,Yt);return S0(t)?ul:t.substr(7).match(C_).map(Jt)},Eh=function(e,t){var n=e._gsap||Po(e),i=e.style,o=zm(e),s,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,o=[l.a,l.b,l.c,l.d,l.e,l.f],o.join(",")==="1,0,0,1,0,0"?ul:o):(o===ul&&!e.offsetParent&&e!==Cs&&!n.svg&&(l=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Cs.appendChild(e)),o=zm(e),l?i.display=l:Bo(e,"display"),c&&(a?s.insertBefore(e,a):s?s.appendChild(e):Cs.removeChild(e))),t&&o.length>6?[o[0],o[1],o[4],o[5],o[12],o[13]]:o)},bf=function(e,t,n,i,o,s){var a=e._gsap,l=o||Eh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],b=l[5],S=t.split(" "),v=parseFloat(S[0])||0,M=parseFloat(S[1])||0,C,E,P,w;n?l!==ul&&(E=h*m-_*g)&&(P=v*(m/E)+M*(-g/E)+(g*b-m*p)/E,w=v*(-_/E)+M*(h/E)-(h*b-_*p)/E,v=P,M=w):(C=v0(e),v=C.x+(~S[0].indexOf("%")?v/100*C.width:v),M=C.y+(~(S[1]||S[0]).indexOf("%")?M/100*C.height:M)),i||i!==!1&&a.smooth?(p=v-c,b=M-u,a.xOffset=d+(p*h+b*g)-p,a.yOffset=f+(p*_+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Jn]="0px 0px",s&&(Hr(s,a,"xOrigin",c,v),Hr(s,a,"yOrigin",u,M),Hr(s,a,"xOffset",d,a.xOffset),Hr(s,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+M)},dl=function(e,t){var n=e._gsap||new r0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,o=n.scaleX<0,s="px",a="deg",l=getComputedStyle(e),c=Ki(e,Jn)||"0",u,d,f,h,_,g,m,p,b,S,v,M,C,E,P,w,y,L,D,z,O,T,W,J,q,pe,N,j,We,Je,ne,ce;return u=d=f=g=m=p=b=S=v=0,h=_=1,n.svg=!!(e.getCTM&&y0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Yt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Yt]!=="none"?l[Yt]:"")),i.scale=i.rotate=i.translate="none"),E=Eh(e,n.svg),n.svg&&(n.uncache?(q=e.getBBox(),c=n.xOrigin-q.x+"px "+(n.yOrigin-q.y)+"px",J=""):J=!t&&e.getAttribute("data-svg-origin"),bf(e,J||c,!!J||n.originIsAbsolute,n.smooth!==!1,E)),M=n.xOrigin||0,C=n.yOrigin||0,E!==ul&&(L=E[0],D=E[1],z=E[2],O=E[3],u=T=E[4],d=W=E[5],E.length===6?(h=Math.sqrt(L*L+D*D),_=Math.sqrt(O*O+z*z),g=L||D?cs(D,L)*yo:0,b=z||O?cs(z,O)*yo+g:0,b&&(_*=Math.abs(Math.cos(b*Rs))),n.svg&&(u-=M-(M*L+C*z),d-=C-(M*D+C*O))):(ce=E[6],Je=E[7],N=E[8],j=E[9],We=E[10],ne=E[11],u=E[12],d=E[13],f=E[14],P=cs(ce,We),m=P*yo,P&&(w=Math.cos(-P),y=Math.sin(-P),J=T*w+N*y,q=W*w+j*y,pe=ce*w+We*y,N=T*-y+N*w,j=W*-y+j*w,We=ce*-y+We*w,ne=Je*-y+ne*w,T=J,W=q,ce=pe),P=cs(-z,We),p=P*yo,P&&(w=Math.cos(-P),y=Math.sin(-P),J=L*w-N*y,q=D*w-j*y,pe=z*w-We*y,ne=O*y+ne*w,L=J,D=q,z=pe),P=cs(D,L),g=P*yo,P&&(w=Math.cos(P),y=Math.sin(P),J=L*w+D*y,q=T*w+W*y,D=D*w-L*y,W=W*w-T*y,L=J,T=q),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=Jt(Math.sqrt(L*L+D*D+z*z)),_=Jt(Math.sqrt(W*W+ce*ce)),P=cs(T,W),b=Math.abs(P)>2e-4?P*yo:0,v=ne?1/(ne<0?-ne:ne):0),n.svg&&(J=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!S0(Ki(e,Yt)),J&&e.setAttribute("transform",J))),Math.abs(b)>90&&Math.abs(b)<270&&(o?(h*=-1,b+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+s,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+s,n.z=f+s,n.scaleX=Jt(h),n.scaleY=Jt(_),n.rotation=Jt(g)+a,n.rotationX=Jt(m)+a,n.rotationY=Jt(p)+a,n.skewX=b+a,n.skewY=S+a,n.transformPerspective=v+s,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Jn]=Hc(c)),n.xOffset=n.yOffset=0,n.force3D=ui.force3D,n.renderTransform=n.svg?_A:_0?w0:gA,n.uncache=0,n},Hc=function(e){return(e=e.split(" "))[0]+" "+e[1]},ed=function(e,t,n){var i=Rn(t);return Jt(parseFloat(t)+parseFloat(eo(e,"x",n+"px",i)))+i},gA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,w0(e,t)},mo="0deg",pa="0px",go=") ",w0=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,S=n.zOrigin,v="",M=p==="auto"&&e&&e!==1||p===!0;if(S&&(d!==mo||u!==mo)){var C=parseFloat(u)*Rs,E=Math.sin(C),P=Math.cos(C),w;C=parseFloat(d)*Rs,w=Math.cos(C),s=ed(b,s,E*w*-S),a=ed(b,a,-Math.sin(C)*-S),l=ed(b,l,P*w*-S+S)}m!==pa&&(v+="perspective("+m+go),(i||o)&&(v+="translate("+i+"%, "+o+"%) "),(M||s!==pa||a!==pa||l!==pa)&&(v+=l!==pa||M?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+go),c!==mo&&(v+="rotate("+c+go),u!==mo&&(v+="rotateY("+u+go),d!==mo&&(v+="rotateX("+d+go),(f!==mo||h!==mo)&&(v+="skew("+f+", "+h+go),(_!==1||g!==1)&&(v+="scale("+_+", "+g+go),b.style[Yt]=v||"translate(0, 0)"},_A=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,S=parseFloat(s),v=parseFloat(a),M,C,E,P,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Rs,c*=Rs,M=Math.cos(l)*d,C=Math.sin(l)*d,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=Rs,w=Math.tan(c-u),w=Math.sqrt(1+w*w),E*=w,P*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),M*=w,C*=w)),M=Jt(M),C=Jt(C),E=Jt(E),P=Jt(P)):(M=d,P=f,C=E=0),(S&&!~(s+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(S=eo(h,"x",s,"px"),v=eo(h,"y",a,"px")),(_||g||m||p)&&(S=Jt(S+_-(_*M+g*E)+m),v=Jt(v+g-(_*C+g*P)+p)),(i||o)&&(w=h.getBBox(),S=Jt(S+i/100*w.width),v=Jt(v+o/100*w.height)),w="matrix("+M+","+C+","+E+","+P+","+S+","+v+")",h.setAttribute("transform",w),b&&(h.style[Yt]=w)},vA=function(e,t,n,i,o){var s=360,a=yn(o),l=parseFloat(o)*(a&&~o.indexOf("rad")?yo:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=o.split("_")[1],d==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-s)),d==="cw"&&c<0?c=(c+s*Om)%s-~~(c/s)*s:d==="ccw"&&c>0&&(c=(c-s*Om)%s-~~(c/s)*s)),e._pt=f=new Zn(e._pt,t,n,i,c,tA),f.e=u,f.u="deg",e._props.push(n),f},Hm=function(e,t){for(var n in t)e[n]=t[n];return e},yA=function(e,t,n){var i=Hm({},n._gsap),o="perspective,force3D,transformOrigin,svgOrigin",s=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),s[Yt]=t,a=dl(n,1),Bo(n,Yt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Yt],s[Yt]=t,a=dl(n,1),s[Yt]=c);for(l in Er)c=i[l],u=a[l],c!==u&&o.indexOf(l)<0&&(h=Rn(c),_=Rn(u),d=h!==_?eo(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new Zn(e._pt,a,l,d,f-d,xf),e._pt.u=_||0,e._props.push(l));Hm(a,i)};Kn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",o="Left",s=(e<3?[t,n,i,o]:[t+o,t+n,i+n,i+o]).map(function(a){return e<2?r+a:"border"+a+r});zc[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=s.map(function(_){return hr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},s.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Th={name:"css",register:wf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,o){var s=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,b,S,v,M,C,E,P;wh||wf(),this.styles=this.styles||g0(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(ri[g]&&o0(g,t,n,i,e,o)))){if(h=typeof u,_=zc[g],h==="function"&&(u=u.call(n,i,e,o),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=al(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",$r.lastIndex=0,$r.test(c)||(m=Rn(c),p=Rn(u)),p?m!==p&&(c=eo(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,o,0,0,g),s.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,o):l[g],yn(c)&&~c.indexOf("random(")&&(c=al(c)),Rn(c+"")||c==="auto"||(c+=ui.units[g]||Rn(hr(e,g))||""),(c+"").charAt(1)==="="&&(c=hr(e,g))):c=hr(e,g),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),g in qi&&(g==="autoAlpha"&&(f===1&&hr(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),Hr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=qi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),S=g in Er,S){if(this.styles.save(g),v||(M=e._gsap,M.renderTransform&&!t.parseTransform||dl(e,t.parseTransform),C=t.smoothOrigin!==!1&&M.smooth,v=this._pt=new Zn(this._pt,a,Yt,0,1,M.renderTransform,M,0,-1),v.dep=1),g==="scale")this._pt=new Zn(this._pt,M,"scaleY",M.scaleY,(b?As(M.scaleY,b+d):d)-M.scaleY||0,xf),this._pt.u=0,s.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(Jn,0,a[Jn]),u=pA(u),M.svg?bf(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Hr(this,M,"zOrigin",M.zOrigin,p),Hr(this,a,g,Hc(c),Hc(u)));continue}else if(g==="svgOrigin"){bf(e,u,1,C,0,this);continue}else if(g in x0){vA(this,M,g,f,b?As(f,b+u):u);continue}else if(g==="smoothOrigin"){Hr(this,M,"smooth",M.smooth,u);continue}else if(g==="force3D"){M[g]=u;continue}else if(g==="transform"){yA(this,u,e);continue}}else g in a||(g=$s(g)||g);if(S||(d||d===0)&&(f||f===0)&&!eA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Rn(u)||(g in ui.units?ui.units[g]:m),m!==p&&(f=eo(e,g,c,p)),this._pt=new Zn(this._pt,S?M:a,g,f,(b?As(f,b+d):d)-f,!S&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?iA:xf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=nA);else if(g in a)hA.call(this,e,g,c,b?b+u:u);else if(g in e)this.add(e,g,c||e[g],b?b+u:u,i,o);else if(g!=="parseTransform"){hh(g,u);continue}S||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),s.push(g)}}E&&d0(this)},render:function(e,t){if(t.tween._time||!bh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:hr,aliases:qi,getSetter:function(e,t,n){var i=qi[t];return i&&i.indexOf(",")<0&&(t=i),t in Er&&t!==Jn&&(e._gsap.x||hr(e,"x"))?n&&Im===n?t==="scale"?aA:sA:(Im=n||{})&&(t==="scale"?lA:cA):e.style&&!uh(e.style[t])?rA:~t.indexOf("-")?oA:xh(e,t)},core:{_removeProperty:Bo,_getMatrix:Eh}};Qn.utils.checkPrefix=$s;Qn.core.getStyleSaver=g0;(function(r,e,t,n){var i=Kn(r+","+e+","+t,function(o){Er[o]=1});Kn(e,function(o){ui.units[o]="deg",x0[o]=1}),qi[i[13]]=r+","+e,Kn(n,function(o){var s=o.split(":");qi[s[1]]=i[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Kn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){ui.units[r]="px"});Qn.registerPlugin(Th);var He=Qn.registerPlugin(Th)||Qn,xA=He.core.Tween;const SA=Object.freeze(Object.defineProperty({__proto__:null,Back:q1,Bounce:j1,CSSPlugin:Th,Circ:Z1,Cubic:H1,Elastic:X1,Expo:K1,Linear:B1,Power0:O1,Power1:N1,Power2:U1,Power3:F1,Power4:k1,Quad:z1,Quart:V1,Quint:G1,Sine:$1,SteppedEase:Y1,Strong:W1,TimelineLite:wn,TimelineMax:wn,TweenLite:Qt,TweenMax:xA,default:He,gsap:He},Symbol.toStringTag,{value:"Module"}));function wA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function bA(r,e,t){return e&&wA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var bn,Sc,ai,Vr,Gr,Ps,b0,xo,za,M0,vr,Ci,E0,T0=function(){return bn||typeof window<"u"&&(bn=window.gsap)&&bn.registerPlugin&&bn},A0=1,ws=[],gt=[],Zi=[],Ha=Date.now,Mf=function(e,t){return t},MA=function(){var e=za.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,gt),i.push.apply(i,Zi),gt=n,Zi=i,Mf=function(s,a){return t[s](a)}},Kr=function(e,t){return~Zi.indexOf(e)&&Zi[Zi.indexOf(e)+1][t]},Va=function(e){return!!~M0.indexOf(e)},Un=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:i!==!1,capture:!!o})},Nn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Kl="scrollLeft",Zl="scrollTop",Ef=function(){return vr&&vr.isPressed||gt.cache++},Vc=function(e,t){var n=function i(o){if(o||o===0){A0&&(ai.history.scrollRestoration="manual");var s=vr&&vr.isPressed;o=i.v=Math.round(o)||(vr&&vr.iOS?1:0),e(o),i.cacheID=gt.cache,s&&Mf("ss",o)}else(t||gt.cache!==i.cacheID||Mf("ref"))&&(i.cacheID=gt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Vn={s:Kl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Vc(function(r){return arguments.length?ai.scrollTo(r,ln.sc()):ai.pageXOffset||Vr[Kl]||Gr[Kl]||Ps[Kl]||0})},ln={s:Zl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Vn,sc:Vc(function(r){return arguments.length?ai.scrollTo(Vn.sc(),r):ai.pageYOffset||Vr[Zl]||Gr[Zl]||Ps[Zl]||0})},qn=function(e,t){return(t&&t._ctx&&t._ctx.selector||bn.utils.toArray)(e)[0]||(typeof e=="string"&&bn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},to=function(e,t){var n=t.s,i=t.sc;Va(e)&&(e=Vr.scrollingElement||Gr);var o=gt.indexOf(e),s=i===ln.sc?1:2;!~o&&(o=gt.push(e)-1),gt[o+s]||Un(e,"scroll",Ef);var a=gt[o+s],l=a||(gt[o+s]=Vc(Kr(e,n),!0)||(Va(e)?i:Vc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=bn.getProperty(e,"scrollBehavior")==="smooth"),l},Tf=function(e,t,n){var i=e,o=e,s=Ha(),a=s,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Ha();g||m-s>l?(o=i,i=_,a=s,s=m):n?i+=_:i=o+(_-o)/(m-a)*(s-a)},d=function(){o=i=n?0:i,a=s=0},f=function(_){var g=a,m=o,p=Ha();return(_||_===0)&&_!==i&&u(_),s===a||p-a>c?0:(i+(n?m:-m))/((n?p:s)-g)*1e3};return{update:u,reset:d,getVelocity:f}},ma=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Vm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},C0=function(){za=bn.core.globals().ScrollTrigger,za&&za.core&&MA()},R0=function(e){return bn=e||T0(),!Sc&&bn&&typeof document<"u"&&document.body&&(ai=window,Vr=document,Gr=Vr.documentElement,Ps=Vr.body,M0=[ai,Vr,Gr,Ps],bn.utils.clamp,E0=bn.core.context||function(){},xo="onpointerenter"in Ps?"pointer":"mouse",b0=en.isTouch=ai.matchMedia&&ai.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ai||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ci=en.eventTypes=("ontouchstart"in Gr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Gr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return A0=0},500),C0(),Sc=1),Sc};Vn.op=ln;gt.cache=0;var en=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Sc||R0(bn)||console.warn("Please gsap.registerPlugin(Observer)"),za||C0();var i=n.tolerance,o=n.dragMinimum,s=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,S=n.onPress,v=n.onRelease,M=n.onRight,C=n.onLeft,E=n.onUp,P=n.onDown,w=n.onChangeX,y=n.onChangeY,L=n.onChange,D=n.onToggleX,z=n.onToggleY,O=n.onHover,T=n.onHoverEnd,W=n.onMove,J=n.ignoreCheck,q=n.isNormalizer,pe=n.onGestureStart,N=n.onGestureEnd,j=n.onWheel,We=n.onEnable,Je=n.onDisable,ne=n.onClick,ce=n.scrollSpeed,Pe=n.capture,_e=n.allowClicks,Ae=n.lockAxis,Ze=n.onLockAxis;this.target=a=qn(a)||Gr,this.vars=n,h&&(h=bn.utils.toArray(h)),i=i||1e-9,o=o||0,_=_||1,ce=ce||1,s=s||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ai.getComputedStyle(Ps).lineHeight)||22);var we,st,at,Ne,F,rt,et,K=this,Ie=0,nt=0,ke=n.passive||!u&&n.passive!==!1,Oe=to(a,Vn),Et=to(a,ln),I=Oe(),A=Et(),X=~s.indexOf("touch")&&!~s.indexOf("pointer")&&Ci[0]==="pointerdown",ie=Va(a),re=a.ownerDocument||Vr,ee=[0,0,0],xe=[0,0,0],ye=0,Be=function(){return ye=Ha()},oe=function(Re,Qe){return(K.event=Re)&&h&&~h.indexOf(Re.target)||Qe&&X&&Re.pointerType!=="touch"||J&&J(Re,Qe)},le=function(){K._vx.reset(),K._vy.reset(),st.pause(),d&&d(K)},be=function(){var Re=K.deltaX=Vm(ee),Qe=K.deltaY=Vm(xe),Te=Math.abs(Re)>=i,it=Math.abs(Qe)>=i;L&&(Te||it)&&L(K,Re,Qe,ee,xe),Te&&(M&&K.deltaX>0&&M(K),C&&K.deltaX<0&&C(K),w&&w(K),D&&K.deltaX<0!=Ie<0&&D(K),Ie=K.deltaX,ee[0]=ee[1]=ee[2]=0),it&&(P&&K.deltaY>0&&P(K),E&&K.deltaY<0&&E(K),y&&y(K),z&&K.deltaY<0!=nt<0&&z(K),nt=K.deltaY,xe[0]=xe[1]=xe[2]=0),(Ne||at)&&(W&&W(K),at&&(m&&at===1&&m(K),b&&b(K),at=0),Ne=!1),rt&&!(rt=!1)&&Ze&&Ze(K),F&&(j(K),F=!1),we=0},Ee=function(Re,Qe,Te){ee[Te]+=Re,xe[Te]+=Qe,K._vx.update(Re),K._vy.update(Qe),c?we||(we=requestAnimationFrame(be)):be()},Xe=function(Re,Qe){Ae&&!et&&(K.axis=et=Math.abs(Re)>Math.abs(Qe)?"x":"y",rt=!0),et!=="y"&&(ee[2]+=Re,K._vx.update(Re,!0)),et!=="x"&&(xe[2]+=Qe,K._vy.update(Qe,!0)),c?we||(we=requestAnimationFrame(be)):be()},Se=function(Re){if(!oe(Re,1)){Re=ma(Re,u);var Qe=Re.clientX,Te=Re.clientY,it=Qe-K.x,ge=Te-K.y,Ge=K.isDragging;K.x=Qe,K.y=Te,(Ge||(it||ge)&&(Math.abs(K.startX-Qe)>=o||Math.abs(K.startY-Te)>=o))&&(at=Ge?2:1,Ge||(K.isDragging=!0),Xe(it,ge))}},Me=K.onPress=function(Le){oe(Le,1)||Le&&Le.button||(K.axis=et=null,st.pause(),K.isPressed=!0,Le=ma(Le),Ie=nt=0,K.startX=K.x=Le.clientX,K.startY=K.y=Le.clientY,K._vx.reset(),K._vy.reset(),Un(q?a:re,Ci[1],Se,ke,!0),K.deltaX=K.deltaY=0,S&&S(K))},U=K.onRelease=function(Le){if(!oe(Le,1)){Nn(q?a:re,Ci[1],Se,!0);var Re=!isNaN(K.y-K.startY),Qe=K.isDragging,Te=Qe&&(Math.abs(K.x-K.startX)>3||Math.abs(K.y-K.startY)>3),it=ma(Le);!Te&&Re&&(K._vx.reset(),K._vy.reset(),u&&_e&&bn.delayedCall(.08,function(){if(Ha()-ye>300&&!Le.defaultPrevented){if(Le.target.click)Le.target.click();else if(re.createEvent){var ge=re.createEvent("MouseEvents");ge.initMouseEvent("click",!0,!0,ai,1,it.screenX,it.screenY,it.clientX,it.clientY,!1,!1,!1,!1,0,null),Le.target.dispatchEvent(ge)}}})),K.isDragging=K.isGesturing=K.isPressed=!1,d&&Qe&&!q&&st.restart(!0),at&&be(),p&&Qe&&p(K),v&&v(K,Te)}},me=function(Re){return Re.touches&&Re.touches.length>1&&(K.isGesturing=!0)&&pe(Re,K.isDragging)},ue=function(){return(K.isGesturing=!1)||N(K)},Ce=function(Re){if(!oe(Re)){var Qe=Oe(),Te=Et();Ee((Qe-I)*ce,(Te-A)*ce,1),I=Qe,A=Te,d&&st.restart(!0)}},fe=function(Re){if(!oe(Re)){Re=ma(Re,u),j&&(F=!0);var Qe=(Re.deltaMode===1?l:Re.deltaMode===2?ai.innerHeight:1)*_;Ee(Re.deltaX*Qe,Re.deltaY*Qe,0),d&&!q&&st.restart(!0)}},ae=function(Re){if(!oe(Re)){var Qe=Re.clientX,Te=Re.clientY,it=Qe-K.x,ge=Te-K.y;K.x=Qe,K.y=Te,Ne=!0,d&&st.restart(!0),(it||ge)&&Xe(it,ge)}},Ue=function(Re){K.event=Re,O(K)},ze=function(Re){K.event=Re,T(K)},wt=function(Re){return oe(Re)||ma(Re,u)&&ne(K)};st=K._dc=bn.delayedCall(f||.25,le).pause(),K.deltaX=K.deltaY=0,K._vx=Tf(0,50,!0),K._vy=Tf(0,50,!0),K.scrollX=Oe,K.scrollY=Et,K.isDragging=K.isGesturing=K.isPressed=!1,E0(this),K.enable=function(Le){return K.isEnabled||(Un(ie?re:a,"scroll",Ef),s.indexOf("scroll")>=0&&Un(ie?re:a,"scroll",Ce,ke,Pe),s.indexOf("wheel")>=0&&Un(a,"wheel",fe,ke,Pe),(s.indexOf("touch")>=0&&b0||s.indexOf("pointer")>=0)&&(Un(a,Ci[0],Me,ke,Pe),Un(re,Ci[2],U),Un(re,Ci[3],U),_e&&Un(a,"click",Be,!0,!0),ne&&Un(a,"click",wt),pe&&Un(re,"gesturestart",me),N&&Un(re,"gestureend",ue),O&&Un(a,xo+"enter",Ue),T&&Un(a,xo+"leave",ze),W&&Un(a,xo+"move",ae)),K.isEnabled=!0,K.isDragging=K.isGesturing=K.isPressed=Ne=at=!1,K._vx.reset(),K._vy.reset(),I=Oe(),A=Et(),Le&&Le.type&&Me(Le),We&&We(K)),K},K.disable=function(){K.isEnabled&&(ws.filter(function(Le){return Le!==K&&Va(Le.target)}).length||Nn(ie?re:a,"scroll",Ef),K.isPressed&&(K._vx.reset(),K._vy.reset(),Nn(q?a:re,Ci[1],Se,!0)),Nn(ie?re:a,"scroll",Ce,Pe),Nn(a,"wheel",fe,Pe),Nn(a,Ci[0],Me,Pe),Nn(re,Ci[2],U),Nn(re,Ci[3],U),Nn(a,"click",Be,!0),Nn(a,"click",wt),Nn(re,"gesturestart",me),Nn(re,"gestureend",ue),Nn(a,xo+"enter",Ue),Nn(a,xo+"leave",ze),Nn(a,xo+"move",ae),K.isEnabled=K.isPressed=K.isDragging=!1,Je&&Je(K))},K.kill=K.revert=function(){K.disable();var Le=ws.indexOf(K);Le>=0&&ws.splice(Le,1),vr===K&&(vr=0)},ws.push(K),q&&Va(a)&&(vr=K),K.enable(g)},bA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();en.version="3.12.7";en.create=function(r){return new en(r)};en.register=R0;en.getAll=function(){return ws.slice()};en.getById=function(r){return ws.filter(function(e){return e.vars.id===r})[0]};T0()&&bn.registerPlugin(en);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ve,gs,mt,zt,oi,Rt,Ah,Gc,fl,Ga,Ma,Jl,An,ru,Af,Bn,Gm,Wm,_s,P0,td,L0,kn,Cf,D0,I0,Nr,Rf,Ch,Ls,Rh,Wc,Pf,nd,Ql=1,Cn=Date.now,id=Cn(),bi=0,Ea=0,Xm=function(e,t,n){var i=ii(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},qm=function(e,t){return t&&(!ii(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},EA=function r(){return Ea&&requestAnimationFrame(r)},Ym=function(){return ru=1},jm=function(){return ru=0},Gi=function(e){return e},Ta=function(e){return Math.round(e*1e5)/1e5||0},O0=function(){return typeof window<"u"},N0=function(){return Ve||O0()&&(Ve=window.gsap)&&Ve.registerPlugin&&Ve},zo=function(e){return!!~Ah.indexOf(e)},U0=function(e){return(e==="Height"?Rh:mt["inner"+e])||oi["client"+e]||Rt["client"+e]},F0=function(e){return Kr(e,"getBoundingClientRect")||(zo(e)?function(){return Tc.width=mt.innerWidth,Tc.height=Rh,Tc}:function(){return pr(e)})},TA=function(e,t,n){var i=n.d,o=n.d2,s=n.a;return(s=Kr(e,"getBoundingClientRect"))?function(){return s()[i]}:function(){return(t?U0(o):e["client"+o])||0}},AA=function(e,t){return!t||~Zi.indexOf(e)?F0(e):function(){return Tc}},Yi=function(e,t){var n=t.s,i=t.d2,o=t.d,s=t.a;return Math.max(0,(n="scroll"+i)&&(s=Kr(e,n))?s()-F0(e)()[o]:zo(e)?(oi[n]||Rt[n])-U0(i):e[n]-e["offset"+i])},ec=function(e,t){for(var n=0;n<_s.length;n+=3)(!t||~t.indexOf(_s[n+1]))&&e(_s[n],_s[n+1],_s[n+2])},ii=function(e){return typeof e=="string"},Pn=function(e){return typeof e=="function"},Aa=function(e){return typeof e=="number"},So=function(e){return typeof e=="object"},ga=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},rd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},us=Math.abs,k0="left",B0="top",Ph="right",Lh="bottom",Oo="width",No="height",Wa="Right",Xa="Left",qa="Top",Ya="Bottom",on="padding",gi="margin",Ks="Width",Dh="Height",an="px",_i=function(e){return mt.getComputedStyle(e)},CA=function(e){var t=_i(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},$m=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},pr=function(e,t){var n=t&&_i(e)[Af]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ve.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Xc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},z0=function(e){var t=[],n=e.labels,i=e.duration(),o;for(o in n)t.push(n[o]/i);return t},RA=function(e){return function(t){return Ve.utils.snap(z0(e),t)}},Ih=function(e){var t=Ve.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,o){return i-o});return n?function(i,o,s){s===void 0&&(s=.001);var a;if(!o)return t(i);if(o>0){for(i-=s,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=s;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,o,s){s===void 0&&(s=.001);var a=t(i);return!o||Math.abs(a-i)<s||a-i<0==o<0?a:t(o<0?i-e:i+e)}},PA=function(e){return function(t,n){return Ih(z0(e))(t,n.direction)}},tc=function(e,t,n,i){return n.split(",").forEach(function(o){return e(t,o,i)})},_n=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:!i,capture:!!o})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},nc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Km={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ic={toggleActions:"play",anticipatePin:0},qc={top:0,left:0,center:.5,bottom:1,right:1},wc=function(e,t){if(ii(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in qc?qc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},rc=function(e,t,n,i,o,s,a,l){var c=o.startColor,u=o.endColor,d=o.fontSize,f=o.indent,h=o.fontWeight,_=zt.createElement("div"),g=zo(n)||Kr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Rt:n,b=e.indexOf("start")!==-1,S=b?c:u,v="border-color:"+S+";font-size:"+d+";color:"+S+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===ln?Ph:Lh)+":"+(s+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=b,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],bc(_,0,i,b),_},bc=function(e,t,n,i){var o={display:"block"},s=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,o[n.a+"Percent"]=i?-100:0,o[n.a]=i?"1px":0,o["border"+s+Ks]=1,o["border"+a+Ks]=0,o[n.p]=t+"px",Ve.set(e,o)},pt=[],Lf={},hl,Zm=function(){return Cn()-bi>34&&(hl||(hl=requestAnimationFrame(wr)))},ds=function(){(!kn||!kn.isPressed||kn.startX>Rt.clientWidth)&&(gt.cache++,kn?hl||(hl=requestAnimationFrame(wr)):wr(),bi||Vo("scrollStart"),bi=Cn())},od=function(){I0=mt.innerWidth,D0=mt.innerHeight},Ca=function(e){gt.cache++,(e===!0||!An&&!L0&&!zt.fullscreenElement&&!zt.webkitFullscreenElement&&(!Cf||I0!==mt.innerWidth||Math.abs(mt.innerHeight-D0)>mt.innerHeight*.25))&&Gc.restart(!0)},Ho={},LA=[],H0=function r(){return gn(qe,"scrollEnd",r)||To(!0)},Vo=function(e){return Ho[e]&&Ho[e].map(function(t){return t()})||LA},ni=[],V0=function(e){for(var t=0;t<ni.length;t+=5)(!e||ni[t+4]&&ni[t+4].query===e)&&(ni[t].style.cssText=ni[t+1],ni[t].getBBox&&ni[t].setAttribute("transform",ni[t+2]||""),ni[t+3].uncache=1)},Oh=function(e,t){var n;for(Bn=0;Bn<pt.length;Bn++)n=pt[Bn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Wc=!0,t&&V0(t),t||Vo("revert")},G0=function(e,t){gt.cache++,(t||!zn)&&gt.forEach(function(n){return Pn(n)&&n.cacheID++&&(n.rec=0)}),ii(e)&&(mt.history.scrollRestoration=Ch=e)},zn,Uo=0,Jm,DA=function(){if(Jm!==Uo){var e=Jm=Uo;requestAnimationFrame(function(){return e===Uo&&To(!0)})}},W0=function(){Rt.appendChild(Ls),Rh=!kn&&Ls.offsetHeight||mt.innerHeight,Rt.removeChild(Ls)},Qm=function(e){return fl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},To=function(e,t){if(oi=zt.documentElement,Rt=zt.body,Ah=[mt,zt,oi,Rt],bi&&!e&&!Wc){_n(qe,"scrollEnd",H0);return}W0(),zn=qe.isRefreshing=!0,gt.forEach(function(i){return Pn(i)&&++i.cacheID&&(i.rec=i())});var n=Vo("refreshInit");P0&&qe.sort(),t||Oh(),gt.forEach(function(i){Pn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),pt.slice(0).forEach(function(i){return i.refresh()}),Wc=!1,pt.forEach(function(i){if(i._subPinOffset&&i.pin){var o=i.vars.horizontal?"offsetWidth":"offsetHeight",s=i.pin[o];i.revert(!0,1),i.adjustPinSpacing(i.pin[o]-s),i.refresh()}}),Pf=1,Qm(!0),pt.forEach(function(i){var o=Yi(i.scroller,i._dir),s=i.vars.end==="max"||i._endClamp&&i.end>o,a=i._startClamp&&i.start>=o;(s||a)&&i.setPositions(a?o-1:i.start,s?Math.max(a?o:i.start+1,o):i.end,!0)}),Qm(!1),Pf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),gt.forEach(function(i){Pn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),G0(Ch,1),Gc.pause(),Uo++,zn=2,wr(2),pt.forEach(function(i){return Pn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),zn=qe.isRefreshing=!1,Vo("refresh")},Df=0,Mc=1,ja,wr=function(e){if(e===2||!zn&&!Wc){qe.isUpdating=!0,ja&&ja.update(0);var t=pt.length,n=Cn(),i=n-id>=50,o=t&&pt[0].scroll();if(Mc=Df>o?-1:1,zn||(Df=o),i&&(bi&&!ru&&n-bi>200&&(bi=0,Vo("scrollEnd")),Ma=id,id=n),Mc<0){for(Bn=t;Bn-- >0;)pt[Bn]&&pt[Bn].update(0,i);Mc=1}else for(Bn=0;Bn<t;Bn++)pt[Bn]&&pt[Bn].update(0,i);qe.isUpdating=!1}hl=0},If=[k0,B0,Lh,Ph,gi+Ya,gi+Wa,gi+qa,gi+Xa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ec=If.concat([Oo,No,"boxSizing","max"+Ks,"max"+Dh,"position",gi,on,on+qa,on+Wa,on+Ya,on+Xa]),IA=function(e,t,n){Ds(n);var i=e._gsap;if(i.spacerIsNative)Ds(i.spacerState);else if(e._gsap.swappedIn){var o=t.parentNode;o&&(o.insertBefore(e,t),o.removeChild(t))}e._gsap.swappedIn=!1},sd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var o=If.length,s=t.style,a=e.style,l;o--;)l=If[o],s[l]=n[l];s.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(s.display="inline-block"),a[Lh]=a[Ph]="auto",s.flexBasis=n.flexBasis||"auto",s.overflow="visible",s.boxSizing="border-box",s[Oo]=Xc(e,Vn)+an,s[No]=Xc(e,ln)+an,s[on]=a[gi]=a[B0]=a[k0]="0",Ds(i),a[Oo]=a["max"+Ks]=n[Oo],a[No]=a["max"+Dh]=n[No],a[on]=n[on],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},OA=/([A-Z])/g,Ds=function(e){if(e){var t=e.t.style,n=e.length,i=0,o,s;for((e.t._gsap||Ve.core.getCache(e.t)).uncache=1;i<n;i+=2)s=e[i+1],o=e[i],s?t[o]=s:t[o]&&t.removeProperty(o.replace(OA,"-$1").toLowerCase())}},oc=function(e){for(var t=Ec.length,n=e.style,i=[],o=0;o<t;o++)i.push(Ec[o],n[Ec[o]]);return i.t=e,i},NA=function(e,t,n){for(var i=[],o=e.length,s=n?8:0,a;s<o;s+=2)a=e[s],i.push(a,a in t?t[a]:e[s+1]);return i.t=e.t,i},Tc={left:0,top:0},eg=function(e,t,n,i,o,s,a,l,c,u,d,f,h,_){Pn(e)&&(e=e(l)),ii(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?wc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),Aa(e))h&&(e=Ve.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&bc(a,n,i,!0);else{Pn(t)&&(t=t(l));var S=(e||"0").split(" "),v,M,C,E;b=qn(t,l)||Rt,v=pr(b)||{},(!v||!v.left&&!v.top)&&_i(b).display==="none"&&(E=b.style.display,b.style.display="block",v=pr(b),E?b.style.display=E:b.style.removeProperty("display")),M=wc(S[0],v[i.d]),C=wc(S[1]||"0",n),e=v[i.p]-c[i.p]-u+M+o-C,a&&bc(a,C,i,n-C<20||a._isStart&&C>20),n-=n-C}if(_&&(l[_]=e||-.001,e<0&&(e=0)),s){var P=e+n,w=s._isStart;m="scroll"+i.d2,bc(s,P,i,w&&P>20||!w&&(d?Math.max(Rt[m],oi[m]):s.parentNode[m])<=P+1),d&&(c=pr(a),d&&(s.style[i.op.p]=c[i.op.p]-i.op.m-s._offset+an))}return h&&b&&(m=pr(b),h.seek(f),p=pr(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},UA=/(webkit|moz|length|cssText|inset)/i,tg=function(e,t,n,i){if(e.parentNode!==t){var o=e.style,s,a;if(t===Rt){e._stOrig=o.cssText,a=_i(e);for(s in a)!+s&&!UA.test(s)&&a[s]&&typeof o[s]=="string"&&s!=="0"&&(o[s]=a[s]);o.top=n,o.left=i}else o.cssText=e._stOrig;Ve.core.getCache(e).uncache=1,t.appendChild(e)}},X0=function(e,t,n){var i=t,o=i;return function(s){var a=Math.round(e());return a!==i&&a!==o&&Math.abs(a-i)>3&&Math.abs(a-o)>3&&(s=a,n&&n()),o=i,i=Math.round(s),i}},sc=function(e,t,n){var i={};i[t.p]="+="+n,Ve.set(e,i)},ng=function(e,t){var n=to(e,t),i="_scroll"+t.p2,o=function s(a,l,c,u,d){var f=s.tween,h=l.onComplete,_={};c=c||n();var g=X0(n,c,function(){f.kill(),s.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){gt.cache++,s.tween&&wr()},l.onComplete=function(){s.tween=0,h&&h.call(f)},f=s.tween=Ve.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return o.tween&&o.tween.kill()&&(o.tween=0)},_n(e,"wheel",n.wheelHandler),qe.isTouch&&_n(e,"touchmove",n.wheelHandler),o},qe=function(){function r(t,n){gs||r.register(Ve)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Rf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ea){this.update=this.refresh=this.kill=Gi;return}n=$m(ii(n)||Aa(n)||n.nodeType?{trigger:n}:n,ic);var o=n,s=o.onUpdate,a=o.toggleClass,l=o.id,c=o.onToggle,u=o.onRefresh,d=o.scrub,f=o.trigger,h=o.pin,_=o.pinSpacing,g=o.invalidateOnRefresh,m=o.anticipatePin,p=o.onScrubComplete,b=o.onSnapComplete,S=o.once,v=o.snap,M=o.pinReparent,C=o.pinSpacer,E=o.containerAnimation,P=o.fastScrollEnd,w=o.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Vn:ln,L=!d&&d!==0,D=qn(n.scroller||mt),z=Ve.core.getCache(D),O=zo(D),T=("pinType"in n?n.pinType:Kr(D,"pinType")||O&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],J=L&&n.toggleActions.split(" "),q="markers"in n?n.markers:ic.markers,pe=O?0:parseFloat(_i(D)["border"+y.p2+Ks])||0,N=this,j=n.onRefreshInit&&function(){return n.onRefreshInit(N)},We=TA(D,O,y),Je=AA(D,O),ne=0,ce=0,Pe=0,_e=to(D,y),Ae,Ze,we,st,at,Ne,F,rt,et,K,Ie,nt,ke,Oe,Et,I,A,X,ie,re,ee,xe,ye,Be,oe,le,be,Ee,Xe,Se,Me,U,me,ue,Ce,fe,ae,Ue,ze;if(N._startClamp=N._endClamp=!1,N._dir=y,m*=45,N.scroller=D,N.scroll=E?E.time.bind(E):_e,st=_e(),N.vars=n,i=i||n.animation,"refreshPriority"in n&&(P0=1,n.refreshPriority===-9999&&(ja=N)),z.tweenScroll=z.tweenScroll||{top:ng(D,ln),left:ng(D,Vn)},N.tweenTo=Ae=z.tweenScroll[y.p],N.scrubDuration=function(Te){me=Aa(Te)&&Te,me?U?U.duration(Te):U=Ve.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:me,paused:!0,onComplete:function(){return p&&p(N)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!N.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),N.animation=i.pause(),i.scrollTrigger=N,N.scrubDuration(d),Se=0,l||(l=i.vars.id)),v&&((!So(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Rt.style&&Ve.set(O?[Rt,oi]:D,{scrollBehavior:"auto"}),gt.forEach(function(Te){return Pn(Te)&&Te.target===(O?zt.scrollingElement||oi:D)&&(Te.smooth=!1)}),we=Pn(v.snapTo)?v.snapTo:v.snapTo==="labels"?RA(i):v.snapTo==="labelsDirectional"?PA(i):v.directional!==!1?function(Te,it){return Ih(v.snapTo)(Te,Cn()-ce<500?0:it.direction)}:Ve.utils.snap(v.snapTo),ue=v.duration||{min:.1,max:2},ue=So(ue)?Ga(ue.min,ue.max):Ga(ue,ue),Ce=Ve.delayedCall(v.delay||me/2||.1,function(){var Te=_e(),it=Cn()-ce<500,ge=Ae.tween;if((it||Math.abs(N.getVelocity())<10)&&!ge&&!ru&&ne!==Te){var Ge=(Te-Ne)/Oe,Gt=i&&!L?i.totalProgress():Ge,ft=it?0:(Gt-Me)/(Cn()-Ma)*1e3||0,Pt=Ve.utils.clamp(-Ge,1-Ge,us(ft/2)*ft/.185),Kt=Ge+(v.inertia===!1?0:Pt),Tt,Lt,ct=v,Dn=ct.onStart,Nt=ct.onInterrupt,fn=ct.onComplete;if(Tt=we(Kt,N),Aa(Tt)||(Tt=Kt),Lt=Math.max(0,Math.round(Ne+Tt*Oe)),Te<=F&&Te>=Ne&&Lt!==Te){if(ge&&!ge._initted&&ge.data<=us(Lt-Te))return;v.inertia===!1&&(Pt=Tt-Ge),Ae(Lt,{duration:ue(us(Math.max(us(Kt-Gt),us(Tt-Gt))*.185/ft/.05||0)),ease:v.ease||"power3",data:us(Lt-Te),onInterrupt:function(){return Ce.restart(!0)&&Nt&&Nt(N)},onComplete:function(){N.update(),ne=_e(),i&&!L&&(U?U.resetTo("totalProgress",Tt,i._tTime/i._tDur):i.progress(Tt)),Se=Me=i&&!L?i.totalProgress():N.progress,b&&b(N),fn&&fn(N)}},Te,Pt*Oe,Lt-Te-Pt*Oe),Dn&&Dn(N,Ae.tween)}}else N.isActive&&ne!==Te&&Ce.restart(!0)}).pause()),l&&(Lf[l]=N),f=N.trigger=qn(f||h!==!0&&h),ze=f&&f._gsap&&f._gsap.stRevert,ze&&(ze=ze(N)),h=h===!0?f:qn(h),ii(a)&&(a={targets:f,className:a}),h&&(_===!1||_===gi||(_=!_&&h.parentNode&&h.parentNode.style&&_i(h.parentNode).display==="flex"?!1:on),N.pin=h,Ze=Ve.core.getCache(h),Ze.spacer?Et=Ze.pinState:(C&&(C=qn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Ze.spacerIsNative=!!C,C&&(Ze.spacerState=oc(C))),Ze.spacer=X=C||zt.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),Ze.pinState=Et=oc(h)),n.force3D!==!1&&Ve.set(h,{force3D:!0}),N.spacer=X=Ze.spacer,Xe=_i(h),Be=Xe[_+y.os2],re=Ve.getProperty(h),ee=Ve.quickSetter(h,y.a,an),sd(h,X,Xe),A=oc(h)),q){nt=So(q)?$m(q,Km):Km,K=rc("scroller-start",l,D,y,nt,0),Ie=rc("scroller-end",l,D,y,nt,0,K),ie=K["offset"+y.op.d2];var wt=qn(Kr(D,"content")||D);rt=this.markerStart=rc("start",l,wt,y,nt,ie,0,E),et=this.markerEnd=rc("end",l,wt,y,nt,ie,0,E),E&&(Ue=Ve.quickSetter([rt,et],y.a,an)),!T&&!(Zi.length&&Kr(D,"fixedMarkers")===!0)&&(CA(O?Rt:D),Ve.set([K,Ie],{force3D:!0}),le=Ve.quickSetter(K,y.a,an),Ee=Ve.quickSetter(Ie,y.a,an))}if(E){var Le=E.vars.onUpdate,Re=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){N.update(0,0,1),Le&&Le.apply(E,Re||[])})}if(N.previous=function(){return pt[pt.indexOf(N)-1]},N.next=function(){return pt[pt.indexOf(N)+1]},N.revert=function(Te,it){if(!it)return N.kill(!0);var ge=Te!==!1||!N.enabled,Ge=An;ge!==N.isReverted&&(ge&&(fe=Math.max(_e(),N.scroll.rec||0),Pe=N.progress,ae=i&&i.progress()),rt&&[rt,et,K,Ie].forEach(function(Gt){return Gt.style.display=ge?"none":"block"}),ge&&(An=N,N.update(ge)),h&&(!M||!N.isActive)&&(ge?IA(h,X,Et):sd(h,X,_i(h),oe)),ge||N.update(ge),An=Ge,N.isReverted=ge)},N.refresh=function(Te,it,ge,Ge){if(!((An||!N.enabled)&&!it)){if(h&&Te&&bi){_n(r,"scrollEnd",H0);return}!zn&&j&&j(N),An=N,Ae.tween&&!ge&&(Ae.tween.kill(),Ae.tween=0),U&&U.pause(),g&&i&&i.revert({kill:!1}).invalidate(),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var Gt=We(),ft=Je(),Pt=E?E.duration():Yi(D,y),Kt=Oe<=.01,Tt=0,Lt=Ge||0,ct=So(ge)?ge.end:n.end,Dn=n.endTrigger||f,Nt=So(ge)?ge.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),fn=N.pinnedContainer=n.pinnedContainer&&qn(n.pinnedContainer,N),xn=f&&Math.max(0,pt.indexOf(N))||0,Wt=xn,Ct,R,V,Q,Z,H,he,x,k,B,$,se,Y;for(q&&So(ge)&&(se=Ve.getProperty(K,y.p),Y=Ve.getProperty(Ie,y.p));Wt-- >0;)H=pt[Wt],H.end||H.refresh(0,1)||(An=N),he=H.pin,he&&(he===f||he===h||he===fn)&&!H.isReverted&&(B||(B=[]),B.unshift(H),H.revert(!0,!0)),H!==pt[Wt]&&(xn--,Wt--);for(Pn(Nt)&&(Nt=Nt(N)),Nt=Xm(Nt,"start",N),Ne=eg(Nt,f,Gt,y,_e(),rt,K,N,ft,pe,T,Pt,E,N._startClamp&&"_startClamp")||(h?-.001:0),Pn(ct)&&(ct=ct(N)),ii(ct)&&!ct.indexOf("+=")&&(~ct.indexOf(" ")?ct=(ii(Nt)?Nt.split(" ")[0]:"")+ct:(Tt=wc(ct.substr(2),Gt),ct=ii(Nt)?Nt:(E?Ve.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Ne):Ne)+Tt,Dn=f)),ct=Xm(ct,"end",N),F=Math.max(Ne,eg(ct||(Dn?"100% 0":Pt),Dn,Gt,y,_e()+Tt,et,Ie,N,ft,pe,T,Pt,E,N._endClamp&&"_endClamp"))||-.001,Tt=0,Wt=xn;Wt--;)H=pt[Wt],he=H.pin,he&&H.start-H._pinPush<=Ne&&!E&&H.end>0&&(Ct=H.end-(N._startClamp?Math.max(0,H.start):H.start),(he===f&&H.start-H._pinPush<Ne||he===fn)&&isNaN(Nt)&&(Tt+=Ct*(1-H.progress)),he===h&&(Lt+=Ct));if(Ne+=Tt,F+=Tt,N._startClamp&&(N._startClamp+=Tt),N._endClamp&&!zn&&(N._endClamp=F||-.001,F=Math.min(F,Yi(D,y))),Oe=F-Ne||(Ne-=.01)&&.001,Kt&&(Pe=Ve.utils.clamp(0,1,Ve.utils.normalize(Ne,F,fe))),N._pinPush=Lt,rt&&Tt&&(Ct={},Ct[y.a]="+="+Tt,fn&&(Ct[y.p]="-="+_e()),Ve.set([rt,et],Ct)),h&&!(Pf&&N.end>=Yi(D,y)))Ct=_i(h),Q=y===ln,V=_e(),xe=parseFloat(re(y.a))+Lt,!Pt&&F>1&&($=(O?zt.scrollingElement||oi:D).style,$={style:$,value:$["overflow"+y.a.toUpperCase()]},O&&_i(Rt)["overflow"+y.a.toUpperCase()]!=="scroll"&&($.style["overflow"+y.a.toUpperCase()]="scroll")),sd(h,X,Ct),A=oc(h),R=pr(h,!0),x=T&&to(D,Q?Vn:ln)(),_?(oe=[_+y.os2,Oe+Lt+an],oe.t=X,Wt=_===on?Xc(h,y)+Oe+Lt:0,Wt&&(oe.push(y.d,Wt+an),X.style.flexBasis!=="auto"&&(X.style.flexBasis=Wt+an)),Ds(oe),fn&&pt.forEach(function(ve){ve.pin===fn&&ve.vars.pinSpacing!==!1&&(ve._subPinOffset=!0)}),T&&_e(fe)):(Wt=Xc(h,y),Wt&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=Wt+an)),T&&(Z={top:R.top+(Q?V-Ne:x)+an,left:R.left+(Q?x:V-Ne)+an,boxSizing:"border-box",position:"fixed"},Z[Oo]=Z["max"+Ks]=Math.ceil(R.width)+an,Z[No]=Z["max"+Dh]=Math.ceil(R.height)+an,Z[gi]=Z[gi+qa]=Z[gi+Wa]=Z[gi+Ya]=Z[gi+Xa]="0",Z[on]=Ct[on],Z[on+qa]=Ct[on+qa],Z[on+Wa]=Ct[on+Wa],Z[on+Ya]=Ct[on+Ya],Z[on+Xa]=Ct[on+Xa],I=NA(Et,Z,M),zn&&_e(0)),i?(k=i._initted,td(1),i.render(i.duration(),!0,!0),ye=re(y.a)-xe+Oe+Lt,be=Math.abs(Oe-ye)>1,T&&be&&I.splice(I.length-2,2),i.render(0,!0,!0),k||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),td(0)):ye=Oe,$&&($.value?$.style["overflow"+y.a.toUpperCase()]=$.value:$.style.removeProperty("overflow-"+y.a));else if(f&&_e()&&!E)for(R=f.parentNode;R&&R!==Rt;)R._pinOffset&&(Ne-=R._pinOffset,F-=R._pinOffset),R=R.parentNode;B&&B.forEach(function(ve){return ve.revert(!1,!0)}),N.start=Ne,N.end=F,st=at=zn?fe:_e(),!E&&!zn&&(st<fe&&_e(fe),N.scroll.rec=0),N.revert(!1,!0),ce=Cn(),Ce&&(ne=-1,Ce.restart(!0)),An=0,i&&L&&(i._initted||ae)&&i.progress()!==ae&&i.progress(ae||0,!0).render(i.time(),!0,!0),(Kt||Pe!==N.progress||E||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(E&&Ne<-.001&&!Pe?Ve.utils.normalize(Ne,F,0):Pe,!0),N.progress=Kt||(st-Ne)/Oe===Pe?0:Pe),h&&_&&(X._pinOffset=Math.round(N.progress*ye)),U&&U.invalidate(),isNaN(se)||(se-=Ve.getProperty(K,y.p),Y-=Ve.getProperty(Ie,y.p),sc(K,y,se),sc(rt,y,se-(Ge||0)),sc(Ie,y,Y),sc(et,y,Y-(Ge||0))),Kt&&!zn&&N.update(),u&&!zn&&!ke&&(ke=!0,u(N),ke=!1)}},N.getVelocity=function(){return(_e()-at)/(Cn()-Ma)*1e3||0},N.endAnimation=function(){ga(N.callbackAnimation),i&&(U?U.progress(1):i.paused()?L||ga(i,N.direction<0,1):ga(i,i.reversed()))},N.labelToScroll=function(Te){return i&&i.labels&&(Ne||N.refresh()||Ne)+i.labels[Te]/i.duration()*Oe||0},N.getTrailing=function(Te){var it=pt.indexOf(N),ge=N.direction>0?pt.slice(0,it).reverse():pt.slice(it+1);return(ii(Te)?ge.filter(function(Ge){return Ge.vars.preventOverlaps===Te}):ge).filter(function(Ge){return N.direction>0?Ge.end<=Ne:Ge.start>=F})},N.update=function(Te,it,ge){if(!(E&&!ge&&!Te)){var Ge=zn===!0?fe:N.scroll(),Gt=Te?0:(Ge-Ne)/Oe,ft=Gt<0?0:Gt>1?1:Gt||0,Pt=N.progress,Kt,Tt,Lt,ct,Dn,Nt,fn,xn;if(it&&(at=st,st=E?_e():Ge,v&&(Me=Se,Se=i&&!L?i.totalProgress():ft)),m&&h&&!An&&!Ql&&bi&&(!ft&&Ne<Ge+(Ge-at)/(Cn()-Ma)*m?ft=1e-4:ft===1&&F>Ge+(Ge-at)/(Cn()-Ma)*m&&(ft=.9999)),ft!==Pt&&N.enabled){if(Kt=N.isActive=!!ft&&ft<1,Tt=!!Pt&&Pt<1,Nt=Kt!==Tt,Dn=Nt||!!ft!=!!Pt,N.direction=ft>Pt?1:-1,N.progress=ft,Dn&&!An&&(Lt=ft&&!Pt?0:ft===1?1:Pt===1?2:3,L&&(ct=!Nt&&J[Lt+1]!=="none"&&J[Lt+1]||J[Lt],xn=i&&(ct==="complete"||ct==="reset"||ct in i))),w&&(Nt||xn)&&(xn||d||!i)&&(Pn(w)?w(N):N.getTrailing(w).forEach(function(V){return V.endAnimation()})),L||(U&&!An&&!Ql?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",ft,i._tTime/i._tDur):(U.vars.totalProgress=ft,U.invalidate().restart())):i&&i.totalProgress(ft,!!(An&&(ce||Te)))),h){if(Te&&_&&(X.style[_+y.os2]=Be),!T)ee(Ta(xe+ye*ft));else if(Dn){if(fn=!Te&&ft>Pt&&F+1>Ge&&Ge+1>=Yi(D,y),M)if(!Te&&(Kt||fn)){var Wt=pr(h,!0),Ct=Ge-Ne;tg(h,Rt,Wt.top+(y===ln?Ct:0)+an,Wt.left+(y===ln?0:Ct)+an)}else tg(h,X);Ds(Kt||fn?I:A),be&&ft<1&&Kt||ee(xe+(ft===1&&!fn?ye:0))}}v&&!Ae.tween&&!An&&!Ql&&Ce.restart(!0),a&&(Nt||S&&ft&&(ft<1||!nd))&&fl(a.targets).forEach(function(V){return V.classList[Kt||S?"add":"remove"](a.className)}),s&&!L&&!Te&&s(N),Dn&&!An?(L&&(xn&&(ct==="complete"?i.pause().totalProgress(1):ct==="reset"?i.restart(!0).pause():ct==="restart"?i.restart(!0):i[ct]()),s&&s(N)),(Nt||!nd)&&(c&&Nt&&rd(N,c),W[Lt]&&rd(N,W[Lt]),S&&(ft===1?N.kill(!1,1):W[Lt]=0),Nt||(Lt=ft===1?1:3,W[Lt]&&rd(N,W[Lt]))),P&&!Kt&&Math.abs(N.getVelocity())>(Aa(P)?P:2500)&&(ga(N.callbackAnimation),U?U.progress(1):ga(i,ct==="reverse"?1:!ft,1))):L&&s&&!An&&s(N)}if(Ee){var R=E?Ge/E.duration()*(E._caScrollDist||0):Ge;le(R+(K._isFlipped?1:0)),Ee(R)}Ue&&Ue(-Ge/E.duration()*(E._caScrollDist||0))}},N.enable=function(Te,it){N.enabled||(N.enabled=!0,_n(D,"resize",Ca),O||_n(D,"scroll",ds),j&&_n(r,"refreshInit",j),Te!==!1&&(N.progress=Pe=0,st=at=ne=_e()),it!==!1&&N.refresh())},N.getTween=function(Te){return Te&&Ae?Ae.tween:U},N.setPositions=function(Te,it,ge,Ge){if(E){var Gt=E.scrollTrigger,ft=E.duration(),Pt=Gt.end-Gt.start;Te=Gt.start+Pt*Te/ft,it=Gt.start+Pt*it/ft}N.refresh(!1,!1,{start:qm(Te,ge&&!!N._startClamp),end:qm(it,ge&&!!N._endClamp)},Ge),N.update()},N.adjustPinSpacing=function(Te){if(oe&&Te){var it=oe.indexOf(y.d)+1;oe[it]=parseFloat(oe[it])+Te+an,oe[1]=parseFloat(oe[1])+Te+an,Ds(oe)}},N.disable=function(Te,it){if(N.enabled&&(Te!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,it||U&&U.pause(),fe=0,Ze&&(Ze.uncache=1),j&&gn(r,"refreshInit",j),Ce&&(Ce.pause(),Ae.tween&&Ae.tween.kill()&&(Ae.tween=0)),!O)){for(var ge=pt.length;ge--;)if(pt[ge].scroller===D&&pt[ge]!==N)return;gn(D,"resize",Ca),O||gn(D,"scroll",ds)}},N.kill=function(Te,it){N.disable(Te,it),U&&!it&&U.kill(),l&&delete Lf[l];var ge=pt.indexOf(N);ge>=0&&pt.splice(ge,1),ge===Bn&&Mc>0&&Bn--,ge=0,pt.forEach(function(Ge){return Ge.scroller===N.scroller&&(ge=1)}),ge||zn||(N.scroll.rec=0),i&&(i.scrollTrigger=null,Te&&i.revert({kill:!1}),it||i.kill()),rt&&[rt,et,K,Ie].forEach(function(Ge){return Ge.parentNode&&Ge.parentNode.removeChild(Ge)}),ja===N&&(ja=0),h&&(Ze&&(Ze.uncache=1),ge=0,pt.forEach(function(Ge){return Ge.pin===h&&ge++}),ge||(Ze.spacer=0)),n.onKill&&n.onKill(N)},pt.push(N),N.enable(!1,!1),ze&&ze(N),i&&i.add&&!Oe){var Qe=N.update;N.update=function(){N.update=Qe,gt.cache++,Ne||F||N.refresh()},Ve.delayedCall(.01,N.update),Oe=.01,Ne=F=0}else N.refresh();h&&DA()},r.register=function(n){return gs||(Ve=n||N0(),O0()&&window.document&&r.enable(),gs=Ea),gs},r.defaults=function(n){if(n)for(var i in n)ic[i]=n[i];return ic},r.disable=function(n,i){Ea=0,pt.forEach(function(s){return s[i?"kill":"disable"](n)}),gn(mt,"wheel",ds),gn(zt,"scroll",ds),clearInterval(Jl),gn(zt,"touchcancel",Gi),gn(Rt,"touchstart",Gi),tc(gn,zt,"pointerdown,touchstart,mousedown",Ym),tc(gn,zt,"pointerup,touchend,mouseup",jm),Gc.kill(),ec(gn);for(var o=0;o<gt.length;o+=3)nc(gn,gt[o],gt[o+1]),nc(gn,gt[o],gt[o+2])},r.enable=function(){if(mt=window,zt=document,oi=zt.documentElement,Rt=zt.body,Ve&&(fl=Ve.utils.toArray,Ga=Ve.utils.clamp,Rf=Ve.core.context||Gi,td=Ve.core.suppressOverwrites||Gi,Ch=mt.history.scrollRestoration||"auto",Df=mt.pageYOffset||0,Ve.core.globals("ScrollTrigger",r),Rt)){Ea=1,Ls=document.createElement("div"),Ls.style.height="100vh",Ls.style.position="absolute",W0(),EA(),en.register(Ve),r.isTouch=en.isTouch,Nr=en.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Cf=en.isTouch===1,_n(mt,"wheel",ds),Ah=[mt,zt,oi,Rt],Ve.matchMedia?(r.matchMedia=function(c){var u=Ve.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Ve.addEventListener("matchMediaInit",function(){return Oh()}),Ve.addEventListener("matchMediaRevert",function(){return V0()}),Ve.addEventListener("matchMedia",function(){To(0,1),Vo("matchMedia")}),Ve.matchMedia().add("(orientation: portrait)",function(){return od(),od})):console.warn("Requires GSAP 3.11.0 or later"),od(),_n(zt,"scroll",ds);var n=Rt.hasAttribute("style"),i=Rt.style,o=i.borderTopStyle,s=Ve.core.Animation.prototype,a,l;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=pr(Rt),ln.m=Math.round(a.top+ln.sc())||0,Vn.m=Math.round(a.left+Vn.sc())||0,o?i.borderTopStyle=o:i.removeProperty("border-top-style"),n||(Rt.setAttribute("style",""),Rt.removeAttribute("style")),Jl=setInterval(Zm,250),Ve.delayedCall(.5,function(){return Ql=0}),_n(zt,"touchcancel",Gi),_n(Rt,"touchstart",Gi),tc(_n,zt,"pointerdown,touchstart,mousedown",Ym),tc(_n,zt,"pointerup,touchend,mouseup",jm),Af=Ve.utils.checkPrefix("transform"),Ec.push(Af),gs=Cn(),Gc=Ve.delayedCall(.2,To).pause(),_s=[zt,"visibilitychange",function(){var c=mt.innerWidth,u=mt.innerHeight;zt.hidden?(Gm=c,Wm=u):(Gm!==c||Wm!==u)&&Ca()},zt,"DOMContentLoaded",To,mt,"load",To,mt,"resize",Ca],ec(_n),pt.forEach(function(c){return c.enable(0,1)}),l=0;l<gt.length;l+=3)nc(gn,gt[l],gt[l+1]),nc(gn,gt[l],gt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(nd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Jl)||(Jl=i)&&setInterval(Zm,i),"ignoreMobileResize"in n&&(Cf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ec(gn)||ec(_n,n.autoRefreshEvents||"none"),L0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var o=qn(n),s=gt.indexOf(o),a=zo(o);~s&&gt.splice(s,a?6:2),i&&(a?Zi.unshift(mt,i,Rt,i,oi,i):Zi.unshift(o,i))},r.clearMatchMedia=function(n){pt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,o){var s=(ii(n)?qn(n):n).getBoundingClientRect(),a=s[o?Oo:No]*i||0;return o?s.right-a>0&&s.left+a<mt.innerWidth:s.bottom-a>0&&s.top+a<mt.innerHeight},r.positionInViewport=function(n,i,o){ii(n)&&(n=qn(n));var s=n.getBoundingClientRect(),a=s[o?Oo:No],l=i==null?a/2:i in qc?qc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return o?(s.left+l)/mt.innerWidth:(s.top+l)/mt.innerHeight},r.killAll=function(n){if(pt.slice(0).forEach(function(o){return o.vars.id!=="ScrollSmoother"&&o.kill()}),n!==!0){var i=Ho.killAll||[];Ho={},i.forEach(function(o){return o()})}},r}();qe.version="3.12.7";qe.saveStyles=function(r){return r?fl(r).forEach(function(e){if(e&&e.style){var t=ni.indexOf(e);t>=0&&ni.splice(t,5),ni.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ve.core.getCache(e),Rf())}}):ni};qe.revert=function(r,e){return Oh(!r,e)};qe.create=function(r,e){return new qe(r,e)};qe.refresh=function(r){return r?Ca(!0):(gs||qe.register())&&To(!0)};qe.update=function(r){return++gt.cache&&wr(r===!0?2:0)};qe.clearScrollMemory=G0;qe.maxScroll=function(r,e){return Yi(r,e?Vn:ln)};qe.getScrollFunc=function(r,e){return to(qn(r),e?Vn:ln)};qe.getById=function(r){return Lf[r]};qe.getAll=function(){return pt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};qe.isScrolling=function(){return!!bi};qe.snapDirectional=Ih;qe.addEventListener=function(r,e){var t=Ho[r]||(Ho[r]=[]);~t.indexOf(e)||t.push(e)};qe.removeEventListener=function(r,e){var t=Ho[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};qe.batch=function(r,e){var t=[],n={},i=e.interval||.016,o=e.batchMax||1e9,s=function(c,u){var d=[],f=[],h=Ve.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),o<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Pn(e[a])&&a!=="onRefreshInit"?s(a,e[a]):e[a];return Pn(o)&&(o=o(),_n(qe,"refresh",function(){return o=e.batchMax()})),fl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(qe.create(c))}),t};var ig=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},ad=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(en.isTouch?" pinch-zoom":""):"none",e===oi&&r(Rt,t)},ac={auto:1,scroll:1},FA=function(e){var t=e.event,n=e.target,i=e.axis,o=(t.changedTouches?t.changedTouches[0]:t).target,s=o._gsap||Ve.core.getCache(o),a=Cn(),l;if(!s._isScrollT||a-s._isScrollT>2e3){for(;o&&o!==Rt&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!(ac[(l=_i(o)).overflowY]||ac[l.overflowX]));)o=o.parentNode;s._isScroll=o&&o!==n&&!zo(o)&&(ac[(l=_i(o)).overflowY]||ac[l.overflowX]),s._isScrollT=a}(s._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},q0=function(e,t,n,i){return en.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&FA,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&_n(zt,en.eventTypes[0],og,!1,!0)},onDisable:function(){return gn(zt,en.eventTypes[0],og,!0)}})},kA=/(input|label|select|textarea)/i,rg,og=function(e){var t=kA.test(e.target.tagName);(t||rg)&&(e._gsapAllow=!0,rg=t)},BA=function(e){So(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,o=t.allowNestedScroll,s=t.onRelease,a,l,c=qn(e.target)||oi,u=Ve.core.globals().ScrollSmoother,d=u&&u.get(),f=Nr&&(e.content&&qn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=to(c,ln),_=to(c,Vn),g=1,m=(en.isTouch&&mt.visualViewport?mt.visualViewport.scale*mt.visualViewport.width:mt.outerWidth)/mt.innerWidth,p=0,b=Pn(i)?function(){return i(a)}:function(){return i||2.8},S,v,M=q0(c,e.type,!0,o),C=function(){return v=!1},E=Gi,P=Gi,w=function(){l=Yi(c,ln),P=Ga(Nr?1:0,l),n&&(E=Ga(0,Yi(c,Vn))),S=Uo},y=function(){f._gsap.y=Ta(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(v){requestAnimationFrame(C);var q=Ta(a.deltaY/2),pe=P(h.v-q);if(f&&pe!==h.v+h.offset){h.offset=pe-h.v;var N=Ta((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",f._gsap.y=N+"px",h.cacheID=gt.cache,wr()}return!0}h.offset&&y(),v=!0},D,z,O,T,W=function(){w(),D.isActive()&&D.vars.scrollY>l&&(h()>l?D.progress(1)&&h(l):D.resetTo("scrollY",l))};return f&&Ve.set(f,{y:"+=0"}),e.ignoreCheck=function(J){return Nr&&J.type==="touchmove"&&L()||g>1.05&&J.type!=="touchstart"||a.isGesturing||J.touches&&J.touches.length>1},e.onPress=function(){v=!1;var J=g;g=Ta((mt.visualViewport&&mt.visualViewport.scale||1)/m),D.pause(),J!==g&&ad(c,g>1.01?!0:n?!1:"x"),z=_(),O=h(),w(),S=Uo},e.onRelease=e.onGestureStart=function(J,q){if(h.offset&&y(),!q)T.restart(!0);else{gt.cache++;var pe=b(),N,j;n&&(N=_(),j=N+pe*.05*-J.velocityX/.227,pe*=ig(_,N,j,Yi(c,Vn)),D.vars.scrollX=E(j)),N=h(),j=N+pe*.05*-J.velocityY/.227,pe*=ig(h,N,j,Yi(c,ln)),D.vars.scrollY=P(j),D.invalidate().duration(pe).play(.01),(Nr&&D.vars.scrollY>=l||N>=l-1)&&Ve.to({},{onUpdate:W,duration:pe})}s&&s(J)},e.onWheel=function(){D._ts&&D.pause(),Cn()-p>1e3&&(S=0,p=Cn())},e.onChange=function(J,q,pe,N,j){if(Uo!==S&&w(),q&&n&&_(E(N[2]===q?z+(J.startX-J.x):_()+q-N[1])),pe){h.offset&&y();var We=j[2]===pe,Je=We?O+J.startY-J.y:h()+pe-j[1],ne=P(Je);We&&Je!==ne&&(O+=ne-Je),h(ne)}(pe||q)&&wr()},e.onEnable=function(){ad(c,n?!1:"x"),qe.addEventListener("refresh",W),_n(mt,"resize",W),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),M.enable()},e.onDisable=function(){ad(c,!0),gn(mt,"resize",W),qe.removeEventListener("refresh",W),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new en(e),a.iOS=Nr,Nr&&!h()&&h(1),Nr&&Ve.ticker.add(Gi),T=a._dc,D=Ve.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:X0(h,h(),function(){return D.pause()})},onUpdate:wr,onComplete:T.vars.onComplete}),a};qe.sort=function(r){if(Pn(r))return pt.sort(r);var e=mt.pageYOffset||0;return qe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+mt.innerHeight}),pt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};qe.observe=function(r){return new en(r)};qe.normalizeScroll=function(r){if(typeof r>"u")return kn;if(r===!0&&kn)return kn.enable();if(r===!1){kn&&kn.kill(),kn=r;return}var e=r instanceof en?r:BA(r);return kn&&kn.target===e.target&&kn.kill(),zo(e.target)&&(kn=e),e};qe.core={_getVelocityProp:Tf,_inputObserver:q0,_scrollers:gt,_proxies:Zi,bridge:{ss:function(){bi||Vo("scrollStart"),bi=Cn()},ref:function(){return An}}};N0()&&Ve.registerPlugin(qe);const zA=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:qe,default:qe},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var HA=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,VA=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,GA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,WA=/(^[#\.][a-z]|[a-y][a-z])/i,XA=Math.PI/180,lc=Math.sin,cc=Math.cos,$a=Math.abs,_a=Math.sqrt,sg=function(e){return typeof e=="string"},Y0=function(e){return typeof e=="number"},ag=1e5,Or=function(e){return Math.round(e*ag)/ag||0};function qA(r){r=sg(r)&&WA.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Zr(r)):r?sg(r)?Zr(r):Y0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ra(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var YA=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),o=i.length,s;for(t=","+t+",";--o>-1;)s=i[o].nodeName.toLowerCase(),t.indexOf(","+s+",")<0&&n.setAttributeNS(null,s,i[o].nodeValue);return n},jA={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},$A=function(e,t){for(var n=t?t.split(","):[],i={},o=n.length;--o>-1;)i[n[o]]=+e.getAttribute(n[o])||0;return i};function j0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,o,s,a,l,c,u,d,f,h,_,g,m,p,b,S,v,M,C,E,P,w;return t==="path"||!r.getBBox?r:(c=YA(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=$A(r,jA[t]),t==="rect"?(a=w.rx,l=w.ry||a,o=w.x,s=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=o+a*(1-n),m=o+a,p=m+h,b=p+a*n,S=p+a,v=s+l*(1-n),M=s+l,C=M+_,E=C+l*n,P=C+l,i="M"+S+","+M+" V"+C+" C"+[S,E,b,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,o,E,o,C,o,C-(C-M)/3,o,M+(C-M)/3,o,M,o,v,g,s,m,s,m+(p-m)/3,s,p-(p-m)/3,s,p,s,b,s,S,v,S,M].join(",")+"z"):i="M"+(o+h)+","+s+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),o=w.cx,s=w.cy,u=a*n,i="M"+(o+a)+","+s+" C"+[o+a,s+d,o+u,s+l,o,s+l,o-u,s+l,o-a,s+d,o-a,s,o-a,s-d,o-u,s-l,o,s-l,o+u,s-l,o+a,s-d,o+a,s].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(VA)||[],o=f.shift(),s=f.shift(),i="M"+o+","+s+" L"+f.join(","),t==="polygon"&&(i+=","+o+","+s+"z")),c.setAttribute("d",Is(c._gsRawPath=Zr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function KA(r,e,t,n,i,o,s,a,l){if(!(r===a&&e===l)){t=$a(t),n=$a(n);var c=i%360*XA,u=cc(c),d=lc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,b=m*m,S=p*p,v=b/(t*t)+S/(n*n);v>1&&(t=_a(v)*t,n=_a(v)*n);var M=t*t,C=n*n,E=(M*C-M*S-C*b)/(M*S+C*b);E<0&&(E=0);var P=(o===s?-1:1)*_a(E),w=P*(t*p/n),y=P*-(n*m/t),L=(r+a)/2,D=(e+l)/2,z=L+(u*w-d*y),O=D+(d*w+u*y),T=(m-w)/t,W=(p-y)/n,J=(-m-w)/t,q=(-p-y)/n,pe=T*T+W*W,N=(W<0?-1:1)*Math.acos(T/_a(pe)),j=(T*q-W*J<0?-1:1)*Math.acos((T*J+W*q)/_a(pe*(J*J+q*q)));isNaN(j)&&(j=f),!s&&j>0?j-=h:s&&j<0&&(j+=h),N%=h,j%=h;var We=Math.ceil($a(j)/(h/4)),Je=[],ne=j/We,ce=4/3*lc(ne/2)/(1+cc(ne/2)),Pe=u*t,_e=d*t,Ae=d*-n,Ze=u*n,we;for(we=0;we<We;we++)i=N+we*ne,m=cc(i),p=lc(i),T=cc(i+=ne),W=lc(i),Je.push(m-ce*p,p+ce*m,T+ce*W,W-ce*T,T,W);for(we=0;we<Je.length;we+=2)m=Je[we],p=Je[we+1],Je[we]=m*Pe+p*Ae+z,Je[we+1]=m*_e+p*Ze+O;return Je[we-2]=a,Je[we-1]=l,Je}}function Zr(r){var e=(r+"").replace(GA,function(w){var y=+w;return y<1e-4&&y>-1e-4?0:y}).match(HA)||[],t=[],n=0,i=0,o=2/3,s=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,b,S,v,M,C,E,P=function(y,L,D,z){b=(D-y)/3,S=(z-L)/3,g.push(y+b,L+S,D-b,z-S,D,z)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<s;c++)if(M=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,S=i,(M==="C"||M==="S")&&(b+=n-g[g.length-4],S+=i-g[g.length-3]),_||(n=i=0),g.push(b,S,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*o,S=i+(f-i)*o,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(b,S,n+(d-n)*o,i+(f-i)*o,n,i),c+=4;else if(h==="T")b=n-g[g.length-4],S=i-g[g.length-3],g.push(n+b,i+S,d+(n+b*1.5-d)*o,f+(i+S*1.5-f)*o,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||$a(n-d)>.5||$a(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(C=e[c+4],E=e[c+5],b=e[c+6],S=e[c+7],u=7,C.length>1&&(C.length<3?(S=b,b=E,u--):(S=E,b=C.substr(2),u-=2),E=C.charAt(1),C=C.charAt(0)),v=KA(n,i,+e[c+1],+e[c+2],+e[c+3],+C,+E,(_?n:0)+b*1,(_?i:0)+S*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Is(r){Y0(r[0])&&(r=[r]);var e="",t=r.length,n,i,o,s;for(i=0;i<t;i++){for(s=r[i],e+="M"+Or(s[0])+","+Or(s[1])+" C",n=s.length,o=2;o<n;o++)e+=Or(s[o++])+","+Or(s[o++])+" "+Or(s[o++])+","+Or(s[o++])+" "+Or(s[o++])+","+Or(s[o])+" ";s.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ii,Nh,Pa,$0,La,K0=function(){return Ii||typeof window<"u"&&(Ii=window.gsap)&&Ii.registerPlugin&&Ii},ld=function(e){return typeof e=="function"},Ao=Math.atan2,lg=Math.cos,cg=Math.sin,yr=Math.sqrt,ou=Math.PI,ug=ou*2,ZA=ou*.3,JA=ou*.7,Z0=1e20,pl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,QA=/(^[#\.][a-z]|[a-y][a-z])/i,eC=/[achlmqstvz]/i,Wr=function(e){return console&&console.warn(e)},tC=1,dg=function(e){var t=e.length,n=0,i=0,o;for(o=0;o<t;o++)n+=e[o++],i+=e[o];return[n/(t/2),i/(t/2)]},Os=function(e){var t=e.length,n=e[0],i=n,o=e[1],s=o,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>o?o=l:l<s&&(s=l);return e.centerX=(n+i)/2,e.centerY=(o+s)/2,e.size=(n-i)*(o-s)},Ka=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],o=i,s=e[0][1],a=s,l=1/t,c,u,d,f,h,_,g,m,p,b,S,v,M,C,E,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],S=h[f+2]-p,C=h[f+3]-b,v=h[f+4]-p,E=h[f+5]-b,M=h[f+6]-p,P=h[f+7]-b,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*M+3*m*(g*v+m*S))*g+p,d=(g*g*P+3*m*(g*E+m*C))*g+b,u>i?i=u:u<o&&(o=u),d>s?s=d:d<a&&(a=d);return e.centerX=(i+o)/2,e.centerY=(s+a)/2,e.left=o,e.width=i-o,e.top=a,e.height=s-a,e.size=(i-o)*(s-a)},nC=function(e,t){return t.length-e.length},fg=function(e,t){var n=e.size||Os(e),i=t.size||Os(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},hg=function(e,t){var n=e.slice(0),i=e.length,o=i-2,s,a;for(t=t|0,s=0;s<i;s++)a=(s+t)%o,e[s++]=n[a],e[s]=n[a+1]},cd=function(e,t,n,i,o){var s=e.length,a=0,l=s-2,c,u,d,f;for(n*=6,u=0;u<s;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-o),a+=yr(d*d+f*f);return a},iC=function(e,t,n){var i=e.length,o=dg(e),s=dg(t),a=s[0]-o[0],l=s[1]-o[1],c=cd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=cd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Ra(d),h=6;h<i;h+=6)f=cd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},rC=function(e,t,n){for(var i=e.length,o=Z0,s=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=yr(c*c+u*u),d<o&&(o=d,s=l[f],a=l[f+1]);return[s,a]},oC=function(e,t,n,i,o,s){var a=t.length,l=0,c=Math.min(e.size||Os(e),t[n].size||Os(t[n]))*i,u=Z0,d=e.centerX+o,f=e.centerY+s,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||Os(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=yr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},ud=function(e,t){var n=0,i=.999999,o=e.length,s=t/((o-2)/6),a,l,c,u,d,f,h,_,g,m,p,b,S,v;for(S=2;S<o;S+=6)for(n+=s;n>i;)a=e[S-2],l=e[S-1],c=e[S],u=e[S+1],d=e[S+2],f=e[S+3],h=e[S+4],_=e[S+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(_-f)*v-b)*v,e.splice(S,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(_-f)*v),S+=6,o+=6,n--;return e},Of=function(e,t,n,i,o){var s=t.length-e.length,a=s>0?t:e,l=s>0?e:t,c=0,u=i==="complexity"?nC:fg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,b,S,v,M,C;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),M=a.size||Ka(a),M=l.size||Ka(l),M=a.centerX-l.centerX,C=a.centerY-l.centerY,u===fg))for(f=0;f<l.length;f++)a.splice(f,0,oC(l[f],a,f,d,M,C));if(s)for(s<0&&(s=-s),a[0].length>l[0].length&&ud(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<s;)S=a[f].size||Os(a[f]),b=rC(l,a[f].centerX,a[f].centerY),S=b[0],v=b[1],l[f++]=[S,v,S,v,S,v,S,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],s=m.length-p.length,s<0?ud(m,-s/6|0):s>0&&ud(p,s/6|0),_&&o!==!1&&!p.reversed&&Ra(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=iC(p,m,!f||o===!1),n<0&&(_=!0,Ra(p),n=-n),hg(p,n*6)):n!=="reverse"&&(f&&n<0&&Ra(p),hg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ra(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Wr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},pg=function(e,t,n,i,o){var s=Zr(e[0]),a=Zr(e[1]);Of(s,a,t||t===0?t:"auto",n,o)&&(e[0]=Is(s),e[1]=Is(a),(i==="log"||i===!0)&&Wr('precompile:["'+e[0]+'","'+e[1]+'"]'))},sC=function(e,t){if(!t)return e;var n=e.match(pl)||[],i=n.length,o="",s,a,l;for(t==="reverse"?(a=i-1,s=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,s=2),l=0;l<i;l+=2)o+=n[a-1]+","+n[a]+" ",a=(a+s)%i;return o},mg=function(e,t){var n=0,i=parseFloat(e[0]),o=parseFloat(e[1]),s=i+","+o+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)s+=(i+(h-i)*f*d).toFixed(2)+","+(o+(_-o)*f*d).toFixed(2)+" ",n--,d++;s+=h+","+_+" ",i=h,o=_}return s},Nf=function(e){var t=e[0].match(pl)||[],n=e[1].match(pl)||[],i=n.length-t.length;i>0?e[0]=mg(t,i):e[1]=mg(n,-i)},aC=function(e){return isNaN(e)?Nf:function(t){Nf(t),t[1]=sC(t[1],parseInt(e,10))}},lC=function(e,t,n){var i=typeof e=="string",o,s;return(!i||QA.test(e)||(e.match(pl)||[]).length<3)&&(o=Nh(e)[0],o?(s=(o.nodeName+"").toUpperCase(),t&&s!=="PATH"&&(o=j0(o,!1),s="PATH"),e=o.getAttribute(s==="PATH"?"d":"points")||"",o===n&&(e=o.getAttributeNS(null,"data-original")||e)):(Wr("WARNING: invalid morph to: "+e),e=!1)),e},gg=function(e,t){for(var n=e.length,i=.2*(t||1),o,s,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(s=e[n],g=s.isSmooth=s.isSmooth||[0,0,0,0],m=s.smoothData=s.smoothData||[0,0,0,0],g.length=4,f=s.length-2,d=6;d<f;d+=6)a=s[d]-s[d-2],l=s[d+1]-s[d-1],c=s[d+2]-s[d],u=s[d+3]-s[d+1],h=Ao(l,a),_=Ao(u,c),o=Math.abs(h-_)<i,o&&(m[d-2]=h,m[d+2]=_,m[d-1]=yr(a*a+l*l),m[d+3]=yr(c*c+u*u)),g.push(o,o,0,0,o,o);s[f]===s[0]&&s[f+1]===s[1]&&(a=s[0]-s[f-2],l=s[1]-s[f-1],c=s[2]-s[0],u=s[3]-s[1],h=Ao(l,a),_=Ao(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=yr(a*a+l*l),m[3]=yr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},_g=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},cC=function(e){return e!==e%ou?e+(e<0?ug:-ug):e},vg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",uC=function(e,t,n,i){var o=this._origin,s=this._eOrigin,a=e[n]-o.x,l=e[n+1]-o.y,c=yr(a*a+l*l),u=Ao(l,a),d,f;return a=t[n]-s.x,l=t[n+1]-s.y,d=Ao(l,a)-u,f=cC(d),!i&&Pa&&Math.abs(f+Pa.ca)<ZA&&(i=Pa),this._anchorPT=Pa={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>JA?d:f,sl:c,cl:yr(a*a+l*l)-c,i:n}},yg=function(e){Ii=K0(),La=La||Ii&&Ii.plugins.morphSVG,Ii&&La?(Nh=Ii.utils.toArray,La.prototype._tweenRotation=uC,$0=1):e&&Wr("Please gsap.registerPlugin(MorphSVGPlugin)")},bs={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ii=e,La=t,yg()},init:function(e,t,n,i,o){if($0||yg(1),!t)return Wr("invalid shape"),!1;ld(t)&&(t=t.call(n,i,e,o));var s,a,l,c,u,d,f,h,_,g,m,p,b,S,v,M,C,E,P,w,y,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){s={};for(a in t)s[a]=ld(t[a])&&a!=="render"?t[a].call(n,i,e,o):t[a];t=s}var D=e.nodeType?window.getComputedStyle(e):{},z=D.fill+"",O=!(z==="none"||(z.match(pl)||[])[3]==="0"||D.fillRule==="evenodd"),T=(t.origin||"50 50").split(",");if(s=(e.nodeName+"").toUpperCase(),u=s==="POLYLINE"||s==="POLYGON",s!=="PATH"&&!u&&!t.prop)return Wr("Cannot morph a <"+s+"> element. "+vg),!1;if(a=s==="PATH"?"d":"points",!t.prop&&!ld(e.setAttribute))return!1;if(c=lC(t.shape||t.d||t.points||"",a==="d",e),u&&eC.test(c))return Wr("A <"+s+"> cannot accept path data. "+vg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||bs.defaultMap,this._prop=t.prop,this._render=t.render||bs.defaultRender,this._apply="updateTarget"in t?t.updateTarget:bs.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,C=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Zr(C?t.precompile[0]:g),m=Zr(C?t.precompile[1]:c),!C&&!Of(g,m,d,f,O))return!1;for((t.precompile==="log"||t.precompile===!0)&&Wr('precompile:["'+Is(g)+'","'+Is(m)+'"]'),y=(t.type||bs.defaultType)!=="linear",y&&(g=gg(g,t.smoothTolerance),m=gg(m,t.smoothTolerance),g.size||Ka(g),m.size||Ka(m),w=_g(T[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},T[1]&&(w=_g(T[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,b=g.length;--b>-1;)for(v=g[b],M=m[b],h=v.isSmooth||[],_=M.isSmooth||[],S=v.length,Pa=0,p=0;p<S;p+=2)(M[p]!==v[p]||M[p+1]!==v[p+1])&&(y?h[p]&&_[p]?(E=v.smoothData,P=M.smoothData,L=p+(p===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:E[p+1],l1c:P[p+1]-E[p+1],l2s:E[L],l2c:P[L]-E[L]},l=this._tweenRotation(v,M,p+2),this._tweenRotation(v,M,p,l),this._tweenRotation(v,M,L-1,l),p+=4):this._tweenRotation(v,M,p):(l=this.add(v,p,v[p],M[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],M[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,o,0,aC(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return tC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,o=t._anchorPT,s=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,b,S,v,M;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;o;)_=o.sa+e*o.ca,h=o.sl+e*o.cl,o.t[o.i]=t._origin.x+lg(_)*h,o.t[o.i+1]=t._origin.y+cg(_)*h,o=o._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],M=g+(g===f.length-4?7-f.length:5),_=Ao(f[M]-f[g+1],f[M-1]-f[g]),S=cg(_),v=lg(_),p=f[g+2],b=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=b-S*h,h=i.l2s+d*i.l2c,f[M-1]=p+v*h,f[M]=b+S*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*s|0)/s+u+(f[1]*s|0)/s+" C",g=2;g<h;g++)c+=(f[g]*s|0)/s+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:qA,stringToRawPath:Zr,rawPathToString:Is,normalizeStrings:function(e,t,n){var i=n.shapeIndex,o=n.map,s=[e,t];return pg(s,i,o),s},pathFilter:pg,pointsFilter:Nf,getTotalSize:Ka,equalizeSegmentQuantity:Of,convertToPath:function(e,t){return Nh(e).map(function(n){return j0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};K0()&&Ii.registerPlugin(bs);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var o=i<0||arguments.length<=i?void 0:arguments[i];o.nodeType===1||o.nodeType===11?this.appendChild(o):this.appendChild(document.createTextNode(String(o)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];var a=o.length;if(n)for(a||n.removeChild(this);a--;){var l=o[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function dC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function xg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Sg(r,e,t){return e&&xg(r.prototype,e),t&&xg(r,t),r}function fC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function wg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function bg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?wg(Object(t),!0).forEach(function(n){fC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):wg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function J0(r,e){return pC(r)||gC(r,e)||Q0(r,e)||vC()}function Hn(r){return hC(r)||mC(r)||Q0(r)||_C()}function hC(r){if(Array.isArray(r))return Uf(r)}function pC(r){if(Array.isArray(r))return r}function mC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function gC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,o=void 0;try{for(var s=r[Symbol.iterator](),a;!(n=(a=s.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,o=l}finally{try{!n&&s.return!=null&&s.return()}finally{if(i)throw o}}return t}}function Q0(r,e){if(r){if(typeof r=="string")return Uf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Uf(r,e)}}function Uf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function _C(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Co(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),o=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,o||i)},{})}function yl(r){return typeof r=="string"}function Uh(r){return Array.isArray(r)}function uc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Co(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(yl(t)||Uh(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Fh(r){var e=yl(r)||Uh(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function su(r){return r!==null&&typeof r=="object"}function yC(r){return su(r)&&/^(1|3|11)$/.test(r.nodeType)}function xC(r){return typeof r=="number"&&r>-1&&r%1===0}function SC(r){return su(r)&&xC(r.length)}function Go(r){return Uh(r)?r:r==null?[]:SC(r)?Array.prototype.slice.call(r):[r]}function Mg(r){var e=r;return yl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Go(e).reduce(function(t,n){return[].concat(Hn(t),Hn(Go(n).filter(yC)))},[])}var wC=Object.entries,Yc="_splittype",Ui={},bC=0;function ji(r,e,t){if(!su(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Yc]||(r[Yc]=++bC),i=Ui[n]||(Ui[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Ui[n]=bg(bg({},i),e)):e!==void 0&&(i[e]=t),t}function Ro(r,e){var t=su(r)?r[Yc]:null,n=t&&Ui[t]||{};return n}function ev(r){var e=r&&r[Yc];e&&(delete r[e],delete Ui[e])}function MC(){Object.keys(Ui).forEach(function(r){delete Ui[r]})}function EC(){wC(Ui).forEach(function(r){var e=J0(r,2),t=e[0],n=e[1],i=n.isRoot,o=n.isSplit;(!i||!o)&&(Ui[t]=null,delete Ui[t])})}function TC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var kh="\\ud800-\\udfff",tv="\\u0300-\\u036f\\ufe20-\\ufe23",nv="\\u20d0-\\u20f0",iv="\\ufe0e\\ufe0f",AC="[".concat(kh,"]"),Ff="[".concat(tv).concat(nv,"]"),kf="\\ud83c[\\udffb-\\udfff]",CC="(?:".concat(Ff,"|").concat(kf,")"),rv="[^".concat(kh,"]"),ov="(?:\\ud83c[\\udde6-\\uddff]){2}",sv="[\\ud800-\\udbff][\\udc00-\\udfff]",av="\\u200d",lv="".concat(CC,"?"),cv="[".concat(iv,"]?"),RC="(?:"+av+"(?:"+[rv,ov,sv].join("|")+")"+cv+lv+")*",PC=cv+lv+RC,LC="(?:".concat(["".concat(rv).concat(Ff,"?"),Ff,ov,sv,AC].join("|"),`
)`),DC=RegExp("".concat(kf,"(?=").concat(kf,")|").concat(LC).concat(PC),"g"),IC=[av,kh,tv,nv,iv],OC=RegExp("[".concat(IC.join(""),"]"));function NC(r){return r.split("")}function uv(r){return OC.test(r)}function UC(r){return r.match(DC)||[]}function FC(r){return uv(r)?UC(r):NC(r)}function kC(r){return r==null?"":String(r)}function BC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=kC(r),r&&yl(r)&&!e&&uv(r)?FC(r):r.split(e)}function Bf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],o=yl(i)?i.trim():i;o===null||o===""||(n==="children"?t.append.apply(t,Hn(Go(o))):t.setAttribute(n,o))}),t}var Bh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function zC(r,e){e=Co(Bh,e);var t=Fh(e.types),n=e.tagName,i=r.nodeValue,o=document.createDocumentFragment(),s=[],a=[];return/^\s/.test(i)&&o.append(" "),s=TC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=BC(c).map(function(_){var g=Bf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return ji(g,"isChar",!0),a=[].concat(Hn(a),[g]),g})),t.words||t.lines?(f=Bf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),ji(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),o.appendChild(f)):h.forEach(function(_){o.appendChild(_)}),u<d.length-1&&o.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&o.append(" "),r.replaceWith(o),{words:s,chars:a}}function dv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return zC(r,e);var i=Go(r.childNodes);if(i.length&&(ji(r,"isSplit",!0),!Ro(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var o=r.nextSibling,s=r.previousSibling,a=r.textContent||"",l=o?o.textContent:" ",c=s?s.textContent:" ";ji(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=dv(d,e),h=f.words,_=f.chars;return{words:[].concat(Hn(u.words),Hn(h)),chars:[].concat(Hn(u.chars),Hn(_))}},n)}function HC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,o=J0(n,2),s=o[0],a=o[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+s,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+s-l;return{width:f,height:h,top:m,left:p}}function fv(r){Ro(r).isWord?(ev(r),r.replaceWith.apply(r,Hn(r.childNodes))):Go(r.children).forEach(function(e){return fv(e)})}var VC=function(){return document.createDocumentFragment()};function GC(r,e,t){var n=Fh(e.types),i=e.tagName,o=r.getElementsByTagName("*"),s=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=VC(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),S=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,ji(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Go(o).forEach(function(v){var M=v.parentElement===r,C=HC(v,M,e,t),E=C.width,P=C.height,w=C.top,y=C.left;/^br$/i.test(v.nodeName)||(n.lines&&M&&((l===null||w-l>=S)&&(l=w,s.push(a=[])),a.push(v)),e.absolute&&ji(v,{top:w,left:y,width:E,height:P}))}),h&&h.removeChild(r),n.lines&&(f=s.map(function(v){var M=Bf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});ji(M,"isLine",!0);var C={height:0,top:1e4};return g.appendChild(M),v.forEach(function(E,P,w){var y=Ro(E),L=y.isWordEnd,D=y.top,z=y.height,O=w[P+1];C.height=Math.max(C.height,z),C.top=Math.min(C.top,D),M.appendChild(E),L&&Ro(O).isWordStart&&M.append(" ")}),e.absolute&&ji(M,{height:C.height,top:C.top}),M}),n.words||fv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Go(o).forEach(function(v){var M=Ro(v),C=M.isLine,E=M.top,P=M.left,w=M.width,y=M.height,L=Ro(v.parentElement),D=!C&&L.isLine;v.style.top="".concat(D?E-L.top:E,"px"),v.style.left=C?"".concat(d.left,"px"):"".concat(P-(D?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=C?"".concat(d.width,"px"):"".concat(w,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var fs=Co(Bh,{}),na=function(){Sg(r,null,[{key:"clearData",value:function(){MC()}},{key:"setDefaults",value:function(t){return fs=Co(fs,uc(t)),Bh}},{key:"revert",value:function(t){Mg(t).forEach(function(n){var i=Ro(n),o=i.isSplit,s=i.html,a=i.cssWidth,l=i.cssHeight;o&&(n.innerHTML=s,n.style.width=a||"",n.style.height=l||"",ev(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Ui}},{key:"defaults",get:function(){return fs},set:function(t){fs=Co(fs,uc(t))}}]);function r(e,t){dC(this,r),this.isSplit=!1,this.settings=Co(fs,uc(t)),this.elements=Mg(e),this.split()}return Sg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(s){ji(s,"html",s.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Co(this.settings,uc(t)));var o=Fh(this.settings.types);o.none||(this.elements.forEach(function(s){ji(s,"isRoot",!0);var a=dv(s,n.settings),l=a.words,c=a.chars;n.words=[].concat(Hn(n.words),Hn(l)),n.chars=[].concat(Hn(n.chars),Hn(c))}),this.elements.forEach(function(s){if(o.lines||n.settings.absolute){var a=GC(s,n.settings,i);n.lines=[].concat(Hn(n.lines),Hn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),EC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const WC="/150-lab/assets/audio/ui-click.mp3",XC="/150-lab/assets/audio/chemistry2.mp3",qC="/150-lab/assets/images/pacifichem-event1.jpg",YC="/150-lab/assets/images/green-chemistry-event2.jpg",jC="/150-lab/assets/images/acs-spring-meeting-event3.jpg";He.registerPlugin(qe);He.registerPlugin(bs);let va={year:2026},hs=null,Pi=null;function zf(){Pi&&(Pi.kill(),Pi=null,console.log("Killed previous hero heading fade ScrollTrigger."));const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){console.log("Hero heading characters not found, attempting re-split...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new na(r,{types:"words,chars",absolute:!1}).chars,He.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"}),console.log("Hero heading re-split successfully.")}catch(o){console.error("Error re-splitting hero heading:",o);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const o=Math.floor(Math.random()*(i+1));[t[i],t[o]]=[t[o],t[i]]}const n=He.timeline({paused:!0});n.to(t,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),Pi=qe.create({animation:n,trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.direction===-1&&i.progress<.1&&He.set(e,{opacity:1,z:0})},onRefresh:i=>{const o=i.progress;n.progress(o),console.log(`Hero fade ScrollTrigger refreshed. Progress set to: ${o.toFixed(2)}`)}}),console.log("Hero heading fade animation set up.")}else console.warn("#hero-area h1 not found for fade animation setup.")}function $C(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),o=document.querySelector("button.enter-experience");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),t&&He.set(t,{opacity:0,autoAlpha:0}),i&&He.set(i,{opacity:0,autoAlpha:0}),o&&He.set(o,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),qe.getAll().forEach(f=>{(f.vars.trigger==="#hero-area"||f.vars.trigger==="#hero-travel-area")&&f.kill()});const s=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",s),e.innerHTML="",s.split("").forEach(f=>{const h=document.createElement("span");h.className="digit",h.textContent=f,h.setAttribute("data-digit",f),e.appendChild(h)}),He.set(e,{opacity:0,autoAlpha:0}),He.set(r,{opacity:0,autoAlpha:0});const a=new na(r,{types:"words,chars",absolute:!1});He.set(a.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const l=He.timeline({delay:.5});l.to(r,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"});const c=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(c)},840);const u=[...a.chars];for(let f=u.length-1;f>0;f--){const h=Math.floor(Math.random()*(f+1));[u[f],u[h]]=[u[h],u[f]]}l.to(u,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const f=new CustomEvent("particleFadeStart");document.dispatchEvent(f)}}),l.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"}),He.set(n,{opacity:1,autoAlpha:1});const d=e.querySelectorAll(".digit");l.fromTo(d,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{window.heroAnimationComplete=!0;const f=new CustomEvent("heroAnimationComplete");document.dispatchEvent(f)}},"-=0.6"),o&&He.to(o,{opacity:1,autoAlpha:1,duration:.8,delay:3.8,ease:"power2.out"}),o&&o.addEventListener("click",()=>{t&&He.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),i&&He.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.enterButtonClicked=!0,window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),He.to(o,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(He.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0}}),qe.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=.44+f.progress*.56;e.querySelectorAll(".digit").forEach(m=>{m.style.opacity=_})}}),qe.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=1-f.progress;e.style.opacity=_}}))}function KC(){console.log("Initializing animations"),ZC(),qe.refresh(),qe.clearMatchMedia(),console.log("Killing all existing ScrollTriggers..."),qe.getAll().forEach(y=>y.kill()),hs=null,Pi=null,va.year=2026,He.registerPlugin(qe),He.registerPlugin(na),$C(),QC(),Eg(),eR(),Tg(),JC(),jc(null),$c(null),Ag(),tR(),nR(),rR();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const y=document.querySelector("nav"),L=document.querySelector("header");y&&y.classList.toggle("active"),L&&L.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const y=window.scrollY,L=document.querySelector("header.anniversary");L&&(y>e?L.classList.remove("active"):L.classList.add("active")),e=y});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const y=document.querySelector("nav"),L=document.querySelector("header");y&&y.classList.remove("active"),L&&L.classList.remove("nav-active")}),zf();const n=document.querySelector("#hero-number");n?(console.log("Setting up hero number countdown animation."),console.log(`Initial heroYearObj.year: ${va.year}`),hs?(console.log("Hero number tween already exists, ensuring it is active."),hs.scrollTrigger&&hs.scrollTrigger.enable(),hs.resume()):(console.log("Creating hero number tween..."),hs=He.to(va,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(y){const L=Math.round(va.year).toString(),D=n.querySelectorAll(".digit"),z=L.split("");D.length!==z.length?(n.innerHTML="",z.forEach(O=>{const T=document.createElement("span");T.className="digit",T.textContent=O,T.setAttribute("data-digit",O),n.appendChild(T)})):D.forEach((O,T)=>{O.textContent!==z[T]&&(O.textContent=z[T],O.setAttribute("data-digit",z[T]))})},onRefresh:y=>{console.log(`Hero Number ST Refreshed -> Progress: ${y.progress.toFixed(3)}, Year: ${va.year.toFixed(0)}`)}}}))):console.warn("#hero-number element not found for countdown animation."),document.querySelectorAll(".pin-top-top").forEach(function(y){let L=y.parentElement;y.id==="hero-area"?qe.create({trigger:L,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:D=>{D.pin.style.transform="translate3d(0px, 0px, 0px)"}}):qe.create({trigger:L,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(y){He.set(y,{opacity:0}),He.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(y){He.set(y,{opacity:0}),He.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(y){let L=y.parentElement;qe.create({trigger:L,start:"top center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(y){let L=y.parentElement;qe.create({trigger:L,start:"center center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(y){let L=y.parentElement;qe.create({trigger:L,start:"bottom bottom",end:"",pin:y,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const o=He.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),s=new Audio(WC);s.volume=.38;const a=()=>{if(!window.audioMuted)try{const y=s.cloneNode();y.volume=.38,y.play().catch(L=>{console.warn("UI click sound play was prevented:",L)})}catch(y){console.error("Error playing UI click sound:",y)}},l=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(D=>{D.addEventListener("click",z=>{if(D.classList.contains("enter-experience")){D.dataset.clickSoundPlayed||(window.audioMuted||a(),D.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}),new MutationObserver(D=>{D.forEach(z=>{z.type==="childList"&&z.addedNodes.forEach(O=>{O.nodeType===1&&(O.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&O.addEventListener("click",W=>{if(O.classList.contains("enter-experience")){O.dataset.clickSoundPlayed||(window.audioMuted||a(),O.dataset.clickSoundPlayed="true");return}window.audioMuted||a()}),O.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(W=>{W.addEventListener("click",J=>{if(W.classList.contains("enter-experience")){W.dataset.clickSoundPlayed||(window.audioMuted||a(),W.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},c=y=>{window.userInteracted=!0,window.enterButtonClicked&&!window.audioInitialized&&window.heroAnimationComplete&&!window.audioMuted&&window.playBackgroundAudio(!0)};document.addEventListener("click",c),document.addEventListener("touchstart",c),document.addEventListener("keydown",c);const u=document.querySelector(".sound-toggle");u&&u.addEventListener("click",()=>{a(),u.classList.toggle("muted"),window.audioMuted=u.classList.contains("muted"),window.audioMuted?(o.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0,window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))):(o.resume(),!window.audioInitialized&&window.enterButtonClicked&&window.backgroundAudio?(window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):!window.audioMuted&&window.enterButtonClicked&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt from toggle..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500))):window.audioInitialized&&window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(y=>{console.warn("Audio play was prevented:",y),window.audioInitialized=!1,window.enterButtonClicked&&window.playBackgroundAudio(!0)})))});const d=document.querySelector(".section-timeline .page-nav");if(!d){console.warn("Page navigation element (.section-timeline .n) not found - skipping navigation setup");return}const f=d.querySelectorAll("a"),h=document.querySelector(".section-timeline .indicator .active-title"),_=document.querySelector(".section-timeline .indicator-wrapper"),g=document.querySelector(".timeline-nav-wrapper");h||console.warn("Active title element (.section-timeline .indicator .active-title) not found"),!_&&!g&&console.warn("Neither indicator wrapper nor timeline nav wrapper found - navigation may not work properly");let m=!1,p=!1,b,S=!1;He.set(f,{opacity:0,x:-20}),He.set(h,{opacity:1});const v=()=>{b&&(clearTimeout(b),b=null),He.killTweensOf(h),He.killTweensOf(f)},M=()=>{v(),S||!p?(m=!1,He.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{!m&&(!p||S)&&He.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})):p&&!S&&(m=!0,He.set(h,{opacity:0}),He.to(f,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"}))},C=y=>{const L=g||_,D=g?null:d;if(!L)return!1;const z=L.getBoundingClientRect();let O=null;D&&(O=D.getBoundingClientRect());const T=y.clientX,W=y.clientY,J=T>=z.left&&T<=z.right&&W>=z.top&&W<=z.bottom;let q=!1;return O&&(q=T>=O.left&&T<=O.right&&W>=O.top&&W<=O.bottom),J||q},E=y=>{const L=p;p=C(y),!p&&S&&(S=!1),L!==p&&!S&&(clearTimeout(b),b=setTimeout(()=>{M()},16))};document.removeEventListener("mousemove",E),document.addEventListener("mousemove",E);const P=[g,_,d].filter(Boolean);P.forEach(y=>{y&&(y.addEventListener("mouseenter",()=>{S||(p=!0,M())}),y.addEventListener("mouseleave",L=>{const D=L.clientX||0,z=L.clientY||0;setTimeout(()=>{y.getBoundingClientRect();let O=!1;P.forEach(T=>{if(T){const W=T.getBoundingClientRect();D>=W.left&&D<=W.right&&z>=W.top&&z<=W.bottom&&(O=!0)}}),O||(p=!1,S&&(S=!1),M())},50)}))}),f.forEach(y=>{const L=y.onclick;L&&y.removeEventListener("click",L),y.addEventListener("click",D=>{D.preventDefault(),v(),f.forEach(z=>z.classList.remove("active")),y.classList.add("active"),h.textContent=y.textContent,S=!0,p=!1,m=!1,He.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{He.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=y=>{window.audioMuted&&(y.volume=0,y.muted=!0),y.addEventListener("play",()=>{const L=document.querySelector(".sound-toggle");L&&L.classList.contains("muted")&&(y.volume=0,y.muted=!0)})},new MutationObserver(y=>{y.forEach(L=>{L.type==="childList"&&L.addedNodes.forEach(D=>{D.nodeName==="AUDIO"||D.nodeName==="VIDEO"?window.handleNewAudioElement(D):D.querySelectorAll&&D.querySelectorAll("audio, video").forEach(O=>{window.handleNewAudioElement(O)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l(),Eg(),Tg(),jc(null),$c(null),Ag(),iR()}function ZC(){const r=new Audio;r.addEventListener("canplaythrough",()=>{console.log("Background audio loaded and can play through without buffering"),window.backgroundAudioLoaded=!0,window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioInitialized&&!window.audioMuted&&e(!0)}),r.addEventListener("error",i=>{console.error("Audio loading error:",i),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=XC;try{r.load()}catch(i){console.error("Error loading background audio:",i)}window.backgroundAudio=r,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.backgroundAudioLoaded=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=10,window.playBackgroundAudio=(i=!1)=>{if(!window.audioMuted&&(i&&(window.enterButtonClicked=!0),!(!window.enterButtonClicked||!window.heroAnimationComplete)&&!window.audioInitialized)){if(window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null);return}if(window.backgroundAudioLoaded||r.readyState>=3)e(i);else if(console.log("Background audio not yet ready to play, will play when loaded"),i)try{r.load()}catch(o){console.warn("Error reloading background audio:",o)}}};function e(i=!1){if(!(window.audioInitialized||window.audioMuted)){if(window.audioRetryCount++,window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);return}try{if(r.volume=.08,i)try{const o=new(window.AudioContext||window.webkitAudioContext),s=o.createBufferSource();s.connect(o.destination),s.start(0)}catch(o){console.warn("Could not create audio context:",o)}r.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const o=document.querySelector(".sound-toggle");o&&o.classList.add("active"),window.audioRetryCount=0}).catch(o=>{console.error("Audio play was prevented:",o),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)})}catch(o){console.error("Error playing audio:",o),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)}}}let t=!1;const n=()=>{document.hidden?window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Tab hidden - pausing background audio"),t=!0,window.backgroundAudio.pause()):window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Tab visible - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))};document.addEventListener("visibilitychange",n),window.addEventListener("blur",()=>{window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Window blur - pausing background audio"),t=!0,window.backgroundAudio.pause())}),window.addEventListener("focus",()=>{window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Window focus - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio on focus:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))}),console.log("Background audio visibility change listeners initialized")}function JC(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let o=!1;i.addEventListener("mouseenter",()=>{o=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{o=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{o&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function QC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(He.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),He.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),qe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Eg(){const r=document.querySelector("#get-involved-text p");r&&(He.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new na(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),He.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),He.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function Tg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),o=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!i||!o)return;const s=i.querySelector(".anniversary"),a=i.querySelector(".get-involved"),l=i.querySelector(".events"),c=_=>{if(o.textContent===_)return;const g=He.timeline();g.to(o,{opacity:0,duration:.18,onComplete:()=>{o.textContent=_}}),g.to(o,{opacity:1,duration:.24})};s.addEventListener("click",_=>{_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),s.classList.add("active"),c("150 Years of ACS"),window.scrollTo({top:0,behavior:"smooth"})}),a.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),a.classList.add("active"),c("Get Involved"),n){const g=n.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}else{const g=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}}),l.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),l.classList.add("active"),c("Events"),t){const g=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}});const u=[{id:"hero",element:r,title:"150 Years of ACS",link:s,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:a,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:a,top:0,bottom:0},{id:"events",element:t,title:"Events",link:l,top:0,bottom:0}];function d(){if(u.forEach(_=>{if(_.element){const g=_.element.getBoundingClientRect();_.top=g.top+window.pageYOffset,_.bottom=g.bottom+window.pageYOffset}}),u[0].element&&n){const _=n.getBoundingClientRect();u[0].bottom=_.top+window.pageYOffset}if(n&&t){const _=u.find(p=>p.id==="getinvolved-video"),g=u.find(p=>p.id==="getinvolved"),m=t.getBoundingClientRect();_&&g&&(g.top=_.top,g.bottom=m.top+window.pageYOffset)}}d();let f=null;function h(){requestAnimationFrame(()=>{const _=window.pageYOffset+window.innerHeight/2;let g=u[0];for(let m=u.length-1;m>=0;m--){const p=u[m];if(p.element&&_>=p.top&&_<p.bottom){g=p;break}}g.id==="getinvolved-video"&&(g=u.find(m=>m.id==="getinvolved")||g),f!==g.id&&(f=g.id,i.querySelectorAll("a").forEach(m=>m.classList.remove("active")),g.link&&g.link.classList.add("active"),c(g.title))})}window.removeEventListener("scroll",h),window.addEventListener("scroll",h),window.addEventListener("resize",zh(()=>{d(),h()},100)),h()}function eR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const o=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,He.set(r,{x:0}),console.log("Sliding cards animation disabled for small viewport")),l&&!n&&(n=He.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger,console.log("Sliding cards animation initialized for large viewport"))},s=()=>{i&&(i.kill(),i=null),t&&(i=qe.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;He.set(t,{opacity:c})},onLeaveBack:()=>{He.set(t,{opacity:1})}}),console.log("Hero travel area fade animation initialized"))};o(),s();const a=zh(()=>{o(),s()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function jc(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}const t=[],n=()=>new Promise(s=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{s()}):setTimeout(s,100)}),i=s=>new Promise(a=>{const l=s.closest("section")||s.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),o=(s,a)=>{const l=s.innerHTML;s.setAttribute("data-original-content",l),Promise.all([n(),i(s)]).then(()=>{s.offsetHeight;const c=(u=0)=>{const d=new na(s,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});d.lines&&d.lines.length>0&&d.lines.length>1?(t.push({element:s,splitText:d,originalContent:l}),He.set(d.lines,{opacity:0,y:50}),qe.create({trigger:s,start:"top 85%",once:!1,markers:!1,id:`split-lines-${a}`,onEnter:()=>{He.to(d.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{He.to(d.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",s),s.innerHTML=l)};c()})};e.forEach((s,a)=>{o(s,a)}),window.cleanupSplitLines=()=>{t.forEach(s=>{s.element&&s.originalContent&&(s.element.innerHTML=s.originalContent);const a=t.indexOf(s);a>-1&&t.splice(a,1)}),console.log("Split lines cleanup completed")},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((a,l)=>{o(a,l)}),console.log("Split lines refreshed")},100)},console.log(`Initialized split lines animations for ${e.length} elements`)}function $c(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}const t=[],n=()=>new Promise(s=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{s()}):setTimeout(s,100)}),i=s=>new Promise(a=>{const l=s.closest("section")||s.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),o=(s,a)=>{const l=s.innerHTML;s.setAttribute("data-original-content",l),Promise.all([n(),i(s)]).then(()=>{s.offsetHeight;const c=(u=0)=>{const d=new na(s,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});d.chars&&d.chars.length>0?(t.push({element:s,splitText:d,originalContent:l}),He.set(d.chars,{opacity:0,y:50,display:"inline-block"}),qe.create({trigger:s,start:"top 85%",once:!1,markers:!1,id:`split-chars-${a}`,onEnter:()=>{He.to(d.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{He.to(d.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create chars after multiple attempts:",s),s.innerHTML=l)};c()})};e.forEach((s,a)=>{o(s,a)}),window.cleanupSplitChars=()=>{t.forEach(s=>{s.element&&s.originalContent&&(s.element.innerHTML=s.originalContent);const a=t.indexOf(s);a>-1&&t.splice(a,1)}),console.log("Split chars cleanup completed")},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((a,l)=>{o(a,l)}),console.log("Split chars refreshed")},100)},console.log(`Initialized split chars animations for ${e.length} elements`)}function Ag(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(He.set(e,{y:50,filter:"opacity(0)"}),qe.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{He.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{He.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(He.set(e,{opacity:0,y:50}),qe.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{He.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{He.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))}),console.log(`Initialized scroll reveal animations for ${r.length} elements`)}function tR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}He.set(r,{opacity:0,y:50}),qe.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{He.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{He.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}),console.log("Initialized get involved logo fade animation")}function nR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}const t=document.createElement("div");t.className="marquee-container";const n=e.cloneNode(!0);e.remove(),t.appendChild(e),t.appendChild(n),r.appendChild(t);const i=()=>{setTimeout(()=>{const o=e.getBoundingClientRect(),s=o.height;console.log("Image dimensions:",{natural:{width:e.naturalWidth,height:e.naturalHeight},rendered:{width:o.width,height:s}}),He.set(e,{top:0,left:0}),He.set(n,{top:s+"px",left:0});const a=He.timeline({repeat:-1,ease:"none"}),l=s/30;a.to([e,n],{y:-s,duration:l,ease:"none"}),a.set([e,n],{y:0}),console.log("Initialized infinite marquee animation with height:",s)},100)};e.complete&&e.naturalHeight!==0?i():(e.addEventListener("load",i),setTimeout(i,1e3))}function iR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[qC,YC,jC],t="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,n=document.createElement("img");n.className="mouse-following-image",n.style.cssText=`
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
  `,document.body.appendChild(n);let i=0,o=0;const s=a=>{i=a.clientX,o=a.clientY,n.style.left=i+"px",n.style.top=o+"px"};document.addEventListener("mousemove",s),r.forEach((a,l)=>{const c=e[l];if(!c){console.warn(`No image mapped for event item ${l}`);return}a.addEventListener("mouseenter",()=>{n.src=c,n.style.opacity="1",a.classList.add("active"),n.style.left=i+"px",n.style.top=o+"px"}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",a.classList.remove("active")})}),console.log(`Initialized hover interactions for ${r.length} event list items`)}function zh(r,e){let t;return function(...i){const o=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(o,e)}}function Cg(){console.log("Reinitializing all split-type elements..."),typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Pi&&Pi.animation){n=Pi.progress,console.log(`Capturing hero fade progress before kill: ${n.toFixed(3)}`);const i=r.querySelectorAll(".char");if(i.length>0){const o=He.timeline({paused:!0});o.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),o.progress(n)}}if(Pi&&(console.log("Killing existing hero heading fade ScrollTrigger during reinit..."),Pi.kill(),Pi=null),r.querySelector(".char"))console.log("Hero heading already split, preserving characters to prevent flash.");else{console.log("Hero heading not split, resetting content...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{console.log("Reinitializing animations after cleanup..."),e.length&&typeof jc=="function"&&jc(e),t.length&&typeof $c=="function"&&$c(t),typeof zf=="function"&&zf(),qe.refresh(),console.log("ScrollTrigger.refresh() called after reinitializations."),console.log("All split-type elements and hero animation reinitialized.")},50)}function rR(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=zh(()=>{console.log("Window resized, reinitializing animations..."),Cg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{console.log("Orientation changed, reinitializing animations..."),Cg()}),console.log("Global resize handler initialized.")}const Rg="/150-lab/assets/video/acs-150-compressed.mp4",Pg="/150-lab/assets/images/anniversary-video-poster.jpg";function oR(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;console.log("Setting video source:",Rg),r.src=Rg,console.log("Setting poster path:",Pg),r.poster=Pg,r.addEventListener("error",d=>{var f,h;console.error("Video loading error:",d),console.error("Video src:",r.src),console.error("Video error code:",(f=r.error)==null?void 0:f.code),console.error("Video error message:",(h=r.error)==null?void 0:h.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=(d,f,h=1e3)=>{if(!d)return;const _=d.volume,g=performance.now(),m=p=>{const b=p-g,S=Math.min(b/h,1),v=S*S;d.volume=_+(f-_)*v,S<1&&requestAnimationFrame(m)};requestAnimationFrame(m)},o=()=>{r.paused||(r.pause(),t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08))},s=()=>{r.paused?(r.play(),t.classList.add("hidden"),window.backgroundAudio&&i(window.backgroundAudio,0),r.volume=window.audioMuted?0:.5):o()};t.addEventListener("click",s),r.addEventListener("click",s),r.addEventListener("ended",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),new IntersectionObserver(d=>{d.forEach(f=>{f.isIntersecting||o()})},{threshold:.5}).observe(e);const l=()=>{r.paused||(r.volume=window.audioMuted?0:.5)},c=document.querySelector(".sound-toggle");c&&c.addEventListener("click",l);let u=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return u},set:function(d){u=d,l()}})}new Date("2026-04-06T00:00:00").getTime();function sR(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();if(r.includes("/editor.html/")||r.includes("globe.html"))return console.log("Not on main page - editor or globe page detected"),!1;const t=r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html");return console.log("URL check:",r),console.log("Pathname:",e),console.log("Is main page:",t),t}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Cv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),HT(),sR()?(console.log("Initializing main page experience"),KC(),oR()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
