
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

var cv=Object.defineProperty;var uv=(r,e,t)=>e in r?cv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ke=(r,e,t)=>uv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var dv="1.3.4";function Tg(r,e,t){return Math.max(r,Math.min(e,t))}function fv(r,e,t){return(1-t)*r+t*e}function hv(r,e,t,n){return fv(r,e,1-Math.exp(-t*n))}function pv(r,e){return(r%e+e)%e}var mv=class{constructor(){Ke(this,"isRunning",!1);Ke(this,"value",0);Ke(this,"from",0);Ke(this,"to",0);Ke(this,"currentTime",0);Ke(this,"lerp");Ke(this,"duration");Ke(this,"easing");Ke(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Tg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=hv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function gv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var _v=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ke(this,"width",0);Ke(this,"height",0);Ke(this,"scrollHeight",0);Ke(this,"scrollWidth",0);Ke(this,"debouncedResize");Ke(this,"wrapperResizeObserver");Ke(this,"contentResizeObserver");Ke(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ke(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ke(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=gv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Ag=class{constructor(){Ke(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Bh=100/6,wr={passive:!1},vv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ke(this,"touchStart",{x:0,y:0});Ke(this,"lastDelta",{x:0,y:0});Ke(this,"window",{width:0,height:0});Ke(this,"emitter",new Ag);Ke(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ke(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ke(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ke(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Bh:n===2?this.window.width:1,s=n===1?Bh:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ke(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,wr),this.element.addEventListener("touchstart",this.onTouchStart,wr),this.element.addEventListener("touchmove",this.onTouchMove,wr),this.element.addEventListener("touchend",this.onTouchEnd,wr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,wr),this.element.removeEventListener("touchstart",this.onTouchStart,wr),this.element.removeEventListener("touchmove",this.onTouchMove,wr),this.element.removeEventListener("touchend",this.onTouchEnd,wr)}},zh=r=>Math.min(1,1.001-Math.pow(2,-10*r)),yv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:x=!0,autoRaf:b=!1,anchors:v=!1,autoToggle:M=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:A=!1}={}){Ke(this,"_isScrolling",!1);Ke(this,"_isStopped",!1);Ke(this,"_isLocked",!1);Ke(this,"_preventNextNativeScrollEvent",!1);Ke(this,"_resetVelocityTimeout",null);Ke(this,"__rafID",null);Ke(this,"isTouching");Ke(this,"time",0);Ke(this,"userData",{});Ke(this,"lastVelocity",0);Ke(this,"velocity",0);Ke(this,"direction",0);Ke(this,"options");Ke(this,"targetScroll");Ke(this,"animatedScroll");Ke(this,"animate",new mv);Ke(this,"emitter",new Ag);Ke(this,"dimensions");Ke(this,"virtualScroll");Ke(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ke(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ke(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});Ke(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});Ke(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ke(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,x,b;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-touch"))||s&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ke(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ke(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=dv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=zh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:x,autoRaf:b,anchors:v,autoToggle:M,allowNestedScroll:T,__experimental__naiveDimensions:A},this.dimensions=new _v(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new vv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Tg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=zh:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const M=window.getComputedStyle(r);i.computedStyle=M;const T=M.overflowX,A=M.overflowY;if(s=["auto","overlay","scroll"].includes(T),o=["auto","overlay","scroll"].includes(A),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const M=e!==0,T=t!==0;M&&s&&a&&(_="x"),T&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,x,b;if(_==="x")g=r.scrollLeft,m=c-d,p=e,x=s,b=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,x=o,b=l;else return!1;return(p>0?g<m:g>0)&&x&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?pv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const xv="modulepreload",Sv=function(r){return"/150-lab/"+r},Hh={},Vh=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=Sv(c),c in Hh)return;Hh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":xv,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bf="177",bv=0,Gh=1,wv=2,Cg=1,Mv=2,ar=3,xr=0,Vn=1,mi=2,Vr=0,Gr=1,cd=2,Wh=3,Xh=4,Ev=5,vs=100,Tv=101,Av=102,Cv=103,Rv=104,Pv=200,Lv=201,Dv=202,Iv=203,ud=204,dd=205,Nv=206,Ov=207,Uv=208,Fv=209,kv=210,Bv=211,zv=212,Hv=213,Vv=214,fd=0,hd=1,pd=2,Lo=3,md=4,gd=5,_d=6,vd=7,Rg=0,Gv=1,Wv=2,Wr=0,Xv=1,qv=2,Yv=3,$v=4,jv=5,Kv=6,Zv=7,qh="attached",Jv="detached",Pg=300,Do=301,Io=302,yd=303,xd=304,$c=306,No=1e3,Nr=1001,Tc=1002,Fn=1003,Lg=1004,va=1005,ii=1006,uc=1007,fr=1008,Ki=1009,Dg=1010,Ig=1011,Ka=1012,zf=1013,Is=1014,Pi=1015,pl=1016,Hf=1017,Vf=1018,Za=1020,Ng=35902,Og=1021,Ug=1022,gi=1023,Ja=1026,Qa=1027,Gf=1028,Wf=1029,Fg=1030,Xf=1031,qf=1033,dc=33776,fc=33777,hc=33778,pc=33779,Sd=35840,bd=35841,wd=35842,Md=35843,Ed=36196,Td=37492,Ad=37496,Cd=37808,Rd=37809,Pd=37810,Ld=37811,Dd=37812,Id=37813,Nd=37814,Od=37815,Ud=37816,Fd=37817,kd=37818,Bd=37819,zd=37820,Hd=37821,mc=36492,Vd=36494,Gd=36495,kg=36283,Wd=36284,Xd=36285,qd=36286,el=2300,tl=2301,ou=2302,Yh=2400,$h=2401,jh=2402,Qv=2500,ey=0,Bg=1,Yd=2,ty=3200,ny=3201,zg=0,iy=1,Ir="",mn="srgb",kn="srgb-linear",Ac="linear",Ut="srgb",Gs=7680,Kh=519,ry=512,sy=513,oy=514,Hg=515,ay=516,ly=517,cy=518,uy=519,$d=35044,Zh="300 es",hr=2e3,Cc=2001;class Yo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jh=1234567;const La=Math.PI/180,Oo=180/Math.PI;function Li(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[r&255]+yn[r>>8&255]+yn[r>>16&255]+yn[r>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function xt(r,e,t){return Math.max(e,Math.min(t,r))}function Yf(r,e){return(r%e+e)%e}function dy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function fy(r,e,t){return r!==e?(t-r)/(e-r):0}function Da(r,e,t){return(1-t)*r+t*e}function hy(r,e,t,n){return Da(r,e,1-Math.exp(-t*n))}function py(r,e=1){return e-Math.abs(Yf(r,e*2)-e)}function my(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function gy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function _y(r,e){return r+Math.floor(Math.random()*(e-r+1))}function vy(r,e){return r+Math.random()*(e-r)}function yy(r){return r*(.5-Math.random())}function xy(r){r!==void 0&&(Jh=r);let e=Jh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sy(r){return r*La}function by(r){return r*Oo}function wy(r){return(r&r-1)===0&&r!==0}function My(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ey(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ty(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ai(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Nt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Ay={DEG2RAD:La,RAD2DEG:Oo,generateUUID:Li,clamp:xt,euclideanModulo:Yf,mapLinear:dy,inverseLerp:fy,lerp:Da,damp:hy,pingpong:py,smoothstep:my,smootherstep:gy,randInt:_y,randFloat:vy,randFloatSpread:yy,seededRandom:xy,degToRad:Sy,radToDeg:by,isPowerOfTwo:wy,ceilPowerOfTwo:My,floorPowerOfTwo:Ey,setQuaternionFromProperEuler:Ty,normalize:Nt,denormalize:Ai};class bt{constructor(e=0,t=0){bt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,x=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const M=Math.sqrt(b),T=Math.atan2(M,p*x);m=Math.sin(m*T)/M,a=Math.sin(a*T)/M}const v=a*x;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return au.copy(this).projectOnVector(e),this.sub(au)}reflect(e){return this.sub(au.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const au=new V,Qh=new Qr;class pt{constructor(e,t,n,i,s,o,a,l,c){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],x=i[1],b=i[4],v=i[7],M=i[2],T=i[5],A=i[8];return s[0]=o*g+a*x+l*M,s[3]=o*m+a*b+l*T,s[6]=o*p+a*v+l*A,s[1]=c*g+u*x+d*M,s[4]=c*m+u*b+d*T,s[7]=c*p+u*v+d*A,s[2]=f*g+h*x+_*M,s[5]=f*m+h*b+_*T,s[8]=f*p+h*v+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lu.makeScale(e,t)),this}rotate(e){return this.premultiply(lu.makeRotation(-e)),this}translate(e,t){return this.premultiply(lu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lu=new pt;function Vg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function nl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Cy(){const r=nl("canvas");return r.style.display="block",r}const ep={};function xo(r){r in ep||(ep[r]=!0,console.warn(r))}function Ry(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Py(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ly(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const tp=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),np=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dy(){const r={enabled:!0,workingColorSpace:kn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ut&&(i.r=_r(i.r),i.g=_r(i.g),i.b=_r(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ut&&(i.r=So(i.r),i.g=So(i.g),i.b=So(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ir?Ac:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return xo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return xo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[kn]:{primaries:e,whitePoint:n,transfer:Ac,toXYZ:tp,fromXYZ:np,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:tp,fromXYZ:np,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),r}const Et=Dy();function _r(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function So(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ws;class Iy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ws===void 0&&(Ws=nl("canvas")),Ws.width=e.width,Ws.height=e.height;const i=Ws.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=nl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=_r(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_r(t[n]/255)*255):t[n]=_r(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ny=0;class $f{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(cu(i[o].image)):s.push(cu(i[o]))}else s=cu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function cu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Iy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Oy=0;const uu=new V;class on extends Yo{constructor(e=on.DEFAULT_IMAGE,t=on.DEFAULT_MAPPING,n=Nr,i=Nr,s=ii,o=fr,a=gi,l=Ki,c=on.DEFAULT_ANISOTROPY,u=Ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Li(),this.name="",this.source=new $f(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uu).x}get height(){return this.source.getSize(uu).y}get depth(){return this.source.getSize(uu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case No:e.x=e.x-Math.floor(e.x);break;case Nr:e.x=e.x<0?0:1;break;case Tc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case No:e.y=e.y-Math.floor(e.y);break;case Nr:e.y=e.y<0?0:1;break;case Tc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Pg;on.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,n=0,i=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,v=(h+1)/2,M=(p+1)/2,T=(u+f)/4,A=(d+g)/4,L=(_+m)/4;return b>v&&b>M?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=T/n,s=A/n):v>M?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=T/i,s=L/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=A/s,i=L/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(d-g)/x,this.z=(f-u)/x,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uy extends Yo{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new on(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new $f(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ns extends Uy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Gg extends on{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fy extends on{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ni{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Si):Si.fromBufferAttribute(s,o),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yl.copy(n.boundingBox)),yl.applyMatrix4(e.matrixWorld),this.union(yl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),xl.subVectors(this.max,ea),Xs.subVectors(e.a,ea),qs.subVectors(e.b,ea),Ys.subVectors(e.c,ea),Mr.subVectors(qs,Xs),Er.subVectors(Ys,qs),rs.subVectors(Xs,Ys);let t=[0,-Mr.z,Mr.y,0,-Er.z,Er.y,0,-rs.z,rs.y,Mr.z,0,-Mr.x,Er.z,0,-Er.x,rs.z,0,-rs.x,-Mr.y,Mr.x,0,-Er.y,Er.x,0,-rs.y,rs.x,0];return!du(t,Xs,qs,Ys,xl)||(t=[1,0,0,0,1,0,0,0,1],!du(t,Xs,qs,Ys,xl))?!1:(Sl.crossVectors(Mr,Er),t=[Sl.x,Sl.y,Sl.z],du(t,Xs,qs,Ys,xl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const tr=[new V,new V,new V,new V,new V,new V,new V,new V],Si=new V,yl=new Ni,Xs=new V,qs=new V,Ys=new V,Mr=new V,Er=new V,rs=new V,ea=new V,xl=new V,Sl=new V,ss=new V;function du(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ss.fromArray(r,s);const a=i.x*Math.abs(ss.x)+i.y*Math.abs(ss.y)+i.z*Math.abs(ss.z),l=e.dot(ss),c=t.dot(ss),u=n.dot(ss);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ky=new Ni,ta=new V,fu=new V;class Qi{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ky.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);const t=ta.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ta,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add(fu)),this.expandByPoint(ta.copy(e.center).sub(fu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const nr=new V,hu=new V,bl=new V,Tr=new V,pu=new V,wl=new V,mu=new V;class jc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,nr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=nr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(nr.copy(this.origin).addScaledVector(this.direction,t),nr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){hu.copy(e).add(t).multiplyScalar(.5),bl.copy(t).sub(e).normalize(),Tr.copy(this.origin).sub(hu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(bl),a=Tr.dot(this.direction),l=-Tr.dot(bl),c=Tr.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(hu).addScaledVector(bl,f),h}intersectSphere(e,t){nr.subVectors(e.center,this.origin);const n=nr.dot(this.direction),i=nr.dot(nr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,nr)!==null}intersectTriangle(e,t,n,i,s){pu.subVectors(t,e),wl.subVectors(n,e),mu.crossVectors(pu,wl);let o=this.direction.dot(mu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Tr.subVectors(this.origin,e);const l=a*this.direction.dot(wl.crossVectors(Tr,wl));if(l<0)return null;const c=a*this.direction.dot(pu.cross(Tr));if(c<0||l+c>o)return null;const u=-a*Tr.dot(mu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/$s.setFromMatrixColumn(e,0).length(),s=1/$s.setFromMatrixColumn(e,1).length(),o=1/$s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(By,e,zy)}lookAt(e,t,n){const i=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),Ar.crossVectors(n,jn),Ar.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),Ar.crossVectors(n,jn)),Ar.normalize(),Ml.crossVectors(jn,Ar),i[0]=Ar.x,i[4]=Ml.x,i[8]=jn.x,i[1]=Ar.y,i[5]=Ml.y,i[9]=jn.y,i[2]=Ar.z,i[6]=Ml.z,i[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],x=n[3],b=n[7],v=n[11],M=n[15],T=i[0],A=i[4],L=i[8],S=i[12],y=i[1],C=i[5],w=i[9],k=i[13],G=i[2],W=i[6],X=i[10],j=i[14],I=i[3],fe=i[7],N=i[11],_e=i[15];return s[0]=o*T+a*y+l*G+c*I,s[4]=o*A+a*C+l*W+c*fe,s[8]=o*L+a*w+l*X+c*N,s[12]=o*S+a*k+l*j+c*_e,s[1]=u*T+d*y+f*G+h*I,s[5]=u*A+d*C+f*W+h*fe,s[9]=u*L+d*w+f*X+h*N,s[13]=u*S+d*k+f*j+h*_e,s[2]=_*T+g*y+m*G+p*I,s[6]=_*A+g*C+m*W+p*fe,s[10]=_*L+g*w+m*X+p*N,s[14]=_*S+g*k+m*j+p*_e,s[3]=x*T+b*y+v*G+M*I,s[7]=x*A+b*C+v*W+M*fe,s[11]=x*L+b*w+v*X+M*N,s[15]=x*S+b*k+v*j+M*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],x=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,b=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,M=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,T=t*x+n*b+i*v+s*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=x*A,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*A,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*A,e[4]=b*A,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*A,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*A,e[8]=v*A,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*A,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*A,e[12]=M*A,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*A,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*A,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,x=l*c,b=l*u,v=l*d,M=n.x,T=n.y,A=n.z;return i[0]=(1-(g+p))*M,i[1]=(h+v)*M,i[2]=(_-b)*M,i[3]=0,i[4]=(h-v)*T,i[5]=(1-(f+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(_+b)*A,i[9]=(m-x)*A,i[10]=(1-(f+g))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=$s.set(i[0],i[1],i[2]).length();const o=$s.set(i[4],i[5],i[6]).length(),a=$s.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],bi.copy(this);const c=1/s,u=1/o,d=1/a;return bi.elements[0]*=c,bi.elements[1]*=c,bi.elements[2]*=c,bi.elements[4]*=u,bi.elements[5]*=u,bi.elements[6]*=u,bi.elements[8]*=d,bi.elements[9]*=d,bi.elements[10]*=d,t.setFromRotationMatrix(bi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=hr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===hr)h=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Cc)h=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=hr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===hr)_=(o+s)*d,g=-2*d;else if(a===Cc)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const $s=new V,bi=new mt,By=new V(0,0,0),zy=new V(1,1,1),Ar=new V,Ml=new V,jn=new V,ip=new mt,rp=new Qr;class Zi{constructor(e=0,t=0,n=0,i=Zi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ip,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rp.setFromEuler(this),this.setFromQuaternion(rp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zi.DEFAULT_ORDER="XYZ";class Wg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hy=0;const sp=new V,js=new Qr,ir=new mt,El=new V,na=new V,Vy=new V,Gy=new Qr,op=new V(1,0,0),ap=new V(0,1,0),lp=new V(0,0,1),cp={type:"added"},Wy={type:"removed"},Ks={type:"childadded",child:null},gu={type:"childremoved",child:null};class Yt extends Yo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new V,t=new Zi,n=new Qr,i=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new mt},normalMatrix:{value:new pt}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(op,e)}rotateY(e){return this.rotateOnAxis(ap,e)}rotateZ(e){return this.rotateOnAxis(lp,e)}translateOnAxis(e,t){return sp.copy(e).applyQuaternion(this.quaternion),this.position.add(sp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(op,e)}translateY(e){return this.translateOnAxis(ap,e)}translateZ(e){return this.translateOnAxis(lp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ir.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?El.copy(e):El.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ir.lookAt(na,El,this.up):ir.lookAt(El,na,this.up),this.quaternion.setFromRotationMatrix(ir),i&&(ir.extractRotation(i.matrixWorld),js.setFromRotationMatrix(ir),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cp),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wy),gu.child=e,this.dispatchEvent(gu),gu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ir.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ir.multiply(e.parent.matrixWorld)),e.applyMatrix4(ir),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cp),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,Vy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,Gy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Yt.DEFAULT_UP=new V(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wi=new V,rr=new V,_u=new V,sr=new V,Zs=new V,Js=new V,up=new V,vu=new V,yu=new V,xu=new V,Su=new Rt,bu=new Rt,wu=new Rt;class Ci{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),wi.subVectors(e,t),i.cross(wi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){wi.subVectors(i,t),rr.subVectors(n,t),_u.subVectors(e,t);const o=wi.dot(wi),a=wi.dot(rr),l=wi.dot(_u),c=rr.dot(rr),u=rr.dot(_u),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,sr)===null?!1:sr.x>=0&&sr.y>=0&&sr.x+sr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,sr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,sr.x),l.addScaledVector(o,sr.y),l.addScaledVector(a,sr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Su.setScalar(0),bu.setScalar(0),wu.setScalar(0),Su.fromBufferAttribute(e,t),bu.fromBufferAttribute(e,n),wu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Su,s.x),o.addScaledVector(bu,s.y),o.addScaledVector(wu,s.z),o}static isFrontFacing(e,t,n,i){return wi.subVectors(n,t),rr.subVectors(e,t),wi.cross(rr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wi.subVectors(this.c,this.b),rr.subVectors(this.a,this.b),wi.cross(rr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ci.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Zs.subVectors(i,n),Js.subVectors(s,n),vu.subVectors(e,n);const l=Zs.dot(vu),c=Js.dot(vu);if(l<=0&&c<=0)return t.copy(n);yu.subVectors(e,i);const u=Zs.dot(yu),d=Js.dot(yu);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Zs,o);xu.subVectors(e,s);const h=Zs.dot(xu),_=Js.dot(xu);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Js,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return up.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(up,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Zs,o).addScaledVector(Js,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cr={h:0,s:0,l:0},Tl={h:0,s:0,l:0};function Mu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let et=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Et.workingColorSpace){return this.r=e,this.g=t,this.b=n,Et.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Et.workingColorSpace){if(e=Yf(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Mu(o,s,e+1/3),this.g=Mu(o,s,e),this.b=Mu(o,s,e-1/3)}return Et.colorSpaceToWorking(this,i),this}setStyle(e,t=mn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mn){const n=Xg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}copyLinearToSRGB(e){return this.r=So(e.r),this.g=So(e.g),this.b=So(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mn){return Et.workingToColorSpace(xn.copy(this),e),Math.round(xt(xn.r*255,0,255))*65536+Math.round(xt(xn.g*255,0,255))*256+Math.round(xt(xn.b*255,0,255))}getHexString(e=mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.workingToColorSpace(xn.copy(this),t);const n=xn.r,i=xn.g,s=xn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Et.workingColorSpace){return Et.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=mn){Et.workingToColorSpace(xn.copy(this),e);const t=xn.r,n=xn.g,i=xn.b;return e!==mn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Cr),this.setHSL(Cr.h+e,Cr.s+t,Cr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cr),e.getHSL(Tl);const n=Da(Cr.h,Tl.h,t),i=Da(Cr.s,Tl.s,t),s=Da(Cr.l,Tl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const xn=new et;et.NAMES=Xg;let Xy=0;class Yi extends Yo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=Gr,this.side=xr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ud,this.blendDst=dd,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gr&&(n.blending=this.blending),this.side!==xr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ud&&(n.blendSrc=this.blendSrc),this.blendDst!==dd&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Lo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xs extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zi,this.combine=Rg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const en=new V,Al=new bt;let qy=0;class Jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$d,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Al.fromBufferAttribute(this,t),Al.applyMatrix3(e),this.setXY(t,Al.x,Al.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$d&&(e.usage=this.usage),e}}class qg extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yg extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vr extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Yy=0;const ui=new mt,Eu=new Yt,Qs=new V,Kn=new Ni,ia=new Ni,cn=new V;class Oi extends Yo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vg(e)?Yg:qg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new pt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ui.makeRotationFromQuaternion(e),this.applyMatrix4(ui),this}rotateX(e){return ui.makeRotationX(e),this.applyMatrix4(ui),this}rotateY(e){return ui.makeRotationY(e),this.applyMatrix4(ui),this}rotateZ(e){return ui.makeRotationZ(e),this.applyMatrix4(ui),this}translate(e,t,n){return ui.makeTranslation(e,t,n),this.applyMatrix4(ui),this}scale(e,t,n){return ui.makeScale(e,t,n),this.applyMatrix4(ui),this}lookAt(e){return Eu.lookAt(e),Eu.updateMatrix(),this.applyMatrix4(Eu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Kn.setFromBufferAttribute(s),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ia.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Kn.min,ia.min),Kn.expandByPoint(cn),cn.addVectors(Kn.max,ia.max),Kn.expandByPoint(cn)):(Kn.expandByPoint(ia.min),Kn.expandByPoint(ia.max))}Kn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)cn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(cn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)cn.fromBufferAttribute(a,c),l&&(Qs.fromBufferAttribute(e,c),cn.add(Qs)),i=Math.max(i,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new V,l[L]=new V;const c=new V,u=new V,d=new V,f=new bt,h=new bt,_=new bt,g=new V,m=new V;function p(L,S,y){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,y),f.fromBufferAttribute(s,L),h.fromBufferAttribute(s,S),_.fromBufferAttribute(s,y),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const C=1/(h.x*_.y-_.x*h.y);isFinite(C)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(C),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(C),a[L].add(g),a[S].add(g),a[y].add(g),l[L].add(m),l[S].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let L=0,S=x.length;L<S;++L){const y=x[L],C=y.start,w=y.count;for(let k=C,G=C+w;k<G;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new V,v=new V,M=new V,T=new V;function A(L){M.fromBufferAttribute(i,L),T.copy(M);const S=a[L];b.copy(S),b.sub(M.multiplyScalar(M.dot(S))).normalize(),v.crossVectors(T,S);const C=v.dot(l[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,C)}for(let L=0,S=x.length;L<S;++L){const y=x[L],C=y.start,w=y.count;for(let k=C,G=C+w;k<G;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Jt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Oi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dp=new mt,os=new jc,Cl=new Qi,fp=new V,Rl=new V,Pl=new V,Ll=new V,Tu=new V,Dl=new V,hp=new V,Il=new V;class Un extends Yt{constructor(e=new Oi,t=new xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Dl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Tu.fromBufferAttribute(d,e),o?Dl.addScaledVector(Tu,u):Dl.addScaledVector(Tu.sub(t),u))}t.add(Dl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cl.copy(n.boundingSphere),Cl.applyMatrix4(s),os.copy(e.ray).recast(e.near),!(Cl.containsPoint(os.origin)===!1&&(os.intersectSphere(Cl,fp)===null||os.origin.distanceToSquared(fp)>(e.far-e.near)**2))&&(dp.copy(s).invert(),os.copy(e.ray).applyMatrix4(dp),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,h.start),b=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=x,M=b;v<M;v+=3){const T=a.getX(v),A=a.getX(v+1),L=a.getX(v+2);i=Nl(this,p,e,n,c,u,d,T,A,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const x=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);i=Nl(this,o,e,n,c,u,d,x,b,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,h.start),b=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=x,M=b;v<M;v+=3){const T=v,A=v+1,L=v+2;i=Nl(this,p,e,n,c,u,d,T,A,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const x=m,b=m+1,v=m+2;i=Nl(this,o,e,n,c,u,d,x,b,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function $y(r,e,t,n,i,s,o,a){let l;if(e.side===Vn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===xr,a),l===null)return null;Il.copy(a),Il.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Il);return c<t.near||c>t.far?null:{distance:c,point:Il.clone(),object:r}}function Nl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Rl),r.getVertexPosition(l,Pl),r.getVertexPosition(c,Ll);const u=$y(r,e,t,n,Rl,Pl,Ll,hp);if(u){const d=new V;Ci.getBarycoord(hp,Rl,Pl,Ll,d),i&&(u.uv=Ci.getInterpolatedAttribute(i,a,l,c,d,new bt)),s&&(u.uv1=Ci.getInterpolatedAttribute(s,a,l,c,d,new bt)),o&&(u.normal=Ci.getInterpolatedAttribute(o,a,l,c,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new V,materialIndex:0};Ci.getNormal(Rl,Pl,Ll,f.normal),u.face=f,u.barycoord=d}return u}class ml extends Oi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new vr(c,3)),this.setAttribute("normal",new vr(u,3)),this.setAttribute("uv",new vr(d,2));function _(g,m,p,x,b,v,M,T,A,L,S){const y=v/A,C=M/L,w=v/2,k=M/2,G=T/2,W=A+1,X=L+1;let j=0,I=0;const fe=new V;for(let N=0;N<X;N++){const _e=N*C-k;for(let He=0;He<W;He++){const st=He*y-w;fe[g]=st*x,fe[m]=_e*b,fe[p]=G,c.push(fe.x,fe.y,fe.z),fe[g]=0,fe[m]=0,fe[p]=T>0?1:-1,u.push(fe.x,fe.y,fe.z),d.push(He/A),d.push(1-N/L),j+=1}}for(let N=0;N<L;N++)for(let _e=0;_e<A;_e++){const He=f+_e+W*N,st=f+_e+W*(N+1),Z=f+(_e+1)+W*(N+1),oe=f+(_e+1)+W*N;l.push(He,st,oe),l.push(st,Z,oe),I+=6}a.addGroup(h,I,S),h+=I,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ml(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Uo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pn(r){const e={};for(let t=0;t<r.length;t++){const n=Uo(r[t]);for(const i in n)e[i]=n[i]}return e}function jy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function $g(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const Ky={clone:Uo,merge:Pn};var Zy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Di extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zy,this.fragmentShader=Jy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Uo(e.uniforms),this.uniformsGroups=jy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jg extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=hr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rr=new V,pp=new bt,mp=new bt;class Hn extends jg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oo*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z),Rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z)}getViewSize(e,t){return this.getViewBounds(e,pp,mp),t.subVectors(mp,pp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(La*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const eo=-90,to=1;class Qy extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Hn(eo,to,e,t);i.layers=this.layers,this.add(i);const s=new Hn(eo,to,e,t);s.layers=this.layers,this.add(s);const o=new Hn(eo,to,e,t);o.layers=this.layers,this.add(o);const a=new Hn(eo,to,e,t);a.layers=this.layers,this.add(a);const l=new Hn(eo,to,e,t);l.layers=this.layers,this.add(l);const c=new Hn(eo,to,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===hr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Kg extends on{constructor(e=[],t=Do,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ex extends Ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Kg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ml(5,5,5),s=new Di({name:"CubemapFromEquirect",uniforms:Uo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Vr});s.uniforms.tEquirect.value=t;const o=new Un(i,s),a=t.minFilter;return t.minFilter===fr&&(t.minFilter=ii),new Qy(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class pr extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tx={type:"move"};class Au{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class gp extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zi,this.environmentIntensity=1,this.environmentRotation=new Zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class nx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$d,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new V;class jf{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ai(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),i=Nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new jf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const _p=new V,vp=new Rt,yp=new Rt,ix=new V,xp=new mt,Ol=new V,Cu=new Qi,Sp=new mt,Ru=new jc;class rx extends Un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=qh,this.bindMatrix=new mt,this.bindMatrixInverse=new mt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ni),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ol),this.boundingBox.expandByPoint(Ol)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ol),this.boundingSphere.expandByPoint(Ol)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cu.copy(this.boundingSphere),Cu.applyMatrix4(i),e.ray.intersectsSphere(Cu)!==!1&&(Sp.copy(i).invert(),Ru.copy(e.ray).applyMatrix4(Sp),!(this.boundingBox!==null&&Ru.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ru)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===qh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;vp.fromBufferAttribute(i.attributes.skinIndex,e),yp.fromBufferAttribute(i.attributes.skinWeight,e),_p.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=yp.getComponent(s);if(o!==0){const a=vp.getComponent(s);xp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ix.copy(_p).applyMatrix4(xp),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Zg extends Yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Jg extends on{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Fn,u=Fn,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bp=new mt,sx=new mt;class Kf{constructor(e=[],t=[]){this.uuid=Li(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new mt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new mt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:sx;bp.multiplyMatrices(a,t[s]),bp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Kf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Jg(t,e,e,gi,Pi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Zg),this.bones.push(o),this.boneInverses.push(new mt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class jd extends Jt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const no=new mt,wp=new mt,Ul=[],Mp=new Ni,ox=new mt,ra=new Un,sa=new Qi;class ax extends Un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ox)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,no),Mp.copy(e.boundingBox).applyMatrix4(no),this.boundingBox.union(Mp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,no),sa.copy(e.boundingSphere).applyMatrix4(no),this.boundingSphere.union(sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ra.geometry=this.geometry,ra.material=this.material,ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(n),e.ray.intersectsSphere(sa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,no),wp.multiplyMatrices(n,no),ra.matrixWorld=wp,ra.raycast(e,Ul);for(let o=0,a=Ul.length;o<a;o++){const l=Ul[o];l.instanceId=s,l.object=this,t.push(l)}Ul.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new jd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Jg(new Float32Array(i*this.count),i,this.count,Gf,Pi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pu=new V,lx=new V,cx=new pt;class hs{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pu.subVectors(n,t).cross(lx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||cx.getNormalMatrix(e),i=this.coplanarPoint(Pu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const as=new Qi,Fl=new V;class Zf{constructor(e=new hs,t=new hs,n=new hs,i=new hs,s=new hs,o=new hs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],x=i[13],b=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+x).normalize(),n[3].setComponents(l-o,f-u,m-_,v-x).normalize(),n[4].setComponents(l-a,f-d,m-g,v-b).normalize(),t===hr)n[5].setComponents(l+a,f+d,m+g,v+b).normalize();else if(t===Cc)n[5].setComponents(a,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){return as.center.set(0,0,0),as.radius=.7071067811865476,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Fl.x=i.normal.x>0?e.max.x:e.min.x,Fl.y=i.normal.y>0?e.max.y:e.min.y,Fl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Fl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qg extends Yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Rc=new V,Pc=new V,Ep=new mt,oa=new jc,kl=new Qi,Lu=new V,Tp=new V;class Jf extends Yt{constructor(e=new Oi,t=new Qg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Rc.fromBufferAttribute(t,i-1),Pc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Rc.distanceTo(Pc);e.setAttribute("lineDistance",new vr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kl.copy(n.boundingSphere),kl.applyMatrix4(i),kl.radius+=s,e.ray.intersectsSphere(kl)===!1)return;Ep.copy(i).invert(),oa.copy(e.ray).applyMatrix4(Ep);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),x=u.getX(g+1),b=Bl(this,e,oa,l,p,x,g);b&&t.push(b)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=Bl(this,e,oa,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=Bl(this,e,oa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Bl(this,e,oa,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Bl(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Rc.fromBufferAttribute(a,i),Pc.fromBufferAttribute(a,s),t.distanceSqToSegment(Rc,Pc,Lu,Tp)>n)return;Lu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Lu);if(!(c<e.near||c>e.far))return{distance:c,point:Tp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Ap=new V,Cp=new V;class ux extends Jf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Ap.fromBufferAttribute(t,i),Cp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ap.distanceTo(Cp);e.setAttribute("lineDistance",new vr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dx extends Jf{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class e_ extends Yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Rp=new mt,Kd=new jc,zl=new Qi,Hl=new V;class t_ extends Yt{constructor(e=new Oi,t=new e_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zl.copy(n.boundingSphere),zl.applyMatrix4(i),zl.radius+=s,e.ray.intersectsSphere(zl)===!1)return;Rp.copy(i).invert(),Kd.copy(e.ray).applyMatrix4(Rp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Hl.fromBufferAttribute(d,m),Pp(Hl,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)Hl.fromBufferAttribute(d,_),Pp(Hl,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pp(r,e,t,n,i,s,o){const a=Kd.distanceSqToPoint(r);if(a<t){const l=new V;Kd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class n_ extends on{constructor(e,t,n=Is,i,s,o,a=Fn,l=Fn,c,u=Ja,d=1){if(u!==Ja&&u!==Qa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $f(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ei extends Oi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let b=0;b<c;b++){const v=b*d-s;_.push(v,-x,0),g.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const b=x+c*p,v=x+c*(p+1),M=x+1+c*(p+1),T=x+1+c*p;h.push(b,v,T),h.push(v,M,T)}this.setIndex(h),this.setAttribute("position",new vr(_,3)),this.setAttribute("normal",new vr(g,3)),this.setAttribute("uv",new vr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ei(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qf extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zg,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class er extends Qf{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new bt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new et(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new et(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new et(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class fx extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ty,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hx extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Vl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function px(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function mx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Lp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function i_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class gl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class gx extends gl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yh,endingEnd:Yh}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case $h:s=e,a=2*t-n;break;case jh:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $h:o=e,l=2*n-t;break;case jh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,x=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,b=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+x*o[c+M]+b*o[l+M]+v*o[d+M];return s}}class _x extends gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class vx extends gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ui{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Vl(t,this.TimeBufferType),this.values=Vl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vl(e.times,Array),values:Vl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new vx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _x(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case el:t=this.InterpolantFactoryMethodDiscrete;break;case tl:t=this.InterpolantFactoryMethodLinear;break;case ou:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return el;case this.InterpolantFactoryMethodLinear:return tl;case this.InterpolantFactoryMethodSmooth:return ou}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&px(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ou,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ui.prototype.ValueTypeName="";Ui.prototype.TimeBufferType=Float32Array;Ui.prototype.ValueBufferType=Float32Array;Ui.prototype.DefaultInterpolation=tl;class $o extends Ui{constructor(e,t,n){super(e,t,n)}}$o.prototype.ValueTypeName="bool";$o.prototype.ValueBufferType=Array;$o.prototype.DefaultInterpolation=el;$o.prototype.InterpolantFactoryMethodLinear=void 0;$o.prototype.InterpolantFactoryMethodSmooth=void 0;class r_ extends Ui{constructor(e,t,n,i){super(e,t,n,i)}}r_.prototype.ValueTypeName="color";class Fo extends Ui{constructor(e,t,n,i){super(e,t,n,i)}}Fo.prototype.ValueTypeName="number";class yx extends gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Qr.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ko extends Ui{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new yx(this.times,this.values,this.getValueSize(),e)}}ko.prototype.ValueTypeName="quaternion";ko.prototype.InterpolantFactoryMethodSmooth=void 0;class jo extends Ui{constructor(e,t,n){super(e,t,n)}}jo.prototype.ValueTypeName="string";jo.prototype.ValueBufferType=Array;jo.prototype.DefaultInterpolation=el;jo.prototype.InterpolantFactoryMethodLinear=void 0;jo.prototype.InterpolantFactoryMethodSmooth=void 0;class Bo extends Ui{constructor(e,t,n,i){super(e,t,n,i)}}Bo.prototype.ValueTypeName="vector";class xx{constructor(e="",t=-1,n=[],i=Qv){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Li(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(bx(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Ui.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=mx(l);l=Lp(l,1,u),c=Lp(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Fo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];i_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let x=0;x!==f[_].morphTargets.length;++x){const b=f[_];m.push(b.time),p.push(b.morphTarget===g?1:0)}i.push(new Fo(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(Bo,h+".position",f,"pos",i),n(ko,h+".quaternion",f,"rot",i),n(Bo,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Sx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Fo;case"vector":case"vector2":case"vector3":case"vector4":return Bo;case"color":return r_;case"quaternion":return ko;case"bool":case"boolean":return $o;case"string":return jo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function bx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Sx(r.type);if(r.times===void 0){const t=[],n=[];i_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Or={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class wx{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const Mx=new wx;class Ko{constructor(e){this.manager=e!==void 0?e:Mx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ko.DEFAULT_MATERIAL_NAME="__DEFAULT";const or={};class Ex extends Error{constructor(e,t){super(e),this.response=t}}class s_ extends Ko{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Or.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(or[e]!==void 0){or[e].push({onLoad:t,onProgress:n,onError:i});return}or[e]=[],or[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=or[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){x();function x(){d.read().then(({done:b,value:v})=>{if(b)p.close();else{g+=v.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let T=0,A=u.length;T<A;T++){const L=u[T];L.onProgress&&L.onProgress(M)}p.enqueue(v),x()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Ex(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Or.add(e,c);const u=or[e];delete or[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=or[e];if(u===void 0)throw this.manager.itemError(e),c;delete or[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Tx extends Ko{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=nl("img");function l(){u(),Or.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Ax extends Ko{constructor(e){super(e)}load(e,t,n,i){const s=new on,o=new Tx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Kc extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Du=new mt,Dp=new V,Ip=new V;class eh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=Ki,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zf,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Dp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dp),Ip.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ip),t.updateMatrixWorld(),Du.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Du),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Du)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Cx extends eh{constructor(){super(new Hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Oo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Rx extends Kc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Cx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Np=new mt,aa=new V,Iu=new V;class Px extends eh{constructor(){super(new Hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new bt(4,2),this._viewportCount=6,this._viewports=[new Rt(2,1,1,1),new Rt(0,1,1,1),new Rt(3,1,1,1),new Rt(1,1,1,1),new Rt(3,0,1,1),new Rt(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),aa.setFromMatrixPosition(e.matrixWorld),n.position.copy(aa),Iu.copy(n.position),Iu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Iu),n.updateMatrixWorld(),i.makeTranslation(-aa.x,-aa.y,-aa.z),Np.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Np)}}class Lx extends Kc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Px}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zc extends jg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Dx extends eh{constructor(){super(new Zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class o_ extends Kc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new Dx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ix extends Kc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ia{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Nu=new WeakMap;class Nx extends Ko{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Nu.has(o)===!0)i&&i(Nu.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Or.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Nu.set(l,c),Or.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Or.add(e,l),s.manager.itemStart(e)}}class Ox extends Hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const th="\\[\\]\\.:\\/",Ux=new RegExp("["+th+"]","g"),nh="[^"+th+"]",Fx="[^"+th.replace("\\.","")+"]",kx=/((?:WC+[\/:])*)/.source.replace("WC",nh),Bx=/(WCOD+)?/.source.replace("WCOD",Fx),zx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nh),Hx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nh),Vx=new RegExp("^"+kx+Bx+zx+Hx+"$"),Gx=["material","materials","bones","map"];class Wx{constructor(e,t,n){const i=n||Ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ot{constructor(e,t,n){this.path=t,this.parsedPath=n||Ot.parseTrackName(t),this.node=Ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ot.Composite(e,t,n):new Ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ux,"")}static parseTrackName(e){const t=Vx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Gx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ot.Composite=Wx;Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray];Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Op(r,e,t,n){const i=Xx(n);switch(t){case Og:return r*e;case Gf:return r*e/i.components*i.byteLength;case Wf:return r*e/i.components*i.byteLength;case Fg:return r*e*2/i.components*i.byteLength;case Xf:return r*e*2/i.components*i.byteLength;case Ug:return r*e*3/i.components*i.byteLength;case gi:return r*e*4/i.components*i.byteLength;case qf:return r*e*4/i.components*i.byteLength;case dc:case fc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case hc:case pc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bd:case Md:return Math.max(r,16)*Math.max(e,8)/4;case Sd:case wd:return Math.max(r,8)*Math.max(e,8)/2;case Ed:case Td:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ad:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Cd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ld:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Od:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ud:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case kd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case zd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Hd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case mc:case Vd:case Gd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case kg:case Wd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Xd:case qd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xx(r){switch(r){case Ki:case Dg:return{byteLength:1,components:1};case Ka:case Ig:case pl:return{byteLength:2,components:1};case Hf:case Vf:return{byteLength:2,components:4};case Is:case zf:case Pi:return{byteLength:4,components:1};case Ng:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function a_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function qx(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Yx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$x=`#ifdef USE_ALPHAHASH
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
#endif`,jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qx=`#ifdef USE_AOMAP
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
#endif`,eS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tS=`#ifdef USE_BATCHING
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
#endif`,nS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,oS=`#ifdef USE_IRIDESCENCE
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
#endif`,aS=`#ifdef USE_BUMPMAP
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
#endif`,lS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gS=`#define PI 3.141592653589793
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
} // validated`,_S=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vS=`vec3 transformedNormal = objectNormal;
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
#endif`,yS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,SS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wS="gl_FragColor = linearToOutputTexel( gl_FragColor );",MS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ES=`#ifdef USE_ENVMAP
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
#endif`,TS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,AS=`#ifdef USE_ENVMAP
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
#endif`,CS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,RS=`#ifdef USE_ENVMAP
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
#endif`,PS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,LS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,DS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,NS=`#ifdef USE_GRADIENTMAP
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
}`,OS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,US=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,FS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kS=`uniform bool receiveShadow;
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
#endif`,BS=`#ifdef USE_ENVMAP
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
#endif`,zS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,HS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,VS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,WS=`PhysicalMaterial material;
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
#endif`,XS=`struct PhysicalMaterial {
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
}`,qS=`
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
#endif`,YS=`#if defined( RE_IndirectDiffuse )
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
#endif`,$S=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,KS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,JS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,QS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nb=`#if defined( USE_POINTS_UV )
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
#endif`,ib=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ob=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ab=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lb=`#ifdef USE_MORPHTARGETS
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
#endif`,cb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ub=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,db=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mb=`#ifdef USE_NORMALMAP
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
#endif`,gb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_b=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Eb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ab=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lb=`float getShadowMask() {
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
}`,Db=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ib=`#ifdef USE_SKINNING
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
#endif`,Nb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ob=`#ifdef USE_SKINNING
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
#endif`,Ub=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zb=`#ifdef USE_TRANSMISSION
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
#endif`,Hb=`#ifdef USE_TRANSMISSION
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
#endif`,Vb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yb=`uniform sampler2D t2D;
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
}`,$b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jb=`#include <common>
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
}`,Qb=`#if DEPTH_PACKING == 3200
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
}`,ew=`#define DISTANCE
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
}`,tw=`#define DISTANCE
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
}`,nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rw=`uniform float scale;
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
}`,sw=`uniform vec3 diffuse;
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
}`,ow=`#include <common>
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
}`,aw=`uniform vec3 diffuse;
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
}`,lw=`#define LAMBERT
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
}`,cw=`#define LAMBERT
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
}`,uw=`#define MATCAP
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
}`,dw=`#define MATCAP
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
}`,fw=`#define NORMAL
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
}`,hw=`#define NORMAL
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
}`,pw=`#define PHONG
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
}`,mw=`#define PHONG
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
}`,gw=`#define STANDARD
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
}`,_w=`#define STANDARD
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
}`,vw=`#define TOON
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
}`,yw=`#define TOON
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
}`,xw=`uniform float size;
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
}`,Sw=`uniform vec3 diffuse;
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
}`,bw=`#include <common>
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
}`,ww=`uniform vec3 color;
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
}`,Mw=`uniform float rotation;
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
}`,Ew=`uniform vec3 diffuse;
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
}`,gt={alphahash_fragment:Yx,alphahash_pars_fragment:$x,alphamap_fragment:jx,alphamap_pars_fragment:Kx,alphatest_fragment:Zx,alphatest_pars_fragment:Jx,aomap_fragment:Qx,aomap_pars_fragment:eS,batching_pars_vertex:tS,batching_vertex:nS,begin_vertex:iS,beginnormal_vertex:rS,bsdfs:sS,iridescence_fragment:oS,bumpmap_pars_fragment:aS,clipping_planes_fragment:lS,clipping_planes_pars_fragment:cS,clipping_planes_pars_vertex:uS,clipping_planes_vertex:dS,color_fragment:fS,color_pars_fragment:hS,color_pars_vertex:pS,color_vertex:mS,common:gS,cube_uv_reflection_fragment:_S,defaultnormal_vertex:vS,displacementmap_pars_vertex:yS,displacementmap_vertex:xS,emissivemap_fragment:SS,emissivemap_pars_fragment:bS,colorspace_fragment:wS,colorspace_pars_fragment:MS,envmap_fragment:ES,envmap_common_pars_fragment:TS,envmap_pars_fragment:AS,envmap_pars_vertex:CS,envmap_physical_pars_fragment:BS,envmap_vertex:RS,fog_vertex:PS,fog_pars_vertex:LS,fog_fragment:DS,fog_pars_fragment:IS,gradientmap_pars_fragment:NS,lightmap_pars_fragment:OS,lights_lambert_fragment:US,lights_lambert_pars_fragment:FS,lights_pars_begin:kS,lights_toon_fragment:zS,lights_toon_pars_fragment:HS,lights_phong_fragment:VS,lights_phong_pars_fragment:GS,lights_physical_fragment:WS,lights_physical_pars_fragment:XS,lights_fragment_begin:qS,lights_fragment_maps:YS,lights_fragment_end:$S,logdepthbuf_fragment:jS,logdepthbuf_pars_fragment:KS,logdepthbuf_pars_vertex:ZS,logdepthbuf_vertex:JS,map_fragment:QS,map_pars_fragment:eb,map_particle_fragment:tb,map_particle_pars_fragment:nb,metalnessmap_fragment:ib,metalnessmap_pars_fragment:rb,morphinstance_vertex:sb,morphcolor_vertex:ob,morphnormal_vertex:ab,morphtarget_pars_vertex:lb,morphtarget_vertex:cb,normal_fragment_begin:ub,normal_fragment_maps:db,normal_pars_fragment:fb,normal_pars_vertex:hb,normal_vertex:pb,normalmap_pars_fragment:mb,clearcoat_normal_fragment_begin:gb,clearcoat_normal_fragment_maps:_b,clearcoat_pars_fragment:vb,iridescence_pars_fragment:yb,opaque_fragment:xb,packing:Sb,premultiplied_alpha_fragment:bb,project_vertex:wb,dithering_fragment:Mb,dithering_pars_fragment:Eb,roughnessmap_fragment:Tb,roughnessmap_pars_fragment:Ab,shadowmap_pars_fragment:Cb,shadowmap_pars_vertex:Rb,shadowmap_vertex:Pb,shadowmask_pars_fragment:Lb,skinbase_vertex:Db,skinning_pars_vertex:Ib,skinning_vertex:Nb,skinnormal_vertex:Ob,specularmap_fragment:Ub,specularmap_pars_fragment:Fb,tonemapping_fragment:kb,tonemapping_pars_fragment:Bb,transmission_fragment:zb,transmission_pars_fragment:Hb,uv_pars_fragment:Vb,uv_pars_vertex:Gb,uv_vertex:Wb,worldpos_vertex:Xb,background_vert:qb,background_frag:Yb,backgroundCube_vert:$b,backgroundCube_frag:jb,cube_vert:Kb,cube_frag:Zb,depth_vert:Jb,depth_frag:Qb,distanceRGBA_vert:ew,distanceRGBA_frag:tw,equirect_vert:nw,equirect_frag:iw,linedashed_vert:rw,linedashed_frag:sw,meshbasic_vert:ow,meshbasic_frag:aw,meshlambert_vert:lw,meshlambert_frag:cw,meshmatcap_vert:uw,meshmatcap_frag:dw,meshnormal_vert:fw,meshnormal_frag:hw,meshphong_vert:pw,meshphong_frag:mw,meshphysical_vert:gw,meshphysical_frag:_w,meshtoon_vert:vw,meshtoon_frag:yw,points_vert:xw,points_frag:Sw,shadow_vert:bw,shadow_frag:ww,sprite_vert:Mw,sprite_frag:Ew},Re={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Vi={basic:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new et(0)}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:Pn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:Pn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new et(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:Pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:Pn([Re.points,Re.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:Pn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:Pn([Re.common,Re.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:Pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:Pn([Re.sprite,Re.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distanceRGBA:{uniforms:Pn([Re.common,Re.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distanceRGBA_vert,fragmentShader:gt.distanceRGBA_frag},shadow:{uniforms:Pn([Re.lights,Re.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Vi.physical={uniforms:Pn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};const Gl={r:0,b:0,g:0},ls=new Zi,Tw=new mt;function Aw(r,e,t,n,i,s,o){const a=new et(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function g(b){let v=!1;const M=_(b);M===null?p(a,l):M&&M.isColor&&(p(M,1),v=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,v){const M=_(v);M&&(M.isCubeTexture||M.mapping===$c)?(u===void 0&&(u=new Un(new ml(1,1,1),new Di({name:"BackgroundCubeMaterial",uniforms:Uo(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,A,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ls.copy(v.backgroundRotation),ls.x*=-1,ls.y*=-1,ls.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Tw.makeRotationFromEuler(ls)),u.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ut,(d!==M||f!==M.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Un(new Ei(2,2),new Di({name:"BackgroundMaterial",uniforms:Uo(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ut,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,h=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,v){b.getRGB(Gl,$g(r)),n.buffers.color.setClear(Gl.r,Gl.g,Gl.b,v,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:g,addToRenderList:m,dispose:x}}function Cw(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,C,w,k,G){let W=!1;const X=d(k,w,C);s!==X&&(s=X,c(s.object)),W=h(y,k,w,G),W&&_(y,k,w,G),G!==null&&e.update(G,r.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(y,C,w,k),G!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,C,w){const k=w.wireframe===!0;let G=n[y.id];G===void 0&&(G={},n[y.id]=G);let W=G[C.id];W===void 0&&(W={},G[C.id]=W);let X=W[k];return X===void 0&&(X=f(l()),W[k]=X),X}function f(y){const C=[],w=[],k=[];for(let G=0;G<t;G++)C[G]=0,w[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:w,attributeDivisors:k,object:y,attributes:{},index:null}}function h(y,C,w,k){const G=s.attributes,W=C.attributes;let X=0;const j=w.getAttributes();for(const I in j)if(j[I].location>=0){const N=G[I];let _e=W[I];if(_e===void 0&&(I==="instanceMatrix"&&y.instanceMatrix&&(_e=y.instanceMatrix),I==="instanceColor"&&y.instanceColor&&(_e=y.instanceColor)),N===void 0||N.attribute!==_e||_e&&N.data!==_e.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function _(y,C,w,k){const G={},W=C.attributes;let X=0;const j=w.getAttributes();for(const I in j)if(j[I].location>=0){let N=W[I];N===void 0&&(I==="instanceMatrix"&&y.instanceMatrix&&(N=y.instanceMatrix),I==="instanceColor"&&y.instanceColor&&(N=y.instanceColor));const _e={};_e.attribute=N,N&&N.data&&(_e.data=N.data),G[I]=_e,X++}s.attributes=G,s.attributesNum=X,s.index=k}function g(){const y=s.newAttributes;for(let C=0,w=y.length;C<w;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){const w=s.newAttributes,k=s.enabledAttributes,G=s.attributeDivisors;w[y]=1,k[y]===0&&(r.enableVertexAttribArray(y),k[y]=1),G[y]!==C&&(r.vertexAttribDivisor(y,C),G[y]=C)}function x(){const y=s.newAttributes,C=s.enabledAttributes;for(let w=0,k=C.length;w<k;w++)C[w]!==y[w]&&(r.disableVertexAttribArray(w),C[w]=0)}function b(y,C,w,k,G,W,X){X===!0?r.vertexAttribIPointer(y,C,w,G,W):r.vertexAttribPointer(y,C,w,k,G,W)}function v(y,C,w,k){g();const G=k.attributes,W=w.getAttributes(),X=C.defaultAttributeValues;for(const j in W){const I=W[j];if(I.location>=0){let fe=G[j];if(fe===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(fe=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(fe=y.instanceColor)),fe!==void 0){const N=fe.normalized,_e=fe.itemSize,He=e.get(fe);if(He===void 0)continue;const st=He.buffer,Z=He.type,oe=He.bytesPerElement,Te=Z===r.INT||Z===r.UNSIGNED_INT||fe.gpuType===zf;if(fe.isInterleavedBufferAttribute){const ue=fe.data,we=ue.stride,Ze=fe.offset;if(ue.isInstancedInterleavedBuffer){for(let Ae=0;Ae<I.locationSize;Ae++)p(I.location+Ae,ue.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ae=0;Ae<I.locationSize;Ae++)m(I.location+Ae);r.bindBuffer(r.ARRAY_BUFFER,st);for(let Ae=0;Ae<I.locationSize;Ae++)b(I.location+Ae,_e/I.locationSize,Z,N,we*oe,(Ze+_e/I.locationSize*Ae)*oe,Te)}else{if(fe.isInstancedBufferAttribute){for(let ue=0;ue<I.locationSize;ue++)p(I.location+ue,fe.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ue=0;ue<I.locationSize;ue++)m(I.location+ue);r.bindBuffer(r.ARRAY_BUFFER,st);for(let ue=0;ue<I.locationSize;ue++)b(I.location+ue,_e/I.locationSize,Z,N,_e*oe,_e/I.locationSize*ue*oe,Te)}}else if(X!==void 0){const N=X[j];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(I.location,N);break;case 3:r.vertexAttrib3fv(I.location,N);break;case 4:r.vertexAttrib4fv(I.location,N);break;default:r.vertexAttrib1fv(I.location,N)}}}}x()}function M(){L();for(const y in n){const C=n[y];for(const w in C){const k=C[w];for(const G in k)u(k[G].object),delete k[G];delete C[w]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const w in C){const k=C[w];for(const G in k)u(k[G].object),delete k[G];delete C[w]}delete n[y.id]}function A(y){for(const C in n){const w=n[C];if(w[y.id]===void 0)continue;const k=w[y.id];for(const G in k)u(k[G].object),delete k[G];delete w[y.id]}}function L(){S(),o=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function Rw(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Pw(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==gi&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===pl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ki&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Pi&&!L)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:M,maxSamples:T}}function Lw(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new hs,a=new pt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const x=s?0:n,b=x*4;let v=p.clippingState||null;l.value=v,v=u(_,f,b,h);for(let M=0;M!==b;++M)v[M]=t[M];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=h;b!==g;++b,v+=4)o.copy(d[b]).applyMatrix4(x,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Dw(r){let e=new WeakMap;function t(o,a){return a===yd?o.mapping=Do:a===xd&&(o.mapping=Io),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yd||a===xd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ex(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const po=4,Up=[.125,.215,.35,.446,.526,.582],ys=20,Ou=new Zc,Fp=new et;let Uu=null,Fu=0,ku=0,Bu=!1;const ps=(1+Math.sqrt(5))/2,io=1/ps,kp=[new V(-ps,io,0),new V(ps,io,0),new V(-io,0,ps),new V(io,0,ps),new V(0,ps,-io),new V(0,ps,io),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],Iw=new V;class Bp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Iw}=s;Uu=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),ku=this._renderer.getActiveMipmapLevel(),Bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uu,Fu,ku),this._renderer.xr.enabled=Bu,e.scissorTest=!1,Wl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Do||e.mapping===Io?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uu=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),ku=this._renderer.getActiveMipmapLevel(),Bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:pl,format:gi,colorSpace:kn,depthBuffer:!1},i=zp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nw(s)),this._blurMaterial=Ow(s,e,t)}return i}_compileMaterial(e){const t=new Un(this._lodPlanes[0],e);this._renderer.compile(t,Ou)}_sceneToCubeUV(e,t,n,i,s){const l=new Hn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Fp),d.toneMapping=Wr,d.autoClear=!1;const _=new xs({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),g=new Un(new ml,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(Fp),m=!0);for(let x=0;x<6;x++){const b=x%3;b===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):b===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const v=this._cubeSize;Wl(i,b*v,x>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Do||e.mapping===Io;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Wl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ou)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=kp[(i-s-1)%kp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Un(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*ys-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):ys;m>ys&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ys}`);const p=[];let x=0;for(let A=0;A<ys;++A){const L=A/g,S=Math.exp(-L*L/2);p.push(S),A===0?x+=S:A<m&&(x+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=_,f.mipInt.value=b-n;const v=this._sizeLods[i],M=3*v*(i>b-po?i-b+po:0),T=4*(this._cubeSize-v);Wl(t,M,T,3*v,2*v),l.setRenderTarget(t),l.render(d,Ou)}}function Nw(r){const e=[],t=[],n=[];let i=r;const s=r-po+1+Up.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-po?l=Up[o-r+po-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*h),b=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let T=0;T<h;T++){const A=T%3*2/3-1,L=T>2?0:-1,S=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];x.set(S,g*_*T),b.set(f,m*_*T);const y=[T,T,T,T,T,T];v.set(y,p*_*T)}const M=new Oi;M.setAttribute("position",new Jt(x,g)),M.setAttribute("uv",new Jt(b,m)),M.setAttribute("faceIndex",new Jt(v,p)),e.push(M),i>po&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function zp(r,e,t){const n=new Ns(r,e,t);return n.texture.mapping=$c,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Ow(r,e,t){const n=new Float32Array(ys),i=new V(0,1,0);return new Di({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ih(),fragmentShader:`

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
		`,blending:Vr,depthTest:!1,depthWrite:!1})}function Hp(){return new Di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ih(),fragmentShader:`

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
		`,blending:Vr,depthTest:!1,depthWrite:!1})}function Vp(){return new Di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vr,depthTest:!1,depthWrite:!1})}function ih(){return`

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
	`}function Uw(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===yd||l===xd,u=l===Do||l===Io;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Bp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new Bp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Fw(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&xo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function kw(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const x=h.array;g=h.version;for(let b=0,v=x.length;b<v;b+=3){const M=x[b+0],T=x[b+1],A=x[b+2];f.push(M,T,T,A,A,M)}}else if(_!==void 0){const x=_.array;g=_.version;for(let b=0,v=x.length/3-1;b<v;b+=3){const M=b+0,T=b+1,A=b+2;f.push(M,T,T,A,A,M)}}else return;const m=new(Vg(f)?Yg:qg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Bw(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let x=0;x<_;x++)p+=h[x]*g[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function zw(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Hw(r,e,t){const n=new WeakMap,i=new Rt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let M=a.attributes.position.count*v,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*T*4*d),L=new Gg(A,M,T,d);L.type=Pi,L.needsUpdate=!0;const S=v*4;for(let C=0;C<d;C++){const w=p[C],k=x[C],G=b[C],W=M*T*4*C;for(let X=0;X<w.count;X++){const j=X*S;_===!0&&(i.fromBufferAttribute(w,X),A[W+j+0]=i.x,A[W+j+1]=i.y,A[W+j+2]=i.z,A[W+j+3]=0),g===!0&&(i.fromBufferAttribute(k,X),A[W+j+4]=i.x,A[W+j+5]=i.y,A[W+j+6]=i.z,A[W+j+7]=0),m===!0&&(i.fromBufferAttribute(G,X),A[W+j+8]=i.x,A[W+j+9]=i.y,A[W+j+10]=i.z,A[W+j+11]=G.itemSize===4?i.w:1)}}f={count:d,texture:L,size:new bt(M,T)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Vw(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const l_=new on,Gp=new n_(1,1),c_=new Gg,u_=new Fy,d_=new Kg,Wp=[],Xp=[],qp=new Float32Array(16),Yp=new Float32Array(9),$p=new Float32Array(4);function Zo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Wp[i];if(s===void 0&&(s=new Float32Array(i),Wp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function an(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function ln(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Jc(r,e){let t=Xp[e];t===void 0&&(t=new Int32Array(e),Xp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Gw(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Ww(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2fv(this.addr,e),ln(t,e)}}function Xw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;r.uniform3fv(this.addr,e),ln(t,e)}}function qw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4fv(this.addr,e),ln(t,e)}}function Yw(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;$p.set(n),r.uniformMatrix2fv(this.addr,!1,$p),ln(t,n)}}function $w(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;Yp.set(n),r.uniformMatrix3fv(this.addr,!1,Yp),ln(t,n)}}function jw(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;qp.set(n),r.uniformMatrix4fv(this.addr,!1,qp),ln(t,n)}}function Kw(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Zw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2iv(this.addr,e),ln(t,e)}}function Jw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;r.uniform3iv(this.addr,e),ln(t,e)}}function Qw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4iv(this.addr,e),ln(t,e)}}function eM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2uiv(this.addr,e),ln(t,e)}}function nM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;r.uniform3uiv(this.addr,e),ln(t,e)}}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4uiv(this.addr,e),ln(t,e)}}function rM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Gp.compareFunction=Hg,s=Gp):s=l_,t.setTexture2D(e||s,i)}function sM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||u_,i)}function oM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||d_,i)}function aM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||c_,i)}function lM(r){switch(r){case 5126:return Gw;case 35664:return Ww;case 35665:return Xw;case 35666:return qw;case 35674:return Yw;case 35675:return $w;case 35676:return jw;case 5124:case 35670:return Kw;case 35667:case 35671:return Zw;case 35668:case 35672:return Jw;case 35669:case 35673:return Qw;case 5125:return eM;case 36294:return tM;case 36295:return nM;case 36296:return iM;case 35678:case 36198:case 36298:case 36306:case 35682:return rM;case 35679:case 36299:case 36307:return sM;case 35680:case 36300:case 36308:case 36293:return oM;case 36289:case 36303:case 36311:case 36292:return aM}}function cM(r,e){r.uniform1fv(this.addr,e)}function uM(r,e){const t=Zo(e,this.size,2);r.uniform2fv(this.addr,t)}function dM(r,e){const t=Zo(e,this.size,3);r.uniform3fv(this.addr,t)}function fM(r,e){const t=Zo(e,this.size,4);r.uniform4fv(this.addr,t)}function hM(r,e){const t=Zo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pM(r,e){const t=Zo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mM(r,e){const t=Zo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gM(r,e){r.uniform1iv(this.addr,e)}function _M(r,e){r.uniform2iv(this.addr,e)}function vM(r,e){r.uniform3iv(this.addr,e)}function yM(r,e){r.uniform4iv(this.addr,e)}function xM(r,e){r.uniform1uiv(this.addr,e)}function SM(r,e){r.uniform2uiv(this.addr,e)}function bM(r,e){r.uniform3uiv(this.addr,e)}function wM(r,e){r.uniform4uiv(this.addr,e)}function MM(r,e,t){const n=this.cache,i=e.length,s=Jc(t,i);an(n,s)||(r.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||l_,s[o])}function EM(r,e,t){const n=this.cache,i=e.length,s=Jc(t,i);an(n,s)||(r.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||u_,s[o])}function TM(r,e,t){const n=this.cache,i=e.length,s=Jc(t,i);an(n,s)||(r.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||d_,s[o])}function AM(r,e,t){const n=this.cache,i=e.length,s=Jc(t,i);an(n,s)||(r.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||c_,s[o])}function CM(r){switch(r){case 5126:return cM;case 35664:return uM;case 35665:return dM;case 35666:return fM;case 35674:return hM;case 35675:return pM;case 35676:return mM;case 5124:case 35670:return gM;case 35667:case 35671:return _M;case 35668:case 35672:return vM;case 35669:case 35673:return yM;case 5125:return xM;case 36294:return SM;case 36295:return bM;case 36296:return wM;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return EM;case 35680:case 36300:case 36308:case 36293:return TM;case 36289:case 36303:case 36311:case 36292:return AM}}class RM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=lM(t.type)}}class PM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=CM(t.type)}}class LM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const zu=/(\w+)(\])?(\[|\.)?/g;function jp(r,e){r.seq.push(e),r.map[e.id]=e}function DM(r,e,t){const n=r.name,i=n.length;for(zu.lastIndex=0;;){const s=zu.exec(n),o=zu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){jp(t,c===void 0?new RM(a,r,e):new PM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new LM(a),jp(t,d)),t=d}}}class gc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);DM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Kp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const IM=37297;let NM=0;function OM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Zp=new pt;function UM(r){Et._getMatrix(Zp,Et.workingColorSpace,r);const e=`mat3( ${Zp.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(r)){case Ac:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Jp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+OM(r.getShaderSource(e),o)}else return i}function FM(r,e){const t=UM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function kM(r,e){let t;switch(e){case Xv:t="Linear";break;case qv:t="Reinhard";break;case Yv:t="Cineon";break;case $v:t="ACESFilmic";break;case Kv:t="AgX";break;case Zv:t="Neutral";break;case jv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xl=new V;function BM(){Et.getLuminanceCoefficients(Xl);const r=Xl.x.toFixed(4),e=Xl.y.toFixed(4),t=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ya).join(`
`)}function HM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function VM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ya(r){return r!==""}function Qp(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function em(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zd(r){return r.replace(GM,XM)}const WM=new Map;function XM(r,e){let t=gt[e];if(t===void 0){const n=WM.get(e);if(n!==void 0)t=gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zd(t)}const qM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tm(r){return r.replace(qM,YM)}function YM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function nm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function $M(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Cg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Mv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ar&&(e="SHADOWMAP_TYPE_VSM"),e}function jM(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Do:case Io:e="ENVMAP_TYPE_CUBE";break;case $c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function KM(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Io:e="ENVMAP_MODE_REFRACTION";break}return e}function ZM(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Rg:e="ENVMAP_BLENDING_MULTIPLY";break;case Gv:e="ENVMAP_BLENDING_MIX";break;case Wv:e="ENVMAP_BLENDING_ADD";break}return e}function JM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function QM(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=$M(t),c=jM(t),u=KM(t),d=ZM(t),f=JM(t),h=zM(t),_=HM(s),g=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ya).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ya).join(`
`),p.length>0&&(p+=`
`)):(m=[nm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ya).join(`
`),p=[nm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wr?"#define TONE_MAPPING":"",t.toneMapping!==Wr?gt.tonemapping_pars_fragment:"",t.toneMapping!==Wr?kM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,FM("linearToOutputTexel",t.outputColorSpace),BM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ya).join(`
`)),o=Zd(o),o=Qp(o,t),o=em(o,t),a=Zd(a),a=Qp(a,t),a=em(a,t),o=tm(o),a=tm(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=x+m+o,v=x+p+a,M=Kp(i,i.VERTEX_SHADER,b),T=Kp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,M),i.attachShader(g,T),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function A(C){if(r.debug.checkShaderErrors){const w=i.getProgramInfoLog(g).trim(),k=i.getShaderInfoLog(M).trim(),G=i.getShaderInfoLog(T).trim();let W=!0,X=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,M,T);else{const j=Jp(i,M,"vertex"),I=Jp(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+w+`
`+j+`
`+I)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(k===""||G==="")&&(X=!1);X&&(C.diagnostics={runnable:W,programLog:w,vertexShader:{log:k,prefix:m},fragmentShader:{log:G,prefix:p}})}i.deleteShader(M),i.deleteShader(T),L=new gc(i,g),S=VM(i,g)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(g,IM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=NM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=T,this}let eE=0;class tE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new nE(e),t.set(e,n)),n}}class nE{constructor(e){this.id=eE++,this.code=e,this.usedTimes=0}}function iE(r,e,t,n,i,s,o){const a=new Wg,l=new tE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,C,w,k){const G=w.fog,W=k.geometry,X=S.isMeshStandardMaterial?w.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),I=j&&j.mapping===$c?j.image.height:null,fe=_[S.type];S.precision!==null&&(h=i.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const N=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_e=N!==void 0?N.length:0;let He=0;W.morphAttributes.position!==void 0&&(He=1),W.morphAttributes.normal!==void 0&&(He=2),W.morphAttributes.color!==void 0&&(He=3);let st,Z,oe,Te;if(fe){const Ce=Vi[fe];st=Ce.vertexShader,Z=Ce.fragmentShader}else st=S.vertexShader,Z=S.fragmentShader,l.update(S),oe=l.getVertexShaderID(S),Te=l.getFragmentShaderID(S);const ue=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),Ze=k.isInstancedMesh===!0,Ae=k.isBatchedMesh===!0,dt=!!S.map,Je=!!S.matcap,Ie=!!j,U=!!S.aoMap,Tt=!!S.lightMap,ot=!!S.bumpMap,q=!!S.normalMap,Se=!!S.displacementMap,ct=!!S.emissiveMap,Ne=!!S.metalnessMap,Ve=!!S.roughnessMap,Ct=S.anisotropy>0,D=S.clearcoat>0,E=S.dispersion>0,H=S.iridescence>0,J=S.sheen>0,te=S.transmission>0,ee=Ct&&!!S.anisotropyMap,ne=D&&!!S.clearcoatMap,ge=D&&!!S.clearcoatNormalMap,Pe=D&&!!S.clearcoatRoughnessMap,he=H&&!!S.iridescenceMap,de=H&&!!S.iridescenceThicknessMap,Me=J&&!!S.sheenColorMap,ye=J&&!!S.sheenRoughnessMap,qe=!!S.specularMap,me=!!S.specularColorMap,tt=!!S.specularIntensityMap,O=te&&!!S.transmissionMap,xe=te&&!!S.thicknessMap,ae=!!S.gradientMap,Ee=!!S.alphaMap,re=S.alphaTest>0,ie=!!S.alphaHash,Le=!!S.extensions;let Qe=Wr;S.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Qe=r.toneMapping);const Mt={shaderID:fe,shaderType:S.type,shaderName:S.name,vertexShader:st,fragmentShader:Z,defines:S.defines,customVertexShaderID:oe,customFragmentShaderID:Te,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:Ae,batchingColor:Ae&&k._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&k.instanceColor!==null,instancingMorph:Ze&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?r.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:kn,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:Je,envMap:Ie,envMapMode:Ie&&j.mapping,envMapCubeUVHeight:I,aoMap:U,lightMap:Tt,bumpMap:ot,normalMap:q,displacementMap:f&&Se,emissiveMap:ct,normalMapObjectSpace:q&&S.normalMapType===iy,normalMapTangentSpace:q&&S.normalMapType===zg,metalnessMap:Ne,roughnessMap:Ve,anisotropy:Ct,anisotropyMap:ee,clearcoat:D,clearcoatMap:ne,clearcoatNormalMap:ge,clearcoatRoughnessMap:Pe,dispersion:E,iridescence:H,iridescenceMap:he,iridescenceThicknessMap:de,sheen:J,sheenColorMap:Me,sheenRoughnessMap:ye,specularMap:qe,specularColorMap:me,specularIntensityMap:tt,transmission:te,transmissionMap:O,thicknessMap:xe,gradientMap:ae,opaque:S.transparent===!1&&S.blending===Gr&&S.alphaToCoverage===!1,alphaMap:Ee,alphaTest:re,alphaHash:ie,combine:S.combine,mapUv:dt&&g(S.map.channel),aoMapUv:U&&g(S.aoMap.channel),lightMapUv:Tt&&g(S.lightMap.channel),bumpMapUv:ot&&g(S.bumpMap.channel),normalMapUv:q&&g(S.normalMap.channel),displacementMapUv:Se&&g(S.displacementMap.channel),emissiveMapUv:ct&&g(S.emissiveMap.channel),metalnessMapUv:Ne&&g(S.metalnessMap.channel),roughnessMapUv:Ve&&g(S.roughnessMap.channel),anisotropyMapUv:ee&&g(S.anisotropyMap.channel),clearcoatMapUv:ne&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ge&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(S.sheenRoughnessMap.channel),specularMapUv:qe&&g(S.specularMap.channel),specularColorMapUv:me&&g(S.specularColorMap.channel),specularIntensityMapUv:tt&&g(S.specularIntensityMap.channel),transmissionMapUv:O&&g(S.transmissionMap.channel),thicknessMapUv:xe&&g(S.thicknessMap.channel),alphaMapUv:Ee&&g(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(q||Ct),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(dt||Ee),fog:!!G,useFog:S.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:we,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:He,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&Et.getTransfer(S.map.colorSpace)===Ut,decodeVideoTextureEmissive:ct&&S.emissiveMap.isVideoTexture===!0&&Et.getTransfer(S.emissiveMap.colorSpace)===Ut,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mi,flipSided:S.side===Vn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Le&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&S.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Mt.vertexUv1s=c.has(1),Mt.vertexUv2s=c.has(2),Mt.vertexUv3s=c.has(3),c.clear(),Mt}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)y.push(C),y.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(x(y,S),b(y,S),y.push(r.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function b(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const y=_[S.type];let C;if(y){const w=Vi[y];C=Ky.clone(w.uniforms)}else C=S.uniforms;return C}function M(S,y){let C;for(let w=0,k=u.length;w<k;w++){const G=u[w];if(G.cacheKey===y){C=G,++C.usedTimes;break}}return C===void 0&&(C=new QM(r,y,S,s),u.push(C)),C}function T(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function A(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:M,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:L}}function rE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function sE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function im(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function rm(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||sE),n.length>1&&n.sort(f||im),i.length>1&&i.sort(f||im)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function oE(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new rm,r.set(n,[o])):i>=s.length?(o=new rm,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function aE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new et};break;case"SpotLight":t={position:new V,direction:new V,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=t,t}}}function lE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let cE=0;function uE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function dE(r){const e=new aE,t=lE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const i=new V,s=new mt,o=new mt;function a(c){let u=0,d=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,x=0,b=0,v=0,M=0,T=0,A=0;c.sort(uE);for(let S=0,y=c.length;S<y;S++){const C=c[S],w=C.color,k=C.intensity,G=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=w.r*k,d+=w.g*k,f+=w.b*k;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],k);A++}else if(C.isDirectionalLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const j=C.shadow,I=t.get(C);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,n.directionalShadow[h]=I,n.directionalShadowMap[h]=W,n.directionalShadowMatrix[h]=C.shadow.matrix,x++}n.directional[h]=X,h++}else if(C.isSpotLight){const X=e.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(w).multiplyScalar(k),X.distance=G,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[g]=X;const j=C.shadow;if(C.map&&(n.spotLightMap[M]=C.map,M++,j.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[g]=j.matrix,C.castShadow){const I=t.get(C);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,n.spotShadow[g]=I,n.spotShadowMap[g]=W,v++}g++}else if(C.isRectAreaLight){const X=e.get(C);X.color.copy(w).multiplyScalar(k),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=X,m++}else if(C.isPointLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const j=C.shadow,I=t.get(C);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,I.shadowCameraNear=j.camera.near,I.shadowCameraFar=j.camera.far,n.pointShadow[_]=I,n.pointShadowMap[_]=W,n.pointShadowMatrix[_]=C.shadow.matrix,b++}n.point[_]=X,_++}else if(C.isHemisphereLight){const X=e.get(C);X.skyColor.copy(C.color).multiplyScalar(k),X.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[p]=X,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==h||L.pointLength!==_||L.spotLength!==g||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==x||L.numPointShadows!==b||L.numSpotShadows!==v||L.numSpotMaps!==M||L.numLightProbes!==A)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+M-T,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,L.directionalLength=h,L.pointLength=_,L.spotLength=g,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=x,L.numPointShadows=b,L.numSpotShadows=v,L.numSpotMaps=M,L.numLightProbes=A,n.version=cE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const b=c[p];if(b.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(b.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(b.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function sm(r){const e=new dE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function fE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new sm(r),e.set(i,[a])):s>=o.length?(a=new sm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const hE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pE=`uniform sampler2D shadow_pass;
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
}`;function mE(r,e,t){let n=new Zf;const i=new bt,s=new bt,o=new Rt,a=new fx({depthPacking:ny}),l=new hx,c={},u=t.maxTextureSize,d={[xr]:Vn,[Vn]:xr,[mi]:mi},f=new Di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:hE,fragmentShader:pE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Oi;_.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Un(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cg;let p=this.type;this.render=function(T,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=r.getRenderTarget(),y=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),w=r.state;w.setBlending(Vr),w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);const k=p!==ar&&this.type===ar,G=p===ar&&this.type!==ar;for(let W=0,X=T.length;W<X;W++){const j=T[W],I=j.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const fe=I.getFrameExtents();if(i.multiply(fe),s.copy(I.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/fe.x),i.x=s.x*fe.x,I.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/fe.y),i.y=s.y*fe.y,I.mapSize.y=s.y)),I.map===null||k===!0||G===!0){const _e=this.type!==ar?{minFilter:Fn,magFilter:Fn}:{};I.map!==null&&I.map.dispose(),I.map=new Ns(i.x,i.y,_e),I.map.texture.name=j.name+".shadowMap",I.camera.updateProjectionMatrix()}r.setRenderTarget(I.map),r.clear();const N=I.getViewportCount();for(let _e=0;_e<N;_e++){const He=I.getViewport(_e);o.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),w.viewport(o),I.updateMatrices(j,_e),n=I.getFrustum(),v(A,L,I.camera,j,this.type)}I.isPointLightShadow!==!0&&this.type===ar&&x(I,L),I.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(S,y,C)};function x(T,A){const L=e.update(g);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ns(i.x,i.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(A,null,L,f,g,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(A,null,L,h,g,null)}function b(T,A,L,S){let y=null;const C=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)y=C;else if(y=L.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const w=y.uuid,k=A.uuid;let G=c[w];G===void 0&&(G={},c[w]=G);let W=G[k];W===void 0&&(W=y.clone(),G[k]=W,A.addEventListener("dispose",M)),y=W}if(y.visible=A.visible,y.wireframe=A.wireframe,S===ar?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const w=r.properties.get(y);w.light=L}return y}function v(T,A,L,S,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===ar)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const k=e.update(T),G=T.material;if(Array.isArray(G)){const W=k.groups;for(let X=0,j=W.length;X<j;X++){const I=W[X],fe=G[I.materialIndex];if(fe&&fe.visible){const N=b(T,fe,S,y);T.onBeforeShadow(r,T,A,L,k,N,I),r.renderBufferDirect(L,null,k,N,T,I),T.onAfterShadow(r,T,A,L,k,N,I)}}}else if(G.visible){const W=b(T,G,S,y);T.onBeforeShadow(r,T,A,L,k,W,null),r.renderBufferDirect(L,null,k,W,T,null),T.onAfterShadow(r,T,A,L,k,W,null)}}const w=T.children;for(let k=0,G=w.length;k<G;k++)v(w[k],A,L,S,y)}function M(T){T.target.removeEventListener("dispose",M);for(const L in c){const S=c[L],y=T.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const gE={[fd]:hd,[pd]:_d,[md]:vd,[Lo]:gd,[hd]:fd,[_d]:pd,[vd]:md,[gd]:Lo};function _E(r,e){function t(){let O=!1;const xe=new Rt;let ae=null;const Ee=new Rt(0,0,0,0);return{setMask:function(re){ae!==re&&!O&&(r.colorMask(re,re,re,re),ae=re)},setLocked:function(re){O=re},setClear:function(re,ie,Le,Qe,Mt){Mt===!0&&(re*=Qe,ie*=Qe,Le*=Qe),xe.set(re,ie,Le,Qe),Ee.equals(xe)===!1&&(r.clearColor(re,ie,Le,Qe),Ee.copy(xe))},reset:function(){O=!1,ae=null,Ee.set(-1,0,0,0)}}}function n(){let O=!1,xe=!1,ae=null,Ee=null,re=null;return{setReversed:function(ie){if(xe!==ie){const Le=e.get("EXT_clip_control");ie?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),xe=ie;const Qe=re;re=null,this.setClear(Qe)}},getReversed:function(){return xe},setTest:function(ie){ie?ue(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(ie){ae!==ie&&!O&&(r.depthMask(ie),ae=ie)},setFunc:function(ie){if(xe&&(ie=gE[ie]),Ee!==ie){switch(ie){case fd:r.depthFunc(r.NEVER);break;case hd:r.depthFunc(r.ALWAYS);break;case pd:r.depthFunc(r.LESS);break;case Lo:r.depthFunc(r.LEQUAL);break;case md:r.depthFunc(r.EQUAL);break;case gd:r.depthFunc(r.GEQUAL);break;case _d:r.depthFunc(r.GREATER);break;case vd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ee=ie}},setLocked:function(ie){O=ie},setClear:function(ie){re!==ie&&(xe&&(ie=1-ie),r.clearDepth(ie),re=ie)},reset:function(){O=!1,ae=null,Ee=null,re=null,xe=!1}}}function i(){let O=!1,xe=null,ae=null,Ee=null,re=null,ie=null,Le=null,Qe=null,Mt=null;return{setTest:function(Ce){O||(Ce?ue(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(Ce){xe!==Ce&&!O&&(r.stencilMask(Ce),xe=Ce)},setFunc:function(Ce,Fe,ut){(ae!==Ce||Ee!==Fe||re!==ut)&&(r.stencilFunc(Ce,Fe,ut),ae=Ce,Ee=Fe,re=ut)},setOp:function(Ce,Fe,ut){(ie!==Ce||Le!==Fe||Qe!==ut)&&(r.stencilOp(Ce,Fe,ut),ie=Ce,Le=Fe,Qe=ut)},setLocked:function(Ce){O=Ce},setClear:function(Ce){Mt!==Ce&&(r.clearStencil(Ce),Mt=Ce)},reset:function(){O=!1,xe=null,ae=null,Ee=null,re=null,ie=null,Le=null,Qe=null,Mt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,x=null,b=null,v=null,M=null,T=null,A=new et(0,0,0),L=0,S=!1,y=null,C=null,w=null,k=null,G=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const I=r.getParameter(r.VERSION);I.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(I)[1]),X=j>=1):I.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),X=j>=2);let fe=null,N={};const _e=r.getParameter(r.SCISSOR_BOX),He=r.getParameter(r.VIEWPORT),st=new Rt().fromArray(_e),Z=new Rt().fromArray(He);function oe(O,xe,ae,Ee){const re=new Uint8Array(4),ie=r.createTexture();r.bindTexture(O,ie),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Le=0;Le<ae;Le++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(xe,0,r.RGBA,1,1,Ee,0,r.RGBA,r.UNSIGNED_BYTE,re):r.texImage2D(xe+Le,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,re);return ie}const Te={};Te[r.TEXTURE_2D]=oe(r.TEXTURE_2D,r.TEXTURE_2D,1),Te[r.TEXTURE_CUBE_MAP]=oe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[r.TEXTURE_2D_ARRAY]=oe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Te[r.TEXTURE_3D]=oe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(r.DEPTH_TEST),o.setFunc(Lo),ot(!1),q(Gh),ue(r.CULL_FACE),U(Vr);function ue(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function we(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function Ze(O,xe){return d[O]!==xe?(r.bindFramebuffer(O,xe),d[O]=xe,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=xe),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ae(O,xe){let ae=h,Ee=!1;if(O){ae=f.get(xe),ae===void 0&&(ae=[],f.set(xe,ae));const re=O.textures;if(ae.length!==re.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let ie=0,Le=re.length;ie<Le;ie++)ae[ie]=r.COLOR_ATTACHMENT0+ie;ae.length=re.length,Ee=!0}}else ae[0]!==r.BACK&&(ae[0]=r.BACK,Ee=!0);Ee&&r.drawBuffers(ae)}function dt(O){return _!==O?(r.useProgram(O),_=O,!0):!1}const Je={[vs]:r.FUNC_ADD,[Tv]:r.FUNC_SUBTRACT,[Av]:r.FUNC_REVERSE_SUBTRACT};Je[Cv]=r.MIN,Je[Rv]=r.MAX;const Ie={[Pv]:r.ZERO,[Lv]:r.ONE,[Dv]:r.SRC_COLOR,[ud]:r.SRC_ALPHA,[kv]:r.SRC_ALPHA_SATURATE,[Uv]:r.DST_COLOR,[Nv]:r.DST_ALPHA,[Iv]:r.ONE_MINUS_SRC_COLOR,[dd]:r.ONE_MINUS_SRC_ALPHA,[Fv]:r.ONE_MINUS_DST_COLOR,[Ov]:r.ONE_MINUS_DST_ALPHA,[Bv]:r.CONSTANT_COLOR,[zv]:r.ONE_MINUS_CONSTANT_COLOR,[Hv]:r.CONSTANT_ALPHA,[Vv]:r.ONE_MINUS_CONSTANT_ALPHA};function U(O,xe,ae,Ee,re,ie,Le,Qe,Mt,Ce){if(O===Vr){g===!0&&(we(r.BLEND),g=!1);return}if(g===!1&&(ue(r.BLEND),g=!0),O!==Ev){if(O!==m||Ce!==S){if((p!==vs||v!==vs)&&(r.blendEquation(r.FUNC_ADD),p=vs,v=vs),Ce)switch(O){case Gr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cd:r.blendFunc(r.ONE,r.ONE);break;case Wh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Gr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Wh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,b=null,M=null,T=null,A.set(0,0,0),L=0,m=O,S=Ce}return}re=re||xe,ie=ie||ae,Le=Le||Ee,(xe!==p||re!==v)&&(r.blendEquationSeparate(Je[xe],Je[re]),p=xe,v=re),(ae!==x||Ee!==b||ie!==M||Le!==T)&&(r.blendFuncSeparate(Ie[ae],Ie[Ee],Ie[ie],Ie[Le]),x=ae,b=Ee,M=ie,T=Le),(Qe.equals(A)===!1||Mt!==L)&&(r.blendColor(Qe.r,Qe.g,Qe.b,Mt),A.copy(Qe),L=Mt),m=O,S=!1}function Tt(O,xe){O.side===mi?we(r.CULL_FACE):ue(r.CULL_FACE);let ae=O.side===Vn;xe&&(ae=!ae),ot(ae),O.blending===Gr&&O.transparent===!1?U(Vr):U(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const Ee=O.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ct(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ue(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function ot(O){y!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),y=O)}function q(O){O!==bv?(ue(r.CULL_FACE),O!==C&&(O===Gh?r.cullFace(r.BACK):O===wv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),C=O}function Se(O){O!==w&&(X&&r.lineWidth(O),w=O)}function ct(O,xe,ae){O?(ue(r.POLYGON_OFFSET_FILL),(k!==xe||G!==ae)&&(r.polygonOffset(xe,ae),k=xe,G=ae)):we(r.POLYGON_OFFSET_FILL)}function Ne(O){O?ue(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function Ve(O){O===void 0&&(O=r.TEXTURE0+W-1),fe!==O&&(r.activeTexture(O),fe=O)}function Ct(O,xe,ae){ae===void 0&&(fe===null?ae=r.TEXTURE0+W-1:ae=fe);let Ee=N[ae];Ee===void 0&&(Ee={type:void 0,texture:void 0},N[ae]=Ee),(Ee.type!==O||Ee.texture!==xe)&&(fe!==ae&&(r.activeTexture(ae),fe=ae),r.bindTexture(O,xe||Te[O]),Ee.type=O,Ee.texture=xe)}function D(){const O=N[fe];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function E(){try{r.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function H(){try{r.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{r.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{r.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{r.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ne(){try{r.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ge(){try{r.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pe(){try{r.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function he(){try{r.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{r.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(O){st.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),st.copy(O))}function ye(O){Z.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),Z.copy(O))}function qe(O,xe){let ae=c.get(xe);ae===void 0&&(ae=new WeakMap,c.set(xe,ae));let Ee=ae.get(O);Ee===void 0&&(Ee=r.getUniformBlockIndex(xe,O.name),ae.set(O,Ee))}function me(O,xe){const Ee=c.get(xe).get(O);l.get(xe)!==Ee&&(r.uniformBlockBinding(xe,Ee,O.__bindingPointIndex),l.set(xe,Ee))}function tt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},fe=null,N={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,x=null,b=null,v=null,M=null,T=null,A=new et(0,0,0),L=0,S=!1,y=null,C=null,w=null,k=null,G=null,st.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ue,disable:we,bindFramebuffer:Ze,drawBuffers:Ae,useProgram:dt,setBlending:U,setMaterial:Tt,setFlipSided:ot,setCullFace:q,setLineWidth:Se,setPolygonOffset:ct,setScissorTest:Ne,activeTexture:Ve,bindTexture:Ct,unbindTexture:D,compressedTexImage2D:E,compressedTexImage3D:H,texImage2D:he,texImage3D:de,updateUBOMapping:qe,uniformBlockBinding:me,texStorage2D:ge,texStorage3D:Pe,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:ee,compressedTexSubImage3D:ne,scissor:Me,viewport:ye,reset:tt}}function vE(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,E){return h?new OffscreenCanvas(D,E):nl("canvas")}function g(D,E,H){let J=1;const te=Ct(D);if((te.width>H||te.height>H)&&(J=H/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ee=Math.floor(J*te.width),ne=Math.floor(J*te.height);d===void 0&&(d=_(ee,ne));const ge=E?_(ee,ne):d;return ge.width=ee,ge.height=ne,ge.getContext("2d").drawImage(D,0,0,ee,ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ee+"x"+ne+")."),ge}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){r.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(D,E,H,J,te=!1){if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ee=E;if(E===r.RED&&(H===r.FLOAT&&(ee=r.R32F),H===r.HALF_FLOAT&&(ee=r.R16F),H===r.UNSIGNED_BYTE&&(ee=r.R8)),E===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(ee=r.R8UI),H===r.UNSIGNED_SHORT&&(ee=r.R16UI),H===r.UNSIGNED_INT&&(ee=r.R32UI),H===r.BYTE&&(ee=r.R8I),H===r.SHORT&&(ee=r.R16I),H===r.INT&&(ee=r.R32I)),E===r.RG&&(H===r.FLOAT&&(ee=r.RG32F),H===r.HALF_FLOAT&&(ee=r.RG16F),H===r.UNSIGNED_BYTE&&(ee=r.RG8)),E===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(ee=r.RG8UI),H===r.UNSIGNED_SHORT&&(ee=r.RG16UI),H===r.UNSIGNED_INT&&(ee=r.RG32UI),H===r.BYTE&&(ee=r.RG8I),H===r.SHORT&&(ee=r.RG16I),H===r.INT&&(ee=r.RG32I)),E===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(ee=r.RGB8UI),H===r.UNSIGNED_SHORT&&(ee=r.RGB16UI),H===r.UNSIGNED_INT&&(ee=r.RGB32UI),H===r.BYTE&&(ee=r.RGB8I),H===r.SHORT&&(ee=r.RGB16I),H===r.INT&&(ee=r.RGB32I)),E===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(ee=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(ee=r.RGBA16UI),H===r.UNSIGNED_INT&&(ee=r.RGBA32UI),H===r.BYTE&&(ee=r.RGBA8I),H===r.SHORT&&(ee=r.RGBA16I),H===r.INT&&(ee=r.RGBA32I)),E===r.RGB&&H===r.UNSIGNED_INT_5_9_9_9_REV&&(ee=r.RGB9_E5),E===r.RGBA){const ne=te?Ac:Et.getTransfer(J);H===r.FLOAT&&(ee=r.RGBA32F),H===r.HALF_FLOAT&&(ee=r.RGBA16F),H===r.UNSIGNED_BYTE&&(ee=ne===Ut?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(ee=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(ee=r.RGB5_A1)}return(ee===r.R16F||ee===r.R32F||ee===r.RG16F||ee===r.RG32F||ee===r.RGBA16F||ee===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(D,E){let H;return D?E===null||E===Is||E===Za?H=r.DEPTH24_STENCIL8:E===Pi?H=r.DEPTH32F_STENCIL8:E===Ka&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Is||E===Za?H=r.DEPTH_COMPONENT24:E===Pi?H=r.DEPTH_COMPONENT32F:E===Ka&&(H=r.DEPTH_COMPONENT16),H}function M(D,E){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Fn&&D.minFilter!==ii?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function T(D){const E=D.target;E.removeEventListener("dispose",T),L(E),E.isVideoTexture&&u.delete(E)}function A(D){const E=D.target;E.removeEventListener("dispose",A),y(E)}function L(D){const E=n.get(D);if(E.__webglInit===void 0)return;const H=D.source,J=f.get(H);if(J){const te=J[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(D),Object.keys(J).length===0&&f.delete(H)}n.remove(D)}function S(D){const E=n.get(D);r.deleteTexture(E.__webglTexture);const H=D.source,J=f.get(H);delete J[E.__cacheKey],o.memory.textures--}function y(D){const E=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let te=0;te<E.__webglFramebuffer[J].length;te++)r.deleteFramebuffer(E.__webglFramebuffer[J][te]);else r.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)r.deleteFramebuffer(E.__webglFramebuffer[J]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const H=D.textures;for(let J=0,te=H.length;J<te;J++){const ee=n.get(H[J]);ee.__webglTexture&&(r.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(H[J])}n.remove(D)}let C=0;function w(){C=0}function k(){const D=C;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),C+=1,D}function G(D){const E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function W(D,E){const H=n.get(D);if(D.isVideoTexture&&Ne(D),D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){const J=D.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Te(H,D,E);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+E)}function X(D,E){const H=n.get(D);if(D.version>0&&H.__version!==D.version){Te(H,D,E);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+E)}function j(D,E){const H=n.get(D);if(D.version>0&&H.__version!==D.version){Te(H,D,E);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+E)}function I(D,E){const H=n.get(D);if(D.version>0&&H.__version!==D.version){ue(H,D,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+E)}const fe={[No]:r.REPEAT,[Nr]:r.CLAMP_TO_EDGE,[Tc]:r.MIRRORED_REPEAT},N={[Fn]:r.NEAREST,[Lg]:r.NEAREST_MIPMAP_NEAREST,[va]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[uc]:r.LINEAR_MIPMAP_NEAREST,[fr]:r.LINEAR_MIPMAP_LINEAR},_e={[ry]:r.NEVER,[uy]:r.ALWAYS,[sy]:r.LESS,[Hg]:r.LEQUAL,[oy]:r.EQUAL,[cy]:r.GEQUAL,[ay]:r.GREATER,[ly]:r.NOTEQUAL};function He(D,E){if(E.type===Pi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===ii||E.magFilter===uc||E.magFilter===va||E.magFilter===fr||E.minFilter===ii||E.minFilter===uc||E.minFilter===va||E.minFilter===fr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,fe[E.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,fe[E.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,fe[E.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,N[E.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,N[E.minFilter]),E.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,_e[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Fn||E.minFilter!==va&&E.minFilter!==fr||E.type===Pi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function st(D,E){let H=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",T));const J=E.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const ee=G(E);if(ee!==D.__cacheKey){te[ee]===void 0&&(te[ee]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),te[ee].usedTimes++;const ne=te[D.__cacheKey];ne!==void 0&&(te[D.__cacheKey].usedTimes--,ne.usedTimes===0&&S(E)),D.__cacheKey=ee,D.__webglTexture=te[ee].texture}return H}function Z(D,E,H){return Math.floor(Math.floor(D/H)/E)}function oe(D,E,H,J){const ee=D.updateRanges;if(ee.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,H,J,E.data);else{ee.sort((de,Me)=>de.start-Me.start);let ne=0;for(let de=1;de<ee.length;de++){const Me=ee[ne],ye=ee[de],qe=Me.start+Me.count,me=Z(ye.start,E.width,4),tt=Z(Me.start,E.width,4);ye.start<=qe+1&&me===tt&&Z(ye.start+ye.count-1,E.width,4)===me?Me.count=Math.max(Me.count,ye.start+ye.count-Me.start):(++ne,ee[ne]=ye)}ee.length=ne+1;const ge=r.getParameter(r.UNPACK_ROW_LENGTH),Pe=r.getParameter(r.UNPACK_SKIP_PIXELS),he=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let de=0,Me=ee.length;de<Me;de++){const ye=ee[de],qe=Math.floor(ye.start/4),me=Math.ceil(ye.count/4),tt=qe%E.width,O=Math.floor(qe/E.width),xe=me,ae=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,tt),r.pixelStorei(r.UNPACK_SKIP_ROWS,O),t.texSubImage2D(r.TEXTURE_2D,0,tt,O,xe,ae,H,J,E.data)}D.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ge),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Pe),r.pixelStorei(r.UNPACK_SKIP_ROWS,he)}}function Te(D,E,H){let J=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=r.TEXTURE_3D);const te=st(D,E),ee=E.source;t.bindTexture(J,D.__webglTexture,r.TEXTURE0+H);const ne=n.get(ee);if(ee.version!==ne.__version||te===!0){t.activeTexture(r.TEXTURE0+H);const ge=Et.getPrimaries(Et.workingColorSpace),Pe=E.colorSpace===Ir?null:Et.getPrimaries(E.colorSpace),he=E.colorSpace===Ir||ge===Pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let de=g(E.image,!1,i.maxTextureSize);de=Ve(E,de);const Me=s.convert(E.format,E.colorSpace),ye=s.convert(E.type);let qe=b(E.internalFormat,Me,ye,E.colorSpace,E.isVideoTexture);He(J,E);let me;const tt=E.mipmaps,O=E.isVideoTexture!==!0,xe=ne.__version===void 0||te===!0,ae=ee.dataReady,Ee=M(E,de);if(E.isDepthTexture)qe=v(E.format===Qa,E.type),xe&&(O?t.texStorage2D(r.TEXTURE_2D,1,qe,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,qe,de.width,de.height,0,Me,ye,null));else if(E.isDataTexture)if(tt.length>0){O&&xe&&t.texStorage2D(r.TEXTURE_2D,Ee,qe,tt[0].width,tt[0].height);for(let re=0,ie=tt.length;re<ie;re++)me=tt[re],O?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,me.width,me.height,Me,ye,me.data):t.texImage2D(r.TEXTURE_2D,re,qe,me.width,me.height,0,Me,ye,me.data);E.generateMipmaps=!1}else O?(xe&&t.texStorage2D(r.TEXTURE_2D,Ee,qe,de.width,de.height),ae&&oe(E,de,Me,ye)):t.texImage2D(r.TEXTURE_2D,0,qe,de.width,de.height,0,Me,ye,de.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){O&&xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ee,qe,tt[0].width,tt[0].height,de.depth);for(let re=0,ie=tt.length;re<ie;re++)if(me=tt[re],E.format!==gi)if(Me!==null)if(O){if(ae)if(E.layerUpdates.size>0){const Le=Op(me.width,me.height,E.format,E.type);for(const Qe of E.layerUpdates){const Mt=me.data.subarray(Qe*Le/me.data.BYTES_PER_ELEMENT,(Qe+1)*Le/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,Qe,me.width,me.height,1,Me,Mt)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,me.width,me.height,de.depth,Me,me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,qe,me.width,me.height,de.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ae&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,me.width,me.height,de.depth,Me,ye,me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,qe,me.width,me.height,de.depth,0,Me,ye,me.data)}else{O&&xe&&t.texStorage2D(r.TEXTURE_2D,Ee,qe,tt[0].width,tt[0].height);for(let re=0,ie=tt.length;re<ie;re++)me=tt[re],E.format!==gi?Me!==null?O?ae&&t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,me.width,me.height,Me,me.data):t.compressedTexImage2D(r.TEXTURE_2D,re,qe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,me.width,me.height,Me,ye,me.data):t.texImage2D(r.TEXTURE_2D,re,qe,me.width,me.height,0,Me,ye,me.data)}else if(E.isDataArrayTexture)if(O){if(xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ee,qe,de.width,de.height,de.depth),ae)if(E.layerUpdates.size>0){const re=Op(de.width,de.height,E.format,E.type);for(const ie of E.layerUpdates){const Le=de.data.subarray(ie*re/de.data.BYTES_PER_ELEMENT,(ie+1)*re/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ie,de.width,de.height,1,Me,ye,Le)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Me,ye,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,de.width,de.height,de.depth,0,Me,ye,de.data);else if(E.isData3DTexture)O?(xe&&t.texStorage3D(r.TEXTURE_3D,Ee,qe,de.width,de.height,de.depth),ae&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Me,ye,de.data)):t.texImage3D(r.TEXTURE_3D,0,qe,de.width,de.height,de.depth,0,Me,ye,de.data);else if(E.isFramebufferTexture){if(xe)if(O)t.texStorage2D(r.TEXTURE_2D,Ee,qe,de.width,de.height);else{let re=de.width,ie=de.height;for(let Le=0;Le<Ee;Le++)t.texImage2D(r.TEXTURE_2D,Le,qe,re,ie,0,Me,ye,null),re>>=1,ie>>=1}}else if(tt.length>0){if(O&&xe){const re=Ct(tt[0]);t.texStorage2D(r.TEXTURE_2D,Ee,qe,re.width,re.height)}for(let re=0,ie=tt.length;re<ie;re++)me=tt[re],O?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,Me,ye,me):t.texImage2D(r.TEXTURE_2D,re,qe,Me,ye,me);E.generateMipmaps=!1}else if(O){if(xe){const re=Ct(de);t.texStorage2D(r.TEXTURE_2D,Ee,qe,re.width,re.height)}ae&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Me,ye,de)}else t.texImage2D(r.TEXTURE_2D,0,qe,Me,ye,de);m(E)&&p(J),ne.__version=ee.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function ue(D,E,H){if(E.image.length!==6)return;const J=st(D,E),te=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+H);const ee=n.get(te);if(te.version!==ee.__version||J===!0){t.activeTexture(r.TEXTURE0+H);const ne=Et.getPrimaries(Et.workingColorSpace),ge=E.colorSpace===Ir?null:Et.getPrimaries(E.colorSpace),Pe=E.colorSpace===Ir||ne===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const he=E.isCompressedTexture||E.image[0].isCompressedTexture,de=E.image[0]&&E.image[0].isDataTexture,Me=[];for(let ie=0;ie<6;ie++)!he&&!de?Me[ie]=g(E.image[ie],!0,i.maxCubemapSize):Me[ie]=de?E.image[ie].image:E.image[ie],Me[ie]=Ve(E,Me[ie]);const ye=Me[0],qe=s.convert(E.format,E.colorSpace),me=s.convert(E.type),tt=b(E.internalFormat,qe,me,E.colorSpace),O=E.isVideoTexture!==!0,xe=ee.__version===void 0||J===!0,ae=te.dataReady;let Ee=M(E,ye);He(r.TEXTURE_CUBE_MAP,E);let re;if(he){O&&xe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,tt,ye.width,ye.height);for(let ie=0;ie<6;ie++){re=Me[ie].mipmaps;for(let Le=0;Le<re.length;Le++){const Qe=re[Le];E.format!==gi?qe!==null?O?ae&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le,0,0,Qe.width,Qe.height,qe,Qe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le,tt,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le,0,0,Qe.width,Qe.height,qe,me,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le,tt,Qe.width,Qe.height,0,qe,me,Qe.data)}}}else{if(re=E.mipmaps,O&&xe){re.length>0&&Ee++;const ie=Ct(Me[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,tt,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(de){O?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Me[ie].width,Me[ie].height,qe,me,Me[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,tt,Me[ie].width,Me[ie].height,0,qe,me,Me[ie].data);for(let Le=0;Le<re.length;Le++){const Mt=re[Le].image[ie].image;O?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le+1,0,0,Mt.width,Mt.height,qe,me,Mt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le+1,tt,Mt.width,Mt.height,0,qe,me,Mt.data)}}else{O?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,qe,me,Me[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,tt,qe,me,Me[ie]);for(let Le=0;Le<re.length;Le++){const Qe=re[Le];O?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le+1,0,0,qe,me,Qe.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Le+1,tt,qe,me,Qe.image[ie])}}}m(E)&&p(r.TEXTURE_CUBE_MAP),ee.__version=te.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function we(D,E,H,J,te,ee){const ne=s.convert(H.format,H.colorSpace),ge=s.convert(H.type),Pe=b(H.internalFormat,ne,ge,H.colorSpace),he=n.get(E),de=n.get(H);if(de.__renderTarget=E,!he.__hasExternalTextures){const Me=Math.max(1,E.width>>ee),ye=Math.max(1,E.height>>ee);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,ee,Pe,Me,ye,E.depth,0,ne,ge,null):t.texImage2D(te,ee,Pe,Me,ye,0,ne,ge,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),ct(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,te,de.__webglTexture,0,Se(E)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,te,de.__webglTexture,ee),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ze(D,E,H){if(r.bindRenderbuffer(r.RENDERBUFFER,D),E.depthBuffer){const J=E.depthTexture,te=J&&J.isDepthTexture?J.type:null,ee=v(E.stencilBuffer,te),ne=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=Se(E);ct(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,ee,E.width,E.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,ee,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ee,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,D)}else{const J=E.textures;for(let te=0;te<J.length;te++){const ee=J[te],ne=s.convert(ee.format,ee.colorSpace),ge=s.convert(ee.type),Pe=b(ee.internalFormat,ne,ge,ee.colorSpace),he=Se(E);H&&ct(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,he,Pe,E.width,E.height):ct(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,he,Pe,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Pe,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(D,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);const te=J.__webglTexture,ee=Se(E);if(E.depthTexture.format===Ja)ct(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0);else if(E.depthTexture.format===Qa)ct(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function dt(D){const E=n.get(D),H=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){const J=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=J}if(D.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const J=D.texture.mipmaps;J&&J.length>0?Ae(E.__webglFramebuffer[0],D):Ae(E.__webglFramebuffer,D)}else if(H){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=r.createRenderbuffer(),Ze(E.__webglDepthbuffer[J],D,!1);else{const te=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,ee)}}else{const J=D.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),Ze(E.__webglDepthbuffer,D,!1);else{const te=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,ee)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Je(D,E,H){const J=n.get(D);E!==void 0&&we(J.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&dt(D)}function Ie(D){const E=D.texture,H=n.get(D),J=n.get(E);D.addEventListener("dispose",A);const te=D.textures,ee=D.isWebGLCubeRenderTarget===!0,ne=te.length>1;if(ne||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=E.version,o.memory.textures++),ee){H.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[ge]=[];for(let Pe=0;Pe<E.mipmaps.length;Pe++)H.__webglFramebuffer[ge][Pe]=r.createFramebuffer()}else H.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let ge=0;ge<E.mipmaps.length;ge++)H.__webglFramebuffer[ge]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(ne)for(let ge=0,Pe=te.length;ge<Pe;ge++){const he=n.get(te[ge]);he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture(),o.memory.textures++)}if(D.samples>0&&ct(D)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ge=0;ge<te.length;ge++){const Pe=te[ge];H.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[ge]);const he=s.convert(Pe.format,Pe.colorSpace),de=s.convert(Pe.type),Me=b(Pe.internalFormat,he,de,Pe.colorSpace,D.isXRRenderTarget===!0),ye=Se(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,Me,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,H.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Ze(H.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),He(r.TEXTURE_CUBE_MAP,E);for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0)for(let Pe=0;Pe<E.mipmaps.length;Pe++)we(H.__webglFramebuffer[ge][Pe],D,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Pe);else we(H.__webglFramebuffer[ge],D,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(E)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){for(let ge=0,Pe=te.length;ge<Pe;ge++){const he=te[ge],de=n.get(he);t.bindTexture(r.TEXTURE_2D,de.__webglTexture),He(r.TEXTURE_2D,he),we(H.__webglFramebuffer,D,he,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,0),m(he)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ge=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ge=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ge,J.__webglTexture),He(ge,E),E.mipmaps&&E.mipmaps.length>0)for(let Pe=0;Pe<E.mipmaps.length;Pe++)we(H.__webglFramebuffer[Pe],D,E,r.COLOR_ATTACHMENT0,ge,Pe);else we(H.__webglFramebuffer,D,E,r.COLOR_ATTACHMENT0,ge,0);m(E)&&p(ge),t.unbindTexture()}D.depthBuffer&&dt(D)}function U(D){const E=D.textures;for(let H=0,J=E.length;H<J;H++){const te=E[H];if(m(te)){const ee=x(D),ne=n.get(te).__webglTexture;t.bindTexture(ee,ne),p(ee),t.unbindTexture()}}}const Tt=[],ot=[];function q(D){if(D.samples>0){if(ct(D)===!1){const E=D.textures,H=D.width,J=D.height;let te=r.COLOR_BUFFER_BIT;const ee=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=n.get(D),ge=E.length>1;if(ge)for(let he=0;he<E.length;he++)t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer);const Pe=D.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ne.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let he=0;he<E.length;he++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),ge){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ne.__webglColorRenderbuffer[he]);const de=n.get(E[he]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,de,0)}r.blitFramebuffer(0,0,H,J,0,0,H,J,te,r.NEAREST),l===!0&&(Tt.length=0,ot.length=0,Tt.push(r.COLOR_ATTACHMENT0+he),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Tt.push(ee),ot.push(ee),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ot)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let he=0;he<E.length;he++){t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,ne.__webglColorRenderbuffer[he]);const de=n.get(E[he]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,de,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const E=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Se(D){return Math.min(i.maxSamples,D.samples)}function ct(D){const E=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ne(D){const E=o.render.frame;u.get(D)!==E&&(u.set(D,E),D.update())}function Ve(D,E){const H=D.colorSpace,J=D.format,te=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||H!==kn&&H!==Ir&&(Et.getTransfer(H)===Ut?(J!==gi||te!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function Ct(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=w,this.setTexture2D=W,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=I,this.rebindTextures=Je,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=ct}function yE(r,e){function t(n,i=Ir){let s;const o=Et.getTransfer(i);if(n===Ki)return r.UNSIGNED_BYTE;if(n===Hf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Vf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ng)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Dg)return r.BYTE;if(n===Ig)return r.SHORT;if(n===Ka)return r.UNSIGNED_SHORT;if(n===zf)return r.INT;if(n===Is)return r.UNSIGNED_INT;if(n===Pi)return r.FLOAT;if(n===pl)return r.HALF_FLOAT;if(n===Og)return r.ALPHA;if(n===Ug)return r.RGB;if(n===gi)return r.RGBA;if(n===Ja)return r.DEPTH_COMPONENT;if(n===Qa)return r.DEPTH_STENCIL;if(n===Gf)return r.RED;if(n===Wf)return r.RED_INTEGER;if(n===Fg)return r.RG;if(n===Xf)return r.RG_INTEGER;if(n===qf)return r.RGBA_INTEGER;if(n===dc||n===fc||n===hc||n===pc)if(o===Ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===dc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===dc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sd||n===bd||n===wd||n===Md)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Sd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Md)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ed||n===Td||n===Ad)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ed||n===Td)return o===Ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ad)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Cd||n===Rd||n===Pd||n===Ld||n===Dd||n===Id||n===Nd||n===Od||n===Ud||n===Fd||n===kd||n===Bd||n===zd||n===Hd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Cd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ld)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Dd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Id)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Od)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ud)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hd)return o===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mc||n===Vd||n===Gd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===mc)return o===Ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kg||n===Wd||n===Xd||n===qd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===mc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Wd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Za?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const xE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SE=`
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

}`;class bE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new on,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Di({vertexShader:xE,fragmentShader:SE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Un(new Ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wE extends Yo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new bE,m=t.getContextAttributes();let p=null,x=null;const b=[],v=[],M=new bt;let T=null;const A=new Hn;A.viewport=new Rt;const L=new Hn;L.viewport=new Rt;const S=[A,L],y=new Ox;let C=null,w=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let oe=b[Z];return oe===void 0&&(oe=new Au,b[Z]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(Z){let oe=b[Z];return oe===void 0&&(oe=new Au,b[Z]=oe),oe.getGripSpace()},this.getHand=function(Z){let oe=b[Z];return oe===void 0&&(oe=new Au,b[Z]=oe),oe.getHandSpace()};function k(Z){const oe=v.indexOf(Z.inputSource);if(oe===-1)return;const Te=b[oe];Te!==void 0&&(Te.update(Z.inputSource,Z.frame,c||o),Te.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",W);for(let Z=0;Z<b.length;Z++){const oe=v[Z];oe!==null&&(v[Z]=null,b[Z].disconnect(oe))}C=null,w=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,x=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",G),i.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,ue=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=m.stencil?Qa:Ja,ue=m.stencil?Za:Is);const Ze={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Ze),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ns(f.textureWidth,f.textureHeight,{format:gi,type:Ki,depthTexture:new n_(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Te={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),x=new Ns(h.framebufferWidth,h.framebufferHeight,{format:gi,type:Ki,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(Z){for(let oe=0;oe<Z.removed.length;oe++){const Te=Z.removed[oe],ue=v.indexOf(Te);ue>=0&&(v[ue]=null,b[ue].disconnect(Te))}for(let oe=0;oe<Z.added.length;oe++){const Te=Z.added[oe];let ue=v.indexOf(Te);if(ue===-1){for(let Ze=0;Ze<b.length;Ze++)if(Ze>=v.length){v.push(Te),ue=Ze;break}else if(v[Ze]===null){v[Ze]=Te,ue=Ze;break}if(ue===-1)break}const we=b[ue];we&&we.connect(Te)}}const X=new V,j=new V;function I(Z,oe,Te){X.setFromMatrixPosition(oe.matrixWorld),j.setFromMatrixPosition(Te.matrixWorld);const ue=X.distanceTo(j),we=oe.projectionMatrix.elements,Ze=Te.projectionMatrix.elements,Ae=we[14]/(we[10]-1),dt=we[14]/(we[10]+1),Je=(we[9]+1)/we[5],Ie=(we[9]-1)/we[5],U=(we[8]-1)/we[0],Tt=(Ze[8]+1)/Ze[0],ot=Ae*U,q=Ae*Tt,Se=ue/(-U+Tt),ct=Se*-U;if(oe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ct),Z.translateZ(Se),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),we[10]===-1)Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Ne=Ae+Se,Ve=dt+Se,Ct=ot-ct,D=q+(ue-ct),E=Je*dt/Ve*Ne,H=Ie*dt/Ve*Ne;Z.projectionMatrix.makePerspective(Ct,D,E,H,Ne,Ve),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function fe(Z,oe){oe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(oe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let oe=Z.near,Te=Z.far;g.texture!==null&&(g.depthNear>0&&(oe=g.depthNear),g.depthFar>0&&(Te=g.depthFar)),y.near=L.near=A.near=oe,y.far=L.far=A.far=Te,(C!==y.near||w!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,w=y.far),A.layers.mask=Z.layers.mask|2,L.layers.mask=Z.layers.mask|4,y.layers.mask=A.layers.mask|L.layers.mask;const ue=Z.parent,we=y.cameras;fe(y,ue);for(let Ze=0;Ze<we.length;Ze++)fe(we[Ze],ue);we.length===2?I(y,A,L):y.projectionMatrix.copy(A.projectionMatrix),N(Z,y,ue)};function N(Z,oe,Te){Te===null?Z.matrix.copy(oe.matrixWorld):(Z.matrix.copy(Te.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(oe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Oo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let _e=null;function He(Z,oe){if(u=oe.getViewerPose(c||o),_=oe,u!==null){const Te=u.views;h!==null&&(e.setRenderTargetFramebuffer(x,h.framebuffer),e.setRenderTarget(x));let ue=!1;Te.length!==y.cameras.length&&(y.cameras.length=0,ue=!0);for(let Ae=0;Ae<Te.length;Ae++){const dt=Te[Ae];let Je=null;if(h!==null)Je=h.getViewport(dt);else{const U=d.getViewSubImage(f,dt);Je=U.viewport,Ae===0&&(e.setRenderTargetTextures(x,U.colorTexture,U.depthStencilTexture),e.setRenderTarget(x))}let Ie=S[Ae];Ie===void 0&&(Ie=new Hn,Ie.layers.enable(Ae),Ie.viewport=new Rt,S[Ae]=Ie),Ie.matrix.fromArray(dt.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(dt.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Je.x,Je.y,Je.width,Je.height),Ae===0&&(y.matrix.copy(Ie.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ue===!0&&y.cameras.push(Ie)}const we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Ae=d.getDepthInformation(Te[0]);Ae&&Ae.isValid&&Ae.texture&&g.init(e,Ae,i.renderState)}}for(let Te=0;Te<b.length;Te++){const ue=v[Te],we=b[Te];ue!==null&&we!==void 0&&we.update(ue,oe,c||o)}_e&&_e(Z,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),_=null}const st=new a_;st.setAnimationLoop(He),this.setAnimationLoop=function(Z){_e=Z},this.dispose=function(){}}}const cs=new Zi,ME=new mt;function EE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,$g(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),b=x.envMap,v=x.envMapRotation;b&&(m.envMap.value=b,cs.copy(v),cs.x*=-1,cs.y*=-1,cs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),m.envMapRotation.value.setFromMatrix4(ME.makeRotationFromEuler(cs)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function TE(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){const v=b.program;n.uniformBlockBinding(x,v)}function c(x,b){let v=i[x.id];v===void 0&&(_(x),v=u(x),i[x.id]=v,x.addEventListener("dispose",m));const M=b.program;n.updateUBOMapping(x,M);const T=e.render.frame;s[x.id]!==T&&(f(x),s[x.id]=T)}function u(x){const b=d();x.__bindingPointIndex=b;const v=r.createBuffer(),M=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,M,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,v),v}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const b=i[x.id],v=x.uniforms,M=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let T=0,A=v.length;T<A;T++){const L=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,y=L.length;S<y;S++){const C=L[S];if(h(C,T,S,M)===!0){const w=C.__offset,k=Array.isArray(C.value)?C.value:[C.value];let G=0;for(let W=0;W<k.length;W++){const X=k[W],j=g(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,w+G,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,G),G+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,w,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(x,b,v,M){const T=x.value,A=b+"_"+v;if(M[A]===void 0)return typeof T=="number"||typeof T=="boolean"?M[A]=T:M[A]=T.clone(),!0;{const L=M[A];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return M[A]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function _(x){const b=x.uniforms;let v=0;const M=16;for(let A=0,L=b.length;A<L;A++){const S=Array.isArray(b[A])?b[A]:[b[A]];for(let y=0,C=S.length;y<C;y++){const w=S[y],k=Array.isArray(w.value)?w.value:[w.value];for(let G=0,W=k.length;G<W;G++){const X=k[G],j=g(X),I=v%M,fe=I%j.boundary,N=I+fe;v+=fe,N!==0&&M-N<j.storage&&(v+=M-N),w.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=v,v+=j.storage}}}const T=v%M;return T>0&&(v+=M-T),x.__size=v,x.__cache={},this}function g(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function m(x){const b=x.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class AE{constructor(e={}){const{canvas:t=Cy(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let M=!1;this._outputColorSpace=mn;let T=0,A=0,L=null,S=-1,y=null;const C=new Rt,w=new Rt;let k=null;const G=new et(0);let W=0,X=t.width,j=t.height,I=1,fe=null,N=null;const _e=new Rt(0,0,X,j),He=new Rt(0,0,X,j);let st=!1;const Z=new Zf;let oe=!1,Te=!1;const ue=new mt,we=new mt,Ze=new V,Ae=new Rt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function Ie(){return L===null?I:1}let U=n;function Tt(R,F){return t.getContext(R,F)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bf}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",ie,!1),U===null){const F="webgl2";if(U=Tt(F,R),U===null)throw Tt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ot,q,Se,ct,Ne,Ve,Ct,D,E,H,J,te,ee,ne,ge,Pe,he,de,Me,ye,qe,me,tt,O;function xe(){ot=new Fw(U),ot.init(),me=new yE(U,ot),q=new Pw(U,ot,e,me),Se=new _E(U,ot),q.reverseDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),ct=new zw(U),Ne=new rE,Ve=new vE(U,ot,Se,Ne,q,me,ct),Ct=new Dw(v),D=new Uw(v),E=new qx(U),tt=new Cw(U,E),H=new kw(U,E,ct,tt),J=new Vw(U,H,E,ct),Me=new Hw(U,q,Ve),Pe=new Lw(Ne),te=new iE(v,Ct,D,ot,q,tt,Pe),ee=new EE(v,Ne),ne=new oE,ge=new fE(ot),de=new Aw(v,Ct,D,Se,J,h,l),he=new mE(v,J,q),O=new TE(U,ct,q,Se),ye=new Rw(U,ot,ct),qe=new Bw(U,ot,ct),ct.programs=te.programs,v.capabilities=q,v.extensions=ot,v.properties=Ne,v.renderLists=ne,v.shadowMap=he,v.state=Se,v.info=ct}xe();const ae=new wE(v,U);this.xr=ae,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=ot.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ot.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(R){R!==void 0&&(I=R,this.setSize(X,j,!1))},this.getSize=function(R){return R.set(X,j)},this.setSize=function(R,F,$=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=R,j=F,t.width=Math.floor(R*I),t.height=Math.floor(F*I),$===!0&&(t.style.width=R+"px",t.style.height=F+"px"),this.setViewport(0,0,R,F)},this.getDrawingBufferSize=function(R){return R.set(X*I,j*I).floor()},this.setDrawingBufferSize=function(R,F,$){X=R,j=F,I=$,t.width=Math.floor(R*$),t.height=Math.floor(F*$),this.setViewport(0,0,R,F)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(_e)},this.setViewport=function(R,F,$,Y){R.isVector4?_e.set(R.x,R.y,R.z,R.w):_e.set(R,F,$,Y),Se.viewport(C.copy(_e).multiplyScalar(I).round())},this.getScissor=function(R){return R.copy(He)},this.setScissor=function(R,F,$,Y){R.isVector4?He.set(R.x,R.y,R.z,R.w):He.set(R,F,$,Y),Se.scissor(w.copy(He).multiplyScalar(I).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(R){Se.setScissorTest(st=R)},this.setOpaqueSort=function(R){fe=R},this.setTransparentSort=function(R){N=R},this.getClearColor=function(R){return R.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(R=!0,F=!0,$=!0){let Y=0;if(R){let B=!1;if(L!==null){const pe=L.texture.format;B=pe===qf||pe===Xf||pe===Wf}if(B){const pe=L.texture.type,be=pe===Ki||pe===Is||pe===Ka||pe===Za||pe===Hf||pe===Vf,Ge=de.getClearColor(),De=de.getClearAlpha(),je=Ge.r,rt=Ge.g,$e=Ge.b;be?(_[0]=je,_[1]=rt,_[2]=$e,_[3]=De,U.clearBufferuiv(U.COLOR,0,_)):(g[0]=je,g[1]=rt,g[2]=$e,g[3]=De,U.clearBufferiv(U.COLOR,0,g))}else Y|=U.COLOR_BUFFER_BIT}F&&(Y|=U.DEPTH_BUFFER_BIT),$&&(Y|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),de.dispose(),ne.dispose(),ge.dispose(),Ne.dispose(),Ct.dispose(),D.dispose(),J.dispose(),tt.dispose(),O.dispose(),te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",ve),ae.removeEventListener("sessionend",nt),We.stop()};function Ee(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=ct.autoReset,F=he.enabled,$=he.autoUpdate,Y=he.needsUpdate,B=he.type;xe(),ct.autoReset=R,he.enabled=F,he.autoUpdate=$,he.needsUpdate=Y,he.type=B}function ie(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Le(R){const F=R.target;F.removeEventListener("dispose",Le),Qe(F)}function Qe(R){Mt(R),Ne.remove(R)}function Mt(R){const F=Ne.get(R).programs;F!==void 0&&(F.forEach(function($){te.releaseProgram($)}),R.isShaderMaterial&&te.releaseShaderCache(R))}this.renderBufferDirect=function(R,F,$,Y,B,pe){F===null&&(F=dt);const be=B.isMesh&&B.matrixWorld.determinant()<0,Ge=Oe(R,F,$,Y,B);Se.setMaterial(Y,be);let De=$.index,je=1;if(Y.wireframe===!0){if(De=H.getWireframeAttribute($),De===void 0)return;je=2}const rt=$.drawRange,$e=$.attributes.position;let ht=rt.start*je,It=(rt.start+rt.count)*je;pe!==null&&(ht=Math.max(ht,pe.start*je),It=Math.min(It,(pe.start+pe.count)*je)),De!==null?(ht=Math.max(ht,0),It=Math.min(It,De.count)):$e!=null&&(ht=Math.max(ht,0),It=Math.min(It,$e.count));const Wt=It-ht;if(Wt<0||Wt===1/0)return;tt.setup(B,Y,Ge,$,De);let $t,At=ye;if(De!==null&&($t=E.get(De),At=qe,At.setIndex($t)),B.isMesh)Y.wireframe===!0?(Se.setLineWidth(Y.wireframeLinewidth*Ie()),At.setMode(U.LINES)):At.setMode(U.TRIANGLES);else if(B.isLine){let at=Y.linewidth;at===void 0&&(at=1),Se.setLineWidth(at*Ie()),B.isLineSegments?At.setMode(U.LINES):B.isLineLoop?At.setMode(U.LINE_LOOP):At.setMode(U.LINE_STRIP)}else B.isPoints?At.setMode(U.POINTS):B.isSprite&&At.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)xo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),At.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))At.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const at=B._multiDrawStarts,pn=B._multiDrawCounts,Lt=B._multiDrawCount,xi=De?E.get(De).bytesPerElement:1,Vs=Ne.get(Y).currentProgram.getUniforms();for(let $n=0;$n<Lt;$n++)Vs.setValue(U,"_gl_DrawID",$n),At.render(at[$n]/xi,pn[$n])}else if(B.isInstancedMesh)At.renderInstances(ht,Wt,B.count);else if($.isInstancedBufferGeometry){const at=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,pn=Math.min($.instanceCount,at);At.renderInstances(ht,Wt,pn)}else At.render(ht,Wt)};function Ce(R,F,$){R.transparent===!0&&R.side===mi&&R.forceSinglePass===!1?(R.side=Vn,R.needsUpdate=!0,z(R,F,$),R.side=xr,R.needsUpdate=!0,z(R,F,$),R.side=mi):z(R,F,$)}this.compile=function(R,F,$=null){$===null&&($=R),p=ge.get($),p.init(F),b.push(p),$.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),R!==$&&R.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const Y=new Set;return R.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const pe=B.material;if(pe)if(Array.isArray(pe))for(let be=0;be<pe.length;be++){const Ge=pe[be];Ce(Ge,$,B),Y.add(Ge)}else Ce(pe,$,B),Y.add(pe)}),p=b.pop(),Y},this.compileAsync=function(R,F,$=null){const Y=this.compile(R,F,$);return new Promise(B=>{function pe(){if(Y.forEach(function(be){Ne.get(be).currentProgram.isReady()&&Y.delete(be)}),Y.size===0){B(R);return}setTimeout(pe,10)}ot.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Fe=null;function ut(R){Fe&&Fe(R)}function ve(){We.stop()}function nt(){We.start()}const We=new a_;We.setAnimationLoop(ut),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(R){Fe=R,ae.setAnimationLoop(R),R===null?We.stop():We.start()},ae.addEventListener("sessionstart",ve),ae.addEventListener("sessionend",nt),this.render=function(R,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,F,L),p=ge.get(R,b.length),p.init(F),b.push(p),we.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(we),Te=this.localClippingEnabled,oe=Pe.init(this.clippingPlanes,Te),m=ne.get(R,x.length),m.init(),x.push(m),ae.enabled===!0&&ae.isPresenting===!0){const pe=v.xr.getDepthSensingMesh();pe!==null&&lt(pe,F,-1/0,v.sortObjects)}lt(R,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(fe,N),Je=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Je&&de.addToRenderList(m,R),this.info.render.frame++,oe===!0&&Pe.beginShadows();const $=p.state.shadowsArray;he.render($,R,F),oe===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){const pe=F.cameras;if(B.length>0)for(let be=0,Ge=pe.length;be<Ge;be++){const De=pe[be];ft(Y,B,R,De)}Je&&de.render(R);for(let be=0,Ge=pe.length;be<Ge;be++){const De=pe[be];Gt(m,R,De,De.viewport)}}else B.length>0&&ft(Y,B,R,F),Je&&de.render(R),Gt(m,R,F);L!==null&&A===0&&(Ve.updateMultisampleRenderTarget(L),Ve.updateRenderTargetMipmap(L)),R.isScene===!0&&R.onAfterRender(v,R,F),tt.resetDefaultState(),S=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],oe===!0&&Pe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function lt(R,F,$,Y){if(R.visible===!1)return;if(R.layers.test(F.layers)){if(R.isGroup)$=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(F);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){Y&&Ae.setFromMatrixPosition(R.matrixWorld).applyMatrix4(we);const be=J.update(R),Ge=R.material;Ge.visible&&m.push(R,be,Ge,$,Ae.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const be=J.update(R),Ge=R.material;if(Y&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ae.copy(R.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ae.copy(be.boundingSphere.center)),Ae.applyMatrix4(R.matrixWorld).applyMatrix4(we)),Array.isArray(Ge)){const De=be.groups;for(let je=0,rt=De.length;je<rt;je++){const $e=De[je],ht=Ge[$e.materialIndex];ht&&ht.visible&&m.push(R,be,ht,$,Ae.z,$e)}}else Ge.visible&&m.push(R,be,Ge,$,Ae.z,null)}}const pe=R.children;for(let be=0,Ge=pe.length;be<Ge;be++)lt(pe[be],F,$,Y)}function Gt(R,F,$,Y){const B=R.opaque,pe=R.transmissive,be=R.transparent;p.setupLightsView($),oe===!0&&Pe.setGlobalState(v.clippingPlanes,$),Y&&Se.viewport(C.copy(Y)),B.length>0&&Pt(B,F,$),pe.length>0&&Pt(pe,F,$),be.length>0&&Pt(be,F,$),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function ft(R,F,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Ns(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?pl:Ki,minFilter:fr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const pe=p.state.transmissionRenderTarget[Y.id],be=Y.viewport||C;pe.setSize(be.z*v.transmissionResolutionScale,be.w*v.transmissionResolutionScale);const Ge=v.getRenderTarget();v.setRenderTarget(pe),v.getClearColor(G),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),Je&&de.render($);const De=v.toneMapping;v.toneMapping=Wr;const je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),oe===!0&&Pe.setGlobalState(v.clippingPlanes,Y),Pt(R,$,Y),Ve.updateMultisampleRenderTarget(pe),Ve.updateRenderTargetMipmap(pe),ot.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let $e=0,ht=F.length;$e<ht;$e++){const It=F[$e],Wt=It.object,$t=It.geometry,At=It.material,at=It.group;if(At.side===mi&&Wt.layers.test(Y.layers)){const pn=At.side;At.side=Vn,At.needsUpdate=!0,P(Wt,$,Y,$t,At,at),At.side=pn,At.needsUpdate=!0,rt=!0}}rt===!0&&(Ve.updateMultisampleRenderTarget(pe),Ve.updateRenderTargetMipmap(pe))}v.setRenderTarget(Ge),v.setClearColor(G,W),je!==void 0&&(Y.viewport=je),v.toneMapping=De}function Pt(R,F,$){const Y=F.isScene===!0?F.overrideMaterial:null;for(let B=0,pe=R.length;B<pe;B++){const be=R[B],Ge=be.object,De=be.geometry,je=be.group;let rt=be.material;rt.allowOverride===!0&&Y!==null&&(rt=Y),Ge.layers.test($.layers)&&P(Ge,F,$,De,rt,je)}}function P(R,F,$,Y,B,pe){R.onBeforeRender(v,F,$,Y,B,pe),R.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),B.onBeforeRender(v,F,$,Y,R,pe),B.transparent===!0&&B.side===mi&&B.forceSinglePass===!1?(B.side=Vn,B.needsUpdate=!0,v.renderBufferDirect($,F,Y,B,R,pe),B.side=xr,B.needsUpdate=!0,v.renderBufferDirect($,F,Y,B,R,pe),B.side=mi):v.renderBufferDirect($,F,Y,B,R,pe),R.onAfterRender(v,F,$,Y,B,pe)}function z(R,F,$){F.isScene!==!0&&(F=dt);const Y=Ne.get(R),B=p.state.lights,pe=p.state.shadowsArray,be=B.state.version,Ge=te.getParameters(R,B.state,pe,F,$),De=te.getProgramCacheKey(Ge);let je=Y.programs;Y.environment=R.isMeshStandardMaterial?F.environment:null,Y.fog=F.fog,Y.envMap=(R.isMeshStandardMaterial?D:Ct).get(R.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&R.envMap===null?F.environmentRotation:R.envMapRotation,je===void 0&&(R.addEventListener("dispose",Le),je=new Map,Y.programs=je);let rt=je.get(De);if(rt!==void 0){if(Y.currentProgram===rt&&Y.lightsStateVersion===be)return se(R,Ge),rt}else Ge.uniforms=te.getUniforms(R),R.onBeforeCompile(Ge,v),rt=te.acquireProgram(Ge,De),je.set(De,rt),Y.uniforms=Ge.uniforms;const $e=Y.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&($e.clippingPlanes=Pe.uniform),se(R,Ge),Y.needsLights=it(R),Y.lightsStateVersion=be,Y.needsLights&&($e.ambientLightColor.value=B.state.ambient,$e.lightProbe.value=B.state.probe,$e.directionalLights.value=B.state.directional,$e.directionalLightShadows.value=B.state.directionalShadow,$e.spotLights.value=B.state.spot,$e.spotLightShadows.value=B.state.spotShadow,$e.rectAreaLights.value=B.state.rectArea,$e.ltc_1.value=B.state.rectAreaLTC1,$e.ltc_2.value=B.state.rectAreaLTC2,$e.pointLights.value=B.state.point,$e.pointLightShadows.value=B.state.pointShadow,$e.hemisphereLights.value=B.state.hemi,$e.directionalShadowMap.value=B.state.directionalShadowMap,$e.directionalShadowMatrix.value=B.state.directionalShadowMatrix,$e.spotShadowMap.value=B.state.spotShadowMap,$e.spotLightMatrix.value=B.state.spotLightMatrix,$e.spotLightMap.value=B.state.spotLightMap,$e.pointShadowMap.value=B.state.pointShadowMap,$e.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=rt,Y.uniformsList=null,rt}function Q(R){if(R.uniformsList===null){const F=R.currentProgram.getUniforms();R.uniformsList=gc.seqWithValue(F.seq,R.uniforms)}return R.uniformsList}function se(R,F){const $=Ne.get(R);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Oe(R,F,$,Y,B){F.isScene!==!0&&(F=dt),Ve.resetTextureUnits();const pe=F.fog,be=Y.isMeshStandardMaterial?F.environment:null,Ge=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:kn,De=(Y.isMeshStandardMaterial?D:Ct).get(Y.envMap||be),je=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,rt=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),$e=!!$.morphAttributes.position,ht=!!$.morphAttributes.normal,It=!!$.morphAttributes.color;let Wt=Wr;Y.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Wt=v.toneMapping);const $t=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,At=$t!==void 0?$t.length:0,at=Ne.get(Y),pn=p.state.lights;if(oe===!0&&(Te===!0||R!==y)){const Tn=R===y&&Y.id===S;Pe.setState(Y,R,Tn)}let Lt=!1;Y.version===at.__version?(at.needsLights&&at.lightsStateVersion!==pn.state.version||at.outputColorSpace!==Ge||B.isBatchedMesh&&at.batching===!1||!B.isBatchedMesh&&at.batching===!0||B.isBatchedMesh&&at.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&at.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&at.instancing===!1||!B.isInstancedMesh&&at.instancing===!0||B.isSkinnedMesh&&at.skinning===!1||!B.isSkinnedMesh&&at.skinning===!0||B.isInstancedMesh&&at.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&at.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&at.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&at.instancingMorph===!1&&B.morphTexture!==null||at.envMap!==De||Y.fog===!0&&at.fog!==pe||at.numClippingPlanes!==void 0&&(at.numClippingPlanes!==Pe.numPlanes||at.numIntersection!==Pe.numIntersection)||at.vertexAlphas!==je||at.vertexTangents!==rt||at.morphTargets!==$e||at.morphNormals!==ht||at.morphColors!==It||at.toneMapping!==Wt||at.morphTargetsCount!==At)&&(Lt=!0):(Lt=!0,at.__version=Y.version);let xi=at.currentProgram;Lt===!0&&(xi=z(Y,F,B));let Vs=!1,$n=!1,Qo=!1;const Ht=xi.getUniforms(),li=at.uniforms;if(Se.useProgram(xi.program)&&(Vs=!0,$n=!0,Qo=!0),Y.id!==S&&(S=Y.id,$n=!0),Vs||y!==R){Se.buffers.depth.getReversed()?(ue.copy(R.projectionMatrix),Py(ue),Ly(ue),Ht.setValue(U,"projectionMatrix",ue)):Ht.setValue(U,"projectionMatrix",R.projectionMatrix),Ht.setValue(U,"viewMatrix",R.matrixWorldInverse);const Bn=Ht.map.cameraPosition;Bn!==void 0&&Bn.setValue(U,Ze.setFromMatrixPosition(R.matrixWorld)),q.logarithmicDepthBuffer&&Ht.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ht.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,$n=!0,Qo=!0)}if(B.isSkinnedMesh){Ht.setOptional(U,B,"bindMatrix"),Ht.setOptional(U,B,"bindMatrixInverse");const Tn=B.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),Ht.setValue(U,"boneTexture",Tn.boneTexture,Ve))}B.isBatchedMesh&&(Ht.setOptional(U,B,"batchingTexture"),Ht.setValue(U,"batchingTexture",B._matricesTexture,Ve),Ht.setOptional(U,B,"batchingIdTexture"),Ht.setValue(U,"batchingIdTexture",B._indirectTexture,Ve),Ht.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&Ht.setValue(U,"batchingColorTexture",B._colorsTexture,Ve));const ci=$.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&Me.update(B,$,xi),($n||at.receiveShadow!==B.receiveShadow)&&(at.receiveShadow=B.receiveShadow,Ht.setValue(U,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(li.envMap.value=De,li.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&F.environment!==null&&(li.envMapIntensity.value=F.environmentIntensity),$n&&(Ht.setValue(U,"toneMappingExposure",v.toneMappingExposure),at.needsLights&&ce(li,Qo),pe&&Y.fog===!0&&ee.refreshFogUniforms(li,pe),ee.refreshMaterialUniforms(li,Y,I,j,p.state.transmissionRenderTarget[R.id]),gc.upload(U,Q(at),li,Ve)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(gc.upload(U,Q(at),li,Ve),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ht.setValue(U,"center",B.center),Ht.setValue(U,"modelViewMatrix",B.modelViewMatrix),Ht.setValue(U,"normalMatrix",B.normalMatrix),Ht.setValue(U,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Tn=Y.uniformsGroups;for(let Bn=0,su=Tn.length;Bn<su;Bn++){const is=Tn[Bn];O.update(is,xi),O.bind(is,xi)}}return xi}function ce(R,F){R.ambientLightColor.needsUpdate=F,R.lightProbe.needsUpdate=F,R.directionalLights.needsUpdate=F,R.directionalLightShadows.needsUpdate=F,R.pointLights.needsUpdate=F,R.pointLightShadows.needsUpdate=F,R.spotLights.needsUpdate=F,R.spotLightShadows.needsUpdate=F,R.rectAreaLights.needsUpdate=F,R.hemisphereLights.needsUpdate=F}function it(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,F,$){const Y=Ne.get(R);Y.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Ne.get(R.texture).__webglTexture=F,Ne.get(R.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:$,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,F){const $=Ne.get(R);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0};const Xe=U.createFramebuffer();this.setRenderTarget=function(R,F=0,$=0){L=R,T=F,A=$;let Y=!0,B=null,pe=!1,be=!1;if(R){const De=Ne.get(R);if(De.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(U.FRAMEBUFFER,null),Y=!1;else if(De.__webglFramebuffer===void 0)Ve.setupRenderTarget(R);else if(De.__hasExternalTextures)Ve.rebindTextures(R,Ne.get(R.texture).__webglTexture,Ne.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const $e=R.depthTexture;if(De.__boundDepthTexture!==$e){if($e!==null&&Ne.has($e)&&(R.width!==$e.image.width||R.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(R)}}const je=R.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(be=!0);const rt=Ne.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(rt[F])?B=rt[F][$]:B=rt[F],pe=!0):R.samples>0&&Ve.useMultisampledRTT(R)===!1?B=Ne.get(R).__webglMultisampledFramebuffer:Array.isArray(rt)?B=rt[$]:B=rt,C.copy(R.viewport),w.copy(R.scissor),k=R.scissorTest}else C.copy(_e).multiplyScalar(I).floor(),w.copy(He).multiplyScalar(I).floor(),k=st;if($!==0&&(B=Xe),Se.bindFramebuffer(U.FRAMEBUFFER,B)&&Y&&Se.drawBuffers(R,B),Se.viewport(C),Se.scissor(w),Se.setScissorTest(k),pe){const De=Ne.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,De.__webglTexture,$)}else if(be){const De=Ne.get(R.texture),je=F;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,De.__webglTexture,$,je)}else if(R!==null&&$!==0){const De=Ne.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,De.__webglTexture,$)}S=-1},this.readRenderTargetPixels=function(R,F,$,Y,B,pe,be,Ge=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(De=De[be]),De){Se.bindFramebuffer(U.FRAMEBUFFER,De);try{const je=R.textures[Ge],rt=je.format,$e=je.type;if(!q.textureFormatReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!q.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=R.width-Y&&$>=0&&$<=R.height-B&&(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ge),U.readPixels(F,$,Y,B,me.convert(rt),me.convert($e),pe))}finally{const je=L!==null?Ne.get(L).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(R,F,$,Y,B,pe,be,Ge=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(De=De[be]),De)if(F>=0&&F<=R.width-Y&&$>=0&&$<=R.height-B){Se.bindFramebuffer(U.FRAMEBUFFER,De);const je=R.textures[Ge],rt=je.format,$e=je.type;if(!q.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!q.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ht=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ht),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ge),U.readPixels(F,$,Y,B,me.convert(rt),me.convert($e),0);const It=L!==null?Ne.get(L).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,It);const Wt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ry(U,Wt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ht),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.deleteBuffer(ht),U.deleteSync(Wt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,F=null,$=0){const Y=Math.pow(2,-$),B=Math.floor(R.image.width*Y),pe=Math.floor(R.image.height*Y),be=F!==null?F.x:0,Ge=F!==null?F.y:0;Ve.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,be,Ge,B,pe),Se.unbindTexture()};const ke=U.createFramebuffer(),Be=U.createFramebuffer();this.copyTextureToTexture=function(R,F,$=null,Y=null,B=0,pe=null){pe===null&&(B!==0?(xo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=B,B=0):pe=0);let be,Ge,De,je,rt,$e,ht,It,Wt;const $t=R.isCompressedTexture?R.mipmaps[pe]:R.image;if($!==null)be=$.max.x-$.min.x,Ge=$.max.y-$.min.y,De=$.isBox3?$.max.z-$.min.z:1,je=$.min.x,rt=$.min.y,$e=$.isBox3?$.min.z:0;else{const ci=Math.pow(2,-B);be=Math.floor($t.width*ci),Ge=Math.floor($t.height*ci),R.isDataArrayTexture?De=$t.depth:R.isData3DTexture?De=Math.floor($t.depth*ci):De=1,je=0,rt=0,$e=0}Y!==null?(ht=Y.x,It=Y.y,Wt=Y.z):(ht=0,It=0,Wt=0);const At=me.convert(F.format),at=me.convert(F.type);let pn;F.isData3DTexture?(Ve.setTexture3D(F,0),pn=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ve.setTexture2DArray(F,0),pn=U.TEXTURE_2D_ARRAY):(Ve.setTexture2D(F,0),pn=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Lt=U.getParameter(U.UNPACK_ROW_LENGTH),xi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Vs=U.getParameter(U.UNPACK_SKIP_PIXELS),$n=U.getParameter(U.UNPACK_SKIP_ROWS),Qo=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,$t.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,$t.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,je),U.pixelStorei(U.UNPACK_SKIP_ROWS,rt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,$e);const Ht=R.isDataArrayTexture||R.isData3DTexture,li=F.isDataArrayTexture||F.isData3DTexture;if(R.isDepthTexture){const ci=Ne.get(R),Tn=Ne.get(F),Bn=Ne.get(ci.__renderTarget),su=Ne.get(Tn.__renderTarget);Se.bindFramebuffer(U.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,su.__webglFramebuffer);for(let is=0;is<De;is++)Ht&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ne.get(R).__webglTexture,B,$e+is),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ne.get(F).__webglTexture,pe,Wt+is)),U.blitFramebuffer(je,rt,be,Ge,ht,It,be,Ge,U.DEPTH_BUFFER_BIT,U.NEAREST);Se.bindFramebuffer(U.READ_FRAMEBUFFER,null),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||R.isRenderTargetTexture||Ne.has(R)){const ci=Ne.get(R),Tn=Ne.get(F);Se.bindFramebuffer(U.READ_FRAMEBUFFER,ke),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,Be);for(let Bn=0;Bn<De;Bn++)Ht?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ci.__webglTexture,B,$e+Bn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ci.__webglTexture,B),li?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Tn.__webglTexture,pe,Wt+Bn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Tn.__webglTexture,pe),B!==0?U.blitFramebuffer(je,rt,be,Ge,ht,It,be,Ge,U.COLOR_BUFFER_BIT,U.NEAREST):li?U.copyTexSubImage3D(pn,pe,ht,It,Wt+Bn,je,rt,be,Ge):U.copyTexSubImage2D(pn,pe,ht,It,je,rt,be,Ge);Se.bindFramebuffer(U.READ_FRAMEBUFFER,null),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else li?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(pn,pe,ht,It,Wt,be,Ge,De,At,at,$t.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(pn,pe,ht,It,Wt,be,Ge,De,At,$t.data):U.texSubImage3D(pn,pe,ht,It,Wt,be,Ge,De,At,at,$t):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,ht,It,be,Ge,At,at,$t.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,ht,It,$t.width,$t.height,At,$t.data):U.texSubImage2D(U.TEXTURE_2D,pe,ht,It,be,Ge,At,at,$t);U.pixelStorei(U.UNPACK_ROW_LENGTH,Lt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,xi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Vs),U.pixelStorei(U.UNPACK_SKIP_ROWS,$n),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Qo),pe===0&&F.generateMipmaps&&U.generateMipmap(pn),Se.unbindTexture()},this.copyTextureToTexture3D=function(R,F,$=null,Y=null,B=0){return xo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,F,$,Y,B)},this.initRenderTarget=function(R){Ne.get(R).__webglFramebuffer===void 0&&Ve.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ve.setTextureCube(R,0):R.isData3DTexture?Ve.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ve.setTexture2DArray(R,0):Ve.setTexture2D(R,0),Se.unbindTexture()},this.resetState=function(){T=0,A=0,L=null,Se.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}function CE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function mo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var om=Array.prototype.forEach,la=Array.prototype.slice,le={BREAK:{},extend:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=la.call(arguments);return function(){for(var t=la.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(om&&e.forEach&&e.forEach===om)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():la.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},RE=[{litmus:le.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:mo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:mo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:mo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:mo}}},{litmus:le.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:le.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:le.isObject,conversions:{RGBA_OBJ:{read:function(e){return le.isNumber(e.r)&&le.isNumber(e.g)&&le.isNumber(e.b)&&le.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return le.isNumber(e.r)&&le.isNumber(e.g)&&le.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return le.isNumber(e.h)&&le.isNumber(e.s)&&le.isNumber(e.v)&&le.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return le.isNumber(e.h)&&le.isNumber(e.s)&&le.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ca=void 0,ql=void 0,Jd=function(){ql=!1;var e=arguments.length>1?le.toArray(arguments):arguments[0];return le.each(RE,function(t){if(t.litmus(e))return le.each(t.conversions,function(n,i){if(ca=n.read(e),ql===!1&&ca!==!1)return ql=ca,ca.conversionName=i,ca.conversion=n,le.BREAK}),le.BREAK}),ql},am=void 0,Lc={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(am=t*8)|e&~(255<<am)}},PE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Fi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},ki=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),jr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},es=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},ts=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},fn=function(){function r(){if(Fi(this,r),this.__state=Jd.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return ki(r,[{key:"toString",value:function(){return mo(this)}},{key:"toHexString",value:function(){return mo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function rh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(fn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(fn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function sh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(fn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(fn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}fn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Lc.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")le.extend(r.__state,Lc.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};fn.recalculateHSV=function(r){var e=Lc.rgb_to_hsv(r.r,r.g,r.b);le.extend(r.__state,{s:e.s,v:e.v}),le.isNaN(e.h)?le.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};fn.COMPONENTS=["r","g","b","h","s","v","hex","a"];rh(fn.prototype,"r",2);rh(fn.prototype,"g",1);rh(fn.prototype,"b",0);sh(fn.prototype,"h");sh(fn.prototype,"s");sh(fn.prototype,"v");Object.defineProperty(fn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(fn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Lc.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var zs=function(){function r(e,t){Fi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return ki(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),LE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},f_={};le.each(LE,function(r,e){le.each(r,function(t){f_[t]=e})});var DE=/(\d+(\.\d+)?)px/;function Bi(r){if(r==="0"||le.isUndefined(r))return 0;var e=r.match(DE);return le.isNull(e)?0:parseFloat(e[1])}var K={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;le.isUndefined(s)&&(s=!0),le.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=f_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;le.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}le.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),K},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),K},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return K},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return K},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Bi(t["border-left-width"])+Bi(t["border-right-width"])+Bi(t["padding-left"])+Bi(t["padding-right"])+Bi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Bi(t["border-top-width"])+Bi(t["border-bottom-width"])+Bi(t["padding-top"])+Bi(t["padding-bottom"])+Bi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},h_=function(r){es(e,r);function e(t,n){Fi(this,e);var i=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return K.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return ki(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(zs),IE=function(r){es(e,r);function e(t,n,i){Fi(this,e);var s=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),le.isArray(o)){var l={};le.each(o,function(c){l[c]=c}),o=l}return le.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),K.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return ki(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return K.isActive(this.__select)?this:(this.__select.value=this.getValue(),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(zs),NE=function(r){es(e,r);function e(t,n){Fi(this,e);var i=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),K.bind(i.__input,"keyup",o),K.bind(i.__input,"change",o),K.bind(i.__input,"blur",a),K.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return ki(e,[{key:"updateDisplay",value:function(){return K.isActive(this.__input)||(this.__input.value=this.getValue()),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(zs);function lm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var p_=function(r){es(e,r);function e(t,n,i){Fi(this,e);var s=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,le.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=lm(s.__impliedStep),s}return ki(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=lm(n),this}}]),e}(zs);function OE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Dc=function(r){es(e,r);function e(t,n,i){Fi(this,e);var s=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);le.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){K.unbind(window,"mousemove",d),K.unbind(window,"mouseup",f),c()}function h(_){K.bind(window,"mousemove",d),K.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),K.bind(s.__input,"change",l),K.bind(s.__input,"blur",u),K.bind(s.__input,"mousedown",h),K.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return ki(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():OE(this.getValue(),this.__precision),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(p_);function cm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Qd=function(r){es(e,r);function e(t,n,i,s,o){Fi(this,e);var a=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),K.bind(a.__background,"mousedown",c),K.bind(a.__background,"touchstart",f),K.addClass(a.__background,"slider"),K.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),K.bind(window,"mousemove",u),K.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(cm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){K.unbind(window,"mousemove",u),K.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(K.bind(window,"touchmove",h),K.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(cm(m,p.left,p.right,l.__min,l.__max))}function _(){K.unbind(window,"touchmove",h),K.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return ki(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(p_),m_=function(r){es(e,r);function e(t,n,i){Fi(this,e);var s=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,K.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),K.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return ki(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(zs),ef=function(r){es(e,r);function e(t,n){Fi(this,e);var i=ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new fn(i.getValue()),i.__temp=new fn(0);var s=i;i.domElement=document.createElement("div"),K.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",K.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),K.bind(i.__input,"blur",d),K.bind(i.__selector,"mousedown",function(){K.addClass(this,"drag").bind(window,"mouseup",function(){K.removeClass(s.__selector,"drag")})}),K.bind(i.__selector,"touchstart",function(){K.addClass(this,"drag").bind(window,"touchend",function(){K.removeClass(s.__selector,"drag")})});var o=document.createElement("div");le.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),le.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),le.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),le.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),le.extend(o.style,{width:"100%",height:"100%",background:"none"}),um(o,"top","rgba(0,0,0,0)","#000"),le.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),FE(i.__hue_field),le.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),K.bind(i.__saturation_field,"mousedown",a),K.bind(i.__saturation_field,"touchstart",a),K.bind(i.__field_knob,"mousedown",a),K.bind(i.__field_knob,"touchstart",a),K.bind(i.__hue_field,"mousedown",l),K.bind(i.__hue_field,"touchstart",l);function a(g){h(g),K.bind(window,"mousemove",h),K.bind(window,"touchmove",h),K.bind(window,"mouseup",c),K.bind(window,"touchend",c)}function l(g){_(g),K.bind(window,"mousemove",_),K.bind(window,"touchmove",_),K.bind(window,"mouseup",u),K.bind(window,"touchend",u)}function c(){K.unbind(window,"mousemove",h),K.unbind(window,"touchmove",h),K.unbind(window,"mouseup",c),K.unbind(window,"touchend",c),f()}function u(){K.unbind(window,"mousemove",_),K.unbind(window,"touchmove",_),K.unbind(window,"mouseup",u),K.unbind(window,"touchend",u),f()}function d(){var g=Jd(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientX,b=p.clientY,v=(x-m.left)/(m.right-m.left),M=1-(b-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),v>1?v=1:v<0&&(v=0),s.__color.v=M,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientY,b=1-(x-m.top)/(m.bottom-m.top);return b>1?b=1:b<0&&(b=0),s.__color.h=b*360,s.setValue(s.__color.toOriginal()),!1}return i}return ki(e,[{key:"updateDisplay",value:function(){var n=Jd(this.getValue());if(n!==!1){var i=!1;le.each(fn.COMPONENTS,function(a){if(!le.isUndefined(n[a])&&!le.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&le.extend(this.__color.__state,n)}le.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;le.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,um(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),le.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(zs),UE=["-moz-","-o-","-webkit-","-ms-",""];function um(r,e,t,n){r.style.background="",le.each(UE,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function FE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var kE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},BE=`<div id="dg-save" class="dg dialogue">

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

</div>`,zE=function(e,t){var n=e[t];return le.isArray(arguments[2])||le.isObject(arguments[2])?new IE(e,t,arguments[2]):le.isNumber(n)?le.isNumber(arguments[2])&&le.isNumber(arguments[3])?le.isNumber(arguments[4])?new Qd(e,t,arguments[2],arguments[3],arguments[4]):new Qd(e,t,arguments[2],arguments[3]):le.isNumber(arguments[4])?new Dc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Dc(e,t,{min:arguments[2],max:arguments[3]}):le.isString(n)?new NE(e,t):le.isFunction(n)?new m_(e,t,""):le.isBoolean(n)?new h_(e,t):null};function HE(r){setTimeout(r,1e3/60)}var VE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||HE,GE=function(){function r(){Fi(this,r),this.backgroundElement=document.createElement("div"),le.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),K.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),le.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;K.bind(this.backgroundElement,"click",function(){e.hide()})}return ki(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),le.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",K.unbind(t.domElement,"webkitTransitionEnd",i),K.unbind(t.domElement,"transitionend",i),K.unbind(t.domElement,"oTransitionEnd",i)};K.bind(this.domElement,"webkitTransitionEnd",n),K.bind(this.domElement,"transitionend",n),K.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-K.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-K.getHeight(this.domElement)/2+"px"}}]),r}(),WE=CE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);kE.inject(WE);var dm="dg",fm=72,hm=20,il="Default",xa=function(){try{return!!window.localStorage}catch{return!1}}(),Na=void 0,pm=!0,co=void 0,Hu=!1,g_=[],zt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),K.addClass(this.domElement,dm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=le.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=le.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),le.isUndefined(n.load)?n.load={preset:il}:n.preset&&(n.load.preset=n.preset),le.isUndefined(n.parent)&&n.hideable&&g_.push(this),n.resizable=le.isUndefined(n.parent)&&n.resizable,n.autoPlace&&le.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=xa&&localStorage.getItem(uo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,$E(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,rf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?K.addClass(t.__ul,r.CLASS_CLOSED):K.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){xa&&(i=f,f?K.bind(window,"unload",s):K.unbind(window,"unload",s),localStorage.setItem(uo(t,"isLocal"),f))}}}),le.isUndefined(n.parent)){if(this.closed=n.closed||!1,K.addClass(this.domElement,r.CLASS_MAIN),K.makeSelectable(this.domElement,!1),xa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(uo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,K.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(K.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(K.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),K.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);K.addClass(l,"controller-name"),o=oh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};K.addClass(this.__ul,r.CLASS_CLOSED),K.addClass(o,"title"),K.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(le.isUndefined(n.parent)&&(pm&&(co=document.createElement("div"),K.addClass(co,dm),K.addClass(co,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(co),pm=!1),co.appendChild(this.domElement),K.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||rf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},K.bind(window,"resize",this.__resizeHandler),K.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),K.bind(this.__ul,"transitionend",this.__resizeHandler),K.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&YE(this),s=function(){xa&&localStorage.getItem(uo(t,"isLocal"))==="true"&&localStorage.setItem(uo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,le.defer(function(){d.width-=1})}n.parent||u()};zt.toggleHide=function(){Hu=!Hu,le.each(g_,function(r){r.domElement.style.display=Hu?"none":""})};zt.CLASS_AUTO_PLACE="a";zt.CLASS_AUTO_PLACE_CONTAINER="ac";zt.CLASS_MAIN="main";zt.CLASS_CONTROLLER_ROW="cr";zt.CLASS_TOO_TALL="taller-than-window";zt.CLASS_CLOSED="closed";zt.CLASS_CLOSE_BUTTON="close-button";zt.CLASS_CLOSE_TOP="close-top";zt.CLASS_CLOSE_BOTTOM="close-bottom";zt.CLASS_DRAG="drag";zt.DEFAULT_WIDTH=245;zt.TEXT_CLOSED="Close Controls";zt.TEXT_OPEN="Open Controls";zt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===fm||r.keyCode===fm)&&zt.toggleHide()};K.bind(window,"keydown",zt._keydownHandler,!1);le.extend(zt.prototype,{add:function(e,t){return Oa(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Oa(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;le.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&co.removeChild(this.domElement);var e=this;le.each(this.__folders,function(t){e.removeFolder(t)}),K.unbind(window,"keydown",zt._keydownHandler,!1),mm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new zt(t);this.__folders[e]=n;var i=oh(this,n.domElement);return K.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],mm(e);var t=this;le.each(e.__folders,function(n){e.removeFolder(n)}),le.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=K.getOffset(e.__ul).top,n=0;le.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=K.getHeight(i))}),window.innerHeight-t-hm<n?(K.addClass(e.domElement,zt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-hm+"px"):(K.removeClass(e.domElement,zt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&le.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:le.debounce(function(){this.onResize()},50),remember:function(){if(le.isUndefined(Na)&&(Na=new GE,Na.domElement.innerHTML=BE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;le.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&qE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&rf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Yl(this)),e.folders={},le.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Yl(this),tf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[il]=Yl(this,!0)),this.load.remembered[e]=Yl(this),this.preset=e,nf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){le.each(this.__controllers,function(t){this.getRoot().load.remembered?__(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),le.each(this.__folders,function(t){t.revert(t)}),e||tf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&v_(this.__listening)},updateDisplay:function(){le.each(this.__controllers,function(e){e.updateDisplay()}),le.each(this.__folders,function(e){e.updateDisplay()})}});function oh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function mm(r){K.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&K.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function tf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function XE(r,e,t){if(t.__li=e,t.__gui=r,le.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Oa(r,t.object,t.property,{before:a,factoryArgs:[le.toArray(arguments)]})}if(le.isArray(o)||le.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Oa(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Qd){var n=new Dc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});le.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),K.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Dc){var i=function(o){if(le.isNumber(t.__min)&&le.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Oa(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=le.compose(i,t.min),t.max=le.compose(i,t.max)}else t instanceof h_?(K.bind(e,"click",function(){K.fakeEvent(t.__checkbox,"click")}),K.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof m_?(K.bind(e,"click",function(){K.fakeEvent(t.__button,"click")}),K.bind(e,"mouseover",function(){K.addClass(t.__button,"hover")}),K.bind(e,"mouseout",function(){K.removeClass(t.__button,"hover")})):t instanceof ef&&(K.addClass(e,"color"),t.updateDisplay=le.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=le.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&tf(r.getRoot(),!0),s},t.setValue)}function __(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[il])o=s[il];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Oa(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new ef(e,t);else{var s=[e,t].concat(n.factoryArgs);i=zE.apply(r,s)}n.before instanceof zs&&(n.before=n.before.__li),__(r,i),K.addClass(i.domElement,"c");var o=document.createElement("span");K.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=oh(r,a,n.before);return K.addClass(l,zt.CLASS_CONTROLLER_ROW),i instanceof ef?K.addClass(l,"color"):K.addClass(l,PE(i.getValue())),XE(r,l,i),r.__controllers.push(i),i}function uo(r,e){return document.location.href+"."+e}function nf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function gm(r,e){e.style.display=r.useLocalStorage?"block":"none"}function qE(r){var e=r.__save_row=document.createElement("li");K.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),K.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",K.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",K.addClass(n,"button"),K.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",K.addClass(i,"button"),K.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",K.addClass(s,"button"),K.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?le.each(r.load.remembered,function(d,f){nf(r,f,f===r.preset)}):nf(r,il,!1),K.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),xa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(uo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),gm(r,a),K.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,gm(r,a)})}var u=document.getElementById("dg-new-constructor");K.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Na.hide()}),K.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Na.show(),u.focus(),u.select()}),K.bind(n,"click",function(){r.save()}),K.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),K.bind(s,"click",function(){r.revert()})}function YE(r){var e=void 0;r.__resize_handle=document.createElement("div"),le.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){K.removeClass(r.__closeButton,zt.CLASS_DRAG),K.unbind(window,"mousemove",t),K.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,K.addClass(r.__closeButton,zt.CLASS_DRAG),K.bind(window,"mousemove",t),K.bind(window,"mouseup",n),!1}K.bind(r.__resize_handle,"mousedown",i),K.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function rf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Yl(r,e){var t={};return le.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];le.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function $E(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function v_(r){r.length!==0&&VE.call(window,function(){v_(r)}),le.each(r,function(e){e.updateDisplay()})}var jE=zt;function _m(r,e){if(e===ey)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Yd||e===Bg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Yd)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class KE extends Ko{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new tT(t)}),this.register(function(t){return new nT(t)}),this.register(function(t){return new dT(t)}),this.register(function(t){return new fT(t)}),this.register(function(t){return new hT(t)}),this.register(function(t){return new rT(t)}),this.register(function(t){return new sT(t)}),this.register(function(t){return new oT(t)}),this.register(function(t){return new aT(t)}),this.register(function(t){return new eT(t)}),this.register(function(t){return new lT(t)}),this.register(function(t){return new iT(t)}),this.register(function(t){return new uT(t)}),this.register(function(t){return new cT(t)}),this.register(function(t){return new JE(t)}),this.register(function(t){return new pT(t)}),this.register(function(t){return new mT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ia.extractUrlBase(e);o=Ia.resolveURL(c,this.path)}else o=Ia.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new s_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===y_){try{o[St.KHR_BINARY_GLTF]=new gT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[St.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new RT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case St.KHR_MATERIALS_UNLIT:o[d]=new QE;break;case St.KHR_DRACO_MESH_COMPRESSION:o[d]=new _T(s,this.dracoLoader);break;case St.KHR_TEXTURE_TRANSFORM:o[d]=new vT;break;case St.KHR_MESH_QUANTIZATION:o[d]=new yT;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function ZE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const St={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class JE{constructor(e){this.parser=e,this.name=St.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new et(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],kn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new o_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Lx(u),c.distance=d;break;case"spot":c=new Rx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),lr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class QE{constructor(){this.name=St.KHR_MATERIALS_UNLIT}getMaterialType(){return xs}extendParams(e,t,n){const i=[];e.color=new et(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],kn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,mn))}return Promise.all(i)}}class eT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class tT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new bt(a,a)}return Promise.all(s)}}class nT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class iT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class rT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new et(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],kn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,mn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class sT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class oT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new et().setRGB(a[0],a[1],a[2],kn),Promise.all(s)}}class aT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class lT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new et().setRGB(a[0],a[1],a[2],kn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,mn)),Promise.all(s)}}class cT{constructor(e){this.parser=e,this.name=St.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class uT{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:er}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class dT{constructor(e){this.parser=e,this.name=St.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class fT{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class hT{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class pT{constructor(e){this.name=St.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class mT{constructor(e){this.name=St.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==fi.TRIANGLES&&c.mode!==fi.TRIANGLE_STRIP&&c.mode!==fi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new mt,m=new V,p=new Qr,x=new V(1,1,1),b=new ax(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&x.fromBufferAttribute(l.SCALE,v),b.setMatrixAt(v,g.compose(m,p,x));for(const v in l)if(v==="_COLOR_0"){const M=l[v];b.instanceColor=new jd(M.array,M.itemSize,M.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);Yt.prototype.copy.call(b,_),this.parser.assignFinalMaterial(b),h.push(b)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const y_="glTF",ua=12,vm={JSON:1313821514,BIN:5130562};class gT{constructor(e){this.name=St.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==y_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ua,s=new DataView(e,ua);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===vm.JSON){const c=new Uint8Array(e,ua+o,a);this.content=n.decode(c)}else if(l===vm.BIN){const c=ua+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class _T{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=St.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=sf[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=sf[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=bo[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,kn,f)})})}}class vT{constructor(){this.name=St.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class yT{constructor(){this.name=St.KHR_MESH_QUANTIZATION}}class x_ extends gl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,x=1-m,b=p-f+d;for(let v=0;v!==a;v++){const M=o[g+v+a],T=o[g+v+l]*u,A=o[_+v+a],L=o[_+v]*u;s[v]=x*M+b*T+m*A+p*L}return s}}const xT=new Qr;class ST extends x_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return xT.fromArray(s).normalize().toArray(s),s}}const fi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},bo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ym={9728:Fn,9729:ii,9984:Lg,9985:uc,9986:va,9987:fr},xm={33071:Nr,33648:Tc,10497:No},Vu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},sf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Pr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},bT={CUBICSPLINE:void 0,LINEAR:tl,STEP:el},Gu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Qf({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:xr})),r.DefaultMaterial}function us(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function lr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function MT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function ET(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function TT(r){let e;const t=r.extensions&&r.extensions[St.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wu(t.attributes):e=r.indices+":"+Wu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Wu(r.targets[n]);return e}function Wu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function of(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function AT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const CT=new mt;class RT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ZE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Ax(this.options.manager):this.textureLoader=new Nx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new s_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return us(s,a,i),lr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[St.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ia.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Vu[i.type],a=bo[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Jt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Vu[i.type],c=bo[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let b=t.cache.get(x);b||(g=new c(a,p*h,i.count*h/u),b=new nx(g,h/u),t.cache.add(x,b)),m=new jf(b,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Jt(g,l,_);if(i.sparse!==void 0){const p=Vu.SCALAR,x=bo[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,M=new x(o[1],b,i.sparse.count*p),T=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Jt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,L=M.length;A<L;A++){const S=M[A];if(m.setX(S,T[A*l]),l>=2&&m.setY(S,T[A*l+1]),l>=3&&m.setZ(S,T[A*l+2]),l>=4&&m.setW(S,T[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=ym[f.magFilter]||ii,u.minFilter=ym[f.minFilter]||fr,u.wrapS=xm[f.wrapS]||No,u.wrapT=xm[f.wrapT]||No,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Fn&&u.minFilter!==ii,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new on(g);m.needsUpdate=!0,f(m)}),t.load(Ia.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),lr(d,o),d.userData.mimeType=o.mimeType||AT(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[St.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[St.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[St.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new e_,Yi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Qg,Yi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Qf}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[St.KHR_MATERIALS_UNLIT]){const d=i[St.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new et(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],kn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,mn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=mi);const u=s.alphaMode||Gu.OPAQUE;if(u===Gu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Gu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==xs&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new bt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==xs&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==xs){const d=s.emissiveFactor;a.emissive=new et().setRGB(d[0],d[1],d[2],kn)}return s.emissiveTexture!==void 0&&o!==xs&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,mn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),lr(d,s),t.associations.set(d,{materials:e}),s.extensions&&us(i,d,s),d})}createUniqueName(e){const t=Ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[St.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Sm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=TT(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[St.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=Sm(new Oi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?wT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const x=c[h];if(m.mode===fi.TRIANGLES||m.mode===fi.TRIANGLE_STRIP||m.mode===fi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new rx(g,x):new Un(g,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===fi.TRIANGLE_STRIP?p.geometry=_m(p.geometry,Bg):m.mode===fi.TRIANGLE_FAN&&(p.geometry=_m(p.geometry,Yd));else if(m.mode===fi.LINES)p=new ux(g,x);else if(m.mode===fi.LINE_STRIP)p=new Jf(g,x);else if(m.mode===fi.LINE_LOOP)p=new dx(g,x);else if(m.mode===fi.POINTS)p=new t_(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&ET(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),lr(p,s),m.extensions&&us(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&us(i,d[0],s),d[0];const f=new pr;s.extensions&&us(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Hn(Ay.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Zc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),lr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new mt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Kf(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,x=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let x=0,b=f.length;x<b;x++){const v=f[x],M=h[x],T=_[x],A=g[x],L=m[x];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const S=n._createAnimationTracks(v,M,T,A,L);if(S)for(let y=0;y<S.length;y++)p.push(S[y])}return new xx(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,CT)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new Zg:c.length>1?u=new pr:c.length===1?u=c[0]:u=new Yt,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),lr(u,s),s.extensions&&us(n,u,s),s.matrix!==void 0){const d=new mt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new pr;n.name&&(s.name=i.createUniqueName(n.name)),lr(s,n),n.extensions&&us(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof Yi||f instanceof on)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Pr[s.path]===Pr.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Pr[s.path]){case Pr.weights:c=Fo;break;case Pr.rotation:c=ko;break;case Pr.translation:case Pr.scale:c=Bo;break;default:switch(n.itemSize){case 1:c=Fo;break;case 2:case 3:default:c=Bo;break}break}const u=i.interpolation!==void 0?bT[i.interpolation]:tl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Pr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=of(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ko?ST:x_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function PT(r,e,t){const n=e.attributes,i=new Ni;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new V(l[0],l[1],l[2]),new V(c[0],c[1],c[2])),a.normalized){const u=of(bo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new V,l=new V;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=of(bo[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Qi;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Sm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=sf[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Et.workingColorSpace!==kn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Et.workingColorSpace}" not supported.`),lr(r,e),PT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?MT(r,e.targets,t):r})}function LT(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;const r=document.getElementById("shaderBackground");if(!r)return;window.specialColorsActive=!1,window.colorPhase=1;let e,t;Vh(()=>Promise.resolve().then(()=>dA),void 0).then(P=>{e=P.default,Vh(()=>Promise.resolve().then(()=>PA),void 0).then(z=>{t=z.default,e.registerPlugin(t),n(e)})}).catch(P=>{console.error("Error loading GSAP:",P)});function n(P,z){let Q,se;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(w&&w.color1&&w.color2&&(Q=w.color1.value.clone(),se=w.color2.value.clone()),P.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:Xe=>{w&&w.colorDarkness&&(w.colorDarkness.value=Xe.progress*2,w.colorDarkness.value>=1.95?window.colorPhase===1&&(w.color1&&w.color1.value.set(Q),w.color2&&w.color2.value.set(se),window.specialColorsActive=!0):Q&&se&&window.colorPhase===1&&(w.color1&&w.color1.value.copy(Q),w.color2&&w.color2.value.copy(se),window.specialColorsActive=!1),s())}}}),setTimeout(()=>{i(P)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:Xe=>{const ke=Xe.progress;C&&(ke>.01&&!C.visible?(C.visible=!0,S.visible=!0,l()):ke<=.01&&C.visible&&(C.visible=!1,S.visible=!1,l()),C.visible&&(C.traverse(Be=>{Be.isMesh&&Be.material&&(Be.material.transparent=!0,Be.material.opacity=ke)}),S.opacity=ke,a())),M&&(ke>.01&&!M.visible?(M.visible=!0,T.enabled=!0,c()):ke<=.01&&M.visible&&(M.visible=!1,T.enabled=!1,c()),v&&v.uniforms&&(ke>.01&&M.visible?(v.uniforms.startOpacity.value=T.startOpacity*ke,v.uniforms.endOpacity.value=T.endOpacity*ke):(v.uniforms.startOpacity.value=0,v.uniforms.endOpacity.value=0)))}}}),P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:Xe=>{const ke=Xe.progress,Be=.15;if(!window.particlesFullyHidden&&ke>=Be?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&ke<Be*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){ye&&ye.uniforms&&ye.uniforms.opacity&&(ye.uniforms.opacity.value=0,it());return}const F=1-Math.min(ke/Be,1),B=.5*Math.pow(F,3);ye&&ye.uniforms&&ye.uniforms.opacity&&(ye.uniforms.opacity.value=B,it())}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:Xe=>{const ke=Xe.progress;if(b){const $=-322+120*(1-Math.pow(1-ke,3));if(b.position.y=$,I&&I.__folders["Globe Model Controls"]){const Y=I.__folders["Globe Model Controls"].__folders.Position;if(Y&&Y.__controllers){for(let B of Y.__controllers)if(B.property==="positionY"){B.updateDisplay();break}}}}}}}),P.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:Xe=>{if(!w||!w.color1||!w.color2)return;const ke=Xe.progress;if(ke>.1){console.log("Transitioning to Phase 2 colors - hero travel area",ke);const Be=new et("#32c2d6"),R=new et("#004199"),F=new et("#ff4848"),$=new et("#3f00f5"),Y=Math.min(1,(ke-.1)/.9),B=Y*Y*(3-2*Y),pe=Be.clone().lerp(F,B),be=R.clone().lerp($,B);w.color1.value.copy(pe),w.color2.value.copy(be),window.colorPhase=2,window.specialColorsActive=!0,o()}else console.log("Reverting to Phase 1 colors - hero travel area"),w.color1.value.set("#32c2d6"),w.color2.value.set("#004199"),window.colorPhase=1,window.specialColorsActive=!0,o()}}}),P.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:Xe=>{if(!w||!w.color1||!w.color2)return;const ke=Xe.progress;ke>.1?(console.log("Transitioning to Phase 3 colors - events section entering viewport"),w.color1.value.set("#dcfff6"),w.color2.value.set("#5dff9d"),w.yOffset&&(w.yOffset.value=-.05),w.ambientLight.value=.4,w.directionalLight.value=.4,w.waveSpeed.value=.9,w.waveAmplitude.value=1.2,window.colorPhase=3,window.specialColorsActive=!0,o(),da(),fa()):ke<=.1&&window.colorPhase===3&&(console.log("Reverting to Phase 2 colors - events section exiting viewport"),w.color1.value.set("#ff4848"),w.color2.value.set("#3f00f5"),w.yOffset&&(w.yOffset.value=.306),w.ambientLight.value=.6,w.directionalLight.value=.6,w.waveSpeed.value=2,w.waveAmplitude.value=3,window.colorPhase=2,window.specialColorsActive=!0,o(),da(),fa()),s()}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:Xe=>{const Be=1-Xe.progress,R=Math.pow(Be,3);C&&(C.visible=!0,C.traverse(F=>{F.isMesh&&F.material&&(Array.isArray(F.material)?F.material.forEach($=>{$.transparent=!0,$.opacity=R,$.depthWrite=R>.1,$.blending=Gr,$.needsUpdate=!0}):(F.material.transparent=!0,F.material.opacity=R,F.material.depthWrite=R>.1,F.material.blending=Gr,F.material.needsUpdate=!0))}),R<.01&&(C.visible=!1),S.opacity=R,S.rotationPaused=R<.01,a()),M&&v&&v.uniforms&&(M.visible=R>.01,v.uniforms.startOpacity.value=T.startOpacity*R,v.uniforms.endOpacity.value=T.endOpacity*R,T.enabled=R>.01,c())}}});function it(Xe){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Particle System"]){const ke=I.__folders["Particle System"];if(ke&&ke.__controllers){for(let Be of ke.__controllers)if(Be.property==="value"&&Be.object===ye.uniforms.opacity){Be.updateDisplay();break}}}}console.log("Set up ScrollTrigger animations for shader, globe, overlay, and particles")}function i(P,z,Q,se){if(!document.querySelector("#events")){console.warn("Could not find #events element for shader animation"),console.log("Waiting for DOM to be ready before trying again..."),document.addEventListener("DOMContentLoaded",()=>{i(P)});return}console.log("Events section found, setting up animation"),P.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:ce=>{w&&w.colorDarkness&&(w.colorDarkness.value=2-ce.progress*2,window.colorPhase===3?(console.log("Maintaining Phase 3 colors in events section"),w.color1&&w.color1.value.set("#dcfff6"),w.color2&&w.color2.value.set("#5dff9d"),w.ambientLight&&(w.ambientLight.value=.4),w.directionalLight&&(w.directionalLight.value=.4),w.waveSpeed&&(w.waveSpeed.value=.9),w.waveAmplitude&&(w.waveAmplitude.value=1.2),window.specialColorsActive=!0,o(),da(),fa()):window.colorPhase===2?(console.log("Maintaining Phase 2 colors - reverting from events section"),w.color1&&w.color1.value.set("#ff4848"),w.color2&&w.color2.value.set("#3f00f5"),w.ambientLight&&(w.ambientLight.value=.6),w.directionalLight&&(w.directionalLight.value=.6),w.waveSpeed&&(w.waveSpeed.value=2),w.waveAmplitude&&(w.waveAmplitude.value=3),window.specialColorsActive=!0,o(),da(),fa()):(console.log("Maintaining Phase 1 colors - reverting from events section"),w.color1&&w.color1.value.set("#32c2d6"),w.color2&&w.color2.value.set("#004199"),w.ambientLight&&(w.ambientLight.value=.6),w.directionalLight&&(w.directionalLight.value=.6),w.waveSpeed&&(w.waveSpeed.value=2),w.waveAmplitude&&(w.waveAmplitude.value=3),window.specialColorsActive=!0,o(),da(),fa()),s())}}})}function s(){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Color Controls"]){const P=I.__folders["Color Controls"];if(P&&P.__controllers){for(let z of P.__controllers)if(z.property==="value"&&z.object===w.colorDarkness){z.updateDisplay();break}}}}function o(){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Color Controls"]){const P=I.__folders["Color Controls"];P&&P.__controllers&&P.__controllers.forEach(z=>{if(z.property==="color"&&z.__color){if(z.property==="color"&&z.__li&&z.__li.querySelector(".property-name").textContent==="Color 1"){const se="#"+w.color1.value.getHexString();z.setValue(se)}else if(z.property==="color"&&z.__li&&z.__li.querySelector(".property-name").textContent==="Color 2"){const se="#"+w.color2.value.getHexString();z.setValue(se)}}})}}function a(){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Globe Model Controls"]&&I.__folders["Globe Model Controls"].__folders&&I.__folders["Globe Model Controls"].__folders.Material){const P=I.__folders["Globe Model Controls"].__folders.Material;if(P&&P.__controllers)for(let z of P.__controllers)z.property==="opacity"&&z.updateDisplay()}}function l(){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Globe Model Controls"]){const P=I.__folders["Globe Model Controls"];if(P&&P.__controllers){for(let z of P.__controllers)if(z.property==="visible"){z.updateDisplay();break}}}}function c(){if(typeof I<"u"&&I&&I.__folders&&I.__folders["Gradient Overlay Controls"]){const P=I.__folders["Gradient Overlay Controls"];if(P&&P.__controllers){for(let z of P.__controllers)if(z.property==="enabled"){z.updateDisplay();break}}}}function u(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const d=window.innerWidth,f=u();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const h=new AE({canvas:r,alpha:!0});h.setSize(d,f),h.setPixelRatio(window.devicePixelRatio);const _=new gp,g=new gp;let m=0;const p={zoom:2.471,zPosition:1},x=new Zc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);x.position.z=p.zPosition,x.zoom=p.zoom,x.updateProjectionMatrix();const b=new pr;b.position.y=-322,b.frustumCulled=!0,_.add(b);let v,M;const T={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function A(){v=new Di({transparent:!0,uniforms:{startOpacity:{value:T.startOpacity},endOpacity:{value:T.endOpacity},overlayColor:{value:new et(T.color)},offsetY:{value:T.offsetY},heightMultiplier:{value:T.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:mi});const P=window.innerHeight,z=x.right-x.left,Q=x.top-x.bottom,se=P*.66*(Q/P),Oe=new Ei(z,se);M=new Un(Oe,v),M.rotation.set(0,0,0),M.position.x=0,M.position.y=T.yOffset*Q,M.position.z=-100,M.frustumCulled=!1,M.renderOrder=9999,M.visible=T.enabled,_.add(M),console.log("Created gradient overlay with fixed 66% viewport height")}function L(){if(!M)return;M.rotation.set(0,0,0),M.position.x=0;const P=x.top-x.bottom;M.position.y=T.yOffset*P,M.position.z=-100}A();const S={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},y=new KE;let C;y.load("models/globe-hd.glb",P=>{C=P.scene;let Q=new Ni().setFromObject(C).getCenter(new V),se=new pr;se.add(C),C.position.set(-Q.x,-Q.y,-Q.z),C=se,C.visible=S.visible,C.frustumCulled=!0,C.traverse(it=>{it.isMesh&&(it.frustumCulled=!0)}),b.add(C),C.position.set(S.positionX,S.positionY,S.positionZ),C.rotation.set(S.rotationX*Math.PI/180,S.rotationY*Math.PI/180,S.rotationZ*Math.PI/180),S.responsive?q():(C.scale.set(S.scale,S.scale,S.scale),ot());const Oe=Je.addFolder("Material");let ce=0;C.traverse(it=>{if(it.isMesh&&it.material){const Xe=it.material;if(ce++,Xe.isMeshStandardMaterial||Xe.isMeshPhongMaterial){Xe.metalness!==void 0&&Oe.add({metalness:Xe.metalness},"metalness",0,1).name(`Metalness${ce>1?" "+ce:""}`).onChange(Be=>{Xe.metalness=Be}),Xe.roughness!==void 0&&Oe.add({roughness:Xe.roughness},"roughness",0,1).name(`Roughness${ce>1?" "+ce:""}`).onChange(Be=>{Xe.roughness=Be}),Xe.shininess!==void 0&&Oe.add({shininess:Xe.shininess},"shininess",0,100).name(`Shininess${ce>1?" "+ce:""}`).onChange(Be=>{Xe.shininess=Be}),Oe.add({opacity:Xe.opacity},"opacity",0,1).name(`Opacity${ce>1?" "+ce:""}`).onChange(Be=>{Xe.opacity=Be,Xe.transparent=Be<1});const ke=Xe.emissive?"#"+Xe.emissive.getHexString():"#000000";Oe.addColor({color:ke},"color").name(`Emissive Color${ce>1?" "+ce:""}`).onChange(Be=>{Xe.emissive&&Xe.emissive.set(Be)})}}}),console.log("Globe model loaded successfully")},P=>{console.log(`Globe model ${P.loaded/P.total*100}% loaded`)},P=>{console.error("Error loading globe model:",P)});const w={time:{value:0},resolution:{value:new bt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new et(3326678)},color2:{value:new et(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new bt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new V(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},k=`
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
  `,G=`
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
  `,W=new Ei(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),X=new Di({vertexShader:k,fragmentShader:G,uniforms:w,transparent:!0,side:mi}),j=new Un(W,X);_.add(j);const I=new jE({width:300,closed:!0});I.domElement.style.position="absolute",I.domElement.style.top="10px",I.domElement.style.right="10px";const fe=I.domElement.querySelector(".close-button");fe&&(fe.innerHTML="Open Controls",fe.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=I.closed?"Open Controls":"Close Controls"},50)}));const N=I.addFolder("Camera Controls");N.add(p,"zoom",.1,5).name("Zoom Level").step(.001).onChange(P=>{x.zoom=P,x.updateProjectionMatrix()}),N.close();const _e=I.addFolder("Animation Speed Controls");_e.add(w.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(P=>{w.mainSpeed.value=P}),_e.add(w.waveSpeed,"value",0,5).name("Wave Speed").onChange(P=>{w.waveSpeed.value=P}),_e.add(w.noiseSpeed,"value",0,5).name("Noise Speed").onChange(P=>{w.noiseSpeed.value=P}),_e.add(w.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(P=>{w.colorCycleSpeed.value=P}),_e.open();const He=I.addFolder("Color Controls"),st="#"+w.color1.value.getHexString(),Z="#"+w.color2.value.getHexString();He.addColor({color:st},"color").name("Color 1").onChange(P=>{typeof P=="string"?w.color1.value.set(P):w.color1.value.setRGB(P.r/255,P.g/255,P.b/255)}),He.addColor({color:Z},"color").name("Color 2").onChange(P=>{typeof P=="string"?w.color2.value.set(P):w.color2.value.setRGB(P.r/255,P.g/255,P.b/255)}),He.add(w.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(P=>{w.colorDarkness.value=P}),He.add(w.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(P=>{w.colorWaveInfluence.value=P}),He.add(w.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(P=>{w.colorFrequencyShift.value=P}),He.add(w.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(P=>{w.colorAmplitudeEffect.value=P}),He.open();const oe=I.addFolder("Wave Controls");oe.add(w.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(P=>{w.waveAmplitude.value=P}),oe.add(w.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(P=>{w.waveFrequency.value=P}),oe.add(w.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(P=>{w.waveDepth.value=P}),oe.add(w.noiseScale,"value",0,5).name("Noise Scale").onChange(P=>{w.noiseScale.value=P}),oe.add(w.noiseInfluence,"value",0,1).name("Noise Influence").onChange(P=>{w.noiseInfluence.value=P}),oe.add(w.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(P=>{w.layerOffset.value=P});const Te=oe.addFolder("Flow Direction");Te.add(w.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(P=>{w.flowDirection.value.x=P}),Te.add(w.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(P=>{w.flowDirection.value.y=P});const ue=I.addFolder("Appearance Controls"),we=I.addFolder("Film Noise Controls");we.add(w.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(P=>{w.filmNoiseIntensity.value=P}),we.add(w.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(P=>{w.filmNoiseSpeed.value=P}),we.add(w.filmGrainSize,"value",.5,10).name("Grain Size").onChange(P=>{w.filmGrainSize.value=P}),we.add(w.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(P=>{w.filmScratchIntensity.value=P}),ue.add(w.xOffset,"value",-1,1).step(.001).name("X Position").onChange(P=>{w.xOffset.value=P}),ue.add(w.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(P=>{w.yOffset.value=P}),ue.add(w.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(P=>{w.fadeWidth.value=P}),ue.add(w.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(P=>{w.topEdgeSoftness.value=P}),ue.add(w.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(P=>{w.bottomEdgeSoftness.value=P}),ue.add(w.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(P=>{w.leftEdgeSoftness.value=P}),ue.add(w.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(P=>{w.rightEdgeSoftness.value=P}),ue.add(w.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(P=>{w.leftCornerRoundness.value=P}),ue.add(w.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(P=>{w.rightCornerRoundness.value=P}),ue.add(w.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(P=>{w.edgeDepth.value=P}),ue.add(w.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(P=>{w.edgeContrast.value=P}),ue.add(w.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(P=>{w.edgeNoiseAmount.value=P}),ue.add(w.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(P=>{w.edgeNoiseScale.value=P});const Ze=I.addFolder("Bottom Wave Edge Controls");Ze.add(w.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(P=>{w.bottomWaveEnabled.value=P,C&&S.responsive&&ot()}),Ze.add(w.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(P=>{w.bottomWaveDepth.value=P,C&&S.responsive&&ot()}),Ze.add(w.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(P=>{w.bottomWaveWidth.value=P}),Ze.add(w.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(P=>{w.bottomWaveSpeed.value=P}),Ze.add(w.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(P=>{w.bottomWaveOffset.value=P});const Ae=I.addFolder("Lighting Controls");Ae.add(w.ambientLight,"value",0,1).name("Ambient Light").onChange(P=>{w.ambientLight.value=P}),Ae.add(w.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(P=>{w.directionalLight.value=P}),Ae.add(w.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(P=>{w.specularStrength.value=P}),Ae.add(w.shininess,"value",1,128).name("Shininess").onChange(P=>{w.shininess.value=P});const dt=Ae.addFolder("Light Direction");dt.add(w.lightDirection.value,"x",-1,1).name("X").onChange(()=>{w.lightDirection.value.normalize()}),dt.add(w.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{w.lightDirection.value.normalize()}),dt.add(w.lightDirection.value,"z",0,1).name("Z").onChange(()=>{w.lightDirection.value.normalize()});const Je=I.addFolder("Globe Model Controls"),Ie=new o_(16777215,10);Ie.position.set(1,1,1),_.add(Ie);const U=new Ix(16777215,.5);_.add(U);const Tt=Je.addFolder("Lighting");Tt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(P=>{Ie.intensity=P}),Ie.intensity=3,Tt.add({intensity:U.intensity},"intensity",0,5).name("Ambient Light").onChange(P=>{U.intensity=P}),Je.add(S,"visible").name("Show Globe").onChange(P=>{C&&(C.visible=P)}),Je.add(S,"scale",.1,50).name("Size").step(.1).onChange(P=>{C&&(S.baseScale=P,C.scale.set(P,P,P))}),Je.add(S,"responsive").name("Responsive Size").onChange(P=>{!P&&C?C.scale.set(S.baseScale,S.baseScale,S.baseScale):P&&q()}),Je.add({resizeGlobe:function(){C&&q()}},"resizeGlobe").name("Force Resize"),Je.add({positionBehindWave:function(){C&&ot()}},"positionBehindWave").name("Position Behind Wave");function ot(){if(!C)return;const P=window.innerWidth,z=window.innerHeight;if(P<=640){C.position.y=192,C.position.z=-10;for(let ce=0;ce<Se.__controllers.length;ce++){const it=Se.__controllers[ce];it.property==="positionY"?it.setValue(192):it.property==="positionZ"&&it.setValue(-10)}console.log("Positioned globe for mobile viewport at Y: 192, Z: -10");return}const Q=w.bottomWaveEnabled.value,se=w.bottomWaveDepth.value,Oe=w.edgeDepth.value;if(Q){const ce=z*se*Oe*.5,Xe=(x.top-x.bottom)/x.zoom/z,ke=-ce*Xe-z*.1*Xe,Be=-10;C.position.y=ke,C.position.z=Be;for(let R=0;R<Se.__controllers.length;R++){const F=Se.__controllers[R];F.property==="positionY"?F.setValue(ke):F.property==="positionZ"&&F.setValue(Be)}console.log(`Positioned globe behind bottom wave at Y: ${ke.toFixed(2)}, Z: ${Be}`)}}function q(){if(!C||!S.responsive)return;const P=window.innerWidth,z=P*.9,Q={x:C.scale.x,y:C.scale.y,z:C.scale.z};try{C.scale.set(1,1,1),C.updateMatrixWorld(!0);const se=new Ni().setFromObject(C),Oe=se.max.x-se.min.x;C.scale.set(Q.x,Q.y,Q.z);const it=(x.right-x.left)/x.zoom/P,ke=z*it/Oe;C.scale.set(ke,ke,ke);for(let Be=0;Be<Je.__controllers.length;Be++)if(Je.__controllers[Be].property==="scale"){Je.__controllers[Be].setValue(ke);break}console.log(`Updated globe size: ${z.toFixed(0)}px (90vw), Scale: ${ke.toFixed(2)}, Original width: ${Oe.toFixed(2)}`),ot()}catch(se){console.error("Error updating globe size:",se),C.scale.set(Q.x,Q.y,Q.z)}}const Se=Je.addFolder("Position");Se.add(S,"positionX",-500,500).name("X Position").step(1).onChange(P=>{C&&(C.position.x=P)}),Se.add(S,"positionY",-500,500).name("Y Position").step(1).onChange(P=>{C&&(C.position.y=P)}),Se.add(S,"positionZ",-500,500).name("Z Position").step(1).onChange(P=>{C&&(C.position.z=P)});const ct=Je.addFolder("Rotation");ct.add(S,"rotationX",0,360).name("X Rotation").step(1).onChange(P=>{C&&(C.rotation.x=P*Math.PI/180)}),ct.add(S,"rotationY",0,360).name("Y Rotation").step(1).onChange(P=>{C&&(C.rotation.y=P*Math.PI/180)}),ct.add(S,"rotationZ",0,360).name("Z Rotation").step(1).onChange(P=>{C&&(C.rotation.z=P*Math.PI/180)}),Je.add(S,"autoRotate").name("Auto Rotate").onChange(P=>{S.autoRotate=P}),Je.add(S,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(P=>{S.baseRotateSpeed=P}),Je.add(S,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(P=>{S.scrollRotateSpeed=P}),Je.open();const Ne=I.addFolder("Gradient Overlay Controls");Ne.add(T,"enabled").name("Show Overlay").onChange(P=>{M&&(M.visible=P)});const Ve=Ne.add(T,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(P=>{v&&(v.uniforms.startOpacity.value=P)});Ve.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Ct=Ne.add(T,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(P=>{v&&(v.uniforms.endOpacity.value=P)});Ct.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",Ne.add(T,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(P=>{M&&L()}),Ne.add(T,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(P=>{v&&(v.uniforms.offsetY.value=P)}),Ne.add(T,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(P=>{v&&(v.uniforms.heightMultiplier.value=P)}),Ne.addColor(T,"color").name("Color").onChange(P=>{v&&v.uniforms.overlayColor.value.set(P)}),Ne.add({debugOverlay:function(){if(v){const P=v.uniforms.startOpacity.value,z=v.uniforms.endOpacity.value;v.uniforms.startOpacity.value=1,v.uniforms.endOpacity.value=1,v.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",M.position),console.log("Camera position:",x.position),setTimeout(()=>{v.uniforms.startOpacity.value=P,v.uniforms.endOpacity.value=z,v.uniforms.overlayColor.value.set(T.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),Ne.open();let D=276,E=new Float32Array(D*3),H=new Float32Array(D*3),J=new Float32Array(D*3),te=0,ee=0;const ne={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let ge=window.innerHeight*ne.verticalSpread;function Pe(){const P=new Float32Array(D);for(let z=0;z<D;z++){const Q=z*3,se=Math.random(),Oe=ne.sizeMin+se*(ne.sizeMax-ne.sizeMin);P[z]=Oe/ye.uniforms.baseSize.value;const ce=new et(O.color),it=.8+se*.6;J[Q]=ce.r*it,J[Q+1]=ce.g*it,J[Q+2]=ce.b*it}he.setAttribute("size",new Jt(P,1)),he.attributes.position.needsUpdate=!0,he.attributes.color.needsUpdate=!0,he.attributes.size.needsUpdate=!0}for(let P=0;P<D;P++){const z=P*3;E[z]=(Math.random()-.5)*window.innerWidth,E[z+1]=(Math.random()-.5)*ge+ne.verticalOffset,E[z+2]=Math.random()*500-250,H[z]=(Math.random()-.5)*.5,H[z+1]=(Math.random()-.5)*.5,H[z+2]=(Math.random()-.5)*.2;const Q=new et("#25e5ff");J[z]=Q.r,J[z+1]=Q.g,J[z+2]=Q.b}const he=new Oi;he.setAttribute("position",new Jt(E,3)),he.setAttribute("color",new Jt(J,3));const de=Me();function Me(){const P=document.createElement("canvas");P.width=256,P.height=256;const z=P.getContext("2d"),Q=z.createRadialGradient(P.width/2,P.height/2,0,P.width/2,P.height/2,P.width/2);Q.addColorStop(0,"rgba(255, 255, 255, 1.0)"),Q.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),Q.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),Q.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),Q.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),Q.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),Q.addColorStop(1,"rgba(255, 255, 255, 0)"),z.fillStyle=Q,z.fillRect(0,0,P.width,P.height),z.beginPath(),z.moveTo(P.width/2,P.width*.3),z.lineTo(P.width/2,P.width*.7),z.moveTo(P.width*.3,P.height/2),z.lineTo(P.width*.7,P.height/2),z.moveTo(P.width*.35,P.height*.35),z.lineTo(P.width*.65,P.height*.65),z.moveTo(P.width*.65,P.height*.35),z.lineTo(P.width*.35,P.height*.65),z.strokeStyle="rgba(255, 255, 255, 1.0)",z.lineWidth=4,z.stroke();const se=z.createRadialGradient(P.width/2,P.height/2,P.width*.2,P.width/2,P.height/2,P.width*.7);se.addColorStop(0,"rgba(255, 255, 255, 0.3)"),se.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),se.addColorStop(1,"rgba(255, 255, 255, 0)"),z.globalCompositeOperation="lighter",z.fillStyle=se,z.fillRect(0,0,P.width,P.height);const Oe=new on(P);return Oe.needsUpdate=!0,Oe}const ye=new Di({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:de},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:cd,depthWrite:!1,depthTest:!1}),qe=new t_(he,ye);qe.frustumCulled=!0,g.add(qe);const me=I.addFolder("Particle System"),tt={count:D};me.add(tt,"count",100,1e3,10).name("Particle Count").onChange(P=>{D=Math.floor(P);const z=new Float32Array(D*3),Q=new Float32Array(D*3),se=new Float32Array(D*3);for(let Oe=0;Oe<D;Oe++){const ce=Oe*3;if(Oe<E.length/3)z[ce]=E[ce],z[ce+1]=E[ce+1],z[ce+2]=E[ce+2],Q[ce]=H[ce],Q[ce+1]=H[ce+1],Q[ce+2]=H[ce+2],se[ce]=J[ce],se[ce+1]=J[ce+1],se[ce+2]=J[ce+2];else{z[ce]=(Math.random()-.5)*window.innerWidth,z[ce+1]=(Math.random()-.5)*ge+ne.verticalOffset,z[ce+2]=Math.random()*500-250,Q[ce]=(Math.random()-.5)*.5,Q[ce+1]=(Math.random()-.5)*.5,Q[ce+2]=(Math.random()-.5)*.2;const it=new et(O.color);se[ce]=it.r,se[ce+1]=it.g,se[ce+2]=it.b}}E=z,H=Q,J=se,he.setAttribute("position",new Jt(E,3)),he.setAttribute("color",new Jt(J,3)),he.attributes.position.needsUpdate=!0,he.attributes.color.needsUpdate=!0,Pe()});const O={color:"#25e5ff"};me.addColor(O,"color").name("Particle Color").onChange(P=>{const z=new et(P);for(let Q=0;Q<D;Q++){const se=Q*3;J[se]=z.r,J[se+1]=z.g,J[se+2]=z.b}he.setAttribute("color",new Jt(J,3)),he.attributes.color.needsUpdate=!0}),me.add(ye.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(P=>{Pe()}),me.add(ye.uniforms.opacity,"value",0,1,.1).name("Opacity"),me.add(ye.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(P=>{ye.uniforms.brightness.value=P});const xe={intensity:1.5};me.add(xe,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(P=>{ye.uniforms.opacity.value=P});const ae={enabled:!1},Ee=me.add(ae,"enabled").name("Size Attenuation").onChange(P=>{P?ye.vertexShader=`
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
        `,ye.needsUpdate=!0,Pe()}),re=document.createElement("div");re.className="gui-tooltip",re.textContent="When enabled, particles appear smaller as they move further away",re.style.position="absolute",re.style.backgroundColor="rgba(0,0,0,0.8)",re.style.color="#fff",re.style.padding="5px",re.style.borderRadius="3px",re.style.fontSize="11px",re.style.zIndex="10000",re.style.display="none",document.body.appendChild(re);const ie=Ee.domElement;ie.addEventListener("mouseenter",P=>{const z=ie.getBoundingClientRect();re.style.left=z.right+"px",re.style.top=z.top+"px",re.style.display="block"}),ie.addEventListener("mouseleave",()=>{re.style.display="none"});let Le=0;window.addEventListener("scroll",()=>{te=window.scrollY});function Qe(){const P=he.attributes.position.array,z=ne.previousOffset||0,Q=ne.verticalOffset-z;ne.previousOffset=ne.verticalOffset;for(let se=0;se<D;se++){const Oe=se*3;P[Oe+1]+=Q;const ce=P[Oe+1]-ne.verticalOffset,it=ge/2;ce>it?P[Oe+1]=-it+ne.verticalOffset:ce<-it&&(P[Oe+1]=it+ne.verticalOffset)}he.attributes.position.needsUpdate=!0}function Mt(){const P=he.attributes.position.array,z=he.attributes.color.array,Q=he.attributes.size?he.attributes.size.array:null;Le+=.01;const se=(te-ee)*ne.scrollSpeed;if(ee=te*(1-ne.damping)+ee*ne.damping,!window.particlesMovementPaused){for(let Oe=0;Oe<D;Oe++){const ce=Oe*3,it=Q?(Q[Oe]-ne.sizeMin)/(ne.sizeMax-ne.sizeMin):.5,Xe=ne.floatSpeed*(.5+it*.5);P[ce]+=H[ce]*Xe,P[ce+1]+=H[ce+1]*Xe,P[ce+2]+=H[ce+2]*Xe,P[ce+1]+=se*(.5+it*.5),Math.abs(P[ce])>window.innerWidth/2&&(H[ce]*=-1);const ke=P[ce+1]-ne.verticalOffset,Be=ge/2;ke>Be?P[ce+1]=-Be+ne.verticalOffset:ke<-Be&&(P[ce+1]=Be+ne.verticalOffset),Math.abs(P[ce+2])>250&&(H[ce+2]*=-1)}he.attributes.position.needsUpdate=!0}for(let Oe=0;Oe<D;Oe++){const ce=Oe*3,it=Q?(Q[Oe]-ne.sizeMin)/(ne.sizeMax-ne.sizeMin):.5,Xe=new et(O.color),ke=.2*Math.sin(Le+Oe*.1)+.9,Be=.8+it*.6;z[ce]=Xe.r*ke*Be,z[ce+1]=Xe.g*ke*Be,z[ce+2]=Xe.b*ke*Be}he.attributes.color.needsUpdate=!0,requestAnimationFrame(Mt)}Mt();function Ce(){if(requestAnimationFrame(Ce),w.time.value+=.001,!window.particlesFullyHidden&&ye.uniforms.opacity.value<m&&(ye.uniforms.opacity.value+=.002,ye.uniforms.opacity.value>m&&(ye.uniforms.opacity.value=m)),window.particlesFullyHidden&&ye.uniforms.opacity.value>0&&(ye.uniforms.opacity.value=0),C&&S.autoRotate&&!S.rotationPaused){const P=ft?S.scrollRotateSpeed:S.baseRotateSpeed;C.rotation.y+=P*.01}M&&(M.rotation.set(0,0,0),L()),h.autoClear=!0,h.render(_,x),window.particlesFullyHidden||(h.autoClear=!1,h.render(g,x))}Ce(),document.addEventListener("veryEarlyParticleFade",()=>{m=.1}),document.addEventListener("particleFadeStart",()=>{m=.3}),document.addEventListener("heroAnimationComplete",()=>{m=.5});function Fe(){if(M){const P=window.innerHeight,z=x.right-x.left,se=(x.top-x.bottom)/P,Oe=z,ce=P*.66*se;M.geometry.dispose(),M.geometry=new Ei(Oe,ce),M.rotation.set(0,0,0),L(),console.log("Updated overlay size to 66% viewport height")}}let ut,ve;function nt(){const P=window.innerWidth,z=u();if(h.setSize(P,z),x.left=-P/2,x.right=P/2,x.top=z/2,x.bottom=-z/2,x.updateProjectionMatrix(),w.resolution.value.set(P,z),j.geometry.dispose(),j.geometry=new Ei(P,z,P/10,z/10),ge=z*ne.verticalSpread,typeof I<"u"&&I&&I.__folders["Particle System"]){const Q=I.__folders["Particle System"];if(Q&&Q.__controllers){for(let se=0;se<Q.__controllers.length;se++)if(Q.__controllers[se].property==="verticalOffset"){Q.__controllers[se].min(-z*3),Q.__controllers[se].max(z*2);break}}}if(C&&S.responsive){clearTimeout(ve),ve=setTimeout(()=>{q()},150);for(let Q=0;Q<Se.__controllers.length;Q++){const se=Se.__controllers[Q];se.property==="positionX"?(se.min(-P/2),se.max(P/2)):se.property==="positionY"&&(se.min(-z/2),se.max(z/2))}}Fe()}window.addEventListener("resize",()=>{clearTimeout(ut),clearTimeout(ve),C&&S.responsive&&(ve=setTimeout(()=>{q()},150)),ut=setTimeout(nt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(ut),clearTimeout(ve),C&&S.responsive&&(ve=setTimeout(()=>{q()},300)),ut=setTimeout(nt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(ve);const P=window.innerWidth,z=u();window.lastKnownDimensions||(window.lastKnownDimensions={width:P,height:z});const Q=Math.abs(P-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,se=Math.abs(z-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;Q>.05||se>.05?(window.lastKnownDimensions.width=P,window.lastKnownDimensions.height=z,C&&S.responsive&&(ve=setTimeout(()=>{q()},150)),setTimeout(nt,100),console.log(`Tab refocused with significant viewport change: Width ${Q.toFixed(2)}%, Height ${se.toFixed(2)}%`)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:u()}});let We=u();function lt(){const P=u();Math.abs(P-We)>50&&(nt(),We=P),requestAnimationFrame(lt)}lt(),window.addEventListener("keydown",P=>{if((P.key==="+"||P.key==="=")&&(p.zoom=Math.min(p.zoom+.1,5),x.zoom=p.zoom,x.updateProjectionMatrix(),typeof I<"u"&&I&&I.__folders["Camera Controls"])){const z=I.__folders["Camera Controls"];if(z&&z.__controllers){for(let Q=0;Q<z.__controllers.length;Q++)if(z.__controllers[Q].property==="zoom"){z.__controllers[Q].updateDisplay();break}}}if((P.key==="-"||P.key==="_")&&(p.zoom=Math.max(p.zoom-.1,.1),x.zoom=p.zoom,x.updateProjectionMatrix(),typeof I<"u"&&I&&I.__folders["Camera Controls"])){const z=I.__folders["Camera Controls"];if(z&&z.__controllers){for(let Q=0;Q<z.__controllers.length;Q++)if(z.__controllers[Q].property==="zoom"){z.__controllers[Q].updateDisplay();break}}}}),me.add(ne,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(P=>{ne.scrollSpeed=P}),me.add(ne,"damping",.8,.99,.01).name("Scroll Damping").onChange(P=>{ne.damping=P}),me.add(ne,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(P=>{const z=ge;ge=window.innerHeight*P;const Q=ge/z,se=he.attributes.position.array;for(let Oe=0;Oe<D;Oe++){const ce=Oe*3,Xe=(se[ce+1]-ne.verticalOffset)*Q;se[ce+1]=Xe+ne.verticalOffset,Math.abs(Xe)>ge/2&&(se[ce+1]=(Math.random()-.5)*ge+ne.verticalOffset)}he.attributes.position.needsUpdate=!0}),me.add(ne,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(P=>{ne.previousOffset===void 0&&(ne.previousOffset=0),ne.verticalOffset=P,Qe()}),me.add(ne,"sizeMin",1,5,.01).name("Min Particle Size").onChange(P=>{if(ne.sizeMin=P,ne.sizeMin>=ne.sizeMax&&(ne.sizeMax=ne.sizeMin+1,typeof I<"u"&&I&&I.__folders["Particle System"])){const z=I.__folders["Particle System"];if(z&&z.__controllers){for(let Q=0;Q<z.__controllers.length;Q++)if(z.__controllers[Q].property==="sizeMax"){z.__controllers[Q].updateDisplay();break}}}Pe()}),me.add(ne,"sizeMax",5,10,.01).name("Max Particle Size").onChange(P=>{if(ne.sizeMax=P,ne.sizeMax<=ne.sizeMin&&(ne.sizeMin=ne.sizeMax-1,typeof I<"u"&&I&&I.__folders["Particle System"])){const z=I.__folders["Particle System"];if(z&&z.__controllers){for(let Q=0;Q<z.__controllers.length;Q++)if(z.__controllers[Q].property==="sizeMin"){z.__controllers[Q].updateDisplay();break}}}Pe()}),me.add(ne,"floatSpeed",.1,3,.1).name("Float Speed").onChange(P=>{ne.floatSpeed=P}),Pe();const Gt=he.attributes.position.array;for(let P=0;P<D;P++){const z=P*3;Gt[z+1]=(Math.random()-.5)*ge+ne.verticalOffset}he.attributes.position.needsUpdate=!0,me.add(ye.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(P=>{ye.uniforms.haloStrength.value=P}),me.add(ye.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(P=>{ye.uniforms.haloSize.value=P});let ft=!1,Pt;window.addEventListener("scroll",()=>{ft=!0,Pt&&clearTimeout(Pt),Pt=setTimeout(()=>{ft=!1},150)})}function da(){if(typeof gui>"u"||!gui||!gui.__folders||!gui.__folders["Lighting Controls"])return;const r=gui.__folders["Lighting Controls"];for(let e=0;e<r.__controllers.length;e++){const t=r.__controllers[e];t.property==="value"&&t.object===uniforms.ambientLight&&t.setValue(uniforms.ambientLight.value),t.property==="value"&&t.object===uniforms.directionalLight&&t.setValue(uniforms.directionalLight.value)}}function fa(){if(!(typeof gui>"u"||!gui||!gui.__folders)){if(console.log("Updating wave GUI - waveSpeed:",uniforms.waveSpeed.value,"waveAmplitude:",uniforms.waveAmplitude.value),gui.__folders["Speed Controls"]){const r=gui.__folders["Speed Controls"];for(let e=0;e<r.__controllers.length;e++){const t=r.__controllers[e];if(t.property==="value"&&t.object===uniforms.waveSpeed){console.log("Updating waveSpeed GUI from",t.getValue(),"to",uniforms.waveSpeed.value),t.setValue(uniforms.waveSpeed.value);break}}}if(gui.__folders["Wave Controls"]){const r=gui.__folders["Wave Controls"];for(let e=0;e<r.__controllers.length;e++){const t=r.__controllers[e];t.property==="value"&&t.object===uniforms.waveAmplitude&&(console.log("Updating waveAmplitude GUI from",t.getValue(),"to",uniforms.waveAmplitude.value),t.setValue(uniforms.waveAmplitude.value))}}}}function cr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function S_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},zo={duration:.5,overwrite:!1,delay:0},ah,vn,Vt,_i=1e8,kt=1/_i,af=Math.PI*2,DT=af/4,IT=0,b_=Math.sqrt,NT=Math.cos,OT=Math.sin,hn=function(e){return typeof e=="string"},jt=function(e){return typeof e=="function"},Sr=function(e){return typeof e=="number"},lh=function(e){return typeof e>"u"},Ji=function(e){return typeof e=="object"},Gn=function(e){return e!==!1},ch=function(){return typeof window<"u"},$l=function(e){return jt(e)||hn(e)},w_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},En=Array.isArray,lf=/(?:-?\.?\d|\.)+/gi,M_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,go=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Xu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,E_=/[+-]=-?[.\d]+/,T_=/[^,'"\[\]\s]+/gi,UT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Xt,zi,cf,uh,oi={},Ic={},A_,C_=function(e){return(Ic=Ho(e,oi))&&Yn},dh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},rl=function(e,t){return!t&&console.warn(e)},R_=function(e,t){return e&&(oi[e]=t)&&Ic&&(Ic[e]=t)||oi},sl=function(){return 0},FT={suppressEvents:!0,isStart:!0,kill:!1},_c={suppressEvents:!0,kill:!1},kT={suppressEvents:!0},fh={},Xr=[],uf={},P_,Qn={},qu={},bm=30,vc=[],hh="",ph=function(e){var t=e[0],n,i;if(Ji(t)||jt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=vc.length;i--&&!vc[i].targetTest(t););n=vc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new e0(e[i],n)))||e.splice(i,1);return e},Ts=function(e){return e._gsap||ph(vi(e))[0]._gsap},L_=function(e,t,n){return(n=e[t])&&jt(n)?e[t]():lh(n)&&e.getAttribute&&e.getAttribute(t)||n},Wn=function(e,t){return(e=e.split(",")).forEach(t)||e},Kt=function(e){return Math.round(e*1e5)/1e5||0},nn=function(e){return Math.round(e*1e7)/1e7||0},wo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},BT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Nc=function(){var e=Xr.length,t=Xr.slice(0),n,i;for(uf={},Xr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},D_=function(e,t,n,i){Xr.length&&!vn&&Nc(),e.render(t,n,vn&&t<0&&(e._initted||e._startAt)),Xr.length&&!vn&&Nc()},I_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(T_).length<2?t:hn(e)?e.trim():e},N_=function(e){return e},ai=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},zT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Ho=function(e,t){for(var n in t)e[n]=t[n];return e},wm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Ji(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Oc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ua=function(e){var t=e.parent||Xt,n=e.keyframes?zT(En(e.keyframes)):ai;if(Gn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},HT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},O_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Qc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Kr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},As=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},VT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},df=function(e,t,n,i){return e._startAt&&(vn?e._startAt.revert(_c):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},GT=function r(e){return!e||e._ts&&r(e.parent)},Mm=function(e){return e._repeat?Vo(e._tTime,e=e.duration()+e._rDelay)*e:0},Vo=function(e,t){var n=Math.floor(e=nn(e/t));return e&&n===e?n-1:n},Uc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},eu=function(e){return e._end=nn(e._start+(e._tDur/Math.abs(e._ts||e._rts||kt)||0))},tu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=nn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),eu(e),n._dirty||As(n,e)),e},U_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Uc(e.rawTime(),t),(!t._dur||_l(0,t.totalDuration(),n)-t._tTime>kt)&&t.render(n,!0)),As(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-kt}},Gi=function(e,t,n,i){return t.parent&&Kr(t),t._start=nn((Sr(n)?n:n||e!==Xt?di(e,n,t):e._time)+t._delay),t._end=nn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),O_(e,t,"_first","_last",e._sort?"_start":0),ff(t)||(e._recent=t),i||U_(e,t),e._ts<0&&tu(e,e._tTime),e},F_=function(e,t){return(oi.ScrollTrigger||dh("scrollTrigger",t))&&oi.ScrollTrigger.create(t,e)},k_=function(e,t,n,i,s){if(gh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!vn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&P_!==ti.frame)return Xr.push(e),e._lazy=[s,i],1},WT=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},ff=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},XT=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&WT(e)&&!(!e._initted&&ff(e))||(e._ts<0||e._dp._ts<0)&&!ff(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=_l(0,e._tDur,t),u=Vo(l,a),e._yoyo&&u&1&&(o=1-o),u!==Vo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||vn||i||e._zTime===kt||!t&&e._zTime){if(!e._initted&&k_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?kt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&df(e,t,n,!0),e._onUpdate&&!n&&ri(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ri(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Kr(e,1),!n&&!vn&&(ri(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},qT=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Go=function(e,t,n,i){var s=e._repeat,o=nn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:nn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&tu(e,e._tTime=e._tDur*a),e.parent&&eu(e),n||As(e.parent,e),e},Em=function(e){return e instanceof gn?As(e):Go(e,e._dur)},YT={_start:0,endTime:sl,totalDuration:sl},di=function r(e,t,n){var i=e.labels,s=e._recent||YT,o=e.duration()>=_i?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(En(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Fa=function(e,t,n){var i=Sr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Gn(l.vars.inherit)&&l.parent;o.immediateRender=Gn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Zt(t[0],o,t[s+1])},ns=function(e,t){return e||e===0?t(e):t},_l=function(e,t,n){return n<e?e:n>t?t:n},wn=function(e,t){return!hn(e)||!(t=UT.exec(e))?"":t[1]},$T=function(e,t,n){return ns(n,function(i){return _l(e,t,i)})},hf=[].slice,B_=function(e,t){return e&&Ji(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ji(e[0]))&&!e.nodeType&&e!==zi},jT=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return hn(i)&&!t||B_(i,1)?(s=n).push.apply(s,vi(i)):n.push(i)})||n},vi=function(e,t,n){return Vt&&!t&&Vt.selector?Vt.selector(e):hn(e)&&!n&&(cf||!Wo())?hf.call((t||uh).querySelectorAll(e),0):En(e)?jT(e,n):B_(e)?hf.call(e,0):e?[e]:[]},pf=function(e){return e=vi(e)[0]||rl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return vi(t,n.querySelectorAll?n:n===e?rl("Invalid scope")||uh.createElement("div"):e)}},z_=function(e){return e.sort(function(){return .5-Math.random()})},H_=function(e){if(jt(e))return e;var t=Ji(e)?e:{each:e},n=Cs(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return hn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,x,b,v,M,T,A,L,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,_i])[1],!S){for(A=-_i;A<(A=_[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(m=o[g]=[],p=l?Math.min(S,g)*u-.5:i%S,x=S===_i?0:l?g*d/S-.5:i/S|0,A=0,L=_i,T=0;T<g;T++)b=T%S-p,v=x-(T/S|0),m[T]=M=c?Math.abs(c==="y"?v:b):b_(b*b+v*v),M>A&&(A=M),M<L&&(L=M);i==="random"&&z_(m),m.max=A-L,m.min=L,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:c?c==="y"?g/S:S:Math.max(S,g/S))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=wn(t.amount||t.each)||0,n=n&&g<0?Z_(n):n}return g=(m[f]-m.min)/m.max||0,nn(m.b+(n?n(g):g)*m.v)+m.u}},mf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=nn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Sr(n)?0:wn(n))}},V_=function(e,t){var n=En(e),i,s;return!n&&Ji(e)&&(i=n=e.radius||_i,e.values?(e=vi(e.values),(s=!Sr(e[0]))&&(i*=i)):e=mf(e.increment)),ns(t,n?jt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=_i,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Sr(o)?u:u+wn(o)}:mf(e))},G_=function(e,t,n,i){return ns(En(e)?!t:n===!0?!!(n=0):!i,function(){return En(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},KT=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},ZT=function(e,t){return function(n){return e(parseFloat(n))+(t||wn(n))}},JT=function(e,t,n){return X_(e,t,0,1,n)},W_=function(e,t,n){return ns(n,function(i){return e[~~t(i)]})},QT=function r(e,t,n){var i=t-e;return En(e)?W_(e,r(0,e.length),t):ns(n,function(s){return(i+(s-e)%i)%i+e})},e1=function r(e,t,n){var i=t-e,s=i*2;return En(e)?W_(e,r(0,e.length-1),t):ns(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},ol=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?T_:lf),n+=e.substr(t,i-t)+G_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},X_=function(e,t,n,i,s){var o=t-e,a=i-n;return ns(s,function(l){return n+((l-e)/o*a||0)})},t1=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=hn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(En(e)&&!En(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Ho(En(e)?[]:{},e));if(!u){for(l in t)mh.call(a,e,l,"get",t[l]);s=function(_){return yh(_,a)||(o?e.p:e)}}}return ns(n,s)},Tm=function(e,t,n){var i=e.labels,s=_i,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ri=function(e,t,n){var i=e.vars,s=i[t],o=Vt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Xr.length&&Nc(),a&&(Vt=a),u=l?s.apply(c,l):s.call(c),Vt=o,u},Sa=function(e){return Kr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!vn),e.progress()<1&&ri(e,"onInterrupt"),e},_o,q_=[],Y_=function(e){if(e)if(e=!e.name&&e.default||e,ch()||e.headless){var t=e.name,n=jt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:sl,render:yh,add:mh,kill:_1,modifier:g1,rawVars:0},o={targetTest:0,get:0,getSetter:vh,aliases:{},register:0};if(Wo(),e!==i){if(Qn[t])return;ai(i,ai(Oc(e,s),o)),Ho(i.prototype,Ho(s,Oc(e,o))),Qn[i.prop=t]=i,e.targetTest&&(vc.push(i),fh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}R_(t,i),e.register&&e.register(Yn,i,Xn)}else q_.push(e)},Ft=255,ba={aqua:[0,Ft,Ft],lime:[0,Ft,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ft],navy:[0,0,128],white:[Ft,Ft,Ft],olive:[128,128,0],yellow:[Ft,Ft,0],orange:[Ft,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ft,0,0],pink:[Ft,192,203],cyan:[0,Ft,Ft],transparent:[Ft,Ft,Ft,0]},Yu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ft+.5|0},$_=function(e,t,n){var i=e?Sr(e)?[e>>16,e>>8&Ft,e&Ft]:0:ba.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ba[e])i=ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Ft,i&Ft,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Ft,e&Ft]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(lf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Yu(l+1/3,s,o),i[1]=Yu(l,s,o),i[2]=Yu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(M_),n&&i.length<4&&(i[3]=1),i}else i=e.match(lf)||ba.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Ft,o=i[1]/Ft,a=i[2]/Ft,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},j_=function(e){var t=[],n=[],i=-1;return e.split(qr).forEach(function(s){var o=s.match(go)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Am=function(e,t,n){var i="",s=(e+i).match(qr),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=$_(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=j_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(qr,"1").split(go),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(qr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},qr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ba)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),n1=/hsl[a]?\(/,K_=function(e){var t=e.join(" "),n;if(qr.lastIndex=0,qr.test(t))return n=n1.test(t),e[1]=Am(e[1],n),e[0]=Am(e[0],n,j_(e[1])),!0},al,ti=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,x=m===!0,b,v,M,T;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,b=M-o,(b>0||x)&&(T=++d.frame,f=M-d.time*1e3,d.time=M=M/1e3,o+=b+(b>=s?4:s-b),v=1),x||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](M,f,T,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){A_&&(!cf&&ch()&&(zi=cf=window,uh=zi.document||{},oi.gsap=Yn,(zi.gsapVersions||(zi.gsapVersions=[])).push(Yn.version),C_(Ic||zi.GreenSockGlobals||!zi.gsap&&zi||{}),q_.forEach(Y_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},al=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),al=0,c=sl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,x){var b=p?function(v,M,T,A){m(v,M,T,A),d.remove(b)}:m;return d.remove(m),a[x?"unshift":"push"](b),Wo(),b},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),Wo=function(){return!al&&ti.wake()},wt={},i1=/^[\d.\-M][\d.\-,\s]/,r1=/["']/g,s1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(r1,"").trim():+c,i=l.substr(a+1).trim();return t},o1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},a1=function(e){var t=(e+"").split("("),n=wt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[s1(t[1])]:o1(e).split(",").map(I_)):wt._CE&&i1.test(e)?wt._CE("",e):n},Z_=function(e){return function(t){return 1-e(1-t)}},J_=function r(e,t){for(var n=e._first,i;n;)n instanceof gn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Cs=function(e,t){return e&&(jt(e)?e:wt[e]||a1(e))||t},Hs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Wn(e,function(a){wt[a]=oi[a]=s,wt[o=a.toLowerCase()]=n;for(var l in s)wt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=wt[a+"."+l]=s[l]}),s},Q_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},$u=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/af*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*OT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Q_(a);return s=af/s,l.config=function(c,u){return r(e,c,u)},l},ju=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Q_(n);return i.config=function(s){return r(e,s)},i};Wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Hs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});wt.Linear.easeNone=wt.none=wt.Linear.easeIn;Hs("Elastic",$u("in"),$u("out"),$u());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Hs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Hs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Hs("Circ",function(r){return-(b_(1-r*r)-1)});Hs("Sine",function(r){return r===1?1:-NT(r*DT)+1});Hs("Back",ju("in"),ju("out"),ju());wt.SteppedEase=wt.steps=oi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-kt;return function(a){return((i*_l(0,o,a)|0)+s)*n}}};zo.ease=wt["quad.out"];Wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return hh+=r+","+r+"Params,"});var e0=function(e,t){this.id=IT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:L_,this.set=t?t.getSetter:vh},ll=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Go(this,+t.duration,1,1),this.data=t.data,Vt&&(this._ctx=Vt,Vt.data.push(this)),al||ti.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Go(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Wo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(tu(this,n),!s._dp||s.parent||U_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Gi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===kt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),D_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Mm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Mm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Vo(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-kt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Uc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-kt?0:this._rts,this.totalTime(_l(-Math.abs(this._delay),this._tDur,s),i!==!1),eu(this),VT(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Wo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==kt&&(this._tTime-=kt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Gi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Gn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Uc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=kT);var i=vn;return vn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),vn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Em(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Em(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(di(this,n),Gn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Gn(i)),this._dur||(this._zTime=-kt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-kt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-kt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-kt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=jt(n)?n:N_,a=function(){var c=i.then;i.then=null,jt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Sa(this)},r}();ai(ll.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-kt,_prom:0,_ps:!1,_rts:1});var gn=function(r){S_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Gn(n.sortChildren),Xt&&Gi(n.parent||Xt,cr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&F_(cr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Fa(0,arguments,this),this},t.from=function(i,s,o){return Fa(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Fa(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ua(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Zt(i,s,di(this,o),1),this},t.call=function(i,s,o){return Gi(this,Zt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Zt(i,o,di(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ua(o).immediateRender=Gn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Ua(a).immediateRender=Gn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:nn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,x,b,v,M,T,A;if(this!==Xt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,b=this._ts,p=!b,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=nn(u%m),u===l?(g=this._repeat,f=c):(M=nn(u/m),g=~~M,g&&g===M&&(f=c,g--),f>c&&(f=c)),M=Vo(this._tTime,m),!a&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),T&&g&1&&(f=c-f,A=1),g!==M&&!this._lock){var L=T&&M&1,S=L===(T&&g&1);if(g<M&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(A?0:nn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ri(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;J_(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=qT(this,nn(a),nn(f)),x&&(u-=f-(f=x._start))),this._tTime=u,this._time=f,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(ri(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&x!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=-kt);break}}h=_}else{h=this._last;for(var y=i<0?i:f;h;){if(_=h._prev,(h._act||y<=h._end)&&h._ts&&x!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||vn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=y?-kt:kt);break}}h=_}}if(x&&!s&&(this.pause(),x.render(f>=a?0:-kt)._zTime=f>=a?1:-1,this._ts))return this._start=v,eu(this),this.render(i,s,o);this._onUpdate&&!s&&ri(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Kr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ri(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Sr(s)||(s=di(this,s,i)),!(i instanceof ll)){if(En(i))return i.forEach(function(a){return o.add(a,s)}),this;if(hn(i))return this.addLabel(i,s);if(jt(i))i=Zt.delayedCall(0,i);else return this}return this!==i?Gi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-_i);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Zt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return hn(i)?this.removeLabel(i):jt(i)?this.killTweensOf(i):(i.parent===this&&Qc(this,i),i===this._recent&&(this._recent=this._last),As(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=nn(ti.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=di(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Zt.delayedCall(0,s||sl,o);return a.data="isPause",this._hasPause=1,Gi(this,a,di(this,i))},t.removePause=function(i){var s=this._first;for(i=di(this,i);s;)s._start===i&&s.data==="isPause"&&Kr(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Ur!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=vi(i),l=this._first,c=Sr(s),u;l;)l instanceof Zt?BT(l._targets,a)&&(c?(!Ur||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=di(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Zt.to(o,ai({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||kt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Go(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ai({startAt:{time:di(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Tm(this,di(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Tm(this,di(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+kt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return As(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),As(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=_i,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Gi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Go(o,o===Xt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Xt._ts&&(D_(Xt,Uc(i,Xt)),P_=ti.frame),ti.frame>=bm){bm+=si.autoSleep||120;var s=Xt._first;if((!s||!s._ts)&&si.autoSleep&&ti._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ti.sleep()}}},e}(ll);ai(gn.prototype,{_lock:0,_hasPause:0,_forcing:0});var l1=function(e,t,n,i,s,o,a){var l=new Xn(this._pt,e,t,0,1,o0,null,s),c=0,u=0,d,f,h,_,g,m,p,x;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=ol(i)),o&&(x=[n,i],o(x,e,t),n=x[0],i=x[1]),f=n.match(Xu)||[];d=Xu.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?wo(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Xu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(E_.test(i)||p)&&(l.e=0),this._pt=l,l},mh=function(e,t,n,i,s,o,a,l,c,u){jt(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:jt(d)?c?e[t.indexOf("set")||!jt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=jt(d)?c?h1:r0:_h,_;if(hn(i)&&(~i.indexOf("random(")&&(i=ol(i)),i.charAt(1)==="="&&(_=wo(f,i)+(wn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||gf)return!isNaN(f*i)&&i!==""?(_=new Xn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?m1:s0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&dh(t,i),l1.call(this,e,t,f,i,h,l||si.stringFilter,c))},c1=function(e,t,n,i,s){if(jt(e)&&(e=ka(e,s,t,n,i)),!Ji(e)||e.style&&e.nodeType||En(e)||w_(e))return hn(e)?ka(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=ka(e[a],s,t,n,i);return o},t0=function(e,t,n,i,s,o){var a,l,c,u;if(Qn[e]&&(a=new Qn[e]).init(s,a.rawVars?t[e]:c1(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Xn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==_o))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Ur,gf,gh=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!ah,v=e.timeline,M,T,A,L,S,y,C,w,k,G,W,X,j;if(v&&(!f||!s)&&(s="none"),e._ease=Cs(s,zo.ease),e._yEase=d?Z_(Cs(d===!0?s:d,zo.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(w=m[0]?Ts(m[0]).harness:0,X=w&&i[w.prop],M=Oc(i,fh),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?_c:FT),g._lazy=0),o){if(Kr(e._startAt=Zt.set(m,ai({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Gn(l),startAt:null,delay:0,onUpdate:c&&function(){return ri(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vn||!a&&!h)&&e._startAt.revert(_c),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),A=ai({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Gn(l),immediateRender:a,stagger:0,parent:p},M),X&&(A[w.prop]=X),Kr(e._startAt=Zt.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vn?e._startAt.revert(_c):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,kt,kt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Gn(l)||l&&!_,T=0;T<m.length;T++){if(S=m[T],C=S._gsap||ph(m)[T]._gsap,e._ptLookup[T]=G={},uf[C.id]&&Xr.length&&Nc(),W=x===m?T:x.indexOf(S),w&&(k=new w).init(S,X||M,e,W,x)!==!1&&(e._pt=L=new Xn(e._pt,S,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(I){G[I]=L}),k.priority&&(y=1)),!w||X)for(A in M)Qn[A]&&(k=t0(A,M,e,W,S,x))?k.priority&&(y=1):G[A]=L=mh.call(e,S,A,"get",M[A],W,x,0,i.stringFilter);e._op&&e._op[T]&&e.kill(S,e._op[T]),b&&e._pt&&(Ur=e,Xt.killTweensOf(S,G,e.globalTime(t)),j=!e.parent,Ur=0),e._pt&&l&&(uf[C.id]=1)}y&&a0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!j,f&&t<=0&&v.render(_i,!0,!0)},u1=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return gf=1,e.vars[t]="+=0",gh(e,a),gf=0,l?rl(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=Kt(n)+wn(d.e)),d.b&&(d.b=u.s+wn(d.b))},d1=function(e,t){var n=e[0]?Ts(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Ho({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},f1=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(En(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},ka=function(e,t,n,i,s){return jt(e)?e.call(t,n,i,s):hn(e)&&~e.indexOf("random(")?ol(e):e},n0=hh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",i0={};Wn(n0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return i0[r]=1});var Zt=function(r){S_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ua(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=i.parent||Xt,b=(En(n)||w_(n)?Sr(n[0]):"length"in i)?[n]:vi(n),v,M,T,A,L,S,y,C;if(a._targets=b.length?ph(b):rl("GSAP target "+n+" not found. https://gsap.com",!si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||$l(c)||$l(u)){if(i=a.vars,v=a.timeline=new gn({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:b}),v.kill(),v.parent=v._dp=cr(a),v._start=0,f||$l(c)||$l(u)){if(A=b.length,y=f&&H_(f),Ji(f))for(L in f)~n0.indexOf(L)&&(C||(C={}),C[L]=f[L]);for(M=0;M<A;M++)T=Oc(i,i0),T.stagger=0,p&&(T.yoyoEase=p),C&&Ho(T,C),S=b[M],T.duration=+ka(c,cr(a),M,S,b),T.delay=(+ka(u,cr(a),M,S,b)||0)-a._delay,!f&&A===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(S,T,y?y(M,S,b):0),v._ease=wt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Ua(ai(v.vars.defaults,{ease:"none"})),v._ease=Cs(_.ease||i.ease||"none");var w=0,k,G,W;if(En(_))_.forEach(function(X){return v.to(b,X,">")}),v.duration();else{T={};for(L in _)L==="ease"||L==="easeEach"||f1(L,_[L],T,_.easeEach);for(L in T)for(k=T[L].sort(function(X,j){return X.t-j.t}),w=0,M=0;M<k.length;M++)G=k[M],W={ease:G.e,duration:(G.t-(M?k[M-1].t:0))/100*c},W[L]=G.v,v.to(b,W,w),w+=W.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!ah&&(Ur=cr(a),Xt.killTweensOf(b),Ur=0),Gi(x,cr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===nn(x._time)&&Gn(d)&&GT(cr(a))&&x.data!=="nested")&&(a._tTime=-kt,a.render(Math.max(0,-u)||0)),m&&F_(cr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-kt&&!u?l:i<kt?0:i,f,h,_,g,m,p,x,b,v;if(!c)XT(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,b=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=nn(d%g),d===l?(_=this._repeat,f=c):(m=nn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=Vo(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(b&&this._yEase&&J_(b,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(nn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(k_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(f/c),this._from&&(this.ratio=x=1-x),f&&!a&&!s&&!_&&(ri(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(x,h.d),h=h._next;b&&b.render(i<0?i:b._dur*b._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&df(this,i,s,o),ri(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&ri(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&df(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Kr(this,1),!s&&!(u&&!a)&&(d||a||p)&&(ri(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){al||ti.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||gh(this,c),u=this._ease(c/this._dur),u1(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(tu(this,0),this.parent||O_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Sa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!vn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Ur&&Ur.vars.overwrite!==!0)._first||Sa(this),this.parent&&o!==this.timeline.totalDuration()&&Go(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?vi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&HT(a,l))return s==="all"&&(this._pt=0),Sa(this);for(d=this._op=this._op||[],s!=="all"&&(hn(s)&&(g={},Wn(s,function(x){return g[x]=1}),s=g),s=d1(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Qc(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&Sa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Fa(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Fa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Xt.killTweensOf(i,s,o)},e}(ll);ai(Zt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Wn("staggerTo,staggerFrom,staggerFromTo",function(r){Zt[r]=function(){var e=new gn,t=hf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var _h=function(e,t,n){return e[t]=n},r0=function(e,t,n){return e[t](n)},h1=function(e,t,n,i){return e[t](i.fp,n)},p1=function(e,t,n){return e.setAttribute(t,n)},vh=function(e,t){return jt(e[t])?r0:lh(e[t])&&e.setAttribute?p1:_h},s0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},m1=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},o0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},yh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},g1=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},_1=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Qc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},v1=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},a0=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Xn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||s0,this.d=l||this,this.set=c||_h,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=v1,this.m=n,this.mt=s,this.tween=i},r}();Wn(hh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return fh[r]=1});oi.TweenMax=oi.TweenLite=Zt;oi.TimelineLite=oi.TimelineMax=gn;Xt=new gn({sortChildren:!1,defaults:zo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});si.stringFilter=K_;var Rs=[],yc={},y1=[],Cm=0,x1=0,Ku=function(e){return(yc[e]||y1).map(function(t){return t()})},_f=function(){var e=Date.now(),t=[];e-Cm>2&&(Ku("matchMediaInit"),Rs.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=zi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Ku("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Cm=e,Ku("matchMedia"))},l0=function(){function r(t,n){this.selector=n&&pf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=x1++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){jt(n)&&(s=i,i=n,n=jt);var o=this,a=function(){var c=Vt,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=pf(s)),Vt=o,d=i.apply(o,arguments),jt(d)&&o._r.push(d),Vt=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===jt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Vt;Vt=null,n(this),Vt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Zt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof gn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Zt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Rs.length;o--;)Rs[o].id===this.id&&Rs.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),S1=function(){function r(t){this.contexts=[],this.scope=t,Vt&&Vt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Ji(n)||(n={matches:n});var o=new l0(0,s||this.scope),a=o.conditions={},l,c,u;Vt&&!o.selector&&(o.selector=Vt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=zi.matchMedia(n[c]),l&&(Rs.indexOf(o)<0&&Rs.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(_f):l.addEventListener("change",_f)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Fc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Y_(i)})},timeline:function(e){return new gn(e)},getTweensOf:function(e,t){return Xt.getTweensOf(e,t)},getProperty:function(e,t,n,i){hn(e)&&(e=vi(e)[0]);var s=Ts(e||{}).get,o=n?N_:I_;return n==="native"&&(n=""),e&&(t?o((Qn[t]&&Qn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Qn[a]&&Qn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=vi(e),e.length>1){var i=e.map(function(u){return Yn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Qn[t],a=Ts(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;_o._pt=0,d.init(e,n?u+n:u,_o,0,[e]),d.render(1,d),_o._pt&&yh(1,_o)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Yn.to(e,ai((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Xt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Cs(e.ease,zo.ease)),wm(zo,e||{})},config:function(e){return wm(si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Qn[a]&&!oi[a]&&rl(t+" effect requires "+a+" plugin.")}),qu[t]=function(a,l,c){return n(vi(a),ai(l||{},s),c)},o&&(gn.prototype[t]=function(a,l,c){return this.add(qu[t](a,Ji(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){wt[e]=Cs(t)},parseEase:function(e,t){return arguments.length?Cs(e,t):wt},getById:function(e){return Xt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new gn(e),i,s;for(n.smoothChildTiming=Gn(e.smoothChildTiming),Xt.remove(n),n._dp=0,n._time=n._tTime=Xt._time,i=Xt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Zt&&i.vars.onComplete===i._targets[0]))&&Gi(n,i,i._start-i._delay),i=s;return Gi(Xt,n,0),n},context:function(e,t){return e?new l0(e,t):Vt},matchMedia:function(e){return new S1(e)},matchMediaRefresh:function(){return Rs.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||_f()},addEventListener:function(e,t){var n=yc[e]||(yc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=yc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:QT,wrapYoyo:e1,distribute:H_,random:G_,snap:V_,normalize:JT,getUnit:wn,clamp:$T,splitColor:$_,toArray:vi,selector:pf,mapRange:X_,pipe:KT,unitize:ZT,interpolate:t1,shuffle:z_},install:C_,effects:qu,ticker:ti,updateRoot:gn.updateRoot,plugins:Qn,globalTimeline:Xt,core:{PropTween:Xn,globals:R_,Tween:Zt,Timeline:gn,Animation:ll,getCache:Ts,_removeLinkedListItem:Qc,reverting:function(){return vn},context:function(e){return e&&Vt&&(Vt.data.push(e),e._ctx=Vt),Vt},suppressOverwrites:function(e){return ah=e}}};Wn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Fc[r]=Zt[r]});ti.add(gn.updateRoot);_o=Fc.to({},{duration:0});var b1=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},w1=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=b1(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Zu=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},Wn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}w1(a,s)}}}},Yn=Fc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)vn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Zu("roundProps",mf),Zu("modifiers"),Zu("snap",V_))||Fc;Zt.version=gn.version=Yn.version="3.12.7";A_=1;ch()&&Wo();var M1=wt.Power0,E1=wt.Power1,T1=wt.Power2,A1=wt.Power3,C1=wt.Power4,R1=wt.Linear,P1=wt.Quad,L1=wt.Cubic,D1=wt.Quart,I1=wt.Quint,N1=wt.Strong,O1=wt.Elastic,U1=wt.Back,F1=wt.SteppedEase,k1=wt.Bounce,B1=wt.Sine,z1=wt.Expo,H1=wt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Rm,Fr,Mo,xh,Ss,Pm,Sh,V1=function(){return typeof window<"u"},br={},ms=180/Math.PI,Eo=Math.PI/180,ro=Math.atan2,Lm=1e8,bh=/([A-Z])/g,G1=/(left|right|width|margin|padding|x)/i,W1=/[\s,\(]\S/,Wi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},vf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},X1=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},q1=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Y1=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},c0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},u0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},$1=function(e,t,n){return e.style[t]=n},j1=function(e,t,n){return e.style.setProperty(t,n)},K1=function(e,t,n){return e._gsap[t]=n},Z1=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},J1=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Q1=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},qt="transform",qn=qt+"Origin",eA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in br&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Wi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=ur(i,a)}):this.tfm[e]=o.x?o[e]:ur(i,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Wi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(qt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=qt}(s||t)&&this.props.push(e,t,s[e])},d0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},tA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(bh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Sh(),(!s||!s.isStart)&&!n[qt]&&(d0(n),i.zOrigin&&n[qn]&&(n[qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},f0=function(e,t){var n={target:e,props:[],revert:tA,save:eA};return e._gsap||Yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},h0,yf=function(e,t){var n=Fr.createElementNS?Fr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Fr.createElement(e);return n&&n.style?n:Fr.createElement(e)},$i=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(bh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Xo(t)||t,1)||""},Dm="O,Moz,ms,Ms,Webkit".split(","),Xo=function(e,t,n){var i=t||Ss,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Dm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Dm[o]:"")+e},xf=function(){V1()&&window.document&&(Rm=window,Fr=Rm.document,Mo=Fr.documentElement,Ss=yf("div")||{style:{}},yf("div"),qt=Xo(qt),qn=qt+"Origin",Ss.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",h0=!!Xo("perspective"),Sh=Yn.core.reverting,xh=1)},Im=function(e){var t=e.ownerSVGElement,n=yf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Mo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Mo.removeChild(n),s},Nm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},p0=function(e){var t,n;try{t=e.getBBox()}catch{t=Im(e),n=1}return t&&(t.width||t.height)||n||(t=Im(e)),t&&!t.width&&!t.x&&!t.y?{x:+Nm(e,["x","cx","x1"])||0,y:+Nm(e,["y","cy","y1"])||0,width:0,height:0}:t},m0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&p0(e))},Os=function(e,t){if(t){var n=e.style,i;t in br&&t!==qn&&(t=qt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(bh,"-$1").toLowerCase())):n.removeAttribute(t)}},kr=function(e,t,n,i,s,o){var a=new Xn(e._pt,t,n,0,1,o?u0:c0);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Om={deg:1,rad:1,turn:1},nA={grid:1,flex:1},Zr=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ss.style,l=G1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||Om[i]||Om[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&m0(e),(h||o==="%")&&(br[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],Kt(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Fr||!g.appendChild)&&(g=Fr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===ti.time&&!m.uncache)return Kt(s/m.width*d);if(h&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+i,_=e[u],x?e.style[t]=x:Os(e,t)}else(h||o==="%")&&!nA[$i(g,"display")]&&(a.position=$i(e,"position")),g===e&&(a.position="static"),g.appendChild(Ss),_=Ss[u],g.removeChild(Ss),a.position="absolute";return l&&h&&(m=Ts(g),m.time=ti.time,m.width=g[u]),Kt(f?_*s/d:_&&s?d/_*s:0)},ur=function(e,t,n,i){var s;return xh||xf(),t in Wi&&t!=="transform"&&(t=Wi[t],~t.indexOf(",")&&(t=t.split(",")[0])),br[t]&&t!=="transform"?(s=ul(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Bc($i(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=kc[t]&&kc[t](e,t,n)||$i(e,t)||L_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Zr(e,t,s,n)+n:s},iA=function(e,t,n,i){if(!n||n==="none"){var s=Xo(t,e,1),o=s&&$i(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=$i(e,"borderTopColor"))}var a=new Xn(this._pt,e.style,t,0,1,o0),l=0,c=0,u,d,f,h,_,g,m,p,x,b,v,M;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=$i(e,t)||i,g?e.style[t]=g:Os(e,t)),u=[n,i],K_(u),n=u[0],i=u[1],f=n.match(go)||[],M=i.match(go)||[],M.length){for(;d=go.exec(i);)m=d[0],x=i.substring(l,d.index),_?_=(_+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=wo(h,m)+v),p=parseFloat(m),b=m.substr((p+"").length),l=go.lastIndex-b.length,b||(b=b||si.units[t]||v,l===i.length&&(i+=b,a.e+=b)),v!==b&&(h=Zr(e,t,g,b)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?u0:c0;return E_.test(i)&&(a.e=0),this._pt=a,a},Um={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},rA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Um[n]||n,t[1]=Um[i]||i,t.join(" ")},sA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],br[a]&&(l=1,a=a==="transformOrigin"?qn:qt),Os(n,a);l&&(Os(n,qt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ul(n,1),o.uncache=1,d0(i)))}},kc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Xn(e._pt,t,n,0,0,sA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},cl=[1,0,0,1,0,0],g0={},_0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Fm=function(e){var t=$i(e,qt);return _0(t)?cl:t.substr(7).match(M_).map(Kt)},wh=function(e,t){var n=e._gsap||Ts(e),i=e.style,s=Fm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?cl:s):(s===cl&&!e.offsetParent&&e!==Mo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Mo.appendChild(e)),s=Fm(e),l?i.display=l:Os(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Mo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Sf=function(e,t,n,i,s,o){var a=e._gsap,l=s||wh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],x=l[5],b=t.split(" "),v=parseFloat(b[0])||0,M=parseFloat(b[1])||0,T,A,L,S;n?l!==cl&&(A=h*m-_*g)&&(L=v*(m/A)+M*(-g/A)+(g*x-m*p)/A,S=v*(-_/A)+M*(h/A)-(h*x-_*p)/A,v=L,M=S):(T=p0(e),v=T.x+(~b[0].indexOf("%")?v/100*T.width:v),M=T.y+(~(b[1]||b[0]).indexOf("%")?M/100*T.height:M)),i||i!==!1&&a.smooth?(p=v-c,x=M-u,a.xOffset=d+(p*h+x*g)-p,a.yOffset=f+(p*_+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(kr(o,a,"xOrigin",c,v),kr(o,a,"yOrigin",u,M),kr(o,a,"xOffset",d,a.xOffset),kr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+M)},ul=function(e,t){var n=e._gsap||new e0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=$i(e,qn)||"0",u,d,f,h,_,g,m,p,x,b,v,M,T,A,L,S,y,C,w,k,G,W,X,j,I,fe,N,_e,He,st,Z,oe;return u=d=f=g=m=p=x=b=v=0,h=_=1,n.svg=!!(e.getCTM&&m0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[qt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[qt]!=="none"?l[qt]:"")),i.scale=i.rotate=i.translate="none"),A=wh(e,n.svg),n.svg&&(n.uncache?(I=e.getBBox(),c=n.xOrigin-I.x+"px "+(n.yOrigin-I.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),Sf(e,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,A)),M=n.xOrigin||0,T=n.yOrigin||0,A!==cl&&(C=A[0],w=A[1],k=A[2],G=A[3],u=W=A[4],d=X=A[5],A.length===6?(h=Math.sqrt(C*C+w*w),_=Math.sqrt(G*G+k*k),g=C||w?ro(w,C)*ms:0,x=k||G?ro(k,G)*ms+g:0,x&&(_*=Math.abs(Math.cos(x*Eo))),n.svg&&(u-=M-(M*C+T*k),d-=T-(M*w+T*G))):(oe=A[6],st=A[7],N=A[8],_e=A[9],He=A[10],Z=A[11],u=A[12],d=A[13],f=A[14],L=ro(oe,He),m=L*ms,L&&(S=Math.cos(-L),y=Math.sin(-L),j=W*S+N*y,I=X*S+_e*y,fe=oe*S+He*y,N=W*-y+N*S,_e=X*-y+_e*S,He=oe*-y+He*S,Z=st*-y+Z*S,W=j,X=I,oe=fe),L=ro(-k,He),p=L*ms,L&&(S=Math.cos(-L),y=Math.sin(-L),j=C*S-N*y,I=w*S-_e*y,fe=k*S-He*y,Z=G*y+Z*S,C=j,w=I,k=fe),L=ro(w,C),g=L*ms,L&&(S=Math.cos(L),y=Math.sin(L),j=C*S+w*y,I=W*S+X*y,w=w*S-C*y,X=X*S-W*y,C=j,W=I),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=Kt(Math.sqrt(C*C+w*w+k*k)),_=Kt(Math.sqrt(X*X+oe*oe)),L=ro(W,X),x=Math.abs(L)>2e-4?L*ms:0,v=Z?1/(Z<0?-Z:Z):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!_0($i(e,qt)),j&&e.setAttribute("transform",j))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(h*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Kt(h),n.scaleY=Kt(_),n.rotation=Kt(g)+a,n.rotationX=Kt(m)+a,n.rotationY=Kt(p)+a,n.skewX=x+a,n.skewY=b+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[qn]=Bc(c)),n.xOffset=n.yOffset=0,n.force3D=si.force3D,n.renderTransform=n.svg?aA:h0?v0:oA,n.uncache=0,n},Bc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ju=function(e,t,n){var i=wn(t);return Kt(parseFloat(t)+parseFloat(Zr(e,"x",n+"px",i)))+i},oA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,v0(e,t)},ds="0deg",ha="0px",fs=") ",v0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,x=n.target,b=n.zOrigin,v="",M=p==="auto"&&e&&e!==1||p===!0;if(b&&(d!==ds||u!==ds)){var T=parseFloat(u)*Eo,A=Math.sin(T),L=Math.cos(T),S;T=parseFloat(d)*Eo,S=Math.cos(T),o=Ju(x,o,A*S*-b),a=Ju(x,a,-Math.sin(T)*-b),l=Ju(x,l,L*S*-b+b)}m!==ha&&(v+="perspective("+m+fs),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(M||o!==ha||a!==ha||l!==ha)&&(v+=l!==ha||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+fs),c!==ds&&(v+="rotate("+c+fs),u!==ds&&(v+="rotateY("+u+fs),d!==ds&&(v+="rotateX("+d+fs),(f!==ds||h!==ds)&&(v+="skew("+f+", "+h+fs),(_!==1||g!==1)&&(v+="scale("+_+", "+g+fs),x.style[qt]=v||"translate(0, 0)"},aA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,x=n.forceCSS,b=parseFloat(o),v=parseFloat(a),M,T,A,L,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Eo,c*=Eo,M=Math.cos(l)*d,T=Math.sin(l)*d,A=Math.sin(l-c)*-f,L=Math.cos(l-c)*f,c&&(u*=Eo,S=Math.tan(c-u),S=Math.sqrt(1+S*S),A*=S,L*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),M*=S,T*=S)),M=Kt(M),T=Kt(T),A=Kt(A),L=Kt(L)):(M=d,L=f,T=A=0),(b&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(b=Zr(h,"x",o,"px"),v=Zr(h,"y",a,"px")),(_||g||m||p)&&(b=Kt(b+_-(_*M+g*A)+m),v=Kt(v+g-(_*T+g*L)+p)),(i||s)&&(S=h.getBBox(),b=Kt(b+i/100*S.width),v=Kt(v+s/100*S.height)),S="matrix("+M+","+T+","+A+","+L+","+b+","+v+")",h.setAttribute("transform",S),x&&(h.style[qt]=S)},lA=function(e,t,n,i,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ms:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Lm)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Lm)%o-~~(c/o)*o)),e._pt=f=new Xn(e._pt,t,n,i,c,X1),f.e=u,f.u="deg",e._props.push(n),f},km=function(e,t){for(var n in t)e[n]=t[n];return e},cA=function(e,t,n){var i=km({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[qt]=t,a=ul(n,1),Os(n,qt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[qt],o[qt]=t,a=ul(n,1),o[qt]=c);for(l in br)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=wn(c),_=wn(u),d=h!==_?Zr(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new Xn(e._pt,a,l,d,f-d,vf),e._pt.u=_||0,e._props.push(l));km(a,i)};Wn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});kc[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return ur(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Mh={name:"css",register:xf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,x,b,v,M,T,A,L;xh||xf(),this.styles=this.styles||f0(e),L=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Qn[g]&&t0(g,t,n,i,e,s)))){if(h=typeof u,_=kc[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=ol(u)),_)_(this,e,g,u,n)&&(A=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",qr.lastIndex=0,qr.test(c)||(m=wn(c),p=wn(u)),p?m!==p&&(c=Zr(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),L.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],hn(c)&&~c.indexOf("random(")&&(c=ol(c)),wn(c+"")||c==="auto"||(c+=si.units[g]||wn(ur(e,g))||""),(c+"").charAt(1)==="="&&(c=ur(e,g))):c=ur(e,g),f=parseFloat(c),x=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),g in Wi&&(g==="autoAlpha"&&(f===1&&ur(e,"visibility")==="hidden"&&d&&(f=0),L.push("visibility",0,a.visibility),kr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Wi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),b=g in br,b){if(this.styles.save(g),v||(M=e._gsap,M.renderTransform&&!t.parseTransform||ul(e,t.parseTransform),T=t.smoothOrigin!==!1&&M.smooth,v=this._pt=new Xn(this._pt,a,qt,0,1,M.renderTransform,M,0,-1),v.dep=1),g==="scale")this._pt=new Xn(this._pt,M,"scaleY",M.scaleY,(x?wo(M.scaleY,x+d):d)-M.scaleY||0,vf),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){L.push(qn,0,a[qn]),u=rA(u),M.svg?Sf(e,u,0,T,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&kr(this,M,"zOrigin",M.zOrigin,p),kr(this,a,g,Bc(c),Bc(u)));continue}else if(g==="svgOrigin"){Sf(e,u,1,T,0,this);continue}else if(g in g0){lA(this,M,g,f,x?wo(f,x+u):u);continue}else if(g==="smoothOrigin"){kr(this,M,"smooth",M.smooth,u);continue}else if(g==="force3D"){M[g]=u;continue}else if(g==="transform"){cA(this,u,e);continue}}else g in a||(g=Xo(g)||g);if(b||(d||d===0)&&(f||f===0)&&!W1.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=wn(u)||(g in si.units?si.units[g]:m),m!==p&&(f=Zr(e,g,c,p)),this._pt=new Xn(this._pt,b?M:a,g,f,(x?wo(f,x+d):d)-f,!b&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?Y1:vf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=q1);else if(g in a)iA.call(this,e,g,c,x?x+u:u);else if(g in e)this.add(e,g,c||e[g],x?x+u:u,i,s);else if(g!=="parseTransform"){dh(g,u);continue}b||(g in a?L.push(g,0,a[g]):typeof e[g]=="function"?L.push(g,2,e[g]()):L.push(g,1,c||e[g])),o.push(g)}}A&&a0(this)},render:function(e,t){if(t.tween._time||!Sh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ur,aliases:Wi,getSetter:function(e,t,n){var i=Wi[t];return i&&i.indexOf(",")<0&&(t=i),t in br&&t!==qn&&(e._gsap.x||ur(e,"x"))?n&&Pm===n?t==="scale"?Z1:K1:(Pm=n||{})&&(t==="scale"?J1:Q1):e.style&&!lh(e.style[t])?$1:~t.indexOf("-")?j1:vh(e,t)},core:{_removeProperty:Os,_getMatrix:wh}};Yn.utils.checkPrefix=Xo;Yn.core.getStyleSaver=f0;(function(r,e,t,n){var i=Wn(r+","+e+","+t,function(s){br[s]=1});Wn(e,function(s){si.units[s]="deg",g0[s]=1}),Wi[i[13]]=r+","+e,Wn(n,function(s){var o=s.split(":");Wi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){si.units[r]="px"});Yn.registerPlugin(Mh);var Ue=Yn.registerPlugin(Mh)||Yn,uA=Ue.core.Tween;const dA=Object.freeze(Object.defineProperty({__proto__:null,Back:U1,Bounce:k1,CSSPlugin:Mh,Circ:H1,Cubic:L1,Elastic:O1,Expo:z1,Linear:R1,Power0:M1,Power1:E1,Power2:T1,Power3:A1,Power4:C1,Quad:P1,Quart:D1,Quint:I1,Sine:B1,SteppedEase:F1,Strong:N1,TimelineLite:gn,TimelineMax:gn,TweenLite:Zt,TweenMax:uA,default:Ue,gsap:Ue},Symbol.toStringTag,{value:"Module"}));function fA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function hA(r,e,t){return e&&fA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var _n,xc,ni,Br,zr,To,y0,gs,Ba,x0,mr,Mi,S0,b0=function(){return _n||typeof window<"u"&&(_n=window.gsap)&&_n.registerPlugin&&_n},w0=1,vo=[],yt=[],ji=[],za=Date.now,bf=function(e,t){return t},pA=function(){var e=Ba.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,yt),i.push.apply(i,ji),yt=n,ji=i,bf=function(o,a){return t[o](a)}},Yr=function(e,t){return~ji.indexOf(e)&&ji[ji.indexOf(e)+1][t]},Ha=function(e){return!!~x0.indexOf(e)},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},jl="scrollLeft",Kl="scrollTop",wf=function(){return mr&&mr.isPressed||yt.cache++},zc=function(e,t){var n=function i(s){if(s||s===0){w0&&(ni.history.scrollRestoration="manual");var o=mr&&mr.isPressed;s=i.v=Math.round(s)||(mr&&mr.iOS?1:0),e(s),i.cacheID=yt.cache,o&&bf("ss",s)}else(t||yt.cache!==i.cacheID||bf("ref"))&&(i.cacheID=yt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},On={s:jl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:zc(function(r){return arguments.length?ni.scrollTo(r,sn.sc()):ni.pageXOffset||Br[jl]||zr[jl]||To[jl]||0})},sn={s:Kl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:On,sc:zc(function(r){return arguments.length?ni.scrollTo(On.sc(),r):ni.pageYOffset||Br[Kl]||zr[Kl]||To[Kl]||0})},zn=function(e,t){return(t&&t._ctx&&t._ctx.selector||_n.utils.toArray)(e)[0]||(typeof e=="string"&&_n.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Jr=function(e,t){var n=t.s,i=t.sc;Ha(e)&&(e=Br.scrollingElement||zr);var s=yt.indexOf(e),o=i===sn.sc?1:2;!~s&&(s=yt.push(e)-1),yt[s+o]||Rn(e,"scroll",wf);var a=yt[s+o],l=a||(yt[s+o]=zc(Yr(e,n),!0)||(Ha(e)?i:zc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=_n.getProperty(e,"scrollBehavior")==="smooth"),l},Mf=function(e,t,n){var i=e,s=e,o=za(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=za();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=za();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},pa=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Bm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},M0=function(){Ba=_n.core.globals().ScrollTrigger,Ba&&Ba.core&&pA()},E0=function(e){return _n=e||b0(),!xc&&_n&&typeof document<"u"&&document.body&&(ni=window,Br=document,zr=Br.documentElement,To=Br.body,x0=[ni,Br,zr,To],_n.utils.clamp,S0=_n.core.context||function(){},gs="onpointerenter"in To?"pointer":"mouse",y0=Qt.isTouch=ni.matchMedia&&ni.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ni||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Mi=Qt.eventTypes=("ontouchstart"in zr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in zr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return w0=0},500),M0(),xc=1),xc};On.op=sn;yt.cache=0;var Qt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){xc||E0(_n)||console.warn("Please gsap.registerPlugin(Observer)"),Ba||M0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,x=n.onDrag,b=n.onPress,v=n.onRelease,M=n.onRight,T=n.onLeft,A=n.onUp,L=n.onDown,S=n.onChangeX,y=n.onChangeY,C=n.onChange,w=n.onToggleX,k=n.onToggleY,G=n.onHover,W=n.onHoverEnd,X=n.onMove,j=n.ignoreCheck,I=n.isNormalizer,fe=n.onGestureStart,N=n.onGestureEnd,_e=n.onWheel,He=n.onEnable,st=n.onDisable,Z=n.onClick,oe=n.scrollSpeed,Te=n.capture,ue=n.allowClicks,we=n.lockAxis,Ze=n.onLockAxis;this.target=a=zn(a)||zr,this.vars=n,h&&(h=_n.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,oe=oe||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ni.getComputedStyle(To).lineHeight)||22);var Ae,dt,Je,Ie,U,Tt,ot,q=this,Se=0,ct=0,Ne=n.passive||!u&&n.passive!==!1,Ve=Jr(a,On),Ct=Jr(a,sn),D=Ve(),E=Ct(),H=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Mi[0]==="pointerdown",J=Ha(a),te=a.ownerDocument||Br,ee=[0,0,0],ne=[0,0,0],ge=0,Pe=function(){return ge=za()},he=function(Fe,ut){return(q.event=Fe)&&h&&~h.indexOf(Fe.target)||ut&&H&&Fe.pointerType!=="touch"||j&&j(Fe,ut)},de=function(){q._vx.reset(),q._vy.reset(),dt.pause(),d&&d(q)},Me=function(){var Fe=q.deltaX=Bm(ee),ut=q.deltaY=Bm(ne),ve=Math.abs(Fe)>=i,nt=Math.abs(ut)>=i;C&&(ve||nt)&&C(q,Fe,ut,ee,ne),ve&&(M&&q.deltaX>0&&M(q),T&&q.deltaX<0&&T(q),S&&S(q),w&&q.deltaX<0!=Se<0&&w(q),Se=q.deltaX,ee[0]=ee[1]=ee[2]=0),nt&&(L&&q.deltaY>0&&L(q),A&&q.deltaY<0&&A(q),y&&y(q),k&&q.deltaY<0!=ct<0&&k(q),ct=q.deltaY,ne[0]=ne[1]=ne[2]=0),(Ie||Je)&&(X&&X(q),Je&&(m&&Je===1&&m(q),x&&x(q),Je=0),Ie=!1),Tt&&!(Tt=!1)&&Ze&&Ze(q),U&&(_e(q),U=!1),Ae=0},ye=function(Fe,ut,ve){ee[ve]+=Fe,ne[ve]+=ut,q._vx.update(Fe),q._vy.update(ut),c?Ae||(Ae=requestAnimationFrame(Me)):Me()},qe=function(Fe,ut){we&&!ot&&(q.axis=ot=Math.abs(Fe)>Math.abs(ut)?"x":"y",Tt=!0),ot!=="y"&&(ee[2]+=Fe,q._vx.update(Fe,!0)),ot!=="x"&&(ne[2]+=ut,q._vy.update(ut,!0)),c?Ae||(Ae=requestAnimationFrame(Me)):Me()},me=function(Fe){if(!he(Fe,1)){Fe=pa(Fe,u);var ut=Fe.clientX,ve=Fe.clientY,nt=ut-q.x,We=ve-q.y,lt=q.isDragging;q.x=ut,q.y=ve,(lt||(nt||We)&&(Math.abs(q.startX-ut)>=s||Math.abs(q.startY-ve)>=s))&&(Je=lt?2:1,lt||(q.isDragging=!0),qe(nt,We))}},tt=q.onPress=function(Ce){he(Ce,1)||Ce&&Ce.button||(q.axis=ot=null,dt.pause(),q.isPressed=!0,Ce=pa(Ce),Se=ct=0,q.startX=q.x=Ce.clientX,q.startY=q.y=Ce.clientY,q._vx.reset(),q._vy.reset(),Rn(I?a:te,Mi[1],me,Ne,!0),q.deltaX=q.deltaY=0,b&&b(q))},O=q.onRelease=function(Ce){if(!he(Ce,1)){Cn(I?a:te,Mi[1],me,!0);var Fe=!isNaN(q.y-q.startY),ut=q.isDragging,ve=ut&&(Math.abs(q.x-q.startX)>3||Math.abs(q.y-q.startY)>3),nt=pa(Ce);!ve&&Fe&&(q._vx.reset(),q._vy.reset(),u&&ue&&_n.delayedCall(.08,function(){if(za()-ge>300&&!Ce.defaultPrevented){if(Ce.target.click)Ce.target.click();else if(te.createEvent){var We=te.createEvent("MouseEvents");We.initMouseEvent("click",!0,!0,ni,1,nt.screenX,nt.screenY,nt.clientX,nt.clientY,!1,!1,!1,!1,0,null),Ce.target.dispatchEvent(We)}}})),q.isDragging=q.isGesturing=q.isPressed=!1,d&&ut&&!I&&dt.restart(!0),Je&&Me(),p&&ut&&p(q),v&&v(q,ve)}},xe=function(Fe){return Fe.touches&&Fe.touches.length>1&&(q.isGesturing=!0)&&fe(Fe,q.isDragging)},ae=function(){return(q.isGesturing=!1)||N(q)},Ee=function(Fe){if(!he(Fe)){var ut=Ve(),ve=Ct();ye((ut-D)*oe,(ve-E)*oe,1),D=ut,E=ve,d&&dt.restart(!0)}},re=function(Fe){if(!he(Fe)){Fe=pa(Fe,u),_e&&(U=!0);var ut=(Fe.deltaMode===1?l:Fe.deltaMode===2?ni.innerHeight:1)*_;ye(Fe.deltaX*ut,Fe.deltaY*ut,0),d&&!I&&dt.restart(!0)}},ie=function(Fe){if(!he(Fe)){var ut=Fe.clientX,ve=Fe.clientY,nt=ut-q.x,We=ve-q.y;q.x=ut,q.y=ve,Ie=!0,d&&dt.restart(!0),(nt||We)&&qe(nt,We)}},Le=function(Fe){q.event=Fe,G(q)},Qe=function(Fe){q.event=Fe,W(q)},Mt=function(Fe){return he(Fe)||pa(Fe,u)&&Z(q)};dt=q._dc=_n.delayedCall(f||.25,de).pause(),q.deltaX=q.deltaY=0,q._vx=Mf(0,50,!0),q._vy=Mf(0,50,!0),q.scrollX=Ve,q.scrollY=Ct,q.isDragging=q.isGesturing=q.isPressed=!1,S0(this),q.enable=function(Ce){return q.isEnabled||(Rn(J?te:a,"scroll",wf),o.indexOf("scroll")>=0&&Rn(J?te:a,"scroll",Ee,Ne,Te),o.indexOf("wheel")>=0&&Rn(a,"wheel",re,Ne,Te),(o.indexOf("touch")>=0&&y0||o.indexOf("pointer")>=0)&&(Rn(a,Mi[0],tt,Ne,Te),Rn(te,Mi[2],O),Rn(te,Mi[3],O),ue&&Rn(a,"click",Pe,!0,!0),Z&&Rn(a,"click",Mt),fe&&Rn(te,"gesturestart",xe),N&&Rn(te,"gestureend",ae),G&&Rn(a,gs+"enter",Le),W&&Rn(a,gs+"leave",Qe),X&&Rn(a,gs+"move",ie)),q.isEnabled=!0,q.isDragging=q.isGesturing=q.isPressed=Ie=Je=!1,q._vx.reset(),q._vy.reset(),D=Ve(),E=Ct(),Ce&&Ce.type&&tt(Ce),He&&He(q)),q},q.disable=function(){q.isEnabled&&(vo.filter(function(Ce){return Ce!==q&&Ha(Ce.target)}).length||Cn(J?te:a,"scroll",wf),q.isPressed&&(q._vx.reset(),q._vy.reset(),Cn(I?a:te,Mi[1],me,!0)),Cn(J?te:a,"scroll",Ee,Te),Cn(a,"wheel",re,Te),Cn(a,Mi[0],tt,Te),Cn(te,Mi[2],O),Cn(te,Mi[3],O),Cn(a,"click",Pe,!0),Cn(a,"click",Mt),Cn(te,"gesturestart",xe),Cn(te,"gestureend",ae),Cn(a,gs+"enter",Le),Cn(a,gs+"leave",Qe),Cn(a,gs+"move",ie),q.isEnabled=q.isPressed=q.isDragging=!1,st&&st(q))},q.kill=q.revert=function(){q.disable();var Ce=vo.indexOf(q);Ce>=0&&vo.splice(Ce,1),mr===q&&(mr=0)},vo.push(q),I&&Ha(a)&&(mr=q),q.enable(g)},hA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Qt.version="3.12.7";Qt.create=function(r){return new Qt(r)};Qt.register=E0;Qt.getAll=function(){return vo.slice()};Qt.getById=function(r){return vo.filter(function(e){return e.vars.id===r})[0]};b0()&&_n.registerPlugin(Qt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ze,fo,vt,Bt,ei,Dt,Eh,Hc,dl,Va,wa,Zl,Sn,nu,Ef,Dn,zm,Hm,ho,T0,Qu,A0,Ln,Tf,C0,R0,Dr,Af,Th,Ao,Ah,Vc,Cf,ed,Jl=1,bn=Date.now,td=bn(),yi=0,Ma=0,Vm=function(e,t,n){var i=Jn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Gm=function(e,t){return t&&(!Jn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},mA=function r(){return Ma&&requestAnimationFrame(r)},Wm=function(){return nu=1},Xm=function(){return nu=0},Hi=function(e){return e},Ea=function(e){return Math.round(e*1e5)/1e5||0},P0=function(){return typeof window<"u"},L0=function(){return ze||P0()&&(ze=window.gsap)&&ze.registerPlugin&&ze},Us=function(e){return!!~Eh.indexOf(e)},D0=function(e){return(e==="Height"?Ah:vt["inner"+e])||ei["client"+e]||Dt["client"+e]},I0=function(e){return Yr(e,"getBoundingClientRect")||(Us(e)?function(){return Ec.width=vt.innerWidth,Ec.height=Ah,Ec}:function(){return dr(e)})},gA=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Yr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?D0(s):e["client"+s])||0}},_A=function(e,t){return!t||~ji.indexOf(e)?I0(e):function(){return Ec}},Xi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Yr(e,n))?o()-I0(e)()[s]:Us(e)?(ei[n]||Dt[n])-D0(i):e[n]-e["offset"+i])},Ql=function(e,t){for(var n=0;n<ho.length;n+=3)(!t||~t.indexOf(ho[n+1]))&&e(ho[n],ho[n+1],ho[n+2])},Jn=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},Ta=function(e){return typeof e=="number"},_s=function(e){return typeof e=="object"},ma=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},nd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},so=Math.abs,N0="left",O0="top",Ch="right",Rh="bottom",Ps="width",Ls="height",Ga="Right",Wa="Left",Xa="Top",qa="Bottom",tn="padding",hi="margin",qo="Width",Ph="Height",rn="px",pi=function(e){return vt.getComputedStyle(e)},vA=function(e){var t=pi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},qm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},dr=function(e,t){var n=t&&pi(e)[Ef]!=="matrix(1, 0, 0, 1, 0, 0)"&&ze.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Gc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},U0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},yA=function(e){return function(t){return ze.utils.snap(U0(e),t)}},Lh=function(e){var t=ze.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},xA=function(e){return function(t,n){return Lh(U0(e))(t,n.direction)}},ec=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},dn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},un=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},tc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Ym={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},nc={toggleActions:"play",anticipatePin:0},Wc={top:0,left:0,center:.5,bottom:1,right:1},Sc=function(e,t){if(Jn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Wc?Wc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},ic=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=Bt.createElement("div"),g=Us(n)||Yr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Dt:n,x=e.indexOf("start")!==-1,b=x?c:u,v="border-color:"+b+";font-size:"+d+";color:"+b+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===sn?Ch:Rh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=x,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],bc(_,0,i,x),_},bc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+qo]=1,s["border"+a+qo]=0,s[n.p]=t+"px",ze.set(e,s)},_t=[],Rf={},fl,$m=function(){return bn()-yi>34&&(fl||(fl=requestAnimationFrame(yr)))},oo=function(){(!Ln||!Ln.isPressed||Ln.startX>Dt.clientWidth)&&(yt.cache++,Ln?fl||(fl=requestAnimationFrame(yr)):yr(),yi||ks("scrollStart"),yi=bn())},id=function(){R0=vt.innerWidth,C0=vt.innerHeight},Aa=function(e){yt.cache++,(e===!0||!Sn&&!A0&&!Bt.fullscreenElement&&!Bt.webkitFullscreenElement&&(!Tf||R0!==vt.innerWidth||Math.abs(vt.innerHeight-C0)>vt.innerHeight*.25))&&Hc.restart(!0)},Fs={},SA=[],F0=function r(){return un(Ye,"scrollEnd",r)||bs(!0)},ks=function(e){return Fs[e]&&Fs[e].map(function(t){return t()})||SA},Zn=[],k0=function(e){for(var t=0;t<Zn.length;t+=5)(!e||Zn[t+4]&&Zn[t+4].query===e)&&(Zn[t].style.cssText=Zn[t+1],Zn[t].getBBox&&Zn[t].setAttribute("transform",Zn[t+2]||""),Zn[t+3].uncache=1)},Dh=function(e,t){var n;for(Dn=0;Dn<_t.length;Dn++)n=_t[Dn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Vc=!0,t&&k0(t),t||ks("revert")},B0=function(e,t){yt.cache++,(t||!In)&&yt.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Jn(e)&&(vt.history.scrollRestoration=Th=e)},In,Ds=0,jm,bA=function(){if(jm!==Ds){var e=jm=Ds;requestAnimationFrame(function(){return e===Ds&&bs(!0)})}},z0=function(){Dt.appendChild(Ao),Ah=!Ln&&Ao.offsetHeight||vt.innerHeight,Dt.removeChild(Ao)},Km=function(e){return dl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},bs=function(e,t){if(ei=Bt.documentElement,Dt=Bt.body,Eh=[vt,Bt,ei,Dt],yi&&!e&&!Vc){dn(Ye,"scrollEnd",F0);return}z0(),In=Ye.isRefreshing=!0,yt.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=ks("refreshInit");T0&&Ye.sort(),t||Dh(),yt.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),_t.slice(0).forEach(function(i){return i.refresh()}),Vc=!1,_t.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Cf=1,Km(!0),_t.forEach(function(i){var s=Xi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Km(!1),Cf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),yt.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),B0(Th,1),Hc.pause(),Ds++,In=2,yr(2),_t.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),In=Ye.isRefreshing=!1,ks("refresh")},Pf=0,wc=1,Ya,yr=function(e){if(e===2||!In&&!Vc){Ye.isUpdating=!0,Ya&&Ya.update(0);var t=_t.length,n=bn(),i=n-td>=50,s=t&&_t[0].scroll();if(wc=Pf>s?-1:1,In||(Pf=s),i&&(yi&&!nu&&n-yi>200&&(yi=0,ks("scrollEnd")),wa=td,td=n),wc<0){for(Dn=t;Dn-- >0;)_t[Dn]&&_t[Dn].update(0,i);wc=1}else for(Dn=0;Dn<t;Dn++)_t[Dn]&&_t[Dn].update(0,i);Ye.isUpdating=!1}fl=0},Lf=[N0,O0,Rh,Ch,hi+qa,hi+Ga,hi+Xa,hi+Wa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Mc=Lf.concat([Ps,Ls,"boxSizing","max"+qo,"max"+Ph,"position",hi,tn,tn+Xa,tn+Ga,tn+qa,tn+Wa]),wA=function(e,t,n){Co(n);var i=e._gsap;if(i.spacerIsNative)Co(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},rd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Lf.length,o=t.style,a=e.style,l;s--;)l=Lf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Rh]=a[Ch]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ps]=Gc(e,On)+rn,o[Ls]=Gc(e,sn)+rn,o[tn]=a[hi]=a[O0]=a[N0]="0",Co(i),a[Ps]=a["max"+qo]=n[Ps],a[Ls]=a["max"+Ph]=n[Ls],a[tn]=n[tn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},MA=/([A-Z])/g,Co=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||ze.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(MA,"-$1").toLowerCase())}},rc=function(e){for(var t=Mc.length,n=e.style,i=[],s=0;s<t;s++)i.push(Mc[s],n[Mc[s]]);return i.t=e,i},EA=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Ec={left:0,top:0},Zm=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Mn(e)&&(e=e(l)),Jn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Sc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,x;if(h&&h.seek(0),isNaN(e)||(e=+e),Ta(e))h&&(e=ze.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&bc(a,n,i,!0);else{Mn(t)&&(t=t(l));var b=(e||"0").split(" "),v,M,T,A;x=zn(t,l)||Dt,v=dr(x)||{},(!v||!v.left&&!v.top)&&pi(x).display==="none"&&(A=x.style.display,x.style.display="block",v=dr(x),A?x.style.display=A:x.style.removeProperty("display")),M=Sc(b[0],v[i.d]),T=Sc(b[1]||"0",n),e=v[i.p]-c[i.p]-u+M+s-T,a&&bc(a,T,i,n-T<20||a._isStart&&T>20),n-=n-T}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var L=e+n,S=o._isStart;m="scroll"+i.d2,bc(o,L,i,S&&L>20||!S&&(d?Math.max(Dt[m],ei[m]):o.parentNode[m])<=L+1),d&&(c=dr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+rn))}return h&&x&&(m=dr(x),h.seek(f),p=dr(x),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},TA=/(webkit|moz|length|cssText|inset)/i,Jm=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Dt){e._stOrig=s.cssText,a=pi(e);for(o in a)!+o&&!TA.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;ze.core.getCache(e).uncache=1,t.appendChild(e)}},H0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},sc=function(e,t,n){var i={};i[t.p]="+="+n,ze.set(e,i)},Qm=function(e,t){var n=Jr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=H0(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){yt.cache++,o.tween&&yr()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=ze.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},dn(e,"wheel",n.wheelHandler),Ye.isTouch&&dn(e,"touchmove",n.wheelHandler),s},Ye=function(){function r(t,n){fo||r.register(ze)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Af(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ma){this.update=this.refresh=this.kill=Hi;return}n=qm(Jn(n)||Ta(n)||n.nodeType?{trigger:n}:n,nc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,x=s.onSnapComplete,b=s.once,v=s.snap,M=s.pinReparent,T=s.pinSpacer,A=s.containerAnimation,L=s.fastScrollEnd,S=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?On:sn,C=!d&&d!==0,w=zn(n.scroller||vt),k=ze.core.getCache(w),G=Us(w),W=("pinType"in n?n.pinType:Yr(w,"pinType")||G&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],j=C&&n.toggleActions.split(" "),I="markers"in n?n.markers:nc.markers,fe=G?0:parseFloat(pi(w)["border"+y.p2+qo])||0,N=this,_e=n.onRefreshInit&&function(){return n.onRefreshInit(N)},He=gA(w,G,y),st=_A(w,G),Z=0,oe=0,Te=0,ue=Jr(w,y),we,Ze,Ae,dt,Je,Ie,U,Tt,ot,q,Se,ct,Ne,Ve,Ct,D,E,H,J,te,ee,ne,ge,Pe,he,de,Me,ye,qe,me,tt,O,xe,ae,Ee,re,ie,Le,Qe;if(N._startClamp=N._endClamp=!1,N._dir=y,m*=45,N.scroller=w,N.scroll=A?A.time.bind(A):ue,dt=ue(),N.vars=n,i=i||n.animation,"refreshPriority"in n&&(T0=1,n.refreshPriority===-9999&&(Ya=N)),k.tweenScroll=k.tweenScroll||{top:Qm(w,sn),left:Qm(w,On)},N.tweenTo=we=k.tweenScroll[y.p],N.scrubDuration=function(ve){xe=Ta(ve)&&ve,xe?O?O.duration(ve):O=ze.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:xe,paused:!0,onComplete:function(){return p&&p(N)}}):(O&&O.progress(1).kill(),O=0)},i&&(i.vars.lazy=!1,i._initted&&!N.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),N.animation=i.pause(),i.scrollTrigger=N,N.scrubDuration(d),me=0,l||(l=i.vars.id)),v&&((!_s(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Dt.style&&ze.set(G?[Dt,ei]:w,{scrollBehavior:"auto"}),yt.forEach(function(ve){return Mn(ve)&&ve.target===(G?Bt.scrollingElement||ei:w)&&(ve.smooth=!1)}),Ae=Mn(v.snapTo)?v.snapTo:v.snapTo==="labels"?yA(i):v.snapTo==="labelsDirectional"?xA(i):v.directional!==!1?function(ve,nt){return Lh(v.snapTo)(ve,bn()-oe<500?0:nt.direction)}:ze.utils.snap(v.snapTo),ae=v.duration||{min:.1,max:2},ae=_s(ae)?Va(ae.min,ae.max):Va(ae,ae),Ee=ze.delayedCall(v.delay||xe/2||.1,function(){var ve=ue(),nt=bn()-oe<500,We=we.tween;if((nt||Math.abs(N.getVelocity())<10)&&!We&&!nu&&Z!==ve){var lt=(ve-Ie)/Ve,Gt=i&&!C?i.totalProgress():lt,ft=nt?0:(Gt-tt)/(bn()-wa)*1e3||0,Pt=ze.utils.clamp(-lt,1-lt,so(ft/2)*ft/.185),P=lt+(v.inertia===!1?0:Pt),z,Q,se=v,Oe=se.onStart,ce=se.onInterrupt,it=se.onComplete;if(z=Ae(P,N),Ta(z)||(z=P),Q=Math.max(0,Math.round(Ie+z*Ve)),ve<=U&&ve>=Ie&&Q!==ve){if(We&&!We._initted&&We.data<=so(Q-ve))return;v.inertia===!1&&(Pt=z-lt),we(Q,{duration:ae(so(Math.max(so(P-Gt),so(z-Gt))*.185/ft/.05||0)),ease:v.ease||"power3",data:so(Q-ve),onInterrupt:function(){return Ee.restart(!0)&&ce&&ce(N)},onComplete:function(){N.update(),Z=ue(),i&&!C&&(O?O.resetTo("totalProgress",z,i._tTime/i._tDur):i.progress(z)),me=tt=i&&!C?i.totalProgress():N.progress,x&&x(N),it&&it(N)}},ve,Pt*Ve,Q-ve-Pt*Ve),Oe&&Oe(N,we.tween)}}else N.isActive&&Z!==ve&&Ee.restart(!0)}).pause()),l&&(Rf[l]=N),f=N.trigger=zn(f||h!==!0&&h),Qe=f&&f._gsap&&f._gsap.stRevert,Qe&&(Qe=Qe(N)),h=h===!0?f:zn(h),Jn(a)&&(a={targets:f,className:a}),h&&(_===!1||_===hi||(_=!_&&h.parentNode&&h.parentNode.style&&pi(h.parentNode).display==="flex"?!1:tn),N.pin=h,Ze=ze.core.getCache(h),Ze.spacer?Ct=Ze.pinState:(T&&(T=zn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),Ze.spacerIsNative=!!T,T&&(Ze.spacerState=rc(T))),Ze.spacer=H=T||Bt.createElement("div"),H.classList.add("pin-spacer"),l&&H.classList.add("pin-spacer-"+l),Ze.pinState=Ct=rc(h)),n.force3D!==!1&&ze.set(h,{force3D:!0}),N.spacer=H=Ze.spacer,qe=pi(h),Pe=qe[_+y.os2],te=ze.getProperty(h),ee=ze.quickSetter(h,y.a,rn),rd(h,H,qe),E=rc(h)),I){ct=_s(I)?qm(I,Ym):Ym,q=ic("scroller-start",l,w,y,ct,0),Se=ic("scroller-end",l,w,y,ct,0,q),J=q["offset"+y.op.d2];var Mt=zn(Yr(w,"content")||w);Tt=this.markerStart=ic("start",l,Mt,y,ct,J,0,A),ot=this.markerEnd=ic("end",l,Mt,y,ct,J,0,A),A&&(Le=ze.quickSetter([Tt,ot],y.a,rn)),!W&&!(ji.length&&Yr(w,"fixedMarkers")===!0)&&(vA(G?Dt:w),ze.set([q,Se],{force3D:!0}),de=ze.quickSetter(q,y.a,rn),ye=ze.quickSetter(Se,y.a,rn))}if(A){var Ce=A.vars.onUpdate,Fe=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){N.update(0,0,1),Ce&&Ce.apply(A,Fe||[])})}if(N.previous=function(){return _t[_t.indexOf(N)-1]},N.next=function(){return _t[_t.indexOf(N)+1]},N.revert=function(ve,nt){if(!nt)return N.kill(!0);var We=ve!==!1||!N.enabled,lt=Sn;We!==N.isReverted&&(We&&(re=Math.max(ue(),N.scroll.rec||0),Te=N.progress,ie=i&&i.progress()),Tt&&[Tt,ot,q,Se].forEach(function(Gt){return Gt.style.display=We?"none":"block"}),We&&(Sn=N,N.update(We)),h&&(!M||!N.isActive)&&(We?wA(h,H,Ct):rd(h,H,pi(h),he)),We||N.update(We),Sn=lt,N.isReverted=We)},N.refresh=function(ve,nt,We,lt){if(!((Sn||!N.enabled)&&!nt)){if(h&&ve&&yi){dn(r,"scrollEnd",F0);return}!In&&_e&&_e(N),Sn=N,we.tween&&!We&&(we.tween.kill(),we.tween=0),O&&O.pause(),g&&i&&i.revert({kill:!1}).invalidate(),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var Gt=He(),ft=st(),Pt=A?A.duration():Xi(w,y),P=Ve<=.01,z=0,Q=lt||0,se=_s(We)?We.end:n.end,Oe=n.endTrigger||f,ce=_s(We)?We.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),it=N.pinnedContainer=n.pinnedContainer&&zn(n.pinnedContainer,N),Xe=f&&Math.max(0,_t.indexOf(N))||0,ke=Xe,Be,R,F,$,Y,B,pe,be,Ge,De,je,rt,$e;for(I&&_s(We)&&(rt=ze.getProperty(q,y.p),$e=ze.getProperty(Se,y.p));ke-- >0;)B=_t[ke],B.end||B.refresh(0,1)||(Sn=N),pe=B.pin,pe&&(pe===f||pe===h||pe===it)&&!B.isReverted&&(De||(De=[]),De.unshift(B),B.revert(!0,!0)),B!==_t[ke]&&(Xe--,ke--);for(Mn(ce)&&(ce=ce(N)),ce=Vm(ce,"start",N),Ie=Zm(ce,f,Gt,y,ue(),Tt,q,N,ft,fe,W,Pt,A,N._startClamp&&"_startClamp")||(h?-.001:0),Mn(se)&&(se=se(N)),Jn(se)&&!se.indexOf("+=")&&(~se.indexOf(" ")?se=(Jn(ce)?ce.split(" ")[0]:"")+se:(z=Sc(se.substr(2),Gt),se=Jn(ce)?ce:(A?ze.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,Ie):Ie)+z,Oe=f)),se=Vm(se,"end",N),U=Math.max(Ie,Zm(se||(Oe?"100% 0":Pt),Oe,Gt,y,ue()+z,ot,Se,N,ft,fe,W,Pt,A,N._endClamp&&"_endClamp"))||-.001,z=0,ke=Xe;ke--;)B=_t[ke],pe=B.pin,pe&&B.start-B._pinPush<=Ie&&!A&&B.end>0&&(Be=B.end-(N._startClamp?Math.max(0,B.start):B.start),(pe===f&&B.start-B._pinPush<Ie||pe===it)&&isNaN(ce)&&(z+=Be*(1-B.progress)),pe===h&&(Q+=Be));if(Ie+=z,U+=z,N._startClamp&&(N._startClamp+=z),N._endClamp&&!In&&(N._endClamp=U||-.001,U=Math.min(U,Xi(w,y))),Ve=U-Ie||(Ie-=.01)&&.001,P&&(Te=ze.utils.clamp(0,1,ze.utils.normalize(Ie,U,re))),N._pinPush=Q,Tt&&z&&(Be={},Be[y.a]="+="+z,it&&(Be[y.p]="-="+ue()),ze.set([Tt,ot],Be)),h&&!(Cf&&N.end>=Xi(w,y)))Be=pi(h),$=y===sn,F=ue(),ne=parseFloat(te(y.a))+Q,!Pt&&U>1&&(je=(G?Bt.scrollingElement||ei:w).style,je={style:je,value:je["overflow"+y.a.toUpperCase()]},G&&pi(Dt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(je.style["overflow"+y.a.toUpperCase()]="scroll")),rd(h,H,Be),E=rc(h),R=dr(h,!0),be=W&&Jr(w,$?On:sn)(),_?(he=[_+y.os2,Ve+Q+rn],he.t=H,ke=_===tn?Gc(h,y)+Ve+Q:0,ke&&(he.push(y.d,ke+rn),H.style.flexBasis!=="auto"&&(H.style.flexBasis=ke+rn)),Co(he),it&&_t.forEach(function(ht){ht.pin===it&&ht.vars.pinSpacing!==!1&&(ht._subPinOffset=!0)}),W&&ue(re)):(ke=Gc(h,y),ke&&H.style.flexBasis!=="auto"&&(H.style.flexBasis=ke+rn)),W&&(Y={top:R.top+($?F-Ie:be)+rn,left:R.left+($?be:F-Ie)+rn,boxSizing:"border-box",position:"fixed"},Y[Ps]=Y["max"+qo]=Math.ceil(R.width)+rn,Y[Ls]=Y["max"+Ph]=Math.ceil(R.height)+rn,Y[hi]=Y[hi+Xa]=Y[hi+Ga]=Y[hi+qa]=Y[hi+Wa]="0",Y[tn]=Be[tn],Y[tn+Xa]=Be[tn+Xa],Y[tn+Ga]=Be[tn+Ga],Y[tn+qa]=Be[tn+qa],Y[tn+Wa]=Be[tn+Wa],D=EA(Ct,Y,M),In&&ue(0)),i?(Ge=i._initted,Qu(1),i.render(i.duration(),!0,!0),ge=te(y.a)-ne+Ve+Q,Me=Math.abs(Ve-ge)>1,W&&Me&&D.splice(D.length-2,2),i.render(0,!0,!0),Ge||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Qu(0)):ge=Ve,je&&(je.value?je.style["overflow"+y.a.toUpperCase()]=je.value:je.style.removeProperty("overflow-"+y.a));else if(f&&ue()&&!A)for(R=f.parentNode;R&&R!==Dt;)R._pinOffset&&(Ie-=R._pinOffset,U-=R._pinOffset),R=R.parentNode;De&&De.forEach(function(ht){return ht.revert(!1,!0)}),N.start=Ie,N.end=U,dt=Je=In?re:ue(),!A&&!In&&(dt<re&&ue(re),N.scroll.rec=0),N.revert(!1,!0),oe=bn(),Ee&&(Z=-1,Ee.restart(!0)),Sn=0,i&&C&&(i._initted||ie)&&i.progress()!==ie&&i.progress(ie||0,!0).render(i.time(),!0,!0),(P||Te!==N.progress||A||g||i&&!i._initted)&&(i&&!C&&i.totalProgress(A&&Ie<-.001&&!Te?ze.utils.normalize(Ie,U,0):Te,!0),N.progress=P||(dt-Ie)/Ve===Te?0:Te),h&&_&&(H._pinOffset=Math.round(N.progress*ge)),O&&O.invalidate(),isNaN(rt)||(rt-=ze.getProperty(q,y.p),$e-=ze.getProperty(Se,y.p),sc(q,y,rt),sc(Tt,y,rt-(lt||0)),sc(Se,y,$e),sc(ot,y,$e-(lt||0))),P&&!In&&N.update(),u&&!In&&!Ne&&(Ne=!0,u(N),Ne=!1)}},N.getVelocity=function(){return(ue()-Je)/(bn()-wa)*1e3||0},N.endAnimation=function(){ma(N.callbackAnimation),i&&(O?O.progress(1):i.paused()?C||ma(i,N.direction<0,1):ma(i,i.reversed()))},N.labelToScroll=function(ve){return i&&i.labels&&(Ie||N.refresh()||Ie)+i.labels[ve]/i.duration()*Ve||0},N.getTrailing=function(ve){var nt=_t.indexOf(N),We=N.direction>0?_t.slice(0,nt).reverse():_t.slice(nt+1);return(Jn(ve)?We.filter(function(lt){return lt.vars.preventOverlaps===ve}):We).filter(function(lt){return N.direction>0?lt.end<=Ie:lt.start>=U})},N.update=function(ve,nt,We){if(!(A&&!We&&!ve)){var lt=In===!0?re:N.scroll(),Gt=ve?0:(lt-Ie)/Ve,ft=Gt<0?0:Gt>1?1:Gt||0,Pt=N.progress,P,z,Q,se,Oe,ce,it,Xe;if(nt&&(Je=dt,dt=A?ue():lt,v&&(tt=me,me=i&&!C?i.totalProgress():ft)),m&&h&&!Sn&&!Jl&&yi&&(!ft&&Ie<lt+(lt-Je)/(bn()-wa)*m?ft=1e-4:ft===1&&U>lt+(lt-Je)/(bn()-wa)*m&&(ft=.9999)),ft!==Pt&&N.enabled){if(P=N.isActive=!!ft&&ft<1,z=!!Pt&&Pt<1,ce=P!==z,Oe=ce||!!ft!=!!Pt,N.direction=ft>Pt?1:-1,N.progress=ft,Oe&&!Sn&&(Q=ft&&!Pt?0:ft===1?1:Pt===1?2:3,C&&(se=!ce&&j[Q+1]!=="none"&&j[Q+1]||j[Q],Xe=i&&(se==="complete"||se==="reset"||se in i))),S&&(ce||Xe)&&(Xe||d||!i)&&(Mn(S)?S(N):N.getTrailing(S).forEach(function(F){return F.endAnimation()})),C||(O&&!Sn&&!Jl?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",ft,i._tTime/i._tDur):(O.vars.totalProgress=ft,O.invalidate().restart())):i&&i.totalProgress(ft,!!(Sn&&(oe||ve)))),h){if(ve&&_&&(H.style[_+y.os2]=Pe),!W)ee(Ea(ne+ge*ft));else if(Oe){if(it=!ve&&ft>Pt&&U+1>lt&&lt+1>=Xi(w,y),M)if(!ve&&(P||it)){var ke=dr(h,!0),Be=lt-Ie;Jm(h,Dt,ke.top+(y===sn?Be:0)+rn,ke.left+(y===sn?0:Be)+rn)}else Jm(h,H);Co(P||it?D:E),Me&&ft<1&&P||ee(ne+(ft===1&&!it?ge:0))}}v&&!we.tween&&!Sn&&!Jl&&Ee.restart(!0),a&&(ce||b&&ft&&(ft<1||!ed))&&dl(a.targets).forEach(function(F){return F.classList[P||b?"add":"remove"](a.className)}),o&&!C&&!ve&&o(N),Oe&&!Sn?(C&&(Xe&&(se==="complete"?i.pause().totalProgress(1):se==="reset"?i.restart(!0).pause():se==="restart"?i.restart(!0):i[se]()),o&&o(N)),(ce||!ed)&&(c&&ce&&nd(N,c),X[Q]&&nd(N,X[Q]),b&&(ft===1?N.kill(!1,1):X[Q]=0),ce||(Q=ft===1?1:3,X[Q]&&nd(N,X[Q]))),L&&!P&&Math.abs(N.getVelocity())>(Ta(L)?L:2500)&&(ma(N.callbackAnimation),O?O.progress(1):ma(i,se==="reverse"?1:!ft,1))):C&&o&&!Sn&&o(N)}if(ye){var R=A?lt/A.duration()*(A._caScrollDist||0):lt;de(R+(q._isFlipped?1:0)),ye(R)}Le&&Le(-lt/A.duration()*(A._caScrollDist||0))}},N.enable=function(ve,nt){N.enabled||(N.enabled=!0,dn(w,"resize",Aa),G||dn(w,"scroll",oo),_e&&dn(r,"refreshInit",_e),ve!==!1&&(N.progress=Te=0,dt=Je=Z=ue()),nt!==!1&&N.refresh())},N.getTween=function(ve){return ve&&we?we.tween:O},N.setPositions=function(ve,nt,We,lt){if(A){var Gt=A.scrollTrigger,ft=A.duration(),Pt=Gt.end-Gt.start;ve=Gt.start+Pt*ve/ft,nt=Gt.start+Pt*nt/ft}N.refresh(!1,!1,{start:Gm(ve,We&&!!N._startClamp),end:Gm(nt,We&&!!N._endClamp)},lt),N.update()},N.adjustPinSpacing=function(ve){if(he&&ve){var nt=he.indexOf(y.d)+1;he[nt]=parseFloat(he[nt])+ve+rn,he[1]=parseFloat(he[1])+ve+rn,Co(he)}},N.disable=function(ve,nt){if(N.enabled&&(ve!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,nt||O&&O.pause(),re=0,Ze&&(Ze.uncache=1),_e&&un(r,"refreshInit",_e),Ee&&(Ee.pause(),we.tween&&we.tween.kill()&&(we.tween=0)),!G)){for(var We=_t.length;We--;)if(_t[We].scroller===w&&_t[We]!==N)return;un(w,"resize",Aa),G||un(w,"scroll",oo)}},N.kill=function(ve,nt){N.disable(ve,nt),O&&!nt&&O.kill(),l&&delete Rf[l];var We=_t.indexOf(N);We>=0&&_t.splice(We,1),We===Dn&&wc>0&&Dn--,We=0,_t.forEach(function(lt){return lt.scroller===N.scroller&&(We=1)}),We||In||(N.scroll.rec=0),i&&(i.scrollTrigger=null,ve&&i.revert({kill:!1}),nt||i.kill()),Tt&&[Tt,ot,q,Se].forEach(function(lt){return lt.parentNode&&lt.parentNode.removeChild(lt)}),Ya===N&&(Ya=0),h&&(Ze&&(Ze.uncache=1),We=0,_t.forEach(function(lt){return lt.pin===h&&We++}),We||(Ze.spacer=0)),n.onKill&&n.onKill(N)},_t.push(N),N.enable(!1,!1),Qe&&Qe(N),i&&i.add&&!Ve){var ut=N.update;N.update=function(){N.update=ut,yt.cache++,Ie||U||N.refresh()},ze.delayedCall(.01,N.update),Ve=.01,Ie=U=0}else N.refresh();h&&bA()},r.register=function(n){return fo||(ze=n||L0(),P0()&&window.document&&r.enable(),fo=Ma),fo},r.defaults=function(n){if(n)for(var i in n)nc[i]=n[i];return nc},r.disable=function(n,i){Ma=0,_t.forEach(function(o){return o[i?"kill":"disable"](n)}),un(vt,"wheel",oo),un(Bt,"scroll",oo),clearInterval(Zl),un(Bt,"touchcancel",Hi),un(Dt,"touchstart",Hi),ec(un,Bt,"pointerdown,touchstart,mousedown",Wm),ec(un,Bt,"pointerup,touchend,mouseup",Xm),Hc.kill(),Ql(un);for(var s=0;s<yt.length;s+=3)tc(un,yt[s],yt[s+1]),tc(un,yt[s],yt[s+2])},r.enable=function(){if(vt=window,Bt=document,ei=Bt.documentElement,Dt=Bt.body,ze&&(dl=ze.utils.toArray,Va=ze.utils.clamp,Af=ze.core.context||Hi,Qu=ze.core.suppressOverwrites||Hi,Th=vt.history.scrollRestoration||"auto",Pf=vt.pageYOffset||0,ze.core.globals("ScrollTrigger",r),Dt)){Ma=1,Ao=document.createElement("div"),Ao.style.height="100vh",Ao.style.position="absolute",z0(),mA(),Qt.register(ze),r.isTouch=Qt.isTouch,Dr=Qt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Tf=Qt.isTouch===1,dn(vt,"wheel",oo),Eh=[vt,Bt,ei,Dt],ze.matchMedia?(r.matchMedia=function(c){var u=ze.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},ze.addEventListener("matchMediaInit",function(){return Dh()}),ze.addEventListener("matchMediaRevert",function(){return k0()}),ze.addEventListener("matchMedia",function(){bs(0,1),ks("matchMedia")}),ze.matchMedia().add("(orientation: portrait)",function(){return id(),id})):console.warn("Requires GSAP 3.11.0 or later"),id(),dn(Bt,"scroll",oo);var n=Dt.hasAttribute("style"),i=Dt.style,s=i.borderTopStyle,o=ze.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=dr(Dt),sn.m=Math.round(a.top+sn.sc())||0,On.m=Math.round(a.left+On.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Dt.setAttribute("style",""),Dt.removeAttribute("style")),Zl=setInterval($m,250),ze.delayedCall(.5,function(){return Jl=0}),dn(Bt,"touchcancel",Hi),dn(Dt,"touchstart",Hi),ec(dn,Bt,"pointerdown,touchstart,mousedown",Wm),ec(dn,Bt,"pointerup,touchend,mouseup",Xm),Ef=ze.utils.checkPrefix("transform"),Mc.push(Ef),fo=bn(),Hc=ze.delayedCall(.2,bs).pause(),ho=[Bt,"visibilitychange",function(){var c=vt.innerWidth,u=vt.innerHeight;Bt.hidden?(zm=c,Hm=u):(zm!==c||Hm!==u)&&Aa()},Bt,"DOMContentLoaded",bs,vt,"load",bs,vt,"resize",Aa],Ql(dn),_t.forEach(function(c){return c.enable(0,1)}),l=0;l<yt.length;l+=3)tc(un,yt[l],yt[l+1]),tc(un,yt[l],yt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(ed=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Zl)||(Zl=i)&&setInterval($m,i),"ignoreMobileResize"in n&&(Tf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ql(un)||Ql(dn,n.autoRefreshEvents||"none"),A0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=zn(n),o=yt.indexOf(s),a=Us(s);~o&&yt.splice(o,a?6:2),i&&(a?ji.unshift(vt,i,Dt,i,ei,i):ji.unshift(s,i))},r.clearMatchMedia=function(n){_t.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Jn(n)?zn(n):n).getBoundingClientRect(),a=o[s?Ps:Ls]*i||0;return s?o.right-a>0&&o.left+a<vt.innerWidth:o.bottom-a>0&&o.top+a<vt.innerHeight},r.positionInViewport=function(n,i,s){Jn(n)&&(n=zn(n));var o=n.getBoundingClientRect(),a=o[s?Ps:Ls],l=i==null?a/2:i in Wc?Wc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/vt.innerWidth:(o.top+l)/vt.innerHeight},r.killAll=function(n){if(_t.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Fs.killAll||[];Fs={},i.forEach(function(s){return s()})}},r}();Ye.version="3.12.7";Ye.saveStyles=function(r){return r?dl(r).forEach(function(e){if(e&&e.style){var t=Zn.indexOf(e);t>=0&&Zn.splice(t,5),Zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),ze.core.getCache(e),Af())}}):Zn};Ye.revert=function(r,e){return Dh(!r,e)};Ye.create=function(r,e){return new Ye(r,e)};Ye.refresh=function(r){return r?Aa(!0):(fo||Ye.register())&&bs(!0)};Ye.update=function(r){return++yt.cache&&yr(r===!0?2:0)};Ye.clearScrollMemory=B0;Ye.maxScroll=function(r,e){return Xi(r,e?On:sn)};Ye.getScrollFunc=function(r,e){return Jr(zn(r),e?On:sn)};Ye.getById=function(r){return Rf[r]};Ye.getAll=function(){return _t.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ye.isScrolling=function(){return!!yi};Ye.snapDirectional=Lh;Ye.addEventListener=function(r,e){var t=Fs[r]||(Fs[r]=[]);~t.indexOf(e)||t.push(e)};Ye.removeEventListener=function(r,e){var t=Fs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ye.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=ze.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),dn(Ye,"refresh",function(){return s=e.batchMax()})),dl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ye.create(c))}),t};var eg=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},sd=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Qt.isTouch?" pinch-zoom":""):"none",e===ei&&r(Dt,t)},oc={auto:1,scroll:1},AA=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||ze.core.getCache(s),a=bn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Dt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(oc[(l=pi(s)).overflowY]||oc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Us(s)&&(oc[(l=pi(s)).overflowY]||oc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},V0=function(e,t,n,i){return Qt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&AA,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&dn(Bt,Qt.eventTypes[0],ng,!1,!0)},onDisable:function(){return un(Bt,Qt.eventTypes[0],ng,!0)}})},CA=/(input|label|select|textarea)/i,tg,ng=function(e){var t=CA.test(e.target.tagName);(t||tg)&&(e._gsapAllow=!0,tg=t)},RA=function(e){_s(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=zn(e.target)||ei,u=ze.core.globals().ScrollSmoother,d=u&&u.get(),f=Dr&&(e.content&&zn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Jr(c,sn),_=Jr(c,On),g=1,m=(Qt.isTouch&&vt.visualViewport?vt.visualViewport.scale*vt.visualViewport.width:vt.outerWidth)/vt.innerWidth,p=0,x=Mn(i)?function(){return i(a)}:function(){return i||2.8},b,v,M=V0(c,e.type,!0,s),T=function(){return v=!1},A=Hi,L=Hi,S=function(){l=Xi(c,sn),L=Va(Dr?1:0,l),n&&(A=Va(0,Xi(c,On))),b=Ds},y=function(){f._gsap.y=Ea(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},C=function(){if(v){requestAnimationFrame(T);var I=Ea(a.deltaY/2),fe=L(h.v-I);if(f&&fe!==h.v+h.offset){h.offset=fe-h.v;var N=Ea((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",f._gsap.y=N+"px",h.cacheID=yt.cache,yr()}return!0}h.offset&&y(),v=!0},w,k,G,W,X=function(){S(),w.isActive()&&w.vars.scrollY>l&&(h()>l?w.progress(1)&&h(l):w.resetTo("scrollY",l))};return f&&ze.set(f,{y:"+=0"}),e.ignoreCheck=function(j){return Dr&&j.type==="touchmove"&&C()||g>1.05&&j.type!=="touchstart"||a.isGesturing||j.touches&&j.touches.length>1},e.onPress=function(){v=!1;var j=g;g=Ea((vt.visualViewport&&vt.visualViewport.scale||1)/m),w.pause(),j!==g&&sd(c,g>1.01?!0:n?!1:"x"),k=_(),G=h(),S(),b=Ds},e.onRelease=e.onGestureStart=function(j,I){if(h.offset&&y(),!I)W.restart(!0);else{yt.cache++;var fe=x(),N,_e;n&&(N=_(),_e=N+fe*.05*-j.velocityX/.227,fe*=eg(_,N,_e,Xi(c,On)),w.vars.scrollX=A(_e)),N=h(),_e=N+fe*.05*-j.velocityY/.227,fe*=eg(h,N,_e,Xi(c,sn)),w.vars.scrollY=L(_e),w.invalidate().duration(fe).play(.01),(Dr&&w.vars.scrollY>=l||N>=l-1)&&ze.to({},{onUpdate:X,duration:fe})}o&&o(j)},e.onWheel=function(){w._ts&&w.pause(),bn()-p>1e3&&(b=0,p=bn())},e.onChange=function(j,I,fe,N,_e){if(Ds!==b&&S(),I&&n&&_(A(N[2]===I?k+(j.startX-j.x):_()+I-N[1])),fe){h.offset&&y();var He=_e[2]===fe,st=He?G+j.startY-j.y:h()+fe-_e[1],Z=L(st);He&&st!==Z&&(G+=Z-st),h(Z)}(fe||I)&&yr()},e.onEnable=function(){sd(c,n?!1:"x"),Ye.addEventListener("refresh",X),dn(vt,"resize",X),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),M.enable()},e.onDisable=function(){sd(c,!0),un(vt,"resize",X),Ye.removeEventListener("refresh",X),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new Qt(e),a.iOS=Dr,Dr&&!h()&&h(1),Dr&&ze.ticker.add(Hi),W=a._dc,w=ze.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:H0(h,h(),function(){return w.pause()})},onUpdate:yr,onComplete:W.vars.onComplete}),a};Ye.sort=function(r){if(Mn(r))return _t.sort(r);var e=vt.pageYOffset||0;return Ye.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+vt.innerHeight}),_t.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ye.observe=function(r){return new Qt(r)};Ye.normalizeScroll=function(r){if(typeof r>"u")return Ln;if(r===!0&&Ln)return Ln.enable();if(r===!1){Ln&&Ln.kill(),Ln=r;return}var e=r instanceof Qt?r:RA(r);return Ln&&Ln.target===e.target&&Ln.kill(),Us(e.target)&&(Ln=e),e};Ye.core={_getVelocityProp:Mf,_inputObserver:V0,_scrollers:yt,_proxies:ji,bridge:{ss:function(){yi||ks("scrollStart"),yi=bn()},ref:function(){return Sn}}};L0()&&ze.registerPlugin(Ye);const PA=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ye,default:Ye},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var LA=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,DA=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,IA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,NA=/(^[#\.][a-z]|[a-y][a-z])/i,OA=Math.PI/180,ac=Math.sin,lc=Math.cos,$a=Math.abs,ga=Math.sqrt,ig=function(e){return typeof e=="string"},G0=function(e){return typeof e=="number"},rg=1e5,Lr=function(e){return Math.round(e*rg)/rg||0};function UA(r){r=ig(r)&&NA.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=$r(r)):r?ig(r)?$r(r):G0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ca(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var FA=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},kA={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},BA=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function W0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,x,b,v,M,T,A,L,S;return t==="path"||!r.getBBox?r:(c=FA(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),S=BA(r,kA[t]),t==="rect"?(a=S.rx,l=S.ry||a,s=S.x,o=S.y,h=S.width-a*2,_=S.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,x=p+a*n,b=p+a,v=o+l*(1-n),M=o+l,T=M+_,A=T+l*n,L=T+l,i="M"+b+","+M+" V"+T+" C"+[b,A,x,L,p,L,p-(p-m)/3,L,m+(p-m)/3,L,m,L,g,L,s,A,s,T,s,T-(T-M)/3,s,M+(T-M)/3,s,M,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,x,o,b,v,b,M].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=S.r,d=a*n):(a=S.rx,l=S.ry,d=l*n),s=S.cx,o=S.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+S.x1+","+S.y1+" L"+S.x2+","+S.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(DA)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",Ro(c._gsRawPath=$r(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function zA(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=$a(t),n=$a(n);var c=i%360*OA,u=lc(c),d=ac(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,x=m*m,b=p*p,v=x/(t*t)+b/(n*n);v>1&&(t=ga(v)*t,n=ga(v)*n);var M=t*t,T=n*n,A=(M*T-M*b-T*x)/(M*b+T*x);A<0&&(A=0);var L=(s===o?-1:1)*ga(A),S=L*(t*p/n),y=L*-(n*m/t),C=(r+a)/2,w=(e+l)/2,k=C+(u*S-d*y),G=w+(d*S+u*y),W=(m-S)/t,X=(p-y)/n,j=(-m-S)/t,I=(-p-y)/n,fe=W*W+X*X,N=(X<0?-1:1)*Math.acos(W/ga(fe)),_e=(W*I-X*j<0?-1:1)*Math.acos((W*j+X*I)/ga(fe*(j*j+I*I)));isNaN(_e)&&(_e=f),!o&&_e>0?_e-=h:o&&_e<0&&(_e+=h),N%=h,_e%=h;var He=Math.ceil($a(_e)/(h/4)),st=[],Z=_e/He,oe=4/3*ac(Z/2)/(1+lc(Z/2)),Te=u*t,ue=d*t,we=d*-n,Ze=u*n,Ae;for(Ae=0;Ae<He;Ae++)i=N+Ae*Z,m=lc(i),p=ac(i),W=lc(i+=Z),X=ac(i),st.push(m-oe*p,p+oe*m,W+oe*X,X-oe*W,W,X);for(Ae=0;Ae<st.length;Ae+=2)m=st[Ae],p=st[Ae+1],st[Ae]=m*Te+p*we+k,st[Ae+1]=m*ue+p*Ze+G;return st[Ae-2]=a,st[Ae-1]=l,st}}function $r(r){var e=(r+"").replace(IA,function(S){var y=+S;return y<1e-4&&y>-1e-4?0:y}).match(LA)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,x,b,v,M,T,A,L=function(y,C,w,k){x=(w-y)/3,b=(k-C)/3,g.push(y+x,C+b,w-x,k-b,w,k)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(M=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")x=n,b=i,(M==="C"||M==="S")&&(x+=n-g[g.length-4],b+=i-g[g.length-3]),_||(n=i=0),g.push(x,b,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")x=n+(d-n)*s,b=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(x,b,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")x=n-g[g.length-4],b=i-g[g.length-3],g.push(n+x,i+b,d+(n+x*1.5-d)*s,f+(i+b*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")L(n,i,n=d,i),c+=1;else if(h==="V")L(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||$a(n-d)>.5||$a(i-f)>.5)&&(L(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(T=e[c+4],A=e[c+5],x=e[c+6],b=e[c+7],u=7,T.length>1&&(T.length<3?(b=x,x=A,u--):(b=A,x=T.substr(2),u-=2),A=T.charAt(1),T=T.charAt(0)),v=zA(n,i,+e[c+1],+e[c+2],+e[c+3],+T,+A,(_?n:0)+x*1,(_?i:0)+b*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Ro(r){G0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Lr(o[0])+","+Lr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Lr(o[s++])+","+Lr(o[s++])+" "+Lr(o[s++])+","+Lr(o[s++])+" "+Lr(o[s++])+","+Lr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ri,Ih,Ra,X0,Pa,q0=function(){return Ri||typeof window<"u"&&(Ri=window.gsap)&&Ri.registerPlugin&&Ri},od=function(e){return typeof e=="function"},ws=Math.atan2,sg=Math.cos,og=Math.sin,gr=Math.sqrt,iu=Math.PI,ag=iu*2,HA=iu*.3,VA=iu*.7,Y0=1e20,hl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,GA=/(^[#\.][a-z]|[a-y][a-z])/i,WA=/[achlmqstvz]/i,Hr=function(e){return console&&console.warn(e)},XA=1,lg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Po=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},ja=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,x,b,v,M,T,A,L;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],x=h[f+1],b=h[f+2]-p,T=h[f+3]-x,v=h[f+4]-p,A=h[f+5]-x,M=h[f+6]-p,L=h[f+7]-x,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*M+3*m*(g*v+m*b))*g+p,d=(g*g*L+3*m*(g*A+m*T))*g+x,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},qA=function(e,t){return t.length-e.length},cg=function(e,t){var n=e.size||Po(e),i=t.size||Po(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},ug=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},ad=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=gr(d*d+f*f);return a},YA=function(e,t,n){var i=e.length,s=lg(e),o=lg(t),a=o[0]-s[0],l=o[1]-s[1],c=ad(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=ad(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Ca(d),h=6;h<i;h+=6)f=ad(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},$A=function(e,t,n){for(var i=e.length,s=Y0,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=gr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},jA=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Po(e),t[n].size||Po(t[n]))*i,u=Y0,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||Po(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=gr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},ld=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,x,b,v;for(b=2;b<s;b+=6)for(n+=o;n>i;)a=e[b-2],l=e[b-1],c=e[b],u=e[b+1],d=e[b+2],f=e[b+3],h=e[b+4],_=e[b+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,x=u+(f-u)*v,m+=(x-m)*v,x+=(f+(_-f)*v-x)*v,e.splice(b,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(x-m)*v,p,x,d+(h-d)*v,f+(_-f)*v),b+=6,s+=6,n--;return e},Df=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?qA:cg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,x,b,v,M,T;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),M=a.size||ja(a),M=l.size||ja(l),M=a.centerX-l.centerX,T=a.centerY-l.centerY,u===cg))for(f=0;f<l.length;f++)a.splice(f,0,jA(l[f],a,f,d,M,T));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&ld(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)b=a[f].size||Po(a[f]),x=$A(l,a[f].centerX,a[f].centerY),b=x[0],v=x[1],l[f++]=[b,v,b,v,b,v,b,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?ld(m,-o/6|0):o>0&&ld(p,o/6|0),_&&s!==!1&&!p.reversed&&Ca(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=YA(p,m,!f||s===!1),n<0&&(_=!0,Ca(p),n=-n),ug(p,n*6)):n!=="reverse"&&(f&&n<0&&Ca(p),ug(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ca(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Hr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},dg=function(e,t,n,i,s){var o=$r(e[0]),a=$r(e[1]);Df(o,a,t||t===0?t:"auto",n,s)&&(e[0]=Ro(o),e[1]=Ro(a),(i==="log"||i===!0)&&Hr('precompile:["'+e[0]+'","'+e[1]+'"]'))},KA=function(e,t){if(!t)return e;var n=e.match(hl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},fg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},If=function(e){var t=e[0].match(hl)||[],n=e[1].match(hl)||[],i=n.length-t.length;i>0?e[0]=fg(t,i):e[1]=fg(n,-i)},ZA=function(e){return isNaN(e)?If:function(t){If(t),t[1]=KA(t[1],parseInt(e,10))}},JA=function(e,t,n){var i=typeof e=="string",s,o;return(!i||GA.test(e)||(e.match(hl)||[]).length<3)&&(s=Ih(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=W0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(Hr("WARNING: invalid morph to: "+e),e=!1)),e},hg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=ws(l,a),_=ws(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=gr(a*a+l*l),m[d+3]=gr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=ws(l,a),_=ws(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=gr(a*a+l*l),m[3]=gr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},pg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},QA=function(e){return e!==e%iu?e+(e<0?ag:-ag):e},mg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",eC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=gr(a*a+l*l),u=ws(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=ws(l,a)-u,f=QA(d),!i&&Ra&&Math.abs(f+Ra.ca)<HA&&(i=Ra),this._anchorPT=Ra={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>VA?d:f,sl:c,cl:gr(a*a+l*l)-c,i:n}},gg=function(e){Ri=q0(),Pa=Pa||Ri&&Ri.plugins.morphSVG,Ri&&Pa?(Ih=Ri.utils.toArray,Pa.prototype._tweenRotation=eC,X0=1):e&&Hr("Please gsap.registerPlugin(MorphSVGPlugin)")},yo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ri=e,Pa=t,gg()},init:function(e,t,n,i,s){if(X0||gg(1),!t)return Hr("invalid shape"),!1;od(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,x,b,v,M,T,A,L,S,y,C;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=od(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var w=e.nodeType?window.getComputedStyle(e):{},k=w.fill+"",G=!(k==="none"||(k.match(hl)||[])[3]==="0"||w.fillRule==="evenodd"),W=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return Hr("Cannot morph a <"+o+"> element. "+mg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!od(e.setAttribute))return!1;if(c=JA(t.shape||t.d||t.points||"",a==="d",e),u&&WA.test(c))return Hr("A <"+o+"> cannot accept path data. "+mg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||yo.defaultMap,this._prop=t.prop,this._render=t.render||yo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:yo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,T=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=$r(T?t.precompile[0]:g),m=$r(T?t.precompile[1]:c),!T&&!Df(g,m,d,f,G))return!1;for((t.precompile==="log"||t.precompile===!0)&&Hr('precompile:["'+Ro(g)+'","'+Ro(m)+'"]'),y=(t.type||yo.defaultType)!=="linear",y&&(g=hg(g,t.smoothTolerance),m=hg(m,t.smoothTolerance),g.size||ja(g),m.size||ja(m),S=pg(W[0]),this._origin=g.origin={x:g.left+S.x*g.width,y:g.top+S.y*g.height},W[1]&&(S=pg(W[1])),this._eOrigin={x:m.left+S.x*m.width,y:m.top+S.y*m.height}),this._rawPath=e._gsRawPath=g,x=g.length;--x>-1;)for(v=g[x],M=m[x],h=v.isSmooth||[],_=M.isSmooth||[],b=v.length,Ra=0,p=0;p<b;p+=2)(M[p]!==v[p]||M[p+1]!==v[p+1])&&(y?h[p]&&_[p]?(A=v.smoothData,L=M.smoothData,C=p+(p===b-4?7-b:5),this._controlPT={_next:this._controlPT,i:p,j:x,l1s:A[p+1],l1c:L[p+1]-A[p+1],l2s:A[C],l2c:L[C]-A[C]},l=this._tweenRotation(v,M,p+2),this._tweenRotation(v,M,p,l),this._tweenRotation(v,M,C-1,l),p+=4):this._tweenRotation(v,M,p):(l=this.add(v,p,v[p],M[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],M[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,ZA(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return XA},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,x,b,v,M;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+sg(_)*h,s.t[s.i+1]=t._origin.y+og(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],M=g+(g===f.length-4?7-f.length:5),_=ws(f[M]-f[g+1],f[M-1]-f[g]),b=og(_),v=sg(_),p=f[g+2],x=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=x-b*h,h=i.l2s+d*i.l2c,f[M-1]=p+v*h,f[M]=x+b*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:UA,stringToRawPath:$r,rawPathToString:Ro,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return dg(o,i,s),o},pathFilter:dg,pointsFilter:If,getTotalSize:ja,equalizeSegmentQuantity:Df,convertToPath:function(e,t){return Ih(e).map(function(n){return W0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};q0()&&Ri.registerPlugin(yo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function tC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function _g(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function vg(r,e,t){return e&&_g(r.prototype,e),t&&_g(r,t),r}function nC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function yg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function xg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?yg(Object(t),!0).forEach(function(n){nC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):yg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function $0(r,e){return rC(r)||oC(r,e)||j0(r,e)||lC()}function Nn(r){return iC(r)||sC(r)||j0(r)||aC()}function iC(r){if(Array.isArray(r))return Nf(r)}function rC(r){if(Array.isArray(r))return r}function sC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function oC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function j0(r,e){if(r){if(typeof r=="string")return Nf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Nf(r,e)}}function Nf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function aC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function lC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ms(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function vl(r){return typeof r=="string"}function Nh(r){return Array.isArray(r)}function cc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Ms(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(vl(t)||Nh(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Oh(r){var e=vl(r)||Nh(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function ru(r){return r!==null&&typeof r=="object"}function cC(r){return ru(r)&&/^(1|3|11)$/.test(r.nodeType)}function uC(r){return typeof r=="number"&&r>-1&&r%1===0}function dC(r){return ru(r)&&uC(r.length)}function Bs(r){return Nh(r)?r:r==null?[]:dC(r)?Array.prototype.slice.call(r):[r]}function Sg(r){var e=r;return vl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Bs(e).reduce(function(t,n){return[].concat(Nn(t),Nn(Bs(n).filter(cC)))},[])}var fC=Object.entries,Xc="_splittype",Ii={},hC=0;function qi(r,e,t){if(!ru(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Xc]||(r[Xc]=++hC),i=Ii[n]||(Ii[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Ii[n]=xg(xg({},i),e)):e!==void 0&&(i[e]=t),t}function Es(r,e){var t=ru(r)?r[Xc]:null,n=t&&Ii[t]||{};return n}function K0(r){var e=r&&r[Xc];e&&(delete r[e],delete Ii[e])}function pC(){Object.keys(Ii).forEach(function(r){delete Ii[r]})}function mC(){fC(Ii).forEach(function(r){var e=$0(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Ii[t]=null,delete Ii[t])})}function gC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Uh="\\ud800-\\udfff",Z0="\\u0300-\\u036f\\ufe20-\\ufe23",J0="\\u20d0-\\u20f0",Q0="\\ufe0e\\ufe0f",_C="[".concat(Uh,"]"),Of="[".concat(Z0).concat(J0,"]"),Uf="\\ud83c[\\udffb-\\udfff]",vC="(?:".concat(Of,"|").concat(Uf,")"),ev="[^".concat(Uh,"]"),tv="(?:\\ud83c[\\udde6-\\uddff]){2}",nv="[\\ud800-\\udbff][\\udc00-\\udfff]",iv="\\u200d",rv="".concat(vC,"?"),sv="[".concat(Q0,"]?"),yC="(?:"+iv+"(?:"+[ev,tv,nv].join("|")+")"+sv+rv+")*",xC=sv+rv+yC,SC="(?:".concat(["".concat(ev).concat(Of,"?"),Of,tv,nv,_C].join("|"),`
)`),bC=RegExp("".concat(Uf,"(?=").concat(Uf,")|").concat(SC).concat(xC),"g"),wC=[iv,Uh,Z0,J0,Q0],MC=RegExp("[".concat(wC.join(""),"]"));function EC(r){return r.split("")}function ov(r){return MC.test(r)}function TC(r){return r.match(bC)||[]}function AC(r){return ov(r)?TC(r):EC(r)}function CC(r){return r==null?"":String(r)}function RC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=CC(r),r&&vl(r)&&!e&&ov(r)?AC(r):r.split(e)}function Ff(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=vl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Nn(Bs(s))):t.setAttribute(n,s))}),t}var Fh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function PC(r,e){e=Ms(Fh,e);var t=Oh(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=gC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=RC(c).map(function(_){var g=Ff(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return qi(g,"isChar",!0),a=[].concat(Nn(a),[g]),g})),t.words||t.lines?(f=Ff(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),qi(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function av(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return PC(r,e);var i=Bs(r.childNodes);if(i.length&&(qi(r,"isSplit",!0),!Es(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";qi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=av(d,e),h=f.words,_=f.chars;return{words:[].concat(Nn(u.words),Nn(h)),chars:[].concat(Nn(u.chars),Nn(_))}},n)}function LC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=$0(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function lv(r){Es(r).isWord?(K0(r),r.replaceWith.apply(r,Nn(r.childNodes))):Bs(r.children).forEach(function(e){return lv(e)})}var DC=function(){return document.createDocumentFragment()};function IC(r,e,t){var n=Oh(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=DC(),m=window.getComputedStyle(r),p=m.textAlign,x=parseFloat(m.fontSize),b=x*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,qi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Bs(s).forEach(function(v){var M=v.parentElement===r,T=LC(v,M,e,t),A=T.width,L=T.height,S=T.top,y=T.left;/^br$/i.test(v.nodeName)||(n.lines&&M&&((l===null||S-l>=b)&&(l=S,o.push(a=[])),a.push(v)),e.absolute&&qi(v,{top:S,left:y,width:A,height:L}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var M=Ff(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});qi(M,"isLine",!0);var T={height:0,top:1e4};return g.appendChild(M),v.forEach(function(A,L,S){var y=Es(A),C=y.isWordEnd,w=y.top,k=y.height,G=S[L+1];T.height=Math.max(T.height,k),T.top=Math.min(T.top,w),M.appendChild(A),C&&Es(G).isWordStart&&M.append(" ")}),e.absolute&&qi(M,{height:T.height,top:T.top}),M}),n.words||lv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Bs(s).forEach(function(v){var M=Es(v),T=M.isLine,A=M.top,L=M.left,S=M.width,y=M.height,C=Es(v.parentElement),w=!T&&C.isLine;v.style.top="".concat(w?A-C.top:A,"px"),v.style.left=T?"".concat(d.left,"px"):"".concat(L-(w?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=T?"".concat(d.width,"px"):"".concat(S,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var ao=Ms(Fh,{}),Jo=function(){vg(r,null,[{key:"clearData",value:function(){pC()}},{key:"setDefaults",value:function(t){return ao=Ms(ao,cc(t)),Fh}},{key:"revert",value:function(t){Sg(t).forEach(function(n){var i=Es(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",K0(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Ii}},{key:"defaults",get:function(){return ao},set:function(t){ao=Ms(ao,cc(t))}}]);function r(e,t){tC(this,r),this.isSplit=!1,this.settings=Ms(ao,cc(t)),this.elements=Sg(e),this.split()}return vg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){qi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Ms(this.settings,cc(t)));var s=Oh(this.settings.types);s.none||(this.elements.forEach(function(o){qi(o,"isRoot",!0);var a=av(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Nn(n.words),Nn(l)),n.chars=[].concat(Nn(n.chars),Nn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=IC(o,n.settings,i);n.lines=[].concat(Nn(n.lines),Nn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),mC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();Ue.registerPlugin(Ye);Ue.registerPlugin(yo);let _a={year:2026},lo=null,Ti=null;function kf(){Ti&&(Ti.kill(),Ti=null,console.log("Killed previous hero heading fade ScrollTrigger."));const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){console.log("Hero heading characters not found, attempting re-split...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new Jo(r,{types:"words,chars",absolute:!1}).chars,Ue.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"}),console.log("Hero heading re-split successfully.")}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Ue.timeline({paused:!0});n.to(t,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),Ti=Ye.create({animation:n,trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.direction===-1&&i.progress<.1&&Ue.set(e,{opacity:1,z:0})},onRefresh:i=>{const s=i.progress;n.progress(s),console.log(`Hero fade ScrollTrigger refreshed. Progress set to: ${s.toFixed(2)}`)}}),console.log("Hero heading fade animation set up.")}else console.warn("#hero-area h1 not found for fade animation setup.")}function NC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),s=document.querySelector("button.enter-experience");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),t&&Ue.set(t,{opacity:0,autoAlpha:0}),i&&Ue.set(i,{opacity:0,autoAlpha:0}),s&&Ue.set(s,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Ye.getAll().forEach(f=>{(f.vars.trigger==="#hero-area"||f.vars.trigger==="#hero-travel-area")&&f.kill()});const o=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",o),e.innerHTML="",o.split("").forEach(f=>{const h=document.createElement("span");h.className="digit",h.textContent=f,h.setAttribute("data-digit",f),e.appendChild(h)}),Ue.set(e,{opacity:0,autoAlpha:0}),Ue.set(r,{opacity:0,autoAlpha:0});const a=new Jo(r,{types:"words,chars",absolute:!1});Ue.set(a.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const l=Ue.timeline({delay:.5});l.to(r,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"});const c=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(c)},840);const u=[...a.chars];for(let f=u.length-1;f>0;f--){const h=Math.floor(Math.random()*(f+1));[u[f],u[h]]=[u[h],u[f]]}l.to(u,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const f=new CustomEvent("particleFadeStart");document.dispatchEvent(f)}}),l.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"}),Ue.set(n,{opacity:1,autoAlpha:1});const d=e.querySelectorAll(".digit");l.fromTo(d,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{window.heroAnimationComplete=!0;const f=new CustomEvent("heroAnimationComplete");document.dispatchEvent(f)}},"-=0.6"),s&&Ue.to(s,{opacity:1,autoAlpha:1,duration:.8,delay:3.8,ease:"power2.out"}),s&&s.addEventListener("click",()=>{t&&Ue.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),i&&Ue.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.enterButtonClicked=!0,window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Ue.to(s,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(Ue.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0}}),Ye.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=.44+f.progress*.56;e.querySelectorAll(".digit").forEach(m=>{m.style.opacity=_})}}),Ye.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=1-f.progress;e.style.opacity=_}}))}function OC(){console.log("Initializing animations"),UC(),Ye.refresh(),Ye.clearMatchMedia(),console.log("Killing all existing ScrollTriggers..."),Ye.getAll().forEach(y=>y.kill()),lo=null,Ti=null,_a.year=2026,Ue.registerPlugin(Ye),Ue.registerPlugin(Jo),NC(),kC(),bg(),BC(),wg(),FC(),qc(null),Yc(null),Mg(),zC(),HC(),GC();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const y=document.querySelector("nav"),C=document.querySelector("header");y&&y.classList.toggle("active"),C&&C.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const y=window.scrollY,C=document.querySelector("header.anniversary");C&&(y>e?C.classList.remove("active"):C.classList.add("active")),e=y});const t=document.querySelector("button.close-menu");t&&t.addEventListener("click",()=>{const y=document.querySelector("nav"),C=document.querySelector("header");y&&y.classList.remove("active"),C&&C.classList.remove("nav-active")}),kf();const n=document.querySelector("#hero-number");n?(console.log("Setting up hero number countdown animation."),console.log(`Initial heroYearObj.year: ${_a.year}`),lo?(console.log("Hero number tween already exists, ensuring it is active."),lo.scrollTrigger&&lo.scrollTrigger.enable(),lo.resume()):(console.log("Creating hero number tween..."),lo=Ue.to(_a,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(y){const C=Math.round(_a.year).toString(),w=n.querySelectorAll(".digit"),k=C.split("");w.length!==k.length?(n.innerHTML="",k.forEach(G=>{const W=document.createElement("span");W.className="digit",W.textContent=G,W.setAttribute("data-digit",G),n.appendChild(W)})):w.forEach((G,W)=>{G.textContent!==k[W]&&(G.textContent=k[W],G.setAttribute("data-digit",k[W]))})},onRefresh:y=>{console.log(`Hero Number ST Refreshed -> Progress: ${y.progress.toFixed(3)}, Year: ${_a.year.toFixed(0)}`)}}}))):console.warn("#hero-number element not found for countdown animation."),document.querySelectorAll(".pin-top-top").forEach(function(y){let C=y.parentElement;y.id==="hero-area"?Ye.create({trigger:C,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:w=>{w.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ye.create({trigger:C,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(y){Ue.set(y,{opacity:0}),Ue.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(y){Ue.set(y,{opacity:0}),Ue.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(y){let C=y.parentElement;Ye.create({trigger:C,start:"top center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(y){let C=y.parentElement;Ye.create({trigger:C,start:"center center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(y){let C=y.parentElement;Ye.create({trigger:C,start:"bottom bottom",end:"",pin:y,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=Ue.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=y=>{const C=window.location.pathname,w=window.location.hostname;return w==="localhost"||w.includes("127.0.0.1")?`/audio/${y}`:C.includes("/150-lab/")?`/150-lab/assets/audio/${y}`:C.includes("/content/")||w.includes("acs.org")?`/150-lab/assets/audio/${y}`:`/assets/audio/${y}`},a=new Audio(o("ui-click.mp3"));a.volume=.38;const l=()=>{if(!window.audioMuted)try{const y=a.cloneNode();y.volume=.38,y.play().catch(C=>{console.warn("UI click sound play was prevented:",C)})}catch(y){console.error("Error playing UI click sound:",y)}},c=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(w=>{w.addEventListener("click",k=>{if(w.classList.contains("enter-experience")){w.dataset.clickSoundPlayed||(window.audioMuted||l(),w.dataset.clickSoundPlayed="true");return}window.audioMuted||l()})}),new MutationObserver(w=>{w.forEach(k=>{k.type==="childList"&&k.addedNodes.forEach(G=>{G.nodeType===1&&(G.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&G.addEventListener("click",X=>{if(G.classList.contains("enter-experience")){G.dataset.clickSoundPlayed||(window.audioMuted||l(),G.dataset.clickSoundPlayed="true");return}window.audioMuted||l()}),G.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(X=>{X.addEventListener("click",j=>{if(X.classList.contains("enter-experience")){X.dataset.clickSoundPlayed||(window.audioMuted||l(),X.dataset.clickSoundPlayed="true");return}window.audioMuted||l()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},u=y=>{window.userInteracted=!0,window.enterButtonClicked&&!window.audioInitialized&&window.heroAnimationComplete&&!window.audioMuted&&window.playBackgroundAudio(!0)};document.addEventListener("click",u),document.addEventListener("touchstart",u),document.addEventListener("keydown",u);const d=document.querySelector(".sound-toggle");d&&d.addEventListener("click",()=>{l(),d.classList.toggle("muted"),window.audioMuted=d.classList.contains("muted"),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0,window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))):(s.resume(),!window.audioInitialized&&window.enterButtonClicked&&window.backgroundAudio?(window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):!window.audioMuted&&window.enterButtonClicked&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retry audio playback attempt from toggle..."),window.playBackgroundAudio(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500))):window.audioInitialized&&window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(y=>{console.warn("Audio play was prevented:",y),window.audioInitialized=!1,window.enterButtonClicked&&window.playBackgroundAudio(!0)})))});const f=document.querySelector(".section-timeline .page-nav"),h=f.querySelectorAll("a"),_=document.querySelector(".section-timeline .indicator .active-title"),g=document.querySelector(".section-timeline .indicator-wrapper"),m=document.querySelector(".timeline-nav-wrapper");let p=!1,x=!1,b;Ue.set(h,{opacity:0,x:-20}),Ue.set(_,{opacity:1});const v=()=>{b&&(clearTimeout(b),b=null),Ue.killTweensOf(_),Ue.killTweensOf(h)},M=()=>{v(),x?(p=!0,Ue.set(_,{opacity:0}),Ue.to(h,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})):(p=!1,Ue.to(h,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{!p&&!x&&Ue.to(_,{opacity:1,duration:.4,ease:"power2.out"})}}))},T=y=>{const C=m||g,w=m?null:f;if(!C)return!1;const k=C.getBoundingClientRect();let G=null;w&&(G=w.getBoundingClientRect());const W=y.clientX,X=y.clientY,j=W>=k.left&&W<=k.right&&X>=k.top&&X<=k.bottom;let I=!1;return G&&(I=W>=G.left&&W<=G.right&&X>=G.top&&X<=G.bottom),j||I},A=y=>{const C=x;x=T(y),C!==x&&(clearTimeout(b),b=setTimeout(()=>{M()},16))};document.removeEventListener("mousemove",A),document.addEventListener("mousemove",A);const L=[m,g,f].filter(Boolean);L.forEach(y=>{y&&(y.addEventListener("mouseenter",()=>{x=!0,M()}),y.addEventListener("mouseleave",()=>{setTimeout(()=>{y.getBoundingClientRect();const C=event.clientX||0,w=event.clientY||0;let k=!1;L.forEach(G=>{if(G){const W=G.getBoundingClientRect();C>=W.left&&C<=W.right&&w>=W.top&&w<=W.bottom&&(k=!0)}}),k||(x=!1,M())},50)}))}),h.forEach(y=>{const C=y.onclick;C&&y.removeEventListener("click",C),y.addEventListener("click",w=>{w.preventDefault(),v(),h.forEach(k=>k.classList.remove("active")),y.classList.add("active"),_.textContent=y.textContent,x=!1,p=!1,Ue.to(h,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{x||Ue.to(_,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=y=>{window.audioMuted&&(y.volume=0,y.muted=!0),y.addEventListener("play",()=>{const C=document.querySelector(".sound-toggle");C&&C.classList.contains("muted")&&(y.volume=0,y.muted=!0)})},new MutationObserver(y=>{y.forEach(C=>{C.type==="childList"&&C.addedNodes.forEach(w=>{w.nodeName==="AUDIO"||w.nodeName==="VIDEO"?window.handleNewAudioElement(w):w.querySelectorAll&&w.querySelectorAll("audio, video").forEach(G=>{window.handleNewAudioElement(G)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c(),bg(),wg(),qc(null),Yc(null),Mg(),VC()}function UC(){const r=s=>{const o=window.location.pathname,a=window.location.hostname;return a==="localhost"||a.includes("127.0.0.1")?`/audio/${s}`:o.includes("/150-lab/")?`/150-lab/assets/audio/${s}`:o.includes("/content/")||a.includes("acs.org")?`/150-lab/assets/audio/${s}`:`/assets/audio/${s}`},e=new Audio;e.addEventListener("canplaythrough",()=>{console.log("Background audio loaded and can play through without buffering"),window.backgroundAudioLoaded=!0,window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioInitialized&&!window.audioMuted&&t(!0)}),e.addEventListener("error",s=>{console.error("Audio loading error:",s),console.error("Audio src:",e.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),e.loop=!0,e.volume=0,e.preload="auto",e.src=r("chemistry2.mp3");try{e.load()}catch(s){console.error("Error loading background audio:",s)}window.backgroundAudio=e,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.backgroundAudioLoaded=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=10,window.playBackgroundAudio=(s=!1)=>{if(!window.audioMuted&&(s&&(window.enterButtonClicked=!0),!(!window.enterButtonClicked||!window.heroAnimationComplete)&&!window.audioInitialized)){if(window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null);return}if(window.backgroundAudioLoaded||e.readyState>=3)t(s);else if(console.log("Background audio not yet ready to play, will play when loaded"),s)try{e.load()}catch(o){console.warn("Error reloading background audio:",o)}}};function t(s=!1){if(!(window.audioInitialized||window.audioMuted)){if(window.audioRetryCount++,window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);return}try{if(e.volume=.08,s)try{const o=new(window.AudioContext||window.webkitAudioContext),a=o.createBufferSource();a.connect(o.destination),a.start(0)}catch(o){console.warn("Could not create audio context:",o)}e.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const o=document.querySelector(".sound-toggle");o&&o.classList.add("active"),window.audioRetryCount=0}).catch(o=>{console.error("Audio play was prevented:",o),window.audioInitialized=!1,(s||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&t(!0)},500)})}catch(o){console.error("Error playing audio:",o),window.audioInitialized=!1,(s||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&t(!0)},500)}}}let n=!1;const i=()=>{document.hidden?window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Tab hidden - pausing background audio"),n=!0,window.backgroundAudio.pause()):window.backgroundAudio&&n&&window.audioInitialized&&!window.audioMuted&&(console.log("Tab visible - resuming background audio"),n=!1,window.backgroundAudio.play().catch(s=>{console.warn("Could not resume background audio:",s),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))};document.addEventListener("visibilitychange",i),window.addEventListener("blur",()=>{window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(console.log("Window blur - pausing background audio"),n=!0,window.backgroundAudio.pause())}),window.addEventListener("focus",()=>{window.backgroundAudio&&n&&window.audioInitialized&&!window.audioMuted&&(console.log("Window focus - resuming background audio"),n=!1,window.backgroundAudio.play().catch(s=>{console.warn("Could not resume background audio on focus:",s),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))}),console.log("Background audio visibility change listeners initialized")}function FC(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function kC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Ue.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Ue.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ye.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function bg(){const r=document.querySelector("#get-involved-text p");r&&(Ue.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Jo(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),Ue.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Ue.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function wg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),s=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!i||!s)return;const o=i.querySelector(".anniversary"),a=i.querySelector(".get-involved"),l=i.querySelector(".events"),c=_=>{if(s.textContent===_)return;const g=Ue.timeline();g.to(s,{opacity:0,duration:.18,onComplete:()=>{s.textContent=_}}),g.to(s,{opacity:1,duration:.24})};o.addEventListener("click",_=>{_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),o.classList.add("active"),c("150 Years of ACS"),window.scrollTo({top:0,behavior:"smooth"})}),a.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),a.classList.add("active"),c("Get Involved"),n){const g=n.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}else{const g=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}}),l.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),l.classList.add("active"),c("Events"),t){const g=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}});const u=[{id:"hero",element:r,title:"150 Years of ACS",link:o,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:a,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:a,top:0,bottom:0},{id:"events",element:t,title:"Events",link:l,top:0,bottom:0}];function d(){if(u.forEach(_=>{if(_.element){const g=_.element.getBoundingClientRect();_.top=g.top+window.pageYOffset,_.bottom=g.bottom+window.pageYOffset}}),u[0].element&&n){const _=n.getBoundingClientRect();u[0].bottom=_.top+window.pageYOffset}if(n&&t){const _=u.find(p=>p.id==="getinvolved-video"),g=u.find(p=>p.id==="getinvolved"),m=t.getBoundingClientRect();_&&g&&(g.top=_.top,g.bottom=m.top+window.pageYOffset)}}d();let f=null;function h(){requestAnimationFrame(()=>{const _=window.pageYOffset+window.innerHeight/2;let g=u[0];for(let m=u.length-1;m>=0;m--){const p=u[m];if(p.element&&_>=p.top&&_<p.bottom){g=p;break}}g.id==="getinvolved-video"&&(g=u.find(m=>m.id==="getinvolved")||g),f!==g.id&&(f=g.id,i.querySelectorAll("a").forEach(m=>m.classList.remove("active")),g.link&&g.link.classList.add("active"),c(g.title))})}window.removeEventListener("scroll",h),window.addEventListener("scroll",h),window.addEventListener("resize",kh(()=>{d(),h()},100)),h()}function BC(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Ue.set(r,{x:0}),console.log("Sliding cards animation disabled for small viewport")),l&&!n&&(n=Ue.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger,console.log("Sliding cards animation initialized for large viewport"))},o=()=>{i&&(i.kill(),i=null),t&&(i=Ye.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Ue.set(t,{opacity:c})},onLeaveBack:()=>{Ue.set(t,{opacity:1})}}),console.log("Hero travel area fade animation initialized"))};s(),o();const a=kh(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function qc(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new Jo(o,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});d.lines&&d.lines.length>0&&d.lines.length>1?(t.push({element:o,splitText:d,originalContent:l}),Ue.set(d.lines,{opacity:0,y:50}),Ye.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-lines-${a}`,onEnter:()=>{Ue.to(d.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ue.to(d.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitLines=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)}),console.log("Split lines cleanup completed")},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((a,l)=>{s(a,l)}),console.log("Split lines refreshed")},100)},console.log(`Initialized split lines animations for ${e.length} elements`)}function Yc(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new Jo(o,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});d.chars&&d.chars.length>0?(t.push({element:o,splitText:d,originalContent:l}),Ue.set(d.chars,{opacity:0,y:50,display:"inline-block"}),Ye.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-chars-${a}`,onEnter:()=>{Ue.to(d.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ue.to(d.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create chars after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitChars=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)}),console.log("Split chars cleanup completed")},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((a,l)=>{s(a,l)}),console.log("Split chars refreshed")},100)},console.log(`Initialized split chars animations for ${e.length} elements`)}function Mg(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(Ue.set(e,{y:50,filter:"opacity(0)"}),Ye.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Ue.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ue.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Ue.set(e,{opacity:0,y:50}),Ye.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Ue.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ue.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))}),console.log(`Initialized scroll reveal animations for ${r.length} elements`)}function zC(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Ue.set(r,{opacity:0,y:50}),Ye.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Ue.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ue.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}),console.log("Initialized get involved logo fade animation")}function HC(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}const t=document.createElement("div");t.className="marquee-container";const n=e.cloneNode(!0);e.remove(),t.appendChild(e),t.appendChild(n),r.appendChild(t);const i=()=>{setTimeout(()=>{const s=e.getBoundingClientRect(),o=s.height;console.log("Image dimensions:",{natural:{width:e.naturalWidth,height:e.naturalHeight},rendered:{width:s.width,height:o}}),Ue.set(e,{top:0,left:0}),Ue.set(n,{top:o+"px",left:0});const a=Ue.timeline({repeat:-1,ease:"none"}),l=o/30;a.to([e,n],{y:-o,duration:l,ease:"none"}),a.set([e,n],{y:0}),console.log("Initialized infinite marquee animation with height:",o)},100)};e.complete&&e.naturalHeight!==0?i():(e.addEventListener("load",i),setTimeout(i,1e3))}function VC(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=["pacifichem-event1.jpg","green-chemistry-event2.jpg","acs-spring-meeting-event3.jpg"],t=l=>{const c=window.location.pathname,u=window.location.hostname;return u==="localhost"||u.includes("127.0.0.1")?`/images/${l}`:c.includes("/150-lab/")?`/150-lab/assets/images/${l}`:c.includes("/content/")||u.includes("acs.org")?`/150-lab/assets/images/${l}`:`/assets/images/${l}`},n="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,i=document.createElement("img");i.className="mouse-following-image",i.style.cssText=`
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
    ${n?"display: none;":""}
  `,document.body.appendChild(i);let s=0,o=0;const a=l=>{s=l.clientX,o=l.clientY,i.style.left=s+"px",i.style.top=o+"px"};document.addEventListener("mousemove",a),r.forEach((l,c)=>{const u=e[c];if(!u){console.warn(`No image mapped for event item ${c}`);return}l.addEventListener("mouseenter",()=>{i.src=t(u),i.style.opacity="1",l.classList.add("active"),i.style.left=s+"px",i.style.top=o+"px"}),l.addEventListener("mouseleave",()=>{i.style.opacity="0",l.classList.remove("active")})}),console.log(`Initialized hover interactions for ${r.length} event list items`)}function kh(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function Eg(){console.log("Reinitializing all split-type elements..."),typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Ti&&Ti.animation){n=Ti.progress,console.log(`Capturing hero fade progress before kill: ${n.toFixed(3)}`);const i=r.querySelectorAll(".char");if(i.length>0){const s=Ue.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Ti&&(console.log("Killing existing hero heading fade ScrollTrigger during reinit..."),Ti.kill(),Ti=null),r.querySelector(".char"))console.log("Hero heading already split, preserving characters to prevent flash.");else{console.log("Hero heading not split, resetting content...");const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{console.log("Reinitializing animations after cleanup..."),e.length&&typeof qc=="function"&&qc(e),t.length&&typeof Yc=="function"&&Yc(t),typeof kf=="function"&&kf(),Ye.refresh(),console.log("ScrollTrigger.refresh() called after reinitializations."),console.log("All split-type elements and hero animation reinitialized.")},50)}function GC(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=kh(()=>{console.log("Window resized, reinitializing animations..."),Eg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{console.log("Orientation changed, reinitializing animations..."),Eg()}),console.log("Global resize handler initialized.")}function WC(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;const t=r.dataset.poster,n=window.location.pathname.includes("/150-lab/")||window.location.hostname!=="localhost",i=()=>n?"/150-lab":"",s=()=>n?`${i()}/assets/video/acs-150-compressed.mp4`:"/video/acs-150-compressed.mp4",o=()=>n?`${i()}/assets/images/${t}`:`/images/${t}`,a=s();console.log("Setting video source:",a),r.src=a;const l=o();console.log("Setting poster path:",l),console.log("Poster filename:",t),r.poster=l,r.addEventListener("error",x=>{var b,v;console.error("Video loading error:",x),console.error("Video src:",r.src),console.error("Video error code:",(b=r.error)==null?void 0:b.code),console.error("Video error message:",(v=r.error)==null?void 0:v.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const c=document.createElement("div");c.className="video-overlay";const u=document.createElement("div");u.className="play-button",c.appendChild(u),r.parentNode.insertBefore(c,r.nextSibling);const d=(x,b,v=1e3)=>{if(!x)return;const M=x.volume,T=performance.now(),A=L=>{const S=L-T,y=Math.min(S/v,1),C=y*y;x.volume=M+(b-M)*C,y<1&&requestAnimationFrame(A)};requestAnimationFrame(A)},f=()=>{r.paused||(r.pause(),c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08))},h=()=>{r.paused?(r.play(),c.classList.add("hidden"),window.backgroundAudio&&d(window.backgroundAudio,0),r.volume=window.audioMuted?0:.5):f()};c.addEventListener("click",h),r.addEventListener("click",h),r.addEventListener("ended",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),new IntersectionObserver(x=>{x.forEach(b=>{b.isIntersecting||f()})},{threshold:.5}).observe(e);const g=()=>{r.paused||(r.volume=window.audioMuted?0:.5)},m=document.querySelector(".sound-toggle");m&&m.addEventListener("click",g);let p=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return p},set:function(x){p=x,g()}})}new Date("2026-04-06T00:00:00").getTime();function XC(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();if(r.includes("/editor.html/")||r.includes("globe.html"))return console.log("Not on main page - editor or globe page detected"),!1;const t=r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("cmswwwdev.acs.org/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html");return console.log("URL check:",r),console.log("Pathname:",e),console.log("Is main page:",t),t}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new yv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),LT(),XC()?(console.log("Initializing main page experience"),OC(),WC()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
