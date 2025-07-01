
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

var xv=Object.defineProperty;var Sv=(r,e,t)=>e in r?xv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ze=(r,e,t)=>Sv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var wv="1.3.4";function Lg(r,e,t){return Math.max(r,Math.min(e,t))}function bv(r,e,t){return(1-t)*r+t*e}function Mv(r,e,t,n){return bv(r,e,1-Math.exp(-t*n))}function Ev(r,e){return(r%e+e)%e}var Tv=class{constructor(){Ze(this,"isRunning",!1);Ze(this,"value",0);Ze(this,"from",0);Ze(this,"to",0);Ze(this,"currentTime",0);Ze(this,"lerp");Ze(this,"duration");Ze(this,"easing");Ze(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Lg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Mv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Av(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Cv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ze(this,"width",0);Ze(this,"height",0);Ze(this,"scrollHeight",0);Ze(this,"scrollWidth",0);Ze(this,"debouncedResize");Ze(this,"wrapperResizeObserver");Ze(this,"contentResizeObserver");Ze(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ze(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ze(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Av(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Dg=class{constructor(){Ze(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Vh=100/6,Ar={passive:!1},Rv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ze(this,"touchStart",{x:0,y:0});Ze(this,"lastDelta",{x:0,y:0});Ze(this,"window",{width:0,height:0});Ze(this,"emitter",new Dg);Ze(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ze(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ze(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ze(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Vh:n===2?this.window.width:1,s=n===1?Vh:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ze(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Ar),this.element.addEventListener("touchstart",this.onTouchStart,Ar),this.element.addEventListener("touchmove",this.onTouchMove,Ar),this.element.addEventListener("touchend",this.onTouchEnd,Ar)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Ar),this.element.removeEventListener("touchstart",this.onTouchStart,Ar),this.element.removeEventListener("touchmove",this.onTouchMove,Ar),this.element.removeEventListener("touchend",this.onTouchEnd,Ar)}},Gh=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Pv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:M=!1,allowNestedScroll:C=!1,__experimental__naiveDimensions:E=!1}={}){Ze(this,"_isScrolling",!1);Ze(this,"_isStopped",!1);Ze(this,"_isLocked",!1);Ze(this,"_preventNextNativeScrollEvent",!1);Ze(this,"_resetVelocityTimeout",null);Ze(this,"__rafID",null);Ze(this,"isTouching");Ze(this,"time",0);Ze(this,"userData",{});Ze(this,"lastVelocity",0);Ze(this,"velocity",0);Ze(this,"direction",0);Ze(this,"options");Ze(this,"targetScroll");Ze(this,"animatedScroll");Ze(this,"animate",new Tv);Ze(this,"emitter",new Dg);Ze(this,"dimensions");Ze(this,"virtualScroll");Ze(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ze(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ze(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});Ze(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});Ze(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ze(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,x;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ze(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ze(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=wv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Gh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:b,autoRaf:x,anchors:v,autoToggle:M,allowNestedScroll:C,__experimental__naiveDimensions:E},this.dimensions=new Cv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Rv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Lg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=Gh:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const M=window.getComputedStyle(r);i.computedStyle=M;const C=M.overflowX,E=M.overflowY;if(s=["auto","overlay","scroll"].includes(C),o=["auto","overlay","scroll"].includes(E),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const M=e!==0,C=t!==0;M&&s&&a&&(_="x"),C&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,b,x;if(_==="x")g=r.scrollLeft,m=c-d,p=e,b=s,x=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,b=o,x=l;else return!1;return(p>0?g<m:g>0)&&b&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Ev(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const Lv="modulepreload",Dv=function(r){return"/content/dam/acsorg/150/"+r},Wh={},Xh=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=Dv(c),c in Wh)return;Wh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Lv,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hf="177",Iv=0,qh=1,Ov=2,Ig=1,Nv=2,dr=3,Mr=0,Yn=1,_i=2,qr=0,Yr=1,Ac=2,Yh=3,jh=4,Uv=5,ws=100,Fv=101,kv=102,Bv=103,zv=104,Hv=200,Vv=201,Gv=202,Wv=203,dd=204,fd=205,Xv=206,qv=207,Yv=208,jv=209,$v=210,Kv=211,Zv=212,Jv=213,Qv=214,hd=0,pd=1,md=2,No=3,gd=4,_d=5,vd=6,yd=7,Og=0,ey=1,ty=2,jr=0,ny=1,iy=2,ry=3,sy=4,oy=5,ay=6,ly=7,$h="attached",cy="detached",Ng=300,Uo=301,Fo=302,xd=303,Sd=304,Kc=306,ko=1e3,kr=1001,Cc=1002,Vn=1003,Ug=1004,ya=1005,ai=1006,dc=1007,gr=1008,Qi=1009,Fg=1010,kg=1011,Za=1012,Vf=1013,Fs=1014,Ii=1015,ml=1016,Gf=1017,Wf=1018,Ja=1020,Bg=35902,zg=1021,Hg=1022,vi=1023,Qa=1026,el=1027,Xf=1028,qf=1029,Vg=1030,Yf=1031,jf=1033,fc=33776,hc=33777,pc=33778,mc=33779,wd=35840,bd=35841,Md=35842,Ed=35843,Td=36196,Ad=37492,Cd=37496,Rd=37808,Pd=37809,Ld=37810,Dd=37811,Id=37812,Od=37813,Nd=37814,Ud=37815,Fd=37816,kd=37817,Bd=37818,zd=37819,Hd=37820,Vd=37821,gc=36492,Gd=36494,Wd=36495,Gg=36283,Xd=36284,qd=36285,Yd=36286,tl=2300,nl=2301,lu=2302,Kh=2400,Zh=2401,Jh=2402,uy=2500,dy=0,Wg=1,jd=2,fy=3200,hy=3201,Xg=0,py=1,Fr="",Sn="srgb",Gn="srgb-linear",Rc="linear",Ft="srgb",qs=7680,Qh=519,my=512,gy=513,_y=514,qg=515,vy=516,yy=517,xy=518,Sy=519,$d=35044,ep="300 es",_r=2e3,Pc=2001;class Zo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tp=1234567;const Da=Math.PI/180,Bo=180/Math.PI;function Oi(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(En[r&255]+En[r>>8&255]+En[r>>16&255]+En[r>>24&255]+"-"+En[e&255]+En[e>>8&255]+"-"+En[e>>16&15|64]+En[e>>24&255]+"-"+En[t&63|128]+En[t>>8&255]+"-"+En[t>>16&255]+En[t>>24&255]+En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]).toLowerCase()}function vt(r,e,t){return Math.max(e,Math.min(t,r))}function $f(r,e){return(r%e+e)%e}function wy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function by(r,e,t){return r!==e?(t-r)/(e-r):0}function Ia(r,e,t){return(1-t)*r+t*e}function My(r,e,t,n){return Ia(r,e,1-Math.exp(-t*n))}function Ey(r,e=1){return e-Math.abs($f(r,e*2)-e)}function Ty(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Ay(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Cy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ry(r,e){return r+Math.random()*(e-r)}function Py(r){return r*(.5-Math.random())}function Ly(r){r!==void 0&&(tp=r);let e=tp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dy(r){return r*Da}function Iy(r){return r*Bo}function Oy(r){return(r&r-1)===0&&r!==0}function Ny(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Uy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ot(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ky={DEG2RAD:Da,RAD2DEG:Bo,generateUUID:Oi,clamp:vt,euclideanModulo:$f,mapLinear:wy,inverseLerp:by,lerp:Ia,damp:My,pingpong:Ey,smoothstep:Ty,smootherstep:Ay,randInt:Cy,randFloat:Ry,randFloatSpread:Py,seededRandom:Ly,degToRad:Dy,radToDeg:Iy,isPowerOfTwo:Oy,ceilPowerOfTwo:Ny,floorPowerOfTwo:Uy,setQuaternionFromProperEuler:Fy,normalize:Ot,denormalize:Pi};class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class is{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const M=Math.sqrt(x),C=Math.atan2(M,p*b);m=Math.sin(m*C)/M,a=Math.sin(a*C)/M}const v=a*b;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(np.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(np.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cu=new G,np=new is;class ft{constructor(e,t,n,i,s,o,a,l,c){ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],b=i[1],x=i[4],v=i[7],M=i[2],C=i[5],E=i[8];return s[0]=o*g+a*b+l*M,s[3]=o*m+a*x+l*C,s[6]=o*p+a*v+l*E,s[1]=c*g+u*b+d*M,s[4]=c*m+u*x+d*C,s[7]=c*p+u*v+d*E,s[2]=f*g+h*b+_*M,s[5]=f*m+h*x+_*C,s[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uu.makeScale(e,t)),this}rotate(e){return this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uu=new ft;function Yg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function il(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function By(){const r=il("canvas");return r.style.display="block",r}const ip={};function Mo(r){r in ip||(ip[r]=!0,console.warn(r))}function zy(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Hy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Vy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const rp=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sp=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gy(){const r={enabled:!0,workingColorSpace:Gn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ft&&(i.r=Sr(i.r),i.g=Sr(i.g),i.b=Sr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ft&&(i.r=Eo(i.r),i.g=Eo(i.g),i.b=Eo(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Fr?Rc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Mo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Mo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Gn]:{primaries:e,whitePoint:n,transfer:Rc,toXYZ:rp,fromXYZ:sp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:n,transfer:Ft,toXYZ:rp,fromXYZ:sp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),r}const Et=Gy();function Sr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Eo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ys;class Wy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ys===void 0&&(Ys=il("canvas")),Ys.width=e.width,Ys.height=e.height;const i=Ys.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ys}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=il("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Sr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Sr(t[n]/255)*255):t[n]=Sr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xy=0;class Kf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(du(i[o].image)):s.push(du(i[o]))}else s=du(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function du(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Wy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qy=0;const fu=new G;class dn extends Zo{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,n=kr,i=kr,s=ai,o=gr,a=vi,l=Qi,c=dn.DEFAULT_ANISOTROPY,u=Fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=Oi(),this.name="",this.source=new Kf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fu).x}get height(){return this.source.getSize(fu).y}get depth(){return this.source.getSize(fu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ko:e.x=e.x-Math.floor(e.x);break;case kr:e.x=e.x<0?0:1;break;case Cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ko:e.y=e.y-Math.floor(e.y);break;case kr:e.y=e.y<0?0:1;break;case Cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Ng;dn.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,i=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,M=(p+1)/2,C=(u+f)/4,E=(d+g)/4,P=(_+m)/4;return x>v&&x>M?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=C/n,s=E/n):v>M?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=C/i,s=P/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=E/s,i=P/s),this.set(n,i,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this.w=vt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this.w=vt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yy extends Zo{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new dn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ai,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kf(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ks extends Yy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jg extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jy extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mi):Mi.fromBufferAttribute(s,o),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xl.copy(n.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ia),Sl.subVectors(this.max,ia),js.subVectors(e.a,ia),$s.subVectors(e.b,ia),Ks.subVectors(e.c,ia),Cr.subVectors($s,js),Rr.subVectors(Ks,$s),as.subVectors(js,Ks);let t=[0,-Cr.z,Cr.y,0,-Rr.z,Rr.y,0,-as.z,as.y,Cr.z,0,-Cr.x,Rr.z,0,-Rr.x,as.z,0,-as.x,-Cr.y,Cr.x,0,-Rr.y,Rr.x,0,-as.y,as.x,0];return!hu(t,js,$s,Ks,Sl)||(t=[1,0,0,0,1,0,0,0,1],!hu(t,js,$s,Ks,Sl))?!1:(wl.crossVectors(Cr,Rr),t=[wl.x,wl.y,wl.z],hu(t,js,$s,Ks,Sl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const sr=[new G,new G,new G,new G,new G,new G,new G,new G],Mi=new G,xl=new Ui,js=new G,$s=new G,Ks=new G,Cr=new G,Rr=new G,as=new G,ia=new G,Sl=new G,wl=new G,ls=new G;function hu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ls.fromArray(r,s);const a=i.x*Math.abs(ls.x)+i.y*Math.abs(ls.y)+i.z*Math.abs(ls.z),l=e.dot(ls),c=t.dot(ls),u=n.dot(ls);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const $y=new Ui,ra=new G,pu=new G;class nr{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$y.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ra.subVectors(e,this.center);const t=ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ra.copy(e.center).add(pu)),this.expandByPoint(ra.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const or=new G,mu=new G,bl=new G,Pr=new G,gu=new G,Ml=new G,_u=new G;class Zc{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,or)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=or.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(or.copy(this.origin).addScaledVector(this.direction,t),or.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mu.copy(e).add(t).multiplyScalar(.5),bl.copy(t).sub(e).normalize(),Pr.copy(this.origin).sub(mu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(bl),a=Pr.dot(this.direction),l=-Pr.dot(bl),c=Pr.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mu).addScaledVector(bl,f),h}intersectSphere(e,t){or.subVectors(e.center,this.origin);const n=or.dot(this.direction),i=or.dot(or)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,or)!==null}intersectTriangle(e,t,n,i,s){gu.subVectors(t,e),Ml.subVectors(n,e),_u.crossVectors(gu,Ml);let o=this.direction.dot(_u),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pr.subVectors(this.origin,e);const l=a*this.direction.dot(Ml.crossVectors(Pr,Ml));if(l<0)return null;const c=a*this.direction.dot(gu.cross(Pr));if(c<0||l+c>o)return null;const u=-a*Pr.dot(_u);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Zs.setFromMatrixColumn(e,0).length(),s=1/Zs.setFromMatrixColumn(e,1).length(),o=1/Zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ky,e,Zy)}lookAt(e,t,n){const i=this.elements;return Qn.subVectors(e,t),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Lr.crossVectors(n,Qn),Lr.lengthSq()===0&&(Math.abs(n.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Lr.crossVectors(n,Qn)),Lr.normalize(),El.crossVectors(Qn,Lr),i[0]=Lr.x,i[4]=El.x,i[8]=Qn.x,i[1]=Lr.y,i[5]=El.y,i[9]=Qn.y,i[2]=Lr.z,i[6]=El.z,i[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],b=n[3],x=n[7],v=n[11],M=n[15],C=i[0],E=i[4],P=i[8],w=i[12],y=i[1],L=i[5],D=i[9],z=i[13],O=i[2],T=i[6],W=i[10],Z=i[14],q=i[3],pe=i[7],N=i[11],Y=i[15];return s[0]=o*C+a*y+l*O+c*q,s[4]=o*E+a*L+l*T+c*pe,s[8]=o*P+a*D+l*W+c*N,s[12]=o*w+a*z+l*Z+c*Y,s[1]=u*C+d*y+f*O+h*q,s[5]=u*E+d*L+f*T+h*pe,s[9]=u*P+d*D+f*W+h*N,s[13]=u*w+d*z+f*Z+h*Y,s[2]=_*C+g*y+m*O+p*q,s[6]=_*E+g*L+m*T+p*pe,s[10]=_*P+g*D+m*W+p*N,s[14]=_*w+g*z+m*Z+p*Y,s[3]=b*C+x*y+v*O+M*q,s[7]=b*E+x*L+v*T+M*pe,s[11]=b*P+x*D+v*W+M*N,s[15]=b*w+x*z+v*Z+M*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,x=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,M=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,C=t*b+n*x+i*v+s*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/C;return e[0]=b*E,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=x*E,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*E,e[12]=M*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*E,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,b=l*c,x=l*u,v=l*d,M=n.x,C=n.y,E=n.z;return i[0]=(1-(g+p))*M,i[1]=(h+v)*M,i[2]=(_-x)*M,i[3]=0,i[4]=(h-v)*C,i[5]=(1-(f+p))*C,i[6]=(m+b)*C,i[7]=0,i[8]=(_+x)*E,i[9]=(m-b)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Zs.set(i[0],i[1],i[2]).length();const o=Zs.set(i[4],i[5],i[6]).length(),a=Zs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ei.copy(this);const c=1/s,u=1/o,d=1/a;return Ei.elements[0]*=c,Ei.elements[1]*=c,Ei.elements[2]*=c,Ei.elements[4]*=u,Ei.elements[5]*=u,Ei.elements[6]*=u,Ei.elements[8]*=d,Ei.elements[9]*=d,Ei.elements[10]*=d,t.setFromRotationMatrix(Ei),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=_r){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===_r)h=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Pc)h=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=_r){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===_r)_=(o+s)*d,g=-2*d;else if(a===Pc)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Zs=new G,Ei=new ht,Ky=new G(0,0,0),Zy=new G(1,1,1),Lr=new G,El=new G,Qn=new G,op=new ht,ap=new is;class er{constructor(e=0,t=0,n=0,i=er.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return op.makeRotationFromQuaternion(e),this.setFromRotationMatrix(op,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ap.setFromEuler(this),this.setFromQuaternion(ap,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}er.DEFAULT_ORDER="XYZ";class $g{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jy=0;const lp=new G,Js=new is,ar=new ht,Tl=new G,sa=new G,Qy=new G,ex=new is,cp=new G(1,0,0),up=new G(0,1,0),dp=new G(0,0,1),fp={type:"added"},tx={type:"removed"},Qs={type:"childadded",child:null},vu={type:"childremoved",child:null};class Kt extends Zo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kt.DEFAULT_UP.clone();const e=new G,t=new er,n=new is,i=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new ft}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $g,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.multiply(Js),this}rotateOnWorldAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.premultiply(Js),this}rotateX(e){return this.rotateOnAxis(cp,e)}rotateY(e){return this.rotateOnAxis(up,e)}rotateZ(e){return this.rotateOnAxis(dp,e)}translateOnAxis(e,t){return lp.copy(e).applyQuaternion(this.quaternion),this.position.add(lp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cp,e)}translateY(e){return this.translateOnAxis(up,e)}translateZ(e){return this.translateOnAxis(dp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ar.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tl.copy(e):Tl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ar.lookAt(sa,Tl,this.up):ar.lookAt(Tl,sa,this.up),this.quaternion.setFromRotationMatrix(ar),i&&(ar.extractRotation(i.matrixWorld),Js.setFromRotationMatrix(ar),this.quaternion.premultiply(Js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fp),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tx),vu.child=e,this.dispatchEvent(vu),vu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ar.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ar.multiply(e.parent.matrixWorld)),e.applyMatrix4(ar),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fp),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,e,Qy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,ex,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Kt.DEFAULT_UP=new G(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ti=new G,lr=new G,yu=new G,cr=new G,eo=new G,to=new G,hp=new G,xu=new G,Su=new G,wu=new G,bu=new Ct,Mu=new Ct,Eu=new Ct;class Li{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ti.subVectors(e,t),i.cross(Ti);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ti.subVectors(i,t),lr.subVectors(n,t),yu.subVectors(e,t);const o=Ti.dot(Ti),a=Ti.dot(lr),l=Ti.dot(yu),c=lr.dot(lr),u=lr.dot(yu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,cr)===null?!1:cr.x>=0&&cr.y>=0&&cr.x+cr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,cr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,cr.x),l.addScaledVector(o,cr.y),l.addScaledVector(a,cr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return bu.setScalar(0),Mu.setScalar(0),Eu.setScalar(0),bu.fromBufferAttribute(e,t),Mu.fromBufferAttribute(e,n),Eu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(bu,s.x),o.addScaledVector(Mu,s.y),o.addScaledVector(Eu,s.z),o}static isFrontFacing(e,t,n,i){return Ti.subVectors(n,t),lr.subVectors(e,t),Ti.cross(lr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ti.subVectors(this.c,this.b),lr.subVectors(this.a,this.b),Ti.cross(lr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Li.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Li.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;eo.subVectors(i,n),to.subVectors(s,n),xu.subVectors(e,n);const l=eo.dot(xu),c=to.dot(xu);if(l<=0&&c<=0)return t.copy(n);Su.subVectors(e,i);const u=eo.dot(Su),d=to.dot(Su);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(eo,o);wu.subVectors(e,s);const h=eo.dot(wu),_=to.dot(wu);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(to,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return hp.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hp,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(eo,o).addScaledVector(to,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dr={h:0,s:0,l:0},Al={h:0,s:0,l:0};function Tu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Et.workingColorSpace){return this.r=e,this.g=t,this.b=n,Et.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Et.workingColorSpace){if(e=$f(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Tu(o,s,e+1/3),this.g=Tu(o,s,e),this.b=Tu(o,s,e-1/3)}return Et.colorSpaceToWorking(this,i),this}setStyle(e,t=Sn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const n=Kg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}copyLinearToSRGB(e){return this.r=Eo(e.r),this.g=Eo(e.g),this.b=Eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return Et.workingToColorSpace(Tn.copy(this),e),Math.round(vt(Tn.r*255,0,255))*65536+Math.round(vt(Tn.g*255,0,255))*256+Math.round(vt(Tn.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.workingToColorSpace(Tn.copy(this),t);const n=Tn.r,i=Tn.g,s=Tn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Et.workingColorSpace){return Et.workingToColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=Sn){Et.workingToColorSpace(Tn.copy(this),e);const t=Tn.r,n=Tn.g,i=Tn.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Dr),this.setHSL(Dr.h+e,Dr.s+t,Dr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dr),e.getHSL(Al);const n=Ia(Dr.h,Al.h,t),i=Ia(Dr.s,Al.s,t),s=Ia(Dr.l,Al.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Tn=new Je;Je.NAMES=Kg;let nx=0;class Ki extends Zo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=Yr,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dd,this.blendDst=fd,this.blendEquation=ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=No,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qs,this.stencilZFail=qs,this.stencilZPass=qs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yr&&(n.blending=this.blending),this.side!==Mr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dd&&(n.blendSrc=this.blendSrc),this.blendDst!==fd&&(n.blendDst=this.blendDst),this.blendEquation!==ws&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==No&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ms extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const on=new G,Cl=new St;let ix=0;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ix++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$d,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cl.fromBufferAttribute(this,t),Cl.applyMatrix3(e),this.setXY(t,Cl.x,Cl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix3(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),i=Ot(i,this.array),s=Ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$d&&(e.usage=this.usage),e}}class Zg extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jg extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wr extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let rx=0;const fi=new ht,Au=new Kt,no=new G,ei=new Ui,oa=new Ui,mn=new G;class bi extends Zo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yg(e)?Jg:Zg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ft().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fi.makeRotationFromQuaternion(e),this.applyMatrix4(fi),this}rotateX(e){return fi.makeRotationX(e),this.applyMatrix4(fi),this}rotateY(e){return fi.makeRotationY(e),this.applyMatrix4(fi),this}rotateZ(e){return fi.makeRotationZ(e),this.applyMatrix4(fi),this}translate(e,t,n){return fi.makeTranslation(e,t,n),this.applyMatrix4(fi),this}scale(e,t,n){return fi.makeScale(e,t,n),this.applyMatrix4(fi),this}lookAt(e){return Au.lookAt(e),Au.updateMatrix(),this.applyMatrix4(Au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(no).negate(),this.translate(no.x,no.y,no.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new wr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];ei.setFromBufferAttribute(s),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(ei.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];oa.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(ei.min,oa.min),ei.expandByPoint(mn),mn.addVectors(ei.max,oa.max),ei.expandByPoint(mn)):(ei.expandByPoint(oa.min),ei.expandByPoint(oa.max))}ei.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)mn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(mn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)mn.fromBufferAttribute(a,c),l&&(no.fromBufferAttribute(e,c),mn.add(no)),i=Math.max(i,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new G,l[P]=new G;const c=new G,u=new G,d=new G,f=new St,h=new St,_=new St,g=new G,m=new G;function p(P,w,y){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,w),_.fromBufferAttribute(s,y),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),a[P].add(g),a[w].add(g),a[y].add(g),l[P].add(m),l[w].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let P=0,w=b.length;P<w;++P){const y=b[P],L=y.start,D=y.count;for(let z=L,O=L+D;z<O;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new G,v=new G,M=new G,C=new G;function E(P){M.fromBufferAttribute(i,P),C.copy(M);const w=a[P];x.copy(w),x.sub(M.multiplyScalar(M.dot(w))).normalize(),v.crossVectors(C,w);const L=v.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,L)}for(let P=0,w=b.length;P<w;++P){const y=b[P],L=y.start,D=y.count;for(let z=L,O=L+D;z<O;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Nt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pp=new ht,cs=new Zc,Rl=new nr,mp=new G,Pl=new G,Ll=new G,Dl=new G,Cu=new G,Il=new G,gp=new G,Ol=new G;class Hn extends Kt{constructor(e=new bi,t=new Ms){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Il.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Cu.fromBufferAttribute(d,e),o?Il.addScaledVector(Cu,u):Il.addScaledVector(Cu.sub(t),u))}t.add(Il)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rl.copy(n.boundingSphere),Rl.applyMatrix4(s),cs.copy(e.ray).recast(e.near),!(Rl.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Rl,mp)===null||cs.origin.distanceToSquared(mp)>(e.far-e.near)**2))&&(pp.copy(s).invert(),cs.copy(e.ray).applyMatrix4(pp),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,M=x;v<M;v+=3){const C=a.getX(v),E=a.getX(v+1),P=a.getX(v+2);i=Nl(this,p,e,n,c,u,d,C,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);i=Nl(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,M=x;v<M;v+=3){const C=v,E=v+1,P=v+2;i=Nl(this,p,e,n,c,u,d,C,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=m,x=m+1,v=m+2;i=Nl(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function sx(r,e,t,n,i,s,o,a){let l;if(e.side===Yn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Mr,a),l===null)return null;Ol.copy(a),Ol.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ol);return c<t.near||c>t.far?null:{distance:c,point:Ol.clone(),object:r}}function Nl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Pl),r.getVertexPosition(l,Ll),r.getVertexPosition(c,Dl);const u=sx(r,e,t,n,Pl,Ll,Dl,gp);if(u){const d=new G;Li.getBarycoord(gp,Pl,Ll,Dl,d),i&&(u.uv=Li.getInterpolatedAttribute(i,a,l,c,d,new St)),s&&(u.uv1=Li.getInterpolatedAttribute(s,a,l,c,d,new St)),o&&(u.normal=Li.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};Li.getNormal(Pl,Ll,Dl,f.normal),u.face=f,u.barycoord=d}return u}class gl extends bi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new wr(c,3)),this.setAttribute("normal",new wr(u,3)),this.setAttribute("uv",new wr(d,2));function _(g,m,p,b,x,v,M,C,E,P,w){const y=v/E,L=M/P,D=v/2,z=M/2,O=C/2,T=E+1,W=P+1;let Z=0,q=0;const pe=new G;for(let N=0;N<W;N++){const Y=N*L-z;for(let je=0;je<T;je++){const tt=je*y-D;pe[g]=tt*b,pe[m]=Y*x,pe[p]=O,c.push(pe.x,pe.y,pe.z),pe[g]=0,pe[m]=0,pe[p]=C>0?1:-1,u.push(pe.x,pe.y,pe.z),d.push(je/E),d.push(1-N/P),Z+=1}}for(let N=0;N<P;N++)for(let Y=0;Y<E;Y++){const je=f+Y+T*N,tt=f+Y+T*(N+1),te=f+(Y+1)+T*(N+1),le=f+(Y+1)+T*N;l.push(je,tt,le),l.push(tt,te,le),q+=6}a.addGroup(h,q,w),h+=q,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nn(r){const e={};for(let t=0;t<r.length;t++){const n=zo(r[t]);for(const i in n)e[i]=n[i]}return e}function ox(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Qg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const ax={clone:zo,merge:Nn};var lx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lx,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zo(e.uniforms),this.uniformsGroups=ox(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class e_ extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=_r}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ir=new G,_p=new St,vp=new St;class qn extends e_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bo*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ir.x,Ir.y).multiplyScalar(-e/Ir.z),Ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ir.x,Ir.y).multiplyScalar(-e/Ir.z)}getViewSize(e,t){return this.getViewBounds(e,_p,vp),t.subVectors(vp,_p)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const io=-90,ro=1;class ux extends Kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qn(io,ro,e,t);i.layers=this.layers,this.add(i);const s=new qn(io,ro,e,t);s.layers=this.layers,this.add(s);const o=new qn(io,ro,e,t);o.layers=this.layers,this.add(o);const a=new qn(io,ro,e,t);a.layers=this.layers,this.add(a);const l=new qn(io,ro,e,t);l.layers=this.layers,this.add(l);const c=new qn(io,ro,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===_r)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Pc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class t_ extends dn{constructor(e=[],t=Uo,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dx extends ks{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new t_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gl(5,5,5),s=new yi({name:"CubemapFromEquirect",uniforms:zo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yn,blending:qr});s.uniforms.tEquirect.value=t;const o=new Hn(i,s),a=t.minFilter;return t.minFilter===gr&&(t.minFilter=ai),new ux(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class vr extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fx={type:"move"};class Ru{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yp extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new er,this.environmentIntensity=1,this.environmentRotation=new er,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class hx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$d,this.updateRanges=[],this.version=0,this.uuid=Oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dn=new G;class Zf{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),i=Ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),i=Ot(i,this.array),s=Ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const xp=new G,Sp=new Ct,wp=new Ct,px=new G,bp=new ht,Ul=new G,Pu=new nr,Mp=new ht,Lu=new Zc;class mx extends Hn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$h,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ui),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingBox.expandByPoint(Ul)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ul),this.boundingSphere.expandByPoint(Ul)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pu.copy(this.boundingSphere),Pu.applyMatrix4(i),e.ray.intersectsSphere(Pu)!==!1&&(Mp.copy(i).invert(),Lu.copy(e.ray).applyMatrix4(Mp),!(this.boundingBox!==null&&Lu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===$h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Sp.fromBufferAttribute(i.attributes.skinIndex,e),wp.fromBufferAttribute(i.attributes.skinWeight,e),xp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=wp.getComponent(s);if(o!==0){const a=Sp.getComponent(s);bp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(px.copy(xp).applyMatrix4(bp),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class n_ extends Kt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class i_ extends dn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Vn,u=Vn,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ep=new ht,gx=new ht;class Jf{constructor(e=[],t=[]){this.uuid=Oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:gx;Ep.multiplyMatrices(a,t[s]),Ep.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new i_(t,e,e,vi,Ii);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new n_),this.bones.push(o),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Kd extends Nt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const so=new ht,Tp=new ht,Fl=[],Ap=new Ui,_x=new ht,aa=new Hn,la=new nr;class vx extends Hn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,_x)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,so),Ap.copy(e.boundingBox).applyMatrix4(so),this.boundingBox.union(Ap)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,so),la.copy(e.boundingSphere).applyMatrix4(so),this.boundingSphere.union(la)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(aa.geometry=this.geometry,aa.material=this.material,aa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),la.copy(this.boundingSphere),la.applyMatrix4(n),e.ray.intersectsSphere(la)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,so),Tp.multiplyMatrices(n,so),aa.matrixWorld=Tp,aa.raycast(e,Fl);for(let o=0,a=Fl.length;o<a;o++){const l=Fl[o];l.instanceId=s,l.object=this,t.push(l)}Fl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new i_(new Float32Array(i*this.count),i,this.count,Xf,Ii));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Du=new G,yx=new G,xx=new ft;class _s{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Du.subVectors(n,t).cross(yx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Du),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||xx.getNormalMatrix(e),i=this.coplanarPoint(Du).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const us=new nr,kl=new G;class Qf{constructor(e=new _s,t=new _s,n=new _s,i=new _s,s=new _s,o=new _s){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_r){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],b=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+b).normalize(),n[3].setComponents(l-o,f-u,m-_,v-b).normalize(),n[4].setComponents(l-a,f-d,m-g,v-x).normalize(),t===_r)n[5].setComponents(l+a,f+d,m+g,v+x).normalize();else if(t===Pc)n[5].setComponents(a,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){return us.center.set(0,0,0),us.radius=.7071067811865476,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(kl.x=i.normal.x>0?e.max.x:e.min.x,kl.y=i.normal.y>0?e.max.y:e.min.y,kl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class r_ extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lc=new G,Dc=new G,Cp=new ht,ca=new Zc,Bl=new nr,Iu=new G,Rp=new G;class eh extends Kt{constructor(e=new bi,t=new r_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Lc.fromBufferAttribute(t,i-1),Dc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Lc.distanceTo(Dc);e.setAttribute("lineDistance",new wr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bl.copy(n.boundingSphere),Bl.applyMatrix4(i),Bl.radius+=s,e.ray.intersectsSphere(Bl)===!1)return;Cp.copy(i).invert(),ca.copy(e.ray).applyMatrix4(Cp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),b=u.getX(g+1),x=zl(this,e,ca,l,p,b,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=zl(this,e,ca,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=zl(this,e,ca,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=zl(this,e,ca,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function zl(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Lc.fromBufferAttribute(a,i),Dc.fromBufferAttribute(a,s),t.distanceSqToSegment(Lc,Dc,Iu,Rp)>n)return;Iu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Iu);if(!(c<e.near||c>e.far))return{distance:c,point:Rp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Pp=new G,Lp=new G;class Sx extends eh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Pp.fromBufferAttribute(t,i),Lp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Pp.distanceTo(Lp);e.setAttribute("lineDistance",new wr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wx extends eh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class s_ extends Ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dp=new ht,Zd=new Zc,Hl=new nr,Vl=new G;class Jd extends Kt{constructor(e=new bi,t=new s_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(i),Hl.radius+=s,e.ray.intersectsSphere(Hl)===!1)return;Dp.copy(i).invert(),Zd.copy(e.ray).applyMatrix4(Dp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Vl.fromBufferAttribute(d,m),Ip(Vl,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)Vl.fromBufferAttribute(d,_),Ip(Vl,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ip(r,e,t,n,i,s,o){const a=Zd.distanceSqToPoint(r);if(a<t){const l=new G;Zd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class o_ extends dn{constructor(e,t,n=Fs,i,s,o,a=Vn,l=Vn,c,u=Qa,d=1){if(u!==Qa&&u!==el)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ci extends bi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const b=p*f-o;for(let x=0;x<c;x++){const v=x*d-s;_.push(v,-b,0),g.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,v=b+c*(p+1),M=b+1+c*(p+1),C=b+1+c*p;h.push(x,v,C),h.push(v,M,C)}this.setIndex(h),this.setAttribute("position",new wr(_,3)),this.setAttribute("normal",new wr(g,3)),this.setAttribute("uv",new wr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.widthSegments,e.heightSegments)}}class th extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xg,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ir extends th{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new St(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class bx extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mx extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Gl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Ex(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Tx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Op(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function a_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class _l{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ax extends _l{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kh,endingEnd:Kh}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zh:s=e,a=2*t-n;break;case Jh:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zh:o=e,l=2*n-t;break;case Jh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,b=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,x=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+b*o[c+M]+x*o[l+M]+v*o[d+M];return s}}class Cx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class Rx extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gl(t,this.TimeBufferType),this.values=Gl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gl(e.times,Array),values:Gl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Cx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ax(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case nl:t=this.InterpolantFactoryMethodLinear;break;case lu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return nl;case this.InterpolantFactoryMethodSmooth:return lu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Ex(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===lu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Fi.prototype.ValueTypeName="";Fi.prototype.TimeBufferType=Float32Array;Fi.prototype.ValueBufferType=Float32Array;Fi.prototype.DefaultInterpolation=nl;class Jo extends Fi{constructor(e,t,n){super(e,t,n)}}Jo.prototype.ValueTypeName="bool";Jo.prototype.ValueBufferType=Array;Jo.prototype.DefaultInterpolation=tl;Jo.prototype.InterpolantFactoryMethodLinear=void 0;Jo.prototype.InterpolantFactoryMethodSmooth=void 0;class l_ extends Fi{constructor(e,t,n,i){super(e,t,n,i)}}l_.prototype.ValueTypeName="color";class Ho extends Fi{constructor(e,t,n,i){super(e,t,n,i)}}Ho.prototype.ValueTypeName="number";class Px extends _l{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)is.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Vo extends Fi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Px(this.times,this.values,this.getValueSize(),e)}}Vo.prototype.ValueTypeName="quaternion";Vo.prototype.InterpolantFactoryMethodSmooth=void 0;class Qo extends Fi{constructor(e,t,n){super(e,t,n)}}Qo.prototype.ValueTypeName="string";Qo.prototype.ValueBufferType=Array;Qo.prototype.DefaultInterpolation=tl;Qo.prototype.InterpolantFactoryMethodLinear=void 0;Qo.prototype.InterpolantFactoryMethodSmooth=void 0;class Go extends Fi{constructor(e,t,n,i){super(e,t,n,i)}}Go.prototype.ValueTypeName="vector";class Lx{constructor(e="",t=-1,n=[],i=uy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Oi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Ix(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Fi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Tx(l);l=Op(l,1,u),c=Op(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Ho(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];a_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let b=0;b!==f[_].morphTargets.length;++b){const x=f[_];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new Ho(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(Go,h+".position",f,"pos",i),n(Vo,h+".quaternion",f,"rot",i),n(Go,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Dx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ho;case"vector":case"vector2":case"vector3":case"vector4":return Go;case"color":return l_;case"quaternion":return Vo;case"bool":case"boolean":return Jo;case"string":return Qo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Ix(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Dx(r.type);if(r.times===void 0){const t=[],n=[];a_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Br={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ox{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const Nx=new Ox;class ea{constructor(e){this.manager=e!==void 0?e:Nx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ea.DEFAULT_MATERIAL_NAME="__DEFAULT";const ur={};class Ux extends Error{constructor(e,t){super(e),this.response=t}}class c_ extends ea{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Br.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ur[e]!==void 0){ur[e].push({onLoad:t,onProgress:n,onError:i});return}ur[e]=[],ur[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=ur[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){b();function b(){d.read().then(({done:x,value:v})=>{if(x)p.close();else{g+=v.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let C=0,E=u.length;C<E;C++){const P=u[C];P.onProgress&&P.onProgress(M)}p.enqueue(v),b()}},x=>{p.error(x)})}}});return new Response(m)}else throw new Ux(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Br.add(e,c);const u=ur[e];delete ur[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=ur[e];if(u===void 0)throw this.manager.itemError(e),c;delete ur[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Fx extends ea{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Br.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=il("img");function l(){u(),Br.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class kx extends ea{constructor(e){super(e)}load(e,t,n,i){const s=new dn,o=new Fx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Jc extends Kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ou=new ht,Np=new G,Up=new G;class nh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.mapType=Qi,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qf,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Np.setFromMatrixPosition(e.matrixWorld),t.position.copy(Np),Up.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Up),t.updateMatrixWorld(),Ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bx extends nh{constructor(){super(new qn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Bo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zx extends Jc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Bx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fp=new ht,ua=new G,Nu=new G;class Hx extends nh{constructor(){super(new qn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new St(4,2),this._viewportCount=6,this._viewports=[new Ct(2,1,1,1),new Ct(0,1,1,1),new Ct(3,1,1,1),new Ct(1,1,1,1),new Ct(3,0,1,1),new Ct(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(ua),Nu.copy(n.position),Nu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Nu),n.updateMatrixWorld(),i.makeTranslation(-ua.x,-ua.y,-ua.z),Fp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fp)}}class Vx extends Jc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Hx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qc extends e_{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gx extends nh{constructor(){super(new Qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u_ extends Jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.shadow=new Gx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Wx extends Jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Oa{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Uu=new WeakMap;class Xx extends ea{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Br.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Uu.has(o)===!0)i&&i(Uu.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Br.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Uu.set(l,c),Br.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Br.add(e,l),s.manager.itemStart(e)}}class qx extends qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ih="\\[\\]\\.:\\/",Yx=new RegExp("["+ih+"]","g"),rh="[^"+ih+"]",jx="[^"+ih.replace("\\.","")+"]",$x=/((?:WC+[\/:])*)/.source.replace("WC",rh),Kx=/(WCOD+)?/.source.replace("WCOD",jx),Zx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Jx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Qx=new RegExp("^"+$x+Kx+Zx+Jx+"$"),eS=["material","materials","bones","map"];class tS{constructor(e,t,n){const i=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ut{constructor(e,t,n){this.path=t,this.parsedPath=n||Ut.parseTrackName(t),this.node=Ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ut.Composite(e,t,n):new Ut(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Yx,"")}static parseTrackName(e){const t=Qx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);eS.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ut.Composite=tS;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function kp(r,e,t,n){const i=nS(n);switch(t){case zg:return r*e;case Xf:return r*e/i.components*i.byteLength;case qf:return r*e/i.components*i.byteLength;case Vg:return r*e*2/i.components*i.byteLength;case Yf:return r*e*2/i.components*i.byteLength;case Hg:return r*e*3/i.components*i.byteLength;case vi:return r*e*4/i.components*i.byteLength;case jf:return r*e*4/i.components*i.byteLength;case fc:case hc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case pc:case mc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bd:case Ed:return Math.max(r,16)*Math.max(e,8)/4;case wd:case Md:return Math.max(r,8)*Math.max(e,8)/2;case Td:case Ad:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Cd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Id:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Od:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Hd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Vd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case gc:case Gd:case Wd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gg:case Xd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case qd:case Yd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nS(r){switch(r){case Qi:case Fg:return{byteLength:1,components:1};case Za:case kg:case ml:return{byteLength:2,components:1};case Gf:case Wf:return{byteLength:2,components:4};case Fs:case Vf:case Ii:return{byteLength:4,components:1};case Bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function d_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function iS(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var rS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sS=`#ifdef USE_ALPHAHASH
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
#endif`,oS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uS=`#ifdef USE_AOMAP
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
#endif`,dS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fS=`#ifdef USE_BATCHING
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
#endif`,hS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_S=`#ifdef USE_IRIDESCENCE
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
#endif`,vS=`#ifdef USE_BUMPMAP
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
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,AS=`#define PI 3.141592653589793
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
} // validated`,CS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,RS=`vec3 transformedNormal = objectNormal;
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
#endif`,PS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,IS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,OS="gl_FragColor = linearToOutputTexel( gl_FragColor );",NS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,US=`#ifdef USE_ENVMAP
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
#endif`,FS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kS=`#ifdef USE_ENVMAP
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
#endif`,BS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zS=`#ifdef USE_ENVMAP
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
#endif`,HS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,XS=`#ifdef USE_GRADIENTMAP
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
}`,qS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,YS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$S=`uniform bool receiveShadow;
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
#endif`,KS=`#ifdef USE_ENVMAP
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
#endif`,ZS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,JS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ew=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tw=`PhysicalMaterial material;
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
#endif`,nw=`struct PhysicalMaterial {
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
}`,iw=`
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
#endif`,rw=`#if defined( RE_IndirectDiffuse )
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
#endif`,sw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ow=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,aw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hw=`#if defined( USE_POINTS_UV )
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
#endif`,pw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_w=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yw=`#ifdef USE_MORPHTARGETS
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
#endif`,xw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ww=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ew=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tw=`#ifdef USE_NORMALMAP
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
#endif`,Aw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Iw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ow=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vw=`float getShadowMask() {
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
}`,Gw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ww=`#ifdef USE_SKINNING
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
#endif`,Xw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qw=`#ifdef USE_SKINNING
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
#endif`,Yw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$w=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zw=`#ifdef USE_TRANSMISSION
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
#endif`,Jw=`#ifdef USE_TRANSMISSION
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
#endif`,Qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ib=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rb=`uniform sampler2D t2D;
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
}`,sb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ob=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cb=`#include <common>
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
}`,ub=`#if DEPTH_PACKING == 3200
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
}`,db=`#define DISTANCE
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
}`,fb=`#define DISTANCE
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
}`,hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mb=`uniform float scale;
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
}`,gb=`uniform vec3 diffuse;
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
}`,_b=`#include <common>
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
}`,vb=`uniform vec3 diffuse;
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
}`,yb=`#define LAMBERT
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
}`,xb=`#define LAMBERT
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
}`,Sb=`#define MATCAP
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
}`,wb=`#define MATCAP
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
}`,bb=`#define NORMAL
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
}`,Mb=`#define NORMAL
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
}`,Eb=`#define PHONG
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
}`,Tb=`#define PHONG
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
}`,Ab=`#define STANDARD
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
}`,Cb=`#define STANDARD
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
}`,Rb=`#define TOON
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
}`,Pb=`#define TOON
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
}`,Lb=`uniform float size;
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
}`,Db=`uniform vec3 diffuse;
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
}`,Ib=`#include <common>
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
}`,Ob=`uniform vec3 color;
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
}`,Nb=`uniform float rotation;
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
}`,Ub=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:rS,alphahash_pars_fragment:sS,alphamap_fragment:oS,alphamap_pars_fragment:aS,alphatest_fragment:lS,alphatest_pars_fragment:cS,aomap_fragment:uS,aomap_pars_fragment:dS,batching_pars_vertex:fS,batching_vertex:hS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:gS,iridescence_fragment:_S,bumpmap_pars_fragment:vS,clipping_planes_fragment:yS,clipping_planes_pars_fragment:xS,clipping_planes_pars_vertex:SS,clipping_planes_vertex:wS,color_fragment:bS,color_pars_fragment:MS,color_pars_vertex:ES,color_vertex:TS,common:AS,cube_uv_reflection_fragment:CS,defaultnormal_vertex:RS,displacementmap_pars_vertex:PS,displacementmap_vertex:LS,emissivemap_fragment:DS,emissivemap_pars_fragment:IS,colorspace_fragment:OS,colorspace_pars_fragment:NS,envmap_fragment:US,envmap_common_pars_fragment:FS,envmap_pars_fragment:kS,envmap_pars_vertex:BS,envmap_physical_pars_fragment:KS,envmap_vertex:zS,fog_vertex:HS,fog_pars_vertex:VS,fog_fragment:GS,fog_pars_fragment:WS,gradientmap_pars_fragment:XS,lightmap_pars_fragment:qS,lights_lambert_fragment:YS,lights_lambert_pars_fragment:jS,lights_pars_begin:$S,lights_toon_fragment:ZS,lights_toon_pars_fragment:JS,lights_phong_fragment:QS,lights_phong_pars_fragment:ew,lights_physical_fragment:tw,lights_physical_pars_fragment:nw,lights_fragment_begin:iw,lights_fragment_maps:rw,lights_fragment_end:sw,logdepthbuf_fragment:ow,logdepthbuf_pars_fragment:aw,logdepthbuf_pars_vertex:lw,logdepthbuf_vertex:cw,map_fragment:uw,map_pars_fragment:dw,map_particle_fragment:fw,map_particle_pars_fragment:hw,metalnessmap_fragment:pw,metalnessmap_pars_fragment:mw,morphinstance_vertex:gw,morphcolor_vertex:_w,morphnormal_vertex:vw,morphtarget_pars_vertex:yw,morphtarget_vertex:xw,normal_fragment_begin:Sw,normal_fragment_maps:ww,normal_pars_fragment:bw,normal_pars_vertex:Mw,normal_vertex:Ew,normalmap_pars_fragment:Tw,clearcoat_normal_fragment_begin:Aw,clearcoat_normal_fragment_maps:Cw,clearcoat_pars_fragment:Rw,iridescence_pars_fragment:Pw,opaque_fragment:Lw,packing:Dw,premultiplied_alpha_fragment:Iw,project_vertex:Ow,dithering_fragment:Nw,dithering_pars_fragment:Uw,roughnessmap_fragment:Fw,roughnessmap_pars_fragment:kw,shadowmap_pars_fragment:Bw,shadowmap_pars_vertex:zw,shadowmap_vertex:Hw,shadowmask_pars_fragment:Vw,skinbase_vertex:Gw,skinning_pars_vertex:Ww,skinning_vertex:Xw,skinnormal_vertex:qw,specularmap_fragment:Yw,specularmap_pars_fragment:jw,tonemapping_fragment:$w,tonemapping_pars_fragment:Kw,transmission_fragment:Zw,transmission_pars_fragment:Jw,uv_pars_fragment:Qw,uv_pars_vertex:eb,uv_vertex:tb,worldpos_vertex:nb,background_vert:ib,background_frag:rb,backgroundCube_vert:sb,backgroundCube_frag:ob,cube_vert:ab,cube_frag:lb,depth_vert:cb,depth_frag:ub,distanceRGBA_vert:db,distanceRGBA_frag:fb,equirect_vert:hb,equirect_frag:pb,linedashed_vert:mb,linedashed_frag:gb,meshbasic_vert:_b,meshbasic_frag:vb,meshlambert_vert:yb,meshlambert_frag:xb,meshmatcap_vert:Sb,meshmatcap_frag:wb,meshnormal_vert:bb,meshnormal_frag:Mb,meshphong_vert:Eb,meshphong_frag:Tb,meshphysical_vert:Ab,meshphysical_frag:Cb,meshtoon_vert:Rb,meshtoon_frag:Pb,points_vert:Lb,points_frag:Db,shadow_vert:Ib,shadow_frag:Ob,sprite_vert:Nb,sprite_frag:Ub},Ne={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},Xi={basic:{uniforms:Nn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Nn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Nn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Nn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Nn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Nn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Nn([Ne.points,Ne.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Nn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Nn([Ne.common,Ne.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Nn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Nn([Ne.sprite,Ne.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Nn([Ne.common,Ne.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Nn([Ne.lights,Ne.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Xi.physical={uniforms:Nn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Wl={r:0,b:0,g:0},ds=new er,Fb=new ht;function kb(r,e,t,n,i,s,o){const a=new Je(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function g(x){let v=!1;const M=_(x);M===null?p(a,l):M&&M.isColor&&(p(M,1),v=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const M=_(v);M&&(M.isCubeTexture||M.mapping===Kc)?(u===void 0&&(u=new Hn(new gl(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:zo(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ds.copy(v.backgroundRotation),ds.x*=-1,ds.y*=-1,ds.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fb.makeRotationFromEuler(ds)),u.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ft,(d!==M||f!==M.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Hn(new Ci(2,2),new yi({name:"BackgroundMaterial",uniforms:zo(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(Wl,Qg(r)),n.buffers.color.setClear(Wl.r,Wl.g,Wl.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:g,addToRenderList:m,dispose:b}}function Bb(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,L,D,z,O){let T=!1;const W=d(z,D,L);s!==W&&(s=W,c(s.object)),T=h(y,z,D,O),T&&_(y,z,D,O),O!==null&&e.update(O,r.ELEMENT_ARRAY_BUFFER),(T||o)&&(o=!1,v(y,L,D,z),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,L,D){const z=D.wireframe===!0;let O=n[y.id];O===void 0&&(O={},n[y.id]=O);let T=O[L.id];T===void 0&&(T={},O[L.id]=T);let W=T[z];return W===void 0&&(W=f(l()),T[z]=W),W}function f(y){const L=[],D=[],z=[];for(let O=0;O<t;O++)L[O]=0,D[O]=0,z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:z,object:y,attributes:{},index:null}}function h(y,L,D,z){const O=s.attributes,T=L.attributes;let W=0;const Z=D.getAttributes();for(const q in Z)if(Z[q].location>=0){const N=O[q];let Y=T[q];if(Y===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(Y=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(Y=y.instanceColor)),N===void 0||N.attribute!==Y||Y&&N.data!==Y.data)return!0;W++}return s.attributesNum!==W||s.index!==z}function _(y,L,D,z){const O={},T=L.attributes;let W=0;const Z=D.getAttributes();for(const q in Z)if(Z[q].location>=0){let N=T[q];N===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(N=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(N=y.instanceColor));const Y={};Y.attribute=N,N&&N.data&&(Y.data=N.data),O[q]=Y,W++}s.attributes=O,s.attributesNum=W,s.index=z}function g(){const y=s.newAttributes;for(let L=0,D=y.length;L<D;L++)y[L]=0}function m(y){p(y,0)}function p(y,L){const D=s.newAttributes,z=s.enabledAttributes,O=s.attributeDivisors;D[y]=1,z[y]===0&&(r.enableVertexAttribArray(y),z[y]=1),O[y]!==L&&(r.vertexAttribDivisor(y,L),O[y]=L)}function b(){const y=s.newAttributes,L=s.enabledAttributes;for(let D=0,z=L.length;D<z;D++)L[D]!==y[D]&&(r.disableVertexAttribArray(D),L[D]=0)}function x(y,L,D,z,O,T,W){W===!0?r.vertexAttribIPointer(y,L,D,O,T):r.vertexAttribPointer(y,L,D,z,O,T)}function v(y,L,D,z){g();const O=z.attributes,T=D.getAttributes(),W=L.defaultAttributeValues;for(const Z in T){const q=T[Z];if(q.location>=0){let pe=O[Z];if(pe===void 0&&(Z==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),Z==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),pe!==void 0){const N=pe.normalized,Y=pe.itemSize,je=e.get(pe);if(je===void 0)continue;const tt=je.buffer,te=je.type,le=je.bytesPerElement,Le=te===r.INT||te===r.UNSIGNED_INT||pe.gpuType===Vf;if(pe.isInterleavedBufferAttribute){const ge=pe.data,Ee=ge.stride,Qe=pe.offset;if(ge.isInstancedInterleavedBuffer){for(let xe=0;xe<q.locationSize;xe++)p(q.location+xe,ge.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let xe=0;xe<q.locationSize;xe++)m(q.location+xe);r.bindBuffer(r.ARRAY_BUFFER,tt);for(let xe=0;xe<q.locationSize;xe++)x(q.location+xe,Y/q.locationSize,te,N,Ee*le,(Qe+Y/q.locationSize*xe)*le,Le)}else{if(pe.isInstancedBufferAttribute){for(let ge=0;ge<q.locationSize;ge++)p(q.location+ge,pe.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ge=0;ge<q.locationSize;ge++)m(q.location+ge);r.bindBuffer(r.ARRAY_BUFFER,tt);for(let ge=0;ge<q.locationSize;ge++)x(q.location+ge,Y/q.locationSize,te,N,Y*le,Y/q.locationSize*ge*le,Le)}}else if(W!==void 0){const N=W[Z];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(q.location,N);break;case 3:r.vertexAttrib3fv(q.location,N);break;case 4:r.vertexAttrib4fv(q.location,N);break;default:r.vertexAttrib1fv(q.location,N)}}}}b()}function M(){P();for(const y in n){const L=n[y];for(const D in L){const z=L[D];for(const O in z)u(z[O].object),delete z[O];delete L[D]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const D in L){const z=L[D];for(const O in z)u(z[O].object),delete z[O];delete L[D]}delete n[y.id]}function E(y){for(const L in n){const D=n[L];if(D[y.id]===void 0)continue;const z=D[y.id];for(const O in z)u(z[O].object),delete z[O];delete D[y.id]}}function P(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function zb(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Hb(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==vi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===ml&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Qi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Ii&&!P)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:M,maxSamples:C}}function Vb(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new _s,a=new ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,x=b*4;let v=p.clippingState||null;l.value=v,v=u(_,f,x,h);for(let M=0;M!==x;++M)v[M]=t[M];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=h;x!==g;++x,v+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Gb(r){let e=new WeakMap;function t(o,a){return a===xd?o.mapping=Uo:a===Sd&&(o.mapping=Fo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===xd||a===Sd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new dx(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const vo=4,Bp=[.125,.215,.35,.446,.526,.582],bs=20,Fu=new Qc,zp=new Je;let ku=null,Bu=0,zu=0,Hu=!1;const vs=(1+Math.sqrt(5))/2,oo=1/vs,Hp=[new G(-vs,oo,0),new G(vs,oo,0),new G(-oo,0,vs),new G(oo,0,vs),new G(0,vs,-oo),new G(0,vs,oo),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],Wb=new G;class Vp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Wb}=s;ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Bu,zu),this._renderer.xr.enabled=Hu,e.scissorTest=!1,Xl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Uo||e.mapping===Fo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Bu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ai,minFilter:ai,generateMipmaps:!1,type:ml,format:vi,colorSpace:Gn,depthBuffer:!1},i=Gp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xb(s)),this._blurMaterial=qb(s,e,t)}return i}_compileMaterial(e){const t=new Hn(this._lodPlanes[0],e);this._renderer.compile(t,Fu)}_sceneToCubeUV(e,t,n,i,s){const l=new qn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(zp),d.toneMapping=jr,d.autoClear=!1;const _=new Ms({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1}),g=new Hn(new gl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(zp),m=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[b],s.y,s.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[b]));const v=this._cubeSize;Xl(i,x*v,b>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Uo||e.mapping===Fo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Hn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Xl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Fu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Hp[(i-s-1)%Hp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Hn(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*bs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):bs;m>bs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bs}`);const p=[];let b=0;for(let E=0;E<bs;++E){const P=E/g,w=Math.exp(-P*P/2);p.push(w),E===0?b+=w:E<m&&(b+=2*w)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const v=this._sizeLods[i],M=3*v*(i>x-vo?i-x+vo:0),C=4*(this._cubeSize-v);Xl(t,M,C,3*v,2*v),l.setRenderTarget(t),l.render(d,Fu)}}function Xb(r){const e=[],t=[],n=[];let i=r;const s=r-vo+1+Bp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-vo?l=Bp[o-r+vo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*h),x=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let C=0;C<h;C++){const E=C%3*2/3-1,P=C>2?0:-1,w=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];b.set(w,g*_*C),x.set(f,m*_*C);const y=[C,C,C,C,C,C];v.set(y,p*_*C)}const M=new bi;M.setAttribute("position",new Nt(b,g)),M.setAttribute("uv",new Nt(x,m)),M.setAttribute("faceIndex",new Nt(v,p)),e.push(M),i>vo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gp(r,e,t){const n=new ks(r,e,t);return n.texture.mapping=Kc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function qb(r,e,t){const n=new Float32Array(bs),i=new G(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sh(),fragmentShader:`

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
		`,blending:qr,depthTest:!1,depthWrite:!1})}function Wp(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sh(),fragmentShader:`

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
		`,blending:qr,depthTest:!1,depthWrite:!1})}function Xp(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qr,depthTest:!1,depthWrite:!1})}function sh(){return`

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
	`}function Yb(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===xd||l===Sd,u=l===Uo||l===Fo;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new Vp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function jb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Mo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $b(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const b=h.array;g=h.version;for(let x=0,v=b.length;x<v;x+=3){const M=b[x+0],C=b[x+1],E=b[x+2];f.push(M,C,C,E,E,M)}}else if(_!==void 0){const b=_.array;g=_.version;for(let x=0,v=b.length/3-1;x<v;x+=3){const M=x+0,C=x+1,E=x+2;f.push(M,C,C,E,E,M)}}else return;const m=new(Yg(f)?Jg:Zg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Kb(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*g[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Zb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Jb(r,e,t){const n=new WeakMap,i=new Ct;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let M=a.attributes.position.count*v,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const E=new Float32Array(M*C*4*d),P=new jg(E,M,C,d);P.type=Ii,P.needsUpdate=!0;const w=v*4;for(let L=0;L<d;L++){const D=p[L],z=b[L],O=x[L],T=M*C*4*L;for(let W=0;W<D.count;W++){const Z=W*w;_===!0&&(i.fromBufferAttribute(D,W),E[T+Z+0]=i.x,E[T+Z+1]=i.y,E[T+Z+2]=i.z,E[T+Z+3]=0),g===!0&&(i.fromBufferAttribute(z,W),E[T+Z+4]=i.x,E[T+Z+5]=i.y,E[T+Z+6]=i.z,E[T+Z+7]=0),m===!0&&(i.fromBufferAttribute(O,W),E[T+Z+8]=i.x,E[T+Z+9]=i.y,E[T+Z+10]=i.z,E[T+Z+11]=O.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new St(M,C)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Qb(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const f_=new dn,qp=new o_(1,1),h_=new jg,p_=new jy,m_=new t_,Yp=[],jp=[],$p=new Float32Array(16),Kp=new Float32Array(9),Zp=new Float32Array(4);function ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Yp[i];if(s===void 0&&(s=new Float32Array(i),Yp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function fn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function hn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eu(r,e){let t=jp[e];t===void 0&&(t=new Int32Array(e),jp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function eM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function tM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2fv(this.addr,e),hn(t,e)}}function nM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(fn(t,e))return;r.uniform3fv(this.addr,e),hn(t,e)}}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4fv(this.addr,e),hn(t,e)}}function rM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;Zp.set(n),r.uniformMatrix2fv(this.addr,!1,Zp),hn(t,n)}}function sM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;Kp.set(n),r.uniformMatrix3fv(this.addr,!1,Kp),hn(t,n)}}function oM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;$p.set(n),r.uniformMatrix4fv(this.addr,!1,$p),hn(t,n)}}function aM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function lM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2iv(this.addr,e),hn(t,e)}}function cM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;r.uniform3iv(this.addr,e),hn(t,e)}}function uM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4iv(this.addr,e),hn(t,e)}}function dM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function fM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2uiv(this.addr,e),hn(t,e)}}function hM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;r.uniform3uiv(this.addr,e),hn(t,e)}}function pM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4uiv(this.addr,e),hn(t,e)}}function mM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(qp.compareFunction=qg,s=qp):s=f_,t.setTexture2D(e||s,i)}function gM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||p_,i)}function _M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||m_,i)}function vM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||h_,i)}function yM(r){switch(r){case 5126:return eM;case 35664:return tM;case 35665:return nM;case 35666:return iM;case 35674:return rM;case 35675:return sM;case 35676:return oM;case 5124:case 35670:return aM;case 35667:case 35671:return lM;case 35668:case 35672:return cM;case 35669:case 35673:return uM;case 5125:return dM;case 36294:return fM;case 36295:return hM;case 36296:return pM;case 35678:case 36198:case 36298:case 36306:case 35682:return mM;case 35679:case 36299:case 36307:return gM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return vM}}function xM(r,e){r.uniform1fv(this.addr,e)}function SM(r,e){const t=ta(e,this.size,2);r.uniform2fv(this.addr,t)}function wM(r,e){const t=ta(e,this.size,3);r.uniform3fv(this.addr,t)}function bM(r,e){const t=ta(e,this.size,4);r.uniform4fv(this.addr,t)}function MM(r,e){const t=ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function EM(r,e){const t=ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function TM(r,e){const t=ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function AM(r,e){r.uniform1iv(this.addr,e)}function CM(r,e){r.uniform2iv(this.addr,e)}function RM(r,e){r.uniform3iv(this.addr,e)}function PM(r,e){r.uniform4iv(this.addr,e)}function LM(r,e){r.uniform1uiv(this.addr,e)}function DM(r,e){r.uniform2uiv(this.addr,e)}function IM(r,e){r.uniform3uiv(this.addr,e)}function OM(r,e){r.uniform4uiv(this.addr,e)}function NM(r,e,t){const n=this.cache,i=e.length,s=eu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||f_,s[o])}function UM(r,e,t){const n=this.cache,i=e.length,s=eu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||p_,s[o])}function FM(r,e,t){const n=this.cache,i=e.length,s=eu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||m_,s[o])}function kM(r,e,t){const n=this.cache,i=e.length,s=eu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||h_,s[o])}function BM(r){switch(r){case 5126:return xM;case 35664:return SM;case 35665:return wM;case 35666:return bM;case 35674:return MM;case 35675:return EM;case 35676:return TM;case 5124:case 35670:return AM;case 35667:case 35671:return CM;case 35668:case 35672:return RM;case 35669:case 35673:return PM;case 5125:return LM;case 36294:return DM;case 36295:return IM;case 36296:return OM;case 35678:case 36198:case 36298:case 36306:case 35682:return NM;case 35679:case 36299:case 36307:return UM;case 35680:case 36300:case 36308:case 36293:return FM;case 36289:case 36303:case 36311:case 36292:return kM}}class zM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=yM(t.type)}}class HM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=BM(t.type)}}class VM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Vu=/(\w+)(\])?(\[|\.)?/g;function Jp(r,e){r.seq.push(e),r.map[e.id]=e}function GM(r,e,t){const n=r.name,i=n.length;for(Vu.lastIndex=0;;){const s=Vu.exec(n),o=Vu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Jp(t,c===void 0?new zM(a,r,e):new HM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new VM(a),Jp(t,d)),t=d}}}class _c{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);GM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Qp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const WM=37297;let XM=0;function qM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const em=new ft;function YM(r){Et._getMatrix(em,Et.workingColorSpace,r);const e=`mat3( ${em.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(r)){case Rc:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function tm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+qM(r.getShaderSource(e),o)}else return i}function jM(r,e){const t=YM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $M(r,e){let t;switch(e){case ny:t="Linear";break;case iy:t="Reinhard";break;case ry:t="Cineon";break;case sy:t="ACESFilmic";break;case ay:t="AgX";break;case ly:t="Neutral";break;case oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ql=new G;function KM(){Et.getLuminanceCoefficients(ql);const r=ql.x.toFixed(4),e=ql.y.toFixed(4),t=ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ZM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function JM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function QM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function xa(r){return r!==""}function nm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function im(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace(eE,nE)}const tE=new Map;function nE(r,e){let t=pt[e];if(t===void 0){const n=tE.get(e);if(n!==void 0)t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qd(t)}const iE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rm(r){return r.replace(iE,rE)}function rE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function sm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function sE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ig?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Nv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===dr&&(e="SHADOWMAP_TYPE_VSM"),e}function oE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Uo:case Fo:e="ENVMAP_TYPE_CUBE";break;case Kc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Fo:e="ENVMAP_MODE_REFRACTION";break}return e}function lE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Og:e="ENVMAP_BLENDING_MULTIPLY";break;case ey:e="ENVMAP_BLENDING_MIX";break;case ty:e="ENVMAP_BLENDING_ADD";break}return e}function cE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function uE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=sE(t),c=oE(t),u=aE(t),d=lE(t),f=cE(t),h=ZM(t),_=JM(s),g=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jr?"#define TONE_MAPPING":"",t.toneMapping!==jr?pt.tonemapping_pars_fragment:"",t.toneMapping!==jr?$M("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,jM("linearToOutputTexel",t.outputColorSpace),KM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),o=Qd(o),o=nm(o,t),o=im(o,t),a=Qd(a),a=nm(a,t),a=im(a,t),o=rm(o),a=rm(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ep?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ep?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,v=b+p+a,M=Qp(i,i.VERTEX_SHADER,x),C=Qp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,M),i.attachShader(g,C),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(L){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(g).trim(),z=i.getShaderInfoLog(M).trim(),O=i.getShaderInfoLog(C).trim();let T=!0,W=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(T=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,M,C);else{const Z=tm(i,M,"vertex"),q=tm(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+Z+`
`+q)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(z===""||O==="")&&(W=!1);W&&(L.diagnostics={runnable:T,programLog:D,vertexShader:{log:z,prefix:m},fragmentShader:{log:O,prefix:p}})}i.deleteShader(M),i.deleteShader(C),P=new _c(i,g),w=QM(i,g)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(g,WM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=XM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=C,this}let dE=0;class fE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new hE(e),t.set(e,n)),n}}class hE{constructor(e){this.id=dE++,this.code=e,this.usedTimes=0}}function pE(r,e,t,n,i,s,o){const a=new $g,l=new fE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,L,D,z){const O=D.fog,T=z.geometry,W=w.isMeshStandardMaterial?D.environment:null,Z=(w.isMeshStandardMaterial?t:e).get(w.envMap||W),q=Z&&Z.mapping===Kc?Z.image.height:null,pe=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const N=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,Y=N!==void 0?N.length:0;let je=0;T.morphAttributes.position!==void 0&&(je=1),T.morphAttributes.normal!==void 0&&(je=2),T.morphAttributes.color!==void 0&&(je=3);let tt,te,le,Le;if(pe){const De=Xi[pe];tt=De.vertexShader,te=De.fragmentShader}else tt=w.vertexShader,te=w.fragmentShader,l.update(w),le=l.getVertexShaderID(w),Le=l.getFragmentShaderID(w);const ge=r.getRenderTarget(),Ee=r.state.buffers.depth.getReversed(),Qe=z.isInstancedMesh===!0,xe=z.isBatchedMesh===!0,lt=!!w.map,ct=!!w.matcap,Be=!!Z,F=!!w.aoMap,at=!!w.lightMap,rt=!!w.bumpMap,j=!!w.normalMap,Ue=!!w.displacementMap,st=!!w.emissiveMap,He=!!w.metalnessMap,Fe=!!w.roughnessMap,Tt=w.anisotropy>0,I=w.clearcoat>0,A=w.dispersion>0,X=w.iridescence>0,ne=w.sheen>0,ie=w.transmission>0,Q=Tt&&!!w.anisotropyMap,ve=I&&!!w.clearcoatMap,_e=I&&!!w.clearcoatNormalMap,Ve=I&&!!w.clearcoatRoughnessMap,re=X&&!!w.iridescenceMap,ae=X&&!!w.iridescenceThicknessMap,Se=ne&&!!w.sheenColorMap,be=ne&&!!w.sheenRoughnessMap,$e=!!w.specularMap,ye=!!w.specularColorMap,we=!!w.specularIntensityMap,U=ie&&!!w.transmissionMap,me=ie&&!!w.thicknessMap,ce=!!w.gradientMap,Te=!!w.alphaMap,de=w.alphaTest>0,oe=!!w.alphaHash,ze=!!w.extensions;let Ge=jr;w.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Ge=r.toneMapping);const wt={shaderID:pe,shaderType:w.type,shaderName:w.name,vertexShader:tt,fragmentShader:te,defines:w.defines,customVertexShaderID:le,customFragmentShaderID:Le,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:xe,batchingColor:xe&&z._colorsTexture!==null,instancing:Qe,instancingColor:Qe&&z.instanceColor!==null,instancingMorph:Qe&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ge===null?r.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Gn,alphaToCoverage:!!w.alphaToCoverage,map:lt,matcap:ct,envMap:Be,envMapMode:Be&&Z.mapping,envMapCubeUVHeight:q,aoMap:F,lightMap:at,bumpMap:rt,normalMap:j,displacementMap:f&&Ue,emissiveMap:st,normalMapObjectSpace:j&&w.normalMapType===py,normalMapTangentSpace:j&&w.normalMapType===Xg,metalnessMap:He,roughnessMap:Fe,anisotropy:Tt,anisotropyMap:Q,clearcoat:I,clearcoatMap:ve,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ve,dispersion:A,iridescence:X,iridescenceMap:re,iridescenceThicknessMap:ae,sheen:ne,sheenColorMap:Se,sheenRoughnessMap:be,specularMap:$e,specularColorMap:ye,specularIntensityMap:we,transmission:ie,transmissionMap:U,thicknessMap:me,gradientMap:ce,opaque:w.transparent===!1&&w.blending===Yr&&w.alphaToCoverage===!1,alphaMap:Te,alphaTest:de,alphaHash:oe,combine:w.combine,mapUv:lt&&g(w.map.channel),aoMapUv:F&&g(w.aoMap.channel),lightMapUv:at&&g(w.lightMap.channel),bumpMapUv:rt&&g(w.bumpMap.channel),normalMapUv:j&&g(w.normalMap.channel),displacementMapUv:Ue&&g(w.displacementMap.channel),emissiveMapUv:st&&g(w.emissiveMap.channel),metalnessMapUv:He&&g(w.metalnessMap.channel),roughnessMapUv:Fe&&g(w.roughnessMap.channel),anisotropyMapUv:Q&&g(w.anisotropyMap.channel),clearcoatMapUv:ve&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:_e&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(w.sheenRoughnessMap.channel),specularMapUv:$e&&g(w.specularMap.channel),specularColorMapUv:ye&&g(w.specularColorMap.channel),specularIntensityMapUv:we&&g(w.specularIntensityMap.channel),transmissionMapUv:U&&g(w.transmissionMap.channel),thicknessMapUv:me&&g(w.thicknessMap.channel),alphaMapUv:Te&&g(w.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(j||Tt),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!T.attributes.uv&&(lt||Te),fog:!!O,useFog:w.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ee,skinning:z.isSkinnedMesh===!0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:je,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ge,decodeVideoTexture:lt&&w.map.isVideoTexture===!0&&Et.getTransfer(w.map.colorSpace)===Ft,decodeVideoTextureEmissive:st&&w.emissiveMap.isVideoTexture===!0&&Et.getTransfer(w.emissiveMap.colorSpace)===Ft,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===_i,flipSided:w.side===Yn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ze&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&w.extensions.multiDraw===!0||xe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)y.push(L),y.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(b(y,w),x(y,w),y.push(r.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function x(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=_[w.type];let L;if(y){const D=Xi[y];L=ax.clone(D.uniforms)}else L=w.uniforms;return L}function M(w,y){let L;for(let D=0,z=u.length;D<z;D++){const O=u[D];if(O.cacheKey===y){L=O,++L.usedTimes;break}}return L===void 0&&(L=new uE(r,y,w,s),u.push(L)),L}function C(w){if(--w.usedTimes===0){const y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function E(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:M,releaseProgram:C,releaseShaderCache:E,programs:u,dispose:P}}function mE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function gE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function om(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function am(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||gE),n.length>1&&n.sort(f||om),i.length>1&&i.sort(f||om)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function _E(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new am,r.set(n,[o])):i>=s.length?(o=new am,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function vE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Je};break;case"SpotLight":t={position:new G,direction:new G,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function yE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let xE=0;function SE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function wE(r){const e=new vE,t=yE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const i=new G,s=new ht,o=new ht;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,b=0,x=0,v=0,M=0,C=0,E=0;c.sort(SE);for(let w=0,y=c.length;w<y;w++){const L=c[w],D=L.color,z=L.intensity,O=L.distance,T=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=D.r*z,d+=D.g*z,f+=D.b*z;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],z);E++}else if(L.isDirectionalLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,q=t.get(L);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.directionalShadow[h]=q,n.directionalShadowMap[h]=T,n.directionalShadowMatrix[h]=L.shadow.matrix,b++}n.directional[h]=W,h++}else if(L.isSpotLight){const W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(D).multiplyScalar(z),W.distance=O,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[g]=W;const Z=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,Z.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[g]=Z.matrix,L.castShadow){const q=t.get(L);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.spotShadow[g]=q,n.spotShadowMap[g]=T,v++}g++}else if(L.isRectAreaLight){const W=e.get(L);W.color.copy(D).multiplyScalar(z),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=W,m++}else if(L.isPointLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const Z=L.shadow,q=t.get(L);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,q.shadowCameraNear=Z.camera.near,q.shadowCameraFar=Z.camera.far,n.pointShadow[_]=q,n.pointShadowMap[_]=T,n.pointShadowMatrix[_]=L.shadow.matrix,x++}n.point[_]=W,_++}else if(L.isHemisphereLight){const W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(z),W.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==x||P.numSpotShadows!==v||P.numSpotMaps!==M||P.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=x,P.numSpotShadows=v,P.numSpotMaps=M,P.numLightProbes=E,n.version=xE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function lm(r){const e=new wE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function bE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new lm(r),e.set(i,[a])):s>=o.length?(a=new lm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const ME=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,EE=`uniform sampler2D shadow_pass;
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
}`;function TE(r,e,t){let n=new Qf;const i=new St,s=new St,o=new Ct,a=new bx({depthPacking:hy}),l=new Mx,c={},u=t.maxTextureSize,d={[Mr]:Yn,[Yn]:Mr,[_i]:_i},f=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:ME,fragmentShader:EE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new bi;_.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Hn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ig;let p=this.type;this.render=function(C,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const w=r.getRenderTarget(),y=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),D=r.state;D.setBlending(qr),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const z=p!==dr&&this.type===dr,O=p===dr&&this.type!==dr;for(let T=0,W=C.length;T<W;T++){const Z=C[T],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const pe=q.getFrameExtents();if(i.multiply(pe),s.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/pe.x),i.x=s.x*pe.x,q.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/pe.y),i.y=s.y*pe.y,q.mapSize.y=s.y)),q.map===null||z===!0||O===!0){const Y=this.type!==dr?{minFilter:Vn,magFilter:Vn}:{};q.map!==null&&q.map.dispose(),q.map=new ks(i.x,i.y,Y),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const N=q.getViewportCount();for(let Y=0;Y<N;Y++){const je=q.getViewport(Y);o.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),D.viewport(o),q.updateMatrices(Z,Y),n=q.getFrustum(),v(E,P,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===dr&&b(q,P),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,y,L)};function b(C,E){const P=e.update(g);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ks(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(E,null,P,f,g,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(E,null,P,h,g,null)}function x(C,E,P,w){let y=null;const L=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)y=L;else if(y=P.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const D=y.uuid,z=E.uuid;let O=c[D];O===void 0&&(O={},c[D]=O);let T=O[z];T===void 0&&(T=y.clone(),O[z]=T,E.addEventListener("dispose",M)),y=T}if(y.visible=E.visible,y.wireframe=E.wireframe,w===dr?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=r.properties.get(y);D.light=P}return y}function v(C,E,P,w,y){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===dr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const z=e.update(C),O=C.material;if(Array.isArray(O)){const T=z.groups;for(let W=0,Z=T.length;W<Z;W++){const q=T[W],pe=O[q.materialIndex];if(pe&&pe.visible){const N=x(C,pe,w,y);C.onBeforeShadow(r,C,E,P,z,N,q),r.renderBufferDirect(P,null,z,N,C,q),C.onAfterShadow(r,C,E,P,z,N,q)}}}else if(O.visible){const T=x(C,O,w,y);C.onBeforeShadow(r,C,E,P,z,T,null),r.renderBufferDirect(P,null,z,T,C,null),C.onAfterShadow(r,C,E,P,z,T,null)}}const D=C.children;for(let z=0,O=D.length;z<O;z++)v(D[z],E,P,w,y)}function M(C){C.target.removeEventListener("dispose",M);for(const P in c){const w=c[P],y=C.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const AE={[hd]:pd,[md]:vd,[gd]:yd,[No]:_d,[pd]:hd,[vd]:md,[yd]:gd,[_d]:No};function CE(r,e){function t(){let U=!1;const me=new Ct;let ce=null;const Te=new Ct(0,0,0,0);return{setMask:function(de){ce!==de&&!U&&(r.colorMask(de,de,de,de),ce=de)},setLocked:function(de){U=de},setClear:function(de,oe,ze,Ge,wt){wt===!0&&(de*=Ge,oe*=Ge,ze*=Ge),me.set(de,oe,ze,Ge),Te.equals(me)===!1&&(r.clearColor(de,oe,ze,Ge),Te.copy(me))},reset:function(){U=!1,ce=null,Te.set(-1,0,0,0)}}}function n(){let U=!1,me=!1,ce=null,Te=null,de=null;return{setReversed:function(oe){if(me!==oe){const ze=e.get("EXT_clip_control");oe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),me=oe;const Ge=de;de=null,this.setClear(Ge)}},getReversed:function(){return me},setTest:function(oe){oe?ge(r.DEPTH_TEST):Ee(r.DEPTH_TEST)},setMask:function(oe){ce!==oe&&!U&&(r.depthMask(oe),ce=oe)},setFunc:function(oe){if(me&&(oe=AE[oe]),Te!==oe){switch(oe){case hd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case No:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case yd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Te=oe}},setLocked:function(oe){U=oe},setClear:function(oe){de!==oe&&(me&&(oe=1-oe),r.clearDepth(oe),de=oe)},reset:function(){U=!1,ce=null,Te=null,de=null,me=!1}}}function i(){let U=!1,me=null,ce=null,Te=null,de=null,oe=null,ze=null,Ge=null,wt=null;return{setTest:function(De){U||(De?ge(r.STENCIL_TEST):Ee(r.STENCIL_TEST))},setMask:function(De){me!==De&&!U&&(r.stencilMask(De),me=De)},setFunc:function(De,Ae,nt){(ce!==De||Te!==Ae||de!==nt)&&(r.stencilFunc(De,Ae,nt),ce=De,Te=Ae,de=nt)},setOp:function(De,Ae,nt){(oe!==De||ze!==Ae||Ge!==nt)&&(r.stencilOp(De,Ae,nt),oe=De,ze=Ae,Ge=nt)},setLocked:function(De){U=De},setClear:function(De){wt!==De&&(r.clearStencil(De),wt=De)},reset:function(){U=!1,me=null,ce=null,Te=null,de=null,oe=null,ze=null,Ge=null,wt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,M=null,C=null,E=new Je(0,0,0),P=0,w=!1,y=null,L=null,D=null,z=null,O=null;const T=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Z=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=Z>=2);let pe=null,N={};const Y=r.getParameter(r.SCISSOR_BOX),je=r.getParameter(r.VIEWPORT),tt=new Ct().fromArray(Y),te=new Ct().fromArray(je);function le(U,me,ce,Te){const de=new Uint8Array(4),oe=r.createTexture();r.bindTexture(U,oe),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ze=0;ze<ce;ze++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Te,0,r.RGBA,r.UNSIGNED_BYTE,de):r.texImage2D(me+ze,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,de);return oe}const Le={};Le[r.TEXTURE_2D]=le(r.TEXTURE_2D,r.TEXTURE_2D,1),Le[r.TEXTURE_CUBE_MAP]=le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[r.TEXTURE_2D_ARRAY]=le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Le[r.TEXTURE_3D]=le(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ge(r.DEPTH_TEST),o.setFunc(No),rt(!1),j(qh),ge(r.CULL_FACE),F(qr);function ge(U){u[U]!==!0&&(r.enable(U),u[U]=!0)}function Ee(U){u[U]!==!1&&(r.disable(U),u[U]=!1)}function Qe(U,me){return d[U]!==me?(r.bindFramebuffer(U,me),d[U]=me,U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=me),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=me),!0):!1}function xe(U,me){let ce=h,Te=!1;if(U){ce=f.get(me),ce===void 0&&(ce=[],f.set(me,ce));const de=U.textures;if(ce.length!==de.length||ce[0]!==r.COLOR_ATTACHMENT0){for(let oe=0,ze=de.length;oe<ze;oe++)ce[oe]=r.COLOR_ATTACHMENT0+oe;ce.length=de.length,Te=!0}}else ce[0]!==r.BACK&&(ce[0]=r.BACK,Te=!0);Te&&r.drawBuffers(ce)}function lt(U){return _!==U?(r.useProgram(U),_=U,!0):!1}const ct={[ws]:r.FUNC_ADD,[Fv]:r.FUNC_SUBTRACT,[kv]:r.FUNC_REVERSE_SUBTRACT};ct[Bv]=r.MIN,ct[zv]=r.MAX;const Be={[Hv]:r.ZERO,[Vv]:r.ONE,[Gv]:r.SRC_COLOR,[dd]:r.SRC_ALPHA,[$v]:r.SRC_ALPHA_SATURATE,[Yv]:r.DST_COLOR,[Xv]:r.DST_ALPHA,[Wv]:r.ONE_MINUS_SRC_COLOR,[fd]:r.ONE_MINUS_SRC_ALPHA,[jv]:r.ONE_MINUS_DST_COLOR,[qv]:r.ONE_MINUS_DST_ALPHA,[Kv]:r.CONSTANT_COLOR,[Zv]:r.ONE_MINUS_CONSTANT_COLOR,[Jv]:r.CONSTANT_ALPHA,[Qv]:r.ONE_MINUS_CONSTANT_ALPHA};function F(U,me,ce,Te,de,oe,ze,Ge,wt,De){if(U===qr){g===!0&&(Ee(r.BLEND),g=!1);return}if(g===!1&&(ge(r.BLEND),g=!0),U!==Uv){if(U!==m||De!==w){if((p!==ws||v!==ws)&&(r.blendEquation(r.FUNC_ADD),p=ws,v=ws),De)switch(U){case Yr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.ONE,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Yr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Yh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,x=null,M=null,C=null,E.set(0,0,0),P=0,m=U,w=De}return}de=de||me,oe=oe||ce,ze=ze||Te,(me!==p||de!==v)&&(r.blendEquationSeparate(ct[me],ct[de]),p=me,v=de),(ce!==b||Te!==x||oe!==M||ze!==C)&&(r.blendFuncSeparate(Be[ce],Be[Te],Be[oe],Be[ze]),b=ce,x=Te,M=oe,C=ze),(Ge.equals(E)===!1||wt!==P)&&(r.blendColor(Ge.r,Ge.g,Ge.b,wt),E.copy(Ge),P=wt),m=U,w=!1}function at(U,me){U.side===_i?Ee(r.CULL_FACE):ge(r.CULL_FACE);let ce=U.side===Yn;me&&(ce=!ce),rt(ce),U.blending===Yr&&U.transparent===!1?F(qr):F(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Te=U.stencilWrite;a.setTest(Te),Te&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),st(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ge(r.SAMPLE_ALPHA_TO_COVERAGE):Ee(r.SAMPLE_ALPHA_TO_COVERAGE)}function rt(U){y!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),y=U)}function j(U){U!==Iv?(ge(r.CULL_FACE),U!==L&&(U===qh?r.cullFace(r.BACK):U===Ov?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ee(r.CULL_FACE),L=U}function Ue(U){U!==D&&(W&&r.lineWidth(U),D=U)}function st(U,me,ce){U?(ge(r.POLYGON_OFFSET_FILL),(z!==me||O!==ce)&&(r.polygonOffset(me,ce),z=me,O=ce)):Ee(r.POLYGON_OFFSET_FILL)}function He(U){U?ge(r.SCISSOR_TEST):Ee(r.SCISSOR_TEST)}function Fe(U){U===void 0&&(U=r.TEXTURE0+T-1),pe!==U&&(r.activeTexture(U),pe=U)}function Tt(U,me,ce){ce===void 0&&(pe===null?ce=r.TEXTURE0+T-1:ce=pe);let Te=N[ce];Te===void 0&&(Te={type:void 0,texture:void 0},N[ce]=Te),(Te.type!==U||Te.texture!==me)&&(pe!==ce&&(r.activeTexture(ce),pe=ce),r.bindTexture(U,me||Le[U]),Te.type=U,Te.texture=me)}function I(){const U=N[pe];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{r.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{r.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{r.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{r.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{r.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ve(){try{r.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{r.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{r.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(U){tt.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),tt.copy(U))}function be(U){te.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),te.copy(U))}function $e(U,me){let ce=c.get(me);ce===void 0&&(ce=new WeakMap,c.set(me,ce));let Te=ce.get(U);Te===void 0&&(Te=r.getUniformBlockIndex(me,U.name),ce.set(U,Te))}function ye(U,me){const Te=c.get(me).get(U);l.get(me)!==Te&&(r.uniformBlockBinding(me,Te,U.__bindingPointIndex),l.set(me,Te))}function we(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},pe=null,N={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,M=null,C=null,E=new Je(0,0,0),P=0,w=!1,y=null,L=null,D=null,z=null,O=null,tt.set(0,0,r.canvas.width,r.canvas.height),te.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ge,disable:Ee,bindFramebuffer:Qe,drawBuffers:xe,useProgram:lt,setBlending:F,setMaterial:at,setFlipSided:rt,setCullFace:j,setLineWidth:Ue,setPolygonOffset:st,setScissorTest:He,activeTexture:Fe,bindTexture:Tt,unbindTexture:I,compressedTexImage2D:A,compressedTexImage3D:X,texImage2D:re,texImage3D:ae,updateUBOMapping:$e,uniformBlockBinding:ye,texStorage2D:_e,texStorage3D:Ve,texSubImage2D:ne,texSubImage3D:ie,compressedTexSubImage2D:Q,compressedTexSubImage3D:ve,scissor:Se,viewport:be,reset:we}}function RE(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,A){return h?new OffscreenCanvas(I,A):il("canvas")}function g(I,A,X){let ne=1;const ie=Tt(I);if((ie.width>X||ie.height>X)&&(ne=X/Math.max(ie.width,ie.height)),ne<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Q=Math.floor(ne*ie.width),ve=Math.floor(ne*ie.height);d===void 0&&(d=_(Q,ve));const _e=A?_(Q,ve):d;return _e.width=Q,_e.height=ve,_e.getContext("2d").drawImage(I,0,0,Q,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Q+"x"+ve+")."),_e}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(I,A,X,ne,ie=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Q=A;if(A===r.RED&&(X===r.FLOAT&&(Q=r.R32F),X===r.HALF_FLOAT&&(Q=r.R16F),X===r.UNSIGNED_BYTE&&(Q=r.R8)),A===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.R8UI),X===r.UNSIGNED_SHORT&&(Q=r.R16UI),X===r.UNSIGNED_INT&&(Q=r.R32UI),X===r.BYTE&&(Q=r.R8I),X===r.SHORT&&(Q=r.R16I),X===r.INT&&(Q=r.R32I)),A===r.RG&&(X===r.FLOAT&&(Q=r.RG32F),X===r.HALF_FLOAT&&(Q=r.RG16F),X===r.UNSIGNED_BYTE&&(Q=r.RG8)),A===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RG8UI),X===r.UNSIGNED_SHORT&&(Q=r.RG16UI),X===r.UNSIGNED_INT&&(Q=r.RG32UI),X===r.BYTE&&(Q=r.RG8I),X===r.SHORT&&(Q=r.RG16I),X===r.INT&&(Q=r.RG32I)),A===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),X===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),X===r.UNSIGNED_INT&&(Q=r.RGB32UI),X===r.BYTE&&(Q=r.RGB8I),X===r.SHORT&&(Q=r.RGB16I),X===r.INT&&(Q=r.RGB32I)),A===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),X===r.UNSIGNED_INT&&(Q=r.RGBA32UI),X===r.BYTE&&(Q=r.RGBA8I),X===r.SHORT&&(Q=r.RGBA16I),X===r.INT&&(Q=r.RGBA32I)),A===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),A===r.RGBA){const ve=ie?Rc:Et.getTransfer(ne);X===r.FLOAT&&(Q=r.RGBA32F),X===r.HALF_FLOAT&&(Q=r.RGBA16F),X===r.UNSIGNED_BYTE&&(Q=ve===Ft?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(I,A){let X;return I?A===null||A===Fs||A===Ja?X=r.DEPTH24_STENCIL8:A===Ii?X=r.DEPTH32F_STENCIL8:A===Za&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Fs||A===Ja?X=r.DEPTH_COMPONENT24:A===Ii?X=r.DEPTH_COMPONENT32F:A===Za&&(X=r.DEPTH_COMPONENT16),X}function M(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vn&&I.minFilter!==ai?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function C(I){const A=I.target;A.removeEventListener("dispose",C),P(A),A.isVideoTexture&&u.delete(A)}function E(I){const A=I.target;A.removeEventListener("dispose",E),y(A)}function P(I){const A=n.get(I);if(A.__webglInit===void 0)return;const X=I.source,ne=f.get(X);if(ne){const ie=ne[A.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(I),Object.keys(ne).length===0&&f.delete(X)}n.remove(I)}function w(I){const A=n.get(I);r.deleteTexture(A.__webglTexture);const X=I.source,ne=f.get(X);delete ne[A.__cacheKey],o.memory.textures--}function y(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(A.__webglFramebuffer[ne]))for(let ie=0;ie<A.__webglFramebuffer[ne].length;ie++)r.deleteFramebuffer(A.__webglFramebuffer[ne][ie]);else r.deleteFramebuffer(A.__webglFramebuffer[ne]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[ne])}else{if(Array.isArray(A.__webglFramebuffer))for(let ne=0;ne<A.__webglFramebuffer.length;ne++)r.deleteFramebuffer(A.__webglFramebuffer[ne]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ne=0;ne<A.__webglColorRenderbuffer.length;ne++)A.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[ne]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const X=I.textures;for(let ne=0,ie=X.length;ne<ie;ne++){const Q=n.get(X[ne]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(X[ne])}n.remove(I)}let L=0;function D(){L=0}function z(){const I=L;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),L+=1,I}function O(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function T(I,A){const X=n.get(I);if(I.isVideoTexture&&He(I),I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){const ne=I.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(X,I,A);return}}t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+A)}function W(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){Le(X,I,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+A)}function Z(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){Le(X,I,A);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+A)}function q(I,A){const X=n.get(I);if(I.version>0&&X.__version!==I.version){ge(X,I,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+A)}const pe={[ko]:r.REPEAT,[kr]:r.CLAMP_TO_EDGE,[Cc]:r.MIRRORED_REPEAT},N={[Vn]:r.NEAREST,[Ug]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[ai]:r.LINEAR,[dc]:r.LINEAR_MIPMAP_NEAREST,[gr]:r.LINEAR_MIPMAP_LINEAR},Y={[my]:r.NEVER,[Sy]:r.ALWAYS,[gy]:r.LESS,[qg]:r.LEQUAL,[_y]:r.EQUAL,[xy]:r.GEQUAL,[vy]:r.GREATER,[yy]:r.NOTEQUAL};function je(I,A){if(A.type===Ii&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===ai||A.magFilter===dc||A.magFilter===ya||A.magFilter===gr||A.minFilter===ai||A.minFilter===dc||A.minFilter===ya||A.minFilter===gr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,pe[A.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,pe[A.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,pe[A.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,N[A.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,N[A.minFilter]),A.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,Y[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Vn||A.minFilter!==ya&&A.minFilter!==gr||A.type===Ii&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function tt(I,A){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",C));const ne=A.source;let ie=f.get(ne);ie===void 0&&(ie={},f.set(ne,ie));const Q=O(A);if(Q!==I.__cacheKey){ie[Q]===void 0&&(ie[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ie[Q].usedTimes++;const ve=ie[I.__cacheKey];ve!==void 0&&(ie[I.__cacheKey].usedTimes--,ve.usedTimes===0&&w(A)),I.__cacheKey=Q,I.__webglTexture=ie[Q].texture}return X}function te(I,A,X){return Math.floor(Math.floor(I/X)/A)}function le(I,A,X,ne){const Q=I.updateRanges;if(Q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,X,ne,A.data);else{Q.sort((ae,Se)=>ae.start-Se.start);let ve=0;for(let ae=1;ae<Q.length;ae++){const Se=Q[ve],be=Q[ae],$e=Se.start+Se.count,ye=te(be.start,A.width,4),we=te(Se.start,A.width,4);be.start<=$e+1&&ye===we&&te(be.start+be.count-1,A.width,4)===ye?Se.count=Math.max(Se.count,be.start+be.count-Se.start):(++ve,Q[ve]=be)}Q.length=ve+1;const _e=r.getParameter(r.UNPACK_ROW_LENGTH),Ve=r.getParameter(r.UNPACK_SKIP_PIXELS),re=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let ae=0,Se=Q.length;ae<Se;ae++){const be=Q[ae],$e=Math.floor(be.start/4),ye=Math.ceil(be.count/4),we=$e%A.width,U=Math.floor($e/A.width),me=ye,ce=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,we),r.pixelStorei(r.UNPACK_SKIP_ROWS,U),t.texSubImage2D(r.TEXTURE_2D,0,we,U,me,ce,X,ne,A.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,_e),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ve),r.pixelStorei(r.UNPACK_SKIP_ROWS,re)}}function Le(I,A,X){let ne=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ne=r.TEXTURE_3D);const ie=tt(I,A),Q=A.source;t.bindTexture(ne,I.__webglTexture,r.TEXTURE0+X);const ve=n.get(Q);if(Q.version!==ve.__version||ie===!0){t.activeTexture(r.TEXTURE0+X);const _e=Et.getPrimaries(Et.workingColorSpace),Ve=A.colorSpace===Fr?null:Et.getPrimaries(A.colorSpace),re=A.colorSpace===Fr||_e===Ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let ae=g(A.image,!1,i.maxTextureSize);ae=Fe(A,ae);const Se=s.convert(A.format,A.colorSpace),be=s.convert(A.type);let $e=x(A.internalFormat,Se,be,A.colorSpace,A.isVideoTexture);je(ne,A);let ye;const we=A.mipmaps,U=A.isVideoTexture!==!0,me=ve.__version===void 0||ie===!0,ce=Q.dataReady,Te=M(A,ae);if(A.isDepthTexture)$e=v(A.format===el,A.type),me&&(U?t.texStorage2D(r.TEXTURE_2D,1,$e,ae.width,ae.height):t.texImage2D(r.TEXTURE_2D,0,$e,ae.width,ae.height,0,Se,be,null));else if(A.isDataTexture)if(we.length>0){U&&me&&t.texStorage2D(r.TEXTURE_2D,Te,$e,we[0].width,we[0].height);for(let de=0,oe=we.length;de<oe;de++)ye=we[de],U?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,ye.width,ye.height,Se,be,ye.data):t.texImage2D(r.TEXTURE_2D,de,$e,ye.width,ye.height,0,Se,be,ye.data);A.generateMipmaps=!1}else U?(me&&t.texStorage2D(r.TEXTURE_2D,Te,$e,ae.width,ae.height),ce&&le(A,ae,Se,be)):t.texImage2D(r.TEXTURE_2D,0,$e,ae.width,ae.height,0,Se,be,ae.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){U&&me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,$e,we[0].width,we[0].height,ae.depth);for(let de=0,oe=we.length;de<oe;de++)if(ye=we[de],A.format!==vi)if(Se!==null)if(U){if(ce)if(A.layerUpdates.size>0){const ze=kp(ye.width,ye.height,A.format,A.type);for(const Ge of A.layerUpdates){const wt=ye.data.subarray(Ge*ze/ye.data.BYTES_PER_ELEMENT,(Ge+1)*ze/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,Ge,ye.width,ye.height,1,Se,wt)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,0,ye.width,ye.height,ae.depth,Se,ye.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,de,$e,ye.width,ye.height,ae.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ce&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,de,0,0,0,ye.width,ye.height,ae.depth,Se,be,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,de,$e,ye.width,ye.height,ae.depth,0,Se,be,ye.data)}else{U&&me&&t.texStorage2D(r.TEXTURE_2D,Te,$e,we[0].width,we[0].height);for(let de=0,oe=we.length;de<oe;de++)ye=we[de],A.format!==vi?Se!==null?U?ce&&t.compressedTexSubImage2D(r.TEXTURE_2D,de,0,0,ye.width,ye.height,Se,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,de,$e,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,ye.width,ye.height,Se,be,ye.data):t.texImage2D(r.TEXTURE_2D,de,$e,ye.width,ye.height,0,Se,be,ye.data)}else if(A.isDataArrayTexture)if(U){if(me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,$e,ae.width,ae.height,ae.depth),ce)if(A.layerUpdates.size>0){const de=kp(ae.width,ae.height,A.format,A.type);for(const oe of A.layerUpdates){const ze=ae.data.subarray(oe*de/ae.data.BYTES_PER_ELEMENT,(oe+1)*de/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,oe,ae.width,ae.height,1,Se,be,ze)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Se,be,ae.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,$e,ae.width,ae.height,ae.depth,0,Se,be,ae.data);else if(A.isData3DTexture)U?(me&&t.texStorage3D(r.TEXTURE_3D,Te,$e,ae.width,ae.height,ae.depth),ce&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Se,be,ae.data)):t.texImage3D(r.TEXTURE_3D,0,$e,ae.width,ae.height,ae.depth,0,Se,be,ae.data);else if(A.isFramebufferTexture){if(me)if(U)t.texStorage2D(r.TEXTURE_2D,Te,$e,ae.width,ae.height);else{let de=ae.width,oe=ae.height;for(let ze=0;ze<Te;ze++)t.texImage2D(r.TEXTURE_2D,ze,$e,de,oe,0,Se,be,null),de>>=1,oe>>=1}}else if(we.length>0){if(U&&me){const de=Tt(we[0]);t.texStorage2D(r.TEXTURE_2D,Te,$e,de.width,de.height)}for(let de=0,oe=we.length;de<oe;de++)ye=we[de],U?ce&&t.texSubImage2D(r.TEXTURE_2D,de,0,0,Se,be,ye):t.texImage2D(r.TEXTURE_2D,de,$e,Se,be,ye);A.generateMipmaps=!1}else if(U){if(me){const de=Tt(ae);t.texStorage2D(r.TEXTURE_2D,Te,$e,de.width,de.height)}ce&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se,be,ae)}else t.texImage2D(r.TEXTURE_2D,0,$e,Se,be,ae);m(A)&&p(ne),ve.__version=Q.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ge(I,A,X){if(A.image.length!==6)return;const ne=tt(I,A),ie=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+X);const Q=n.get(ie);if(ie.version!==Q.__version||ne===!0){t.activeTexture(r.TEXTURE0+X);const ve=Et.getPrimaries(Et.workingColorSpace),_e=A.colorSpace===Fr?null:Et.getPrimaries(A.colorSpace),Ve=A.colorSpace===Fr||ve===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);const re=A.isCompressedTexture||A.image[0].isCompressedTexture,ae=A.image[0]&&A.image[0].isDataTexture,Se=[];for(let oe=0;oe<6;oe++)!re&&!ae?Se[oe]=g(A.image[oe],!0,i.maxCubemapSize):Se[oe]=ae?A.image[oe].image:A.image[oe],Se[oe]=Fe(A,Se[oe]);const be=Se[0],$e=s.convert(A.format,A.colorSpace),ye=s.convert(A.type),we=x(A.internalFormat,$e,ye,A.colorSpace),U=A.isVideoTexture!==!0,me=Q.__version===void 0||ne===!0,ce=ie.dataReady;let Te=M(A,be);je(r.TEXTURE_CUBE_MAP,A);let de;if(re){U&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Te,we,be.width,be.height);for(let oe=0;oe<6;oe++){de=Se[oe].mipmaps;for(let ze=0;ze<de.length;ze++){const Ge=de[ze];A.format!==vi?$e!==null?U?ce&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,0,0,Ge.width,Ge.height,$e,Ge.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,we,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,0,0,Ge.width,Ge.height,$e,ye,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,we,Ge.width,Ge.height,0,$e,ye,Ge.data)}}}else{if(de=A.mipmaps,U&&me){de.length>0&&Te++;const oe=Tt(Se[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Te,we,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(ae){U?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Se[oe].width,Se[oe].height,$e,ye,Se[oe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,we,Se[oe].width,Se[oe].height,0,$e,ye,Se[oe].data);for(let ze=0;ze<de.length;ze++){const wt=de[ze].image[oe].image;U?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,0,0,wt.width,wt.height,$e,ye,wt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,we,wt.width,wt.height,0,$e,ye,wt.data)}}else{U?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,$e,ye,Se[oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,we,$e,ye,Se[oe]);for(let ze=0;ze<de.length;ze++){const Ge=de[ze];U?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,0,0,$e,ye,Ge.image[oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,we,$e,ye,Ge.image[oe])}}}m(A)&&p(r.TEXTURE_CUBE_MAP),Q.__version=ie.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function Ee(I,A,X,ne,ie,Q){const ve=s.convert(X.format,X.colorSpace),_e=s.convert(X.type),Ve=x(X.internalFormat,ve,_e,X.colorSpace),re=n.get(A),ae=n.get(X);if(ae.__renderTarget=A,!re.__hasExternalTextures){const Se=Math.max(1,A.width>>Q),be=Math.max(1,A.height>>Q);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,Q,Ve,Se,be,A.depth,0,ve,_e,null):t.texImage2D(ie,Q,Ve,Se,be,0,ve,_e,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),st(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ie,ae.__webglTexture,0,Ue(A)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ie,ae.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Qe(I,A,X){if(r.bindRenderbuffer(r.RENDERBUFFER,I),A.depthBuffer){const ne=A.depthTexture,ie=ne&&ne.isDepthTexture?ne.type:null,Q=v(A.stencilBuffer,ie),ve=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=Ue(A);st(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,Q,A.width,A.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,Q,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Q,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ve,r.RENDERBUFFER,I)}else{const ne=A.textures;for(let ie=0;ie<ne.length;ie++){const Q=ne[ie],ve=s.convert(Q.format,Q.colorSpace),_e=s.convert(Q.type),Ve=x(Q.internalFormat,ve,_e,Q.colorSpace),re=Ue(A);X&&st(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,re,Ve,A.width,A.height):st(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,Ve,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Ve,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xe(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(A.depthTexture);ne.__renderTarget=A,(!ne.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),T(A.depthTexture,0);const ie=ne.__webglTexture,Q=Ue(A);if(A.depthTexture.format===Qa)st(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(A.depthTexture.format===el)st(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function lt(I){const A=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const ne=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ne){const ie=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ne.removeEventListener("dispose",ie)};ne.addEventListener("dispose",ie),A.__depthDisposeCallback=ie}A.__boundDepthTexture=ne}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const ne=I.texture.mipmaps;ne&&ne.length>0?xe(A.__webglFramebuffer[0],I):xe(A.__webglFramebuffer,I)}else if(X){A.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[ne]),A.__webglDepthbuffer[ne]===void 0)A.__webglDepthbuffer[ne]=r.createRenderbuffer(),Qe(A.__webglDepthbuffer[ne],I,!1);else{const ie=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=A.__webglDepthbuffer[ne];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}else{const ne=I.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Qe(A.__webglDepthbuffer,I,!1);else{const ie=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ct(I,A,X){const ne=n.get(I);A!==void 0&&Ee(ne.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&lt(I)}function Be(I){const A=I.texture,X=n.get(I),ne=n.get(A);I.addEventListener("dispose",E);const ie=I.textures,Q=I.isWebGLCubeRenderTarget===!0,ve=ie.length>1;if(ve||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=A.version,o.memory.textures++),Q){X.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer[_e]=[];for(let Ve=0;Ve<A.mipmaps.length;Ve++)X.__webglFramebuffer[_e][Ve]=r.createFramebuffer()}else X.__webglFramebuffer[_e]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer=[];for(let _e=0;_e<A.mipmaps.length;_e++)X.__webglFramebuffer[_e]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(ve)for(let _e=0,Ve=ie.length;_e<Ve;_e++){const re=n.get(ie[_e]);re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture(),o.memory.textures++)}if(I.samples>0&&st(I)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let _e=0;_e<ie.length;_e++){const Ve=ie[_e];X.__webglColorRenderbuffer[_e]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[_e]);const re=s.convert(Ve.format,Ve.colorSpace),ae=s.convert(Ve.type),Se=x(Ve.internalFormat,re,ae,Ve.colorSpace,I.isXRRenderTarget===!0),be=Ue(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,be,Se,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,X.__webglColorRenderbuffer[_e])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Qe(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),je(r.TEXTURE_CUBE_MAP,A);for(let _e=0;_e<6;_e++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ve=0;Ve<A.mipmaps.length;Ve++)Ee(X.__webglFramebuffer[_e][Ve],I,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve);else Ee(X.__webglFramebuffer[_e],I,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(A)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let _e=0,Ve=ie.length;_e<Ve;_e++){const re=ie[_e],ae=n.get(re);t.bindTexture(r.TEXTURE_2D,ae.__webglTexture),je(r.TEXTURE_2D,re),Ee(X.__webglFramebuffer,I,re,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,0),m(re)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let _e=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(_e=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,ne.__webglTexture),je(_e,A),A.mipmaps&&A.mipmaps.length>0)for(let Ve=0;Ve<A.mipmaps.length;Ve++)Ee(X.__webglFramebuffer[Ve],I,A,r.COLOR_ATTACHMENT0,_e,Ve);else Ee(X.__webglFramebuffer,I,A,r.COLOR_ATTACHMENT0,_e,0);m(A)&&p(_e),t.unbindTexture()}I.depthBuffer&&lt(I)}function F(I){const A=I.textures;for(let X=0,ne=A.length;X<ne;X++){const ie=A[X];if(m(ie)){const Q=b(I),ve=n.get(ie).__webglTexture;t.bindTexture(Q,ve),p(Q),t.unbindTexture()}}}const at=[],rt=[];function j(I){if(I.samples>0){if(st(I)===!1){const A=I.textures,X=I.width,ne=I.height;let ie=r.COLOR_BUFFER_BIT;const Q=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=n.get(I),_e=A.length>1;if(_e)for(let re=0;re<A.length;re++)t.bindFramebuffer(r.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ve.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const Ve=I.texture.mipmaps;Ve&&Ve.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let re=0;re<A.length;re++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),_e){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ve.__webglColorRenderbuffer[re]);const ae=n.get(A[re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ae,0)}r.blitFramebuffer(0,0,X,ne,0,0,X,ne,ie,r.NEAREST),l===!0&&(at.length=0,rt.length=0,at.push(r.COLOR_ATTACHMENT0+re),I.depthBuffer&&I.resolveDepthBuffer===!1&&(at.push(Q),rt.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,rt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_e)for(let re=0;re<A.length;re++){t.bindFramebuffer(r.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,ve.__webglColorRenderbuffer[re]);const ae=n.get(A[re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ve.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,ae,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function Ue(I){return Math.min(i.maxSamples,I.samples)}function st(I){const A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function He(I){const A=o.render.frame;u.get(I)!==A&&(u.set(I,A),I.update())}function Fe(I,A){const X=I.colorSpace,ne=I.format,ie=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==Gn&&X!==Fr&&(Et.getTransfer(X)===Ft?(ne!==vi||ie!==Qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),A}function Tt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=D,this.setTexture2D=T,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=ct,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=st}function PE(r,e){function t(n,i=Fr){let s;const o=Et.getTransfer(i);if(n===Qi)return r.UNSIGNED_BYTE;if(n===Gf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Wf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Fg)return r.BYTE;if(n===kg)return r.SHORT;if(n===Za)return r.UNSIGNED_SHORT;if(n===Vf)return r.INT;if(n===Fs)return r.UNSIGNED_INT;if(n===Ii)return r.FLOAT;if(n===ml)return r.HALF_FLOAT;if(n===zg)return r.ALPHA;if(n===Hg)return r.RGB;if(n===vi)return r.RGBA;if(n===Qa)return r.DEPTH_COMPONENT;if(n===el)return r.DEPTH_STENCIL;if(n===Xf)return r.RED;if(n===qf)return r.RED_INTEGER;if(n===Vg)return r.RG;if(n===Yf)return r.RG_INTEGER;if(n===jf)return r.RGBA_INTEGER;if(n===fc||n===hc||n===pc||n===mc)if(o===Ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===fc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===fc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wd||n===bd||n===Md||n===Ed)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Md)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ed)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Td||n===Ad||n===Cd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Td||n===Ad)return o===Ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Cd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rd||n===Pd||n===Ld||n===Dd||n===Id||n===Od||n===Nd||n===Ud||n===Fd||n===kd||n===Bd||n===zd||n===Hd||n===Vd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Rd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ld)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Id)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Od)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ud)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vd)return o===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gc||n===Gd||n===Wd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===gc)return o===Ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gg||n===Xd||n===qd||n===Yd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===gc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Xd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ja?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const LE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DE=`
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

}`;class IE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new dn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new yi({vertexShader:LE,fragmentShader:DE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Hn(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OE extends Zo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new IE,m=t.getContextAttributes();let p=null,b=null;const x=[],v=[],M=new St;let C=null;const E=new qn;E.viewport=new Ct;const P=new qn;P.viewport=new Ct;const w=[E,P],y=new qx;let L=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let le=x[te];return le===void 0&&(le=new Ru,x[te]=le),le.getTargetRaySpace()},this.getControllerGrip=function(te){let le=x[te];return le===void 0&&(le=new Ru,x[te]=le),le.getGripSpace()},this.getHand=function(te){let le=x[te];return le===void 0&&(le=new Ru,x[te]=le),le.getHandSpace()};function z(te){const le=v.indexOf(te.inputSource);if(le===-1)return;const Le=x[le];Le!==void 0&&(Le.update(te.inputSource,te.frame,c||o),Le.dispatchEvent({type:te.type,data:te.inputSource}))}function O(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",T);for(let te=0;te<x.length;te++){const le=v[te];le!==null&&(v[te]=null,x[te].disconnect(le))}L=null,D=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,b=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",O),i.addEventListener("inputsourceschange",T),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Le=null,ge=null,Ee=null;m.depth&&(Ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Le=m.stencil?el:Qa,ge=m.stencil?Ja:Fs);const Qe={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Qe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new ks(f.textureWidth,f.textureHeight,{format:vi,type:Qi,depthTexture:new o_(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Le),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Le={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Le),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new ks(h.framebufferWidth,h.framebufferHeight,{format:vi,type:Qi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function T(te){for(let le=0;le<te.removed.length;le++){const Le=te.removed[le],ge=v.indexOf(Le);ge>=0&&(v[ge]=null,x[ge].disconnect(Le))}for(let le=0;le<te.added.length;le++){const Le=te.added[le];let ge=v.indexOf(Le);if(ge===-1){for(let Qe=0;Qe<x.length;Qe++)if(Qe>=v.length){v.push(Le),ge=Qe;break}else if(v[Qe]===null){v[Qe]=Le,ge=Qe;break}if(ge===-1)break}const Ee=x[ge];Ee&&Ee.connect(Le)}}const W=new G,Z=new G;function q(te,le,Le){W.setFromMatrixPosition(le.matrixWorld),Z.setFromMatrixPosition(Le.matrixWorld);const ge=W.distanceTo(Z),Ee=le.projectionMatrix.elements,Qe=Le.projectionMatrix.elements,xe=Ee[14]/(Ee[10]-1),lt=Ee[14]/(Ee[10]+1),ct=(Ee[9]+1)/Ee[5],Be=(Ee[9]-1)/Ee[5],F=(Ee[8]-1)/Ee[0],at=(Qe[8]+1)/Qe[0],rt=xe*F,j=xe*at,Ue=ge/(-F+at),st=Ue*-F;if(le.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(st),te.translateZ(Ue),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),Ee[10]===-1)te.projectionMatrix.copy(le.projectionMatrix),te.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const He=xe+Ue,Fe=lt+Ue,Tt=rt-st,I=j+(ge-st),A=ct*lt/Fe*He,X=Be*lt/Fe*He;te.projectionMatrix.makePerspective(Tt,I,A,X,He,Fe),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function pe(te,le){le===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(le.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let le=te.near,Le=te.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(Le=g.depthFar)),y.near=P.near=E.near=le,y.far=P.far=E.far=Le,(L!==y.near||D!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,D=y.far),E.layers.mask=te.layers.mask|2,P.layers.mask=te.layers.mask|4,y.layers.mask=E.layers.mask|P.layers.mask;const ge=te.parent,Ee=y.cameras;pe(y,ge);for(let Qe=0;Qe<Ee.length;Qe++)pe(Ee[Qe],ge);Ee.length===2?q(y,E,P):y.projectionMatrix.copy(E.projectionMatrix),N(te,y,ge)};function N(te,le,Le){Le===null?te.matrix.copy(le.matrixWorld):(te.matrix.copy(Le.matrixWorld),te.matrix.invert(),te.matrix.multiply(le.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(le.projectionMatrix),te.projectionMatrixInverse.copy(le.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Bo*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let Y=null;function je(te,le){if(u=le.getViewerPose(c||o),_=le,u!==null){const Le=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let ge=!1;Le.length!==y.cameras.length&&(y.cameras.length=0,ge=!0);for(let xe=0;xe<Le.length;xe++){const lt=Le[xe];let ct=null;if(h!==null)ct=h.getViewport(lt);else{const F=d.getViewSubImage(f,lt);ct=F.viewport,xe===0&&(e.setRenderTargetTextures(b,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(b))}let Be=w[xe];Be===void 0&&(Be=new qn,Be.layers.enable(xe),Be.viewport=new Ct,w[xe]=Be),Be.matrix.fromArray(lt.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(lt.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(ct.x,ct.y,ct.width,ct.height),xe===0&&(y.matrix.copy(Be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ge===!0&&y.cameras.push(Be)}const Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const xe=d.getDepthInformation(Le[0]);xe&&xe.isValid&&xe.texture&&g.init(e,xe,i.renderState)}}for(let Le=0;Le<x.length;Le++){const ge=v[Le],Ee=x[Le];ge!==null&&Ee!==void 0&&Ee.update(ge,le,c||o)}Y&&Y(te,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),_=null}const tt=new d_;tt.setAnimationLoop(je),this.setAnimationLoop=function(te){Y=te},this.dispose=function(){}}}const fs=new er,NE=new ht;function UE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),x=b.envMap,v=b.envMapRotation;x&&(m.envMap.value=x,fs.copy(v),fs.x*=-1,fs.y*=-1,fs.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),m.envMapRotation.value.setFromMatrix4(NE.makeRotationFromEuler(fs)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function FE(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const v=x.program;n.uniformBlockBinding(b,v)}function c(b,x){let v=i[b.id];v===void 0&&(_(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const M=x.program;n.updateUBOMapping(b,M);const C=e.render.frame;s[b.id]!==C&&(f(b),s[b.id]=C)}function u(b){const x=d();b.__bindingPointIndex=x;const v=r.createBuffer(),M=b.__size,C=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,M,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=i[b.id],v=b.uniforms,M=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let C=0,E=v.length;C<E;C++){const P=Array.isArray(v[C])?v[C]:[v[C]];for(let w=0,y=P.length;w<y;w++){const L=P[w];if(h(L,C,w,M)===!0){const D=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let O=0;for(let T=0;T<z.length;T++){const W=z[T],Z=g(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,D+O,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,O),O+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,x,v,M){const C=b.value,E=x+"_"+v;if(M[E]===void 0)return typeof C=="number"||typeof C=="boolean"?M[E]=C:M[E]=C.clone(),!0;{const P=M[E];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return M[E]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function _(b){const x=b.uniforms;let v=0;const M=16;for(let E=0,P=x.length;E<P;E++){const w=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,L=w.length;y<L;y++){const D=w[y],z=Array.isArray(D.value)?D.value:[D.value];for(let O=0,T=z.length;O<T;O++){const W=z[O],Z=g(W),q=v%M,pe=q%Z.boundary,N=q+pe;v+=pe,N!==0&&M-N<Z.storage&&(v+=M-N),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=Z.storage}}}const C=v%M;return C>0&&(v+=M-C),b.__size=v,b.__cache={},this}function g(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class kE{constructor(e={}){const{canvas:t=By(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let M=!1;this._outputColorSpace=Sn;let C=0,E=0,P=null,w=-1,y=null;const L=new Ct,D=new Ct;let z=null;const O=new Je(0);let T=0,W=t.width,Z=t.height,q=1,pe=null,N=null;const Y=new Ct(0,0,W,Z),je=new Ct(0,0,W,Z);let tt=!1;const te=new Qf;let le=!1,Le=!1;const ge=new ht,Ee=new ht,Qe=new G,xe=new Ct,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Be(){return P===null?q:1}let F=n;function at(R,V){return t.getContext(R,V)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hf}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",oe,!1),F===null){const V="webgl2";if(F=at(V,R),F===null)throw at(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let rt,j,Ue,st,He,Fe,Tt,I,A,X,ne,ie,Q,ve,_e,Ve,re,ae,Se,be,$e,ye,we,U;function me(){rt=new jb(F),rt.init(),ye=new PE(F,rt),j=new Hb(F,rt,e,ye),Ue=new CE(F,rt),j.reverseDepthBuffer&&f&&Ue.buffers.depth.setReversed(!0),st=new Zb(F),He=new mE,Fe=new RE(F,rt,Ue,He,j,ye,st),Tt=new Gb(v),I=new Yb(v),A=new iS(F),we=new Bb(F,A),X=new $b(F,A,st,we),ne=new Qb(F,X,A,st),Se=new Jb(F,j,Fe),Ve=new Vb(He),ie=new pE(v,Tt,I,rt,j,we,Ve),Q=new UE(v,He),ve=new _E,_e=new bE(rt),ae=new kb(v,Tt,I,Ue,ne,h,l),re=new TE(v,ne,j),U=new FE(F,st,j,Ue),be=new zb(F,rt,st),$e=new Kb(F,rt,st),st.programs=ie.programs,v.capabilities=j,v.extensions=rt,v.properties=He,v.renderLists=ve,v.shadowMap=re,v.state=Ue,v.info=st}me();const ce=new OE(v,F);this.xr=ce,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=rt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=rt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(W,Z,!1))},this.getSize=function(R){return R.set(W,Z)},this.setSize=function(R,V,K=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=R,Z=V,t.width=Math.floor(R*q),t.height=Math.floor(V*q),K===!0&&(t.style.width=R+"px",t.style.height=V+"px"),this.setViewport(0,0,R,V)},this.getDrawingBufferSize=function(R){return R.set(W*q,Z*q).floor()},this.setDrawingBufferSize=function(R,V,K){W=R,Z=V,q=K,t.width=Math.floor(R*K),t.height=Math.floor(V*K),this.setViewport(0,0,R,V)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(Y)},this.setViewport=function(R,V,K,$){R.isVector4?Y.set(R.x,R.y,R.z,R.w):Y.set(R,V,K,$),Ue.viewport(L.copy(Y).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy(je)},this.setScissor=function(R,V,K,$){R.isVector4?je.set(R.x,R.y,R.z,R.w):je.set(R,V,K,$),Ue.scissor(D.copy(je).multiplyScalar(q).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(R){Ue.setScissorTest(tt=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){N=R},this.getClearColor=function(R){return R.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(R=!0,V=!0,K=!0){let $=0;if(R){let H=!1;if(P!==null){const he=P.texture.format;H=he===jf||he===Yf||he===qf}if(H){const he=P.texture.type,Ce=he===Qi||he===Fs||he===Za||he===Ja||he===Gf||he===Wf,We=ae.getClearColor(),Ie=ae.getClearAlpha(),S=We.r,k=We.g,B=We.b;Ce?(_[0]=S,_[1]=k,_[2]=B,_[3]=Ie,F.clearBufferuiv(F.COLOR,0,_)):(g[0]=S,g[1]=k,g[2]=B,g[3]=Ie,F.clearBufferiv(F.COLOR,0,g))}else $|=F.COLOR_BUFFER_BIT}V&&($|=F.DEPTH_BUFFER_BIT),K&&($|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),ae.dispose(),ve.dispose(),_e.dispose(),He.dispose(),Tt.dispose(),I.dispose(),ne.dispose(),we.dispose(),U.dispose(),ie.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",Me),ce.removeEventListener("sessionend",ot),qe.stop()};function Te(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=st.autoReset,V=re.enabled,K=re.autoUpdate,$=re.needsUpdate,H=re.type;me(),st.autoReset=R,re.enabled=V,re.autoUpdate=K,re.needsUpdate=$,re.type=H}function oe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ze(R){const V=R.target;V.removeEventListener("dispose",ze),Ge(V)}function Ge(R){wt(R),He.remove(R)}function wt(R){const V=He.get(R).programs;V!==void 0&&(V.forEach(function(K){ie.releaseProgram(K)}),R.isShaderMaterial&&ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,V,K,$,H,he){V===null&&(V=lt);const Ce=H.isMesh&&H.matrixWorld.determinant()<0,We=pn(R,V,K,$,H);Ue.setMaterial($,Ce);let Ie=K.index,S=1;if($.wireframe===!0){if(Ie=X.getWireframeAttribute(K),Ie===void 0)return;S=2}const k=K.drawRange,B=K.attributes.position;let J=k.start*S,fe=(k.start+k.count)*S;he!==null&&(J=Math.max(J,he.start*S),fe=Math.min(fe,(he.start+he.count)*S)),Ie!==null?(J=Math.max(J,0),fe=Math.min(fe,Ie.count)):B!=null&&(J=Math.max(J,0),fe=Math.min(fe,B.count));const se=fe-J;if(se<0||se===1/0)return;we.setup(H,$,We,K,Ie);let Pe,Re=be;if(Ie!==null&&(Pe=A.get(Ie),Re=$e,Re.setIndex(Pe)),H.isMesh)$.wireframe===!0?(Ue.setLineWidth($.wireframeLinewidth*Be()),Re.setMode(F.LINES)):Re.setMode(F.TRIANGLES);else if(H.isLine){let Oe=$.linewidth;Oe===void 0&&(Oe=1),Ue.setLineWidth(Oe*Be()),H.isLineSegments?Re.setMode(F.LINES):H.isLineLoop?Re.setMode(F.LINE_LOOP):Re.setMode(F.LINE_STRIP)}else H.isPoints?Re.setMode(F.POINTS):H.isSprite&&Re.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Mo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Re.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(rt.get("WEBGL_multi_draw"))Re.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Oe=H._multiDrawStarts,it=H._multiDrawCounts,bt=H._multiDrawCount,xn=Ie?A.get(Ie).bytesPerElement:1,rr=He.get($).currentProgram.getUniforms();for(let Pt=0;Pt<bt;Pt++)rr.setValue(F,"_gl_DrawID",Pt),Re.render(Oe[Pt]/xn,it[Pt])}else if(H.isInstancedMesh)Re.renderInstances(J,se,H.count);else if(K.isInstancedBufferGeometry){const Oe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,it=Math.min(K.instanceCount,Oe);Re.renderInstances(J,se,it)}else Re.render(J,se)};function De(R,V,K){R.transparent===!0&&R.side===_i&&R.forceSinglePass===!1?(R.side=Yn,R.needsUpdate=!0,Dt(R,V,K),R.side=Mr,R.needsUpdate=!0,Dt(R,V,K),R.side=_i):Dt(R,V,K)}this.compile=function(R,V,K=null){K===null&&(K=R),p=_e.get(K),p.init(V),x.push(p),K.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),R!==K&&R.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const $=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const he=H.material;if(he)if(Array.isArray(he))for(let Ce=0;Ce<he.length;Ce++){const We=he[Ce];De(We,K,H),$.add(We)}else De(he,K,H),$.add(he)}),p=x.pop(),$},this.compileAsync=function(R,V,K=null){const $=this.compile(R,V,K);return new Promise(H=>{function he(){if($.forEach(function(Ce){He.get(Ce).currentProgram.isReady()&&$.delete(Ce)}),$.size===0){H(R);return}setTimeout(he,10)}rt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Ae=null;function nt(R){Ae&&Ae(R)}function Me(){qe.stop()}function ot(){qe.start()}const qe=new d_;qe.setAnimationLoop(nt),typeof self<"u"&&qe.setContext(self),this.setAnimationLoop=function(R){Ae=R,ce.setAnimationLoop(R),R===null?qe.stop():qe.start()},ce.addEventListener("sessionstart",Me),ce.addEventListener("sessionend",ot),this.render=function(R,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(V),V=ce.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,V,P),p=_e.get(R,x.length),p.init(V),x.push(p),Ee.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),te.setFromProjectionMatrix(Ee),Le=this.localClippingEnabled,le=Ve.init(this.clippingPlanes,Le),m=ve.get(R,b.length),m.init(),b.push(m),ce.enabled===!0&&ce.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&et(he,V,-1/0,v.sortObjects)}et(R,V,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(pe,N),ct=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,ct&&ae.addToRenderList(m,R),this.info.render.frame++,le===!0&&Ve.beginShadows();const K=p.state.shadowsArray;re.render(K,R,V),le===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,H=m.transmissive;if(p.setupLights(),V.isArrayCamera){const he=V.cameras;if(H.length>0)for(let Ce=0,We=he.length;Ce<We;Ce++){const Ie=he[Ce];ke($,H,R,Ie)}ct&&ae.render(R);for(let Ce=0,We=he.length;Ce<We;Ce++){const Ie=he[Ce];qt(m,R,Ie,Ie.viewport)}}else H.length>0&&ke($,H,R,V),ct&&ae.render(R),qt(m,R,V);P!==null&&E===0&&(Fe.updateMultisampleRenderTarget(P),Fe.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,V),we.resetDefaultState(),w=-1,y=null,x.pop(),x.length>0?(p=x[x.length-1],le===!0&&Ve.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function et(R,V,K,$){if(R.visible===!1)return;if(R.layers.test(V.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(V);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||te.intersectsSprite(R)){$&&xe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ee);const Ce=ne.update(R),We=R.material;We.visible&&m.push(R,Ce,We,K,xe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||te.intersectsObject(R))){const Ce=ne.update(R),We=R.material;if($&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),xe.copy(R.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),xe.copy(Ce.boundingSphere.center)),xe.applyMatrix4(R.matrixWorld).applyMatrix4(Ee)),Array.isArray(We)){const Ie=Ce.groups;for(let S=0,k=Ie.length;S<k;S++){const B=Ie[S],J=We[B.materialIndex];J&&J.visible&&m.push(R,Ce,J,K,xe.z,B)}}else We.visible&&m.push(R,Ce,We,K,xe.z,null)}}const he=R.children;for(let Ce=0,We=he.length;Ce<We;Ce++)et(he[Ce],V,K,$)}function qt(R,V,K,$){const H=R.opaque,he=R.transmissive,Ce=R.transparent;p.setupLightsView(K),le===!0&&Ve.setGlobalState(v.clippingPlanes,K),$&&Ue.viewport(L.copy($)),H.length>0&&dt(H,V,K),he.length>0&&dt(he,V,K),Ce.length>0&&dt(Ce,V,K),Ue.buffers.depth.setTest(!0),Ue.buffers.depth.setMask(!0),Ue.buffers.color.setMask(!0),Ue.setPolygonOffset(!1)}function ke(R,V,K,$){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ks(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float")?ml:Qi,minFilter:gr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const he=p.state.transmissionRenderTarget[$.id],Ce=$.viewport||L;he.setSize(Ce.z*v.transmissionResolutionScale,Ce.w*v.transmissionResolutionScale);const We=v.getRenderTarget();v.setRenderTarget(he),v.getClearColor(O),T=v.getClearAlpha(),T<1&&v.setClearColor(16777215,.5),v.clear(),ct&&ae.render(K);const Ie=v.toneMapping;v.toneMapping=jr;const S=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),le===!0&&Ve.setGlobalState(v.clippingPlanes,$),dt(R,K,$),Fe.updateMultisampleRenderTarget(he),Fe.updateRenderTargetMipmap(he),rt.has("WEBGL_multisampled_render_to_texture")===!1){let k=!1;for(let B=0,J=V.length;B<J;B++){const fe=V[B],se=fe.object,Pe=fe.geometry,Re=fe.material,Oe=fe.group;if(Re.side===_i&&se.layers.test($.layers)){const it=Re.side;Re.side=Yn,Re.needsUpdate=!0,Zt(se,K,$,Pe,Re,Oe),Re.side=it,Re.needsUpdate=!0,k=!0}}k===!0&&(Fe.updateMultisampleRenderTarget(he),Fe.updateRenderTargetMipmap(he))}v.setRenderTarget(We),v.setClearColor(O,T),S!==void 0&&($.viewport=S),v.toneMapping=Ie}function dt(R,V,K){const $=V.isScene===!0?V.overrideMaterial:null;for(let H=0,he=R.length;H<he;H++){const Ce=R[H],We=Ce.object,Ie=Ce.geometry,S=Ce.group;let k=Ce.material;k.allowOverride===!0&&$!==null&&(k=$),We.layers.test(K.layers)&&Zt(We,V,K,Ie,k,S)}}function Zt(R,V,K,$,H,he){R.onBeforeRender(v,V,K,$,H,he),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(v,V,K,$,R,he),H.transparent===!0&&H.side===_i&&H.forceSinglePass===!1?(H.side=Yn,H.needsUpdate=!0,v.renderBufferDirect(K,V,$,H,R,he),H.side=Mr,H.needsUpdate=!0,v.renderBufferDirect(K,V,$,H,R,he),H.side=_i):v.renderBufferDirect(K,V,$,H,R,he),R.onAfterRender(v,V,K,$,H,he)}function Dt(R,V,K){V.isScene!==!0&&(V=lt);const $=He.get(R),H=p.state.lights,he=p.state.shadowsArray,Ce=H.state.version,We=ie.getParameters(R,H.state,he,V,K),Ie=ie.getProgramCacheKey(We);let S=$.programs;$.environment=R.isMeshStandardMaterial?V.environment:null,$.fog=V.fog,$.envMap=(R.isMeshStandardMaterial?I:Tt).get(R.envMap||$.environment),$.envMapRotation=$.environment!==null&&R.envMap===null?V.environmentRotation:R.envMapRotation,S===void 0&&(R.addEventListener("dispose",ze),S=new Map,$.programs=S);let k=S.get(Ie);if(k!==void 0){if($.currentProgram===k&&$.lightsStateVersion===Ce)return At(R,We),k}else We.uniforms=ie.getUniforms(R),R.onBeforeCompile(We,v),k=ie.acquireProgram(We,Ie),S.set(Ie,k),$.uniforms=We.uniforms;const B=$.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(B.clippingPlanes=Ve.uniform),At(R,We),$.needsLights=It(R),$.lightsStateVersion=Ce,$.needsLights&&(B.ambientLightColor.value=H.state.ambient,B.lightProbe.value=H.state.probe,B.directionalLights.value=H.state.directional,B.directionalLightShadows.value=H.state.directionalShadow,B.spotLights.value=H.state.spot,B.spotLightShadows.value=H.state.spotShadow,B.rectAreaLights.value=H.state.rectArea,B.ltc_1.value=H.state.rectAreaLTC1,B.ltc_2.value=H.state.rectAreaLTC2,B.pointLights.value=H.state.point,B.pointLightShadows.value=H.state.pointShadow,B.hemisphereLights.value=H.state.hemi,B.directionalShadowMap.value=H.state.directionalShadowMap,B.directionalShadowMatrix.value=H.state.directionalShadowMatrix,B.spotShadowMap.value=H.state.spotShadowMap,B.spotLightMatrix.value=H.state.spotLightMatrix,B.spotLightMap.value=H.state.spotLightMap,B.pointShadowMap.value=H.state.pointShadowMap,B.pointShadowMatrix.value=H.state.pointShadowMatrix),$.currentProgram=k,$.uniformsList=null,k}function Rt(R){if(R.uniformsList===null){const V=R.currentProgram.getUniforms();R.uniformsList=_c.seqWithValue(V.seq,R.uniforms)}return R.uniformsList}function At(R,V){const K=He.get(R);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function pn(R,V,K,$,H){V.isScene!==!0&&(V=lt),Fe.resetTextureUnits();const he=V.fog,Ce=$.isMeshStandardMaterial?V.environment:null,We=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Gn,Ie=($.isMeshStandardMaterial?I:Tt).get($.envMap||Ce),S=$.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,k=!!K.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),B=!!K.morphAttributes.position,J=!!K.morphAttributes.normal,fe=!!K.morphAttributes.color;let se=jr;$.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(se=v.toneMapping);const Pe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Re=Pe!==void 0?Pe.length:0,Oe=He.get($),it=p.state.lights;if(le===!0&&(Le===!0||R!==y)){const Ht=R===y&&$.id===w;Ve.setState($,R,Ht)}let bt=!1;$.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==it.state.version||Oe.outputColorSpace!==We||H.isBatchedMesh&&Oe.batching===!1||!H.isBatchedMesh&&Oe.batching===!0||H.isBatchedMesh&&Oe.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Oe.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Oe.instancing===!1||!H.isInstancedMesh&&Oe.instancing===!0||H.isSkinnedMesh&&Oe.skinning===!1||!H.isSkinnedMesh&&Oe.skinning===!0||H.isInstancedMesh&&Oe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Oe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Oe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Oe.instancingMorph===!1&&H.morphTexture!==null||Oe.envMap!==Ie||$.fog===!0&&Oe.fog!==he||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Ve.numPlanes||Oe.numIntersection!==Ve.numIntersection)||Oe.vertexAlphas!==S||Oe.vertexTangents!==k||Oe.morphTargets!==B||Oe.morphNormals!==J||Oe.morphColors!==fe||Oe.toneMapping!==se||Oe.morphTargetsCount!==Re)&&(bt=!0):(bt=!0,Oe.__version=$.version);let xn=Oe.currentProgram;bt===!0&&(xn=Dt($,V,H));let rr=!1,Pt=!1,xt=!1;const ut=xn.getUniforms(),Bt=Oe.uniforms;if(Ue.useProgram(xn.program)&&(rr=!0,Pt=!0,xt=!0),$.id!==w&&(w=$.id,Pt=!0),rr||y!==R){Ue.buffers.depth.getReversed()?(ge.copy(R.projectionMatrix),Hy(ge),Vy(ge),ut.setValue(F,"projectionMatrix",ge)):ut.setValue(F,"projectionMatrix",R.projectionMatrix),ut.setValue(F,"viewMatrix",R.matrixWorldInverse);const sn=ut.map.cameraPosition;sn!==void 0&&sn.setValue(F,Qe.setFromMatrixPosition(R.matrixWorld)),j.logarithmicDepthBuffer&&ut.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ut.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,Pt=!0,xt=!0)}if(H.isSkinnedMesh){ut.setOptional(F,H,"bindMatrix"),ut.setOptional(F,H,"bindMatrixInverse");const Ht=H.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),ut.setValue(F,"boneTexture",Ht.boneTexture,Fe))}H.isBatchedMesh&&(ut.setOptional(F,H,"batchingTexture"),ut.setValue(F,"batchingTexture",H._matricesTexture,Fe),ut.setOptional(F,H,"batchingIdTexture"),ut.setValue(F,"batchingIdTexture",H._indirectTexture,Fe),ut.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ut.setValue(F,"batchingColorTexture",H._colorsTexture,Fe));const zt=K.morphAttributes;if((zt.position!==void 0||zt.normal!==void 0||zt.color!==void 0)&&Se.update(H,K,xn),(Pt||Oe.receiveShadow!==H.receiveShadow)&&(Oe.receiveShadow=H.receiveShadow,ut.setValue(F,"receiveShadow",H.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Bt.envMap.value=Ie,Bt.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&V.environment!==null&&(Bt.envMapIntensity.value=V.environmentIntensity),Pt&&(ut.setValue(F,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&kt(Bt,xt),he&&$.fog===!0&&Q.refreshFogUniforms(Bt,he),Q.refreshMaterialUniforms(Bt,$,q,Z,p.state.transmissionRenderTarget[R.id]),_c.upload(F,Rt(Oe),Bt,Fe)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(_c.upload(F,Rt(Oe),Bt,Fe),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ut.setValue(F,"center",H.center),ut.setValue(F,"modelViewMatrix",H.modelViewMatrix),ut.setValue(F,"normalMatrix",H.normalMatrix),ut.setValue(F,"modelMatrix",H.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Ht=$.uniformsGroups;for(let sn=0,zi=Ht.length;sn<zi;sn++){const Hi=Ht[sn];U.update(Hi,xn),U.bind(Hi,xn)}}return xn}function kt(R,V){R.ambientLightColor.needsUpdate=V,R.lightProbe.needsUpdate=V,R.directionalLights.needsUpdate=V,R.directionalLightShadows.needsUpdate=V,R.pointLights.needsUpdate=V,R.pointLightShadows.needsUpdate=V,R.spotLights.needsUpdate=V,R.spotLightShadows.needsUpdate=V,R.rectAreaLights.needsUpdate=V,R.hemisphereLights.needsUpdate=V}function It(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,V,K){const $=He.get(R);$.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),He.get(R.texture).__webglTexture=V,He.get(R.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:K,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,V){const K=He.get(R);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0};const Wn=F.createFramebuffer();this.setRenderTarget=function(R,V=0,K=0){P=R,C=V,E=K;let $=!0,H=null,he=!1,Ce=!1;if(R){const Ie=He.get(R);if(Ie.__useDefaultFramebuffer!==void 0)Ue.bindFramebuffer(F.FRAMEBUFFER,null),$=!1;else if(Ie.__webglFramebuffer===void 0)Fe.setupRenderTarget(R);else if(Ie.__hasExternalTextures)Fe.rebindTextures(R,He.get(R.texture).__webglTexture,He.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const B=R.depthTexture;if(Ie.__boundDepthTexture!==B){if(B!==null&&He.has(B)&&(R.width!==B.image.width||R.height!==B.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(R)}}const S=R.texture;(S.isData3DTexture||S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Ce=!0);const k=He.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(k[V])?H=k[V][K]:H=k[V],he=!0):R.samples>0&&Fe.useMultisampledRTT(R)===!1?H=He.get(R).__webglMultisampledFramebuffer:Array.isArray(k)?H=k[K]:H=k,L.copy(R.viewport),D.copy(R.scissor),z=R.scissorTest}else L.copy(Y).multiplyScalar(q).floor(),D.copy(je).multiplyScalar(q).floor(),z=tt;if(K!==0&&(H=Wn),Ue.bindFramebuffer(F.FRAMEBUFFER,H)&&$&&Ue.drawBuffers(R,H),Ue.viewport(L),Ue.scissor(D),Ue.setScissorTest(z),he){const Ie=He.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ie.__webglTexture,K)}else if(Ce){const Ie=He.get(R.texture),S=V;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ie.__webglTexture,K,S)}else if(R!==null&&K!==0){const Ie=He.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ie.__webglTexture,K)}w=-1},this.readRenderTargetPixels=function(R,V,K,$,H,he,Ce,We=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ie=Ie[Ce]),Ie){Ue.bindFramebuffer(F.FRAMEBUFFER,Ie);try{const S=R.textures[We],k=S.format,B=S.type;if(!j.textureFormatReadable(k)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(B)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=R.width-$&&K>=0&&K<=R.height-H&&(R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+We),F.readPixels(V,K,$,H,ye.convert(k),ye.convert(B),he))}finally{const S=P!==null?He.get(P).__webglFramebuffer:null;Ue.bindFramebuffer(F.FRAMEBUFFER,S)}}},this.readRenderTargetPixelsAsync=async function(R,V,K,$,H,he,Ce,We=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ie=Ie[Ce]),Ie)if(V>=0&&V<=R.width-$&&K>=0&&K<=R.height-H){Ue.bindFramebuffer(F.FRAMEBUFFER,Ie);const S=R.textures[We],k=S.format,B=S.type;if(!j.textureFormatReadable(k))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(B))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const J=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,J),F.bufferData(F.PIXEL_PACK_BUFFER,he.byteLength,F.STREAM_READ),R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+We),F.readPixels(V,K,$,H,ye.convert(k),ye.convert(B),0);const fe=P!==null?He.get(P).__webglFramebuffer:null;Ue.bindFramebuffer(F.FRAMEBUFFER,fe);const se=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await zy(F,se,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,J),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,he),F.deleteBuffer(J),F.deleteSync(se),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,V=null,K=0){const $=Math.pow(2,-K),H=Math.floor(R.image.width*$),he=Math.floor(R.image.height*$),Ce=V!==null?V.x:0,We=V!==null?V.y:0;Fe.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,Ce,We,H,he),Ue.unbindTexture()};const Jt=F.createFramebuffer(),Qt=F.createFramebuffer();this.copyTextureToTexture=function(R,V,K=null,$=null,H=0,he=null){he===null&&(H!==0?(Mo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=H,H=0):he=0);let Ce,We,Ie,S,k,B,J,fe,se;const Pe=R.isCompressedTexture?R.mipmaps[he]:R.image;if(K!==null)Ce=K.max.x-K.min.x,We=K.max.y-K.min.y,Ie=K.isBox3?K.max.z-K.min.z:1,S=K.min.x,k=K.min.y,B=K.isBox3?K.min.z:0;else{const zt=Math.pow(2,-H);Ce=Math.floor(Pe.width*zt),We=Math.floor(Pe.height*zt),R.isDataArrayTexture?Ie=Pe.depth:R.isData3DTexture?Ie=Math.floor(Pe.depth*zt):Ie=1,S=0,k=0,B=0}$!==null?(J=$.x,fe=$.y,se=$.z):(J=0,fe=0,se=0);const Re=ye.convert(V.format),Oe=ye.convert(V.type);let it;V.isData3DTexture?(Fe.setTexture3D(V,0),it=F.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Fe.setTexture2DArray(V,0),it=F.TEXTURE_2D_ARRAY):(Fe.setTexture2D(V,0),it=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,V.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,V.unpackAlignment);const bt=F.getParameter(F.UNPACK_ROW_LENGTH),xn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),rr=F.getParameter(F.UNPACK_SKIP_PIXELS),Pt=F.getParameter(F.UNPACK_SKIP_ROWS),xt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Pe.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Pe.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,S),F.pixelStorei(F.UNPACK_SKIP_ROWS,k),F.pixelStorei(F.UNPACK_SKIP_IMAGES,B);const ut=R.isDataArrayTexture||R.isData3DTexture,Bt=V.isDataArrayTexture||V.isData3DTexture;if(R.isDepthTexture){const zt=He.get(R),Ht=He.get(V),sn=He.get(zt.__renderTarget),zi=He.get(Ht.__renderTarget);Ue.bindFramebuffer(F.READ_FRAMEBUFFER,sn.__webglFramebuffer),Ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Hi=0;Hi<Ie;Hi++)ut&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,He.get(R).__webglTexture,H,B+Hi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,He.get(V).__webglTexture,he,se+Hi)),F.blitFramebuffer(S,k,Ce,We,J,fe,Ce,We,F.DEPTH_BUFFER_BIT,F.NEAREST);Ue.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||R.isRenderTargetTexture||He.has(R)){const zt=He.get(R),Ht=He.get(V);Ue.bindFramebuffer(F.READ_FRAMEBUFFER,Jt),Ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,Qt);for(let sn=0;sn<Ie;sn++)ut?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,zt.__webglTexture,H,B+sn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,zt.__webglTexture,H),Bt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ht.__webglTexture,he,se+sn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ht.__webglTexture,he),H!==0?F.blitFramebuffer(S,k,Ce,We,J,fe,Ce,We,F.COLOR_BUFFER_BIT,F.NEAREST):Bt?F.copyTexSubImage3D(it,he,J,fe,se+sn,S,k,Ce,We):F.copyTexSubImage2D(it,he,J,fe,S,k,Ce,We);Ue.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Bt?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(it,he,J,fe,se,Ce,We,Ie,Re,Oe,Pe.data):V.isCompressedArrayTexture?F.compressedTexSubImage3D(it,he,J,fe,se,Ce,We,Ie,Re,Pe.data):F.texSubImage3D(it,he,J,fe,se,Ce,We,Ie,Re,Oe,Pe):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,he,J,fe,Ce,We,Re,Oe,Pe.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,he,J,fe,Pe.width,Pe.height,Re,Pe.data):F.texSubImage2D(F.TEXTURE_2D,he,J,fe,Ce,We,Re,Oe,Pe);F.pixelStorei(F.UNPACK_ROW_LENGTH,bt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,rr),F.pixelStorei(F.UNPACK_SKIP_ROWS,Pt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,xt),he===0&&V.generateMipmaps&&F.generateMipmap(it),Ue.unbindTexture()},this.copyTextureToTexture3D=function(R,V,K=null,$=null,H=0){return Mo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,V,K,$,H)},this.initRenderTarget=function(R){He.get(R).__webglFramebuffer===void 0&&Fe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Fe.setTextureCube(R,0):R.isData3DTexture?Fe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Fe.setTexture2DArray(R,0):Fe.setTexture2D(R,0),Ue.unbindTexture()},this.resetState=function(){C=0,E=0,P=null,Ue.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}function BE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function yo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var cm=Array.prototype.forEach,da=Array.prototype.slice,ue={BREAK:{},extend:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(da.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=da.call(arguments);return function(){for(var t=da.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(cm&&e.forEach&&e.forEach===cm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():da.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},zE=[{litmus:ue.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:yo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:yo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:yo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:yo}}},{litmus:ue.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:ue.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:ue.isObject,conversions:{RGBA_OBJ:{read:function(e){return ue.isNumber(e.r)&&ue.isNumber(e.g)&&ue.isNumber(e.b)&&ue.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return ue.isNumber(e.r)&&ue.isNumber(e.g)&&ue.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return ue.isNumber(e.h)&&ue.isNumber(e.s)&&ue.isNumber(e.v)&&ue.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return ue.isNumber(e.h)&&ue.isNumber(e.s)&&ue.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],fa=void 0,Yl=void 0,ef=function(){Yl=!1;var e=arguments.length>1?ue.toArray(arguments):arguments[0];return ue.each(zE,function(t){if(t.litmus(e))return ue.each(t.conversions,function(n,i){if(fa=n.read(e),Yl===!1&&fa!==!1)return Yl=fa,fa.conversionName=i,fa.conversion=n,ue.BREAK}),ue.BREAK}),Yl},um=void 0,Ic={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(um=t*8)|e&~(255<<um)}},HE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},ki=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Bi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Qr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},rs=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},ss=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},vn=function(){function r(){if(ki(this,r),this.__state=ef.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Bi(r,[{key:"toString",value:function(){return yo(this)}},{key:"toHexString",value:function(){return yo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function oh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(vn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(vn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function ah(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(vn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(vn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}vn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ic.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")ue.extend(r.__state,Ic.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};vn.recalculateHSV=function(r){var e=Ic.rgb_to_hsv(r.r,r.g,r.b);ue.extend(r.__state,{s:e.s,v:e.v}),ue.isNaN(e.h)?ue.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};vn.COMPONENTS=["r","g","b","h","s","v","hex","a"];oh(vn.prototype,"r",2);oh(vn.prototype,"g",1);oh(vn.prototype,"b",0);ah(vn.prototype,"h");ah(vn.prototype,"s");ah(vn.prototype,"v");Object.defineProperty(vn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(vn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ic.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Ws=function(){function r(e,t){ki(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Bi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),VE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},g_={};ue.each(VE,function(r,e){ue.each(r,function(t){g_[t]=e})});var GE=/(\d+(\.\d+)?)px/;function Vi(r){if(r==="0"||ue.isUndefined(r))return 0;var e=r.match(GE);return ue.isNull(e)?0:parseFloat(e[1])}var ee={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;ue.isUndefined(s)&&(s=!0),ue.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=g_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;ue.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}ue.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),ee},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),ee},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return ee},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return ee},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Vi(t["border-left-width"])+Vi(t["border-right-width"])+Vi(t["padding-left"])+Vi(t["padding-right"])+Vi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Vi(t["border-top-width"])+Vi(t["border-bottom-width"])+Vi(t["padding-top"])+Vi(t["padding-bottom"])+Vi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},__=function(r){rs(e,r);function e(t,n){ki(this,e);var i=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return ee.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Bi(e,[{key:"setValue",value:function(n){var i=Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Ws),WE=function(r){rs(e,r);function e(t,n,i){ki(this,e);var s=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),ue.isArray(o)){var l={};ue.each(o,function(c){l[c]=c}),o=l}return ue.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),ee.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Bi(e,[{key:"setValue",value:function(n){var i=Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return ee.isActive(this.__select)?this:(this.__select.value=this.getValue(),Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Ws),XE=function(r){rs(e,r);function e(t,n){ki(this,e);var i=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),ee.bind(i.__input,"keyup",o),ee.bind(i.__input,"change",o),ee.bind(i.__input,"blur",a),ee.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Bi(e,[{key:"updateDisplay",value:function(){return ee.isActive(this.__input)||(this.__input.value=this.getValue()),Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Ws);function dm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var v_=function(r){rs(e,r);function e(t,n,i){ki(this,e);var s=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,ue.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=dm(s.__impliedStep),s}return Bi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=dm(n),this}}]),e}(Ws);function qE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Oc=function(r){rs(e,r);function e(t,n,i){ki(this,e);var s=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);ue.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){ee.unbind(window,"mousemove",d),ee.unbind(window,"mouseup",f),c()}function h(_){ee.bind(window,"mousemove",d),ee.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),ee.bind(s.__input,"change",l),ee.bind(s.__input,"blur",u),ee.bind(s.__input,"mousedown",h),ee.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Bi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():qE(this.getValue(),this.__precision),Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_);function fm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var tf=function(r){rs(e,r);function e(t,n,i,s,o){ki(this,e);var a=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),ee.bind(a.__background,"mousedown",c),ee.bind(a.__background,"touchstart",f),ee.addClass(a.__background,"slider"),ee.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),ee.bind(window,"mousemove",u),ee.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(fm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){ee.unbind(window,"mousemove",u),ee.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(ee.bind(window,"touchmove",h),ee.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(fm(m,p.left,p.right,l.__min,l.__max))}function _(){ee.unbind(window,"touchmove",h),ee.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Bi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Qr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(v_),y_=function(r){rs(e,r);function e(t,n,i){ki(this,e);var s=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,ee.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),ee.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Bi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Ws),nf=function(r){rs(e,r);function e(t,n){ki(this,e);var i=ss(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new vn(i.getValue()),i.__temp=new vn(0);var s=i;i.domElement=document.createElement("div"),ee.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",ee.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),ee.bind(i.__input,"blur",d),ee.bind(i.__selector,"mousedown",function(){ee.addClass(this,"drag").bind(window,"mouseup",function(){ee.removeClass(s.__selector,"drag")})}),ee.bind(i.__selector,"touchstart",function(){ee.addClass(this,"drag").bind(window,"touchend",function(){ee.removeClass(s.__selector,"drag")})});var o=document.createElement("div");ue.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),ue.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),ue.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),ue.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),ue.extend(o.style,{width:"100%",height:"100%",background:"none"}),hm(o,"top","rgba(0,0,0,0)","#000"),ue.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),jE(i.__hue_field),ue.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),ee.bind(i.__saturation_field,"mousedown",a),ee.bind(i.__saturation_field,"touchstart",a),ee.bind(i.__field_knob,"mousedown",a),ee.bind(i.__field_knob,"touchstart",a),ee.bind(i.__hue_field,"mousedown",l),ee.bind(i.__hue_field,"touchstart",l);function a(g){h(g),ee.bind(window,"mousemove",h),ee.bind(window,"touchmove",h),ee.bind(window,"mouseup",c),ee.bind(window,"touchend",c)}function l(g){_(g),ee.bind(window,"mousemove",_),ee.bind(window,"touchmove",_),ee.bind(window,"mouseup",u),ee.bind(window,"touchend",u)}function c(){ee.unbind(window,"mousemove",h),ee.unbind(window,"touchmove",h),ee.unbind(window,"mouseup",c),ee.unbind(window,"touchend",c),f()}function u(){ee.unbind(window,"mousemove",_),ee.unbind(window,"touchmove",_),ee.unbind(window,"mouseup",u),ee.unbind(window,"touchend",u),f()}function d(){var g=ef(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientX,x=p.clientY,v=(b-m.left)/(m.right-m.left),M=1-(x-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),v>1?v=1:v<0&&(v=0),s.__color.v=M,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientY,x=1-(b-m.top)/(m.bottom-m.top);return x>1?x=1:x<0&&(x=0),s.__color.h=x*360,s.setValue(s.__color.toOriginal()),!1}return i}return Bi(e,[{key:"updateDisplay",value:function(){var n=ef(this.getValue());if(n!==!1){var i=!1;ue.each(vn.COMPONENTS,function(a){if(!ue.isUndefined(n[a])&&!ue.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&ue.extend(this.__color.__state,n)}ue.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;ue.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,hm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),ue.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(Ws),YE=["-moz-","-o-","-webkit-","-ms-",""];function hm(r,e,t,n){r.style.background="",ue.each(YE,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function jE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var $E={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},KE=`<div id="dg-save" class="dg dialogue">

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

</div>`,ZE=function(e,t){var n=e[t];return ue.isArray(arguments[2])||ue.isObject(arguments[2])?new WE(e,t,arguments[2]):ue.isNumber(n)?ue.isNumber(arguments[2])&&ue.isNumber(arguments[3])?ue.isNumber(arguments[4])?new tf(e,t,arguments[2],arguments[3],arguments[4]):new tf(e,t,arguments[2],arguments[3]):ue.isNumber(arguments[4])?new Oc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Oc(e,t,{min:arguments[2],max:arguments[3]}):ue.isString(n)?new XE(e,t):ue.isFunction(n)?new y_(e,t,""):ue.isBoolean(n)?new __(e,t):null};function JE(r){setTimeout(r,1e3/60)}var QE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||JE,eT=function(){function r(){ki(this,r),this.backgroundElement=document.createElement("div"),ue.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),ee.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),ue.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;ee.bind(this.backgroundElement,"click",function(){e.hide()})}return Bi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),ue.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",ee.unbind(t.domElement,"webkitTransitionEnd",i),ee.unbind(t.domElement,"transitionend",i),ee.unbind(t.domElement,"oTransitionEnd",i)};ee.bind(this.domElement,"webkitTransitionEnd",n),ee.bind(this.domElement,"transitionend",n),ee.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-ee.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-ee.getHeight(this.domElement)/2+"px"}}]),r}(),tT=BE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);$E.inject(tT);var pm="dg",mm=72,gm=20,rl="Default",Sa=function(){try{return!!window.localStorage}catch{return!1}}(),Na=void 0,_m=!0,po=void 0,Gu=!1,x_=[],Xt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),ee.addClass(this.domElement,pm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=ue.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=ue.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),ue.isUndefined(n.load)?n.load={preset:rl}:n.preset&&(n.load.preset=n.preset),ue.isUndefined(n.parent)&&n.hideable&&x_.push(this),n.resizable=ue.isUndefined(n.parent)&&n.resizable,n.autoPlace&&ue.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Sa&&localStorage.getItem(mo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,sT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,of(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?ee.addClass(t.__ul,r.CLASS_CLOSED):ee.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Sa&&(i=f,f?ee.bind(window,"unload",s):ee.unbind(window,"unload",s),localStorage.setItem(mo(t,"isLocal"),f))}}}),ue.isUndefined(n.parent)){if(this.closed=n.closed||!1,ee.addClass(this.domElement,r.CLASS_MAIN),ee.makeSelectable(this.domElement,!1),Sa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(mo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,ee.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(ee.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(ee.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),ee.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);ee.addClass(l,"controller-name"),o=lh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};ee.addClass(this.__ul,r.CLASS_CLOSED),ee.addClass(o,"title"),ee.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(ue.isUndefined(n.parent)&&(_m&&(po=document.createElement("div"),ee.addClass(po,pm),ee.addClass(po,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(po),_m=!1),po.appendChild(this.domElement),ee.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||of(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},ee.bind(window,"resize",this.__resizeHandler),ee.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),ee.bind(this.__ul,"transitionend",this.__resizeHandler),ee.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&rT(this),s=function(){Sa&&localStorage.getItem(mo(t,"isLocal"))==="true"&&localStorage.setItem(mo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,ue.defer(function(){d.width-=1})}n.parent||u()};Xt.toggleHide=function(){Gu=!Gu,ue.each(x_,function(r){r.domElement.style.display=Gu?"none":""})};Xt.CLASS_AUTO_PLACE="a";Xt.CLASS_AUTO_PLACE_CONTAINER="ac";Xt.CLASS_MAIN="main";Xt.CLASS_CONTROLLER_ROW="cr";Xt.CLASS_TOO_TALL="taller-than-window";Xt.CLASS_CLOSED="closed";Xt.CLASS_CLOSE_BUTTON="close-button";Xt.CLASS_CLOSE_TOP="close-top";Xt.CLASS_CLOSE_BOTTOM="close-bottom";Xt.CLASS_DRAG="drag";Xt.DEFAULT_WIDTH=245;Xt.TEXT_CLOSED="Close Controls";Xt.TEXT_OPEN="Open Controls";Xt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===mm||r.keyCode===mm)&&Xt.toggleHide()};ee.bind(window,"keydown",Xt._keydownHandler,!1);ue.extend(Xt.prototype,{add:function(e,t){return Ua(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ua(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;ue.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&po.removeChild(this.domElement);var e=this;ue.each(this.__folders,function(t){e.removeFolder(t)}),ee.unbind(window,"keydown",Xt._keydownHandler,!1),vm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Xt(t);this.__folders[e]=n;var i=lh(this,n.domElement);return ee.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],vm(e);var t=this;ue.each(e.__folders,function(n){e.removeFolder(n)}),ue.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=ee.getOffset(e.__ul).top,n=0;ue.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=ee.getHeight(i))}),window.innerHeight-t-gm<n?(ee.addClass(e.domElement,Xt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-gm+"px"):(ee.removeClass(e.domElement,Xt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&ue.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:ue.debounce(function(){this.onResize()},50),remember:function(){if(ue.isUndefined(Na)&&(Na=new eT,Na.domElement.innerHTML=KE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;ue.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&iT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&of(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=jl(this)),e.folders={},ue.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=jl(this),rf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[rl]=jl(this,!0)),this.load.remembered[e]=jl(this),this.preset=e,sf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){ue.each(this.__controllers,function(t){this.getRoot().load.remembered?S_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),ue.each(this.__folders,function(t){t.revert(t)}),e||rf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&w_(this.__listening)},updateDisplay:function(){ue.each(this.__controllers,function(e){e.updateDisplay()}),ue.each(this.__folders,function(e){e.updateDisplay()})}});function lh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function vm(r){ee.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&ee.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function rf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function nT(r,e,t){if(t.__li=e,t.__gui=r,ue.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:a,factoryArgs:[ue.toArray(arguments)]})}if(ue.isArray(o)||ue.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Ua(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof tf){var n=new Oc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});ue.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),ee.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Oc){var i=function(o){if(ue.isNumber(t.__min)&&ue.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ua(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=ue.compose(i,t.min),t.max=ue.compose(i,t.max)}else t instanceof __?(ee.bind(e,"click",function(){ee.fakeEvent(t.__checkbox,"click")}),ee.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof y_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__button,"click")}),ee.bind(e,"mouseover",function(){ee.addClass(t.__button,"hover")}),ee.bind(e,"mouseout",function(){ee.removeClass(t.__button,"hover")})):t instanceof nf&&(ee.addClass(e,"color"),t.updateDisplay=ue.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=ue.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&rf(r.getRoot(),!0),s},t.setValue)}function S_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[rl])o=s[rl];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ua(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new nf(e,t);else{var s=[e,t].concat(n.factoryArgs);i=ZE.apply(r,s)}n.before instanceof Ws&&(n.before=n.before.__li),S_(r,i),ee.addClass(i.domElement,"c");var o=document.createElement("span");ee.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=lh(r,a,n.before);return ee.addClass(l,Xt.CLASS_CONTROLLER_ROW),i instanceof nf?ee.addClass(l,"color"):ee.addClass(l,HE(i.getValue())),nT(r,l,i),r.__controllers.push(i),i}function mo(r,e){return document.location.href+"."+e}function sf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function ym(r,e){e.style.display=r.useLocalStorage?"block":"none"}function iT(r){var e=r.__save_row=document.createElement("li");ee.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),ee.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",ee.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",ee.addClass(n,"button"),ee.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",ee.addClass(i,"button"),ee.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",ee.addClass(s,"button"),ee.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?ue.each(r.load.remembered,function(d,f){sf(r,f,f===r.preset)}):sf(r,rl,!1),ee.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Sa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(mo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),ym(r,a),ee.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,ym(r,a)})}var u=document.getElementById("dg-new-constructor");ee.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Na.hide()}),ee.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Na.show(),u.focus(),u.select()}),ee.bind(n,"click",function(){r.save()}),ee.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),ee.bind(s,"click",function(){r.revert()})}function rT(r){var e=void 0;r.__resize_handle=document.createElement("div"),ue.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){ee.removeClass(r.__closeButton,Xt.CLASS_DRAG),ee.unbind(window,"mousemove",t),ee.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,ee.addClass(r.__closeButton,Xt.CLASS_DRAG),ee.bind(window,"mousemove",t),ee.bind(window,"mouseup",n),!1}ee.bind(r.__resize_handle,"mousedown",i),ee.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function of(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function jl(r,e){var t={};return ue.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];ue.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function sT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function w_(r){r.length!==0&&QE.call(window,function(){w_(r)}),ue.each(r,function(e){e.updateDisplay()})}var oT=Xt;function xm(r,e){if(e===dy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===jd||e===Wg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===jd)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class aT extends ea{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new fT(t)}),this.register(function(t){return new hT(t)}),this.register(function(t){return new wT(t)}),this.register(function(t){return new bT(t)}),this.register(function(t){return new MT(t)}),this.register(function(t){return new mT(t)}),this.register(function(t){return new gT(t)}),this.register(function(t){return new _T(t)}),this.register(function(t){return new vT(t)}),this.register(function(t){return new dT(t)}),this.register(function(t){return new yT(t)}),this.register(function(t){return new pT(t)}),this.register(function(t){return new ST(t)}),this.register(function(t){return new xT(t)}),this.register(function(t){return new cT(t)}),this.register(function(t){return new ET(t)}),this.register(function(t){return new TT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Oa.extractUrlBase(e);o=Oa.resolveURL(c,this.path)}else o=Oa.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new c_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===b_){try{o[yt.KHR_BINARY_GLTF]=new AT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[yt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new zT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case yt.KHR_MATERIALS_UNLIT:o[d]=new uT;break;case yt.KHR_DRACO_MESH_COMPRESSION:o[d]=new CT(s,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:o[d]=new RT;break;case yt.KHR_MESH_QUANTIZATION:o[d]=new PT;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function lT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class cT{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Je(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Gn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new u_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Vx(u),c.distance=d;break;case"spot":c=new zx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),fr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class uT{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return Ms}extendParams(e,t,n){const i=[];e.color=new Je(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Gn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Sn))}return Promise.all(i)}}class dT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class fT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new St(a,a)}return Promise.all(s)}}class hT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class pT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class mT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Gn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Sn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class gT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class _T{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(a[0],a[1],a[2],Gn),Promise.all(s)}}class vT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class yT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(a[0],a[1],a[2],Gn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Sn)),Promise.all(s)}}class xT{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class ST{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ir}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class wT{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class bT{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class MT{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class ET{constructor(e){this.name=yt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class TT{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==pi.TRIANGLES&&c.mode!==pi.TRIANGLE_STRIP&&c.mode!==pi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new ht,m=new G,p=new is,b=new G(1,1,1),x=new vx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,g.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const M=l[v];x.instanceColor=new Kd(M.array,M.itemSize,M.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);Kt.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),h.push(x)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const b_="glTF",ha=12,Sm={JSON:1313821514,BIN:5130562};class AT{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==b_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ha,s=new DataView(e,ha);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Sm.JSON){const c=new Uint8Array(e,ha+o,a);this.content=n.decode(c)}else if(l===Sm.BIN){const c=ha+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class CT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=af[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=af[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=To[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Gn,f)})})}}class RT{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class PT{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}}class M_ extends _l{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,b=1-m,x=p-f+d;for(let v=0;v!==a;v++){const M=o[g+v+a],C=o[g+v+l]*u,E=o[_+v+a],P=o[_+v]*u;s[v]=b*M+x*C+m*E+p*P}return s}}const LT=new is;class DT extends M_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return LT.fromArray(s).normalize().toArray(s),s}}const pi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},To={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wm={9728:Vn,9729:ai,9984:Ug,9985:dc,9986:ya,9987:gr},bm={33071:kr,33648:Cc,10497:ko},Wu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},af={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Or={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},IT={CUBICSPLINE:void 0,LINEAR:nl,STEP:tl},Xu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function OT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new th({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mr})),r.DefaultMaterial}function hs(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function fr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function NT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function UT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function FT(r){let e;const t=r.extensions&&r.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qu(t.attributes):e=r.indices+":"+qu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qu(r.targets[n]);return e}function qu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function lf(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function kT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const BT=new ht;class zT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new lT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new kx(this.options.manager):this.textureLoader=new Xx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new c_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return hs(s,a,i),fr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Oa.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Wu[i.type],a=To[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Nt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Wu[i.type],c=To[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(b);x||(g=new c(a,p*h,i.count*h/u),x=new hx(g,h/u),t.cache.add(b,x)),m=new Zf(x,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Nt(g,l,_);if(i.sparse!==void 0){const p=Wu.SCALAR,b=To[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,M=new b(o[1],x,i.sparse.count*p),C=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Nt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=M.length;E<P;E++){const w=M[E];if(m.setX(w,C[E*l]),l>=2&&m.setY(w,C[E*l+1]),l>=3&&m.setZ(w,C[E*l+2]),l>=4&&m.setW(w,C[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=wm[f.magFilter]||ai,u.minFilter=wm[f.minFilter]||gr,u.wrapS=bm[f.wrapS]||ko,u.wrapT=bm[f.wrapT]||ko,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Vn&&u.minFilter!==ai,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new dn(g);m.needsUpdate=!0,f(m)}),t.load(Oa.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),fr(d,o),d.userData.mimeType=o.mimeType||kT(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[yt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new s_,Ki.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new r_,Ki.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return th}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[yt.KHR_MATERIALS_UNLIT]){const d=i[yt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Je(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Gn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Sn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=_i);const u=s.alphaMode||Xu.OPAQUE;if(u===Xu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Xu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ms&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new St(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Ms&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ms){const d=s.emissiveFactor;a.emissive=new Je().setRGB(d[0],d[1],d[2],Gn)}return s.emissiveTexture!==void 0&&o!==Ms&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Sn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),fr(d,s),t.associations.set(d,{materials:e}),s.extensions&&hs(i,d,s),d})}createUniqueName(e){const t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Mm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=FT(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=Mm(new bi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?OT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const b=c[h];if(m.mode===pi.TRIANGLES||m.mode===pi.TRIANGLE_STRIP||m.mode===pi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new mx(g,b):new Hn(g,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===pi.TRIANGLE_STRIP?p.geometry=xm(p.geometry,Wg):m.mode===pi.TRIANGLE_FAN&&(p.geometry=xm(p.geometry,jd));else if(m.mode===pi.LINES)p=new Sx(g,b);else if(m.mode===pi.LINE_STRIP)p=new eh(g,b);else if(m.mode===pi.LINE_LOOP)p=new wx(g,b);else if(m.mode===pi.POINTS)p=new Jd(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&UT(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),fr(p,s),m.extensions&&hs(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&hs(i,d[0],s),d[0];const f=new vr;s.extensions&&hs(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qn(ky.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),fr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new ht;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jf(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let b=0,x=f.length;b<x;b++){const v=f[b],M=h[b],C=_[b],E=g[b],P=m[b];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const w=n._createAnimationTracks(v,M,C,E,P);if(w)for(let y=0;y<w.length;y++)p.push(w[y])}return new Lx(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,BT)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new n_:c.length>1?u=new vr:c.length===1?u=c[0]:u=new Kt,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),fr(u,s),s.extensions&&hs(n,u,s),s.matrix!==void 0){const d=new ht;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new vr;n.name&&(s.name=i.createUniqueName(n.name)),fr(s,n),n.extensions&&hs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof Ki||f instanceof dn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Or[s.path]===Or.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Or[s.path]){case Or.weights:c=Ho;break;case Or.rotation:c=Vo;break;case Or.translation:case Or.scale:c=Go;break;default:switch(n.itemSize){case 1:c=Ho;break;case 2:case 3:default:c=Go;break}break}const u=i.interpolation!==void 0?IT[i.interpolation]:nl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Or[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=lf(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Vo?DT:M_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function HT(r,e,t){const n=e.attributes,i=new Ui;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new G(l[0],l[1],l[2]),new G(c[0],c[1],c[2])),a.normalized){const u=lf(To[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new G,l=new G;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=lf(To[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new nr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Mm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=af[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Et.workingColorSpace!==Gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Et.workingColorSpace}" not supported.`),fr(r,e),HT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?NT(r,e.targets,t):r})}const VT="/content/dam/acsorg/150/assets/models/globe-hd.glb";function GT(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=25e3;function t(){const S=document.querySelector("#events");if(!S)return!0;const k=S.getBoundingClientRect(),J=window.innerHeight*1.2;return k.top>J}const n=document.getElementById("shaderBackground");if(!n)return;window.specialColorsActive=!1,window.colorPhase=1;let i,s;Xh(()=>Promise.resolve().then(()=>bA),void 0).then(S=>{i=S.default,Xh(()=>Promise.resolve().then(()=>VA),void 0).then(k=>{s=k.default,i.registerPlugin(s),o(i)})}).catch(S=>{console.error("Error loading GSAP:",S)});function o(S,k){let B,J,fe,se,Pe,Re,Oe,it;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(T&&T.color1&&T.color2&&(B=T.color1.value.clone(),J=T.color2.value.clone(),fe=T.waveSpeed.value,se=T.waveAmplitude.value,Pe=T.waveFrequency.value,Re=T.ambientLight.value,Oe=T.directionalLight.value,it=T.yOffset.value),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:Pt=>{T&&T.colorDarkness&&(T.colorDarkness.value=Pt.progress*2,T.colorDarkness.value>=1.95?window.colorPhase===1&&(T.color1&&T.color1.value.set(B),T.color2&&T.color2.value.set(J),window.specialColorsActive=!0):B&&J&&window.colorPhase===1&&(T.color1&&T.color1.value.copy(B),T.color2&&T.color2.value.copy(J),window.specialColorsActive=!1),l())}}}),setTimeout(()=>{a(S)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:Pt=>{const xt=Pt.progress;O&&(xt>.01&&!O.visible?(O.visible=!0,D.visible=!0,d()):xt<=.01&&O.visible&&(O.visible=!1,D.visible=!1,d()),O.visible&&(O.traverse(ut=>{ut.isMesh&&ut.material&&(ut.material.transparent=!0,ut.material.opacity=xt)}),D.opacity=xt,u())),P&&(xt>.01&&!P.visible?(P.visible=!0,w.enabled=!0,f()):xt<=.01&&P.visible&&(P.visible=!1,w.enabled=!1,f()),E&&E.uniforms&&(xt>.01&&P.visible?(E.uniforms.startOpacity.value=w.startOpacity*xt,E.uniforms.endOpacity.value=w.endOpacity*xt):(E.uniforms.startOpacity.value=0,E.uniforms.endOpacity.value=0)))}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:Pt=>{const xt=Pt.progress,ut=.15;if(!window.particlesFullyHidden&&xt>=ut?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&xt<ut*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){we&&we.uniforms&&we.uniforms.opacity&&(we.uniforms.opacity.value=0,rr());return}const zt=1-Math.min(xt/ut,1),zi=.5*Math.pow(zt,3);we&&we.uniforms&&we.uniforms.opacity&&(we.uniforms.opacity.value=zi,rr())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:Pt=>{const xt=Pt.progress;if(C){const Ht=-322+120*(1-Math.pow(1-xt,3));if(C.position.y=Ht,Y&&Y.__folders["Globe Model Controls"]){const sn=Y.__folders["Globe Model Controls"].__folders.Position;if(sn&&sn.__controllers){for(let zi of sn.__controllers)if(zi.property==="positionY"){zi.updateDisplay();break}}}}}}}),S.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:Pt=>{if(!T||!T.color1||!T.color2)return;const xt=Pt.progress,ut=2,zt=ut+(.2-ut)*xt;T&&T.waveSpeed&&(T.waveSpeed.value=zt);const Ht=3,zi=Ht+(1-Ht)*xt;T&&T.waveAmplitude&&(T.waveAmplitude.value=zi);const Hi=2.2,hv=Hi+(1-Hi)*xt;if(T&&T.waveFrequency&&(T.waveFrequency.value=hv),ps(),xt>.1){const pv=new Je("#32c2d6"),mv=new Je("#004199"),gv=new Je("#ff4848"),_v=new Je("#3f00f5"),au=Math.min(1,(xt-.1)/.9),Hh=au*au*(3-2*au),vv=pv.clone().lerp(gv,Hh),yv=mv.clone().lerp(_v,Hh);T.color1.value.copy(vv),T.color2.value.copy(yv),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c()}else T.color1.value.set("#32c2d6"),T.color2.value.set("#004199"),window.colorPhase=1,r=Date.now(),window.specialColorsActive=!0,c()}}}),S.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:Pt=>{if(!T||!T.color1||!T.color2)return;const xt=Pt.progress;xt>.1?(T.color1.value.set("#dcfff6"),T.color2.value.set("#5dff9d"),T.yOffset&&(T.yOffset.value=-.05),T.ambientLight.value=.4,T.directionalLight.value=.4,T.waveAmplitude.value=1.2,T.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,c(),ao(),ps()):xt<=.1&&window.colorPhase===3&&(T.time.value=0,T.color1.value.set("#ff4848"),T.color2.value.set("#3f00f5"),T.yOffset&&it!==void 0&&(T.yOffset.value=it),Re!==void 0&&(T.ambientLight.value=Re),Oe!==void 0&&(T.directionalLight.value=Oe),T.waveSpeed.value=.2,T.waveAmplitude.value=1,T.waveFrequency.value=1,window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c(),ao(),ps()),l()}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:Pt=>{const ut=1-Pt.progress,Bt=Math.pow(ut,3);O&&(O.visible=!0,O.traverse(zt=>{zt.isMesh&&zt.material&&(Array.isArray(zt.material)?zt.material.forEach(Ht=>{Ht.transparent=!0,Ht.opacity=Bt,Ht.depthWrite=Bt>.1,Ht.blending=Yr,Ht.needsUpdate=!0}):(zt.material.transparent=!0,zt.material.opacity=Bt,zt.material.depthWrite=Bt>.1,zt.material.blending=Yr,zt.material.needsUpdate=!0))}),Bt<.01&&(O.visible=!1),D.opacity=Bt,D.rotationPaused=Bt<.01,u()),P&&E&&E.uniforms&&(P.visible=Bt>.01,E.uniforms.startOpacity.value=w.startOpacity*Bt,E.uniforms.endOpacity.value=w.endOpacity*Bt,w.enabled=Bt>.01,f())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:Pt=>{Pt.progress<=.1&&fe!==void 0&&window.colorPhase===1&&(T.waveSpeed&&(T.waveSpeed.value=fe),T.waveAmplitude&&(T.waveAmplitude.value=se),T.waveFrequency&&(T.waveFrequency.value=Pe),T.ambientLight&&(T.ambientLight.value=Re),T.directionalLight&&(T.directionalLight.value=Oe),T.yOffset&&(T.yOffset.value=it),ao(),ps())}}});function rr(Pt){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Particle System"]){const xt=Y.__folders["Particle System"];if(xt&&xt.__controllers){for(let ut of xt.__controllers)if(ut.property==="value"&&ut.object===we.uniforms.opacity){ut.updateDisplay();break}}}}}function a(S,k,B,J){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{a(S)});return}S.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:se=>{T&&T.colorDarkness&&(T.colorDarkness.value=2-se.progress*2,window.colorPhase===3?(T.color1&&T.color1.value.set("#dcfff6"),T.color2&&T.color2.value.set("#5dff9d"),T.ambientLight&&(T.ambientLight.value=.4),T.directionalLight&&(T.directionalLight.value=.4),T.waveSpeed&&(T.waveSpeed.value=.9),T.waveAmplitude&&(T.waveAmplitude.value=1.2),window.specialColorsActive=!0,c(),ao(),ps()):window.colorPhase===2?(T.color1&&T.color1.value.set("#ff4848"),T.color2&&T.color2.value.set("#3f00f5"),originalAmbientLight!==void 0&&T.ambientLight&&(T.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&T.directionalLight&&(T.directionalLight.value=originalDirectionalLight),originalWaveAmplitude!==void 0&&T.waveAmplitude&&(T.waveAmplitude.value=originalWaveAmplitude),window.specialColorsActive=!0,c(),ao(),ps()):(T.color1&&T.color1.value.set("#32c2d6"),T.color2&&T.color2.value.set("#004199"),originalAmbientLight!==void 0&&T.ambientLight&&(T.ambientLight.value=originalAmbientLight),originalDirectionalLight!==void 0&&T.directionalLight&&(T.directionalLight.value=originalDirectionalLight),originalWaveSpeed!==void 0&&T.waveSpeed&&(T.waveSpeed.value=originalWaveSpeed),originalWaveAmplitude!==void 0&&T.waveAmplitude&&(T.waveAmplitude.value=originalWaveAmplitude),originalWaveFrequency!==void 0&&T.waveFrequency&&(T.waveFrequency.value=originalWaveFrequency),window.specialColorsActive=!0,c(),ao(),ps()),l())}}})}function l(){const S=window.gui,k=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const B=S.__folders["Color Controls"];if(B&&B.__controllers){for(let J of B.__controllers)if(J.property==="value"&&J.object===k.colorDarkness){J.updateDisplay();break}}}}function c(){const S=window.gui,k=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const B=S.__folders["Color Controls"];B&&B.__controllers&&B.__controllers.forEach(J=>{if(J.property==="color"&&J.__color){if(J.property==="color"&&J.__li&&J.__li.querySelector(".property-name").textContent==="Color 1"){const se="#"+k.color1.value.getHexString();J.setValue(se)}else if(J.property==="color"&&J.__li&&J.__li.querySelector(".property-name").textContent==="Color 2"){const se="#"+k.color2.value.getHexString();J.setValue(se)}}})}}function u(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]&&Y.__folders["Globe Model Controls"].__folders&&Y.__folders["Globe Model Controls"].__folders.Material){const S=Y.__folders["Globe Model Controls"].__folders.Material;if(S&&S.__controllers)for(let k of S.__controllers)k.property==="opacity"&&k.updateDisplay()}}function d(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]){const S=Y.__folders["Globe Model Controls"];if(S&&S.__controllers){for(let k of S.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function f(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Gradient Overlay Controls"]){const S=Y.__folders["Gradient Overlay Controls"];if(S&&S.__controllers){for(let k of S.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function h(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const _=window.innerWidth,g=h();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100vh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";const m=new kE({canvas:n,alpha:!0});m.setSize(_,g),m.setPixelRatio(window.devicePixelRatio);const p=new yp,b=new yp;let x=0;const v={zoom:2.471,zPosition:1},M=new Qc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);M.position.z=v.zPosition,M.zoom=v.zoom,M.updateProjectionMatrix();const C=new vr;C.position.y=-322,C.frustumCulled=!0,p.add(C);let E,P;const w={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function y(){E=new yi({transparent:!0,uniforms:{startOpacity:{value:w.startOpacity},endOpacity:{value:w.endOpacity},overlayColor:{value:new Je(w.color)},offsetY:{value:w.offsetY},heightMultiplier:{value:w.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:_i});const S=window.innerHeight,k=M.right-M.left,B=M.top-M.bottom,J=S*.66*(B/S),fe=new Ci(k,J);P=new Hn(fe,E),P.rotation.set(0,0,0),P.position.x=0,P.position.y=w.yOffset*B,P.position.z=-100,P.frustumCulled=!1,P.renderOrder=9999,P.visible=w.enabled,p.add(P)}function L(){if(!P)return;P.rotation.set(0,0,0),P.position.x=0;const S=M.top-M.bottom;P.position.y=w.yOffset*S,P.position.z=-100}y();const D={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},z=new aT;let O;z.load(VT,S=>{O=S.scene;let B=new Ui().setFromObject(O).getCenter(new G),J=new vr;J.add(O),O.position.set(-B.x,-B.y,-B.z),O=J,O.visible=D.visible,O.frustumCulled=!0,O.traverse(Pe=>{Pe.isMesh&&(Pe.frustumCulled=!0)}),C.add(O),O.position.set(D.positionX,D.positionY,D.positionZ),O.rotation.set(D.rotationX*Math.PI/180,D.rotationY*Math.PI/180,D.rotationZ*Math.PI/180),D.responsive?He():(O.scale.set(D.scale,D.scale,D.scale),st());const fe=at.addFolder("Material");let se=0;O.traverse(Pe=>{if(Pe.isMesh&&Pe.material){const Re=Pe.material;if(se++,Re.isMeshStandardMaterial||Re.isMeshPhongMaterial){Re.metalness!==void 0&&fe.add({metalness:Re.metalness},"metalness",0,1).name(`Metalness${se>1?" "+se:""}`).onChange(it=>{Re.metalness=it}),Re.roughness!==void 0&&fe.add({roughness:Re.roughness},"roughness",0,1).name(`Roughness${se>1?" "+se:""}`).onChange(it=>{Re.roughness=it}),Re.shininess!==void 0&&fe.add({shininess:Re.shininess},"shininess",0,100).name(`Shininess${se>1?" "+se:""}`).onChange(it=>{Re.shininess=it}),fe.add({opacity:Re.opacity},"opacity",0,1).name(`Opacity${se>1?" "+se:""}`).onChange(it=>{Re.opacity=it,Re.transparent=it<1});const Oe=Re.emissive?"#"+Re.emissive.getHexString():"#000000";fe.addColor({color:Oe},"color").name(`Emissive Color${se>1?" "+se:""}`).onChange(it=>{Re.emissive&&Re.emissive.set(it)})}}})},S=>{},S=>{}),window.uniforms={time:{value:0},resolution:{value:new St(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new Je(3326678)},color2:{value:new Je(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:0},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.6},flowDirection:{value:new St(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new G(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const T=window.uniforms,W=`
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
  `,Z=`
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
  `,q=new Ci(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),pe=new yi({vertexShader:W,fragmentShader:Z,uniforms:T,transparent:!0,side:_i}),N=new Hn(q,pe);p.add(N),window.gui=new oT({width:300,closed:!0});const Y=window.gui;Y.domElement.style.position="absolute",Y.domElement.style.top="10px",Y.domElement.style.right="10px";const je=Y.domElement.querySelector(".close-button");je&&(je.innerHTML="Open Controls",je.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=Y.closed?"Open Controls":"Close Controls"},50)}));const tt=Y.addFolder("Camera Controls");tt.add(v,"zoom",.1,5).name("Zoom Level").step(.001).onChange(S=>{M.zoom=S,M.updateProjectionMatrix()}),tt.close();const te=Y.addFolder("Animation Speed Controls");te.add(T.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(S=>{T.mainSpeed.value=S}),te.add(T.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(S=>{T.waveSpeed.value=S}),te.add(T.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(S=>{T.noiseSpeed.value=S}),te.add(T.colorCycleSpeed,"value",1e-4,5).name("Color Cycle Speed").step(1e-4).onChange(S=>{T.colorCycleSpeed.value=S}),te.open();const le=Y.addFolder("Color Controls"),Le="#"+T.color1.value.getHexString(),ge="#"+T.color2.value.getHexString();le.addColor({color:Le},"color").name("Color 1").onChange(S=>{typeof S=="string"?T.color1.value.set(S):T.color1.value.setRGB(S.r/255,S.g/255,S.b/255)}),le.addColor({color:ge},"color").name("Color 2").onChange(S=>{typeof S=="string"?T.color2.value.set(S):T.color2.value.setRGB(S.r/255,S.g/255,S.b/255)}),le.add(T.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(S=>{T.colorDarkness.value=S}),le.add(T.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(S=>{T.colorWaveInfluence.value=S}),le.add(T.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(S=>{T.colorFrequencyShift.value=S}),le.add(T.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(S=>{T.colorAmplitudeEffect.value=S}),le.open();const Ee=Y.addFolder("Wave Controls");Ee.add(T.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(S=>{T.waveAmplitude.value=S}),Ee.add(T.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(S=>{T.waveFrequency.value=S}),Ee.add(T.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(S=>{T.waveDepth.value=S}),Ee.add(T.noiseScale,"value",0,5).name("Noise Scale").onChange(S=>{T.noiseScale.value=S}),Ee.add(T.noiseInfluence,"value",0,1).name("Noise Influence").onChange(S=>{T.noiseInfluence.value=S}),Ee.add(T.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(S=>{T.layerOffset.value=S});const Qe=Ee.addFolder("Flow Direction");Qe.add(T.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(S=>{T.flowDirection.value.x=S}),Qe.add(T.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(S=>{T.flowDirection.value.y=S});const xe=Y.addFolder("Appearance Controls"),lt=Y.addFolder("Film Noise Controls");lt.add(T.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(S=>{T.filmNoiseIntensity.value=S}),lt.add(T.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(S=>{T.filmNoiseSpeed.value=S}),lt.add(T.filmGrainSize,"value",.5,50).name("Grain Size").onChange(S=>{T.filmGrainSize.value=S}),lt.add(T.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(S=>{T.filmScratchIntensity.value=S}),xe.add(T.xOffset,"value",-1,1).step(.001).name("X Position").onChange(S=>{T.xOffset.value=S}),xe.add(T.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(S=>{T.yOffset.value=S}),xe.add(T.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(S=>{T.fadeWidth.value=S}),xe.add(T.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(S=>{T.topEdgeSoftness.value=S}),xe.add(T.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(S=>{T.bottomEdgeSoftness.value=S}),xe.add(T.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(S=>{T.leftEdgeSoftness.value=S}),xe.add(T.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(S=>{T.rightEdgeSoftness.value=S}),xe.add(T.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(S=>{T.leftCornerRoundness.value=S}),xe.add(T.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(S=>{T.rightCornerRoundness.value=S}),xe.add(T.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(S=>{T.edgeDepth.value=S}),xe.add(T.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(S=>{T.edgeContrast.value=S}),xe.add(T.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(S=>{T.edgeNoiseAmount.value=S}),xe.add(T.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(S=>{T.edgeNoiseScale.value=S});const ct=Y.addFolder("Bottom Wave Edge Controls");ct.add(T.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(S=>{T.bottomWaveEnabled.value=S,O&&D.responsive&&st()}),ct.add(T.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(S=>{T.bottomWaveDepth.value=S,O&&D.responsive&&st()}),ct.add(T.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(S=>{T.bottomWaveWidth.value=S}),ct.add(T.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(S=>{T.bottomWaveSpeed.value=S}),ct.add(T.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(S=>{T.bottomWaveOffset.value=S});const Be=Y.addFolder("Lighting Controls");Be.add(T.ambientLight,"value",0,1).name("Ambient Light").onChange(S=>{T.ambientLight.value=S}),Be.add(T.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(S=>{T.directionalLight.value=S}),Be.add(T.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(S=>{T.specularStrength.value=S}),Be.add(T.shininess,"value",1,128).name("Shininess").onChange(S=>{T.shininess.value=S});const F=Be.addFolder("Light Direction");F.add(T.lightDirection.value,"x",-1,1).name("X").onChange(()=>{T.lightDirection.value.normalize()}),F.add(T.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{T.lightDirection.value.normalize()}),F.add(T.lightDirection.value,"z",0,1).name("Z").onChange(()=>{T.lightDirection.value.normalize()});const at=Y.addFolder("Globe Model Controls"),rt=new u_(16777215,10);rt.position.set(1,1,1),p.add(rt);const j=new Wx(16777215,.5);p.add(j);const Ue=at.addFolder("Lighting");Ue.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(S=>{rt.intensity=S}),rt.intensity=3,Ue.add({intensity:j.intensity},"intensity",0,5).name("Ambient Light").onChange(S=>{j.intensity=S}),at.add(D,"visible").name("Show Globe").onChange(S=>{O&&(O.visible=S)}),at.add(D,"scale",.1,50).name("Size").step(.1).onChange(S=>{O&&(D.baseScale=S,O.scale.set(S,S,S))}),at.add(D,"responsive").name("Responsive Size").onChange(S=>{!S&&O?O.scale.set(D.baseScale,D.baseScale,D.baseScale):S&&He()}),at.add({resizeGlobe:function(){O&&He()}},"resizeGlobe").name("Force Resize"),at.add({positionBehindWave:function(){O&&st()}},"positionBehindWave").name("Position Behind Wave");function st(){if(!O)return;const S=window.innerWidth,k=window.innerHeight;if(S<=640){O.position.y=192,O.position.z=-10;for(let se=0;se<Fe.__controllers.length;se++){const Pe=Fe.__controllers[se];Pe.property==="positionY"?Pe.setValue(192):Pe.property==="positionZ"&&Pe.setValue(-10)}return}if(S>640&&S<=1024){O.position.y=192,O.position.z=-10;for(let Pe=0;Pe<Fe.__controllers.length;Pe++){const Re=Fe.__controllers[Pe];Re.property==="positionY"?Re.setValue(192):Re.property==="positionZ"&&Re.setValue(-10)}return}const B=T.bottomWaveEnabled.value,J=T.bottomWaveDepth.value,fe=T.edgeDepth.value;if(B){const se=k*J*fe*.5,Re=(M.top-M.bottom)/M.zoom/k,Oe=-se*Re-k*.1*Re,it=-10;O.position.y=Oe,O.position.z=it;for(let bt=0;bt<Fe.__controllers.length;bt++){const xn=Fe.__controllers[bt];xn.property==="positionY"?xn.setValue(Oe):xn.property==="positionZ"&&xn.setValue(it)}}}function He(){if(!O||!D.responsive)return;const S=window.innerWidth,k=S*.9,B={x:O.scale.x,y:O.scale.y,z:O.scale.z};try{O.scale.set(1,1,1),O.updateMatrixWorld(!0);const J=new Ui().setFromObject(O),fe=J.max.x-J.min.x;O.scale.set(B.x,B.y,B.z);const Pe=(M.right-M.left)/M.zoom/S,Oe=k*Pe/fe;O.scale.set(Oe,Oe,Oe);for(let it=0;it<at.__controllers.length;it++)if(at.__controllers[it].property==="scale"){at.__controllers[it].setValue(Oe);break}st()}catch(J){console.error("Error updating globe size:",J),O.scale.set(B.x,B.y,B.z)}}const Fe=at.addFolder("Position");Fe.add(D,"positionX",-500,500).name("X Position").step(1).onChange(S=>{O&&(O.position.x=S)}),Fe.add(D,"positionY",-500,500).name("Y Position").step(1).onChange(S=>{O&&(O.position.y=S)}),Fe.add(D,"positionZ",-500,500).name("Z Position").step(1).onChange(S=>{O&&(O.position.z=S)});const Tt=at.addFolder("Rotation");Tt.add(D,"rotationX",0,360).name("X Rotation").step(1).onChange(S=>{O&&(O.rotation.x=S*Math.PI/180)}),Tt.add(D,"rotationY",0,360).name("Y Rotation").step(1).onChange(S=>{O&&(O.rotation.y=S*Math.PI/180)}),Tt.add(D,"rotationZ",0,360).name("Z Rotation").step(1).onChange(S=>{O&&(O.rotation.z=S*Math.PI/180)}),at.add(D,"autoRotate").name("Auto Rotate").onChange(S=>{D.autoRotate=S}),at.add(D,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(S=>{D.baseRotateSpeed=S}),at.add(D,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(S=>{D.scrollRotateSpeed=S}),at.open();const I=Y.addFolder("Gradient Overlay Controls");I.add(w,"enabled").name("Show Overlay").onChange(S=>{P&&(P.visible=S)});const A=I.add(w,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(S=>{E&&(E.uniforms.startOpacity.value=S)});A.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const X=I.add(w,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(S=>{E&&(E.uniforms.endOpacity.value=S)});X.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",I.add(w,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(S=>{P&&L()}),I.add(w,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(S=>{E&&(E.uniforms.offsetY.value=S)}),I.add(w,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(S=>{E&&(E.uniforms.heightMultiplier.value=S)}),I.addColor(w,"color").name("Color").onChange(S=>{E&&E.uniforms.overlayColor.value.set(S)}),I.add({debugOverlay:function(){if(E){const S=E.uniforms.startOpacity.value,k=E.uniforms.endOpacity.value;E.uniforms.startOpacity.value=1,E.uniforms.endOpacity.value=1,E.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{E.uniforms.startOpacity.value=S,E.uniforms.endOpacity.value=k,E.uniforms.overlayColor.value.set(w.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),I.open();let ne=276,ie=new Float32Array(ne*3),Q=new Float32Array(ne*3),ve=new Float32Array(ne*3),_e=0,Ve=0;const re={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let ae=window.innerHeight*re.verticalSpread;function Se(){const S=new Float32Array(ne);for(let k=0;k<ne;k++){const B=k*3,J=Math.random(),fe=re.sizeMin+J*(re.sizeMax-re.sizeMin);S[k]=fe/we.uniforms.baseSize.value;const se=new Je(Te.color),Pe=.8+J*.6;ve[B]=se.r*Pe,ve[B+1]=se.g*Pe,ve[B+2]=se.b*Pe}be.setAttribute("size",new Nt(S,1)),be.attributes.position.needsUpdate=!0,be.attributes.color.needsUpdate=!0,be.attributes.size.needsUpdate=!0}for(let S=0;S<ne;S++){const k=S*3;ie[k]=(Math.random()-.5)*window.innerWidth,ie[k+1]=(Math.random()-.5)*ae+re.verticalOffset,ie[k+2]=Math.random()*500-250,Q[k]=(Math.random()-.5)*.5,Q[k+1]=(Math.random()-.5)*.5,Q[k+2]=(Math.random()-.5)*.2;const B=new Je("#25e5ff");ve[k]=B.r,ve[k+1]=B.g,ve[k+2]=B.b}const be=new bi;be.setAttribute("position",new Nt(ie,3)),be.setAttribute("color",new Nt(ve,3));const $e=ye();function ye(){const S=document.createElement("canvas");S.width=256,S.height=256;const k=S.getContext("2d"),B=k.createRadialGradient(S.width/2,S.height/2,0,S.width/2,S.height/2,S.width/2);B.addColorStop(0,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),B.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),B.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),B.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),B.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=B,k.fillRect(0,0,S.width,S.height),k.beginPath(),k.moveTo(S.width/2,S.width*.3),k.lineTo(S.width/2,S.width*.7),k.moveTo(S.width*.3,S.height/2),k.lineTo(S.width*.7,S.height/2),k.moveTo(S.width*.35,S.height*.35),k.lineTo(S.width*.65,S.height*.65),k.moveTo(S.width*.65,S.height*.35),k.lineTo(S.width*.35,S.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const J=k.createRadialGradient(S.width/2,S.height/2,S.width*.2,S.width/2,S.height/2,S.width*.7);J.addColorStop(0,"rgba(255, 255, 255, 0.3)"),J.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),J.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=J,k.fillRect(0,0,S.width,S.height);const fe=new dn(S);return fe.needsUpdate=!0,fe}const we=new yi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:$e},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),U=new Jd(be,we);U.frustumCulled=!0,b.add(U);const me=Y.addFolder("Particle System"),ce={count:ne};me.add(ce,"count",100,1e3,10).name("Particle Count").onChange(S=>{ne=Math.floor(S);const k=new Float32Array(ne*3),B=new Float32Array(ne*3),J=new Float32Array(ne*3);for(let fe=0;fe<ne;fe++){const se=fe*3;if(fe<ie.length/3)k[se]=ie[se],k[se+1]=ie[se+1],k[se+2]=ie[se+2],B[se]=Q[se],B[se+1]=Q[se+1],B[se+2]=Q[se+2],J[se]=ve[se],J[se+1]=ve[se+1],J[se+2]=ve[se+2];else{k[se]=(Math.random()-.5)*window.innerWidth,k[se+1]=(Math.random()-.5)*ae+re.verticalOffset,k[se+2]=Math.random()*500-250,B[se]=(Math.random()-.5)*.5,B[se+1]=(Math.random()-.5)*.5,B[se+2]=(Math.random()-.5)*.2;const Pe=new Je(Te.color);J[se]=Pe.r,J[se+1]=Pe.g,J[se+2]=Pe.b}}ie=k,Q=B,ve=J,be.setAttribute("position",new Nt(ie,3)),be.setAttribute("color",new Nt(ve,3)),be.attributes.position.needsUpdate=!0,be.attributes.color.needsUpdate=!0,Se()});const Te={color:"#25e5ff"};me.addColor(Te,"color").name("Particle Color").onChange(S=>{const k=new Je(S);for(let B=0;B<ne;B++){const J=B*3;ve[J]=k.r,ve[J+1]=k.g,ve[J+2]=k.b}be.setAttribute("color",new Nt(ve,3)),be.attributes.color.needsUpdate=!0}),me.add(we.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(S=>{Se()}),me.add(we.uniforms.opacity,"value",0,1,.1).name("Opacity"),me.add(we.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(S=>{we.uniforms.brightness.value=S});const de={intensity:1.5};me.add(de,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(S=>{we.uniforms.opacity.value=S});const oe={enabled:!1},ze=me.add(oe,"enabled").name("Size Attenuation").onChange(S=>{S?we.vertexShader=`
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
        `:we.vertexShader=`
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
        `,we.needsUpdate=!0,Se()}),Ge=document.createElement("div");Ge.className="gui-tooltip",Ge.textContent="When enabled, particles appear smaller as they move further away",Ge.style.position="absolute",Ge.style.backgroundColor="rgba(0,0,0,0.8)",Ge.style.color="#fff",Ge.style.padding="5px",Ge.style.borderRadius="3px",Ge.style.fontSize="11px",Ge.style.zIndex="10000",Ge.style.display="none",document.body.appendChild(Ge);const wt=ze.domElement;wt.addEventListener("mouseenter",S=>{const k=wt.getBoundingClientRect();Ge.style.left=k.right+"px",Ge.style.top=k.top+"px",Ge.style.display="block"}),wt.addEventListener("mouseleave",()=>{Ge.style.display="none"});let De=0;window.addEventListener("scroll",()=>{_e=window.scrollY});let Ae=[],nt={x:0,y:0},Me={x:0,y:0},ot=0,qe=0,et=!1,qt=150;const ke={enabled:!0,spawnRate:.455,maxParticles:120,baseSize:1.8,fadeInSpeed:.75,fadeOutSpeed:1,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffset:.22,minLifetime:1.5,maxLifetime:5},dt=new bi,Zt=new yi({uniforms:{baseSize:{value:ke.baseSize},map:{value:$e},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Ac,depthWrite:!1,depthTest:!1}),Dt=new Jd(dt,Zt);b.add(Dt);function Rt(S,k){const B=S/window.innerWidth*2-1,J=-(k/window.innerHeight)*2+1,fe=B*(M.right-M.left)/2/M.zoom,se=J*(M.top-M.bottom)/2/M.zoom;return{x:fe,y:se}}function At(S,k){return{id:ot++,position:{x:S,y:k,z:Math.random()*100-50},targetPosition:{x:S,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:ke.minLifetime+Math.random()*(ke.maxLifetime-ke.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function pn(){if(Ae.length===0){dt.attributes.position&&(dt.setAttribute("position",new Nt(new Float32Array(0),3)),dt.setAttribute("color",new Nt(new Float32Array(0),3)),dt.setAttribute("size",new Nt(new Float32Array(0),1)),dt.setAttribute("opacity",new Nt(new Float32Array(0),1)));return}const S=new Float32Array(Ae.length*3),k=new Float32Array(Ae.length*3),B=new Float32Array(Ae.length),J=new Float32Array(Ae.length);for(let fe=0;fe<Ae.length;fe++){const se=Ae[fe],Pe=fe*3;S[Pe]=se.position.x,S[Pe+1]=se.position.y,S[Pe+2]=se.position.z,k[Pe]=se.color.r,k[Pe+1]=se.color.g,k[Pe+2]=se.color.b,B[fe]=se.size,J[fe]=se.opacity}dt.setAttribute("position",new Nt(S,3)),dt.setAttribute("color",new Nt(k,3)),dt.setAttribute("size",new Nt(B,1)),dt.setAttribute("opacity",new Nt(J,1)),dt.attributes.position.needsUpdate=!0,dt.attributes.color.needsUpdate=!0,dt.attributes.size.needsUpdate=!0,dt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",S=>{if(!ke.enabled)return;Me.x=nt.x,Me.y=nt.y,nt.x=S.clientX,nt.y=S.clientY;const k=nt.x-Me.x,B=nt.y-Me.y,J=Math.sqrt(k*k+B*B);if(et||(qe+=J,qe>=qt&&(et=!0)),et&&J>1&&Ae.length<ke.maxParticles&&Math.random()<ke.spawnRate){const fe=Rt(nt.x,nt.y),se=ke.spawnOffset*50,Pe=Math.random()*Math.PI*2,Re=Math.cos(Pe)*se*Math.random(),Oe=Math.sin(Pe)*se*Math.random(),it=At(fe.x+Re,fe.y+Oe);Ae.push(it)}});function kt(){if(Ae.length===0)return;const S=Rt(nt.x,nt.y);for(let k=Ae.length-1;k>=0;k--){const B=Ae[k];B.life+=.016,B.targetPosition.x=S.x,B.targetPosition.y=S.y;const J=B.trailSpeed*ke.trailLength;B.position.x+=(B.targetPosition.x-B.position.x)*J,B.position.y+=(B.targetPosition.y-B.position.y)*J,B.position.x+=(Math.random()-.5)*2*ke.jitterAmount,B.position.y+=(Math.random()-.5)*2*ke.jitterAmount;const fe=B.life/B.maxLife;if(fe<.15){B.fadePhase="in";const se=fe/.15,Pe=1-Math.pow(1-se,2);B.opacity=Pe*ke.fadeInSpeed}else if(fe<.65)B.fadePhase="hold",B.opacity=ke.fadeInSpeed;else{B.fadePhase="out";const se=(fe-.65)/.35,Pe=Math.pow(1-se,2);B.opacity=Pe*ke.fadeInSpeed*ke.fadeOutSpeed}(B.life>=B.maxLife||B.opacity<=0)&&Ae.splice(k,1)}pn()}const It=Y.addFolder("Mouse Follow Particles");It.add(ke,"enabled").name("Enable Mouse Particles").onChange(S=>{S||(Ae=[],pn(),et=!1,qe=0)}),It.add(ke,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(S=>{ke.spawnRate=S}),It.add(ke,"maxParticles",10,50,1).name("Max Particles").onChange(S=>{for(ke.maxParticles=S;Ae.length>S;)Ae.pop();pn()}),It.add(ke,"baseSize",2,10,.5).name("Particle Size").onChange(S=>{Zt.uniforms.baseSize.value=S}),It.add(ke,"trailLength",.1,1,.1).name("Trail Length").onChange(S=>{ke.trailLength=S}),It.add(ke,"speedVariation",0,1,.1).name("Speed Variation").onChange(S=>{ke.speedVariation=S}),It.add(ke,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(S=>{ke.jitterAmount=S}),It.add(ke,"spawnOffset",0,1,.05).name("Spawn Offset").onChange(S=>{ke.spawnOffset=S}),It.add(ke,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(S=>{ke.fadeInSpeed=S}),It.add(ke,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(S=>{ke.fadeOutSpeed=S}),It.add({movementThreshold:qt},"movementThreshold",50,300,10).name("Initial Movement Needed").onChange(S=>{qt=S}),It.add({resetActivation:function(){et=!1,qe=0,Ae=[],pn()}},"resetActivation").name("Reset Activation"),It.close();function Wn(){const S=be.attributes.position.array,k=re.previousOffset||0,B=re.verticalOffset-k;re.previousOffset=re.verticalOffset;for(let J=0;J<ne;J++){const fe=J*3;S[fe+1]+=B;const se=S[fe+1]-re.verticalOffset,Pe=ae/2;se>Pe?S[fe+1]=-Pe+re.verticalOffset:se<-Pe&&(S[fe+1]=Pe+re.verticalOffset)}be.attributes.position.needsUpdate=!0}function Jt(){const S=be.attributes.position.array,k=be.attributes.color.array,B=be.attributes.size?be.attributes.size.array:null;De+=.01;const J=(_e-Ve)*re.scrollSpeed;if(Ve=_e*(1-re.damping)+Ve*re.damping,!window.particlesMovementPaused){for(let fe=0;fe<ne;fe++){const se=fe*3,Pe=B?(B[fe]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Re=re.floatSpeed*(.5+Pe*.5);S[se]+=Q[se]*Re,S[se+1]+=Q[se+1]*Re,S[se+2]+=Q[se+2]*Re,S[se+1]+=J*(.5+Pe*.5),Math.abs(S[se])>window.innerWidth/2&&(Q[se]*=-1);const Oe=S[se+1]-re.verticalOffset,it=ae/2;Oe>it?S[se+1]=-it+re.verticalOffset:Oe<-it&&(S[se+1]=it+re.verticalOffset),Math.abs(S[se+2])>250&&(Q[se+2]*=-1)}be.attributes.position.needsUpdate=!0}for(let fe=0;fe<ne;fe++){const se=fe*3,Pe=B?(B[fe]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Re=new Je(Te.color),Oe=.2*Math.sin(De+fe*.1)+.9,it=.8+Pe*.6;k[se]=Re.r*Oe*it,k[se+1]=Re.g*Oe*it,k[se+2]=Re.b*Oe*it}be.attributes.color.needsUpdate=!0,requestAnimationFrame(Jt)}Jt();function Qt(){if(requestAnimationFrame(Qt),T.time.value+=.001,t()&&Date.now()-r>e&&(console.log("Timeout reached while above Phase 3 trigger (25s), resetting time uniform to prevent background weirdness"),T.time.value=0,r=Date.now()),kt(),!window.particlesFullyHidden&&we.uniforms.opacity.value<x&&(we.uniforms.opacity.value+=.002,we.uniforms.opacity.value>x&&(we.uniforms.opacity.value=x)),window.particlesFullyHidden&&we.uniforms.opacity.value>0&&(we.uniforms.opacity.value=0),O&&D.autoRotate&&!D.rotationPaused){const S=We?D.scrollRotateSpeed:D.baseRotateSpeed;O.rotation.y+=S*.01}P&&(P.rotation.set(0,0,0),L()),m.autoClear=!0,m.render(p,M),(!window.particlesFullyHidden||Ae.length>0&&ke.enabled)&&(m.autoClear=!1,m.render(b,M))}Qt(),document.addEventListener("veryEarlyParticleFade",()=>{x=.1}),document.addEventListener("particleFadeStart",()=>{x=.3}),document.addEventListener("heroAnimationComplete",()=>{x=.5});function R(){if(P){const S=window.innerHeight,k=M.right-M.left,J=(M.top-M.bottom)/S,fe=k,se=S*.66*J;P.geometry.dispose(),P.geometry=new Ci(fe,se),P.rotation.set(0,0,0),L()}}let V,K;function $(){const S=window.innerWidth,k=h();if(m.setSize(S,k),M.left=-S/2,M.right=S/2,M.top=k/2,M.bottom=-k/2,M.updateProjectionMatrix(),T.resolution.value.set(S,k),N.geometry.dispose(),N.geometry=new Ci(S,k,S/10,k/10),ae=k*re.verticalSpread,typeof Y<"u"&&Y&&Y.__folders["Particle System"]){const B=Y.__folders["Particle System"];if(B&&B.__controllers){for(let J=0;J<B.__controllers.length;J++)if(B.__controllers[J].property==="verticalOffset"){B.__controllers[J].min(-k*3),B.__controllers[J].max(k*2);break}}}if(O&&D.responsive){clearTimeout(K),K=setTimeout(()=>{He()},150);for(let B=0;B<Fe.__controllers.length;B++){const J=Fe.__controllers[B];J.property==="positionX"?(J.min(-S/2),J.max(S/2)):J.property==="positionY"&&(J.min(-k/2),J.max(k/2))}}R()}window.addEventListener("resize",()=>{clearTimeout(V),clearTimeout(K),O&&D.responsive&&(K=setTimeout(()=>{He()},150)),V=setTimeout($,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(V),clearTimeout(K),O&&D.responsive&&(K=setTimeout(()=>{He()},300)),V=setTimeout($,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(K);const S=window.innerWidth,k=h();window.lastKnownDimensions||(window.lastKnownDimensions={width:S,height:k});const B=Math.abs(S-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,J=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;B>.05||J>.05?(window.lastKnownDimensions.width=S,window.lastKnownDimensions.height=k,O&&D.responsive&&(K=setTimeout(()=>{He()},150)),setTimeout($,100)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:h()}});let H=h();function he(){const S=h();Math.abs(S-H)>50&&($(),H=S),requestAnimationFrame(he)}he(),window.addEventListener("keydown",S=>{if((S.key==="+"||S.key==="=")&&(v.zoom=Math.min(v.zoom+.1,5),M.zoom=v.zoom,M.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}if((S.key==="-"||S.key==="_")&&(v.zoom=Math.max(v.zoom-.1,.1),M.zoom=v.zoom,M.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}}),me.add(re,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(S=>{re.scrollSpeed=S}),me.add(re,"damping",.8,.99,.01).name("Scroll Damping").onChange(S=>{re.damping=S}),me.add(re,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(S=>{const k=ae;ae=window.innerHeight*S;const B=ae/k,J=be.attributes.position.array;for(let fe=0;fe<ne;fe++){const se=fe*3,Re=(J[se+1]-re.verticalOffset)*B;J[se+1]=Re+re.verticalOffset,Math.abs(Re)>ae/2&&(J[se+1]=(Math.random()-.5)*ae+re.verticalOffset)}be.attributes.position.needsUpdate=!0}),me.add(re,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(S=>{re.previousOffset===void 0&&(re.previousOffset=0),re.verticalOffset=S,Wn()}),me.add(re,"sizeMin",1,5,.01).name("Min Particle Size").onChange(S=>{if(re.sizeMin=S,re.sizeMin>=re.sizeMax&&(re.sizeMax=re.sizeMin+1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMax"){k.__controllers[B].updateDisplay();break}}}Se()}),me.add(re,"sizeMax",5,10,.01).name("Max Particle Size").onChange(S=>{if(re.sizeMax=S,re.sizeMax<=re.sizeMin&&(re.sizeMin=re.sizeMax-1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMin"){k.__controllers[B].updateDisplay();break}}}Se()}),me.add(re,"floatSpeed",.1,3,.1).name("Float Speed").onChange(S=>{re.floatSpeed=S}),Se();const Ce=be.attributes.position.array;for(let S=0;S<ne;S++){const k=S*3;Ce[k+1]=(Math.random()-.5)*ae+re.verticalOffset}be.attributes.position.needsUpdate=!0,me.add(we.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(S=>{we.uniforms.haloStrength.value=S}),me.add(we.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(S=>{we.uniforms.haloSize.value=S});let We=!1,Ie;window.addEventListener("scroll",()=>{We=!0,Ie&&clearTimeout(Ie),Ie=setTimeout(()=>{We=!1},150)})}function ao(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function ps(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}else console.log("WARNING: Wave Controls folder not found")}function hr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function E_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ci={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Wo={duration:.5,overwrite:!1,delay:0},ch,Mn,Yt,xi=1e8,Gt=1/xi,cf=Math.PI*2,WT=cf/4,XT=0,T_=Math.sqrt,qT=Math.cos,YT=Math.sin,yn=function(e){return typeof e=="string"},en=function(e){return typeof e=="function"},Er=function(e){return typeof e=="number"},uh=function(e){return typeof e>"u"},tr=function(e){return typeof e=="object"},jn=function(e){return e!==!1},dh=function(){return typeof window<"u"},$l=function(e){return en(e)||yn(e)},A_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ln=Array.isArray,uf=/(?:-?\.?\d|\.)+/gi,C_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Yu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,R_=/[+-]=-?[.\d]+/,P_=/[^,'"\[\]\s]+/gi,jT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,jt,Gi,df,fh,ui={},Nc={},L_,D_=function(e){return(Nc=Xo(e,ui))&&Jn},hh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},sl=function(e,t){return!t&&console.warn(e)},I_=function(e,t){return e&&(ui[e]=t)&&Nc&&(Nc[e]=t)||ui},ol=function(){return 0},$T={suppressEvents:!0,isStart:!0,kill:!1},vc={suppressEvents:!0,kill:!1},KT={suppressEvents:!0},ph={},$r=[],ff={},O_,ii={},ju={},Em=30,yc=[],mh="",gh=function(e){var t=e[0],n,i;if(tr(t)||en(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=yc.length;i--&&!yc[i].targetTest(t););n=yc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new r0(e[i],n)))||e.splice(i,1);return e},Ps=function(e){return e._gsap||gh(Si(e))[0]._gsap},N_=function(e,t,n){return(n=e[t])&&en(n)?e[t]():uh(n)&&e.getAttribute&&e.getAttribute(t)||n},$n=function(e,t){return(e=e.split(",")).forEach(t)||e},tn=function(e){return Math.round(e*1e5)/1e5||0},ln=function(e){return Math.round(e*1e7)/1e7||0},Ao=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},ZT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Uc=function(){var e=$r.length,t=$r.slice(0),n,i;for(ff={},$r.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},U_=function(e,t,n,i){$r.length&&!Mn&&Uc(),e.render(t,n,Mn&&t<0&&(e._initted||e._startAt)),$r.length&&!Mn&&Uc()},F_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(P_).length<2?t:yn(e)?e.trim():e},k_=function(e){return e},di=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},JT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Xo=function(e,t){for(var n in t)e[n]=t[n];return e},Tm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=tr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Fc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Fa=function(e){var t=e.parent||jt,n=e.keyframes?JT(Ln(e.keyframes)):di;if(jn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},QT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},B_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},tu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},es=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ls=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},e1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},hf=function(e,t,n,i){return e._startAt&&(Mn?e._startAt.revert(vc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},t1=function r(e){return!e||e._ts&&r(e.parent)},Am=function(e){return e._repeat?qo(e._tTime,e=e.duration()+e._rDelay)*e:0},qo=function(e,t){var n=Math.floor(e=ln(e/t));return e&&n===e?n-1:n},kc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},nu=function(e){return e._end=ln(e._start+(e._tDur/Math.abs(e._ts||e._rts||Gt)||0))},iu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=ln(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),nu(e),n._dirty||Ls(n,e)),e},z_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=kc(e.rawTime(),t),(!t._dur||vl(0,t.totalDuration(),n)-t._tTime>Gt)&&t.render(n,!0)),Ls(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Gt}},qi=function(e,t,n,i){return t.parent&&es(t),t._start=ln((Er(n)?n:n||e!==jt?hi(e,n,t):e._time)+t._delay),t._end=ln(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),B_(e,t,"_first","_last",e._sort?"_start":0),pf(t)||(e._recent=t),i||z_(e,t),e._ts<0&&iu(e,e._tTime),e},H_=function(e,t){return(ui.ScrollTrigger||hh("scrollTrigger",t))&&ui.ScrollTrigger.create(t,e)},V_=function(e,t,n,i,s){if(vh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Mn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&O_!==si.frame)return $r.push(e),e._lazy=[s,i],1},n1=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},pf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},i1=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&n1(e)&&!(!e._initted&&pf(e))||(e._ts<0||e._dp._ts<0)&&!pf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=vl(0,e._tDur,t),u=qo(l,a),e._yoyo&&u&1&&(o=1-o),u!==qo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Mn||i||e._zTime===Gt||!t&&e._zTime){if(!e._initted&&V_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Gt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&hf(e,t,n,!0),e._onUpdate&&!n&&li(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&li(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&es(e,1),!n&&!Mn&&(li(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},r1=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Yo=function(e,t,n,i){var s=e._repeat,o=ln(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:ln(o*(s+1)+e._rDelay*s):o,a>0&&!i&&iu(e,e._tTime=e._tDur*a),e.parent&&nu(e),n||Ls(e.parent,e),e},Cm=function(e){return e instanceof wn?Ls(e):Yo(e,e._dur)},s1={_start:0,endTime:ol,totalDuration:ol},hi=function r(e,t,n){var i=e.labels,s=e._recent||s1,o=e.duration()>=xi?s.endTime(!1):e._dur,a,l,c;return yn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Ln(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},ka=function(e,t,n){var i=Er(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=jn(l.vars.inherit)&&l.parent;o.immediateRender=jn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new nn(t[0],o,t[s+1])},os=function(e,t){return e||e===0?t(e):t},vl=function(e,t,n){return n<e?e:n>t?t:n},Rn=function(e,t){return!yn(e)||!(t=jT.exec(e))?"":t[1]},o1=function(e,t,n){return os(n,function(i){return vl(e,t,i)})},mf=[].slice,G_=function(e,t){return e&&tr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&tr(e[0]))&&!e.nodeType&&e!==Gi},a1=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return yn(i)&&!t||G_(i,1)?(s=n).push.apply(s,Si(i)):n.push(i)})||n},Si=function(e,t,n){return Yt&&!t&&Yt.selector?Yt.selector(e):yn(e)&&!n&&(df||!jo())?mf.call((t||fh).querySelectorAll(e),0):Ln(e)?a1(e,n):G_(e)?mf.call(e,0):e?[e]:[]},gf=function(e){return e=Si(e)[0]||sl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Si(t,n.querySelectorAll?n:n===e?sl("Invalid scope")||fh.createElement("div"):e)}},W_=function(e){return e.sort(function(){return .5-Math.random()})},X_=function(e){if(en(e))return e;var t=tr(e)?e:{each:e},n=Ds(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return yn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,b,x,v,M,C,E,P,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,xi])[1],!w){for(E=-xi;E<(E=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=o[g]=[],p=l?Math.min(w,g)*u-.5:i%w,b=w===xi?0:l?g*d/w-.5:i/w|0,E=0,P=xi,C=0;C<g;C++)x=C%w-p,v=b-(C/w|0),m[C]=M=c?Math.abs(c==="y"?v:x):T_(x*x+v*v),M>E&&(E=M),M<P&&(P=M);i==="random"&&W_(m),m.max=E-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Rn(t.amount||t.each)||0,n=n&&g<0?t0(n):n}return g=(m[f]-m.min)/m.max||0,ln(m.b+(n?n(g):g)*m.v)+m.u}},_f=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=ln(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Er(n)?0:Rn(n))}},q_=function(e,t){var n=Ln(e),i,s;return!n&&tr(e)&&(i=n=e.radius||xi,e.values?(e=Si(e.values),(s=!Er(e[0]))&&(i*=i)):e=_f(e.increment)),os(t,n?en(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=xi,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Er(o)?u:u+Rn(o)}:_f(e))},Y_=function(e,t,n,i){return os(Ln(e)?!t:n===!0?!!(n=0):!i,function(){return Ln(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},l1=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},c1=function(e,t){return function(n){return e(parseFloat(n))+(t||Rn(n))}},u1=function(e,t,n){return $_(e,t,0,1,n)},j_=function(e,t,n){return os(n,function(i){return e[~~t(i)]})},d1=function r(e,t,n){var i=t-e;return Ln(e)?j_(e,r(0,e.length),t):os(n,function(s){return(i+(s-e)%i)%i+e})},f1=function r(e,t,n){var i=t-e,s=i*2;return Ln(e)?j_(e,r(0,e.length-1),t):os(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},al=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?P_:uf),n+=e.substr(t,i-t)+Y_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},$_=function(e,t,n,i,s){var o=t-e,a=i-n;return os(s,function(l){return n+((l-e)/o*a||0)})},h1=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=yn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Ln(e)&&!Ln(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Xo(Ln(e)?[]:{},e));if(!u){for(l in t)_h.call(a,e,l,"get",t[l]);s=function(_){return Sh(_,a)||(o?e.p:e)}}}return os(n,s)},Rm=function(e,t,n){var i=e.labels,s=xi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},li=function(e,t,n){var i=e.vars,s=i[t],o=Yt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&$r.length&&Uc(),a&&(Yt=a),u=l?s.apply(c,l):s.call(c),Yt=o,u},wa=function(e){return es(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Mn),e.progress()<1&&li(e,"onInterrupt"),e},So,K_=[],Z_=function(e){if(e)if(e=!e.name&&e.default||e,dh()||e.headless){var t=e.name,n=en(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ol,render:Sh,add:_h,kill:R1,modifier:C1,rawVars:0},o={targetTest:0,get:0,getSetter:xh,aliases:{},register:0};if(jo(),e!==i){if(ii[t])return;di(i,di(Fc(e,s),o)),Xo(i.prototype,Xo(s,Fc(e,o))),ii[i.prop=t]=i,e.targetTest&&(yc.push(i),ph[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}I_(t,i),e.register&&e.register(Jn,i,Kn)}else K_.push(e)},Vt=255,ba={aqua:[0,Vt,Vt],lime:[0,Vt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Vt],navy:[0,0,128],white:[Vt,Vt,Vt],olive:[128,128,0],yellow:[Vt,Vt,0],orange:[Vt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Vt,0,0],pink:[Vt,192,203],cyan:[0,Vt,Vt],transparent:[Vt,Vt,Vt,0]},$u=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Vt+.5|0},J_=function(e,t,n){var i=e?Er(e)?[e>>16,e>>8&Vt,e&Vt]:0:ba.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ba[e])i=ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Vt,i&Vt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Vt,e&Vt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(uf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=$u(l+1/3,s,o),i[1]=$u(l,s,o),i[2]=$u(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(C_),n&&i.length<4&&(i[3]=1),i}else i=e.match(uf)||ba.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Vt,o=i[1]/Vt,a=i[2]/Vt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Q_=function(e){var t=[],n=[],i=-1;return e.split(Kr).forEach(function(s){var o=s.match(xo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Pm=function(e,t,n){var i="",s=(e+i).match(Kr),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=J_(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Q_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Kr,"1").split(xo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Kr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Kr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ba)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),p1=/hsl[a]?\(/,e0=function(e){var t=e.join(" "),n;if(Kr.lastIndex=0,Kr.test(t))return n=p1.test(t),e[1]=Pm(e[1],n),e[0]=Pm(e[0],n,Q_(e[1])),!0},ll,si=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,b=m===!0,x,v,M,C;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,x=M-o,(x>0||b)&&(C=++d.frame,f=M-d.time*1e3,d.time=M=M/1e3,o+=x+(x>=s?4:s-x),v=1),b||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](M,f,C,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){L_&&(!df&&dh()&&(Gi=df=window,fh=Gi.document||{},ui.gsap=Jn,(Gi.gsapVersions||(Gi.gsapVersions=[])).push(Jn.version),D_(Nc||Gi.GreenSockGlobals||!Gi.gsap&&Gi||{}),K_.forEach(Z_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},ll=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ll=0,c=ol},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,b){var x=p?function(v,M,C,E){m(v,M,C,E),d.remove(x)}:m;return d.remove(m),a[b?"unshift":"push"](x),jo(),x},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),jo=function(){return!ll&&si.wake()},Mt={},m1=/^[\d.\-M][\d.\-,\s]/,g1=/["']/g,_1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(g1,"").trim():+c,i=l.substr(a+1).trim();return t},v1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},y1=function(e){var t=(e+"").split("("),n=Mt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[_1(t[1])]:v1(e).split(",").map(F_)):Mt._CE&&m1.test(e)?Mt._CE("",e):n},t0=function(e){return function(t){return 1-e(1-t)}},n0=function r(e,t){for(var n=e._first,i;n;)n instanceof wn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Ds=function(e,t){return e&&(en(e)?e:Mt[e]||y1(e))||t},Xs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return $n(e,function(a){Mt[a]=ui[a]=s,Mt[o=a.toLowerCase()]=n;for(var l in s)Mt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Mt[a+"."+l]=s[l]}),s},i0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ku=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/cf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*YT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:i0(a);return s=cf/s,l.config=function(c,u){return r(e,c,u)},l},Zu=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:i0(n);return i.config=function(s){return r(e,s)},i};$n("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Xs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Mt.Linear.easeNone=Mt.none=Mt.Linear.easeIn;Xs("Elastic",Ku("in"),Ku("out"),Ku());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Xs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Xs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Xs("Circ",function(r){return-(T_(1-r*r)-1)});Xs("Sine",function(r){return r===1?1:-qT(r*WT)+1});Xs("Back",Zu("in"),Zu("out"),Zu());Mt.SteppedEase=Mt.steps=ui.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Gt;return function(a){return((i*vl(0,o,a)|0)+s)*n}}};Wo.ease=Mt["quad.out"];$n("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return mh+=r+","+r+"Params,"});var r0=function(e,t){this.id=XT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:N_,this.set=t?t.getSetter:xh},cl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Yo(this,+t.duration,1,1),this.data=t.data,Yt&&(this._ctx=Yt,Yt.data.push(this)),ll||si.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Yo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(jo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(iu(this,n),!s._dp||s.parent||z_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&qi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Gt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),U_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Am(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Am(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?qo(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Gt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?kc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Gt?0:this._rts,this.totalTime(vl(-Math.abs(this._delay),this._tDur,s),i!==!1),nu(this),e1(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(jo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Gt&&(this._tTime-=Gt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&qi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(jn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?kc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=KT);var i=Mn;return Mn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Mn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Cm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Cm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(hi(this,n),jn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,jn(i)),this._dur||(this._zTime=-Gt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Gt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Gt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Gt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=en(n)?n:k_,a=function(){var c=i.then;i.then=null,en(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){wa(this)},r}();di(cl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Gt,_prom:0,_ps:!1,_rts:1});var wn=function(r){E_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=jn(n.sortChildren),jt&&qi(n.parent||jt,hr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&H_(hr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return ka(0,arguments,this),this},t.from=function(i,s,o){return ka(1,arguments,this),this},t.fromTo=function(i,s,o,a){return ka(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Fa(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new nn(i,s,hi(this,o),1),this},t.call=function(i,s,o){return qi(this,nn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new nn(i,o,hi(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Fa(o).immediateRender=jn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Fa(a).immediateRender=jn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:ln(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,b,x,v,M,C,E;if(this!==jt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,x=this._ts,p=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=ln(u%m),u===l?(g=this._repeat,f=c):(M=ln(u/m),g=~~M,g&&g===M&&(f=c,g--),f>c&&(f=c)),M=qo(this._tTime,m),!a&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),C&&g&1&&(f=c-f,E=1),g!==M&&!this._lock){var P=C&&M&1,w=P===(C&&g&1);if(g<M&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:ln(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&li(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;n0(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=r1(this,ln(a),ln(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(li(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=-Gt);break}}h=_}else{h=this._last;for(var y=i<0?i:f;h;){if(_=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||Mn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=y?-Gt:Gt);break}}h=_}}if(b&&!s&&(this.pause(),b.render(f>=a?0:-Gt)._zTime=f>=a?1:-1,this._ts))return this._start=v,nu(this),this.render(i,s,o);this._onUpdate&&!s&&li(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&es(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(li(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Er(s)||(s=hi(this,s,i)),!(i instanceof cl)){if(Ln(i))return i.forEach(function(a){return o.add(a,s)}),this;if(yn(i))return this.addLabel(i,s);if(en(i))i=nn.delayedCall(0,i);else return this}return this!==i?qi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-xi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof nn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return yn(i)?this.removeLabel(i):en(i)?this.killTweensOf(i):(i.parent===this&&tu(this,i),i===this._recent&&(this._recent=this._last),Ls(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ln(si.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=hi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=nn.delayedCall(0,s||ol,o);return a.data="isPause",this._hasPause=1,qi(this,a,hi(this,i))},t.removePause=function(i){var s=this._first;for(i=hi(this,i);s;)s._start===i&&s.data==="isPause"&&es(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)zr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Si(i),l=this._first,c=Er(s),u;l;)l instanceof nn?ZT(l._targets,a)&&(c?(!zr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=hi(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=nn.to(o,di({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Gt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Yo(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,di({startAt:{time:hi(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Rm(this,hi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Rm(this,hi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Gt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ls(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ls(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=xi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,qi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Yo(o,o===jt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(jt._ts&&(U_(jt,kc(i,jt)),O_=si.frame),si.frame>=Em){Em+=ci.autoSleep||120;var s=jt._first;if((!s||!s._ts)&&ci.autoSleep&&si._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||si.sleep()}}},e}(cl);di(wn.prototype,{_lock:0,_hasPause:0,_forcing:0});var x1=function(e,t,n,i,s,o,a){var l=new Kn(this._pt,e,t,0,1,u0,null,s),c=0,u=0,d,f,h,_,g,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=al(i)),o&&(b=[n,i],o(b,e,t),n=b[0],i=b[1]),f=n.match(Yu)||[];d=Yu.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Ao(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Yu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(R_.test(i)||p)&&(l.e=0),this._pt=l,l},_h=function(e,t,n,i,s,o,a,l,c,u){en(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:en(d)?c?e[t.indexOf("set")||!en(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=en(d)?c?E1:l0:yh,_;if(yn(i)&&(~i.indexOf("random(")&&(i=al(i)),i.charAt(1)==="="&&(_=Ao(f,i)+(Rn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||vf)return!isNaN(f*i)&&i!==""?(_=new Kn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?A1:c0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&hh(t,i),x1.call(this,e,t,f,i,h,l||ci.stringFilter,c))},S1=function(e,t,n,i,s){if(en(e)&&(e=Ba(e,s,t,n,i)),!tr(e)||e.style&&e.nodeType||Ln(e)||A_(e))return yn(e)?Ba(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Ba(e[a],s,t,n,i);return o},s0=function(e,t,n,i,s,o){var a,l,c,u;if(ii[e]&&(a=new ii[e]).init(s,a.rawVars?t[e]:S1(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Kn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==So))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},zr,vf,vh=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,x=e._overwrite==="auto"&&!ch,v=e.timeline,M,C,E,P,w,y,L,D,z,O,T,W,Z;if(v&&(!f||!s)&&(s="none"),e._ease=Ds(s,Wo.ease),e._yEase=d?t0(Ds(d===!0?s:d,Wo.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(D=m[0]?Ps(m[0]).harness:0,W=D&&i[D.prop],M=Fc(i,ph),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?vc:$T),g._lazy=0),o){if(es(e._startAt=nn.set(m,di({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&jn(l),startAt:null,delay:0,onUpdate:c&&function(){return li(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Mn||!a&&!h)&&e._startAt.revert(vc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=di({overwrite:!1,data:"isFromStart",lazy:a&&!g&&jn(l),immediateRender:a,stagger:0,parent:p},M),W&&(E[D.prop]=W),es(e._startAt=nn.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Mn?e._startAt.revert(vc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Gt,Gt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&jn(l)||l&&!_,C=0;C<m.length;C++){if(w=m[C],L=w._gsap||gh(m)[C]._gsap,e._ptLookup[C]=O={},ff[L.id]&&$r.length&&Uc(),T=b===m?C:b.indexOf(w),D&&(z=new D).init(w,W||M,e,T,b)!==!1&&(e._pt=P=new Kn(e._pt,w,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(q){O[q]=P}),z.priority&&(y=1)),!D||W)for(E in M)ii[E]&&(z=s0(E,M,e,T,w,b))?z.priority&&(y=1):O[E]=P=_h.call(e,w,E,"get",M[E],T,b,0,i.stringFilter);e._op&&e._op[C]&&e.kill(w,e._op[C]),x&&e._pt&&(zr=e,jt.killTweensOf(w,O,e.globalTime(t)),Z=!e.parent,zr=0),e._pt&&l&&(ff[L.id]=1)}y&&d0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Z,f&&t<=0&&v.render(xi,!0,!0)},w1=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return vf=1,e.vars[t]="+=0",vh(e,a),vf=0,l?sl(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=tn(n)+Rn(d.e)),d.b&&(d.b=u.s+Rn(d.b))},b1=function(e,t){var n=e[0]?Ps(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Xo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},M1=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Ln(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Ba=function(e,t,n,i,s){return en(e)?e.call(t,n,i,s):yn(e)&&~e.indexOf("random(")?al(e):e},o0=mh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",a0={};$n(o0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return a0[r]=1});var nn=function(r){E_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Fa(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||jt,x=(Ln(n)||A_(n)?Er(n[0]):"length"in i)?[n]:Si(n),v,M,C,E,P,w,y,L;if(a._targets=x.length?gh(x):sl("GSAP target "+n+" not found. https://gsap.com",!ci.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||$l(c)||$l(u)){if(i=a.vars,v=a.timeline=new wn({data:"nested",defaults:g||{},targets:b&&b.data==="nested"?b.vars.targets:x}),v.kill(),v.parent=v._dp=hr(a),v._start=0,f||$l(c)||$l(u)){if(E=x.length,y=f&&X_(f),tr(f))for(P in f)~o0.indexOf(P)&&(L||(L={}),L[P]=f[P]);for(M=0;M<E;M++)C=Fc(i,a0),C.stagger=0,p&&(C.yoyoEase=p),L&&Xo(C,L),w=x[M],C.duration=+Ba(c,hr(a),M,w,x),C.delay=(+Ba(u,hr(a),M,w,x)||0)-a._delay,!f&&E===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(w,C,y?y(M,w,x):0),v._ease=Mt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Fa(di(v.vars.defaults,{ease:"none"})),v._ease=Ds(_.ease||i.ease||"none");var D=0,z,O,T;if(Ln(_))_.forEach(function(W){return v.to(x,W,">")}),v.duration();else{C={};for(P in _)P==="ease"||P==="easeEach"||M1(P,_[P],C,_.easeEach);for(P in C)for(z=C[P].sort(function(W,Z){return W.t-Z.t}),D=0,M=0;M<z.length;M++)O=z[M],T={ease:O.e,duration:(O.t-(M?z[M-1].t:0))/100*c},T[P]=O.v,v.to(x,T,D),D+=T.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!ch&&(zr=hr(a),jt.killTweensOf(x),zr=0),qi(b,hr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===ln(b._time)&&jn(d)&&t1(hr(a))&&b.data!=="nested")&&(a._tTime=-Gt,a.render(Math.max(0,-u)||0)),m&&H_(hr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Gt&&!u?l:i<Gt?0:i,f,h,_,g,m,p,b,x,v;if(!c)i1(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=ln(d%g),d===l?(_=this._repeat,f=c):(m=ln(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=qo(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(x&&this._yEase&&n0(x,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(ln(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(V_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!s&&!_&&(li(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&hf(this,i,s,o),li(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&li(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&hf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&es(this,1),!s&&!(u&&!a)&&(d||a||p)&&(li(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){ll||si.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||vh(this,c),u=this._ease(c/this._dur),w1(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(iu(this,0),this.parent||B_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Mn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,zr&&zr.vars.overwrite!==!0)._first||wa(this),this.parent&&o!==this.timeline.totalDuration()&&Yo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Si(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&QT(a,l))return s==="all"&&(this._pt=0),wa(this);for(d=this._op=this._op||[],s!=="all"&&(yn(s)&&(g={},$n(s,function(b){return g[b]=1}),s=g),s=b1(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&tu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&wa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ka(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return ka(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return jt.killTweensOf(i,s,o)},e}(cl);di(nn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});$n("staggerTo,staggerFrom,staggerFromTo",function(r){nn[r]=function(){var e=new wn,t=mf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var yh=function(e,t,n){return e[t]=n},l0=function(e,t,n){return e[t](n)},E1=function(e,t,n,i){return e[t](i.fp,n)},T1=function(e,t,n){return e.setAttribute(t,n)},xh=function(e,t){return en(e[t])?l0:uh(e[t])&&e.setAttribute?T1:yh},c0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},A1=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},u0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Sh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},C1=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},R1=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?tu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},P1=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},d0=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Kn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||c0,this.d=l||this,this.set=c||yh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=P1,this.m=n,this.mt=s,this.tween=i},r}();$n(mh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ph[r]=1});ui.TweenMax=ui.TweenLite=nn;ui.TimelineLite=ui.TimelineMax=wn;jt=new wn({sortChildren:!1,defaults:Wo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ci.stringFilter=e0;var Is=[],xc={},L1=[],Lm=0,D1=0,Ju=function(e){return(xc[e]||L1).map(function(t){return t()})},yf=function(){var e=Date.now(),t=[];e-Lm>2&&(Ju("matchMediaInit"),Is.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Gi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Ju("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Lm=e,Ju("matchMedia"))},f0=function(){function r(t,n){this.selector=n&&gf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=D1++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){en(n)&&(s=i,i=n,n=en);var o=this,a=function(){var c=Yt,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=gf(s)),Yt=o,d=i.apply(o,arguments),en(d)&&o._r.push(d),Yt=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===en?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Yt;Yt=null,n(this),Yt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof nn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof wn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof nn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Is.length;o--;)Is[o].id===this.id&&Is.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),I1=function(){function r(t){this.contexts=[],this.scope=t,Yt&&Yt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){tr(n)||(n={matches:n});var o=new f0(0,s||this.scope),a=o.conditions={},l,c,u;Yt&&!o.selector&&(o.selector=Yt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Gi.matchMedia(n[c]),l&&(Is.indexOf(o)<0&&Is.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yf):l.addEventListener("change",yf)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Bc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Z_(i)})},timeline:function(e){return new wn(e)},getTweensOf:function(e,t){return jt.getTweensOf(e,t)},getProperty:function(e,t,n,i){yn(e)&&(e=Si(e)[0]);var s=Ps(e||{}).get,o=n?k_:F_;return n==="native"&&(n=""),e&&(t?o((ii[t]&&ii[t].get||s)(e,t,n,i)):function(a,l,c){return o((ii[a]&&ii[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Si(e),e.length>1){var i=e.map(function(u){return Jn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=ii[t],a=Ps(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;So._pt=0,d.init(e,n?u+n:u,So,0,[e]),d.render(1,d),So._pt&&Sh(1,So)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Jn.to(e,di((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return jt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ds(e.ease,Wo.ease)),Tm(Wo,e||{})},config:function(e){return Tm(ci,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!ii[a]&&!ui[a]&&sl(t+" effect requires "+a+" plugin.")}),ju[t]=function(a,l,c){return n(Si(a),di(l||{},s),c)},o&&(wn.prototype[t]=function(a,l,c){return this.add(ju[t](a,tr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Mt[e]=Ds(t)},parseEase:function(e,t){return arguments.length?Ds(e,t):Mt},getById:function(e){return jt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new wn(e),i,s;for(n.smoothChildTiming=jn(e.smoothChildTiming),jt.remove(n),n._dp=0,n._time=n._tTime=jt._time,i=jt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof nn&&i.vars.onComplete===i._targets[0]))&&qi(n,i,i._start-i._delay),i=s;return qi(jt,n,0),n},context:function(e,t){return e?new f0(e,t):Yt},matchMedia:function(e){return new I1(e)},matchMediaRefresh:function(){return Is.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yf()},addEventListener:function(e,t){var n=xc[e]||(xc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=xc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:d1,wrapYoyo:f1,distribute:X_,random:Y_,snap:q_,normalize:u1,getUnit:Rn,clamp:o1,splitColor:J_,toArray:Si,selector:gf,mapRange:$_,pipe:l1,unitize:c1,interpolate:h1,shuffle:W_},install:D_,effects:ju,ticker:si,updateRoot:wn.updateRoot,plugins:ii,globalTimeline:jt,core:{PropTween:Kn,globals:I_,Tween:nn,Timeline:wn,Animation:cl,getCache:Ps,_removeLinkedListItem:tu,reverting:function(){return Mn},context:function(e){return e&&Yt&&(Yt.data.push(e),e._ctx=Yt),Yt},suppressOverwrites:function(e){return ch=e}}};$n("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Bc[r]=nn[r]});si.add(wn.updateRoot);So=Bc.to({},{duration:0});var O1=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},N1=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=O1(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Qu=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(yn(s)&&(l={},$n(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}N1(a,s)}}}},Jn=Bc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Mn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Qu("roundProps",_f),Qu("modifiers"),Qu("snap",q_))||Bc;nn.version=wn.version=Jn.version="3.12.7";L_=1;dh()&&jo();var U1=Mt.Power0,F1=Mt.Power1,k1=Mt.Power2,B1=Mt.Power3,z1=Mt.Power4,H1=Mt.Linear,V1=Mt.Quad,G1=Mt.Cubic,W1=Mt.Quart,X1=Mt.Quint,q1=Mt.Strong,Y1=Mt.Elastic,j1=Mt.Back,$1=Mt.SteppedEase,K1=Mt.Bounce,Z1=Mt.Sine,J1=Mt.Expo,Q1=Mt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dm,Hr,Co,wh,Es,Im,bh,eA=function(){return typeof window<"u"},Tr={},ys=180/Math.PI,Ro=Math.PI/180,lo=Math.atan2,Om=1e8,Mh=/([A-Z])/g,tA=/(left|right|width|margin|padding|x)/i,nA=/[\s,\(]\S/,Yi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},xf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},iA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},rA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},sA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},h0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},p0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},oA=function(e,t,n){return e.style[t]=n},aA=function(e,t,n){return e.style.setProperty(t,n)},lA=function(e,t,n){return e._gsap[t]=n},cA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},uA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},dA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},$t="transform",Zn=$t+"Origin",fA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Tr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Yi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=pr(i,a)}):this.tfm[e]=o.x?o[e]:pr(i,e),e===Zn&&(this.tfm.zOrigin=o.zOrigin);else return Yi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf($t)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Zn,t,"")),e=$t}(s||t)&&this.props.push(e,t,s[e])},m0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},hA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Mh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=bh(),(!s||!s.isStart)&&!n[$t]&&(m0(n),i.zOrigin&&n[Zn]&&(n[Zn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},g0=function(e,t){var n={target:e,props:[],revert:hA,save:fA};return e._gsap||Jn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},_0,Sf=function(e,t){var n=Hr.createElementNS?Hr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Hr.createElement(e);return n&&n.style?n:Hr.createElement(e)},Zi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Mh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,$o(t)||t,1)||""},Nm="O,Moz,ms,Ms,Webkit".split(","),$o=function(e,t,n){var i=t||Es,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Nm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Nm[o]:"")+e},wf=function(){eA()&&window.document&&(Dm=window,Hr=Dm.document,Co=Hr.documentElement,Es=Sf("div")||{style:{}},Sf("div"),$t=$o($t),Zn=$t+"Origin",Es.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_0=!!$o("perspective"),bh=Jn.core.reverting,wh=1)},Um=function(e){var t=e.ownerSVGElement,n=Sf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Co.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Co.removeChild(n),s},Fm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},v0=function(e){var t,n;try{t=e.getBBox()}catch{t=Um(e),n=1}return t&&(t.width||t.height)||n||(t=Um(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fm(e,["x","cx","x1"])||0,y:+Fm(e,["y","cy","y1"])||0,width:0,height:0}:t},y0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&v0(e))},Bs=function(e,t){if(t){var n=e.style,i;t in Tr&&t!==Zn&&(t=$t),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Mh,"-$1").toLowerCase())):n.removeAttribute(t)}},Vr=function(e,t,n,i,s,o){var a=new Kn(e._pt,t,n,0,1,o?p0:h0);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},km={deg:1,rad:1,turn:1},pA={grid:1,flex:1},ts=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Es.style,l=tA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||km[i]||km[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&y0(e),(h||o==="%")&&(Tr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],tn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Hr||!g.appendChild)&&(g=Hr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===si.time&&!m.uncache)return tn(s/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,_=e[u],b?e.style[t]=b:Bs(e,t)}else(h||o==="%")&&!pA[Zi(g,"display")]&&(a.position=Zi(e,"position")),g===e&&(a.position="static"),g.appendChild(Es),_=Es[u],g.removeChild(Es),a.position="absolute";return l&&h&&(m=Ps(g),m.time=si.time,m.width=g[u]),tn(f?_*s/d:_&&s?d/_*s:0)},pr=function(e,t,n,i){var s;return wh||wf(),t in Yi&&t!=="transform"&&(t=Yi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Tr[t]&&t!=="transform"?(s=dl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Hc(Zi(e,Zn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=zc[t]&&zc[t](e,t,n)||Zi(e,t)||N_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ts(e,t,s,n)+n:s},mA=function(e,t,n,i){if(!n||n==="none"){var s=$o(t,e,1),o=s&&Zi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Zi(e,"borderTopColor"))}var a=new Kn(this._pt,e.style,t,0,1,u0),l=0,c=0,u,d,f,h,_,g,m,p,b,x,v,M;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Zi(e,t)||i,g?e.style[t]=g:Bs(e,t)),u=[n,i],e0(u),n=u[0],i=u[1],f=n.match(xo)||[],M=i.match(xo)||[],M.length){for(;d=xo.exec(i);)m=d[0],b=i.substring(l,d.index),_?_=(_+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=Ao(h,m)+v),p=parseFloat(m),x=m.substr((p+"").length),l=xo.lastIndex-x.length,x||(x=x||ci.units[t]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(h=ts(e,t,g,x)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?p0:h0;return R_.test(i)&&(a.e=0),this._pt=a,a},Bm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},gA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Bm[n]||n,t[1]=Bm[i]||i,t.join(" ")},_A=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Tr[a]&&(l=1,a=a==="transformOrigin"?Zn:$t),Bs(n,a);l&&(Bs(n,$t),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",dl(n,1),o.uncache=1,m0(i)))}},zc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Kn(e._pt,t,n,0,0,_A);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},ul=[1,0,0,1,0,0],x0={},S0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},zm=function(e){var t=Zi(e,$t);return S0(t)?ul:t.substr(7).match(C_).map(tn)},Eh=function(e,t){var n=e._gsap||Ps(e),i=e.style,s=zm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ul:s):(s===ul&&!e.offsetParent&&e!==Co&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Co.appendChild(e)),s=zm(e),l?i.display=l:Bs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Co.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},bf=function(e,t,n,i,s,o){var a=e._gsap,l=s||Eh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],b=l[5],x=t.split(" "),v=parseFloat(x[0])||0,M=parseFloat(x[1])||0,C,E,P,w;n?l!==ul&&(E=h*m-_*g)&&(P=v*(m/E)+M*(-g/E)+(g*b-m*p)/E,w=v*(-_/E)+M*(h/E)-(h*b-_*p)/E,v=P,M=w):(C=v0(e),v=C.x+(~x[0].indexOf("%")?v/100*C.width:v),M=C.y+(~(x[1]||x[0]).indexOf("%")?M/100*C.height:M)),i||i!==!1&&a.smooth?(p=v-c,b=M-u,a.xOffset=d+(p*h+b*g)-p,a.yOffset=f+(p*_+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Zn]="0px 0px",o&&(Vr(o,a,"xOrigin",c,v),Vr(o,a,"yOrigin",u,M),Vr(o,a,"xOffset",d,a.xOffset),Vr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+M)},dl=function(e,t){var n=e._gsap||new r0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Zi(e,Zn)||"0",u,d,f,h,_,g,m,p,b,x,v,M,C,E,P,w,y,L,D,z,O,T,W,Z,q,pe,N,Y,je,tt,te,le;return u=d=f=g=m=p=b=x=v=0,h=_=1,n.svg=!!(e.getCTM&&y0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[$t]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[$t]!=="none"?l[$t]:"")),i.scale=i.rotate=i.translate="none"),E=Eh(e,n.svg),n.svg&&(n.uncache?(q=e.getBBox(),c=n.xOrigin-q.x+"px "+(n.yOrigin-q.y)+"px",Z=""):Z=!t&&e.getAttribute("data-svg-origin"),bf(e,Z||c,!!Z||n.originIsAbsolute,n.smooth!==!1,E)),M=n.xOrigin||0,C=n.yOrigin||0,E!==ul&&(L=E[0],D=E[1],z=E[2],O=E[3],u=T=E[4],d=W=E[5],E.length===6?(h=Math.sqrt(L*L+D*D),_=Math.sqrt(O*O+z*z),g=L||D?lo(D,L)*ys:0,b=z||O?lo(z,O)*ys+g:0,b&&(_*=Math.abs(Math.cos(b*Ro))),n.svg&&(u-=M-(M*L+C*z),d-=C-(M*D+C*O))):(le=E[6],tt=E[7],N=E[8],Y=E[9],je=E[10],te=E[11],u=E[12],d=E[13],f=E[14],P=lo(le,je),m=P*ys,P&&(w=Math.cos(-P),y=Math.sin(-P),Z=T*w+N*y,q=W*w+Y*y,pe=le*w+je*y,N=T*-y+N*w,Y=W*-y+Y*w,je=le*-y+je*w,te=tt*-y+te*w,T=Z,W=q,le=pe),P=lo(-z,je),p=P*ys,P&&(w=Math.cos(-P),y=Math.sin(-P),Z=L*w-N*y,q=D*w-Y*y,pe=z*w-je*y,te=O*y+te*w,L=Z,D=q,z=pe),P=lo(D,L),g=P*ys,P&&(w=Math.cos(P),y=Math.sin(P),Z=L*w+D*y,q=T*w+W*y,D=D*w-L*y,W=W*w-T*y,L=Z,T=q),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=tn(Math.sqrt(L*L+D*D+z*z)),_=tn(Math.sqrt(W*W+le*le)),P=lo(T,W),b=Math.abs(P)>2e-4?P*ys:0,v=te?1/(te<0?-te:te):0),n.svg&&(Z=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!S0(Zi(e,$t)),Z&&e.setAttribute("transform",Z))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=tn(h),n.scaleY=tn(_),n.rotation=tn(g)+a,n.rotationX=tn(m)+a,n.rotationY=tn(p)+a,n.skewX=b+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Zn]=Hc(c)),n.xOffset=n.yOffset=0,n.force3D=ci.force3D,n.renderTransform=n.svg?yA:_0?w0:vA,n.uncache=0,n},Hc=function(e){return(e=e.split(" "))[0]+" "+e[1]},ed=function(e,t,n){var i=Rn(t);return tn(parseFloat(t)+parseFloat(ts(e,"x",n+"px",i)))+i},vA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,w0(e,t)},ms="0deg",pa="0px",gs=") ",w0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,x=n.zOrigin,v="",M=p==="auto"&&e&&e!==1||p===!0;if(x&&(d!==ms||u!==ms)){var C=parseFloat(u)*Ro,E=Math.sin(C),P=Math.cos(C),w;C=parseFloat(d)*Ro,w=Math.cos(C),o=ed(b,o,E*w*-x),a=ed(b,a,-Math.sin(C)*-x),l=ed(b,l,P*w*-x+x)}m!==pa&&(v+="perspective("+m+gs),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(M||o!==pa||a!==pa||l!==pa)&&(v+=l!==pa||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+gs),c!==ms&&(v+="rotate("+c+gs),u!==ms&&(v+="rotateY("+u+gs),d!==ms&&(v+="rotateX("+d+gs),(f!==ms||h!==ms)&&(v+="skew("+f+", "+h+gs),(_!==1||g!==1)&&(v+="scale("+_+", "+g+gs),b.style[$t]=v||"translate(0, 0)"},yA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,x=parseFloat(o),v=parseFloat(a),M,C,E,P,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ro,c*=Ro,M=Math.cos(l)*d,C=Math.sin(l)*d,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=Ro,w=Math.tan(c-u),w=Math.sqrt(1+w*w),E*=w,P*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),M*=w,C*=w)),M=tn(M),C=tn(C),E=tn(E),P=tn(P)):(M=d,P=f,C=E=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=ts(h,"x",o,"px"),v=ts(h,"y",a,"px")),(_||g||m||p)&&(x=tn(x+_-(_*M+g*E)+m),v=tn(v+g-(_*C+g*P)+p)),(i||s)&&(w=h.getBBox(),x=tn(x+i/100*w.width),v=tn(v+s/100*w.height)),w="matrix("+M+","+C+","+E+","+P+","+x+","+v+")",h.setAttribute("transform",w),b&&(h.style[$t]=w)},xA=function(e,t,n,i,s){var o=360,a=yn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ys:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Om)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Om)%o-~~(c/o)*o)),e._pt=f=new Kn(e._pt,t,n,i,c,iA),f.e=u,f.u="deg",e._props.push(n),f},Hm=function(e,t){for(var n in t)e[n]=t[n];return e},SA=function(e,t,n){var i=Hm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[$t]=t,a=dl(n,1),Bs(n,$t),n.setAttribute("transform",c)):(c=getComputedStyle(n)[$t],o[$t]=t,a=dl(n,1),o[$t]=c);for(l in Tr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Rn(c),_=Rn(u),d=h!==_?ts(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new Kn(e._pt,a,l,d,f-d,xf),e._pt.u=_||0,e._props.push(l));Hm(a,i)};$n("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});zc[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return pr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Th={name:"css",register:wf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,b,x,v,M,C,E,P;wh||wf(),this.styles=this.styles||g0(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(ii[g]&&s0(g,t,n,i,e,s)))){if(h=typeof u,_=zc[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=al(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Kr.lastIndex=0,Kr.test(c)||(m=Rn(c),p=Rn(u)),p?m!==p&&(c=ts(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],yn(c)&&~c.indexOf("random(")&&(c=al(c)),Rn(c+"")||c==="auto"||(c+=ci.units[g]||Rn(pr(e,g))||""),(c+"").charAt(1)==="="&&(c=pr(e,g))):c=pr(e,g),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),g in Yi&&(g==="autoAlpha"&&(f===1&&pr(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),Vr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Yi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in Tr,x){if(this.styles.save(g),v||(M=e._gsap,M.renderTransform&&!t.parseTransform||dl(e,t.parseTransform),C=t.smoothOrigin!==!1&&M.smooth,v=this._pt=new Kn(this._pt,a,$t,0,1,M.renderTransform,M,0,-1),v.dep=1),g==="scale")this._pt=new Kn(this._pt,M,"scaleY",M.scaleY,(b?Ao(M.scaleY,b+d):d)-M.scaleY||0,xf),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(Zn,0,a[Zn]),u=gA(u),M.svg?bf(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Vr(this,M,"zOrigin",M.zOrigin,p),Vr(this,a,g,Hc(c),Hc(u)));continue}else if(g==="svgOrigin"){bf(e,u,1,C,0,this);continue}else if(g in x0){xA(this,M,g,f,b?Ao(f,b+u):u);continue}else if(g==="smoothOrigin"){Vr(this,M,"smooth",M.smooth,u);continue}else if(g==="force3D"){M[g]=u;continue}else if(g==="transform"){SA(this,u,e);continue}}else g in a||(g=$o(g)||g);if(x||(d||d===0)&&(f||f===0)&&!nA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Rn(u)||(g in ci.units?ci.units[g]:m),m!==p&&(f=ts(e,g,c,p)),this._pt=new Kn(this._pt,x?M:a,g,f,(b?Ao(f,b+d):d)-f,!x&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?sA:xf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=rA);else if(g in a)mA.call(this,e,g,c,b?b+u:u);else if(g in e)this.add(e,g,c||e[g],b?b+u:u,i,s);else if(g!=="parseTransform"){hh(g,u);continue}x||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}E&&d0(this)},render:function(e,t){if(t.tween._time||!bh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:pr,aliases:Yi,getSetter:function(e,t,n){var i=Yi[t];return i&&i.indexOf(",")<0&&(t=i),t in Tr&&t!==Zn&&(e._gsap.x||pr(e,"x"))?n&&Im===n?t==="scale"?cA:lA:(Im=n||{})&&(t==="scale"?uA:dA):e.style&&!uh(e.style[t])?oA:~t.indexOf("-")?aA:xh(e,t)},core:{_removeProperty:Bs,_getMatrix:Eh}};Jn.utils.checkPrefix=$o;Jn.core.getStyleSaver=g0;(function(r,e,t,n){var i=$n(r+","+e+","+t,function(s){Tr[s]=1});$n(e,function(s){ci.units[s]="deg",x0[s]=1}),Yi[i[13]]=r+","+e,$n(n,function(s){var o=s.split(":");Yi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");$n("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){ci.units[r]="px"});Jn.registerPlugin(Th);var Xe=Jn.registerPlugin(Th)||Jn,wA=Xe.core.Tween;const bA=Object.freeze(Object.defineProperty({__proto__:null,Back:j1,Bounce:K1,CSSPlugin:Th,Circ:Q1,Cubic:G1,Elastic:Y1,Expo:J1,Linear:H1,Power0:U1,Power1:F1,Power2:k1,Power3:B1,Power4:z1,Quad:V1,Quart:W1,Quint:X1,Sine:Z1,SteppedEase:$1,Strong:q1,TimelineLite:wn,TimelineMax:wn,TweenLite:nn,TweenMax:wA,default:Xe,gsap:Xe},Symbol.toStringTag,{value:"Module"}));function MA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function EA(r,e,t){return e&&MA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var bn,Sc,oi,Gr,Wr,Po,b0,xs,za,M0,yr,Ai,E0,T0=function(){return bn||typeof window<"u"&&(bn=window.gsap)&&bn.registerPlugin&&bn},A0=1,wo=[],_t=[],Ji=[],Ha=Date.now,Mf=function(e,t){return t},TA=function(){var e=za.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,_t),i.push.apply(i,Ji),_t=n,Ji=i,Mf=function(o,a){return t[o](a)}},Zr=function(e,t){return~Ji.indexOf(e)&&Ji[Ji.indexOf(e)+1][t]},Va=function(e){return!!~M0.indexOf(e)},On=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},In=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Kl="scrollLeft",Zl="scrollTop",Ef=function(){return yr&&yr.isPressed||_t.cache++},Vc=function(e,t){var n=function i(s){if(s||s===0){A0&&(oi.history.scrollRestoration="manual");var o=yr&&yr.isPressed;s=i.v=Math.round(s)||(yr&&yr.iOS?1:0),e(s),i.cacheID=_t.cache,o&&Mf("ss",s)}else(t||_t.cache!==i.cacheID||Mf("ref"))&&(i.cacheID=_t.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},zn={s:Kl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Vc(function(r){return arguments.length?oi.scrollTo(r,un.sc()):oi.pageXOffset||Gr[Kl]||Wr[Kl]||Po[Kl]||0})},un={s:Zl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:zn,sc:Vc(function(r){return arguments.length?oi.scrollTo(zn.sc(),r):oi.pageYOffset||Gr[Zl]||Wr[Zl]||Po[Zl]||0})},Xn=function(e,t){return(t&&t._ctx&&t._ctx.selector||bn.utils.toArray)(e)[0]||(typeof e=="string"&&bn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ns=function(e,t){var n=t.s,i=t.sc;Va(e)&&(e=Gr.scrollingElement||Wr);var s=_t.indexOf(e),o=i===un.sc?1:2;!~s&&(s=_t.push(e)-1),_t[s+o]||On(e,"scroll",Ef);var a=_t[s+o],l=a||(_t[s+o]=Vc(Zr(e,n),!0)||(Va(e)?i:Vc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=bn.getProperty(e,"scrollBehavior")==="smooth"),l},Tf=function(e,t,n){var i=e,s=e,o=Ha(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Ha();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=Ha();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},ma=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Vm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},C0=function(){za=bn.core.globals().ScrollTrigger,za&&za.core&&TA()},R0=function(e){return bn=e||T0(),!Sc&&bn&&typeof document<"u"&&document.body&&(oi=window,Gr=document,Wr=Gr.documentElement,Po=Gr.body,M0=[oi,Gr,Wr,Po],bn.utils.clamp,E0=bn.core.context||function(){},xs="onpointerenter"in Po?"pointer":"mouse",b0=rn.isTouch=oi.matchMedia&&oi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in oi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ai=rn.eventTypes=("ontouchstart"in Wr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Wr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return A0=0},500),C0(),Sc=1),Sc};zn.op=un;_t.cache=0;var rn=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Sc||R0(bn)||console.warn("Please gsap.registerPlugin(Observer)"),za||C0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,x=n.onPress,v=n.onRelease,M=n.onRight,C=n.onLeft,E=n.onUp,P=n.onDown,w=n.onChangeX,y=n.onChangeY,L=n.onChange,D=n.onToggleX,z=n.onToggleY,O=n.onHover,T=n.onHoverEnd,W=n.onMove,Z=n.ignoreCheck,q=n.isNormalizer,pe=n.onGestureStart,N=n.onGestureEnd,Y=n.onWheel,je=n.onEnable,tt=n.onDisable,te=n.onClick,le=n.scrollSpeed,Le=n.capture,ge=n.allowClicks,Ee=n.lockAxis,Qe=n.onLockAxis;this.target=a=Xn(a)||Wr,this.vars=n,h&&(h=bn.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,le=le||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(oi.getComputedStyle(Po).lineHeight)||22);var xe,lt,ct,Be,F,at,rt,j=this,Ue=0,st=0,He=n.passive||!u&&n.passive!==!1,Fe=ns(a,zn),Tt=ns(a,un),I=Fe(),A=Tt(),X=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ai[0]==="pointerdown",ne=Va(a),ie=a.ownerDocument||Gr,Q=[0,0,0],ve=[0,0,0],_e=0,Ve=function(){return _e=Ha()},re=function(Ae,nt){return(j.event=Ae)&&h&&~h.indexOf(Ae.target)||nt&&X&&Ae.pointerType!=="touch"||Z&&Z(Ae,nt)},ae=function(){j._vx.reset(),j._vy.reset(),lt.pause(),d&&d(j)},Se=function(){var Ae=j.deltaX=Vm(Q),nt=j.deltaY=Vm(ve),Me=Math.abs(Ae)>=i,ot=Math.abs(nt)>=i;L&&(Me||ot)&&L(j,Ae,nt,Q,ve),Me&&(M&&j.deltaX>0&&M(j),C&&j.deltaX<0&&C(j),w&&w(j),D&&j.deltaX<0!=Ue<0&&D(j),Ue=j.deltaX,Q[0]=Q[1]=Q[2]=0),ot&&(P&&j.deltaY>0&&P(j),E&&j.deltaY<0&&E(j),y&&y(j),z&&j.deltaY<0!=st<0&&z(j),st=j.deltaY,ve[0]=ve[1]=ve[2]=0),(Be||ct)&&(W&&W(j),ct&&(m&&ct===1&&m(j),b&&b(j),ct=0),Be=!1),at&&!(at=!1)&&Qe&&Qe(j),F&&(Y(j),F=!1),xe=0},be=function(Ae,nt,Me){Q[Me]+=Ae,ve[Me]+=nt,j._vx.update(Ae),j._vy.update(nt),c?xe||(xe=requestAnimationFrame(Se)):Se()},$e=function(Ae,nt){Ee&&!rt&&(j.axis=rt=Math.abs(Ae)>Math.abs(nt)?"x":"y",at=!0),rt!=="y"&&(Q[2]+=Ae,j._vx.update(Ae,!0)),rt!=="x"&&(ve[2]+=nt,j._vy.update(nt,!0)),c?xe||(xe=requestAnimationFrame(Se)):Se()},ye=function(Ae){if(!re(Ae,1)){Ae=ma(Ae,u);var nt=Ae.clientX,Me=Ae.clientY,ot=nt-j.x,qe=Me-j.y,et=j.isDragging;j.x=nt,j.y=Me,(et||(ot||qe)&&(Math.abs(j.startX-nt)>=s||Math.abs(j.startY-Me)>=s))&&(ct=et?2:1,et||(j.isDragging=!0),$e(ot,qe))}},we=j.onPress=function(De){re(De,1)||De&&De.button||(j.axis=rt=null,lt.pause(),j.isPressed=!0,De=ma(De),Ue=st=0,j.startX=j.x=De.clientX,j.startY=j.y=De.clientY,j._vx.reset(),j._vy.reset(),On(q?a:ie,Ai[1],ye,He,!0),j.deltaX=j.deltaY=0,x&&x(j))},U=j.onRelease=function(De){if(!re(De,1)){In(q?a:ie,Ai[1],ye,!0);var Ae=!isNaN(j.y-j.startY),nt=j.isDragging,Me=nt&&(Math.abs(j.x-j.startX)>3||Math.abs(j.y-j.startY)>3),ot=ma(De);!Me&&Ae&&(j._vx.reset(),j._vy.reset(),u&&ge&&bn.delayedCall(.08,function(){if(Ha()-_e>300&&!De.defaultPrevented){if(De.target.click)De.target.click();else if(ie.createEvent){var qe=ie.createEvent("MouseEvents");qe.initMouseEvent("click",!0,!0,oi,1,ot.screenX,ot.screenY,ot.clientX,ot.clientY,!1,!1,!1,!1,0,null),De.target.dispatchEvent(qe)}}})),j.isDragging=j.isGesturing=j.isPressed=!1,d&&nt&&!q&&lt.restart(!0),ct&&Se(),p&&nt&&p(j),v&&v(j,Me)}},me=function(Ae){return Ae.touches&&Ae.touches.length>1&&(j.isGesturing=!0)&&pe(Ae,j.isDragging)},ce=function(){return(j.isGesturing=!1)||N(j)},Te=function(Ae){if(!re(Ae)){var nt=Fe(),Me=Tt();be((nt-I)*le,(Me-A)*le,1),I=nt,A=Me,d&&lt.restart(!0)}},de=function(Ae){if(!re(Ae)){Ae=ma(Ae,u),Y&&(F=!0);var nt=(Ae.deltaMode===1?l:Ae.deltaMode===2?oi.innerHeight:1)*_;be(Ae.deltaX*nt,Ae.deltaY*nt,0),d&&!q&&lt.restart(!0)}},oe=function(Ae){if(!re(Ae)){var nt=Ae.clientX,Me=Ae.clientY,ot=nt-j.x,qe=Me-j.y;j.x=nt,j.y=Me,Be=!0,d&&lt.restart(!0),(ot||qe)&&$e(ot,qe)}},ze=function(Ae){j.event=Ae,O(j)},Ge=function(Ae){j.event=Ae,T(j)},wt=function(Ae){return re(Ae)||ma(Ae,u)&&te(j)};lt=j._dc=bn.delayedCall(f||.25,ae).pause(),j.deltaX=j.deltaY=0,j._vx=Tf(0,50,!0),j._vy=Tf(0,50,!0),j.scrollX=Fe,j.scrollY=Tt,j.isDragging=j.isGesturing=j.isPressed=!1,E0(this),j.enable=function(De){return j.isEnabled||(On(ne?ie:a,"scroll",Ef),o.indexOf("scroll")>=0&&On(ne?ie:a,"scroll",Te,He,Le),o.indexOf("wheel")>=0&&On(a,"wheel",de,He,Le),(o.indexOf("touch")>=0&&b0||o.indexOf("pointer")>=0)&&(On(a,Ai[0],we,He,Le),On(ie,Ai[2],U),On(ie,Ai[3],U),ge&&On(a,"click",Ve,!0,!0),te&&On(a,"click",wt),pe&&On(ie,"gesturestart",me),N&&On(ie,"gestureend",ce),O&&On(a,xs+"enter",ze),T&&On(a,xs+"leave",Ge),W&&On(a,xs+"move",oe)),j.isEnabled=!0,j.isDragging=j.isGesturing=j.isPressed=Be=ct=!1,j._vx.reset(),j._vy.reset(),I=Fe(),A=Tt(),De&&De.type&&we(De),je&&je(j)),j},j.disable=function(){j.isEnabled&&(wo.filter(function(De){return De!==j&&Va(De.target)}).length||In(ne?ie:a,"scroll",Ef),j.isPressed&&(j._vx.reset(),j._vy.reset(),In(q?a:ie,Ai[1],ye,!0)),In(ne?ie:a,"scroll",Te,Le),In(a,"wheel",de,Le),In(a,Ai[0],we,Le),In(ie,Ai[2],U),In(ie,Ai[3],U),In(a,"click",Ve,!0),In(a,"click",wt),In(ie,"gesturestart",me),In(ie,"gestureend",ce),In(a,xs+"enter",ze),In(a,xs+"leave",Ge),In(a,xs+"move",oe),j.isEnabled=j.isPressed=j.isDragging=!1,tt&&tt(j))},j.kill=j.revert=function(){j.disable();var De=wo.indexOf(j);De>=0&&wo.splice(De,1),yr===j&&(yr=0)},wo.push(j),q&&Va(a)&&(yr=j),j.enable(g)},EA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();rn.version="3.12.7";rn.create=function(r){return new rn(r)};rn.register=R0;rn.getAll=function(){return wo.slice()};rn.getById=function(r){return wo.filter(function(e){return e.vars.id===r})[0]};T0()&&bn.registerPlugin(rn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ye,go,gt,Wt,ri,Lt,Ah,Gc,fl,Ga,Ma,Jl,An,ru,Af,Fn,Gm,Wm,_o,P0,td,L0,Un,Cf,D0,I0,Ur,Rf,Ch,Lo,Rh,Wc,Pf,nd,Ql=1,Cn=Date.now,id=Cn(),wi=0,Ea=0,Xm=function(e,t,n){var i=ni(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},qm=function(e,t){return t&&(!ni(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},AA=function r(){return Ea&&requestAnimationFrame(r)},Ym=function(){return ru=1},jm=function(){return ru=0},Wi=function(e){return e},Ta=function(e){return Math.round(e*1e5)/1e5||0},O0=function(){return typeof window<"u"},N0=function(){return Ye||O0()&&(Ye=window.gsap)&&Ye.registerPlugin&&Ye},zs=function(e){return!!~Ah.indexOf(e)},U0=function(e){return(e==="Height"?Rh:gt["inner"+e])||ri["client"+e]||Lt["client"+e]},F0=function(e){return Zr(e,"getBoundingClientRect")||(zs(e)?function(){return Tc.width=gt.innerWidth,Tc.height=Rh,Tc}:function(){return mr(e)})},CA=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Zr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?U0(s):e["client"+s])||0}},RA=function(e,t){return!t||~Ji.indexOf(e)?F0(e):function(){return Tc}},ji=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Zr(e,n))?o()-F0(e)()[s]:zs(e)?(ri[n]||Lt[n])-U0(i):e[n]-e["offset"+i])},ec=function(e,t){for(var n=0;n<_o.length;n+=3)(!t||~t.indexOf(_o[n+1]))&&e(_o[n],_o[n+1],_o[n+2])},ni=function(e){return typeof e=="string"},Pn=function(e){return typeof e=="function"},Aa=function(e){return typeof e=="number"},Ss=function(e){return typeof e=="object"},ga=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},rd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},co=Math.abs,k0="left",B0="top",Ph="right",Lh="bottom",Os="width",Ns="height",Wa="Right",Xa="Left",qa="Top",Ya="Bottom",an="padding",mi="margin",Ko="Width",Dh="Height",cn="px",gi=function(e){return gt.getComputedStyle(e)},PA=function(e){var t=gi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},$m=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},mr=function(e,t){var n=t&&gi(e)[Af]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ye.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Xc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},z0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},LA=function(e){return function(t){return Ye.utils.snap(z0(e),t)}},Ih=function(e){var t=Ye.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},DA=function(e){return function(t,n){return Ih(z0(e))(t,n.direction)}},tc=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},_n=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},nc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Km={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ic={toggleActions:"play",anticipatePin:0},qc={top:0,left:0,center:.5,bottom:1,right:1},wc=function(e,t){if(ni(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in qc?qc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},rc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=Wt.createElement("div"),g=zs(n)||Zr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Lt:n,b=e.indexOf("start")!==-1,x=b?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===un?Ph:Lh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=b,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],bc(_,0,i,b),_},bc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Ko]=1,s["border"+a+Ko]=0,s[n.p]=t+"px",Ye.set(e,s)},mt=[],Lf={},hl,Zm=function(){return Cn()-wi>34&&(hl||(hl=requestAnimationFrame(br)))},uo=function(){(!Un||!Un.isPressed||Un.startX>Lt.clientWidth)&&(_t.cache++,Un?hl||(hl=requestAnimationFrame(br)):br(),wi||Vs("scrollStart"),wi=Cn())},sd=function(){I0=gt.innerWidth,D0=gt.innerHeight},Ca=function(e){_t.cache++,(e===!0||!An&&!L0&&!Wt.fullscreenElement&&!Wt.webkitFullscreenElement&&(!Cf||I0!==gt.innerWidth||Math.abs(gt.innerHeight-D0)>gt.innerHeight*.25))&&Gc.restart(!0)},Hs={},IA=[],H0=function r(){return gn(Ke,"scrollEnd",r)||Ts(!0)},Vs=function(e){return Hs[e]&&Hs[e].map(function(t){return t()})||IA},ti=[],V0=function(e){for(var t=0;t<ti.length;t+=5)(!e||ti[t+4]&&ti[t+4].query===e)&&(ti[t].style.cssText=ti[t+1],ti[t].getBBox&&ti[t].setAttribute("transform",ti[t+2]||""),ti[t+3].uncache=1)},Oh=function(e,t){var n;for(Fn=0;Fn<mt.length;Fn++)n=mt[Fn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Wc=!0,t&&V0(t),t||Vs("revert")},G0=function(e,t){_t.cache++,(t||!kn)&&_t.forEach(function(n){return Pn(n)&&n.cacheID++&&(n.rec=0)}),ni(e)&&(gt.history.scrollRestoration=Ch=e)},kn,Us=0,Jm,OA=function(){if(Jm!==Us){var e=Jm=Us;requestAnimationFrame(function(){return e===Us&&Ts(!0)})}},W0=function(){Lt.appendChild(Lo),Rh=!Un&&Lo.offsetHeight||gt.innerHeight,Lt.removeChild(Lo)},Qm=function(e){return fl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ts=function(e,t){if(ri=Wt.documentElement,Lt=Wt.body,Ah=[gt,Wt,ri,Lt],wi&&!e&&!Wc){_n(Ke,"scrollEnd",H0);return}W0(),kn=Ke.isRefreshing=!0,_t.forEach(function(i){return Pn(i)&&++i.cacheID&&(i.rec=i())});var n=Vs("refreshInit");P0&&Ke.sort(),t||Oh(),_t.forEach(function(i){Pn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),mt.slice(0).forEach(function(i){return i.refresh()}),Wc=!1,mt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Pf=1,Qm(!0),mt.forEach(function(i){var s=ji(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Qm(!1),Pf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),_t.forEach(function(i){Pn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),G0(Ch,1),Gc.pause(),Us++,kn=2,br(2),mt.forEach(function(i){return Pn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),kn=Ke.isRefreshing=!1,Vs("refresh")},Df=0,Mc=1,ja,br=function(e){if(e===2||!kn&&!Wc){Ke.isUpdating=!0,ja&&ja.update(0);var t=mt.length,n=Cn(),i=n-id>=50,s=t&&mt[0].scroll();if(Mc=Df>s?-1:1,kn||(Df=s),i&&(wi&&!ru&&n-wi>200&&(wi=0,Vs("scrollEnd")),Ma=id,id=n),Mc<0){for(Fn=t;Fn-- >0;)mt[Fn]&&mt[Fn].update(0,i);Mc=1}else for(Fn=0;Fn<t;Fn++)mt[Fn]&&mt[Fn].update(0,i);Ke.isUpdating=!1}hl=0},If=[k0,B0,Lh,Ph,mi+Ya,mi+Wa,mi+qa,mi+Xa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ec=If.concat([Os,Ns,"boxSizing","max"+Ko,"max"+Dh,"position",mi,an,an+qa,an+Wa,an+Ya,an+Xa]),NA=function(e,t,n){Do(n);var i=e._gsap;if(i.spacerIsNative)Do(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},od=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=If.length,o=t.style,a=e.style,l;s--;)l=If[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Lh]=a[Ph]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Os]=Xc(e,zn)+cn,o[Ns]=Xc(e,un)+cn,o[an]=a[mi]=a[B0]=a[k0]="0",Do(i),a[Os]=a["max"+Ko]=n[Os],a[Ns]=a["max"+Dh]=n[Ns],a[an]=n[an],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},UA=/([A-Z])/g,Do=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Ye.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(UA,"-$1").toLowerCase())}},sc=function(e){for(var t=Ec.length,n=e.style,i=[],s=0;s<t;s++)i.push(Ec[s],n[Ec[s]]);return i.t=e,i},FA=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Tc={left:0,top:0},eg=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Pn(e)&&(e=e(l)),ni(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?wc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),Aa(e))h&&(e=Ye.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&bc(a,n,i,!0);else{Pn(t)&&(t=t(l));var x=(e||"0").split(" "),v,M,C,E;b=Xn(t,l)||Lt,v=mr(b)||{},(!v||!v.left&&!v.top)&&gi(b).display==="none"&&(E=b.style.display,b.style.display="block",v=mr(b),E?b.style.display=E:b.style.removeProperty("display")),M=wc(x[0],v[i.d]),C=wc(x[1]||"0",n),e=v[i.p]-c[i.p]-u+M+s-C,a&&bc(a,C,i,n-C<20||a._isStart&&C>20),n-=n-C}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,w=o._isStart;m="scroll"+i.d2,bc(o,P,i,w&&P>20||!w&&(d?Math.max(Lt[m],ri[m]):o.parentNode[m])<=P+1),d&&(c=mr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+cn))}return h&&b&&(m=mr(b),h.seek(f),p=mr(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},kA=/(webkit|moz|length|cssText|inset)/i,tg=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Lt){e._stOrig=s.cssText,a=gi(e);for(o in a)!+o&&!kA.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ye.core.getCache(e).uncache=1,t.appendChild(e)}},X0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},oc=function(e,t,n){var i={};i[t.p]="+="+n,Ye.set(e,i)},ng=function(e,t){var n=ns(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=X0(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){_t.cache++,o.tween&&br()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=Ye.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},_n(e,"wheel",n.wheelHandler),Ke.isTouch&&_n(e,"touchmove",n.wheelHandler),s},Ke=function(){function r(t,n){go||r.register(Ye)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Rf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ea){this.update=this.refresh=this.kill=Wi;return}n=$m(ni(n)||Aa(n)||n.nodeType?{trigger:n}:n,ic);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,x=s.once,v=s.snap,M=s.pinReparent,C=s.pinSpacer,E=s.containerAnimation,P=s.fastScrollEnd,w=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?zn:un,L=!d&&d!==0,D=Xn(n.scroller||gt),z=Ye.core.getCache(D),O=zs(D),T=("pinType"in n?n.pinType:Zr(D,"pinType")||O&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Z=L&&n.toggleActions.split(" "),q="markers"in n?n.markers:ic.markers,pe=O?0:parseFloat(gi(D)["border"+y.p2+Ko])||0,N=this,Y=n.onRefreshInit&&function(){return n.onRefreshInit(N)},je=CA(D,O,y),tt=RA(D,O),te=0,le=0,Le=0,ge=ns(D,y),Ee,Qe,xe,lt,ct,Be,F,at,rt,j,Ue,st,He,Fe,Tt,I,A,X,ne,ie,Q,ve,_e,Ve,re,ae,Se,be,$e,ye,we,U,me,ce,Te,de,oe,ze,Ge;if(N._startClamp=N._endClamp=!1,N._dir=y,m*=45,N.scroller=D,N.scroll=E?E.time.bind(E):ge,lt=ge(),N.vars=n,i=i||n.animation,"refreshPriority"in n&&(P0=1,n.refreshPriority===-9999&&(ja=N)),z.tweenScroll=z.tweenScroll||{top:ng(D,un),left:ng(D,zn)},N.tweenTo=Ee=z.tweenScroll[y.p],N.scrubDuration=function(Me){me=Aa(Me)&&Me,me?U?U.duration(Me):U=Ye.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:me,paused:!0,onComplete:function(){return p&&p(N)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!N.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),N.animation=i.pause(),i.scrollTrigger=N,N.scrubDuration(d),ye=0,l||(l=i.vars.id)),v&&((!Ss(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Lt.style&&Ye.set(O?[Lt,ri]:D,{scrollBehavior:"auto"}),_t.forEach(function(Me){return Pn(Me)&&Me.target===(O?Wt.scrollingElement||ri:D)&&(Me.smooth=!1)}),xe=Pn(v.snapTo)?v.snapTo:v.snapTo==="labels"?LA(i):v.snapTo==="labelsDirectional"?DA(i):v.directional!==!1?function(Me,ot){return Ih(v.snapTo)(Me,Cn()-le<500?0:ot.direction)}:Ye.utils.snap(v.snapTo),ce=v.duration||{min:.1,max:2},ce=Ss(ce)?Ga(ce.min,ce.max):Ga(ce,ce),Te=Ye.delayedCall(v.delay||me/2||.1,function(){var Me=ge(),ot=Cn()-le<500,qe=Ee.tween;if((ot||Math.abs(N.getVelocity())<10)&&!qe&&!ru&&te!==Me){var et=(Me-Be)/Fe,qt=i&&!L?i.totalProgress():et,ke=ot?0:(qt-we)/(Cn()-Ma)*1e3||0,dt=Ye.utils.clamp(-et,1-et,co(ke/2)*ke/.185),Zt=et+(v.inertia===!1?0:dt),Dt,Rt,At=v,pn=At.onStart,kt=At.onInterrupt,It=At.onComplete;if(Dt=xe(Zt,N),Aa(Dt)||(Dt=Zt),Rt=Math.max(0,Math.round(Be+Dt*Fe)),Me<=F&&Me>=Be&&Rt!==Me){if(qe&&!qe._initted&&qe.data<=co(Rt-Me))return;v.inertia===!1&&(dt=Dt-et),Ee(Rt,{duration:ce(co(Math.max(co(Zt-qt),co(Dt-qt))*.185/ke/.05||0)),ease:v.ease||"power3",data:co(Rt-Me),onInterrupt:function(){return Te.restart(!0)&&kt&&kt(N)},onComplete:function(){N.update(),te=ge(),i&&!L&&(U?U.resetTo("totalProgress",Dt,i._tTime/i._tDur):i.progress(Dt)),ye=we=i&&!L?i.totalProgress():N.progress,b&&b(N),It&&It(N)}},Me,dt*Fe,Rt-Me-dt*Fe),pn&&pn(N,Ee.tween)}}else N.isActive&&te!==Me&&Te.restart(!0)}).pause()),l&&(Lf[l]=N),f=N.trigger=Xn(f||h!==!0&&h),Ge=f&&f._gsap&&f._gsap.stRevert,Ge&&(Ge=Ge(N)),h=h===!0?f:Xn(h),ni(a)&&(a={targets:f,className:a}),h&&(_===!1||_===mi||(_=!_&&h.parentNode&&h.parentNode.style&&gi(h.parentNode).display==="flex"?!1:an),N.pin=h,Qe=Ye.core.getCache(h),Qe.spacer?Tt=Qe.pinState:(C&&(C=Xn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Qe.spacerIsNative=!!C,C&&(Qe.spacerState=sc(C))),Qe.spacer=X=C||Wt.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),Qe.pinState=Tt=sc(h)),n.force3D!==!1&&Ye.set(h,{force3D:!0}),N.spacer=X=Qe.spacer,$e=gi(h),Ve=$e[_+y.os2],ie=Ye.getProperty(h),Q=Ye.quickSetter(h,y.a,cn),od(h,X,$e),A=sc(h)),q){st=Ss(q)?$m(q,Km):Km,j=rc("scroller-start",l,D,y,st,0),Ue=rc("scroller-end",l,D,y,st,0,j),ne=j["offset"+y.op.d2];var wt=Xn(Zr(D,"content")||D);at=this.markerStart=rc("start",l,wt,y,st,ne,0,E),rt=this.markerEnd=rc("end",l,wt,y,st,ne,0,E),E&&(ze=Ye.quickSetter([at,rt],y.a,cn)),!T&&!(Ji.length&&Zr(D,"fixedMarkers")===!0)&&(PA(O?Lt:D),Ye.set([j,Ue],{force3D:!0}),ae=Ye.quickSetter(j,y.a,cn),be=Ye.quickSetter(Ue,y.a,cn))}if(E){var De=E.vars.onUpdate,Ae=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){N.update(0,0,1),De&&De.apply(E,Ae||[])})}if(N.previous=function(){return mt[mt.indexOf(N)-1]},N.next=function(){return mt[mt.indexOf(N)+1]},N.revert=function(Me,ot){if(!ot)return N.kill(!0);var qe=Me!==!1||!N.enabled,et=An;qe!==N.isReverted&&(qe&&(de=Math.max(ge(),N.scroll.rec||0),Le=N.progress,oe=i&&i.progress()),at&&[at,rt,j,Ue].forEach(function(qt){return qt.style.display=qe?"none":"block"}),qe&&(An=N,N.update(qe)),h&&(!M||!N.isActive)&&(qe?NA(h,X,Tt):od(h,X,gi(h),re)),qe||N.update(qe),An=et,N.isReverted=qe)},N.refresh=function(Me,ot,qe,et){if(!((An||!N.enabled)&&!ot)){if(h&&Me&&wi){_n(r,"scrollEnd",H0);return}!kn&&Y&&Y(N),An=N,Ee.tween&&!qe&&(Ee.tween.kill(),Ee.tween=0),U&&U.pause(),g&&i&&i.revert({kill:!1}).invalidate(),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var qt=je(),ke=tt(),dt=E?E.duration():ji(D,y),Zt=Fe<=.01,Dt=0,Rt=et||0,At=Ss(qe)?qe.end:n.end,pn=n.endTrigger||f,kt=Ss(qe)?qe.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),It=N.pinnedContainer=n.pinnedContainer&&Xn(n.pinnedContainer,N),Wn=f&&Math.max(0,mt.indexOf(N))||0,Jt=Wn,Qt,R,V,K,$,H,he,Ce,We,Ie,S,k,B;for(q&&Ss(qe)&&(k=Ye.getProperty(j,y.p),B=Ye.getProperty(Ue,y.p));Jt-- >0;)H=mt[Jt],H.end||H.refresh(0,1)||(An=N),he=H.pin,he&&(he===f||he===h||he===It)&&!H.isReverted&&(Ie||(Ie=[]),Ie.unshift(H),H.revert(!0,!0)),H!==mt[Jt]&&(Wn--,Jt--);for(Pn(kt)&&(kt=kt(N)),kt=Xm(kt,"start",N),Be=eg(kt,f,qt,y,ge(),at,j,N,ke,pe,T,dt,E,N._startClamp&&"_startClamp")||(h?-.001:0),Pn(At)&&(At=At(N)),ni(At)&&!At.indexOf("+=")&&(~At.indexOf(" ")?At=(ni(kt)?kt.split(" ")[0]:"")+At:(Dt=wc(At.substr(2),qt),At=ni(kt)?kt:(E?Ye.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Be):Be)+Dt,pn=f)),At=Xm(At,"end",N),F=Math.max(Be,eg(At||(pn?"100% 0":dt),pn,qt,y,ge()+Dt,rt,Ue,N,ke,pe,T,dt,E,N._endClamp&&"_endClamp"))||-.001,Dt=0,Jt=Wn;Jt--;)H=mt[Jt],he=H.pin,he&&H.start-H._pinPush<=Be&&!E&&H.end>0&&(Qt=H.end-(N._startClamp?Math.max(0,H.start):H.start),(he===f&&H.start-H._pinPush<Be||he===It)&&isNaN(kt)&&(Dt+=Qt*(1-H.progress)),he===h&&(Rt+=Qt));if(Be+=Dt,F+=Dt,N._startClamp&&(N._startClamp+=Dt),N._endClamp&&!kn&&(N._endClamp=F||-.001,F=Math.min(F,ji(D,y))),Fe=F-Be||(Be-=.01)&&.001,Zt&&(Le=Ye.utils.clamp(0,1,Ye.utils.normalize(Be,F,de))),N._pinPush=Rt,at&&Dt&&(Qt={},Qt[y.a]="+="+Dt,It&&(Qt[y.p]="-="+ge()),Ye.set([at,rt],Qt)),h&&!(Pf&&N.end>=ji(D,y)))Qt=gi(h),K=y===un,V=ge(),ve=parseFloat(ie(y.a))+Rt,!dt&&F>1&&(S=(O?Wt.scrollingElement||ri:D).style,S={style:S,value:S["overflow"+y.a.toUpperCase()]},O&&gi(Lt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(S.style["overflow"+y.a.toUpperCase()]="scroll")),od(h,X,Qt),A=sc(h),R=mr(h,!0),Ce=T&&ns(D,K?zn:un)(),_?(re=[_+y.os2,Fe+Rt+cn],re.t=X,Jt=_===an?Xc(h,y)+Fe+Rt:0,Jt&&(re.push(y.d,Jt+cn),X.style.flexBasis!=="auto"&&(X.style.flexBasis=Jt+cn)),Do(re),It&&mt.forEach(function(J){J.pin===It&&J.vars.pinSpacing!==!1&&(J._subPinOffset=!0)}),T&&ge(de)):(Jt=Xc(h,y),Jt&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=Jt+cn)),T&&($={top:R.top+(K?V-Be:Ce)+cn,left:R.left+(K?Ce:V-Be)+cn,boxSizing:"border-box",position:"fixed"},$[Os]=$["max"+Ko]=Math.ceil(R.width)+cn,$[Ns]=$["max"+Dh]=Math.ceil(R.height)+cn,$[mi]=$[mi+qa]=$[mi+Wa]=$[mi+Ya]=$[mi+Xa]="0",$[an]=Qt[an],$[an+qa]=Qt[an+qa],$[an+Wa]=Qt[an+Wa],$[an+Ya]=Qt[an+Ya],$[an+Xa]=Qt[an+Xa],I=FA(Tt,$,M),kn&&ge(0)),i?(We=i._initted,td(1),i.render(i.duration(),!0,!0),_e=ie(y.a)-ve+Fe+Rt,Se=Math.abs(Fe-_e)>1,T&&Se&&I.splice(I.length-2,2),i.render(0,!0,!0),We||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),td(0)):_e=Fe,S&&(S.value?S.style["overflow"+y.a.toUpperCase()]=S.value:S.style.removeProperty("overflow-"+y.a));else if(f&&ge()&&!E)for(R=f.parentNode;R&&R!==Lt;)R._pinOffset&&(Be-=R._pinOffset,F-=R._pinOffset),R=R.parentNode;Ie&&Ie.forEach(function(J){return J.revert(!1,!0)}),N.start=Be,N.end=F,lt=ct=kn?de:ge(),!E&&!kn&&(lt<de&&ge(de),N.scroll.rec=0),N.revert(!1,!0),le=Cn(),Te&&(te=-1,Te.restart(!0)),An=0,i&&L&&(i._initted||oe)&&i.progress()!==oe&&i.progress(oe||0,!0).render(i.time(),!0,!0),(Zt||Le!==N.progress||E||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(E&&Be<-.001&&!Le?Ye.utils.normalize(Be,F,0):Le,!0),N.progress=Zt||(lt-Be)/Fe===Le?0:Le),h&&_&&(X._pinOffset=Math.round(N.progress*_e)),U&&U.invalidate(),isNaN(k)||(k-=Ye.getProperty(j,y.p),B-=Ye.getProperty(Ue,y.p),oc(j,y,k),oc(at,y,k-(et||0)),oc(Ue,y,B),oc(rt,y,B-(et||0))),Zt&&!kn&&N.update(),u&&!kn&&!He&&(He=!0,u(N),He=!1)}},N.getVelocity=function(){return(ge()-ct)/(Cn()-Ma)*1e3||0},N.endAnimation=function(){ga(N.callbackAnimation),i&&(U?U.progress(1):i.paused()?L||ga(i,N.direction<0,1):ga(i,i.reversed()))},N.labelToScroll=function(Me){return i&&i.labels&&(Be||N.refresh()||Be)+i.labels[Me]/i.duration()*Fe||0},N.getTrailing=function(Me){var ot=mt.indexOf(N),qe=N.direction>0?mt.slice(0,ot).reverse():mt.slice(ot+1);return(ni(Me)?qe.filter(function(et){return et.vars.preventOverlaps===Me}):qe).filter(function(et){return N.direction>0?et.end<=Be:et.start>=F})},N.update=function(Me,ot,qe){if(!(E&&!qe&&!Me)){var et=kn===!0?de:N.scroll(),qt=Me?0:(et-Be)/Fe,ke=qt<0?0:qt>1?1:qt||0,dt=N.progress,Zt,Dt,Rt,At,pn,kt,It,Wn;if(ot&&(ct=lt,lt=E?ge():et,v&&(we=ye,ye=i&&!L?i.totalProgress():ke)),m&&h&&!An&&!Ql&&wi&&(!ke&&Be<et+(et-ct)/(Cn()-Ma)*m?ke=1e-4:ke===1&&F>et+(et-ct)/(Cn()-Ma)*m&&(ke=.9999)),ke!==dt&&N.enabled){if(Zt=N.isActive=!!ke&&ke<1,Dt=!!dt&&dt<1,kt=Zt!==Dt,pn=kt||!!ke!=!!dt,N.direction=ke>dt?1:-1,N.progress=ke,pn&&!An&&(Rt=ke&&!dt?0:ke===1?1:dt===1?2:3,L&&(At=!kt&&Z[Rt+1]!=="none"&&Z[Rt+1]||Z[Rt],Wn=i&&(At==="complete"||At==="reset"||At in i))),w&&(kt||Wn)&&(Wn||d||!i)&&(Pn(w)?w(N):N.getTrailing(w).forEach(function(V){return V.endAnimation()})),L||(U&&!An&&!Ql?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",ke,i._tTime/i._tDur):(U.vars.totalProgress=ke,U.invalidate().restart())):i&&i.totalProgress(ke,!!(An&&(le||Me)))),h){if(Me&&_&&(X.style[_+y.os2]=Ve),!T)Q(Ta(ve+_e*ke));else if(pn){if(It=!Me&&ke>dt&&F+1>et&&et+1>=ji(D,y),M)if(!Me&&(Zt||It)){var Jt=mr(h,!0),Qt=et-Be;tg(h,Lt,Jt.top+(y===un?Qt:0)+cn,Jt.left+(y===un?0:Qt)+cn)}else tg(h,X);Do(Zt||It?I:A),Se&&ke<1&&Zt||Q(ve+(ke===1&&!It?_e:0))}}v&&!Ee.tween&&!An&&!Ql&&Te.restart(!0),a&&(kt||x&&ke&&(ke<1||!nd))&&fl(a.targets).forEach(function(V){return V.classList[Zt||x?"add":"remove"](a.className)}),o&&!L&&!Me&&o(N),pn&&!An?(L&&(Wn&&(At==="complete"?i.pause().totalProgress(1):At==="reset"?i.restart(!0).pause():At==="restart"?i.restart(!0):i[At]()),o&&o(N)),(kt||!nd)&&(c&&kt&&rd(N,c),W[Rt]&&rd(N,W[Rt]),x&&(ke===1?N.kill(!1,1):W[Rt]=0),kt||(Rt=ke===1?1:3,W[Rt]&&rd(N,W[Rt]))),P&&!Zt&&Math.abs(N.getVelocity())>(Aa(P)?P:2500)&&(ga(N.callbackAnimation),U?U.progress(1):ga(i,At==="reverse"?1:!ke,1))):L&&o&&!An&&o(N)}if(be){var R=E?et/E.duration()*(E._caScrollDist||0):et;ae(R+(j._isFlipped?1:0)),be(R)}ze&&ze(-et/E.duration()*(E._caScrollDist||0))}},N.enable=function(Me,ot){N.enabled||(N.enabled=!0,_n(D,"resize",Ca),O||_n(D,"scroll",uo),Y&&_n(r,"refreshInit",Y),Me!==!1&&(N.progress=Le=0,lt=ct=te=ge()),ot!==!1&&N.refresh())},N.getTween=function(Me){return Me&&Ee?Ee.tween:U},N.setPositions=function(Me,ot,qe,et){if(E){var qt=E.scrollTrigger,ke=E.duration(),dt=qt.end-qt.start;Me=qt.start+dt*Me/ke,ot=qt.start+dt*ot/ke}N.refresh(!1,!1,{start:qm(Me,qe&&!!N._startClamp),end:qm(ot,qe&&!!N._endClamp)},et),N.update()},N.adjustPinSpacing=function(Me){if(re&&Me){var ot=re.indexOf(y.d)+1;re[ot]=parseFloat(re[ot])+Me+cn,re[1]=parseFloat(re[1])+Me+cn,Do(re)}},N.disable=function(Me,ot){if(N.enabled&&(Me!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,ot||U&&U.pause(),de=0,Qe&&(Qe.uncache=1),Y&&gn(r,"refreshInit",Y),Te&&(Te.pause(),Ee.tween&&Ee.tween.kill()&&(Ee.tween=0)),!O)){for(var qe=mt.length;qe--;)if(mt[qe].scroller===D&&mt[qe]!==N)return;gn(D,"resize",Ca),O||gn(D,"scroll",uo)}},N.kill=function(Me,ot){N.disable(Me,ot),U&&!ot&&U.kill(),l&&delete Lf[l];var qe=mt.indexOf(N);qe>=0&&mt.splice(qe,1),qe===Fn&&Mc>0&&Fn--,qe=0,mt.forEach(function(et){return et.scroller===N.scroller&&(qe=1)}),qe||kn||(N.scroll.rec=0),i&&(i.scrollTrigger=null,Me&&i.revert({kill:!1}),ot||i.kill()),at&&[at,rt,j,Ue].forEach(function(et){return et.parentNode&&et.parentNode.removeChild(et)}),ja===N&&(ja=0),h&&(Qe&&(Qe.uncache=1),qe=0,mt.forEach(function(et){return et.pin===h&&qe++}),qe||(Qe.spacer=0)),n.onKill&&n.onKill(N)},mt.push(N),N.enable(!1,!1),Ge&&Ge(N),i&&i.add&&!Fe){var nt=N.update;N.update=function(){N.update=nt,_t.cache++,Be||F||N.refresh()},Ye.delayedCall(.01,N.update),Fe=.01,Be=F=0}else N.refresh();h&&OA()},r.register=function(n){return go||(Ye=n||N0(),O0()&&window.document&&r.enable(),go=Ea),go},r.defaults=function(n){if(n)for(var i in n)ic[i]=n[i];return ic},r.disable=function(n,i){Ea=0,mt.forEach(function(o){return o[i?"kill":"disable"](n)}),gn(gt,"wheel",uo),gn(Wt,"scroll",uo),clearInterval(Jl),gn(Wt,"touchcancel",Wi),gn(Lt,"touchstart",Wi),tc(gn,Wt,"pointerdown,touchstart,mousedown",Ym),tc(gn,Wt,"pointerup,touchend,mouseup",jm),Gc.kill(),ec(gn);for(var s=0;s<_t.length;s+=3)nc(gn,_t[s],_t[s+1]),nc(gn,_t[s],_t[s+2])},r.enable=function(){if(gt=window,Wt=document,ri=Wt.documentElement,Lt=Wt.body,Ye&&(fl=Ye.utils.toArray,Ga=Ye.utils.clamp,Rf=Ye.core.context||Wi,td=Ye.core.suppressOverwrites||Wi,Ch=gt.history.scrollRestoration||"auto",Df=gt.pageYOffset||0,Ye.core.globals("ScrollTrigger",r),Lt)){Ea=1,Lo=document.createElement("div"),Lo.style.height="100vh",Lo.style.position="absolute",W0(),AA(),rn.register(Ye),r.isTouch=rn.isTouch,Ur=rn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Cf=rn.isTouch===1,_n(gt,"wheel",uo),Ah=[gt,Wt,ri,Lt],Ye.matchMedia?(r.matchMedia=function(c){var u=Ye.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Ye.addEventListener("matchMediaInit",function(){return Oh()}),Ye.addEventListener("matchMediaRevert",function(){return V0()}),Ye.addEventListener("matchMedia",function(){Ts(0,1),Vs("matchMedia")}),Ye.matchMedia().add("(orientation: portrait)",function(){return sd(),sd})):console.warn("Requires GSAP 3.11.0 or later"),sd(),_n(Wt,"scroll",uo);var n=Lt.hasAttribute("style"),i=Lt.style,s=i.borderTopStyle,o=Ye.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=mr(Lt),un.m=Math.round(a.top+un.sc())||0,zn.m=Math.round(a.left+zn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Lt.setAttribute("style",""),Lt.removeAttribute("style")),Jl=setInterval(Zm,250),Ye.delayedCall(.5,function(){return Ql=0}),_n(Wt,"touchcancel",Wi),_n(Lt,"touchstart",Wi),tc(_n,Wt,"pointerdown,touchstart,mousedown",Ym),tc(_n,Wt,"pointerup,touchend,mouseup",jm),Af=Ye.utils.checkPrefix("transform"),Ec.push(Af),go=Cn(),Gc=Ye.delayedCall(.2,Ts).pause(),_o=[Wt,"visibilitychange",function(){var c=gt.innerWidth,u=gt.innerHeight;Wt.hidden?(Gm=c,Wm=u):(Gm!==c||Wm!==u)&&Ca()},Wt,"DOMContentLoaded",Ts,gt,"load",Ts,gt,"resize",Ca],ec(_n),mt.forEach(function(c){return c.enable(0,1)}),l=0;l<_t.length;l+=3)nc(gn,_t[l],_t[l+1]),nc(gn,_t[l],_t[l+2])}},r.config=function(n){"limitCallbacks"in n&&(nd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Jl)||(Jl=i)&&setInterval(Zm,i),"ignoreMobileResize"in n&&(Cf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ec(gn)||ec(_n,n.autoRefreshEvents||"none"),L0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Xn(n),o=_t.indexOf(s),a=zs(s);~o&&_t.splice(o,a?6:2),i&&(a?Ji.unshift(gt,i,Lt,i,ri,i):Ji.unshift(s,i))},r.clearMatchMedia=function(n){mt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(ni(n)?Xn(n):n).getBoundingClientRect(),a=o[s?Os:Ns]*i||0;return s?o.right-a>0&&o.left+a<gt.innerWidth:o.bottom-a>0&&o.top+a<gt.innerHeight},r.positionInViewport=function(n,i,s){ni(n)&&(n=Xn(n));var o=n.getBoundingClientRect(),a=o[s?Os:Ns],l=i==null?a/2:i in qc?qc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/gt.innerWidth:(o.top+l)/gt.innerHeight},r.killAll=function(n){if(mt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Hs.killAll||[];Hs={},i.forEach(function(s){return s()})}},r}();Ke.version="3.12.7";Ke.saveStyles=function(r){return r?fl(r).forEach(function(e){if(e&&e.style){var t=ti.indexOf(e);t>=0&&ti.splice(t,5),ti.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ye.core.getCache(e),Rf())}}):ti};Ke.revert=function(r,e){return Oh(!r,e)};Ke.create=function(r,e){return new Ke(r,e)};Ke.refresh=function(r){return r?Ca(!0):(go||Ke.register())&&Ts(!0)};Ke.update=function(r){return++_t.cache&&br(r===!0?2:0)};Ke.clearScrollMemory=G0;Ke.maxScroll=function(r,e){return ji(r,e?zn:un)};Ke.getScrollFunc=function(r,e){return ns(Xn(r),e?zn:un)};Ke.getById=function(r){return Lf[r]};Ke.getAll=function(){return mt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ke.isScrolling=function(){return!!wi};Ke.snapDirectional=Ih;Ke.addEventListener=function(r,e){var t=Hs[r]||(Hs[r]=[]);~t.indexOf(e)||t.push(e)};Ke.removeEventListener=function(r,e){var t=Hs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ke.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=Ye.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Pn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Pn(s)&&(s=s(),_n(Ke,"refresh",function(){return s=e.batchMax()})),fl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ke.create(c))}),t};var ig=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},ad=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(rn.isTouch?" pinch-zoom":""):"none",e===ri&&r(Lt,t)},ac={auto:1,scroll:1},BA=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ye.core.getCache(s),a=Cn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Lt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ac[(l=gi(s)).overflowY]||ac[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!zs(s)&&(ac[(l=gi(s)).overflowY]||ac[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},q0=function(e,t,n,i){return rn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&BA,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&_n(Wt,rn.eventTypes[0],sg,!1,!0)},onDisable:function(){return gn(Wt,rn.eventTypes[0],sg,!0)}})},zA=/(input|label|select|textarea)/i,rg,sg=function(e){var t=zA.test(e.target.tagName);(t||rg)&&(e._gsapAllow=!0,rg=t)},HA=function(e){Ss(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Xn(e.target)||ri,u=Ye.core.globals().ScrollSmoother,d=u&&u.get(),f=Ur&&(e.content&&Xn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=ns(c,un),_=ns(c,zn),g=1,m=(rn.isTouch&&gt.visualViewport?gt.visualViewport.scale*gt.visualViewport.width:gt.outerWidth)/gt.innerWidth,p=0,b=Pn(i)?function(){return i(a)}:function(){return i||2.8},x,v,M=q0(c,e.type,!0,s),C=function(){return v=!1},E=Wi,P=Wi,w=function(){l=ji(c,un),P=Ga(Ur?1:0,l),n&&(E=Ga(0,ji(c,zn))),x=Us},y=function(){f._gsap.y=Ta(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(v){requestAnimationFrame(C);var q=Ta(a.deltaY/2),pe=P(h.v-q);if(f&&pe!==h.v+h.offset){h.offset=pe-h.v;var N=Ta((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",f._gsap.y=N+"px",h.cacheID=_t.cache,br()}return!0}h.offset&&y(),v=!0},D,z,O,T,W=function(){w(),D.isActive()&&D.vars.scrollY>l&&(h()>l?D.progress(1)&&h(l):D.resetTo("scrollY",l))};return f&&Ye.set(f,{y:"+=0"}),e.ignoreCheck=function(Z){return Ur&&Z.type==="touchmove"&&L()||g>1.05&&Z.type!=="touchstart"||a.isGesturing||Z.touches&&Z.touches.length>1},e.onPress=function(){v=!1;var Z=g;g=Ta((gt.visualViewport&&gt.visualViewport.scale||1)/m),D.pause(),Z!==g&&ad(c,g>1.01?!0:n?!1:"x"),z=_(),O=h(),w(),x=Us},e.onRelease=e.onGestureStart=function(Z,q){if(h.offset&&y(),!q)T.restart(!0);else{_t.cache++;var pe=b(),N,Y;n&&(N=_(),Y=N+pe*.05*-Z.velocityX/.227,pe*=ig(_,N,Y,ji(c,zn)),D.vars.scrollX=E(Y)),N=h(),Y=N+pe*.05*-Z.velocityY/.227,pe*=ig(h,N,Y,ji(c,un)),D.vars.scrollY=P(Y),D.invalidate().duration(pe).play(.01),(Ur&&D.vars.scrollY>=l||N>=l-1)&&Ye.to({},{onUpdate:W,duration:pe})}o&&o(Z)},e.onWheel=function(){D._ts&&D.pause(),Cn()-p>1e3&&(x=0,p=Cn())},e.onChange=function(Z,q,pe,N,Y){if(Us!==x&&w(),q&&n&&_(E(N[2]===q?z+(Z.startX-Z.x):_()+q-N[1])),pe){h.offset&&y();var je=Y[2]===pe,tt=je?O+Z.startY-Z.y:h()+pe-Y[1],te=P(tt);je&&tt!==te&&(O+=te-tt),h(te)}(pe||q)&&br()},e.onEnable=function(){ad(c,n?!1:"x"),Ke.addEventListener("refresh",W),_n(gt,"resize",W),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),M.enable()},e.onDisable=function(){ad(c,!0),gn(gt,"resize",W),Ke.removeEventListener("refresh",W),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new rn(e),a.iOS=Ur,Ur&&!h()&&h(1),Ur&&Ye.ticker.add(Wi),T=a._dc,D=Ye.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:X0(h,h(),function(){return D.pause()})},onUpdate:br,onComplete:T.vars.onComplete}),a};Ke.sort=function(r){if(Pn(r))return mt.sort(r);var e=gt.pageYOffset||0;return Ke.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+gt.innerHeight}),mt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ke.observe=function(r){return new rn(r)};Ke.normalizeScroll=function(r){if(typeof r>"u")return Un;if(r===!0&&Un)return Un.enable();if(r===!1){Un&&Un.kill(),Un=r;return}var e=r instanceof rn?r:HA(r);return Un&&Un.target===e.target&&Un.kill(),zs(e.target)&&(Un=e),e};Ke.core={_getVelocityProp:Tf,_inputObserver:q0,_scrollers:_t,_proxies:Ji,bridge:{ss:function(){wi||Vs("scrollStart"),wi=Cn()},ref:function(){return An}}};N0()&&Ye.registerPlugin(Ke);const VA=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ke,default:Ke},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var GA=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,WA=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,XA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,qA=/(^[#\.][a-z]|[a-y][a-z])/i,YA=Math.PI/180,lc=Math.sin,cc=Math.cos,$a=Math.abs,_a=Math.sqrt,og=function(e){return typeof e=="string"},Y0=function(e){return typeof e=="number"},ag=1e5,Nr=function(e){return Math.round(e*ag)/ag||0};function jA(r){r=og(r)&&qA.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Jr(r)):r?og(r)?Jr(r):Y0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ra(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var $A=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},KA={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},ZA=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function j0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,M,C,E,P,w;return t==="path"||!r.getBBox?r:(c=$A(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=ZA(r,KA[t]),t==="rect"?(a=w.rx,l=w.ry||a,s=w.x,o=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,b=p+a*n,x=p+a,v=o+l*(1-n),M=o+l,C=M+_,E=C+l*n,P=C+l,i="M"+x+","+M+" V"+C+" C"+[x,E,b,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,E,s,C,s,C-(C-M)/3,s,M+(C-M)/3,s,M,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,b,o,x,v,x,M].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),s=w.cx,o=w.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(WA)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",Io(c._gsRawPath=Jr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function JA(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=$a(t),n=$a(n);var c=i%360*YA,u=cc(c),d=lc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,b=m*m,x=p*p,v=b/(t*t)+x/(n*n);v>1&&(t=_a(v)*t,n=_a(v)*n);var M=t*t,C=n*n,E=(M*C-M*x-C*b)/(M*x+C*b);E<0&&(E=0);var P=(s===o?-1:1)*_a(E),w=P*(t*p/n),y=P*-(n*m/t),L=(r+a)/2,D=(e+l)/2,z=L+(u*w-d*y),O=D+(d*w+u*y),T=(m-w)/t,W=(p-y)/n,Z=(-m-w)/t,q=(-p-y)/n,pe=T*T+W*W,N=(W<0?-1:1)*Math.acos(T/_a(pe)),Y=(T*q-W*Z<0?-1:1)*Math.acos((T*Z+W*q)/_a(pe*(Z*Z+q*q)));isNaN(Y)&&(Y=f),!o&&Y>0?Y-=h:o&&Y<0&&(Y+=h),N%=h,Y%=h;var je=Math.ceil($a(Y)/(h/4)),tt=[],te=Y/je,le=4/3*lc(te/2)/(1+cc(te/2)),Le=u*t,ge=d*t,Ee=d*-n,Qe=u*n,xe;for(xe=0;xe<je;xe++)i=N+xe*te,m=cc(i),p=lc(i),T=cc(i+=te),W=lc(i),tt.push(m-le*p,p+le*m,T+le*W,W-le*T,T,W);for(xe=0;xe<tt.length;xe+=2)m=tt[xe],p=tt[xe+1],tt[xe]=m*Le+p*Ee+z,tt[xe+1]=m*ge+p*Qe+O;return tt[xe-2]=a,tt[xe-1]=l,tt}}function Jr(r){var e=(r+"").replace(XA,function(w){var y=+w;return y<1e-4&&y>-1e-4?0:y}).match(GA)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,b,x,v,M,C,E,P=function(y,L,D,z){b=(D-y)/3,x=(z-L)/3,g.push(y+b,L+x,D-b,z-x,D,z)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(M=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,x=i,(M==="C"||M==="S")&&(b+=n-g[g.length-4],x+=i-g[g.length-3]),_||(n=i=0),g.push(b,x,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*s,x=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(b,x,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")b=n-g[g.length-4],x=i-g[g.length-3],g.push(n+b,i+x,d+(n+b*1.5-d)*s,f+(i+x*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||$a(n-d)>.5||$a(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(C=e[c+4],E=e[c+5],b=e[c+6],x=e[c+7],u=7,C.length>1&&(C.length<3?(x=b,b=E,u--):(x=E,b=C.substr(2),u-=2),E=C.charAt(1),C=C.charAt(0)),v=JA(n,i,+e[c+1],+e[c+2],+e[c+3],+C,+E,(_?n:0)+b*1,(_?i:0)+x*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Io(r){Y0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Nr(o[0])+","+Nr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Nr(o[s++])+","+Nr(o[s++])+" "+Nr(o[s++])+","+Nr(o[s++])+" "+Nr(o[s++])+","+Nr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Di,Nh,Pa,$0,La,K0=function(){return Di||typeof window<"u"&&(Di=window.gsap)&&Di.registerPlugin&&Di},ld=function(e){return typeof e=="function"},As=Math.atan2,lg=Math.cos,cg=Math.sin,xr=Math.sqrt,su=Math.PI,ug=su*2,QA=su*.3,eC=su*.7,Z0=1e20,pl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,tC=/(^[#\.][a-z]|[a-y][a-z])/i,nC=/[achlmqstvz]/i,Xr=function(e){return console&&console.warn(e)},iC=1,dg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Oo=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},Ka=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,b,x,v,M,C,E,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],x=h[f+2]-p,C=h[f+3]-b,v=h[f+4]-p,E=h[f+5]-b,M=h[f+6]-p,P=h[f+7]-b,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*M+3*m*(g*v+m*x))*g+p,d=(g*g*P+3*m*(g*E+m*C))*g+b,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},rC=function(e,t){return t.length-e.length},fg=function(e,t){var n=e.size||Oo(e),i=t.size||Oo(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},hg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},cd=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=xr(d*d+f*f);return a},sC=function(e,t,n){var i=e.length,s=dg(e),o=dg(t),a=o[0]-s[0],l=o[1]-s[1],c=cd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=cd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Ra(d),h=6;h<i;h+=6)f=cd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},oC=function(e,t,n){for(var i=e.length,s=Z0,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=xr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},aC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Oo(e),t[n].size||Oo(t[n]))*i,u=Z0,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||Oo(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=xr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},ud=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,b,x,v;for(x=2;x<s;x+=6)for(n+=o;n>i;)a=e[x-2],l=e[x-1],c=e[x],u=e[x+1],d=e[x+2],f=e[x+3],h=e[x+4],_=e[x+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(_-f)*v-b)*v,e.splice(x,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(_-f)*v),x+=6,s+=6,n--;return e},Of=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?rC:fg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,b,x,v,M,C;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),M=a.size||Ka(a),M=l.size||Ka(l),M=a.centerX-l.centerX,C=a.centerY-l.centerY,u===fg))for(f=0;f<l.length;f++)a.splice(f,0,aC(l[f],a,f,d,M,C));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&ud(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)x=a[f].size||Oo(a[f]),b=oC(l,a[f].centerX,a[f].centerY),x=b[0],v=b[1],l[f++]=[x,v,x,v,x,v,x,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?ud(m,-o/6|0):o>0&&ud(p,o/6|0),_&&s!==!1&&!p.reversed&&Ra(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=sC(p,m,!f||s===!1),n<0&&(_=!0,Ra(p),n=-n),hg(p,n*6)):n!=="reverse"&&(f&&n<0&&Ra(p),hg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ra(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Xr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},pg=function(e,t,n,i,s){var o=Jr(e[0]),a=Jr(e[1]);Of(o,a,t||t===0?t:"auto",n,s)&&(e[0]=Io(o),e[1]=Io(a),(i==="log"||i===!0)&&Xr('precompile:["'+e[0]+'","'+e[1]+'"]'))},lC=function(e,t){if(!t)return e;var n=e.match(pl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},mg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},Nf=function(e){var t=e[0].match(pl)||[],n=e[1].match(pl)||[],i=n.length-t.length;i>0?e[0]=mg(t,i):e[1]=mg(n,-i)},cC=function(e){return isNaN(e)?Nf:function(t){Nf(t),t[1]=lC(t[1],parseInt(e,10))}},uC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||tC.test(e)||(e.match(pl)||[]).length<3)&&(s=Nh(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=j0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(Xr("WARNING: invalid morph to: "+e),e=!1)),e},gg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=As(l,a),_=As(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=xr(a*a+l*l),m[d+3]=xr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=As(l,a),_=As(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=xr(a*a+l*l),m[3]=xr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},_g=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},dC=function(e){return e!==e%su?e+(e<0?ug:-ug):e},vg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",fC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=xr(a*a+l*l),u=As(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=As(l,a)-u,f=dC(d),!i&&Pa&&Math.abs(f+Pa.ca)<QA&&(i=Pa),this._anchorPT=Pa={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>eC?d:f,sl:c,cl:xr(a*a+l*l)-c,i:n}},yg=function(e){Di=K0(),La=La||Di&&Di.plugins.morphSVG,Di&&La?(Nh=Di.utils.toArray,La.prototype._tweenRotation=fC,$0=1):e&&Xr("Please gsap.registerPlugin(MorphSVGPlugin)")},bo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Di=e,La=t,yg()},init:function(e,t,n,i,s){if($0||yg(1),!t)return Xr("invalid shape"),!1;ld(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,M,C,E,P,w,y,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=ld(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var D=e.nodeType?window.getComputedStyle(e):{},z=D.fill+"",O=!(z==="none"||(z.match(pl)||[])[3]==="0"||D.fillRule==="evenodd"),T=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return Xr("Cannot morph a <"+o+"> element. "+vg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!ld(e.setAttribute))return!1;if(c=uC(t.shape||t.d||t.points||"",a==="d",e),u&&nC.test(c))return Xr("A <"+o+"> cannot accept path data. "+vg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||bo.defaultMap,this._prop=t.prop,this._render=t.render||bo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:bo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,C=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Jr(C?t.precompile[0]:g),m=Jr(C?t.precompile[1]:c),!C&&!Of(g,m,d,f,O))return!1;for((t.precompile==="log"||t.precompile===!0)&&Xr('precompile:["'+Io(g)+'","'+Io(m)+'"]'),y=(t.type||bo.defaultType)!=="linear",y&&(g=gg(g,t.smoothTolerance),m=gg(m,t.smoothTolerance),g.size||Ka(g),m.size||Ka(m),w=_g(T[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},T[1]&&(w=_g(T[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,b=g.length;--b>-1;)for(v=g[b],M=m[b],h=v.isSmooth||[],_=M.isSmooth||[],x=v.length,Pa=0,p=0;p<x;p+=2)(M[p]!==v[p]||M[p+1]!==v[p+1])&&(y?h[p]&&_[p]?(E=v.smoothData,P=M.smoothData,L=p+(p===x-4?7-x:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:E[p+1],l1c:P[p+1]-E[p+1],l2s:E[L],l2c:P[L]-E[L]},l=this._tweenRotation(v,M,p+2),this._tweenRotation(v,M,p,l),this._tweenRotation(v,M,L-1,l),p+=4):this._tweenRotation(v,M,p):(l=this.add(v,p,v[p],M[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],M[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,cC(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return iC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,b,x,v,M;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+lg(_)*h,s.t[s.i+1]=t._origin.y+cg(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],M=g+(g===f.length-4?7-f.length:5),_=As(f[M]-f[g+1],f[M-1]-f[g]),x=cg(_),v=lg(_),p=f[g+2],b=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=b-x*h,h=i.l2s+d*i.l2c,f[M-1]=p+v*h,f[M]=b+x*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:jA,stringToRawPath:Jr,rawPathToString:Io,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return pg(o,i,s),o},pathFilter:pg,pointsFilter:Nf,getTotalSize:Ka,equalizeSegmentQuantity:Of,convertToPath:function(e,t){return Nh(e).map(function(n){return j0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};K0()&&Di.registerPlugin(bo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function hC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function xg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Sg(r,e,t){return e&&xg(r.prototype,e),t&&xg(r,t),r}function pC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function wg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function bg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?wg(Object(t),!0).forEach(function(n){pC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):wg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function J0(r,e){return gC(r)||vC(r,e)||Q0(r,e)||xC()}function Bn(r){return mC(r)||_C(r)||Q0(r)||yC()}function mC(r){if(Array.isArray(r))return Uf(r)}function gC(r){if(Array.isArray(r))return r}function _C(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function vC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function Q0(r,e){if(r){if(typeof r=="string")return Uf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Uf(r,e)}}function Uf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function yC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cs(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function yl(r){return typeof r=="string"}function Uh(r){return Array.isArray(r)}function uc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Cs(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(yl(t)||Uh(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Fh(r){var e=yl(r)||Uh(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function ou(r){return r!==null&&typeof r=="object"}function SC(r){return ou(r)&&/^(1|3|11)$/.test(r.nodeType)}function wC(r){return typeof r=="number"&&r>-1&&r%1===0}function bC(r){return ou(r)&&wC(r.length)}function Gs(r){return Uh(r)?r:r==null?[]:bC(r)?Array.prototype.slice.call(r):[r]}function Mg(r){var e=r;return yl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Gs(e).reduce(function(t,n){return[].concat(Bn(t),Bn(Gs(n).filter(SC)))},[])}var MC=Object.entries,Yc="_splittype",Ni={},EC=0;function $i(r,e,t){if(!ou(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Yc]||(r[Yc]=++EC),i=Ni[n]||(Ni[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Ni[n]=bg(bg({},i),e)):e!==void 0&&(i[e]=t),t}function Rs(r,e){var t=ou(r)?r[Yc]:null,n=t&&Ni[t]||{};return n}function ev(r){var e=r&&r[Yc];e&&(delete r[e],delete Ni[e])}function TC(){Object.keys(Ni).forEach(function(r){delete Ni[r]})}function AC(){MC(Ni).forEach(function(r){var e=J0(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Ni[t]=null,delete Ni[t])})}function CC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var kh="\\ud800-\\udfff",tv="\\u0300-\\u036f\\ufe20-\\ufe23",nv="\\u20d0-\\u20f0",iv="\\ufe0e\\ufe0f",RC="[".concat(kh,"]"),Ff="[".concat(tv).concat(nv,"]"),kf="\\ud83c[\\udffb-\\udfff]",PC="(?:".concat(Ff,"|").concat(kf,")"),rv="[^".concat(kh,"]"),sv="(?:\\ud83c[\\udde6-\\uddff]){2}",ov="[\\ud800-\\udbff][\\udc00-\\udfff]",av="\\u200d",lv="".concat(PC,"?"),cv="[".concat(iv,"]?"),LC="(?:"+av+"(?:"+[rv,sv,ov].join("|")+")"+cv+lv+")*",DC=cv+lv+LC,IC="(?:".concat(["".concat(rv).concat(Ff,"?"),Ff,sv,ov,RC].join("|"),`
)`),OC=RegExp("".concat(kf,"(?=").concat(kf,")|").concat(IC).concat(DC),"g"),NC=[av,kh,tv,nv,iv],UC=RegExp("[".concat(NC.join(""),"]"));function FC(r){return r.split("")}function uv(r){return UC.test(r)}function kC(r){return r.match(OC)||[]}function BC(r){return uv(r)?kC(r):FC(r)}function zC(r){return r==null?"":String(r)}function HC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=zC(r),r&&yl(r)&&!e&&uv(r)?BC(r):r.split(e)}function Bf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=yl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Bn(Gs(s))):t.setAttribute(n,s))}),t}var Bh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function VC(r,e){e=Cs(Bh,e);var t=Fh(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=CC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=HC(c).map(function(_){var g=Bf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return $i(g,"isChar",!0),a=[].concat(Bn(a),[g]),g})),t.words||t.lines?(f=Bf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),$i(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function dv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return VC(r,e);var i=Gs(r.childNodes);if(i.length&&($i(r,"isSplit",!0),!Rs(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";$i(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=dv(d,e),h=f.words,_=f.chars;return{words:[].concat(Bn(u.words),Bn(h)),chars:[].concat(Bn(u.chars),Bn(_))}},n)}function GC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=J0(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function fv(r){Rs(r).isWord?(ev(r),r.replaceWith.apply(r,Bn(r.childNodes))):Gs(r.children).forEach(function(e){return fv(e)})}var WC=function(){return document.createDocumentFragment()};function XC(r,e,t){var n=Fh(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=WC(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),x=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,$i(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Gs(s).forEach(function(v){var M=v.parentElement===r,C=GC(v,M,e,t),E=C.width,P=C.height,w=C.top,y=C.left;/^br$/i.test(v.nodeName)||(n.lines&&M&&((l===null||w-l>=x)&&(l=w,o.push(a=[])),a.push(v)),e.absolute&&$i(v,{top:w,left:y,width:E,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var M=Bf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});$i(M,"isLine",!0);var C={height:0,top:1e4};return g.appendChild(M),v.forEach(function(E,P,w){var y=Rs(E),L=y.isWordEnd,D=y.top,z=y.height,O=w[P+1];C.height=Math.max(C.height,z),C.top=Math.min(C.top,D),M.appendChild(E),L&&Rs(O).isWordStart&&M.append(" ")}),e.absolute&&$i(M,{height:C.height,top:C.top}),M}),n.words||fv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Gs(s).forEach(function(v){var M=Rs(v),C=M.isLine,E=M.top,P=M.left,w=M.width,y=M.height,L=Rs(v.parentElement),D=!C&&L.isLine;v.style.top="".concat(D?E-L.top:E,"px"),v.style.left=C?"".concat(d.left,"px"):"".concat(P-(D?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=C?"".concat(d.width,"px"):"".concat(w,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var fo=Cs(Bh,{}),na=function(){Sg(r,null,[{key:"clearData",value:function(){TC()}},{key:"setDefaults",value:function(t){return fo=Cs(fo,uc(t)),Bh}},{key:"revert",value:function(t){Mg(t).forEach(function(n){var i=Rs(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",ev(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Ni}},{key:"defaults",get:function(){return fo},set:function(t){fo=Cs(fo,uc(t))}}]);function r(e,t){hC(this,r),this.isSplit=!1,this.settings=Cs(fo,uc(t)),this.elements=Mg(e),this.split()}return Sg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){$i(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Cs(this.settings,uc(t)));var s=Fh(this.settings.types);s.none||(this.elements.forEach(function(o){$i(o,"isRoot",!0);var a=dv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Bn(n.words),Bn(l)),n.chars=[].concat(Bn(n.chars),Bn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=XC(o,n.settings,i);n.lines=[].concat(Bn(n.lines),Bn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),AC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const qC="/content/dam/acsorg/150/assets/audio/ui-click.mp3",YC="/content/dam/acsorg/150/assets/audio/chemistry2.mp3",jC="/content/dam/acsorg/150/assets/images/pacifichem-event1.jpg",$C="/content/dam/acsorg/150/assets/images/green-chemistry-event2.jpg",KC="/content/dam/acsorg/150/assets/images/acs-spring-meeting-event3.jpg";Xe.registerPlugin(Ke);Xe.registerPlugin(bo);let va={year:2026},ho=null,Ri=null;function zf(){Ri&&(Ri.kill(),Ri=null,console.log("Killed previous hero heading fade ScrollTrigger."));const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){console.log("Hero heading characters not found, attempting re-split...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new na(r,{types:"words,chars",absolute:!1}).chars,Xe.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"}),console.log("Hero heading re-split successfully.")}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Xe.timeline({paused:!0});n.to(t,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),Ri=Ke.create({animation:n,trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.direction===-1&&i.progress<.1&&Xe.set(e,{opacity:1,z:0})},onRefresh:i=>{const s=i.progress;n.progress(s),console.log(`Hero fade ScrollTrigger refreshed. Progress set to: ${s.toFixed(2)}`)}}),console.log("Hero heading fade animation set up.")}else console.warn("#hero-area h1 not found for fade animation setup.")}function ZC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),s=document.querySelector("button.enter-experience");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),t&&Xe.set(t,{opacity:0,autoAlpha:0}),i&&Xe.set(i,{opacity:0,autoAlpha:0}),s&&Xe.set(s,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Ke.getAll().forEach(f=>{(f.vars.trigger==="#hero-area"||f.vars.trigger==="#hero-travel-area")&&f.kill()});const o=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",o),e.innerHTML="",o.split("").forEach(f=>{const h=document.createElement("span");h.className="digit",h.textContent=f,h.setAttribute("data-digit",f),e.appendChild(h)}),Xe.set(e,{opacity:0,autoAlpha:0}),Xe.set(r,{opacity:0,autoAlpha:0});const a=new na(r,{types:"words,chars",absolute:!1});Xe.set(a.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const l=Xe.timeline({delay:.5});l.to(r,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"});const c=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(c)},840);const u=[...a.chars];for(let f=u.length-1;f>0;f--){const h=Math.floor(Math.random()*(f+1));[u[f],u[h]]=[u[h],u[f]]}l.to(u,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const f=new CustomEvent("particleFadeStart");document.dispatchEvent(f)}}),l.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"}),Xe.set(n,{opacity:1,autoAlpha:1});const d=e.querySelectorAll(".digit");l.fromTo(d,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{window.heroAnimationComplete=!0;const f=new CustomEvent("heroAnimationComplete");document.dispatchEvent(f)}},"-=0.6"),s&&Xe.to(s,{opacity:1,autoAlpha:1,duration:.8,delay:3.8,ease:"power2.out"}),s&&s.addEventListener("click",()=>{t&&Xe.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),i&&Xe.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.enterButtonClicked=!0,window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Xe.to(s,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(Xe.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0}}),Ke.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=.44+f.progress*.56;e.querySelectorAll(".digit").forEach(m=>{m.style.opacity=_})}}),Ke.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=1-f.progress;e.style.opacity=_}}))}function JC(){console.log("Initializing animations"),QC(),Ke.refresh(),Ke.clearMatchMedia(),console.log("Killing all existing ScrollTriggers..."),Ke.getAll().forEach(y=>y.kill()),ho=null,Ri=null,va.year=2026,Xe.registerPlugin(Ke),Xe.registerPlugin(na),ZC(),tR(),Eg(),nR(),Tg(),eR(),jc(null),$c(null),Ag(),iR(),rR(),oR();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const y=document.querySelector("nav"),L=document.querySelector("header");y&&y.classList.toggle("active"),L&&L.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const y=window.scrollY,L=document.querySelector("header.anniversary");L&&(y>e?L.classList.remove("active"):L.classList.add("active")),e=y});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const y=document.querySelector("nav"),L=document.querySelector("header");y&&y.classList.remove("active"),L&&L.classList.remove("nav-active")}),zf();const n=document.querySelector("#hero-number");n?(console.log("Setting up hero number countdown animation."),console.log(`Initial heroYearObj.year: ${va.year}`),ho?(console.log("Hero number tween already exists, ensuring it is active."),ho.scrollTrigger&&ho.scrollTrigger.enable(),ho.resume()):(console.log("Creating hero number tween..."),ho=Xe.to(va,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(y){const L=Math.round(va.year).toString(),D=n.querySelectorAll(".digit"),z=L.split("");D.length!==z.length?(n.innerHTML="",z.forEach(O=>{const T=document.createElement("span");T.className="digit",T.textContent=O,T.setAttribute("data-digit",O),n.appendChild(T)})):D.forEach((O,T)=>{O.textContent!==z[T]&&(O.textContent=z[T],O.setAttribute("data-digit",z[T]))})},onRefresh:y=>{console.log(`Hero Number ST Refreshed -> Progress: ${y.progress.toFixed(3)}, Year: ${va.year.toFixed(0)}`)}}}))):console.warn("#hero-number element not found for countdown animation."),document.querySelectorAll(".pin-top-top").forEach(function(y){let L=y.parentElement;y.id==="hero-area"?Ke.create({trigger:L,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:D=>{D.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ke.create({trigger:L,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(y){Xe.set(y,{opacity:0}),Xe.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(y){Xe.set(y,{opacity:0}),Xe.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(y){let L=y.parentElement;Ke.create({trigger:L,start:"top center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(y){let L=y.parentElement;Ke.create({trigger:L,start:"center center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(y){let L=y.parentElement;Ke.create({trigger:L,start:"bottom bottom",end:"",pin:y,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=Xe.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=new Audio(qC);o.volume=.38;const a=()=>{if(!window.audioMuted)try{const y=o.cloneNode();y.volume=.38,y.play().catch(L=>{console.warn("UI click sound play was prevented:",L)})}catch(y){console.error("Error playing UI click sound:",y)}},l=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(D=>{D.addEventListener("click",z=>{if(D.classList.contains("enter-experience")){D.dataset.clickSoundPlayed||(window.audioMuted||a(),D.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}),new MutationObserver(D=>{D.forEach(z=>{z.type==="childList"&&z.addedNodes.forEach(O=>{O.nodeType===1&&(O.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&O.addEventListener("click",W=>{if(O.classList.contains("enter-experience")){O.dataset.clickSoundPlayed||(window.audioMuted||a(),O.dataset.clickSoundPlayed="true");return}window.audioMuted||a()}),O.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(W=>{W.addEventListener("click",Z=>{if(W.classList.contains("enter-experience")){W.dataset.clickSoundPlayed||(window.audioMuted||a(),W.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},c=y=>{window.userInteracted=!0,window.enterButtonClicked&&!window.audioInitialized&&window.heroAnimationComplete&&!window.audioMuted&&window.playBackgroundAudio(!0)};document.addEventListener("click",c),document.addEventListener("touchstart",c),document.addEventListener("keydown",c);const u=document.querySelector(".sound-toggle");u&&u.addEventListener("click",()=>{a(),u.classList.toggle("muted"),window.audioMuted=u.classList.contains("muted"),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0,window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))):(s.resume(),!window.audioInitialized&&window.enterButtonClicked&&window.backgroundAudio?(window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):!window.audioMuted&&window.enterButtonClicked&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt from toggle..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500))):window.audioInitialized&&window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(y=>{console.warn("Audio play was prevented:",y),window.audioInitialized=!1,window.enterButtonClicked&&window.playBackgroundAudio(!0)})))});const d=document.querySelector(".section-timeline .page-nav");if(!d){console.warn("Page navigation element (.section-timeline .n) not found - skipping navigation setup");return}const f=d.querySelectorAll("a"),h=document.querySelector(".section-timeline .indicator .active-title"),_=document.querySelector(".section-timeline .indicator-wrapper"),g=document.querySelector(".timeline-nav-wrapper");h||console.warn("Active title element (.section-timeline .indicator .active-title) not found"),!_&&!g&&console.warn("Neither indicator wrapper nor timeline nav wrapper found - navigation may not work properly");let m=!1,p=!1,b,x=!1;Xe.set(f,{opacity:0,x:-20}),Xe.set(h,{opacity:1});const v=()=>{b&&(clearTimeout(b),b=null),Xe.killTweensOf(h),Xe.killTweensOf(f)},M=()=>{v(),x||!p?(m=!1,Xe.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{!m&&(!p||x)&&Xe.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})):p&&!x&&(m=!0,Xe.set(h,{opacity:0}),Xe.to(f,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"}))},C=y=>{const L=g||_,D=g?null:d;if(!L)return!1;const z=L.getBoundingClientRect();let O=null;D&&(O=D.getBoundingClientRect());const T=y.clientX,W=y.clientY,Z=T>=z.left&&T<=z.right&&W>=z.top&&W<=z.bottom;let q=!1;return O&&(q=T>=O.left&&T<=O.right&&W>=O.top&&W<=O.bottom),Z||q},E=y=>{const L=p;p=C(y),!p&&x&&(x=!1),L!==p&&!x&&(clearTimeout(b),b=setTimeout(()=>{M()},16))};document.removeEventListener("mousemove",E),document.addEventListener("mousemove",E);const P=[g,_,d].filter(Boolean);P.forEach(y=>{y&&(y.addEventListener("mouseenter",()=>{x||(p=!0,M())}),y.addEventListener("mouseleave",L=>{const D=L.clientX||0,z=L.clientY||0;setTimeout(()=>{y.getBoundingClientRect();let O=!1;P.forEach(T=>{if(T){const W=T.getBoundingClientRect();D>=W.left&&D<=W.right&&z>=W.top&&z<=W.bottom&&(O=!0)}}),O||(p=!1,x&&(x=!1),M())},50)}))}),f.forEach(y=>{const L=y.onclick;L&&y.removeEventListener("click",L),y.addEventListener("click",D=>{D.preventDefault(),v(),f.forEach(z=>z.classList.remove("active")),y.classList.add("active"),h.textContent=y.textContent,x=!0,p=!1,m=!1,Xe.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{Xe.to(h,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=y=>{window.audioMuted&&(y.volume=0,y.muted=!0),y.addEventListener("play",()=>{const L=document.querySelector(".sound-toggle");L&&L.classList.contains("muted")&&(y.volume=0,y.muted=!0)})},new MutationObserver(y=>{y.forEach(L=>{L.type==="childList"&&L.addedNodes.forEach(D=>{D.nodeName==="AUDIO"||D.nodeName==="VIDEO"?window.handleNewAudioElement(D):D.querySelectorAll&&D.querySelectorAll("audio, video").forEach(O=>{window.handleNewAudioElement(O)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l(),Eg(),Tg(),jc(null),$c(null),Ag(),sR()}function QC(){const r=new Audio;r.addEventListener("canplaythrough",()=>{console.log("Background audio loaded and can play through without buffering"),window.backgroundAudioLoaded=!0,window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioInitialized&&!window.audioMuted&&e(!0)}),r.addEventListener("error",i=>{console.error("Audio loading error:",i),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=YC;try{r.load()}catch(i){console.error("Error loading background audio:",i)}window.backgroundAudio=r,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.backgroundAudioLoaded=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=10,window.playBackgroundAudio=(i=!1)=>{if(!window.audioMuted&&(i&&(window.enterButtonClicked=!0),!(!window.enterButtonClicked||!window.heroAnimationComplete)&&!window.audioInitialized)){if(window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null);return}if(window.backgroundAudioLoaded||r.readyState>=3)e(i);else if(console.log("Background audio not yet ready to play, will play when loaded"),i)try{r.load()}catch(s){console.warn("Error reloading background audio:",s)}}};function e(i=!1){if(!(window.audioInitialized||window.audioMuted)){if(window.audioRetryCount++,window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);return}try{if(r.volume=.08,i)try{const s=new(window.AudioContext||window.webkitAudioContext),o=s.createBufferSource();o.connect(s.destination),o.start(0)}catch(s){console.warn("Could not create audio context:",s)}r.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const s=document.querySelector(".sound-toggle");s&&s.classList.add("active"),window.audioRetryCount=0}).catch(s=>{console.error("Audio play was prevented:",s),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)})}catch(s){console.error("Error playing audio:",s),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)}}}let t=!1;const n=()=>{document.hidden?window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Tab hidden - pausing background audio"),t=!0,window.backgroundAudio.pause()):window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Tab visible - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))};document.addEventListener("visibilitychange",n),window.addEventListener("blur",()=>{window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Window blur - pausing background audio"),t=!0,window.backgroundAudio.pause())}),window.addEventListener("focus",()=>{window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(console.log("Window focus - resuming background audio"),t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio on focus:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))}),console.log("Background audio visibility change listeners initialized")}function eR(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function tR(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Xe.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Xe.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ke.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Eg(){const r=document.querySelector("#get-involved-text p");r&&(Xe.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new na(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),Xe.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Xe.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function Tg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),s=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!i||!s)return;const o=i.querySelector(".anniversary"),a=i.querySelector(".get-involved"),l=i.querySelector(".events"),c=_=>{if(s.textContent===_)return;const g=Xe.timeline();g.to(s,{opacity:0,duration:.18,onComplete:()=>{s.textContent=_}}),g.to(s,{opacity:1,duration:.24})};o.addEventListener("click",_=>{_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),o.classList.add("active"),c("150 Years of ACS"),window.scrollTo({top:0,behavior:"smooth"})}),a.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),a.classList.add("active"),c("Get Involved"),n){const g=n.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}else{const g=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}}),l.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),l.classList.add("active"),c("Events"),t){const g=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}});const u=[{id:"hero",element:r,title:"150 Years of ACS",link:o,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:a,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:a,top:0,bottom:0},{id:"events",element:t,title:"Events",link:l,top:0,bottom:0}];function d(){if(u.forEach(_=>{if(_.element){const g=_.element.getBoundingClientRect();_.top=g.top+window.pageYOffset,_.bottom=g.bottom+window.pageYOffset}}),u[0].element&&n){const _=n.getBoundingClientRect();u[0].bottom=_.top+window.pageYOffset}if(n&&t){const _=u.find(p=>p.id==="getinvolved-video"),g=u.find(p=>p.id==="getinvolved"),m=t.getBoundingClientRect();_&&g&&(g.top=_.top,g.bottom=m.top+window.pageYOffset)}}d();let f=null;function h(){requestAnimationFrame(()=>{const _=window.pageYOffset+window.innerHeight/2;let g=u[0];for(let m=u.length-1;m>=0;m--){const p=u[m];if(p.element&&_>=p.top&&_<p.bottom){g=p;break}}g.id==="getinvolved-video"&&(g=u.find(m=>m.id==="getinvolved")||g),f!==g.id&&(f=g.id,i.querySelectorAll("a").forEach(m=>m.classList.remove("active")),g.link&&g.link.classList.add("active"),c(g.title))})}window.removeEventListener("scroll",h),window.addEventListener("scroll",h),window.addEventListener("resize",zh(()=>{d(),h()},100)),h()}function nR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Xe.set(r,{x:0}),console.log("Sliding cards animation disabled for small viewport")),l&&!n&&(n=Xe.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger,console.log("Sliding cards animation initialized for large viewport"))},o=()=>{i&&(i.kill(),i=null),t&&(i=Ke.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Xe.set(t,{opacity:c})},onLeaveBack:()=>{Xe.set(t,{opacity:1})}}),console.log("Hero travel area fade animation initialized"))};s(),o();const a=zh(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function jc(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new na(o,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});d.lines&&d.lines.length>0&&d.lines.length>1?(t.push({element:o,splitText:d,originalContent:l}),Xe.set(d.lines,{opacity:0,y:50}),Ke.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-lines-${a}`,onEnter:()=>{Xe.to(d.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Xe.to(d.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitLines=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)}),console.log("Split lines cleanup completed")},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((a,l)=>{s(a,l)}),console.log("Split lines refreshed")},100)},console.log(`Initialized split lines animations for ${e.length} elements`)}function $c(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new na(o,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});d.chars&&d.chars.length>0?(t.push({element:o,splitText:d,originalContent:l}),Xe.set(d.chars,{opacity:0,y:50,display:"inline-block"}),Ke.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-chars-${a}`,onEnter:()=>{Xe.to(d.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Xe.to(d.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create chars after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitChars=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)}),console.log("Split chars cleanup completed")},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((a,l)=>{s(a,l)}),console.log("Split chars refreshed")},100)},console.log(`Initialized split chars animations for ${e.length} elements`)}function Ag(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(Xe.set(e,{y:50,filter:"opacity(0)"}),Ke.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Xe.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Xe.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Xe.set(e,{opacity:0,y:50}),Ke.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Xe.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Xe.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))}),console.log(`Initialized scroll reveal animations for ${r.length} elements`)}function iR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Xe.set(r,{opacity:0,y:50}),Ke.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Xe.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Xe.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}),console.log("Initialized get involved logo fade animation")}function rR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}const t=document.createElement("div");t.className="marquee-container";const n=e.cloneNode(!0);e.remove(),t.appendChild(e),t.appendChild(n),r.appendChild(t);const i=()=>{setTimeout(()=>{const s=e.getBoundingClientRect(),o=s.height;console.log("Image dimensions:",{natural:{width:e.naturalWidth,height:e.naturalHeight},rendered:{width:s.width,height:o}}),Xe.set(e,{top:0,left:0}),Xe.set(n,{top:o+"px",left:0});const a=Xe.timeline({repeat:-1,ease:"none"}),l=o/30;a.to([e,n],{y:-o,duration:l,ease:"none"}),a.set([e,n],{y:0}),console.log("Initialized infinite marquee animation with height:",o)},100)};e.complete&&e.naturalHeight!==0?i():(e.addEventListener("load",i),setTimeout(i,1e3))}function sR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[jC,$C,KC],t="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,n=document.createElement("img");n.className="mouse-following-image",n.style.cssText=`
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
  `,document.body.appendChild(n);let i=0,s=0;const o=a=>{i=a.clientX,s=a.clientY,n.style.left=i+"px",n.style.top=s+"px"};document.addEventListener("mousemove",o),r.forEach((a,l)=>{const c=e[l];if(!c){console.warn(`No image mapped for event item ${l}`);return}a.addEventListener("mouseenter",()=>{n.src=c,n.style.opacity="1",a.classList.add("active"),n.style.left=i+"px",n.style.top=s+"px"}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",a.classList.remove("active")})}),console.log(`Initialized hover interactions for ${r.length} event list items`)}function zh(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function Cg(){console.log("Reinitializing all split-type elements..."),typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Ri&&Ri.animation){n=Ri.progress,console.log(`Capturing hero fade progress before kill: ${n.toFixed(3)}`);const i=r.querySelectorAll(".char");if(i.length>0){const s=Xe.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Ri&&(console.log("Killing existing hero heading fade ScrollTrigger during reinit..."),Ri.kill(),Ri=null),r.querySelector(".char"))console.log("Hero heading already split, preserving characters to prevent flash.");else{console.log("Hero heading not split, resetting content...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{console.log("Reinitializing animations after cleanup..."),e.length&&typeof jc=="function"&&jc(e),t.length&&typeof $c=="function"&&$c(t),typeof zf=="function"&&zf(),Ke.refresh(),console.log("ScrollTrigger.refresh() called after reinitializations."),console.log("All split-type elements and hero animation reinitialized.")},50)}function oR(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=zh(()=>{console.log("Window resized, reinitializing animations..."),Cg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{console.log("Orientation changed, reinitializing animations..."),Cg()}),console.log("Global resize handler initialized.")}const Rg="/content/dam/acsorg/150/assets/video/acs-150-compressed.mp4",Pg="/content/dam/acsorg/150/assets/images/anniversary-video-poster.jpg";function aR(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;console.log("Setting video source:",Rg),r.src=Rg,console.log("Setting poster path:",Pg),r.poster=Pg,r.addEventListener("error",d=>{var f,h;console.error("Video loading error:",d),console.error("Video src:",r.src),console.error("Video error code:",(f=r.error)==null?void 0:f.code),console.error("Video error message:",(h=r.error)==null?void 0:h.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=(d,f,h=1e3)=>{if(!d)return;const _=d.volume,g=performance.now(),m=p=>{const b=p-g,x=Math.min(b/h,1),v=x*x;d.volume=_+(f-_)*v,x<1&&requestAnimationFrame(m)};requestAnimationFrame(m)},s=()=>{r.paused||(r.pause(),t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08))},o=()=>{r.paused?(r.play(),t.classList.add("hidden"),window.backgroundAudio&&i(window.backgroundAudio,0),r.volume=window.audioMuted?0:.5):s()};t.addEventListener("click",o),r.addEventListener("click",o),r.addEventListener("ended",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),new IntersectionObserver(d=>{d.forEach(f=>{f.isIntersecting||s()})},{threshold:.5}).observe(e);const l=()=>{r.paused||(r.volume=window.audioMuted?0:.5)},c=document.querySelector(".sound-toggle");c&&c.addEventListener("click",l);let u=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return u},set:function(d){u=d,l()}})}new Date("2026-04-06T00:00:00").getTime();function lR(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();if(r.includes("/editor.html/")||r.includes("globe.html"))return console.log("Not on main page - editor or globe page detected"),!1;const t=r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html");return console.log("URL check:",r),console.log("Pathname:",e),console.log("Is main page:",t),t}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Pv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),GT(),lR()?(console.log("Initializing main page experience"),JC(),aR()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
