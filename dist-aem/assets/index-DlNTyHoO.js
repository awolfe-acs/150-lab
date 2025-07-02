
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

var wv=Object.defineProperty;var bv=(r,e,t)=>e in r?wv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Je=(r,e,t)=>bv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Mv="1.3.4";function Ig(r,e,t){return Math.max(r,Math.min(e,t))}function Ev(r,e,t){return(1-t)*r+t*e}function Tv(r,e,t,n){return Ev(r,e,1-Math.exp(-t*n))}function Av(r,e){return(r%e+e)%e}var Cv=class{constructor(){Je(this,"isRunning",!1);Je(this,"value",0);Je(this,"from",0);Je(this,"to",0);Je(this,"currentTime",0);Je(this,"lerp");Je(this,"duration");Je(this,"easing");Je(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Ig(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Tv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Rv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Pv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Je(this,"width",0);Je(this,"height",0);Je(this,"scrollHeight",0);Je(this,"scrollWidth",0);Je(this,"debouncedResize");Je(this,"wrapperResizeObserver");Je(this,"contentResizeObserver");Je(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Je(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Je(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Rv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Og=class{constructor(){Je(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},qh=100/6,Cr={passive:!1},Lv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Je(this,"touchStart",{x:0,y:0});Je(this,"lastDelta",{x:0,y:0});Je(this,"window",{width:0,height:0});Je(this,"emitter",new Og);Je(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Je(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Je(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Je(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?qh:n===2?this.window.width:1,s=n===1?qh:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Je(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Cr),this.element.addEventListener("touchstart",this.onTouchStart,Cr),this.element.addEventListener("touchmove",this.onTouchMove,Cr),this.element.addEventListener("touchend",this.onTouchEnd,Cr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Cr),this.element.removeEventListener("touchstart",this.onTouchStart,Cr),this.element.removeEventListener("touchmove",this.onTouchMove,Cr),this.element.removeEventListener("touchend",this.onTouchEnd,Cr)}},Yh=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Dv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:w=!0,autoRaf:y=!1,anchors:v=!1,autoToggle:S=!1,allowNestedScroll:A=!1,__experimental__naiveDimensions:E=!1}={}){Je(this,"_isScrolling",!1);Je(this,"_isStopped",!1);Je(this,"_isLocked",!1);Je(this,"_preventNextNativeScrollEvent",!1);Je(this,"_resetVelocityTimeout",null);Je(this,"__rafID",null);Je(this,"isTouching");Je(this,"time",0);Je(this,"userData",{});Je(this,"lastVelocity",0);Je(this,"velocity",0);Je(this,"direction",0);Je(this,"options");Je(this,"targetScroll");Je(this,"animatedScroll");Je(this,"animate",new Cv);Je(this,"emitter",new Og);Je(this,"dimensions");Je(this,"virtualScroll");Je(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Je(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Je(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});Je(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});Je(this,"onPointerDown",r=>{r.button===1&&this.reset()});Je(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,w,y;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((w=m.hasAttribute)==null?void 0:w.call(m,"data-lenis-prevent-touch"))||s&&((y=m.hasAttribute)==null?void 0:y.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Je(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Je(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Mv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Yh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:w,autoRaf:y,anchors:v,autoToggle:S,allowNestedScroll:A,__experimental__naiveDimensions:E},this.dimensions=new Pv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Lv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Ig(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=Yh:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const S=window.getComputedStyle(r);i.computedStyle=S;const A=S.overflowX,E=S.overflowY;if(s=["auto","overlay","scroll"].includes(A),o=["auto","overlay","scroll"].includes(E),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const S=e!==0,A=t!==0;S&&s&&a&&(_="x"),A&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,w,y;if(_==="x")g=r.scrollLeft,m=c-d,p=e,w=s,y=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,w=o,y=l;else return!1;return(p>0?g<m:g>0)&&w&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Av(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const Iv="modulepreload",Ov=function(r){return"/content/dam/acsorg/150/"+r},jh={},$h=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=Ov(c),c in jh)return;jh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Iv,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wf="177",Nv=0,Kh=1,Uv=2,Ng=1,Fv=2,fr=3,Er=0,$n=1,yi=2,Yr=0,jr=1,Rc=2,Zh=3,Jh=4,kv=5,bs=100,Bv=101,zv=102,Hv=103,Vv=104,Gv=200,Wv=201,Xv=202,qv=203,pd=204,md=205,Yv=206,jv=207,$v=208,Kv=209,Zv=210,Jv=211,Qv=212,ey=213,ty=214,gd=0,_d=1,vd=2,Fo=3,yd=4,xd=5,Sd=6,wd=7,Ug=0,ny=1,iy=2,$r=0,ry=1,sy=2,oy=3,ay=4,ly=5,cy=6,uy=7,Qh="attached",dy="detached",Fg=300,ko=301,Bo=302,bd=303,Md=304,Jc=306,zo=1e3,Br=1001,Pc=1002,Xn=1003,kg=1004,Sa=1005,ci=1006,hc=1007,_r=1008,tr=1009,Bg=1010,zg=1011,Qa=1012,Xf=1013,ks=1014,Ui=1015,_l=1016,qf=1017,Yf=1018,el=1020,Hg=35902,Vg=1021,Gg=1022,xi=1023,tl=1026,nl=1027,jf=1028,$f=1029,Wg=1030,Kf=1031,Zf=1033,pc=33776,mc=33777,gc=33778,_c=33779,Ed=35840,Td=35841,Ad=35842,Cd=35843,Rd=36196,Pd=37492,Ld=37496,Dd=37808,Id=37809,Od=37810,Nd=37811,Ud=37812,Fd=37813,kd=37814,Bd=37815,zd=37816,Hd=37817,Vd=37818,Gd=37819,Wd=37820,Xd=37821,vc=36492,qd=36494,Yd=36495,Xg=36283,jd=36284,$d=36285,Kd=36286,il=2300,rl=2301,uu=2302,ep=2400,tp=2401,np=2402,fy=2500,hy=0,qg=1,Zd=2,py=3200,my=3201,Yg=0,gy=1,kr="",wn="srgb",qn="srgb-linear",Lc="linear",Vt="srgb",js=7680,ip=519,_y=512,vy=513,yy=514,jg=515,xy=516,Sy=517,wy=518,by=519,Jd=35044,rp="300 es",vr=2e3,Dc=2001;class Qo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sp=1234567;const Oa=Math.PI/180,Ho=180/Math.PI;function Fi(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tn[r&255]+Tn[r>>8&255]+Tn[r>>16&255]+Tn[r>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[t&63|128]+Tn[t>>8&255]+"-"+Tn[t>>16&255]+Tn[t>>24&255]+Tn[n&255]+Tn[n>>8&255]+Tn[n>>16&255]+Tn[n>>24&255]).toLowerCase()}function wt(r,e,t){return Math.max(e,Math.min(t,r))}function Jf(r,e){return(r%e+e)%e}function My(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ey(r,e,t){return r!==e?(t-r)/(e-r):0}function Na(r,e,t){return(1-t)*r+t*e}function Ty(r,e,t,n){return Na(r,e,1-Math.exp(-t*n))}function Ay(r,e=1){return e-Math.abs(Jf(r,e*2)-e)}function Cy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Ry(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Py(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ly(r,e){return r+Math.random()*(e-r)}function Dy(r){return r*(.5-Math.random())}function Iy(r){r!==void 0&&(sp=r);let e=sp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Oy(r){return r*Oa}function Ny(r){return r*Ho}function Uy(r){return(r&r-1)===0&&r!==0}function Fy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ky(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function By(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ii(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ft(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const zy={DEG2RAD:Oa,RAD2DEG:Ho,generateUUID:Fi,clamp:wt,euclideanModulo:Jf,mapLinear:My,inverseLerp:Ey,lerp:Na,damp:Ty,pingpong:Ay,smoothstep:Cy,smootherstep:Ry,randInt:Py,randFloat:Ly,randFloatSpread:Dy,seededRandom:Iy,degToRad:Oy,radToDeg:Ny,isPowerOfTwo:Uy,ceilPowerOfTwo:Fy,floorPowerOfTwo:ky,setQuaternionFromProperEuler:By,normalize:Ft,denormalize:Ii};class Mt{constructor(e=0,t=0){Mt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rs{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,w=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const S=Math.sqrt(y),A=Math.atan2(S,p*w);m=Math.sin(m*A)/S,a=Math.sin(a*A)/S}const v=a*w;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(op.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(op.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return du.copy(this).projectOnVector(e),this.sub(du)}reflect(e){return this.sub(du.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const du=new V,op=new rs;class gt{constructor(e,t,n,i,s,o,a,l,c){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],w=i[1],y=i[4],v=i[7],S=i[2],A=i[5],E=i[8];return s[0]=o*g+a*w+l*S,s[3]=o*m+a*y+l*A,s[6]=o*p+a*v+l*E,s[1]=c*g+u*w+d*S,s[4]=c*m+u*y+d*A,s[7]=c*p+u*v+d*E,s[2]=f*g+h*w+_*S,s[5]=f*m+h*y+_*A,s[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(fu.makeScale(e,t)),this}rotate(e){return this.premultiply(fu.makeRotation(-e)),this}translate(e,t){return this.premultiply(fu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fu=new gt;function $g(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function sl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Hy(){const r=sl("canvas");return r.style.display="block",r}const ap={};function To(r){r in ap||(ap[r]=!0,console.warn(r))}function Vy(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Gy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Wy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const lp=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cp=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xy(){const r={enabled:!0,workingColorSpace:qn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Vt&&(i.r=wr(i.r),i.g=wr(i.g),i.b=wr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Vt&&(i.r=Ao(i.r),i.g=Ao(i.g),i.b=Ao(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kr?Lc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return To("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return To("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[qn]:{primaries:e,whitePoint:n,transfer:Lc,toXYZ:lp,fromXYZ:cp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:n,transfer:Vt,toXYZ:lp,fromXYZ:cp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),r}const Rt=Xy();function wr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ao(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let $s;class qy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$s===void 0&&($s=sl("canvas")),$s.width=e.width,$s.height=e.height;const i=$s.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=$s}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=wr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wr(t[n]/255)*255):t[n]=wr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yy=0;class Qf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=Fi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(hu(i[o].image)):s.push(hu(i[o]))}else s=hu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function hu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jy=0;const pu=new V;class dn extends Qo{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,n=Br,i=Br,s=ci,o=_r,a=xi,l=tr,c=dn.DEFAULT_ANISOTROPY,u=kr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jy++}),this.uuid=Fi(),this.name="",this.source=new Qf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pu).x}get height(){return this.source.getSize(pu).y}get depth(){return this.source.getSize(pu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zo:e.x=e.x-Math.floor(e.x);break;case Br:e.x=e.x<0?0:1;break;case Pc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zo:e.y=e.y-Math.floor(e.y);break;case Br:e.y=e.y<0?0:1;break;case Pc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Fg;dn.DEFAULT_ANISOTROPY=1;class It{constructor(e=0,t=0,n=0,i=1){It.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(h+1)/2,S=(p+1)/2,A=(u+f)/4,E=(d+g)/4,P=(_+m)/4;return y>v&&y>S?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=A/n,s=E/n):v>S?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=A/i,s=P/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=E/s,i=P/s),this.set(n,i,s,t),this}let w=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(d-g)/w,this.z=(f-u)/w,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this.w=wt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this.w=wt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $y extends Qo{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new dn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ci,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Qf(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bs extends $y{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Kg extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ky extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bi{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ai):Ai.fromBufferAttribute(s,o),Ai.applyMatrix4(e.matrixWorld),this.expandByPoint(Ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wl.copy(n.boundingBox)),wl.applyMatrix4(e.matrixWorld),this.union(wl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ai),Ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oa),bl.subVectors(this.max,oa),Ks.subVectors(e.a,oa),Zs.subVectors(e.b,oa),Js.subVectors(e.c,oa),Rr.subVectors(Zs,Ks),Pr.subVectors(Js,Zs),ls.subVectors(Ks,Js);let t=[0,-Rr.z,Rr.y,0,-Pr.z,Pr.y,0,-ls.z,ls.y,Rr.z,0,-Rr.x,Pr.z,0,-Pr.x,ls.z,0,-ls.x,-Rr.y,Rr.x,0,-Pr.y,Pr.x,0,-ls.y,ls.x,0];return!mu(t,Ks,Zs,Js,bl)||(t=[1,0,0,0,1,0,0,0,1],!mu(t,Ks,Zs,Js,bl))?!1:(Ml.crossVectors(Rr,Pr),t=[Ml.x,Ml.y,Ml.z],mu(t,Ks,Zs,Js,bl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const or=[new V,new V,new V,new V,new V,new V,new V,new V],Ai=new V,wl=new Bi,Ks=new V,Zs=new V,Js=new V,Rr=new V,Pr=new V,ls=new V,oa=new V,bl=new V,Ml=new V,cs=new V;function mu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){cs.fromArray(r,s);const a=i.x*Math.abs(cs.x)+i.y*Math.abs(cs.y)+i.z*Math.abs(cs.z),l=e.dot(cs),c=t.dot(cs),u=n.dot(cs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Zy=new Bi,aa=new V,gu=new V;class rr{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Zy.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);const t=aa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(aa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(gu)),this.expandByPoint(aa.copy(e.center).sub(gu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ar=new V,_u=new V,El=new V,Lr=new V,vu=new V,Tl=new V,yu=new V;class Qc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ar)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ar.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ar.copy(this.origin).addScaledVector(this.direction,t),ar.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){_u.copy(e).add(t).multiplyScalar(.5),El.copy(t).sub(e).normalize(),Lr.copy(this.origin).sub(_u);const s=e.distanceTo(t)*.5,o=-this.direction.dot(El),a=Lr.dot(this.direction),l=-Lr.dot(El),c=Lr.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(_u).addScaledVector(El,f),h}intersectSphere(e,t){ar.subVectors(e.center,this.origin);const n=ar.dot(this.direction),i=ar.dot(ar)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ar)!==null}intersectTriangle(e,t,n,i,s){vu.subVectors(t,e),Tl.subVectors(n,e),yu.crossVectors(vu,Tl);let o=this.direction.dot(yu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Lr.subVectors(this.origin,e);const l=a*this.direction.dot(Tl.crossVectors(Lr,Tl));if(l<0)return null;const c=a*this.direction.dot(vu.cross(Lr));if(c<0||l+c>o)return null;const u=-a*Lr.dot(yu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Qs.setFromMatrixColumn(e,0).length(),s=1/Qs.setFromMatrixColumn(e,1).length(),o=1/Qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jy,e,Qy)}lookAt(e,t,n){const i=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Dr.crossVectors(n,ti),Dr.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Dr.crossVectors(n,ti)),Dr.normalize(),Al.crossVectors(ti,Dr),i[0]=Dr.x,i[4]=Al.x,i[8]=ti.x,i[1]=Dr.y,i[5]=Al.y,i[9]=ti.y,i[2]=Dr.z,i[6]=Al.z,i[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],w=n[3],y=n[7],v=n[11],S=n[15],A=i[0],E=i[4],P=i[8],x=i[12],b=i[1],D=i[5],I=i[9],H=i[13],F=i[2],C=i[6],$=i[10],K=i[14],X=i[3],pe=i[7],O=i[11],q=i[15];return s[0]=o*A+a*b+l*F+c*X,s[4]=o*E+a*D+l*C+c*pe,s[8]=o*P+a*I+l*$+c*O,s[12]=o*x+a*H+l*K+c*q,s[1]=u*A+d*b+f*F+h*X,s[5]=u*E+d*D+f*C+h*pe,s[9]=u*P+d*I+f*$+h*O,s[13]=u*x+d*H+f*K+h*q,s[2]=_*A+g*b+m*F+p*X,s[6]=_*E+g*D+m*C+p*pe,s[10]=_*P+g*I+m*$+p*O,s[14]=_*x+g*H+m*K+p*q,s[3]=w*A+y*b+v*F+S*X,s[7]=w*E+y*D+v*C+S*pe,s[11]=w*P+y*I+v*$+S*O,s[15]=w*x+y*H+v*K+S*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],w=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,y=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,S=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,A=t*w+n*y+i*v+s*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=w*E,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=y*E,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*E,e[12]=S*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*E,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,w=l*c,y=l*u,v=l*d,S=n.x,A=n.y,E=n.z;return i[0]=(1-(g+p))*S,i[1]=(h+v)*S,i[2]=(_-y)*S,i[3]=0,i[4]=(h-v)*A,i[5]=(1-(f+p))*A,i[6]=(m+w)*A,i[7]=0,i[8]=(_+y)*E,i[9]=(m-w)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Qs.set(i[0],i[1],i[2]).length();const o=Qs.set(i[4],i[5],i[6]).length(),a=Qs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ci.copy(this);const c=1/s,u=1/o,d=1/a;return Ci.elements[0]*=c,Ci.elements[1]*=c,Ci.elements[2]*=c,Ci.elements[4]*=u,Ci.elements[5]*=u,Ci.elements[6]*=u,Ci.elements[8]*=d,Ci.elements[9]*=d,Ci.elements[10]*=d,t.setFromRotationMatrix(Ci),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=vr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===vr)h=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Dc)h=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=vr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===vr)_=(o+s)*d,g=-2*d;else if(a===Dc)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qs=new V,Ci=new _t,Jy=new V(0,0,0),Qy=new V(1,1,1),Dr=new V,Al=new V,ti=new V,up=new _t,dp=new rs;class nr{constructor(e=0,t=0,n=0,i=nr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return up.makeRotationFromQuaternion(e),this.setFromRotationMatrix(up,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dp.setFromEuler(this),this.setFromQuaternion(dp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nr.DEFAULT_ORDER="XYZ";class Zg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ex=0;const fp=new V,eo=new rs,lr=new _t,Cl=new V,la=new V,tx=new V,nx=new rs,hp=new V(1,0,0),pp=new V(0,1,0),mp=new V(0,0,1),gp={type:"added"},ix={type:"removed"},to={type:"childadded",child:null},xu={type:"childremoved",child:null};class Jt extends Qo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jt.DEFAULT_UP.clone();const e=new V,t=new nr,n=new rs,i=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _t},normalMatrix:{value:new gt}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return eo.setFromAxisAngle(e,t),this.quaternion.multiply(eo),this}rotateOnWorldAxis(e,t){return eo.setFromAxisAngle(e,t),this.quaternion.premultiply(eo),this}rotateX(e){return this.rotateOnAxis(hp,e)}rotateY(e){return this.rotateOnAxis(pp,e)}rotateZ(e){return this.rotateOnAxis(mp,e)}translateOnAxis(e,t){return fp.copy(e).applyQuaternion(this.quaternion),this.position.add(fp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hp,e)}translateY(e){return this.translateOnAxis(pp,e)}translateZ(e){return this.translateOnAxis(mp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(lr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cl.copy(e):Cl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?lr.lookAt(la,Cl,this.up):lr.lookAt(Cl,la,this.up),this.quaternion.setFromRotationMatrix(lr),i&&(lr.extractRotation(i.matrixWorld),eo.setFromRotationMatrix(lr),this.quaternion.premultiply(eo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gp),to.child=e,this.dispatchEvent(to),to.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ix),xu.child=e,this.dispatchEvent(xu),xu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),lr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),lr.multiply(e.parent.matrixWorld)),e.applyMatrix4(lr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gp),to.child=e,this.dispatchEvent(to),to.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,e,tx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,nx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Jt.DEFAULT_UP=new V(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ri=new V,cr=new V,Su=new V,ur=new V,no=new V,io=new V,_p=new V,wu=new V,bu=new V,Mu=new V,Eu=new It,Tu=new It,Au=new It;class Oi{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ri.subVectors(e,t),i.cross(Ri);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ri.subVectors(i,t),cr.subVectors(n,t),Su.subVectors(e,t);const o=Ri.dot(Ri),a=Ri.dot(cr),l=Ri.dot(Su),c=cr.dot(cr),u=cr.dot(Su),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ur)===null?!1:ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,ur)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ur.x),l.addScaledVector(o,ur.y),l.addScaledVector(a,ur.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Eu.setScalar(0),Tu.setScalar(0),Au.setScalar(0),Eu.fromBufferAttribute(e,t),Tu.fromBufferAttribute(e,n),Au.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Eu,s.x),o.addScaledVector(Tu,s.y),o.addScaledVector(Au,s.z),o}static isFrontFacing(e,t,n,i){return Ri.subVectors(n,t),cr.subVectors(e,t),Ri.cross(cr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),Ri.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Oi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Oi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;no.subVectors(i,n),io.subVectors(s,n),wu.subVectors(e,n);const l=no.dot(wu),c=io.dot(wu);if(l<=0&&c<=0)return t.copy(n);bu.subVectors(e,i);const u=no.dot(bu),d=io.dot(bu);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(no,o);Mu.subVectors(e,s);const h=no.dot(Mu),_=io.dot(Mu);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(io,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return _p.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(_p,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(no,o).addScaledVector(io,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Jg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ir={h:0,s:0,l:0},Rl={h:0,s:0,l:0};function Cu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Rt.workingColorSpace){if(e=Jf(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Cu(o,s,e+1/3),this.g=Cu(o,s,e),this.b=Cu(o,s,e-1/3)}return Rt.colorSpaceToWorking(this,i),this}setStyle(e,t=wn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wn){const n=Jg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}copyLinearToSRGB(e){return this.r=Ao(e.r),this.g=Ao(e.g),this.b=Ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return Rt.workingToColorSpace(An.copy(this),e),Math.round(wt(An.r*255,0,255))*65536+Math.round(wt(An.g*255,0,255))*256+Math.round(wt(An.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.workingToColorSpace(An.copy(this),t);const n=An.r,i=An.g,s=An.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Rt.workingColorSpace){return Rt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=wn){Rt.workingToColorSpace(An.copy(this),e);const t=An.r,n=An.g,i=An.b;return e!==wn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ir),this.setHSL(Ir.h+e,Ir.s+t,Ir.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ir),e.getHSL(Rl);const n=Na(Ir.h,Rl.h,t),i=Na(Ir.s,Rl.s,t),s=Na(Ir.l,Rl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const An=new Qe;Qe.NAMES=Jg;let rx=0;class Ji extends Qo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Fi(),this.name="",this.type="Material",this.blending=jr,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pd,this.blendDst=md,this.blendEquation=bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=Fo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ip,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(n.blending=this.blending),this.side!==Er&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pd&&(n.blendSrc=this.blendSrc),this.blendDst!==md&&(n.blendDst=this.blendDst),this.blendEquation!==bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ip&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==js&&(n.stencilFail=this.stencilFail),this.stencilZFail!==js&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==js&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Es extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nr,this.combine=Ug,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const on=new V,Pl=new Mt;let sx=0;class kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jd,this.updateRanges=[],this.gpuType=Ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pl.fromBufferAttribute(this,t),Pl.applyMatrix3(e),this.setXY(t,Pl.x,Pl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix3(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jd&&(e.usage=this.usage),e}}class Qg extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class e_ extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class br extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ox=0;const pi=new _t,Ru=new Jt,ro=new V,ni=new Bi,ca=new Bi,mn=new V;class Ei extends Qo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ox++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($g(e)?e_:Qg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new gt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,n){return pi.makeTranslation(e,t,n),this.applyMatrix4(pi),this}scale(e,t,n){return pi.makeScale(e,t,n),this.applyMatrix4(pi),this}lookAt(e){return Ru.lookAt(e),Ru.updateMatrix(),this.applyMatrix4(Ru.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ro).negate(),this.translate(ro.x,ro.y,ro.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new br(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ca.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(ni.min,ca.min),ni.expandByPoint(mn),mn.addVectors(ni.max,ca.max),ni.expandByPoint(mn)):(ni.expandByPoint(ca.min),ni.expandByPoint(ca.max))}ni.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)mn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(mn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)mn.fromBufferAttribute(a,c),l&&(ro.fromBufferAttribute(e,c),mn.add(ro)),i=Math.max(i,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new V,l[P]=new V;const c=new V,u=new V,d=new V,f=new Mt,h=new Mt,_=new Mt,g=new V,m=new V;function p(P,x,b){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,x),d.fromBufferAttribute(n,b),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,x),_.fromBufferAttribute(s,b),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const D=1/(h.x*_.y-_.x*h.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(D),a[P].add(g),a[x].add(g),a[b].add(g),l[P].add(m),l[x].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let P=0,x=w.length;P<x;++P){const b=w[P],D=b.start,I=b.count;for(let H=D,F=D+I;H<F;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const y=new V,v=new V,S=new V,A=new V;function E(P){S.fromBufferAttribute(i,P),A.copy(S);const x=a[P];y.copy(x),y.sub(S.multiplyScalar(S.dot(x))).normalize(),v.crossVectors(A,x);const D=v.dot(l[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,D)}for(let P=0,x=w.length;P<x;++P){const b=w[P],D=b.start,I=b.count;for(let H=D,F=D+I;H<F;H+=3)E(e.getX(H+0)),E(e.getX(H+1)),E(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new kt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ei,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vp=new _t,us=new Qc,Ll=new rr,yp=new V,Dl=new V,Il=new V,Ol=new V,Pu=new V,Nl=new V,xp=new V,Ul=new V;class Wn extends Jt{constructor(e=new Ei,t=new Es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Nl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Pu.fromBufferAttribute(d,e),o?Nl.addScaledVector(Pu,u):Nl.addScaledVector(Pu.sub(t),u))}t.add(Nl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ll.copy(n.boundingSphere),Ll.applyMatrix4(s),us.copy(e.ray).recast(e.near),!(Ll.containsPoint(us.origin)===!1&&(us.intersectSphere(Ll,yp)===null||us.origin.distanceToSquared(yp)>(e.far-e.near)**2))&&(vp.copy(s).invert(),us.copy(e.ray).applyMatrix4(vp),!(n.boundingBox!==null&&us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],w=Math.max(m.start,h.start),y=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=w,S=y;v<S;v+=3){const A=a.getX(v),E=a.getX(v+1),P=a.getX(v+2);i=Fl(this,p,e,n,c,u,d,A,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const w=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);i=Fl(this,o,e,n,c,u,d,w,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],w=Math.max(m.start,h.start),y=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=w,S=y;v<S;v+=3){const A=v,E=v+1,P=v+2;i=Fl(this,p,e,n,c,u,d,A,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const w=m,y=m+1,v=m+2;i=Fl(this,o,e,n,c,u,d,w,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ax(r,e,t,n,i,s,o,a){let l;if(e.side===$n?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Er,a),l===null)return null;Ul.copy(a),Ul.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ul);return c<t.near||c>t.far?null:{distance:c,point:Ul.clone(),object:r}}function Fl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Dl),r.getVertexPosition(l,Il),r.getVertexPosition(c,Ol);const u=ax(r,e,t,n,Dl,Il,Ol,xp);if(u){const d=new V;Oi.getBarycoord(xp,Dl,Il,Ol,d),i&&(u.uv=Oi.getInterpolatedAttribute(i,a,l,c,d,new Mt)),s&&(u.uv1=Oi.getInterpolatedAttribute(s,a,l,c,d,new Mt)),o&&(u.normal=Oi.getInterpolatedAttribute(o,a,l,c,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new V,materialIndex:0};Oi.getNormal(Dl,Il,Ol,f.normal),u.face=f,u.barycoord=d}return u}class vl extends Ei{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new br(c,3)),this.setAttribute("normal",new br(u,3)),this.setAttribute("uv",new br(d,2));function _(g,m,p,w,y,v,S,A,E,P,x){const b=v/E,D=S/P,I=v/2,H=S/2,F=A/2,C=E+1,$=P+1;let K=0,X=0;const pe=new V;for(let O=0;O<$;O++){const q=O*D-H;for(let je=0;je<C;je++){const it=je*b-I;pe[g]=it*w,pe[m]=q*y,pe[p]=F,c.push(pe.x,pe.y,pe.z),pe[g]=0,pe[m]=0,pe[p]=A>0?1:-1,u.push(pe.x,pe.y,pe.z),d.push(je/E),d.push(1-O/P),K+=1}}for(let O=0;O<P;O++)for(let q=0;q<E;q++){const je=f+q+C*O,it=f+q+C*(O+1),J=f+(q+1)+C*(O+1),ce=f+(q+1)+C*O;l.push(je,it,ce),l.push(it,J,ce),X+=6}a.addGroup(h,X,x),h+=X,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function kn(r){const e={};for(let t=0;t<r.length;t++){const n=Vo(r[t]);for(const i in n)e[i]=n[i]}return e}function lx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function t_(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const cx={clone:Vo,merge:kn};var ux=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Si extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ux,this.fragmentShader=dx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vo(e.uniforms),this.uniformsGroups=lx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class n_ extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=vr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Or=new V,Sp=new Mt,wp=new Mt;class jn extends n_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ho*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ho*2*Math.atan(Math.tan(Oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,t){return this.getViewBounds(e,Sp,wp),t.subVectors(wp,Sp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Oa*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const so=-90,oo=1;class fx extends Jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jn(so,oo,e,t);i.layers=this.layers,this.add(i);const s=new jn(so,oo,e,t);s.layers=this.layers,this.add(s);const o=new jn(so,oo,e,t);o.layers=this.layers,this.add(o);const a=new jn(so,oo,e,t);a.layers=this.layers,this.add(a);const l=new jn(so,oo,e,t);l.layers=this.layers,this.add(l);const c=new jn(so,oo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===vr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Dc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class i_ extends dn{constructor(e=[],t=ko,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hx extends Bs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new i_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new vl(5,5,5),s=new Si({name:"CubemapFromEquirect",uniforms:Vo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$n,blending:Yr});s.uniforms.tEquirect.value=t;const o=new Wn(i,s),a=t.minFilter;return t.minFilter===_r&&(t.minFilter=ci),new fx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class yr extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const px={type:"move"};class Lu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(px)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class bp extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nr,this.environmentIntensity=1,this.environmentRotation=new nr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class mx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jd,this.updateRanges=[],this.version=0,this.uuid=Fi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Nn=new V;class eh{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ii(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),i=Ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new eh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Mp=new V,Ep=new It,Tp=new It,gx=new V,Ap=new _t,kl=new V,Du=new rr,Cp=new _t,Iu=new Qc;class _x extends Wn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qh,this.bindMatrix=new _t,this.bindMatrixInverse=new _t,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Bi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kl),this.boundingBox.expandByPoint(kl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new rr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kl),this.boundingSphere.expandByPoint(kl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Du.copy(this.boundingSphere),Du.applyMatrix4(i),e.ray.intersectsSphere(Du)!==!1&&(Cp.copy(i).invert(),Iu.copy(e.ray).applyMatrix4(Cp),!(this.boundingBox!==null&&Iu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Iu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new It,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===dy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ep.fromBufferAttribute(i.attributes.skinIndex,e),Tp.fromBufferAttribute(i.attributes.skinWeight,e),Mp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Tp.getComponent(s);if(o!==0){const a=Ep.getComponent(s);Ap.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(gx.copy(Mp).applyMatrix4(Ap),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class r_ extends Jt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class s_ extends dn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Xn,u=Xn,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rp=new _t,vx=new _t;class th{constructor(e=[],t=[]){this.uuid=Fi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new _t)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new _t;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:vx;Rp.multiplyMatrices(a,t[s]),Rp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new th(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new s_(t,e,e,xi,Ui);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new r_),this.bones.push(o),this.boneInverses.push(new _t().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Qd extends kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ao=new _t,Pp=new _t,Bl=[],Lp=new Bi,yx=new _t,ua=new Wn,da=new rr;class xx extends Wn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,yx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),Lp.copy(e.boundingBox).applyMatrix4(ao),this.boundingBox.union(Lp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new rr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),da.copy(e.boundingSphere).applyMatrix4(ao),this.boundingSphere.union(da)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ua.geometry=this.geometry,ua.material=this.material,ua.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),da.copy(this.boundingSphere),da.applyMatrix4(n),e.ray.intersectsSphere(da)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ao),Pp.multiplyMatrices(n,ao),ua.matrixWorld=Pp,ua.raycast(e,Bl);for(let o=0,a=Bl.length;o<a;o++){const l=Bl[o];l.instanceId=s,l.object=this,t.push(l)}Bl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new s_(new Float32Array(i*this.count),i,this.count,jf,Ui));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ou=new V,Sx=new V,wx=new gt;class vs{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ou.subVectors(n,t).cross(Sx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ou),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wx.getNormalMatrix(e),i=this.coplanarPoint(Ou).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new rr,zl=new V;class nh{constructor(e=new vs,t=new vs,n=new vs,i=new vs,s=new vs,o=new vs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=vr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],w=i[13],y=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+w).normalize(),n[3].setComponents(l-o,f-u,m-_,v-w).normalize(),n[4].setComponents(l-a,f-d,m-g,v-y).normalize(),t===vr)n[5].setComponents(l+a,f+d,m+g,v+y).normalize();else if(t===Dc)n[5].setComponents(a,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(zl.x=i.normal.x>0?e.max.x:e.min.x,zl.y=i.normal.y>0?e.max.y:e.min.y,zl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class o_ extends Ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ic=new V,Oc=new V,Dp=new _t,fa=new Qc,Hl=new rr,Nu=new V,Ip=new V;class ih extends Jt{constructor(e=new Ei,t=new o_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Ic.fromBufferAttribute(t,i-1),Oc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ic.distanceTo(Oc);e.setAttribute("lineDistance",new br(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(i),Hl.radius+=s,e.ray.intersectsSphere(Hl)===!1)return;Dp.copy(i).invert(),fa.copy(e.ray).applyMatrix4(Dp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),w=u.getX(g+1),y=Vl(this,e,fa,l,p,w,g);y&&t.push(y)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=Vl(this,e,fa,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=Vl(this,e,fa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Vl(this,e,fa,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Vl(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Ic.fromBufferAttribute(a,i),Oc.fromBufferAttribute(a,s),t.distanceSqToSegment(Ic,Oc,Nu,Ip)>n)return;Nu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Nu);if(!(c<e.near||c>e.far))return{distance:c,point:Ip.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Op=new V,Np=new V;class bx extends ih{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Op.fromBufferAttribute(t,i),Np.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Op.distanceTo(Np);e.setAttribute("lineDistance",new br(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mx extends ih{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class a_ extends Ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Up=new _t,ef=new Qc,Gl=new rr,Wl=new V;class tf extends Jt{constructor(e=new Ei,t=new a_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gl.copy(n.boundingSphere),Gl.applyMatrix4(i),Gl.radius+=s,e.ray.intersectsSphere(Gl)===!1)return;Up.copy(i).invert(),ef.copy(e.ray).applyMatrix4(Up);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Wl.fromBufferAttribute(d,m),Fp(Wl,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)Wl.fromBufferAttribute(d,_),Fp(Wl,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fp(r,e,t,n,i,s,o){const a=ef.distanceSqToPoint(r);if(a<t){const l=new V;ef.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class l_ extends dn{constructor(e,t,n=ks,i,s,o,a=Xn,l=Xn,c,u=tl,d=1){if(u!==tl&&u!==nl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Li extends Ei{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const w=p*f-o;for(let y=0;y<c;y++){const v=y*d-s;_.push(v,-w,0),g.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){const y=w+c*p,v=w+c*(p+1),S=w+1+c*(p+1),A=w+1+c*p;h.push(y,v,A),h.push(v,S,A)}this.setIndex(h),this.setAttribute("position",new br(_,3)),this.setAttribute("normal",new br(g,3)),this.setAttribute("uv",new br(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.widthSegments,e.heightSegments)}}class rh extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yg,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class sr extends rh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Mt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return wt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ex extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=py,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tx extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Xl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Ax(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Cx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function kp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function c_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class yl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Rx extends yl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ep,endingEnd:ep}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case tp:s=e,a=2*t-n;break;case np:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case tp:o=e,l=2*n-t;break;case np:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,w=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,y=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let S=0;S!==a;++S)s[S]=p*o[u+S]+w*o[c+S]+y*o[l+S]+v*o[d+S];return s}}class Px extends yl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class Lx extends yl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xl(t,this.TimeBufferType),this.values=Xl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xl(e.times,Array),values:Xl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Lx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Px(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case il:t=this.InterpolantFactoryMethodDiscrete;break;case rl:t=this.InterpolantFactoryMethodLinear;break;case uu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return il;case this.InterpolantFactoryMethodLinear:return rl;case this.InterpolantFactoryMethodSmooth:return uu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Ax(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===uu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}zi.prototype.ValueTypeName="";zi.prototype.TimeBufferType=Float32Array;zi.prototype.ValueBufferType=Float32Array;zi.prototype.DefaultInterpolation=rl;class ea extends zi{constructor(e,t,n){super(e,t,n)}}ea.prototype.ValueTypeName="bool";ea.prototype.ValueBufferType=Array;ea.prototype.DefaultInterpolation=il;ea.prototype.InterpolantFactoryMethodLinear=void 0;ea.prototype.InterpolantFactoryMethodSmooth=void 0;class u_ extends zi{constructor(e,t,n,i){super(e,t,n,i)}}u_.prototype.ValueTypeName="color";class Go extends zi{constructor(e,t,n,i){super(e,t,n,i)}}Go.prototype.ValueTypeName="number";class Dx extends yl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)rs.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Wo extends zi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Dx(this.times,this.values,this.getValueSize(),e)}}Wo.prototype.ValueTypeName="quaternion";Wo.prototype.InterpolantFactoryMethodSmooth=void 0;class ta extends zi{constructor(e,t,n){super(e,t,n)}}ta.prototype.ValueTypeName="string";ta.prototype.ValueBufferType=Array;ta.prototype.DefaultInterpolation=il;ta.prototype.InterpolantFactoryMethodLinear=void 0;ta.prototype.InterpolantFactoryMethodSmooth=void 0;class Xo extends zi{constructor(e,t,n,i){super(e,t,n,i)}}Xo.prototype.ValueTypeName="vector";class Ix{constructor(e="",t=-1,n=[],i=fy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Fi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Nx(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(zi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Cx(l);l=kp(l,1,u),c=kp(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Go(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];c_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let w=0;w!==f[_].morphTargets.length;++w){const y=f[_];m.push(y.time),p.push(y.morphTarget===g?1:0)}i.push(new Go(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(Xo,h+".position",f,"pos",i),n(Wo,h+".quaternion",f,"rot",i),n(Xo,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ox(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Go;case"vector":case"vector2":case"vector3":case"vector4":return Xo;case"color":return u_;case"quaternion":return Wo;case"bool":case"boolean":return ea;case"string":return ta}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Nx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ox(r.type);if(r.times===void 0){const t=[],n=[];c_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const zr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ux{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const Fx=new Ux;class na{constructor(e){this.manager=e!==void 0?e:Fx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}na.DEFAULT_MATERIAL_NAME="__DEFAULT";const dr={};class kx extends Error{constructor(e,t){super(e),this.response=t}}class d_ extends na{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=zr.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(dr[e]!==void 0){dr[e].push({onLoad:t,onProgress:n,onError:i});return}dr[e]=[],dr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=dr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){w();function w(){d.read().then(({done:y,value:v})=>{if(y)p.close();else{g+=v.byteLength;const S=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let A=0,E=u.length;A<E;A++){const P=u[A];P.onProgress&&P.onProgress(S)}p.enqueue(v),w()}},y=>{p.error(y)})}}});return new Response(m)}else throw new kx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{zr.add(e,c);const u=dr[e];delete dr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=dr[e];if(u===void 0)throw this.manager.itemError(e),c;delete dr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Bx extends na{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=zr.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=sl("img");function l(){u(),zr.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class zx extends na{constructor(e){super(e)}load(e,t,n,i){const s=new dn,o=new Bx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class eu extends Jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Uu=new _t,Bp=new V,zp=new V;class sh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.mapType=tr,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nh,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Bp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bp),zp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zp),t.updateMatrixWorld(),Uu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Hx extends sh{constructor(){super(new jn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ho*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Vx extends eu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Hx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Hp=new _t,ha=new V,Fu=new V;class Gx extends sh{constructor(){super(new jn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Mt(4,2),this._viewportCount=6,this._viewports=[new It(2,1,1,1),new It(0,1,1,1),new It(3,1,1,1),new It(1,1,1,1),new It(3,0,1,1),new It(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ha.setFromMatrixPosition(e.matrixWorld),n.position.copy(ha),Fu.copy(n.position),Fu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fu),n.updateMatrixWorld(),i.makeTranslation(-ha.x,-ha.y,-ha.z),Hp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hp)}}class Wx extends eu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Gx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class tu extends n_{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Xx extends sh{constructor(){super(new tu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class f_ extends eu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new Xx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class qx extends eu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ua{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ku=new WeakMap;class Yx extends na{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=zr.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(ku.has(o)===!0)i&&i(ku.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return zr.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ku.set(l,c),zr.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});zr.add(e,l),s.manager.itemStart(e)}}class jx extends jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const oh="\\[\\]\\.:\\/",$x=new RegExp("["+oh+"]","g"),ah="[^"+oh+"]",Kx="[^"+oh.replace("\\.","")+"]",Zx=/((?:WC+[\/:])*)/.source.replace("WC",ah),Jx=/(WCOD+)?/.source.replace("WCOD",Kx),Qx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ah),eS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ah),tS=new RegExp("^"+Zx+Jx+Qx+eS+"$"),nS=["material","materials","bones","map"];class iS{constructor(e,t,n){const i=n||Bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Bt{constructor(e,t,n){this.path=t,this.parsedPath=n||Bt.parseTrackName(t),this.node=Bt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Bt.Composite(e,t,n):new Bt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($x,"")}static parseTrackName(e){const t=tS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);nS.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Bt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Bt.Composite=iS;Bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bt.prototype.GetterByBindingType=[Bt.prototype._getValue_direct,Bt.prototype._getValue_array,Bt.prototype._getValue_arrayElement,Bt.prototype._getValue_toArray];Bt.prototype.SetterByBindingTypeAndVersioning=[[Bt.prototype._setValue_direct,Bt.prototype._setValue_direct_setNeedsUpdate,Bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_array,Bt.prototype._setValue_array_setNeedsUpdate,Bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_arrayElement,Bt.prototype._setValue_arrayElement_setNeedsUpdate,Bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_fromArray,Bt.prototype._setValue_fromArray_setNeedsUpdate,Bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Vp(r,e,t,n){const i=rS(n);switch(t){case Vg:return r*e;case jf:return r*e/i.components*i.byteLength;case $f:return r*e/i.components*i.byteLength;case Wg:return r*e*2/i.components*i.byteLength;case Kf:return r*e*2/i.components*i.byteLength;case Gg:return r*e*3/i.components*i.byteLength;case xi:return r*e*4/i.components*i.byteLength;case Zf:return r*e*4/i.components*i.byteLength;case pc:case mc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case gc:case _c:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Td:case Cd:return Math.max(r,16)*Math.max(e,8)/4;case Ed:case Ad:return Math.max(r,8)*Math.max(e,8)/2;case Rd:case Pd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ld:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Dd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Id:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Od:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Ud:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Fd:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case kd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Gd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Wd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Xd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case vc:case qd:case Yd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Xg:case jd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case $d:case Kd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rS(r){switch(r){case tr:case Bg:return{byteLength:1,components:1};case Qa:case zg:case _l:return{byteLength:2,components:1};case qf:case Yf:return{byteLength:2,components:4};case ks:case Xf:case Ui:return{byteLength:4,components:1};case Hg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function h_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function sS(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var oS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,aS=`#ifdef USE_ALPHAHASH
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
#endif`,lS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fS=`#ifdef USE_AOMAP
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
#endif`,hS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pS=`#ifdef USE_BATCHING
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
#endif`,mS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_S=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yS=`#ifdef USE_IRIDESCENCE
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
#endif`,xS=`#ifdef USE_BUMPMAP
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
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,MS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,AS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,CS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,RS=`#define PI 3.141592653589793
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
} // validated`,PS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,LS=`vec3 transformedNormal = objectNormal;
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
#endif`,DS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,OS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,NS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,US="gl_FragColor = linearToOutputTexel( gl_FragColor );",FS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kS=`#ifdef USE_ENVMAP
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
#endif`,BS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zS=`#ifdef USE_ENVMAP
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
#endif`,HS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,VS=`#ifdef USE_ENVMAP
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
#endif`,GS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,WS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,XS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,YS=`#ifdef USE_GRADIENTMAP
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
}`,jS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$S=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ZS=`uniform bool receiveShadow;
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
#endif`,JS=`#ifdef USE_ENVMAP
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
#endif`,QS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ew=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iw=`PhysicalMaterial material;
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
#endif`,rw=`struct PhysicalMaterial {
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
}`,sw=`
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
#endif`,ow=`#if defined( RE_IndirectDiffuse )
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
#endif`,aw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lw=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,mw=`#if defined( USE_POINTS_UV )
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
#endif`,gw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_w=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sw=`#ifdef USE_MORPHTARGETS
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
#endif`,ww=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Aw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cw=`#ifdef USE_NORMALMAP
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
#endif`,Rw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ow=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ww=`float getShadowMask() {
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
}`,Xw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qw=`#ifdef USE_SKINNING
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
#endif`,Yw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jw=`#ifdef USE_SKINNING
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
#endif`,$w=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qw=`#ifdef USE_TRANSMISSION
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
#endif`,eb=`#ifdef USE_TRANSMISSION
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
#endif`,tb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ob=`uniform sampler2D t2D;
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
}`,ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ub=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,db=`#include <common>
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
}`,fb=`#if DEPTH_PACKING == 3200
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
}`,hb=`#define DISTANCE
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
}`,pb=`#define DISTANCE
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
}`,mb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_b=`uniform float scale;
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
}`,vb=`uniform vec3 diffuse;
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
}`,yb=`#include <common>
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
}`,xb=`uniform vec3 diffuse;
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
}`,Sb=`#define LAMBERT
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
}`,wb=`#define LAMBERT
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
}`,bb=`#define MATCAP
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
}`,Mb=`#define MATCAP
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
}`,Eb=`#define NORMAL
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
}`,Tb=`#define NORMAL
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
}`,Ab=`#define PHONG
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
}`,Cb=`#define PHONG
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
}`,Rb=`#define STANDARD
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
}`,Pb=`#define STANDARD
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
}`,Lb=`#define TOON
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
}`,Db=`#define TOON
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
}`,Ib=`uniform float size;
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
}`,Ob=`uniform vec3 diffuse;
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
}`,Nb=`#include <common>
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
}`,Ub=`uniform vec3 color;
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
}`,Fb=`uniform float rotation;
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
}`,kb=`uniform vec3 diffuse;
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
}`,vt={alphahash_fragment:oS,alphahash_pars_fragment:aS,alphamap_fragment:lS,alphamap_pars_fragment:cS,alphatest_fragment:uS,alphatest_pars_fragment:dS,aomap_fragment:fS,aomap_pars_fragment:hS,batching_pars_vertex:pS,batching_vertex:mS,begin_vertex:gS,beginnormal_vertex:_S,bsdfs:vS,iridescence_fragment:yS,bumpmap_pars_fragment:xS,clipping_planes_fragment:SS,clipping_planes_pars_fragment:wS,clipping_planes_pars_vertex:bS,clipping_planes_vertex:MS,color_fragment:ES,color_pars_fragment:TS,color_pars_vertex:AS,color_vertex:CS,common:RS,cube_uv_reflection_fragment:PS,defaultnormal_vertex:LS,displacementmap_pars_vertex:DS,displacementmap_vertex:IS,emissivemap_fragment:OS,emissivemap_pars_fragment:NS,colorspace_fragment:US,colorspace_pars_fragment:FS,envmap_fragment:kS,envmap_common_pars_fragment:BS,envmap_pars_fragment:zS,envmap_pars_vertex:HS,envmap_physical_pars_fragment:JS,envmap_vertex:VS,fog_vertex:GS,fog_pars_vertex:WS,fog_fragment:XS,fog_pars_fragment:qS,gradientmap_pars_fragment:YS,lightmap_pars_fragment:jS,lights_lambert_fragment:$S,lights_lambert_pars_fragment:KS,lights_pars_begin:ZS,lights_toon_fragment:QS,lights_toon_pars_fragment:ew,lights_phong_fragment:tw,lights_phong_pars_fragment:nw,lights_physical_fragment:iw,lights_physical_pars_fragment:rw,lights_fragment_begin:sw,lights_fragment_maps:ow,lights_fragment_end:aw,logdepthbuf_fragment:lw,logdepthbuf_pars_fragment:cw,logdepthbuf_pars_vertex:uw,logdepthbuf_vertex:dw,map_fragment:fw,map_pars_fragment:hw,map_particle_fragment:pw,map_particle_pars_fragment:mw,metalnessmap_fragment:gw,metalnessmap_pars_fragment:_w,morphinstance_vertex:vw,morphcolor_vertex:yw,morphnormal_vertex:xw,morphtarget_pars_vertex:Sw,morphtarget_vertex:ww,normal_fragment_begin:bw,normal_fragment_maps:Mw,normal_pars_fragment:Ew,normal_pars_vertex:Tw,normal_vertex:Aw,normalmap_pars_fragment:Cw,clearcoat_normal_fragment_begin:Rw,clearcoat_normal_fragment_maps:Pw,clearcoat_pars_fragment:Lw,iridescence_pars_fragment:Dw,opaque_fragment:Iw,packing:Ow,premultiplied_alpha_fragment:Nw,project_vertex:Uw,dithering_fragment:Fw,dithering_pars_fragment:kw,roughnessmap_fragment:Bw,roughnessmap_pars_fragment:zw,shadowmap_pars_fragment:Hw,shadowmap_pars_vertex:Vw,shadowmap_vertex:Gw,shadowmask_pars_fragment:Ww,skinbase_vertex:Xw,skinning_pars_vertex:qw,skinning_vertex:Yw,skinnormal_vertex:jw,specularmap_fragment:$w,specularmap_pars_fragment:Kw,tonemapping_fragment:Zw,tonemapping_pars_fragment:Jw,transmission_fragment:Qw,transmission_pars_fragment:eb,uv_pars_fragment:tb,uv_pars_vertex:nb,uv_vertex:ib,worldpos_vertex:rb,background_vert:sb,background_frag:ob,backgroundCube_vert:ab,backgroundCube_frag:lb,cube_vert:cb,cube_frag:ub,depth_vert:db,depth_frag:fb,distanceRGBA_vert:hb,distanceRGBA_frag:pb,equirect_vert:mb,equirect_frag:gb,linedashed_vert:_b,linedashed_frag:vb,meshbasic_vert:yb,meshbasic_frag:xb,meshlambert_vert:Sb,meshlambert_frag:wb,meshmatcap_vert:bb,meshmatcap_frag:Mb,meshnormal_vert:Eb,meshnormal_frag:Tb,meshphong_vert:Ab,meshphong_frag:Cb,meshphysical_vert:Rb,meshphysical_frag:Pb,meshtoon_vert:Lb,meshtoon_frag:Db,points_vert:Ib,points_frag:Ob,shadow_vert:Nb,shadow_frag:Ub,sprite_vert:Fb,sprite_frag:kb},De={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},Yi={basic:{uniforms:kn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:vt.meshbasic_vert,fragmentShader:vt.meshbasic_frag},lambert:{uniforms:kn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Qe(0)}}]),vertexShader:vt.meshlambert_vert,fragmentShader:vt.meshlambert_frag},phong:{uniforms:kn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:vt.meshphong_vert,fragmentShader:vt.meshphong_frag},standard:{uniforms:kn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag},toon:{uniforms:kn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Qe(0)}}]),vertexShader:vt.meshtoon_vert,fragmentShader:vt.meshtoon_frag},matcap:{uniforms:kn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:vt.meshmatcap_vert,fragmentShader:vt.meshmatcap_frag},points:{uniforms:kn([De.points,De.fog]),vertexShader:vt.points_vert,fragmentShader:vt.points_frag},dashed:{uniforms:kn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vt.linedashed_vert,fragmentShader:vt.linedashed_frag},depth:{uniforms:kn([De.common,De.displacementmap]),vertexShader:vt.depth_vert,fragmentShader:vt.depth_frag},normal:{uniforms:kn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:vt.meshnormal_vert,fragmentShader:vt.meshnormal_frag},sprite:{uniforms:kn([De.sprite,De.fog]),vertexShader:vt.sprite_vert,fragmentShader:vt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vt.background_vert,fragmentShader:vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:vt.backgroundCube_vert,fragmentShader:vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vt.cube_vert,fragmentShader:vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vt.equirect_vert,fragmentShader:vt.equirect_frag},distanceRGBA:{uniforms:kn([De.common,De.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vt.distanceRGBA_vert,fragmentShader:vt.distanceRGBA_frag},shadow:{uniforms:kn([De.lights,De.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:vt.shadow_vert,fragmentShader:vt.shadow_frag}};Yi.physical={uniforms:kn([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag};const ql={r:0,b:0,g:0},fs=new nr,Bb=new _t;function zb(r,e,t,n,i,s,o){const a=new Qe(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function g(y){let v=!1;const S=_(y);S===null?p(a,l):S&&S.isColor&&(p(S,1),v=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,v){const S=_(v);S&&(S.isCubeTexture||S.mapping===Jc)?(u===void 0&&(u=new Wn(new vl(1,1,1),new Si({name:"BackgroundCubeMaterial",uniforms:Vo(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),fs.copy(v.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Bb.makeRotationFromEuler(fs)),u.material.toneMapped=Rt.getTransfer(S.colorSpace)!==Vt,(d!==S||f!==S.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=S,f=S.version,h=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Wn(new Li(2,2),new Si({name:"BackgroundMaterial",uniforms:Vo(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Rt.getTransfer(S.colorSpace)!==Vt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,h=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(ql,t_(r)),n.buffers.color.setClear(ql.r,ql.g,ql.b,v,o)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:m,dispose:w}}function Hb(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(b,D,I,H,F){let C=!1;const $=d(H,I,D);s!==$&&(s=$,c(s.object)),C=h(b,H,I,F),C&&_(b,H,I,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(C||o)&&(o=!1,v(b,D,I,H),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function c(b){return r.bindVertexArray(b)}function u(b){return r.deleteVertexArray(b)}function d(b,D,I){const H=I.wireframe===!0;let F=n[b.id];F===void 0&&(F={},n[b.id]=F);let C=F[D.id];C===void 0&&(C={},F[D.id]=C);let $=C[H];return $===void 0&&($=f(l()),C[H]=$),$}function f(b){const D=[],I=[],H=[];for(let F=0;F<t;F++)D[F]=0,I[F]=0,H[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:I,attributeDivisors:H,object:b,attributes:{},index:null}}function h(b,D,I,H){const F=s.attributes,C=D.attributes;let $=0;const K=I.getAttributes();for(const X in K)if(K[X].location>=0){const O=F[X];let q=C[X];if(q===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(q=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(q=b.instanceColor)),O===void 0||O.attribute!==q||q&&O.data!==q.data)return!0;$++}return s.attributesNum!==$||s.index!==H}function _(b,D,I,H){const F={},C=D.attributes;let $=0;const K=I.getAttributes();for(const X in K)if(K[X].location>=0){let O=C[X];O===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(O=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(O=b.instanceColor));const q={};q.attribute=O,O&&O.data&&(q.data=O.data),F[X]=q,$++}s.attributes=F,s.attributesNum=$,s.index=H}function g(){const b=s.newAttributes;for(let D=0,I=b.length;D<I;D++)b[D]=0}function m(b){p(b,0)}function p(b,D){const I=s.newAttributes,H=s.enabledAttributes,F=s.attributeDivisors;I[b]=1,H[b]===0&&(r.enableVertexAttribArray(b),H[b]=1),F[b]!==D&&(r.vertexAttribDivisor(b,D),F[b]=D)}function w(){const b=s.newAttributes,D=s.enabledAttributes;for(let I=0,H=D.length;I<H;I++)D[I]!==b[I]&&(r.disableVertexAttribArray(I),D[I]=0)}function y(b,D,I,H,F,C,$){$===!0?r.vertexAttribIPointer(b,D,I,F,C):r.vertexAttribPointer(b,D,I,H,F,C)}function v(b,D,I,H){g();const F=H.attributes,C=I.getAttributes(),$=D.defaultAttributeValues;for(const K in C){const X=C[K];if(X.location>=0){let pe=F[K];if(pe===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(pe=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(pe=b.instanceColor)),pe!==void 0){const O=pe.normalized,q=pe.itemSize,je=e.get(pe);if(je===void 0)continue;const it=je.buffer,J=je.type,ce=je.bytesPerElement,Pe=J===r.INT||J===r.UNSIGNED_INT||pe.gpuType===Xf;if(pe.isInterleavedBufferAttribute){const ge=pe.data,Ae=ge.stride,tt=pe.offset;if(ge.isInstancedInterleavedBuffer){for(let we=0;we<X.locationSize;we++)p(X.location+we,ge.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let we=0;we<X.locationSize;we++)m(X.location+we);r.bindBuffer(r.ARRAY_BUFFER,it);for(let we=0;we<X.locationSize;we++)y(X.location+we,q/X.locationSize,J,O,Ae*ce,(tt+q/X.locationSize*we)*ce,Pe)}else{if(pe.isInstancedBufferAttribute){for(let ge=0;ge<X.locationSize;ge++)p(X.location+ge,pe.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ge=0;ge<X.locationSize;ge++)m(X.location+ge);r.bindBuffer(r.ARRAY_BUFFER,it);for(let ge=0;ge<X.locationSize;ge++)y(X.location+ge,q/X.locationSize,J,O,q*ce,q/X.locationSize*ge*ce,Pe)}}else if($!==void 0){const O=$[K];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(X.location,O);break;case 3:r.vertexAttrib3fv(X.location,O);break;case 4:r.vertexAttrib4fv(X.location,O);break;default:r.vertexAttrib1fv(X.location,O)}}}}w()}function S(){P();for(const b in n){const D=n[b];for(const I in D){const H=D[I];for(const F in H)u(H[F].object),delete H[F];delete D[I]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const D=n[b.id];for(const I in D){const H=D[I];for(const F in H)u(H[F].object),delete H[F];delete D[I]}delete n[b.id]}function E(b){for(const D in n){const I=n[D];if(I[b.id]===void 0)continue;const H=I[b.id];for(const F in H)u(H[F].object),delete H[F];delete I[b.id]}}function P(){x(),o=!0,s!==i&&(s=i,c(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:x,dispose:S,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:w}}function Vb(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Gb(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==xi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===_l&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==tr&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Ui&&!P)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),w=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=_>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:S,maxSamples:A}}function Wb(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new vs,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const w=s?0:n,y=w*4;let v=p.clippingState||null;l.value=v,v=u(_,f,y,h);for(let S=0;S!==y;++S)v[S]=t[S];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=h;y!==g;++y,v+=4)o.copy(d[y]).applyMatrix4(w,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Xb(r){let e=new WeakMap;function t(o,a){return a===bd?o.mapping=ko:a===Md&&(o.mapping=Bo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===bd||a===Md)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new hx(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const xo=4,Gp=[.125,.215,.35,.446,.526,.582],Ms=20,Bu=new tu,Wp=new Qe;let zu=null,Hu=0,Vu=0,Gu=!1;const ys=(1+Math.sqrt(5))/2,lo=1/ys,Xp=[new V(-ys,lo,0),new V(ys,lo,0),new V(-lo,0,ys),new V(lo,0,ys),new V(0,ys,-lo),new V(0,ys,lo),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],qb=new V;class qp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=qb}=s;zu=this._renderer.getRenderTarget(),Hu=this._renderer.getActiveCubeFace(),Vu=this._renderer.getActiveMipmapLevel(),Gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$p(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zu,Hu,Vu),this._renderer.xr.enabled=Gu,e.scissorTest=!1,Yl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ko||e.mapping===Bo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zu=this._renderer.getRenderTarget(),Hu=this._renderer.getActiveCubeFace(),Vu=this._renderer.getActiveMipmapLevel(),Gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ci,minFilter:ci,generateMipmaps:!1,type:_l,format:xi,colorSpace:qn,depthBuffer:!1},i=Yp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yb(s)),this._blurMaterial=jb(s,e,t)}return i}_compileMaterial(e){const t=new Wn(this._lodPlanes[0],e);this._renderer.compile(t,Bu)}_sceneToCubeUV(e,t,n,i,s){const l=new jn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Wp),d.toneMapping=$r,d.autoClear=!1;const _=new Es({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1}),g=new Wn(new vl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(Wp),m=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));const v=this._cubeSize;Yl(i,y*v,w>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ko||e.mapping===Bo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$p()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Wn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Yl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Bu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xp[(i-s-1)%Xp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Wn(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ms-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Ms;m>Ms&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const p=[];let w=0;for(let E=0;E<Ms;++E){const P=E/g,x=Math.exp(-P*P/2);p.push(x),E===0?w+=x:E<m&&(w+=2*x)}for(let E=0;E<p.length;E++)p[E]=p[E]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=_,f.mipInt.value=y-n;const v=this._sizeLods[i],S=3*v*(i>y-xo?i-y+xo:0),A=4*(this._cubeSize-v);Yl(t,S,A,3*v,2*v),l.setRenderTarget(t),l.render(d,Bu)}}function Yb(r){const e=[],t=[],n=[];let i=r;const s=r-xo+1+Gp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-xo?l=Gp[o-r+xo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,w=new Float32Array(g*_*h),y=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let A=0;A<h;A++){const E=A%3*2/3-1,P=A>2?0:-1,x=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];w.set(x,g*_*A),y.set(f,m*_*A);const b=[A,A,A,A,A,A];v.set(b,p*_*A)}const S=new Ei;S.setAttribute("position",new kt(w,g)),S.setAttribute("uv",new kt(y,m)),S.setAttribute("faceIndex",new kt(v,p)),e.push(S),i>xo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yp(r,e,t){const n=new Bs(r,e,t);return n.texture.mapping=Jc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function jb(r,e,t){const n=new Float32Array(Ms),i=new V(0,1,0);return new Si({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:lh(),fragmentShader:`

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
		`,blending:Yr,depthTest:!1,depthWrite:!1})}function jp(){return new Si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lh(),fragmentShader:`

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
		`,blending:Yr,depthTest:!1,depthWrite:!1})}function $p(){return new Si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yr,depthTest:!1,depthWrite:!1})}function lh(){return`

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
	`}function $b(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===bd||l===Md,u=l===ko||l===Bo;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new qp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new qp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Kb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&To("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Zb(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const w=h.array;g=h.version;for(let y=0,v=w.length;y<v;y+=3){const S=w[y+0],A=w[y+1],E=w[y+2];f.push(S,A,A,E,E,S)}}else if(_!==void 0){const w=_.array;g=_.version;for(let y=0,v=w.length/3-1;y<v;y+=3){const S=y+0,A=y+1,E=y+2;f.push(S,A,A,E,E,S)}}else return;const m=new($g(f)?e_:Qg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Jb(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let w=0;w<_;w++)p+=h[w]*g[w];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Qb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function eM(r,e,t){const n=new WeakMap,i=new It;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let b=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var h=b;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let S=a.attributes.position.count*v,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*A*4*d),P=new Kg(E,S,A,d);P.type=Ui,P.needsUpdate=!0;const x=v*4;for(let D=0;D<d;D++){const I=p[D],H=w[D],F=y[D],C=S*A*4*D;for(let $=0;$<I.count;$++){const K=$*x;_===!0&&(i.fromBufferAttribute(I,$),E[C+K+0]=i.x,E[C+K+1]=i.y,E[C+K+2]=i.z,E[C+K+3]=0),g===!0&&(i.fromBufferAttribute(H,$),E[C+K+4]=i.x,E[C+K+5]=i.y,E[C+K+6]=i.z,E[C+K+7]=0),m===!0&&(i.fromBufferAttribute(F,$),E[C+K+8]=i.x,E[C+K+9]=i.y,E[C+K+10]=i.z,E[C+K+11]=F.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new Mt(S,A)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function tM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const p_=new dn,Kp=new l_(1,1),m_=new Kg,g_=new Ky,__=new i_,Zp=[],Jp=[],Qp=new Float32Array(16),em=new Float32Array(9),tm=new Float32Array(4);function ia(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Zp[i];if(s===void 0&&(s=new Float32Array(i),Zp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function fn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function hn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function nu(r,e){let t=Jp[e];t===void 0&&(t=new Int32Array(e),Jp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function nM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2fv(this.addr,e),hn(t,e)}}function rM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(fn(t,e))return;r.uniform3fv(this.addr,e),hn(t,e)}}function sM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4fv(this.addr,e),hn(t,e)}}function oM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;tm.set(n),r.uniformMatrix2fv(this.addr,!1,tm),hn(t,n)}}function aM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;em.set(n),r.uniformMatrix3fv(this.addr,!1,em),hn(t,n)}}function lM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),hn(t,e)}else{if(fn(t,n))return;Qp.set(n),r.uniformMatrix4fv(this.addr,!1,Qp),hn(t,n)}}function cM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function uM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2iv(this.addr,e),hn(t,e)}}function dM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;r.uniform3iv(this.addr,e),hn(t,e)}}function fM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4iv(this.addr,e),hn(t,e)}}function hM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function pM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;r.uniform2uiv(this.addr,e),hn(t,e)}}function mM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;r.uniform3uiv(this.addr,e),hn(t,e)}}function gM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;r.uniform4uiv(this.addr,e),hn(t,e)}}function _M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Kp.compareFunction=jg,s=Kp):s=p_,t.setTexture2D(e||s,i)}function vM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||g_,i)}function yM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||__,i)}function xM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||m_,i)}function SM(r){switch(r){case 5126:return nM;case 35664:return iM;case 35665:return rM;case 35666:return sM;case 35674:return oM;case 35675:return aM;case 35676:return lM;case 5124:case 35670:return cM;case 35667:case 35671:return uM;case 35668:case 35672:return dM;case 35669:case 35673:return fM;case 5125:return hM;case 36294:return pM;case 36295:return mM;case 36296:return gM;case 35678:case 36198:case 36298:case 36306:case 35682:return _M;case 35679:case 36299:case 36307:return vM;case 35680:case 36300:case 36308:case 36293:return yM;case 36289:case 36303:case 36311:case 36292:return xM}}function wM(r,e){r.uniform1fv(this.addr,e)}function bM(r,e){const t=ia(e,this.size,2);r.uniform2fv(this.addr,t)}function MM(r,e){const t=ia(e,this.size,3);r.uniform3fv(this.addr,t)}function EM(r,e){const t=ia(e,this.size,4);r.uniform4fv(this.addr,t)}function TM(r,e){const t=ia(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function AM(r,e){const t=ia(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function CM(r,e){const t=ia(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function RM(r,e){r.uniform1iv(this.addr,e)}function PM(r,e){r.uniform2iv(this.addr,e)}function LM(r,e){r.uniform3iv(this.addr,e)}function DM(r,e){r.uniform4iv(this.addr,e)}function IM(r,e){r.uniform1uiv(this.addr,e)}function OM(r,e){r.uniform2uiv(this.addr,e)}function NM(r,e){r.uniform3uiv(this.addr,e)}function UM(r,e){r.uniform4uiv(this.addr,e)}function FM(r,e,t){const n=this.cache,i=e.length,s=nu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||p_,s[o])}function kM(r,e,t){const n=this.cache,i=e.length,s=nu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||g_,s[o])}function BM(r,e,t){const n=this.cache,i=e.length,s=nu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||__,s[o])}function zM(r,e,t){const n=this.cache,i=e.length,s=nu(t,i);fn(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||m_,s[o])}function HM(r){switch(r){case 5126:return wM;case 35664:return bM;case 35665:return MM;case 35666:return EM;case 35674:return TM;case 35675:return AM;case 35676:return CM;case 5124:case 35670:return RM;case 35667:case 35671:return PM;case 35668:case 35672:return LM;case 35669:case 35673:return DM;case 5125:return IM;case 36294:return OM;case 36295:return NM;case 36296:return UM;case 35678:case 36198:case 36298:case 36306:case 35682:return FM;case 35679:case 36299:case 36307:return kM;case 35680:case 36300:case 36308:case 36293:return BM;case 36289:case 36303:case 36311:case 36292:return zM}}class VM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=SM(t.type)}}class GM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HM(t.type)}}class WM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Wu=/(\w+)(\])?(\[|\.)?/g;function nm(r,e){r.seq.push(e),r.map[e.id]=e}function XM(r,e,t){const n=r.name,i=n.length;for(Wu.lastIndex=0;;){const s=Wu.exec(n),o=Wu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){nm(t,c===void 0?new VM(a,r,e):new GM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new WM(a),nm(t,d)),t=d}}}class yc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);XM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function im(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const qM=37297;let YM=0;function jM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const rm=new gt;function $M(r){Rt._getMatrix(rm,Rt.workingColorSpace,r);const e=`mat3( ${rm.elements.map(t=>t.toFixed(4))} )`;switch(Rt.getTransfer(r)){case Lc:return[e,"LinearTransferOETF"];case Vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function sm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+jM(r.getShaderSource(e),o)}else return i}function KM(r,e){const t=$M(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ZM(r,e){let t;switch(e){case ry:t="Linear";break;case sy:t="Reinhard";break;case oy:t="Cineon";break;case ay:t="ACESFilmic";break;case cy:t="AgX";break;case uy:t="Neutral";break;case ly:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jl=new V;function JM(){Rt.getLuminanceCoefficients(jl);const r=jl.x.toFixed(4),e=jl.y.toFixed(4),t=jl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function eE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function wa(r){return r!==""}function om(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function am(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nE=/^[ \t]*#include +<([\w\d./]+)>/gm;function nf(r){return r.replace(nE,rE)}const iE=new Map;function rE(r,e){let t=vt[e];if(t===void 0){const n=iE.get(e);if(n!==void 0)t=vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return nf(t)}const sE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lm(r){return r.replace(sE,oE)}function oE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function cm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function aE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ng?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Fv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===fr&&(e="SHADOWMAP_TYPE_VSM"),e}function lE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ko:case Bo:e="ENVMAP_TYPE_CUBE";break;case Jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Bo:e="ENVMAP_MODE_REFRACTION";break}return e}function uE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ug:e="ENVMAP_BLENDING_MULTIPLY";break;case ny:e="ENVMAP_BLENDING_MIX";break;case iy:e="ENVMAP_BLENDING_ADD";break}return e}function dE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function fE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=aE(t),c=lE(t),u=cE(t),d=uE(t),f=dE(t),h=QM(t),_=eE(s),g=i.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wa).join(`
`),p.length>0&&(p+=`
`)):(m=[cm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),p=[cm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$r?"#define TONE_MAPPING":"",t.toneMapping!==$r?vt.tonemapping_pars_fragment:"",t.toneMapping!==$r?ZM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",vt.colorspace_pars_fragment,KM("linearToOutputTexel",t.outputColorSpace),JM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wa).join(`
`)),o=nf(o),o=om(o,t),o=am(o,t),a=nf(a),a=om(a,t),a=am(a,t),o=lm(o),a=lm(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=w+m+o,v=w+p+a,S=im(i,i.VERTEX_SHADER,y),A=im(i,i.FRAGMENT_SHADER,v);i.attachShader(g,S),i.attachShader(g,A),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(D){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(g).trim(),H=i.getShaderInfoLog(S).trim(),F=i.getShaderInfoLog(A).trim();let C=!0,$=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(C=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,S,A);else{const K=sm(i,S,"vertex"),X=sm(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+I+`
`+K+`
`+X)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(H===""||F==="")&&($=!1);$&&(D.diagnostics={runnable:C,programLog:I,vertexShader:{log:H,prefix:m},fragmentShader:{log:F,prefix:p}})}i.deleteShader(S),i.deleteShader(A),P=new yc(i,g),x=tE(i,g)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let x;this.getAttributes=function(){return x===void 0&&E(this),x};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(g,qM)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=YM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=A,this}let hE=0;class pE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new mE(e),t.set(e,n)),n}}class mE{constructor(e){this.id=hE++,this.code=e,this.usedTimes=0}}function gE(r,e,t,n,i,s,o){const a=new Zg,l=new pE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,b,D,I,H){const F=I.fog,C=H.geometry,$=x.isMeshStandardMaterial?I.environment:null,K=(x.isMeshStandardMaterial?t:e).get(x.envMap||$),X=K&&K.mapping===Jc?K.image.height:null,pe=_[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const O=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,q=O!==void 0?O.length:0;let je=0;C.morphAttributes.position!==void 0&&(je=1),C.morphAttributes.normal!==void 0&&(je=2),C.morphAttributes.color!==void 0&&(je=3);let it,J,ce,Pe;if(pe){const Le=Yi[pe];it=Le.vertexShader,J=Le.fragmentShader}else it=x.vertexShader,J=x.fragmentShader,l.update(x),ce=l.getVertexShaderID(x),Pe=l.getFragmentShaderID(x);const ge=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),tt=H.isInstancedMesh===!0,we=H.isBatchedMesh===!0,ht=!!x.map,pt=!!x.matcap,Ue=!!K,U=!!x.aoMap,ct=!!x.lightMap,st=!!x.bumpMap,Y=!!x.normalMap,Ie=!!x.displacementMap,ot=!!x.emissiveMap,Be=!!x.metalnessMap,Oe=!!x.roughnessMap,Pt=x.anisotropy>0,L=x.clearcoat>0,T=x.dispersion>0,W=x.iridescence>0,te=x.sheen>0,ie=x.transmission>0,Q=Pt&&!!x.anisotropyMap,xe=L&&!!x.clearcoatMap,_e=L&&!!x.clearcoatNormalMap,ze=L&&!!x.clearcoatRoughnessMap,re=W&&!!x.iridescenceMap,le=W&&!!x.iridescenceThicknessMap,be=te&&!!x.sheenColorMap,Ee=te&&!!x.sheenRoughnessMap,$e=!!x.specularMap,Se=!!x.specularColorMap,Me=!!x.specularIntensityMap,N=ie&&!!x.transmissionMap,me=ie&&!!x.thicknessMap,ue=!!x.gradientMap,Ce=!!x.alphaMap,he=x.alphaTest>0,ae=!!x.alphaHash,Fe=!!x.extensions;let He=$r;x.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(He=r.toneMapping);const Et={shaderID:pe,shaderType:x.type,shaderName:x.name,vertexShader:it,fragmentShader:J,defines:x.defines,customVertexShaderID:ce,customFragmentShaderID:Pe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:we,batchingColor:we&&H._colorsTexture!==null,instancing:tt,instancingColor:tt&&H.instanceColor!==null,instancingMorph:tt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ge===null?r.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:qn,alphaToCoverage:!!x.alphaToCoverage,map:ht,matcap:pt,envMap:Ue,envMapMode:Ue&&K.mapping,envMapCubeUVHeight:X,aoMap:U,lightMap:ct,bumpMap:st,normalMap:Y,displacementMap:f&&Ie,emissiveMap:ot,normalMapObjectSpace:Y&&x.normalMapType===gy,normalMapTangentSpace:Y&&x.normalMapType===Yg,metalnessMap:Be,roughnessMap:Oe,anisotropy:Pt,anisotropyMap:Q,clearcoat:L,clearcoatMap:xe,clearcoatNormalMap:_e,clearcoatRoughnessMap:ze,dispersion:T,iridescence:W,iridescenceMap:re,iridescenceThicknessMap:le,sheen:te,sheenColorMap:be,sheenRoughnessMap:Ee,specularMap:$e,specularColorMap:Se,specularIntensityMap:Me,transmission:ie,transmissionMap:N,thicknessMap:me,gradientMap:ue,opaque:x.transparent===!1&&x.blending===jr&&x.alphaToCoverage===!1,alphaMap:Ce,alphaTest:he,alphaHash:ae,combine:x.combine,mapUv:ht&&g(x.map.channel),aoMapUv:U&&g(x.aoMap.channel),lightMapUv:ct&&g(x.lightMap.channel),bumpMapUv:st&&g(x.bumpMap.channel),normalMapUv:Y&&g(x.normalMap.channel),displacementMapUv:Ie&&g(x.displacementMap.channel),emissiveMapUv:ot&&g(x.emissiveMap.channel),metalnessMapUv:Be&&g(x.metalnessMap.channel),roughnessMapUv:Oe&&g(x.roughnessMap.channel),anisotropyMapUv:Q&&g(x.anisotropyMap.channel),clearcoatMapUv:xe&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:_e&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(x.sheenRoughnessMap.channel),specularMapUv:$e&&g(x.specularMap.channel),specularColorMapUv:Se&&g(x.specularColorMap.channel),specularIntensityMapUv:Me&&g(x.specularIntensityMap.channel),transmissionMapUv:N&&g(x.transmissionMap.channel),thicknessMapUv:me&&g(x.thicknessMap.channel),alphaMapUv:Ce&&g(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(Y||Pt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!C.attributes.uv&&(ht||Ce),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ae,skinning:H.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:je,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:He,decodeVideoTexture:ht&&x.map.isVideoTexture===!0&&Rt.getTransfer(x.map.colorSpace)===Vt,decodeVideoTextureEmissive:ot&&x.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(x.emissiveMap.colorSpace)===Vt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===yi,flipSided:x.side===$n,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Fe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&x.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function p(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)b.push(D),b.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(w(b,x),y(b,x),b.push(r.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function w(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function y(x,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const b=_[x.type];let D;if(b){const I=Yi[b];D=cx.clone(I.uniforms)}else D=x.uniforms;return D}function S(x,b){let D;for(let I=0,H=u.length;I<H;I++){const F=u[I];if(F.cacheKey===b){D=F,++D.usedTimes;break}}return D===void 0&&(D=new fE(r,b,x,s),u.push(D)),D}function A(x){if(--x.usedTimes===0){const b=u.indexOf(x);u[b]=u[u.length-1],u.pop(),x.destroy()}}function E(x){l.remove(x)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:S,releaseProgram:A,releaseShaderCache:E,programs:u,dispose:P}}function _E(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function vE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function um(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function dm(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||vE),n.length>1&&n.sort(f||um),i.length>1&&i.sort(f||um)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function yE(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new dm,r.set(n,[o])):i>=s.length?(o=new dm,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function xE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Qe};break;case"SpotLight":t={position:new V,direction:new V,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=t,t}}}function SE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let wE=0;function bE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ME(r){const e=new xE,t=SE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const i=new V,s=new _t,o=new _t;function a(c){let u=0,d=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,w=0,y=0,v=0,S=0,A=0,E=0;c.sort(bE);for(let x=0,b=c.length;x<b;x++){const D=c[x],I=D.color,H=D.intensity,F=D.distance,C=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=I.r*H,d+=I.g*H,f+=I.b*H;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],H);E++}else if(D.isDirectionalLight){const $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const K=D.shadow,X=t.get(D);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,n.directionalShadow[h]=X,n.directionalShadowMap[h]=C,n.directionalShadowMatrix[h]=D.shadow.matrix,w++}n.directional[h]=$,h++}else if(D.isSpotLight){const $=e.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(I).multiplyScalar(H),$.distance=F,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[g]=$;const K=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,K.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[g]=K.matrix,D.castShadow){const X=t.get(D);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,n.spotShadow[g]=X,n.spotShadowMap[g]=C,v++}g++}else if(D.isRectAreaLight){const $=e.get(D);$.color.copy(I).multiplyScalar(H),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=$,m++}else if(D.isPointLight){const $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){const K=D.shadow,X=t.get(D);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,X.shadowCameraNear=K.camera.near,X.shadowCameraFar=K.camera.far,n.pointShadow[_]=X,n.pointShadowMap[_]=C,n.pointShadowMatrix[_]=D.shadow.matrix,y++}n.point[_]=$,_++}else if(D.isHemisphereLight){const $=e.get(D);$.skyColor.copy(D.color).multiplyScalar(H),$.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[p]=$,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==w||P.numPointShadows!==y||P.numSpotShadows!==v||P.numSpotMaps!==S||P.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+S-A,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=w,P.numPointShadows=y,P.numSpotShadows=v,P.numSpotMaps=S,P.numLightProbes=E,n.version=wE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const y=c[p];if(y.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(y.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function fm(r){const e=new ME(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function EE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new fm(r),e.set(i,[a])):s>=o.length?(a=new fm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const TE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AE=`uniform sampler2D shadow_pass;
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
}`;function CE(r,e,t){let n=new nh;const i=new Mt,s=new Mt,o=new It,a=new Ex({depthPacking:my}),l=new Tx,c={},u=t.maxTextureSize,d={[Er]:$n,[$n]:Er,[yi]:yi},f=new Si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:TE,fragmentShader:AE}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Ei;_.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Wn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ng;let p=this.type;this.render=function(A,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const x=r.getRenderTarget(),b=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),I=r.state;I.setBlending(Yr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const H=p!==fr&&this.type===fr,F=p===fr&&this.type!==fr;for(let C=0,$=A.length;C<$;C++){const K=A[C],X=K.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const pe=X.getFrameExtents();if(i.multiply(pe),s.copy(X.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/pe.x),i.x=s.x*pe.x,X.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/pe.y),i.y=s.y*pe.y,X.mapSize.y=s.y)),X.map===null||H===!0||F===!0){const q=this.type!==fr?{minFilter:Xn,magFilter:Xn}:{};X.map!==null&&X.map.dispose(),X.map=new Bs(i.x,i.y,q),X.map.texture.name=K.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const O=X.getViewportCount();for(let q=0;q<O;q++){const je=X.getViewport(q);o.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),I.viewport(o),X.updateMatrices(K,q),n=X.getFrustum(),v(E,P,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===fr&&w(X,P),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(x,b,D)};function w(A,E){const P=e.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Bs(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(E,null,P,f,g,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(E,null,P,h,g,null)}function y(A,E,P,x){let b=null;const D=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)b=D;else if(b=P.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const I=b.uuid,H=E.uuid;let F=c[I];F===void 0&&(F={},c[I]=F);let C=F[H];C===void 0&&(C=b.clone(),F[H]=C,E.addEventListener("dispose",S)),b=C}if(b.visible=E.visible,b.wireframe=E.wireframe,x===fr?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:d[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const I=r.properties.get(b);I.light=P}return b}function v(A,E,P,x,b){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===fr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const H=e.update(A),F=A.material;if(Array.isArray(F)){const C=H.groups;for(let $=0,K=C.length;$<K;$++){const X=C[$],pe=F[X.materialIndex];if(pe&&pe.visible){const O=y(A,pe,x,b);A.onBeforeShadow(r,A,E,P,H,O,X),r.renderBufferDirect(P,null,H,O,A,X),A.onAfterShadow(r,A,E,P,H,O,X)}}}else if(F.visible){const C=y(A,F,x,b);A.onBeforeShadow(r,A,E,P,H,C,null),r.renderBufferDirect(P,null,H,C,A,null),A.onAfterShadow(r,A,E,P,H,C,null)}}const I=A.children;for(let H=0,F=I.length;H<F;H++)v(I[H],E,P,x,b)}function S(A){A.target.removeEventListener("dispose",S);for(const P in c){const x=c[P],b=A.target.uuid;b in x&&(x[b].dispose(),delete x[b])}}}const RE={[gd]:_d,[vd]:Sd,[yd]:wd,[Fo]:xd,[_d]:gd,[Sd]:vd,[wd]:yd,[xd]:Fo};function PE(r,e){function t(){let N=!1;const me=new It;let ue=null;const Ce=new It(0,0,0,0);return{setMask:function(he){ue!==he&&!N&&(r.colorMask(he,he,he,he),ue=he)},setLocked:function(he){N=he},setClear:function(he,ae,Fe,He,Et){Et===!0&&(he*=He,ae*=He,Fe*=He),me.set(he,ae,Fe,He),Ce.equals(me)===!1&&(r.clearColor(he,ae,Fe,He),Ce.copy(me))},reset:function(){N=!1,ue=null,Ce.set(-1,0,0,0)}}}function n(){let N=!1,me=!1,ue=null,Ce=null,he=null;return{setReversed:function(ae){if(me!==ae){const Fe=e.get("EXT_clip_control");ae?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),me=ae;const He=he;he=null,this.setClear(He)}},getReversed:function(){return me},setTest:function(ae){ae?ge(r.DEPTH_TEST):Ae(r.DEPTH_TEST)},setMask:function(ae){ue!==ae&&!N&&(r.depthMask(ae),ue=ae)},setFunc:function(ae){if(me&&(ae=RE[ae]),Ce!==ae){switch(ae){case gd:r.depthFunc(r.NEVER);break;case _d:r.depthFunc(r.ALWAYS);break;case vd:r.depthFunc(r.LESS);break;case Fo:r.depthFunc(r.LEQUAL);break;case yd:r.depthFunc(r.EQUAL);break;case xd:r.depthFunc(r.GEQUAL);break;case Sd:r.depthFunc(r.GREATER);break;case wd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ce=ae}},setLocked:function(ae){N=ae},setClear:function(ae){he!==ae&&(me&&(ae=1-ae),r.clearDepth(ae),he=ae)},reset:function(){N=!1,ue=null,Ce=null,he=null,me=!1}}}function i(){let N=!1,me=null,ue=null,Ce=null,he=null,ae=null,Fe=null,He=null,Et=null;return{setTest:function(Le){N||(Le?ge(r.STENCIL_TEST):Ae(r.STENCIL_TEST))},setMask:function(Le){me!==Le&&!N&&(r.stencilMask(Le),me=Le)},setFunc:function(Le,Re,rt){(ue!==Le||Ce!==Re||he!==rt)&&(r.stencilFunc(Le,Re,rt),ue=Le,Ce=Re,he=rt)},setOp:function(Le,Re,rt){(ae!==Le||Fe!==Re||He!==rt)&&(r.stencilOp(Le,Re,rt),ae=Le,Fe=Re,He=rt)},setLocked:function(Le){N=Le},setClear:function(Le){Et!==Le&&(r.clearStencil(Le),Et=Le)},reset:function(){N=!1,me=null,ue=null,Ce=null,he=null,ae=null,Fe=null,He=null,Et=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,w=null,y=null,v=null,S=null,A=null,E=new Qe(0,0,0),P=0,x=!1,b=null,D=null,I=null,H=null,F=null;const C=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,K=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(X)[1]),$=K>=1):X.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),$=K>=2);let pe=null,O={};const q=r.getParameter(r.SCISSOR_BOX),je=r.getParameter(r.VIEWPORT),it=new It().fromArray(q),J=new It().fromArray(je);function ce(N,me,ue,Ce){const he=new Uint8Array(4),ae=r.createTexture();r.bindTexture(N,ae),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Fe=0;Fe<ue;Fe++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Ce,0,r.RGBA,r.UNSIGNED_BYTE,he):r.texImage2D(me+Fe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,he);return ae}const Pe={};Pe[r.TEXTURE_2D]=ce(r.TEXTURE_2D,r.TEXTURE_2D,1),Pe[r.TEXTURE_CUBE_MAP]=ce(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pe[r.TEXTURE_2D_ARRAY]=ce(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Pe[r.TEXTURE_3D]=ce(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ge(r.DEPTH_TEST),o.setFunc(Fo),st(!1),Y(Kh),ge(r.CULL_FACE),U(Yr);function ge(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Ae(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function tt(N,me){return d[N]!==me?(r.bindFramebuffer(N,me),d[N]=me,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=me),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=me),!0):!1}function we(N,me){let ue=h,Ce=!1;if(N){ue=f.get(me),ue===void 0&&(ue=[],f.set(me,ue));const he=N.textures;if(ue.length!==he.length||ue[0]!==r.COLOR_ATTACHMENT0){for(let ae=0,Fe=he.length;ae<Fe;ae++)ue[ae]=r.COLOR_ATTACHMENT0+ae;ue.length=he.length,Ce=!0}}else ue[0]!==r.BACK&&(ue[0]=r.BACK,Ce=!0);Ce&&r.drawBuffers(ue)}function ht(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const pt={[bs]:r.FUNC_ADD,[Bv]:r.FUNC_SUBTRACT,[zv]:r.FUNC_REVERSE_SUBTRACT};pt[Hv]=r.MIN,pt[Vv]=r.MAX;const Ue={[Gv]:r.ZERO,[Wv]:r.ONE,[Xv]:r.SRC_COLOR,[pd]:r.SRC_ALPHA,[Zv]:r.SRC_ALPHA_SATURATE,[$v]:r.DST_COLOR,[Yv]:r.DST_ALPHA,[qv]:r.ONE_MINUS_SRC_COLOR,[md]:r.ONE_MINUS_SRC_ALPHA,[Kv]:r.ONE_MINUS_DST_COLOR,[jv]:r.ONE_MINUS_DST_ALPHA,[Jv]:r.CONSTANT_COLOR,[Qv]:r.ONE_MINUS_CONSTANT_COLOR,[ey]:r.CONSTANT_ALPHA,[ty]:r.ONE_MINUS_CONSTANT_ALPHA};function U(N,me,ue,Ce,he,ae,Fe,He,Et,Le){if(N===Yr){g===!0&&(Ae(r.BLEND),g=!1);return}if(g===!1&&(ge(r.BLEND),g=!0),N!==kv){if(N!==m||Le!==x){if((p!==bs||v!==bs)&&(r.blendEquation(r.FUNC_ADD),p=bs,v=bs),Le)switch(N){case jr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Rc:r.blendFunc(r.ONE,r.ONE);break;case Zh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Jh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case jr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Rc:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Zh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Jh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}w=null,y=null,S=null,A=null,E.set(0,0,0),P=0,m=N,x=Le}return}he=he||me,ae=ae||ue,Fe=Fe||Ce,(me!==p||he!==v)&&(r.blendEquationSeparate(pt[me],pt[he]),p=me,v=he),(ue!==w||Ce!==y||ae!==S||Fe!==A)&&(r.blendFuncSeparate(Ue[ue],Ue[Ce],Ue[ae],Ue[Fe]),w=ue,y=Ce,S=ae,A=Fe),(He.equals(E)===!1||Et!==P)&&(r.blendColor(He.r,He.g,He.b,Et),E.copy(He),P=Et),m=N,x=!1}function ct(N,me){N.side===yi?Ae(r.CULL_FACE):ge(r.CULL_FACE);let ue=N.side===$n;me&&(ue=!ue),st(ue),N.blending===jr&&N.transparent===!1?U(Yr):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ce=N.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ot(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ge(r.SAMPLE_ALPHA_TO_COVERAGE):Ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function st(N){b!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),b=N)}function Y(N){N!==Nv?(ge(r.CULL_FACE),N!==D&&(N===Kh?r.cullFace(r.BACK):N===Uv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ae(r.CULL_FACE),D=N}function Ie(N){N!==I&&($&&r.lineWidth(N),I=N)}function ot(N,me,ue){N?(ge(r.POLYGON_OFFSET_FILL),(H!==me||F!==ue)&&(r.polygonOffset(me,ue),H=me,F=ue)):Ae(r.POLYGON_OFFSET_FILL)}function Be(N){N?ge(r.SCISSOR_TEST):Ae(r.SCISSOR_TEST)}function Oe(N){N===void 0&&(N=r.TEXTURE0+C-1),pe!==N&&(r.activeTexture(N),pe=N)}function Pt(N,me,ue){ue===void 0&&(pe===null?ue=r.TEXTURE0+C-1:ue=pe);let Ce=O[ue];Ce===void 0&&(Ce={type:void 0,texture:void 0},O[ue]=Ce),(Ce.type!==N||Ce.texture!==me)&&(pe!==ue&&(r.activeTexture(ue),pe=ue),r.bindTexture(N,me||Pe[N]),Ce.type=N,Ce.texture=me)}function L(){const N=O[pe];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function T(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(N){it.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),it.copy(N))}function Ee(N){J.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),J.copy(N))}function $e(N,me){let ue=c.get(me);ue===void 0&&(ue=new WeakMap,c.set(me,ue));let Ce=ue.get(N);Ce===void 0&&(Ce=r.getUniformBlockIndex(me,N.name),ue.set(N,Ce))}function Se(N,me){const Ce=c.get(me).get(N);l.get(me)!==Ce&&(r.uniformBlockBinding(me,Ce,N.__bindingPointIndex),l.set(me,Ce))}function Me(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},pe=null,O={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,w=null,y=null,v=null,S=null,A=null,E=new Qe(0,0,0),P=0,x=!1,b=null,D=null,I=null,H=null,F=null,it.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ge,disable:Ae,bindFramebuffer:tt,drawBuffers:we,useProgram:ht,setBlending:U,setMaterial:ct,setFlipSided:st,setCullFace:Y,setLineWidth:Ie,setPolygonOffset:ot,setScissorTest:Be,activeTexture:Oe,bindTexture:Pt,unbindTexture:L,compressedTexImage2D:T,compressedTexImage3D:W,texImage2D:re,texImage3D:le,updateUBOMapping:$e,uniformBlockBinding:Se,texStorage2D:_e,texStorage3D:ze,texSubImage2D:te,texSubImage3D:ie,compressedTexSubImage2D:Q,compressedTexSubImage3D:xe,scissor:be,viewport:Ee,reset:Me}}function LE(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,T){return h?new OffscreenCanvas(L,T):sl("canvas")}function g(L,T,W){let te=1;const ie=Pt(L);if((ie.width>W||ie.height>W)&&(te=W/Math.max(ie.width,ie.height)),te<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor(te*ie.width),xe=Math.floor(te*ie.height);d===void 0&&(d=_(Q,xe));const _e=T?_(Q,xe):d;return _e.width=Q,_e.height=xe,_e.getContext("2d").drawImage(L,0,0,Q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Q+"x"+xe+")."),_e}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){r.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(L,T,W,te,ie=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=T;if(T===r.RED&&(W===r.FLOAT&&(Q=r.R32F),W===r.HALF_FLOAT&&(Q=r.R16F),W===r.UNSIGNED_BYTE&&(Q=r.R8)),T===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(Q=r.R8UI),W===r.UNSIGNED_SHORT&&(Q=r.R16UI),W===r.UNSIGNED_INT&&(Q=r.R32UI),W===r.BYTE&&(Q=r.R8I),W===r.SHORT&&(Q=r.R16I),W===r.INT&&(Q=r.R32I)),T===r.RG&&(W===r.FLOAT&&(Q=r.RG32F),W===r.HALF_FLOAT&&(Q=r.RG16F),W===r.UNSIGNED_BYTE&&(Q=r.RG8)),T===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(Q=r.RG8UI),W===r.UNSIGNED_SHORT&&(Q=r.RG16UI),W===r.UNSIGNED_INT&&(Q=r.RG32UI),W===r.BYTE&&(Q=r.RG8I),W===r.SHORT&&(Q=r.RG16I),W===r.INT&&(Q=r.RG32I)),T===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),W===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),W===r.UNSIGNED_INT&&(Q=r.RGB32UI),W===r.BYTE&&(Q=r.RGB8I),W===r.SHORT&&(Q=r.RGB16I),W===r.INT&&(Q=r.RGB32I)),T===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),W===r.UNSIGNED_INT&&(Q=r.RGBA32UI),W===r.BYTE&&(Q=r.RGBA8I),W===r.SHORT&&(Q=r.RGBA16I),W===r.INT&&(Q=r.RGBA32I)),T===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),T===r.RGBA){const xe=ie?Lc:Rt.getTransfer(te);W===r.FLOAT&&(Q=r.RGBA32F),W===r.HALF_FLOAT&&(Q=r.RGBA16F),W===r.UNSIGNED_BYTE&&(Q=xe===Vt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(L,T){let W;return L?T===null||T===ks||T===el?W=r.DEPTH24_STENCIL8:T===Ui?W=r.DEPTH32F_STENCIL8:T===Qa&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ks||T===el?W=r.DEPTH_COMPONENT24:T===Ui?W=r.DEPTH_COMPONENT32F:T===Qa&&(W=r.DEPTH_COMPONENT16),W}function S(L,T){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Xn&&L.minFilter!==ci?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function A(L){const T=L.target;T.removeEventListener("dispose",A),P(T),T.isVideoTexture&&u.delete(T)}function E(L){const T=L.target;T.removeEventListener("dispose",E),b(T)}function P(L){const T=n.get(L);if(T.__webglInit===void 0)return;const W=L.source,te=f.get(W);if(te){const ie=te[T.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&x(L),Object.keys(te).length===0&&f.delete(W)}n.remove(L)}function x(L){const T=n.get(L);r.deleteTexture(T.__webglTexture);const W=L.source,te=f.get(W);delete te[T.__cacheKey],o.memory.textures--}function b(L){const T=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(T.__webglFramebuffer[te]))for(let ie=0;ie<T.__webglFramebuffer[te].length;ie++)r.deleteFramebuffer(T.__webglFramebuffer[te][ie]);else r.deleteFramebuffer(T.__webglFramebuffer[te]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[te])}else{if(Array.isArray(T.__webglFramebuffer))for(let te=0;te<T.__webglFramebuffer.length;te++)r.deleteFramebuffer(T.__webglFramebuffer[te]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let te=0;te<T.__webglColorRenderbuffer.length;te++)T.__webglColorRenderbuffer[te]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[te]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const W=L.textures;for(let te=0,ie=W.length;te<ie;te++){const Q=n.get(W[te]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(W[te])}n.remove(L)}let D=0;function I(){D=0}function H(){const L=D;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),D+=1,L}function F(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function C(L,T){const W=n.get(L);if(L.isVideoTexture&&Be(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const te=L.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(W,L,T);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+T)}function $(L,T){const W=n.get(L);if(L.version>0&&W.__version!==L.version){Pe(W,L,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+T)}function K(L,T){const W=n.get(L);if(L.version>0&&W.__version!==L.version){Pe(W,L,T);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+T)}function X(L,T){const W=n.get(L);if(L.version>0&&W.__version!==L.version){ge(W,L,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+T)}const pe={[zo]:r.REPEAT,[Br]:r.CLAMP_TO_EDGE,[Pc]:r.MIRRORED_REPEAT},O={[Xn]:r.NEAREST,[kg]:r.NEAREST_MIPMAP_NEAREST,[Sa]:r.NEAREST_MIPMAP_LINEAR,[ci]:r.LINEAR,[hc]:r.LINEAR_MIPMAP_NEAREST,[_r]:r.LINEAR_MIPMAP_LINEAR},q={[_y]:r.NEVER,[by]:r.ALWAYS,[vy]:r.LESS,[jg]:r.LEQUAL,[yy]:r.EQUAL,[wy]:r.GEQUAL,[xy]:r.GREATER,[Sy]:r.NOTEQUAL};function je(L,T){if(T.type===Ui&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===ci||T.magFilter===hc||T.magFilter===Sa||T.magFilter===_r||T.minFilter===ci||T.minFilter===hc||T.minFilter===Sa||T.minFilter===_r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,pe[T.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,pe[T.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,pe[T.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,O[T.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,O[T.minFilter]),T.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,q[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Xn||T.minFilter!==Sa&&T.minFilter!==_r||T.type===Ui&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function it(L,T){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",A));const te=T.source;let ie=f.get(te);ie===void 0&&(ie={},f.set(te,ie));const Q=F(T);if(Q!==L.__cacheKey){ie[Q]===void 0&&(ie[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ie[Q].usedTimes++;const xe=ie[L.__cacheKey];xe!==void 0&&(ie[L.__cacheKey].usedTimes--,xe.usedTimes===0&&x(T)),L.__cacheKey=Q,L.__webglTexture=ie[Q].texture}return W}function J(L,T,W){return Math.floor(Math.floor(L/W)/T)}function ce(L,T,W,te){const Q=L.updateRanges;if(Q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,W,te,T.data);else{Q.sort((le,be)=>le.start-be.start);let xe=0;for(let le=1;le<Q.length;le++){const be=Q[xe],Ee=Q[le],$e=be.start+be.count,Se=J(Ee.start,T.width,4),Me=J(be.start,T.width,4);Ee.start<=$e+1&&Se===Me&&J(Ee.start+Ee.count-1,T.width,4)===Se?be.count=Math.max(be.count,Ee.start+Ee.count-be.start):(++xe,Q[xe]=Ee)}Q.length=xe+1;const _e=r.getParameter(r.UNPACK_ROW_LENGTH),ze=r.getParameter(r.UNPACK_SKIP_PIXELS),re=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let le=0,be=Q.length;le<be;le++){const Ee=Q[le],$e=Math.floor(Ee.start/4),Se=Math.ceil(Ee.count/4),Me=$e%T.width,N=Math.floor($e/T.width),me=Se,ue=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Me),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Me,N,me,ue,W,te,T.data)}L.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,_e),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ze),r.pixelStorei(r.UNPACK_SKIP_ROWS,re)}}function Pe(L,T,W){let te=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(te=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(te=r.TEXTURE_3D);const ie=it(L,T),Q=T.source;t.bindTexture(te,L.__webglTexture,r.TEXTURE0+W);const xe=n.get(Q);if(Q.version!==xe.__version||ie===!0){t.activeTexture(r.TEXTURE0+W);const _e=Rt.getPrimaries(Rt.workingColorSpace),ze=T.colorSpace===kr?null:Rt.getPrimaries(T.colorSpace),re=T.colorSpace===kr||_e===ze?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let le=g(T.image,!1,i.maxTextureSize);le=Oe(T,le);const be=s.convert(T.format,T.colorSpace),Ee=s.convert(T.type);let $e=y(T.internalFormat,be,Ee,T.colorSpace,T.isVideoTexture);je(te,T);let Se;const Me=T.mipmaps,N=T.isVideoTexture!==!0,me=xe.__version===void 0||ie===!0,ue=Q.dataReady,Ce=S(T,le);if(T.isDepthTexture)$e=v(T.format===nl,T.type),me&&(N?t.texStorage2D(r.TEXTURE_2D,1,$e,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,$e,le.width,le.height,0,be,Ee,null));else if(T.isDataTexture)if(Me.length>0){N&&me&&t.texStorage2D(r.TEXTURE_2D,Ce,$e,Me[0].width,Me[0].height);for(let he=0,ae=Me.length;he<ae;he++)Se=Me[he],N?ue&&t.texSubImage2D(r.TEXTURE_2D,he,0,0,Se.width,Se.height,be,Ee,Se.data):t.texImage2D(r.TEXTURE_2D,he,$e,Se.width,Se.height,0,be,Ee,Se.data);T.generateMipmaps=!1}else N?(me&&t.texStorage2D(r.TEXTURE_2D,Ce,$e,le.width,le.height),ue&&ce(T,le,be,Ee)):t.texImage2D(r.TEXTURE_2D,0,$e,le.width,le.height,0,be,Ee,le.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){N&&me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,$e,Me[0].width,Me[0].height,le.depth);for(let he=0,ae=Me.length;he<ae;he++)if(Se=Me[he],T.format!==xi)if(be!==null)if(N){if(ue)if(T.layerUpdates.size>0){const Fe=Vp(Se.width,Se.height,T.format,T.type);for(const He of T.layerUpdates){const Et=Se.data.subarray(He*Fe/Se.data.BYTES_PER_ELEMENT,(He+1)*Fe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,He,Se.width,Se.height,1,be,Et)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,le.depth,be,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,he,$e,Se.width,Se.height,le.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ue&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,le.depth,be,Ee,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,he,$e,Se.width,Se.height,le.depth,0,be,Ee,Se.data)}else{N&&me&&t.texStorage2D(r.TEXTURE_2D,Ce,$e,Me[0].width,Me[0].height);for(let he=0,ae=Me.length;he<ae;he++)Se=Me[he],T.format!==xi?be!==null?N?ue&&t.compressedTexSubImage2D(r.TEXTURE_2D,he,0,0,Se.width,Se.height,be,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,he,$e,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ue&&t.texSubImage2D(r.TEXTURE_2D,he,0,0,Se.width,Se.height,be,Ee,Se.data):t.texImage2D(r.TEXTURE_2D,he,$e,Se.width,Se.height,0,be,Ee,Se.data)}else if(T.isDataArrayTexture)if(N){if(me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,$e,le.width,le.height,le.depth),ue)if(T.layerUpdates.size>0){const he=Vp(le.width,le.height,T.format,T.type);for(const ae of T.layerUpdates){const Fe=le.data.subarray(ae*he/le.data.BYTES_PER_ELEMENT,(ae+1)*he/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ae,le.width,le.height,1,be,Ee,Fe)}T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,Ee,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,$e,le.width,le.height,le.depth,0,be,Ee,le.data);else if(T.isData3DTexture)N?(me&&t.texStorage3D(r.TEXTURE_3D,Ce,$e,le.width,le.height,le.depth),ue&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,Ee,le.data)):t.texImage3D(r.TEXTURE_3D,0,$e,le.width,le.height,le.depth,0,be,Ee,le.data);else if(T.isFramebufferTexture){if(me)if(N)t.texStorage2D(r.TEXTURE_2D,Ce,$e,le.width,le.height);else{let he=le.width,ae=le.height;for(let Fe=0;Fe<Ce;Fe++)t.texImage2D(r.TEXTURE_2D,Fe,$e,he,ae,0,be,Ee,null),he>>=1,ae>>=1}}else if(Me.length>0){if(N&&me){const he=Pt(Me[0]);t.texStorage2D(r.TEXTURE_2D,Ce,$e,he.width,he.height)}for(let he=0,ae=Me.length;he<ae;he++)Se=Me[he],N?ue&&t.texSubImage2D(r.TEXTURE_2D,he,0,0,be,Ee,Se):t.texImage2D(r.TEXTURE_2D,he,$e,be,Ee,Se);T.generateMipmaps=!1}else if(N){if(me){const he=Pt(le);t.texStorage2D(r.TEXTURE_2D,Ce,$e,he.width,he.height)}ue&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,be,Ee,le)}else t.texImage2D(r.TEXTURE_2D,0,$e,be,Ee,le);m(T)&&p(te),xe.__version=Q.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function ge(L,T,W){if(T.image.length!==6)return;const te=it(L,T),ie=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+W);const Q=n.get(ie);if(ie.version!==Q.__version||te===!0){t.activeTexture(r.TEXTURE0+W);const xe=Rt.getPrimaries(Rt.workingColorSpace),_e=T.colorSpace===kr?null:Rt.getPrimaries(T.colorSpace),ze=T.colorSpace===kr||xe===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);const re=T.isCompressedTexture||T.image[0].isCompressedTexture,le=T.image[0]&&T.image[0].isDataTexture,be=[];for(let ae=0;ae<6;ae++)!re&&!le?be[ae]=g(T.image[ae],!0,i.maxCubemapSize):be[ae]=le?T.image[ae].image:T.image[ae],be[ae]=Oe(T,be[ae]);const Ee=be[0],$e=s.convert(T.format,T.colorSpace),Se=s.convert(T.type),Me=y(T.internalFormat,$e,Se,T.colorSpace),N=T.isVideoTexture!==!0,me=Q.__version===void 0||te===!0,ue=ie.dataReady;let Ce=S(T,Ee);je(r.TEXTURE_CUBE_MAP,T);let he;if(re){N&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ce,Me,Ee.width,Ee.height);for(let ae=0;ae<6;ae++){he=be[ae].mipmaps;for(let Fe=0;Fe<he.length;Fe++){const He=he[Fe];T.format!==xi?$e!==null?N?ue&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,0,0,He.width,He.height,$e,He.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,Me,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,0,0,He.width,He.height,$e,Se,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,Me,He.width,He.height,0,$e,Se,He.data)}}}else{if(he=T.mipmaps,N&&me){he.length>0&&Ce++;const ae=Pt(be[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ce,Me,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(le){N?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,be[ae].width,be[ae].height,$e,Se,be[ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,be[ae].width,be[ae].height,0,$e,Se,be[ae].data);for(let Fe=0;Fe<he.length;Fe++){const Et=he[Fe].image[ae].image;N?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,0,0,Et.width,Et.height,$e,Se,Et.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,Me,Et.width,Et.height,0,$e,Se,Et.data)}}else{N?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,$e,Se,be[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,$e,Se,be[ae]);for(let Fe=0;Fe<he.length;Fe++){const He=he[Fe];N?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,0,0,$e,Se,He.image[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,Me,$e,Se,He.image[ae])}}}m(T)&&p(r.TEXTURE_CUBE_MAP),Q.__version=ie.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Ae(L,T,W,te,ie,Q){const xe=s.convert(W.format,W.colorSpace),_e=s.convert(W.type),ze=y(W.internalFormat,xe,_e,W.colorSpace),re=n.get(T),le=n.get(W);if(le.__renderTarget=T,!re.__hasExternalTextures){const be=Math.max(1,T.width>>Q),Ee=Math.max(1,T.height>>Q);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,Q,ze,be,Ee,T.depth,0,xe,_e,null):t.texImage2D(ie,Q,ze,be,Ee,0,xe,_e,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),ot(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,ie,le.__webglTexture,0,Ie(T)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,te,ie,le.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function tt(L,T,W){if(r.bindRenderbuffer(r.RENDERBUFFER,L),T.depthBuffer){const te=T.depthTexture,ie=te&&te.isDepthTexture?te.type:null,Q=v(T.stencilBuffer,ie),xe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=Ie(T);ot(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,Q,T.width,T.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,Q,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Q,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,L)}else{const te=T.textures;for(let ie=0;ie<te.length;ie++){const Q=te[ie],xe=s.convert(Q.format,Q.colorSpace),_e=s.convert(Q.type),ze=y(Q.internalFormat,xe,_e,Q.colorSpace),re=Ie(T);W&&ot(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,re,ze,T.width,T.height):ot(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,ze,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ze,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(T.depthTexture);te.__renderTarget=T,(!te.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),C(T.depthTexture,0);const ie=te.__webglTexture,Q=Ie(T);if(T.depthTexture.format===tl)ot(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(T.depthTexture.format===nl)ot(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function ht(L){const T=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const te=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),te){const ie=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,te.removeEventListener("dispose",ie)};te.addEventListener("dispose",ie),T.__depthDisposeCallback=ie}T.__boundDepthTexture=te}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const te=L.texture.mipmaps;te&&te.length>0?we(T.__webglFramebuffer[0],L):we(T.__webglFramebuffer,L)}else if(W){T.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[te]),T.__webglDepthbuffer[te]===void 0)T.__webglDepthbuffer[te]=r.createRenderbuffer(),tt(T.__webglDepthbuffer[te],L,!1);else{const ie=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer[te];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}else{const te=L.texture.mipmaps;if(te&&te.length>0?t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),tt(T.__webglDepthbuffer,L,!1);else{const ie=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,Q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(L,T,W){const te=n.get(L);T!==void 0&&Ae(te.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&ht(L)}function Ue(L){const T=L.texture,W=n.get(L),te=n.get(T);L.addEventListener("dispose",E);const ie=L.textures,Q=L.isWebGLCubeRenderTarget===!0,xe=ie.length>1;if(xe||(te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture()),te.__version=T.version,o.memory.textures++),Q){W.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[_e]=[];for(let ze=0;ze<T.mipmaps.length;ze++)W.__webglFramebuffer[_e][ze]=r.createFramebuffer()}else W.__webglFramebuffer[_e]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let _e=0;_e<T.mipmaps.length;_e++)W.__webglFramebuffer[_e]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(xe)for(let _e=0,ze=ie.length;_e<ze;_e++){const re=n.get(ie[_e]);re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture(),o.memory.textures++)}if(L.samples>0&&ot(L)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let _e=0;_e<ie.length;_e++){const ze=ie[_e];W.__webglColorRenderbuffer[_e]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[_e]);const re=s.convert(ze.format,ze.colorSpace),le=s.convert(ze.type),be=y(ze.internalFormat,re,le,ze.colorSpace,L.isXRRenderTarget===!0),Ee=Ie(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,be,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,W.__webglColorRenderbuffer[_e])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),tt(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture),je(r.TEXTURE_CUBE_MAP,T);for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0)for(let ze=0;ze<T.mipmaps.length;ze++)Ae(W.__webglFramebuffer[_e][ze],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ze);else Ae(W.__webglFramebuffer[_e],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(T)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let _e=0,ze=ie.length;_e<ze;_e++){const re=ie[_e],le=n.get(re);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),je(r.TEXTURE_2D,re),Ae(W.__webglFramebuffer,L,re,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,0),m(re)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let _e=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(_e=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,te.__webglTexture),je(_e,T),T.mipmaps&&T.mipmaps.length>0)for(let ze=0;ze<T.mipmaps.length;ze++)Ae(W.__webglFramebuffer[ze],L,T,r.COLOR_ATTACHMENT0,_e,ze);else Ae(W.__webglFramebuffer,L,T,r.COLOR_ATTACHMENT0,_e,0);m(T)&&p(_e),t.unbindTexture()}L.depthBuffer&&ht(L)}function U(L){const T=L.textures;for(let W=0,te=T.length;W<te;W++){const ie=T[W];if(m(ie)){const Q=w(L),xe=n.get(ie).__webglTexture;t.bindTexture(Q,xe),p(Q),t.unbindTexture()}}}const ct=[],st=[];function Y(L){if(L.samples>0){if(ot(L)===!1){const T=L.textures,W=L.width,te=L.height;let ie=r.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(L),_e=T.length>1;if(_e)for(let re=0;re<T.length;re++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const ze=L.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let re=0;re<T.length;re++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),_e){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[re]);const le=n.get(T[re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,W,te,0,0,W,te,ie,r.NEAREST),l===!0&&(ct.length=0,st.length=0,ct.push(r.COLOR_ATTACHMENT0+re),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ct.push(Q),st.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,st)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_e)for(let re=0;re<T.length;re++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,xe.__webglColorRenderbuffer[re]);const le=n.get(T[re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const T=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Ie(L){return Math.min(i.maxSamples,L.samples)}function ot(L){const T=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Be(L){const T=o.render.frame;u.get(L)!==T&&(u.set(L,T),L.update())}function Oe(L,T){const W=L.colorSpace,te=L.format,ie=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==qn&&W!==kr&&(Rt.getTransfer(W)===Vt?(te!==xi||ie!==tr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function Pt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=I,this.setTexture2D=C,this.setTexture2DArray=$,this.setTexture3D=K,this.setTextureCube=X,this.rebindTextures=pt,this.setupRenderTarget=Ue,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=ot}function DE(r,e){function t(n,i=kr){let s;const o=Rt.getTransfer(i);if(n===tr)return r.UNSIGNED_BYTE;if(n===qf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Yf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Hg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Bg)return r.BYTE;if(n===zg)return r.SHORT;if(n===Qa)return r.UNSIGNED_SHORT;if(n===Xf)return r.INT;if(n===ks)return r.UNSIGNED_INT;if(n===Ui)return r.FLOAT;if(n===_l)return r.HALF_FLOAT;if(n===Vg)return r.ALPHA;if(n===Gg)return r.RGB;if(n===xi)return r.RGBA;if(n===tl)return r.DEPTH_COMPONENT;if(n===nl)return r.DEPTH_STENCIL;if(n===jf)return r.RED;if(n===$f)return r.RED_INTEGER;if(n===Wg)return r.RG;if(n===Kf)return r.RG_INTEGER;if(n===Zf)return r.RGBA_INTEGER;if(n===pc||n===mc||n===gc||n===_c)if(o===Vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===pc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===pc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_c)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ed||n===Td||n===Ad||n===Cd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ed)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Td)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ad)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rd||n===Pd||n===Ld)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Rd||n===Pd)return o===Vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ld)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dd||n===Id||n===Od||n===Nd||n===Ud||n===Fd||n===kd||n===Bd||n===zd||n===Hd||n===Vd||n===Gd||n===Wd||n===Xd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Dd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Id)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Od)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ud)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===kd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Hd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Gd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xd)return o===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vc||n===qd||n===Yd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===vc)return o===Vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xg||n===jd||n===$d||n===Kd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===vc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$d)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===el?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const IE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OE=`
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

}`;class NE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new dn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Si({vertexShader:IE,fragmentShader:OE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wn(new Li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class UE extends Qo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new NE,m=t.getContextAttributes();let p=null,w=null;const y=[],v=[],S=new Mt;let A=null;const E=new jn;E.viewport=new It;const P=new jn;P.viewport=new It;const x=[E,P],b=new jx;let D=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ce=y[J];return ce===void 0&&(ce=new Lu,y[J]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(J){let ce=y[J];return ce===void 0&&(ce=new Lu,y[J]=ce),ce.getGripSpace()},this.getHand=function(J){let ce=y[J];return ce===void 0&&(ce=new Lu,y[J]=ce),ce.getHandSpace()};function H(J){const ce=v.indexOf(J.inputSource);if(ce===-1)return;const Pe=y[ce];Pe!==void 0&&(Pe.update(J.inputSource,J.frame,c||o),Pe.dispatchEvent({type:J.type,data:J.inputSource}))}function F(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",C);for(let J=0;J<y.length;J++){const ce=v[J];ce!==null&&(v[J]=null,y[J].disconnect(ce))}D=null,I=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,w=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",F),i.addEventListener("inputsourceschange",C),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(S),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,ge=null,Ae=null;m.depth&&(Ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=m.stencil?nl:tl,ge=m.stencil?el:ks);const tt={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(tt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),w=new Bs(f.textureWidth,f.textureHeight,{format:xi,type:tr,depthTexture:new l_(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Pe),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),w=new Bs(h.framebufferWidth,h.framebufferHeight,{format:xi,type:tr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function C(J){for(let ce=0;ce<J.removed.length;ce++){const Pe=J.removed[ce],ge=v.indexOf(Pe);ge>=0&&(v[ge]=null,y[ge].disconnect(Pe))}for(let ce=0;ce<J.added.length;ce++){const Pe=J.added[ce];let ge=v.indexOf(Pe);if(ge===-1){for(let tt=0;tt<y.length;tt++)if(tt>=v.length){v.push(Pe),ge=tt;break}else if(v[tt]===null){v[tt]=Pe,ge=tt;break}if(ge===-1)break}const Ae=y[ge];Ae&&Ae.connect(Pe)}}const $=new V,K=new V;function X(J,ce,Pe){$.setFromMatrixPosition(ce.matrixWorld),K.setFromMatrixPosition(Pe.matrixWorld);const ge=$.distanceTo(K),Ae=ce.projectionMatrix.elements,tt=Pe.projectionMatrix.elements,we=Ae[14]/(Ae[10]-1),ht=Ae[14]/(Ae[10]+1),pt=(Ae[9]+1)/Ae[5],Ue=(Ae[9]-1)/Ae[5],U=(Ae[8]-1)/Ae[0],ct=(tt[8]+1)/tt[0],st=we*U,Y=we*ct,Ie=ge/(-U+ct),ot=Ie*-U;if(ce.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ot),J.translateZ(Ie),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ae[10]===-1)J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Be=we+Ie,Oe=ht+Ie,Pt=st-ot,L=Y+(ge-ot),T=pt*ht/Oe*Be,W=Ue*ht/Oe*Be;J.projectionMatrix.makePerspective(Pt,L,T,W,Be,Oe),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function pe(J,ce){ce===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ce.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let ce=J.near,Pe=J.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(Pe=g.depthFar)),b.near=P.near=E.near=ce,b.far=P.far=E.far=Pe,(D!==b.near||I!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,I=b.far),E.layers.mask=J.layers.mask|2,P.layers.mask=J.layers.mask|4,b.layers.mask=E.layers.mask|P.layers.mask;const ge=J.parent,Ae=b.cameras;pe(b,ge);for(let tt=0;tt<Ae.length;tt++)pe(Ae[tt],ge);Ae.length===2?X(b,E,P):b.projectionMatrix.copy(E.projectionMatrix),O(J,b,ge)};function O(J,ce,Pe){Pe===null?J.matrix.copy(ce.matrixWorld):(J.matrix.copy(Pe.matrixWorld),J.matrix.invert(),J.matrix.multiply(ce.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ho*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(b)};let q=null;function je(J,ce){if(u=ce.getViewerPose(c||o),_=ce,u!==null){const Pe=u.views;h!==null&&(e.setRenderTargetFramebuffer(w,h.framebuffer),e.setRenderTarget(w));let ge=!1;Pe.length!==b.cameras.length&&(b.cameras.length=0,ge=!0);for(let we=0;we<Pe.length;we++){const ht=Pe[we];let pt=null;if(h!==null)pt=h.getViewport(ht);else{const U=d.getViewSubImage(f,ht);pt=U.viewport,we===0&&(e.setRenderTargetTextures(w,U.colorTexture,U.depthStencilTexture),e.setRenderTarget(w))}let Ue=x[we];Ue===void 0&&(Ue=new jn,Ue.layers.enable(we),Ue.viewport=new It,x[we]=Ue),Ue.matrix.fromArray(ht.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(ht.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(pt.x,pt.y,pt.width,pt.height),we===0&&(b.matrix.copy(Ue.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ge===!0&&b.cameras.push(Ue)}const Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const we=d.getDepthInformation(Pe[0]);we&&we.isValid&&we.texture&&g.init(e,we,i.renderState)}}for(let Pe=0;Pe<y.length;Pe++){const ge=v[Pe],Ae=y[Pe];ge!==null&&Ae!==void 0&&Ae.update(ge,ce,c||o)}q&&q(J,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const it=new h_;it.setAnimationLoop(je),this.setAnimationLoop=function(J){q=J},this.dispose=function(){}}}const hs=new nr,FE=new _t;function kE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,t_(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,w,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,w,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$n&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$n&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),y=w.envMap,v=w.envMapRotation;y&&(m.envMap.value=y,hs.copy(v),hs.x*=-1,hs.y*=-1,hs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),m.envMapRotation.value.setFromMatrix4(FE.makeRotationFromEuler(hs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$n&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function BE(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,y){const v=y.program;n.uniformBlockBinding(w,v)}function c(w,y){let v=i[w.id];v===void 0&&(_(w),v=u(w),i[w.id]=v,w.addEventListener("dispose",m));const S=y.program;n.updateUBOMapping(w,S);const A=e.render.frame;s[w.id]!==A&&(f(w),s[w.id]=A)}function u(w){const y=d();w.__bindingPointIndex=y;const v=r.createBuffer(),S=w.__size,A=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,S,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const y=i[w.id],v=w.uniforms,S=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let A=0,E=v.length;A<E;A++){const P=Array.isArray(v[A])?v[A]:[v[A]];for(let x=0,b=P.length;x<b;x++){const D=P[x];if(h(D,A,x,S)===!0){const I=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let F=0;for(let C=0;C<H.length;C++){const $=H[C],K=g($);typeof $=="number"||typeof $=="boolean"?(D.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,I+F,D.__data)):$.isMatrix3?(D.__data[0]=$.elements[0],D.__data[1]=$.elements[1],D.__data[2]=$.elements[2],D.__data[3]=0,D.__data[4]=$.elements[3],D.__data[5]=$.elements[4],D.__data[6]=$.elements[5],D.__data[7]=0,D.__data[8]=$.elements[6],D.__data[9]=$.elements[7],D.__data[10]=$.elements[8],D.__data[11]=0):($.toArray(D.__data,F),F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(w,y,v,S){const A=w.value,E=y+"_"+v;if(S[E]===void 0)return typeof A=="number"||typeof A=="boolean"?S[E]=A:S[E]=A.clone(),!0;{const P=S[E];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return S[E]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function _(w){const y=w.uniforms;let v=0;const S=16;for(let E=0,P=y.length;E<P;E++){const x=Array.isArray(y[E])?y[E]:[y[E]];for(let b=0,D=x.length;b<D;b++){const I=x[b],H=Array.isArray(I.value)?I.value:[I.value];for(let F=0,C=H.length;F<C;F++){const $=H[F],K=g($),X=v%S,pe=X%K.boundary,O=X+pe;v+=pe,O!==0&&S-O<K.storage&&(v+=S-O),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=K.storage}}}const A=v%S;return A>0&&(v+=S-A),w.__size=v,w.__cache={},this}function g(w){const y={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(y.boundary=4,y.storage=4):w.isVector2?(y.boundary=8,y.storage=8):w.isVector3||w.isColor?(y.boundary=16,y.storage=12):w.isVector4?(y.boundary=16,y.storage=16):w.isMatrix3?(y.boundary=48,y.storage=48):w.isMatrix4?(y.boundary=64,y.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),y}function m(w){const y=w.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class zE{constructor(e={}){const{canvas:t=Hy(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const w=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$r,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let S=!1;this._outputColorSpace=wn;let A=0,E=0,P=null,x=-1,b=null;const D=new It,I=new It;let H=null;const F=new Qe(0);let C=0,$=t.width,K=t.height,X=1,pe=null,O=null;const q=new It(0,0,$,K),je=new It(0,0,$,K);let it=!1;const J=new nh;let ce=!1,Pe=!1;const ge=new _t,Ae=new _t,tt=new V,we=new It,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Ue(){return P===null?X:1}let U=n;function ct(R,z){return t.getContext(R,z)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wf}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ae,!1),U===null){const z="webgl2";if(U=ct(z,R),U===null)throw ct(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let st,Y,Ie,ot,Be,Oe,Pt,L,T,W,te,ie,Q,xe,_e,ze,re,le,be,Ee,$e,Se,Me,N;function me(){st=new Kb(U),st.init(),Se=new DE(U,st),Y=new Gb(U,st,e,Se),Ie=new PE(U,st),Y.reverseDepthBuffer&&f&&Ie.buffers.depth.setReversed(!0),ot=new Qb(U),Be=new _E,Oe=new LE(U,st,Ie,Be,Y,Se,ot),Pt=new Xb(v),L=new $b(v),T=new sS(U),Me=new Hb(U,T),W=new Zb(U,T,ot,Me),te=new tM(U,W,T,ot),be=new eM(U,Y,Oe),ze=new Wb(Be),ie=new gE(v,Pt,L,st,Y,Me,ze),Q=new kE(v,Be),xe=new yE,_e=new EE(st),le=new zb(v,Pt,L,Ie,te,h,l),re=new CE(v,te,Y),N=new BE(U,ot,Y,Ie),Ee=new Vb(U,st,ot),$e=new Jb(U,st,ot),ot.programs=ie.programs,v.capabilities=Y,v.extensions=st,v.properties=Be,v.renderLists=xe,v.shadowMap=re,v.state=Ie,v.info=ot}me();const ue=new UE(v,U);this.xr=ue,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=st.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=st.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(R){R!==void 0&&(X=R,this.setSize($,K,!1))},this.getSize=function(R){return R.set($,K)},this.setSize=function(R,z,Z=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=R,K=z,t.width=Math.floor(R*X),t.height=Math.floor(z*X),Z===!0&&(t.style.width=R+"px",t.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set($*X,K*X).floor()},this.setDrawingBufferSize=function(R,z,Z){$=R,K=z,X=Z,t.width=Math.floor(R*Z),t.height=Math.floor(z*Z),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(q)},this.setViewport=function(R,z,Z,j){R.isVector4?q.set(R.x,R.y,R.z,R.w):q.set(R,z,Z,j),Ie.viewport(D.copy(q).multiplyScalar(X).round())},this.getScissor=function(R){return R.copy(je)},this.setScissor=function(R,z,Z,j){R.isVector4?je.set(R.x,R.y,R.z,R.w):je.set(R,z,Z,j),Ie.scissor(I.copy(je).multiplyScalar(X).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(R){Ie.setScissorTest(it=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){O=R},this.getClearColor=function(R){return R.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(R=!0,z=!0,Z=!0){let j=0;if(R){let k=!1;if(P!==null){const fe=P.texture.format;k=fe===Zf||fe===Kf||fe===$f}if(k){const fe=P.texture.type,ve=fe===tr||fe===ks||fe===Qa||fe===el||fe===qf||fe===Yf,ke=le.getClearColor(),Ne=le.getClearAlpha(),Ye=ke.r,et=ke.g,qe=ke.b;ve?(_[0]=Ye,_[1]=et,_[2]=qe,_[3]=Ne,U.clearBufferuiv(U.COLOR,0,_)):(g[0]=Ye,g[1]=et,g[2]=qe,g[3]=Ne,U.clearBufferiv(U.COLOR,0,g))}else j|=U.COLOR_BUFFER_BIT}z&&(j|=U.DEPTH_BUFFER_BIT),Z&&(j|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),le.dispose(),xe.dispose(),_e.dispose(),Be.dispose(),Pt.dispose(),L.dispose(),te.dispose(),Me.dispose(),N.dispose(),ie.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Te),ue.removeEventListener("sessionend",at),We.stop()};function Ce(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=ot.autoReset,z=re.enabled,Z=re.autoUpdate,j=re.needsUpdate,k=re.type;me(),ot.autoReset=R,re.enabled=z,re.autoUpdate=Z,re.needsUpdate=j,re.type=k}function ae(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Fe(R){const z=R.target;z.removeEventListener("dispose",Fe),He(z)}function He(R){Et(R),Be.remove(R)}function Et(R){const z=Be.get(R).programs;z!==void 0&&(z.forEach(function(Z){ie.releaseProgram(Z)}),R.isShaderMaterial&&ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,Z,j,k,fe){z===null&&(z=ht);const ve=k.isMesh&&k.matrixWorld.determinant()<0,ke=In(R,z,Z,j,k);Ie.setMaterial(j,ve);let Ne=Z.index,Ye=1;if(j.wireframe===!0){if(Ne=W.getWireframeAttribute(Z),Ne===void 0)return;Ye=2}const et=Z.drawRange,qe=Z.attributes.position;let ft=et.start*Ye,M=(et.start+et.count)*Ye;fe!==null&&(ft=Math.max(ft,fe.start*Ye),M=Math.min(M,(fe.start+fe.count)*Ye)),Ne!==null?(ft=Math.max(ft,0),M=Math.min(M,Ne.count)):qe!=null&&(ft=Math.max(ft,0),M=Math.min(M,qe.count));const B=M-ft;if(B<0||B===1/0)return;Me.setup(k,j,ke,Z,Ne);let G,ne=Ee;if(Ne!==null&&(G=T.get(Ne),ne=$e,ne.setIndex(G)),k.isMesh)j.wireframe===!0?(Ie.setLineWidth(j.wireframeLinewidth*Ue()),ne.setMode(U.LINES)):ne.setMode(U.TRIANGLES);else if(k.isLine){let se=j.linewidth;se===void 0&&(se=1),Ie.setLineWidth(se*Ue()),k.isLineSegments?ne.setMode(U.LINES):k.isLineLoop?ne.setMode(U.LINE_LOOP):ne.setMode(U.LINE_STRIP)}else k.isPoints?ne.setMode(U.POINTS):k.isSprite&&ne.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)To("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const se=k._multiDrawStarts,oe=k._multiDrawCounts,ye=k._multiDrawCount,Ze=Ne?T.get(Ne).bytesPerElement:1,Dt=Be.get(j).currentProgram.getUniforms();for(let lt=0;lt<ye;lt++)Dt.setValue(U,"_gl_DrawID",lt),ne.render(se[lt]/Ze,oe[lt])}else if(k.isInstancedMesh)ne.renderInstances(ft,B,k.count);else if(Z.isInstancedBufferGeometry){const se=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,oe=Math.min(Z.instanceCount,se);ne.renderInstances(ft,B,oe)}else ne.render(ft,B)};function Le(R,z,Z){R.transparent===!0&&R.side===yi&&R.forceSinglePass===!1?(R.side=$n,R.needsUpdate=!0,Ve(R,z,Z),R.side=Er,R.needsUpdate=!0,Ve(R,z,Z),R.side=yi):Ve(R,z,Z)}this.compile=function(R,z,Z=null){Z===null&&(Z=R),p=_e.get(Z),p.init(z),y.push(p),Z.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),R!==Z&&R.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const j=new Set;return R.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const fe=k.material;if(fe)if(Array.isArray(fe))for(let ve=0;ve<fe.length;ve++){const ke=fe[ve];Le(ke,Z,k),j.add(ke)}else Le(fe,Z,k),j.add(fe)}),p=y.pop(),j},this.compileAsync=function(R,z,Z=null){const j=this.compile(R,z,Z);return new Promise(k=>{function fe(){if(j.forEach(function(ve){Be.get(ve).currentProgram.isReady()&&j.delete(ve)}),j.size===0){k(R);return}setTimeout(fe,10)}st.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Re=null;function rt(R){Re&&Re(R)}function Te(){We.stop()}function at(){We.start()}const We=new h_;We.setAnimationLoop(rt),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(R){Re=R,ue.setAnimationLoop(R),R===null?We.stop():We.start()},ue.addEventListener("sessionstart",Te),ue.addEventListener("sessionend",at),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(z),z=ue.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,z,P),p=_e.get(R,y.length),p.init(z),y.push(p),Ae.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),J.setFromProjectionMatrix(Ae),Pe=this.localClippingEnabled,ce=ze.init(this.clippingPlanes,Pe),m=xe.get(R,w.length),m.init(),w.push(m),ue.enabled===!0&&ue.isPresenting===!0){const fe=v.xr.getDepthSensingMesh();fe!==null&&nt(fe,z,-1/0,v.sortObjects)}nt(R,z,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(pe,O),pt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,pt&&le.addToRenderList(m,R),this.info.render.frame++,ce===!0&&ze.beginShadows();const Z=p.state.shadowsArray;re.render(Z,R,z),ce===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){const fe=z.cameras;if(k.length>0)for(let ve=0,ke=fe.length;ve<ke;ve++){const Ne=fe[ve];ut(j,k,R,Ne)}pt&&le.render(R);for(let ve=0,ke=fe.length;ve<ke;ve++){const Ne=fe[ve];jt(m,R,Ne,Ne.viewport)}}else k.length>0&&ut(j,k,R,z),pt&&le.render(R),jt(m,R,z);P!==null&&E===0&&(Oe.updateMultisampleRenderTarget(P),Oe.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,z),Me.resetDefaultState(),x=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],ce===!0&&ze.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function nt(R,z,Z,j){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)Z=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||J.intersectsSprite(R)){j&&we.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ae);const ve=te.update(R),ke=R.material;ke.visible&&m.push(R,ve,ke,Z,we.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||J.intersectsObject(R))){const ve=te.update(R),ke=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),we.copy(R.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),we.copy(ve.boundingSphere.center)),we.applyMatrix4(R.matrixWorld).applyMatrix4(Ae)),Array.isArray(ke)){const Ne=ve.groups;for(let Ye=0,et=Ne.length;Ye<et;Ye++){const qe=Ne[Ye],ft=ke[qe.materialIndex];ft&&ft.visible&&m.push(R,ve,ft,Z,we.z,qe)}}else ke.visible&&m.push(R,ve,ke,Z,we.z,null)}}const fe=R.children;for(let ve=0,ke=fe.length;ve<ke;ve++)nt(fe[ve],z,Z,j)}function jt(R,z,Z,j){const k=R.opaque,fe=R.transmissive,ve=R.transparent;p.setupLightsView(Z),ce===!0&&ze.setGlobalState(v.clippingPlanes,Z),j&&Ie.viewport(D.copy(j)),k.length>0&&zt(k,z,Z),fe.length>0&&zt(fe,z,Z),ve.length>0&&zt(ve,z,Z),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function ut(R,z,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Bs(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?_l:tr,minFilter:_r,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace}));const fe=p.state.transmissionRenderTarget[j.id],ve=j.viewport||D;fe.setSize(ve.z*v.transmissionResolutionScale,ve.w*v.transmissionResolutionScale);const ke=v.getRenderTarget();v.setRenderTarget(fe),v.getClearColor(F),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear(),pt&&le.render(Z);const Ne=v.toneMapping;v.toneMapping=$r;const Ye=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),ce===!0&&ze.setGlobalState(v.clippingPlanes,j),zt(R,Z,j),Oe.updateMultisampleRenderTarget(fe),Oe.updateRenderTargetMipmap(fe),st.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let qe=0,ft=z.length;qe<ft;qe++){const M=z[qe],B=M.object,G=M.geometry,ne=M.material,se=M.group;if(ne.side===yi&&B.layers.test(j.layers)){const oe=ne.side;ne.side=$n,ne.needsUpdate=!0,Gt(B,Z,j,G,ne,se),ne.side=oe,ne.needsUpdate=!0,et=!0}}et===!0&&(Oe.updateMultisampleRenderTarget(fe),Oe.updateRenderTargetMipmap(fe))}v.setRenderTarget(ke),v.setClearColor(F,C),Ye!==void 0&&(j.viewport=Ye),v.toneMapping=Ne}function zt(R,z,Z){const j=z.isScene===!0?z.overrideMaterial:null;for(let k=0,fe=R.length;k<fe;k++){const ve=R[k],ke=ve.object,Ne=ve.geometry,Ye=ve.group;let et=ve.material;et.allowOverride===!0&&j!==null&&(et=j),ke.layers.test(Z.layers)&&Gt(ke,z,Z,Ne,et,Ye)}}function Gt(R,z,Z,j,k,fe){R.onBeforeRender(v,z,Z,j,k,fe),R.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),k.onBeforeRender(v,z,Z,j,R,fe),k.transparent===!0&&k.side===yi&&k.forceSinglePass===!1?(k.side=$n,k.needsUpdate=!0,v.renderBufferDirect(Z,z,j,k,R,fe),k.side=Er,k.needsUpdate=!0,v.renderBufferDirect(Z,z,j,k,R,fe),k.side=yi):v.renderBufferDirect(Z,z,j,k,R,fe),R.onAfterRender(v,z,Z,j,k,fe)}function Ve(R,z,Z){z.isScene!==!0&&(z=ht);const j=Be.get(R),k=p.state.lights,fe=p.state.shadowsArray,ve=k.state.version,ke=ie.getParameters(R,k.state,fe,z,Z),Ne=ie.getProgramCacheKey(ke);let Ye=j.programs;j.environment=R.isMeshStandardMaterial?z.environment:null,j.fog=z.fog,j.envMap=(R.isMeshStandardMaterial?L:Pt).get(R.envMap||j.environment),j.envMapRotation=j.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Ye===void 0&&(R.addEventListener("dispose",Fe),Ye=new Map,j.programs=Ye);let et=Ye.get(Ne);if(et!==void 0){if(j.currentProgram===et&&j.lightsStateVersion===ve)return Lt(R,ke),et}else ke.uniforms=ie.getUniforms(R),R.onBeforeCompile(ke,v),et=ie.acquireProgram(ke,Ne),Ye.set(Ne,et),j.uniforms=ke.uniforms;const qe=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(qe.clippingPlanes=ze.uniform),Lt(R,ke),j.needsLights=xn(R),j.lightsStateVersion=ve,j.needsLights&&(qe.ambientLightColor.value=k.state.ambient,qe.lightProbe.value=k.state.probe,qe.directionalLights.value=k.state.directional,qe.directionalLightShadows.value=k.state.directionalShadow,qe.spotLights.value=k.state.spot,qe.spotLightShadows.value=k.state.spotShadow,qe.rectAreaLights.value=k.state.rectArea,qe.ltc_1.value=k.state.rectAreaLTC1,qe.ltc_2.value=k.state.rectAreaLTC2,qe.pointLights.value=k.state.point,qe.pointLightShadows.value=k.state.pointShadow,qe.hemisphereLights.value=k.state.hemi,qe.directionalShadowMap.value=k.state.directionalShadowMap,qe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,qe.spotShadowMap.value=k.state.spotShadowMap,qe.spotLightMatrix.value=k.state.spotLightMatrix,qe.spotLightMap.value=k.state.spotLightMap,qe.pointShadowMap.value=k.state.pointShadowMap,qe.pointShadowMatrix.value=k.state.pointShadowMatrix),j.currentProgram=et,j.uniformsList=null,et}function mt(R){if(R.uniformsList===null){const z=R.currentProgram.getUniforms();R.uniformsList=yc.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function Lt(R,z){const Z=Be.get(R);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.batchingColor=z.batchingColor,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function In(R,z,Z,j,k){z.isScene!==!0&&(z=ht),Oe.resetTextureUnits();const fe=z.fog,ve=j.isMeshStandardMaterial?z.environment:null,ke=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:qn,Ne=(j.isMeshStandardMaterial?L:Pt).get(j.envMap||ve),Ye=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,et=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),qe=!!Z.morphAttributes.position,ft=!!Z.morphAttributes.normal,M=!!Z.morphAttributes.color;let B=$r;j.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(B=v.toneMapping);const G=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ne=G!==void 0?G.length:0,se=Be.get(j),oe=p.state.lights;if(ce===!0&&(Pe===!0||R!==b)){const dt=R===b&&j.id===x;ze.setState(j,R,dt)}let ye=!1;j.version===se.__version?(se.needsLights&&se.lightsStateVersion!==oe.state.version||se.outputColorSpace!==ke||k.isBatchedMesh&&se.batching===!1||!k.isBatchedMesh&&se.batching===!0||k.isBatchedMesh&&se.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&se.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&se.instancing===!1||!k.isInstancedMesh&&se.instancing===!0||k.isSkinnedMesh&&se.skinning===!1||!k.isSkinnedMesh&&se.skinning===!0||k.isInstancedMesh&&se.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&se.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&se.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&se.instancingMorph===!1&&k.morphTexture!==null||se.envMap!==Ne||j.fog===!0&&se.fog!==fe||se.numClippingPlanes!==void 0&&(se.numClippingPlanes!==ze.numPlanes||se.numIntersection!==ze.numIntersection)||se.vertexAlphas!==Ye||se.vertexTangents!==et||se.morphTargets!==qe||se.morphNormals!==ft||se.morphColors!==M||se.toneMapping!==B||se.morphTargetsCount!==ne)&&(ye=!0):(ye=!0,se.__version=j.version);let Ze=se.currentProgram;ye===!0&&(Ze=Ve(j,z,k));let Dt=!1,lt=!1,Gi=!1;const Ot=Ze.getUniforms(),On=se.uniforms;if(Ie.useProgram(Ze.program)&&(Dt=!0,lt=!0,Gi=!0),j.id!==x&&(x=j.id,lt=!0),Dt||b!==R){Ie.buffers.depth.getReversed()?(ge.copy(R.projectionMatrix),Gy(ge),Wy(ge),Ot.setValue(U,"projectionMatrix",ge)):Ot.setValue(U,"projectionMatrix",R.projectionMatrix),Ot.setValue(U,"viewMatrix",R.matrixWorldInverse);const At=Ot.map.cameraPosition;At!==void 0&&At.setValue(U,tt.setFromMatrixPosition(R.matrixWorld)),Y.logarithmicDepthBuffer&&Ot.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ot.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,lt=!0,Gi=!0)}if(k.isSkinnedMesh){Ot.setOptional(U,k,"bindMatrix"),Ot.setOptional(U,k,"bindMatrixInverse");const dt=k.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),Ot.setValue(U,"boneTexture",dt.boneTexture,Oe))}k.isBatchedMesh&&(Ot.setOptional(U,k,"batchingTexture"),Ot.setValue(U,"batchingTexture",k._matricesTexture,Oe),Ot.setOptional(U,k,"batchingIdTexture"),Ot.setValue(U,"batchingIdTexture",k._indirectTexture,Oe),Ot.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&Ot.setValue(U,"batchingColorTexture",k._colorsTexture,Oe));const Ut=Z.morphAttributes;if((Ut.position!==void 0||Ut.normal!==void 0||Ut.color!==void 0)&&be.update(k,Z,Ze),(lt||se.receiveShadow!==k.receiveShadow)&&(se.receiveShadow=k.receiveShadow,Ot.setValue(U,"receiveShadow",k.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(On.envMap.value=Ne,On.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&z.environment!==null&&(On.envMapIntensity.value=z.environmentIntensity),lt&&(Ot.setValue(U,"toneMappingExposure",v.toneMappingExposure),se.needsLights&&Ht(On,Gi),fe&&j.fog===!0&&Q.refreshFogUniforms(On,fe),Q.refreshMaterialUniforms(On,j,X,K,p.state.transmissionRenderTarget[R.id]),yc.upload(U,mt(se),On,Oe)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(yc.upload(U,mt(se),On,Oe),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ot.setValue(U,"center",k.center),Ot.setValue(U,"modelViewMatrix",k.modelViewMatrix),Ot.setValue(U,"normalMatrix",k.normalMatrix),Ot.setValue(U,"modelMatrix",k.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const dt=j.uniformsGroups;for(let At=0,pn=dt.length;At<pn;At++){const Qt=dt[At];N.update(Qt,Ze),N.bind(Qt,Ze)}}return Ze}function Ht(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function xn(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,z,Z){const j=Be.get(R);j.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),Be.get(R.texture).__webglTexture=z,Be.get(R.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:Z,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,z){const Z=Be.get(R);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0};const Sn=U.createFramebuffer();this.setRenderTarget=function(R,z=0,Z=0){P=R,A=z,E=Z;let j=!0,k=null,fe=!1,ve=!1;if(R){const Ne=Be.get(R);if(Ne.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(U.FRAMEBUFFER,null),j=!1;else if(Ne.__webglFramebuffer===void 0)Oe.setupRenderTarget(R);else if(Ne.__hasExternalTextures)Oe.rebindTextures(R,Be.get(R.texture).__webglTexture,Be.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const qe=R.depthTexture;if(Ne.__boundDepthTexture!==qe){if(qe!==null&&Be.has(qe)&&(R.width!==qe.image.width||R.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(R)}}const Ye=R.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(ve=!0);const et=Be.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(et[z])?k=et[z][Z]:k=et[z],fe=!0):R.samples>0&&Oe.useMultisampledRTT(R)===!1?k=Be.get(R).__webglMultisampledFramebuffer:Array.isArray(et)?k=et[Z]:k=et,D.copy(R.viewport),I.copy(R.scissor),H=R.scissorTest}else D.copy(q).multiplyScalar(X).floor(),I.copy(je).multiplyScalar(X).floor(),H=it;if(Z!==0&&(k=Sn),Ie.bindFramebuffer(U.FRAMEBUFFER,k)&&j&&Ie.drawBuffers(R,k),Ie.viewport(D),Ie.scissor(I),Ie.setScissorTest(H),fe){const Ne=Be.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ne.__webglTexture,Z)}else if(ve){const Ne=Be.get(R.texture),Ye=z;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ne.__webglTexture,Z,Ye)}else if(R!==null&&Z!==0){const Ne=Be.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ne.__webglTexture,Z)}x=-1},this.readRenderTargetPixels=function(R,z,Z,j,k,fe,ve,ke=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=Be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ve!==void 0&&(Ne=Ne[ve]),Ne){Ie.bindFramebuffer(U.FRAMEBUFFER,Ne);try{const Ye=R.textures[ke],et=Ye.format,qe=Ye.type;if(!Y.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Y.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-j&&Z>=0&&Z<=R.height-k&&(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ke),U.readPixels(z,Z,j,k,Se.convert(et),Se.convert(qe),fe))}finally{const Ye=P!==null?Be.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(U.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(R,z,Z,j,k,fe,ve,ke=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=Be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ve!==void 0&&(Ne=Ne[ve]),Ne)if(z>=0&&z<=R.width-j&&Z>=0&&Z<=R.height-k){Ie.bindFramebuffer(U.FRAMEBUFFER,Ne);const Ye=R.textures[ke],et=Ye.format,qe=Ye.type;if(!Y.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Y.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ft),U.bufferData(U.PIXEL_PACK_BUFFER,fe.byteLength,U.STREAM_READ),R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ke),U.readPixels(z,Z,j,k,Se.convert(et),Se.convert(qe),0);const M=P!==null?Be.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(U.FRAMEBUFFER,M);const B=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Vy(U,B,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ft),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,fe),U.deleteBuffer(ft),U.deleteSync(B),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,z=null,Z=0){const j=Math.pow(2,-Z),k=Math.floor(R.image.width*j),fe=Math.floor(R.image.height*j),ve=z!==null?z.x:0,ke=z!==null?z.y:0;Oe.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,ve,ke,k,fe),Ie.unbindTexture()};const tn=U.createFramebuffer(),Tt=U.createFramebuffer();this.copyTextureToTexture=function(R,z,Z=null,j=null,k=0,fe=null){fe===null&&(k!==0?(To("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=k,k=0):fe=0);let ve,ke,Ne,Ye,et,qe,ft,M,B;const G=R.isCompressedTexture?R.mipmaps[fe]:R.image;if(Z!==null)ve=Z.max.x-Z.min.x,ke=Z.max.y-Z.min.y,Ne=Z.isBox3?Z.max.z-Z.min.z:1,Ye=Z.min.x,et=Z.min.y,qe=Z.isBox3?Z.min.z:0;else{const Ut=Math.pow(2,-k);ve=Math.floor(G.width*Ut),ke=Math.floor(G.height*Ut),R.isDataArrayTexture?Ne=G.depth:R.isData3DTexture?Ne=Math.floor(G.depth*Ut):Ne=1,Ye=0,et=0,qe=0}j!==null?(ft=j.x,M=j.y,B=j.z):(ft=0,M=0,B=0);const ne=Se.convert(z.format),se=Se.convert(z.type);let oe;z.isData3DTexture?(Oe.setTexture3D(z,0),oe=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Oe.setTexture2DArray(z,0),oe=U.TEXTURE_2D_ARRAY):(Oe.setTexture2D(z,0),oe=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const ye=U.getParameter(U.UNPACK_ROW_LENGTH),Ze=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Dt=U.getParameter(U.UNPACK_SKIP_PIXELS),lt=U.getParameter(U.UNPACK_SKIP_ROWS),Gi=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,G.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,G.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ye),U.pixelStorei(U.UNPACK_SKIP_ROWS,et),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qe);const Ot=R.isDataArrayTexture||R.isData3DTexture,On=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){const Ut=Be.get(R),dt=Be.get(z),At=Be.get(Ut.__renderTarget),pn=Be.get(dt.__renderTarget);Ie.bindFramebuffer(U.READ_FRAMEBUFFER,At.__webglFramebuffer),Ie.bindFramebuffer(U.DRAW_FRAMEBUFFER,pn.__webglFramebuffer);for(let Qt=0;Qt<Ne;Qt++)Ot&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(R).__webglTexture,k,qe+Qt),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(z).__webglTexture,fe,B+Qt)),U.blitFramebuffer(Ye,et,ve,ke,ft,M,ve,ke,U.DEPTH_BUFFER_BIT,U.NEAREST);Ie.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||R.isRenderTargetTexture||Be.has(R)){const Ut=Be.get(R),dt=Be.get(z);Ie.bindFramebuffer(U.READ_FRAMEBUFFER,tn),Ie.bindFramebuffer(U.DRAW_FRAMEBUFFER,Tt);for(let At=0;At<Ne;At++)Ot?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ut.__webglTexture,k,qe+At):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ut.__webglTexture,k),On?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,dt.__webglTexture,fe,B+At):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,dt.__webglTexture,fe),k!==0?U.blitFramebuffer(Ye,et,ve,ke,ft,M,ve,ke,U.COLOR_BUFFER_BIT,U.NEAREST):On?U.copyTexSubImage3D(oe,fe,ft,M,B+At,Ye,et,ve,ke):U.copyTexSubImage2D(oe,fe,ft,M,Ye,et,ve,ke);Ie.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else On?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(oe,fe,ft,M,B,ve,ke,Ne,ne,se,G.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(oe,fe,ft,M,B,ve,ke,Ne,ne,G.data):U.texSubImage3D(oe,fe,ft,M,B,ve,ke,Ne,ne,se,G):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,fe,ft,M,ve,ke,ne,se,G.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,fe,ft,M,G.width,G.height,ne,G.data):U.texSubImage2D(U.TEXTURE_2D,fe,ft,M,ve,ke,ne,se,G);U.pixelStorei(U.UNPACK_ROW_LENGTH,ye),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ze),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Dt),U.pixelStorei(U.UNPACK_SKIP_ROWS,lt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Gi),fe===0&&z.generateMipmaps&&U.generateMipmap(oe),Ie.unbindTexture()},this.copyTextureToTexture3D=function(R,z,Z=null,j=null,k=0){return To('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,z,Z,j,k)},this.initRenderTarget=function(R){Be.get(R).__webglFramebuffer===void 0&&Oe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Oe.setTextureCube(R,0):R.isData3DTexture?Oe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Oe.setTexture2DArray(R,0):Oe.setTexture2D(R,0),Ie.unbindTexture()},this.resetState=function(){A=0,E=0,P=null,Ie.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}}function HE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function So(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var hm=Array.prototype.forEach,pa=Array.prototype.slice,de={BREAK:{},extend:function(e){return this.each(pa.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(pa.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=pa.call(arguments);return function(){for(var t=pa.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(hm&&e.forEach&&e.forEach===hm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():pa.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},VE=[{litmus:de.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:So},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:So},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:So},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:So}}},{litmus:de.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:de.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:de.isObject,conversions:{RGBA_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)&&de.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)&&de.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ma=void 0,$l=void 0,rf=function(){$l=!1;var e=arguments.length>1?de.toArray(arguments):arguments[0];return de.each(VE,function(t){if(t.litmus(e))return de.each(t.conversions,function(n,i){if(ma=n.read(e),$l===!1&&ma!==!1)return $l=ma,ma.conversionName=i,ma.conversion=n,de.BREAK}),de.BREAK}),$l},pm=void 0,Nc={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(pm=t*8)|e&~(255<<pm)}},GE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Hi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Vi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),es=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},ss=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},os=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},vn=function(){function r(){if(Hi(this,r),this.__state=rf.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Vi(r,[{key:"toString",value:function(){return So(this)}},{key:"toHexString",value:function(){return So(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function ch(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(vn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(vn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function uh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(vn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(vn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}vn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Nc.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")de.extend(r.__state,Nc.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};vn.recalculateHSV=function(r){var e=Nc.rgb_to_hsv(r.r,r.g,r.b);de.extend(r.__state,{s:e.s,v:e.v}),de.isNaN(e.h)?de.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};vn.COMPONENTS=["r","g","b","h","s","v","hex","a"];ch(vn.prototype,"r",2);ch(vn.prototype,"g",1);ch(vn.prototype,"b",0);uh(vn.prototype,"h");uh(vn.prototype,"s");uh(vn.prototype,"v");Object.defineProperty(vn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(vn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Nc.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Xs=function(){function r(e,t){Hi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Vi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),WE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},v_={};de.each(WE,function(r,e){de.each(r,function(t){v_[t]=e})});var XE=/(\d+(\.\d+)?)px/;function Wi(r){if(r==="0"||de.isUndefined(r))return 0;var e=r.match(XE);return de.isNull(e)?0:parseFloat(e[1])}var ee={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;de.isUndefined(s)&&(s=!0),de.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=v_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;de.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}de.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),ee},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),ee},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return ee},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return ee},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Wi(t["border-left-width"])+Wi(t["border-right-width"])+Wi(t["padding-left"])+Wi(t["padding-right"])+Wi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Wi(t["border-top-width"])+Wi(t["border-bottom-width"])+Wi(t["padding-top"])+Wi(t["padding-bottom"])+Wi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},y_=function(r){ss(e,r);function e(t,n){Hi(this,e);var i=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return ee.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Vi(e,[{key:"setValue",value:function(n){var i=es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Xs),qE=function(r){ss(e,r);function e(t,n,i){Hi(this,e);var s=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),de.isArray(o)){var l={};de.each(o,function(c){l[c]=c}),o=l}return de.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),ee.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Vi(e,[{key:"setValue",value:function(n){var i=es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return ee.isActive(this.__select)?this:(this.__select.value=this.getValue(),es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Xs),YE=function(r){ss(e,r);function e(t,n){Hi(this,e);var i=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),ee.bind(i.__input,"keyup",o),ee.bind(i.__input,"change",o),ee.bind(i.__input,"blur",a),ee.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Vi(e,[{key:"updateDisplay",value:function(){return ee.isActive(this.__input)||(this.__input.value=this.getValue()),es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Xs);function mm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var x_=function(r){ss(e,r);function e(t,n,i){Hi(this,e);var s=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,de.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=mm(s.__impliedStep),s}return Vi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=mm(n),this}}]),e}(Xs);function jE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Uc=function(r){ss(e,r);function e(t,n,i){Hi(this,e);var s=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);de.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){ee.unbind(window,"mousemove",d),ee.unbind(window,"mouseup",f),c()}function h(_){ee.bind(window,"mousemove",d),ee.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),ee.bind(s.__input,"change",l),ee.bind(s.__input,"blur",u),ee.bind(s.__input,"mousedown",h),ee.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Vi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():jE(this.getValue(),this.__precision),es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(x_);function gm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var sf=function(r){ss(e,r);function e(t,n,i,s,o){Hi(this,e);var a=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),ee.bind(a.__background,"mousedown",c),ee.bind(a.__background,"touchstart",f),ee.addClass(a.__background,"slider"),ee.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),ee.bind(window,"mousemove",u),ee.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(gm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){ee.unbind(window,"mousemove",u),ee.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(ee.bind(window,"touchmove",h),ee.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(gm(m,p.left,p.right,l.__min,l.__max))}function _(){ee.unbind(window,"touchmove",h),ee.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Vi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",es(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(x_),S_=function(r){ss(e,r);function e(t,n,i){Hi(this,e);var s=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,ee.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),ee.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Vi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Xs),of=function(r){ss(e,r);function e(t,n){Hi(this,e);var i=os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new vn(i.getValue()),i.__temp=new vn(0);var s=i;i.domElement=document.createElement("div"),ee.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",ee.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),ee.bind(i.__input,"blur",d),ee.bind(i.__selector,"mousedown",function(){ee.addClass(this,"drag").bind(window,"mouseup",function(){ee.removeClass(s.__selector,"drag")})}),ee.bind(i.__selector,"touchstart",function(){ee.addClass(this,"drag").bind(window,"touchend",function(){ee.removeClass(s.__selector,"drag")})});var o=document.createElement("div");de.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),de.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),de.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),de.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),de.extend(o.style,{width:"100%",height:"100%",background:"none"}),_m(o,"top","rgba(0,0,0,0)","#000"),de.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),KE(i.__hue_field),de.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),ee.bind(i.__saturation_field,"mousedown",a),ee.bind(i.__saturation_field,"touchstart",a),ee.bind(i.__field_knob,"mousedown",a),ee.bind(i.__field_knob,"touchstart",a),ee.bind(i.__hue_field,"mousedown",l),ee.bind(i.__hue_field,"touchstart",l);function a(g){h(g),ee.bind(window,"mousemove",h),ee.bind(window,"touchmove",h),ee.bind(window,"mouseup",c),ee.bind(window,"touchend",c)}function l(g){_(g),ee.bind(window,"mousemove",_),ee.bind(window,"touchmove",_),ee.bind(window,"mouseup",u),ee.bind(window,"touchend",u)}function c(){ee.unbind(window,"mousemove",h),ee.unbind(window,"touchmove",h),ee.unbind(window,"mouseup",c),ee.unbind(window,"touchend",c),f()}function u(){ee.unbind(window,"mousemove",_),ee.unbind(window,"touchmove",_),ee.unbind(window,"mouseup",u),ee.unbind(window,"touchend",u),f()}function d(){var g=rf(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,w=p.clientX,y=p.clientY,v=(w-m.left)/(m.right-m.left),S=1-(y-m.top)/(m.bottom-m.top);return S>1?S=1:S<0&&(S=0),v>1?v=1:v<0&&(v=0),s.__color.v=S,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,w=p.clientY,y=1-(w-m.top)/(m.bottom-m.top);return y>1?y=1:y<0&&(y=0),s.__color.h=y*360,s.setValue(s.__color.toOriginal()),!1}return i}return Vi(e,[{key:"updateDisplay",value:function(){var n=rf(this.getValue());if(n!==!1){var i=!1;de.each(vn.COMPONENTS,function(a){if(!de.isUndefined(n[a])&&!de.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&de.extend(this.__color.__state,n)}de.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;de.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,_m(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),de.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(Xs),$E=["-moz-","-o-","-webkit-","-ms-",""];function _m(r,e,t,n){r.style.background="",de.each($E,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function KE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var ZE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},JE=`<div id="dg-save" class="dg dialogue">

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

</div>`,QE=function(e,t){var n=e[t];return de.isArray(arguments[2])||de.isObject(arguments[2])?new qE(e,t,arguments[2]):de.isNumber(n)?de.isNumber(arguments[2])&&de.isNumber(arguments[3])?de.isNumber(arguments[4])?new sf(e,t,arguments[2],arguments[3],arguments[4]):new sf(e,t,arguments[2],arguments[3]):de.isNumber(arguments[4])?new Uc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Uc(e,t,{min:arguments[2],max:arguments[3]}):de.isString(n)?new YE(e,t):de.isFunction(n)?new S_(e,t,""):de.isBoolean(n)?new y_(e,t):null};function eT(r){setTimeout(r,1e3/60)}var tT=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||eT,nT=function(){function r(){Hi(this,r),this.backgroundElement=document.createElement("div"),de.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),ee.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),de.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;ee.bind(this.backgroundElement,"click",function(){e.hide()})}return Vi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),de.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",ee.unbind(t.domElement,"webkitTransitionEnd",i),ee.unbind(t.domElement,"transitionend",i),ee.unbind(t.domElement,"oTransitionEnd",i)};ee.bind(this.domElement,"webkitTransitionEnd",n),ee.bind(this.domElement,"transitionend",n),ee.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-ee.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-ee.getHeight(this.domElement)/2+"px"}}]),r}(),iT=HE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);ZE.inject(iT);var vm="dg",ym=72,xm=20,ol="Default",ba=function(){try{return!!window.localStorage}catch{return!1}}(),Fa=void 0,Sm=!0,go=void 0,Xu=!1,w_=[],Yt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),ee.addClass(this.domElement,vm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=de.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=de.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),de.isUndefined(n.load)?n.load={preset:ol}:n.preset&&(n.load.preset=n.preset),de.isUndefined(n.parent)&&n.hideable&&w_.push(this),n.resizable=de.isUndefined(n.parent)&&n.resizable,n.autoPlace&&de.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=ba&&localStorage.getItem(_o(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,aT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,cf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?ee.addClass(t.__ul,r.CLASS_CLOSED):ee.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){ba&&(i=f,f?ee.bind(window,"unload",s):ee.unbind(window,"unload",s),localStorage.setItem(_o(t,"isLocal"),f))}}}),de.isUndefined(n.parent)){if(this.closed=n.closed||!1,ee.addClass(this.domElement,r.CLASS_MAIN),ee.makeSelectable(this.domElement,!1),ba&&i){t.useLocalStorage=!0;var a=localStorage.getItem(_o(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,ee.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(ee.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(ee.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),ee.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);ee.addClass(l,"controller-name"),o=dh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};ee.addClass(this.__ul,r.CLASS_CLOSED),ee.addClass(o,"title"),ee.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(de.isUndefined(n.parent)&&(Sm&&(go=document.createElement("div"),ee.addClass(go,vm),ee.addClass(go,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(go),Sm=!1),go.appendChild(this.domElement),ee.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||cf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},ee.bind(window,"resize",this.__resizeHandler),ee.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),ee.bind(this.__ul,"transitionend",this.__resizeHandler),ee.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&oT(this),s=function(){ba&&localStorage.getItem(_o(t,"isLocal"))==="true"&&localStorage.setItem(_o(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,de.defer(function(){d.width-=1})}n.parent||u()};Yt.toggleHide=function(){Xu=!Xu,de.each(w_,function(r){r.domElement.style.display=Xu?"none":""})};Yt.CLASS_AUTO_PLACE="a";Yt.CLASS_AUTO_PLACE_CONTAINER="ac";Yt.CLASS_MAIN="main";Yt.CLASS_CONTROLLER_ROW="cr";Yt.CLASS_TOO_TALL="taller-than-window";Yt.CLASS_CLOSED="closed";Yt.CLASS_CLOSE_BUTTON="close-button";Yt.CLASS_CLOSE_TOP="close-top";Yt.CLASS_CLOSE_BOTTOM="close-bottom";Yt.CLASS_DRAG="drag";Yt.DEFAULT_WIDTH=245;Yt.TEXT_CLOSED="Close Controls";Yt.TEXT_OPEN="Open Controls";Yt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===ym||r.keyCode===ym)&&Yt.toggleHide()};ee.bind(window,"keydown",Yt._keydownHandler,!1);de.extend(Yt.prototype,{add:function(e,t){return ka(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return ka(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;de.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&go.removeChild(this.domElement);var e=this;de.each(this.__folders,function(t){e.removeFolder(t)}),ee.unbind(window,"keydown",Yt._keydownHandler,!1),wm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Yt(t);this.__folders[e]=n;var i=dh(this,n.domElement);return ee.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],wm(e);var t=this;de.each(e.__folders,function(n){e.removeFolder(n)}),de.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=ee.getOffset(e.__ul).top,n=0;de.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=ee.getHeight(i))}),window.innerHeight-t-xm<n?(ee.addClass(e.domElement,Yt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-xm+"px"):(ee.removeClass(e.domElement,Yt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&de.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:de.debounce(function(){this.onResize()},50),remember:function(){if(de.isUndefined(Fa)&&(Fa=new nT,Fa.domElement.innerHTML=JE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;de.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&sT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&cf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Kl(this)),e.folders={},de.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Kl(this),af(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[ol]=Kl(this,!0)),this.load.remembered[e]=Kl(this),this.preset=e,lf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){de.each(this.__controllers,function(t){this.getRoot().load.remembered?b_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),de.each(this.__folders,function(t){t.revert(t)}),e||af(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&M_(this.__listening)},updateDisplay:function(){de.each(this.__controllers,function(e){e.updateDisplay()}),de.each(this.__folders,function(e){e.updateDisplay()})}});function dh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function wm(r){ee.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&ee.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function af(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function rT(r,e,t){if(t.__li=e,t.__gui=r,de.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),ka(r,t.object,t.property,{before:a,factoryArgs:[de.toArray(arguments)]})}if(de.isArray(o)||de.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),ka(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof sf){var n=new Uc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});de.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),ee.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Uc){var i=function(o){if(de.isNumber(t.__min)&&de.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=ka(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=de.compose(i,t.min),t.max=de.compose(i,t.max)}else t instanceof y_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__checkbox,"click")}),ee.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof S_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__button,"click")}),ee.bind(e,"mouseover",function(){ee.addClass(t.__button,"hover")}),ee.bind(e,"mouseout",function(){ee.removeClass(t.__button,"hover")})):t instanceof of&&(ee.addClass(e,"color"),t.updateDisplay=de.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=de.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&af(r.getRoot(),!0),s},t.setValue)}function b_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[ol])o=s[ol];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function ka(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new of(e,t);else{var s=[e,t].concat(n.factoryArgs);i=QE.apply(r,s)}n.before instanceof Xs&&(n.before=n.before.__li),b_(r,i),ee.addClass(i.domElement,"c");var o=document.createElement("span");ee.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=dh(r,a,n.before);return ee.addClass(l,Yt.CLASS_CONTROLLER_ROW),i instanceof of?ee.addClass(l,"color"):ee.addClass(l,GE(i.getValue())),rT(r,l,i),r.__controllers.push(i),i}function _o(r,e){return document.location.href+"."+e}function lf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function bm(r,e){e.style.display=r.useLocalStorage?"block":"none"}function sT(r){var e=r.__save_row=document.createElement("li");ee.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),ee.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",ee.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",ee.addClass(n,"button"),ee.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",ee.addClass(i,"button"),ee.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",ee.addClass(s,"button"),ee.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?de.each(r.load.remembered,function(d,f){lf(r,f,f===r.preset)}):lf(r,ol,!1),ee.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),ba){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(_o(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),bm(r,a),ee.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,bm(r,a)})}var u=document.getElementById("dg-new-constructor");ee.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Fa.hide()}),ee.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Fa.show(),u.focus(),u.select()}),ee.bind(n,"click",function(){r.save()}),ee.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),ee.bind(s,"click",function(){r.revert()})}function oT(r){var e=void 0;r.__resize_handle=document.createElement("div"),de.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){ee.removeClass(r.__closeButton,Yt.CLASS_DRAG),ee.unbind(window,"mousemove",t),ee.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,ee.addClass(r.__closeButton,Yt.CLASS_DRAG),ee.bind(window,"mousemove",t),ee.bind(window,"mouseup",n),!1}ee.bind(r.__resize_handle,"mousedown",i),ee.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function cf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Kl(r,e){var t={};return de.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];de.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function aT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function M_(r){r.length!==0&&tT.call(window,function(){M_(r)}),de.each(r,function(e){e.updateDisplay()})}var lT=Yt;function Mm(r,e){if(e===hy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Zd||e===qg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Zd)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class cT extends na{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new pT(t)}),this.register(function(t){return new mT(t)}),this.register(function(t){return new MT(t)}),this.register(function(t){return new ET(t)}),this.register(function(t){return new TT(t)}),this.register(function(t){return new _T(t)}),this.register(function(t){return new vT(t)}),this.register(function(t){return new yT(t)}),this.register(function(t){return new xT(t)}),this.register(function(t){return new hT(t)}),this.register(function(t){return new ST(t)}),this.register(function(t){return new gT(t)}),this.register(function(t){return new bT(t)}),this.register(function(t){return new wT(t)}),this.register(function(t){return new dT(t)}),this.register(function(t){return new AT(t)}),this.register(function(t){return new CT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ua.extractUrlBase(e);o=Ua.resolveURL(c,this.path)}else o=Ua.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new d_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===E_){try{o[bt.KHR_BINARY_GLTF]=new RT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[bt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new VT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case bt.KHR_MATERIALS_UNLIT:o[d]=new fT;break;case bt.KHR_DRACO_MESH_COMPRESSION:o[d]=new PT(s,this.dracoLoader);break;case bt.KHR_TEXTURE_TRANSFORM:o[d]=new LT;break;case bt.KHR_MESH_QUANTIZATION:o[d]=new DT;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function uT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const bt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class dT{constructor(e){this.parser=e,this.name=bt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Qe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],qn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new f_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Wx(u),c.distance=d;break;case"spot":c=new Vx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),hr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class fT{constructor(){this.name=bt.KHR_MATERIALS_UNLIT}getMaterialType(){return Es}extendParams(e,t,n){const i=[];e.color=new Qe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],qn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,wn))}return Promise.all(i)}}class hT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class pT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Mt(a,a)}return Promise.all(s)}}class mT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class gT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class _T{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],qn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,wn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class vT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class yT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(a[0],a[1],a[2],qn),Promise.all(s)}}class xT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ST{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(a[0],a[1],a[2],qn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,wn)),Promise.all(s)}}class wT{constructor(e){this.parser=e,this.name=bt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class bT{constructor(e){this.parser=e,this.name=bt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:sr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class MT{constructor(e){this.parser=e,this.name=bt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class ET{constructor(e){this.parser=e,this.name=bt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class TT{constructor(e){this.parser=e,this.name=bt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class AT{constructor(e){this.name=bt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class CT{constructor(e){this.name=bt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==gi.TRIANGLES&&c.mode!==gi.TRIANGLE_STRIP&&c.mode!==gi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new _t,m=new V,p=new rs,w=new V(1,1,1),y=new xx(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&w.fromBufferAttribute(l.SCALE,v),y.setMatrixAt(v,g.compose(m,p,w));for(const v in l)if(v==="_COLOR_0"){const S=l[v];y.instanceColor=new Qd(S.array,S.itemSize,S.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);Jt.prototype.copy.call(y,_),this.parser.assignFinalMaterial(y),h.push(y)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const E_="glTF",ga=12,Em={JSON:1313821514,BIN:5130562};class RT{constructor(e){this.name=bt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ga),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==E_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ga,s=new DataView(e,ga);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Em.JSON){const c=new Uint8Array(e,ga+o,a);this.content=n.decode(c)}else if(l===Em.BIN){const c=ga+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class PT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=bt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=uf[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=uf[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Co[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,qn,f)})})}}class LT{constructor(){this.name=bt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class DT{constructor(){this.name=bt.KHR_MESH_QUANTIZATION}}class T_ extends yl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,w=1-m,y=p-f+d;for(let v=0;v!==a;v++){const S=o[g+v+a],A=o[g+v+l]*u,E=o[_+v+a],P=o[_+v]*u;s[v]=w*S+y*A+m*E+p*P}return s}}const IT=new rs;class OT extends T_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return IT.fromArray(s).normalize().toArray(s),s}}const gi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Co={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Tm={9728:Xn,9729:ci,9984:kg,9985:hc,9986:Sa,9987:_r},Am={33071:Br,33648:Pc,10497:zo},qu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},uf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Nr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},NT={CUBICSPLINE:void 0,LINEAR:rl,STEP:il},Yu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function UT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new rh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Er})),r.DefaultMaterial}function ps(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function hr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function FT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function kT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function BT(r){let e;const t=r.extensions&&r.extensions[bt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ju(t.attributes):e=r.indices+":"+ju(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+ju(r.targets[n]);return e}function ju(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function df(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function zT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const HT=new _t;class VT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new zx(this.options.manager):this.textureLoader=new Yx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new d_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ps(s,a,i),hr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[bt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ua.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=qu[i.type],a=Co[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new kt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=qu[i.type],c=Co[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(w);y||(g=new c(a,p*h,i.count*h/u),y=new mx(g,h/u),t.cache.add(w,y)),m=new eh(y,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new kt(g,l,_);if(i.sparse!==void 0){const p=qu.SCALAR,w=Co[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,S=new w(o[1],y,i.sparse.count*p),A=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new kt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=S.length;E<P;E++){const x=S[E];if(m.setX(x,A[E*l]),l>=2&&m.setY(x,A[E*l+1]),l>=3&&m.setZ(x,A[E*l+2]),l>=4&&m.setW(x,A[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=Tm[f.magFilter]||ci,u.minFilter=Tm[f.minFilter]||_r,u.wrapS=Am[f.wrapS]||zo,u.wrapT=Am[f.wrapT]||zo,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Xn&&u.minFilter!==ci,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new dn(g);m.needsUpdate=!0,f(m)}),t.load(Ua.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),hr(d,o),d.userData.mimeType=o.mimeType||zT(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[bt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[bt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[bt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new a_,Ji.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new o_,Ji.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return rh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[bt.KHR_MATERIALS_UNLIT]){const d=i[bt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Qe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],qn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,wn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=yi);const u=s.alphaMode||Yu.OPAQUE;if(u===Yu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Yu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Es&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Mt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Es&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Es){const d=s.emissiveFactor;a.emissive=new Qe().setRGB(d[0],d[1],d[2],qn)}return s.emissiveTexture!==void 0&&o!==Es&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,wn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),hr(d,s),t.associations.set(d,{materials:e}),s.extensions&&ps(i,d,s),d})}createUniqueName(e){const t=Bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[bt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Cm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=BT(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[bt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=Cm(new Ei,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?UT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const w=c[h];if(m.mode===gi.TRIANGLES||m.mode===gi.TRIANGLE_STRIP||m.mode===gi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new _x(g,w):new Wn(g,w),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===gi.TRIANGLE_STRIP?p.geometry=Mm(p.geometry,qg):m.mode===gi.TRIANGLE_FAN&&(p.geometry=Mm(p.geometry,Zd));else if(m.mode===gi.LINES)p=new bx(g,w);else if(m.mode===gi.LINE_STRIP)p=new ih(g,w);else if(m.mode===gi.LINE_LOOP)p=new Mx(g,w);else if(m.mode===gi.POINTS)p=new tf(g,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&kT(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),hr(p,s),m.extensions&&ps(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&ps(i,d[0],s),d[0];const f=new yr;s.extensions&&ps(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jn(zy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new tu(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),hr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new _t;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new th(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,w=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",w)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let w=0,y=f.length;w<y;w++){const v=f[w],S=h[w],A=_[w],E=g[w],P=m[w];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const x=n._createAnimationTracks(v,S,A,E,P);if(x)for(let b=0;b<x.length;b++)p.push(x[b])}return new Ix(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,HT)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new r_:c.length>1?u=new yr:c.length===1?u=c[0]:u=new Jt,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),hr(u,s),s.extensions&&ps(n,u,s),s.matrix!==void 0){const d=new _t;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new yr;n.name&&(s.name=i.createUniqueName(n.name)),hr(s,n),n.extensions&&ps(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof Ji||f instanceof dn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Nr[s.path]===Nr.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Nr[s.path]){case Nr.weights:c=Go;break;case Nr.rotation:c=Wo;break;case Nr.translation:case Nr.scale:c=Xo;break;default:switch(n.itemSize){case 1:c=Go;break;case 2:case 3:default:c=Xo;break}break}const u=i.interpolation!==void 0?NT[i.interpolation]:rl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Nr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=df(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Wo?OT:T_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function GT(r,e,t){const n=e.attributes,i=new Bi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new V(l[0],l[1],l[2]),new V(c[0],c[1],c[2])),a.normalized){const u=df(Co[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new V,l=new V;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=df(Co[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new rr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Cm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=uf[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Rt.workingColorSpace!==qn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Rt.workingColorSpace}" not supported.`),hr(r,e),GT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?FT(r,e.targets,t):r})}const WT="/content/dam/acsorg/150/assets/models/globe-hd.glb";function XT(){window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=9e4;function t(){const M=document.querySelector("#events");if(!M)return!0;const B=M.getBoundingClientRect(),ne=window.innerHeight*1.2;return B.top>ne}const n=document.getElementById("shaderBackground");if(!n)return;window.specialColorsActive=!1,window.colorPhase=1;let i,s;$h(()=>Promise.resolve().then(()=>EA),void 0).then(M=>{i=M.default,$h(()=>Promise.resolve().then(()=>WA),void 0).then(B=>{s=B.default,i.registerPlugin(s),o(i)})}).catch(M=>{console.error("Error loading GSAP:",M)});function o(M,B){let G,ne,se,oe,ye,Ze,Dt,lt;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(C&&C.color1&&C.color2&&(G=C.color1.value.clone(),ne=C.color2.value.clone(),se=C.waveSpeed.value,oe=C.waveAmplitude.value,ye=C.waveFrequency.value,Ze=C.ambientLight.value,Dt=C.directionalLight.value,lt=C.yOffset.value),M.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:Ut=>{C&&C.colorDarkness&&(C.colorDarkness.value=Ut.progress*2,C.colorDarkness.value>=1.95?window.colorPhase===1&&(C.color1&&C.color1.value.set(G),C.color2&&C.color2.value.set(ne),window.specialColorsActive=!0):G&&ne&&window.colorPhase===1&&(C.color1&&C.color1.value.copy(G),C.color2&&C.color2.value.copy(ne),window.specialColorsActive=!1),l())}}}),setTimeout(()=>{a(M)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}M.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:Ut=>{const dt=Ut.progress;F&&(dt>.01&&!F.visible?(F.visible=!0,I.visible=!0,d()):dt<=.01&&F.visible&&(F.visible=!1,I.visible=!1,d()),F.visible&&(F.traverse(At=>{At.isMesh&&At.material&&(At.material.transparent=!0,At.material.opacity=dt)}),I.opacity=dt,u())),P&&(dt>.01&&!P.visible?(P.visible=!0,x.enabled=!0,f()):dt<=.01&&P.visible&&(P.visible=!1,x.enabled=!1,f()),E&&E.uniforms&&(dt>.01&&P.visible?(E.uniforms.startOpacity.value=x.startOpacity*dt,E.uniforms.endOpacity.value=x.endOpacity*dt):(E.uniforms.startOpacity.value=0,E.uniforms.endOpacity.value=0)))}}}),M.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:Ut=>{const dt=Ut.progress,At=.15;if(!window.particlesFullyHidden&&dt>=At?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&dt<At*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){Me&&Me.uniforms&&Me.uniforms.opacity&&(Me.uniforms.opacity.value=0,On());return}const Qt=1-Math.min(dt/At,1),Ys=.5*Math.pow(Qt,3);Me&&Me.uniforms&&Me.uniforms.opacity&&(Me.uniforms.opacity.value=Ys,On())}}}),M.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:Ut=>{const dt=Ut.progress;if(A){const Ti=-322+120*(1-Math.pow(1-dt,3));if(A.position.y=Ti,q&&q.__folders["Globe Model Controls"]){const sa=q.__folders["Globe Model Controls"].__folders.Position;if(sa&&sa.__controllers){for(let Ys of sa.__controllers)if(Ys.property==="positionY"){Ys.updateDisplay();break}}}}}}}),M.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:Ut=>{if(!C||!C.color1||!C.color2)return;const dt=Ut.progress,At=2,Qt=At+(.2-At)*dt;C&&C.waveSpeed&&(C.waveSpeed.value=Qt);const Ti=3,Ys=Ti+(1-Ti)*dt;C&&C.waveAmplitude&&(C.waveAmplitude.value=Ys);const Wh=2.2,mv=Wh+(1-Wh)*dt;if(C&&C.waveFrequency&&(C.waveFrequency.value=mv),ms(),dt>.1){const gv=new Qe("#32c2d6"),_v=new Qe("#004199"),vv=new Qe("#ff4848"),yv=new Qe("#3f00f5"),cu=Math.min(1,(dt-.1)/.9),Xh=cu*cu*(3-2*cu),xv=gv.clone().lerp(vv,Xh),Sv=_v.clone().lerp(yv,Xh);C.color1.value.copy(xv),C.color2.value.copy(Sv),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c()}else C.color1.value.set("#32c2d6"),C.color2.value.set("#004199"),window.colorPhase=1,r=Date.now(),window.specialColorsActive=!0,c()}}}),M.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:Ut=>{if(!C||!C.color1||!C.color2)return;const dt=Ut.progress;if(dt>.1)C.color1.value.set("#dcfff6"),C.color2.value.set("#5dff9d"),C.yOffset&&(C.yOffset.value=-.05),C.ambientLight.value=.4,C.directionalLight.value=.4,C.waveAmplitude.value=1.2,C.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,c(),co(),ms();else if(dt<=.1&&window.colorPhase===3){const At=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=At,C.time.value=0,C.color1.value.set("#ff4848"),C.color2.value.set("#3f00f5"),C.yOffset&&lt!==void 0&&(C.yOffset.value=lt),Ze!==void 0&&(C.ambientLight.value=Ze),Dt!==void 0&&(C.directionalLight.value=Dt),C.waveSpeed.value=.2,C.waveAmplitude.value=1,C.waveFrequency.value=1,window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,c(),co(),ms()}l()}}}),M.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:Ut=>{const At=1-Ut.progress,pn=Math.pow(At,3);F&&(F.visible=!0,F.traverse(Qt=>{Qt.isMesh&&Qt.material&&(Array.isArray(Qt.material)?Qt.material.forEach(Ti=>{Ti.transparent=!0,Ti.opacity=pn,Ti.depthWrite=pn>.1,Ti.blending=jr,Ti.needsUpdate=!0}):(Qt.material.transparent=!0,Qt.material.opacity=pn,Qt.material.depthWrite=pn>.1,Qt.material.blending=jr,Qt.material.needsUpdate=!0))}),pn<.01&&(F.visible=!1),I.opacity=pn,I.rotationPaused=pn<.01,u()),P&&E&&E.uniforms&&(P.visible=pn>.01,E.uniforms.startOpacity.value=x.startOpacity*pn,E.uniforms.endOpacity.value=x.endOpacity*pn,x.enabled=pn>.01,f())}}}),M.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:Ut=>{Ut.progress<=.1&&se!==void 0&&window.colorPhase===1&&(C.waveSpeed&&(C.waveSpeed.value=se),C.waveAmplitude&&(C.waveAmplitude.value=oe),C.waveFrequency&&(C.waveFrequency.value=ye),C.yOffset&&(C.yOffset.value=lt),co(),ms())}}});function On(Ut){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Particle System"]){const dt=q.__folders["Particle System"];if(dt&&dt.__controllers){for(let At of dt.__controllers)if(At.property==="value"&&At.object===Me.uniforms.opacity){At.updateDisplay();break}}}}}function a(M,B,G,ne){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{a(M)});return}M.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:oe=>{C&&C.colorDarkness&&(C.colorDarkness.value=2-oe.progress*2,window.colorPhase===3?(C.color1&&C.color1.value.set("#dcfff6"),C.color2&&C.color2.value.set("#5dff9d"),C.ambientLight&&(C.ambientLight.value=.4),C.directionalLight&&(C.directionalLight.value=.4),C.waveSpeed&&(C.waveSpeed.value=.9),C.waveAmplitude&&(C.waveAmplitude.value=1.2),window.specialColorsActive=!0,c(),co(),ms()):window.colorPhase===2?(C.color1&&C.color1.value.set("#ff4848"),C.color2&&C.color2.value.set("#3f00f5"),window.specialColorsActive=!0,c(),co(),ms()):(C.color1&&C.color1.value.set("#32c2d6"),C.color2&&C.color2.value.set("#004199"),window.specialColorsActive=!0,c(),co(),ms()),l())}}})}function l(){const M=window.gui,B=window.uniforms;if(typeof M<"u"&&M&&M.__folders&&M.__folders["Color Controls"]){const G=M.__folders["Color Controls"];if(G&&G.__controllers){for(let ne of G.__controllers)if(ne.property==="value"&&ne.object===B.colorDarkness){ne.updateDisplay();break}}}}function c(){const M=window.gui,B=window.uniforms;if(typeof M<"u"&&M&&M.__folders&&M.__folders["Color Controls"]){const G=M.__folders["Color Controls"];G&&G.__controllers&&G.__controllers.forEach(ne=>{if(ne.property==="color"&&ne.__color){if(ne.property==="color"&&ne.__li&&ne.__li.querySelector(".property-name").textContent==="Color 1"){const oe="#"+B.color1.value.getHexString();ne.setValue(oe)}else if(ne.property==="color"&&ne.__li&&ne.__li.querySelector(".property-name").textContent==="Color 2"){const oe="#"+B.color2.value.getHexString();ne.setValue(oe)}}})}}function u(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Globe Model Controls"]&&q.__folders["Globe Model Controls"].__folders&&q.__folders["Globe Model Controls"].__folders.Material){const M=q.__folders["Globe Model Controls"].__folders.Material;if(M&&M.__controllers)for(let B of M.__controllers)B.property==="opacity"&&B.updateDisplay()}}function d(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Globe Model Controls"]){const M=q.__folders["Globe Model Controls"];if(M&&M.__controllers){for(let B of M.__controllers)if(B.property==="visible"){B.updateDisplay();break}}}}function f(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Gradient Overlay Controls"]){const M=q.__folders["Gradient Overlay Controls"];if(M&&M.__controllers){for(let B of M.__controllers)if(B.property==="enabled"){B.updateDisplay();break}}}}function h(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const _=window.innerWidth,g=h();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100dvh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";const m=new zE({canvas:n,alpha:!0});m.setSize(_,g),m.setPixelRatio(window.devicePixelRatio);const p=new bp,w=new bp;let y=0;const v={zoom:2.471,zPosition:1},S=new tu(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);S.position.z=v.zPosition,S.zoom=v.zoom,S.updateProjectionMatrix();const A=new yr;A.position.y=-322,A.frustumCulled=!0,p.add(A);let E,P;const x={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function b(){E=new Si({transparent:!0,uniforms:{startOpacity:{value:x.startOpacity},endOpacity:{value:x.endOpacity},overlayColor:{value:new Qe(x.color)},offsetY:{value:x.offsetY},heightMultiplier:{value:x.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:yi});const M=window.innerHeight,B=S.right-S.left,G=S.top-S.bottom,ne=M*.66*(G/M),se=new Li(B,ne);P=new Wn(se,E),P.rotation.set(0,0,0),P.position.x=0,P.position.y=x.yOffset*G,P.position.z=-100,P.frustumCulled=!1,P.renderOrder=9999,P.visible=x.enabled,p.add(P)}function D(){if(!P)return;P.rotation.set(0,0,0),P.position.x=0;const M=S.top-S.bottom;P.position.y=x.yOffset*M,P.position.z=-100}b();const I={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},H=new cT;let F;H.load(WT,M=>{F=M.scene;let G=new Bi().setFromObject(F).getCenter(new V),ne=new yr;ne.add(F),F.position.set(-G.x,-G.y,-G.z),F=ne,F.visible=I.visible,F.frustumCulled=!0,F.traverse(ye=>{ye.isMesh&&(ye.frustumCulled=!0)}),A.add(F),F.position.set(I.positionX,I.positionY,I.positionZ),F.rotation.set(I.rotationX*Math.PI/180,I.rotationY*Math.PI/180,I.rotationZ*Math.PI/180),I.responsive?Be():(F.scale.set(I.scale,I.scale,I.scale),ot());const se=ct.addFolder("Material");let oe=0;F.traverse(ye=>{if(ye.isMesh&&ye.material){const Ze=ye.material;if(oe++,Ze.isMeshStandardMaterial||Ze.isMeshPhongMaterial){Ze.metalness!==void 0&&se.add({metalness:Ze.metalness},"metalness",0,1).name(`Metalness${oe>1?" "+oe:""}`).onChange(lt=>{Ze.metalness=lt}),Ze.roughness!==void 0&&se.add({roughness:Ze.roughness},"roughness",0,1).name(`Roughness${oe>1?" "+oe:""}`).onChange(lt=>{Ze.roughness=lt}),Ze.shininess!==void 0&&se.add({shininess:Ze.shininess},"shininess",0,100).name(`Shininess${oe>1?" "+oe:""}`).onChange(lt=>{Ze.shininess=lt}),se.add({opacity:Ze.opacity},"opacity",0,1).name(`Opacity${oe>1?" "+oe:""}`).onChange(lt=>{Ze.opacity=lt,Ze.transparent=lt<1});const Dt=Ze.emissive?"#"+Ze.emissive.getHexString():"#000000";se.addColor({color:Dt},"color").name(`Emissive Color${oe>1?" "+oe:""}`).onChange(lt=>{Ze.emissive&&Ze.emissive.set(lt)})}}})},M=>{},M=>{}),window.uniforms={time:{value:0},resolution:{value:new Mt(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new Qe(3326678)},color2:{value:new Qe(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:0},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.6},flowDirection:{value:new Mt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new V(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const C=window.uniforms,$=`
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
  `,K=`
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
  `,X=new Li(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),pe=new Si({vertexShader:$,fragmentShader:K,uniforms:C,transparent:!0,side:yi}),O=new Wn(X,pe);p.add(O),window.gui=new lT({width:300,closed:!0});const q=window.gui;q.domElement.style.position="absolute",q.domElement.style.top="10px",q.domElement.style.right="10px";const je=q.domElement.querySelector(".close-button");je&&(je.innerHTML="Open Controls",je.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=q.closed?"Open Controls":"Close Controls"},50)}));const it=q.addFolder("Camera Controls");it.add(v,"zoom",.1,5).name("Zoom Level").step(.001).onChange(M=>{S.zoom=M,S.updateProjectionMatrix()}),it.close();const J=q.addFolder("Animation Speed Controls");J.add(C.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(M=>{C.mainSpeed.value=M}),J.add(C.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(M=>{C.waveSpeed.value=M}),J.add(C.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(M=>{C.noiseSpeed.value=M}),J.add(C.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(M=>{C.colorCycleSpeed.value=M}),J.add(C.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(M=>{C.colorCycleOffset.value=M}),J.open();const ce=q.addFolder("Color Controls"),Pe="#"+C.color1.value.getHexString(),ge="#"+C.color2.value.getHexString();ce.addColor({color:Pe},"color").name("Color 1").onChange(M=>{typeof M=="string"?C.color1.value.set(M):C.color1.value.setRGB(M.r/255,M.g/255,M.b/255)}),ce.addColor({color:ge},"color").name("Color 2").onChange(M=>{typeof M=="string"?C.color2.value.set(M):C.color2.value.setRGB(M.r/255,M.g/255,M.b/255)}),ce.add(C.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(M=>{C.colorDarkness.value=M}),ce.add(C.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(M=>{C.colorWaveInfluence.value=M}),ce.add(C.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(M=>{C.colorFrequencyShift.value=M}),ce.add(C.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(M=>{C.colorAmplitudeEffect.value=M}),ce.open();const Ae=q.addFolder("Wave Controls");Ae.add(C.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(M=>{C.waveAmplitude.value=M}),Ae.add(C.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(M=>{C.waveFrequency.value=M}),Ae.add(C.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(M=>{C.waveDepth.value=M}),Ae.add(C.noiseScale,"value",0,5).name("Noise Scale").onChange(M=>{C.noiseScale.value=M}),Ae.add(C.noiseInfluence,"value",0,1).name("Noise Influence").onChange(M=>{C.noiseInfluence.value=M}),Ae.add(C.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(M=>{C.layerOffset.value=M});const tt=Ae.addFolder("Flow Direction");tt.add(C.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(M=>{C.flowDirection.value.x=M}),tt.add(C.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(M=>{C.flowDirection.value.y=M});const we=q.addFolder("Appearance Controls"),ht=q.addFolder("Film Noise Controls");ht.add(C.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(M=>{C.filmNoiseIntensity.value=M}),ht.add(C.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(M=>{C.filmNoiseSpeed.value=M}),ht.add(C.filmGrainSize,"value",.5,50).name("Grain Size").onChange(M=>{C.filmGrainSize.value=M}),ht.add(C.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(M=>{C.filmScratchIntensity.value=M}),we.add(C.xOffset,"value",-1,1).step(.001).name("X Position").onChange(M=>{C.xOffset.value=M}),we.add(C.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(M=>{C.yOffset.value=M}),we.add(C.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(M=>{C.fadeWidth.value=M}),we.add(C.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(M=>{C.topEdgeSoftness.value=M}),we.add(C.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(M=>{C.bottomEdgeSoftness.value=M}),we.add(C.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(M=>{C.leftEdgeSoftness.value=M}),we.add(C.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(M=>{C.rightEdgeSoftness.value=M}),we.add(C.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(M=>{C.leftCornerRoundness.value=M}),we.add(C.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(M=>{C.rightCornerRoundness.value=M}),we.add(C.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(M=>{C.edgeDepth.value=M}),we.add(C.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(M=>{C.edgeContrast.value=M}),we.add(C.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(M=>{C.edgeNoiseAmount.value=M}),we.add(C.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(M=>{C.edgeNoiseScale.value=M});const pt=q.addFolder("Bottom Wave Edge Controls");pt.add(C.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(M=>{C.bottomWaveEnabled.value=M,F&&I.responsive&&ot()}),pt.add(C.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(M=>{C.bottomWaveDepth.value=M,F&&I.responsive&&ot()}),pt.add(C.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(M=>{C.bottomWaveWidth.value=M}),pt.add(C.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(M=>{C.bottomWaveSpeed.value=M}),pt.add(C.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(M=>{C.bottomWaveOffset.value=M});const Ue=q.addFolder("Lighting Controls");Ue.add(C.ambientLight,"value",0,1).name("Ambient Light").onChange(M=>{C.ambientLight.value=M}),Ue.add(C.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(M=>{C.directionalLight.value=M}),Ue.add(C.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(M=>{C.specularStrength.value=M}),Ue.add(C.shininess,"value",1,128).name("Shininess").onChange(M=>{C.shininess.value=M});const U=Ue.addFolder("Light Direction");U.add(C.lightDirection.value,"x",-1,1).name("X").onChange(()=>{C.lightDirection.value.normalize()}),U.add(C.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{C.lightDirection.value.normalize()}),U.add(C.lightDirection.value,"z",0,1).name("Z").onChange(()=>{C.lightDirection.value.normalize()});const ct=q.addFolder("Globe Model Controls"),st=new f_(16777215,10);st.position.set(1,1,1),p.add(st);const Y=new qx(16777215,.5);p.add(Y);const Ie=ct.addFolder("Lighting");Ie.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(M=>{st.intensity=M}),st.intensity=3,Ie.add({intensity:Y.intensity},"intensity",0,5).name("Ambient Light").onChange(M=>{Y.intensity=M}),ct.add(I,"visible").name("Show Globe").onChange(M=>{F&&(F.visible=M)}),ct.add(I,"scale",.1,50).name("Size").step(.1).onChange(M=>{F&&(I.baseScale=M,F.scale.set(M,M,M))}),ct.add(I,"responsive").name("Responsive Size").onChange(M=>{!M&&F?F.scale.set(I.baseScale,I.baseScale,I.baseScale):M&&Be()}),ct.add({resizeGlobe:function(){F&&Be()}},"resizeGlobe").name("Force Resize"),ct.add({positionBehindWave:function(){F&&ot()}},"positionBehindWave").name("Position Behind Wave");function ot(){if(!F)return;const M=window.innerWidth,B=window.innerHeight;if(M<=640){F.position.y=192,F.position.z=-10;for(let oe=0;oe<Oe.__controllers.length;oe++){const ye=Oe.__controllers[oe];ye.property==="positionY"?ye.setValue(192):ye.property==="positionZ"&&ye.setValue(-10)}return}if(M>640&&M<=1024){F.position.y=192,F.position.z=-10;for(let ye=0;ye<Oe.__controllers.length;ye++){const Ze=Oe.__controllers[ye];Ze.property==="positionY"?Ze.setValue(192):Ze.property==="positionZ"&&Ze.setValue(-10)}return}const G=C.bottomWaveEnabled.value,ne=C.bottomWaveDepth.value,se=C.edgeDepth.value;if(G){const oe=B*ne*se*.5,Ze=(S.top-S.bottom)/S.zoom/B,Dt=-oe*Ze-B*.1*Ze,lt=-10;F.position.y=Dt,F.position.z=lt;for(let Gi=0;Gi<Oe.__controllers.length;Gi++){const Ot=Oe.__controllers[Gi];Ot.property==="positionY"?Ot.setValue(Dt):Ot.property==="positionZ"&&Ot.setValue(lt)}}}function Be(){if(!F||!I.responsive)return;const M=window.innerWidth,B=M*.9,G={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const ne=new Bi().setFromObject(F),se=ne.max.x-ne.min.x;F.scale.set(G.x,G.y,G.z);const ye=(S.right-S.left)/S.zoom/M,Dt=B*ye/se;F.scale.set(Dt,Dt,Dt);for(let lt=0;lt<ct.__controllers.length;lt++)if(ct.__controllers[lt].property==="scale"){ct.__controllers[lt].setValue(Dt);break}ot()}catch(ne){console.error("Error updating globe size:",ne),F.scale.set(G.x,G.y,G.z)}}const Oe=ct.addFolder("Position");Oe.add(I,"positionX",-500,500).name("X Position").step(1).onChange(M=>{F&&(F.position.x=M)}),Oe.add(I,"positionY",-500,500).name("Y Position").step(1).onChange(M=>{F&&(F.position.y=M)}),Oe.add(I,"positionZ",-500,500).name("Z Position").step(1).onChange(M=>{F&&(F.position.z=M)});const Pt=ct.addFolder("Rotation");Pt.add(I,"rotationX",0,360).name("X Rotation").step(1).onChange(M=>{F&&(F.rotation.x=M*Math.PI/180)}),Pt.add(I,"rotationY",0,360).name("Y Rotation").step(1).onChange(M=>{F&&(F.rotation.y=M*Math.PI/180)}),Pt.add(I,"rotationZ",0,360).name("Z Rotation").step(1).onChange(M=>{F&&(F.rotation.z=M*Math.PI/180)}),ct.add(I,"autoRotate").name("Auto Rotate").onChange(M=>{I.autoRotate=M}),ct.add(I,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(M=>{I.baseRotateSpeed=M}),ct.add(I,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(M=>{I.scrollRotateSpeed=M}),ct.open();const L=q.addFolder("Gradient Overlay Controls");L.add(x,"enabled").name("Show Overlay").onChange(M=>{P&&(P.visible=M)});const T=L.add(x,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(M=>{E&&(E.uniforms.startOpacity.value=M)});T.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const W=L.add(x,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(M=>{E&&(E.uniforms.endOpacity.value=M)});W.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",L.add(x,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(M=>{P&&D()}),L.add(x,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(M=>{E&&(E.uniforms.offsetY.value=M)}),L.add(x,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(M=>{E&&(E.uniforms.heightMultiplier.value=M)}),L.addColor(x,"color").name("Color").onChange(M=>{E&&E.uniforms.overlayColor.value.set(M)}),L.add({debugOverlay:function(){if(E){const M=E.uniforms.startOpacity.value,B=E.uniforms.endOpacity.value;E.uniforms.startOpacity.value=1,E.uniforms.endOpacity.value=1,E.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{E.uniforms.startOpacity.value=M,E.uniforms.endOpacity.value=B,E.uniforms.overlayColor.value.set(x.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),L.open();let te=276,ie=new Float32Array(te*3),Q=new Float32Array(te*3),xe=new Float32Array(te*3),_e=0,ze=0;const re={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let le=window.innerHeight*re.verticalSpread;function be(){const M=new Float32Array(te);for(let B=0;B<te;B++){const G=B*3,ne=Math.random(),se=re.sizeMin+ne*(re.sizeMax-re.sizeMin);M[B]=se/Me.uniforms.baseSize.value;const oe=new Qe(Ce.color),ye=.8+ne*.6;xe[G]=oe.r*ye,xe[G+1]=oe.g*ye,xe[G+2]=oe.b*ye}Ee.setAttribute("size",new kt(M,1)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,Ee.attributes.size.needsUpdate=!0}for(let M=0;M<te;M++){const B=M*3;ie[B]=(Math.random()-.5)*window.innerWidth,ie[B+1]=(Math.random()-.5)*le+re.verticalOffset,ie[B+2]=Math.random()*500-250,Q[B]=(Math.random()-.5)*.5,Q[B+1]=(Math.random()-.5)*.5,Q[B+2]=(Math.random()-.5)*.2;const G=new Qe("#25e5ff");xe[B]=G.r,xe[B+1]=G.g,xe[B+2]=G.b}const Ee=new Ei;Ee.setAttribute("position",new kt(ie,3)),Ee.setAttribute("color",new kt(xe,3));const $e=Se();function Se(){const M=document.createElement("canvas");M.width=256,M.height=256;const B=M.getContext("2d"),G=B.createRadialGradient(M.width/2,M.height/2,0,M.width/2,M.height/2,M.width/2);G.addColorStop(0,"rgba(255, 255, 255, 1.0)"),G.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),G.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),G.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),G.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),G.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),G.addColorStop(1,"rgba(255, 255, 255, 0)"),B.fillStyle=G,B.fillRect(0,0,M.width,M.height),B.beginPath(),B.moveTo(M.width/2,M.width*.3),B.lineTo(M.width/2,M.width*.7),B.moveTo(M.width*.3,M.height/2),B.lineTo(M.width*.7,M.height/2),B.moveTo(M.width*.35,M.height*.35),B.lineTo(M.width*.65,M.height*.65),B.moveTo(M.width*.65,M.height*.35),B.lineTo(M.width*.35,M.height*.65),B.strokeStyle="rgba(255, 255, 255, 1.0)",B.lineWidth=4,B.stroke();const ne=B.createRadialGradient(M.width/2,M.height/2,M.width*.2,M.width/2,M.height/2,M.width*.7);ne.addColorStop(0,"rgba(255, 255, 255, 0.3)"),ne.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),ne.addColorStop(1,"rgba(255, 255, 255, 0)"),B.globalCompositeOperation="lighter",B.fillStyle=ne,B.fillRect(0,0,M.width,M.height);const se=new dn(M);return se.needsUpdate=!0,se}const Me=new Si({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:$e},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Rc,depthWrite:!1,depthTest:!1}),N=new tf(Ee,Me);N.frustumCulled=!0,w.add(N);const me=q.addFolder("Particle System"),ue={count:te};me.add(ue,"count",100,1e3,10).name("Particle Count").onChange(M=>{te=Math.floor(M);const B=new Float32Array(te*3),G=new Float32Array(te*3),ne=new Float32Array(te*3);for(let se=0;se<te;se++){const oe=se*3;if(se<ie.length/3)B[oe]=ie[oe],B[oe+1]=ie[oe+1],B[oe+2]=ie[oe+2],G[oe]=Q[oe],G[oe+1]=Q[oe+1],G[oe+2]=Q[oe+2],ne[oe]=xe[oe],ne[oe+1]=xe[oe+1],ne[oe+2]=xe[oe+2];else{B[oe]=(Math.random()-.5)*window.innerWidth,B[oe+1]=(Math.random()-.5)*le+re.verticalOffset,B[oe+2]=Math.random()*500-250,G[oe]=(Math.random()-.5)*.5,G[oe+1]=(Math.random()-.5)*.5,G[oe+2]=(Math.random()-.5)*.2;const ye=new Qe(Ce.color);ne[oe]=ye.r,ne[oe+1]=ye.g,ne[oe+2]=ye.b}}ie=B,Q=G,xe=ne,Ee.setAttribute("position",new kt(ie,3)),Ee.setAttribute("color",new kt(xe,3)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,be()});const Ce={color:"#25e5ff"};me.addColor(Ce,"color").name("Particle Color").onChange(M=>{const B=new Qe(M);for(let G=0;G<te;G++){const ne=G*3;xe[ne]=B.r,xe[ne+1]=B.g,xe[ne+2]=B.b}Ee.setAttribute("color",new kt(xe,3)),Ee.attributes.color.needsUpdate=!0}),me.add(Me.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(M=>{be()}),me.add(Me.uniforms.opacity,"value",0,1,.1).name("Opacity"),me.add(Me.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(M=>{Me.uniforms.brightness.value=M});const he={intensity:1.5};me.add(he,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(M=>{Me.uniforms.opacity.value=M});const ae={enabled:!1},Fe=me.add(ae,"enabled").name("Size Attenuation").onChange(M=>{M?Me.vertexShader=`
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
        `,Me.needsUpdate=!0,be()}),He=document.createElement("div");He.className="gui-tooltip",He.textContent="When enabled, particles appear smaller as they move further away",He.style.position="absolute",He.style.backgroundColor="rgba(0,0,0,0.8)",He.style.color="#fff",He.style.padding="5px",He.style.borderRadius="3px",He.style.fontSize="11px",He.style.zIndex="10000",He.style.display="none",document.body.appendChild(He);const Et=Fe.domElement;Et.addEventListener("mouseenter",M=>{const B=Et.getBoundingClientRect();He.style.left=B.right+"px",He.style.top=B.top+"px",He.style.display="block"}),Et.addEventListener("mouseleave",()=>{He.style.display="none"});let Le=0;window.addEventListener("scroll",()=>{_e=window.scrollY});let Re=[],rt={x:0,y:0},Te={x:0,y:0},at=0,We=0,nt=!1,jt=150,ut=[],zt=10,Gt;const Ve={enabled:!0,spawnRate:.65,maxParticles:150,baseSize:1.8,fadeInSpeed:.75,fadeOutSpeed:1,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.052,spawnOffsetMax:.62,minLifetime:1.5,maxLifetime:4};Gt=Ve.spawnOffsetMin;const mt=new Ei,Lt=new Si({uniforms:{baseSize:{value:Ve.baseSize},map:{value:$e},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Rc,depthWrite:!1,depthTest:!1}),In=new tf(mt,Lt);w.add(In);function Ht(M,B){const G=M/window.innerWidth*2-1,ne=-(B/window.innerHeight)*2+1,se=G*(S.right-S.left)/2/S.zoom,oe=ne*(S.top-S.bottom)/2/S.zoom;return{x:se,y:oe}}function xn(M,B){return{id:at++,position:{x:M,y:B,z:Math.random()*100-50},targetPosition:{x:M,y:B},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Ve.minLifetime+Math.random()*(Ve.maxLifetime-Ve.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function Sn(){if(Re.length===0){mt.attributes.position&&(mt.setAttribute("position",new kt(new Float32Array(0),3)),mt.setAttribute("color",new kt(new Float32Array(0),3)),mt.setAttribute("size",new kt(new Float32Array(0),1)),mt.setAttribute("opacity",new kt(new Float32Array(0),1)));return}const M=new Float32Array(Re.length*3),B=new Float32Array(Re.length*3),G=new Float32Array(Re.length),ne=new Float32Array(Re.length);for(let se=0;se<Re.length;se++){const oe=Re[se],ye=se*3;M[ye]=oe.position.x,M[ye+1]=oe.position.y,M[ye+2]=oe.position.z,B[ye]=oe.color.r,B[ye+1]=oe.color.g,B[ye+2]=oe.color.b,G[se]=oe.size,ne[se]=oe.opacity}mt.setAttribute("position",new kt(M,3)),mt.setAttribute("color",new kt(B,3)),mt.setAttribute("size",new kt(G,1)),mt.setAttribute("opacity",new kt(ne,1)),mt.attributes.position.needsUpdate=!0,mt.attributes.color.needsUpdate=!0,mt.attributes.size.needsUpdate=!0,mt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",M=>{if(!Ve.enabled)return;Te.x=rt.x,Te.y=rt.y,rt.x=M.clientX,rt.y=M.clientY;const B=rt.x-Te.x,G=rt.y-Te.y,ne=Math.sqrt(B*B+G*G);if(nt||(We+=ne,We>=jt&&(nt=!0)),ut.push(ne),ut.length>zt&&ut.shift(),ut.length>0){const se=ut.reduce((Ze,Dt)=>Ze+Dt,0)/ut.length,ye=Math.min(se/20,1);Gt=Ve.spawnOffsetMin+(Ve.spawnOffsetMax-Ve.spawnOffsetMin)*ye}if(nt&&ne>1&&Re.length<Ve.maxParticles&&Math.random()<Ve.spawnRate){const se=Ht(rt.x,rt.y),oe=Gt*50,ye=Math.random()*Math.PI*2,Ze=Math.cos(ye)*oe*Math.random(),Dt=Math.sin(ye)*oe*Math.random(),lt=xn(se.x+Ze,se.y+Dt);Re.push(lt)}});function tn(){if(Re.length===0)return;const M=Ht(rt.x,rt.y);for(let B=Re.length-1;B>=0;B--){const G=Re[B];G.life+=.016,G.targetPosition.x=M.x,G.targetPosition.y=M.y;const ne=G.trailSpeed*Ve.trailLength;G.position.x+=(G.targetPosition.x-G.position.x)*ne,G.position.y+=(G.targetPosition.y-G.position.y)*ne,G.position.x+=(Math.random()-.5)*2*Ve.jitterAmount,G.position.y+=(Math.random()-.5)*2*Ve.jitterAmount;const se=G.life/G.maxLife;if(se<.15){G.fadePhase="in";const oe=se/.15,ye=1-Math.pow(1-oe,2);G.opacity=ye*Ve.fadeInSpeed}else if(se<.65)G.fadePhase="hold",G.opacity=Ve.fadeInSpeed;else{G.fadePhase="out";const oe=(se-.65)/.35,ye=Math.pow(1-oe,2);G.opacity=ye*Ve.fadeInSpeed*Ve.fadeOutSpeed}(G.life>=G.maxLife||G.opacity<=0)&&Re.splice(B,1)}Sn(),R.currentOffset=Gt}const Tt=q.addFolder("Mouse Follow Particles");Tt.add(Ve,"enabled").name("Enable Mouse Particles").onChange(M=>{M||(Re=[],Sn(),nt=!1,We=0,ut=[],Gt=Ve.spawnOffsetMin)}),Tt.add(Ve,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(M=>{Ve.spawnRate=M}),Tt.add(Ve,"maxParticles",10,50,1).name("Max Particles").onChange(M=>{for(Ve.maxParticles=M;Re.length>M;)Re.pop();Sn()}),Tt.add(Ve,"baseSize",2,10,.5).name("Particle Size").onChange(M=>{Lt.uniforms.baseSize.value=M}),Tt.add(Ve,"trailLength",.1,1,.1).name("Trail Length").onChange(M=>{Ve.trailLength=M}),Tt.add(Ve,"speedVariation",0,1,.1).name("Speed Variation").onChange(M=>{Ve.speedVariation=M}),Tt.add(Ve,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(M=>{Ve.jitterAmount=M}),Tt.add(Ve,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(M=>{Ve.spawnOffsetMin=M}),Tt.add(Ve,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(M=>{Ve.spawnOffsetMax=M});const R={currentOffset:Gt};Tt.add(R,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),Tt.add(Ve,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(M=>{Ve.fadeInSpeed=M}),Tt.add(Ve,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(M=>{Ve.fadeOutSpeed=M}),Tt.add({movementThreshold:jt},"movementThreshold",50,300,10).name("Initial Movement Needed").onChange(M=>{jt=M}),Tt.add({resetActivation:function(){nt=!1,We=0,ut=[],Gt=Ve.spawnOffsetMin,Re=[],Sn()}},"resetActivation").name("Reset Activation"),Tt.close();function z(){const M=Ee.attributes.position.array,B=re.previousOffset||0,G=re.verticalOffset-B;re.previousOffset=re.verticalOffset;for(let ne=0;ne<te;ne++){const se=ne*3;M[se+1]+=G;const oe=M[se+1]-re.verticalOffset,ye=le/2;oe>ye?M[se+1]=-ye+re.verticalOffset:oe<-ye&&(M[se+1]=ye+re.verticalOffset)}Ee.attributes.position.needsUpdate=!0}function Z(){const M=Ee.attributes.position.array,B=Ee.attributes.color.array,G=Ee.attributes.size?Ee.attributes.size.array:null;Le+=.01;const ne=(_e-ze)*re.scrollSpeed;if(ze=_e*(1-re.damping)+ze*re.damping,!window.particlesMovementPaused){for(let se=0;se<te;se++){const oe=se*3,ye=G?(G[se]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Ze=re.floatSpeed*(.5+ye*.5);M[oe]+=Q[oe]*Ze,M[oe+1]+=Q[oe+1]*Ze,M[oe+2]+=Q[oe+2]*Ze,M[oe+1]+=ne*(.5+ye*.5),Math.abs(M[oe])>window.innerWidth/2&&(Q[oe]*=-1);const Dt=M[oe+1]-re.verticalOffset,lt=le/2;Dt>lt?M[oe+1]=-lt+re.verticalOffset:Dt<-lt&&(M[oe+1]=lt+re.verticalOffset),Math.abs(M[oe+2])>250&&(Q[oe+2]*=-1)}Ee.attributes.position.needsUpdate=!0}for(let se=0;se<te;se++){const oe=se*3,ye=G?(G[se]-re.sizeMin)/(re.sizeMax-re.sizeMin):.5,Ze=new Qe(Ce.color),Dt=.2*Math.sin(Le+se*.1)+.9,lt=.8+ye*.6;B[oe]=Ze.r*Dt*lt,B[oe+1]=Ze.g*Dt*lt,B[oe+2]=Ze.b*Dt*lt}Ee.attributes.color.needsUpdate=!0,requestAnimationFrame(Z)}Z();function j(){if(requestAnimationFrame(j),C.time.value+=.001,t()&&Date.now()-r>e){console.log("Timeout reached while above Phase 3 trigger (25s), stabilizing background effects");const B=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=B,C.time.value=0,r=Date.now()}if(tn(),!window.particlesFullyHidden&&Me.uniforms.opacity.value<y&&(Me.uniforms.opacity.value+=.002,Me.uniforms.opacity.value>y&&(Me.uniforms.opacity.value=y)),window.particlesFullyHidden&&Me.uniforms.opacity.value>0&&(Me.uniforms.opacity.value=0),F&&I.autoRotate&&!I.rotationPaused){const M=qe?I.scrollRotateSpeed:I.baseRotateSpeed;F.rotation.y+=M*.01}P&&(P.rotation.set(0,0,0),D()),m.autoClear=!0,m.render(p,S),(!window.particlesFullyHidden||Re.length>0&&Ve.enabled)&&(m.autoClear=!1,m.render(w,S))}j(),document.addEventListener("veryEarlyParticleFade",()=>{y=.1}),document.addEventListener("particleFadeStart",()=>{y=.3}),document.addEventListener("heroAnimationComplete",()=>{y=.5});function k(){if(P){const M=window.innerHeight,B=S.right-S.left,ne=(S.top-S.bottom)/M,se=B,oe=M*.66*ne;P.geometry.dispose(),P.geometry=new Li(se,oe),P.rotation.set(0,0,0),D()}}let fe,ve;function ke(){const M=window.innerWidth,B=h();if(m.setSize(M,B),S.left=-M/2,S.right=M/2,S.top=B/2,S.bottom=-B/2,S.updateProjectionMatrix(),C.resolution.value.set(M,B),O.geometry.dispose(),O.geometry=new Li(M,B,M/10,B/10),le=B*re.verticalSpread,typeof q<"u"&&q&&q.__folders["Particle System"]){const G=q.__folders["Particle System"];if(G&&G.__controllers){for(let ne=0;ne<G.__controllers.length;ne++)if(G.__controllers[ne].property==="verticalOffset"){G.__controllers[ne].min(-B*3),G.__controllers[ne].max(B*2);break}}}if(F&&I.responsive){clearTimeout(ve),ve=setTimeout(()=>{Be()},150);for(let G=0;G<Oe.__controllers.length;G++){const ne=Oe.__controllers[G];ne.property==="positionX"?(ne.min(-M/2),ne.max(M/2)):ne.property==="positionY"&&(ne.min(-B/2),ne.max(B/2))}}k()}window.addEventListener("resize",()=>{clearTimeout(fe),clearTimeout(ve),F&&I.responsive&&(ve=setTimeout(()=>{Be()},150)),fe=setTimeout(ke,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(fe),clearTimeout(ve),F&&I.responsive&&(ve=setTimeout(()=>{Be()},300)),fe=setTimeout(ke,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(ve);const M=window.innerWidth,B=h();window.lastKnownDimensions||(window.lastKnownDimensions={width:M,height:B});const G=Math.abs(M-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,ne=Math.abs(B-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;G>.05||ne>.05?(window.lastKnownDimensions.width=M,window.lastKnownDimensions.height=B,F&&I.responsive&&(ve=setTimeout(()=>{Be()},150)),setTimeout(ke,100)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:h()}});let Ne=h();function Ye(){const M=h();Math.abs(M-Ne)>50&&(ke(),Ne=M),requestAnimationFrame(Ye)}Ye(),window.addEventListener("keydown",M=>{if((M.key==="+"||M.key==="=")&&(v.zoom=Math.min(v.zoom+.1,5),S.zoom=v.zoom,S.updateProjectionMatrix(),typeof q<"u"&&q&&q.__folders["Camera Controls"])){const B=q.__folders["Camera Controls"];if(B&&B.__controllers){for(let G=0;G<B.__controllers.length;G++)if(B.__controllers[G].property==="zoom"){B.__controllers[G].updateDisplay();break}}}if((M.key==="-"||M.key==="_")&&(v.zoom=Math.max(v.zoom-.1,.1),S.zoom=v.zoom,S.updateProjectionMatrix(),typeof q<"u"&&q&&q.__folders["Camera Controls"])){const B=q.__folders["Camera Controls"];if(B&&B.__controllers){for(let G=0;G<B.__controllers.length;G++)if(B.__controllers[G].property==="zoom"){B.__controllers[G].updateDisplay();break}}}}),me.add(re,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(M=>{re.scrollSpeed=M}),me.add(re,"damping",.8,.99,.01).name("Scroll Damping").onChange(M=>{re.damping=M}),me.add(re,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(M=>{const B=le;le=window.innerHeight*M;const G=le/B,ne=Ee.attributes.position.array;for(let se=0;se<te;se++){const oe=se*3,Ze=(ne[oe+1]-re.verticalOffset)*G;ne[oe+1]=Ze+re.verticalOffset,Math.abs(Ze)>le/2&&(ne[oe+1]=(Math.random()-.5)*le+re.verticalOffset)}Ee.attributes.position.needsUpdate=!0}),me.add(re,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(M=>{re.previousOffset===void 0&&(re.previousOffset=0),re.verticalOffset=M,z()}),me.add(re,"sizeMin",1,5,.01).name("Min Particle Size").onChange(M=>{if(re.sizeMin=M,re.sizeMin>=re.sizeMax&&(re.sizeMax=re.sizeMin+1,typeof q<"u"&&q&&q.__folders["Particle System"])){const B=q.__folders["Particle System"];if(B&&B.__controllers){for(let G=0;G<B.__controllers.length;G++)if(B.__controllers[G].property==="sizeMax"){B.__controllers[G].updateDisplay();break}}}be()}),me.add(re,"sizeMax",5,10,.01).name("Max Particle Size").onChange(M=>{if(re.sizeMax=M,re.sizeMax<=re.sizeMin&&(re.sizeMin=re.sizeMax-1,typeof q<"u"&&q&&q.__folders["Particle System"])){const B=q.__folders["Particle System"];if(B&&B.__controllers){for(let G=0;G<B.__controllers.length;G++)if(B.__controllers[G].property==="sizeMin"){B.__controllers[G].updateDisplay();break}}}be()}),me.add(re,"floatSpeed",.1,3,.1).name("Float Speed").onChange(M=>{re.floatSpeed=M}),be();const et=Ee.attributes.position.array;for(let M=0;M<te;M++){const B=M*3;et[B+1]=(Math.random()-.5)*le+re.verticalOffset}Ee.attributes.position.needsUpdate=!0,me.add(Me.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(M=>{Me.uniforms.haloStrength.value=M}),me.add(Me.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(M=>{Me.uniforms.haloSize.value=M});let qe=!1,ft;window.addEventListener("scroll",()=>{qe=!0,ft&&clearTimeout(ft),ft=setTimeout(()=>{qe=!1},150)})}function co(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function ms(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}else console.log("WARNING: Wave Controls folder not found")}function pr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function A_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},qo={duration:.5,overwrite:!1,delay:0},fh,En,$t,wi=1e8,Xt=1/wi,ff=Math.PI*2,qT=ff/4,YT=0,C_=Math.sqrt,jT=Math.cos,$T=Math.sin,yn=function(e){return typeof e=="string"},en=function(e){return typeof e=="function"},Tr=function(e){return typeof e=="number"},hh=function(e){return typeof e>"u"},ir=function(e){return typeof e=="object"},Kn=function(e){return e!==!1},ph=function(){return typeof window<"u"},Zl=function(e){return en(e)||yn(e)},R_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Dn=Array.isArray,hf=/(?:-?\.?\d|\.)+/gi,P_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,wo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,$u=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,L_=/[+-]=-?[.\d]+/,D_=/[^,'"\[\]\s]+/gi,KT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Kt,Xi,pf,mh,fi={},Fc={},I_,O_=function(e){return(Fc=Yo(e,fi))&&ei},gh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},al=function(e,t){return!t&&console.warn(e)},N_=function(e,t){return e&&(fi[e]=t)&&Fc&&(Fc[e]=t)||fi},ll=function(){return 0},ZT={suppressEvents:!0,isStart:!0,kill:!1},xc={suppressEvents:!0,kill:!1},JT={suppressEvents:!0},_h={},Kr=[],mf={},U_,si={},Ku={},Rm=30,Sc=[],vh="",yh=function(e){var t=e[0],n,i;if(ir(t)||en(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Sc.length;i--&&!Sc[i].targetTest(t););n=Sc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new o0(e[i],n)))||e.splice(i,1);return e},Ls=function(e){return e._gsap||yh(bi(e))[0]._gsap},F_=function(e,t,n){return(n=e[t])&&en(n)?e[t]():hh(n)&&e.getAttribute&&e.getAttribute(t)||n},Zn=function(e,t){return(e=e.split(",")).forEach(t)||e},nn=function(e){return Math.round(e*1e5)/1e5||0},ln=function(e){return Math.round(e*1e7)/1e7||0},Ro=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},QT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},kc=function(){var e=Kr.length,t=Kr.slice(0),n,i;for(mf={},Kr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},k_=function(e,t,n,i){Kr.length&&!En&&kc(),e.render(t,n,En&&t<0&&(e._initted||e._startAt)),Kr.length&&!En&&kc()},B_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(D_).length<2?t:yn(e)?e.trim():e},z_=function(e){return e},hi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},e1=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Yo=function(e,t){for(var n in t)e[n]=t[n];return e},Pm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=ir(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Bc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ba=function(e){var t=e.parent||Kt,n=e.keyframes?e1(Dn(e.keyframes)):hi;if(Kn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},t1=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},H_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},iu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},ts=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ds=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},n1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},gf=function(e,t,n,i){return e._startAt&&(En?e._startAt.revert(xc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},i1=function r(e){return!e||e._ts&&r(e.parent)},Lm=function(e){return e._repeat?jo(e._tTime,e=e.duration()+e._rDelay)*e:0},jo=function(e,t){var n=Math.floor(e=ln(e/t));return e&&n===e?n-1:n},zc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ru=function(e){return e._end=ln(e._start+(e._tDur/Math.abs(e._ts||e._rts||Xt)||0))},su=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=ln(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ru(e),n._dirty||Ds(n,e)),e},V_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=zc(e.rawTime(),t),(!t._dur||xl(0,t.totalDuration(),n)-t._tTime>Xt)&&t.render(n,!0)),Ds(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Xt}},ji=function(e,t,n,i){return t.parent&&ts(t),t._start=ln((Tr(n)?n:n||e!==Kt?mi(e,n,t):e._time)+t._delay),t._end=ln(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),H_(e,t,"_first","_last",e._sort?"_start":0),_f(t)||(e._recent=t),i||V_(e,t),e._ts<0&&su(e,e._tTime),e},G_=function(e,t){return(fi.ScrollTrigger||gh("scrollTrigger",t))&&fi.ScrollTrigger.create(t,e)},W_=function(e,t,n,i,s){if(Sh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!En&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&U_!==ai.frame)return Kr.push(e),e._lazy=[s,i],1},r1=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},_f=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},s1=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&r1(e)&&!(!e._initted&&_f(e))||(e._ts<0||e._dp._ts<0)&&!_f(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=xl(0,e._tDur,t),u=jo(l,a),e._yoyo&&u&1&&(o=1-o),u!==jo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||En||i||e._zTime===Xt||!t&&e._zTime){if(!e._initted&&W_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Xt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&gf(e,t,n,!0),e._onUpdate&&!n&&ui(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ui(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&ts(e,1),!n&&!En&&(ui(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},o1=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},$o=function(e,t,n,i){var s=e._repeat,o=ln(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:ln(o*(s+1)+e._rDelay*s):o,a>0&&!i&&su(e,e._tTime=e._tDur*a),e.parent&&ru(e),n||Ds(e.parent,e),e},Dm=function(e){return e instanceof bn?Ds(e):$o(e,e._dur)},a1={_start:0,endTime:ll,totalDuration:ll},mi=function r(e,t,n){var i=e.labels,s=e._recent||a1,o=e.duration()>=wi?s.endTime(!1):e._dur,a,l,c;return yn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Dn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},za=function(e,t,n){var i=Tr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Kn(l.vars.inherit)&&l.parent;o.immediateRender=Kn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new rn(t[0],o,t[s+1])},as=function(e,t){return e||e===0?t(e):t},xl=function(e,t,n){return n<e?e:n>t?t:n},Pn=function(e,t){return!yn(e)||!(t=KT.exec(e))?"":t[1]},l1=function(e,t,n){return as(n,function(i){return xl(e,t,i)})},vf=[].slice,X_=function(e,t){return e&&ir(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ir(e[0]))&&!e.nodeType&&e!==Xi},c1=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return yn(i)&&!t||X_(i,1)?(s=n).push.apply(s,bi(i)):n.push(i)})||n},bi=function(e,t,n){return $t&&!t&&$t.selector?$t.selector(e):yn(e)&&!n&&(pf||!Ko())?vf.call((t||mh).querySelectorAll(e),0):Dn(e)?c1(e,n):X_(e)?vf.call(e,0):e?[e]:[]},yf=function(e){return e=bi(e)[0]||al("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return bi(t,n.querySelectorAll?n:n===e?al("Invalid scope")||mh.createElement("div"):e)}},q_=function(e){return e.sort(function(){return .5-Math.random()})},Y_=function(e){if(en(e))return e;var t=ir(e)?e:{each:e},n=Is(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return yn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,w,y,v,S,A,E,P,x;if(!m){if(x=t.grid==="auto"?0:(t.grid||[1,wi])[1],!x){for(E=-wi;E<(E=_[x++].getBoundingClientRect().left)&&x<g;);x<g&&x--}for(m=o[g]=[],p=l?Math.min(x,g)*u-.5:i%x,w=x===wi?0:l?g*d/x-.5:i/x|0,E=0,P=wi,A=0;A<g;A++)y=A%x-p,v=w-(A/x|0),m[A]=S=c?Math.abs(c==="y"?v:y):C_(y*y+v*v),S>E&&(E=S),S<P&&(P=S);i==="random"&&q_(m),m.max=E-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(x>g?g-1:c?c==="y"?g/x:x:Math.max(x,g/x))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Pn(t.amount||t.each)||0,n=n&&g<0?i0(n):n}return g=(m[f]-m.min)/m.max||0,ln(m.b+(n?n(g):g)*m.v)+m.u}},xf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=ln(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Tr(n)?0:Pn(n))}},j_=function(e,t){var n=Dn(e),i,s;return!n&&ir(e)&&(i=n=e.radius||wi,e.values?(e=bi(e.values),(s=!Tr(e[0]))&&(i*=i)):e=xf(e.increment)),as(t,n?en(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=wi,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Tr(o)?u:u+Pn(o)}:xf(e))},$_=function(e,t,n,i){return as(Dn(e)?!t:n===!0?!!(n=0):!i,function(){return Dn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},u1=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},d1=function(e,t){return function(n){return e(parseFloat(n))+(t||Pn(n))}},f1=function(e,t,n){return Z_(e,t,0,1,n)},K_=function(e,t,n){return as(n,function(i){return e[~~t(i)]})},h1=function r(e,t,n){var i=t-e;return Dn(e)?K_(e,r(0,e.length),t):as(n,function(s){return(i+(s-e)%i)%i+e})},p1=function r(e,t,n){var i=t-e,s=i*2;return Dn(e)?K_(e,r(0,e.length-1),t):as(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},cl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?D_:hf),n+=e.substr(t,i-t)+$_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},Z_=function(e,t,n,i,s){var o=t-e,a=i-n;return as(s,function(l){return n+((l-e)/o*a||0)})},m1=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=yn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Dn(e)&&!Dn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Yo(Dn(e)?[]:{},e));if(!u){for(l in t)xh.call(a,e,l,"get",t[l]);s=function(_){return Mh(_,a)||(o?e.p:e)}}}return as(n,s)},Im=function(e,t,n){var i=e.labels,s=wi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ui=function(e,t,n){var i=e.vars,s=i[t],o=$t,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Kr.length&&kc(),a&&($t=a),u=l?s.apply(c,l):s.call(c),$t=o,u},Ma=function(e){return ts(e),e.scrollTrigger&&e.scrollTrigger.kill(!!En),e.progress()<1&&ui(e,"onInterrupt"),e},bo,J_=[],Q_=function(e){if(e)if(e=!e.name&&e.default||e,ph()||e.headless){var t=e.name,n=en(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ll,render:Mh,add:xh,kill:L1,modifier:P1,rawVars:0},o={targetTest:0,get:0,getSetter:bh,aliases:{},register:0};if(Ko(),e!==i){if(si[t])return;hi(i,hi(Bc(e,s),o)),Yo(i.prototype,Yo(s,Bc(e,o))),si[i.prop=t]=i,e.targetTest&&(Sc.push(i),_h[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}N_(t,i),e.register&&e.register(ei,i,Jn)}else J_.push(e)},Wt=255,Ea={aqua:[0,Wt,Wt],lime:[0,Wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Wt],navy:[0,0,128],white:[Wt,Wt,Wt],olive:[128,128,0],yellow:[Wt,Wt,0],orange:[Wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Wt,0,0],pink:[Wt,192,203],cyan:[0,Wt,Wt],transparent:[Wt,Wt,Wt,0]},Zu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Wt+.5|0},e0=function(e,t,n){var i=e?Tr(e)?[e>>16,e>>8&Wt,e&Wt]:0:Ea.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ea[e])i=Ea[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Wt,i&Wt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Wt,e&Wt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(hf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Zu(l+1/3,s,o),i[1]=Zu(l,s,o),i[2]=Zu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(P_),n&&i.length<4&&(i[3]=1),i}else i=e.match(hf)||Ea.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Wt,o=i[1]/Wt,a=i[2]/Wt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},t0=function(e){var t=[],n=[],i=-1;return e.split(Zr).forEach(function(s){var o=s.match(wo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Om=function(e,t,n){var i="",s=(e+i).match(Zr),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=e0(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=t0(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Zr,"1").split(wo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Zr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Zr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ea)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),g1=/hsl[a]?\(/,n0=function(e){var t=e.join(" "),n;if(Zr.lastIndex=0,Zr.test(t))return n=g1.test(t),e[1]=Om(e[1],n),e[0]=Om(e[0],n,t0(e[1])),!0},ul,ai=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,w=m===!0,y,v,S,A;if((p>e||p<0)&&(n+=p-t),i+=p,S=i-n,y=S-o,(y>0||w)&&(A=++d.frame,f=S-d.time*1e3,d.time=S=S/1e3,o+=y+(y>=s?4:s-y),v=1),w||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](S,f,A,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){I_&&(!pf&&ph()&&(Xi=pf=window,mh=Xi.document||{},fi.gsap=ei,(Xi.gsapVersions||(Xi.gsapVersions=[])).push(ei.version),O_(Fc||Xi.GreenSockGlobals||!Xi.gsap&&Xi||{}),J_.forEach(Q_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},ul=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ul=0,c=ll},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,w){var y=p?function(v,S,A,E){m(v,S,A,E),d.remove(y)}:m;return d.remove(m),a[w?"unshift":"push"](y),Ko(),y},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),Ko=function(){return!ul&&ai.wake()},Ct={},_1=/^[\d.\-M][\d.\-,\s]/,v1=/["']/g,y1=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(v1,"").trim():+c,i=l.substr(a+1).trim();return t},x1=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},S1=function(e){var t=(e+"").split("("),n=Ct[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[y1(t[1])]:x1(e).split(",").map(B_)):Ct._CE&&_1.test(e)?Ct._CE("",e):n},i0=function(e){return function(t){return 1-e(1-t)}},r0=function r(e,t){for(var n=e._first,i;n;)n instanceof bn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Is=function(e,t){return e&&(en(e)?e:Ct[e]||S1(e))||t},qs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Zn(e,function(a){Ct[a]=fi[a]=s,Ct[o=a.toLowerCase()]=n;for(var l in s)Ct[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ct[a+"."+l]=s[l]}),s},s0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ju=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/ff*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*$T((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:s0(a);return s=ff/s,l.config=function(c,u){return r(e,c,u)},l},Qu=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:s0(n);return i.config=function(s){return r(e,s)},i};Zn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;qs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Ct.Linear.easeNone=Ct.none=Ct.Linear.easeIn;qs("Elastic",Ju("in"),Ju("out"),Ju());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};qs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);qs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});qs("Circ",function(r){return-(C_(1-r*r)-1)});qs("Sine",function(r){return r===1?1:-jT(r*qT)+1});qs("Back",Qu("in"),Qu("out"),Qu());Ct.SteppedEase=Ct.steps=fi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Xt;return function(a){return((i*xl(0,o,a)|0)+s)*n}}};qo.ease=Ct["quad.out"];Zn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return vh+=r+","+r+"Params,"});var o0=function(e,t){this.id=YT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:F_,this.set=t?t.getSetter:bh},dl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,$o(this,+t.duration,1,1),this.data=t.data,$t&&(this._ctx=$t,$t.data.push(this)),ul||ai.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,$o(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ko(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(su(this,n),!s._dp||s.parent||V_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ji(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Xt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),k_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Lm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Lm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?jo(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Xt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?zc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Xt?0:this._rts,this.totalTime(xl(-Math.abs(this._delay),this._tDur,s),i!==!1),ru(this),n1(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ko(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Xt&&(this._tTime-=Xt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ji(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Kn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?zc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=JT);var i=En;return En=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),En=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Dm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Dm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(mi(this,n),Kn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Kn(i)),this._dur||(this._zTime=-Xt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Xt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Xt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Xt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=en(n)?n:z_,a=function(){var c=i.then;i.then=null,en(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Ma(this)},r}();hi(dl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Xt,_prom:0,_ps:!1,_rts:1});var bn=function(r){A_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Kn(n.sortChildren),Kt&&ji(n.parent||Kt,pr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&G_(pr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return za(0,arguments,this),this},t.from=function(i,s,o){return za(1,arguments,this),this},t.fromTo=function(i,s,o,a){return za(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ba(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new rn(i,s,mi(this,o),1),this},t.call=function(i,s,o){return ji(this,rn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new rn(i,o,mi(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ba(o).immediateRender=Kn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Ba(a).immediateRender=Kn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:ln(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,w,y,v,S,A,E;if(this!==Kt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,y=this._ts,p=!y,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=ln(u%m),u===l?(g=this._repeat,f=c):(S=ln(u/m),g=~~S,g&&g===S&&(f=c,g--),f>c&&(f=c)),S=jo(this._tTime,m),!a&&this._tTime&&S!==g&&this._tTime-S*m-this._dur<=0&&(S=g),A&&g&1&&(f=c-f,E=1),g!==S&&!this._lock){var P=A&&S&1,x=P===(A&&g&1);if(g<S&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:ln(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ui(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;r0(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(w=o1(this,ln(a),ln(f)),w&&(u-=f-(f=w._start))),this._tTime=u,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(ui(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&w!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){w=0,_&&(u+=this._zTime=-Xt);break}}h=_}else{h=this._last;for(var b=i<0?i:f;h;){if(_=h._prev,(h._act||b<=h._end)&&h._ts&&w!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(b-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(b-h._start)*h._ts,s,o||En&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){w=0,_&&(u+=this._zTime=b?-Xt:Xt);break}}h=_}}if(w&&!s&&(this.pause(),w.render(f>=a?0:-Xt)._zTime=f>=a?1:-1,this._ts))return this._start=v,ru(this),this.render(i,s,o);this._onUpdate&&!s&&ui(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ts(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ui(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Tr(s)||(s=mi(this,s,i)),!(i instanceof dl)){if(Dn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(yn(i))return this.addLabel(i,s);if(en(i))i=rn.delayedCall(0,i);else return this}return this!==i?ji(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-wi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof rn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return yn(i)?this.removeLabel(i):en(i)?this.killTweensOf(i):(i.parent===this&&iu(this,i),i===this._recent&&(this._recent=this._last),Ds(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ln(ai.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=mi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=rn.delayedCall(0,s||ll,o);return a.data="isPause",this._hasPause=1,ji(this,a,mi(this,i))},t.removePause=function(i){var s=this._first;for(i=mi(this,i);s;)s._start===i&&s.data==="isPause"&&ts(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Hr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=bi(i),l=this._first,c=Tr(s),u;l;)l instanceof rn?QT(l._targets,a)&&(c?(!Hr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=mi(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=rn.to(o,hi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Xt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&$o(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,hi({startAt:{time:mi(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Im(this,mi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Im(this,mi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Xt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ds(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ds(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=wi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ji(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;$o(o,o===Kt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Kt._ts&&(k_(Kt,zc(i,Kt)),U_=ai.frame),ai.frame>=Rm){Rm+=di.autoSleep||120;var s=Kt._first;if((!s||!s._ts)&&di.autoSleep&&ai._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ai.sleep()}}},e}(dl);hi(bn.prototype,{_lock:0,_hasPause:0,_forcing:0});var w1=function(e,t,n,i,s,o,a){var l=new Jn(this._pt,e,t,0,1,f0,null,s),c=0,u=0,d,f,h,_,g,m,p,w;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=cl(i)),o&&(w=[n,i],o(w,e,t),n=w[0],i=w[1]),f=n.match($u)||[];d=$u.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Ro(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=$u.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(L_.test(i)||p)&&(l.e=0),this._pt=l,l},xh=function(e,t,n,i,s,o,a,l,c,u){en(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:en(d)?c?e[t.indexOf("set")||!en(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=en(d)?c?A1:u0:wh,_;if(yn(i)&&(~i.indexOf("random(")&&(i=cl(i)),i.charAt(1)==="="&&(_=Ro(f,i)+(Pn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Sf)return!isNaN(f*i)&&i!==""?(_=new Jn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?R1:d0,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&gh(t,i),w1.call(this,e,t,f,i,h,l||di.stringFilter,c))},b1=function(e,t,n,i,s){if(en(e)&&(e=Ha(e,s,t,n,i)),!ir(e)||e.style&&e.nodeType||Dn(e)||R_(e))return yn(e)?Ha(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Ha(e[a],s,t,n,i);return o},a0=function(e,t,n,i,s,o){var a,l,c,u;if(si[e]&&(a=new si[e]).init(s,a.rawVars?t[e]:b1(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Jn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==bo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Hr,Sf,Sh=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,w=p&&p.data==="nested"?p.vars.targets:m,y=e._overwrite==="auto"&&!fh,v=e.timeline,S,A,E,P,x,b,D,I,H,F,C,$,K;if(v&&(!f||!s)&&(s="none"),e._ease=Is(s,qo.ease),e._yEase=d?i0(Is(d===!0?s:d,qo.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(I=m[0]?Ls(m[0]).harness:0,$=I&&i[I.prop],S=Bc(i,_h),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?xc:ZT),g._lazy=0),o){if(ts(e._startAt=rn.set(m,hi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Kn(l),startAt:null,delay:0,onUpdate:c&&function(){return ui(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(En||!a&&!h)&&e._startAt.revert(xc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=hi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Kn(l),immediateRender:a,stagger:0,parent:p},S),$&&(E[I.prop]=$),ts(e._startAt=rn.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(En?e._startAt.revert(xc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Xt,Xt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Kn(l)||l&&!_,A=0;A<m.length;A++){if(x=m[A],D=x._gsap||yh(m)[A]._gsap,e._ptLookup[A]=F={},mf[D.id]&&Kr.length&&kc(),C=w===m?A:w.indexOf(x),I&&(H=new I).init(x,$||S,e,C,w)!==!1&&(e._pt=P=new Jn(e._pt,x,H.name,0,1,H.render,H,0,H.priority),H._props.forEach(function(X){F[X]=P}),H.priority&&(b=1)),!I||$)for(E in S)si[E]&&(H=a0(E,S,e,C,x,w))?H.priority&&(b=1):F[E]=P=xh.call(e,x,E,"get",S[E],C,w,0,i.stringFilter);e._op&&e._op[A]&&e.kill(x,e._op[A]),y&&e._pt&&(Hr=e,Kt.killTweensOf(x,F,e.globalTime(t)),K=!e.parent,Hr=0),e._pt&&l&&(mf[D.id]=1)}b&&h0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!K,f&&t<=0&&v.render(wi,!0,!0)},M1=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Sf=1,e.vars[t]="+=0",Sh(e,a),Sf=0,l?al(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=nn(n)+Pn(d.e)),d.b&&(d.b=u.s+Pn(d.b))},E1=function(e,t){var n=e[0]?Ls(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Yo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},T1=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Dn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Ha=function(e,t,n,i,s){return en(e)?e.call(t,n,i,s):yn(e)&&~e.indexOf("random(")?cl(e):e},l0=vh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",c0={};Zn(l0+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return c0[r]=1});var rn=function(r){A_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ba(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,w=i.parent||Kt,y=(Dn(n)||R_(n)?Tr(n[0]):"length"in i)?[n]:bi(n),v,S,A,E,P,x,b,D;if(a._targets=y.length?yh(y):al("GSAP target "+n+" not found. https://gsap.com",!di.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||Zl(c)||Zl(u)){if(i=a.vars,v=a.timeline=new bn({data:"nested",defaults:g||{},targets:w&&w.data==="nested"?w.vars.targets:y}),v.kill(),v.parent=v._dp=pr(a),v._start=0,f||Zl(c)||Zl(u)){if(E=y.length,b=f&&Y_(f),ir(f))for(P in f)~l0.indexOf(P)&&(D||(D={}),D[P]=f[P]);for(S=0;S<E;S++)A=Bc(i,c0),A.stagger=0,p&&(A.yoyoEase=p),D&&Yo(A,D),x=y[S],A.duration=+Ha(c,pr(a),S,x,y),A.delay=(+Ha(u,pr(a),S,x,y)||0)-a._delay,!f&&E===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),v.to(x,A,b?b(S,x,y):0),v._ease=Ct.none;v.duration()?c=u=0:a.timeline=0}else if(_){Ba(hi(v.vars.defaults,{ease:"none"})),v._ease=Is(_.ease||i.ease||"none");var I=0,H,F,C;if(Dn(_))_.forEach(function($){return v.to(y,$,">")}),v.duration();else{A={};for(P in _)P==="ease"||P==="easeEach"||T1(P,_[P],A,_.easeEach);for(P in A)for(H=A[P].sort(function($,K){return $.t-K.t}),I=0,S=0;S<H.length;S++)F=H[S],C={ease:F.e,duration:(F.t-(S?H[S-1].t:0))/100*c},C[P]=F.v,v.to(y,C,I),I+=C.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!fh&&(Hr=pr(a),Kt.killTweensOf(y),Hr=0),ji(w,pr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===ln(w._time)&&Kn(d)&&i1(pr(a))&&w.data!=="nested")&&(a._tTime=-Xt,a.render(Math.max(0,-u)||0)),m&&G_(pr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Xt&&!u?l:i<Xt?0:i,f,h,_,g,m,p,w,y,v;if(!c)s1(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,y=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=ln(d%g),d===l?(_=this._repeat,f=c):(m=ln(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=jo(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(y&&this._yEase&&r0(y,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(ln(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(W_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=w=(v||this._ease)(f/c),this._from&&(this.ratio=w=1-w),f&&!a&&!s&&!_&&(ui(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(w,h.d),h=h._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&gf(this,i,s,o),ui(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&ui(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&gf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&ts(this,1),!s&&!(u&&!a)&&(d||a||p)&&(ui(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){ul||ai.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Sh(this,c),u=this._ease(c/this._dur),M1(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(su(this,0),this.parent||H_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ma(this):this.scrollTrigger&&this.scrollTrigger.kill(!!En),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Hr&&Hr.vars.overwrite!==!0)._first||Ma(this),this.parent&&o!==this.timeline.totalDuration()&&$o(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?bi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&t1(a,l))return s==="all"&&(this._pt=0),Ma(this);for(d=this._op=this._op||[],s!=="all"&&(yn(s)&&(g={},Zn(s,function(w){return g[w]=1}),s=g),s=E1(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&iu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&Ma(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return za(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return za(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Kt.killTweensOf(i,s,o)},e}(dl);hi(rn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Zn("staggerTo,staggerFrom,staggerFromTo",function(r){rn[r]=function(){var e=new bn,t=vf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var wh=function(e,t,n){return e[t]=n},u0=function(e,t,n){return e[t](n)},A1=function(e,t,n,i){return e[t](i.fp,n)},C1=function(e,t,n){return e.setAttribute(t,n)},bh=function(e,t){return en(e[t])?u0:hh(e[t])&&e.setAttribute?C1:wh},d0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},R1=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},f0=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Mh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},P1=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},L1=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?iu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},D1=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},h0=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Jn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||d0,this.d=l||this,this.set=c||wh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=D1,this.m=n,this.mt=s,this.tween=i},r}();Zn(vh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return _h[r]=1});fi.TweenMax=fi.TweenLite=rn;fi.TimelineLite=fi.TimelineMax=bn;Kt=new bn({sortChildren:!1,defaults:qo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=n0;var Os=[],wc={},I1=[],Nm=0,O1=0,ed=function(e){return(wc[e]||I1).map(function(t){return t()})},wf=function(){var e=Date.now(),t=[];e-Nm>2&&(ed("matchMediaInit"),Os.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Xi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),ed("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Nm=e,ed("matchMedia"))},p0=function(){function r(t,n){this.selector=n&&yf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=O1++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){en(n)&&(s=i,i=n,n=en);var o=this,a=function(){var c=$t,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=yf(s)),$t=o,d=i.apply(o,arguments),en(d)&&o._r.push(d),$t=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===en?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=$t;$t=null,n(this),$t=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof rn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof bn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof rn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Os.length;o--;)Os[o].id===this.id&&Os.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),N1=function(){function r(t){this.contexts=[],this.scope=t,$t&&$t.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){ir(n)||(n={matches:n});var o=new p0(0,s||this.scope),a=o.conditions={},l,c,u;$t&&!o.selector&&(o.selector=$t.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Xi.matchMedia(n[c]),l&&(Os.indexOf(o)<0&&Os.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(wf):l.addEventListener("change",wf)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Hc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Q_(i)})},timeline:function(e){return new bn(e)},getTweensOf:function(e,t){return Kt.getTweensOf(e,t)},getProperty:function(e,t,n,i){yn(e)&&(e=bi(e)[0]);var s=Ls(e||{}).get,o=n?z_:B_;return n==="native"&&(n=""),e&&(t?o((si[t]&&si[t].get||s)(e,t,n,i)):function(a,l,c){return o((si[a]&&si[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=bi(e),e.length>1){var i=e.map(function(u){return ei.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=si[t],a=Ls(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;bo._pt=0,d.init(e,n?u+n:u,bo,0,[e]),d.render(1,d),bo._pt&&Mh(1,bo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=ei.to(e,hi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Kt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Is(e.ease,qo.ease)),Pm(qo,e||{})},config:function(e){return Pm(di,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!si[a]&&!fi[a]&&al(t+" effect requires "+a+" plugin.")}),Ku[t]=function(a,l,c){return n(bi(a),hi(l||{},s),c)},o&&(bn.prototype[t]=function(a,l,c){return this.add(Ku[t](a,ir(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Ct[e]=Is(t)},parseEase:function(e,t){return arguments.length?Is(e,t):Ct},getById:function(e){return Kt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new bn(e),i,s;for(n.smoothChildTiming=Kn(e.smoothChildTiming),Kt.remove(n),n._dp=0,n._time=n._tTime=Kt._time,i=Kt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof rn&&i.vars.onComplete===i._targets[0]))&&ji(n,i,i._start-i._delay),i=s;return ji(Kt,n,0),n},context:function(e,t){return e?new p0(e,t):$t},matchMedia:function(e){return new N1(e)},matchMediaRefresh:function(){return Os.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||wf()},addEventListener:function(e,t){var n=wc[e]||(wc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=wc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:h1,wrapYoyo:p1,distribute:Y_,random:$_,snap:j_,normalize:f1,getUnit:Pn,clamp:l1,splitColor:e0,toArray:bi,selector:yf,mapRange:Z_,pipe:u1,unitize:d1,interpolate:m1,shuffle:q_},install:O_,effects:Ku,ticker:ai,updateRoot:bn.updateRoot,plugins:si,globalTimeline:Kt,core:{PropTween:Jn,globals:N_,Tween:rn,Timeline:bn,Animation:dl,getCache:Ls,_removeLinkedListItem:iu,reverting:function(){return En},context:function(e){return e&&$t&&($t.data.push(e),e._ctx=$t),$t},suppressOverwrites:function(e){return fh=e}}};Zn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Hc[r]=rn[r]});ai.add(bn.updateRoot);bo=Hc.to({},{duration:0});var U1=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},F1=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=U1(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},td=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(yn(s)&&(l={},Zn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}F1(a,s)}}}},ei=Hc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)En?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},td("roundProps",xf),td("modifiers"),td("snap",j_))||Hc;rn.version=bn.version=ei.version="3.12.7";I_=1;ph()&&Ko();var k1=Ct.Power0,B1=Ct.Power1,z1=Ct.Power2,H1=Ct.Power3,V1=Ct.Power4,G1=Ct.Linear,W1=Ct.Quad,X1=Ct.Cubic,q1=Ct.Quart,Y1=Ct.Quint,j1=Ct.Strong,$1=Ct.Elastic,K1=Ct.Back,Z1=Ct.SteppedEase,J1=Ct.Bounce,Q1=Ct.Sine,eA=Ct.Expo,tA=Ct.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Um,Vr,Po,Eh,Ts,Fm,Th,nA=function(){return typeof window<"u"},Ar={},xs=180/Math.PI,Lo=Math.PI/180,uo=Math.atan2,km=1e8,Ah=/([A-Z])/g,iA=/(left|right|width|margin|padding|x)/i,rA=/[\s,\(]\S/,$i={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},sA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},oA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},aA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},m0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},g0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},lA=function(e,t,n){return e.style[t]=n},cA=function(e,t,n){return e.style.setProperty(t,n)},uA=function(e,t,n){return e._gsap[t]=n},dA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},fA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},hA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Zt="transform",Qn=Zt+"Origin",pA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Ar&&s){if(this.tfm=this.tfm||{},e!=="transform")e=$i[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=mr(i,a)}):this.tfm[e]=o.x?o[e]:mr(i,e),e===Qn&&(this.tfm.zOrigin=o.zOrigin);else return $i.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Zt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Qn,t,"")),e=Zt}(s||t)&&this.props.push(e,t,s[e])},_0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},mA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Ah,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Th(),(!s||!s.isStart)&&!n[Zt]&&(_0(n),i.zOrigin&&n[Qn]&&(n[Qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},v0=function(e,t){var n={target:e,props:[],revert:mA,save:pA};return e._gsap||ei.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},y0,Mf=function(e,t){var n=Vr.createElementNS?Vr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Vr.createElement(e);return n&&n.style?n:Vr.createElement(e)},Qi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Ah,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Zo(t)||t,1)||""},Bm="O,Moz,ms,Ms,Webkit".split(","),Zo=function(e,t,n){var i=t||Ts,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Bm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Bm[o]:"")+e},Ef=function(){nA()&&window.document&&(Um=window,Vr=Um.document,Po=Vr.documentElement,Ts=Mf("div")||{style:{}},Mf("div"),Zt=Zo(Zt),Qn=Zt+"Origin",Ts.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",y0=!!Zo("perspective"),Th=ei.core.reverting,Eh=1)},zm=function(e){var t=e.ownerSVGElement,n=Mf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Po.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Po.removeChild(n),s},Hm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},x0=function(e){var t,n;try{t=e.getBBox()}catch{t=zm(e),n=1}return t&&(t.width||t.height)||n||(t=zm(e)),t&&!t.width&&!t.x&&!t.y?{x:+Hm(e,["x","cx","x1"])||0,y:+Hm(e,["y","cy","y1"])||0,width:0,height:0}:t},S0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&x0(e))},zs=function(e,t){if(t){var n=e.style,i;t in Ar&&t!==Qn&&(t=Zt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Ah,"-$1").toLowerCase())):n.removeAttribute(t)}},Gr=function(e,t,n,i,s,o){var a=new Jn(e._pt,t,n,0,1,o?g0:m0);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Vm={deg:1,rad:1,turn:1},gA={grid:1,flex:1},ns=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ts.style,l=iA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||Vm[i]||Vm[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&S0(e),(h||o==="%")&&(Ar[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],nn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Vr||!g.appendChild)&&(g=Vr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===ai.time&&!m.uncache)return nn(s/m.width*d);if(h&&(t==="height"||t==="width")){var w=e.style[t];e.style[t]=d+i,_=e[u],w?e.style[t]=w:zs(e,t)}else(h||o==="%")&&!gA[Qi(g,"display")]&&(a.position=Qi(e,"position")),g===e&&(a.position="static"),g.appendChild(Ts),_=Ts[u],g.removeChild(Ts),a.position="absolute";return l&&h&&(m=Ls(g),m.time=ai.time,m.width=g[u]),nn(f?_*s/d:_&&s?d/_*s:0)},mr=function(e,t,n,i){var s;return Eh||Ef(),t in $i&&t!=="transform"&&(t=$i[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ar[t]&&t!=="transform"?(s=hl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Gc(Qi(e,Qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Vc[t]&&Vc[t](e,t,n)||Qi(e,t)||F_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ns(e,t,s,n)+n:s},_A=function(e,t,n,i){if(!n||n==="none"){var s=Zo(t,e,1),o=s&&Qi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Qi(e,"borderTopColor"))}var a=new Jn(this._pt,e.style,t,0,1,f0),l=0,c=0,u,d,f,h,_,g,m,p,w,y,v,S;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Qi(e,t)||i,g?e.style[t]=g:zs(e,t)),u=[n,i],n0(u),n=u[0],i=u[1],f=n.match(wo)||[],S=i.match(wo)||[],S.length){for(;d=wo.exec(i);)m=d[0],w=i.substring(l,d.index),_?_=(_+1)%5:(w.substr(-5)==="rgba("||w.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=Ro(h,m)+v),p=parseFloat(m),y=m.substr((p+"").length),l=wo.lastIndex-y.length,y||(y=y||di.units[t]||v,l===i.length&&(i+=y,a.e+=y)),v!==y&&(h=ns(e,t,g,y)||0),a._pt={_next:a._pt,p:w||c===1?w:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?g0:m0;return L_.test(i)&&(a.e=0),this._pt=a,a},Gm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},vA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Gm[n]||n,t[1]=Gm[i]||i,t.join(" ")},yA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Ar[a]&&(l=1,a=a==="transformOrigin"?Qn:Zt),zs(n,a);l&&(zs(n,Zt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",hl(n,1),o.uncache=1,_0(i)))}},Vc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Jn(e._pt,t,n,0,0,yA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},fl=[1,0,0,1,0,0],w0={},b0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Wm=function(e){var t=Qi(e,Zt);return b0(t)?fl:t.substr(7).match(P_).map(nn)},Ch=function(e,t){var n=e._gsap||Ls(e),i=e.style,s=Wm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?fl:s):(s===fl&&!e.offsetParent&&e!==Po&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Po.appendChild(e)),s=Wm(e),l?i.display=l:zs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Po.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Tf=function(e,t,n,i,s,o){var a=e._gsap,l=s||Ch(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],w=l[5],y=t.split(" "),v=parseFloat(y[0])||0,S=parseFloat(y[1])||0,A,E,P,x;n?l!==fl&&(E=h*m-_*g)&&(P=v*(m/E)+S*(-g/E)+(g*w-m*p)/E,x=v*(-_/E)+S*(h/E)-(h*w-_*p)/E,v=P,S=x):(A=x0(e),v=A.x+(~y[0].indexOf("%")?v/100*A.width:v),S=A.y+(~(y[1]||y[0]).indexOf("%")?S/100*A.height:S)),i||i!==!1&&a.smooth?(p=v-c,w=S-u,a.xOffset=d+(p*h+w*g)-p,a.yOffset=f+(p*_+w*m)-w):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=S,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Qn]="0px 0px",o&&(Gr(o,a,"xOrigin",c,v),Gr(o,a,"yOrigin",u,S),Gr(o,a,"xOffset",d,a.xOffset),Gr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+S)},hl=function(e,t){var n=e._gsap||new o0(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Qi(e,Qn)||"0",u,d,f,h,_,g,m,p,w,y,v,S,A,E,P,x,b,D,I,H,F,C,$,K,X,pe,O,q,je,it,J,ce;return u=d=f=g=m=p=w=y=v=0,h=_=1,n.svg=!!(e.getCTM&&S0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Zt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Zt]!=="none"?l[Zt]:"")),i.scale=i.rotate=i.translate="none"),E=Ch(e,n.svg),n.svg&&(n.uncache?(X=e.getBBox(),c=n.xOrigin-X.x+"px "+(n.yOrigin-X.y)+"px",K=""):K=!t&&e.getAttribute("data-svg-origin"),Tf(e,K||c,!!K||n.originIsAbsolute,n.smooth!==!1,E)),S=n.xOrigin||0,A=n.yOrigin||0,E!==fl&&(D=E[0],I=E[1],H=E[2],F=E[3],u=C=E[4],d=$=E[5],E.length===6?(h=Math.sqrt(D*D+I*I),_=Math.sqrt(F*F+H*H),g=D||I?uo(I,D)*xs:0,w=H||F?uo(H,F)*xs+g:0,w&&(_*=Math.abs(Math.cos(w*Lo))),n.svg&&(u-=S-(S*D+A*H),d-=A-(S*I+A*F))):(ce=E[6],it=E[7],O=E[8],q=E[9],je=E[10],J=E[11],u=E[12],d=E[13],f=E[14],P=uo(ce,je),m=P*xs,P&&(x=Math.cos(-P),b=Math.sin(-P),K=C*x+O*b,X=$*x+q*b,pe=ce*x+je*b,O=C*-b+O*x,q=$*-b+q*x,je=ce*-b+je*x,J=it*-b+J*x,C=K,$=X,ce=pe),P=uo(-H,je),p=P*xs,P&&(x=Math.cos(-P),b=Math.sin(-P),K=D*x-O*b,X=I*x-q*b,pe=H*x-je*b,J=F*b+J*x,D=K,I=X,H=pe),P=uo(I,D),g=P*xs,P&&(x=Math.cos(P),b=Math.sin(P),K=D*x+I*b,X=C*x+$*b,I=I*x-D*b,$=$*x-C*b,D=K,C=X),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=nn(Math.sqrt(D*D+I*I+H*H)),_=nn(Math.sqrt($*$+ce*ce)),P=uo(C,$),w=Math.abs(P)>2e-4?P*xs:0,v=J?1/(J<0?-J:J):0),n.svg&&(K=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!b0(Qi(e,Zt)),K&&e.setAttribute("transform",K))),Math.abs(w)>90&&Math.abs(w)<270&&(s?(h*=-1,w+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,w+=w<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=nn(h),n.scaleY=nn(_),n.rotation=nn(g)+a,n.rotationX=nn(m)+a,n.rotationY=nn(p)+a,n.skewX=w+a,n.skewY=y+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Qn]=Gc(c)),n.xOffset=n.yOffset=0,n.force3D=di.force3D,n.renderTransform=n.svg?SA:y0?M0:xA,n.uncache=0,n},Gc=function(e){return(e=e.split(" "))[0]+" "+e[1]},nd=function(e,t,n){var i=Pn(t);return nn(parseFloat(t)+parseFloat(ns(e,"x",n+"px",i)))+i},xA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,M0(e,t)},gs="0deg",_a="0px",_s=") ",M0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,w=n.target,y=n.zOrigin,v="",S=p==="auto"&&e&&e!==1||p===!0;if(y&&(d!==gs||u!==gs)){var A=parseFloat(u)*Lo,E=Math.sin(A),P=Math.cos(A),x;A=parseFloat(d)*Lo,x=Math.cos(A),o=nd(w,o,E*x*-y),a=nd(w,a,-Math.sin(A)*-y),l=nd(w,l,P*x*-y+y)}m!==_a&&(v+="perspective("+m+_s),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(S||o!==_a||a!==_a||l!==_a)&&(v+=l!==_a||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+_s),c!==gs&&(v+="rotate("+c+_s),u!==gs&&(v+="rotateY("+u+_s),d!==gs&&(v+="rotateX("+d+_s),(f!==gs||h!==gs)&&(v+="skew("+f+", "+h+_s),(_!==1||g!==1)&&(v+="scale("+_+", "+g+_s),w.style[Zt]=v||"translate(0, 0)"},SA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,w=n.forceCSS,y=parseFloat(o),v=parseFloat(a),S,A,E,P,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Lo,c*=Lo,S=Math.cos(l)*d,A=Math.sin(l)*d,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=Lo,x=Math.tan(c-u),x=Math.sqrt(1+x*x),E*=x,P*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),S*=x,A*=x)),S=nn(S),A=nn(A),E=nn(E),P=nn(P)):(S=d,P=f,A=E=0),(y&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(y=ns(h,"x",o,"px"),v=ns(h,"y",a,"px")),(_||g||m||p)&&(y=nn(y+_-(_*S+g*E)+m),v=nn(v+g-(_*A+g*P)+p)),(i||s)&&(x=h.getBBox(),y=nn(y+i/100*x.width),v=nn(v+s/100*x.height)),x="matrix("+S+","+A+","+E+","+P+","+y+","+v+")",h.setAttribute("transform",x),w&&(h.style[Zt]=x)},wA=function(e,t,n,i,s){var o=360,a=yn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?xs:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*km)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*km)%o-~~(c/o)*o)),e._pt=f=new Jn(e._pt,t,n,i,c,sA),f.e=u,f.u="deg",e._props.push(n),f},Xm=function(e,t){for(var n in t)e[n]=t[n];return e},bA=function(e,t,n){var i=Xm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Zt]=t,a=hl(n,1),zs(n,Zt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Zt],o[Zt]=t,a=hl(n,1),o[Zt]=c);for(l in Ar)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Pn(c),_=Pn(u),d=h!==_?ns(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new Jn(e._pt,a,l,d,f-d,bf),e._pt.u=_||0,e._props.push(l));Xm(a,i)};Zn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Vc[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return mr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Rh={name:"css",register:Ef,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,w,y,v,S,A,E,P;Eh||Ef(),this.styles=this.styles||v0(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(si[g]&&a0(g,t,n,i,e,s)))){if(h=typeof u,_=Vc[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=cl(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Zr.lastIndex=0,Zr.test(c)||(m=Pn(c),p=Pn(u)),p?m!==p&&(c=ns(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],yn(c)&&~c.indexOf("random(")&&(c=cl(c)),Pn(c+"")||c==="auto"||(c+=di.units[g]||Pn(mr(e,g))||""),(c+"").charAt(1)==="="&&(c=mr(e,g))):c=mr(e,g),f=parseFloat(c),w=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),w&&(u=u.substr(2)),d=parseFloat(u),g in $i&&(g==="autoAlpha"&&(f===1&&mr(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),Gr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=$i[g],~g.indexOf(",")&&(g=g.split(",")[0]))),y=g in Ar,y){if(this.styles.save(g),v||(S=e._gsap,S.renderTransform&&!t.parseTransform||hl(e,t.parseTransform),A=t.smoothOrigin!==!1&&S.smooth,v=this._pt=new Jn(this._pt,a,Zt,0,1,S.renderTransform,S,0,-1),v.dep=1),g==="scale")this._pt=new Jn(this._pt,S,"scaleY",S.scaleY,(w?Ro(S.scaleY,w+d):d)-S.scaleY||0,bf),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(Qn,0,a[Qn]),u=vA(u),S.svg?Tf(e,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==S.zOrigin&&Gr(this,S,"zOrigin",S.zOrigin,p),Gr(this,a,g,Gc(c),Gc(u)));continue}else if(g==="svgOrigin"){Tf(e,u,1,A,0,this);continue}else if(g in w0){wA(this,S,g,f,w?Ro(f,w+u):u);continue}else if(g==="smoothOrigin"){Gr(this,S,"smooth",S.smooth,u);continue}else if(g==="force3D"){S[g]=u;continue}else if(g==="transform"){bA(this,u,e);continue}}else g in a||(g=Zo(g)||g);if(y||(d||d===0)&&(f||f===0)&&!rA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Pn(u)||(g in di.units?di.units[g]:m),m!==p&&(f=ns(e,g,c,p)),this._pt=new Jn(this._pt,y?S:a,g,f,(w?Ro(f,w+d):d)-f,!y&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?aA:bf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=oA);else if(g in a)_A.call(this,e,g,c,w?w+u:u);else if(g in e)this.add(e,g,c||e[g],w?w+u:u,i,s);else if(g!=="parseTransform"){gh(g,u);continue}y||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}E&&h0(this)},render:function(e,t){if(t.tween._time||!Th())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:mr,aliases:$i,getSetter:function(e,t,n){var i=$i[t];return i&&i.indexOf(",")<0&&(t=i),t in Ar&&t!==Qn&&(e._gsap.x||mr(e,"x"))?n&&Fm===n?t==="scale"?dA:uA:(Fm=n||{})&&(t==="scale"?fA:hA):e.style&&!hh(e.style[t])?lA:~t.indexOf("-")?cA:bh(e,t)},core:{_removeProperty:zs,_getMatrix:Ch}};ei.utils.checkPrefix=Zo;ei.core.getStyleSaver=v0;(function(r,e,t,n){var i=Zn(r+","+e+","+t,function(s){Ar[s]=1});Zn(e,function(s){di.units[s]="deg",w0[s]=1}),$i[i[13]]=r+","+e,Zn(n,function(s){var o=s.split(":");$i[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Zn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){di.units[r]="px"});ei.registerPlugin(Rh);var Ge=ei.registerPlugin(Rh)||ei,MA=Ge.core.Tween;const EA=Object.freeze(Object.defineProperty({__proto__:null,Back:K1,Bounce:J1,CSSPlugin:Rh,Circ:tA,Cubic:X1,Elastic:$1,Expo:eA,Linear:G1,Power0:k1,Power1:B1,Power2:z1,Power3:H1,Power4:V1,Quad:W1,Quart:q1,Quint:Y1,Sine:Q1,SteppedEase:Z1,Strong:j1,TimelineLite:bn,TimelineMax:bn,TweenLite:rn,TweenMax:MA,default:Ge,gsap:Ge},Symbol.toStringTag,{value:"Module"}));function TA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function AA(r,e,t){return e&&TA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Mn,bc,li,Wr,Xr,Do,E0,Ss,Va,T0,xr,Pi,A0,C0=function(){return Mn||typeof window<"u"&&(Mn=window.gsap)&&Mn.registerPlugin&&Mn},R0=1,Mo=[],St=[],er=[],Ga=Date.now,Af=function(e,t){return t},CA=function(){var e=Va.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,St),i.push.apply(i,er),St=n,er=i,Af=function(o,a){return t[o](a)}},Jr=function(e,t){return~er.indexOf(e)&&er[er.indexOf(e)+1][t]},Wa=function(e){return!!~T0.indexOf(e)},Fn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Un=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Jl="scrollLeft",Ql="scrollTop",Cf=function(){return xr&&xr.isPressed||St.cache++},Wc=function(e,t){var n=function i(s){if(s||s===0){R0&&(li.history.scrollRestoration="manual");var o=xr&&xr.isPressed;s=i.v=Math.round(s)||(xr&&xr.iOS?1:0),e(s),i.cacheID=St.cache,o&&Af("ss",s)}else(t||St.cache!==i.cacheID||Af("ref"))&&(i.cacheID=St.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Gn={s:Jl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Wc(function(r){return arguments.length?li.scrollTo(r,un.sc()):li.pageXOffset||Wr[Jl]||Xr[Jl]||Do[Jl]||0})},un={s:Ql,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Gn,sc:Wc(function(r){return arguments.length?li.scrollTo(Gn.sc(),r):li.pageYOffset||Wr[Ql]||Xr[Ql]||Do[Ql]||0})},Yn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Mn.utils.toArray)(e)[0]||(typeof e=="string"&&Mn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},is=function(e,t){var n=t.s,i=t.sc;Wa(e)&&(e=Wr.scrollingElement||Xr);var s=St.indexOf(e),o=i===un.sc?1:2;!~s&&(s=St.push(e)-1),St[s+o]||Fn(e,"scroll",Cf);var a=St[s+o],l=a||(St[s+o]=Wc(Jr(e,n),!0)||(Wa(e)?i:Wc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Mn.getProperty(e,"scrollBehavior")==="smooth"),l},Rf=function(e,t,n){var i=e,s=e,o=Ga(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Ga();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=Ga();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},va=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},qm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},P0=function(){Va=Mn.core.globals().ScrollTrigger,Va&&Va.core&&CA()},L0=function(e){return Mn=e||C0(),!bc&&Mn&&typeof document<"u"&&document.body&&(li=window,Wr=document,Xr=Wr.documentElement,Do=Wr.body,T0=[li,Wr,Xr,Do],Mn.utils.clamp,A0=Mn.core.context||function(){},Ss="onpointerenter"in Do?"pointer":"mouse",E0=sn.isTouch=li.matchMedia&&li.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in li||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Pi=sn.eventTypes=("ontouchstart"in Xr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Xr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return R0=0},500),P0(),bc=1),bc};Gn.op=un;St.cache=0;var sn=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){bc||L0(Mn)||console.warn("Please gsap.registerPlugin(Observer)"),Va||P0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,w=n.onDrag,y=n.onPress,v=n.onRelease,S=n.onRight,A=n.onLeft,E=n.onUp,P=n.onDown,x=n.onChangeX,b=n.onChangeY,D=n.onChange,I=n.onToggleX,H=n.onToggleY,F=n.onHover,C=n.onHoverEnd,$=n.onMove,K=n.ignoreCheck,X=n.isNormalizer,pe=n.onGestureStart,O=n.onGestureEnd,q=n.onWheel,je=n.onEnable,it=n.onDisable,J=n.onClick,ce=n.scrollSpeed,Pe=n.capture,ge=n.allowClicks,Ae=n.lockAxis,tt=n.onLockAxis;this.target=a=Yn(a)||Xr,this.vars=n,h&&(h=Mn.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,ce=ce||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(li.getComputedStyle(Do).lineHeight)||22);var we,ht,pt,Ue,U,ct,st,Y=this,Ie=0,ot=0,Be=n.passive||!u&&n.passive!==!1,Oe=is(a,Gn),Pt=is(a,un),L=Oe(),T=Pt(),W=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Pi[0]==="pointerdown",te=Wa(a),ie=a.ownerDocument||Wr,Q=[0,0,0],xe=[0,0,0],_e=0,ze=function(){return _e=Ga()},re=function(Re,rt){return(Y.event=Re)&&h&&~h.indexOf(Re.target)||rt&&W&&Re.pointerType!=="touch"||K&&K(Re,rt)},le=function(){Y._vx.reset(),Y._vy.reset(),ht.pause(),d&&d(Y)},be=function(){var Re=Y.deltaX=qm(Q),rt=Y.deltaY=qm(xe),Te=Math.abs(Re)>=i,at=Math.abs(rt)>=i;D&&(Te||at)&&D(Y,Re,rt,Q,xe),Te&&(S&&Y.deltaX>0&&S(Y),A&&Y.deltaX<0&&A(Y),x&&x(Y),I&&Y.deltaX<0!=Ie<0&&I(Y),Ie=Y.deltaX,Q[0]=Q[1]=Q[2]=0),at&&(P&&Y.deltaY>0&&P(Y),E&&Y.deltaY<0&&E(Y),b&&b(Y),H&&Y.deltaY<0!=ot<0&&H(Y),ot=Y.deltaY,xe[0]=xe[1]=xe[2]=0),(Ue||pt)&&($&&$(Y),pt&&(m&&pt===1&&m(Y),w&&w(Y),pt=0),Ue=!1),ct&&!(ct=!1)&&tt&&tt(Y),U&&(q(Y),U=!1),we=0},Ee=function(Re,rt,Te){Q[Te]+=Re,xe[Te]+=rt,Y._vx.update(Re),Y._vy.update(rt),c?we||(we=requestAnimationFrame(be)):be()},$e=function(Re,rt){Ae&&!st&&(Y.axis=st=Math.abs(Re)>Math.abs(rt)?"x":"y",ct=!0),st!=="y"&&(Q[2]+=Re,Y._vx.update(Re,!0)),st!=="x"&&(xe[2]+=rt,Y._vy.update(rt,!0)),c?we||(we=requestAnimationFrame(be)):be()},Se=function(Re){if(!re(Re,1)){Re=va(Re,u);var rt=Re.clientX,Te=Re.clientY,at=rt-Y.x,We=Te-Y.y,nt=Y.isDragging;Y.x=rt,Y.y=Te,(nt||(at||We)&&(Math.abs(Y.startX-rt)>=s||Math.abs(Y.startY-Te)>=s))&&(pt=nt?2:1,nt||(Y.isDragging=!0),$e(at,We))}},Me=Y.onPress=function(Le){re(Le,1)||Le&&Le.button||(Y.axis=st=null,ht.pause(),Y.isPressed=!0,Le=va(Le),Ie=ot=0,Y.startX=Y.x=Le.clientX,Y.startY=Y.y=Le.clientY,Y._vx.reset(),Y._vy.reset(),Fn(X?a:ie,Pi[1],Se,Be,!0),Y.deltaX=Y.deltaY=0,y&&y(Y))},N=Y.onRelease=function(Le){if(!re(Le,1)){Un(X?a:ie,Pi[1],Se,!0);var Re=!isNaN(Y.y-Y.startY),rt=Y.isDragging,Te=rt&&(Math.abs(Y.x-Y.startX)>3||Math.abs(Y.y-Y.startY)>3),at=va(Le);!Te&&Re&&(Y._vx.reset(),Y._vy.reset(),u&&ge&&Mn.delayedCall(.08,function(){if(Ga()-_e>300&&!Le.defaultPrevented){if(Le.target.click)Le.target.click();else if(ie.createEvent){var We=ie.createEvent("MouseEvents");We.initMouseEvent("click",!0,!0,li,1,at.screenX,at.screenY,at.clientX,at.clientY,!1,!1,!1,!1,0,null),Le.target.dispatchEvent(We)}}})),Y.isDragging=Y.isGesturing=Y.isPressed=!1,d&&rt&&!X&&ht.restart(!0),pt&&be(),p&&rt&&p(Y),v&&v(Y,Te)}},me=function(Re){return Re.touches&&Re.touches.length>1&&(Y.isGesturing=!0)&&pe(Re,Y.isDragging)},ue=function(){return(Y.isGesturing=!1)||O(Y)},Ce=function(Re){if(!re(Re)){var rt=Oe(),Te=Pt();Ee((rt-L)*ce,(Te-T)*ce,1),L=rt,T=Te,d&&ht.restart(!0)}},he=function(Re){if(!re(Re)){Re=va(Re,u),q&&(U=!0);var rt=(Re.deltaMode===1?l:Re.deltaMode===2?li.innerHeight:1)*_;Ee(Re.deltaX*rt,Re.deltaY*rt,0),d&&!X&&ht.restart(!0)}},ae=function(Re){if(!re(Re)){var rt=Re.clientX,Te=Re.clientY,at=rt-Y.x,We=Te-Y.y;Y.x=rt,Y.y=Te,Ue=!0,d&&ht.restart(!0),(at||We)&&$e(at,We)}},Fe=function(Re){Y.event=Re,F(Y)},He=function(Re){Y.event=Re,C(Y)},Et=function(Re){return re(Re)||va(Re,u)&&J(Y)};ht=Y._dc=Mn.delayedCall(f||.25,le).pause(),Y.deltaX=Y.deltaY=0,Y._vx=Rf(0,50,!0),Y._vy=Rf(0,50,!0),Y.scrollX=Oe,Y.scrollY=Pt,Y.isDragging=Y.isGesturing=Y.isPressed=!1,A0(this),Y.enable=function(Le){return Y.isEnabled||(Fn(te?ie:a,"scroll",Cf),o.indexOf("scroll")>=0&&Fn(te?ie:a,"scroll",Ce,Be,Pe),o.indexOf("wheel")>=0&&Fn(a,"wheel",he,Be,Pe),(o.indexOf("touch")>=0&&E0||o.indexOf("pointer")>=0)&&(Fn(a,Pi[0],Me,Be,Pe),Fn(ie,Pi[2],N),Fn(ie,Pi[3],N),ge&&Fn(a,"click",ze,!0,!0),J&&Fn(a,"click",Et),pe&&Fn(ie,"gesturestart",me),O&&Fn(ie,"gestureend",ue),F&&Fn(a,Ss+"enter",Fe),C&&Fn(a,Ss+"leave",He),$&&Fn(a,Ss+"move",ae)),Y.isEnabled=!0,Y.isDragging=Y.isGesturing=Y.isPressed=Ue=pt=!1,Y._vx.reset(),Y._vy.reset(),L=Oe(),T=Pt(),Le&&Le.type&&Me(Le),je&&je(Y)),Y},Y.disable=function(){Y.isEnabled&&(Mo.filter(function(Le){return Le!==Y&&Wa(Le.target)}).length||Un(te?ie:a,"scroll",Cf),Y.isPressed&&(Y._vx.reset(),Y._vy.reset(),Un(X?a:ie,Pi[1],Se,!0)),Un(te?ie:a,"scroll",Ce,Pe),Un(a,"wheel",he,Pe),Un(a,Pi[0],Me,Pe),Un(ie,Pi[2],N),Un(ie,Pi[3],N),Un(a,"click",ze,!0),Un(a,"click",Et),Un(ie,"gesturestart",me),Un(ie,"gestureend",ue),Un(a,Ss+"enter",Fe),Un(a,Ss+"leave",He),Un(a,Ss+"move",ae),Y.isEnabled=Y.isPressed=Y.isDragging=!1,it&&it(Y))},Y.kill=Y.revert=function(){Y.disable();var Le=Mo.indexOf(Y);Le>=0&&Mo.splice(Le,1),xr===Y&&(xr=0)},Mo.push(Y),X&&Wa(a)&&(xr=Y),Y.enable(g)},AA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();sn.version="3.12.7";sn.create=function(r){return new sn(r)};sn.register=L0;sn.getAll=function(){return Mo.slice()};sn.getById=function(r){return Mo.filter(function(e){return e.vars.id===r})[0]};C0()&&Mn.registerPlugin(sn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Xe,vo,xt,qt,oi,Nt,Ph,Xc,pl,Xa,Ta,ec,Cn,ou,Pf,zn,Ym,jm,yo,D0,id,I0,Bn,Lf,O0,N0,Fr,Df,Lh,Io,Dh,qc,If,rd,tc=1,Rn=Date.now,sd=Rn(),Mi=0,Aa=0,$m=function(e,t,n){var i=ri(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Km=function(e,t){return t&&(!ri(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},RA=function r(){return Aa&&requestAnimationFrame(r)},Zm=function(){return ou=1},Jm=function(){return ou=0},qi=function(e){return e},Ca=function(e){return Math.round(e*1e5)/1e5||0},U0=function(){return typeof window<"u"},F0=function(){return Xe||U0()&&(Xe=window.gsap)&&Xe.registerPlugin&&Xe},Hs=function(e){return!!~Ph.indexOf(e)},k0=function(e){return(e==="Height"?Dh:xt["inner"+e])||oi["client"+e]||Nt["client"+e]},B0=function(e){return Jr(e,"getBoundingClientRect")||(Hs(e)?function(){return Cc.width=xt.innerWidth,Cc.height=Dh,Cc}:function(){return gr(e)})},PA=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Jr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?k0(s):e["client"+s])||0}},LA=function(e,t){return!t||~er.indexOf(e)?B0(e):function(){return Cc}},Ki=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Jr(e,n))?o()-B0(e)()[s]:Hs(e)?(oi[n]||Nt[n])-k0(i):e[n]-e["offset"+i])},nc=function(e,t){for(var n=0;n<yo.length;n+=3)(!t||~t.indexOf(yo[n+1]))&&e(yo[n],yo[n+1],yo[n+2])},ri=function(e){return typeof e=="string"},Ln=function(e){return typeof e=="function"},Ra=function(e){return typeof e=="number"},ws=function(e){return typeof e=="object"},ya=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},od=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},fo=Math.abs,z0="left",H0="top",Ih="right",Oh="bottom",Ns="width",Us="height",qa="Right",Ya="Left",ja="Top",$a="Bottom",an="padding",_i="margin",Jo="Width",Nh="Height",cn="px",vi=function(e){return xt.getComputedStyle(e)},DA=function(e){var t=vi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Qm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},gr=function(e,t){var n=t&&vi(e)[Pf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Xe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Yc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},V0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},IA=function(e){return function(t){return Xe.utils.snap(V0(e),t)}},Uh=function(e){var t=Xe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},OA=function(e){return function(t,n){return Uh(V0(e))(t,n.direction)}},ic=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},_n=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},rc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},eg={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},sc={toggleActions:"play",anticipatePin:0},jc={top:0,left:0,center:.5,bottom:1,right:1},Mc=function(e,t){if(ri(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in jc?jc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},oc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=qt.createElement("div"),g=Hs(n)||Jr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Nt:n,w=e.indexOf("start")!==-1,y=w?c:u,v="border-color:"+y+";font-size:"+d+";color:"+y+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===un?Ih:Oh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=w,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Ec(_,0,i,w),_},Ec=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Jo]=1,s["border"+a+Jo]=0,s[n.p]=t+"px",Xe.set(e,s)},yt=[],Of={},ml,tg=function(){return Rn()-Mi>34&&(ml||(ml=requestAnimationFrame(Mr)))},ho=function(){(!Bn||!Bn.isPressed||Bn.startX>Nt.clientWidth)&&(St.cache++,Bn?ml||(ml=requestAnimationFrame(Mr)):Mr(),Mi||Gs("scrollStart"),Mi=Rn())},ad=function(){N0=xt.innerWidth,O0=xt.innerHeight},Pa=function(e){St.cache++,(e===!0||!Cn&&!I0&&!qt.fullscreenElement&&!qt.webkitFullscreenElement&&(!Lf||N0!==xt.innerWidth||Math.abs(xt.innerHeight-O0)>xt.innerHeight*.25))&&Xc.restart(!0)},Vs={},NA=[],G0=function r(){return gn(Ke,"scrollEnd",r)||As(!0)},Gs=function(e){return Vs[e]&&Vs[e].map(function(t){return t()})||NA},ii=[],W0=function(e){for(var t=0;t<ii.length;t+=5)(!e||ii[t+4]&&ii[t+4].query===e)&&(ii[t].style.cssText=ii[t+1],ii[t].getBBox&&ii[t].setAttribute("transform",ii[t+2]||""),ii[t+3].uncache=1)},Fh=function(e,t){var n;for(zn=0;zn<yt.length;zn++)n=yt[zn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));qc=!0,t&&W0(t),t||Gs("revert")},X0=function(e,t){St.cache++,(t||!Hn)&&St.forEach(function(n){return Ln(n)&&n.cacheID++&&(n.rec=0)}),ri(e)&&(xt.history.scrollRestoration=Lh=e)},Hn,Fs=0,ng,UA=function(){if(ng!==Fs){var e=ng=Fs;requestAnimationFrame(function(){return e===Fs&&As(!0)})}},q0=function(){Nt.appendChild(Io),Dh=!Bn&&Io.offsetHeight||xt.innerHeight,Nt.removeChild(Io)},ig=function(e){return pl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},As=function(e,t){if(oi=qt.documentElement,Nt=qt.body,Ph=[xt,qt,oi,Nt],Mi&&!e&&!qc){_n(Ke,"scrollEnd",G0);return}q0(),Hn=Ke.isRefreshing=!0,St.forEach(function(i){return Ln(i)&&++i.cacheID&&(i.rec=i())});var n=Gs("refreshInit");D0&&Ke.sort(),t||Fh(),St.forEach(function(i){Ln(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),yt.slice(0).forEach(function(i){return i.refresh()}),qc=!1,yt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),If=1,ig(!0),yt.forEach(function(i){var s=Ki(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),ig(!1),If=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),St.forEach(function(i){Ln(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),X0(Lh,1),Xc.pause(),Fs++,Hn=2,Mr(2),yt.forEach(function(i){return Ln(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Hn=Ke.isRefreshing=!1,Gs("refresh")},Nf=0,Tc=1,Ka,Mr=function(e){if(e===2||!Hn&&!qc){Ke.isUpdating=!0,Ka&&Ka.update(0);var t=yt.length,n=Rn(),i=n-sd>=50,s=t&&yt[0].scroll();if(Tc=Nf>s?-1:1,Hn||(Nf=s),i&&(Mi&&!ou&&n-Mi>200&&(Mi=0,Gs("scrollEnd")),Ta=sd,sd=n),Tc<0){for(zn=t;zn-- >0;)yt[zn]&&yt[zn].update(0,i);Tc=1}else for(zn=0;zn<t;zn++)yt[zn]&&yt[zn].update(0,i);Ke.isUpdating=!1}ml=0},Uf=[z0,H0,Oh,Ih,_i+$a,_i+qa,_i+ja,_i+Ya,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ac=Uf.concat([Ns,Us,"boxSizing","max"+Jo,"max"+Nh,"position",_i,an,an+ja,an+qa,an+$a,an+Ya]),FA=function(e,t,n){Oo(n);var i=e._gsap;if(i.spacerIsNative)Oo(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},ld=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Uf.length,o=t.style,a=e.style,l;s--;)l=Uf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Oh]=a[Ih]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ns]=Yc(e,Gn)+cn,o[Us]=Yc(e,un)+cn,o[an]=a[_i]=a[H0]=a[z0]="0",Oo(i),a[Ns]=a["max"+Jo]=n[Ns],a[Us]=a["max"+Nh]=n[Us],a[an]=n[an],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},kA=/([A-Z])/g,Oo=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Xe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(kA,"-$1").toLowerCase())}},ac=function(e){for(var t=Ac.length,n=e.style,i=[],s=0;s<t;s++)i.push(Ac[s],n[Ac[s]]);return i.t=e,i},BA=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Cc={left:0,top:0},rg=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Ln(e)&&(e=e(l)),ri(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Mc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,w;if(h&&h.seek(0),isNaN(e)||(e=+e),Ra(e))h&&(e=Xe.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Ec(a,n,i,!0);else{Ln(t)&&(t=t(l));var y=(e||"0").split(" "),v,S,A,E;w=Yn(t,l)||Nt,v=gr(w)||{},(!v||!v.left&&!v.top)&&vi(w).display==="none"&&(E=w.style.display,w.style.display="block",v=gr(w),E?w.style.display=E:w.style.removeProperty("display")),S=Mc(y[0],v[i.d]),A=Mc(y[1]||"0",n),e=v[i.p]-c[i.p]-u+S+s-A,a&&Ec(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,x=o._isStart;m="scroll"+i.d2,Ec(o,P,i,x&&P>20||!x&&(d?Math.max(Nt[m],oi[m]):o.parentNode[m])<=P+1),d&&(c=gr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+cn))}return h&&w&&(m=gr(w),h.seek(f),p=gr(w),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},zA=/(webkit|moz|length|cssText|inset)/i,sg=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Nt){e._stOrig=s.cssText,a=vi(e);for(o in a)!+o&&!zA.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Xe.core.getCache(e).uncache=1,t.appendChild(e)}},Y0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},lc=function(e,t,n){var i={};i[t.p]="+="+n,Xe.set(e,i)},og=function(e,t){var n=is(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=Y0(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){St.cache++,o.tween&&Mr()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=Xe.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},_n(e,"wheel",n.wheelHandler),Ke.isTouch&&_n(e,"touchmove",n.wheelHandler),s},Ke=function(){function r(t,n){vo||r.register(Xe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Df(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Aa){this.update=this.refresh=this.kill=qi;return}n=Qm(ri(n)||Ra(n)||n.nodeType?{trigger:n}:n,sc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,w=s.onSnapComplete,y=s.once,v=s.snap,S=s.pinReparent,A=s.pinSpacer,E=s.containerAnimation,P=s.fastScrollEnd,x=s.preventOverlaps,b=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Gn:un,D=!d&&d!==0,I=Yn(n.scroller||xt),H=Xe.core.getCache(I),F=Hs(I),C=("pinType"in n?n.pinType:Jr(I,"pinType")||F&&"fixed")==="fixed",$=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],K=D&&n.toggleActions.split(" "),X="markers"in n?n.markers:sc.markers,pe=F?0:parseFloat(vi(I)["border"+b.p2+Jo])||0,O=this,q=n.onRefreshInit&&function(){return n.onRefreshInit(O)},je=PA(I,F,b),it=LA(I,F),J=0,ce=0,Pe=0,ge=is(I,b),Ae,tt,we,ht,pt,Ue,U,ct,st,Y,Ie,ot,Be,Oe,Pt,L,T,W,te,ie,Q,xe,_e,ze,re,le,be,Ee,$e,Se,Me,N,me,ue,Ce,he,ae,Fe,He;if(O._startClamp=O._endClamp=!1,O._dir=b,m*=45,O.scroller=I,O.scroll=E?E.time.bind(E):ge,ht=ge(),O.vars=n,i=i||n.animation,"refreshPriority"in n&&(D0=1,n.refreshPriority===-9999&&(Ka=O)),H.tweenScroll=H.tweenScroll||{top:og(I,un),left:og(I,Gn)},O.tweenTo=Ae=H.tweenScroll[b.p],O.scrubDuration=function(Te){me=Ra(Te)&&Te,me?N?N.duration(Te):N=Xe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:me,paused:!0,onComplete:function(){return p&&p(O)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!O.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),O.animation=i.pause(),i.scrollTrigger=O,O.scrubDuration(d),Se=0,l||(l=i.vars.id)),v&&((!ws(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Nt.style&&Xe.set(F?[Nt,oi]:I,{scrollBehavior:"auto"}),St.forEach(function(Te){return Ln(Te)&&Te.target===(F?qt.scrollingElement||oi:I)&&(Te.smooth=!1)}),we=Ln(v.snapTo)?v.snapTo:v.snapTo==="labels"?IA(i):v.snapTo==="labelsDirectional"?OA(i):v.directional!==!1?function(Te,at){return Uh(v.snapTo)(Te,Rn()-ce<500?0:at.direction)}:Xe.utils.snap(v.snapTo),ue=v.duration||{min:.1,max:2},ue=ws(ue)?Xa(ue.min,ue.max):Xa(ue,ue),Ce=Xe.delayedCall(v.delay||me/2||.1,function(){var Te=ge(),at=Rn()-ce<500,We=Ae.tween;if((at||Math.abs(O.getVelocity())<10)&&!We&&!ou&&J!==Te){var nt=(Te-Ue)/Oe,jt=i&&!D?i.totalProgress():nt,ut=at?0:(jt-Me)/(Rn()-Ta)*1e3||0,zt=Xe.utils.clamp(-nt,1-nt,fo(ut/2)*ut/.185),Gt=nt+(v.inertia===!1?0:zt),Ve,mt,Lt=v,In=Lt.onStart,Ht=Lt.onInterrupt,xn=Lt.onComplete;if(Ve=we(Gt,O),Ra(Ve)||(Ve=Gt),mt=Math.max(0,Math.round(Ue+Ve*Oe)),Te<=U&&Te>=Ue&&mt!==Te){if(We&&!We._initted&&We.data<=fo(mt-Te))return;v.inertia===!1&&(zt=Ve-nt),Ae(mt,{duration:ue(fo(Math.max(fo(Gt-jt),fo(Ve-jt))*.185/ut/.05||0)),ease:v.ease||"power3",data:fo(mt-Te),onInterrupt:function(){return Ce.restart(!0)&&Ht&&Ht(O)},onComplete:function(){O.update(),J=ge(),i&&!D&&(N?N.resetTo("totalProgress",Ve,i._tTime/i._tDur):i.progress(Ve)),Se=Me=i&&!D?i.totalProgress():O.progress,w&&w(O),xn&&xn(O)}},Te,zt*Oe,mt-Te-zt*Oe),In&&In(O,Ae.tween)}}else O.isActive&&J!==Te&&Ce.restart(!0)}).pause()),l&&(Of[l]=O),f=O.trigger=Yn(f||h!==!0&&h),He=f&&f._gsap&&f._gsap.stRevert,He&&(He=He(O)),h=h===!0?f:Yn(h),ri(a)&&(a={targets:f,className:a}),h&&(_===!1||_===_i||(_=!_&&h.parentNode&&h.parentNode.style&&vi(h.parentNode).display==="flex"?!1:an),O.pin=h,tt=Xe.core.getCache(h),tt.spacer?Pt=tt.pinState:(A&&(A=Yn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),tt.spacerIsNative=!!A,A&&(tt.spacerState=ac(A))),tt.spacer=W=A||qt.createElement("div"),W.classList.add("pin-spacer"),l&&W.classList.add("pin-spacer-"+l),tt.pinState=Pt=ac(h)),n.force3D!==!1&&Xe.set(h,{force3D:!0}),O.spacer=W=tt.spacer,$e=vi(h),ze=$e[_+b.os2],ie=Xe.getProperty(h),Q=Xe.quickSetter(h,b.a,cn),ld(h,W,$e),T=ac(h)),X){ot=ws(X)?Qm(X,eg):eg,Y=oc("scroller-start",l,I,b,ot,0),Ie=oc("scroller-end",l,I,b,ot,0,Y),te=Y["offset"+b.op.d2];var Et=Yn(Jr(I,"content")||I);ct=this.markerStart=oc("start",l,Et,b,ot,te,0,E),st=this.markerEnd=oc("end",l,Et,b,ot,te,0,E),E&&(Fe=Xe.quickSetter([ct,st],b.a,cn)),!C&&!(er.length&&Jr(I,"fixedMarkers")===!0)&&(DA(F?Nt:I),Xe.set([Y,Ie],{force3D:!0}),le=Xe.quickSetter(Y,b.a,cn),Ee=Xe.quickSetter(Ie,b.a,cn))}if(E){var Le=E.vars.onUpdate,Re=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){O.update(0,0,1),Le&&Le.apply(E,Re||[])})}if(O.previous=function(){return yt[yt.indexOf(O)-1]},O.next=function(){return yt[yt.indexOf(O)+1]},O.revert=function(Te,at){if(!at)return O.kill(!0);var We=Te!==!1||!O.enabled,nt=Cn;We!==O.isReverted&&(We&&(he=Math.max(ge(),O.scroll.rec||0),Pe=O.progress,ae=i&&i.progress()),ct&&[ct,st,Y,Ie].forEach(function(jt){return jt.style.display=We?"none":"block"}),We&&(Cn=O,O.update(We)),h&&(!S||!O.isActive)&&(We?FA(h,W,Pt):ld(h,W,vi(h),re)),We||O.update(We),Cn=nt,O.isReverted=We)},O.refresh=function(Te,at,We,nt){if(!((Cn||!O.enabled)&&!at)){if(h&&Te&&Mi){_n(r,"scrollEnd",G0);return}!Hn&&q&&q(O),Cn=O,Ae.tween&&!We&&(Ae.tween.kill(),Ae.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),O.isReverted||O.revert(!0,!0),O._subPinOffset=!1;var jt=je(),ut=it(),zt=E?E.duration():Ki(I,b),Gt=Oe<=.01,Ve=0,mt=nt||0,Lt=ws(We)?We.end:n.end,In=n.endTrigger||f,Ht=ws(We)?We.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),xn=O.pinnedContainer=n.pinnedContainer&&Yn(n.pinnedContainer,O),Sn=f&&Math.max(0,yt.indexOf(O))||0,tn=Sn,Tt,R,z,Z,j,k,fe,ve,ke,Ne,Ye,et,qe;for(X&&ws(We)&&(et=Xe.getProperty(Y,b.p),qe=Xe.getProperty(Ie,b.p));tn-- >0;)k=yt[tn],k.end||k.refresh(0,1)||(Cn=O),fe=k.pin,fe&&(fe===f||fe===h||fe===xn)&&!k.isReverted&&(Ne||(Ne=[]),Ne.unshift(k),k.revert(!0,!0)),k!==yt[tn]&&(Sn--,tn--);for(Ln(Ht)&&(Ht=Ht(O)),Ht=$m(Ht,"start",O),Ue=rg(Ht,f,jt,b,ge(),ct,Y,O,ut,pe,C,zt,E,O._startClamp&&"_startClamp")||(h?-.001:0),Ln(Lt)&&(Lt=Lt(O)),ri(Lt)&&!Lt.indexOf("+=")&&(~Lt.indexOf(" ")?Lt=(ri(Ht)?Ht.split(" ")[0]:"")+Lt:(Ve=Mc(Lt.substr(2),jt),Lt=ri(Ht)?Ht:(E?Xe.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Ue):Ue)+Ve,In=f)),Lt=$m(Lt,"end",O),U=Math.max(Ue,rg(Lt||(In?"100% 0":zt),In,jt,b,ge()+Ve,st,Ie,O,ut,pe,C,zt,E,O._endClamp&&"_endClamp"))||-.001,Ve=0,tn=Sn;tn--;)k=yt[tn],fe=k.pin,fe&&k.start-k._pinPush<=Ue&&!E&&k.end>0&&(Tt=k.end-(O._startClamp?Math.max(0,k.start):k.start),(fe===f&&k.start-k._pinPush<Ue||fe===xn)&&isNaN(Ht)&&(Ve+=Tt*(1-k.progress)),fe===h&&(mt+=Tt));if(Ue+=Ve,U+=Ve,O._startClamp&&(O._startClamp+=Ve),O._endClamp&&!Hn&&(O._endClamp=U||-.001,U=Math.min(U,Ki(I,b))),Oe=U-Ue||(Ue-=.01)&&.001,Gt&&(Pe=Xe.utils.clamp(0,1,Xe.utils.normalize(Ue,U,he))),O._pinPush=mt,ct&&Ve&&(Tt={},Tt[b.a]="+="+Ve,xn&&(Tt[b.p]="-="+ge()),Xe.set([ct,st],Tt)),h&&!(If&&O.end>=Ki(I,b)))Tt=vi(h),Z=b===un,z=ge(),xe=parseFloat(ie(b.a))+mt,!zt&&U>1&&(Ye=(F?qt.scrollingElement||oi:I).style,Ye={style:Ye,value:Ye["overflow"+b.a.toUpperCase()]},F&&vi(Nt)["overflow"+b.a.toUpperCase()]!=="scroll"&&(Ye.style["overflow"+b.a.toUpperCase()]="scroll")),ld(h,W,Tt),T=ac(h),R=gr(h,!0),ve=C&&is(I,Z?Gn:un)(),_?(re=[_+b.os2,Oe+mt+cn],re.t=W,tn=_===an?Yc(h,b)+Oe+mt:0,tn&&(re.push(b.d,tn+cn),W.style.flexBasis!=="auto"&&(W.style.flexBasis=tn+cn)),Oo(re),xn&&yt.forEach(function(ft){ft.pin===xn&&ft.vars.pinSpacing!==!1&&(ft._subPinOffset=!0)}),C&&ge(he)):(tn=Yc(h,b),tn&&W.style.flexBasis!=="auto"&&(W.style.flexBasis=tn+cn)),C&&(j={top:R.top+(Z?z-Ue:ve)+cn,left:R.left+(Z?ve:z-Ue)+cn,boxSizing:"border-box",position:"fixed"},j[Ns]=j["max"+Jo]=Math.ceil(R.width)+cn,j[Us]=j["max"+Nh]=Math.ceil(R.height)+cn,j[_i]=j[_i+ja]=j[_i+qa]=j[_i+$a]=j[_i+Ya]="0",j[an]=Tt[an],j[an+ja]=Tt[an+ja],j[an+qa]=Tt[an+qa],j[an+$a]=Tt[an+$a],j[an+Ya]=Tt[an+Ya],L=BA(Pt,j,S),Hn&&ge(0)),i?(ke=i._initted,id(1),i.render(i.duration(),!0,!0),_e=ie(b.a)-xe+Oe+mt,be=Math.abs(Oe-_e)>1,C&&be&&L.splice(L.length-2,2),i.render(0,!0,!0),ke||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),id(0)):_e=Oe,Ye&&(Ye.value?Ye.style["overflow"+b.a.toUpperCase()]=Ye.value:Ye.style.removeProperty("overflow-"+b.a));else if(f&&ge()&&!E)for(R=f.parentNode;R&&R!==Nt;)R._pinOffset&&(Ue-=R._pinOffset,U-=R._pinOffset),R=R.parentNode;Ne&&Ne.forEach(function(ft){return ft.revert(!1,!0)}),O.start=Ue,O.end=U,ht=pt=Hn?he:ge(),!E&&!Hn&&(ht<he&&ge(he),O.scroll.rec=0),O.revert(!1,!0),ce=Rn(),Ce&&(J=-1,Ce.restart(!0)),Cn=0,i&&D&&(i._initted||ae)&&i.progress()!==ae&&i.progress(ae||0,!0).render(i.time(),!0,!0),(Gt||Pe!==O.progress||E||g||i&&!i._initted)&&(i&&!D&&i.totalProgress(E&&Ue<-.001&&!Pe?Xe.utils.normalize(Ue,U,0):Pe,!0),O.progress=Gt||(ht-Ue)/Oe===Pe?0:Pe),h&&_&&(W._pinOffset=Math.round(O.progress*_e)),N&&N.invalidate(),isNaN(et)||(et-=Xe.getProperty(Y,b.p),qe-=Xe.getProperty(Ie,b.p),lc(Y,b,et),lc(ct,b,et-(nt||0)),lc(Ie,b,qe),lc(st,b,qe-(nt||0))),Gt&&!Hn&&O.update(),u&&!Hn&&!Be&&(Be=!0,u(O),Be=!1)}},O.getVelocity=function(){return(ge()-pt)/(Rn()-Ta)*1e3||0},O.endAnimation=function(){ya(O.callbackAnimation),i&&(N?N.progress(1):i.paused()?D||ya(i,O.direction<0,1):ya(i,i.reversed()))},O.labelToScroll=function(Te){return i&&i.labels&&(Ue||O.refresh()||Ue)+i.labels[Te]/i.duration()*Oe||0},O.getTrailing=function(Te){var at=yt.indexOf(O),We=O.direction>0?yt.slice(0,at).reverse():yt.slice(at+1);return(ri(Te)?We.filter(function(nt){return nt.vars.preventOverlaps===Te}):We).filter(function(nt){return O.direction>0?nt.end<=Ue:nt.start>=U})},O.update=function(Te,at,We){if(!(E&&!We&&!Te)){var nt=Hn===!0?he:O.scroll(),jt=Te?0:(nt-Ue)/Oe,ut=jt<0?0:jt>1?1:jt||0,zt=O.progress,Gt,Ve,mt,Lt,In,Ht,xn,Sn;if(at&&(pt=ht,ht=E?ge():nt,v&&(Me=Se,Se=i&&!D?i.totalProgress():ut)),m&&h&&!Cn&&!tc&&Mi&&(!ut&&Ue<nt+(nt-pt)/(Rn()-Ta)*m?ut=1e-4:ut===1&&U>nt+(nt-pt)/(Rn()-Ta)*m&&(ut=.9999)),ut!==zt&&O.enabled){if(Gt=O.isActive=!!ut&&ut<1,Ve=!!zt&&zt<1,Ht=Gt!==Ve,In=Ht||!!ut!=!!zt,O.direction=ut>zt?1:-1,O.progress=ut,In&&!Cn&&(mt=ut&&!zt?0:ut===1?1:zt===1?2:3,D&&(Lt=!Ht&&K[mt+1]!=="none"&&K[mt+1]||K[mt],Sn=i&&(Lt==="complete"||Lt==="reset"||Lt in i))),x&&(Ht||Sn)&&(Sn||d||!i)&&(Ln(x)?x(O):O.getTrailing(x).forEach(function(z){return z.endAnimation()})),D||(N&&!Cn&&!tc?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",ut,i._tTime/i._tDur):(N.vars.totalProgress=ut,N.invalidate().restart())):i&&i.totalProgress(ut,!!(Cn&&(ce||Te)))),h){if(Te&&_&&(W.style[_+b.os2]=ze),!C)Q(Ca(xe+_e*ut));else if(In){if(xn=!Te&&ut>zt&&U+1>nt&&nt+1>=Ki(I,b),S)if(!Te&&(Gt||xn)){var tn=gr(h,!0),Tt=nt-Ue;sg(h,Nt,tn.top+(b===un?Tt:0)+cn,tn.left+(b===un?0:Tt)+cn)}else sg(h,W);Oo(Gt||xn?L:T),be&&ut<1&&Gt||Q(xe+(ut===1&&!xn?_e:0))}}v&&!Ae.tween&&!Cn&&!tc&&Ce.restart(!0),a&&(Ht||y&&ut&&(ut<1||!rd))&&pl(a.targets).forEach(function(z){return z.classList[Gt||y?"add":"remove"](a.className)}),o&&!D&&!Te&&o(O),In&&!Cn?(D&&(Sn&&(Lt==="complete"?i.pause().totalProgress(1):Lt==="reset"?i.restart(!0).pause():Lt==="restart"?i.restart(!0):i[Lt]()),o&&o(O)),(Ht||!rd)&&(c&&Ht&&od(O,c),$[mt]&&od(O,$[mt]),y&&(ut===1?O.kill(!1,1):$[mt]=0),Ht||(mt=ut===1?1:3,$[mt]&&od(O,$[mt]))),P&&!Gt&&Math.abs(O.getVelocity())>(Ra(P)?P:2500)&&(ya(O.callbackAnimation),N?N.progress(1):ya(i,Lt==="reverse"?1:!ut,1))):D&&o&&!Cn&&o(O)}if(Ee){var R=E?nt/E.duration()*(E._caScrollDist||0):nt;le(R+(Y._isFlipped?1:0)),Ee(R)}Fe&&Fe(-nt/E.duration()*(E._caScrollDist||0))}},O.enable=function(Te,at){O.enabled||(O.enabled=!0,_n(I,"resize",Pa),F||_n(I,"scroll",ho),q&&_n(r,"refreshInit",q),Te!==!1&&(O.progress=Pe=0,ht=pt=J=ge()),at!==!1&&O.refresh())},O.getTween=function(Te){return Te&&Ae?Ae.tween:N},O.setPositions=function(Te,at,We,nt){if(E){var jt=E.scrollTrigger,ut=E.duration(),zt=jt.end-jt.start;Te=jt.start+zt*Te/ut,at=jt.start+zt*at/ut}O.refresh(!1,!1,{start:Km(Te,We&&!!O._startClamp),end:Km(at,We&&!!O._endClamp)},nt),O.update()},O.adjustPinSpacing=function(Te){if(re&&Te){var at=re.indexOf(b.d)+1;re[at]=parseFloat(re[at])+Te+cn,re[1]=parseFloat(re[1])+Te+cn,Oo(re)}},O.disable=function(Te,at){if(O.enabled&&(Te!==!1&&O.revert(!0,!0),O.enabled=O.isActive=!1,at||N&&N.pause(),he=0,tt&&(tt.uncache=1),q&&gn(r,"refreshInit",q),Ce&&(Ce.pause(),Ae.tween&&Ae.tween.kill()&&(Ae.tween=0)),!F)){for(var We=yt.length;We--;)if(yt[We].scroller===I&&yt[We]!==O)return;gn(I,"resize",Pa),F||gn(I,"scroll",ho)}},O.kill=function(Te,at){O.disable(Te,at),N&&!at&&N.kill(),l&&delete Of[l];var We=yt.indexOf(O);We>=0&&yt.splice(We,1),We===zn&&Tc>0&&zn--,We=0,yt.forEach(function(nt){return nt.scroller===O.scroller&&(We=1)}),We||Hn||(O.scroll.rec=0),i&&(i.scrollTrigger=null,Te&&i.revert({kill:!1}),at||i.kill()),ct&&[ct,st,Y,Ie].forEach(function(nt){return nt.parentNode&&nt.parentNode.removeChild(nt)}),Ka===O&&(Ka=0),h&&(tt&&(tt.uncache=1),We=0,yt.forEach(function(nt){return nt.pin===h&&We++}),We||(tt.spacer=0)),n.onKill&&n.onKill(O)},yt.push(O),O.enable(!1,!1),He&&He(O),i&&i.add&&!Oe){var rt=O.update;O.update=function(){O.update=rt,St.cache++,Ue||U||O.refresh()},Xe.delayedCall(.01,O.update),Oe=.01,Ue=U=0}else O.refresh();h&&UA()},r.register=function(n){return vo||(Xe=n||F0(),U0()&&window.document&&r.enable(),vo=Aa),vo},r.defaults=function(n){if(n)for(var i in n)sc[i]=n[i];return sc},r.disable=function(n,i){Aa=0,yt.forEach(function(o){return o[i?"kill":"disable"](n)}),gn(xt,"wheel",ho),gn(qt,"scroll",ho),clearInterval(ec),gn(qt,"touchcancel",qi),gn(Nt,"touchstart",qi),ic(gn,qt,"pointerdown,touchstart,mousedown",Zm),ic(gn,qt,"pointerup,touchend,mouseup",Jm),Xc.kill(),nc(gn);for(var s=0;s<St.length;s+=3)rc(gn,St[s],St[s+1]),rc(gn,St[s],St[s+2])},r.enable=function(){if(xt=window,qt=document,oi=qt.documentElement,Nt=qt.body,Xe&&(pl=Xe.utils.toArray,Xa=Xe.utils.clamp,Df=Xe.core.context||qi,id=Xe.core.suppressOverwrites||qi,Lh=xt.history.scrollRestoration||"auto",Nf=xt.pageYOffset||0,Xe.core.globals("ScrollTrigger",r),Nt)){Aa=1,Io=document.createElement("div"),Io.style.height="100vh",Io.style.position="absolute",q0(),RA(),sn.register(Xe),r.isTouch=sn.isTouch,Fr=sn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Lf=sn.isTouch===1,_n(xt,"wheel",ho),Ph=[xt,qt,oi,Nt],Xe.matchMedia?(r.matchMedia=function(c){var u=Xe.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Xe.addEventListener("matchMediaInit",function(){return Fh()}),Xe.addEventListener("matchMediaRevert",function(){return W0()}),Xe.addEventListener("matchMedia",function(){As(0,1),Gs("matchMedia")}),Xe.matchMedia().add("(orientation: portrait)",function(){return ad(),ad})):console.warn("Requires GSAP 3.11.0 or later"),ad(),_n(qt,"scroll",ho);var n=Nt.hasAttribute("style"),i=Nt.style,s=i.borderTopStyle,o=Xe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=gr(Nt),un.m=Math.round(a.top+un.sc())||0,Gn.m=Math.round(a.left+Gn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Nt.setAttribute("style",""),Nt.removeAttribute("style")),ec=setInterval(tg,250),Xe.delayedCall(.5,function(){return tc=0}),_n(qt,"touchcancel",qi),_n(Nt,"touchstart",qi),ic(_n,qt,"pointerdown,touchstart,mousedown",Zm),ic(_n,qt,"pointerup,touchend,mouseup",Jm),Pf=Xe.utils.checkPrefix("transform"),Ac.push(Pf),vo=Rn(),Xc=Xe.delayedCall(.2,As).pause(),yo=[qt,"visibilitychange",function(){var c=xt.innerWidth,u=xt.innerHeight;qt.hidden?(Ym=c,jm=u):(Ym!==c||jm!==u)&&Pa()},qt,"DOMContentLoaded",As,xt,"load",As,xt,"resize",Pa],nc(_n),yt.forEach(function(c){return c.enable(0,1)}),l=0;l<St.length;l+=3)rc(gn,St[l],St[l+1]),rc(gn,St[l],St[l+2])}},r.config=function(n){"limitCallbacks"in n&&(rd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ec)||(ec=i)&&setInterval(tg,i),"ignoreMobileResize"in n&&(Lf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(nc(gn)||nc(_n,n.autoRefreshEvents||"none"),I0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Yn(n),o=St.indexOf(s),a=Hs(s);~o&&St.splice(o,a?6:2),i&&(a?er.unshift(xt,i,Nt,i,oi,i):er.unshift(s,i))},r.clearMatchMedia=function(n){yt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(ri(n)?Yn(n):n).getBoundingClientRect(),a=o[s?Ns:Us]*i||0;return s?o.right-a>0&&o.left+a<xt.innerWidth:o.bottom-a>0&&o.top+a<xt.innerHeight},r.positionInViewport=function(n,i,s){ri(n)&&(n=Yn(n));var o=n.getBoundingClientRect(),a=o[s?Ns:Us],l=i==null?a/2:i in jc?jc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/xt.innerWidth:(o.top+l)/xt.innerHeight},r.killAll=function(n){if(yt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Vs.killAll||[];Vs={},i.forEach(function(s){return s()})}},r}();Ke.version="3.12.7";Ke.saveStyles=function(r){return r?pl(r).forEach(function(e){if(e&&e.style){var t=ii.indexOf(e);t>=0&&ii.splice(t,5),ii.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Xe.core.getCache(e),Df())}}):ii};Ke.revert=function(r,e){return Fh(!r,e)};Ke.create=function(r,e){return new Ke(r,e)};Ke.refresh=function(r){return r?Pa(!0):(vo||Ke.register())&&As(!0)};Ke.update=function(r){return++St.cache&&Mr(r===!0?2:0)};Ke.clearScrollMemory=X0;Ke.maxScroll=function(r,e){return Ki(r,e?Gn:un)};Ke.getScrollFunc=function(r,e){return is(Yn(r),e?Gn:un)};Ke.getById=function(r){return Of[r]};Ke.getAll=function(){return yt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ke.isScrolling=function(){return!!Mi};Ke.snapDirectional=Uh;Ke.addEventListener=function(r,e){var t=Vs[r]||(Vs[r]=[]);~t.indexOf(e)||t.push(e)};Ke.removeEventListener=function(r,e){var t=Vs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ke.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=Xe.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Ln(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Ln(s)&&(s=s(),_n(Ke,"refresh",function(){return s=e.batchMax()})),pl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ke.create(c))}),t};var ag=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},cd=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(sn.isTouch?" pinch-zoom":""):"none",e===oi&&r(Nt,t)},cc={auto:1,scroll:1},HA=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Xe.core.getCache(s),a=Rn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Nt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(cc[(l=vi(s)).overflowY]||cc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Hs(s)&&(cc[(l=vi(s)).overflowY]||cc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},j0=function(e,t,n,i){return sn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&HA,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&_n(qt,sn.eventTypes[0],cg,!1,!0)},onDisable:function(){return gn(qt,sn.eventTypes[0],cg,!0)}})},VA=/(input|label|select|textarea)/i,lg,cg=function(e){var t=VA.test(e.target.tagName);(t||lg)&&(e._gsapAllow=!0,lg=t)},GA=function(e){ws(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Yn(e.target)||oi,u=Xe.core.globals().ScrollSmoother,d=u&&u.get(),f=Fr&&(e.content&&Yn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=is(c,un),_=is(c,Gn),g=1,m=(sn.isTouch&&xt.visualViewport?xt.visualViewport.scale*xt.visualViewport.width:xt.outerWidth)/xt.innerWidth,p=0,w=Ln(i)?function(){return i(a)}:function(){return i||2.8},y,v,S=j0(c,e.type,!0,s),A=function(){return v=!1},E=qi,P=qi,x=function(){l=Ki(c,un),P=Xa(Fr?1:0,l),n&&(E=Xa(0,Ki(c,Gn))),y=Fs},b=function(){f._gsap.y=Ca(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},D=function(){if(v){requestAnimationFrame(A);var X=Ca(a.deltaY/2),pe=P(h.v-X);if(f&&pe!==h.v+h.offset){h.offset=pe-h.v;var O=Ca((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+O+", 0, 1)",f._gsap.y=O+"px",h.cacheID=St.cache,Mr()}return!0}h.offset&&b(),v=!0},I,H,F,C,$=function(){x(),I.isActive()&&I.vars.scrollY>l&&(h()>l?I.progress(1)&&h(l):I.resetTo("scrollY",l))};return f&&Xe.set(f,{y:"+=0"}),e.ignoreCheck=function(K){return Fr&&K.type==="touchmove"&&D()||g>1.05&&K.type!=="touchstart"||a.isGesturing||K.touches&&K.touches.length>1},e.onPress=function(){v=!1;var K=g;g=Ca((xt.visualViewport&&xt.visualViewport.scale||1)/m),I.pause(),K!==g&&cd(c,g>1.01?!0:n?!1:"x"),H=_(),F=h(),x(),y=Fs},e.onRelease=e.onGestureStart=function(K,X){if(h.offset&&b(),!X)C.restart(!0);else{St.cache++;var pe=w(),O,q;n&&(O=_(),q=O+pe*.05*-K.velocityX/.227,pe*=ag(_,O,q,Ki(c,Gn)),I.vars.scrollX=E(q)),O=h(),q=O+pe*.05*-K.velocityY/.227,pe*=ag(h,O,q,Ki(c,un)),I.vars.scrollY=P(q),I.invalidate().duration(pe).play(.01),(Fr&&I.vars.scrollY>=l||O>=l-1)&&Xe.to({},{onUpdate:$,duration:pe})}o&&o(K)},e.onWheel=function(){I._ts&&I.pause(),Rn()-p>1e3&&(y=0,p=Rn())},e.onChange=function(K,X,pe,O,q){if(Fs!==y&&x(),X&&n&&_(E(O[2]===X?H+(K.startX-K.x):_()+X-O[1])),pe){h.offset&&b();var je=q[2]===pe,it=je?F+K.startY-K.y:h()+pe-q[1],J=P(it);je&&it!==J&&(F+=J-it),h(J)}(pe||X)&&Mr()},e.onEnable=function(){cd(c,n?!1:"x"),Ke.addEventListener("refresh",$),_n(xt,"resize",$),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),S.enable()},e.onDisable=function(){cd(c,!0),gn(xt,"resize",$),Ke.removeEventListener("refresh",$),S.kill()},e.lockAxis=e.lockAxis!==!1,a=new sn(e),a.iOS=Fr,Fr&&!h()&&h(1),Fr&&Xe.ticker.add(qi),C=a._dc,I=Xe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Y0(h,h(),function(){return I.pause()})},onUpdate:Mr,onComplete:C.vars.onComplete}),a};Ke.sort=function(r){if(Ln(r))return yt.sort(r);var e=xt.pageYOffset||0;return Ke.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+xt.innerHeight}),yt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ke.observe=function(r){return new sn(r)};Ke.normalizeScroll=function(r){if(typeof r>"u")return Bn;if(r===!0&&Bn)return Bn.enable();if(r===!1){Bn&&Bn.kill(),Bn=r;return}var e=r instanceof sn?r:GA(r);return Bn&&Bn.target===e.target&&Bn.kill(),Hs(e.target)&&(Bn=e),e};Ke.core={_getVelocityProp:Rf,_inputObserver:j0,_scrollers:St,_proxies:er,bridge:{ss:function(){Mi||Gs("scrollStart"),Mi=Rn()},ref:function(){return Cn}}};F0()&&Xe.registerPlugin(Ke);const WA=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ke,default:Ke},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var XA=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,qA=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,YA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,jA=/(^[#\.][a-z]|[a-y][a-z])/i,$A=Math.PI/180,uc=Math.sin,dc=Math.cos,Za=Math.abs,xa=Math.sqrt,ug=function(e){return typeof e=="string"},$0=function(e){return typeof e=="number"},dg=1e5,Ur=function(e){return Math.round(e*dg)/dg||0};function KA(r){r=ug(r)&&jA.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Qr(r)):r?ug(r)?Qr(r):$0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function La(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var ZA=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},JA={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},QA=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function K0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,w,y,v,S,A,E,P,x;return t==="path"||!r.getBBox?r:(c=ZA(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),x=QA(r,JA[t]),t==="rect"?(a=x.rx,l=x.ry||a,s=x.x,o=x.y,h=x.width-a*2,_=x.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,w=p+a*n,y=p+a,v=o+l*(1-n),S=o+l,A=S+_,E=A+l*n,P=A+l,i="M"+y+","+S+" V"+A+" C"+[y,E,w,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,E,s,A,s,A-(A-S)/3,s,S+(A-S)/3,s,S,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,w,o,y,v,y,S].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=x.r,d=a*n):(a=x.rx,l=x.ry,d=l*n),s=x.cx,o=x.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+x.x1+","+x.y1+" L"+x.x2+","+x.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(qA)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",No(c._gsRawPath=Qr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function eC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=Za(t),n=Za(n);var c=i%360*$A,u=dc(c),d=uc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,w=m*m,y=p*p,v=w/(t*t)+y/(n*n);v>1&&(t=xa(v)*t,n=xa(v)*n);var S=t*t,A=n*n,E=(S*A-S*y-A*w)/(S*y+A*w);E<0&&(E=0);var P=(s===o?-1:1)*xa(E),x=P*(t*p/n),b=P*-(n*m/t),D=(r+a)/2,I=(e+l)/2,H=D+(u*x-d*b),F=I+(d*x+u*b),C=(m-x)/t,$=(p-b)/n,K=(-m-x)/t,X=(-p-b)/n,pe=C*C+$*$,O=($<0?-1:1)*Math.acos(C/xa(pe)),q=(C*X-$*K<0?-1:1)*Math.acos((C*K+$*X)/xa(pe*(K*K+X*X)));isNaN(q)&&(q=f),!o&&q>0?q-=h:o&&q<0&&(q+=h),O%=h,q%=h;var je=Math.ceil(Za(q)/(h/4)),it=[],J=q/je,ce=4/3*uc(J/2)/(1+dc(J/2)),Pe=u*t,ge=d*t,Ae=d*-n,tt=u*n,we;for(we=0;we<je;we++)i=O+we*J,m=dc(i),p=uc(i),C=dc(i+=J),$=uc(i),it.push(m-ce*p,p+ce*m,C+ce*$,$-ce*C,C,$);for(we=0;we<it.length;we+=2)m=it[we],p=it[we+1],it[we]=m*Pe+p*Ae+H,it[we+1]=m*ge+p*tt+F;return it[we-2]=a,it[we-1]=l,it}}function Qr(r){var e=(r+"").replace(YA,function(x){var b=+x;return b<1e-4&&b>-1e-4?0:b}).match(XA)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,w,y,v,S,A,E,P=function(b,D,I,H){w=(I-b)/3,y=(H-D)/3,g.push(b+w,D+y,I-w,H-y,I,H)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(S=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")w=n,y=i,(S==="C"||S==="S")&&(w+=n-g[g.length-4],y+=i-g[g.length-3]),_||(n=i=0),g.push(w,y,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")w=n+(d-n)*s,y=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(w,y,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")w=n-g[g.length-4],y=i-g[g.length-3],g.push(n+w,i+y,d+(n+w*1.5-d)*s,f+(i+y*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||Za(n-d)>.5||Za(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(A=e[c+4],E=e[c+5],w=e[c+6],y=e[c+7],u=7,A.length>1&&(A.length<3?(y=w,w=E,u--):(y=E,w=A.substr(2),u-=2),E=A.charAt(1),A=A.charAt(0)),v=eC(n,i,+e[c+1],+e[c+2],+e[c+3],+A,+E,(_?n:0)+w*1,(_?i:0)+y*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function No(r){$0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Ur(o[0])+","+Ur(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Ur(o[s++])+","+Ur(o[s++])+" "+Ur(o[s++])+","+Ur(o[s++])+" "+Ur(o[s++])+","+Ur(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ni,kh,Da,Z0,Ia,J0=function(){return Ni||typeof window<"u"&&(Ni=window.gsap)&&Ni.registerPlugin&&Ni},ud=function(e){return typeof e=="function"},Cs=Math.atan2,fg=Math.cos,hg=Math.sin,Sr=Math.sqrt,au=Math.PI,pg=au*2,tC=au*.3,nC=au*.7,Q0=1e20,gl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,iC=/(^[#\.][a-z]|[a-y][a-z])/i,rC=/[achlmqstvz]/i,qr=function(e){return console&&console.warn(e)},sC=1,mg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Uo=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},Ja=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,w,y,v,S,A,E,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],w=h[f+1],y=h[f+2]-p,A=h[f+3]-w,v=h[f+4]-p,E=h[f+5]-w,S=h[f+6]-p,P=h[f+7]-w,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*S+3*m*(g*v+m*y))*g+p,d=(g*g*P+3*m*(g*E+m*A))*g+w,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},oC=function(e,t){return t.length-e.length},gg=function(e,t){var n=e.size||Uo(e),i=t.size||Uo(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},_g=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},dd=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Sr(d*d+f*f);return a},aC=function(e,t,n){var i=e.length,s=mg(e),o=mg(t),a=o[0]-s[0],l=o[1]-s[1],c=dd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=dd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),La(d),h=6;h<i;h+=6)f=dd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},lC=function(e,t,n){for(var i=e.length,s=Q0,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Sr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},cC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Uo(e),t[n].size||Uo(t[n]))*i,u=Q0,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||Uo(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Sr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},fd=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,w,y,v;for(y=2;y<s;y+=6)for(n+=o;n>i;)a=e[y-2],l=e[y-1],c=e[y],u=e[y+1],d=e[y+2],f=e[y+3],h=e[y+4],_=e[y+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,w=u+(f-u)*v,m+=(w-m)*v,w+=(f+(_-f)*v-w)*v,e.splice(y,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(w-m)*v,p,w,d+(h-d)*v,f+(_-f)*v),y+=6,s+=6,n--;return e},Ff=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?oC:gg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,w,y,v,S,A;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),S=a.size||Ja(a),S=l.size||Ja(l),S=a.centerX-l.centerX,A=a.centerY-l.centerY,u===gg))for(f=0;f<l.length;f++)a.splice(f,0,cC(l[f],a,f,d,S,A));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&fd(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)y=a[f].size||Uo(a[f]),w=lC(l,a[f].centerX,a[f].centerY),y=w[0],v=w[1],l[f++]=[y,v,y,v,y,v,y,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?fd(m,-o/6|0):o>0&&fd(p,o/6|0),_&&s!==!1&&!p.reversed&&La(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=aC(p,m,!f||s===!1),n<0&&(_=!0,La(p),n=-n),_g(p,n*6)):n!=="reverse"&&(f&&n<0&&La(p),_g(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(La(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&qr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},vg=function(e,t,n,i,s){var o=Qr(e[0]),a=Qr(e[1]);Ff(o,a,t||t===0?t:"auto",n,s)&&(e[0]=No(o),e[1]=No(a),(i==="log"||i===!0)&&qr('precompile:["'+e[0]+'","'+e[1]+'"]'))},uC=function(e,t){if(!t)return e;var n=e.match(gl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},yg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},kf=function(e){var t=e[0].match(gl)||[],n=e[1].match(gl)||[],i=n.length-t.length;i>0?e[0]=yg(t,i):e[1]=yg(n,-i)},dC=function(e){return isNaN(e)?kf:function(t){kf(t),t[1]=uC(t[1],parseInt(e,10))}},fC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||iC.test(e)||(e.match(gl)||[]).length<3)&&(s=kh(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=K0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(qr("WARNING: invalid morph to: "+e),e=!1)),e},xg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=Cs(l,a),_=Cs(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Sr(a*a+l*l),m[d+3]=Sr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=Cs(l,a),_=Cs(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Sr(a*a+l*l),m[3]=Sr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},Sg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},hC=function(e){return e!==e%au?e+(e<0?pg:-pg):e},wg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",pC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Sr(a*a+l*l),u=Cs(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=Cs(l,a)-u,f=hC(d),!i&&Da&&Math.abs(f+Da.ca)<tC&&(i=Da),this._anchorPT=Da={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>nC?d:f,sl:c,cl:Sr(a*a+l*l)-c,i:n}},bg=function(e){Ni=J0(),Ia=Ia||Ni&&Ni.plugins.morphSVG,Ni&&Ia?(kh=Ni.utils.toArray,Ia.prototype._tweenRotation=pC,Z0=1):e&&qr("Please gsap.registerPlugin(MorphSVGPlugin)")},Eo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ni=e,Ia=t,bg()},init:function(e,t,n,i,s){if(Z0||bg(1),!t)return qr("invalid shape"),!1;ud(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,w,y,v,S,A,E,P,x,b,D;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=ud(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var I=e.nodeType?window.getComputedStyle(e):{},H=I.fill+"",F=!(H==="none"||(H.match(gl)||[])[3]==="0"||I.fillRule==="evenodd"),C=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return qr("Cannot morph a <"+o+"> element. "+wg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!ud(e.setAttribute))return!1;if(c=fC(t.shape||t.d||t.points||"",a==="d",e),u&&rC.test(c))return qr("A <"+o+"> cannot accept path data. "+wg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||Eo.defaultMap,this._prop=t.prop,this._render=t.render||Eo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:Eo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,A=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Qr(A?t.precompile[0]:g),m=Qr(A?t.precompile[1]:c),!A&&!Ff(g,m,d,f,F))return!1;for((t.precompile==="log"||t.precompile===!0)&&qr('precompile:["'+No(g)+'","'+No(m)+'"]'),b=(t.type||Eo.defaultType)!=="linear",b&&(g=xg(g,t.smoothTolerance),m=xg(m,t.smoothTolerance),g.size||Ja(g),m.size||Ja(m),x=Sg(C[0]),this._origin=g.origin={x:g.left+x.x*g.width,y:g.top+x.y*g.height},C[1]&&(x=Sg(C[1])),this._eOrigin={x:m.left+x.x*m.width,y:m.top+x.y*m.height}),this._rawPath=e._gsRawPath=g,w=g.length;--w>-1;)for(v=g[w],S=m[w],h=v.isSmooth||[],_=S.isSmooth||[],y=v.length,Da=0,p=0;p<y;p+=2)(S[p]!==v[p]||S[p+1]!==v[p+1])&&(b?h[p]&&_[p]?(E=v.smoothData,P=S.smoothData,D=p+(p===y-4?7-y:5),this._controlPT={_next:this._controlPT,i:p,j:w,l1s:E[p+1],l1c:P[p+1]-E[p+1],l2s:E[D],l2c:P[D]-E[D]},l=this._tweenRotation(v,S,p+2),this._tweenRotation(v,S,p,l),this._tweenRotation(v,S,D-1,l),p+=4):this._tweenRotation(v,S,p):(l=this.add(v,p,v[p],S[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],S[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,dC(d),a);b&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return sC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,w,y,v,S;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+fg(_)*h,s.t[s.i+1]=t._origin.y+hg(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],S=g+(g===f.length-4?7-f.length:5),_=Cs(f[S]-f[g+1],f[S-1]-f[g]),y=hg(_),v=fg(_),p=f[g+2],w=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=w-y*h,h=i.l2s+d*i.l2c,f[S-1]=p+v*h,f[S]=w+y*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:KA,stringToRawPath:Qr,rawPathToString:No,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return vg(o,i,s),o},pathFilter:vg,pointsFilter:kf,getTotalSize:Ja,equalizeSegmentQuantity:Ff,convertToPath:function(e,t){return kh(e).map(function(n){return K0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};J0()&&Ni.registerPlugin(Eo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function mC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Mg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Eg(r,e,t){return e&&Mg(r.prototype,e),t&&Mg(r,t),r}function gC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Tg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function Ag(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Tg(Object(t),!0).forEach(function(n){gC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Tg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function ev(r,e){return vC(r)||xC(r,e)||tv(r,e)||wC()}function Vn(r){return _C(r)||yC(r)||tv(r)||SC()}function _C(r){if(Array.isArray(r))return Bf(r)}function vC(r){if(Array.isArray(r))return r}function yC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function xC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function tv(r,e){if(r){if(typeof r=="string")return Bf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Bf(r,e)}}function Bf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function SC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rs(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Sl(r){return typeof r=="string"}function Bh(r){return Array.isArray(r)}function fc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Rs(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Sl(t)||Bh(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function zh(r){var e=Sl(r)||Bh(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function lu(r){return r!==null&&typeof r=="object"}function bC(r){return lu(r)&&/^(1|3|11)$/.test(r.nodeType)}function MC(r){return typeof r=="number"&&r>-1&&r%1===0}function EC(r){return lu(r)&&MC(r.length)}function Ws(r){return Bh(r)?r:r==null?[]:EC(r)?Array.prototype.slice.call(r):[r]}function Cg(r){var e=r;return Sl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Ws(e).reduce(function(t,n){return[].concat(Vn(t),Vn(Ws(n).filter(bC)))},[])}var TC=Object.entries,$c="_splittype",ki={},AC=0;function Zi(r,e,t){if(!lu(r))return console.warn("[data.set] owner is not an object"),null;var n=r[$c]||(r[$c]=++AC),i=ki[n]||(ki[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(ki[n]=Ag(Ag({},i),e)):e!==void 0&&(i[e]=t),t}function Ps(r,e){var t=lu(r)?r[$c]:null,n=t&&ki[t]||{};return n}function nv(r){var e=r&&r[$c];e&&(delete r[e],delete ki[e])}function CC(){Object.keys(ki).forEach(function(r){delete ki[r]})}function RC(){TC(ki).forEach(function(r){var e=ev(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(ki[t]=null,delete ki[t])})}function PC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Hh="\\ud800-\\udfff",iv="\\u0300-\\u036f\\ufe20-\\ufe23",rv="\\u20d0-\\u20f0",sv="\\ufe0e\\ufe0f",LC="[".concat(Hh,"]"),zf="[".concat(iv).concat(rv,"]"),Hf="\\ud83c[\\udffb-\\udfff]",DC="(?:".concat(zf,"|").concat(Hf,")"),ov="[^".concat(Hh,"]"),av="(?:\\ud83c[\\udde6-\\uddff]){2}",lv="[\\ud800-\\udbff][\\udc00-\\udfff]",cv="\\u200d",uv="".concat(DC,"?"),dv="[".concat(sv,"]?"),IC="(?:"+cv+"(?:"+[ov,av,lv].join("|")+")"+dv+uv+")*",OC=dv+uv+IC,NC="(?:".concat(["".concat(ov).concat(zf,"?"),zf,av,lv,LC].join("|"),`
)`),UC=RegExp("".concat(Hf,"(?=").concat(Hf,")|").concat(NC).concat(OC),"g"),FC=[cv,Hh,iv,rv,sv],kC=RegExp("[".concat(FC.join(""),"]"));function BC(r){return r.split("")}function fv(r){return kC.test(r)}function zC(r){return r.match(UC)||[]}function HC(r){return fv(r)?zC(r):BC(r)}function VC(r){return r==null?"":String(r)}function GC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=VC(r),r&&Sl(r)&&!e&&fv(r)?HC(r):r.split(e)}function Vf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Sl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Vn(Ws(s))):t.setAttribute(n,s))}),t}var Vh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function WC(r,e){e=Rs(Vh,e);var t=zh(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=PC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=GC(c).map(function(_){var g=Vf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Zi(g,"isChar",!0),a=[].concat(Vn(a),[g]),g})),t.words||t.lines?(f=Vf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),Zi(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function hv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return WC(r,e);var i=Ws(r.childNodes);if(i.length&&(Zi(r,"isSplit",!0),!Ps(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Zi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=hv(d,e),h=f.words,_=f.chars;return{words:[].concat(Vn(u.words),Vn(h)),chars:[].concat(Vn(u.chars),Vn(_))}},n)}function XC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=ev(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function pv(r){Ps(r).isWord?(nv(r),r.replaceWith.apply(r,Vn(r.childNodes))):Ws(r.children).forEach(function(e){return pv(e)})}var qC=function(){return document.createDocumentFragment()};function YC(r,e,t){var n=zh(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=qC(),m=window.getComputedStyle(r),p=m.textAlign,w=parseFloat(m.fontSize),y=w*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Zi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Ws(s).forEach(function(v){var S=v.parentElement===r,A=XC(v,S,e,t),E=A.width,P=A.height,x=A.top,b=A.left;/^br$/i.test(v.nodeName)||(n.lines&&S&&((l===null||x-l>=y)&&(l=x,o.push(a=[])),a.push(v)),e.absolute&&Zi(v,{top:x,left:b,width:E,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var S=Vf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Zi(S,"isLine",!0);var A={height:0,top:1e4};return g.appendChild(S),v.forEach(function(E,P,x){var b=Ps(E),D=b.isWordEnd,I=b.top,H=b.height,F=x[P+1];A.height=Math.max(A.height,H),A.top=Math.min(A.top,I),S.appendChild(E),D&&Ps(F).isWordStart&&S.append(" ")}),e.absolute&&Zi(S,{height:A.height,top:A.top}),S}),n.words||pv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Ws(s).forEach(function(v){var S=Ps(v),A=S.isLine,E=S.top,P=S.left,x=S.width,b=S.height,D=Ps(v.parentElement),I=!A&&D.isLine;v.style.top="".concat(I?E-D.top:E,"px"),v.style.left=A?"".concat(d.left,"px"):"".concat(P-(I?d.left:0),"px"),v.style.height="".concat(b,"px"),v.style.width=A?"".concat(d.width,"px"):"".concat(x,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var po=Rs(Vh,{}),ra=function(){Eg(r,null,[{key:"clearData",value:function(){CC()}},{key:"setDefaults",value:function(t){return po=Rs(po,fc(t)),Vh}},{key:"revert",value:function(t){Cg(t).forEach(function(n){var i=Ps(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",nv(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return ki}},{key:"defaults",get:function(){return po},set:function(t){po=Rs(po,fc(t))}}]);function r(e,t){mC(this,r),this.isSplit=!1,this.settings=Rs(po,fc(t)),this.elements=Cg(e),this.split()}return Eg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Zi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Rs(this.settings,fc(t)));var s=zh(this.settings.types);s.none||(this.elements.forEach(function(o){Zi(o,"isRoot",!0);var a=hv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Vn(n.words),Vn(l)),n.chars=[].concat(Vn(n.chars),Vn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=YC(o,n.settings,i);n.lines=[].concat(Vn(n.lines),Vn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),RC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const jC="/content/dam/acsorg/150/assets/audio/ui-click.mp3",$C="/content/dam/acsorg/150/assets/audio/chemistry2.mp3",KC="/content/dam/acsorg/150/assets/images/pacifichem-event1.jpg",ZC="/content/dam/acsorg/150/assets/images/green-chemistry-event2.jpg",JC="/content/dam/acsorg/150/assets/images/acs-spring-meeting-event3.jpg";Ge.registerPlugin(Ke);Ge.registerPlugin(Eo);let hd={year:2026},mo=null,Di=null;function Gf(){Di&&(Di.kill(),Di=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new ra(r,{types:"words,chars",absolute:!1}).chars,Ge.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Ge.timeline({paused:!0});n.to(t,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),Di=Ke.create({animation:n,trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.direction===-1&&i.progress<.1&&Ge.set(e,{opacity:1,z:0})},onRefresh:i=>{const s=i.progress;n.progress(s)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function QC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline"),s=document.querySelector("button.enter-experience");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),t&&Ge.set(t,{opacity:0,autoAlpha:0}),i&&Ge.set(i,{opacity:0,autoAlpha:0}),s&&Ge.set(s,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Ke.getAll().forEach(f=>{(f.vars.trigger==="#hero-area"||f.vars.trigger==="#hero-travel-area")&&f.kill()});const o=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",o),e.innerHTML="",o.split("").forEach(f=>{const h=document.createElement("span");h.className="digit",h.textContent=f,h.setAttribute("data-digit",f),e.appendChild(h)}),Ge.set(e,{opacity:0,autoAlpha:0}),Ge.set(r,{opacity:0,autoAlpha:0});const a=new ra(r,{types:"words,chars",absolute:!1});Ge.set(a.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const l=Ge.timeline({delay:.5});l.to(r,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"});const c=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(c)},840);const u=[...a.chars];for(let f=u.length-1;f>0;f--){const h=Math.floor(Math.random()*(f+1));[u[f],u[h]]=[u[h],u[f]]}l.to(u,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const f=new CustomEvent("particleFadeStart");document.dispatchEvent(f)}}),l.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"}),Ge.set(n,{opacity:1,autoAlpha:1});const d=e.querySelectorAll(".digit");l.fromTo(d,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{window.heroAnimationComplete=!0;const f=new CustomEvent("heroAnimationComplete");document.dispatchEvent(f)}},"-=0.6"),s&&Ge.to(s,{opacity:1,autoAlpha:1,duration:.8,delay:3.8,ease:"power2.out"}),s&&s.addEventListener("click",()=>{t&&Ge.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),i&&Ge.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.enterButtonClicked=!0,window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?window.playBackgroundAudio(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Ge.to(s,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(Ge.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0}}),Ke.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=.44+f.progress*.56;e.querySelectorAll(".digit").forEach(m=>{m.style.opacity=_})}}),Ke.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(f){const _=1-f.progress;e.style.opacity=_}}))}function eR(){tR(),Ke.refresh(),Ke.clearMatchMedia(),Ke.getAll().forEach(y=>y.kill()),mo=null,Di=null,hd.year=2026,Ge.registerPlugin(Ke),Ge.registerPlugin(ra),QC(),iR(),Rg(),rR(),Pg(),nR(),Kc(null),Zc(null),Lg(),sR(),oR(),lR();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const y=document.querySelector("nav"),v=document.querySelector("header");y&&y.classList.toggle("active"),v&&v.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const y=window.scrollY,v=document.querySelector("header.anniversary");v&&(y>e?v.classList.remove("active"):v.classList.add("active")),e=y});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const y=document.querySelector("nav"),v=document.querySelector("header");y&&y.classList.remove("active"),v&&v.classList.remove("nav-active")}),Gf();const n=document.querySelector("#hero-number");n?mo?(mo.scrollTrigger&&mo.scrollTrigger.enable(),mo.resume()):mo=Ge.to(hd,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:function(y){const v=Math.round(hd.year).toString(),S=n.querySelectorAll(".digit"),A=v.split("");S.length!==A.length?(n.innerHTML="",A.forEach(E=>{const P=document.createElement("span");P.className="digit",P.textContent=E,P.setAttribute("data-digit",E),n.appendChild(P)})):S.forEach((E,P)=>{E.textContent!==A[P]&&(E.textContent=A[P],E.setAttribute("data-digit",A[P]))})},onRefresh:y=>{}}}):console.warn("#hero-number element not found for countdown animation."),document.querySelectorAll(".pin-top-top").forEach(function(y){let v=y.parentElement;y.id==="hero-area"?Ke.create({trigger:v,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:S=>{S.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ke.create({trigger:v,start:"top top",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(y){Ge.set(y,{opacity:0}),Ge.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(y){Ge.set(y,{opacity:0}),Ge.to(y,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:y,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(y){let v=y.parentElement;Ke.create({trigger:v,start:"top center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(y){let v=y.parentElement;Ke.create({trigger:v,start:"center center",end:"bottom bottom",pin:y,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(y){let v=y.parentElement;Ke.create({trigger:v,start:"bottom bottom",end:"",pin:y,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=Ge.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=new Audio(jC);o.volume=.38;const a=()=>{if(!window.audioMuted)try{const y=o.cloneNode();y.volume=.38,y.play().catch(v=>{console.warn("UI click sound play was prevented:",v)})}catch(y){console.error("Error playing UI click sound:",y)}},l=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(S=>{S.addEventListener("click",A=>{if(S.classList.contains("enter-experience")){S.dataset.clickSoundPlayed||(window.audioMuted||a(),S.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}),new MutationObserver(S=>{S.forEach(A=>{A.type==="childList"&&A.addedNodes.forEach(E=>{E.nodeType===1&&(E.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&E.addEventListener("click",x=>{if(E.classList.contains("enter-experience")){E.dataset.clickSoundPlayed||(window.audioMuted||a(),E.dataset.clickSoundPlayed="true");return}window.audioMuted||a()}),E.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(x=>{x.addEventListener("click",b=>{if(x.classList.contains("enter-experience")){x.dataset.clickSoundPlayed||(window.audioMuted||a(),x.dataset.clickSoundPlayed="true");return}window.audioMuted||a()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},c=y=>{window.userInteracted=!0,window.enterButtonClicked&&!window.audioInitialized&&window.heroAnimationComplete&&!window.audioMuted&&window.playBackgroundAudio(!0)};document.addEventListener("click",c),document.addEventListener("touchstart",c),document.addEventListener("keydown",c);const u=document.querySelector(".sound-toggle");u&&u.addEventListener("click",()=>{a(),u.classList.toggle("muted"),window.audioMuted=u.classList.contains("muted"),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0,window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))):(s.resume(),!window.audioInitialized&&window.enterButtonClicked&&window.backgroundAudio?(window.playBackgroundAudio(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):!window.audioMuted&&window.enterButtonClicked&&(window.audioRetryCount<window.maxAudioRetries?window.playBackgroundAudio(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500))):window.audioInitialized&&window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(y=>{console.warn("Audio play was prevented:",y),window.audioInitialized=!1,window.enterButtonClicked&&window.playBackgroundAudio(!0)})))});const d=document.querySelector(".section-timeline .page-nav");if(!d){console.warn("Page navigation element (.section-timeline .n) not found - skipping navigation setup");return}const f=d.querySelectorAll("a"),h=document.querySelector(".section-timeline .indicator .active-title"),_=document.querySelector(".section-timeline .indicator-wrapper"),g=document.querySelector(".timeline-nav-wrapper");h||console.warn("Active title element (.section-timeline .indicator .active-title) not found"),!_&&!g&&console.warn("Neither indicator wrapper nor timeline nav wrapper found - navigation may not work properly"),Ge.set(f,{opacity:0,x:-20}),Ge.set(h,{opacity:1});const m=()=>{Ge.killTweensOf([h,f]),Ge.set(h,{opacity:0}),Ge.to(f,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},p=()=>{Ge.killTweensOf([h,f]),Ge.to(f,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in"}),Ge.to(h,{opacity:1,duration:.4,delay:.2,ease:"power2.out"})};d.addEventListener("mouseenter",()=>{m()}),d.addEventListener("mouseleave",()=>{p()}),f.forEach(y=>{y.addEventListener("click",v=>{v.preventDefault(),f.forEach(S=>S.classList.remove("active")),y.classList.add("active"),h.textContent=y.textContent,p()})}),window.handleNewAudioElement=y=>{window.audioMuted&&(y.volume=0,y.muted=!0),y.addEventListener("play",()=>{const v=document.querySelector(".sound-toggle");v&&v.classList.contains("muted")&&(y.volume=0,y.muted=!0)})},new MutationObserver(y=>{y.forEach(v=>{v.type==="childList"&&v.addedNodes.forEach(S=>{S.nodeName==="AUDIO"||S.nodeName==="VIDEO"?window.handleNewAudioElement(S):S.querySelectorAll&&S.querySelectorAll("audio, video").forEach(E=>{window.handleNewAudioElement(E)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l(),Rg(),Pg(),Kc(null),Zc(null),Lg(),aR()}function tR(){const r=new Audio;r.addEventListener("canplaythrough",()=>{window.backgroundAudioLoaded=!0,window.enterButtonClicked&&window.heroAnimationComplete&&!window.audioInitialized&&!window.audioMuted&&e(!0)}),r.addEventListener("error",i=>{console.error("Audio loading error:",i),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=$C;try{r.load()}catch(i){console.error("Error loading background audio:",i)}window.backgroundAudio=r,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.backgroundAudioLoaded=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=10,window.playBackgroundAudio=(i=!1)=>{if(!window.audioMuted&&(i&&(window.enterButtonClicked=!0),!(!window.enterButtonClicked||!window.heroAnimationComplete)&&!window.audioInitialized)){if(window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),window.audioRetryTimer&&(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null);return}if(window.backgroundAudioLoaded||r.readyState>=3)e(i);else if(i)try{r.load()}catch(s){console.warn("Error reloading background audio:",s)}}};function e(i=!1){if(!(window.audioInitialized||window.audioMuted)){if(window.audioRetryCount++,window.audioRetryCount>=window.maxAudioRetries){console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);return}try{if(r.volume=.08,i)try{const s=new(window.AudioContext||window.webkitAudioContext),o=s.createBufferSource();o.connect(s.destination),o.start(0)}catch(s){console.warn("Could not create audio context:",s)}r.play().then(()=>{window.audioInitialized=!0;const s=document.querySelector(".sound-toggle");s&&s.classList.add("active"),window.audioRetryCount=0}).catch(s=>{console.error("Audio play was prevented:",s),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)})}catch(s){console.error("Error playing audio:",s),window.audioInitialized=!1,(i||window.enterButtonClicked)&&window.audioRetryCount<window.maxAudioRetries&&setTimeout(()=>{!window.audioInitialized&&!window.audioMuted&&e(!0)},500)}}}let t=!1;const n=()=>{document.hidden?window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(t=!0,window.backgroundAudio.pause()):window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))};document.addEventListener("visibilitychange",n),window.addEventListener("blur",()=>{window.backgroundAudio&&!window.backgroundAudio.paused&&window.audioInitialized&&(t=!0,window.backgroundAudio.pause())}),window.addEventListener("focus",()=>{window.backgroundAudio&&t&&window.audioInitialized&&!window.audioMuted&&(t=!1,window.backgroundAudio.play().catch(i=>{console.warn("Could not resume background audio on focus:",i),window.audioInitialized=!1,window.enterButtonClicked&&setTimeout(()=>{window.playBackgroundAudio(!0)},100)}))})}function nR(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function iR(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Ge.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Ge.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ke.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Rg(){const r=document.querySelector("#get-involved-text p");r&&(Ge.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new ra(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(Ge.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Ge.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function Pg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events"),n=document.querySelector("#video-travel-area"),i=document.querySelector(".page-nav"),s=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!i||!s)return;const o=i.querySelector(".anniversary"),a=i.querySelector(".get-involved"),l=i.querySelector(".events"),c=_=>{if(s.textContent===_)return;const g=Ge.timeline();g.to(s,{opacity:0,duration:.18,onComplete:()=>{s.textContent=_}}),g.to(s,{opacity:1,duration:.24})};o.addEventListener("click",_=>{_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),o.classList.add("active"),c("150 Years of ACS"),window.scrollTo({top:0,behavior:"smooth"})}),a.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),a.classList.add("active"),c("Get Involved"),n){const g=n.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}else{const g=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}}),l.addEventListener("click",_=>{if(_.preventDefault(),i.querySelectorAll("a").forEach(g=>g.classList.remove("active")),l.classList.add("active"),c("Events"),t){const g=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:g,behavior:"smooth"})}});const u=[{id:"hero",element:r,title:"150 Years of ACS",link:o,top:0,bottom:0},{id:"getinvolved-video",element:n,title:"Get Involved",link:a,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:a,top:0,bottom:0},{id:"events",element:t,title:"Events",link:l,top:0,bottom:0}];function d(){if(u.forEach(_=>{if(_.element){const g=_.element.getBoundingClientRect();_.top=g.top+window.pageYOffset,_.bottom=g.bottom+window.pageYOffset}}),u[0].element&&n){const _=n.getBoundingClientRect();u[0].bottom=_.top+window.pageYOffset}if(n&&t){const _=u.find(p=>p.id==="getinvolved-video"),g=u.find(p=>p.id==="getinvolved"),m=t.getBoundingClientRect();_&&g&&(g.top=_.top,g.bottom=m.top+window.pageYOffset)}}d();let f=null;function h(){requestAnimationFrame(()=>{const _=window.pageYOffset+window.innerHeight/2;let g=u[0];for(let m=u.length-1;m>=0;m--){const p=u[m];if(p.element&&_>=p.top&&_<p.bottom){g=p;break}}g.id==="getinvolved-video"&&(g=u.find(m=>m.id==="getinvolved")||g),f!==g.id&&(f=g.id,i.querySelectorAll("a").forEach(m=>m.classList.remove("active")),g.link&&g.link.classList.add("active"),c(g.title))})}window.removeEventListener("scroll",h),window.addEventListener("scroll",h),window.addEventListener("resize",Gh(()=>{d(),h()},100)),h()}function rR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Ge.set(r,{x:0})),l&&!n&&(n=Ge.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger)},o=()=>{i&&(i.kill(),i=null),t&&(i=Ke.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Ge.set(t,{opacity:c})},onLeaveBack:()=>{Ge.set(t,{opacity:1})}}))};s(),o();const a=Gh(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function Kc(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new ra(o,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});d.lines&&d.lines.length>0&&d.lines.length>1?(t.push({element:o,splitText:d,originalContent:l}),Ge.set(d.lines,{opacity:0,y:50}),Ke.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-lines-${a}`,onEnter:()=>{Ge.to(d.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ge.to(d.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitLines=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)})},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((a,l)=>{s(a,l)})},100)}}function Zc(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}const t=[],n=()=>new Promise(o=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{o()}):setTimeout(o,100)}),i=o=>new Promise(a=>{const l=o.closest("section")||o.parentNode;if(!l){a();return}const c=l.querySelectorAll("img");if(c.length===0){a();return}const u=setTimeout(a,2e3);let d=0,f=!0;if(c.forEach(h=>{h.complete||(f=!1)}),f){clearTimeout(u),a();return}c.forEach(h=>{h.complete?(d++,d===c.length&&(clearTimeout(u),a())):(h.addEventListener("load",()=>{d++,d===c.length&&(clearTimeout(u),a())}),h.addEventListener("error",()=>{d++,d===c.length&&(clearTimeout(u),a())}))})}),s=(o,a)=>{const l=o.innerHTML;o.setAttribute("data-original-content",l),Promise.all([n(),i(o)]).then(()=>{o.offsetHeight;const c=(u=0)=>{const d=new ra(o,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});d.chars&&d.chars.length>0?(t.push({element:o,splitText:d,originalContent:l}),Ge.set(d.chars,{opacity:0,y:50,display:"inline-block"}),Ke.create({trigger:o,start:"top 85%",once:!1,markers:!1,id:`split-chars-${a}`,onEnter:()=>{Ge.to(d.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ge.to(d.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):u<3?(d&&typeof d.revert=="function"&&d.revert(),setTimeout(()=>{c(u+1)},300*(u+1))):(console.warn("SplitType failed to create chars after multiple attempts:",o),o.innerHTML=l)};c()})};e.forEach((o,a)=>{s(o,a)}),window.cleanupSplitChars=()=>{t.forEach(o=>{o.element&&o.originalContent&&(o.element.innerHTML=o.originalContent);const a=t.indexOf(o);a>-1&&t.splice(a,1)})},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((a,l)=>{s(a,l)})},100)}}function Lg(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(Ge.set(e,{y:50,filter:"opacity(0)"}),Ke.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Ge.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ge.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Ge.set(e,{opacity:0,y:50}),Ke.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Ge.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ge.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))})}function sR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Ge.set(r,{opacity:0,y:50}),Ke.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Ge.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ge.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function oR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}const t=document.createElement("div");t.className="marquee-container";const n=e.cloneNode(!0);e.remove(),t.appendChild(e),t.appendChild(n),r.appendChild(t);const i=()=>{setTimeout(()=>{const o=e.getBoundingClientRect().height;Ge.set(e,{top:0,left:0}),Ge.set(n,{top:o+"px",left:0});const a=Ge.timeline({repeat:-1,ease:"none"}),l=o/30;a.to([e,n],{y:-o,duration:l,ease:"none"}),a.set([e,n],{y:0})},100)};e.complete&&e.naturalHeight!==0?i():(e.addEventListener("load",i),setTimeout(i,1e3))}function aR(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[KC,ZC,JC],t="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,n=document.createElement("img");n.className="mouse-following-image",n.style.cssText=`
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
    filter: opacity(0.28) brightness(0.9) contrast(1.2);
    ${t?"display: none;":""}
  `,document.body.appendChild(n);let i=0,s=0;const o=a=>{i=a.clientX,s=a.clientY,n.style.left=i+"px",n.style.top=s+"px"};document.addEventListener("mousemove",o),r.forEach((a,l)=>{const c=e[l];if(!c){console.warn(`No image mapped for event item ${l}`);return}a.addEventListener("mouseenter",()=>{n.src=c,n.style.opacity="1",a.classList.add("active"),n.style.left=i+"px",n.style.top=s+"px"}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",a.classList.remove("active")})})}function Gh(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function Dg(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Di&&Di.animation){n=Di.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=Ge.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Di&&(Di.kill(),Di=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof Kc=="function"&&Kc(e),t.length&&typeof Zc=="function"&&Zc(t),typeof Gf=="function"&&Gf(),Ke.refresh()},50)}function lR(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=Gh(()=>{Dg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{Dg()})}const cR="/content/dam/acsorg/150/assets/video/acs-150-compressed.mp4",uR="/content/dam/acsorg/150/assets/images/anniversary-video-poster.jpg";function dR(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=cR,r.poster=uR,r.addEventListener("error",d=>{var f,h;console.error("Video loading error:",d),console.error("Video src:",r.src),console.error("Video error code:",(f=r.error)==null?void 0:f.code),console.error("Video error message:",(h=r.error)==null?void 0:h.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=(d,f,h=1e3)=>{if(!d)return;const _=d.volume,g=performance.now(),m=p=>{const w=p-g,y=Math.min(w/h,1),v=y*y;d.volume=_+(f-_)*v,y<1&&requestAnimationFrame(m)};requestAnimationFrame(m)},s=()=>{r.paused||(r.pause(),t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08))},o=()=>{r.paused?(r.play(),t.classList.add("hidden"),window.backgroundAudio&&i(window.backgroundAudio,0),r.volume=window.audioMuted?0:.5):s()};t.addEventListener("click",o),r.addEventListener("click",o),r.addEventListener("ended",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),window.backgroundAudio&&i(window.backgroundAudio,.08)}),new IntersectionObserver(d=>{d.forEach(f=>{f.isIntersecting||s()})},{threshold:.5}).observe(e);const l=()=>{r.paused||(r.volume=window.audioMuted?0:.5)},c=document.querySelector(".sound-toggle");c&&c.addEventListener("click",l);let u=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return u},set:function(d){u=d,l()}})}new Date("2026-04-06T00:00:00").getTime();function fR(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Dv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),XT(),fR()?(eR(),dR()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
